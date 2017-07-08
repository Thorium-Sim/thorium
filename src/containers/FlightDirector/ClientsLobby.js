import React from 'react';
import Clients from './Clients';
import SetsPicker from './SetsPicker';
import { Link } from 'react-router';
import { Container } from 'reactstrap';

export default (props) => {
  return <Container className="asset-config">
  <h4>Flight Lobby <small><Link to="/">Return to Main</Link></small></h4>
  <SetsPicker {...props}/>
  <Clients />
  </Container>
}