import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import Arrow from "./arrow";

class ChargeBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: props.value
    };
  }
  componentDidUpdate() {
    if (!this.state.dragging && this.state.level !== this.props.value) {
      this.setState({
        level: this.props.value
      });
    }
  }
  mouseDown = () => {
    this.setState({
      dragging: true
    });
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("touchmove", this.mouseMove);
    document.addEventListener("touchend", this.mouseUp);
  };
  mouseUp = () => {
    const mutation = gql`
      mutation StealthQuadrant($id: ID, $which: String, $value: Float) {
        setStealthQuadrant(id: $id, which: $which, value: $value)
      }
    `;
    const variables = {
      id: this.props.id,
      which: this.props.label.toLowerCase(),
      value: Math.round(this.state.level * 20) / 20
    };
    this.props.client
      .mutate({
        mutation,
        variables
      })
      .then(() => {
        this.setState({
          dragging: false
        });
      });
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("touchmove", this.mouseMove);
    document.removeEventListener("touchend", this.mouseUp);
  };
  mouseMove = evt => {
    const node = ReactDOM.findDOMNode(this).querySelector(".bar-holder");
    this.setState({
      level: Math.min(
        1,
        Math.max(
          0,
          ((evt.clientY || evt.touches[0].clientY) -
            node.getBoundingClientRect().top) /
            node.getBoundingClientRect().height
        )
      )
    });
  };
  render() {
    const { level } = this.state;
    const { label } = this.props;
    return (
      <div className="chargeBar">
        <div className="bar-holder">
          <div className="bar">
            <div className="bar-line" />
          </div>
          <Arrow
            alertLevel={this.props.simulator.alertLevel}
            level={level}
            mouseDown={this.mouseDown}
          />
        </div>
        <p>
          {label}: {Math.round(level * 20)}
        </p>
      </div>
    );
  }
}

export default withApollo(ChargeBar);
