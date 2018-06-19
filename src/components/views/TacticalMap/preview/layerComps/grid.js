import React from "react";
const Grid = ({ gridCols, gridRows, color, labels }) => {
  return (
    <div className="tactical-grid">
      <div className="cols">
        {Array(gridCols)
          .fill(0)
          .map((_, i) => (
            <div key={`grid-col-${i}`} style={{ backgroundColor: color }} />
          ))}
      </div>
      <div className="rows">
        {Array(gridRows)
          .fill(0)
          .map((_, i) => (
            <div key={`grid-row-${i}`} style={{ backgroundColor: color }} />
          ))}
      </div>
      {labels && (
        <div className="labels">
          <div className="label-cols">
            {Array(gridCols - 1)
              .fill(0)
              .map((_, i) => <div key={`grid-label-col-${i}`}>{i + 1}</div>)}
          </div>
          <div className="label-rows">
            {Array(gridRows - 1)
              .fill(0)
              .map((_, i) => (
                <div key={`grid-label-row-${i}`}>
                  {String.fromCharCode(i + 65)}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;
