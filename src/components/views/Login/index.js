import React, { Component } from 'react';
import { Button, Row, Col, Input } from 'reactstrap';
import assetPath from '../../../helpers/assets';
import './login.scss';

class Login extends Component {
  render(){
    let simulatorName;
    if (!this.props.data.loading) simulatorName = this.props.data.simulators[0].name;
    return (
      <Row className="loginCard">
      <Col sm={{size: 3, offset: 1}}>
      <img role="presentation" src={assetPath('/Misc/Login%20Logo', 'default', 'svg', false)} className="img-fluid" />
      <h1>{simulatorName}</h1>
      </Col>
      <Col sm={{size: 7, offset: 1}}>
      <img role="presentation" src={assetPath('/Ship Views/Right', 'default', 'png', false)} className="img-fluid" />
      <Col className="loginBlock" sm={{size: 8, offset: 2}}>
      <h2>Agent Login</h2>
      <Input defaultValue={''} ref="loginField" />
      <Button block>Login</Button>
      </Col>
      </Col>
      </Row>
      );
  }
};

export default Login;
