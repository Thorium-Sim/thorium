import { Component } from "react";
import { Duration } from "luxon";
const parseTimePart = (time, part, singular, plural, end) =>
  time[part]
    ? `${time[part]} ${time[part] > 1 ? plural : singular}${end ? "" : ", "}`
    : "";

function parseTime(time) {
  let output = `${parseTimePart(time, "seconds", "Second", "Seconds", true)}`;
  output = `${parseTimePart(
    time,
    "minutes",
    "Minute",
    "Minutes",
    !output
  )}${output}`;
  output = `${parseTimePart(time, "hours", "Hour", "Hours", !output)}${output}`;
  output = `${parseTimePart(time, "days", "Day", "Days", !output)}${output}`;
  output = `${parseTimePart(time, "weeks", "Week", "Weeks", !output)}${output}`;
  output = `${parseTimePart(
    time,
    "months",
    "Month",
    "Months",
    !output
  )}${output}`;
  return output;
}

class TimeCared extends Component {
  state = {};
  componentDidMount() {
    this.loop();
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  loop = () => {
    this.setState({ update: Math.random() });
    this.timeout = setTimeout(this.loop, 1000);
  };
  render() {
    const { admitTime } = this.props;
    return parseTime(
      Duration.fromObject({
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: new Date() - new Date(admitTime)
      })
        .normalize()
        .toObject()
    );
  }
}

export default TimeCared;
