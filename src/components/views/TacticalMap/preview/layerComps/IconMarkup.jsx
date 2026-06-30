import React from "react";
import {clampItemPosition} from "./clampToBounds";

const IconMarkup = ({
  mouseDown,
  location,
  destination,
  movement = {x: 0, y: 0, z: 0},
  size,
  objectId,
  id,
  src,
  font,
  fontColor,
  fontSize,
  label,
  flash,
  flashing,
  rotation,
  opacity,
  core,
  isSelected,
  interval,
  keepOnScreen,
  iconWidth,
  iconHeight,
  onIconLoad,
}) => {
  if (core) {
    opacity = Math.max(0.5, opacity);
  }
  // Defensive render-time clamp: even if a stored position somehow drifted off
  // screen, a keepOnScreen icon is never displayed clipping past the edge.
  if (keepOnScreen) {
    const footprintItem = {size, iconWidth, iconHeight};
    if (location) {
      location = clampItemPosition(footprintItem, location);
    }
    if (destination) {
      destination = clampItemPosition(footprintItem, {
        x: destination.x + movement.x,
        y: destination.y + movement.y,
        z: destination.z,
      });
      movement = {x: 0, y: 0, z: 0};
    }
  }
  return [
    location ? (
      <div
        className={"tactical-icon"}
        key={`icon-location-${id}`}
        style={{
          transition: `transform ${interval}ms linear`,
          transform: `translate(${location.x * 100}%, ${location.y * 100}%)`,
          opacity: core ? 0.5 : opacity,
        }}
      >
        <div
          className="image-holder"
          onMouseDown={mouseDown}
          style={{
            transform: `scale(${size})`,
            opacity: flash && flashing ? 0 : opacity,
          }}
        >
          {src && (
            <img
              alt="icon"
              draggable={false}
              src={src}
              style={{transform: `rotate(${rotation}deg)`}}
              onLoad={onIconLoad ? evt => onIconLoad(evt.target) : undefined}
            />
          )}
          <pre
            className="icon-label"
            style={{fontFamily: font, color: fontColor, fontSize}}
          >
            {label}
          </pre>
        </div>
      </div>
    ) : null,
    core ? (
      <div
        className={"tactical-icon"}
        key={`icon-destination-${id}`}
        style={{
          transform: `translate(${(destination.x + movement.x) * 100}%, ${
            (destination.y + movement.y) * 100
          }%)`,
        }}
      >
        <div
          className="image-holder"
          id={`tactical-icon-${id}`}
          onMouseDown={mouseDown}
          style={{
            transform: `scale(${size})`,
            opacity: flash && flashing ? 0 : opacity,
          }}
        >
          {(objectId === id || isSelected) && (
            <div className="select-loc">
              <img
                alt="loc"
                draggable={false}
                src={require("./cornerLoc.svg")}
              />
              <img
                alt="loc"
                draggable={false}
                src={require("./cornerLoc.svg")}
              />
              <img
                alt="loc"
                draggable={false}
                src={require("./cornerLoc.svg")}
              />
              <img
                alt="loc"
                draggable={false}
                src={require("./cornerLoc.svg")}
              />
            </div>
          )}
          {src && (
            <img
              alt="icon"
              draggable={false}
              src={src}
              style={{transform: `rotate(${rotation}deg)`}}
            />
          )}
          <pre
            className="icon-label"
            style={{fontFamily: font, color: fontColor, fontSize}}
          >
            {label}
          </pre>
        </div>
      </div>
    ) : null,
  ];
};

export default IconMarkup;
