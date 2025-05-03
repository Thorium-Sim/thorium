import React from "react";

const cellColor = (row, col, Colors) => {
  const color = Colors[row][col];
  if (color === "R") return "red";
  if (color === "B") return "blue";
  if (color === "G") return "green";
};
const cellPiece = (row, col, Items) => {
  const piece = Items[row][col];
  if (piece === "#") return "transparent";
  if (piece === "*") return "star";
  if (piece === "%") return "star gone";
  if (piece === ".") return "";
};
const GameBoard = ({Colors, Items, RobotCol, RobotRow, RobotDir}) => (
  <div className="gameboard">
    <div className="spacer" />
    <div className="game-grid">
      {Array(12)
        .fill(0)
        .map((_, r) => (
          <div key={`row-${r}`} className="game-row">
            {Array(16)
              .fill(0)
              .map((__, c) => (
                <div
                  key={`cell-${r}-${c}`}
                  className={`game-cell ${cellColor(r, c, Colors)} ${cellPiece(
                    r,
                    c,
                    Items,
                  )}`}
                />
              ))}
          </div>
        ))}
    </div>
    <div
      className="game-ship-holder"
      style={{
        transform: `translate(${(100 / 16) * parseInt(RobotCol, 10)}%, ${
          (100 / 12) * parseInt(RobotRow, 10)
        }%)`,
      }}
    >
      <img
        className="game-ship"
        alt="ship"
        src={require("./img/ship.svg")}
        draggable="false"
        style={{
          transform: `rotate(${parseInt(RobotDir, 10) * 90 + 90}deg)`,
        }}
      />
    </div>
  </div>
);

export default GameBoard;
