import * as React from "react";
import Controls from "./Controls";
import Library from "./Library";
import "./styles.scss";
import CanvasContextProvider from "./CanvasContext";
import usePatchedSubscriptions from "../../../helpers/hooks/usePatchedSubscriptions";
import {
  Entity,
  EntityDataFragmentDoc,
  useEntitiesQuery,
} from "../../../generated/graphql";
import gql from "graphql-tag.macro";
import PropertyPalette from "./PropertyPalette";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import CanvasWrapper from "./CanvasWrapper";

const sub = gql`
  subscription Entities($flightId: ID!, $stageId: ID!) {
    entities(flightId: $flightId, stageId: $stageId, template: false) {
      ...EntityData
    }
  }
  ${EntityDataFragmentDoc}
`;

function isEntity(e: any): e is Entity {
  return e && e.id && e?.location?.inert;
}

export default function UniversalSandboxEditor() {
  const [dragging, setDragging] = React.useState<Entity | undefined>();
  const {stageId: currentStage = "root-stage"} = useParams();
  const navigate = useNavigate();
  const flightId = "cool flight";
  const setCurrentStage = React.useCallback(
    stageId => {
      navigate(`/config/sandbox/${stageId}`);
    },
    [navigate],
  );
  const [useEntityState, storeApi] = usePatchedSubscriptions<
    Entity[],
    {flightId: string; stageId: string}
  >(sub, {flightId, stageId: currentStage});
  const {data} = useEntitiesQuery({variables: {flightId}});

  const staticEntities = data?.entities.filter(isEntity) || [];
  return (
    <CanvasContextProvider>
      <div className="universal-sandbox-editor">
        <PropertyPalette
          useEntityState={useEntityState}
          currentStage={currentStage}
          setCurrentStage={setCurrentStage}
        />
        <div className="level-editor-container">
          <CanvasWrapper
            useEntityState={useEntityState}
            staticEntities={staticEntities}
            storeApi={storeApi}
            dragging={dragging}
            setDragging={setDragging}
          />
          <Controls />
        </div>

        <Library setDragging={setDragging} dragging={Boolean(dragging)} />
      </div>
    </CanvasContextProvider>
  );
}
