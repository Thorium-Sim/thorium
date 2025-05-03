import React, {Fragment} from "react";
import {Row, Col, Card, CardBody} from "helpers/reactstrap";

import ReportViewLegacy from "./legacyReport";
import ReportButtonsLegacy from "./legacyButtons";
import ReportViewTask from "./taskReport";
import ReportButtonsTask from "./taskButtons";

const ReportView = ({system, type, which, stepDamage, verifyStep}) => {
  return (
    <Fragment>
      <Row>
        <Col sm={12}>
          <h4>
            {which === "rnd" ?"R&D Report" : which === "engineering" ?"Engineering Report" :"Damage Report"}
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
