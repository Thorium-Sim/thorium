import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
// All task-based reports auto-advanced based on the validation of the task.
const TaskButtons = ({ system }) => {
  const task = system.tasks.find(t => !t.verified);
  const stepCount = system.tasks.findIndex(t => t.id === task.id) + 1;
  if (task) {
    return (
      <Row>
        <Col sm={3}>
          {task.station && !task.assigned && (
            <Mutation
              mutation={gql`
                mutation AssignTask($id: ID!, $stepId: ID!, $station: String) {
                  assignTaskReportStep(
                    id: $id
                    stepId: $stepId
                    station: $station
                  )
                }
              `}
              variables={{
                id: system.id,
                stepId: task.id,
                station: task.station
              }}
            >
              {action => (
                <Button color="warning" block onClick={action}>
                  Assign To {task.station}
                </Button>
              )}
            </Mutation>
          )}
        </Col>
        <Col sm={{ size: 6 }}>
          <h3 className="text-center">
            {stepCount} / {system.tasks.length}
          </h3>
        </Col>
        <Col sm={{ size: 3 }}>
          <Mutation
            mutation={gql`
              mutation VerifyTask($id: ID!, $stepId: ID!) {
                requestVerifyTaskReportStep(id: $id, stepId: $stepId)
              }
            `}
            variables={{
              id: system.id,
              stepId: task.id
            }}
          >
            {action => (
              <Button block onClick={action} disabled={task.verifyRequested}>
                {task.verifyRequested ? "Verifying" : "Verify"} Step
              </Button>
            )}
          </Mutation>
        </Col>
      </Row>
    );
  }
  return null;
};
export default TaskButtons;
