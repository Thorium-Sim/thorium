import {css} from "@emotion/core";
import React from "react";
import {
  useTaskFlowsConfigSubscription,
  useTaskFlowAddMutation,
  useTaskFlowRemoveMutation,
} from "generated/graphql";
import {Col, Button} from "reactstrap";
import SearchableList from "helpers/SearchableList";
import {useNavigate, useMatch, Outlet} from "react-router";

const TaskFlows: React.FC<{}> = () => {
  const {data} = useTaskFlowsConfigSubscription();
  const match = useMatch("/config/tasks/taskFlows/:flowId/*");

  const [addFlow] = useTaskFlowAddMutation();
  const [removeFlow] = useTaskFlowRemoveMutation();

  const flowId = match?.params?.flowId;

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Col
        sm={2}
        css={css`
          height: 100%;
          display: flex;
          flex-direction: column;
        `}
      >
        <h2>Task Flows</h2>

        <SearchableList
          items={
            data?.taskFlows.map(f => ({
              id: f.id,
              label: f.name,
              category: f.category,
            })) || []
          }
          selectedItem={flowId}
          setSelectedItem={item => typeof item === "string" && navigate(item)}
        />
        <Button
          block
          size="sm"
          color="success"
          onClick={() => {
            const name = prompt("What is the name of the new task flow?");
            if (!name) return;
            addFlow({variables: {name}}).then(
              res => res.data?.taskFlowAdd && navigate(res.data?.taskFlowAdd),
            );
          }}
        >
          Add Task Flow
        </Button>
        {flowId && (
          <Button
            block
            size="sm"
            color="danger"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to remove this task flow?",
                )
              ) {
                removeFlow({variables: {id: flowId}});
                navigate(".");
              }
            }}
          >
            Remove Task Flow
          </Button>
        )}

        <Button
          tag="a"
          href={`/exportTaskFlows/${data?.taskFlows.map(t => t.id).join(",")}`}
          color="secondary"
          block
          size="sm"
        >
          Export All Task Flows
        </Button>
        <label>
          <div className="btn btn-sm btn-info btn-block">Import Task Flows</div>
          <input
            hidden
            type="file"
            onChange={evt => {
              if (evt?.target?.files?.[0]) {
                const data = new FormData();
                Array.from(evt.target.files).forEach((f, index) =>
                  data.append(`files[${index}]`, f),
                );
                fetch(`/importTaskFlows`, {
                  method: "POST",
                  body: data,
                }).then(() => {
                  window.location.reload();
                });
              }
            }}
          />
        </label>
      </Col>
      <Outlet />
    </React.Fragment>
  );
};

export default TaskFlows;
