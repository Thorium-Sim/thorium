import React, { Component } from "react";
import { Label, Input, FormGroup } from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import HashtagDefinition from "helpers/hashtagDefinition";

export default class GenericConfig extends Component {
  constructor(props) {
    super(props);
    this.state = props.args;
  }
  componentDidUpdate(oldProps) {
    if (JSON.stringify(oldProps.args) !== JSON.stringify(this.props.args)) {
      this.setState(this.props.args);
    }
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
  updateEnd = evt => {
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
          end: evt.target.checked
        }
      }
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Simulators"]
    });
  };
  render() {
    return (
      <div>
        <div>Damage Team Config</div>
        <HashtagDefinition system />
        <FormGroup check>
          <Label check>
            Put at end of report?{" "}
            <Input
              type="checkbox"
              checked={this.props.args.end}
              onChange={this.updateEnd}
            />
          </Label>
        </FormGroup>
        <Label>Preamble</Label>
        <Input
          type="textarea"
          value={this.state.preamble || ""}
          onChange={evt => this.setState({ preamble: evt.target.value })}
          onBlur={evt => this.update(evt, "preamble")}
        />
        <Label>Type</Label>
        <Input
          type="select"
          value={this.props.args.type}
          onChange={evt => this.update(evt, "type")}
        />
        <Label>Name</Label>
        <Input
          type="textarea"
          value={this.state.name || ""}
          onChange={evt => this.setState({ name: evt.target.value })}
          onBlur={evt => this.update(evt, "name")}
        />
        <Label>Orders</Label>
        <Input
          type="textarea"
          value={this.state.orders || ""}
          onChange={evt => this.setState({ orders: evt.target.value })}
          onBlur={evt => this.update(evt, "orders")}
        />
        <Label>Room</Label>
        <Input
          type="text"
          value={this.state.room || ""}
          onChange={evt => this.setState({ room: evt.target.value })}
          onBlur={evt => this.update(evt, "room")}
        />
      </div>
    );
  }
}
