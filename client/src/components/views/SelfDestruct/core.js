import React, { Component } from "react";
import gql from "graphql-tag";
import { Container } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import { InputField } from "../../generic/core";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import { Duration } from "luxon";
import "./style.scss";

function padDigits(number, digits) {
  return (
    Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
  );
}

const SELF_DESTRUCT_SUB = gql`
  subscription SelfDestructUpdate($id: ID) {
    simulatorsUpdate(simulatorId: $id) {
      id
      ship {
        selfDestructTime
        selfDestructCode
        selfDestructAuto
      }
    }
  }
`;

class SelfDestructCore extends Component {
  activate = time => {
    if (!time && time !== 0) return;
    const [hours, minutes, seconds] = time.split(":").map(t => parseInt(t, 10));
    const duration = Duration.fromObject({
      hours,
      minutes,
      seconds
    }).shiftTo("milliseconds").milliseconds;
    if (!duration && duration !== 0) return;
    const mutation = gql`
      mutation ActivateSelfDestruct($id: ID!, $time: Float) {
        setSelfDestructTime(simulatorId: $id, time: $time)
      }
    `;
    const sim = this.props.data.simulators[0];
    const variables = {
      id: sim.id,
      time: duration
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  setCode = code => {
    const mutation = gql`
      mutation SetSelfDestructCode($id: ID!, $code: String) {
        setSelfDestructCode(simulatorId: $id, code: $code)
      }
    `;
    const sim = this.props.data.simulators[0];
    const variables = {
      id: sim.id,
      code
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  setAuto = evt => {
    const mutation = gql`
      mutation SetSelfDestructAuto($id: ID!, $auto: Boolean) {
        setSelfDestructAuto(simulatorId: $id, auto: $auto)
      }
    `;
    const sim = this.props.data.simulators[0];
    const variables = {
      id: sim.id,
      auto: evt.target.checked
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.simulators) return null;
    const {
      selfDestructTime,
      selfDestructCode,
      selfDestructAuto
    } = this.props.data.simulators[0].ship;
    const duration = Duration.fromObject({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: selfDestructTime
    }).normalize();
    return (
      <Container className="self-destruct">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SELF_DESTRUCT_SUB,
              variables: {
                id: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  simulators: subscriptionData.data.simulatorsUpdate
                });
              }
            })
          }
        />
        <div>
          <label>
            Auto:{" "}
            <input
              type="checkbox"
              checked={selfDestructAuto}
              onChange={this.setAuto}
            />
          </label>
        </div>
        <div>
          <span style={{ float: "" }}>Code: </span>
          <InputField
            prompt="What is the new self-destruct code?"
            style={{ width: "calc(100% - 40px)", display: "inline-block" }}
            onClick={this.setCode}
          >
            {selfDestructCode}
          </InputField>
        </div>
        <InputField
          prompt="What is the time in &quot;hh:mm:ss&quot; format?"
          alert={selfDestructTime && selfDestructTime > 0}
          onClick={this.activate}
        >{`${padDigits(duration.hours, 2)}:${padDigits(
          duration.minutes,
          2
        )}:${padDigits(duration.seconds, 2)}`}</InputField>
      </Container>
    );
  }
}

const SELF_DESTRUCT_QUERY = gql`
  query SelfDestruct($id: String) {
    simulators(id: $id) {
      id
      ship {
        selfDestructTime
        selfDestructCode
        selfDestructAuto
      }
    }
  }
`;
export default graphql(SELF_DESTRUCT_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      id: ownProps.simulator.id
    }
  })
})(withApollo(SelfDestructCore));
