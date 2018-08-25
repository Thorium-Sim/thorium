import React, { Component } from "react";
import { Label, Input, FormGroup } from "reactstrap";
import gql from "graphql-tag";

export default class GenericConfig extends Component {
  constructor(props) {
    super(props);
    this.state = props.args;
  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.args);
  }
  update = (evt, which) => {
    const { simulatorId, systemId, id, client } = this.props;
    const mutation =
      systemId === "simulator"
        ? gql`
            mutation UpdateDamageStep(
              $simulatorId: ID!
              $step: DamageStepInput!
            ) {
              updateSimulatorDamageStep(simulatorId: $simulatorId, step: $step)
            }
          `
        : gql`
            mutation UpdateDamageStep($systemId: ID!, $step: DamageStepInput!) {
              updateSystemDamageStep(systemId: $systemId, step: $step)
            }
          `;
    const variables = {
      simulatorId,
      systemId,
      step: {
        id,
        args: {
          [which]: evt.target.value
        }
      }
    };
    client.mutate({ mutation, variables, refetchQueries: ["Simulators"] });
  };
  render() {
    return (
      <div>
        <div>Remote Access Config</div>
        <small>
          You can use some hashtags to make your report dynamic:
          <ul>
            <li>
              <strong>#COLOR</strong> - a random color of red, green, blue,
              yellow
            </li>
            <li>
              <strong>#PART</strong> - a random exocomp part
            </li>
            <li>
              <strong>#[1 - 2]</strong> - a random whole number between the two
              listed numbers
            </li>
            <li>
              <strong>#["string1", "string2", "string3", etc.]</strong> - a
              random string from the list provided
            </li>
          </ul>
        </small>
        <FormGroup check>
          <Label check>
            Put at end of report?{" "}
            <Input
              type="checkbox"
              checked={this.props.args.end}
              onChange={evt => this.update(evt, "end")}
            />
          </Label>
        </FormGroup>
        <Label>Code</Label>
        <Input
          type="text"
          value={this.state.code || ""}
          onChange={evt => this.setState({ code: evt.target.value })}
          onBlur={evt => this.update(evt, "code")}
        />
        <small>Leave blank to use random code</small>
        <Label>Backup Code</Label>
        <Input
          type="text"
          value={this.state.backup || ""}
          onChange={evt => this.setState({ backup: evt.target.value })}
          onBlur={evt => this.update(evt, "backup")}
        />
        <small>Leave blank to use random code</small>
      </div>
    );
  }
}
