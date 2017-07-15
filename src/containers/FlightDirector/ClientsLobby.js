import React from 'react';
import Clients from './Clients';
import SetsPicker from './SetsPicker';
import { Link } from 'react-router';
import { Container } from 'reactstrap';

export default (props) => {
  return <Container className="asset-config">
  <span>
  <h4>Flight Lobby <small><Link to="/">Return to Main</Link></small></h4>
  <h5 className="text-right"><Link to={`/flight/${props.params.flightId}/core`}>Go to Core</Link></h5>
  </span>
  <SetsPicker {...props}/>
  <Clients />
  </Container>
}