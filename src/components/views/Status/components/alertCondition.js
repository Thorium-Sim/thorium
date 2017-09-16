import React, { Component } from "react";
import { Label } from "reactstrap";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import { Tooltip } from "reactstrap";

const alertLevels = [
  {
    number: 5,
    text:
      "This alert condition is used when the ship is at normal running status. The crew is on standard duty and the ship is in no danger."
  },
  {
    number: 4,
    text:
      "This alert condition is used when the station has a minor problem. All crew except damage control is on standard duty."
  },
  {
    number: 3,
    text:
      "This alert condition is used when the ship needs to be ready for a crisis. All off duty personnel are put on stand by status."
  },
  {
    number: 2,
    text:
      "This alert condition is used when the ship is in a dangerous situation, but is safe for the moment. All crew members are put on duty."
  },
  {
    number: 1,
    text:
      "This alert condition is used when the ship is in danger or under attack. All crew members are put on duty at battle stations."
  }
];

class AlertCondition extends Component {
  state = {};
  setAlert = number => {
    const mutation = gql`
      mutation AlertLevel($id: ID!, $level: String!) {
        changeSimulatorAlertLevel(simulatorId: $id, alertLevel: $level)
      }
    `;
    const variables = {
      id: this.props.simulator.id,
      level: number
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  toggle = which => {
    this.setState({
      [`alert${which}`]: !this.state[`alert${which}`]
    });
  };
  render() {
    return (
      <div>
        <Label>Alert Condition</Label>
        <div className="button-container">
          {alertLevels.map(a =>
            <div
              key={`alert-condition-${a.number}`}
              className={`alert-button alert-${a.number}`}
              id={`alert${a.number}`}
              onClick={() => this.setAlert(a.number)}
            >
              {a.number}
              <Tooltip
                placement="top"
                isOpen={this.state[`alert${a.number}`]}
                target={`alert${a.number}`}
                toggle={() => this.toggle(a.number)}
                delay={{ show: 0, hide: 0 }}
              >
                {a.text}
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withApollo(AlertCondition);
