import React from "react";
import calculatePosition from "./calculatePosition";

const Phasers = ({ phasers, center, zoomFactor = 10, track = true }) => {
  return phasers.map(
    ({ target: initTarget, destination: initDestination }, i) => {
      const target = calculatePosition({
        position: initTarget,
        center,
        zoomFactor,
        track
      });
      const destination = calculatePosition({
        position: initDestination,
        center,
        zoomFactor,
        track
      });

      const width = Math.abs(target.x - destination.x);
      const height = Math.abs(target.y - destination.y);
      const left = Math.min(target.x, destination.x);
      const top = Math.min(target.y, destination.y);
      let isRight = true;
      if (
        (target.x > destination.x && target.y < destination.y) ||
        (target.x < destination.x && target.y > destination.y)
      ) {
        isRight = false;
      }
      return (
        <div
          key={`phaser-${i}`}
          className="enemy-outer"
          style={{
            transform: `translate(${left}%, ${top}%)`
          }}
        >
          <div
            style={{
              width: `${width}%`,
              height: `${height}%`,
              background: `linear-gradient(to top ${isRight ? "right" : "left"},
              rgba(0,0,0,0) 0%,
              rgba(0,0,0,0) calc(50% - 2px),
              rgba(255,255,0,0.8) 50%,
              rgba(0,0,0,0) calc(50% + 2px),
              rgba(0,0,0,0) 100%)`
            }}
          />
        </div>
      );
    }
  );
};

export default Phasers;
