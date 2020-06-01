import {css} from "@emotion/core";
import React from "react";
import {Col, Input, Label, ListGroup, ListGroupItem, Button} from "reactstrap";
import {useParams, useNavigate, useMatch, Outlet} from "react-router";
import {
  useTaskFlowsConfigSubscription,
  useTaskFlowRenameStepMutation,
  useTaskFlowStepRemoveTaskMutation,
  useTaskFlowStepAddTaskMutation,
  useTaskFlowStepCompleteAllMutation,
  useTaskDefinitionsQuery,
  useTaskFlowStepDelayMutation,
  TaskDefinition,
} from "generated/graphql";

const StepConfig = () => {
  const {data} = useTaskFlowsConfigSubscription();
  const {data: definitionsData} = useTaskDefinitionsQuery();

  const {flowId, stepId} = useParams();
  const navigate = useNavigate();
  const match = useMatch("/config/tasks/taskFlows/:flowId/:stepId/:taskId/*");
  const taskId = match?.params?.taskId;

  const [rename] = useTaskFlowRenameStepMutation();
  const [add] = useTaskFlowStepAddTaskMutation();
  const [remove] = useTaskFlowStepRemoveTaskMutation();
  const [setCompleteAll] = useTaskFlowStepCompleteAllMutation();
  const [setDelay] = useTaskFlowStepDelayMutation();

  const taskFlow = data?.taskFlows.find(f => f.id === flowId);
  const step = taskFlow?.steps.find(s => s.id === stepId);

  const definitionGroups =
    definitionsData?.taskDefinitions
      .concat()
      .sort((a, b) => {
        if (a.class > b.class) return 1;
        if (a.class < b.class) return -1;
        return 0;
      })
      .reduce((prev: {[key: string]: TaskDefinition[]}, n) => {
        prev[n.class] = prev[n.class] ? prev[n.class].concat(n) : [n];
        return prev;
      }, {}) || [];

  if (!step) return null;

  return (
    <React.Fragment key={stepId}>
      <Col
        sm={2}
        css={css`
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        <h2>Step Config</h2>
        <Label>
          Name:
          <Input
            type="text"
            defaultValue={step.name}
            onChange={e =>
              rename({
                variables: {id: flowId, stepId, name: e.target.value || ""},
              })
            }
          />
        </Label>
        <Label>
          Delay (ms)
          <Input
            type="number"
            min={0}
            onChange={e =>
              setDelay({
                variables: {
                  id: flowId,
                  stepId,
                  delay: parseInt(e.target.value, 10),
                },
              })
            }
          />
          <div>
            <small>
              The delay in milliseconds before the tasks in this step will be
              assigned.
            </small>
          </div>
        </Label>
        <Label>
          <Input
            type="checkbox"
            defaultChecked={step.completeAll}
            onChange={e =>
              setCompleteAll({
                variables: {id: flowId, stepId, completeAll: e.target.checked},
              })
            }
          />
          Complete All
          <div>
            <small>
              Require all tasks to be completed before continuing the flow?
            </small>
          </div>
        </Label>
        <Label>Tasks:</Label>
        <ListGroup
          css={css`
            flex: 1;
            overflow-y: auto;
          `}
        >
          {step.tasks.map(t => (
            <ListGroupItem
              key={t.id}
              active={t.id === taskId}
              onClick={() => navigate(t.id)}
            >
              <div>{t.definition}</div>
              <small>Station: {t.stationTags?.join(", ") || "None"}</small>
            </ListGroupItem>
          ))}
        </ListGroup>
        <select
          value=""
          className="btn-success"
          onChange={e => {
            add({
              variables: {
                id: flowId,
                stepId,
                task: {definition: e.target.value},
              },
            }).then(
              res =>
                res.data?.taskFlowStepAddTask &&
                navigate(res.data?.taskFlowStepAddTask),
            );
          }}
        >
          <option value={""} disabled>
            Choose a Definition
          </option>
          {Object.entries(definitionGroups).map(([key, value]) => (
            <optgroup key={key} label={key}>
              {value.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {taskId && (
          <Button
            block
            size="sm"
            color="danger"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to remove this task flow step task?",
                )
              ) {
                remove({variables: {id: flowId, stepId, taskId}});
                navigate(".");
              }
            }}
          >
            Remove Task Flow Task
          </Button>
        )}
      </Col>
      <Outlet />
    </React.Fragment>
  );
};

export default StepConfig;
