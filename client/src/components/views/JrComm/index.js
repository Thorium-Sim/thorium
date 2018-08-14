import React, { Component } from "react";
import ReactDOM from "react-dom";
import SineWaves from "sine-waves";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Button } from "reactstrap";
import tinycolor from "tinycolor2";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";

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
  initWaves = () => {
    const self = this;
    this.waves = new SineWaves({
      // Canvas Element
      el: ReactDOM.findDOMNode(self).querySelector("#comm-waves"),

      // General speed of entire wave system
      speed: 8,

      // How many degress should we rotate all of the waves
      rotate: 0,

      // Ease function from left to right
      ease: "SineInOut",

      // Specific how much the width of the canvas the waves should be
      // This can either be a number or a percent
      waveWidth: "90%",

      // An array of wave options
      waves: [
        {
          timeModifier: 1, // This is multiplied againse `speed`
          lineWidth: 9, // Stroke width
          amplitude: 90, // How tall is the wave
          wavelength: 80, // How long is the wave
          segmentLength: 20, // How smooth should the line be
          strokeStyle: "rgba(255, 255, 255, 0.5)", // Stroke color and opacity
          type: "sine" // Wave type
        },
        {
          timeModifier: 1,
          lineWidth: 6,
          amplitude: 60,
          wavelength: 100,
          strokeStyle: "rgba(255, 255, 255, 0.3)"
        },
        {
          timeModifier: 1.5,
          lineWidth: 6,
          amplitude: 30,
          wavelength: 30,
          strokeStyle: "rgba(255, 255, 255, 0.3)"
        },
        {
          timeModifier: 1,
          lineWidth: 3,
          amplitude: 90,
          wavelength: 50,
          strokeStyle: "rgba(255, 255, 255, 0.3)"
        }
      ],
      resizeEvent: function() {
        // Here is an example on how to create a gradient stroke
        var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(
          0.5,
          `rgba(${Math.round(Math.random() * 255)}, ${Math.round(
            Math.random() * 255
          )}, ${Math.round(Math.random() * 255)}, 0.5)`
        );
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        let index = -1;
        let length = this.waves.length;
        while (++index < length) {
          this.waves[index].strokeStyle = gradient;
        }
      }
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      if (nextProps.data.shortRangeComm && nextProps.data.shortRangeComm[0]) {
        if (!this.waves) {
          setTimeout(this.initWaves, 500);
        }
        const ShortRange = nextProps.data.shortRangeComm[0];
        let comms = ShortRange.arrows.map(a => {
          const signal = ShortRange.signals.find(s => s.id === a.signal);
          return {
            id: a.id,
            connected: a.connected,
            frequency: a.frequency,
            name: signal.name,
            color: signal.color,
            image: signal.image
          };
        });
        if (ShortRange.state === "hailing") {
          // Add the hailing frequency
          const signal = ShortRange.signals.find(
            s =>
              s.range.upper > ShortRange.frequency &&
              s.range.lower < ShortRange.frequency
          );
          comms.push({
            id: "hailing-frequency",
            connected: false,
            hailing: true,
            frequency: ShortRange.frequency,
            name: signal.name,
            color: signal.color,
            image: signal.image
          });
        }
        this.changeGradient(comms);
      }
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  newCall = () => {
    const mutation = gql`
      mutation CommHail($id: ID!) {
        commHail(id: $id)
      }
    `;
    const ShortRange = this.props.data.shortRangeComm[0];
    const variables = {
      id: ShortRange.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  cancelCall = () => {
    const mutation = gql`
      mutation CancelHail($id: ID!) {
        cancelHail(id: $id)
      }
    `;
    const ShortRange = this.props.data.shortRangeComm[0];
    const variables = {
      id: ShortRange.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  hangUp = () => {
    const mutation = gql`
      mutation CommDisconnectArrow($id: ID!, $arrowId: ID!) {
        commDisconnectArrow(id: $id, arrowId: $arrowId)
      }
    `;
    const ShortRange = this.props.data.shortRangeComm[0];
    const variables = {
      id: ShortRange.id,
      arrowId: ShortRange.arrows[0].id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  answerCall = () => {
    const mutation = gql`
      mutation CommConnectArrow($id: ID!, $arrowId: ID!) {
        commConnectArrow(id: $id, arrowId: $arrowId)
      }
    `;
    const ShortRange = this.props.data.shortRangeComm[0];
    const variables = {
      id: ShortRange.id,
      arrowId: ShortRange.arrows[0].id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  changeGradient = comms => {
    if (!this.waves) return;
    let gradient = this.waves.ctx.createLinearGradient(
      0,
      0,
      this.waves.width,
      0
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    comms.forEach((comm, index, arr) => {
      gradient.addColorStop(
        (index + 1) / (arr.length + 1),
        tinycolor(comm.color)
          .setAlpha(comm.connected ? 1 : 0.3)
          .toRgbString()
      );
    });
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    let index = -1;
    let length = this.waves.waves.length;
    while (++index < length) {
      this.waves.waves[index].strokeStyle = gradient;
    }
  };
  render() {
    if (this.props.data.loading || !this.props.data.shortRangeComm) return null;
    const ShortRange = this.props.data.shortRangeComm[0];
    const status =
      ShortRange.state === "hailing"
        ? "Calling..."
        : ShortRange.arrows.length === 0
          ? "No Calls"
          : ShortRange.arrows.find(a => a.connected)
            ? "Call Answered"
            : "Incoming Call";
    if (!ShortRange) return <p>No short range comm</p>;
    return (
      <Container className="shortRangeComm">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SHORTRANGE_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  shortRangeComm: subscriptionData.data.shortRangeCommUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <h1>Status: {status}</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            {ShortRange.state === "hailing" ? (
              <Button block size="lg" color="danger" onClick={this.cancelCall}>
                Cancel Call
              </Button>
            ) : ShortRange.arrows.length === 0 ? (
              <Button block size="lg" color="primary" onClick={this.newCall}>
                Call
              </Button>
            ) : ShortRange.arrows.find(a => a.connected) ? (
              <Button block size="lg" color="danger" onClick={this.hangUp}>
                Hang Up
              </Button>
            ) : (
              <Button block size="lg" color="info" onClick={this.answerCall}>
                Answer
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <canvas
              id="comm-waves"
              style={{
                width: "100%",
                height: "25vh"
              }}
            />
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

export default graphql(SHORTRANGE_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CommShortRange));
