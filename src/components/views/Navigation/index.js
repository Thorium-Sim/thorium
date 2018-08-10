import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import gql from "graphql-tag";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import DamageOverlay from "../helpers/DamageOverlay";
import Keypad from "./keypad";
import Tour from "reactour";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import NavigationScanner from "./NavigationScanner";

import "./style.scss";
import CourseNumber from "./courseNumbers";

const trainingSteps = [
  {
    selector: ".number-pad",
    content:
      "Using the number pad, input the calculated course coordinates in the Current Course fields to set your course."
  }
];

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
      thrusters
      calculatedCourse {
        x
        y
        z
      }
    }
  }
`;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: null,
      calculatedCourse: {},
      selectedField: null,
      enteredCourse: {},
      scanning: false
    };
    this.scanning = null;
    this.subscription = null;
    if (props.scanning) {
      this.scanning = setTimeout(this._scan, 100);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.scanning);
    this.scanning = null;
  }
  componentDidUpdate(prevProps) {
    if (this.props.data.loading || !this.props.data.navigation) return;
    const navigation = this.props.data.navigation[0];
    if (navigation) {
      if (navigation.scanning) {
        this.scanning = setTimeout(this._randomCourse, 60);
      }
      if (!navigation.scanning) {
        clearTimeout(this.scanning);
        this.scanning = null;
      }
      const oldNavigation = prevProps.data.loading
        ? {}
        : prevProps.data.navigation[0];
      let { destination, calculatedCourse, enteredCourse } = this.state;
      const {
        destination: newDestination = {},
        calculatedCourse: newCalculatedCourse = {},
        currentCourse: newCurrentCourse = {}
      } = navigation;
      const {
        destination: oldDestination = {},
        calculatedCourse: oldCalculatedCourse = {},
        currentCourse: oldCurrentCourse = {}
      } = oldNavigation;
      let update = false;
      if (newDestination !== oldDestination) {
        update = true;
        destination = newDestination;
      }
      if (
        newCalculatedCourse.x !== oldCalculatedCourse.x ||
        newCalculatedCourse.y !== oldCalculatedCourse.y ||
        newCalculatedCourse.z !== oldCalculatedCourse.z
      ) {
        update = true;
        calculatedCourse = newCalculatedCourse;
      }
      if (
        newCurrentCourse.x !== oldCurrentCourse.x ||
        newCurrentCourse.y !== oldCurrentCourse.y ||
        newCurrentCourse.z !== oldCurrentCourse.z
      ) {
        update = true;
        enteredCourse = newCurrentCourse;
      }
      if (update) {
        this.setState({
          destination,
          calculatedCourse,
          enteredCourse
        });
      }
    }
  }

  updateDestination = e => {
    e.preventDefault();
    this.setState({
      destination: e.target.value
    });
  };
  keydown(e) {
    let key;
    let enteredCourse = Object.assign({}, this.state.enteredCourse);
    let selectedField = this.state.selectedField;
    if (selectedField === null) {
      selectedField = "x";
      enteredCourse = {
        x: "",
        y: "",
        z: ""
      };
    }
    if (!e.which) {
      key = e.toString();
    }
    let newValue = enteredCourse[selectedField];
    if (newValue === null || newValue === undefined) {
      newValue = "";
    }
    if (key === "." && newValue.indexOf(".") > -1) return;
    newValue += key;
    this.setState({
      enteredCourse: { ...enteredCourse, [selectedField]: newValue },
      selectedField
    });
  }
  clear() {
    const { enteredCourse, selectedField } = this.state;
    if (
      selectedField === null ||
      enteredCourse[selectedField] === null ||
      enteredCourse[selectedField] === ""
    ) {
      this.setState({
        enteredCourse: {},
        selectedField: null
      });
      return;
    }
    enteredCourse[selectedField] = "";
    this.setState({
      enteredCourse
    });
  }
  enter() {
    const { enteredCourse, selectedField } = this.state;
    if (selectedField === null) {
      this.setState({
        selectedField: "x"
      });
      return;
    }
    if (
      enteredCourse[selectedField] === null ||
      enteredCourse[selectedField] === ""
    ) {
      return;
    }
    if (
      selectedField === "z" &&
      (enteredCourse[selectedField] !== null &&
        enteredCourse[selectedField] !== "")
    ) {
      this.inputDestination();
      return;
    }
    if (selectedField === "x") {
      this.setState({
        selectedField: "y"
      });
      return;
    }
    if (selectedField === "y") {
      this.setState({
        selectedField: "z"
      });
      return;
    }
  }
  calc() {
    const navigation = this.props.data.navigation[0];
    const mutation = gql`
      mutation CalculateCourse($id: ID!, $destination: String!) {
        navCalculateCourse(id: $id, destination: $destination)
      }
    `;
    const variables = {
      id: navigation.id,
      destination: this.state.destination
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  cancelCalc() {
    const navigation = this.props.data.navigation[0];
    const mutation = gql`
      mutation CancelCalculation($id: ID!) {
        navCancelCalculation(id: $id)
      }
    `;
    const variables = {
      id: navigation.id,
      destination: this.state.destination
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  inputDestination() {
    const navigation = this.props.data.navigation[0];
    const mutation = gql`
      mutation CourseEntry($id: ID!, $x: String!, $y: String!, $z: String!) {
        navCourseEntry(id: $id, x: $x, y: $y, z: $z)
      }
    `;
    const course = this.state.enteredCourse;
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

    // Do a little entering effect.
    this.setState({
      scanning: true,
      selectedField: "x"
    });
    setTimeout(() => {
      this.setState({
        scanning: false,
        selectedField: "y"
      });
    }, 250);
    setTimeout(() => {
      this.setState({
        selectedField: "z"
      });
    }, 500);
    setTimeout(() => {
      this.setState({
        selectedField: null
      });
    }, 750);
  }
  render() {
    if (this.props.data.loading || !this.props.data.navigation) return null;
    const { enteredCourse, selectedField } = this.state;
    const navigation = this.props.data.navigation[0];
    const scanning = this.state.scanning || navigation.scanning;
    if (!navigation) return <p>No Navigation System</p>;
    return (
      <Container fluid className="cardNavigation">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: NAVIGATION_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  navigation: subscriptionData.data.navigationUpdate
                });
              }
            })
          }
        />
        <DamageOverlay
          system={navigation}
          message={`Navigation System Offline`}
        />
        <Row>
          <Col xl={6} lg={5}>
            {navigation.calculate && (
              <Row>
                {navigation.scanning ? (
                  <Col sm="12">
                    <Button
                      block
                      size="lg"
                      style={{ marginTop: "55px" }}
                      color="warning"
                      onClick={this.cancelCalc.bind(this)}
                    >
                      Cancel Scan
                    </Button>
                  </Col>
                ) : (
                  <Col sm="12">
                    <label htmlFor="destination">
                      <h3>Desired Destination:</h3>
                    </label>
                    <InputGroup>
                      <Input
                        id="destination"
                        type="text"
                        style={{ height: "55px" }}
                        value={this.state.destination}
                        onChange={this.updateDestination}
                        className="form-control no-keypad"
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          onClick={this.calc.bind(this)}
                          color="secondary"
                          style={{ marginTop: "-1px", height: "56px" }}
                        >
                          Calculate Coordinates
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                )}
              </Row>
            )}
            <Row>
              <Col className="col-sm-12">
                <NavigationScanner scanning={scanning} />
              </Col>
            </Row>
          </Col>
          <Col className="course-numbers">
            {navigation.calculate && <CourseNumber {...navigation} />}
            {!navigation.thrusters && (
              <div className="currentCourse card">
                <label>Current Course</label>
                <Row>
                  <Col className="col-sm-3">X:</Col>
                  <Col
                    onClick={() => this.setState({ selectedField: "x" })}
                    className={`col-sm-8 numBox ${
                      selectedField === "x" ? "selected" : ""
                    }`}
                  >
                    {enteredCourse.x}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-sm-3">Y:</Col>
                  <Col
                    onClick={() => this.setState({ selectedField: "y" })}
                    className={`col-sm-8 numBox ${
                      selectedField === "y" ? "selected" : ""
                    }`}
                  >
                    {enteredCourse.y}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-sm-3">Z:</Col>
                  <Col
                    onClick={() => this.setState({ selectedField: "z" })}
                    className={`col-sm-8 numBox ${
                      selectedField === "z" ? "selected" : ""
                    }`}
                  >
                    {enteredCourse.z}
                  </Col>
                </Row>
              </div>
            )}
          </Col>
          {!navigation.thrusters && (
            <Col className="number-pad">
              <Keypad
                keydown={this.keydown.bind(this)}
                clear={this.clear.bind(this)}
                enter={this.enter.bind(this)}
              />
            </Col>
          )}
        </Row>
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
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
      thrusters
      calculatedCourse {
        x
        y
        z
      }
    }
  }
`;

export default graphql(NAVIGATION_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(Navigation));
