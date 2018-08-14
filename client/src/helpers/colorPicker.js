import React, { Component } from "react";
import { ChromePicker } from "react-color";

class ColorPicker extends Component {
  state = {
    displayColorPicker: false
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };
  render() {
    const { color, onChangeComplete } = this.props;
    return (
      <div>
        <div
          style={{
            padding: "5px",
            background: "#fff",
            borderRadius: "1px",
            boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
            display: "inline-block",
            cursor: "pointer"
          }}
          onClick={this.handleClick}
        >
          <div
            style={{
              width: "36px",
              height: "14px",
              borderRadius: "2px",
              background: color
            }}
          />
        </div>
        {this.state.displayColorPicker ? (
          <div
            style={{
              position: "absolute",
              zIndex: "2"
            }}
          >
            <div
              style={{
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px"
              }}
              onClick={this.handleClose}
            />
            <ChromePicker color={color} onChangeComplete={onChangeComplete} />{" "}
          </div>
        ) : null}
      </div>
    );
  }
}
export default ColorPicker;
