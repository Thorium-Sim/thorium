import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

class TacticalMapConfig extends Component {
  selectTactical = mapId => {
    let { updateArgs } = this.props;
    updateArgs("mapId", mapId);
  };
  render() {
    const { tacticalData, args } = this.props;
    if (tacticalData.loading || !tacticalData.tacticalMaps) return null;
    const { tacticalMaps } = this.props.tacticalData;
    if (!args) return null;
    const map = tacticalMaps.find(t => t.id === args.mapId);
    return (
      <div className="tacticalmap-config">
        <strong>Secondary Screen? </strong>
        <span>{args.secondary ? "Yes" : "No"}</span>
        <div>
          <strong>Map Name</strong>
        </div>
        <div>{map ? map.name : ""}</div>
      </div>
    );
  }
}

const TACTICALMAP_QUERY = gql`
  query TacticalMap {
    tacticalMaps {
      id
      name
      flight {
        id
      }
      frozen
      template
    }
  }
`;

export default graphql(TACTICALMAP_QUERY, { name: "tacticalData" })(
  withApollo(TacticalMapConfig)
);
