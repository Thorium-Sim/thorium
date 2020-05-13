import React from "react";
import {Container, Row, Col, ListGroup, ListGroupItem} from "reactstrap";
import {useNavigate, Routes, Route, useLocation} from "react-router-dom";
import TaskTemplates from "./taskTemplates";
import TaskFlows from "./taskFlows";
import TaskDefinitions from "./taskDefinitions";
import TaskConfig from "./taskConfig";
const TaskTemplatesData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Container fluid className="task-templates">
      <Row>
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
          <Route path="taskFlows" element={<TaskFlows />} />
        </Routes>
      </Row>
    </Container>
  );
};
export default TaskTemplatesData;
