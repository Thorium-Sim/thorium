import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Container, Row, Col, Button } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import './style.scss';

const DOCKING_SUB = gql`
subscription SimulatorSub($simulatorId: ID){
  simulatorsUpdate(simulatorId: $simulatorId){
    id
    ship {
      clamps
      ramps
      airlock
    }
  }
}`;

const mutation = gql`
mutation DockingChange($simulatorId: ID!, $which: String!, $state: Boolean!){
  shipDockingChange(simulatorId: $simulatorId, which: $which, state: $state)
}`;

class DockingCore extends Component {
  constructor(props){
    super(props);
    this.state = {
      graphic: null
    }
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: DOCKING_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ simulators: subscriptionData.data.simulatorsUpdate }).toJS();
        }
      });
    }
  }
  toggle(which){
    const variables = {
      simulatorId: this.props.simulator.id,
      which: which,
      state: !this.props.data.simulators[0].ship[which]
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  render(){
    if (this.props.data.loading) return null;
    const {ship} = this.props.data.simulators[0];
    return <Container className="docking-core">
    <Row>
    <Col sm={4}>
    <Button onClick={this.toggle.bind(this, 'clamps')} size="sm" color={ship.clamps ? 'danger' : 'success'}>Clamps</Button>
    </Col>
    <Col sm={4}>
    <Button onClick={this.toggle.bind(this, 'ramps')} size="sm" color={ship.ramps ? 'danger' : 'success'}>Ramps</Button>
    </Col>
    <Col sm={4}>
    <Button onClick={this.toggle.bind(this, 'airlock')} size="sm" color={ship.airlock ? 'danger' : 'success'}>Doors</Button>
    </Col>
    </Row>
    </Container>
  }
}

const DOCKING_QUERY = gql`
query Simulator($simulatorId: String){
  simulators(id: $simulatorId){
    id
    ship {
      clamps
      ramps
      airlock
    }
  }
}`;

export default graphql(DOCKING_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(DockingCore));
