import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { Container, Button } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import { OutputField, TypingField } from "../../generic/core";
import "./style.scss";
import SubscriptionHelper from "helpers/subscriptionHelper";
const NAVIGATION_SUB = gql`
  subscription NavigationUpdate($simulatorId: ID) {
    navigationUpdate(simulatorId: $simulatorId) {
      id
      scanning
      destination
      destinations
    }
  }
`;

class NavigationCore extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.state = {
      destinations: []
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      !nextProps.data.loading &&
      this.props.data.loading &&
      nextProps.data.navigation
    ) {
      const navigation = nextProps.data.navigation[0];
      if (navigation) {
        this.setState({
          destinations: navigation.destinations.join("\n")
        });
      }
    }
  }
  sendDestinations = () => {
    const navigation = this.props.data.navigation[0];
    const mutation = gql`
      mutation SendDestinations($id: ID!, $destinations: [String]) {
        navSetDestinations(id: $id, destinations: $destinations)
      }
    `;
    const variables = {
      id: navigation.id,
      destinations: this.state.destinations.split("\n")
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.navigation) return null;
    const navigation = this.props.data.navigation[0];
    if (!navigation) return <p>No Navigation Systems</p>;
    return (
      <Container className="jr-navigation-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: NAVIGATION_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  navigation: subscriptionData.data.navigationUpdate
                });
              }
            })
          }
        />
        <p>Destinations</p>
        <TypingField
          className="destinations"
          rows={5}
          style={{ height: "100%" }}
          controlled={true}
          value={this.state.destinations}
          onChange={evt => this.setState({ destinations: evt.target.value })}
        />
        <Button size="sm" color="info" block onClick={this.sendDestinations}>
          Send Destinations
        </Button>
        <OutputField alert={navigation.scanning}>
          {navigation.destination}
        </OutputField>
      </Container>
    );
  }
}

const NAVIGATION_QUERY = gql`
  query Navigation($simulatorId: ID) {
    navigation(simulatorId: $simulatorId) {
      id
      scanning
      destination
      destinations
    }
  }
`;

export default graphql(NAVIGATION_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(NavigationCore));
