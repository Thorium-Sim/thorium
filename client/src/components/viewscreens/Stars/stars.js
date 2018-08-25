import React, { Component } from "react";
import Measure from "react-measure";
import ThreeView from "./threeView";

class Stars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      velocity: props.activating ? 0 : props.velocity
    };
    if (props.activating) {
      setTimeout(() => {
        this.setState({ velocity: props.velocity });
      }, 1000);
    }
  }
  componentDidUpdate(oldProps) {
    if (oldProps.velocity !== this.props.velocity)
      this.setState({ velocity: this.props.velocity });
  }
  render() {
    const { dimensions, velocity } = this.state;
    return (
      <div className="stars" style={{ background: "black" }}>
        <Measure
          bounds
          onResize={contentRect => {
            this.setState({ dimensions: contentRect.bounds });
          }}
        >
          {({ measureRef }) => (
            <div
              id="three-container"
              ref={measureRef}
              style={{
                width: "100vw",
                height: "100vh"
              }}
            >
              {dimensions && <ThreeView {...dimensions} velocity={velocity} />}
            </div>
          )}
        </Measure>
      </div>
    );
  }
}
export default Stars;
