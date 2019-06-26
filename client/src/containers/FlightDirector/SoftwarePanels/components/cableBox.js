import React, { Component } from "react";
import "./cableBox.scss";
import { Button } from "helpers/reactstrap";

export default class CableBox extends Component {
  state = { open: false };
  drag = (e, color) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ open: false });
    this.props.dragCable(color);
    return false;
  };
  render() {
    const { open } = this.state;
    return (
      <div className="cable-box-container" onMouseDown={this.props.onMouseDown}>
        <Button
          className="cable-box-opener"
          onClick={() => this.setState({ open: !open })}
        >
          {" "}
          Open Cable Box{" "}
        </Button>
        <div
          className={`cable-box ${open ? "open" : ""}`}
          onClick={() => this.setState({ open: false })}
        >
          <div
            onMouseDown={e => this.drag(e, "red")}
            onTouchStart={e => this.drag(e, "red")}
            className="ready-cable red"
          />
          <div
            onMouseDown={e => this.drag(e, "blue")}
            onTouchStart={e => this.drag(e, "blue")}
            className="ready-cable blue"
          />
          <div
            onMouseDown={e => this.drag(e, "green")}
            onTouchStart={e => this.drag(e, "green")}
            className="ready-cable green"
          />
          <div
            onMouseDown={e => this.drag(e, "yellow")}
            onTouchStart={e => this.drag(e, "yellow")}
            className="ready-cable yellow"
          />
        </div>
      </div>
    );
  }
}
