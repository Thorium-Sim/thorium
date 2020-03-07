import * as React from "react";
import {useFrame, useLoader, PointerEvent, Dom} from "react-three-fiber";
import {CanvasContext, ActionType} from "./CanvasContext";
import {useDrag} from "react-use-gesture";
import * as THREE from "three";
import {SphereGeometry, BoxBufferGeometry, Color} from "three";
import {PositionTuple} from "./CanvasApp";
import {Entity as EntityInterface} from "generated/graphql";
import SelectionOutline from "./SelectionOutline";

const starSprite = require("./star-sprite.svg") as string;
const circleSprite = require("./circle.svg") as string;

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
  const {id, location, appearance} = entity;
  const size = 1;
  const {meshType, color, modelAsset, materialMapAsset} = appearance || {};
  const scale = appearance?.scale || 1;
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
    let zoomedScale = (1 / zoom) * 20;
    if (zoomScale || (meshType === "sprite" && !library)) {
      zoomedScale *= 2;
      mesh.current.scale.set(zoomedScale, zoomedScale, zoomedScale);
    } else {
      mesh.current.scale.set(scale, scale, scale);
    }
  });

  const spriteTexture = useLoader(THREE.TextureLoader, starSprite);
  const circleTexture = useLoader(THREE.TextureLoader, circleSprite);

  const bind = useDrag(
    ({delta: [dx, dy]}) => {
      onDrag(dx, dy);
    },
    {eventOptions: {pointer: true, passive: false}},
  );
  const dragFunctions = bind();
  const modifiedDragFunctions = {
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
  };
  let geometry = React.useMemo(() => {
    switch (meshType) {
      case "sphere":
        return new SphereGeometry(size, 32, 32);
      case "cube":
        return new BoxBufferGeometry(size, size, size);
      default:
        break;
      // case "cube":
      // default:
    }
  }, [meshType, size]);
  if (!library && !isDragging && (!location || !position)) return null;
  const meshPosition:
    | THREE.Vector3
    | [number, number, number]
    | undefined = isDragging
    ? mousePosition
    : ([
        (position?.x || 0) + positionOffset.x,
        (position?.y || 0) + positionOffset.y,
        (position?.z || 0) + positionOffset.z,
      ] as [number, number, number]);

  if (meshType === "sprite") {
    return (
      <group ref={mesh} position={meshPosition}>
        <sprite {...modifiedDragFunctions}>
          <spriteMaterial
            color={new Color(color || "#fff")}
            map={spriteTexture}
            attach="material"
          />
        </sprite>
        {selected && (
          <sprite>
            <spriteMaterial
              color={0xff8800}
              map={circleTexture}
              attach="material"
            />
          </sprite>
        )}
        <Dom>
          <p className="object-label">{entity.identity?.name}</p>
        </Dom>
      </group>
    );
  }
  return (
    <>
      <mesh
        uuid={id}
        geometry={geometry}
        position={meshPosition}
        ref={mesh}
        {...modifiedDragFunctions}
      >
        <meshStandardMaterial
          attach="material"
          color={new Color(color || "#fff")}
          side={THREE.FrontSide}
        />
        <Dom>
          <p className="object-label">
            {entity.location?.position
              ? Object.values(entity.location?.position).join(", ")
              : ""}
          </p>
        </Dom>
      </mesh>
      {selected && <SelectionOutline selected={mesh} />}
    </>
  );
};

export default Entity;
