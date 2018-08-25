import React, { Component } from "react";
import { Label } from "reactstrap";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import SubscriptionHelper from "../../../../helpers/subscriptionHelper";
const DEST_SUB = gql`
  subscription NavigationUpdate($simulatorId: ID) {
    navigationUpdate(simulatorId: $simulatorId) {
      id
      displayName
      scanning
      calculate
      destination
      currentCourse {
        x
        y
        z
      }
      calculatedCourse {
        x
        y
        z
      }
    }
  }
`;

class Destination extends Component {
  render() {
    if (this.props.data.loading || !this.props.data.navigation) return null;
    const nav = this.props.data.navigation && this.props.data.navigation[0];
    if (!nav) return null;
    if (!nav.calculate) return null;
    const onCourse =
      nav.currentCourse.x === nav.calculatedCourse.x &&
      nav.currentCourse.y === nav.calculatedCourse.y &&
      nav.currentCourse.z === nav.calculatedCourse.z;
    return (
      <div>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: DEST_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  navigation: subscriptionData.data.navigationUpdate
                });
              }
            })
          }
        />
        <Label>Destination</Label>
        <div className="status-field">
          {nav.scanning
            ? "Calculating Course..."
            : onCourse
              ? nav.destination
              : "No Course"}
        </div>
      </div>
    );
  }
}
const DEST_QUERY = gql`
  query Navigation($simulatorId: ID) {
    navigation(simulatorId: $simulatorId) {
      id
      displayName
      scanning
      calculate
      destination
      currentCourse {
        x
        y
        z
      }
      calculatedCourse {
        x
        y
        z
      }
    }
  }
`;

export default graphql(DEST_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(Destination);
