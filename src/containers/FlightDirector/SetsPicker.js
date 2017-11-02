import React, { Component } from "react";
import { Container, Row, Col, Card } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import "./setConfig.css";

const ops = {
  flight: gql`
    mutation UpdateClient($client: ID!, $id: ID!) {
      clientSetFlight(client: $client, flightId: $id)
    }
  `,
  simulator: gql`
    mutation UpdateClient($client: ID!, $id: ID!) {
      clientSetSimulator(client: $client, simulatorId: $id)
    }
  `,
  station: gql`
    mutation UpdateClient($client: ID!, $id: ID!) {
      clientSetStation(client: $client, stationName: $id)
    }
  `
};
class SetsPicker extends Component {
  constructor(props) {
    super(props);
    this.flightsSub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.flightsSub && !nextProps.data.loading) {
      this.flightsSub = nextProps.data.subscribeToMore({
        document: FLIGHTS_SUB,
        variables: {
          flightId: nextProps.params.flightId
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            flights: subscriptionData.flightsUpdate
          });
        }
      });
    }
  }
  applyClientSet = (
    { clients },
    { id: simulatorId, templateId, stationSet: { id: stationSetId } },
    { id: flightId }
  ) => {
    const applyClients = clients.filter(
      c => c.simulator.id === templateId && c.stationSet.id === stationSetId
    );
    applyClients.forEach(c => {
      const variables = { client: c.client.id };
      // Apply the flight
      variables.id = flightId;
      this.props.client.mutate({
        mutation: ops.flight,
        variables
      });
      variables.id = simulatorId;
      this.props.client.mutate({
        mutation: ops.simulator,
        variables
      });
      variables.id = c.station;
      this.props.client.mutate({
        mutation: ops.station,
        variables
      });
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const { flights, sets } = this.props.data;
    const flight = flights && flights[0];
    return (
      <Container className="set-picker">
        <h4>Sets</h4>
        <Row className="justify-content-md-center">
          {flight &&
            flight.simulators.map(s => (
              <Col key={s.id} sm={4}>
                <h5>
                  {s.name} - {s.stationSet.name}
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
    variables: {
      flightId: ownProps.params.flightId
    }
  })
})(withApollo(SetsPicker));
