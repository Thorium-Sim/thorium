import React, {Component} from 'react';
import { Container, Row, Col, Card, CardBlock } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

import './setConfig.scss';

const ops = {
  flight: gql`mutation UpdateClient($client: ID!, $id: ID!) {
    clientSetFlight(client: $client, flightId: $id)
  }`,
  simulator:gql`mutation UpdateClient($client: ID!, $id: ID!) {
    clientSetSimulator(client: $client, simulatorId: $id)
  }`,
  station:gql`mutation UpdateClient($client: ID!, $id: ID!) {
    clientSetStation(client: $client, stationName: $id)
  }`
}
class SetsPicker extends Component {
  constructor(props) {
    super(props);
    this.flightsSub = null
  }
  componentWillReceiveProps(nextProps) {
    if (!this.flightsSub && !nextProps.data.loading) {
      this.flightsSub = nextProps.data.subscribeToMore({
        document: FLIGHTS_SUB,
        variables: {
          flightId: nextProps.params.flightId
        },
        updateQuery: (previousResult, {subscriptionData}) => {
          return Object.assign({}, previousResult, {flights: subscriptionData.data.flightsUpdate});
        },
      });
    }
  }
  applyClientSet = ({clients}, {id: simulatorId, templateId, stationSet: {id: stationSetId}}, {id: flightId}) => {
    debugger;
    const applyClients = clients.filter(c => c.simulator.id === templateId && c.stationSet.id === stationSetId);
    applyClients.forEach(c => {
      const variables = {client: c.client.id};
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
    })
  }
  render() {
    if (this.props.data.loading) return null;
    const {flights, sets} = this.props.data;
    const flight = flights[0];
    return <Container className="set-picker">
    <Row className="justify-content-md-center">
    <Col xs="12">
    <h4>Sets</h4>
    { flight.simulators.map(s => <Row key={s.id}>
      <Col sm={4}>
      <h5>{s.name} - {s.stationSet.name}</h5>
      {sets.map(set => <Card onClick={() => this.applyClientSet(set, s, flight)} key={`${s.id}-${set.id}}`}>
        <CardBlock>
        <h6>{set.name}</h6>
        <ul>
        {set.clients.filter(c => c.simulator.id === s.templateId && c.stationSet.id === s.stationSet.id)
          .map(c => <li key={c.id}>{`${c.client.id} - ${c.station}`}</li>)}
          </ul>
          </CardBlock>
          </Card>)}
      </Col>
      </Row>)}
    </Col>
    </Row>
    </Container>
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
}`;

const SETS_QUERY = gql `
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
}`;

export default graphql(SETS_QUERY, {
  options: (ownProps) => ({
    variables: {
      flightId: ownProps.params.flightId
    }
  })
})(withApollo(SetsPicker));