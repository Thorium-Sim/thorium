import React, { Component } from "react";
import { Card, CardBody, Container, Row, Col, Button } from "reactstrap";
import gql from "graphql-tag";
import tinycolor from "tinycolor2";
import { graphql, withApollo } from "react-apollo";
import Measure from "react-measure";
import Tour from "reactour";
import assetPath from "../../../helpers/assets";
import DamageOverlay from "../helpers/DamageOverlay";
import Arrow from "./arrow";
import FrequencySignals from "./frequency";
import "./style.css";

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

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "This screen allows you to connect to radio frequencies. These frequencies allow you to communicate vocally with people in other starships."
  },
  {
    selector: ".frequencyContainer",
    content:
      "Here are the frequency bands that you can transmit on. The arrow on the right is the current frequency you are broadcasting on. You can click and drag that arrow to change the frequency."
  },
  {
    selector: ".frequencyContainer",
    content:
      "On the left side are arrows from people who are trying to contact you. Drag your arrow next to the other arrows to connect to them. You can connect to multiple arrows at the same time to have concurrent conversations."
  },
  {
    selector: ".hail-button",
    content:
      "Click this button to hail, or start a call; to connect to another person's call; and to disconnect from the current call. To disconnect, you must drag your arrow on top of an already-connected arrow."
  }
];

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
          return Object.assign({}, previousResult, {
            shortRangeComm: subscriptionData.data.shortRangeCommUpdate
          });
        }
      });
    }
    //Update the state based on the props
    if (!nextProps.data.loading && nextProps.data.shortRangeComm) {
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
  mouseUp = () => {
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
    }
    return {};
  }
  getSignal() {
    const ShortRange = this.props.data.shortRangeComm[0];
    const { frequency } = this.state;
    return ShortRange.signals.reduce((prev, next) => {
      if (next.range.upper > frequency && next.range.lower < frequency) {
        return next;
      }
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
    if (this.props.data.loading || !this.props.data.shortRangeComm) return null;
    const ShortRange =
      this.props.data.shortRangeComm && this.props.data.shortRangeComm[0];
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
              {ShortRange.signals.map(s => (
                <div
                  key={s.id}
                  className={`img-container ${
                    s.id === this.getSignal().id ? "selected" : ""
                  }`}
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
              ))}
              <CardBody>
                <div>
                  Frequency:{" "}
                  {Math.round(this.state.frequency * 37700 + 37700) / 100} MHz
                </div>
                <div className="signalName">
                  {this.getSignal.apply(this).name}
                </div>
              </CardBody>
            </Card>
            <Button
              className="hail-button"
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
                {ShortRange.signals.map(s => (
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
                ))}
              </div>
              <div className="arrows">
                {ShortRange.arrows.map(a => (
                  <Arrow
                    key={a.id}
                    alertLevel={this.props.simulator.alertLevel}
                    level={a.frequency}
                    flop={true}
                    connected={a.connected}
                  />
                ))}
              </div>
              <div className="bar frequencyBar" />
              <Measure
                bounds
                onResize={contentRect => {
                  this.setState({ dimensions: contentRect.bounds });
                }}
              >
                {({ measureRef }) => (
                  <div ref={measureRef} className="arrowHolder-right">
                    {this.state.dimensions && (
                      <Arrow
                        alertLevel={this.props.simulator.alertLevel}
                        level={this.state.frequency}
                        mouseDown={this.mouseDown.bind(this, "frequency")}
                        dimensions={this.state.dimensions}
                      />
                    )}
                  </div>
                )}
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
                {dimensions => (
                  <FrequencySignals
                    dimensions={dimensions}
                    frequency={this.state.frequency}
                    amplitude={this.state.amplitude}
                  />
                )}
              </Measure>
            </Card>
          </Col>
        </Row>
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
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

export default graphql(SHORTRANGE_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CommShortRange));
