import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import Grid from "../Sensors/GridDom/grid";
import { FormattedMessage } from "react-intl";
import Tour from "helpers/tourHelper";
import { titleCase } from "change-case";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import uuid from "uuid";

export function getProbeConfig(probes, probe) {
  // Check to see if the probe equipment matches a
  // science probe configuration

  // First, map out the probe's equipment
  const probeEquip = probe.equipment.reduce(
    (prev, p) => ({ ...prev, [p.id]: p.count }),
    {}
  );
  // Get the requirements
  const reqEquip = probes.scienceTypes.reduce(
    (prev, t) => ({
      ...prev,
      [t.id]: t.equipment.reduce(
        (prev2, e) => ({ ...prev2, [e]: prev2[e] ? prev2[e] + 1 : 1 }),
        {}
      )
    }),
    {}
  );

  // Get the type based on the equipment
  const type = Object.entries(reqEquip).find(([id, equipment]) => {
    const probeEquipment = Object.entries(probeEquip);
    for (let i = 0; i < probeEquipment.length; i++) {
      const [eqId, count] = probeEquipment[i];
      if (!equipment[eqId] || equipment[eqId] < count) return false;
    }
    return true;
  });
  if (type) {
    return probes.scienceTypes.find(t => t.id === type[0]);
  }
  return null;
}

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

const PROBE_SCIENCE_SUB = gql`
  subscription ProbeScience($simulatorId: ID!) {
    scienceProbeEmitter(simulatorId: $simulatorId) {
      name
      type
      charge
    }
  }
`;
class ProbeScienceSub extends Component {
  componentDidMount() {
    this.scienceSub = this.props.client
      .subscribe({
        query: PROBE_SCIENCE_SUB,
        variables: {
          simulatorId: this.props.simulatorId
        }
      })
      .subscribe({
        next: ({
          loading,
          data: {
            scienceProbeEmitter: { name, type, charge }
          }
        }) => {
          if (!loading) {
            if (type === "burst") {
              this.props.emit(charge);
            } else {
              this.props.detect(charge, name);
            }
          }
        },
        error(err) {
          console.error("Error handling probe emitter sub", err);
        }
      });
  }
  componentWillUnmount() {
    this.scienceSub && this.scienceSub.unsubscribe();
  }
  render() {
    return null;
  }
}

