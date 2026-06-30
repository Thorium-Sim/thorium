import {css} from "@emotion/core";
import React from "react";
import {useParams, useMatch, useNavigate, Outlet} from "react-router";
import {
  useTaskFlowsConfigSubscription,
  useTaskFlowRenameMutation,
  useTaskFlowSetCategoryMutation,
  useTaskFlowReorderStepMutation,
  useTaskFlowAddStepMutation,
  useTaskFlowRemoveStepMutation,
} from "generated/graphql";
import {Col, Label, Button} from "reactstrap";
import DebouncedInput from "./DebouncedInput";
import SortableList from "helpers/SortableList";

const FlowConfig = () => {
  const {data} = useTaskFlowsConfigSubscription();
  const match = useMatch("/config/tasks/taskFlows/:flowId/:stepId/*");
  const {flowId} = useParams();
  const stepId = match?.params?.stepId;
  const navigate = useNavigate();

  const [rename] = useTaskFlowRenameMutation();
  const [setCategory] = useTaskFlowSetCategoryMutation();
  const [reorder] = useTaskFlowReorderStepMutation();
  const [addStep] = useTaskFlowAddStepMutation();
  const [removeStep] = useTaskFlowRemoveStepMutation();
  const taskFlow = data?.taskFlows.find(f => f.id === flowId);
  if (!taskFlow) return null;
  return (
    <React.Fragment key={flowId}>
      <Col
        sm={2}
        css={css`
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        <h2>Flow Config</h2>
        <Label>
          Name:
          <DebouncedInput
            type="text"
            value={taskFlow?.name}
            onCommit={name =>
              rename({variables: {id: flowId || "", name: name || ""}})
            }
          />
        </Label>
        <Label>
          Category:
          <DebouncedInput
            type="text"
            value={taskFlow?.category}
            onCommit={category =>
              setCategory({
                variables: {id: flowId || "", category: category || ""},
              })
            }
          />
        </Label>
        <Label>Steps:</Label>
        <SortableList
          css={css`
            flex: 1;
            overflow-y: auto;
          `}
          distance={20}
          items={taskFlow.steps}
          onSortEnd={({oldIndex, newIndex}) =>
            reorder({
              variables: {
                id: flowId || "",
                stepId: taskFlow.steps[oldIndex].id,
                order: newIndex,
              },
            })
          }
          selectedItem={stepId}
          setSelectedItem={id => navigate(id)}
        ></SortableList>
        <Button
          block
          size="sm"
          color="success"
          onClick={() => {
            const name = prompt("What is the name of the new task flow step?");
            if (!name) return;
            addStep({variables: {id: flowId || "", name}}).then(
              res =>
                res.data?.taskFlowAddStep &&
                navigate(res.data?.taskFlowAddStep),
            );
          }}
        >
          Add Task Flow Step
        </Button>
        {stepId && (
          <Button
            block
            size="sm"
            color="danger"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to remove this task flow step?",
                )
              ) {
                removeStep({variables: {id: flowId || "", stepId}});
                navigate(".");
              }
            }}
          >
            Remove Task Flow Step
          </Button>
        )}
        <small>Drag to reorder steps</small>
      </Col>
      <Outlet />
    </React.Fragment>
  );
};
export default FlowConfig;
