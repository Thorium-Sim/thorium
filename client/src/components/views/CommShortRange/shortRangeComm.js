import React, { Component } from "react";
import { Card, CardBody, Container, Row, Col, Button } from "reactstrap";
import gql from "graphql-tag";
import { withApollo, Mutation } from "react-apollo";
import Measure from "react-measure";
import Tour from "helpers/tourHelper";
import DamageOverlay from "../helpers/DamageOverlay";
import FrequencySignals from "./frequency";
import Frequencies from "./frequencies";

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

class CommShortRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: props.frequency,
      amplitude: props.amplitude
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.frequency !== this.props.frequency) {
      this.setState({ frequency: this.props.frequency });
    }
  }
  getPointerArrow() {
    //Check to see if the arrow is within a range of a frequency;
    const { arrows, signals } = this.props;
    const { frequency } = this.state;
    const threshold = 0.009;
    const arrow = arrows.reduce((prev, next) => {
      if (prev) return prev;
      if (
        next.frequency + threshold > frequency &&
        next.frequency - threshold < frequency
      ) {
        const signal = signals.find(s => s.id === next.signal);
        return {
          id: next.id,
          connected: next.connected,
          muted: next.muted,
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
    const { signals } = this.props;
    const { frequency } = this.state;
    return signals.reduce((prev, next) => {
      if (next.range.upper > frequency && next.range.lower < frequency) {
        return next;
      }
      return prev;
    }, {});
  }
  commHail() {
    const pointerArrow = this.getPointerArrow();
    const { id, state } = this.props;
    let variables = {
      id
    };
    let mutation;
    if (pointerArrow.id) {
      variables = {
        id,
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
    } else if (state === "hailing") {
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
  getHailLabel = () => {
    const pointerArrow = this.getPointerArrow();
    const { state } = this.props;
    if (pointerArrow.id) {
      if (pointerArrow.connected) {
        return `Disconnect ${pointerArrow.name}`;
      }
      return `Connect ${pointerArrow.name}`;
    } else if (state === "hailing") {
      return `Cancel Hail`;
    }
    return `Hail ${this.getSignal().name || ""}`;
  };
  render() {
    const { id, signals } = this.props;
    const { frequency } = this.state;
    return (
      <Container fluid className="shortRangeComm">
        <DamageOverlay
          message="Short Range Communications Offline"
          system={this.props}
          style={{ left: "-2.5%", width: "105%", height: "105%" }}
        />
        <Row>
          <Col lg="4" xl="3" className="commControls">
            <Card>
              <div className="spacer" />
              {signals.map(s => (
                <div
                  key={s.id}
                  className={`img-container ${
                    s.id === this.getSignal().id ? "selected" : ""
                  }`}
                  style={{
                    backgroundImage: `url('/assets${s.image}')`
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
              {this.getHailLabel()}
            </Button>
            <Mutation
              mutation={gql`
                mutation MuteComm($id: ID!, $arrowId: ID!, $mute: Boolean!) {
                  muteShortRangeComm(id: $id, arrowId: $arrowId, mute: $mute)
                }
              `}
              variables={{
                id,
                arrowId: this.getPointerArrow().id,
                mute: !this.getPointerArrow().muted
              }}
            >
              {action => (
                <Button
                  size="lg"
                  block
                  color="info"
                  disabled={
                    !this.getPointerArrow().id ||
                    !this.getPointerArrow().connected
                  }
                  onClick={action}
                >
                  {this.getPointerArrow().muted ? "Unmute" : "Mute"} Call
                </Button>
              )}
            </Mutation>
          </Col>
          <Col xl={{ size: 4, offset: 1 }} sm={{ size: 5 }}>
            <Frequencies
              {...this.props}
              frequency={frequency}
              update={(which, value) => this.setState({ [which]: value })}
            />
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
              <Measure
                bounds
                onResize={contentRect => {
                  this.setState({ dimensions: contentRect.bounds });
                }}
              >
                {({ measureRef }) => (
                  <div ref={measureRef} className="signal-right">
                    {this.state.dimensions && (
                      <FrequencySignals
                        dimensions={this.state.dimensions}
                        frequency={this.state.frequency}
                        amplitude={this.state.amplitude}
                      />
                    )}
                  </div>
                )}
              </Measure>
            </Card>
          </Col>
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}
export default withApollo(CommShortRange);
