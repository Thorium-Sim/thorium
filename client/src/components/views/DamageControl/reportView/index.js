import React, { Fragment } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { FormattedMessage } from "react-intl";
import ReportViewLegacy from "./legacyReport";
import ReportButtonsLegacy from "./legacyButtons";
import ReportViewTask from "./taskReport";
import ReportButtonsTask from "./taskButtons";

const ReportView = ({ system, type, which, stepDamage, verifyStep }) => {
  return (
    <Fragment>
      <Row>
        <Col sm={12}>
          <h4>
            {which === "rnd" ? (
              <FormattedMessage
                id="damage-report-rnd-report"
                description="A header for the research & development report readout"
                defaultMessage="R&D Report"
              />
            ) : which === "engineering" ? (
              <FormattedMessage
                id="engineering-report-report"
                description="A header for the engineering report readout"
                defaultMessage="Engineering Report"
              />
            ) : (
              <FormattedMessage
                id="damage-report-report"
                description="A header for the damage report readout"
                defaultMessage="Damage Report"
              />
            )}
          </h4>
          <Card>
            <CardBody>
              {type === "legacy" ? (
                <ReportViewLegacy system={system} stepDamage={stepDamage} />
              ) : (
                <ReportViewTask system={system} stepDamage={stepDamage} />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      {stepDamage &&
        (type === "legacy" ? (
          <ReportButtonsLegacy system={system} verifyStep={verifyStep} />
        ) : (
          <ReportButtonsTask system={system} />
        ))}
    </Fragment>
  );
};
export default ReportView;
