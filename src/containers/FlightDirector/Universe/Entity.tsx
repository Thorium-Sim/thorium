import * as React from "react";
import {useFrame, useThree} from "react-three-fiber";
import {CanvasContext, ActionType} from "./CanvasContext";
import {useDrag} from "react-use-gesture";
import * as THREE from "three";
import {SphereGeometry, BoxBufferGeometry} from "three";
import SelectionOutline from "./SelectionOutline";
import {EntityInterface} from ".";
import {PositionTuple} from "./CanvasApp";

interface EntityProps {
  dragging?: boolean;
  library?: boolean;
  entity: EntityInterface;
  setSelected?: React.Dispatch<React.SetStateAction<string[]>>;
  selected?: boolean;
  mousePosition?: PositionTuple;
  setPosition?: (fn: (p: PositionTuple) => PositionTuple) => void;
}

const Entity: React.FC<EntityProps> = ({
  dragging: isDragging,
  library,
  entity,
  setSelected,
  selected,
  mousePosition,
  setPosition,
}) => {
  const {id, type, size, color, position = [0, 0, 0], scale = 1} = entity;
  const [{dragging, zoomScale}, dispatch] = React.useContext(CanvasContext);

  const mesh = React.useRef<THREE.Mesh>(new THREE.Mesh());
  const meshPosition = isDragging ? mousePosition : position;

  useFrame(({camera}) => {
    const {zoom} = camera;
    const zoomedScale = (1 / zoom) * 20 * scale;
    if (zoomScale) {
      mesh.current.scale.set(zoomedScale, zoomedScale, zoomedScale);
    } else {
      mesh.current.scale.set(scale, scale, scale);
    }
  });

  const {camera} = useThree();
  const {zoom} = camera;
  const bind = useDrag(
    ({delta: [dx, dy]}) => {
      setPosition?.(([x, y, z]) => [x + dx / zoom, y - dy / zoom, z]);
    },
    {eventOptions: {pointer: true, passive: false}},
  );
  const dragFunctions = bind();
  let geometry = React.useMemo(() => {
    switch (type) {
      case "sphere":
        return new SphereGeometry(size, 32, 32);
      case "cube":
        return new BoxBufferGeometry(2, 2, 2);
    }
  }, [type, size]);
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
          dispatch({type: ActionType.dragging});
          dragFunctions?.onPointerDown?.(e as React.PointerEvent<Element>);
        }}
        onPointerUp={e => {
          dispatch({type: ActionType.dropped});
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
