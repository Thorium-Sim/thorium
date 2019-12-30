import React from "react";
import Arrow from "./arrow";
import useMeasure from "helpers/hooks/useMeasure";
import "./style.scss";
const noOp = () => {};
const Bars = ({
  color,
  simulator,
  arrow,
  flop,
  className,
  label,
  active = true,
  noLevel,
  level: propsLevel,
  max = 0,
  mouseMove: mouseMoveProp = noOp,
  mouseUp: mouseUpProp = noOp,
}) => {
  const [height, setHeight] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const [level, setLevel] = React.useState(propsLevel);
  const [dragging, setDragging] = React.useState(false);

  React.useEffect(() => {
    setLevel(propsLevel);
  }, [propsLevel]);

  const mouseDown = (dimensions, evt) => {
    setHeight(dimensions.height);
    setTop(dimensions.top);
    setDragging(true);
  };

  React.useEffect(() => {
    const mouseMove = e => {
      const pageY =
        e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY) || 0;
      setLevel(Math.max(Math.min((pageY - top) / height, 1), max));
      mouseMoveProp(Math.max(Math.min((pageY - top) / height, 1), max));
    };
    if (dragging) {
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("touchmove", mouseMove);
    } else {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("touchmove", mouseMove);
    }
    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("touchmove", mouseMove);
    };
  }, [dragging, height, max, mouseMoveProp, top]);

  React.useEffect(() => {
    const mouseUp = e => {
      setDragging(false);
      mouseUpProp(level);
    };
    if (dragging) {
      document.addEventListener("mouseup", mouseUp);
      document.addEventListener("touchend", mouseUp);
    } else {
      document.removeEventListener("mouseup", mouseUp);
      document.removeEventListener("touchend", mouseUp);
    }
    return () => {
      document.removeEventListener("mouseup", mouseUp);
      document.removeEventListener("touchend", mouseUp);
    };
  }, [dragging, level, mouseUpProp]);

  const [measureRef, dimensions] = useMeasure();
  return (
    <div className={`bar-container ${className} ${active ? "shown" : ""}`}>
      {arrow && (
        <div
          ref={measureRef}
          className={`arrow-container ${flop ? "flop" : ""}`}
        >
          {dimensions && (
            <Arrow
              dimensions={dimensions}
              alertLevel={simulator.alertLevel}
              level={level}
              mouseDown={mouseDown}
              flop={flop}
            />
          )}
        </div>
      )}

      {!noLevel && (
        <p className="barLabel">
          {label && label + ": "}
          {Math.round(Math.abs(level - 1) * 100) + "%"}
        </p>
      )}

      <div className="bar-holder">
        {Array(40)
          .fill(0)
          .map((_, index, array) => {
            return (
              <div
                key={`tractor-bars-${index}`}
                className="bar"
                style={{
                  opacity: index / array.length >= level ? 1 : 0.3,
                  backgroundColor: color || null,
                  width:
                    (array.length / (index + 2)) * (100 / array.length) + "%",
                  marginLeft: flop
                    ? Math.abs(
                        (array.length / (index + 2)) * (100 / array.length) -
                          100,
                      ) + "%"
                    : 0,
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Bars;
