import React, { Component } from "react";
import { Label } from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import { withApollo, Query } from "react-apollo";
// import { Tooltip } from "helpers/reactstrap";
import { FormattedMessage } from "react-intl";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { publish } from "helpers/pubsub";

const fragment = gql`
  fragment AlertConditionData on Simulator {
    id
    alertlevel
    alertLevelLock
  }
`;

// const AlertMessage = ({ number }) => {
//   switch (number) {
//     case 1:
//       return (
//         <FormattedMessage
//           id="alert-level-description-1"
//           defaultMessage="This alert condition is used when the ship is in danger or under attack. All crew members are put on duty at battle stations."
//         />
//       );
//     case 2:
//       return (
//         <FormattedMessage
//           id="alert-level-description-2"
//           defaultMessage="This alert condition is used when the ship is in a dangerous situation, but is safe for the moment. All crew members are put on duty."
//         />
//       );
//     case 3:
//       return (
//         <FormattedMessage
//           id="alert-level-description-3"
//           defaultMessage="This alert condition is used when the ship needs to be ready for a crisis. All off duty personnel are put on stand by status."
//         />
//       );
//     case 4:
//       return (
//         <FormattedMessage
//           id="alert-level-description-4"
//           defaultMessage="This alert condition is used when the station has a minor problem. All crew except damage control is on standard duty."
//         />
//       );
//     case 5:
//       return (
//         <FormattedMessage
//           id="alert-level-description-5"
//           defaultMessage="This alert condition is used when the ship is at normal running status. The crew is on standard duty and the ship is in no danger."
//         />
//       );
//     default:
//       return "";
//   }
// };

class AlertCondition extends Component {
  state = { cooldown: false };
  setAlert = number => {
    this.setState({ cooldown: true });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ cooldown: false }), 5000);
    if (this.state.cooldown) {
      publish("triggerNotification", {
        title: "Cannot trigger alert change.",
        body: "Please wait a few seconds before changing the alert condition.",
        color: "warning"
      });
      return;
    }
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
      <Query
        query={gql`
          query simulators($id: ID) {
            simulators(id: $id) {
              ...AlertConditionData
            }
          }
          ${fragment}
        `}
        variables={{ id: this.props.simulator.id }}
      >
        {({ loading, data, subscribeToMore }) => (
          <div className="alert-condition">
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: gql`
                    subscription SimulatorsSub($id: ID) {
                      simulatorsUpdate(simulatorId: $id) {
                        ...AlertConditionData
                      }
                    }
                    ${fragment}
                  `,
                  variables: { id: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      simulators: subscriptionData.data.simulatorsUpdate
                    });
                  }
                })
              }
            />
            <Label>
              <FormattedMessage
                id="alert-condition"
                defaultMessage="Alert Condition"
              />
            </Label>
            <div className="button-container">
              {["5", "4", "3", "2", "1"].map(a => (
                <div
                  key={`alert-condition-${a}`}
                  className={`alert-button alert-${a}`}
                  id={`alert${a}`}
                  onClick={
                    data.simulators && data.simulators[0].alertLevelLock
                      ? () => {}
                      : () => this.setAlert(a)
                  }
                >
                  {a}
                  {/* <Tooltip
                      placement="top"
                      isOpen={this.state[`alert${a}`]}
                      target={`#alert${a}`}
                      toggle={() => this.toggle(a)}
                      delay={{ show: 0, hide: 0 }}
                    >
                      <AlertMessage number={a} />
                    </Tooltip> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </Query>
    );
  }
}

export default withApollo(AlertCondition);
