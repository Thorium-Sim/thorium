import React, {Component} from 'react';
import { Container, Row, Col, Card, Input } from 'reactstrap';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import * as Configs from './systemsConfig'
const properties = [
{name: 'LongRangeComm'},
{name: 'InternalComm'},
{name: 'ShortRangeComm'},
{name: 'Engine', config: true},
{name: 'Thrusters'},
{name: 'Navigation'},
{name: 'Sensors', config: true},
{name: 'Probes'},
{name: 'TractorBeam'},
{name: 'Transporters'},
{name: 'Reactor', config: true},
{name: 'StealthField'},
{name: 'Shield', config: true},
{name: 'Targeting'},
{name: 'Phasers'},
{name: 'Torpedo'},
{name: 'Coolant'},
]

const ops = {
  addSystem: gql`mutation AddSystemToSimulator($id: ID!, $type: String!) {
    addSystemToSimulator(simulatorId: $id, className: $type, params: "{}")
  }`,
  removeSystem: gql`mutation RemoveSystem($id: ID, $type: String) {
    removeSystemFromSimulator(simulatorId: $id, type: $type)
  }`,
}
class Systems extends Component {
  state = {}
  selectProperty = (name) => {
    this.setState({
      selectedProperty: name
    })
  }
  toggleSystem = (e, {name}) => {
    const mutation = e.target.checked ? ops.addSystem : ops.removeSystem;
    const variables = {
      id: this.props.selectedSimulator.id,
      type: name
    }
    this.props.client.mutate({
      mutation,
      variables,
      refetchQueries: ['System', 'ShortRangeComm', 'Phasers']
    })
  }
  render() {
    const {selectedProperty} = this.state;
    const {selectedSimulator} = this.props;
    const SystemConfig = selectedProperty ? (Configs[selectedProperty] || Configs.Generic) : () => {};
    return <Container fluid>
    <Row>
    <Col sm={3}>
    <Card className="scroll">
    {properties.map(p => <li key={p.name} 
      onClick={() => {this.selectProperty(p.name)}}
      className={`list-group-item ${selectedProperty === p.name ? 'selected' : ''}`}>
      {!p.config && <Input type="checkbox" className="system-checkbox" defaultChecked={selectedSimulator.systems.find(sys => sys.type === p.name)} onChange={(e) => {this.toggleSystem(e, p)}} /> } 
      <label>
      {p.name}
      </label>
      </li>)}
    </Card>
    </Col>
    <Col sm={9}>
    {selectedProperty && <SystemConfig client={this.props.client} simulatorId={selectedSimulator.id} type={selectedProperty} />}
    </Col>
    </Row>
    </Container>
  }
}




export default withApollo(Systems);