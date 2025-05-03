import React from "react";
import {Row, Col, Button} from "helpers/reactstrap";
import {Mutation} from "react-apollo";
import gql from "graphql-tag.macro";


const ReportButtonsLegacy = ({verifyStep, system}) => {
  const report = system ? system.damage.report : "";
  if (!system) return null;
  const steps = report
    ? report.split(/Step [0-9]+:\n/gi).filter(s => s && s !== "\n")
    : [];
  return (
    <Mutation
      mutation={gql`
        mutation SetDamageStep($systemId: ID!, $step: Int!) {
          updateCurrentDamageStep(systemId: $systemId, step: $step)
        }
      `}
    >
      {setStep => (
        <Row>
          <Col sm={3}>
            {!verifyStep && (
              <Button
                disabled={!system || system.damage.currentStep === 0}
                block
                color="secondary"
                onClick={() =>
                  setStep({
                    variables: {
                      systemId: system.id,
                      step: system.damage.currentStep - 1,
                    },
                  })
                }
              >
                Previous Step
              </Button>
            )}
          </Col>
          <Col sm={6}>
            <h3 className="text-center">
              {system &&
              (system.damage.damageReportText || system.damage.report)
                ? system.damage.currentStep + 1
                : 0}{" "}
              / {steps.length}
            </h3>
          </Col>
          <Col sm={3}>
            {verifyStep ? (
              <Mutation
                mutation={gql`
                  mutation SetDamageStepValidation($id: ID!) {
                    setDamageStepValidation(id: $id, validation: true)
                  }
                `}
                variables={{id: system.id}}
              >
                {verifyStep => (
                  <Button
                    disabled={
                      !system ||
                      steps.length === 0 ||
                      system.damage.currentStep === steps.length - 1 ||
                      system.damage.validate
                    }
                    block
                    color="secondary"
                    onClick={verifyStep}
                  >
                    {system && system.damage.validate ?"Verifying Step" :"Verify Step"}
                  </Button>
                )}
              </Mutation>
            ) : (
              <Button
                disabled={
                  !system ||
                  steps.length === 0 ||
                  system.damage.currentStep === steps.length - 1
                }
                block
                color="secondary"
                onClick={() =>
                  setStep({
                    variables: {
                      systemId: system.id,
                      step: system.damage.currentStep + 1,
                    },
                  })
                }
              >
                Next Step
              </Button>
            )}
          </Col>
        </Row>
      )}
    </Mutation>
  );
};

export default ReportButtonsLegacy;
