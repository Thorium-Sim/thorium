import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import SimulatorConfig from './SimulatorConfig';
//import StationsConfig from './StationsConfig';
import SystemsConfig from './SystemsConfig';
let simObjs = [
{
  name: "Simulator",
  component: SimulatorConfig
},
{
  name: "Stations",
},
{
  name: "Systems",
  component: SystemsConfig
},
{
  name: "Decks",
},
{
  name: "Rooms",
},
{
  name: "Hallways",
},
{
  name: "Inventory",
},
{
  name: "Crew",
},
];


class TempSimulatorConfig extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    if (this.props.data.loading) return null;
    const selectedSimObj = simObjs.find(o => o.name === this.state.selectedSimObj) || {};
    const SimObjComp = selectedSimObj.component ? selectedSimObj.component : 'div';
    return <Container>
    <h4>Template Simulator Config</h4>
    {!this.state.selectedSimulator ? <Row>
      <Col sm="3">
      {this.props.data.simulators.map((e) => {
        return <li key={e.id}
        onClick={() => {this.setState({selectedSimulator: e.id})}}  
        className={`${(e.id === this.state.selectedSimulator) ? 'selected' : ''} list-group-item`}>
        {e.name}
        </li>;
      })}
      </Col>
      </Row>
      : 
      <Row>
      <Col sm="3">
      <a href="#" onClick={() => {this.setState({selectedSimObj: null, selectedSimulator: null})}}>Go Back</a>
      <Card className="scroll">
      {simObjs.map((o, i) => {
        return <li 
        key={`${o.name}`} 
        onClick={() => {this.setState({selectedSimObj: o.name})}}  
        className={`${(o.name === this.state.selectedSimObj) ? 'selected' : ''} list-group-item`}>
        {o.name}
        </li>;
      })}
      </Card>
      </Col>
      <Col sm="6">
      {SimObjComp === 'div' ? <SimObjComp /> :
      <SimObjComp selectedSimulator={this.props.data.simulators.find(s => s.id === this.state.selectedSimulator) || {}}/>
    }
    </Col>

    </Row>
  }
  </Container>
}
}
const SimulatorConfigData = gql `
query Simulators{
  simulators(template: true){
    id
    name
    alertlevel
    layout
    template
  }
}
`;

export default graphql(SimulatorConfigData, {})(withApollo(TempSimulatorConfig));
