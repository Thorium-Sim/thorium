import React, { Component } from "react";
import { Container, Row, Col, Card } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";

import "./setConfig.scss";

class SetsPicker extends Component {
  static trainingSteps = [
    {
      selector: ".set-picker",
      content: (
        <span>
          This is the set picker. Sets connection stations to clients, making it
          easy to immediately set all of the clients to the correct station for
          the flight. Click on the simulator name for the set you want to
          activate.
        </span>
      )
    }
  ];
  applyClientSet = (
    { id },
    { id: simulatorId, templateId, stationSet: { id: stationSetId } },
    { id: flightId }
  ) => {
    const mutation = gql`
      mutation ApplyClientSet(
        $id: ID!
        $flightId: ID!
        $simulatorId: ID!
        $templateId: ID!
        $stationSetId: ID!
      ) {
        applyClientSet(
          id: $id
          flightId: $flightId
          simulatorId: $simulatorId
          templateId: $templateId
          stationSetId: $stationSetId
        )
      }
    `;
    const variables = {
      id,
      simulatorId,
      templateId,
      flightId,
      stationSetId
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (
      this.props.data.loading ||
      !this.props.data.flights ||
      !this.props.data.sets
    ) {
      return null;
    }
    const { flights, sets } = this.props.data;
    const flight = flights && flights[0];
    return (
      <Container className="set-picker">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: FLIGHTS_SUB,
              variables: {
                flightId: this.props.match.params.flightId
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  flights: subscriptionData.data.flightsUpdate
                });
              }
            })
          }
        />
        <h4>Sets</h4>
        <Row className="justify-content-md-center">
          {flight &&
            flight.simulators.map(s => (
              <Col key={s.id} sm={4}>
                <h5>
                  {s.name} - {s.stationSet && s.stationSet.name}
                </h5>
                <Card>
                  {sets.map(set => (
                    <li
                      className="list-group-item"
                      onClick={() => this.applyClientSet(set, s, flight)}
                      key={`${s.id}-${set.id}}`}
                    >
                      {set.name}
                    </li>
                  ))}
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    );
  }
}

const FLIGHTS_SUB = gql`
  subscription FlightsSub($flightId: ID) {
    flightsUpdate(id: $flightId) {
      id
      name
      simulators {
        id
        name
        templateId
        stationSet {
          id
          name
        }
      }
    }
  }
`;

const SETS_QUERY = gql`
  query Sets($flightId: ID) {
    flights(id: $flightId) {
      id
      name
      simulators {
        id
        templateId
        name
        stationSet {
          id
          name
        }
      }
    }
    sets {
      id
      name
      clients {
        id
        client {
          id
        }
        simulator {
          id
          name
        }
        stationSet {
          id
          name
        }
        station
      }
    }
  }
`;

export default graphql(SETS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      flightId: ownProps.match.params.flightId
    }
  })
})(withApollo(SetsPicker));
