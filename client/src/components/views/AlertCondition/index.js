import React, { Component } from "react";
import { withApollo, Query } from "react-apollo";
import { Container, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import Tour from "helpers/tourHelper";
import SubscriptionHelper from "helpers/subscriptionHelper";

import "./style.scss";

const trainingSteps = [
  {
    selector: ".enginesBar",
    content:
      "Alert conditions are easy ways of letting the entire crew know what the state of the ship is. When you change the alert condition, everyone on the ship will know."
  },
  {
    selector: ".alerts",
    content:
      "Click on one of these alert conditions to change it. You can move your mouse over the condition to see a description of when the condition is applicable."
  }
];

const queryData = `
id
alertlevel
alertLevelLock`;

class AlertCondition extends Component {
  state = { hoverAlert: null };
  setAlert(number) {
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
  }
  render() {
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
    return (
      <Query
        query={gql`
          query simulators($id: String) {
            simulators(id: $id) {
              ${queryData}
            }
          }
        `}
        variables={{ id: this.props.simulator.id }}
      >
        {({ loading, data, subscribeToMore }) =>
          loading ? null : (
            <Container fluid className="alert-condition">
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: gql`
              subscription SimulatorsSub($id: ID) {
    simulatorsUpdate(simulatorId: $id) {
      ${queryData}
    }
  }`,
                    variables: { id: this.props.simulator.id },
                    updateQuery: (previousResult, { subscriptionData }) => {
                      return Object.assign({}, previousResult, {
                        simulators: subscriptionData.data.simulatorsUpdate
                      });
                    }
                  })
                }
              />
              <Row>
                <Col sm={8} className="alerts">
                  <ul>
                    {alertLevels.map(l => (
                      <li
                        key={`alert-${l.number}`}
                        className={`alert${l.number}`}
                        onMouseLeave={() => this.setState({ hoverAlert: null })}
                        onMouseEnter={() =>
                          this.setState({ hoverAlert: l.number })
                        }
                        onClick={
                          data.simulators[0].alertLevelLock
                            ? () => {}
                            : () => this.setAlert(l.number)
                        }
                      >
                        Alert Condition {l.number}
                      </li>
                    ))}
                  </ul>
                  <div className="alertDescriptions">
                    <p className="alertInfo">
                      {this.state.hoverAlert &&
                        alertLevels.find(
                          l => l.number === this.state.hoverAlert
                        ).text}
                    </p>
                  </div>
                </Col>
              </Row>
              <Tour steps={trainingSteps} client={this.props.clientObj} />
            </Container>
          )
        }
      </Query>
    );
  }
}

export default withApollo(AlertCondition);
