import React, { Component } from "react";
import "./style.scss";
import { Asset } from "../../../helpers/assets";

const speedLimit = 20;
const speedConstant1 = 2.5 / 200;
const speedConstant2 = 1.5 / 200;
const crosshairPath =
  "M0,77.03L15,77.03L15,52.03L52.5,15L77.5,15L77.5,0L57.5,0L50,10L10,50L0,57.03L0,77.03Z";

class TargetingGridDom extends Component {
  constructor(props) {
    super(props);
    this.state = { targets: [] };
    this.refreshTargets(props);
    this.looping = true;
  }
  componentWillReceiveProps(nextProps) {}
  componentDidMount() {}
  componentWillUnmount() {
    this.looping = false;
  }
  refreshTargets(nextProps) {}
  loop() {
    if (!this.looping) return false;
    const { width } = this.props.dimensions;
    const height = width * 3 / 4;
    const { targets } = this.state;
    const newTargets = targets.map(
      ({
        id,
        x,
        y,
        icon,
        speedX,
        speedY,
        scale,
        fill,
        data,
        hover,
        targeted
      }) => {
        const limit = { x: width - 32, y: height - 32 };
        const speed = { x: speedX, y: speedY };
        const loc = { x, y };
        ["x", "y"].forEach(which => {
          if (speed[which] / speedLimit > 0.99) speed[which] = speedLimit - 1;
          if (speed[which] / speedLimit < -0.99)
            speed[which] = (speedLimit - 1) * -1;
          if (loc[which] > limit[which]) {
            loc[which] = limit[which] - 1;
            if (speed[which] > 0) speed[which] = 0;
          }
          if (loc[which] < 0) {
            loc[which] = 1;
            if (speed[which] < 0) speed[which] = 0;
          }
          if (Math.random() * limit[which] < loc[which]) {
            speed[which] +=
              (speedLimit - Math.abs(speed[which])) /
              speedLimit *
              -1 *
              Math.random() *
              speedConstant1;
            speed[which] +=
              (limit[which] - Math.abs(loc[which])) /
              limit[which] *
              -1 *
              Math.random() *
              speedConstant2;
          } else {
            speed[which] +=
              (speedLimit - Math.abs(speed[which])) /
              speedLimit *
              Math.random() *
              speedConstant1;
            speed[which] +=
              (width - Math.abs(loc[which])) /
              limit[which] *
              Math.random() *
              speedConstant2;
          }
          loc[which] = Math.min(
            limit[which],
            Math.max(0, loc[which] + speed[which])
          );
        });

        return {
          id,
          x: loc.x,
          y: loc.y,
          fill,
          speedX: speed.x,
          speedY: speed.y,
          data,
          icon,
          scale,
          hover,
          targeted
        };
      }
    );
    this.setState({
      targets: newTargets
    });
    // Next frame
    requestAnimationFrame(() => {
      this.loop();
    });
  }
  _mouseMove = (id, e) => {
    const { targets } = this.state;
    if (this.props.targetedContact) {
      this.setState({
        targets: targets.map(t => {
          t.hover = 0;
          return t;
        })
      });
      return;
    }
    targets.forEach(t => {
      if (t.id === id) {
        t.hover += 1;
        if (t.hover >= 100) {
          this.props.targetContact(t.id);
        }
      }
      return t;
    });
  };
  render() {
    const lines = 15;
    const { targets, targetedContact } = this.props;
    let targeted;
    if (targetedContact) {
      targeted = this.state.targets.find(t => t.id === targetedContact.id);
    }
    console.log(this.props);
    // Manually get the height
    return (
      <div className="targetArea targetingGrid-dom">
        <div className="lines-x">
          {Array(lines * 2 / 3)
            .fill(0)
            .map((y, i) => <div key={`line-x-${i}`} className="line-x" />)}
        </div>
        <div className="lines-y">
          {Array(lines)
            .fill(0)
            .map((y, i) => <div key={`line-y-${i}`} className="line-y" />)}
        </div>
        <div className="icons">
          {targets.map(t => <Target {...t} />)}
        </div>
      </div>
    );
  }
}

export default TargetingGridDom;

const Target = ({ width, mousemove, icon, x, y, scale }) => {
  return (
    <Asset asset={icon}>
      {({ src }) =>
        <img
          role="presentation"
          draggable="false"
          className="target"
          src={src}
          style={{
            transform: `translate(${width / 2 * x}px, ${width /
              2 *
              y}px) scale(${scale})`
          }}
        />}
    </Asset>
  );
};
