import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import DeconProgram from "./program";

class Sickbay extends Component {
  render() {
    const { deconActive } = this.props;
    if (deconActive) {
      return <DeconProgram {...this.props} />;
    }
    return <Container />;
  }
}

export default Sickbay;
