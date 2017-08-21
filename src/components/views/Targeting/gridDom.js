import React, { Component } from "react";
import "./style.scss";
import { Asset } from "../../../helpers/assets";

const speedLimit = 20;
const speedConstant1 = 2.5 / 200;
const speedConstant2 = 1.5 / 200;

class TargetingGridDom extends Component {
  constructor(props) {
    super(props);
    this.state = { targets: [] };
    this.looping = true;
  }
  componentWillReceiveProps(nextProps) {
    this.refreshTargets(nextProps);
  }
  componentDidMount() {
    this.refreshTargets(this.props);
    this.looping = true;
    this.loop();
  }
  componentWillUnmount() {
    this.looping = false;
  }
  refreshTargets(nextProps) {
    const targets = [].concat(this.state.targets);
    const { width } = this.props.dimensions;
    const height = width * 3 / 4;
    nextProps.targets.forEach(t => {
      const index = targets.findIndex(ta => ta.id === t.id);
      if (index > -1) {
        targets[index] = Object.assign(targets[index], {
          icon: t.icon,
          scale: t.size,
          targeted: t.targeted
        });
      } else {
        targets.push({
          id: t.id,
          x: Math.random() * width,
          y: Math.random() * height,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          icon: t.icon,
          scale: t.size,
          hover: 0,
          targeted: t.targeted
        });
      }
    });
    this.setState({
      // Clear out targets that have been removed.
      targets: targets.filter(t => nextProps.targets.find(ta => ta.id === t.id))
    });
  }
  loop() {
    if (!this.looping) return false;
    const { width } = this.props.dimensions;
    const height = width * 3 / 4;
    this.setState(({ targets }) => {
      const newTargets = targets.map(
        ({ id, x, y, icon, speedX, speedY, scale, hover, targeted }) => {
          const limit = { x: width - 32, y: height - 64 };
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
            speedX: speed.x,
            speedY: speed.y,
            icon,
            scale,
            hover,
            targeted
          };
        }
      );
      return { targets: newTargets };
    });
    // Next frame
    requestAnimationFrame(() => {
      this.loop();
    });
  }
  _mouseMove = (id, e) => {
    const { targets } = this.state;
    if (targets.find(t => t.targeted === true)) {
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
    const { targets } = this.state;
    return (
      <div className="targetArea targetingGrid-dom">
        <div className="lines-x">
          {Array(Math.round(lines * 3 / 4))
            .fill(0)
            .map((y, i) => <div key={`line-x-${i}`} className="line-x" />)}
        </div>
        <div className="lines-y">
          {Array(lines)
            .fill(0)
            .map((y, i) => <div key={`line-y-${i}`} className="line-y" />)}
        </div>
        <div className="icons">
          {targets.map(t =>
            <Target key={t.id} mousemove={this._mouseMove} {...t} />
          )}
        </div>
      </div>
    );
  }
}

export default TargetingGridDom;

const Target = ({ id, mousemove, icon, x, y, scale, targeted }) => {
  return (
    <Asset asset={icon}>
      {({ src }) =>
        <span>
          <img
            role="presentation"
            draggable="false"
            className="target"
            src={src}
            onMouseMove={evt => mousemove(id, evt)}
            style={{
              transform: `translate(${x}px, ${y}px) scale(${scale})`
            }}
          />
          {targeted &&
            <img
              className="crosshair"
              style={{
                transform: `translate(${x}px, ${y}px) scale(${scale * 1.1})`
              }}
              src={require("./crosshair.svg")}
            />}
        </span>}
    </Asset>
  );
};
