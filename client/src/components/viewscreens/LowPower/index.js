import React, { Component } from "react";
import ReactDOM from "react-dom";
import bodymovin from "bodymovin";
import animationData from "./data.json";

export default class AsteroidField extends Component {
  componentDidMount() {
    bodymovin.loadAnimation({
      container: ReactDOM.findDOMNode(this).querySelector("#bodymovin"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData
    });
  }
  render() {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div id="bodymovin" style={{ height: "80vh" }} />
      </div>
    );
  }
}
