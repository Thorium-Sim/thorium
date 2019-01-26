import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Button } from "reactstrap";

const ReportViewTask = ({ system, stepDamage }) => {
  const task = system.tasks.find(t => !t.verified);
  if (stepDamage) {
    // Get the first task that isn't verified;
    const stepCount = system.tasks.findIndex(t => t.id === task.id) + 1;
    return (
      <p className={`damageReport-text`} style={{ fontSize: "24px" }}>
        {`Step ${stepCount}:
${task.instructions}`}
      </p>
    );
  }
  return system.tasks.map((t, i) => (
    <div style={{ marginBottom: "45px" }}>
      <p
        key={t.id}
        className={`damageReport-text ${t.verified ? "text-success" : ""} ${
          t.id === task.id ? "" : "text-secondary"
        }`}
        style={{ fontSize: "24px" }}
      >
        {`Step ${i + 1}:
${t.instructions}`}
      </p>

      {!t.verified &&
        t.id === task.id && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
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
                stepId: t.id,
                station: t.station
              }}
            >
              {action => (
                <Button color="warning" onClick={action} disabled={t.assigned}>
                  Assign To {t.station}
                </Button>
              )}
            </Mutation>
            <Mutation
              mutation={gql`
                mutation VerifyTask($id: ID!, $stepId: ID!) {
                  requestVerifyTaskReportStep(id: $id, stepId: $stepId)
                }
              `}
              variables={{
                id: system.id,
                stepId: t.id
              }}
            >
              {action => (
                <Button onClick={action} disabled={t.verifyRequested}>
                  {t.verifyRequested ? "Verifying" : "Verify"} Step
                </Button>
              )}
            </Mutation>
          </div>
        )}
    </div>
  ));
};

export default ReportViewTask;
