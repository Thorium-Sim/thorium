import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Clamps, Ramps, Doors } from './graphics';

import './style.scss';

export default class Docking extends Component {
  constructor(props){
    super(props);
    this.state = {
      clamps: true,
      ramps: false,
      doors: false,
    }
  }
  clamps(){
    this.setState({
      clamps: !this.state.clamps
    })
  }
  ramps(){
    this.setState({
      ramps: !this.state.ramps
    })
  }
  doors(){
    this.setState({
      doors: !this.state.doors
    })
  }
  render(){
    const {clamps, ramps, doors} = this.state;
    return <Container fluid className="docking">
    <Row>
    <Col sm={5}>
    <div className="flex">
    <Button block size="lg" color="primary" onClick={this.clamps.bind(this)}>{clamps ? 'Detach' : 'Attach'} Docking Clamps</Button>
    <Button block size="lg" color="primary" onClick={this.ramps.bind(this)}>{ramps ? 'Retract' : 'Extend'} Boarding Ramps</Button>
    <Button block size="lg" color="primary" onClick={this.doors.bind(this)}>{doors ? 'Close' : 'Open'} Airlock Doors</Button>
    </div>
    </Col>
    <Col className="graphics" sm={{size: 5, offset: 2}}>
  {/*<Clamps transform={clamps} />*/}
{/*<Ramps transform={ramps} />*/}
<Doors transform={doors} />
</Col>
</Row>
</Container>
}
}