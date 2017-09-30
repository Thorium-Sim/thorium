import React, { Component } from "react";
import ReactDOM from "react-dom";
import bodymovin from "bodymovin";
import animationData from "./data.json";

export default class RedAlert extends Component {
  componentDidMount() {
    bodymovin.loadAnimation({
      container: ReactDOM.findDOMNode(this),
      renderer: "canvas",
      loop: true,
      autoplay: true,
      animationData
    });
  }
  render() {
    return <div id="redalert-bodymovin" />;
  }
}
