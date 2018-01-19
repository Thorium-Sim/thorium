import React, { Component } from "react";
import Arrow from "./arrow";
import Measure from "react-measure";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

class Bars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      top: 0,
      mouseY: 0,
      level: props.level
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      level: nextProps.level
    });
  }
  mouseDown = (dimensions, evt) => {
    this.setState(
      {
        height: dimensions.height,
        top: dimensions.top,
        mouseY: evt.nativeEvent.pageY
      },
      () => {
        document.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("touchmove", this.mouseMove);
        document.addEventListener("mouseup", this.mouseUp);
        document.addEventListener("touchend", this.mouseUp);
      }
    );
  };
  mouseMove = e => {
    const { max = 1 } = this.props;
    const pageY = e.pageY || e.touches[0].pageY;
    const { height, top } = this.state;
    this.setState({
      level: Math.max(Math.min((pageY - top) / height, 1), max)
    });
  };
  mouseUp = e => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("touchmove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("touchend", this.mouseUp);

    // mutate to update
    const { id } = this.props;
    const mutation = gql`
      mutation TractorBeamStrength($id: ID!, $strength: Float!) {
        setTractorBeamStrength(id: $id, strength: $strength)
      }
    `;
    const variables = {
      id,
      strength: Math.abs(this.state.level - 1)
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const {
      color,
      simulator,
      arrow,
      flop,
      className,
      label,
      active
    } = this.props;
    const { level } = this.state;
    return (
      <div className={`bar-container ${className} ${active ? "shown" : ""}`}>
        {arrow && (
          <Measure
            bounds
            onResize={contentRect => {
              this.setState({ dimensions: contentRect.bounds });
            }}
          >
            {({ measureRef }) => (
              <div ref={measureRef} className="arrow-container">
                {this.state.dimensions && (
                  <Arrow
                    dimensions={this.state.dimensions}
                    alertLevel={simulator.alertLevel}
                    level={level}
                    mouseDown={this.mouseDown}
                    flop={true}
                  />
                )}
              </div>
            )}
          </Measure>
        )}
        <p className="barLabel">
          {label && label + ": "}
          {Math.round(Math.abs(level - 1) * 100) + "%"}
        </p>
        <div className="bar-holder">
          {Array(30)
            .fill(0)
            .map((_, index, array) => {
              return (
                <div
                  key={`tractor-bars-${index}`}
                  className="bar"
                  style={{
                    opacity: index / array.length >= level ? 1 : 0.3,
                    backgroundColor: color || null,
                    width:
                      array.length / (index + 2) * (100 / array.length) + "%",
                    marginLeft: flop
                      ? Math.abs(
                          array.length / (index + 2) * (100 / array.length) -
                            100
                        ) + "%"
                      : 0
                  }}
                />
              );
            })}
        </div>
      </div>
    );
  }
}
export default withApollo(Bars);
