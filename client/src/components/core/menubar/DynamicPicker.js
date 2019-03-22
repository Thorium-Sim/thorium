import React, { Component, Fragment } from "react";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";
import MosaicConfig from "./mosaicConfig";

const SUB = gql`
  subscription CoreLayoutsUpdate {
    coreLayoutChange {
      id
      name
      config
    }
  }
`;
class DynamicPicker extends Component {
  state = { layout: "nothing" };
  add = () => {
    const name = prompt("What is the name of the new core layout?");
    if (name) {
      const mutation = gql`
        mutation SaveCoreLayout($name: String!, $config: String!) {
          addCoreLayout(layout: { name: $name, config: $config })
        }
      `;
      const variables = {
        name,
        config: JSON.stringify(this.props.mosaic)
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  };
  delete = () => {
    const { layout: value } = this.state;
    const {
      data: { coreLayouts }
    } = this.props;
    const layout = coreLayouts.find(l => l.id === value);
    if (
      window.confirm(
        `Are you sure you want to delete the '${layout.name}' layout?`
      )
    ) {
      this.setState({ layout: "nothing" });
      this.props.client.mutate({
        mutation: gql`
          mutation RemoveCoreLayout($id: ID!) {
            removeCoreLayout(id: $id)
          }
        `,
        variables: { id: layout.id }
      });
    }
  };
  onChange = value => {
    const {
      data: { coreLayouts }
    } = this.props;
    if (value === "new") {
      return this.add();
    }
    if (value === "delete") {
      return this.delete();
    }
    if (value === "change") {
      return this.setState({ modal: true });
    }
    this.setState({ layout: value });
    this.props.onChange(
      JSON.parse(coreLayouts.find(l => l.id === value).config)
    );
  };
  render() {
    const { modal } = this.state;
    const {
      data: { loading, coreLayouts }
    } = this.props;
    if (loading || !coreLayouts) return null;
    return (
      <Fragment>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  coreLayouts: subscriptionData.data.coreLayoutChange
                });
              }
            })
          }
        />
        <select
          value={this.state.layout}
          className="btn btn-warning btn-sm"
          onChange={e => this.onChange(e.target.value)}
        >
          <option value={"nothing"} disabled>
            Change Mosaic Layout
          </option>
          {coreLayouts.map(l => (
            <option value={l.id} key={l.id}>
              {l.name}
            </option>
          ))}
          <option value="new">Save Core Layout</option>
          <option disabled={this.state.layout === "nothing"} value="delete">
            Delete Core Layout
          </option>
          <option value="change">Reorder Core Layouts</option>
        </select>
        {modal && (
          <MosaicConfig
            modal={modal}
            toggle={() => this.setState({ modal: false })}
          />
        )}
      </Fragment>
    );
  }
}

const CORE_LAYOUTS = gql`
  query CoreLayouts {
    coreLayouts {
      id
      name
      config
    }
  }
`;
export default graphql(CORE_LAYOUTS)(withApollo(DynamicPicker));
