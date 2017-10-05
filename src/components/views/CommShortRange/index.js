import React, { Component } from "react";
import { Layer, Line, Stage } from "react-konva";
import { Card, CardBlock, Container, Row, Col, Button } from "reactstrap";
import gql from "graphql-tag";
import tinycolor from "tinycolor2";
import { graphql, withApollo } from "react-apollo";
import Immutable from "immutable";
import Measure from "react-measure";
import assetPath from "../../../helpers/assets";
import DamageOverlay from "../helpers/DamageOverlay";
import { findDOMNode } from "react-dom";
import "./style.scss";

const SHORTRANGE_SUB = gql`
  subscription ShortRangeCommSub($simulatorId: ID!) {
    shortRangeCommUpdate(simulatorId: $simulatorId) {
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
        color
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
  }
`;
function transparentColor(col) {
  var color = tinycolor(col);
  color.setAlpha(0.1);
  return color.toRgbString();
}
class CommShortRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: 1,
      amplitude: 1,
      mouseY: 0,
      which: null
    };
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
          return returnResult
            .merge({
              shortRangeComm: subscriptionData.data.shortRangeCommUpdate
            })
            .toJS();
        }
      });
    }
    //Update the state based on the props
    if (!nextProps.data.loading) {
      const ShortRange = nextProps.data.shortRangeComm[0];
      this.setState({
        frequency: ShortRange.frequency,
        amplitude: ShortRange.amplitude
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  mouseDown(which, dimensions, e) {
    this.setState(
      {
        height: dimensions.height,
        top: dimensions.top,
        mouseY: e.nativeEvent.pageY,
        which
      },
      () => {
        document.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mouseup", this.mouseUp);
      }
    );
  }
  mouseMove = e => {
    const ShortRange = this.props.data.shortRangeComm[0];
    if (ShortRange.state === "hailing") {
      return;
    }
    const { height, top } = this.state;
    const obj = {};
    obj[this.state.which] = Math.max(Math.min((e.pageY - top) / height, 1), 0);
    this.setState(obj);
  };
  mouseUp = e => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    this.commUpdate({
      frequency: this.state.frequency,
      amplitude: this.state.amplitude
    });
  };
  getPointerArrow(nextProps) {
    //Check to see if the arrow is within a range of a frequency;
    let ShortRange;
    if (nextProps) {
      ShortRange = nextProps.data.shortRangeComm[0];
    } else {
      ShortRange = this.props.data.shortRangeComm[0];
    }
    const { frequency } = this.state;
    const threshold = 0.009;
    const arrow = ShortRange.arrows.reduce((prev, next) => {
      if (prev) return prev;
      if (
        next.frequency + threshold > frequency &&
        next.frequency - threshold < frequency
      ) {
        const signal = ShortRange.signals.find(s => s.id === next.signal);
        return {
          id: next.id,
          connected: next.connected,
          name: signal ? signal.name : "",
          image: signal && signal.image
        };
      }
      return false;
    }, false);
    if (arrow) {
      return arrow;
    } else {
      return {};
    }
  }
  getSignal() {
    const ShortRange = this.props.data.shortRangeComm[0];
    const { frequency } = this.state;
    return ShortRange.signals.reduce((prev, next) => {
      if (next.range.upper > frequency && next.range.lower < frequency)
        return next;
      return prev;
    }, {});
  }
  commUpdate(updateObj) {
    const ShortRange = this.props.data.shortRangeComm[0];
    const mutation = gql`
      mutation CommUpdate($id: ID!, $commUpdateInput: CommUpdateInput!) {
        commUpdate(id: $id, commUpdateInput: $commUpdateInput)
      }
    `;
    const variables = {
      id: ShortRange.id,
      commUpdateInput: updateObj
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  commHail() {
    const pointerArrow = this.getPointerArrow();
    const ShortRange = this.props.data.shortRangeComm[0];
    let variables = {
      id: ShortRange.id
    };
    let mutation;
    if (pointerArrow.id) {
      variables = {
        id: ShortRange.id,
        arrowId: pointerArrow.id
      };
      if (pointerArrow.connected) {
        mutation = gql`
          mutation CommDisconnectArrow($id: ID!, $arrowId: ID!) {
            commDisconnectArrow(id: $id, arrowId: $arrowId)
          }
        `;
      } else {
        mutation = gql`
          mutation CommConnectArrow($id: ID!, $arrowId: ID!) {
            commConnectArrow(id: $id, arrowId: $arrowId)
          }
        `;
      }
    } else if (ShortRange.state === "hailing") {
      mutation = gql`
        mutation CancelHail($id: ID!) {
          cancelHail(id: $id)
        }
      `;
    } else {
      mutation = gql`
        mutation CommHail($id: ID!) {
          commHail(id: $id)
        }
      `;
    }
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render() {
    const getHailLabel = () => {
      const pointerArrow = this.getPointerArrow();
      const ShortRange = this.props.data.shortRangeComm[0];
      if (pointerArrow.id) {
        if (pointerArrow.connected) {
          return `Disconnect ${pointerArrow.name}`;
        }
        return `Connect ${pointerArrow.name}`;
      } else if (ShortRange.state === "hailing") {
        return `Cancel Hail`;
      }
      return `Hail ${this.getSignal().name || ""}`;
    };
    if (this.props.data.loading) return null;
    const ShortRange = this.props.data.shortRangeComm[0];
    if (!ShortRange) return <p>No short range comm</p>;
    return (
      <Container fluid className="shortRangeComm">
        <DamageOverlay
          message="Short Range Communications Offline"
          system={ShortRange}
          style={{ left: "-2.5%", width: "105%", height: "105%" }}
        />
        <Row>
          <Col lg="4" xl="3" className="commControls">
            <Card>
              <div className="spacer" />
              {ShortRange.signals.map(s =>
                <div
                  className={`img-container ${s.id === this.getSignal().id
                    ? "selected"
                    : ""}`}
                  style={{
                    backgroundImage: `url('${assetPath(
                      `/Comm Images/${s.image}`,
                      "default",
                      "png",
                      false
                    )}')`
                  }}
                >
                  <div className="spacer" />
                </div>
              )}
              <CardBlock>
                <div>
                  Frequency:{" "}
                  {Math.round(this.state.frequency * 37700 + 37700) / 100} MHz
                </div>
                <div className="signalName">
                  {this.getSignal.apply(this).name}
                </div>
              </CardBlock>
            </Card>
            <Button
              size="lg"
              onClick={this.commHail.bind(this)}
              block
              color="primary"
            >
              {getHailLabel()}
            </Button>
          </Col>
          <Col lg={{ size: 4, offset: 1 }}>
            <Card className="frequencyContainer">
              <div className="signals">
                {ShortRange.signals.map(s =>
                  <div
                    key={s.id}
                    className="signal"
                    style={{
                      height: `${(s.range.upper - s.range.lower) * 100}%`,
                      top: `${s.range.lower * 100}%`,
                      backgroundColor: transparentColor(s.color)
                    }}
                  >
                    {s.name}
                  </div>
                )}
              </div>
              <div className="arrows">
                {ShortRange.arrows.map(a =>
                  <Arrow
                    key={a.id}
                    alertLevel={this.props.simulator.alertLevel}
                    level={a.frequency}
                    flop={true}
                    connected={a.connected}
                  />
                )}
              </div>
              <div className="bar frequencyBar" />
              <Measure includeMargin={true}>
                {dimensions =>
                  <div className="arrowHolder-right">
                    <Arrow
                      alertLevel={this.props.simulator.alertLevel}
                      level={this.state.frequency}
                      mouseDown={this.mouseDown.bind(this, "frequency")}
                      dimensions={dimensions}
                    />
                  </div>}
              </Measure>
            </Card>
          </Col>
          {/*<Col sm="1">
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
    </Col>*/}
          <Col sm="3">
            <Card className="signalCanvas">
              <Measure useClone={false} includeMargin={false}>
                {dimensions =>
                  <FrequencySignals
                    dimensions={dimensions}
                    frequency={this.state.frequency}
                    amplitude={this.state.amplitude}
                  />}
              </Measure>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const SHORTRANGE_QUERY = gql`
  query ShortRangeComm($simulatorId: ID!) {
    shortRangeComm(simulatorId: $simulatorId) {
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
        color
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
  }
`;

const Arrow = ({
  alertLevel,
  level = 1,
  mouseDown = () => {},
  dimensions,
  flop,
  connected
}) => {
  return (
    <div
      onMouseDown={mouseDown.bind(this, dimensions)}
      style={{
        height: "100%",
        transform: `translateY(${level * 97}%) ${flop ? "scaleX(-1)" : ""}`
      }}
    >
      <svg
        version="1.1"
        x="0px"
        y="0px"
        width="45px"
        height="20px"
        viewBox="0 0 45 20"
        enableBackground="new 0 0 45 20"
      >
        <polygon
          className={`alertFill-${alertLevel || "5"} ${connected
            ? "connected"
            : ""}`}
          points="45,11 45,20 10,20 0,11 "
        />
        <polygon
          className={`alertFill-${alertLevel || "5"} ${connected
            ? "connected"
            : ""}`}
          points="0,9 10,0 45,0 45,9 "
        />
      </svg>
    </div>
  );
};

const sinPoints = ({ frequency = 0, amplitude = 0, width, height }) => {
  let sinHeight = height * 2 * 2;
  return Array(Math.round(sinHeight)).fill(0).map((_, i) => {
    if (i % 2 === 1) return i / 2;
    return Math.sin(i / 2 / frequency) * amplitude + width / 2;
  });
};

class FrequencySignals extends Component {
  state = {};
  componentDidMount() {
    const el = findDOMNode(this);
    this.setState({
      height: el.parentElement.getBoundingClientRect().height
    });
  }
  render() {
    const { dimensions, frequency, amplitude } = this.props;
    const height = this.state.height || 0;
    if (dimensions.width === 0) return <div />;
    return (
      <Stage width={dimensions.width} height={height}>
        <Layer>
          <Line
            points={sinPoints({
              frequency: Math.pow(10, 1 - frequency) + 2,
              amplitude: amplitude * dimensions.width / 3 + 10,
              height: height,
              width: dimensions.width
            })}
            stroke="green"
            strokeWidth={4}
            lineJoin="round"
            lineCap="round"
          />
        </Layer>
      </Stage>
    );
  }
}

export default graphql(SHORTRANGE_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CommShortRange));
