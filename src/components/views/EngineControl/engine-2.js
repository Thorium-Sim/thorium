import React from 'react';
import { Row, Button, Col } from 'reactstrap';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import HeatBar from './heatbar';
import DamageOverlay from '../helpers/DamageOverlay';

export default withApollo((props) => {
  const {engines, setSpeed} = props;
  const applyCoolant = (id) => {
    const mutation = gql`
    mutation CoolEngine($id: ID!, $state: Boolean){
      engineCool(id: $id, state: $state)
    }`;
    const variables = {
      id,
      state: true
    }
    props.client.mutate({
      mutation,
      variables
    });
    document.addEventListener('mouseup', stopCoolant.bind(this, id));
  }
  const stopCoolant = (id) => {
    const mutation = gql`
    mutation CoolEngine($id: ID!, $state: Boolean){
      engineCool(id: $id, state: $state)
    }`;
    const variables = {
      id: id,
      state: false
    }
    props.client.mutate({
      mutation,
      variables
    })
  }
  return <Row>
  <Col>
  {engines[0].speeds.map((speed, speedIndex) => {
    let speedWord = speed;
    if (typeof speed === "object"){
      speedWord = speed.text;
    }
    return <Button disabled={engines[0].damage.damaged} key={`speed-${speedIndex}`} color="primary" block className="speedBtn" onClick={() => {setSpeed(engines[0],speedIndex,engines,0);}}>{speedWord}</Button>;
  })}
  <DamageOverlay system={engines[0]} message={`${engines[0].name} Engines Offline`} />
  </Col>
  <Col sm={2}>
  <Row>
  <Col sm={6}>
  <HeatBar label="Heat" background="linear-gradient(to bottom, #440000 0%,#aa0000 50%,#440000 100%)" level={engines[0].heat}/>
  </Col>
  <Col sm={6}>
  <HeatBar label="Coolant" background="linear-gradient(to bottom, #004488 0%,#0088aa 50%,#004488 100%)" level={engines[0].coolant}/>
  </Col>
  </Row>
  <Row>
  <Col lg={{size: 10, offset: 1}} xl={{size: 8, offset: 2}}>
  <Button block color="info" onMouseDown={applyCoolant.bind(this, engines[0].id)} >Coolant</Button>
  </Col>
  </Row>
  </Col>
  <Col>

  </Col>
  <Col sm={2}>
  <Row>
  <Col sm={6}>
  <HeatBar label="Heat" background="linear-gradient(to bottom, #440000 0%,#aa0000 50%,#440000 100%)" level={engines[1].heat}/>
  </Col>
  <Col sm={6}>
  <HeatBar label="Coolant" background="linear-gradient(to bottom, #004488 0%,#0088aa 50%,#004488 100%)" level={engines[1].coolant}/>
  </Col>
  </Row>
  <Row>
  <Col lg={{size: 10, offset: 1}} xl={{size: 8, offset: 2}}>
  <Button block color="info" onMouseDown={applyCoolant.bind(this, engines[1].id)} >Coolant</Button>
  </Col>
  </Row>
  </Col>
  <Col>
  {engines[1].speeds.map((speed, speedIndex) => {
    let speedWord = speed;
    if (typeof speed === "object"){
      speedWord = speed.text;
    }
    return <Button disabled={engines[1].damage.damaged} key={`speed-${speedIndex}`} color="primary" block className="speedBtn" onClick={() => {setSpeed(engines[1],speedIndex,engines,1);}}>{speedWord}</Button>;
  })}
  <DamageOverlay system={engines[1]} message={`${engines[1].name} Engines Offline`} />
  </Col>
  </Row>;
})