import React from "react";
import {Canvas} from "react-three-fiber";
import CanvasApp from "./CanvasApp";
import {ApolloProvider, useApolloClient} from "@apollo/client";
import {CanvasContext} from "./CanvasContext";
import {useParams} from "react-router";
import {UseStore, StoreApi} from "zustand";
import {PatchData} from "helpers/hooks/usePatchedSubscriptions";
import {Entity} from "generated/graphql";

interface CanvasWrapperProps {
  useEntityState: UseStore<PatchData<Entity[]>>;
  storeApi: StoreApi<PatchData<Entity[]>>;
  dragging?: Entity;
  setDragging: React.Dispatch<React.SetStateAction<Entity | undefined>>;
}
const CanvasWrapper: React.FC<CanvasWrapperProps> = ({
  useEntityState,
  storeApi,
  dragging,
  setDragging,
}) => {
  const client = useApolloClient();
  const value = React.useContext(CanvasContext);
  const entities = useEntityState(state => state.data) || [];

  const {stageId: currentStage = "root-stage"} = useParams();

  const stage = entities.find(e => e.id === currentStage);

  return (
    <Canvas
      id="level-editor"
      onContextMenu={e => {
        e.preventDefault();
      }}
      sRGB={true}
      gl={{antialias: true, logarithmicDepthBuffer: true}}
    >
      <CanvasContext.Provider value={value}>
        <ApolloProvider client={client}>
          <CanvasApp
            stage={stage}
            setDragging={setDragging}
            dragging={dragging}
            entities={entities}
            storeApi={storeApi}
          />
        </ApolloProvider>
      </CanvasContext.Provider>
    </Canvas>
  );
};

export default CanvasWrapper;
