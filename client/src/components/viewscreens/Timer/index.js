import React, { Component } from "react";

class TimerViewscreen extends Component {
  render() {
    console.log(this.props);
    const {
      viewscreen: { data = "{}" }
    } = this.props;
    const { timer, title } = JSON.parse(data);
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            maxWidth: "70%",
            textAlign: "center"
          }}
        >
          {title}
        </h1>
        <h1
          style={{
            fontSize: "80px"
          }}
        >
          {timer}
        </h1>
      </div>
    );
  }
}

export default TimerViewscreen;
