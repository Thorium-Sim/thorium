import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class CourseNumber extends Component {
  state = { calculatedCourse: { x: "", y: "", z: "" } };
  componentDidMount() {
    if (this.props.scanning) {
      this.randomCourse();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.scanning && prevProps.scanning !== this.props.scanning) {
      this.randomCourse();
    }
  }
  randomCourse = () => {
    this.setState({
      calculatedCourse: {
        x: this.courseCoordinate(),
        y: this.courseCoordinate(),
        z: this.courseCoordinate()
      }
    });
    if (this.props.scanning) {
      this.timeout = setTimeout(this.randomCourse, 60);
    }
  };
  courseCoordinate = () => {
    if (this.props.thrusters) return `${Math.round(Math.random() * 360)}˚`;
    return Math.round(Math.random() * 100000) / 100;
  };
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    let { thrusters, scanning, calculatedCourse } = this.props;
    if (scanning) {
      calculatedCourse = this.state.calculatedCourse;
    }
    return (
      <div className={`calculated card ${thrusters ? "thrusters" : ""}`}>
        <label>Calculated Course</label>
        <Row>
          <Col className="col-sm-4">{thrusters ? "Yaw" : "X"}:</Col>
          <Col className="col-sm-7 numBox">{calculatedCourse.x}</Col>
        </Row>
        <Row>
          <Col className="col-sm-4">{thrusters ? "Pitch" : "Y"}:</Col>
          <Col className="col-sm-7 numBox">{calculatedCourse.y}</Col>
        </Row>
        <Row>
          <Col className="col-sm-4">{thrusters ? "Roll" : "Z"}:</Col>
          <Col className="col-sm-7 numBox">{calculatedCourse.z}</Col>
        </Row>
      </div>
    );
  }
}
export default CourseNumber;
