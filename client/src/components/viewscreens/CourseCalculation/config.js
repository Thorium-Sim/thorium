import React, { Component } from "react";

export default class CourseCalculationConfig extends Component {
  render() {
    let { data, updateData } = this.props;
    data = JSON.parse(data);
    data.calculatedCourse = data.calculatedCourse || {};
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={data.reactive}
            onChange={evt =>
              updateData(
                JSON.stringify(
                  Object.assign({}, data, { reactive: evt.target.checked })
                )
              )
            }
          />{" "}
          Use simulator data
        </label>
        <label>
          <input
            type="checkbox"
            checked={data.scanning}
            onChange={evt =>
              updateData(
                JSON.stringify(
                  Object.assign({}, data, { scanning: evt.target.checked })
                )
              )
            }
          />{" "}
          Scanning
        </label>
        <label>
          <input
            type="checkbox"
            checked={data.thrusters}
            onChange={evt =>
              updateData(
                JSON.stringify(
                  Object.assign({}, data, { thrusters: evt.target.checked })
                )
              )
            }
          />{" "}
          Thrusters
        </label>
        <label>
          Destination
          <input
            type="text"
            value={data.destination}
            onChange={evt =>
              updateData(
                JSON.stringify(
                  Object.assign({}, data, { destination: evt.target.value })
                )
              )
            }
          />
        </label>
        <label>
          X
          <input
            type="text"
            value={data.calculatedCourse.x}
            onChange={evt =>
              updateData(
                JSON.stringify(
                  Object.assign({}, data, {
                    calculatedCourse: {
                      x: evt.target.value,
                      y: data.calculatedCourse.y,
                      z: data.calculatedCourse.z
                    }
                  })
                )
              )
            }
          />
        </label>
        <label>
          Y
          <input
            type="text"
            value={data.calculatedCourse.y}
            onChange={evt =>
              updateData(
                JSON.stringify(
                  Object.assign({}, data, {
                    calculatedCourse: {
                      x: data.calculatedCourse.x,
                      y: evt.target.value,
                      z: data.calculatedCourse.z
                    }
                  })
                )
              )
            }
          />
        </label>
        <label>
          Z
          <input
            type="text"
            value={data.calculatedCourse.z}
            onChange={evt =>
              updateData(
                JSON.stringify(
                  Object.assign({}, data, {
                    calculatedCourse: {
                      x: data.calculatedCourse.x,
                      y: data.calculatedCourse.y,
                      z: evt.target.value
                    }
                  })
                )
              )
            }
          />
        </label>
        <button
          onClick={() =>
            updateData(
              JSON.stringify(
                Object.assign({}, data, {
                  calculatedCourse: {
                    x: Math.floor(Math.random() * 99999) / 100,
                    y: Math.floor(Math.random() * 99999) / 100,
                    z: Math.floor(Math.random() * 99999) / 100
                  }
                })
              )
            )
          }
        >
          Random
        </button>
      </div>
    );
  }
}
