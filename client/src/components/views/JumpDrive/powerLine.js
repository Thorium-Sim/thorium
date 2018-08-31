import React, { Component } from "react";
import Measure from "react-measure";
import { Row, Col } from "reactstrap";

function calcBorderColor(i, power, powerLevels) {
  const color = i >= power ? "transparent" : "#0b0";
  if (powerLevels.indexOf(i + 1) > -1)
    return `${color} yellow ${color} ${color}`;
  return color;
}
class PowerLine extends Component {
  static defaultProps = {
    maxPower: 40,
    powerLevels: []
  };
  state = { power: this.props.power || 0 };
  componentDidUpdate(prevProps) {
    if (this.props.power !== prevProps.power)
      this.setState({ power: this.props.power });
  }
  mouseDown = e => {
    this.mouseMove(e);
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("touchmove", this.mouseMove);
    document.addEventListener("touchend", this.mouseUp);
  };
  mouseUp = () => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("touchmove", this.mouseMove);
    document.removeEventListener("touchend", this.mouseUp);
    this.props.onChange && this.props.onChange(this.state.power);
  };
  mouseMove = e => {
    const { maxPower, topPower } = this.props;
    const {
      dimensions: { left, width }
    } = this.state;
    const mouseX = e.pageX || e.touches[0].pageX;
    const boxWidth = width / (maxPower - 1) - 4;
    const newPower = Math.floor((mouseX - left) / boxWidth) - 1;
    if (newPower > topPower) return;
    this.setState({
      power: newPower
    });
  };
  render() {
    const { power } = this.state;
    const { powerLevels, maxPower, label, style } = this.props;
    return (
      <Row className="power-bar-dragger" style={{ ...style }}>
        <Col sm={4}>{label}</Col>
        <Measure
          bounds
          onResize={contentRect => {
            this.setState({ dimensions: contentRect.bounds });
          }}
        >
          {({ measureRef }) => (
            <div className="col-sm-8 power-bar-holder" ref={measureRef}>
              <div className="power-line-holder">
                {powerLevels.map(n => {
                  return (
                    <div
                      className="power-level"
                      key={`powerLine-${n}`}
                      style={{ left: `${(n + 1) * 14 - 7}px` }}
                    />
                  );
                })}
              </div>
              <div
                className="power-box zero"
                onMouseDown={this.mouseDown}
                onTouchStart={this.mouseDown}
              />
              {Array(maxPower)
                .fill(0)
                .map((n, i) => {
                  return (
                    <div
                      style={{
                        backgroundColor: i >= power ? "transparent" : null,

                        borderColor: calcBorderColor(i, power, powerLevels)
                      }}
                      className={`power-box`}
                      onMouseDown={this.mouseDown}
                      onTouchStart={this.mouseDown}
                      key={`powerLevel-${i}`}
                    />
                  );
                })}
            </div>
          )}
        </Measure>
      </Row>
    );
  }
}
export default PowerLine;
