import React, { Component } from "react";
import "./style.scss";
import Explosion from "helpers/explosions";
import Interference from "../Sensors/GridDom/interference";

const speedLimit = 20;
const speedConstant1 = 2.5 / 100;
const speedConstant2 = 1.5 / 100;

class TargetingGridDom extends Component {
  constructor(props) {
    super(props);
    this.state = { targets: [], dimensions: {} };
    this.looping = true;
  }
  static getDerivedStateFromProps(props, state) {
    return TargetingGridDom.refreshTargets(props, state);
  }
  componentDidMount() {
    this.setState(TargetingGridDom.refreshTargets(this.props, this.state));
    this.looping = true;
    this.loop();
  }
  componentWillUnmount() {
    this.looping = false;
    cancelAnimationFrame(this.frame);
  }
  static refreshTargets(props, state) {
    const targets = [].concat(state.targets);
    const { width, height } = props.dimensions || {
      width: 400,
      height: 400
    };
    //const height = width * 3 / 4;
    props.targets.forEach(t => {
      const index = targets.findIndex(ta => ta.id === t.id);
      if (index > -1) {
        targets[index] = Object.assign(targets[index], {
          icon: t.icon,
          scale: t.size,
          targeted: t.targeted,
          destroyed: t.destroyed,
          moving: t.moving,
          name: t.name
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
          name: t.name,
          targeted: t.targeted,
          destroyed: t.destroyed,
          moving: t.moving
        });
      }
    });
    return {
      // Clear out targets that have been removed.
      targets: targets.filter(t => props.targets.find(ta => ta.id === t.id))
    };
  }
  loop() {
    if (!this.looping) return false;
    // Next frame
    this.frame = requestAnimationFrame(() => {
      this.loop();
    });
    const { width, height } = this.props.dimensions || {
      width: 400,
      height: 400
    };
    if (!width) return;
    //const height = width * 3 / 4;
    if (this.state.targets && this.state.targets.length > 0) {
      this.setState(({ targets }) => {
        const newTargets = targets.map(
          ({
            id,
            x,
            y,
            icon,
            name,
            speedX,
            speedY,
            scale,
            hover,
            targeted,
            destroyed,
            moving
          }) => {
            const limit = { x: width - 64, y: height - 64 };
            const speed = { x: speedX, y: speedY };
            const loc = { x, y };
            if (moving) {
              ["x", "y"].forEach(which => {
                if (speed[which] / speedLimit > 0.99) {
                  speed[which] = speedLimit - 1;
                }
                if (speed[which] / speedLimit < -0.99) {
                  speed[which] = (speedLimit - 1) * -1;
                }
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
                    ((speedLimit - Math.abs(speed[which])) / speedLimit) *
                    -1 *
                    Math.random() *
                    speedConstant1;
                  speed[which] +=
                    ((limit[which] - Math.abs(loc[which])) / limit[which]) *
                    -1 *
                    Math.random() *
                    speedConstant2;
                } else {
                  speed[which] +=
                    ((speedLimit - Math.abs(speed[which])) / speedLimit) *
                    Math.random() *
                    speedConstant1;
                  speed[which] +=
                    ((width - Math.abs(loc[which])) / limit[which]) *
                    Math.random() *
                    speedConstant2;
                }
                loc[which] = Math.min(
                  limit[which],
                  Math.max(0, loc[which] + speed[which])
                );
              });
            }

            return {
              id,
              x: loc.x,
              y: loc.y,
              speedX: speed.x,
              speedY: speed.y,
              icon,
              scale,
              hover,
              name,
              targeted,
              destroyed,
              moving
            };
          }
        );
        return { targets: newTargets };
      });
    }
  }
  _mouseMove = (id, inst) => {
    if (this.props.targets.find(t => t.targeted)) {
      return;
    }
    const { targets } = this.state;
    targets.forEach(t => {
      if (t.id === id) {
        if (t.moving) {
          t.hover += 1;
          if (t.hover >= 100) {
            this.props.targetContact(t.id);
            this.setState({
              targets: targets.map(ta => ({ ...ta, hover: 0 }))
            });
          }
        } else if (inst === true) {
          this.props.targetContact(t.id);
        }
      }
      return t;
    });
  };
  _touchMove = id => {
    // See if there is a target
    if (this.props.targets.find(t => t.targeted)) {
      return;
    }
    const { targets } = this.state;
    targets.forEach(t => {
      if (t.id === id) {
        t.hover += 1;
        if (t.hover >= 20) {
          this.props.targetContact(t.id);
          this.setState({
            targets: targets.map(ta => ({ ...ta, hover: 0 }))
          });
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
          {Array(Math.round((lines * 3) / 4))
            .fill(0)
            .map((y, i) => (
              <div key={`line-x-${i}`} className="line-x" />
            ))}
        </div>
        <div className="lines-y">
          {Array(lines)
            .fill(0)
            .map((y, i) => (
              <div key={`line-y-${i}`} className="line-y" />
            ))}
        </div>
        <div className="icons">
          {targets.map(t => (
            <Target
              key={t.id}
              mousemove={this._mouseMove}
              touchmove={this._touchMove}
              {...t}
            />
          ))}
        </div>
        {this.props.dimensions && (
          <Interference
            width={this.props.dimensions.width}
            interference={this.props.interference}
          />
        )}{" "}
      </div>
    );
  }
}

export default TargetingGridDom;

const Target = ({
  id,
  mousemove,
  touchmove,
  icon,
  name,
  x,
  y,
  scale,
  targeted,
  destroyed
}) => {
  if (destroyed) {
    return (
      <Explosion
        style={{
          position: "absolute",
          transform: `translate(${x - 10}px, ${y - 10}px) scale(${scale})`
        }}
      />
    );
  }
  return (
    <span>
      <img
        alt="target"
        role="presentation"
        draggable="false"
        className="target"
        src={`/assets${icon}`}
        onMouseMove={evt => mousemove(id, evt)}
        onTouchMove={evt => touchmove(id, evt)}
        onMouseUp={() => mousemove(id, true)}
        style={{
          transform: `translate(${x}px, ${y}px) scale(${scale})`
        }}
      />
      {targeted && (
        <img
          alt="crosshair"
          className="crosshair"
          style={{
            transform: `translate(${x}px, ${y}px) scale(${scale * 1.1})`
          }}
          draggable={false}
          src={require("./crosshair.svg")}
        />
      )}
      <div
        className="target-label"
        style={{
          transform: `translate(${x}px, ${y + (50 * scale) / 2}px)`
        }}
      >
        {name}
      </div>
    </span>
  );
};
