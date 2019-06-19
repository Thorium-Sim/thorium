import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Button } from "reactstrap";
import Grid from "../Sensors/GridDom/grid";
import { particleTypes, particleBootstrapClasses } from "./particleConstants";
import { FormattedMessage } from "react-intl";
import Tour from "helpers/tourHelper";

import uuid from "uuid";

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

class ParticleDetector extends Component {
  state = { circles: [], opacities: {} };
  static trainingSteps = [
    {
      selector: ".nothing",
      content: (
        <FormattedMessage
          id="particle-detector-training-1"
          defaultMessage="The particle detector is an extension to your external sensors. It allows you to focus your sensors at a specific place around your ship to detect different types of particles."
        />
      )
    },
    {
      selector: ".particle-types",
      content: (
        <FormattedMessage
          id="particle-detector-training-2"
          defaultMessage="This is the list of all the types of particles you can detect. Click on one to begin detecting particles."
        />
      )
    },
    {
      selector: ".particle-grid",
      content: (
        <FormattedMessage
          id="particle-detector-training-3"
          defaultMessage="Click anywhere on the grid to detect particles. You can only detect a specific type of particle within a small area at any time, so you might have to click in several areas to see where all the particles are. Be sure to switch between the different types to detect any other particles."
        />
      )
    }
  ];
  componentDidMount() {
    setTimeout(() => {
      let dimensions = false;
      while (!dimensions) {
        const el = ReactDOM.findDOMNode(this);
        if (el) {
          const el2 = el.querySelector("#sensorGrid");
          if (el2) {
            dimensions = el2.getBoundingClientRect();
          }
        }
      }
      this.setState({ dimensions });
    }, 500);
    this.loop();
  }
  mouseDown = (e, b, c) => {
    const {
      dimensions: { left, top, width, height },
      selectedType
    } = this.state;
    if (!selectedType) return;
    const x = e.clientX;
    const y = e.clientY;
    const location = {
      x: ((x - left - width / 2) / width) * 2,
      y: ((y - top - height / 2) / height) * 2,
      z: 0
    };
    const id = uuid.v4();
    const color = particleTypes[selectedType];
    this.setState(
      state => ({
        circles: [
          ...state.circles,
          {
            id,
            location: location,
            position: location,
            destination: location,
            size: 0.5,
            type: "ping",
            color,
            particle: selectedType,
            startTime: Date.now()
          }
        ]
      }),
      () => {
        setTimeout(() => {
          this.setState(state => ({
            circles: state.circles.filter(c => c.id !== id)
          }));
        }, 3000);
      }
    );
  };
  componentWillUnmount() {
    cancelAnimationFrame(this.frame);
  }
  loop = () => {
    this.setState(
      ({ circles }) => ({
        opacities: this.props.contacts.reduce((prev, next) => {
          const opacity = circles.reduce((prevc, circle) => {
            if (circle.particle !== next.particle) return prevc;
            const dateDiff = Date.now() - circle.startTime;
            let opacity = dateDiff / (1000 * 2);
            if (dateDiff > 2000) opacity = (3000 - dateDiff) / 1000;

            const adjustedDistance = Math.max(
              0,
              Math.abs(1 - distance3d(next.location, circle.location)) - 0.7
            );

            return Math.min(
              1,
              prevc + opacity * (adjustedDistance ? adjustedDistance + 0.7 : 0)
            );
          }, 0);
          prev[next.id] = opacity;
          return prev;
        }, {})
      }),
      () => {
        this.frame = requestAnimationFrame(this.loop);
      }
    );
  };
  render() {
    const { circles, opacities, selectedType } = this.state;
    const contacts = this.props.contacts.map(c => {
      return {
        ...c,
        opacity: opacities[c.id]
      };
    });
    return (
      <Container className="card-particleDetector">
        <Row>
          <Col sm={8} className="particle-grid">
            <Grid
              contacts={contacts}
              particles
              gridMouseDown={this.mouseDown}
              extraContacts={circles}
            />
          </Col>
          <Col sm={4} className="particle-types">
            <h2>
              <FormattedMessage
                id="particle-types"
                defaultMessage="Particle Types"
                description="The particle detector detects different particles outside in space. This is a header for a list of the possible particles that can be detected"
              />
            </h2>
            {Object.entries(particleTypes).map(([name, color]) => (
              <Button
                block
                active={selectedType === name}
                color={particleBootstrapClasses[name]}
                onClick={() => this.setState({ selectedType: name })}
                key={name}
              >
                {name}
              </Button>
            ))}
          </Col>
        </Row>
        <Tour
          steps={ParticleDetector.trainingSteps}
          client={this.props.clientObj}
        />
      </Container>
    );
  }
}
export default ParticleDetector;
