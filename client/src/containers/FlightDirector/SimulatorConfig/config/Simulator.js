import React, { Component } from "react";
import LayoutList from "components/layouts";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

const Layouts = Object.keys(LayoutList).filter(
  s => s.indexOf("Viewscreen") === -1
);

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
    return (
      <div>
        <small>
          These values represent the properties of the simulator itself.
        </small>
        <form>
          <fieldset className="form-group">
            <label>Name</label>
            <input
              onChange={this._handleChange.bind(this)}
              defaultValue={this.props.selectedSimulator.name}
              type="text"
              name="name"
              className="form-control"
              placeholder="USS Voyager"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Layout</label>
            <select
              onChange={this._handleChange.bind(this)}
              defaultValue={this.props.selectedSimulator.layout}
              name="layout"
              className="c-select form-control"
            >
              {Layouts.map(e => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </fieldset>
          <fieldset className="form-group">
            <label>Make all text uppercase (including typed-in text)</label>
            <input
              type="checkbox"
              defaultChecked={this.props.selectedSimulator.caps}
              name="changeCaps"
              onChange={this._handleChange.bind(this)}
            />
          </fieldset>
          <fieldset className="form-group">
            <label>
              Simulator has printer (enables print button for code cyphers and
              officers log)
            </label>
            <input
              type="checkbox"
              defaultChecked={this.props.selectedSimulator.hasPrinter}
              name="hasPrinter"
              onChange={this._handleChange.bind(this)}
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Alert Level</label>
            <select
              onChange={this._handleChange.bind(this)}
              defaultValue={this.props.selectedSimulator.alertlevel}
              name="alertLevel"
              className="c-select form-control"
            >
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="2">1</option>
              <option value="p">P</option>
            </select>
          </fieldset>
          <fieldset className="form-group">
            <label>Split damage reports into steps </label>
            <input
              type="checkbox"
              defaultChecked={this.props.selectedSimulator.stepDamage}
              name="stepDamage"
              onChange={this._handleChange.bind(this)}
            />
          </fieldset>
          <fieldset className="form-group">
            <label>
              Require damage report step validation (must use step damage
              option)
            </label>
            <input
              type="checkbox"
              defaultChecked={this.props.selectedSimulator.verifyStep}
              name="verifyStep"
              onChange={this._handleChange.bind(this)}
            />
          </fieldset>
          <fieldset className="form-group">
            <label>
              Bridge Station Messaging - Allow messaging between bridge stations
            </label>
            <input
              type="checkbox"
              defaultChecked={
                this.props.selectedSimulator.bridgeOfficerMessaging
              }
              name="setBridgeMessaging"
              onChange={this._handleChange.bind(this)}
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Exocomp Count</label>
            <input
              type="range"
              min="0"
              max="5"
              name="exocomps"
              onChange={this._handleChange}
              defaultValue={this.props.selectedSimulator.exocomps}
            />{" "}
            {this.props.selectedSimulator.exocomps}
          </fieldset>
        </form>
      </div>
    );
  }
}

export default withApollo(SimulatorConfigView);
