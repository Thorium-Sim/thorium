import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Keypad from "../Navigation/keypad";
import gql from "graphql-tag";

export default class Coordinates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calculatedTarget: props.targeting.calculatedTarget || {},
      selectedField: null,
      enteredTarget: props.targeting.enteredTarget || {}
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      calculatedTarget: nextProps.targeting.calculatedTarget || {},
      enteredTarget: nextProps.targeting.enteredTarget || {}
    });
  }
  keydown = e => {
    let key;
    let enteredTarget = Object.assign({}, this.state.enteredTarget);
    let selectedField = this.state.selectedField;
    if (selectedField === null) {
      selectedField = "x";
      enteredTarget = {
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
      enteredTarget[selectedField] === null ||
      enteredTarget[selectedField] === undefined
    )
      enteredTarget[selectedField] = "";
    if (key === "." && enteredTarget[selectedField].indexOf(".") > -1) return;
    enteredTarget[selectedField] += key;
    this.setState({
      enteredTarget,
      selectedField
    });
  };
  clear = () => {
    const { enteredTarget, selectedField } = this.state;
    if (
      selectedField === null ||
      enteredTarget[selectedField] === null ||
      enteredTarget[selectedField] === ""
    ) {
      this.setState({
        enteredTarget: {},
        selectedField: null
      });
      return;
    }
    enteredTarget[selectedField] = "";
    this.setState({
      enteredTarget
    });
  };
  enter = () => {
    const { enteredTarget, selectedField } = this.state;
    if (selectedField === null) {
      this.setState({
        selectedField: "x"
      });
      return;
    }
    if (
      enteredTarget[selectedField] === null ||
      enteredTarget[selectedField] === ""
    ) {
      return;
    }
    if (
      selectedField === "z" &&
      (enteredTarget[selectedField] !== null &&
        enteredTarget[selectedField] !== "")
    ) {
      this.inputTarget();
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
  };
  inputTarget = () => {
    const { enteredTarget } = this.state;
    const mutation = gql`
      mutation SetEnteredTarget(
        $id: ID!
        $coordinates: StringCoordinatesInput!
      ) {
        setTargetingEnteredTarget(id: $id, coordinates: $coordinates)
      }
    `;
    const variables = {
      id: this.props.targeting.id,
      coordinates: enteredTarget
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      selectedField: null
    });
  };

  render() {
    const { enteredTarget, selectedField, calculatedTarget } = this.state;
    return (
      <Row style={{ justifyContent: "space-around" }}>
        <Col style={{ maxWidth: "20vw" }}>
          <h4>Keypad</h4>
          <Keypad
            margin
            keydown={this.keydown}
            clear={this.clear}
            enter={this.enter}
          />
        </Col>
        <Col style={{ maxWidth: "20vw" }}>
          <Row>
            <Col>
              <h4>Calculated Coordinates</h4>
              <div className="coordinate-box">
                X: <div>{calculatedTarget.x || ""}</div>
              </div>
              <div className="coordinate-box">
                Y: <div>{calculatedTarget.y || ""}</div>
              </div>
              <div className="coordinate-box">
                Z: <div>{calculatedTarget.z || ""}</div>
              </div>
            </Col>
          </Row>
          <Row className="current-coordinates">
            <Col>
              <h4>Current Coordinates</h4>
              <div className="coordinate-box">
                X:{" "}
                <div className={`${selectedField === "x" ? "selected" : ""}`}>
                  {enteredTarget.x}
                </div>
              </div>
              <div className="coordinate-box">
                Y:{" "}
                <div className={`${selectedField === "y" ? "selected" : ""}`}>
                  {enteredTarget.y}
                </div>
              </div>
              <div className="coordinate-box">
                Z:{" "}
                <div className={`${selectedField === "z" ? "selected" : ""}`}>
                  {enteredTarget.z}
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
