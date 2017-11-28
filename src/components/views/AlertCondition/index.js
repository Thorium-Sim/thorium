import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { Container, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import Tour from "reactour";

import "./style.css";

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
      <Container fluid className="alert-condition">
        <Row>
          <Col sm={8} className="alerts">
            <ul>
              {alertLevels.map(l => (
                <li
                  key={`alert-${l.number}`}
                  className={`alert${l.number}`}
                  onMouseLeave={() => this.setState({ hoverAlert: null })}
                  onMouseEnter={() => this.setState({ hoverAlert: l.number })}
                  onClick={() => this.setAlert(l.number)}
                >
                  Alert Condition {l.number}
                </li>
              ))}
            </ul>
            <div className="alertDescriptions">
              <p className="alertInfo">
                {this.state.hoverAlert &&
                  alertLevels.find(l => l.number === this.state.hoverAlert)
                    .text}
              </p>
            </div>
          </Col>
        </Row>
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
      </Container>
    );
  }
}

export default withApollo(AlertCondition);
