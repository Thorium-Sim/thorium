import React from "react";
import { Button, Input, Label } from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import { Mutation } from "react-apollo";
import { useSubscribeToMore } from "helpers/hooks/useQueryAndSubscribe";
import { useQuery } from "@apollo/react-hooks";

const levels = [
  { id: 5, color: "info" },
  { id: 4, color: "success" },
  { id: 3, color: { background: "#B1B100", color: "white" } },
  { id: 2, color: { background: "orange", color: "white" } },
  { id: 1, color: "danger" }
];

const SUB = gql`
  subscription SimulatorsSub($id: ID) {
    simulatorsUpdate(simulatorId: $id) {
      id
      alertlevel
      alertLevelLock
    }
  }
`;

const QUERY = gql`
  query simulators($id: ID) {
    simulators(id: $id) {
      id
      alertlevel
      alertLevelLock
    }
  }
`;

const AlertConditionCore = ({ simulator: sim }) => {
  const { loading, data, subscribeToMore } = useQuery(QUERY, {
    variables: {
      id: sim.id
    }
  });

  useSubscribeToMore(subscribeToMore, SUB, {
    variables: { id: sim.id },
    updateQuery: (previousResult, { subscriptionData }) => {
      return Object.assign({}, previousResult, {
        simulators: subscriptionData.data.simulatorsUpdate
      });
    }
  });
  if (loading) return null;
  const { simulators } = data;
  const simulator = simulators[0];
  return (
    <div className="alert-condition pull-right">
      <Mutation
        mutation={gql`
          mutation LockAlertLevel($id: ID!, $lock: Boolean!) {
            setAlertConditionLock(simulatorId: $id, lock: $lock)
          }
        `}
      >
        {action => (
          <Label>
            <Input
              type="checkbox"
              checked={simulator.alertLevelLock}
              onChange={() =>
                action({
                  variables: {
                    id: simulator.id,
                    lock: !simulator.alertLevelLock
                  }
                })
              }
            />{" "}
            Locked
          </Label>
        )}
      </Mutation>
      <Mutation
        mutation={gql`
          mutation AlertLevel($id: ID!, $level: String!) {
            changeSimulatorAlertLevel(simulatorId: $id, alertLevel: $level)
          }
        `}
      >
        {action =>
          levels.map(l => (
            <Button
              className={
                simulator && simulator.alertlevel === l.id.toString()
                  ? "active"
                  : ""
              }
              key={`alert${l.id}`}
              color={typeof l.color === "string" ? l.color : null}
              style={typeof l.color === "object" ? l.color : null}
              onClick={() =>
                action({
                  variables: {
                    id: sim.id,
                    level: String(l.id)
                  }
                })
              }
            >
              {l.id}
            </Button>
          ))
        }
      </Mutation>
    </div>
  );
};

export default AlertConditionCore;
