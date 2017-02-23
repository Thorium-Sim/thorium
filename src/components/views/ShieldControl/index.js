import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Container, Row, Col, Button } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import FontAwesome from 'react-fontawesome';
import assetPath from '../../../helpers/assets';
import './style.scss';

const SHIELD_SUB = gql`
subscription ShieldSub{
  shieldsUpdate {
    id
    name
    state
    position
    frequency
    integrity
    simulatorId
  }
}`;
class ShieldControl extends Component {
  constructor(props){
    super(props);
    this.state = {
      frequency: 258.0,
      frequencyAdder: 0.1,
      frequencySpeed: 250
    }
    this.shieldSub = null;
    this.freqLoop = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.shieldSub && !nextProps.data.loading) {
      this.shieldSub = nextProps.data.subscribeToMore({
        document: SHIELD_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({shields: subscriptionData.data.shieldsUpdate}).toJS();
        }
      });
    }
    if (nextProps.data.shields) {
      if (nextProps.data.shields[0]){
        if (nextProps.data.shields[0].frequency) {
          this.setState({
            frequency: nextProps.data.shields[0].frequency
          })
        }
      }
    }
  }
  _toggleShields(){
    let mutation;
    let variables = {id: this.props.data.shields[0].id};
    if (this.props.data.shields[0].state){
      mutation = gql`
      mutation ToggleShields($id: ID!){
        shieldLowered(id: $id)
      }`;
    } else {
      mutation = gql`
      mutation ToggleShields($id: ID!){
        shieldRaised(id: $id)
      }`;
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  shieldColor({state, integrity}) {
    if (!state) return 'rgb(0,0,0)';
    let red = 0;
    let green = 0;
    let blue = 0;
    if (integrity <= 0.33){
      red = integrity * 3 * 255;
    }
    if (integrity > 0.33 && integrity <= 0.66) {
      red = 255;
      green = (integrity - .33) * 3 * 255;
    }
    if (integrity > 0.66) {
      red = (255 - (integrity * 255));
      green = (255 - (integrity * 128));
      blue = integrity * 255;
    }
    return `rgb(${Math.round(red)},${Math.round(green)},${Math.round(blue)})`;
  }
  _loop(which){
    let {frequency,frequencyAdder, frequencySpeed} = this.state;
    if (which === 'down') {
      frequencyAdder *= -1;
    }
    if (frequencySpeed > 10){
      frequencySpeed -= 5;
    }
    frequency += frequencyAdder;
    if (frequency <= 100){
      this.setState({
        frequency: 100,
      })
    } else if (frequency >= 350){
      this.setState({
        frequency: 350,
      })
    } else {
      this.setState({
        frequency,
        frequencySpeed
      })
      this.freqLoop = setTimeout(this._loop.bind(this, which),this.state.frequencySpeed);
    }
  }
  startLoop(which, shields){
    this.setState({
      frequency: shields.frequency,
      frequencySpeed: 250
    })
    document.addEventListener('mouseup', this.stopLoop.bind(this, shields));
    this.freqLoop = setTimeout(this._loop.bind(this, which),this.state.frequencySpeed);
  }
  stopLoop(shields){
    clearTimeout(this.freqLoop);
    // Update the server with the shield frequency
    const mutation = gql`mutation SetShieldFrequency($id: ID!, $freq: Float){
      shieldFrequencySet(id: $id, frequency: $freq)
    }`;
    const variables = {
      id: shields.id,
      freq: this.state.frequency
    }
    this.props.client.mutate({
      mutation,
      variables
    })
    this.freqLoop = null;
  }
  render(){
    //Define the color

    if (this.props.data.loading) return null;
    const shields = this.props.data.shields;
    if (shields.length === 1) {
      const s = shields[0];
      const color = this.shieldColor(s);
      return <Container className="shields">
      <Row>
      <Col sm="7">
      <img role="presentation" className="mw-100 ccw-90 shieldImage" style={{filter: `drop-shadow(${color} 0px 0px 30px)`}} draggable="false" src={assetPath('/Ship Views/Top', 'default', 'png', false)} />
      </Col>
      <Col style={{marginTop: '100px'}} sm={{size: 4, offset: 1}}>
      <h2>Integrity:</h2>
      <h1>{`${Math.round(s.integrity * 100)}%`}</h1>
      <h2>Frequency:</h2>
      <Row>
      <Col sm="auto">
      <h1>
      <FontAwesome name="arrow-down" onMouseDown={this.startLoop.bind(this, 'down', s)} /></h1>
      </Col>
      <Col sm="7">
      <h2 className="text-center">
      {`${Math.round(this.state.frequency * 100)/100} MHz`}</h2>
      </Col>
      <Col sm="auto">
      <h1>
      <FontAwesome name="arrow-up" onMouseDown={this.startLoop.bind(this, 'up', s)} /></h1>
      </Col>
      </Row>
      <Button color="success" size="lg" block onClick={this._toggleShields.bind(this)}>{`${s.state ? "Lower" : "Raise"} Shields`}</Button>
      </Col>
      </Row>
      </Container>
    }
    if (shields.length === 4) {
            const color = this.shieldColor(shields[0]);
      return <Container fluid className="shields">
      <Row>
      <Col sm="6">
      <img role="presentation" className="mw-100 ccw-90 shieldImage" style={{filter: `drop-shadow(${color} 0px 0px 30px)`}} draggable="false" src={assetPath('/Ship Views/Top', 'default', 'png', false)} />
      </Col>
      <Col style={{marginTop: '50px'}} sm={{size: 5, offset: 1}}>
      <Row>
      {shields.map(s => {
        return <Col sm="6" className="shieldControlBox">
        <h4>{s.name}</h4>
        <h5>Integrity: {`${Math.round(s.integrity * 100)}%`}</h5>
        <h5>Frequency:</h5>
        <Row>
        <Col sm="auto">
        <h4>
        <FontAwesome name="arrow-down" onMouseDown={this.startLoop.bind(this, 'down', s)} /></h4>
        </Col>
        <Col sm="6">
        <h5 className="text-center">{`${Math.round(this.state.frequency * 100)/100} MHz`}</h5>
        </Col>
        <Col sm="auto">
        <h4>
        <FontAwesome name="arrow-up" onMouseDown={this.startLoop.bind(this, 'up', s)} /></h4>
        </Col>
        </Row>
        <Button color="success" block onClick={this._toggleShields.bind(this)}>{`${s.state ? "Lower" : "Raise"} ${name} Shields`}</Button>
        </Col>
      })}
      </Row>
      </Col>
      </Row>
      </Container>
    }
    if (shields.length === 6) {
      const color = this.shieldColor(shields[0]);
      return <Container fluid className="shields">
      <Row>
      <Col sm="6">
      <Row>
      <Col sm={{size: 9, offset: 2}}>
      <img role="presentation" className="mw-100 shieldImage" style={{filter: `drop-shadow(${color} 0px 0px 30px)`}} draggable="false" src={assetPath('/Ship Views/Top', 'default', 'png', false)} />
      </Col>
      </Row>
      <Row>
      <Col sm="12">
            <img role="presentation" className="mw-100 shieldImage" style={{filter: `drop-shadow(${color} 0px 0px 30px)`}} draggable="false" src={assetPath('/Ship Views/Right', 'default', 'png', false)} />
      </Col>
      </Row>
      </Col>
      <Col style={{marginTop: '10px'}} sm={{size: 5, offset: 1}}>
      <Row>
      {shields.map(s => {
        return <Col sm="6" className="shieldControlBox">
        <h4>{s.name}</h4>
        <h5>Integrity: {`${Math.round(s.integrity * 100)}%`}</h5>
        <h5>Frequency:</h5>
        <Row>
        <Col sm="auto">
        <h4>
        <FontAwesome name="arrow-down" onMouseDown={this.startLoop.bind(this, 'down', s)} /></h4>
        </Col>
        <Col sm="6">
        <h5 className="text-center">{`${Math.round(this.state.frequency * 100)/100} MHz`}</h5>
        </Col>
        <Col sm="auto">
        <h4>
        <FontAwesome name="arrow-up" onMouseDown={this.startLoop.bind(this, 'up', s)} /></h4>
        </Col>
        </Row>
        <Button color="success" block onClick={this._toggleShields.bind(this)}>{`${s.state ? "Lower" : "Raise"} ${name} Shields`}</Button>
        </Col>
      })}
      </Row>
      </Col>
      </Row>
      </Container>
   }
   return 'Invalid Shield Configuration';
 }
}

const SHIELD_QUERY = gql`
query Shields($simulatorId: ID!){
  shields(simulatorId: $simulatorId) {
    id
    name
    state
    position
    frequency
    integrity
    simulatorId
  }
}`;
export default graphql(SHIELD_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(ShieldControl));
