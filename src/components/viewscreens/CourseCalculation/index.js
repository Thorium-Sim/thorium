import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { NavigationScanner } from "../../views/Navigation";
import { Container, Row, Col, Card, CardBlock } from "reactstrap";
import "./style.scss";

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
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: NAV_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            navigation: subscriptionData.data.navigationUpdate
          });
        }
      });
    }
    if (!nextProps.data.loading) {
      this.setState(
        {
          scanning: nextProps.data.navigation[0].scanning
        },
        () => {
          cancelAnimationFrame(this.looping);
          this.loop();
        }
      );
    }
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
    if (this.props.data.loading) return null;
    const { destination, calculatedCourse } = this.props.data.navigation[0];
    const { scanning, x, y, z } = this.state;
    return (
      <div className="viewscreen-courseCalculation">
        <Container>
          <h1>
            Course Calculation{destination ? `: ${destination}` : ""}
          </h1>
          <Row>
            <Col sm={6}>
              <NavigationScanner scanning={scanning} />
            </Col>
            <Col sm={6}>
              <Card>
                <CardBlock>
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
                </CardBlock>
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
