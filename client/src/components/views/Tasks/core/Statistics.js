import React, { Component } from "react";
import { Button } from "helpers/reactstrap";
import { parseDuration } from "./TasksManager";

class Statistics extends Component {
  componentDidMount() {
    this.timeout = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timeout);
  }
  render() {
    const { tasks, cancel } = this.props;
    const stations = tasks.reduce(
      (prev, next) => ({
        ...prev,
        [next.station]: prev[next.station]
          ? prev[next.station].concat(next)
          : [next]
      }),
      {}
    );
    const averages = Object.entries(stations).reduce(
      (prev, [station, tasks]) => ({
        ...prev,
        [station]:
          tasks.reduce(
            (tPrev, next) =>
              tPrev +
              ((next.endTime ? new Date(next.endTime) : new Date()) -
                new Date(next.startTime)),
            0
          ) / tasks.length
      }),
      {}
    );
    return (
      <div
        style={{
          height: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <strong>Average Station Task Duration</strong>
        <div style={{ flex: 1 }}>
          {Object.entries(averages).map(([station, average]) => (
            <p key={station}>
              <strong>{station}</strong>: {parseDuration(average)}
            </p>
          ))}
        </div>
        <Button size="sm" color="danger" onClick={cancel}>
          Go Back
        </Button>
      </div>
    );
  }
}
export default Statistics;
