import React, { Component } from "react";
import bodymovin from "bodymovin";
import animationData from "./data.json";

export default class RedAlert extends Component {
  componentDidMount() {
    bodymovin.loadAnimation({
      container: document.querySelector("#redalert-bodymovin"),
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
