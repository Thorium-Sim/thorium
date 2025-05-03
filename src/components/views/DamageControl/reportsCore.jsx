import React, {Component, Fragment} from "react";
import gql from "graphql-tag.macro";
import {graphql, withApollo} from "react-apollo";
import {Container, Row, Col, Button, Input} from "helpers/reactstrap";
import {TypingField} from "../../generic/core";
import SubscriptionHelper from "helpers/subscriptionHelper";
import {FaSyncAlt} from "react-icons/fa";
import "./style.scss";

const SYSTEMS_SUB = gql`
  subscription DamagedSystemsUpdate($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId, extra: true) {
      id
      name
      displayName
      damage {
        damaged
        report
        requested
        reactivationCode
        neededReactivationCode
        currentStep
        validate
        which
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
  "Zoology Pens Force Fields",
];

class DamageReportCore extends Component {
  constructor(props) {
    super(props);
    this.systemSub = null;
    this.state = {
      deck: null,
      room: null,
      selectedSystem: null,
      selectedReport: "",
    };
  }
  selectSystem(id, sent) {
    const systems = this.props.data.systems;
    const selectedSystem = systems.find(s => s.id === id);
    this.setState({
      sent: sent ? true : false,
      selectedSystem: id,
      selectedReport: selectedSystem.damage.report || "",
    });
  }
  systemStyle(sys) {
    const obj = {
      listStyle: "none",
      cursor: "pointer",
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
    if (sys.type === "Shield" && sys.name !== "Shields") {
      return `${sys.name} Shields`;
    }
    return sys.displayName || sys.name;
  }
  loadReport(e) {
    const self = this;
    var reader = new FileReader();
    reader.onload = function () {
      const result = this.result.replace(/\r/gi, "\n");
      self.setState({
        sent: false,
        selectedReport: result,
      });
    };
    e.target.files[0] && reader.readAsText(e.target.files[0]);
  }
  sendReport = () => {
    this.setState({sent: true});
    const mutation = gql`
      mutation DamageReport($systemId: ID!, $report: String!) {
        damageReport(systemId: $systemId, report: $report)
      }
    `;
    const variables = {
      systemId: this.state.selectedSystem,
      report: this.state.selectedReport,
    };
    this.props.client.mutate({
      mutation,
      variables,
    });
    setTimeout(() => {
      this.selectSystem(this.state.selectedSystem, true);
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
      response: response,
    };
    this.props.client.mutate({
      mutation,
      variables,
    });
  };
  createExtraSystem = (sysName, which) => {
    const name = sysName || prompt("What is the name of the system?");
    const systems = this.props.data.systems;
    if (systems.find(s => s.name === name)) {
      this.breakSystem(systems.find(s => s.name === name).id, which);
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
        damage: {damaged: true, which},
      }),
    };
    this.props.client.mutate({
      mutation,
      variables,
    });
  };
  breakSystem = (sys, which) => {
    const variables = {
      systemId: sys,
      which,
    };
    // Break it
    const mutation = gql`
      mutation DamageSystem($systemId: ID!, $which: String) {
        damageSystem(systemId: $systemId, which: $which)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables,
    });
  };
  repairSystem = () => {
    const {selectedSystem} = this.state;
    const variables = {
      systemId: selectedSystem,
    };
    // Fix it
    const mutation = gql`
      mutation RepairSystem($systemId: ID!) {
        repairSystem(systemId: $systemId)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables,
    });
  };
  generateReport = steps => {
    const mutation = gql`
      mutation GenerateReport($systemId: ID!, $steps: Int) {
        generateDamageReport(systemId: $systemId, steps: $steps)
      }
    `;
    const variables = {systemId: this.state.selectedSystem, steps};
    this.props.client
      .mutate({
        mutation,
        variables,
      })
      .then(res => {
        this.setState({
          sent: false,
          selectedReport: res.data.generateDamageReport,
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
      id: this.state.selectedSystem,
    };
    this.props.client.mutate({
      mutation,
      variables,
    });
  };
  acceptStep = () => {
    const mutation = gql`
      mutation ValidateDamageStep($id: ID!) {
        validateDamageStep(id: $id)
      }
    `;
    const variables = {
      id: this.state.selectedSystem,
    };
    this.props.client.mutate({
      mutation,
      variables,
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const systems = this.props.data.systems;
    if (!systems) return null;
    const {selectedReport, selectedSystem, sent} = this.state;
    const selectedSystemObj = systems.find(s => s.id === selectedSystem);
    return (
      <Container fluid className="damageReport-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SYSTEMS_SUB,
              variables: {
                simulatorId: this.props.simulator.id,
              },
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  systems: subscriptionData.data.systemsUpdate,
                });
              },
            })
          }
        />
        <Row style={{height: "100%"}}>
          <Col
            sm={4}
            className="left-side"
            style={{display: "flex", flexDirection: "column"}}
          >
            <div className="system-list flex-max">
              {systems
                .filter(s => s.damage.damaged)
                .map(s => (
                  <p
                    key={s.id}
                    className={`${selectedSystem === s.id ? "selected" : ""}  ${
                      s.damage.requested ? "requested" : ""
                    } ${s.damage.report ? "report" : ""} ${
                      s.damage.reactivationCode ? "reactivation" : ""
                    } ${s.damage.validate ? "validate" : ""} ${s.damage.which}`}
                    title={`${s.damage.requested ? "Report Requested : " : ""}${
                      s.damage.report ? "Report Sent : " : ""
                    }${
                      s.damage.reactivationCode
                        ? "Reactivation Code Requested : "
                        : ""
                    }${s.damage.validate ? "Validation Requested : " : ""}`}
                    onClick={this.selectSystem.bind(this, s.id)}
                  >
                    {s.damage.validate ? (
                      <FaSyncAlt className="fa-spin" />
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
              style={{height: "20px"}}
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
            <Input
              type="select"
              value={"top"}
              size="sm"
              className="btn-warning"
              style={{height: "20px"}}
              onChange={evt => this.createExtraSystem(evt.target.value, "rnd")}
            >
              <option disabled value="top">
                Extra {"R&D"}
              </option>
              {extra.map(e => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
              <option value="">Add System</option>
            </Input>
            <Input
              type="select"
              value={"top"}
              size="sm"
              className="btn-primary"
              style={{height: "20px"}}
              onChange={evt =>
                this.createExtraSystem(evt.target.value, "engineering")
              }
            >
              <option disabled value="top">
                Extra Engineering
              </option>
              {extra.map(e => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
              <option value="">Add System</option>
            </Input>
          </Col>
          <Col sm={8} style={{display: "flex", flexDirection: "column"}}>
            <TypingField
              value={selectedReport}
              style={{
                textAlign: "left",
                height: "auto",
                fontFamily: "monospace",
                flex: 1,
              }}
              rows={8}
              controlled={true}
              onChange={e => {
                this.setState({
                  sent: false,
                  selectedReport: e.target.value,
                });
              }}
            />
            {selectedSystemObj && selectedSystemObj.damage.reactivationCode ? (
              <div>
                <Row style={{margin: 0}}>
                  <Col sm={3}>Code:</Col>
                  <Col sm={9}>{selectedSystemObj.damage.reactivationCode}</Col>
                </Row>
                <Row style={{margin: 0}}>
                  <Col sm={3}>Actual:</Col>
                  <Col sm={9}>
                    {selectedSystemObj.damage.neededReactivationCode}
                  </Col>
                </Row>
                <Row style={{margin: 0}}>
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
                  <Row style={{margin: 0}}>
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
                        style={{position: "absolute", opacity: 0}}
                        value={""}
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
                        onChange={evt => {
                          if (evt.target.value === "set") {
                            const count = window.prompt("How many steps?");
                            if (
                              isNaN(parseInt(count, 10)) ||
                              parseInt(count, 10) <= 0
                            )
                              return;
                            this.generateReport(parseInt(count, 10));

                            return;
                          }
                          this.generateReport(parseInt(evt.target.value, 10));
                        }}
                        value={"select"}
                      >
                        <option value="select">Generate</option>
                        <option value="set">Enter Step Count</option>
                        <option value="3">Superficial</option>
                        <option value="5">Short</option>
                        <option value="8">Medium</option>
                        <option value="12">Long</option>
                      </select>
                    </Col>
                  </Row>
                  <Row style={{margin: 0}}>
                    {selectedSystemObj && selectedSystemObj.damage.validate ? (
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
                        disabled={sent}
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
      displayName
      damage {
        damaged
        report
        requested
        reactivationCode
        neededReactivationCode
        currentStep
        validate
        which
      }
      simulatorId
      type
    }
  }
`;

export default graphql(SYSTEMS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {simulatorId: ownProps.simulator.id},
  }),
})(withApollo(DamageReportCore));
