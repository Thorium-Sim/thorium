import React from "react";
import Arrow from "./arrow";
import useMeasure from "helpers/hooks/useMeasure";
import "./style.scss";
import {Simulator} from "generated/graphql";
import {useGesture} from "react-use-gesture";

const noOp = () => {};

const Bars: React.FC<{
  simulator: Simulator;
  color?: string;
  arrow?: boolean;
  flop?: boolean;
  className: string;
  label: string;
  active?: boolean;
  noLevel?: boolean;
  level: number;
  max?: number;
  mouseMove?: (level: number) => void;
  mouseUp?: (level: number) => void;
}> = ({
  color,
  simulator,
  arrow,
  flop,
  className,
  label,
  active = true,
  noLevel,
  level: propsLevel,
  max = 1,
  mouseMove: mouseMoveProp = noOp,
  mouseUp: mouseUpProp = noOp,
}) => {
  const [level, setLevel] = React.useState(propsLevel);

  const bind = useGesture({
    onDrag: ({xy: [, y]}) => {
      const val = Math.abs(
        1 -
          Math.min(max, Math.max(0, (y - dimensions.top) / dimensions.height)),
      );

      setLevel(val);
      mouseMoveProp(val);
    },
    onDragEnd: () => {
      mouseUpProp(level);
    },
  });

  React.useEffect(() => {
    setLevel(propsLevel);
  }, [propsLevel]);

  const [measureRef, dimensions] = useMeasure<HTMLDivElement>();
  return (
    <div className={`bar-container ${className} ${active ? "shown" : ""}`}>
      {!noLevel && (
        <p className="barLabel">
          {label && label + ": "}
          {Math.round(level * 100) + "%"}
        </p>
      )}
      <div style={{position: "relative"}}>
        {arrow && (
          <div
            className={`arrow-container ${flop ? "flop" : ""}`}
            ref={measureRef}
          >
            {dimensions && (
              <Arrow
                alertLevel={simulator.alertlevel || "5"}
                level={Math.abs(1 - level)}
                {...bind()}
                flop={flop}
              />
            )}
          </div>
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
                    opacity:
                      index / array.length >= Math.abs(level - 1) ? 1 : 0.3,
                    backgroundColor: color || undefined,
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
    </div>
  );
};

export default Bars;
