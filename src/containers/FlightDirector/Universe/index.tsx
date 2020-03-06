import * as React from "react";
import {Canvas} from "react-three-fiber";
import Controls from "./Controls";
import CanvasApp from "./CanvasApp";
import Library from "./Library";
import "./styles.scss";
import CanvasContextProvider from "./CanvasContext";
import usePatchedSubscriptions from "../../../helpers/hooks/usePatchedSubscriptions";
import {Entity} from "../../../generated/graphql";
import gql from "graphql-tag.macro";
import {useApolloClient, ApolloProvider} from "@apollo/client";

const sub = gql`
  subscription Entities($flightId: ID!) {
    entities(flightId: $flightId) {
      op
      path
      value
      values {
        id
        identity {
          name
        }
        appearance {
          color
          meshType
          materialMapAsset
          scale
        }
        location {
          position {
            x
            y
            z
          }
        }
      }
    }
  }
`;

export default function UniversalSandboxEditor() {
  const [recenter, setRecenter] = React.useState<{}>({});
  const [zoomScale, setZoomScale] = React.useState(true);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [dragging, setDragging] = React.useState<Entity | undefined>();
  const [selecting, setSelecting] = React.useState<boolean>(false);
  const [useEntityState] = usePatchedSubscriptions<
    Entity[],
    {flightId: string}
  >(sub, {flightId: "template"});
  const entities = useEntityState(state => state.data) || [];
  const client = useApolloClient();
  return (
    <div className="universal-sandbox-editor">
      <Canvas id="level-editor">
        <ApolloProvider client={client}>
          <CanvasContextProvider recenter={recenter} zoomScale={zoomScale}>
            <CanvasApp
              recenter={recenter}
              selected={selected}
              setSelected={setSelected}
              setDragging={setDragging}
              dragging={dragging}
              selecting={selecting}
              entities={entities}
            />
          </CanvasContextProvider>
        </ApolloProvider>
      </Canvas>
      <Controls
        recenter={() => setRecenter({})}
        zoomScale={zoomScale}
        setZoomScale={setZoomScale}
        selecting={selecting}
        hasSelected={selected && selected.length === 1}
        setSelecting={setSelecting}
        selectedEntity={entities.find(e => selected && e.id === selected[0])}
      />
      <Library setDragging={setDragging} dragging={Boolean(dragging)} />
    </div>
  );
}
