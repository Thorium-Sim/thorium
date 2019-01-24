import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import Misc from "./misc";
import Basic from "./basic";
import Damage from "./damage";

const ops = {
  name: gql`
    mutation ChangeName($id: ID!, $value: String!) {
      renameSimulator(simulatorId: $id, name: $value)
    }
  `,
  layout: gql`
    mutation ChangeLayout($id: ID!, $value: String!) {
      changeSimulatorLayout(simulatorId: $id, layout: $value)
    }
  `,
  alertLevel: gql`
    mutation ChangeAlert($id: ID!, $value: String!) {
      changeSimulatorAlertLevel(simulatorId: $id, alertLevel: $value)
    }
  `,
  exocomps: gql`
    mutation ChangeExocomps($id: ID!, $value: Int!) {
      changeSimulatorExocomps(simulatorId: $id, exocomps: $value)
    }
  `,
  stepDamage: gql`
    mutation SetStepDamage($id: ID!, $value: Boolean!) {
      setStepDamage(simulatorId: $id, stepDamage: $value)
    }
  `,
  verifyStep: gql`
    mutation SetVerify($id: ID!, $value: Boolean!) {
      setVerifyDamage(simulatorId: $id, verifyStep: $value)
    }
  `,
  setBridgeMessaging: gql`
    mutation SetBridgeOfficerMessaging($id: ID!, $value: Boolean!) {
      setBridgeMessaging(id: $id, messaging: $value)
    }
  `,
  changeCaps: gql`
    mutation SetCaps($id: ID!, $value: Boolean!) {
      changeSimulatorCaps(simulatorId: $id, caps: $value)
    }
  `,
  hasPrinter: gql`
    mutation SetHasPrinter($id: ID!, $value: Boolean!) {
      setSimulatorHasPrinter(simulatorId: $id, hasPrinter: $value)
    }
  `
};
class SimulatorConfigView extends Component {
  state = { selected: "default" };
  _handleChange = e => {
    const variables = {
      id: this.props.selectedSimulator.id,
      value: e.target.value === "on" ? e.target.checked : e.target.value
    };
    const mutation = ops[e.target.name];
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const { selected } = this.state;
    return (
      <div>
        <ButtonGroup>
          <Button
            size="sm"
            active={selected === "default"}
            onClick={() => this.setState({ selected: "default" })}
          >
            Basic
          </Button>
          <Button
            size="sm"
            active={selected === "misc"}
            onClick={() => this.setState({ selected: "misc" })}
          >
            Misc.
          </Button>
          <Button
            size="sm"
            active={selected === "damage"}
            onClick={() => this.setState({ selected: "damage" })}
          >
            Damage Reports
          </Button>
        </ButtonGroup>
        {selected === "default" && (
          <Basic
            selectedSimulator={this.props.selectedSimulator}
            handleChange={this._handleChange}
          />
        )}
        {selected === "damage" && (
          <Damage
            selectedSimulator={this.props.selectedSimulator}
            handleChange={this._handleChange}
          />
        )}
        {selected === "misc" && (
          <Misc
            selectedSimulator={this.props.selectedSimulator}
            handleChange={this._handleChange}
          />
        )}
      </div>
    );
  }
}

export default withApollo(SimulatorConfigView);
