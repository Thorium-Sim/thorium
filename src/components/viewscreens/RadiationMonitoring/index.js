import React, { Component } from "react";
import "./style.scss";
import col from "color";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const SUB = gql`
  subscription ShipUpdate($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        radiation
      }
    }
  }
`;

function calcColor(i) {
  return col().hsl(360 - ((i * 255 + 110) % 360), 100, 50);
}

class RadiationMonitor extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            simulators: subscriptionData.data.simulatorsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    // Cancel the subscription
    this.sub && this.sub();
  }
  render() {
    const { loading, simulators } = this.props.data;
    if (loading || !simulators) return null;
    const width = simulators[0].ship.radiation;
    return (
      <div className="radiation-monitoring">
        <h1>Radiation Monitor</h1>

        <svg height="600" width="600" viewBox="-300 -300 600 600">
          <circle
            r="50"
            style={{
              fill: calcColor(width, false, "rainbow").rgbaString()
            }}
          />
          <path
            style={{
              transform: "rotate(0deg)",
              fill: calcColor(width, false, "rainbow").rgbaString()
            }}
            id="bld"
            d="M75,0 A 75,75 0 0,0 37.5,-64.952 L 125,-216.506 A 250,250 0 0,1 250,0 z"
          />
          <path
            style={{
              transform: "rotate(120deg)",
              fill: calcColor(width, false, "rainbow").rgbaString()
            }}
            d="M75,0 A 75,75 0 0,0 37.5,-64.952 L 125,-216.506 A 250,250 0 0,1 250,0 z"
          />
          <path
            style={{
              transform: "rotate(-120deg)",
              fill: calcColor(width, false, "rainbow").rgbaString()
            }}
            d="M75,0 A 75,75 0 0,0 37.5,-64.952 L 125,-216.506 A 250,250 0 0,1 250,0 z"
          />
        </svg>
        <div className="radiation-box">
          <div
            className="radiation-bar"
            style={{
              width: `calc(${width * 100}% - 10px)`
            }}
          />
        </div>
      </div>
    );
  }
}
const QUERY = gql`
  query Ship($simulatorId: String) {
    simulators(id: $simulatorId) {
      id
      ship {
        radiation
      }
    }
  }
`;

export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(RadiationMonitor);
