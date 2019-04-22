import React, { Component } from "react";
import { Button, Row, Col, Card, CardBody } from "reactstrap";
import gql from "graphql-tag.macro";
import { Typing } from "react-typing";

export default class SensorScans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanRequest: props.sensors.scanRequest
    };
  }
  startScan = () => {
    let obj = {
      id: this.props.sensors.id,
      request: this.state.scanRequest
    };
    this.props.client.mutate({
      mutation: gql`
        mutation SensorScanRequest($id: ID!, $request: String!) {
          sensorScanRequest(id: $id, request: $request)
        }
      `,
      variables: obj
    });
  };
  stopScan = () => {
    let obj = {
      id: this.props.sensors.id
    };
    this.props.client.mutate({
      mutation: gql`
        mutation CancelScan($id: ID!) {
          sensorScanCancel(id: $id)
        }
      `,
      variables: obj
    });
  };
  render() {
    const { sensors } = this.props;
    const { scanning } = sensors;
    return (
      <div>
        <Row>
          <Col className="col-sm-12">
            <label>Sensor Scan Entry:</label>
          </Col>
          <Col className="col-sm-12">
            <div className="scanEntry">
              {scanning ? (
                <div>
                  <video ref={"ReactVideo"} muted autoPlay loop>
                    <source src={require("./scansvid.mov")} type="video/mp4" />
                  </video>
                  <Button color="danger" block onClick={this.stopScan}>
                    Cancel Scan
                  </Button>
                </div>
              ) : (
                <div>
                  <textarea
                    className="form-control btn-block"
                    rows="6"
                    defaultValue={this.state.scanRequest}
                    onChange={evt =>
                      this.setState({
                        scanRequest: evt.target.value
                      })
                    }
                  />
                  <Button color="primary" block onClick={this.startScan}>
                    Begin Scan
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col-sm-12">
            <label>Scan Results:</label>
          </Col>
          <Col className="col-sm-12">
            <Card style={{ height: "200px" }}>
              <CardBody style={{ height: "100%", overflowY: "auto" }}>
                <pre>
                  <Typing keyDelay={20} key={sensors.scanResults}>
                    {this.props.sensors.scanResults}
                  </Typing>
                </pre>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
