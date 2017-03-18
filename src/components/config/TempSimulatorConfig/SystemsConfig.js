import React, { Component } from 'react';
import { Col, Row, Card, Container, Input, Button, ButtonGroup, FormGroup, Label } from 'reactstrap';
import systems from '../../systems';

export default class SystemsConfig extends Component {
  constructor(params){
    super(params);
    this.state = {
      selectedSystem: null
    }
  }
  render() {
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
        {/*<Input type="select">
    {
      Object.keys(systems).map(s => {
        return <option key={`${s}-system`}
        value={s}
        onClick={() => {this.setState({selectedSystem: s})}}  
        className={`${(s === this.state.selectedSystem) ? 'selected' : ''} list-group-item`}>
        {s}
        </option>
      })
    }
    </Input>*/}
    </Col>
    <Col sm="8">
      {SelectedSystem && <SelectedSystem />}
    </Col>
    </Row>
    </Container>
  }
} 