class ProbeScience extends Component {
  state = { emitContacts: [], detectorScale: 0 };
  static trainingSteps = [
    {
      selector: ".nothing",
      content: (
        <FormattedMessage
          id="probe-science-training-1"
          defaultMessage="This screen is used to control your science probes. Science probes can be used to detect or emit certain kinds of particles, each with their own strategic and informational advantage. Before continuing with training, make sure you have a properly configured science probe launched."
        />
      )
    },
    {
      selector: ".probes-launched",
      content: (
        <FormattedMessage
          id="probe-science-training-2"
          defaultMessage="You can see the science probes that have been launched here, along with their configured type. These configurations are based on the equipment that has been loaded into the probe. Click on one now."
        />
      )
    },
    {
      selector: ".probe-config",
      content: (
        <FormattedMessage
          id="probe-sciencer-training-3"
          defaultMessage="This is where you can control your science probe. You can see the current charge of the science probe as a yellow bar in the black box. To use the science probe, we have to charge it up."
        />
      )
    },
    {
      selector: ".charge-button",
      content: (
        <FormattedMessage
          id="probe-sciencer-training-4"
          defaultMessage="To charge the science probe, click and hold this button. Depending on whether you configured your probe to burst or detect particles, a higher charge will either emit more particles or detect a larger radius on your probes grid."
        />
      )
    },
    {
      selector: ".activate-button",
      content: (
        <FormattedMessage
          id="probe-sciencer-training-5"
          defaultMessage="Click this button to activate the probe emitter."
        />
      )
    },
    {
      selector: ".science-grid",
      content: (
        <FormattedMessage
          id="probe-sciencer-training-6"
          defaultMessage="After activating your probe, you'll begin to see either the particles being emitted or nearby particles being detected. Make sure you look quickly though. The detector doesn't last for very long."
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
  }
  componentWillUnmount() {
    this.frame && cancelAnimationFrame(this.frame);
    this.detectFrame && cancelAnimationFrame(this.detectFrame);
  }
  chargeLoop = () => {
    this.setState(state => ({
      charge: Math.min(1, state.charge + 0.001) || 0.001
    }));
    this.frame = requestAnimationFrame(this.chargeLoop);
  };
  emit = charge => {
    function randomOnPlane(radius) {
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return { x, y, z: 0 };
    }
    let burstCount = Math.floor(charge * 30);
    if (burstCount === 0) return;
    const interval = 100;
    const updateContacts = () => {
      this.setState(
        state => ({
          emitContacts: [
            ...state.emitContacts,
            {
              id: uuid.v4(),
              type: "burst",
              destination: randomOnPlane(1.1),
              location: { x: -0.01, y: -0.01, z: -0.01 },
              position: { x: -0.01, y: -0.01, z: -0.01 },
              startTime: Date.now() + window.thorium.clockSync,
              speed: 1
            }
          ]
        }),
        () => {
          burstCount = burstCount - 1;
          if (burstCount <= 0) return;
          setTimeout(updateContacts, interval);
        }
      );
    };
    updateContacts();
  };
  detect = (charge, name) => {
    this.setState({ detectorCharge: charge, detectType: name });
    this.detectLoop();
  };
  detectLoop = () => {
    if (this.state.detectorScale <= this.state.detectorCharge + 0.1) {
      return this.setState(
        state => ({
          detectorScale: state.detectorScale + 0.005 || 0.005
        }),
        () => {
          this.detectFrame = requestAnimationFrame(this.detectLoop);
        }
      );
    }
    setTimeout(() => {
      this.setState({ detectorScale: 0, detectorCharge: 0, detectType: null });
    }, 5000);
  };
  mouseDown = () => {
    const { probes } = this.props;
    const { selectedProbe } = this.state;
    const scienceProbes = probes.probes
      .filter(s => s.type === "science" && s.launched)
      .map(p => ({ ...p, scienceType: getProbeConfig(probes, p) }));
    const probe = scienceProbes.find(p => p.id === selectedProbe);
    document.addEventListener("mouseup", this.mouseUp);
    this.setState({ charge: probe.charge }, () => {
      this.chargeLoop();
    });
  };
  mouseUp = () => {
    this.frame && cancelAnimationFrame(this.frame);
    // Network update
    const mutation = gql`
      mutation ProbeCharge($id: ID!, $probeId: ID!, $charge: Float!) {
        setProbeCharge(id: $id, probeId: $probeId, charge: $charge)
      }
    `;
    if (this.state.charge) {
      const variables = {
        id: this.props.probes.id,
        probeId: this.state.selectedProbe,
        charge: this.state.charge
      };
      this.props.client.mutate({ mutation, variables }).then(() => {
        this.setState({ charge: null });
      });
    } else {
      this.setState({ charge: null });
    }
  };
  renderLines = props => {
    const { detectorScale } = this.state;
    const { rings = 3, lines = 12, aligned = false } = props;
    return (
      <Fragment>
        <div
          className="detector"
          style={{ transform: `scale(${detectorScale})` }}
        />
        {Array(rings)
          .fill(0)
          .map((_, i, array) => (
            <div
              key={`ring-${i}`}
              className="ring"
              style={{
                width: `${((i + 1) / array.length) * 100}%`,
                height: `${((i + 1) / array.length) * 100}%`
              }}
            />
          ))}
        {Array(lines)
          .fill(0)
          .map((_, i, array) => (
            <div
              key={`line-${i}`}
              className="line"
              style={{
                transform: `rotate(${((i + (aligned ? 0 : 0.5)) /
                  array.length) *
                  360}deg)`
              }}
            />
          ))}
      </Fragment>
    );
  };
  render() {
    const { contacts, probes } = this.props;
    const {
      selectedProbe,
      charge,
      emitContacts,
      detectorScale,
      detectType
    } = this.state;
    const scienceProbes = probes.probes
      .filter(s => s.type === "science" && s.launched)
      .map(p => ({ ...p, scienceType: getProbeConfig(probes, p) }));
    const probe = scienceProbes.find(p => p.id === selectedProbe);
    return (
      <Container className="card-scienceProbes">
        <ProbeScienceSub
          client={this.props.client}
          simulatorId={this.props.simulator.id}
          emit={this.emit}
          detect={this.detect}
        />
        <Row>
          <Col sm={8} className="science-grid">
            <Grid
              aligned
              rings={7}
              lines={4}
              contacts={contacts
                .filter(
                  c =>
                    c.particle === detectType &&
                    distance3d(c.position, { x: 0, y: 0, z: 0 }) <=
                      detectorScale
                )
                .concat(emitContacts)}
              renderLines={this.renderLines}
            />
          </Col>
          <Col sm={4}>
            <h3>
              <FormattedMessage
                id="science-probes"
                defaultMessage="Science Probes"
              />
            </h3>
            <ListGroup
              className="probes-launched"
              style={{ height: "25vh", overflowY: "auto" }}
            >
              {scienceProbes.length > 0 ? (
                scienceProbes.map(s => (
                  <ListGroupItem
                    key={s.id}
                    active={selectedProbe === s.id}
                    onClick={() => this.setState({ selectedProbe: s.id })}
                  >
                    {s.name}
                    <div>
                      <small>
                        {s.scienceType ? (
                          titleCase(
                            `${s.scienceType.name} ${s.scienceType.type}`
                          )
                        ) : (
                          <FormattedMessage
                            id="science-probe-invalid-configuration"
                            defaultMessage="Invalid Configuration"
                          />
                        )}
                      </small>
                    </div>
                  </ListGroupItem>
                ))
              ) : (
                <ListGroupItem>
                  <FormattedMessage
                    id="no-science-probes"
                    defaultMessage="No Science Probes"
                  />
                </ListGroupItem>
              )}
            </ListGroup>
            {probe && (
              <div className="probe-config">
                <p>
                  <strong>
                    Type:{" "}
                    {probe.scienceType ? (
                      titleCase(
                        `${probe.scienceType.name} ${probe.scienceType.type}`
                      )
                    ) : (
                      <FormattedMessage
                        id="science-probe-invalid-configuration"
                        defaultMessage="Invalid Configuration"
                      />
                    )}
                  </strong>
                </p>
                <p>
                  <strong>
                    <FormattedMessage
                      id="science-probe-charge"
                      defaultMessage="Charge"
                    />
                    :
                  </strong>
                </p>

                <div className="charge-box">
                  <div
                    className="charge-bar"
                    style={{ width: `${(charge || probe.charge) * 100}%` }}
                  />
                </div>
                <Button
                  className="charge-button"
                  disabled={!probe.scienceType}
                  block
                  color="warning"
                  onMouseDown={this.mouseDown}
                >
                  <FormattedMessage
                    id="science-probe-charge-emitter"
                    defaultMessage="Charge Emitter"
                  />
                </Button>
                <Mutation
                  mutation={gql`
                    mutation ProbeEmitter($id: ID!, $probeId: ID!) {
                      activateProbeEmitter(id: $id, probeId: $probeId)
                    }
                  `}
                  variables={{ id: probes.id, probeId: selectedProbe }}
                >
                  {action => (
                    <Button
                      className="activate-button"
                      disabled={!probe.scienceType || probe.charge === 0}
                      block
                      color="success"
                      onClick={action}
                    >
                      <FormattedMessage
                        id="science-probe-invalid-configuration"
                        defaultMessage="Activate {probe}"
                        values={{
                          probe:
                            probe.scienceType &&
                            titleCase(probe.scienceType.type)
                        }}
                      />
                    </Button>
                  )}
                </Mutation>
              </div>
            )}
          </Col>
        </Row>
        <Tour
          steps={ProbeScience.trainingSteps}
          client={this.props.clientObj}
        />
      </Container>
    );
  }
}
export default ProbeScience;
