import React, { Component } from "react";
import { Label } from "reactstrap";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import { Tooltip } from "reactstrap";
import { FormattedMessage } from "react-intl";

const AlertMessage = ({ number }) => {
  switch (number) {
    case 1:
      return (
        <FormattedMessage
          id="alert-level-description-1"
          defaultMessage="This alert condition is used when the ship is in danger or under attack. All crew members are put on duty at battle stations."
        />
      );
    case 2:
      return (
        <FormattedMessage
          id="alert-level-description-2"
          defaultMessage="This alert condition is used when the ship is in a dangerous situation, but is safe for the moment. All crew members are put on duty."
        />
      );
    case 3:
      return (
        <FormattedMessage
          id="alert-level-description-3"
          defaultMessage="This alert condition is used when the ship needs to be ready for a crisis. All off duty personnel are put on stand by status."
        />
      );
    case 4:
      return (
        <FormattedMessage
          id="alert-level-description-4"
          defaultMessage="This alert condition is used when the station has a minor problem. All crew except damage control is on standard duty."
        />
      );
    case 5:
      return (
        <FormattedMessage
          id="alert-level-description-5"
          defaultMessage="This alert condition is used when the ship is at normal running status. The crew is on standard duty and the ship is in no danger."
        />
      );
    default:
      return "";
  }
};

class AlertCondition extends Component {
  state = { cooldown: false };
  setAlert = number => {
    this.setState({ cooldown: true });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ cooldown: false }), 5000);
    if (this.state.cooldown) return;
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
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  toggle = which => {
    this.setState({
      [`alert${which}`]: !this.state[`alert${which}`]
    });
  };
  render() {
    return (
      <div className="alert-condition">
        <Label>
          <FormattedMessage
            id="alert-condition"
            defaultMessage="Alert Condition"
          />
        </Label>
        <div className="button-container">
          {[5, 4, 3, 2, 1].map(a => (
            <div
              key={`alert-condition-${a}`}
              className={`alert-button alert-${a}`}
              id={`alert${a}`}
              onClick={() => this.setAlert(a)}
            >
              {a}
              <Tooltip
                placement="top"
                isOpen={this.state[`alert${a}`]}
                target={`alert${a}`}
                toggle={() => this.toggle(a)}
                delay={{ show: 0, hide: 0 }}
              >
                <AlertMessage number={a} />
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withApollo(AlertCondition);
