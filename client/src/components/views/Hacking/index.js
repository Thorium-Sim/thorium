import React, { Component } from "react";
import Terminal from "./terminal";
import Connection from "./connection";
import "./style.scss";

export default class Hacking extends Component {
  state = {};
  render() {
    const { connected } = this.state;
    if (connected)
      return (
        <Terminal disconnect={() => this.setState({ connected: false })} />
      );
    return <Connection connect={() => this.setState({ connected: true })} />;
  }
}
