import React, { Component } from 'react';
import { Button, Row, Col, Card, CardBlock } from 'reactstrap';
import gql from 'graphql-tag';

export default class SensorScans extends Component {
  state = {
    scanRequest: '',
    scanResults: ''
  };
  componentWillReceiveProps(nextProps) {
    const nextSensors = nextProps.sensors;
    if (!this.state.scanResults) {
      //First time load
      this.setState({
        scanResults: nextSensors.scanResults,
        scanRequest: nextSensors.scanRequest
      });
    } else {
      if (nextSensors.scanResults !== this.state.scanResults) {
        if (this.state.scanResults === undefined) {
          this.setState({
            scanResults: nextSensors.scanResults
          });
        } else {
          this.typeIn(nextSensors.scanResults, 0, 'scanResults');
        }
      }
    }
  }
  typeIn = (text, chars, stateProp) => {
    let currentState = this.state;
    if (text) {
      if (text.length >= chars) {
        currentState[stateProp] = text.substring(chars, 0);
        this.setState(currentState);
        setTimeout(this.typeIn.bind(this, text, chars + 1, stateProp), 1);
      }
    }
  };
  startScan = () => {
    let obj = {
      id: this.props.sensors.id,
      request: this.refs.scanRequest.value
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
            <div className="scanEntry">
              {scanning
                ? <div>
                    <video ref={'ReactVideo'} autoPlay loop>
                      <source
                        src={'/js/images/scansvid.mov'}
                        type="video/mp4"
                      />
                    </video>
                    <Button color="danger" block onClick={this.stopScan}>
                      Cancel Scan
                    </Button>
                  </div>
                : <div>
                    <textarea
                      ref="scanRequest"
                      className="form-control btn-block"
                      rows="6"
                      defaultValue={this.state.scanRequest}
                    />
                    <Button color="primary" block onClick={this.startScan}>
                      Begin Scan
                    </Button>
                  </div>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col-sm-12">
            <label>Scan Results:</label>
          </Col>
          <Col className="col-sm-12">
            <Card style={{ height: '200px' }}>
              <CardBlock>
                {this.state.scanResults}
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
