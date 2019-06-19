import React from "react";
import useMeasure from "./useMeasure";

export default function useWindowMove() {
  const [measureRef, dimensions] = useMeasure();
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (dimensions.width) {
      setPosition({
        x: window.innerWidth / 2 - dimensions.width / Math.E,
        y: 50
      });
    }
  }, [dimensions.width]);

  const mouseDown = evt => {
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("touchmove", touchMove);
    document.addEventListener("touchend", mouseUp);

    document.addEventListener("mouseup", mouseUp);
  };
  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("touchmove", touchMove);
    document.removeEventListener("mouseup", mouseUp);
    document.removeEventListener("touchend", mouseUp);
  };
  const touchMove = evt => {
    const { clientX, clientY } = evt.touches[0];
    setPosition(position => ({
      x: clientX - dimensions.x - dimensions.width / 2,
      y: clientY - dimensions.y
    }));
  };
  const mouseMove = evt => {
    setPosition(position => ({
      x: Math.max(
        0,
        Math.min(
          window.innerWidth - dimensions.width,
          position.x + evt.movementX
        )
      ),
      y: Math.max(
        0,
        Math.min(
          window.innerHeight - dimensions.height,
          position.y + evt.movementY
        )
      )
    }));
  };

  return [position, measureRef, mouseDown];
}
