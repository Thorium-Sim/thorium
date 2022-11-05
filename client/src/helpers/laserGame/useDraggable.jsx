import React, {useMemo} from "react";
import {getSprite} from "./Sprite";
import getSide from "./getSide";
import distance from "./distance";

export default function useDraggable({dispatch, objects, cellSize, width}) {
  // Mouse Dragging
  const [offset, setOffset] = React.useState(null);
  const [position, setPosition] = React.useState(null);
  const [movingObject, setMovingObject] = React.useState(null);
  const [movingCell, setMovingCell] = React.useState(null);
  const positionSide = React.useRef();
  const originalPosition = React.useRef({x: 0, y: 0});
  const containerRef = React.useRef();

  const mouseDown = (e, movingObject, cell) => {
    const dimensions = containerRef.current.getBoundingClientRect();
    const targetDims = e.target.getBoundingClientRect();
    const offset = {
      x: e.clientX - targetDims.x + dimensions.left,
      y: e.clientY - targetDims.y + dimensions.top,
    };
    setMovingObject(movingObject);
    setPosition({x: e.pageX - offset.x, y: e.pageY - offset.y});
    setMovingCell(cell);
    setOffset(offset);
    originalPosition.current = {x: e.pageX - offset.x, y: e.pageY - offset.y};
    const timeout = setTimeout(() => {
      document.removeEventListener("mouseup", mouseUp);
      dispatch({type: "remove", ...cell});
    }, 300);
    const mouseUp = () => {
      document.removeEventListener("mouseup", mouseUp);
      clearTimeout(timeout);
    };

    document.addEventListener("mouseup", mouseUp);
  };
  const positionCell = useMemo(
    () =>
      position && {
        x: Math.floor((position.x - cellSize / 2) / cellSize - 1) + 2,
        y: Math.floor((position.y - cellSize / 2) / cellSize),
      },
    [position, cellSize],
  );
  const moved =
    distance(originalPosition.current, position || {x: 0, y: 0}) > 3;

  React.useEffect(() => {
    const click = ({x, y}) => {
      const cell = objects[x] && objects[x][y];

      if (!cell) return;
      if (cell.includes("Red")) doDispatch(cell.replace("Red", "Green"));
      if (cell.includes("Green")) doDispatch(cell.replace("Green", "Blue"));
      if (cell.includes("Blue")) doDispatch(cell.replace("Blue", "Red"));
      if (cell.includes("Mirror")) {
        const mirrorNum = (parseInt(cell.replace("Mirror", ""), 10) % 5) + 1;
        doDispatch(`Mirror${mirrorNum}`);
        if (mirrorNum === 5) {
          setTimeout(() => {
            doDispatch(`Mirror${1}`);
          }, 200);
        }
      }
      function doDispatch(newValue) {
        dispatch({
          type: "update",
          x,
          y,
          new: newValue,
        });
      }
    };
    function mouseMove(e) {
      setPosition({
        x: e.pageX - offset.x,
        y: e.pageY - offset.y,
      });
    }
    function mouseUp(e) {
      const cell =
        objects[positionCell.x] && objects[positionCell.x][positionCell.y];

      if (moved) {
        if (
          (cell || cell === "") &&
          !cell.includes("-Locked") &&
          !cell.includes("Obstacle") &&
          !cell.includes("CheckPoint")
        ) {
          dispatch({type: "add", ...positionCell, movingObject});
        }
      } else {
        click(positionCell);
      }
      setOffset(null);
      setPosition(null);
      setMovingObject(null);
      setMovingCell(false);
    }
    if (offset) {
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [offset, objects, moved, movingObject, positionCell, dispatch]);
  const positionSprite = movingObject && getSprite(movingObject);

  positionSide.current =
    position &&
    (getSide(positionCell.x, positionCell.y, width) || positionSide.current);
  return {
    mouseDown,
    position,
    movingCell,
    positionCell,
    positionSide,
    positionSprite,
    movingObject,
    containerRef,
  };
}
