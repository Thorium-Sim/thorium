import * as React from "react";
import {Canvas} from "react-three-fiber";
import Controls from "./Controls";
import CanvasApp from "./CanvasApp";
import Library from "./Library";
import "./styles.scss";
import CanvasContextProvider from "./CanvasContext";

export interface EntityInterface {
  id: string;
  type: string;
  size: number;
  material: string;
  color: number;
  position?: [number, number, number];
  scale: number;
}

export default function UniversalSandboxEditor() {
  const [recenter, setRecenter] = React.useState<{}>({});
  const [zoomScale, setZoomScale] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [dragging, setDragging] = React.useState<any>(false);
  const [selecting, setSelecting] = React.useState<boolean>(false);
  const [entities, setEntities] = React.useState<EntityInterface[]>([]);

  return (
    <div className="universal-sandbox-editor">
      <Canvas id="level-editor">
        <CanvasContextProvider recenter={recenter} zoomScale={zoomScale}>
          <CanvasApp
            recenter={recenter}
            selected={selected}
            setSelected={setSelected}
            setDragging={setDragging}
            dragging={dragging}
            selecting={selecting}
            entities={entities}
            setEntities={setEntities}
          />
        </CanvasContextProvider>
      </Canvas>
      <Controls
        recenter={() => setRecenter({})}
        zoomScale={zoomScale}
        setZoomScale={setZoomScale}
        selecting={selecting}
        hasSelected={selected && selected.length === 1}
        setSelecting={setSelecting}
        selectedEntity={entities.find(e => selected && e.id === selected[0])}
        modifyEntity={e => {
          setEntities(entities =>
            entities.map(ee => {
              if (ee.id === e.id) {
                return e;
              }
              return ee;
            }),
          );
        }}
      />
      <Library setDragging={setDragging} dragging={dragging} />
    </div>
  );
}
