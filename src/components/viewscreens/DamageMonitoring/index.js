import React, { Component } from "react";
import { Asset } from "../../../helpers/assets";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import "./style.scss";

const SYSTEMS_SUB = gql`
  subscription SystemsUpdate($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId, extra: true) {
      id
      name
      type
      damage {
        damaged
      }
    }
  }
`;

class DamageMonitoring extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.systemSub && !nextProps.data.loading) {
      this.systemSub = nextProps.data.subscribeToMore({
        document: SYSTEMS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            systems: subscriptionData.data.systemsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.systemSub && this.systemSub();
  }
  systemName(sys) {
    if (sys.type === "Shield") {
      return `${sys.name} Shields`;
    }
    if (sys.type === "Engine") {
      return `${sys.name} Engines`;
    }
    return sys.name;
  }
  render() {
    const { loading, systems } = this.props.data;
    if (loading || !systems) return null;
    const damagedSystems = systems.filter(s => s.damage.damaged === true);
    return (
      <div className="damage-monitoring">
        <h1>Damage Monitor</h1>
        <div className="ship-view">
          <Asset
            asset="/Ship Views/Right"
            simulatorId={this.props.simulator.id}
          >
            {({ src }) => {
              return (
                <div
                  alt="ship"
                  style={{
                    width: "70vw",
                    height: "70vh",
                    backgroundImage: `url("${src}")`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                  draggable="false"
                >
                  <div
                    className="scanner-mask"
                    style={{ WebkitMaskImage: `url("${src}")` }}
                  >
                    <div className="scanner-holder">
                      <div className="scanner" />
                    </div>
                  </div>
                </div>
              );
            }}
          </Asset>
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
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(DamageMonitoring));
