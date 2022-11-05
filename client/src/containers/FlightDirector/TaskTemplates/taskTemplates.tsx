import React from "react";
import {Col, Button} from "helpers/reactstrap";
import "./style.scss";
import TemplateList from "./templateList";
import {useParams} from "react-router";
import {
  useTaskTemplatesSubscription,
  useAddTaskTemplateMutation,
  useRemoveTaskTemplateMutation,
} from "generated/graphql";
import {useNavigate, Outlet, useMatch} from "react-router-dom";

const TaskTemplates: React.FC = () => {
  const {selectedDef: unparsedDef} = useParams();
  const selectedDef = decodeURI(unparsedDef || "nothing");
  const match = useMatch(
    "/config/tasks/taskTemplates/:selectedDef/:selectedTemplate",
  );
  const selectedTemplate = match?.params.selectedTemplate;

  const navigate = useNavigate();
  const {data} = useTaskTemplatesSubscription();

  const [addTemplate] = useAddTaskTemplateMutation();
  const [removeTemplate] = useRemoveTaskTemplateMutation();

  const taskTemplates = data?.taskTemplatesUpdate || [];

  const taskTemplate = taskTemplates.find(t => t?.id === selectedTemplate);

  return (
    <>
      <Col sm={3} style={{display: "flex", flexDirection: "column"}}>
        <TemplateList taskTemplates={taskTemplates} />
        {selectedDef !== "nothing" && (
          <>
            <Button
              color="success"
              onClick={() =>
                addTemplate({variables: {definition: selectedDef}}).then(
                  res =>
                    res.data?.addTaskTemplate &&
                    navigate(res.data?.addTaskTemplate),
                )
              }
            >
              Add Template
            </Button>

            <Button
              tag="a"
              href={`/exportTaskTemplates/${taskTemplates
                .filter(t => t.definition === selectedDef)
                .map(t => t.id)
                .join(",")}`}
              color="secondary"
              block
              size="sm"
            >
              Export Templates
            </Button>
          </>
        )}
        {taskTemplate && (
          <Button
            color="danger"
            onClick={() =>
              selectedTemplate &&
              removeTemplate({variables: {id: selectedTemplate}}).then(() =>
                navigate("."),
              )
            }
          >
            Remove Template
          </Button>
        )}
      </Col>
      <Outlet />
    </>
  );
};

export default TaskTemplates;
