import React, { Component } from 'react';
import assetPath from '../../../../helpers/assets';

export default class SensorContact extends Component {
  render() {
    const {
      location,
      destination = {},
      icon,
      width,
      size,
      core,
      mouseover = () => {},
      mousedown
    } = this.props;
    if (!location) return null;
    const { x, y } = location;
    const { x: dx = 0, y: dy = 0 } = destination;
    return (
      <div>
        <img
          draggable="false"
          onMouseOver={() => mouseover(this.props)}
          onMouseOut={() => mouseover({})}
          src={assetPath(icon, 'default', 'svg', false)}
          style={{
            opacity: core ? 0.5 : 1,
            transform: `translate(${width / 2 * x}px, ${width /
              2 *
              y}px) scale(${size})`
          }}
        />
        {core &&
          <img
            draggable="false"
            onMouseDown={mousedown}
            src={assetPath(icon, 'default', 'svg', false)}
            style={{
              transform: `translate(${width / 2 * dx}px, ${width /
                2 *
                dy}px) scale(${size})`
            }}
          />}
      </div>
    );
  }
}
