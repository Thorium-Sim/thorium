import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Label, Input } from "reactstrap";
import SubscriptionHelper from "../../helpers/subscriptionHelper";

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
        <SubscriptionHelper
          subscribe={() =>
            this.props.tacticalData.subscribeToMore({
              document: TACTICALMAP_SUB,
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  tacticalMaps: subscriptionData.data.tacticalMapsUpdate
                });
              }
            })
          }
        />
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
