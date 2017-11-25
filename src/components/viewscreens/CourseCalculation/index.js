import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { NavigationScanner } from "../../views/Navigation";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import "./style.css";

const NAV_SUB = gql`
  subscription NavigationUpdate($simulatorId: ID) {
    navigationUpdate(simulatorId: $simulatorId) {
      id
      scanning
      calculatedCourse {
        x
        y
        z
      }
      destination
    }
  }
`;

class CourseCalculationViewscreen extends Component {
  state = {};
  componentWillReceiveProps(nextProps) {
    const data = JSON.parse(nextProps.viewscreen.data);
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: NAV_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            navigation: subscriptionData.navigationUpdate
          });
        }
      });
    }
    if (!nextProps.data.loading) {
      this.setState(
        {
          scanning: data.reactive
            ? nextProps.data.navigation[0].scanning
            : data.scanning
        },
        () => {
          cancelAnimationFrame(this.looping);
          this.loop();
        }
      );
    }
  }
  componentWillUnmount() {
    this.sensorsSubscription && this.sensorsSubscription();
  }
  loop = () => {
    if (this.state.scanning) {
      this.setState({
        x: Math.random(),
        y: Math.random(),
        z: Math.random()
      });
      this.looping = requestAnimationFrame(this.loop);
    }
  };
  render() {
    const data = JSON.parse(this.props.viewscreen.data);
    if (this.props.data.loading || !this.props.data.navigation) return null;
    const {
      destination,
      calculatedCourse = { x: 0, y: 0, z: 0 }
    } = data.reactive ? this.props.data.navigation[0] : data;
    const { scanning, x, y, z } = this.state;
    return (
      <div className="viewscreen-courseCalculation">
        <Container>
          <h1>Course Calculation{destination ? `: ${destination}` : ""}</h1>
          <Row>
            <Col sm={6}>
              <NavigationScanner scanning={scanning} />
            </Col>
            <Col sm={6}>
              <Card>
                {!data.reactive && data.thrusters ? (
                  <CardBody>
                    <div>
                      Yaw:{"  "}
                      <span className="thruster-text">
                        {scanning ? Math.floor(x * 360) : calculatedCourse.x}˚
                      </span>
                    </div>
                    <div>
                      Pitch:{" "}
                      <span className="thruster-text">
                        {scanning ? Math.floor(y * 360) : calculatedCourse.y}˚
                      </span>
                    </div>
                    <div>
                      Roll:{"  "}
                      <span className="thruster-text">
                        {scanning ? Math.floor(z * 360) : calculatedCourse.z}˚
                      </span>
                    </div>
                  </CardBody>
                ) : (
                  <CardBody>
                    <div>
                      X:{" "}
                      <span className="course-text">
                        {scanning
                          ? Math.floor(x * 99999) / 100
                          : calculatedCourse.x}
                      </span>
                    </div>
                    <div>
                      Y:{" "}
                      <span className="course-text">
                        {scanning
                          ? Math.floor(y * 99999) / 100
                          : calculatedCourse.y}
                      </span>
                    </div>
                    <div>
                      Z:{" "}
                      <span className="course-text">
                        {scanning
                          ? Math.floor(z * 99999) / 100
                          : calculatedCourse.z}
                      </span>
                    </div>
                  </CardBody>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const INTERNAL_QUERY = gql`
  query Navigation($simulatorId: ID) {
    navigation(simulatorId: $simulatorId) {
      id
      scanning
      calculatedCourse {
        x
        y
        z
      }
      destination
    }
  }
`;

export default graphql(INTERNAL_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(CourseCalculationViewscreen);
