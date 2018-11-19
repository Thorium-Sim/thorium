import React, { Component } from "react";
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
import gql from "graphql-tag";

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
      if (equipment[eqId] >= count) return true;
    }
    return false;
  });
  if (type) {
    return probes.scienceTypes.find(t => t.id === type[0]);
  }
  return null;
}

class ProbeScience extends Component {
  state = {};
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
  }
  componentWillUnmount() {
    this.frame && cancelAnimationFrame(this.frame);
  }
  chargeLoop = () => {
    this.setState(state => ({
      charge: Math.min(1, state.charge + 0.001) || 0.001
    }));
    this.frame = requestAnimationFrame(this.chargeLoop);
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
  render() {
    const { contacts, probes } = this.props;
    const { selectedProbe, charge } = this.state;
    const scienceProbes = probes.probes
      .filter(s => s.type === "science" && s.launched)
      .map(p => ({ ...p, scienceType: getProbeConfig(probes, p) }));
    const probe = scienceProbes.find(p => p.id === selectedProbe);
    return (
      <Container className="card-scienceProbes">
        <Row>
          <Col sm={8} className="particle-grid">
            <Grid aligned rings={7} lines={4} contacts={contacts} />
          </Col>
          <Col sm={4}>
            <h3>
              <FormattedMessage
                id="science-probes"
                defaultMessage="Science Probes"
              />
            </h3>
            <ListGroup style={{ height: "25vh", overflowY: "auto" }}>
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
                <ListGroupItem>No Science Probes</ListGroupItem>
              )}
            </ListGroup>
            {probe && (
              <div>
                <p>
                  <strong>
                    Type:{" "}
                    {titleCase(
                      `${probe.scienceType.name} ${probe.scienceType.type}`
                    )}
                  </strong>
                </p>
                <p>
                  <strong>Charge:</strong>
                </p>

                <div className="charge-box">
                  <div
                    className="charge-bar"
                    style={{ width: `${(charge || probe.charge) * 100}%` }}
                  />
                </div>
                <Button block color="warning" onMouseDown={this.mouseDown}>
                  Charge Emitter
                </Button>
                <Button block color="success">
                  Activate {titleCase(probe.scienceType.type)}
                </Button>
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
