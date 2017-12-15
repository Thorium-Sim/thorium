import React, { Component } from "react";
import gql from "graphql-tag";
import FontAwesome from "react-fontawesome";
import { Container, Row, Col, Button, Input } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import { OutputField, TypingField } from "../../generic/core";
import "./style.css";

const NAVIGATION_SUB = gql`
  subscription NavigationUpdate($simulatorId: ID) {
    navigationUpdate(simulatorId: $simulatorId) {
      id
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      scanning
      calculate
      destination
      currentCourse {
        x
        y
        z
      }
      calculatedCourse {
        x
        y
        z
      }
    }
  }
`;

class NavigationCore extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.state = {
      calculatedCourse: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: NAVIGATION_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            navigation: subscriptionData.navigationUpdate
          });
        }
      });
    }
    if (!nextProps.data.loading && nextProps.data.navigation) {
      const navigation = nextProps.data.navigation[0];
      if (navigation) {
        this.setState({
          calculatedCourse: navigation.calculatedCourse
        });
      }
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  randomNums() {
    this.setState({
      calculatedCourse: {
        x: Math.round(Math.random() * 100000) / 100,
        y: Math.round(Math.random() * 100000) / 100,
        z: Math.round(Math.random() * 100000) / 100
      }
    });
  }
  randomDegs = () => {
    this.setState({
      calculatedCourse: {
        x: `${Math.round(Math.random() * 360)}˚`,
        y: `${Math.round(Math.random() * 360)}˚`,
        z: `${Math.round(Math.random() * 360)}˚`
      }
    });
  };
  unknownCourse() {
    this.setState({
      calculatedCourse: {
        x: "No",
        y: "Course",
        z: "Available"
      }
    });
  }
  sendCourse() {
    const course = this.state.calculatedCourse;
    const navigation = this.props.data.navigation[0];
    const mutation = gql`
      mutation CourseSend($id: ID!, $x: String!, $y: String!, $z: String!) {
        navCourseResponse(id: $id, x: $x, y: $y, z: $z)
      }
    `;
    const variables = {
      id: navigation.id,
      x: course.x,
      y: course.y,
      z: course.z
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  toggleCalculate(e) {
    const mutation = gql`
      mutation ToggleCalculate($id: ID!, $which: Boolean!) {
        navToggleCalculate(id: $id, which: $which)
      }
    `;
    const navigation = this.props.data.navigation[0];
    const variables = {
      id: navigation.id,
      which: e.target.checked
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  setPreset = e => {
    const course = this.props.data.navigation[0].presets.find(
      p => p.name === e.target.value
    );
    this.setState({
      calculatedCourse: course.course
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.navigation) return null;
    const navigation = this.props.data.navigation[0];
    if (!navigation) return <p>No Navigation Systems</p>;
    return (
      <Container className="docking-core">
        <label>
          <input
            type="checkbox"
            checked={navigation.calculate}
            onChange={this.toggleCalculate.bind(this)}
          />
          Calculate
        </label>
        <Row>
          <Col sm="1" />
          <Col sm="4">Current</Col>
          <Col sm="4">New</Col>
          <Col sm="3" />
        </Row>
        <Row>
          <Col sm="1">
            <p style={{ textAlign: "right" }}>X</p>
          </Col>
          <Col sm="3">
            <OutputField>{navigation.currentCourse.x}</OutputField>
          </Col>
          <Col sm="3">
            <TypingField
              input
              controlled
              value={this.state.calculatedCourse.x}
              onChange={evt =>
                this.setState({
                  calculatedCourse: Object.assign(
                    {},
                    this.state.calculatedCourse,
                    { x: evt.target.value }
                  )
                })}
            />
          </Col>
          <Col sm="5">
            <Row>
              <Col sm="6">
                <Button
                  onClick={this.randomNums.bind(this)}
                  block
                  size="sm"
                  color="info"
                >
                  <FontAwesome name="random" />
                </Button>
              </Col>
              <Col sm="6">
                <Button
                  onClick={this.randomDegs}
                  block
                  size="sm"
                  color="warning"
                >
                  <FontAwesome name="repeat" />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm="1">
            <p style={{ textAlign: "right" }}>Y</p>
          </Col>
          <Col sm="3">
            <OutputField>{navigation.currentCourse.y}</OutputField>
          </Col>
          <Col sm="3">
            <TypingField
              input
              controlled
              value={this.state.calculatedCourse.y}
              onChange={evt =>
                this.setState({
                  calculatedCourse: Object.assign(
                    {},
                    this.state.calculatedCourse,
                    { y: evt.target.value }
                  )
                })}
            />{" "}
          </Col>
          <Col sm="5">
            <Button
              onClick={this.sendCourse.bind(this)}
              block
              size="sm"
              color="primary"
            >
              Send
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm="1">
            <p style={{ textAlign: "right" }}>Z</p>
          </Col>
          <Col sm="3">
            <OutputField>{navigation.currentCourse.z}</OutputField>
          </Col>
          <Col sm="3">
            <TypingField
              input
              controlled
              value={this.state.calculatedCourse.z}
              onChange={evt =>
                this.setState({
                  calculatedCourse: Object.assign(
                    {},
                    this.state.calculatedCourse,
                    { z: evt.target.value }
                  )
                })}
            />{" "}
          </Col>
          <Col sm="5">
            <Button
              onClick={this.unknownCourse.bind(this)}
              block
              size="sm"
              color="secondary"
            >
              Unknown
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm="8">
            <OutputField alert={navigation.scanning}>
              {navigation.destination}
            </OutputField>
          </Col>
          <Col sm="4">
            <Input
              style={{ height: "20px" }}
              type="select"
              value="select"
              onChange={this.setPreset}
            >
              <option value="select">Presets</option>
              {navigation.presets.map(p => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </Input>
          </Col>
        </Row>
      </Container>
    );
  }
}

const NAVIGATION_QUERY = gql`
  query Navigation($simulatorId: ID) {
    navigation(simulatorId: $simulatorId) {
      id
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      scanning
      calculate
      destination
      currentCourse {
        x
        y
        z
      }
      calculatedCourse {
        x
        y
        z
      }
      presets {
        name
        course {
          x
          y
          z
        }
      }
    }
  }
`;

export default graphql(NAVIGATION_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(NavigationCore));
