import React, { Component } from "react";
import ThreeView from "./threeView";
import Measure from "react-measure";
import "./style.scss";

export default props => {
  const data = JSON.parse(props.viewscreen.data);
  return <RenderSphere {...data} />;
};

class RenderSphere extends Component {
  state = { rotation: 0 };
  _onAnimate = () => {
    this.setState({
      rotation: this.state.rotation + 0.005
    });
  };
  render() {
    const { text } = this.props;
    const { dimensions } = this.state;
    return (
      <div className="planetary-scan">
        <Measure
          bounds
          onResize={contentRect => {
            this.setState({ dimensions: contentRect.bounds });
          }}
        >
          {({ measureRef }) => (
            <div className="scannerBox" ref={measureRef}>
              <div className="scannerBar" />
              {dimensions && (
                <ThreeView {...this.props} dimensions={dimensions} />
              )}
            </div>
          )}
        </Measure>
        <div className="text-box">{text}</div>
      </div>
    );
  }
}
