import React from "react";
import {Canvas} from "react-three-fiber";
import CanvasApp from "./CanvasApp";
import {ApolloProvider, useApolloClient} from "@apollo/client";
import {CanvasContext} from "./CanvasContext";
import {useParams} from "react-router";
import {UseStore, StoreApi} from "zustand";
import {PatchData} from "helpers/hooks/usePatchedSubscriptions";
import {Entity} from "generated/graphql";
import Joysticks from "./Joysticks";

interface CanvasWrapperProps {
  useEntityState: UseStore<PatchData<Entity[]>>;
  staticEntities: Entity[];
  storeApi: StoreApi<PatchData<Entity[]>>;
  dragging?: Entity;
  setDragging: React.Dispatch<React.SetStateAction<Entity | undefined>>;
}
const CanvasWrapper: React.FC<CanvasWrapperProps> = ({
  useEntityState,
  staticEntities,
  storeApi,
  dragging,
  setDragging,
}) => {
  const client = useApolloClient();
  const value = React.useContext(CanvasContext);
  const entityCount = useEntityState(state => state.data.length) || 0;

  const {stageId = "root-stage"} = useParams();
  return (
    <>
      {value[0].controllingEntityId && (
        <Joysticks controllingEntityId={value[0].controllingEntityId} />
      )}
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
              stageId={stageId}
              setDragging={setDragging}
              dragging={dragging}
              entityCount={entityCount}
              staticEntities={staticEntities}
              storeApi={storeApi}
            />
          </ApolloProvider>
        </CanvasContext.Provider>
      </Canvas>
    </>
  );
};

export default CanvasWrapper;
