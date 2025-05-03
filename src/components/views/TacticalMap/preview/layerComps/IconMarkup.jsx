import React from "react";

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
}) => {
  if (core) {
    opacity = Math.max(0.5, opacity);
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
