import React, { Component } from 'react';
import assetPath from '../../../../helpers/assets';

export default class SensorContact extends Component {
  render() {
    const {
      location: { x, y },
      destination: { x: dx, y: dy },
      icon,
      width,
      size,
      core,
      mouseover = () => {},
      mousedown
    } = this.props;
    return (
      <div>
        <img
          draggable="false"
          onMouseOver={() => mouseover(this.props)}
          onMouseOut={() => mouseover({})}
          src={assetPath(icon, 'default', 'svg', false)}
          style={{
            opacity: core ? 0.5 : 1,
            transform: `scale(${size})translate(${width / 2 * x}px, ${width /
              2 *
              y}px)`
          }}
        />
        {core &&
          <img
            draggable="false"
            onMouseDown={mousedown}
            src={assetPath(icon, 'default', 'svg', false)}
            style={{
              transform: `scale(${size})translate(${width / 2 * dx}px, ${width /
                2 *
                dy}px)`
            }}
          />}
      </div>
    );
  }
}
