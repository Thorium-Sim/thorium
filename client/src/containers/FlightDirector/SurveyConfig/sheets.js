import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { Query, withApollo } from "react-apollo";

import ReactDOM from "react-dom";
import { Input } from "reactstrap";
import Measure from "react-measure";

import debounce from "helpers/debounce";

const Search = ({ location, items, select, boxStyle = {}, listStyle = {} }) => (
  <div
    className="search-box"
    style={{
      left: `${location.left}px`,
      top: `${location.top + location.height}px`,
      ...boxStyle
    }}
  >
    {items.length === 0 && (
      <p className="search-item" style={listStyle}>
        No Results
      </p>
    )}
    {items.map(item => (
      <p
        className="search-item"
        key={item.id}
        onClick={() => select(item)}
        style={listStyle}
      >
        {item.name}
      </p>
    ))}
  </div>
);

class SearchForm extends Component {
  state = { searchQuery: this.props.defaultValue };
  setSearch = debounce((value, client) => {
    if (!value) {
      return this.setState({
        sheets: null,
        searchQuery: value
      });
    }
    if (value.length < 3) return;
    client
      .mutate({
        mutation: gql`
          mutation Search($searchText: String!) {
            googleSheetsFileSearch(searchText: $searchText) {
              id
              name
            }
          }
        `,
        variables: {
          searchText: value
        }
      })
      .then(({ data: { googleSheetsFileSearch } }) =>
        this.setState({ searchQuery: value, sheets: googleSheetsFileSearch })
      );
  }, 500);
  render() {
    const { select = () => {}, inputProps = {}, listProps = {} } = this.props;
    return (
      <>
        <Measure bounds onResize={d => this.setState({ dimensions: d.bounds })}>
          {({ measureRef }) => (
            <div ref={measureRef}>
              <Input
                bsSize="sm"
                type="text"
                placeholder="Sheet Search..."
                onChange={e => {
                  this.setState({ searchQuery: e.target.value });
                  this.setSearch(e.target.value, this.props.client);
                }}
                value={this.state.searchQuery}
                {...inputProps}
              />
            </div>
          )}
        </Measure>
        {this.state.sheets &&
          ReactDOM.createPortal(
            <Search
              items={this.state.sheets}
              location={this.state.dimensions}
              select={item => {
                select(item);
                this.setState({ sheets: null, searchQuery: item.name });
              }}
              {...listProps}
            />,
            document.body
          )}
      </>
    );
  }
}

export const SheetPicker = ({ sheet, id, name, select }) => {
  return (
    <Query
      query={gql`
        query Spreadsheet($id: ID!) {
          googleSheetsGetSpreadsheet(spreadsheetId: $id) {
            id
            title
            sheets {
              id
              title
            }
          }
        }
      `}
      variables={{ id }}
    >
      {({ loading, data }) => {
        if (loading) return "Loading...";
        const { googleSheetsGetSpreadsheet } = data;
        return (
          <Input
            type="select"
            value={sheet || "nothing"}
            onChange={e => select({ id, name, sheet: e.target.value })}
          >
            <option value="nothing" disabled>
              Choose a sheet.
            </option>
            {googleSheetsGetSpreadsheet.sheets.map(s => (
              <option key={s.title} value={s.title}>
                {s.title}
              </option>
            ))}
          </Input>
        );
      }}
    </Query>
  );
};

const WrappedSearch = withApollo(SearchForm);

export default WrappedSearch;
