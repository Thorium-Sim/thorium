import * as React from "react";
import Controls from "./Controls";
import Library from "./Library";
import "./styles.scss";
import CanvasContextProvider from "./CanvasContext";
import usePatchedSubscriptions from "../../../helpers/hooks/usePatchedSubscriptions";
import {Entity} from "../../../generated/graphql";
import gql from "graphql-tag.macro";
import PropertyPalette from "./PropertyPalette";
import Joysticks from "./Joysticks";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "helpers/hooks/useLocalStorage";
import CanvasWrapper from "./CanvasWrapper";

const sub = gql`
  subscription Entities($flightId: ID!, $stageId: ID!) {
    entities(flightId: $flightId, stageId: $stageId, template: false) {
      id
      interval
      identity {
        name
      }
      stage {
        scaleLabel
        scaleLabelShort
        skyboxKey
      }
      stageChild {
        parentId
        parent {
          id
          identity {
            name
          }
        }
      }
      appearance {
        color
        meshType
        modelAsset
        materialMapAsset
        ringMapAsset
        cloudMapAsset
        emissiveColor
        emissiveIntensity
        scale
      }
      light {
        intensity
        decay
        color
      }
      glow {
        glowMode
        color
      }
      location {
        position {
          x
          y
          z
        }
        rotation {
          x
          y
          z
          w
        }
      }
      enginesWarp {
        maxSpeed
        currentSpeed
      }
      enginesImpulse {
        maxSpeed
        currentSpeed
      }
      thrusters {
        rotationSpeed
        movementSpeed
      }
    }
  }
`;

export default function UniversalSandboxEditor() {
  const [dragging, setDragging] = React.useState<Entity | undefined>();

  const {stageId: currentStage = "root-stage"} = useParams();
  const navigate = useNavigate();
  const setCurrentStage = React.useCallback(
    stageId => {
      navigate(`/config/sandbox/${stageId}`);
    },
    [navigate],
  );
  const [controllingEntityId, setControllingEntityId] = useLocalStorage(
    "sandbox-controlling-id",
    false,
  );
  const [useEntityState, storeApi] = usePatchedSubscriptions<
    Entity[],
    {flightId: string; stageId: string}
  >(sub, {flightId: "template", stageId: currentStage});

  return (
    <CanvasContextProvider>
      <div className="universal-sandbox-editor">
        {controllingEntityId && (
          <Joysticks controllingEntityId={controllingEntityId} />
        )}
        <PropertyPalette
          useEntityState={useEntityState}
          currentStage={currentStage}
          setCurrentStage={setCurrentStage}
          controllingEntityId={controllingEntityId}
          setControllingEntityId={setControllingEntityId}
        />
        <div className="level-editor-container">
          <CanvasWrapper
            useEntityState={useEntityState}
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
