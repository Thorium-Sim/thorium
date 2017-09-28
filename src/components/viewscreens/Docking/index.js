import React, { Component } from "react";
import bodymovin from "bodymovin";
import animationData from "./data.json";

export default class Docking extends Component {
  componentDidMount() {
    bodymovin.loadAnimation({
      container: document.querySelector("#docking-bodymovin"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData
    });
  }
  render() {
    return <div id="docking-bodymovin" />;
  }
}
