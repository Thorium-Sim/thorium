import React from "react";
import {css} from "@emotion/core";
import {Container, Row, Col, ListGroup, ListGroupItem} from "reactstrap";
import {useNavigate, Routes, Route, useLocation} from "react-router-dom";
import TaskTemplates from "./taskTemplates";
import TaskFlows from "./taskFlows";
import TaskDefinitions from "./taskDefinitions";
import TaskConfig from "./taskConfig";
import FlowConfig from "./flowConfig";
import StepConfig from "./flowStepConfig";
import FlowTaskConfig from "./flowTaskConfig";
const TaskTemplatesData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Container fluid className="task-templates">
      <Row
        css={css`
          height: 90vh;

          .col {
            height: 100%;
          }
        `}
      >
        <Col sm={2}>
          <h1>Tasks</h1>
          <ListGroup>
            <ListGroupItem
              active={location.pathname.includes("taskTemplates")}
              onClick={() => navigate("taskTemplates")}
            >
              Task Templates
            </ListGroupItem>
            <ListGroupItem
              active={location.pathname.includes("taskFlows")}
              onClick={() => navigate("taskFlows")}
            >
              Task Flows
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Routes>
          <Route path="taskTemplates" element={<TaskDefinitions />}>
            <Route path=":selectedDef" element={<TaskTemplates />}>
              <Route path=":selectedTemplate" element={<TaskConfig />} />
            </Route>
          </Route>
          <Route path="taskFlows" element={<TaskFlows />}>
            <Route path=":flowId" element={<FlowConfig />}>
              <Route path=":stepId" element={<StepConfig />}>
                <Route path=":taskId" element={<FlowTaskConfig />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Row>
    </Container>
  );
};
export default TaskTemplatesData;
