import * as React from "react";
import {useFrame, useThree} from "react-three-fiber";
import {CanvasContext, ActionType} from "./CanvasContext";
import {useDrag} from "react-use-gesture";
import * as THREE from "three";
import {SphereGeometry, BoxBufferGeometry} from "three";
import SelectionOutline from "./SelectionOutline";
import {PositionTuple} from "./CanvasApp";
import {Entity as EntityInterface} from "generated/graphql";

interface EntityProps {
  dragging?: boolean;
  library?: boolean;
  entity: EntityInterface;
  setSelected?: React.Dispatch<React.SetStateAction<string[]>>;
  selected?: boolean;
  mousePosition?: PositionTuple;
}

const Entity: React.FC<EntityProps> = ({
  dragging: isDragging,
  library,
  entity,
  setSelected,
  selected,
  mousePosition,
}) => {
  const {id, location} = entity;
  const type = "sphere";
  const size = 1;
  const color = 0x583798;
  const scale = 1;
  const {position: positionCoords} = location || {position: null};
  const [{dragging, zoomScale}, dispatch] = React.useContext(CanvasContext);
  const mesh = React.useRef<THREE.Mesh>(new THREE.Mesh());

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
      // TODO: Set it up so position is stored locally and
      // a mutation is triggered on mouseUp
      // setPosition?.(([x, y, z]) => [x + dx / zoom, y - dy / zoom, z]);
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
  if (!library && !isDragging && (!location || !positionCoords)) return null;
  const meshPosition = isDragging
    ? mousePosition
    : [positionCoords?.x || 0, positionCoords?.y || 0, positionCoords?.z || 0];

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
