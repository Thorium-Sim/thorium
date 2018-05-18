import React, { Component } from "react";
import { Row, Col, Card, Input } from "reactstrap";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import FontAwesome from "react-fontawesome";
import * as steps from "./steps";

class DamageReportsConfig extends Component {
  state = {};
  addDamageStep = (evt, type) => {
    const {
      selectedSimulator: { id },
      client
    } = this.props;
    const { selectedSystem } = this.state;
    const mutation =
      selectedSystem === "simulator"
        ? gql`
            mutation AddDamageStep($simulatorId: ID!, $step: DamageStepInput!) {
              addSimulatorDamageStep(simulatorId: $simulatorId, step: $step)
            }
          `
        : gql`
            mutation AddDamageStep($systemId: ID!, $step: DamageStepInput!) {
              addSystemDamageStep(systemId: $systemId, step: $step)
            }
          `;
    const step = {
      name: evt.target.value,
      args: {},
      type
    };
    const variables =
      selectedSystem === "simulator"
        ? {
            simulatorId: id,
            step
          }
        : {
            systemId: selectedSystem,
            step
          };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Simulators"]
    });
  };
  removeDamageStep = stepId => {
    const {
      selectedSimulator: { id },
      client
    } = this.props;
    const { selectedSystem } = this.state;
    const mutation =
      selectedSystem === "simulator"
        ? gql`
            mutation RemoveDamageStep($simulatorId: ID!, $stepId: ID!) {
              removeSimulatorDamageStep(
                simulatorId: $simulatorId
                step: $stepId
              )
            }
          `
        : gql`
            mutation RemoveDamageStep($systemId: ID!, $stepId: ID!) {
              removeSystemDamageStep(systemId: $systemId, step: $stepId)
            }
          `;
    const variables =
      selectedSystem === "simulator"
        ? {
            simulatorId: id,
            stepId
          }
        : {
            systemId: selectedSystem,
            stepId
          };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Simulators"]
    });
  };
  render() {
    const { selectedSimulator, client } = this.props;
    const {
      selectedSystem,
      selectedRequiredStep,
      selectedOptionalStep
    } = this.state;
    const { systems } = selectedSimulator;
    const requiredSteps = selectedSystem
      ? (selectedSystem === "simulator"
          ? selectedSimulator
          : systems.find(s => s.id === selectedSystem)
        ).requiredDamageSteps
      : [];
    const optionalSteps = selectedSystem
      ? (selectedSystem === "simulator"
          ? selectedSimulator
          : systems.find(s => s.id === selectedSystem)
        ).optionalDamageSteps
      : [];

    const requiredStep =
      selectedSystem &&
      selectedRequiredStep &&
      requiredSteps.find(s => s.id === selectedRequiredStep);
    const RequiredConfig = requiredStep && steps[requiredStep.name];
    const optionalStep =
      selectedSystem &&
      selectedOptionalStep &&
      optionalSteps.find(s => s.id === selectedOptionalStep);
    const OptionalConfig = optionalStep && steps[optionalStep.name];
    return (
      <div>
        <h4>Damage Reports Config</h4>
        <Row>
          <Col sm="3">
            Systems
            <Card className="scroll">
              <li
                onClick={() =>
                  this.setState({
                    selectedSystem: "simulator",
                    selectedRequiredStep: null,
                    selectedOptionalStep: null
                  })
                }
                className={`list-group-item ${
                  selectedSystem === "simulator" ? "selected" : ""
                }`}
              >
                Simulator
              </li>
              {systems.map(s => (
                <li
                  key={s.id}
                  onClick={() =>
                    this.setState({
                      selectedSystem: s.id,
                      selectedRequiredStep: null,
                      selectedOptionalStep: null
                    })
                  }
                  className={`list-group-item ${
                    selectedSystem === s.id ? "selected" : ""
                  }`}
                >
                  {s.name}
                </li>
              ))}
            </Card>
          </Col>
          {selectedSystem && (
            <Col>
              Required Steps
              <small>These steps appear on every damage report.</small>
              <Card>
                <Row>
                  <Col sm="4">
                    <Card className="scroll" style={{ maxHeight: "25vh" }}>
                      {requiredSteps.map(s => (
                        <li
                          key={s.id}
                          onClick={() =>
                            this.setState({ selectedRequiredStep: s.id })
                          }
                          className={`list-group-item ${
                            selectedRequiredStep === s.id ? "selected" : ""
                          }`}
                        >
                          {s.name}{" "}
                          <FontAwesome
                            className="text-danger"
                            name="ban"
                            onClick={() => this.removeDamageStep(s.id)}
                          />
                        </li>
                      ))}
                    </Card>
                    <Input
                      type="select"
                      value="Select"
                      onChange={evt => this.addDamageStep(evt, "required")}
                    >
                      <option value="Select" disabled>
                        Select a damage step
                      </option>
                      {Object.keys(steps).map(s => (
                        <option key={`required-${s}`} value={s}>
                          {s}
                        </option>
                      ))}
                    </Input>
                  </Col>
                  <Col sm="8">
                    {RequiredConfig && (
                      <RequiredConfig
                        {...requiredStep}
                        client={client}
                        systemId={selectedSystem}
                        simulatorId={selectedSimulator.id}
                      />
                    )}
                  </Col>
                </Row>
              </Card>
              Optional Steps
              <small>
                These steps provide the list from which the steps on the report
                are chosen at random.
              </small>
              <Card>
                <Row>
                  <Col sm="4">
                    <Card className="scroll" style={{ maxHeight: "25vh" }}>
                      {optionalSteps.map(s => (
                        <li
                          key={s.id}
                          onClick={() =>
                            this.setState({ selectedOptionalStep: s.id })
                          }
                          className={`list-group-item ${
                            selectedOptionalStep === s.id ? "selected" : ""
                          }`}
                        >
                          {s.name}{" "}
                          <FontAwesome
                            className="text-danger"
                            name="ban"
                            onClick={() => this.removeDamageStep(s.id)}
                          />
                        </li>
                      ))}
                    </Card>
                    <Input
                      type="select"
                      value="Select"
                      onChange={evt => this.addDamageStep(evt, "optional")}
                    >
                      <option value="Select" disabled>
                        Select a damage step
                      </option>
                      {Object.keys(steps).map(s => (
                        <option key={`optional-${s}`} value={s}>
                          {s}
                        </option>
                      ))}
                    </Input>
                  </Col>
                  <Col sm="8">
                    {OptionalConfig && (
                      <OptionalConfig
                        {...optionalStep}
                        client={client}
                        systemId={selectedSystem}
                        simulatorId={selectedSimulator.id}
                      />
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default withApollo(DamageReportsConfig);
