import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Measure from "react-measure";

import ReactorModel from "../../views/ReactorControl/model";

export default class ReactorActivation extends Component {
  constructor(props) {
    super(props);
    const data = JSON.parse(props.viewscreen.data);
    this.looping = false;
    this.state = {
      output: parseFloat(data.startOutput) || 0
    };
  }
  componentWillReceiveProps(nextProps) {
    const data = JSON.parse(nextProps.viewscreen.data);
    this.looping = false;
    cancelAnimationFrame(this.frame);
    this.frame = false;
    this.setState(
      state => ({ output: parseFloat(data.startOutput) }),
      () => {
        this.looping = true;
        this.loop();
      }
    );
  }
  loop = () => {
    if (!this.looping) return false;
    const data = JSON.parse(this.props.viewscreen.data);
    if (parseFloat(data.startOutput) > parseFloat(data.endOutput)) {
      if (this.state.output > parseFloat(data.endOutput)) {
        this.setState({
          output: this.state.output - 0.01
        });
      } else {
        cancelAnimationFrame(this.frame);
        this.frame = null;
        return false;
      }
    } else {
      if (this.state.output < parseFloat(data.endOutput)) {
        this.setState({
          output: this.state.output + 0.01
        });
      } else {
        cancelAnimationFrame(this.frame);
        this.frame = null;
        return false;
      }
    }
    this.frame = requestAnimationFrame(this.loop);
  };
  render() {
    return (
      <div style={{ marginTop: "15vh" }}>
        <Container>
          <Row>
            <Col sm={6}>
              <Measure
                bounds
                onResize={contentRect => {
                  this.setState({ dimensions: contentRect.bounds });
                }}
              >
                {({ measureRef }) => (
                  <div ref={measureRef} style={{ height: "80vh" }}>
                    {this.state.dimensions && (
                      <ReactorModel dimensions={this.state.dimensions} />
                    )}
                  </div>
                )}
              </Measure>
            </Col>
            <Col
              sm={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <h1 style={{ fontSize: "60px" }}>
                Reactor Output: {Math.round(this.state.output * 1000) / 10}%
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
