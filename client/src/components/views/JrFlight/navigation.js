import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { Button } from "helpers/reactstrap";
import { graphql, withApollo } from "react-apollo";
import NavigationScanner from "../Navigation/NavigationScanner";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

const NAVIGATION_SUB = gql`
  subscription NavigationUpdate($simulatorId: ID) {
    navigationUpdate(simulatorId: $simulatorId) {
      id
      destinations
      scanning
      destination
    }
  }
`;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: null,
      calculatedCourse: {},
      selectedField: null,
      enteredCourse: {},
      scanning: false,
      selectedDest: ""
    };
  }
  setCourse = () => {
    if (!this.state.selectedDest) return;
    const mutation = gql`
      mutation SetDestination($id: ID, $destination: String) {
        navSetDestination(id: $id, destination: $destination)
      }
    `;
    const navigation = this.props.data.navigation[0];
    const variables = {
      id: navigation.id,
      destination: this.state.selectedDest
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  calcCourses = () => {
    const mutation = gql`
      mutation SetScanning($id: ID) {
        navSetScanning(id: $id, scanning: true)
      }
    `;
    const navigation = this.props.data.navigation[0];
    const variables = {
      id: navigation.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.navigation) return null;
    const navigation = this.props.data.navigation[0];
    if (!navigation) return <p>No Navigation System</p>;
    return (
      <div className="jr-navigation">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: NAVIGATION_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  navigation: subscriptionData.data.navigationUpdate
                });
              }
            })
          }
        />
        <h1>Current Course: {navigation.destination}</h1>
        <Button block color="info" onClick={this.calcCourses}>
          Calculate Courses
        </Button>
        <div className="course-list">
          {navigation.destinations.map(d => (
            <p
              key={d}
              onClick={() => this.setState({ selectedDest: d })}
              className={this.state.selectedDest === d ? "selected" : ""}
            >
              {d}
            </p>
          ))}
        </div>
        <Button block color="success" onClick={this.setCourse}>
          Set Course
        </Button>
        <NavigationScanner scanning={navigation.scanning} />
      </div>
    );
  }
}

const NAVIGATION_QUERY = gql`
  query Navigation($simulatorId: ID) {
    navigation(simulatorId: $simulatorId) {
      id
      destinations
      scanning
      destination
    }
  }
`;

export default graphql(NAVIGATION_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(Navigation));
