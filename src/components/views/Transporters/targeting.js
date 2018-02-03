import React, { Component } from "react";
import Draggable from "react-draggable";
import { Button, Row, Col } from "reactstrap";
import throttle from "lodash/throttle";
import Measure from "react-measure";

const ChargeBar = props => {
  return (
    <div className="chargeBar" style={{ height: `${props.charge * 100}%` }} />
  );
};

export default class Target extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTarget: null,
      charge: props.charge || 0,
      mouseCharge: 0
    };
    this.updateCharge = throttle(props.setCharge, 1000);
  }
  componentDidMount() {
    this.ticking = true;
    this.tick();
  }
  componentWillUnmount() {
    this.ticking = false;
  }
  tick() {
    if (!this.ticking) return;
    const { selectedTarget, mouseCharge, charge } = this.state;
    if (
      (selectedTarget && mouseCharge > charge && mouseCharge < charge + 0.08) ||
      charge > 0.98
    ) {
      this.setState({
        charge: charge + 0.0025
      });
      if (charge > 1.5) {
        this.props.completeTransport(selectedTarget);
        this.setState({
          charge: 0.97,
          mouseCharge: 0,
          selectedTarget: null
        });
      }
    }
    if (
      (!selectedTarget ||
        mouseCharge < charge - 0.01 ||
        mouseCharge > charge + 0.09) &&
      charge < 0.98
    ) {
      let chargeNum = charge - 0.0075;
      if (chargeNum < 0) chargeNum = 0;
      this.setState({
        charge: chargeNum
      });
    }
    if (selectedTarget && charge > 0) {
      if (charge > 1) {
        this.updateCharge(1);
      } else {
        this.updateCharge(charge);
      }
    }
    window.requestAnimationFrame(this.tick.bind(this));
  }
  powerUp(e) {
    const { clientHeight: height } = e.currentTarget;
    const { top } = e.currentTarget.getBoundingClientRect();
    const clientY = e.clientY || e.touches[0].clientY;
    if (this.state.selectedTarget) {
      this.setState({
        mouseCharge:
          Math.round((height - (clientY - top)) / height * 1000) / 1000
      });
    }
  }
  dragTarget = (event, obj) => {
    const { width, height } = this.state.dimensions;
    const { x, y } = obj;
    let selectedTarget = null;
    this.props.targets.forEach(target => {
      const { x: objX, y: objY } = target.position;
      if (
        Math.round((objX - x / width * 1.1) * 50) === 0 &&
        Math.round((objY - y / height * 1.1) * 50) === 0
      ) {
        // The crosshair is on top of a target
        selectedTarget = target;
      }
    });
    this.setState({
      selectedTarget
    });
  };
  render() {
    return (
      <div>
        <Row>
          <h2
            style={{
              color: "yellow",
              width: "100%",
              textAlign: "center",
              opacity: this.state.selectedTarget ? 1 : 0
            }}
          >
            Transport Possible
          </h2>
        </Row>
        <Row>
          <Col
            className="targetBox"
            lg={{ size: 6 }}
            xl={{ size: 4, offset: 1 }}
          >
            <Measure
              bounds
              onResize={contentRect => {
                this.setState({ dimensions: contentRect.bounds });
              }}
            >
              {({ measureRef }) => (
                <div ref={measureRef} style={{ height: "100%" }}>
                  {this.state.dimensions && (
                    <div>
                      {this.props.targets.map(target => {
                        return (
                          <img
                            alt="target"
                            key={target.id}
                            draggable="false"
                            role="presentation"
                            src={require("./crosstarget.svg")}
                            style={{
                              position: "absolute",
                              left: `${target.position.x * 90}%`,
                              top: `${target.position.y * 90}%`
                            }}
                          />
                        );
                      })}
                      <Draggable
                        bounds=".targetBox"
                        defaultPosition={{
                          x: this.state.dimensions.width / 2,
                          y: this.state.dimensions.height / 2
                        }}
                        onDrag={this.dragTarget}
                      >
                        <img
                          alt="crosshairs"
                          draggable="false"
                          role="presentation"
                          src={require("./crosshairs.svg")}
                        />
                      </Draggable>
                    </div>
                  )}
                </div>
              )}
            </Measure>
          </Col>
          <Col
            onMouseMove={this.powerUp.bind(this)}
            onTouchMove={this.powerUp.bind(this)}
            className="chargeBox"
            lg={{ size: 5, offset: 1 }}
            xl={{ size: 4, offset: 2 }}
          >
            <ChargeBar charge={this.state.charge < 1 ? this.state.charge : 1} />
            <ChargeBar charge={this.state.charge < 1 ? this.state.charge : 1} />
            <ChargeBar charge={this.state.charge < 1 ? this.state.charge : 1} />
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 4, offset: 4 }}>
            <div style={{ height: "30px" }} />
            <Button
              block
              color={"warning"}
              onClick={this.props.cancelTransport}
            >
              Cancel Transport
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
