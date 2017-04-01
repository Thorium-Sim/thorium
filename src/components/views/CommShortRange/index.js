import React, { Component } from 'react';
import { Layer, Line, Stage } from 'react-konva';
import { Card, CardImg, CardBlock, Container, Row, Col, Button } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import Measure from 'react-measure';
import assetPath from '../../../helpers/assets';
import './style.scss';

const SHORTRANGE_SUB = gql`
subscription ShortRangeCommSub($simulatorId: ID!){
  shortRangeCommUpdate(simulatorId:$simulatorId) {
    id
    simulatorId
    name
    arrows {
      id
      signal
      frequency
      connected
    }
    signals {
      id
      name
      image
      range {
        lower
        upper
      }
    }
    state
    frequency
    amplitude
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
  }
}`;
class CommShortRange extends Component {
  constructor(props){
    super(props);
    this.state = {
      frequency: 1,
      amplitude: 1,
      mouseY: 0,
      which: null,
      pointerArrow: {}
    }
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: SHORTRANGE_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ shortRangeComm: subscriptionData.data.shortRangeCommUpdate }).toJS();
        }
      });
    }
  }
  mouseDown(which, dimensions, e){
    this.setState({
      height: dimensions.height,
      top: dimensions.top,
      mouseY: e.nativeEvent.pageY,
      which
    },()=>{
      document.addEventListener('mousemove', this.mouseMove);
      document.addEventListener('mouseup', this.mouseUp);
    })
  }
  mouseMove = (e) =>{
    const {height, top, frequency} = this.state;
    const obj = {}
    const ShortRange = this.props.data.shortRangeComm[0];
    //Check to see if the arrow is within a range of a frequency;
    const threshold = 0.009;
    const arrow = ShortRange.arrows.reduce((prev, next) => {
      if (prev) return prev;
      if (next.frequency + threshold > frequency && next.frequency - threshold < frequency) {
        const signal = ShortRange.signals.find(s => s.id === next.signal);
        return {
          id: next.id,
          name: signal.name,
          image: signal.image
        }
      };
      return false;
    }, false)
    if (arrow){
      obj['pointerArrow'] = arrow;
    } else {
      obj['pointerArrow'] = {};
    }
    obj[this.state.which] = Math.max(Math.min((e.pageY - top)/height, 1), 0)
    this.setState(obj)
  }
  mouseUp = (e) => {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  }
  getSignal(){
    const ShortRange = this.props.data.shortRangeComm[0];
    const {frequency} = this.state;
    return ShortRange.signals.reduce((prev, next) => {
      if (next.range.upper > frequency && next.range.lower < frequency) return next;
      return prev;
    },{})
  }
  getHailLabel(){
    const {pointerArrow} = this.state;
    if (pointerArrow.id){
      return `Connect ${pointerArrow.name}`;
    }
    return `Hail ${this.getSignal().name || ''}`;
  }
  render(){
    if (this.props.data.loading) return null;
    const ShortRange = this.props.data.shortRangeComm[0];
    if (!ShortRange) return <p>No short range comm</p>;
    return (
      <Container fluid className="shortRangeComm">
      <Row>
      <Col sm="3" className="commControls">
      <Card>
      <div className="spacer"></div>
      {
        ShortRange.signals.map(s => (<div className={`img-container ${s.id === this.getSignal().id ? 'selected' : ''}`} style={{
          backgroundImage: `url('${assetPath(`/Comm Images/${s.image}`, 'default', 'png', false)}')`

        }}>
        <div className="spacer"></div>
        </div>))
      }
      <CardBlock>
      <div>Frequency: {Math.round(this.state.frequency * 37700 + 37700)/100} MHz</div>
      <div className="signalName">{this.getSignal.apply(this).name}</div>
      </CardBlock>
      </Card>
      <Button block color="primary">{this.getHailLabel()}</Button>
      <Button block color="default">Mute</Button>
      </Col>
      <Col sm={{size: 4, offset:1}}>
      <Card className="frequencyContainer">

      <div className="signals">
      {
        ShortRange.signals.map(s => (
          <div key={s.id} className="signal"
          style={{
            height: `${(s.range.upper - s.range.lower) * 100}%`,
            top: `${s.range.lower * 100}%`
          }}>
          {s.name}
          </div>))
      }
      </div>
      <div className="arrows">
      {
        ShortRange.arrows.map(a => (
          <Arrow
          key={a.id}
          alertLevel={this.props.simulator.alertLevel}
          level={a.frequency}
          flop={true}
          />
          ))
      }
      </div>
      <div className="bar frequencyBar"></div>
      <Measure
      includeMargin={true}>
      { dimensions => (
        <div className="arrowHolder-right">
        <Arrow 
        alertLevel={this.props.simulator.alertLevel}
        level={this.state.frequency}
        mouseDown={this.mouseDown.bind(this, 'frequency')}
        dimensions={dimensions}
        />
        </div>
        ) }
      </Measure>
      </Card>
      </Col>
      <Col sm="1">
      <div className="bar amplitudeBar"></div>
      <Measure
      includeMargin={true}>
      { dimensions => (
        <div className="arrowHolder-amplitude">
        <Arrow 
        alertLevel={this.props.simulator.alertLevel}
        level={this.state.amplitude}
        mouseDown={this.mouseDown.bind(this, 'amplitude')}
        dimensions={dimensions}
        />
        </div>
        ) }
      </Measure>
      </Col>
      <Col sm="3">
      <Card className="signalCanvas">
      <Measure
      useClone={false}
      includeMargin={false}>
      { dimensions => (
        <FrequencySignals 
        dimensions={dimensions}
        frequency={this.state.frequency}
        amplitude={this.state.amplitude}/>
        )}
      </Measure>
      </Card>
      </Col>
      </Row>
      </Container>
      );
  }
}

