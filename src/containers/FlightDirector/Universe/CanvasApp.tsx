import * as React from "react";
import {useThree} from "react-three-fiber";
import OrthoCamera from "./OrthoCamera";
import PerspectiveCamera from "./PerspectiveCamera";
import Grid from "./Grid";
import use3DMousePosition from "./use3DMousePosition";
import BackPlane from "./BackPlane";
import Entity from "./Entity";
import useEventListener from "./useEventListener";
import DragSelect from "./DragSelect";
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
import {MeasurementAction} from "./measurementReducer";

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
interface CanvasAppProps {
  stage?: EntityInterface;
  recenter: {};
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setDragging: React.Dispatch<React.SetStateAction<any>>;
  dragging: EntityType | undefined;
  selecting: boolean;
  entities: EntityInterface[];
  lighting: boolean;
  storeApi: StoreApi<{
    loading: boolean;
    data: EntityInterface[];
    tick: number;
  }>;
  setMeasurement: React.Dispatch<MeasurementAction>;
  measurement: {
    measuring: boolean;
    measured: boolean;
    speed: number;
    timeInSeconds: number;
    position: [number, number, number];
  } | null;
}
function setNumberBounds(num: number) {
  return Math.max(
    -Number.MAX_SAFE_INTEGER,
    Math.min(Number.MAX_SAFE_INTEGER, Math.round(num)),
  );
}
const CanvasApp: React.FC<CanvasAppProps> = ({
  stage,
  recenter,
  selected,
  setSelected,
  setDragging,
  dragging,
  selecting,
  entities,
  lighting,
  storeApi,
  setMeasurement,
  measurement,
}) => {
  const [create] = useEntityCreateMutation();
  const [remove] = useEntityRemoveMutation();
  const [setPosition] = useEntitiesSetPositionMutation();
  const [{camera: perspectiveCamera}] = React.useContext(CanvasContext);
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
          stageParentId: stage?.id || "",
          position: {
            x: Math.round(mousePosition[0]),
            y: Math.round(mousePosition[1]),
            z: Math.round(mousePosition[2]),
          },
          name: `New Entity ${entities.length + 1}`,
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
        setSelected([data.entityCreate.id]);
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
    setSelected,
    entities.length,
    stage,
  ]);

  const elementList = ["input", "textarea"];
  useEventListener("keydown", (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (elementList.includes(target?.tagName.toLowerCase())) return;
    if (e.key === "Backspace" && selected) {
      remove({variables: {id: selected}});

      setSelected([]);
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
      setSelectionsDragged(false);
    });
  }, [
    entities,
    positionOffset.x,
    positionOffset.y,
    positionOffset.z,
    selected,
    setPosition,
    storeApi,
  ]);

  React.useEffect(() => {
    const unSub = storeApi.subscribe(
      tick => {
        if (!selectionsDraggedRef.current) {
          setPositionOffset({x: 0, y: 0, z: 0});
        }
      },
      state => state.tick,
    );
    return () => unSub();
  }, [storeApi]);

  return (
    <>
      {perspectiveCamera ? (
        <>
          <React.Suspense fallback={null}>
            <Nebula skyboxKey={stage?.stage?.skyboxKey ?? "c"} />
            <Fuzz storeApi={storeApi} />
          </React.Suspense>
          <PerspectiveCamera recenter={recenter} />
        </>
      ) : (
        <>
          <Grid />
          <OrthoCamera recenter={recenter} />
          {dragging && (
            <Entity dragging entity={dragging} mousePosition={mousePosition} />
          )}
          <BackPlane
            setSelected={() =>
              measurement?.measuring && !measurement.measured
                ? setMeasurement({type: "position", position: mousePosition})
                : setSelected([])
            }
          />
          <DragSelect
            selecting={selecting}
            setSelected={setSelected}
            entities={entities}
          />
        </>
      )}
      {measurement?.measured ? (
        <MeasureCircles
          speed={measurement.speed}
          time={measurement.timeInSeconds}
          position={measurement.position}
        />
      ) : null}
      <ambientLight intensity={lighting ? 0.1 : 1} />

      {entities.map((e, i) => {
        const isSelected = selected && selected.includes(e.id);
        return (
          <React.Suspense key={e.id} fallback={null}>
            <Entity
              entity={e}
              selected={isSelected}
              setSelected={setSelected}
              isDraggingMe={isSelected && selectionsDragged}
              onDragStart={() => setSelectionsDragged(true)}
              onDrag={onDrag}
              onDragStop={onDragStop}
              positionOffset={
                selected.includes(e.id) ? positionOffset : undefined
              }
            />
          </React.Suspense>
        );
      })}
    </>
  );
};

export default CanvasApp;
