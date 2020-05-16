/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import React from "react";

import {
  useTaskFlowSubSubscription,
  useTaskFlowListSubscription,
  useActivateTaskFlowMutation,
  Simulator,
  TaskFlow,
} from "generated/graphql";
import {ListGroup, ListGroupItem} from "reactstrap";

const TaskFlowCore: React.FC<{simulator: Simulator}> = ({simulator}) => {
  const [selectedFlow, setSelectedFlow] = React.useState("");

  const {data} = useTaskFlowSubSubscription({
    variables: {simulatorId: simulator.id},
  });

  const {data: listData} = useTaskFlowListSubscription();
  const [activate] = useActivateTaskFlowMutation();
  const categorizedList =
    listData?.taskFlows.reduce(
      (
        prev: {
          [category: string]: Pick<TaskFlow, "id" | "name" | "category">[];
        },
        next,
      ) => {
        prev[next.category] = prev[next.category]
          ? prev[next.category].concat(next)
          : [next];
        return prev;
      },
      {},
    ) || {};
  return (
    <div
      css={css`
        display: flex;
        height: 100%;
      `}
    >
      <div
        css={css`
          overflow-y: auto;
          flex: 1;
          display: flex;
          flex-direction: column;
        `}
      >
        <ListGroup
          css={css`
            flex: 1;
          `}
        >
          {data?.taskFlows.map(t => (
            <ListGroupItem
              key={t.id}
              active={selectedFlow === t.id}
              onClick={() => setSelectedFlow(t.id)}
            >
              {t.name}
            </ListGroupItem>
          ))}
        </ListGroup>
        <select
          className="btn-success"
          value=""
          onChange={e =>
            activate({
              variables: {simulatorId: simulator.id, id: e.target.value},
            })
          }
        >
          <option value="" disabled>
            Activate a Task Flow
          </option>
          {Object.entries(categorizedList).map(([key, value]) => (
            <optgroup key={key} label={key}>
              {value.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <div
        css={css`
          flex: 3;
        `}
      ></div>
    </div>
  );
};

export default TaskFlowCore;
