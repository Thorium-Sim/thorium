import * as React from "react";
import {useFrame} from "react-three-fiber";
import {CanvasContext, ActionType} from "./CanvasContext";
import {useDrag} from "react-use-gesture";
import * as THREE from "three";
import {SphereGeometry} from "three";
import SelectionOutline from "./SelectionOutline";
import {PositionTuple} from "./CanvasApp";
import {Entity as EntityInterface} from "generated/graphql";

interface EntityProps {
  index: number;
  dragging?: boolean;
  library?: boolean;
  entity: EntityInterface;
  setSelected?: React.Dispatch<React.SetStateAction<string[]>>;
  selected?: boolean;
  mousePosition?: PositionTuple;
  isDraggingMe?: boolean;
  positionOffset?: {x: number; y: number; z: number};
  onDragStart?: () => void;
  onDrag?: (dx: number, dy: number) => void;
  onDragStop?: () => void;
}
const noop = () => {};

const Entity: React.FC<EntityProps> = ({
  index = 0,
  dragging: isDragging,
  library,
  entity,
  setSelected,
  selected,
  mousePosition,
  isDraggingMe = false,
  positionOffset = {x: 0, y: 0, z: 0},
  onDragStart = noop,
  onDrag = noop,
  onDragStop = noop,
}) => {
  const {id, location} = entity;
  const type = "sphere";
  const size = 1;
  const color = [0x583798, 0x981232, 0x083798, 0x98f232][index];
  const scale = 1;
  const {position: positionCoords} = location || {position: null};
  const [{dragging, zoomScale}, dispatch] = React.useContext(CanvasContext);
  const mesh = React.useRef<THREE.Mesh>(new THREE.Mesh());
  const [position, setPosition] = React.useState(positionCoords);

  React.useEffect(() => {
    if (!isDraggingMe) {
      setPosition(positionCoords);
    }
  }, [positionCoords, isDraggingMe]);

  useFrame(({camera}) => {
    const {zoom} = camera;
    const zoomedScale = (1 / zoom) * 20 * scale;
    if (zoomScale) {
      mesh.current.scale.set(zoomedScale, zoomedScale, zoomedScale);
    } else {
      mesh.current.scale.set(scale, scale, scale);
    }
  });

  const bind = useDrag(
    ({delta: [dx, dy]}) => {
      onDrag(dx, dy);
    },
    {eventOptions: {pointer: true, passive: false}},
  );
  const dragFunctions = bind();
  let geometry = React.useMemo(() => {
    switch (type) {
      case "sphere":
        return new SphereGeometry(size, 32, 32);
      // case "cube":
      // default:
      //   return new BoxBufferGeometry(2, 2, 2);
    }
  }, [type, size]);
  if (!library && !isDragging && (!location || !position)) return null;
  const meshPosition = isDragging
    ? mousePosition
    : [
        (position?.x || 0) + positionOffset.x,
        (position?.y || 0) + positionOffset.y,
        (position?.z || 0) + positionOffset.z,
      ];

  return (
    <>
      <mesh
        geometry={geometry}
        position={meshPosition}
        ref={mesh}
        onPointerMove={e =>
          dragFunctions.onPointerMove?.(e as React.PointerEvent<Element>)
        }
        onPointerDown={e => {
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
          dragFunctions?.onPointerDown?.(e as React.PointerEvent<Element>);
        }}
        onPointerUp={e => {
          dispatch({type: ActionType.dropped});
          if (isDraggingMe) {
            onDragStop();
          }
          dragFunctions?.onPointerUp?.(e as React.PointerEvent<Element>);
        }}
      >
        <meshStandardMaterial attach="material" color={color} />
      </mesh>
      {selected && <SelectionOutline selected={mesh} geometry={geometry} />}
    </>
  );
};

export default Entity;
