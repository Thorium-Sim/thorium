import React, { Component } from 'react';
import { Col, Row, Container, Button, Card, CardBlock } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import './welcome.scss';

const FLIGHT_SUB = gql`subscription FlightsChanged {
  flightsUpdate {
    id
    name
    date
  }
}`;

class Welcome extends Component {
  subscription = null;

  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: FLIGHT_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          return Object.assign({}, previousResult, {flights: subscriptionData.data.flightsUpdate});
        },
      });
    }
  }
  render(){
    if (this.props.data.loading) return null;
    const flights = this.props.data.flights;
    return (
      <Container className="WelcomeView">
      <Row>
      <Col sm={12} className="title-row">
      <h1 className="text-center">Thorium</h1>
      </Col>
      </Row>
      <Row className="content-row">
      <div>
      <h3>Pick a running Flight</h3>
      <Card>
      <CardBlock>
      { flights.map(f => <Link to={`/flight/${f.id}`} key={f.id} className="flight-picker">
      <p>{f.name}</p> <small>{formatDate(new Date(f.date))}</small>
      </Link>)}
      </CardBlock>
      </Card>
      </div>
      <div>
      <h4 className="text-center">or</h4>
      </div>
      <div>
      <h3>Start a new Flight</h3>
      <Button tag={Link} to="/flightConfig" color="success" block size="lg">New Flight</Button>
      </div>
      </Row>
      <Row className="config-row">
        <Col sm={4}>
        <Button tag={Link} to="/simulatorConfig" color="info" block>Configure Simulators</Button>
        </Col>
        <Col sm={4}>
        <Button tag={Link} to="/assetConfig" color="secondary" block>Configure Generic Assets</Button>
        </Col>
        <Col sm={4}>
        <Button tag={Link} to="/missionConfig" color="primary" block>Configure Missions</Button>
        </Col>
        <Col sm={{size: 4}}>
        <Button tag={Link} to="/setConfig" color="warning" block>Configure Sets</Button>
        </Col>
        <Col sm={{size:4}}>
<Button tag={Link} to="/flight/c/core" color="secondary" block>Debug Core</Button>
        </Col>
        <Col sm={{size: 4}}>
        <Button tag={Link} to="/debug" color="primary" block>Debug</Button>
        </Col>
      </Row>
      </Container>
      );
  }
}

const FLIGHTS_QUERY = gql `
query Flights {
  flights(running: true) {
    id
    name
    date
  }
}`;

function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "June", "July",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var am = "AM";
  hour = hour > 12 ? (am = "PM", hour - 12) : hour;
  var minute = date.getMinutes();

  return monthNames[monthIndex] + ' ' + day + ', '  + year + ' ' + hour + ':' + minute + ' ' + am;
}

export default graphql(FLIGHTS_QUERY)(Welcome);

