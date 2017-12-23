import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import gql from "graphql-tag";
import { InputGroup, InputGroupButton, Button, Input } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import DamageOverlay from "../helpers/DamageOverlay";
import Keypad from "./keypad";
import Tour from "reactour";

import "./style.css";

const trainingSteps = [
  {
    selector: ".number-pad",
    content:
      "Using the number pad, input the calculated course coordinates in the Current Course fields to set your course."
  }
];

export class NavigationScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineX: 50,
      lineY: 50,
      backX: 0,
      backY: 0
    };
    this.scanning = null;
    if (props.scanning) {
      this.scanning = setTimeout(this._scan.bind(this), 100);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.scanning && nextProps.scanning) {
      this.scanning = setTimeout(this._scan.bind(this), 100);
    }
    if (!nextProps.scanning) {
      clearTimeout(this.scanning);
      this.scanning = null;
    }
  }
  componentWillUnmount() {
    clearTimeout(this.scanning);
    this.scanning = null;
  }
  _scan() {
    if (this.props.scanning && this.scanning) {
      this.setState({
        lineX: Math.random() * 100,
        lineY: Math.random() * 100,
        backX: (Math.random() - 0.5) * 1000,
        backY: (Math.random() - 0.5) * 1000
      });
      this.scanning = setTimeout(
        this._scan.bind(this),
        Math.random(5000) + 2000
      );
    }
  }
  render() {
    return (
      <div
        className="starsBox"
        style={{
          backgroundPosition: `${this.state.backX}px ${this.state.backY}px`
        }}
      >
        <div className="barVert" style={{ left: `${this.state.lineX}%` }} />
        <div className="barHoriz" style={{ top: `${this.state.lineY}%` }} />
        <div
          className="crosshair"
          style={{
            left: `calc(${this.state.lineX}% - 18px)`,
            top: `calc(${this.state.lineY}% - 18px)`
          }}
        >
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}

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
      this.scanning = setTimeout(this._scan.bind(this), 100);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.scanning);
    this.scanning = null;
    this.subscription();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: NAVIGATION_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            navigation: subscriptionData.data.navigationUpdate
          });
        }
      });
    }
    if (!nextProps.data.loading && nextProps.data.navigation) {
      const navigation = nextProps.data.navigation[0];
      if (navigation) {
        if (navigation.scanning) {
          this.scanning = setTimeout(this._randomCourse.bind(this), 60);
        }
        if (!navigation.scanning) {
          clearTimeout(this.scanning);
          this.scanning = null;
        }
        this.setState({
          destination: navigation.destination,
          calculatedCourse: navigation.calculatedCourse,
          enteredCourse: navigation.currentCourse
        });
      }
    }
  }
  _randomCourse() {
    this.setState({
      calculatedCourse: {
        x: Math.round(Math.random() * 100000) / 100,
        y: Math.round(Math.random() * 100000) / 100,
        z: Math.round(Math.random() * 100000) / 100
      }
    });
    this.scanning = setTimeout(this._randomCourse.bind(this), 60);
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
    if (e.which) {
    } else {
      key = e.toString();
    }
    if (
      enteredCourse[selectedField] === null ||
      enteredCourse[selectedField] === undefined
    )
      enteredCourse[selectedField] = "";
    if (key === "." && enteredCourse[selectedField].indexOf(".") > -1) return;
    enteredCourse[selectedField] += key;
    this.setState({
      enteredCourse,
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
    const { calculatedCourse, enteredCourse, selectedField } = this.state;
    const navigation = this.props.data.navigation[0];
    const scanning = this.state.scanning || navigation.scanning;
    if (!navigation) return <p>No Navigation System</p>;
    return (
      <Container fluid className="cardNavigation">
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
                        value={this.state.destination}
                        onChange={this.updateDestination}
                        className="form-control no-keypad"
                      />
                      <InputGroupButton>
                        <Button
                          onClick={this.calc.bind(this)}
                          color="secondary"
                          style={{ marginTop: "-1px", height: "56px" }}
                        >
                          Calculate Coordinates
                        </Button>
                      </InputGroupButton>
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
          <Col className="col-sm-3">
            {navigation.calculate && (
              <div className="calculated card">
                <label>Calculated Course</label>
                <Row>
                  <Col className="col-sm-3">X:</Col>
                  <Col className="col-sm-8 numBox">{calculatedCourse.x}</Col>
                </Row>
                <Row>
                  <Col className="col-sm-3">Y:</Col>
                  <Col className="col-sm-8 numBox">{calculatedCourse.y}</Col>
                </Row>
                <Row>
                  <Col className="col-sm-3">Z:</Col>
                  <Col className="col-sm-8 numBox">{calculatedCourse.z}</Col>
                </Row>
              </div>
            )}
            <div className="currentCourse card">
              <label>Current Course</label>
              <Row>
                <Col className="col-sm-3">X:</Col>
                <Col
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
                  className={`col-sm-8 numBox ${
                    selectedField === "z" ? "selected" : ""
                  }`}
                >
                  {enteredCourse.z}
                </Col>
              </Row>
            </div>
          </Col>
          <Col xl={3} lg={4} className="number-pad">
            <Keypad
              keydown={this.keydown.bind(this)}
              clear={this.clear.bind(this)}
              enter={this.enter.bind(this)}
            />
          </Col>
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
      calculatedCourse {
        x
        y
        z
      }
    }
  }
`;

export default graphql(NAVIGATION_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(Navigation));
