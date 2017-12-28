import React, { Component } from "react";
import moment from "moment";
import { Button } from "reactstrap";
import { publish } from "../helpers/pubsub";

class Timer extends Component {
  state = { timer: "00:00:00" };
  updateTimer = () => {
    if (
      this.state.stopped ||
      this.state.timer === "00:00:00" ||
      this.state.timer === "0:0:0"
    )
      return;
    const dur = moment.duration(this.state.timer);
    dur.subtract(1, "second");
    this.setState({
      timer: moment.utc(dur.as("milliseconds")).format("HH:mm:ss")
    });
    this.timer = setTimeout(this.updateTimer, 1000);
  };
  setTimer = () => {
    const seconds = prompt("Enter the number of seconds:", 0);
    const minutes = prompt("Enter the number of minutes:", 0);
    const hours = prompt("Enter the number of hours:", 0);

    clearTimeout(this.timer);
    this.timer = null;
    this.setState(
      { timer: `${hours}:${minutes}:${seconds}`, stopped: false },
      () => {
        this.updateTimer();
      }
    );
  };
  toggleTimer = () => {
    const { stopped } = this.state;
    if (stopped) {
      this.setState(
        {
          stopped: false
        },
        () => {
          this.updateTimer();
        }
      );
    } else {
      clearTimeout(this.timer);
      this.timer = null;
      this.setState({
        stopped: true
      });
    }
  };
  sendToSensors = () => {
    const dur = moment.duration(this.state.timer);
    const data = `Estimated time to arrival calculated: Approximately ${
      dur.hours() > 0 ? `${dur.hours()} hours, ` : ""
    }${
      dur.minutes() > 0 ? `${dur.minutes()} minutes, ` : ""
    }${dur.seconds()} seconds at current speed.`;
    publish("sensorData", data);
  };
  render() {
    const { timer, stopped } = this.state;
    return (
      <div>
        <div
          style={{
            color: "black",
            float: "left",
            width: "50%",
            backgroundColor: "rgb(251, 254, 61)",
            border: "1px solid rgb(210, 203, 67)",
            height: "16px",
            whiteSpace: "pre",
            textAlign: "center"
          }}
          onClick={this.setTimer}
        >
          {timer}
        </div>
        <Button
          color={stopped ? "primary" : "danger"}
          size="sm"
          style={{ height: "16px", float: "left" }}
          onClick={this.toggleTimer}
        >
          {stopped ? "Start" : "Stop"}
        </Button>
        <Button
          color={"success"}
          size="sm"
          style={{ height: "16px" }}
          onClick={this.sendToSensors}
        >
          Send to Sensors
        </Button>
      </div>
    );
  }
}

export default Timer;
