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
import PropertyPalette from "./PropertyPalette";
import reducer, {MeasurementReducerSignature} from "./measurementReducer";

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
  const [recenter, setRecenter] = React.useState<{}>({});
  const [zoomScale, setZoomScale] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [dragging, setDragging] = React.useState<Entity | undefined>();
  const [selecting, setSelecting] = React.useState<boolean>(false);
  const [lighting, setLighting] = React.useState<boolean>(false);
  const [camera, setCamera] = React.useState<boolean>(false);
  const [
    {measuring, measured, speed, timeInSeconds, position},
    dispatch,
  ] = React.useReducer<MeasurementReducerSignature>(reducer, {
    measuring: false,
    measured: false,
    speed: 28,
    position: [0, 0, 0],
    timeInSeconds: 60,
  });
  const [currentStage, setCurrentStage] = React.useState<string>("root-stage");

  const [useEntityState, storeApi] = usePatchedSubscriptions<
    Entity[],
    {flightId: string; stageId: string}
  >(sub, {flightId: "template", stageId: currentStage});
  const entities = useEntityState(state => state.data) || [];
  // useJoystick();
  const stage = entities.find(e => e.id === currentStage);
  const client = useApolloClient();
  return (
    <div className="universal-sandbox-editor">
      <PropertyPalette
        selectedEntity={
          entities.find(e => selected && e.id === selected[0]) ||
          entities.find(e => e.id === currentStage)
        }
        setCurrentStage={setCurrentStage}
        setSelected={setSelected}
      />
      <div className="level-editor-container">
        <Canvas
          id="level-editor"
          sRGB={true}
          gl={{antialias: true, logarithmicDepthBuffer: true}}
        >
          <ApolloProvider client={client}>
            <CanvasContextProvider
              camera={camera}
              recenter={recenter}
              zoomScale={zoomScale}
            >
              <CanvasApp
                stage={stage}
                recenter={recenter}
                selected={selected}
                setSelected={setSelected}
                setDragging={setDragging}
                dragging={dragging}
                selecting={selecting}
                entities={entities}
                lighting={lighting}
                storeApi={storeApi}
                setMeasurement={dispatch}
                measurement={
                  measuring
                    ? {measuring, measured, speed, position, timeInSeconds}
                    : null
                }
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
          lighting={lighting}
          setLighting={setLighting}
          camera={camera}
          setCamera={setCamera}
          measuring={measuring}
          measured={measured}
          speed={speed}
          timeInSeconds={timeInSeconds}
          setMeasuring={dispatch}
        />
      </div>

      <Library setDragging={setDragging} dragging={Boolean(dragging)} />
    </div>
  );
}
