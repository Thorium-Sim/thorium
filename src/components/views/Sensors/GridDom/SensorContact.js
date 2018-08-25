import React, { Component, Fragment } from "react";
import { Asset } from "../../../../helpers/assets";
import tinycolor from "tinycolor2";
import Explosion from "../../../../helpers/explosions";
export default class SensorContact extends Component {
  render() {
    const {
      id,
      location,
      destination = {},
      icon,
      width,
      size,
      core,
      opacity,
      type,
      color,
      destroyed,
      rotation = 0,
      targeted,
      selected,
      disabled,
      mouseover = () => {},
      mousedown = () => {},
      removeContact = () => {}
    } = this.props;
    if (!location) return null;
    const { x, y } = location;
    const { x: dx = 0, y: dy = 0 } = destination;
    if (type === "border") {
      return (
        <div className="sensors-border-holder">
          <div
            className="sensors-border"
            onMouseDown={mousedown}
            style={{
              opacity: core ? 0.5 : opacity * 0.7,
              width: core ? "100%" : "500%",
              borderColor: tinycolor(color)
                .darken(10)
                .toString(),
              backgroundColor: tinycolor(color).toString(),
              transform: `translate(${(width / 2) * x}px, ${(width / 2) *
                y}px) rotate(${rotation}deg)`
            }}
          />
          {core && (
            <div
              className="sensors-border"
              onMouseDown={mousedown}
              style={{
                width: core ? "100%" : "500%",
                borderColor: tinycolor(color)
                  .darken(10)
                  .toString(),

                backgroundColor: tinycolor(color).toString(),
                transform: `translate(${(width / 2) * dx}px, ${(width / 2) *
                  dy}px) rotate(${rotation}deg)`
              }}
            />
          )}
        </div>
      );
    }
    if (type === "planet") {
      return (
        <div className="sensors-planet-holder">
          <div
            className="sensors-planet"
            onMouseDown={mousedown}
            style={{
              opacity: core ? 0.5 : opacity * 0.7,
              borderColor: tinycolor(color)
                .darken(10)
                .toString(),
              backgroundColor: tinycolor(color).toString(),
              transform: `translate(${(width / 2) * x}px, ${(width / 2) *
                y}px) scale(${size})`
            }}
          />
          {core && (
            <div
              className="sensors-planet"
              onMouseDown={mousedown}
              style={{
                borderColor: tinycolor(color)
                  .darken(10)
                  .toString(),
                backgroundColor: tinycolor(color).toString(),
                transform: `translate(${(width / 2) * dx}px, ${(width / 2) *
                  dy}px) scale(${size})`
              }}
            />
          )}
        </div>
      );
    }
    if (destroyed) {
      return (
        <Explosion
          style={{
            width: "10%",
            height: "10%",
            transform: `translate(${(width / 2) * x + 5}px, ${(width / 2) * y +
              5}px) scale(${size})`
          }}
          onComplete={() => removeContact(id)}
        />
      );
    }
    return (
      <div>
        <Fragment>
          <Asset asset={icon}>
            {({ src }) => (
              <img
                alt="contact"
                draggable="false"
                onMouseOver={() => mouseover(this.props)}
                onMouseOut={selected ? null : () => mouseover({})}
                onMouseDown={e => mousedown(this.props, e)}
                src={src}
                className={disabled ? "contact-disabled" : ""}
                style={{
                  opacity: core ? 0.5 : opacity,
                  transform: `translate(${(width / 2) * x}px, ${(width / 2) *
                    y}px) scale(${size})`
                }}
              />
            )}
          </Asset>
          {!core &&
            selected && (
              <div
                className="contact-selection"
                style={{
                  transform: `translate(${(width / 2) * dx}px, ${(width / 2) *
                    dy}px) scale(${size})`
                }}
              >
                <div className="tl" />
                <div className="tr" />
                <div className="bl" />
                <div className="br" />
              </div>
            )}
        </Fragment>
        {core && (
          <Fragment>
            <Asset asset={icon}>
              {({ src }) => (
                <img
                  alt="icon"
                  draggable="false"
                  onMouseDown={mousedown}
                  src={src}
                  className={disabled ? "contact-disabled" : ""}
                  style={{
                    backgroundColor: selected ? "blue" : "",
                    transform: `translate(${(width / 2) * dx}px, ${(width / 2) *
                      dy}px) scale(${size})`
                  }}
                />
              )}
            </Asset>
            {targeted && (
              <div
                className="crosshairs"
                style={{
                  transform: `translate(${(width / 2) * dx}px, ${(width / 2) *
                    dy}px) scale(${size})`
                }}
              >
                <div className="tl" />
                <div className="tr" />
                <div className="bl" />
                <div className="br" />
              </div>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}
