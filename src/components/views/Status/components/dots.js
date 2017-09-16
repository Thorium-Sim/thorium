import React from "react";
import Color from "color";

export default ({ level = 1, color = "rainbow", reverse }) => {
  function calcColor(i) {
    let outputColor;
    if (color === "rainbow") {
      outputColor = Color.hsl(
        reverse ? i * 11 : Math.abs(i * 11 - 200),
        100,
        50
      );
    } else {
      outputColor = Color(color);
    }
    outputColor = level * 20 >= i ? outputColor : Color("rgb(80,80,80)");
    return outputColor.rgb();
  }
  return (
    <div className="statusDots">
      {Array(20).fill(0).map((d, i) => {
        return (
          <div
            key={`dot-${i}`}
            className={`dot`}
            style={{
              background: `radial-gradient(ellipse at center, ${calcColor(
                i
              ).toString()} 0%,${calcColor(i).alpha(0.25).toString()} 90%)`,
              boxShadow: `0px 0px 5px ${calcColor(i)
                .lighten(0.1)
                .rgb()
                .toString()}`
            }}
          />
        );
      })}
    </div>
  );
};
