import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Measure from "react-measure";
import Slider from "react-rangeslider";
import SignalLines from "./signalLines";
import "react-rangeslider/lib/index.css";

import "./style.css";

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

class SignalJammer extends Component {
  state = { jammer: { level: 0.5, power: 0.1 } };
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: SUB,
        variables: {
          id: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            signalJammers: subscriptionData.data.signalJammersUpdate
          });
        }
      });
    }
    if (nextProps.data.signalJammers.length > 0) {
      const signalJammer = nextProps.data.signalJammers[0];
      this.setState({
        jammer: {
          power: signalJammer.strength,
          level: signalJammer.level
        }
      });
    }
  }
  componentWillUnmount() {
    this.sub && this.sub();
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
    const { data: { loading, signalJammers } } = this.props;
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
    const { data: { loading, signalJammers } } = this.props;
    const { jammer } = this.state;
    if (loading || !signalJammers) return null;
    const signalJammer = signalJammers[0];
    if (!signalJammer) return <p>No Signal Jammer</p>;
    let alertClass = `alertColor${this.props.simulator.alertLevel || 5}`;
    return (
      <Container className="card-signalJammer">
        <Row>
          <Col sm={9}>
            <div className="captions">
              <h4 style={{ flex: 2 }}>Signal Matrix</h4>
              <h4 style={{ color: "blue" }}>Sensors</h4>
              <h4 style={{ color: "red" }}>Tactical</h4>
              <h4 style={{ color: "green" }}>Communications</h4>
            </div>
            <Card>
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
                onChangeComplete={e => this.updateJammer("level", jammer.level)}
                tooltip={false}
                min={0}
                step={0.01}
                max={1}
              />
            </div>
            <Col sm={4}>
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
    variables: {
      id: ownProps.simulator.id
    }
  })
})(withApollo(SignalJammer));
