import React, {Component} from 'react';
import Draggable from 'react-draggable';
import { Button, Row, Col } from 'reactstrap';

const ChargeBar = (props) => {
  return (
    <div className="chargeBar" style={{height: `${props.charge * 100}%`}} />
    );
}

export default class Target extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTarget: null,
    }
  }
  render(){
    return (
      <div>
      <Row>
      <h2 style={{color: 'yellow', width: '100%', textAlign: 'center', opacity:this.state.selectedTarget ? 1 : 0}}>Transport Possible</h2>
      </Row>
      <Row>
      <Col className="targetBox" sm={{size: 4, offset: 1}}>
      {this.props.targets.map((target) => {
        console.log(target);
        return <img
        key={target.id}
        draggable="false"
        role="presentation"
        src={require('./crosstarget.svg')}
        style={{position: 'absolute', left: `${target.position.x * 90}%`, top: `${target.position.y * 90}%`}} />
      })}
      <Draggable
      bounds=".targetBox"
      onDrag={(event,obj) => {
        const {clientWidth, clientHeight} = event.target.parentElement;
        const {x, y} = obj;
        let selectedTarget = null
        this.props.targets.forEach((target) => {
          const {x: objX, y: objY} = target.position;
          if (Math.round((objX - x/clientWidth*1.11111) * 100) === 0 && Math.round((objY - y/clientHeight*1.11111) * 100) === 0){
            // The crosshair is on top of a target
            selectedTarget = target;
          }
        })
        this.setState({
          selectedTarget,
        })
      }}
      >
      <img draggable="false" role="presentation" src={require('./crosshairs.svg')} />
      </Draggable>

      </Col>
      <Col className="chargeBox" sm={{size: 4, offset: 2}}>
      <ChargeBar charge={0.5} />
      <ChargeBar charge={0.5} />
      <ChargeBar charge={0.5} />
      </Col>
      </Row>
      <Row>
      <Col sm={{size: 4, offset: 4}}>
      <div style={{height: '30px'}} />
      <Button block color={'warning'} onClick={this.props.cancelTransport}>Cancel Transport</Button>
      </Col>
      </Row>
      </div>
      );
  }
}