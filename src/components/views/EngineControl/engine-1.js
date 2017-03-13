import React from 'react';
import { Button, Col } from 'reactstrap';
import HeatBar from './heatbar';

export default (props) => {
const {engines} = props;
return <div>
    <Col>
    {engines[0].speeds.map((speed, speedIndex) => {
      let speedWord = speed;
      if (typeof speed === "object"){
        speedWord = speed.text;
    }
    return <Button key={`${speed.text}-${speedIndex}`} block color="primary" className="speedBtn">{speedWord}</Button>;
})}
    </Col>
    <Col>
    <Col>
    <HeatBar label="Heat" background="linear-gradient(to bottom, #440000 0%,#AA0000 50%,#440000 100%)" level={engines[0].heat}/>
    </Col>
    <Col>
    <HeatBar label="Coolant" background="linear-gradient(to bottom, #004400 0%,#00AA00 50%,#004400 100%)" level={engines[0].coolant}/>
    </Col>
    </Col>
    <Col>

    </Col>
    </div>
}