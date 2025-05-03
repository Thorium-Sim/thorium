import React, {Component, useState} from "react";
import {Query, useMutation} from "react-apollo";
import {Container, Row, Col} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import Tour from "helpers/tourHelper";
import SubscriptionHelper from "helpers/subscriptionHelper";

import "./style.scss";
import useSoundEffect from "../../../helpers/hooks/useSoundEffect";

const trainingSteps = [
  {
    selector: ".enginesBar",
    content:
      "Alert conditions are easy ways of letting the entire crew know what the state of the ship is. When you change the alert condition, everyone on the ship will know.",
  },
  {
    selector: ".alerts",
    content:
      "Click on one of these alert conditions to change it. You can move your mouse over the condition to see a description of when the condition is applicable.",
  },
];

const fragment = gql`
  fragment AlertData on Simulator {
    id
    alertlevel
    alertLevelLock
  }
`;
const alertLevels = [
  {
    number: 5,
    text:
      "This alert condition is used when the ship is at normal running status. The crew is on standard duty and the ship is in no danger.",
  },
  {
    number: 4,
    text:
      "This alert condition is used when the station has a minor problem. All crew except damage control is on standard duty.",
  },
  {
    number: 3,
    text:
      "This alert condition is used when the ship needs to be ready for a crisis. All off duty personnel are put on stand by status.",
  },
  {
    number: 2,
    text:
      "This alert condition is used when the ship is in a dangerous situation, but is safe for the moment. All crew members are put on duty.",
  },
  {
    number: 1,
    text:
      "This alert condition is used when the ship is in danger or under attack. All crew members are put on duty at battle stations.",
  },
];

const CHANGE_ALERT_LEVEL = gql`
  mutation AlertLevel($id: ID!, $level: String!) {
    changeSimulatorAlertLevel(simulatorId: $id, alertLevel: $level)
  }
`;
const Card = ({alertLevelLock, simulator}) => {
  const [hoverAlert, setHoverAlert] = useState(null);
  const playEffect = useSoundEffect();
  const [setAlertLevel] = useMutation(CHANGE_ALERT_LEVEL);
  const setAlert = number => {
    playEffect("buttonClick");
    setAlertLevel({
      variables: {
        id: simulator.id,
        level: String(number),
      },
    });
  };
  return (
    <Row>
      <Col sm={8} className="alerts">
        <ul>
          {alertLevels.map(l => (
            <li
              key={`alert-${l.number}`}
              className={`alert${l.number}`}
              onMouseLeave={() => {
                setHoverAlert(null);
                playEffect("buttonHover");
              }}
              onMouseEnter={() => setHoverAlert(l.number)}
              onClick={alertLevelLock ? () => {} : () => setAlert(l.number)}
            >
              Alert Condition {l.number}
            </li>
          ))}
        </ul>
        <div className="alertDescriptions">
          <p className="alertInfo">
            {hoverAlert && alertLevels.find(l => l.number === hoverAlert).text}
          </p>
        </div>
      </Col>
    </Row>
  );
};
export const ALERT_QUERY = gql`
  query simulators($id: ID) {
    simulators(id: $id) {
      ...AlertData
    }
  }
  ${fragment}
`;
export const ALERT_SUB = gql`
  subscription SimulatorsSub($id: ID) {
    simulatorsUpdate(simulatorId: $id) {
      ...AlertData
    }
  }
  ${fragment}
`;
class AlertCondition extends Component {
  render() {
    return (
      <>
        <Query query={ALERT_QUERY} variables={{id: this.props.simulator.id}}>
          {({loading, data, subscribeToMore}) =>
            loading || !data ? null : (
              <Container fluid className="alert-condition">
                <SubscriptionHelper
                  subscribe={() =>
                    subscribeToMore({
                      document: ALERT_SUB,
                      variables: {id: this.props.simulator.id},
                      updateQuery: (previousResult, {subscriptionData}) => {
                        return Object.assign({}, previousResult, {
                          simulators: subscriptionData.data.simulatorsUpdate,
                        });
                      },
                    })
                  }
                />
                <Card
                  simulator={this.props.simulator}
                  alertLevelLock={data.simulators[0].alertLevelLock}
                />
                <Tour steps={trainingSteps} client={this.props.clientObj} />
              </Container>
            )
          }
        </Query>
      </>
    );
  }
}

export default AlertCondition;
