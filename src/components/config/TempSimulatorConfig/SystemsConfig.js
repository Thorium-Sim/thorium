import React, { Component } from 'react';
import { Col, Row, Card, Container, Input } from 'reactstrap';
import systems from '../../systems';

const ADD_SYSTEM = gql`
mutation AddSystem($id: ID!, $class: String!, $params: String!) {
  addSystemToSimulator(simulatorId:$id, className:$class, params: $params )
}`;

export default class SystemsConfig extends Component {
  constructor(params){
    super(params);
    this.state = {
      selectedSystem: null
    }
  }
  render() {
    const sim = this.props.selectedSimulator;
    const SelectedSystem = systems[this.state.selectedSystem] || null;
    return <Container>
    <Row>
    <Col sm="4">
    <Input type="select">
    {
      Object.keys(systems).map(s => {
        return <option key={`${s}-system`}
        value={s}>
        {s}
        </option>
      })
    }
    </Input>
    <Card className="scroll">
    {
      sim.systems.length > 0 ? sim.systems.map(s => {
        return <option key={`${s.id}`}
        value={s}
        onClick={() => {this.setState({selectedSystem: s.id})}}  
        className={`${(s.id === this.state.selectedSystem) ? 'selected' : ''} list-group-item`}>
        {s}
        </option>
      }) : <p> No systems</p>
    }
    </Card>
    </Col>
    <Col sm="8">
      {SelectedSystem && <SelectedSystem />}
    </Col>
    </Row>
    </Container>
  }
} 

