import {css} from "@emotion/core";
import React from "react";

import {
  useTaskFlowSubSubscription,
  useTaskFlowListSubscription,
  useActivateTaskFlowMutation,
  Simulator,
  TaskFlow,
} from "generated/graphql";
import {ListGroup, ListGroupItem} from "reactstrap";

type CategorizedTaskFlows = {
  [category: string]: Pick<TaskFlow, "id" | "name" | "category">[];
};
const TaskFlowCore: React.FC<{simulator: Simulator}> = ({simulator}) => {
  const [selectedFlow, setSelectedFlow] = React.useState("");

  const {data} = useTaskFlowSubSubscription({
    variables: {simulatorId: simulator.id},
  });
  const {data: listData} = useTaskFlowListSubscription();
  const [activate] = useActivateTaskFlowMutation();
  const categorizedList =
    listData?.taskFlows.reduce((prev: CategorizedTaskFlows, next) => {
      prev[next.category] = prev[next.category]
        ? prev[next.category].concat(next)
        : [next];
      return prev;
    }, {}) || {};

  const flow = data?.taskFlows.find(f => f.id === selectedFlow);
  const step = flow?.steps[flow.currentStep];
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
          {data?.taskFlows
            .concat()
            .sort((a, b) => {
              if (a.completed && !b.completed) return 1;
              if (b.completed && !a.completed) return -1;
              return 0;
            })
            .map(t => (
              <ListGroupItem
                key={t.id}
                active={selectedFlow === t.id}
                className={t.completed ? "text-success" : ""}
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
          margin-left: 1em;
          flex: 3;
        `}
      >
        {flow && (
          <React.Fragment>
            <p>
              <strong>{flow.name}</strong>
            </p>
            {flow.completed ? (
              <p className="text-success">
                <strong>Completed</strong>
              </p>
            ) : (
              <p>
                <strong>Current Step: </strong>
                {flow.currentStep + 1} / {flow.steps.length}
              </p>
            )}
            {step && (
              <React.Fragment>
                <p>
                  <strong>Step:</strong> {step.name}
                </p>
                {step.delay && (
                  <p>
                    <strong>Delay: </strong>
                    {step.delay} ms
                  </p>
                )}
                <p>
                  <strong>Complete All: </strong>
                  {step.completeAll ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Tasks:</strong>
                </p>
                <div
                  css={css`
                    margin-left: 1rem;
                  `}
                >
                  {step.activeTasks.map(t => (
                    <div
                      key={t.id}
                      className={t.verified ? "text-success" : ""}
                    >
                      <p>
                        <strong>{t.definition}</strong>
                      </p>
                      <p>
                        <strong>Station:</strong> {t.station}
                      </p>
                      <p>
                        <strong>Completed: </strong>
                        {t.verified ? "Yes" : "No"}
                      </p>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default TaskFlowCore;
