import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { Input } from "reactstrap";
import Measure from "react-measure";
import escapeRegex from "escape-string-regexp";
import "./style.scss";

const Search = ({
  location,
  items,
  selectRoom,
  boxStyle = {},
  listStyle = {}
}) => (
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
        onClick={() => selectRoom(item.id)}
        style={listStyle}
      >
        {item.name}, Deck {item.number}
      </p>
    ))}
  </div>
);

class RoomSearch extends Component {
  state = {};
  static propTypes = {
    selectRoom: PropTypes.func,
    decks: PropTypes.array
  };
  setSearch = evt => {
    if (!evt.target.value) {
      return this.setState({
        searchRooms: null,
        searchQuery: evt.target.value
      });
    }
    const rooms = this.props.decks.reduce(
      (prev, next) =>
        prev.concat(next.rooms.map(r => ({ ...r, number: next.number }))),
      []
    );

    const regex = new RegExp(escapeRegex(evt.target.value), "gui");
    this.setState({
      searchRooms: rooms.filter(i => i.name.match(regex)).sort((a, b) => {
        if (a.number > b.number) return 1;
        if (a.number < b.number) return -1;
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      }),
      searchQuery: evt.target.value
    });
  };
  render() {
    const {
      selectRoom = () => {},
      inputProps = {},
      listProps = {}
    } = this.props;
    return (
      <Fragment>
        <Measure bounds onResize={d => this.setState({ dimensions: d.bounds })}>
          {({ measureRef }) => (
            <div ref={measureRef}>
              <Input
                bsSize="sm"
                type="text"
                placeholder="Room Search..."
                onChange={this.setSearch}
                value={this.state.searchQuery}
                {...inputProps}
              />
            </div>
          )}
        </Measure>
        {this.state.searchQuery &&
          ReactDOM.createPortal(
            <Search
              items={this.state.searchRooms}
              location={this.state.dimensions}
              selectRoom={id => {
                selectRoom(id);
                this.setState({ searchQuery: "", searchRooms: null });
              }}
              {...listProps}
            />,
            document.body
          )}
      </Fragment>
    );
  }
}

export default RoomSearch;
