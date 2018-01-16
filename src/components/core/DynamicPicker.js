import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

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
  subscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: SUB,
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            coreLayouts: subscriptionData.data.coreLayoutChange
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
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
  onChange = value => {
    const { data: { coreLayouts } } = this.props;
    if (value === "new") {
      return this.add();
    }
    this.props.onChange(
      JSON.parse(coreLayouts.find(l => l.id === value).config)
    );
  };
  render() {
    const { data: { loading, coreLayouts } } = this.props;
    if (loading || !coreLayouts) return null;
    return (
      <select
        value="nothing"
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
      </select>
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
