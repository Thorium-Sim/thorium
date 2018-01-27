import React, { Component } from "react";
import { Asset } from "../../../../helpers/assets";

export default class SensorContact extends Component {
  render() {
    const {
      location,
      destination = {},
      icon,
      width,
      size,
      core,
      opacity,
      mouseover = () => {},
      mousedown = () => {}
    } = this.props;
    if (!location) return null;
    const { x, y } = location;
    const { x: dx = 0, y: dy = 0 } = destination;
    return (
      <div>
        <Asset asset={icon}>
          {({ src }) => (
            <img
              alt="contact"
              draggable="false"
              onMouseOver={() => mouseover(this.props)}
              onMouseOut={() => mouseover({})}
              onMouseDown={() => mousedown(this.props)}
              src={src}
              style={{
                opacity: core ? 0.5 : opacity,
                transform: `translate(${width / 2 * x}px, ${width /
                  2 *
                  y}px) scale(${size})`
              }}
            />
          )}
        </Asset>
        {core && (
          <Asset asset={icon}>
            {({ src }) => (
              <img
                alt="icon"
                draggable="false"
                onMouseDown={mousedown}
                src={src}
                style={{
                  transform: `translate(${width / 2 * dx}px, ${width /
                    2 *
                    dy}px) scale(${size})`
                }}
              />
            )}
          </Asset>
        )}
      </div>
    );
  }
}
