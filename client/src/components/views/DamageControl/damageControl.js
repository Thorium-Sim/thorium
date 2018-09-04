import React, { Component } from "react";
import { Container, Row, Col, Button, Card, CardBody } from "reactstrap";
import Tour from "../../../helpers/tourHelper";
import FontAwesome from "react-fontawesome";
import { Mutation, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { FormattedMessage } from "react-intl";

import "./style.scss";

class DamageControl extends Component {
  state = {
    selectedSystem: null,
    reactivationCodeModal: false,
    codeEntry: ""
  };
  trainingSteps = () => {
    const { which } = this.props;
    if (which === "rnd") {
      return [
        {
          selector: ".damaged-systems",
          content: (
            <FormattedMessage
              id="damage-report-rnd-training-1"
              defaultMessage="At certain times during the mission, you may be able to complete Research and Development reports. These reports allow you to upgrade, improve, and activate ship systems."
            />
          )
        },
        {
          selector: ".request-report",
          content: (
            <FormattedMessage
              id="damage-report-rnd-training-2"
              defaultMessage="If a research and development report hasn't been calculated, you need to request a report by clicking on this button."
            />
          )
        },
        {
          selector: ".damageReport-text",
          content: (
            <FormattedMessage
              id="damage-report-rnd-training-3"
              defaultMessage="When a system may be upgraded, instructions to perform the upgrade will appear here. Follow them exactly."
            />
          )
        },
        {
          selector: ".damage-control",
          content: (
            <FormattedMessage
              id="damage-report-rnd-training-4"
              defaultMessage="Sometimes, a system needs a reactivation code to be entered before it can be upgraded. Click the 'Enter Reactivation Code' button, then press the symbols listed in your upgrade report. Once the reactivation code is accepted, the report will be complete."
            />
          )
        }
      ];
    }
    return [
      {
        selector: ".damaged-systems",
        content: (
          <FormattedMessage
            id="damage-report-training-1"
            defaultMessage="The ship’s systems are intelligent enough to know when they’re damaged, and to understand (mostly) how they can be fixed. A list of damaged systems appears here. Click a system to see the damage report"
          />
        )
      },
      {
        selector: ".request-report",
        content: (
          <FormattedMessage
            id="damage-report-training-2"
            defaultMessage="If a damage report hasn't been calculated, you need to request a damage report by clicking on this button."
          />
        )
      },
      {
        selector: ".damageReport-text",
        content: (
          <FormattedMessage
            id="damage-report-training-3"
            defaultMessage="When a system is damaged, instructions to troubleshoot and repair the damaged system will appear here. Follow them exactly."
          />
        )
      },
      {
        selector: ".damage-control",
        content: (
          <FormattedMessage
            id="damage-report-training-4"
            defaultMessage="Sometimes, a system needs a reactivation code to be entered before it can be repaired. Click the 'Enter Reactivation Code' button, then press the symbols listed in your damage report. Once the reactivation code is accepted, the system will be repaired."
          />
        )
      }
    ];
  };
  systemName(sys) {
    if (sys.type === "Shield") {
      return `${sys.name} Shields`;
    }
    if (sys.type === "Engine") {
      return `${sys.name} Engines`;
    }
    return sys.name;
  }
  selectSystem(id) {
    const selectedSystem = this.props.systems.find(s => s.id === id);
    this.setState({
      selectedSystem: id,
      codeEntry: selectedSystem.damage.reactivationCode || ""
    });
  }
  toggle = () => {
    this.setState({
      reactivationCodeModal: !this.state.reactivationCodeModal
    });
  };
  cancelReactivationCode = () => {
    this.setState({
      reactivationCodeModal: false,
      codeEntry: ""
    });
  };
  setCodeEntry = c => {
    if ((this.state.codeEntry + c).length <= 8) {
      this.setState({
        codeEntry: this.state.codeEntry + c
      });
    }
  };
  clearCodeEntry = () => {
    this.setState({
      codeEntry: ""
    });
  };
  damageReportText = (system, steps, stepDamage) => {
    if (system) {
      if (stepDamage) {
        return steps[system.damage.currentStep || 0];
      }
      return system.damage.report;
    }
  };
  reactivateCode = () => {
    this.toggle();
    const mutation = gql`
      mutation SendReactivationCode(
        $systemId: ID!
        $station: String!
        $code: String!
      ) {
        systemReactivationCode(
          systemId: $systemId
          station: $station
          code: $code
        )
      }
    `;
    const variables = {
      systemId: this.state.selectedSystem,
      code: this.state.codeEntry,
      station: this.props.station.name
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  setStep = step => {
    const mutation = gql`
      mutation SetDamageStep($systemId: ID!, $step: Int!) {
        updateCurrentDamageStep(systemId: $systemId, step: $step)
      }
    `;
    const variables = {
      systemId: this.state.selectedSystem,
      step: Math.max(0, step)
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  verifyStep = () => {
    const mutation = gql`
      mutation SetDamageStepValidation($id: ID!) {
        setDamageStepValidation(id: $id, validation: true)
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
    const { selectedSystem, reactivationCodeModal, codeEntry } = this.state;
    const { systems, stepDamage, verifyStep, which } = this.props;
    const damagedSystem = systems.find(s => selectedSystem === s.id) || {
      damage: {}
    };
    const system =
      selectedSystem && systems
        ? systems.find(s => s.id === selectedSystem)
        : null;
    const report = system ? system.damage.report : "";
    const steps = report
      ? report.split(/Step [0-9]+:\n/gi).filter(s => s && s !== "\n")
      : [];
    return (
      <Container fluid className="damage-control">
        <Row>
          <Col
            sm="3"
            className={`damage-list ${
              damagedSystem.damage.neededReactivationCode
                ? "reactivation-code"
                : ""
            }`}
          >
            <h4>
              {" "}
              {which === "rnd" ? (
                <FormattedMessage
                  id="damage-report-rnd"
                  description="Below this header is a list of available research and development reports"
                  defaultMessage="Available R&D Reports"
                />
              ) : (
                <FormattedMessage
                  id="damage-report-systems"
                  description="Below this header is a list of damaged system repair reports"
                  defaultMessage="Damaged Systems"
                />
              )}
            </h4>

            <Card>
              <CardBody className="damaged-systems">
                {reactivationCodeModal ? (
                  <div className="reactivation-modal">
                    <ul className="flex-boxes">
                      {["¥", "Ω", "∏", "§", "-", "∆", "£", "∑", "∂"].map(
                        (c, i) => (
                          <li key={i} onClick={() => this.setCodeEntry(c)}>
                            {c}
                          </li>
                        )
                      )}
                    </ul>
                    <Row>
                      <Col sm={5}>
                        <Button
                          block
                          color="danger"
                          onClick={this.cancelReactivationCode}
                        >
                          <FormattedMessage
                            id="damage-report-cancel"
                            description="A button to stop entering a reactivation code"
                            defaultMessage="Cancel"
                          />
                        </Button>
                      </Col>
                      <Col sm={{ size: 5, offset: 2 }}>
                        <Button
                          block
                          color="warning"
                          onClick={this.clearCodeEntry}
                        >
                          <FormattedMessage
                            id="damage-report-clear"
                            description="A button to clear the reactivation code input"
                            defaultMessage="Clear"
                          />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  systems.filter(s => s.damage.damaged).map(s => (
                    <p
                      key={s.id}
                      className={`${
                        selectedSystem === s.id ? "selected" : ""
                      } ${s.damage.requested ? "requested" : ""} ${
                        s.damage.report ? "report" : ""
                      } ${s.damage.validate ? "validate" : ""} ${
                        s.damage.destroyed ? "destroyed" : ""
                      }`}
                      onClick={
                        s.damage.destroyed
                          ? () => {}
                          : () => this.selectSystem(s.id)
                      }
                    >
                      {s.damage.validate ? (
                        <FontAwesome name="refresh" spin />
                      ) : null}{" "}
                      {this.systemName(s)}
                    </p>
                  ))
                )}
              </CardBody>
            </Card>
            {reactivationCodeModal ? (
              <Button
                block
                size="lg"
                color="primary"
                onClick={this.reactivateCode}
              >
                <FormattedMessage
                  id="damage-report-reactivate"
                  description="A button to confirm the entered reactivation code and begin the reactivation process"
                  defaultMessage="Reactivate"
                />
              </Button>
            ) : (
              <Mutation
                mutation={gql`
                  mutation RequestReport($systemId: ID!) {
                    requestDamageReport(systemId: $systemId)
                  }
                `}
                variables={{
                  systemId: selectedSystem
                }}
              >
                {action => (
                  <Button
                    block
                    className="request-report"
                    disabled={!selectedSystem || damagedSystem.damage.requested}
                    onClick={action}
                    color="primary"
                  >
                    {which === "rnd" ? (
                      <FormattedMessage
                        id="rnd-report-request"
                        description="A button to request a report for a system"
                        defaultMessage="Request Report"
                      />
                    ) : (
                      <FormattedMessage
                        id="damage-report-request"
                        description="A button to request a repair report for a damaged system"
                        defaultMessage="Request Damage Report"
                      />
                    )}
                  </Button>
                )}
              </Mutation>
            )}
            {damagedSystem.damage.neededReactivationCode && (
              <Card
                className="reactivation-code-entry"
                onClick={reactivationCodeModal ? () => {} : this.toggle}
              >
                <CardBody>
                  <p className={`${codeEntry ? "code-entry" : ""}`}>
                    {codeEntry ? codeEntry : "Enter Reactivation Code..."}
                  </p>
                </CardBody>
              </Card>
            )}
          </Col>
          <Col sm="9" className="damage-report">
            <Row>
              <Col sm={12}>
                <h4>
                  {which === "rnd" ? (
                    <FormattedMessage
                      id="damage-report-rnd-report"
                      description="A header for the research & development report readout"
                      defaultMessage="R&D Report"
                    />
                  ) : (
                    <FormattedMessage
                      id="damage-report-report"
                      description="A header for the damage report readout"
                      defaultMessage="Damage Report"
                    />
                  )}
                </h4>
                <Card>
                  <CardBody>
                    <p
                      className="damageReport-text"
                      style={{ fontSize: "24px" }}
                    >
                      {this.damageReportText(system, steps, stepDamage)}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {stepDamage && (
              <Row>
                <Col sm={3}>
                  {!verifyStep && (
                    <Button
                      disabled={!system || system.damage.currentStep === 0}
                      block
                      color="secondary"
                      onClick={() =>
                        this.setStep(system.damage.currentStep - 1)
                      }
                    >
                      <FormattedMessage
                        id="damage-report-previous"
                        description="A button to go to the previous step"
                        defaultMessage="Previous Step"
                      />
                    </Button>
                  )}
                </Col>
                <Col sm={6}>
                  <h3 className="text-center">
                    {system &&
                    (system.damage.damageReportText || system.damage.report)
                      ? system.damage.currentStep + 1
                      : 0}{" "}
                    / {steps.length}
                  </h3>
                </Col>
                <Col sm={3}>
                  {verifyStep ? (
                    <Button
                      disabled={
                        !system ||
                        steps.length === 0 ||
                        system.damage.currentStep === steps.length - 1 ||
                        system.damage.validate
                      }
                      block
                      color="secondary"
                      onClick={this.verifyStep}
                    >
                      {system && system.damage.validate ? (
                        <FormattedMessage
                          id="damage-report-verifying"
                          description="A message indicating that the damage report step is currently being verified"
                          defaultMessage="Verifying Step"
                        />
                      ) : (
                        <FormattedMessage
                          id="damage-report-verify"
                          description="A button to initiate verification of the damage report step to ensure it was completed correctly"
                          defaultMessage="Verify Step"
                        />
                      )}
                    </Button>
                  ) : (
                    <Button
                      disabled={
                        !system ||
                        steps.length === 0 ||
                        system.damage.currentStep === steps.length - 1
                      }
                      block
                      color="secondary"
                      onClick={() =>
                        this.setStep(system.damage.currentStep + 1)
                      }
                    >
                      <FormattedMessage
                        id="damage-report-next"
                        description="A button to go to the next step"
                        defaultMessage="Next Step"
                      />
                    </Button>
                  )}
                </Col>
              </Row>
            )}
          </Col>
        </Row>

        <Tour steps={this.trainingSteps()} client={this.props.clientObj} />
      </Container>
    );
  }
}

export default withApollo(DamageControl);
