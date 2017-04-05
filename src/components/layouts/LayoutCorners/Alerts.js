import React, {Component} from 'react';
import { UncontrolledAlert } from 'reactstrap';

const holderStyle = {
  position: 'absolute',
  right: '20px',
  top: '20px',
  width: '20vw',
  zIndex: '100000',
}
const NOTIFY_SUB = gql`
subscription Notifications($simulatorId: ID!, $trigger: String){
  notify(simulatorId: $simulatorId, trigger: $trigger){
    id
    title
    body
    color
    duration
  }
}`;
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
/*
   title: String
  body: String
  color: String
  trigger: String
  */
class Alerts extends Component {
  constructor(props){
    super(props);
    this.state = {
      alerts: []
    }
  }
  render() {
    return <div style={holderStyle} className="alertsHolder">
    <UncontrolledAlert color="info">
    I am an alert and I can be dismissed!
    </UncontrolledAlert>
    <UncontrolledAlert color="warning">
    I am an alert and I can be dismissed!
    </UncontrolledAlert>
    </div>
  }
}

export default withApollo(Alerts);
