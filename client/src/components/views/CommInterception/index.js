import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Button } from "reactstrap";
import WaveMatch from "./waveMatch";
import Tour from "../../../helpers/tourHelper";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";

import "./style.scss";

const SUB = gql`
  subscription LRQueueingSub($simulatorId: ID) {
    longRangeCommunicationsUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
      interception
      locked
      decoded
    }
  }
`;

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "Sometimes your systems will detect signals which can be intercepted. These signals can be short range communications or long range messages."
  },
  {
    selector: ".centered-text",
    content:
      "When a signal can be intercepted, a button will appear which says 'Attempt Interception'. Clicking this button will begin the interception process."
  },
  {
    selector: ".wave-match",
    content:
      "To intercept a signal you must match the red carrier wave with the blue receiver wave. You can do this by adjusting the sliders below the signal display. Once the two signals match up, you can click 'Lock Signal' to lock on to the signal and intercept it."
  }
];

class Interception extends Component {
  state = {};
  renderInterception() {
    const {
      data: { longRangeCommunications }
    } = this.props;
    const { interception, decoded, locked } = longRangeCommunications[0];
    if (interception) {
      if (locked) {
        if (decoded) {
          return (
            <div className="centered-text">
              <h1>Signal Decoded</h1>
            </div>
          );
        }
        return (
          <div className="centered-text">
            <h1>Signal Locked</h1>
          </div>
        );
      }
      if (this.state.intercepting) {
        return (
          <WaveMatch
            client={this.props.client}
            lrComm={longRangeCommunications[0]}
          />
        );
      }
      return (
        <div className="centered-text">
          <h1>Active signal detected.</h1>
          <Button
            size="lg"
            color="warning"
            onClick={() => this.setState({ intercepting: true })}
          >
            Attempt Interception
          </Button>
        </div>
      );
    }
    return (
      <div className="centered-text">
        <h1>No active signals.</h1>
      </div>
    );
  }
  render() {
    const {
      data: { loading, longRangeCommunications }
    } = this.props;
    if (loading || !longRangeCommunications) return null;
    return (
      <Container className="card-commInterception">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  longRangeCommunications:
                    subscriptionData.data.longRangeCommunicationsUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={12}>{this.renderInterception()}</Col>
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}
const QUEUING_QUERY = gql`
  query LRQueuing($simulatorId: ID) {
    longRangeCommunications(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
      interception
      locked
      decoded
    }
  }
`;
export default graphql(QUEUING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Interception));
