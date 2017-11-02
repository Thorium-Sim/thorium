import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Measure from "react-measure";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Asset } from "../../../helpers/assets";
import Grid from "../Sensors/GridDom";

import "./style.css";

const SENSOR_SUB = gql`
  subscription SensorsChanged($simulatorId: ID) {
    sensorsUpdate(simulatorId: $simulatorId, domain: "external") {
      id
      simulatorId
      processedData
    }
  }
`;

class Sensors extends Component {
  state = {
    processedData: "",
    weaponsRangePulse: 0,
    hoverContact: { name: "", pictureUrl: "" }
  };
  sensorsSubscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: SENSOR_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            sensors: subscriptionData.sensorsUpdate
          });
        }
      });
    }
    const nextSensors = nextProps.data.sensors[0];
    if (!nextProps.data.loading) {
      if (this.props.data.loading) {
        //First time load
        this.setState({
          processedData: nextSensors.processedData
        });
      } else {
        //Every other load
        if (nextSensors.processedData !== this.state.processedData) {
          if (this.state.scanResults === undefined) {
            this.setState({
              processedData: nextSensors.processedData
            });
          } else {
            this.typeIn(nextSensors.processedData, 0, "processedData");
          }
        }
      }
    }
  }
  componentWillUnmount() {
    this.sensorsSubscription && this.sensorsSubscription();
  }
  typeIn(text, chars, stateProp) {
    let currentState = this.state;
    if (text) {
      if (text.length >= chars) {
        currentState[stateProp] = text.substring(chars, 0);
        this.setState(currentState);
        setTimeout(this.typeIn.bind(this, text, chars + 1, stateProp), 1);
      }
    }
  }
  _hoverContact(contact = {}) {
    this.setState({
      hoverContact: contact
    });
  }
  render() {
    const { hoverContact } = this.state;
    const { data } = this.props;
    if (data.loading) return null;
    const sensors = data.sensors[0];
    return (
      <Container style={{ height: "90vh" }} className="jr-sensors">
        <Row style={{ height: "100%" }}>
          <Col sm={8} className="arrayContainer" style={{ height: "100%" }}>
            <div className="spacer" />
            <Measure
              bounds
              onResize={contentRect => {
                this.setState({ dimensions: contentRect.bounds });
              }}
            >
              {({ measureRef }) => (
                <div
                  id="threeSensors"
                  className="array"
                  ref={measureRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  {this.state.dimensions && (
                    <Grid
                      dimensions={this.state.dimensions}
                      sensor={sensors.id}
                      hoverContact={this._hoverContact.bind(this)}
                      pings={false}
                    />
                  )}
                </div>
              )}
            </Measure>
          </Col>
          <Col sm={4}>
            <Row>
              <Col className="col-sm-12 contactPictureContainer">
                {hoverContact.picture ? (
                  <Asset asset={hoverContact.picture}>
                    {({ src }) => (
                      <div
                        className="card contactPicture"
                        style={{
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundColor: "black",
                          backgroundImage: `url('${src}')`
                        }}
                      />
                    )}
                  </Asset>
                ) : (
                  <div
                    className="card contactPicture"
                    style={{
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "black",
                      backgroundImage: `none`
                    }}
                  />
                )}
              </Col>
              <Col className="col-sm-12 contactNameContainer">
                <div className="card contactName">{hoverContact.name}</div>
              </Col>
            </Row>
            <Row>
              <Col className="col-sm-12">
                <h3>Processed Data</h3>
              </Col>
              <Col className="col-sm-12">
                <Card className="processedData">
                  <CardBody>
                    <pre>{this.state.processedData}</pre>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const SENSOR_QUERY = gql`
  query GetSensors($simulatorId: ID) {
    sensors(simulatorId: $simulatorId, domain: "external") {
      id
      simulatorId
      processedData
    }
  }
`;

export default graphql(SENSOR_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(Sensors));
