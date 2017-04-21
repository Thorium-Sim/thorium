import React, {Component} from 'react';
import { Row, Col, Container } from 'reactstrap';
import gql from 'graphql-tag';
import { InputGroup, InputGroupButton, Button, Input } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import DamageOverlay from '../helpers/DamageOverlay';
import './style.scss';

const PHASERS_SUB = gql`
subscription Phasers($simulatorId: ID!){
  phasersUpdate(simulatorId: $simulatorId){
    id
    simulatorId
    arc
    name
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    state
    charge
  }
}`;

class PhaserCharging extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps){
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: PHASERS_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({phasers: subscriptionData.data.phasersUpdate}).toJS();
        }
      });
    }
  }
  
  render(){
    if (this.props.data.loading) return null;
    const phaser = this.props.data.phaser[0];
    if (!phaser) return <p>No Phaser System</p>;
    return (
      <Container fluid className="card-phaserCharging">
      
      </Container>);
  }
}


const PHASERS_QUERY = gql`
query Phasers($simulatorId: ID!){
  phasers(simulatorId: $simulatorId){
    id
    simulatorId
    arc
    name
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    state
    charge
  }
}`;

export default graphql(PHASERS_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(PhaserCharging));
