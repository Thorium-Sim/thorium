import React from 'react';
import Clients from './Clients';
import { Link } from 'react-router';
import { Container } from 'reactstrap';

export default () => {
  return <Container className="asset-config">
  <h4>Flight Lobby <small><Link to="/">Return to Main</Link></small></h4>
  <Clients />
  </Container>
}