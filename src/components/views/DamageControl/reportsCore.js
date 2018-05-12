import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Button, Input } from "reactstrap";
import FontAwesome from "react-fontawesome";
import { TypingField } from "../../generic/core";

const SYSTEMS_SUB = gql`
  subscription DamagedSystemsUpdate($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId, extra: true) {
      id
      name
      damage {
        damaged
        report
        requested
        reactivationCode
        neededReactivationCode
        currentStep
        validate
      }
      simulatorId
      type
    }
  }
`;

const extra = [
  "Co2 Scrubbers",
  "Fire",
  "Life Support",
  "Power Adjustment",
  "Transporter Buffer",
  "Turbolift Malfunction",
  "Antimatter Containment",
  "Gravity Systems",
  "Hull Breach",
  "Temperature",
  "Holodeck",
  "Brig Force Field",
  "Oxygen Generators",
  "Warp Field Realignment",
  "Computer Power",
  "Particle Detector",
  "Deuterium Fuel",
  "Water Pipes",
  "Food Replicators",
  "Zoology Pens Force Fields"
];

class DamageReportCore extends Component {
  constructor(props) {
    super(props);
    this.systemSub = null;
    this.state = {
      deck: null,
      room: null,
      selectedSystem: null,
      selectedReport: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.systemSub && !nextProps.data.loading) {
      this.systemSub = nextProps.data.subscribeToMore({
        document: SYSTEMS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            systems: subscriptionData.data.systemsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.systemSub && this.systemSub();
  }
  selectSystem(id) {
    const systems = this.props.data.systems;
    const selectedSystem = systems.find(s => s.id === id);
    this.setState({
      selectedSystem: id,
      selectedReport: selectedSystem.damage.report || ""
    });
  }
  systemStyle(sys) {
    const obj = {
      listStyle: "none",
      cursor: "pointer"
    };
    if (sys.damage.damaged) {
      obj.color = "red";
    }
    if (!sys.name) {
      obj.color = "purple";
    }
    return obj;
  }
  systemName(sys) {
    if (sys.type === "Shield") {
      return `${sys.name} Shields`;
    }
    if (sys.type === "Engine") {
      return `${sys.name} Engines`;
    }
    return sys.name;
  }
  loadReport(e) {
    const self = this;
    var reader = new FileReader();
    reader.onload = function() {
      const result = this.result;
      self.setState({
        selectedReport: result
      });
    };
    e.target.files[0] && reader.readAsText(e.target.files[0]);
  }
  sendReport = () => {
    const mutation = gql`
      mutation DamageReport($systemId: ID!, $report: String!) {
        damageReport(systemId: $systemId, report: $report)
      }
    `;
    const variables = {
      systemId: this.state.selectedSystem,
      report: this.state.selectedReport
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    setTimeout(() => {
      this.selectSystem(this.state.selectedSystem);
    }, 500);
  };
  reactivationCodeResponse = response => {
    const mutation = gql`
      mutation ReactivationCodeResponse($systemId: ID!, $response: Boolean!) {
        systemReactivationCodeResponse(systemId: $systemId, response: $response)
      }
    `;
    const variables = {
      systemId: this.state.selectedSystem,
      response: response
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  createExtraSystem = sysName => {
    const name = sysName || prompt("What is the name of the system?");
    const systems = this.props.data.systems;
    if (systems.find(s => s.name === name)) {
      this.breakSystem(systems.find(s => s.name === name).id);
      return;
    }
    const mutation = gql`
      mutation CreateExtraSystem($simulatorId: ID!, $params: String!) {
        addSystemToSimulator(
          simulatorId: $simulatorId
          className: "System"
          params: $params
        )
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      params: JSON.stringify({
        name,
        extra: true,
        damage: { damaged: true }
      })
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  breakSystem = sys => {
    const variables = {
      systemId: sys
    };
    // Break it
    const mutation = gql`
      mutation DamageSystem($systemId: ID!) {
        damageSystem(systemId: $systemId)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  repairSystem = () => {
    const { selectedSystem } = this.state;
    const variables = {
      systemId: selectedSystem
    };
    // Fix it
    const mutation = gql`
      mutation RepairSystem($systemId: ID!) {
        repairSystem(systemId: $systemId)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  generateReport = steps => {
    const mutation = gql`
      mutation GenerateReport($systemId: ID!, $steps: Int) {
        generateDamageReport(systemId: $systemId, steps: $steps)
      }
    `;
    const variables = { systemId: this.state.selectedSystem, steps };
    this.props.client
      .mutate({
        mutation,
        variables
      })
      .then(res => {
        this.setState({
          selectedReport: res.data.generateDamageReport
        });
      });
  };
  rejectStep = () => {
    const mutation = gql`
      mutation SetDamageStepValidation($id: ID!) {
        setDamageStepValidation(id: $id, validation: false)
      }
    `;
    const variables = {
      id: this.state.selectedSystem
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  acceptStep = () => {
    const mutation = gql`
      mutation ValidateDamageStep($id: ID!) {
        validateDamageStep(id: $id)
      }
    `;
    const variables = {
      id: this.state.selectedSystem
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const systems = this.props.data.systems;
    if (!systems) return null;
    const { selectedReport, selectedSystem } = this.state;
    const selectedSystemObj = systems.find(s => s.id === selectedSystem);
    return (
      <Container fluid className="damageReport-core">
        <Row style={{ height: "100%" }}>
          <Col sm={4} className="left-side">
            <div className="system-list">
              {systems.filter(s => s.damage.damaged).map(s => (
                <p
                  key={s.id}
                  className={`${selectedSystem === s.id ? "selected" : ""}  ${
                    s.damage.requested ? "requested" : ""
                  } ${s.damage.report ? "report" : ""} ${
                    s.damage.reactivationCode ? "reactivation" : ""
                  } ${s.damage.validate ? "validate" : ""}`}
                  onClick={this.selectSystem.bind(this, s.id)}
                >
                  {s.damage.validate ? (
                    <FontAwesome name="refresh" spin />
                  ) : null}{" "}
                  {this.systemName(s)} - {s.damage.currentStep + 1} /{" "}
                  {s.damage.report
                    ? s.damage.report
                        .split(/Step [0-9]+:\n/gi)
                        .filter(st => st && st !== "\n").length
                    : 0}
                </p>
              ))}
            </div>
            <Input
              type="select"
              value={"top"}
              size="sm"
              onChange={evt => this.createExtraSystem(evt.target.value)}
            >
              <option disabled value="top">
                Extra Damage
              </option>
              {extra.map(e => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
              <option value="">Add System</option>
            </Input>
          </Col>
          <Col sm={8} style={{ display: "flex", flexDirection: "column" }}>
            <TypingField
              value={selectedReport}
              style={{
                textAlign: "left",
                height: "auto",
                fontFamily: "monospace",
                flex: 1
              }}
              rows={8}
              controlled={true}
              onChange={e => {
                this.setState({
                  selectedReport: e.target.value
                });
              }}
            />
            {selectedSystemObj && selectedSystemObj.damage.reactivationCode ? (
              <div>
                <Row style={{ margin: 0 }}>
                  <Col sm={3}>Code:</Col>
                  <Col sm={9}>{selectedSystemObj.damage.reactivationCode}</Col>
                </Row>
                <Row style={{ margin: 0 }}>
                  <Col sm={3}>Actual:</Col>
                  <Col sm={9}>
                    {selectedSystemObj.damage.neededReactivationCode}
                  </Col>
                </Row>
                <Row style={{ margin: 0 }}>
                  <Col sm={8}>
                    <Button
                      onClick={() => {
                        this.reactivationCodeResponse(true);
                      }}
                      size={"sm"}
                      color="success"
                      block
                    >
                      Accept & Fix
                    </Button>
                  </Col>
                  <Col sm={4}>
                    <Button
                      onClick={() => {
                        this.reactivationCodeResponse(false);
                      }}
                      size={"sm"}
                      color="danger"
                      block
                    >
                      Deny
                    </Button>
                  </Col>
                </Row>
              </div>
            ) : (
              selectedSystem && (
                <Fragment>
                  <Row style={{ margin: 0 }}>
                    <Col sm={4}>
                      <Button
                        size={"sm"}
                        block
                        color="success"
                        onClick={this.repairSystem}
                      >
                        Repair
                      </Button>
                    </Col>
                    <Col sm={4}>
                      <Input
                        onChange={this.loadReport.bind(this)}
                        style={{ position: "absolute", opacity: 0 }}
                        type="file"
                        name="file"
                        id="exampleFile"
                      />
                      <Button size={"sm"} block color="info">
                        Load Report
                      </Button>
                    </Col>
                    <Col sm={4}>
                      <select
                        className="btn btn-warning btn-sm btn-block"
                        onChange={evt =>
                          this.generateReport(parseInt(evt.target.value, 10))
                        }
                        value={"select"}
                      >
                        <option value="select">Generate</option>
                        <option value="5">Short</option>
                        <option value="8">Medium</option>
                        <option value="12">Long</option>
                      </select>
                    </Col>
                  </Row>
                  <Row style={{ margin: 0 }}>
                    {selectedSystemObj.damage.validate ? (
                      <Fragment>
                        <Col sm={4}>
                          <p>
                            Validate Step:{" "}
                            {selectedSystemObj.damage.currentStep + 1}
                          </p>
                        </Col>
                        <Col sm={2}>
                          <Button
                            size={"sm"}
                            block
                            color="secondary"
                            onClick={this.acceptStep}
                          >
                            Accept Step
                          </Button>
                        </Col>
                        <Col sm={2}>
                          <Button
                            size={"sm"}
                            block
                            color="danger"
                            onClick={this.rejectStep}
                          >
                            Reject Step
                          </Button>
                        </Col>
                      </Fragment>
                    ) : (
                      <Col sm={8} />
                    )}
                    <Col sm={4}>
                      <Button
                        size={"sm"}
                        block
                        color="primary"
                        onClick={this.sendReport}
                      >
                        Send
                      </Button>
                    </Col>
                  </Row>
                </Fragment>
              )
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
const SYSTEMS_QUERY = gql`
  query DamagedSystems($simulatorId: ID) {
    systems(simulatorId: $simulatorId, extra: true) {
      id
      name
      damage {
        damaged
        report
        requested
        reactivationCode
        neededReactivationCode
        currentStep
        validate
      }
      simulatorId
      type
    }
  }
`;

export default graphql(SYSTEMS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(DamageReportCore));
