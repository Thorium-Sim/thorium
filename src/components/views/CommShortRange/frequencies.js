import React, { Component } from "react";
import { Card } from "reactstrap";
import tinycolor from "tinycolor2";
import gql from "graphql-tag";
import Measure from "react-measure";
import Arrow from "./arrow";

function transparentColor(col) {
  var color = tinycolor(col);
  color.setAlpha(0.1);
  return color.toRgbString();
}

class Frequencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: props.frequency,
      mouseY: 0,
      which: null
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.frequency !== this.props.frequency) {
      this.setState({ frequency: this.props.frequency });
    }
  }
  mouseDown(which, dimensions) {
    this.setState(
      {
        height: dimensions.height,
        top: dimensions.top,
        which
      },
      () => {
        document.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mouseup", this.mouseUp);
        document.addEventListener("touchmove", this.mouseMove);
        document.addEventListener("touchend", this.mouseUp);
      }
    );
  }
  mouseMove = e => {
    const { state } = this.props;
    if (state === "hailing") {
      return;
    }
    const { height, top } = this.state;
    const obj = {};
    const value = Math.max(
      Math.min(((e.pageY || e.touches[0].pageY) - top) / height, 1),
      0
    );
    obj[this.state.which] = value;
    this.setState(obj);
    this.props.update("frequency", value);
  };
  mouseUp = () => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("touchmove", this.mouseMove);
    document.removeEventListener("touchend", this.mouseUp);
    this.commUpdate({
      frequency: this.state.frequency,
      amplitude: this.state.amplitude
    });
  };
  commUpdate(updateObj) {
    const { id } = this.props;
    const mutation = gql`
      mutation CommUpdate($id: ID!, $commUpdateInput: CommUpdateInput!) {
        commUpdate(id: $id, commUpdateInput: $commUpdateInput)
      }
    `;
    const variables = {
      id,
      commUpdateInput: updateObj
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render() {
    const { signals, arrows } = this.props;
    return (
      <Card className="frequencyContainer">
        <div className="signals">
          {signals.map(s => (
            <div
              key={s.id}
              className="signal"
              style={{
                height: `${(s.range.upper - s.range.lower) * 100}%`,
                top: `${s.range.lower * 100}%`,
                backgroundColor: transparentColor(s.color)
              }}
            >
              {s.name}
            </div>
          ))}
        </div>
        <div className="arrows">
          {arrows.map(a => (
            <Arrow
              key={a.id}
              alertLevel={this.props.simulator.alertLevel}
              level={a.frequency}
              flop={true}
              connected={a.connected}
              muted={a.muted}
            />
          ))}
        </div>
        <div className="bar frequencyBar" />
        <Measure
          bounds
          onResize={contentRect => {
            this.setState({ dimensions: contentRect.bounds });
          }}
        >
          {({ measureRef }) => (
            <div ref={measureRef} className="arrowHolder-right">
              {this.state.dimensions && (
                <Arrow
                  alertLevel={this.props.simulator.alertLevel}
                  level={this.state.frequency}
                  mouseDown={this.mouseDown.bind(this, "frequency")}
                  dimensions={this.state.dimensions}
                />
              )}
            </div>
          )}
        </Measure>
      </Card>
    );
  }
}
export default Frequencies;
