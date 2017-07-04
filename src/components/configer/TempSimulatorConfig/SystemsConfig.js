import React, { Component } from 'react';
import { Col, Row, Card, Container, Input, Button } from 'reactstrap';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import systems from '../../systems';

class SystemsConfig extends Component {
  constructor(params){
    super(params);
    this.state = {
      selectedSystem: {}
    }
  }
  addSystem(){
    const {id} = this.props.selectedSimulator;
    const variables = {
      id,
      class: this.state.selectedSystem.type,
      params: JSON.stringify(this.state.selectedSystem)
    }
    const mutation = gql`
    mutation AddSystem($id: ID!, $class: String!, $params: String!) {
      addSystemToSimulator(simulatorId:$id, className:$class, params: $params )
    }`;
    this.props.client.mutate({
      mutation,
      variables
    })
    this.setState({
      selectedSystem: {}
    })
  }
  selectSystem(e){
    const {id} = this.props.selectedSimulator;
    this.setState({
      selectedSystem: {simulatorId: id, type: e.target.value, class: e.target.value}
    }) 
  }
  updateSystem(key, val){
    let {selectedSystem} = this.state;
    selectedSystem[key] = val;
    this.setState({
      selectedSystem
    })
  }
  render() {
    const sim = this.props.selectedSimulator;
    const SelectedSystem = systems[this.state.selectedSystem.type] || null;
    return <Container>
    <Row>
    <Col sm="4">
    <Input type="select" onChange={this.selectSystem.bind(this)}>
    <option value={null}>Add System</option>
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
      (sim.systems.length > 0) ? sim.systems.map(s => {
        return <li key={`${s.id}`}
        value={s}
        onClick={() => {this.setState({selectedSystem: s.id})}}  
        className={`${(s.id === this.state.selectedSystem) ? 'selected' : ''} list-group-item`}>
        {s.name}
        </li>
      }) : <p> No systems</p>
    }
    </Card>
    </Col>
    {
      SelectedSystem && <Col sm="8">
      <SelectedSystem system={this.state.selectedSystem} updateSystem={this.updateSystem.bind(this)} />
      <Button color="success" size="lg" onClick={this.addSystem.bind(this)}>Add System</Button>
      </Col>
    }
    </Row>
    </Container>
  }
} 

export default withApollo(SystemsConfig);

