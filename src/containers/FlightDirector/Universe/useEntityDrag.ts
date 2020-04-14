import * as React from "react";
import {PointerEvent} from "react-three-fiber";
import {CanvasContext} from "./CanvasContext";
import {useDrag} from "react-use-gesture";

export default function useEntityDrag(
  onDrag: (dx: number, dy: number) => void,
  onDragStart: () => void,
  onDragStop: () => void,
  isDraggingMe: boolean,
  id: string,
  library?: boolean,
) {
  const [{dragging}, dispatch] = React.useContext(CanvasContext);

  const bind = useDrag(
    ({delta: [dx, dy]}) => {
      onDrag(dx, dy);
    },
    {eventOptions: {pointer: true, passive: false}},
  );
  const dragFunctions = bind();
  const modifiedDragFunctions = React.useMemo(
    () => ({
      onPointerMove: (e: PointerEvent) =>
        dragFunctions.onPointerMove?.(
          (e as unknown) as React.PointerEvent<Element>,
        ),
      onPointerDown: (e: PointerEvent) => {
        if (library) return;
        e.stopPropagation();
        dispatch({type: "entityPointerDown", id, shiftKey: e.shiftKey});
        if (dragging) return;
        onDragStart();
        dispatch({type: "dragging"});
        dragFunctions?.onPointerDown?.(
          (e as unknown) as React.PointerEvent<Element>,
        );
      },
      onPointerUp: (e: PointerEvent) => {
        dispatch({type: "dropped"});
        if (isDraggingMe) {
          onDragStop();
        }
        dragFunctions?.onPointerUp?.(
          (e as unknown) as React.PointerEvent<Element>,
        );
      },
    }),
    [
      dispatch,
      dragFunctions,
      dragging,
      id,
      isDraggingMe,
      library,
      onDragStart,
      onDragStop,
    ],
  );
  return modifiedDragFunctions;
}
