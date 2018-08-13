import React, { Component } from "react";
import Measure from "react-measure";
import ThreeView from "./three-view";
import { Asset } from "../../../helpers/assets";
import "./style.scss";

class ShipModel extends Component {
  state = {};
  render() {
    const {
      viewscreen = { data: "{}" },
      simulator: { assets }
    } = this.props;
    const data = JSON.parse(viewscreen.data);
    const { title, description } = data;
    return (
      <div
        className={`ship-model-container ${
          title || description ? "has-text" : ""
        }`}
      >
        {(title || description) && (
          <div style={{ width: "40vh" }}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        )}
        <Asset asset={data.mesh || assets.mesh}>
          {({ src }) => (
            <Measure
              bounds
              onResize={contentRect => {
                this.setState({ dimensions: contentRect.bounds });
              }}
            >
              {({ measureRef }) => (
                <div ref={measureRef} className="three-container">
                  {this.state.dimensions && (
                    <ThreeView
                      {...data}
                      src={src}
                      texSrc={"/3D/Texture/Simulator/default.jpg"}
                      simulatorId={this.props.simulator.id}
                      dimensions={this.state.dimensions}
                    />
                  )}
                </div>
              )}
            </Measure>
          )}
        </Asset>
      </div>
    );
  }
}
export default ShipModel;
