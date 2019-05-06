import React, { Fragment, Component } from "react";
import { Container, Row, Col, Button, Card, CardBody } from "reactstrap";
import Tour from "helpers/tourHelper";
import FontAwesome from "react-fontawesome";
import { Mutation, withApollo } from "react-apollo";
import gql from "graphql-tag.macro";
import { FormattedMessage } from "react-intl";
import ReportView from "./reportView";

import "./style.scss";

function systemClasses(s, selected) {
  const task = s.tasks ? s.tasks.find(t => !t.verified) || {} : {};
  return `${selected ? "selected" : ""} ${
    s.damage && s.damage.requested ? "requested" : ""
  } ${s.damage ? (s.damage.report ? "report" : "") : "report"} ${
    (s.damage ? s.damage.validate : task.verifyRequested) ? "validate" : ""
  } ${s.damage && s.damage.destroyed ? "destroyed" : ""}`;
}
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
              defaultMessage="If a research and development report hasn't been compiled, you need to request a report by clicking on this button."
            />
          )
        },
        {
          selector: ".damageReport-text",
          content: (
            <FormattedMessage
              id="damage-report-rnd-training-3"
              defaultMessage="When a system may be upgraded instructions to perform the upgrade will appear here. Follow them exactly."
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
            defaultMessage="The ship’s systems are intelligent enough to know when they’re damaged, and to understand generally how they can be fixed. A list of damaged systems appears here. Click a system to see the damage report"
          />
        )
      },
      {
        selector: ".request-report",
        content: (
          <FormattedMessage
            id="damage-report-training-2"
            defaultMessage="If a damage report hasn't been compiled, you need to request a damage report by clicking on this button."
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
            defaultMessage="Occasionally a system needs a reactivation code to be entered before it can be repaired. Click the 'Enter Reactivation Code' button, then press the symbols listed in your damage report. Once the reactivation code is accepted, the system will be repaired."
          />
        )
      }
    ];
  };
  systemName(sys) {
    if (sys.type === "Shield") {
      return `${sys.name} Shields`;
    }

    return sys.displayName || sys.name;
  }
  selectSystem(id) {
    const { systems, taskReports } = this.props;
    const systemObj = systems.find(s => s.id === id);
    const taskReport = taskReports.find(t => t.id === id);
    const system = taskReport ? taskReport.system : systemObj;
    this.setState({
      selectedSystem: id,
      codeEntry: system.damage.reactivationCode || ""
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
    const { systems = [], taskReports = [] } = this.props;
    const system = systems.find(s => s.id === this.state.selectedSystem);

    const taskReport = taskReports.find(
      s => s.id === this.state.selectedSystem
    );
    const variables = {
      systemId: system ? system.id : taskReport && taskReport.system.id,
      code: this.state.codeEntry,
      station: this.props.station.name
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };

  render() {
    const { selectedSystem, reactivationCodeModal, codeEntry } = this.state;
    const {
      systems = [],
      stepDamage,
      verifyStep,
      which,
      taskReports = []
    } = this.props;
    const damagedSystem = systems.find(s => selectedSystem === s.id) || {
      ...taskReports.find(s => s.id === selectedSystem),
      damage: {}
    };
    const system =
      (selectedSystem && systems.find(s => s.id === selectedSystem)) ||
      taskReports.find(s => s.id === selectedSystem);

    const reportList = systems
      .filter(
        s => s.damage.damaged && !taskReports.find(t => t.system.id === s.id)
      )
      .map(s => ({
        ...s,
        className: systemClasses(s, selectedSystem === s.id),
        type: "legacy",
        onClick: s.damage.destroyed ? () => {} : () => this.selectSystem(s.id),
        name: this.systemName(s),
        children: (
          <Fragment>
            {s.damage.validate ? <FontAwesome name="refresh" spin /> : null}{" "}
            {this.systemName(s)}
          </Fragment>
        )
      }))
      .concat(
        taskReports.map(t => {
          const task = t.tasks ? t.tasks.find(tt => !tt.verified) || {} : {};
          return {
            ...t,
            className: systemClasses(t, selectedSystem === t.id),
            type: "task",
            onClick: () => this.selectSystem(t.id),
            children: (
              <Fragment>
                {task.verifyRequested ? (
                  <FontAwesome name="refresh" spin />
                ) : null}{" "}
                {t.name}
              </Fragment>
            )
          };
        })
      );

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
              ) : which === "engineering" ? (
                <FormattedMessage
                  id="damage-report-engineering"
                  description="Below this header is a list of engineering reports"
                  defaultMessage="Engineering Bypass"
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
                            description="A button to stop entering a reactivation code."
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
                            description="A button to clear the reactivation code input."
                            defaultMessage="Clear"
                          />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  reportList.map(s => <p key={s.id} {...s} />)
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
                  description="A button to confirm the entered reactivation code and begin the reactivation process."
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
                        description="A button to request a report for a system."
                        defaultMessage="Request Report"
                      />
                    ) : which === "engineering" ? (
                      <FormattedMessage
                        id="engineering-report-request"
                        description="A button to request a report for a system."
                        defaultMessage="Request Engineering Report"
                      />
                    ) : (
                      <FormattedMessage
                        id="damage-report-request"
                        description="A button to request a repair report for a damaged system."
                        defaultMessage="Request Damage Report"
                      />
                    )}
                  </Button>
                )}
              </Mutation>
            )}
            {(damagedSystem.damage.neededReactivationCode ||
              damagedSystem.tasks) && (
              <Button
                block
                color="primary"
                onClick={reactivationCodeModal ? () => {} : this.toggle}
              >
                {codeEntry ? codeEntry : "Enter Reactivation Code..."}
              </Button>
            )}
          </Col>
          <Col sm="9" className="damage-report">
            <ReportView
              system={system}
              stepDamage={stepDamage}
              verifyStep={verifyStep}
              type={system && system.tasks ? "task" : "legacy"}
            />
          </Col>
        </Row>

        <Tour steps={this.trainingSteps()} client={this.props.clientObj} />
      </Container>
    );
  }
}

export default withApollo(DamageControl);
