import React, { Component } from "react";
import { Row, Col, Card, Input } from "reactstrap";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import * as steps from "./steps";

class DamageReportsConfig extends Component {
  state = {};
  addDamageStep = (evt, type) => {
    const mutation = gql`
      mutation AddDamageStep($systemId: ID!, $step: DamageStepInput!) {
        addSystemDamageStep(systemId: $systemId, step: $step)
      }
    `;
    const variables = {
      systemId: this.state.selectedSystem,
      step: {
        name: evt.target.value,
        args: {},
        type
      }
    };
    this.props.client.mutate({
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
    const requiredStep =
      selectedSystem &&
      selectedRequiredStep &&
      systems
        .find(s => s.id === selectedSystem)
        .requiredDamageSteps.find(s => s.id === selectedRequiredStep);
    const RequiredConfig = requiredStep && steps[requiredStep.name];
    const optionalStep =
      selectedSystem &&
      selectedOptionalStep &&
      systems
        .find(s => s.id === selectedSystem)
        .optionalDamageSteps.find(s => s.id === selectedOptionalStep);
    const OptionalConfig = optionalStep && steps[optionalStep.name];
    return (
      <div>
        <h4>Damage Reports Config</h4>
        <Row>
          <Col sm="3">
            Systems<Card className="scroll">
              {systems.map(s => (
                <li
                  key={s.id}
                  onClick={() =>
                    this.setState({
                      selectedSystem: s.id,
                      selectedRequiredStep: null,
                      selectedOptionalStep: null
                    })}
                  className={`list-group-item ${selectedSystem === s.id
                    ? "selected"
                    : ""}`}
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
                    <Card className="scroll">
                      {systems
                        .find(s => s.id === selectedSystem)
                        .requiredDamageSteps.map(s => (
                          <li
                            key={s.id}
                            onClick={() =>
                              this.setState({ selectedRequiredStep: s.id })}
                            className={`list-group-item ${selectedRequiredStep ===
                            s.id
                              ? "selected"
                              : ""}`}
                          >
                            {s.name}
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
                    <Card className="scroll">
                      {systems
                        .find(s => s.id === selectedSystem)
                        .optionalDamageSteps.map(s => (
                          <li
                            key={s.id}
                            onClick={() =>
                              this.setState({ selectedOptionalStep: s.id })}
                            className={`list-group-item ${selectedOptionalStep ===
                            s.id
                              ? "selected"
                              : ""}`}
                          >
                            {s.name}
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
