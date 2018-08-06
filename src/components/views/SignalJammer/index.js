import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Measure from "react-measure";
import Slider from "react-rangeslider";
import Tour from "reactour";
import SignalLines from "./signalLines";
import "react-rangeslider/lib/index.css";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";

import "./style.scss";

const SUB = gql`
  subscription SignalJammerUpdate($id: ID!) {
    signalJammersUpdate(simulatorId: $id) {
      id
      damage {
        damaged
      }
      power {
        power
        powerLevels
      }
      active
      level
      strength
      signals {
        id
        type
        level
        power
      }
    }
  }
`;

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "Signals of all variety are used for communications, sensors, and tactical purposes such as torpedo tracking and targeting. By detecting and dampening these signals, you can block the effectiveness of the signals for other ships."
  },
  {
    selector: ".nothing",
    content:
      "For example, if there is an incoming torpedo, you could block the red tactical signal which could keep the torpedo from hitting your ship. You can also keep other ships from communicating with each other by blocking comm signals."
  },
  {
    selector: ".signal-container",
    content: (
      <div>
        This is the signal monitor. It is color coded, with{" "}
        <span style={{ color: "red" }}>tactical</span>,{" "}
        <span style={{ color: "#00f" }}>sensors</span>, and{" "}
        <span style={{ color: "#0f0" }}>communication</span> signals. The
        signals will only be detected if the signal jammer is activated. The
        higher the line, the stronger the signal.
      </div>
    )
  },
  {
    selector: ".activate-button",
    content: "Click this button to activate and deactivate the signal jammer."
  },
  {
    selector: ".signal-level",
    content:
      "Drag this slider to choose the frequency to jam. You can only jam a short span of frequencies, so you have to select where you want to target the jammer."
  },
  {
    selector: ".signal-power",
    content:
      "Drag this slider up to increase power. You want the signal level to match the background radiation, so don't increase the power level too high."
  }
];

class SignalJammer extends Component {
  state = { jammer: { level: 0.5, power: 0.1 } };
  componentDidUpdate(prevProps) {
    if (
      this.props.data.signalJammers &&
      this.props.data.signalJammers.length > 0
    ) {
      const signalJammer = this.props.data.signalJammers[0];
      if (
        signalJammer.strength !== this.state.jammer.power ||
        signalJammer.level !== this.state.jammer.level
      ) {
        this.setState({
          jammer: {
            power: signalJammer.strength,
            level: signalJammer.level
          }
        });
      }
    }
  }
  changePower = value => {
    const { jammer } = this.state;
    this.setState({
      jammer: Object.assign({}, jammer, {
        power: parseFloat(value)
      })
    });
  };
  changeLevel = value => {
    const { jammer } = this.state;
    this.setState({
      jammer: Object.assign({}, jammer, {
        level: parseFloat(value)
      })
    });
  };
  updateJammer = (which, value) => {
    const {
      data: { loading, signalJammers }
    } = this.props;
    if (loading || !signalJammers) return null;
    const signalJammer = signalJammers[0];
    if (!signalJammer) return;
    const variables = {
      jammer: {
        id: signalJammer.id,
        [which]: value
      }
    };
    const mutation = gql`
      mutation UpdateSignalJammer($jammer: SignalJammerInput!) {
        updateSignalJammer(jammer: $jammer)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const {
      data: { loading, signalJammers }
    } = this.props;
    const { jammer } = this.state;
    if (loading || !signalJammers) return null;
    const signalJammer = signalJammers[0];
    if (!signalJammer) return <p>No Signal Jammer</p>;
    let alertClass = `alertColor${this.props.simulator.alertLevel || 5}`;
    return (
      <Container className="card-signalJammer">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              variables: {
                id: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  signalJammers: subscriptionData.data.signalJammersUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={9}>
            <div className="captions">
              <h4 style={{ flex: 2 }}>Signal Matrix</h4>
              <h4 style={{ color: "blue" }}>Sensors</h4>
              <h4 style={{ color: "red" }}>Tactical</h4>
              <h4 style={{ color: "green" }}>Communications</h4>
            </div>
            <Card>
              <div className="signal-strength">
                <span>-30db</span>
                <span>-40db</span>
                <span>-50db</span>
                <span>-60db</span>
                <span>-70db</span>
                <span>-80db</span>
                <span>-90db</span>
                <span>-100db</span>
                <span>-110db</span>
                <span>-120db</span>
                <span>-130db</span>
              </div>
              <Measure
                bounds
                onResize={contentRect => {
                  this.setState({ dimensions: contentRect.bounds });
                }}
              >
                {({ measureRef }) => (
                  <div className="signal-container" ref={measureRef}>
                    {this.state.dimensions && (
                      <SignalLines
                        width={this.state.dimensions.width}
                        height={this.state.dimensions.height}
                        jammer={jammer}
                        signals={signalJammer.signals}
                        active={signalJammer.active}
                      />
                    )}
                  </div>
                )}
              </Measure>
            </Card>
            <div className="signal-level">
              <Slider
                className={`level-slider ${alertClass}`}
                value={jammer.level}
                orientation="horizontal"
                onChange={this.changeLevel}
                onChangeComplete={() =>
                  this.updateJammer("level", jammer.level)
                }
                tooltip={false}
                min={0}
                step={0.01}
                max={1}
              />
            </div>
            <Row>
              <Col sm={4} className="activate-button">
                {signalJammer.active ? (
                  <Button
                    size="lg"
                    color="danger"
                    block
                    onClick={() => this.updateJammer("active", false)}
                  >
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    color="primary"
                    block
                    onClick={() => this.updateJammer("active", true)}
                  >
                    Activate
                  </Button>
                )}
              </Col>
              <Col sm={8}>
                <h2>
                  Frequency: {Math.round(jammer.level * 37700 + 37700) / 100}{" "}
                  MHz
                </h2>
              </Col>
            </Row>
          </Col>
          <Col sm={3}>
            <h3 className="text-center">Power</h3>
            <div className="signal-power">
              <Slider
                className={`power-slider ${alertClass}`}
                value={jammer.power}
                orientation="vertical"
                onChange={this.changePower}
                onChangeComplete={() =>
                  this.updateJammer("strength", jammer.power)
                }
                tooltip={false}
                min={0}
                step={0.01}
                max={1}
              />
            </div>
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

const QUERY = gql`
  query SignalJammer($id: ID!) {
    signalJammers(simulatorId: $id) {
      id
      damage {
        damaged
      }
      power {
        power
        powerLevels
      }
      active
      level
      strength
      signals {
        id
        type
        level
        power
      }
    }
  }
`;

export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      id: ownProps.simulator.id
    }
  })
})(withApollo(SignalJammer));
