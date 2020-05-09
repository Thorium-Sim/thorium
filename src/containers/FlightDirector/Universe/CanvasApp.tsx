import * as React from "react";
import {useThree} from "react-three-fiber";
import OrthoCamera from "./OrthoCamera";
import PerspectiveCamera from "./PerspectiveCamera";
import Grid from "./Grid";
import use3DMousePosition from "./use3DMousePosition";
import BackPlane from "./BackPlane";
import Entity from "./Entity";
import useEventListener from "./useEventListener";
// import DragSelect from "./DragSelect";
import {
  Entity as EntityInterface,
  useEntityCreateMutation,
  useEntityRemoveMutation,
  useEntitiesSetPositionMutation,
  Entity as EntityType,
} from "generated/graphql";
import Nebula from "./Nebula";
import {CanvasContext} from "./CanvasContext";
import Fuzz from "./fuzz";
import {StoreApi} from "zustand";
import {PatchData} from "helpers/hooks/usePatchedSubscriptions";

export type PositionTuple = [number, number, number];

const MeasureCircles: React.FC<{
  speed: number;
  time: number;
  position: [number, number, number];
}> = ({speed, time, position}) => {
  return (
    <mesh position={position}>
      <circleBufferGeometry args={[speed * time, 32]} attach="geometry" />
      <meshBasicMaterial
        color={0x0088ff}
        attach="material"
        transparent
        opacity={0.2}
      />
    </mesh>
  );
};
function setNumberBounds(num: number) {
  return Math.max(
    -Number.MAX_SAFE_INTEGER,
    Math.min(Number.MAX_SAFE_INTEGER, Math.round(num)),
  );
}
interface CanvasAppProps {
  stageId?: string;
  setDragging: React.Dispatch<React.SetStateAction<any>>;
  staticEntities: EntityType[];
  dragging: EntityType | undefined;
  entityCount: number;
  storeApi: StoreApi<PatchData<EntityInterface[]>>;
}
const CanvasApp: React.FC<CanvasAppProps> = ({
  stageId,
  setDragging,
  dragging,
  entityCount,
  staticEntities,
  storeApi,
}) => {
  const [
    {
      // dragging: dragSelecting,
      camera: perspectiveCamera,
      selected,
      recenter,
      measured,
      measuring,
      // selecting,
      speed,
      timeInSeconds,
      position,
      lighting,
    },
    dispatch,
  ] = React.useContext(CanvasContext);

  const [create] = useEntityCreateMutation();
  const [remove] = useEntityRemoveMutation();
  const [setPosition] = useEntitiesSetPositionMutation();
  const [positionOffset, setPositionOffset] = React.useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [selectionsDragged, setSelectionsDragged] = React.useState(false);
  const selectionsDraggedRef = React.useRef(false);

  React.useEffect(() => {
    selectionsDraggedRef.current = selectionsDragged;
  }, [selectionsDragged]);

  const mousePosition = use3DMousePosition();

  React.useEffect(() => {
    async function mouseUp() {
      setDragging(undefined);
      document.removeEventListener("mouseup", mouseUp);
      if (!dragging?.appearance?.meshType) return;
      const {data} = await create({
        variables: {
          flightId: "template",
          stageParentId: stageId || "",
          position: {
            x: Math.round(mousePosition.current[0]),
            y: Math.round(mousePosition.current[1]),
            z: Math.round(mousePosition.current[2]),
          },
          name: `New Entity ${entityCount + 1}`,
          meshType: dragging.appearance.meshType,
          color: dragging.appearance.color,
          emissiveColor: dragging.appearance.emissiveColor,
          emissiveIntensity: dragging.appearance.emissiveIntensity,
          modelAsset: dragging.appearance.modelAsset,
          materialMapAsset: dragging.appearance.materialMapAsset,
          ringMapAsset: dragging.appearance.ringMapAsset,
          cloudMapAsset: dragging.appearance.cloudMapAsset,
          glowColor: dragging.glow?.color,
          glowMode: dragging.glow?.glowMode,
          lightColor: dragging.light?.color,
          lightDecay: dragging.light?.decay,
          lightIntensity: dragging.light?.intensity,
        },
      });
      if (data?.entityCreate.id) {
        dispatch({type: "selected", selected: [data.entityCreate.id]});
      }
    }
    if (dragging) {
      document.addEventListener("mouseup", mouseUp);
    }
    return () => document.removeEventListener("mouseup", mouseUp);
  }, [
    create,
    dragging,
    setDragging,
    mousePosition,
    dispatch,
    stageId,
    entityCount,
  ]);

  const elementList = ["input", "textarea"];
  useEventListener("keydown", (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (elementList.includes(target?.tagName.toLowerCase())) return;
    if (e.key === "Backspace" && selected) {
      remove({variables: {id: selected}});

      dispatch({type: "selected", selected: []});
    }
  });

  const {
    camera: {zoom},
  } = useThree();

  const onDrag = React.useCallback(
    (dx, dy) => {
      setPositionOffset(position => {
        const {x, y, z} = position;
        return {x: x + dx / zoom, y: y - dy / zoom, z};
      });
    },
    [zoom],
  );

  const onDragStop = React.useCallback(() => {
    const entities = storeApi.getState().data;
    const updateEntities = entities
      .filter(({id}) => selected.includes(id))
      .map(({id, location}) => {
        return {
          id,
          position: {
            x: setNumberBounds((location?.position.x || 0) + positionOffset.x),
            y: setNumberBounds((location?.position.y || 0) + positionOffset.y),
            z: setNumberBounds((location?.position.z || 0) + positionOffset.z),
          },
        };
      });

    // Reset the entity linear interpolation
    storeApi.setState(s => ({
      ...s,
      data: s.data.map(e => {
        const u = updateEntities.find(({id}) => id === e.id);
        if (u && e.location) {
          return {
            ...e,
            reset: true,
            location: {...e.location, position: u.position},
          };
        }
        return e;
      }),
    }));
    setPosition({variables: {entities: updateEntities}}).then(() => {
      setPositionOffset({x: 0, y: 0, z: 0});
      setSelectionsDragged(false);
    });
  }, [
    positionOffset.x,
    positionOffset.y,
    positionOffset.z,
    selected,
    setPosition,
    storeApi,
  ]);

  const onDragStart = React.useCallback(() => setSelectionsDragged(true), []);

  const skyboxKey = storeApi.getState().data.find(e => e.id === stageId)?.stage
    ?.skyboxKey;

  return (
    <>
      {perspectiveCamera ? (
        <>
          <React.Suspense fallback={null}>
            <Nebula skyboxKey={skyboxKey ?? "c"} />
            <Fuzz storeApi={storeApi} />
          </React.Suspense>
          <PerspectiveCamera />
        </>
      ) : (
        <>
          <Grid />
          <OrthoCamera
            recenter={recenter}
            storeApi={storeApi}
            stageId={stageId}
          />
          {dragging && (
            <Entity
              dragging
              entity={dragging}
              mousePosition={mousePosition}
              entityIndex={-1}
              storeApi={storeApi}
            />
          )}
          <BackPlane
            setSelected={() =>
              measuring && !measured
                ? dispatch({type: "position", position: mousePosition.current})
                : dispatch({type: "selected", selected: []})
            }
          />
          {/* <DragSelect selecting={selecting} entities={entities} /> */}
        </>
      )}
      {measured ? (
        <MeasureCircles
          speed={speed}
          time={timeInSeconds}
          position={position}
        />
      ) : null}
      <ambientLight intensity={lighting ? 0.1 : 1} />

      {Array.from({length: entityCount}).map((_, i) => {
        return (
          <React.Suspense key={`entity-${i}`} fallback={null}>
            <Entity
              entityIndex={i}
              stageId={stageId}
              selectedEntityIds={selected}
              mousePosition={mousePosition}
              isDraggingMe={selectionsDragged}
              onDragStart={onDragStart}
              onDrag={onDrag}
              onDragStop={onDragStop}
              storeApi={storeApi}
            />
          </React.Suspense>
        );
      })}
      {staticEntities.map(e => (
        <React.Suspense key={`entity-${e.id}`} fallback={null}>
          <Entity
            entityIndex={-1}
            entity={e}
            stageId={stageId}
            selectedEntityIds={selected}
            mousePosition={mousePosition}
            isDraggingMe={selectionsDragged}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragStop={onDragStop}
            storeApi={storeApi}
          />
        </React.Suspense>
      ))}
    </>
  );
};

export default CanvasApp;
