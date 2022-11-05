import React from "react";
import {Col, Button} from "helpers/reactstrap";
import "./style.scss";
import DefinitionList from "./definitionList";
import {
  useTaskTemplatesSubscription,
  useTaskDefinitionsQuery,
  useImportTemplatesMutation,
  TaskDefinitionsDocument,
} from "generated/graphql";
import {Outlet} from "react-router-dom";

const TaskDefinitions: React.FC = () => {
  const {data} = useTaskTemplatesSubscription();
  const {data: definitionsData} = useTaskDefinitionsQuery();
  const [importTemplates] = useImportTemplatesMutation({
    refetchQueries: [{query: TaskDefinitionsDocument}],
  });
  const taskTemplates = data?.taskTemplatesUpdate || [];
  const addedTaskTemplates =
    definitionsData?.thorium?.addedTaskTemplates || false;

  return (
    <React.Fragment>
      <Col
        sm={3}
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "80vh",
        }}
      >
        <div style={{flex: 1}}>
          <DefinitionList taskTemplates={taskTemplates} />
        </div>
        {addedTaskTemplates ? (
          <Button block onClick={() => importTemplates()}>
            Import Repair Templates
          </Button>
        ) : null}
        <Button
          tag="a"
          href={`/exportTaskTemplates/${taskTemplates
            .map(t => t.id)
            .join(",")}`}
          color="secondary"
          block
          size="sm"
        >
          Export All Templates
        </Button>
        <label>
          <div className="btn btn-sm btn-info btn-block">
            Import Task Templates
          </div>
          <input
            hidden
            type="file"
            onChange={evt => {
              if (evt?.target?.files?.[0]) {
                const data = new FormData();
                Array.from(evt.target.files).forEach((f, index) =>
                  data.append(`files[${index}]`, f),
                );
                fetch(`/importTaskTemplates`, {
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

export default TaskDefinitions;
