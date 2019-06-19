import React from "react";
import gql from "graphql-tag.macro";
import { Container } from "helpers/reactstrap";
import { withApollo } from "react-apollo";
import { InputField } from "../../generic/core";
import { Duration } from "luxon";
import "./style.scss";
import { useQuery } from "@apollo/react-hooks";
import { useSubscribeToMore } from "helpers/hooks/useQueryAndSubscribe";

function padDigits(number, digits) {
  return (
    Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
  );
}

const SELF_DESTRUCT_SUB = gql`
  subscription SelfDestructUpdate($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        selfDestructTime
        selfDestructCode
        selfDestructAuto
      }
    }
  }
`;

const SELF_DESTRUCT_QUERY = gql`
  query SelfDestruct($simulatorId: ID) {
    simulators(id: $simulatorId) {
      id
      ship {
        selfDestructTime
        selfDestructCode
        selfDestructAuto
      }
    }
  }
`;

function checkNum(num) {
  if (!num && num !== 0 && num !== "0") return false;
  return true;
}
const SelfDestructCore = ({ simulator, client }) => {
  const activate = time => {
    time = time.toString();
    if (!time && time !== "0") return;
    const [first, second, third] = time.split(":").map(t => parseInt(t, 10));
    let [hours, minutes, seconds] = [0, 0, 0];
    if (checkNum(first) && !checkNum(second) && !checkNum(third)) {
      seconds = first;
    }
    if (checkNum(first) && checkNum(second) && !checkNum(third)) {
      minutes = first;
      seconds = second;
    }
    if (checkNum(first) && checkNum(second) && checkNum(third)) {
      hours = first;
      minutes = second;
      seconds = third;
    }
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
    const variables = {
      id: simulator.id,
      time: duration
    };
    client.mutate({
      mutation,
      variables
    });
  };
  const setCode = code => {
    const mutation = gql`
      mutation SetSelfDestructCode($id: ID!, $code: String) {
        setSelfDestructCode(simulatorId: $id, code: $code)
      }
    `;
    const variables = {
      id: simulator.id,
      code: String(code) || ""
    };
    client.mutate({
      mutation,
      variables
    });
  };
  const setAuto = evt => {
    const mutation = gql`
      mutation SetSelfDestructAuto($id: ID!, $auto: Boolean) {
        setSelfDestructAuto(simulatorId: $id, auto: $auto)
      }
    `;
    const variables = {
      id: simulator.id,
      auto: evt.target.checked
    };
    client.mutate({
      mutation,
      variables
    });
  };

  const { loading, data, subscribeToMore } = useQuery(SELF_DESTRUCT_QUERY, {
    variables: { simulatorId: simulator.id }
  });
  useSubscribeToMore(subscribeToMore, SELF_DESTRUCT_SUB, {
    variables: { simulatorId: simulator.id },
    updateQuery: (previousResult, { subscriptionData }) => ({
      ...previousResult,
      simulators: subscriptionData.data.simulatorsUpdate
    })
  });
  const { simulators } = data;
  if (loading || !simulators) return null;

  const { ship } = simulators[0];

  const { selfDestructTime, selfDestructCode, selfDestructAuto } = ship;

  const duration = Duration.fromObject({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: selfDestructTime
  }).normalize();
  return (
    <Container className="self-destruct">
      <div>
        <label>
          Auto:{" "}
          <input
            type="checkbox"
            checked={selfDestructAuto}
            onChange={setAuto}
          />
        </label>
      </div>
      <div>
        <span style={{ float: "" }}>Code: </span>
        <InputField
          prompt="What is the new self-destruct code?"
          style={{ width: "calc(100% - 40px)", display: "inline-block" }}
          onClick={setCode}
        >
          {selfDestructCode}
        </InputField>
      </div>
      <InputField
        prompt='What is the time in "hh:mm:ss" format?'
        alert={selfDestructTime && selfDestructTime > 0}
        onClick={activate}
      >{`${padDigits(duration.hours, 2)}:${padDigits(
        duration.minutes,
        2
      )}:${padDigits(duration.seconds, 2)}`}</InputField>
    </Container>
  );
};

export default withApollo(SelfDestructCore);
