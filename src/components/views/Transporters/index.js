import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Button, Row, Col, Input } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Target from './targeting';
import Scan from './transporterScan';
import './style.scss';

const DamageOverlay = () => {
  return <div className="damageOverlay">
  <h1>Transporters Damaged</h1>
  </div>
}

const TRANSPORTER_SUB = gql`
subscription TransportersSub{
  transporterUpdate {
    id
    type
    state
    charge
    simulatorId
    targets {
      id
      icon
      moving
      position {
        x
        y
      }
    }
    requestedTarget
    destination
    damage {
      damaged
      report
    }
    power {
      power
      powerLevels
    }
  }
}`;

const TargetSelect = (props) => {
  return (
    <Row>
    <Col sm={{size:6, push:3}}>
    <div style={{height: '60px'}} />
    <h3>Enter Target:</h3>
    <Input defaultValue={props.target} onBlur={props.updateTarget} placeholder="Enter Target..." size="lg" />
    <div style={{height: '60px'}} />
    <h3>Enter Destination:</h3>
    <Input defaultValue={props.destination} onBlur={props.updateDestination} placeholder="Enter Destination..." size="lg" />
    <div style={{height: '30px'}} />
    <Col sm={{size: 6, push: 3}}>
    <Button block color={'primary'} onClick={props.beginScan}>Begin Scan</Button>
    </Col>
    </Col>
    </Row>
    );
}
const Scanning = (props) => {
  return (
    <Row>
    <Col sm={{size: 6, offset: 3}}>
    <Scan />
    <h3 style={{textAlign: 'center', width: '100%'}}>Scanning...</h3>
    <Col sm={{size: 6, offset: 3}}>
    <Button block color={'primary'} size="lg" onClick={props.cancelScan}>Cancel Scan</Button>
    </Col>
    </Col>
    </Row>
    );
}

class Transporters extends Component {
  constructor(props) {
    super(props);
    this.transporterSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.transporterSubscription && !nextProps.data.loading) {
      this.transporterSubscription = nextProps.data.subscribeToMore({
        document: TRANSPORTER_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          previousResult.transporters = previousResult.transporters.map(transporter => {
            if (transporter.id === subscriptionData.data.transporterUpdate.id){
              transporter = subscriptionData.data.transporterUpdate
            } 
            return transporter;
          })
          return previousResult;
        },
      });
    }
  }
  updateTarget(transporter, e){
    this.props.client.mutate({
      mutation: gql`
      mutation SetTransporterTarget($transporter: ID!, $target: String!){
        setTransportTarget(transporter: $transporter, target: $target)
      }`,
      variables: {
        transporter: transporter.id,
        target: e.target.value
      }
    })
  }
  updateDestination(transporter, e){
    this.props.client.mutate({
      mutation: gql`
      mutation SetTransporterDestination($transporter: ID!, $destination: String!){
        setTransportDestination(transporter: $transporter, destination: $destination)
      }`,
      variables: {
        transporter: transporter.id,
        destination: e.target.value
      }
    })
  }
  setCharge(transporter, charge){
    this.props.client.mutate({
      mutation: gql`
      mutation SetTransportCharge($transporter: ID!, $charge: Float!){
        setTransportCharge(transporter: $transporter, charge: $charge)
      }`,
      variables: {
        transporter: transporter.id,
        charge
      }
    })
  }
  beginScan(transporter){
    this.props.client.mutate({
      mutation: gql`
      mutation BeginTransportScan($transporter: ID!){
        beginTransportScan(transporter: $transporter)
      }`,
      variables: {
        transporter: transporter.id,
      }
    })
  }
  cancelScan(transporter){
    this.props.client.mutate({
      mutation: gql`
      mutation CancelTransporterScan($transporter: ID!){
        cancelTransportScan(transporter: $transporter)
      }`,
      variables: {
        transporter: transporter.id,
      }
    })
  }
  cancelTransport(transporter){
    this.props.client.mutate({
      mutation: gql`
      mutation CancelTransport($transporter: ID!){
        clearTransportTargets(transporter: $transporter)
      }`,
      variables: {
        transporter: transporter.id,
      }
    })
  }
  completeTransport(transporter, target){
    this.props.client.mutate({
      mutation: gql`
      mutation CompleteTransport($transporter: ID!, $target: ID!){
        completeTransport(transporter: $transporter, target: $target)
      }`,
      variables: {
        transporter: transporter.id,
        target: target.id,
      }
    })
  }
  render() {
    // Assume that there is only one transporter
    if (this.props.data.loading) return null;
    if (this.props.data.error) console.log(this.props.data.error);
    const transporter = this.props.data.transporters[0] || {};
    return (
      <div className="transporter-control">
      {transporter.damage.damaged && <DamageOverlay />}
      {transporter.state === 'Inactive' && <TargetSelect beginScan={this.beginScan.bind(this, transporter)} updateTarget={this.updateTarget.bind(this, transporter)} updateDestination={this.updateDestination.bind(this, transporter)} target={transporter.requestedTarget} destination={transporter.destination} />}
      {transporter.state === 'Scanning' && <Scanning cancelScan={this.cancelScan.bind(this, transporter)} />}
      {(transporter.state === 'Targeting' || transporter.state === 'Charging') && <Target completeTransport={this.completeTransport.bind(this, transporter)} cancelTransport={this.cancelTransport.bind(this, transporter)} setCharge={this.setCharge.bind(this, transporter)} targets={transporter.targets} />}
      </div>
      );
  }
}

const TRANSPORTERS_QUERY = gql`
query GetTransporters($simulatorId: ID){
  transporters(simulatorId: $simulatorId) {
    id
    type
    state
    charge
    simulatorId
    targets {
      id
      icon
      moving
      position {
        x
        y
      }
    }
    requestedTarget
    destination
    damage {
      damaged
      report
    }
    power {
      power
      powerLevels
    }
  }
}
`;
export default  graphql(TRANSPORTERS_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(Transporters));