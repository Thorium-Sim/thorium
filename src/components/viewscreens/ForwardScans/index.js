import React, { Component } from "react";
import bodymovin from "bodymovin";
import animationData from "./data.json";

export default class ForwardScans extends Component {
  componentDidMount() {
    bodymovin.loadAnimation({
      container: document.querySelector("#forwardscans-bodymovin"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData
    });
  }
  render() {
    return <div id="forwardscans-bodymovin" />;
  }
}
