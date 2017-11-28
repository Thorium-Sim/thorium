import React, { Component } from "react";
import gql from "graphql-tag";
import { Container } from "reactstrap";
import Moment from "moment";
import { graphql, withApollo } from "react-apollo";
import { InputField } from "../../generic/core";
import "./style.css";

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
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: SELF_DESTRUCT_SUB,
        variables: {
          id: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            simulators: subscriptionData.simulatorsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  activate = time => {
    if (time) {
      const duration = Moment.duration(time);
      time =
        duration.hours() * 1000 * 60 * 60 +
        duration.minutes() * 1000 * 60 +
        duration.seconds() * 1000;
      if (time === 0) time = null;
    }
    const mutation = gql`
      mutation ActivateSelfDestruct($id: ID!, $time: Float) {
        setSelfDestructTime(simulatorId: $id, time: $time)
      }
    `;
    const sim = this.props.data.simulators[0];
    const variables = {
      id: sim.id,
      time: sim.ship.selfDestructTime ? null : time
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
    const duration = Moment.duration(selfDestructTime);
    return (
      <Container className="self-destruct">
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
        >{`${padDigits(duration.hours(), 2)}:${padDigits(
          duration.minutes(),
          2
        )}:${padDigits(duration.seconds(), 2)}`}</InputField>
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
    variables: {
      id: ownProps.simulator.id
    }
  })
})(withApollo(SelfDestructCore));
