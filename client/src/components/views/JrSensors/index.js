import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Measure from "react-measure";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Asset } from "../../../helpers/assets";
import Grid from "../Sensors/GridDom";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import { Typing } from "react-typing";

import "./style.scss";

const SENSOR_SUB = gql`
  subscription SensorsChanged($simulatorId: ID) {
    sensorsUpdate(simulatorId: $simulatorId, domain: "external") {
      id
      simulatorId
      processedData
      segments {
        ring
        line
        state
      }
    }
  }
`;

class Sensors extends Component {
  state = {
    processedData: "",
    weaponsRangePulse: 0,
    hoverContact: { name: "", pictureUrl: "" }
  };
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
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SENSOR_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  sensors: subscriptionData.data.sensorsUpdate
                });
              }
            })
          }
        />
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
                <div id="threeSensors" className="array" ref={measureRef}>
                  {this.state.dimensions && (
                    <Grid
                      dimensions={this.state.dimensions}
                      sensor={sensors.id}
                      hoverContact={this._hoverContact.bind(this)}
                      pings={false}
                      segments={sensors.segments}
                    />
                  )}
                </div>
              )}
            </Measure>
          </Col>
          <Col sm={4}>
            <Row>
              <Col className="col-sm-12">
                <div className="card contactPictureContainer">
                  {hoverContact.picture && (
                    <Asset asset={hoverContact.picture}>
                      {({ src }) => (
                        <div
                          className="contactPicture"
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
                  )}
                </div>
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
                    <pre>
                      <Typing keyDelay={20} key={sensors.processedData}>
                        {sensors.processedData}
                      </Typing>
                    </pre>
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
      segments {
        ring
        line
        state
      }
    }
  }
`;

export default graphql(SENSOR_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(Sensors));
