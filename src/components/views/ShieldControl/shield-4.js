import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import assetPath from '../../../helpers/assets';
import shieldStyle from './shieldStyle';
import DamageOverlay from '../helpers/DamageOverlay';

const ShieldData = ({shields, startLoop, state, _toggleShields}) => {
  return <Col sm="6" key={shields.id} className="shieldControlBox">
  <DamageOverlay system={shields} message={`${shields.name} Shields Offline`} style={{fontSize: '30px'}} />
  <h4>{shields.name}</h4>
  <h5>Integrity: {`${Math.round(shields.integrity * 100)}%`}</h5>
  <h5>Frequency:</h5>
  <Row>
  <Col sm="auto">
  <h4>
  <FontAwesome name="arrow-down" onMouseDown={startLoop.bind(this, 'down', shields)} /></h4>
  </Col>
  <Col sm="6">
  <h5 className="text-center">{`${Math.round(state.frequency[shields.id] * 100)/100} MHz`}</h5>
  </Col>
  <Col sm="auto">
  <h4>
  <FontAwesome name="arrow-up" onMouseDown={startLoop.bind(this, 'up', shields)} /></h4>
  </Col>
  </Row>
  <Button color="success" block onClick={_toggleShields.bind(this, shields)}>{`${shields.state ? "Lower" : "Raise"} ${shields.name} Shields`}</Button>
  </Col>
}

export default ({shields, startLoop, state, _toggleShields}) => {
  return <Container fluid className="shields">
  <Row>
  <Col sm="6">
  <div className="shieldBubble" style={{boxShadow: shieldStyle(shields)}}>
  <img role="presentation" className="mw-100 ccw-90 shieldImage" draggable="false" src={assetPath('/Ship Views/Top', 'default', 'png', false)} />
  </div>
  </Col>
  <Col style={{marginTop: '50px'}} sm={{size: 5, offset: 1}}>
  <Row>
  {shields.map(s => {
    return <ShieldData shields={s} startLoop={startLoop} state={state} _toggleShields={_toggleShields} />
  })}
  <Row style={{marginTop: '20px'}}>
  <Col sm={{size: 6}}>
  <Button color="success" block onClick={_toggleShields.bind(this, 'down')}>Lower All Shields</Button>
  </Col>
  <Col sm={{size: 6}}>
  <Button color="success" block onClick={_toggleShields.bind(this, 'up')}>Raise All Shields</Button>
  </Col>
  </Row>
  </Row>
  </Col>
  </Row>
  </Container>
}