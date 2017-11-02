import React from "react";
import col from "color";

export default ({ level = 1, color = "rainbow", reverse }) => {
  function calcColor(i) {
    let outputColor;
    if (color === "rainbow") {
      outputColor = col().hsl(reverse ? i * 5 : Math.abs(i * 5 - 90), 100, 50);
    } else {
      outputColor = col(color);
    }
    outputColor = level * 20 >= i ? outputColor : col("rgb(80,80,80)");
    return outputColor;
  }
  return (
    <div className="statusDots">
      {Array(20)
        .fill(0)
        .map((d, i) => {
          return (
            <div
              key={`dot-${i}`}
              className={`dot`}
              style={{
                background: `radial-gradient(ellipse at center, ${calcColor(
                  i
                ).toString()} 0%,${calcColor(i)
                  .alpha(0.25)
                  .rgbaString()} 90%)`,
                boxShadow: `0px 0px 5px ${calcColor(i)
                  .lighten(0.1)
                  .rgbaString()}`
              }}
            />
          );
        })}
    </div>
  );
};
