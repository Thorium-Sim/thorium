import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Container, Row, Col, Button, Card, CardBlock } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';

import './style.scss';

const SYSTEMS_SUB = gql`
subscription SystemsUpdate($simulatorId: ID){
  systemsUpdate(simulatorId: $simulatorId) {
    id
    name
    damage {
      damaged
      report
    }
    simulatorId
    type
  }
}`;

class DamageControl extends Component {
  constructor(props) {
    super(props);
    this.systemSub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.systemSub && !nextProps.data.loading) {
      this.systemSub = nextProps.data.subscribeToMore({
        document: SYSTEMS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ systems: subscriptionData.data.systemsUpdate }).toJS();
        }
      });
    }
  }
  systemName(sys) {
    if (sys.type === 'Shield'){
      return `${sys.name} Shields`;
    }
    if (sys.type === 'Engine'){
      return `${sys.name} Engines`;
    }
    return sys.name;
  }
  render(){
    if (this.props.data.loading) return null;
    const systems = this.props.data.systems;
    return <Container fluid className="damage-control">
    <Row>
    <Col sm="3" className="damage-list">
    <h4>Damaged Systems</h4>
    <Card>
    <CardBlock>
    {
      systems.filter(s => s.damage.damaged)
      .map(s => <p key={s.id}>
        {this.systemName(s)}
        </p>)
    }
    </CardBlock>
    </Card>
    <Button block color="primary">Request Damage Report</Button>
    </Col>
    <Col sm="9" className="damage-report">
    <h4>Damage Report</h4>
    <Card>
    <CardBlock>

    </CardBlock>
    </Card>
    </Col>
    </Row>
    </Container>
  }
}
const SYSTEMS_QUERY = gql`
query Systems($simulatorId: ID){
  systems(simulatorId: $simulatorId) {
    id
    name
    damage {
      damaged
      report
    }
    simulatorId
    type
  }
}`;

export default graphql(SYSTEMS_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(DamageControl));