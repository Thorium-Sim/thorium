import React, { Component } from "react";
import { Asset } from "../../../helpers/assets";
import "./style.css";

class IntruderMonitoring extends Component {
  render() {
    console.log(
      `${Math.round(Math.random() * 100)}%, ${Math.round(Math.random() * 100)}%`
    );
    return (
      <div className="intruder-monitoring">
        <h1>Intruder Monitor</h1>
        <div className="ship-view">
          <Asset asset="/Ship Views/Left" simulatorId={this.props.simulator.id}>
            {({ src }) => {
              return (
                <div
                  alt="ship"
                  style={{
                    width: "70vw",
                    height: "70vh",
                    backgroundImage: `url("${src}")`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative"
                  }}
                  draggable="false"
                >
                  <div
                    className="parent"
                    style={{
                      WebkitMaskImage: `url('${src}')`
                    }}
                  >
                    {Array(20)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          className="dot-holder"
                          key={`dot-${i}`}
                          style={{
                            transform: `translate(${Math.round(
                              Math.random() * 100
                            )}%, ${Math.round(Math.random() * 100)}%)`
                          }}
                        >
                          <div
                            className="dot"
                            style={{
                              animationDelay: `${i / 20 * 7 + 3}s`
                            }}
                          />
                        </div>
                      ))}
                  </div>
                  <div
                    className="scanner-mask"
                    style={{
                      WebkitMaskImage: `url('${src}')`
                    }}
                  >
                    <div className="scanner-holder">
                      <div className="scanner" />
                    </div>
                  </div>
                </div>
              );
            }}
          </Asset>
        </div>
      </div>
    );
  }
}

export default IntruderMonitoring;
