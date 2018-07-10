import React, { Component } from "react";
import gql from "graphql-tag";
import {
  Container,
  Button,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Tour from "reactour";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import { graphql, withApollo } from "react-apollo";
import Transitioner from "../helpers/transitioner";
import ProbeEquipment from "./probeEquipment";
import Measure from "react-measure";
import DamageOverlay from "../helpers/DamageOverlay";
import "./style.scss";

function d2r(deg) {
  return (deg * Math.PI) / 180;
}

const PROBES_SUB = gql`
  subscription ProbesUpdate($simulatorId: ID!) {
    probesUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      type
      torpedo
      types {
        id
        name
        size
        count
        description
        availableEquipment {
          id
          name
          size
          count
          description
        }
      }
      probes {
        id
        name
        equipment {
          id
        }
      }
      name
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      torpedo
    }
  }
`;

const ProbeSelector = ({
  types,
  selectedProbeType,
  selectProbe,
  setDescription
}) => {
  return (
    <Row>
      <Col
        sm={12}
        className={`probe-container  ${
          selectedProbeType ? "probeSelected" : ""
        }`}
      >
        <div className="placeholder" />
        {types.map(t => {
          const probeImage = require(`./probes/${t.id}.svg`);
          return (
            <div
              key={t.id}
              onMouseOut={setDescription.bind(this, null)}
              onMouseOver={setDescription.bind(this, t.description)}
              className={`probe-type ${
                selectedProbeType === t.id ? "selected" : ""
              }`}
              onClick={selectProbe.bind(this, t.id)}
            >
              <p>
                {t.name}: {t.count}
              </p>
              <img
                alt="probe"
                draggable="false"
                src={probeImage}
                role="presentation"
              />
            </div>
          );
        })}
        <div className="placeholder" />
      </Col>
    </Row>
  );
};

class ProbeDescription extends Transitioner {
  render() {
    return (
      <Row className="probeDescription">
        <Col sm={{ size: 4, offset: 4 }}>
          <p>{this.props.description}</p>
        </Col>
      </Row>
    );
  }
}

class ProbeAction extends Transitioner {
  render() {
    const {
      selectedProbeType,
      selectProbe,
      cancelProbe,
      toggle,
      probes
    } = this.props;
    return (
      <Row className="probeAction">
        <Col sm={{ size: 4, offset: 4 }}>
          <Button block color="success" onClick={toggle}>
            {probes.torpedo ? "Load" : "Launch"} Probe
          </Button>
          <Button
            block
            color="warning"
            onClick={selectProbe.bind(this, selectedProbeType)}
          >
            Reconfigure Probe
          </Button>
          <Button block color="danger" onClick={cancelProbe}>
            Cancel Probe
          </Button>
        </Col>
      </Row>
    );
  }
}

class ProbeName extends Component {
  state = {
    name: ""
  };
  render() {
    const {
      modal,
      toggle,
      probes,
      launchProbe,
      equipment,
      network
    } = this.props;
    const { name } = this.state;
    return (
      <Modal className="modal-themed probe-name" isOpen={modal} toggle={toggle}>
        {equipment.find(e => e.id === "probe-network-package") ? (
          <div>
            <ModalHeader toggle={toggle}>
              Please select a destination for the probe
            </ModalHeader>
            <ModalBody>
              <Measure
                bounds
                onResize={contentRect => {
                  this.setState({ dimensions: contentRect.bounds });
                }}
              >
                {({ measureRef }) => (
                  <div
                    ref={measureRef}
                    style={{
                      height:
                        this.state.dimensions && this.state.dimensions.width
                    }}
                  >
                    {this.state.dimensions && (
                      <div
                        className={`grid`}
                        style={{
                          width: this.state.dimensions.width,
                          height: this.state.dimensions.width
                        }}
                      >
                        {Array(8)
                          .fill(0)
                          .map((_, i, array) => (
                            <div
                              key={`line-${i}`}
                              className="line"
                              style={{
                                transform: `rotate(${((i + 0.5) /
                                  array.length) *
                                  360}deg)`
                              }}
                            />
                          ))}
                        {Array(3)
                          .fill(0)
                          .map((_, i, array) => (
                            <div
                              key={`ring-${i}`}
                              className="ring"
                              style={{
                                width: `${((i + 1) / array.length) * 100}%`,
                                height: `${((i + 1) / array.length) * 100}%`,
                                backgroundColor: i < 2 ? "black" : "transparent"
                              }}
                            />
                          ))}
                        {Array(8)
                          .fill(0)
                          .map(
                            (_, i, array) =>
                              network.indexOf(i + 1) === -1 && (
                                <p
                                  key={`label-${i}`}
                                  className="label"
                                  onClick={() => {
                                    launchProbe(i + 1);
                                  }}
                                  style={{
                                    transform: `translate(${(Math.cos(
                                      d2r(((i - 2) / array.length) * 360)
                                    ) *
                                      this.state.dimensions.height) /
                                      2.5}px, ${(Math.sin(
                                      d2r(((i - 2) / array.length) * 360)
                                    ) *
                                      this.state.dimensions.height) /
                                      2.5}px)`
                                  }}
                                >
                                  {i + 1}
                                </p>
                              )
                          )}
                      </div>
                    )}
                  </div>
                )}
              </Measure>
            </ModalBody>
          </div>
        ) : (
          <div>
            <ModalHeader toggle={toggle}>
              Please enter a name for the probe
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </ModalBody>
          </div>
        )}
        <ModalFooter>
          <Col sm="3">
            <Button block color="danger" onClick={toggle}>
              Cancel
            </Button>
          </Col>
          <Col sm="5">
            <Button
              block
              disabled={!name}
              color="primary"
              onClick={launchProbe.bind(this, this.state.name)}
            >
              {probes.torpedo ? "Load" : "Launch"} Probe
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    );
  }
}
const PROBES_QUERY = gql`
  query Probes($simulatorId: ID!) {
    probes(simulatorId: $simulatorId) {
      id
      simulatorId
      type
      torpedo
      types {
        id
        name
        size
        count
        description
        availableEquipment {
          id
          name
          size
          count
          description
        }
      }
      probes {
        id
        equipment {
          id
        }
        name
      }
      name
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      torpedo
    }
  }
`;

class ProbeConstruction extends Component {
  state = {
    selectedProbeType: null,
    launching: false,
    description: null,
    equipment: [],
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  selectProbe(id) {
    this.setState({
      selectedProbeType: id,
      launching: false,
      equipment: id === null ? [] : this.state.equipment
    });
  }
  prepareProbe(equipment) {
    this.setState({
      equipment,
      launching: true
    });
  }
  launchProbe = name => {
    const probes = this.props.data.probes[0];
    const { selectedProbeType, equipment } = this.state;
    const mutation = gql`
      mutation LaunchProbe($id: ID!, $probe: ProbeInput!) {
        launchProbe(id: $id, probe: $probe)
      }
    `;
    const variables = {
      id: probes.id,
      probe: {
        name,
        type: selectedProbeType,
        equipment: equipment.map(({ id, count }) => ({
          id,
          count
        }))
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      selectedProbeType: null,
      launching: false,
      equipment: [],
      modal: false
    });
  };
  trainingSteps = () => {
    const probes = this.props.data.probes && this.props.data.probes[0];
    return [
      {
        selector: ".nothing",
        content:
          "Probes are small robots that you can launch into space to perform many functions. Probe functionality is extended by the equipment which you put on the probe. Different kinds of probes can take different equipment and different amounts. Be sure to use the right probe for the right job."
      },
      {
        selector: ".probe-container",
        content:
          "These are the probes which are available. If you move your mouse over the probe you can see a brief description. Click on any probe type before continuing."
      },
      {
        selector: ".equipmentList",
        content:
          "This is a list of the equipment available to your probe. You can see its name, its size, and how many you have on your ship in this table. Move your mouse over an equipment item to see a description of the equipment item. Click on the item to add it to your probe."
      },
      {
        selector: ".probe-control-buttons",
        content: (
          <span>
            Here you can see the amount of space available on your probe. You
            cannot put more equipment on a probe than what you have space for.
            Once you are done adding equipment to your probe, click the 'Prepare
            Probe' button. Then click the '{probes.torpedo ? "Load" : "Launch"}'
            button to confirm the probe you created.{" "}
            {probes.torpedo
              ? "The officer in charge of the torpedo launcher will have to launch the probe out of the torpedo tubes."
              : ""}
          </span>
        )
      },
      {
        selector: ".nothing",
        content:
          "You will then have to type in the destination. If you equipped your probe with a probe network package, you will instead be shown a diagram of your probe network which will allow you to select where you want to place the probe."
      }
    ];
  };
  render() {
    if (this.props.data.loading || !this.props.data.probes) return null;
    const probes = this.props.data.probes && this.props.data.probes[0];
    const { selectedProbeType, launching } = this.state;
    if (!probes) return <p>No Probe Launcher</p>;
    const comps = { ProbeDescription, ProbeEquipment, ProbeAction };
    return (
      <Container fluid className="probe-construction">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: PROBES_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  probes: subscriptionData.data.probesUpdate
                });
              }
            })
          }
        />
        <DamageOverlay
          system={probes}
          message={"Probe Launcher Offline"}
          style={{ height: "50vh" }}
        />
        <ProbeSelector
          types={probes.types}
          selectedProbeType={selectedProbeType}
          setDescription={e => this.setState({ description: e })}
          selectProbe={this.selectProbe.bind(this)}
        />
        {Object.keys(comps)
          .filter(compName => {
            if (compName === "ProbeDescription" && !selectedProbeType) {
              return true;
            }
            if (
              compName === "ProbeEquipment" &&
              selectedProbeType &&
              !launching
            ) {
              return true;
            }
            if (compName === "ProbeAction" && selectedProbeType && launching) {
              return true;
            }
            return false;
          })
          .map(compName => {
            const Comp = comps[compName];
            return (
              <Comp
                key={compName}
                {...this.state}
                cancelProbe={this.selectProbe.bind(this, null)}
                prepareProbe={this.prepareProbe.bind(this)}
                selectProbe={this.selectProbe.bind(this)}
                equipment={this.state.equipment}
                toggle={this.toggle.bind(this)}
                probes={probes}
              />
            );
          })}
        {this.state.modal && (
          <ProbeName
            probes={probes}
            network={probes.probes
              .filter(p =>
                p.equipment.find(e => e.id === "probe-network-package")
              )
              .map(p => parseInt(p.name, 10))}
            modal={this.state.modal}
            toggle={() => this.toggle()}
            equipment={this.state.equipment}
            launchProbe={this.launchProbe}
          />
        )}
        <Tour
          steps={this.trainingSteps()}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
      </Container>
    );
  }
}

export default graphql(PROBES_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(ProbeConstruction));
