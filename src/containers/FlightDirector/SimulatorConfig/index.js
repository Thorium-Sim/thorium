import React, { Component } from 'react';
import { Col, Row, Container, Button, Card, CardBlock } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import SimulatorProperties from './SimulatorProperties';
import * as Config from './config';

import './SimulatorConfig.scss';

const SIMULATOR_SUB = gql`subscription SimulatorsUpdate {
  simulatorsUpdate(template: true) {
    id
    name
  }
}`;

class SimulatorConfig extends Component {
  subscription = null;
  state = {};
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: SIMULATOR_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          return Object.assign({}, previousResult, {simulators: subscriptionData.data.simulatorsUpdate});
        },
      });
    }
  }
  selectProperty = (prop) => {
    this.setState({
      selectedProperty: prop
    })
  }
  render() {
    const {data} = this.props
    const {selectedSimulator, selectedProperty} = this.state;
    if (data.loading) return null;
    const {simulators} = data;
    return <Container className="simulator-config">
    <h4>Simulator Config <small><Link to="/">Return to Main</Link></small></h4>
    <Row>
    <Col sm={2}>
    <Card>
    {
      simulators.map(s => <li key={s.id}
        className={`list-group-item simulator-item ${selectedSimulator && selectedSimulator.id === s.id ? 'selected' : ''}`}
        onClick={() => this.setState({selectedSimulator: s})}
        >{s.name}</li>)
    }
    </Card>
    </Col>
    <Col sm={3}>
    {selectedSimulator && <SimulatorProperties 
      selectProperty={this.selectProperty}
      selectedProperty={selectedProperty}
      />
    }
    </Col>
    <Col sm={7}>
    <Card>
    <CardBlock>
    {(() => {const ConfigComponent = Config[selectedProperty] || 'div'; return <ConfigComponent selectedSimulator={selectedSimulator} />})()}
    </CardBlock>
    </Card>
    </Col>
    </Row>
    </Container>

  }
}

const SIMULATOR_QUERY = gql `
query Simulators {
  simulators(template: true) {
    id
    name
  }
}`;

export default graphql(SIMULATOR_QUERY)(SimulatorConfig);
