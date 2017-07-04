import React, {Component} from 'react';
import { Container, Row, Col, Card, Input } from 'reactstrap';

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
class Systems extends Component {
  state = {}
  selectProperty = (name) => {
    this.setState({
      selectedProperty: name
    })
  }
  render() {
    const {selectedProperty} = this.state;
    return <Container fluid>
    <Row>
    <Col sm={3}>
    <Card className="scroll">
    {properties.map(p => <li key={p.name} 
      onClick={() => {this.selectProperty(p.name)}}
      className={`list-group-item ${selectedProperty === p.name ? 'selected' : ''}`}><label>{!p.config && <Input type="checkbox" className="system-checkbox" onClick={(e) => {this.toggleSystem(e, p)}} /> } {p.name}</label> </li>)}
    </Card>
    </Col>
    </Row>
    </Container>
  }
}

export default Systems;