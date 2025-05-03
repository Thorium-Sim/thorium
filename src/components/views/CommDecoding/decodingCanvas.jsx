import React from "react";
import useMeasure from "helpers/hooks/useMeasure";
import useAnimationFrame from "helpers/hooks/useAnimationFrame";
const height = 250;
const sinPoints = ({a, f, p, animate, width}) => {
  let sinWidth = width * 2 * 2;
  if (animate) {
    sinWidth = (width / 4) * 2;
  }
  return Array(Math.round(sinWidth))
    .fill(0)
    .map((_, i) => {
      if (animate && i % 2 === 0) return i / 2 + p / 2;
      if (i % 2 === 0) return i / 2;
      let newI = i;
      if (animate) newI += p;
      return Math.sin(newI / 2 / f) * a + height / 2;
    });
};
const decodePoints = ({message, decodeProgress, ra, rf, width}) => {
  if (!message) return [];
  const newDecodeProgress = (width / message.length) * 2 * decodeProgress;
  let sinWidth = (width / 8) * 2;
  return Array(Math.round(sinWidth))
    .fill(0)
    .map((_, i) => {
      if (i % 2 === 0) return i / 2 + newDecodeProgress / 2;
      const newI = i + newDecodeProgress;
      return Math.sin(newI / 2 / rf) * ra + height / 2;
    });
};

export default function DecodingCanvas({
  ra,
  rf,
  f,
  a,
  message,
  decodeProgress,
}) {
  const [ref, dimensions] = useMeasure();
  const width = dimensions.width || 1;
  const [p, setP] = React.useState((width / 2) * -1);
  const loop = React.useCallback(
    function loop() {
      setP(p => {
        const newP = p + 20;
        if (newP < width * 2) {
          return newP;
        }
        return (width / 2) * -1;
      });
    },
    [width],
  );
  useAnimationFrame(loop);

  return (
    <div ref={ref}>
      <svg key={"decoding-line"} style={{height: height, width: "100%"}}>
        <path
          d={sinPoints({
            f,
            a,
            message,
            width,
          }).reduce(
            (prev, next, index) =>
              prev + `${index % 2 === 0 ? "L" : ""} ${next}`,
            `M 0 ${height / 2}`,
          )}
          fill="transparent"
          stroke="red"
          strokeWidth={2}
        />
        {rf && ra && (
          <path
            fill="transparent"
            stroke={decodeProgress ? "magenta" : "yellow"}
            strokeWidth={2}
            d={(decodeProgress
              ? decodePoints({
                  rf,
                  ra,
                  message,
                  decodeProgress,
                  width,
                })
              : sinPoints({
                  f: rf,
                  a: ra,
                  p: p,
                  animate: true,
                  width,
                })
            ).reduce(
              (prev, next, index) =>
                prev + `${index % 2 === 0 && index !== 0 ? "L" : ""} ${next} `,
              `M `,
            )}
          />
        )}
      </svg>
    </div>
  );
}