const SHORTRANGE_QUERY = gql`
query ShortRangeComm($simulatorId: ID!){
  shortRangeComm(simulatorId:$simulatorId) {
    id
    simulatorId
    name
    arrows {
      id
      signal
      frequency
      connected
    }
    signals {
      id
      name
      image
      range {
        lower
        upper
      }
    }
    state
    frequency
    amplitude
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
  }
}`;

const Arrow = ({alertLevel, level = 1, mouseDown = () => {}, dimensions, flop}) => {
  return <div onMouseDown={mouseDown.bind(this, dimensions)} 
  style={{height: '100%', transform: `translateY(${level * 97}%) ${flop ? 'scaleX(-1)' : ''}`}}>
  <svg version="1.1" x="0px" y="0px"
  width="45px" height="20px" viewBox="0 0 45 20" enableBackground="new 0 0 45 20">
  <polygon className={`alertFill-${alertLevel || '5'}`} points="45,11 45,20 10,20 0,11 "/>
  <polygon className={`alertFill-${alertLevel || '5'}`} points="0,9 10,0 45,0 45,9 "/>
  </svg>
  </div>
}

const sinPoints = ({frequency = 0, amplitude = 0, width, height}) => {
  let sinHeight = height * 2 * 2;
  return Array(Math.round(sinHeight))
  .fill(0)
  .map((_, i) => {
    if (i % 2 === 1) return i / 2;
    return Math.sin(i / 2 / frequency) * amplitude + (width / 2);
  })
};

const FrequencySignals = ({dimensions, frequency, amplitude}) => {
  if (dimensions.width === 0) return <div></div>;
  return <Stage width={dimensions.width} height={630}>
  <Layer>
  <Line
  points={sinPoints({frequency: Math.pow(10,1 - frequency) + 2, amplitude: amplitude * dimensions.width / 3 + 10, height: 630, width: dimensions.width})}
  stroke='green'
  strokeWidth={4}
  lineJoin="round"
  lineCap="round"
  />
  </Layer>
  </Stage>
};

export default graphql(SHORTRANGE_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CommShortRange));