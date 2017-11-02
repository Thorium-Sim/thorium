import React, { Component } from "react";
import ReactDOM from "react-dom";
import SineWaves from "sine-waves";
import { Container, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import tinycolor from "tinycolor2";
import { Asset } from "../../../helpers/assets";

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
    }
  }
`;

class Communications extends Component {
  state = { comms: [] };
  componentDidMount() {
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
        const length = this.waves.length;
        while (++index < length) {
          this.waves[index].strokeStyle = gradient;
        }
      }
    });
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
            shortRangeComm: subscriptionData.shortRangeCommUpdate
          });
        }
      });
    }
    //Update the state based on the props
    if (!nextProps.data.loading) {
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
      this.setState({
        comms
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  changeGradient = comms => {
    var gradient = this.waves.ctx.createLinearGradient(
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
    const length = this.waves.waves.length;
    while (++index < length) {
      this.waves.waves[index].strokeStyle = gradient;
    }
  };
  render() {
    const { comms } = this.state;
    return (
      <div className="viewscreen-communications">
        <Container>
          <Row className="justify-content-center">
            {comms.length > 0 ? (
              comms.map(c => (
                <Col key={c.id} className="comm-container">
                  <Asset asset={`/Comm Images/${c.image}`}>
                    {({ src }) => <img alt="comm" src={src} />}
                  </Asset>
                  <h2>
                    {c.name} - {Math.round(c.frequency * 37700 + 37700) /
                      100}MHz
                  </h2>
                  <h3>
                    {c.connected ? "Connected" : ""}
                    {c.hailing ? "Hailing" : "Incoming Call"}
                  </h3>
                </Col>
              ))
            ) : (
              <Col>
                <h1 className="text-center">No Communications Lines Open</h1>
              </Col>
            )}
          </Row>
          <Row>
            <Col sm={12}>
              <canvas
                id="comm-waves"
                className={comms.length === 0 ? "hide-comm" : ""}
              />
            </Col>
          </Row>
        </Container>
      </div>
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
    }
  }
`;

export default graphql(SHORTRANGE_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Communications));
