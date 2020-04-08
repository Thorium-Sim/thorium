import * as React from "react";
import {PointerEvent} from "react-three-fiber";
import {CanvasContext, ActionType} from "./CanvasContext";
import {useDrag} from "react-use-gesture";

export default function useEntityDrag(
  onDrag: (dx: number, dy: number) => void,
  onDragStart: () => void,
  onDragStop: () => void,
  isDraggingMe: boolean,
  id: string,
  library?: boolean,
  setSelected?: React.Dispatch<React.SetStateAction<string[]>>,
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
        setSelected?.(selected => {
          if (e.shiftKey) {
            if (selected.includes(id)) {
              return selected.filter(s => s !== id);
            }
            return [...selected, id];
          }
          if (!selected || !selected.includes(id)) {
            return [id];
          }
          return selected;
        });
        if (dragging) return;
        onDragStart();
        dispatch({type: ActionType.dragging});
        dragFunctions?.onPointerDown?.(
          (e as unknown) as React.PointerEvent<Element>,
        );
      },
      onPointerUp: (e: PointerEvent) => {
        dispatch({type: ActionType.dropped});
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
      setSelected,
    ],
  );
  return modifiedDragFunctions;
}
