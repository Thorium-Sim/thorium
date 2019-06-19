import React from "react";
import { Row, Col, Card, Button, CardBody } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import TimeCared from "./timeCared";

const Bunk = ({
  sickbayId,
  id,
  num,
  scanning,
  patient,
  openModal,
  openBunk
}) => {
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
          <Col sm={12}>
            <strong>Patient:</strong> {patient ? patient.name : "None"}{" "}
            <strong>Status:</strong> {scanning ? "Scanning" : "Idle"}
          </Col>
          <Col sm={12}>
            <strong>Time cared for:</strong>{" "}
            {chart ? <TimeCared admitTime={chart.admitTime} /> : "N/a"}
          </Col>
        </Row>
        <p />
        <p className="pull-left" />
        <p />
        {patient ? (
          <Row>
            <Col sm={6}>
              <Button color="info" block onClick={openBunk}>
                Status
              </Button>
            </Col>
            <Col sm={6}>
              <Mutation
                mutation={gql`
                  mutation Discharge($id: ID!, $bunkId: ID!) {
                    dischargePatient(id: $id, bunkId: $bunkId)
                  }
                `}
                variables={{ bunkId: id, id: sickbayId }}
              >
                {action => (
                  <Button color="danger" block onClick={action}>
                    Discharge
                  </Button>
                )}
              </Mutation>
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
