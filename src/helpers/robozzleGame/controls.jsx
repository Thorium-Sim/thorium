import React from "react";

import f1 from "./img/f1.svg?url"
import f2 from "./img/f2.svg?url"
import f3 from "./img/f3.svg?url"
import f4 from "./img/f4.svg?url"
import f5 from "./img/f5.svg?url"
import f6 from "./img/f6.svg?url"

const fimg = [f1,f2,f3,f4,f5,f6];
const functionClasses = (func, pos, functions) => {
  const funcObj = functions[func];
  if (!funcObj) return "";
  const obj = funcObj[pos];
  if (!obj) return "";
  const {command, color} = obj;
  const paint = command && command.indexOf("paint") > -1;
  return `command ${paint ? "paint" : ""} ${command} ${
    color ? `${color} color` : ""
  }`;
};
const Commands = ({SubLengths, dragging, functions, onMouseDown}) => {
  return (
    <div className={`game-controls ${dragging ? "dragging" : ""}`}>
      {SubLengths.map(
        (s, i) =>
          parseInt(s, 10) > 0 && (
            <div key={`f${i + 1}`} className="function-holder">
              <img
                draggable="false"
                src={fimg[i]}
                alt={`F${i + 1}`}
              />
              <div className="function-area">
                {Array(parseInt(s, 10))
                  .fill(0)
                  .map((f, fi) => (
                    <div
                      key={`f${i + 1}-${fi}`}
                      className={`function-block ${functionClasses(
                        `f${i + 1}`,
                        fi,
                        functions,
                      )}`}
                      data-funcnum={`f${i + 1}`}
                      data-position={fi}
                      onMouseDown={onMouseDown}
                    />
                  ))}
              </div>
            </div>
          ),
      )}
    </div>
  );
};

export default Commands;
