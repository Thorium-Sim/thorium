import * as React from "react";
import uuid from "uuid";
import PanControls from "./PanControlsContainer";
import Camera from "./Camera";
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
} from "generated/graphql";
interface SceneControlProps {
  recenter: {};
}
const SceneControl: React.FC<SceneControlProps> = ({recenter}) => {
  return (
    <>
      <PanControls recenter={recenter} />
    </>
  );
};
export type PositionTuple = [number, number, number];
interface CanvasAppProps {
  recenter: {};
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setDragging: React.Dispatch<React.SetStateAction<any>>;
  dragging: any;
  selecting: boolean;
  entities: EntityInterface[];
}
const CanvasApp: React.FC<CanvasAppProps> = ({
  recenter,
  selected,
  setSelected,
  setDragging,
  dragging,
  selecting,
  entities,
}) => {
  const [create] = useEntityCreateMutation();
  const [remove] = useEntityRemoveMutation();
  const mousePosition = use3DMousePosition();
  React.useEffect(() => {
    async function mouseUp() {
      setDragging(false);
      document.removeEventListener("mouseup", mouseUp);
      const {data} = await create({
        variables: {
          flightId: "template",
          position: {
            x: mousePosition[0],
            y: mousePosition[1],
            z: mousePosition[2],
          },
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
  }, [create, dragging, setDragging, mousePosition, setSelected]);

  const elementList = ["input", "textarea"];
  useEventListener("keydown", (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (elementList.includes(target?.tagName)) return;
    if (e.key === "Backspace" && selected) {
      remove({variables: {id: selected}});

      setSelected([]);
    }
  });
  return (
    <>
      <Camera />
      <SceneControl recenter={recenter} />
      <ambientLight />
      <Grid />
      <pointLight position={[10, 10, -10]} />

      {dragging && (
        <Entity dragging entity={dragging} mousePosition={mousePosition} />
      )}
      {entities.map(e => (
        <Entity
          key={e.id}
          entity={e}
          selected={selected && selected.includes(e.id)}
          setSelected={setSelected}
        />
      ))}

      <BackPlane setSelected={setSelected} />
      <DragSelect
        selecting={selecting}
        setSelected={setSelected}
        entities={entities}
      />
    </>
  );
};

export default CanvasApp;
