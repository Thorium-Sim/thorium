import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Label, Input } from "reactstrap";

const TACTICALMAP_SUB = gql`
  subscription TacticalMapUpdate {
    tacticalMapsUpdate {
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
class TacticalMapConfig extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.tacticalData.loading) {
      this.sub = nextProps.tacticalData.subscribeToMore({
        document: TACTICALMAP_SUB,
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            tacticalMaps: subscriptionData.data.tacticalMapsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  selectTactical = mapId => {
    let { updateArgs } = this.props;
    updateArgs("mapId", mapId);
  };
  render() {
    const { tacticalData, args, updateArgs } = this.props;
    if (tacticalData.loading || !tacticalData.tacticalMaps) return null;
    const { tacticalMaps } = this.props.tacticalData;
    return (
      <div className="tacticalmap-config">
        <Label>Secondary Screen?</Label>

        <Input
          type="checkbox"
          checked={args.secondary}
          onChange={evt => updateArgs("secondary", evt.target.checked)}
        />

        <p>Saved Maps</p>
        <ul className="saved-list">
          {tacticalMaps.filter(t => t.template).map(t => (
            <li
              key={t.id}
              className={t.id === args.mapId ? "selected" : ""}
              onClick={() => this.selectTactical(t.id)}
            >
              {t.name}
            </li>
          ))}
        </ul>
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
