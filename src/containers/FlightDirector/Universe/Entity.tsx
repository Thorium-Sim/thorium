import * as React from "react";
import {useFrame} from "react-three-fiber";
import {CanvasContext} from "./CanvasContext";
import {SphereGeometry, BoxBufferGeometry, Mesh, Vector3} from "three";
import {PositionTuple} from "./CanvasApp";
import {Entity as EntityInterface} from "generated/graphql";
import SelectionOutline from "./SelectionOutline";
// import Glow from "./entityParts/glow";
import Light from "./entityParts/light";
import Rings from "./entityParts/rings";
import Clouds from "./entityParts/clouds";
import {MeshTypeEnum} from "generated/graphql";
import useEntityDrag from "./useEntityDrag";
import EntityMaterial from "./EntityMaterial";
import EntityModel from "./EntityModel";
import useClientSystems from "./useClientSystems";
import {StoreApi} from "zustand";
import {PatchData} from "helpers/hooks/usePatchedSubscriptions";
import EntitySprite from "./EntitySprite";

interface EntityProps {
  static?: boolean;
  dragging?: boolean;
  library?: boolean;
  entity?: EntityInterface;
  entityIndex: number;
  stageId?: string;
  selectedEntityIds?: string[];
  mousePosition: React.MutableRefObject<PositionTuple>;
  isDraggingMe?: boolean;
  positionOffset?: {x: number; y: number; z: number};
  onDragStart?: () => void;
  onDrag?: (dx: number, dy: number) => void;
  onDragStop?: () => void;
  storeApi: StoreApi<PatchData<EntityInterface[]>>;
}
const noop = () => {};

function useRerender() {
  const [, setState] = React.useState({});
  return React.useCallback(() => setState({}), []);
}
const Entity: React.FC<EntityProps> = ({
  dragging: isDragging,
  library,
  entity,
  entityIndex,
  stageId,
  selectedEntityIds = [],
  mousePosition,
  isDraggingMe = false,
  positionOffset = {x: 0, y: 0, z: 0},
  onDragStart = noop,
  onDrag = noop,
  onDragStop = noop,
  storeApi,
}) => {
  const rerender = useRerender();
  const {id, location, appearance, light} =
    entity || storeApi.getState().data[entityIndex];

  const stage = storeApi.getState().data.find(s => s.id === stageId);

  React.useEffect(() => {
    // Poor man's React.memo
    const unsub1 = storeApi.subscribe(
      () => rerender(),
      store => ({
        appearance: store.data[entityIndex]?.appearance,
        light: store.data[entityIndex]?.light,
      }),
      (oldObj, newObj) =>
        oldObj?.appearance?.meshType === newObj?.appearance?.meshType &&
        oldObj?.appearance?.cloudMapAsset ===
          newObj?.appearance?.cloudMapAsset &&
        oldObj?.appearance?.ringMapAsset === newObj?.appearance?.ringMapAsset &&
        oldObj?.appearance?.scale === newObj?.appearance?.scale &&
        oldObj.appearance?.materialMapAsset ===
          newObj?.appearance?.materialMapAsset &&
        oldObj.appearance?.emissiveColor ===
          newObj?.appearance?.emissiveColor &&
        oldObj.appearance?.emissiveIntensity ===
          newObj?.appearance?.emissiveIntensity &&
        oldObj.appearance?.color === newObj?.appearance?.color &&
        oldObj?.light?.intensity === newObj?.light?.intensity &&
        oldObj?.light?.decay === newObj?.light?.decay &&
        oldObj?.light?.color === newObj?.light?.color,
    );
    return () => unsub1();
  }, [entityIndex, rerender, storeApi]);

  const selected = selectedEntityIds.includes(id);
  const size = 1;
  const {meshType, cloudMapAsset, ringMapAsset} = appearance || {};
  const scale = library ? 1 : appearance?.scale || 1;
  const {position: positionCoords} = location || {position: null};
  const [{zoomScale}] = React.useContext(CanvasContext);
  const mesh = React.useRef<Mesh>(new Mesh());
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
      mesh.current?.scale.set(zoomedScale, zoomedScale, zoomedScale);
    } else {
      mesh.current?.scale.set(scale, scale, scale);
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
  );

  useClientSystems(
    storeApi,
    id,
    mesh,
    Boolean(isDragging),
    mousePosition,
    stageId,
  );

  if (!library && !isDragging && (!location || !position)) return null;
  const meshPosition:
    | Vector3
    | [number, number, number]
    | undefined = isDragging
    ? mousePosition?.current
    : ([
        (position?.x || 0) + positionOffset.x,
        (position?.y || 0) + positionOffset.y,
        (position?.z || 0) + positionOffset.z,
      ] as [number, number, number]);

  if (stage?.stage?.childrenAsSprites) {
    return (
      <group position={meshPosition} ref={mesh} {...dragFunctions}>
        <EntitySprite appearance={appearance || undefined} />
      </group>
    );
  }
  if (meshType === MeshTypeEnum.Model && appearance?.modelAsset) {
    return (
      <>
        <group ref={mesh} position={meshPosition} {...dragFunctions}>
          <EntityModel modelAsset={appearance.modelAsset} scale={scale} />
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
