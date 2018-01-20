import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import TransitionGroup from "react-transition-group/TransitionGroup";
import Transitioner from "../../views/helpers/transitioner";
import { Asset } from "../../../helpers/assets";

import "./style.css";

class StealthBars extends Transitioner {
  systemName(sys) {
    if (sys.type === "Shield") {
      return `${sys.name} Shields`;
    }
    if (sys.type === "Engine") {
      return `${sys.name} Engines`;
    }
    return sys.name;
  }
  render() {
    const { systems } = this.props;
    const stealthSystems = systems.filter(
      s => typeof s.stealthFactor === "number"
    );
    const group1 = stealthSystems.slice(0, stealthSystems.length / 2);
    const group2 = stealthSystems.slice(stealthSystems.length / 2);
    return (
      <div className="stealthBars">
        <Row>
          <Col sm={6}>
            {group1.map(s => {
              return (
                <Row key={s.id} className="mt-1">
                  <Col sm="3" className="text-right">
                    {this.systemName(s)}
                  </Col>
                  <Col sm="9">
                    <div className="bar-container">
                      <div
                        className="bar"
                        style={{
                          width: `${s.stealthFactor * 100}%`,
                          backgroundSize: `5px 3px, ${100 /
                            s.stealthFactor}%, ${100 / s.stealthFactor}%`
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              );
            })}
          </Col>
          <Col sm={6}>
            {group2.map(s => {
              return (
                <Row key={s.id} className="mt-1">
                  <Col sm="3" className="text-right">
                    {this.systemName(s)}
                  </Col>
                  <Col sm="9">
                    <div className="bar-container">
                      <div
                        className="bar"
                        style={{
                          width: `${s.stealthFactor * 100}%`,
                          backgroundSize: `5px 3px, ${100 /
                            s.stealthFactor}%, ${100 / s.stealthFactor}%`
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      </div>
    );
  }
}

class Blade {
  constructor(c) {
    this.c = c;
    this.init();
  }
  init() {
    this.r = Math.random() * 200 + 100;
    this.x = Math.random() * window.innerWidth;
    this.y = window.innerHeight * Math.random();
    this.vy = Math.random() * 2 - 1;
    this.ax = this.x - this.r;
    this.bx = this.x + this.r;
    this.dx = Math.random() * 150 + 80;
    this.g = Math.round(Math.random() * 255);
    this.b = this.g; // Math.round(Math.random() * 10 + 155);
  }
  run() {
    this.ax += (this.x - this.ax) / this.dx;
    this.bx += (this.x - this.bx) / this.dx;
    this.y += this.vy;

    if (this.bx - this.ax < 0.5) this.init();

    this.c.strokeStyle = `rgba(${this.g}, ${this.g}, ${this.b}, 0.1)`;
    this.c.beginPath();

    this.c.moveTo(this.ax, this.y);
    this.c.lineTo(this.bx, this.y);
    this.c.stroke();
  }
}

class Scene {
  constructor() {
    this.canvas = document.getElementById("stealth-canvas");
    this.c = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
    this.clear();
    this.initBlades();
    this.loop = this.loop.bind(this);
    this.loop();
  }
  loop() {
    for (let i = 0; i < 3; i++) {
      this.blades.forEach(blade => blade.run());
    }
    requestAnimationFrame(this.loop);
  }
  initBlades() {
    this.blades = [];
    this.bladeNum = 1000;
    for (let i = 0; i < this.bladeNum; i++) {
      this.blades[i] = new Blade(this.c);
    }
  }
  clear() {
    this.c.fillStyle = "black";
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  resize() {
    this.clear();
  }
}

const STEALTH_SUB = gql`
  subscription StealthFieldUpdate($simulatorId: ID!) {
    stealthFieldUpdate(simulatorId: $simulatorId) {
      id
      name
      state
      charge
      activated
      quadrants {
        fore
        aft
        port
        starboard
      }
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

const limit = 0.05;
const factor = 0.005;
class StealthField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      systems: props.data.systems || null
    };
    this.subscription = null;
    this.systemsSubscription = null;
    this.looping = true;
    this.loop = this.loop.bind(this);
    window.requestAnimationFrame(this.loop);
  }
  scene = null;
  componentDidMount() {
    this.looping = true;
    this.props.data.startPolling(1000);
  }
  componentWillUnmount() {
    this.looping = false;
    this.props.data.stopPolling();
    this.subscription && this.subscription();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: STEALTH_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            stealthField: subscriptionData.data.stealthFieldUpdate
          });
        }
      });
    }
    if (nextProps.data.systems && !this.state.systems) {
      // We only need to initialize the state
      this.setState({
        systems: nextProps.data.systems.filter(
          s => typeof s.stealthFactor === "number"
        )
      });
    }
  }
  loop(currentTime) {
    if (this.looping) {
      window.requestAnimationFrame(this.loop);
    } else {
      return;
    }
    if (Math.round(currentTime) % 2 !== 0) return;
    if (this.props.data.loading) return;
    if (!this.props.data.systems) return;
    const systemsState = this.state.systems;
    const systemsProps = this.props.data.systems;
    if (!systemsState || !systemsProps) return;
    this.setState({
      systems: systemsState
        .filter(s => typeof s.stealthFactor === "number")
        .map(s => {
          const propSys = systemsProps.find(ps => ps.id === s.id);
          let sign = Math.sign(Math.random() - 0.5);
          if (Math.abs(s.stealthFactor - propSys.stealthFactor) > limit) {
            sign = -1 * Math.sign(s.stealthFactor - propSys.stealthFactor);
          }
          let stealthFactor = Math.min(
            1,
            Math.max(0, s.stealthFactor + sign * Math.random() * factor)
          );

          return {
            id: s.id,
            name: s.name,
            type: s.type,
            stealthFactor
          };
        })
    });
  }
  render() {
    if (this.props.data.loading || !this.props.data.stealthField) return null;
    const stealthField =
      this.props.data.stealthField && this.props.data.stealthField[0];
    if (!stealthField) return <p>No Stealth Field</p>;
    const { systems } = this.state;
    return (
      <Container fluid className="card-stealthField">
        <h1>Stealth Field</h1>
        <Row>
          <Col sm="3" />
          <Col sm="6">
            <Asset
              asset="/Ship Views/Left"
              simulatorId={this.props.simulator.id}
            >
              {({ src }) => {
                if (!this.scene) {
                  this.scene = true;
                  setTimeout(() => (this.scene = new Scene()), 100);
                }
                return (
                  <div
                    className="stealth"
                    style={{ transform: "rotate(360deg)" }}
                  >
                    <img
                      alt="ship"
                      style={{ width: "100%" }}
                      src={src}
                      draggable="false"
                    />
                    <canvas
                      id="stealth-canvas"
                      style={{
                        WebkitMaskImage: `url(${src})`,
                        display:
                          stealthField.id &&
                          (!stealthField.activated || stealthField.state)
                            ? "block"
                            : "none"
                      }}
                    />
                  </div>
                );
              }}
            </Asset>
          </Col>
          <Col sm="3" />
        </Row>
        <Row className="stealth-board">
          <TransitionGroup>
            {[StealthBars]
              .filter(s => s.state)
              .map(Comp => <Comp key={Comp.name} systems={systems} />)}
          </TransitionGroup>
        </Row>
      </Container>
    );
  }
}

const STEALTH_QUERY = gql`
  query StealthField($simulatorId: ID!) {
    stealthField(simulatorId: $simulatorId) {
      id
      name
      state
      charge
      activated
      quadrants {
        fore
        aft
        port
        starboard
      }
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
    }
    systems(simulatorId: $simulatorId) {
      id
      name
      type
      stealthFactor
    }
  }
`;

export default graphql(STEALTH_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(StealthField));
