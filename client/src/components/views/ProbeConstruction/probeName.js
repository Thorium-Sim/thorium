import React, { Component } from "react";
import { Button, Input } from "helpers/reactstrap";
import Measure from "react-measure";
import "./style.scss";

function d2r(deg) {
  return (deg * Math.PI) / 180;
}

class ProbeName extends Component {
  state = {
    name: ""
  };
  render() {
    const { probes, launchProbe, equipment, network } = this.props;
    const { name } = this.state;
    return (
      <div className="probe-name">
        {equipment.find(e => e.id === "probe-network-package") ? (
          <div>
            <h2>Please select a destination for the probe</h2>
            <div>
              <Measure
                bounds
                onResize={contentRect => {
                  this.setState({ dimensions: contentRect.bounds });
                }}
              >
                {({ measureRef }) => (
                  <div
                    ref={measureRef}
                    style={{
                      height:
                        this.state.dimensions && this.state.dimensions.width
                    }}
                  >
                    {this.state.dimensions && (
                      <div
                        className={`grid`}
                        style={{
                          width: this.state.dimensions.width,
                          height: this.state.dimensions.width
                        }}
                      >
                        {Array(8)
                          .fill(0)
                          .map((_, i, array) => (
                            <div
                              key={`line-${i}`}
                              className="line"
                              style={{
                                transform: `rotate(${((i + 0.5) /
                                  array.length) *
                                  360}deg)`
                              }}
                            />
                          ))}
                        {Array(3)
                          .fill(0)
                          .map((_, i, array) => (
                            <div
                              key={`ring-${i}`}
                              className="ring"
                              style={{
                                width: `${((i + 1) / array.length) * 100}%`,
                                height: `${((i + 1) / array.length) * 100}%`,
                                backgroundColor: i < 2 ? "black" : "transparent"
                              }}
                            />
                          ))}
                        {Array(8)
                          .fill(0)
                          .map(
                            (_, i, array) =>
                              network.indexOf(i + 1) === -1 && (
                                <p
                                  key={`label-${i}`}
                                  className="label"
                                  onClick={() => {
                                    launchProbe(i + 1);
                                  }}
                                  style={{
                                    transform: `translate(${(Math.cos(
                                      d2r(((i - 2) / array.length) * 360)
                                    ) *
                                      this.state.dimensions.height) /
                                      2.5}px, ${(Math.sin(
                                      d2r(((i - 2) / array.length) * 360)
                                    ) *
                                      this.state.dimensions.height) /
                                      2.5}px)`
                                  }}
                                >
                                  {i + 1}
                                </p>
                              )
                          )}
                      </div>
                    )}
                  </div>
                )}
              </Measure>
            </div>
          </div>
        ) : (
          <div>
            <h2>Please enter a name for the probe</h2>
            <div>
              <Input
                type="text"
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <Button
              block
              disabled={!name}
              color="primary"
              onClick={() => launchProbe(this.state.name)}
            >
              {probes.torpedo ? "Load" : "Launch"} Probe
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default ProbeName;
