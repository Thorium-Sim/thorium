import React from 'react';
import { Row, Button, Col } from 'reactstrap';
import HeatBar from './heatbar';
import DamageOverlay from '../helpers/DamageOverlay';

export default (props) => {
    const {engines, setSpeed} = props;
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
    <HeatBar label="Coolant" background="linear-gradient(to bottom, #004400 0%,#00aa00 50%,#004400 100%)" level={engines[0].coolant}/>
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
    <HeatBar label="Coolant" background="linear-gradient(to bottom, #004400 0%,#00aa00 50%,#004400 100%)" level={engines[1].coolant}/>
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
}