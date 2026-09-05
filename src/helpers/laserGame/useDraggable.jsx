import React from "react";
import {getSprite} from "./Sprite";
import getSide from "./getSide";
import distance from "./distance";
import {beginPointerDrag, getEventCoords} from "../hooks/usePointerDrag";

/**
 * Drag/tap handling for the laser upgrade board.
 *
 * This used to attach its `mousemove`/`mouseup` listeners from a `useEffect`
 * gated on drag state. On a Windows touchscreen that is fatal: Chrome fires the
 * whole compat mouse sequence at the *end* of a tap, so `mouseup` arrives in the
 * same task as `mousedown` -- before React ever commits the effect. The release
 * was never observed, the piece stayed latched to the pointer forever, and
 * moving a physical mouse afterwards dragged it around the board.
 *
 * The listeners are now attached synchronously during `pointerdown`, and go
 * through pointer events so mouse and touch take exactly the same path. Because
 * they are attached before the next render, they must not close over
 * render-scoped values -- everything they need lives in `latest` below.
 */
export default function useDraggable({dispatch, objects, cellSize, width}) {
  const [position, setPosition] = React.useState(null);
  const [movingObject, setMovingObject] = React.useState(null);
  const [movingCell, setMovingCell] = React.useState(null);
  const positionSide = React.useRef();
  const containerRef = React.useRef();
  const cancelDrag = React.useRef(null);
  // When a pointer is captured, the browser retargets the follow-up `click` to
  // the element the drag *started* on. Without this the cell's own onClick
  // (which auto-places a mirror) would fire on the origin cell every time you
  // dragged a piece away from it.
  const lastDragEnd = React.useRef(0);

  const latest = React.useRef({dispatch, objects, cellSize, width});
  latest.current = {dispatch, objects, cellSize, width};

  const toCell = pos => ({
    x:
      Math.floor(
        (pos.x - latest.current.cellSize / 2) / latest.current.cellSize - 1,
      ) + 2,
    y: Math.floor(
      (pos.y - latest.current.cellSize / 2) / latest.current.cellSize,
    ),
  });

  // A tap (rather than a drag) cycles the cell's color or mirror angle.
  const clickCell = ({x, y}) => {
    const cell = latest.current.objects[x] && latest.current.objects[x][y];
    if (!cell) return;
    function doDispatch(newValue) {
      latest.current.dispatch({type: "update", x, y, new: newValue});
    }
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
  };

  const pointerDown = (e, obj, cell) => {
    const container = containerRef.current;
    if (!container) return;
    const coords = getEventCoords(e);
    if (!coords) return;

    const dimensions = container.getBoundingClientRect();
    const targetDims = e.target.getBoundingClientRect();
    const dragOffset = {
      x: coords.clientX - targetDims.x + dimensions.left,
      y: coords.clientY - targetDims.y + dimensions.top,
    };
    const start = {
      x: coords.pageX - dragOffset.x,
      y: coords.pageY - dragOffset.y,
    };
    // Tracked locally rather than read back from state, because the handlers
    // below are attached before the next render.
    let current = start;

    setMovingObject(obj);
    setMovingCell(cell);
    setPosition(start);

    // Holding for 300ms lifts the piece off the board. Releasing sooner is a
    // tap, which cycles the cell instead.
    const holdTimeout = setTimeout(() => {
      latest.current.dispatch({type: "remove", ...cell});
    }, 300);

    cancelDrag.current = beginPointerDrag(e, {
      onMove: state => {
        current = {
          x: state.pageX - dragOffset.x,
          y: state.pageY - dragOffset.y,
        };
        setPosition(current);
      },
      onEnd: () => {
        cancelDrag.current = null;
        clearTimeout(holdTimeout);
        const dropCell = toCell(current);
        const target =
          latest.current.objects[dropCell.x] &&
          latest.current.objects[dropCell.x][dropCell.y];
        const moved = distance(start, current) > 3;
        if (moved) lastDragEnd.current = Date.now();
        if (moved) {
          if (
            (target || target === "") &&
            !target.includes("-Locked") &&
            !target.includes("Obstacle") &&
            !target.includes("CheckPoint")
          ) {
            latest.current.dispatch({
              type: "add",
              ...dropCell,
              movingObject: obj,
            });
          }
        } else {
          clickCell(dropCell);
        }
        setPosition(null);
        setMovingObject(null);
        setMovingCell(false);
      },
    });
    // No usable pointer -- don't leave the board mid-pickup.
    if (!cancelDrag.current) {
      clearTimeout(holdTimeout);
      setPosition(null);
      setMovingObject(null);
      setMovingCell(false);
    }
  };

  React.useEffect(
    () => () => {
      if (cancelDrag.current) cancelDrag.current();
      cancelDrag.current = null;
    },
    [],
  );

  const positionCell = position && toCell(position);
  const positionSprite = movingObject && getSprite(movingObject);

  positionSide.current =
    position &&
    (getSide(positionCell.x, positionCell.y, width) || positionSide.current);

  // True just after a real drag, so click handlers can ignore the trailing
  // click the browser emits at the drag's origin.
  const didJustDrag = React.useCallback(
    () => Date.now() - lastDragEnd.current < 300,
    [],
  );

  return {
    pointerDown,
    didJustDrag,
    position,
    movingCell,
    positionCell,
    positionSide,
    positionSprite,
    movingObject,
    containerRef,
  };
}
