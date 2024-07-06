import { graphql, withApollo } from "@apollo/client";
import React, {Component} from "react";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";

import "./style.scss";

const SYSTEMS_SUB = gql`
  subscription SystemsUpdate($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId, extra: true) {
      id
      name
      displayName
      type
      damage {
        damaged
      }
    }
  }
`;

class DamageMonitoring extends Component {
  systemName(sys) {
    if (sys.type === "Shield" && sys.name !== "Shields") {
      return `${sys.name} Shields`;
    }
    return sys.displayName || sys.name;
  }
  render() {
    const {loading, systems} = this.props.data;
    if (loading || !systems) return null;
    const damagedSystems = systems.filter(s => s.damage.damaged === true);
    return (
      <div className="damage-monitoring">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SYSTEMS_SUB,
              variables: {
                simulatorId: this.props.simulator.id,
              },
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  systems: subscriptionData.data.systemsUpdate,
                });
              },
            })
          }
        />
        <h1>Damage Monitor</h1>
        <div className="ship-view">
          <div
            alt="ship"
            style={{
              width: "70vw",
              height: "70vh",
              backgroundImage: `url("/assets${this.props.simulator.assets.side}")`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            draggable="false"
          >
            <div
              className="scanner-mask"
              style={{
                WebkitMaskImage: `url(/assets${this.props.simulator.assets.side})`,
              }}
            >
              <div className="scanner-holder">
                <div className="scanner" />
              </div>
            </div>
          </div>
        </div>
        <div className="damage-view">
          {damagedSystems.length > 0 ? (
            <div className="damage-list">
              {damagedSystems.map(d => (
                <p className="damaged" key={d.id}>
                  {this.systemName(d)}
                </p>
              ))}
            </div>
          ) : (
            <h1>No systems damaged</h1>
          )}
        </div>
      </div>
    );
  }
}

const SYSTEMS_QUERY = gql`
  query Systems($simulatorId: ID) {
    systems(simulatorId: $simulatorId, extra: true) {
      id
      name
      displayName
      type
      damage {
        damaged
      }
    }
  }
`;

export default graphql(SYSTEMS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {simulatorId: ownProps.simulator.id},
  }),
})(withApollo(DamageMonitoring));
