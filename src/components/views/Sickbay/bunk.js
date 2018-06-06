import React from "react";
import { Row, Col, Card, Button, CardBody } from "reactstrap";
import timeCared from "./timeCared";

const Bunk = ({ id, num, scanning, patient, openModal }) => {
  const chart =
    patient &&
    patient.charts.concat().sort((a, b) => {
      if (new Date(a.admitTime) > new Date(b.admitTime)) return -1;
      if (new Date(a.admitTime) < new Date(b.admitTime)) return 1;
      return 0;
    })[0];
  return (
    <Card className="bunk">
      <CardBody>
        <Row>
          <Col sm={12}>
            <strong>Bunk {num}</strong>
          </Col>
          <Col sm={6}>
            <strong>Patient:</strong> {patient ? patient.name : "None"}
          </Col>
          <Col sm={6}>
            <strong>Status:</strong> {scanning ? "Scanning" : "Idle"}
          </Col>
          <Col sm={12}>
            <strong>Time cared for:</strong>{" "}
            {chart ? timeCared(chart.admitTime) : "N/a"}
          </Col>
        </Row>
        <p />
        <p className="pull-left" />
        <p />
        {patient ? (
          <Row>
            <Col sm={6}>
              <Button color="info" block>
                Status
              </Button>
            </Col>
            <Col sm={6}>
              <Button color="danger" block>
                Discharge
              </Button>
            </Col>
          </Row>
        ) : (
          <Button color="success" block onClick={openModal}>
            Admit Patient
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default Bunk;
