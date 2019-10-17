import React from "react";
import useMeasure from "./useMeasure";
import parseLaser from "./parseLaser";
import Sprite, {getSprite} from "./Sprite";
import LaserSVG from "./LaserSVG";
import getSide from "./getSide";
import useDraggable from "./useDraggable";

function reducer(state, action) {
  if (action.type === "reset") {
    return action.value;
  }
  if (action.type === "add") {
    const height = state.length;
    if (action.movingObject.includes("Emitter")) {
      if (
        action.x > 0 &&
        action.x < height - 1 &&
        action.y > 0 &&
        action.y < height - 1
      ) {
        return state;
      }
    }
    return state.map((row, x) =>
      row.map((cell, y) =>
        x === action.x && y === action.y
          ? action.movingObject
          : action.movingObject.includes("Emitter") && cell.includes("Emitter")
          ? ""
          : cell,
      ),
    );
  }
  if (action.type === "update") {
    return state.map((row, x) =>
      row.map((cell, y) =>
        x === action.x && y === action.y ? action.new : cell,
      ),
    );
  }
  if (action.type === "remove") {
    return state.map((row, x) =>
      row.map((cell, y) => (x === action.x && y === action.y ? "" : cell)),
    );
  }
  return state;
}
function isHilite(positionCell, x, y, width, objects, movingObject) {
  return (
    positionCell &&
    (positionCell.x === x &&
      positionCell.y === y &&
      !objects[x][y].includes("-Locked") &&
      !objects[x][y].includes("CheckPoint") &&
      !objects[x][y].includes("Obstacle")) &&
    ((movingObject.includes("Emitter") &&
      (positionCell.x === 0 ||
        positionCell.x === width - 1 ||
        positionCell.y === 0 ||
        positionCell.y === width - 1)) ||
      movingObject.includes("Filter") ||
      movingObject.includes("Mirror"))
  );
}
const Cell = React.memo(
  ({
    addMirror,
    x,
    y,
    hilite,
    cellSize,
    objects,
    mouseDown,
    checkPoints,
    width,
  }) => {
    return (
      <div
        onClick={() => addMirror(x, y)}
        className={`game-cell ${hilite ? "hilite" : ""}`}
        style={{
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          transform: `translate(${x * cellSize}px,${y * cellSize}px)`,
        }}
      >
        <Sprite
          onMouseDown={e => mouseDown(e, objects[x][y], {x, y})}
          name={objects[x][y]}
          active={checkPoints[`${x},${y}`]}
          side={getSide(x, y, width)}
        />
      </div>
    );
  },
);

const LaserGame = ({height: width, objects: initObjects, onWin = () => {}}) => {
  const [measureRef, {width: boardWidth = 0}] = useMeasure();
  const [objects, dispatch] = React.useReducer(
    reducer,
    initObjects.map(row =>
      row.map(cell => (cell.includes("-Locked") ? cell : "")),
    ),
  );
  React.useEffect(() => {
    dispatch({
      type: "reset",
      value: initObjects.map(row =>
        row.map(cell =>
          cell.includes("-Locked") ||
          cell.includes("Obstacle") ||
          cell.includes("CheckPoint")
            ? cell
            : "",
        ),
      ),
    });
  }, [initObjects]);
  const cellSize = Math.floor(boardWidth / width);
  const {segments: laserSegments, checkPoints} = React.useMemo(
    () => parseLaser(objects, width),
    [objects, width],
  );
  const checkpointCount = React.useMemo(
    () => initObjects.flat().filter(o => o.includes("CheckPoint")).length,
    [initObjects],
  );
  const activatedCheckpointCount = Object.keys(checkPoints).length;
  React.useMemo(() => {
    if (checkpointCount === activatedCheckpointCount) {
      setTimeout(() => {
        onWin();
      }, 1000);
    }
  }, [checkpointCount, activatedCheckpointCount, onWin]);

  const addMirror = React.useCallback(
    (x, y) => {
      if (!laserSegments) return;
      const segment = laserSegments.find(l => l.end.x === x && l.end.y === y);
      if (!segment) return;
      const {direction} = segment;
      let mirrorName = "Mirror1";
      if (direction.y === 1) {
        mirrorName = "Mirror4";
      }
      if (direction.y === -1) {
        mirrorName = "Mirror2";
      }
      if (direction.x === 1) {
        mirrorName = "Mirror1";
      }
      if (direction.x === -1) {
        mirrorName = "Mirror3";
      }
      dispatch({type: "add", x, y, movingObject: mirrorName});
    },
    [laserSegments],
  );
  const {
    mouseDown,
    position,
    movingCell,
    positionCell,
    positionSide,
    positionSprite,
    movingObject,
    containerRef,
  } = useDraggable({dispatch, objects, cellSize, width});
  return (
    <div className="game-area" ref={containerRef}>
      {position && (
        <div
          className="dragger"
          style={{
            "--tx": `${position.x}px`,
            "--ty": `${position.y}px`,
          }}
        >
          {(() => {
            const {src} = getSprite(movingObject);
            return (
              <div
                className={`game-object ${
                  movingObject.includes("Emitter") ? positionSide.current : ""
                } ${movingObject} ${positionSprite.className}`}
                style={{
                  height: `${cellSize}px`,
                  width: `${cellSize}px`,
                  zIndex: 10,
                  cursor: "grabbing",
                  backgroundImage: `url('${src}')`,
                }}
              />
            );
          })()}
        </div>
      )}
      <div className="game-objects">
        {[
          "FilterRed",
          "FilterGreen",
          "FilterBlue",
          "EmitterRed",
          "EmitterGreen",
          "EmitterBlue",
          "Mirror1",
        ].map(obj => {
          const {src} = getSprite(obj);
          return (
            <div
              draggable={false}
              onMouseDown={e => mouseDown(e, obj, "top")}
              className="game-object"
              style={{
                height: `${cellSize}px`,

                transform: `scale(${
                  movingCell === "top" && obj === movingObject ? 0 : 1
                })`,
                backgroundImage: `url('${src}')`,
              }}
            />
          );
        })}
      </div>
      <div className="game-board" ref={measureRef} style={{height: boardWidth}}>
        <LaserSVG laserSegments={laserSegments} cellSize={cellSize} blurred />
        <LaserSVG laserSegments={laserSegments} cellSize={cellSize} />
        {Array.from({length: width}).map((_, y) =>
          Array.from({length: width}).map((_, x) => (
            <Cell
              key={`${x},${y}`}
              addMirror={addMirror}
              x={x}
              y={y}
              hilite={isHilite(
                positionCell,
                x,
                y,
                width,
                objects,
                movingObject,
              )}
              cellSize={cellSize}
              objects={objects}
              mouseDown={mouseDown}
              checkPoints={checkPoints}
              width={width}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default LaserGame;
