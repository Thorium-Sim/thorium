import React, {Component} from "react";
import "./style.scss";

class IntruderMonitoring extends Component {
  render() {
    return (
      <div className="intruder-monitoring">
        <h1>Intruder Monitor</h1>
        <div className="ship-view">
          <div
            alt="ship"
            style={{
              width: "70vw",
              height: "70vh",
              backgroundImage: `url("/assets${this.props.simulator.assets.side}")`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
            }}
            draggable="false"
          >
            <div
              className="parent"
              style={{
                WebkitMaskImage: `url('/assets${this.props.simulator.assets.side}')`,
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
                        Math.random() * 100,
                      )}%, ${Math.round(Math.random() * 100)}%)`,
                    }}
                  >
                    <div
                      className="dot"
                      style={{
                        animationDelay: `${(i / 20) * 7 + 3}s`,
                      }}
                    />
                  </div>
                ))}
            </div>
            <div
              className="scanner-mask"
              style={{
                WebkitMaskImage: `url('/assets${this.props.simulator.assets.side}')`,
              }}
            >
              <div className="scanner-holder">
                <div className="scanner" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IntruderMonitoring;
