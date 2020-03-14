import * as React from "react";
import {useFrame, useLoader, PointerEvent} from "react-three-fiber";
import {CanvasContext, ActionType} from "./CanvasContext";
import {useDrag} from "react-use-gesture";
import * as THREE from "three";
import {SphereGeometry, BoxBufferGeometry, Color} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {PositionTuple} from "./CanvasApp";
import {Entity as EntityInterface} from "generated/graphql";
import SelectionOutline from "./SelectionOutline";
import Glow from "./entityParts/glow";
import Light from "./entityParts/light";
import Rings from "./entityParts/rings";
import Clouds from "./entityParts/clouds";
import {MeshTypeEnum} from "generated/graphql";

function useEntityDrag(
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

interface EntityMaterialProps {
  materialMapAsset?: string;
  color?: string;
  emissiveColor?: string;
  emissiveIntensity?: number;
}

const whiteImage =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAP////////////////////////////////////////////////////////////////////////////////////8B///////////////////////////////////////////////////////////////////////////////////////AABEIAAEAAQMBIgACEQEDEQH/xABLAAEBAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AoAD/2Q==";
const EntityMaterial: React.FC<EntityMaterialProps> = ({
  materialMapAsset = whiteImage,
  color,
  emissiveColor,
  emissiveIntensity,
}) => {
  const mapTexture = useLoader(THREE.TextureLoader, materialMapAsset);

  return (
    <meshStandardMaterial
      attach="material"
      map={materialMapAsset ? mapTexture : undefined}
      color={color ? new Color(color) : undefined}
      emissive={emissiveColor ? new Color(emissiveColor) : undefined}
      emissiveIntensity={emissiveIntensity || 0}
      side={THREE.FrontSide}
    />
  );
};

interface ModelAssetProps {
  modelAsset: string;
  scale?: number;
}
const ModelAsset: React.FC<ModelAssetProps> = React.memo(
  ({scale, modelAsset}) => {
    const model: any = useLoader(GLTFLoader, modelAsset || whiteImage);
    const scene = React.useMemo(() => {
      const scene = model.scene.clone(true);
      if (scene.materials) {
        Object.values(scene.materials).forEach((v: any) => {
          v.emissiveMap = v.map;
          v.emissiveIntensity = 2;
          v.emissive = new THREE.Color(0xffffff);
          v.side = THREE.FrontSide;
        });
      }

      return scene;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelAsset]);

    scale = (scale || 1) * 2;
    return (
      <>
        <primitive scale={[scale, scale, scale]} object={scene} />
      </>
    );
  },
);
interface EntityProps {
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
  const {id, location, appearance, glow, light} = entity;
  const size = 1;
  const {meshType, cloudMapAsset, ringMapAsset} = appearance || {};
  const scale = appearance?.scale || 1;
  const {position: positionCoords} = location || {position: null};
  const [{zoomScale}] = React.useContext(CanvasContext);
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

  let geometry = React.useMemo(() => {
    switch (meshType) {
      case "sphere":
        return new SphereGeometry(size, 32, 32);
      case "cube":
        return new BoxBufferGeometry(size, size, size);
      default:
        break;
    }
  }, [meshType, size]);

  const dragFunctions = useEntityDrag(
    onDrag,
    onDragStart,
    onDragStop,
    isDraggingMe,
    id,
    library,
    setSelected,
  );

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

  if (meshType === MeshTypeEnum.Model && appearance?.modelAsset) {
    return (
      <>
        <group ref={mesh} position={meshPosition} {...dragFunctions}>
          <ModelAsset modelAsset={appearance.modelAsset} scale={scale} />
        </group>
        {selected && <SelectionOutline selected={mesh} />}
      </>
    );
  }
  if (!geometry) return null;

  return (
    <>
      <group ref={mesh} position={meshPosition}>
        <mesh uuid={id} geometry={geometry} {...dragFunctions}>
          <EntityMaterial
            materialMapAsset={appearance?.materialMapAsset ?? undefined}
            emissiveColor={appearance?.emissiveColor ?? undefined}
            emissiveIntensity={appearance?.emissiveIntensity ?? undefined}
            color={appearance?.color ?? undefined}
          />
        </mesh>
        {glow && (
          <Glow
            position={meshPosition}
            color={glow.color ?? undefined}
            glowMode={glow.glowMode ?? undefined}
          />
        )}
        {light && (
          <Light
            intensity={light.intensity ?? undefined}
            decay={light.decay ?? undefined}
            color={light.color ?? undefined}
          />
        )}
        {ringMapAsset && <Rings ringMapAsset={ringMapAsset} />}
        {cloudMapAsset && <Clouds cloudMapAsset={cloudMapAsset} />}
      </group>
      {selected && <SelectionOutline selected={mesh} />}
    </>
  );
};

export default Entity;
