import React, { Component, Fragment } from "react";
import { Row, Col, Button } from "reactstrap";

import BodySvg from "./BodySvg";

class Body extends Component {
  state = { position: 120 };
  componentDidMount() {
    this.loop();
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.timeout);
  }
  loop = () => {
    this.setState(({ position }) => {
      if (position < 120) return { position: position + 1 };
      if (this.props.scanning && position >= 120) return { position: -20 };
      return {};
    });
    this.timeout = requestAnimationFrame(this.loop);
  };
  render() {
    const { position } = this.state;
    const style = {
      WebkitMaskImage: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) ${position - 20}%,
      rgba(0, 0, 0, 0) ${position - 5}%,
      rgba(0, 0, 0, 0) ${position + 5}%,
      rgba(0, 0, 0, 1) ${position + 20}%
    )`
    };
    return <BodySvg style={style} onMouseUp={this.props.onClick} />;
  }
}

class BodyContainer extends Component {
  bodyContainer = React.createRef();
  clickMan = (update, painPoints) => {
    return e => {
      const { clientX, clientY } = e;
      const bounds = this.bodyContainer.current.getBoundingClientRect();
      const point = {
        x: (clientX - bounds.left) / bounds.width,
        y: (clientY - bounds.top) / bounds.height
      };
      update("painPoints", [
        ...painPoints.map(({ x, y }) => ({ x, y })),
        point
      ]);
    };
  };
  render() {
    const { update, painPoints, scanning } = this.props;
    return (
      <Fragment>
        <div className="body-container" ref={this.bodyContainer}>
          <img alt="body" src={require("./body.png")} draggable="false" />
          <Body
            scanning={scanning}
            onClick={this.clickMan(update, painPoints)}
          />
          {painPoints.map((p, i) => (
            <div
              key={`painPoint-${i}`}
              className="painPoint-container"
              style={{
                transform: `translate(${p.x * 100}%, ${p.y * 100}%)`
              }}
            >
              <div className="painPoint" />
            </div>
          ))}
        </div>
        <div className="text-center">
          Click at area of pain. Click multiple times for intense pain.
        </div>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Button
              color="warning"
              block
              onClick={() => update("painPoints", [])}
            >
              Clear Pain
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default BodyContainer;
