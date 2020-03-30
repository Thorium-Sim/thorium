import * as React from "react";
import {Canvas} from "react-three-fiber";
import Controls from "./Controls";
import CanvasApp from "./CanvasApp";
import Library from "./Library";
import "./styles.scss";
import CanvasContextProvider from "./CanvasContext";
import usePatchedSubscriptions from "../../../helpers/hooks/usePatchedSubscriptions";
import {
  Entity,
  useEntitySetRotationVelocityMagnitudeMutation,
  useEntitySetVelocityMagnitudeMutation,
} from "../../../generated/graphql";
import gql from "graphql-tag.macro";
import {useApolloClient, ApolloProvider} from "@apollo/client";
import PropertyPalette from "./PropertyPalette";
import {throttle} from "helpers/debounce";
import {useGamepadAxis} from "helpers/hooks/useGamepad";

const sub = gql`
  subscription Entities($flightId: ID!) {
    entities(flightId: $flightId) {
      id
      interval
      identity {
        name
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
    }
  }
`;

function useJoystick() {
  const entityId = "daa36db8-76e9-4645-b4b7-b9ee741552bb";
  const [setRotationVelocity] = useEntitySetRotationVelocityMagnitudeMutation();
  // const [setVelocity] = useEntitySetVelocityMagnitudeMutation();
  const throttleSetRotation = React.useCallback(
    throttle(setRotationVelocity, 100),
    [],
  );
  // const throttleSetVelocity = React.useCallback(throttle(setVelocity, 100), []);
  const axes = useGamepadAxis([0, 1, 5, 2]) as number[];
  const y = axes[0];
  const x = axes[1];
  const z = axes[2] * -1;
  // const forwardSpeed = (axes[3] + 1) / 2;
  React.useEffect(() => {
    throttleSetRotation({
      variables: {id: entityId, rotationVelocity: {x, y, z}},
    });
  }, [x, y, z, throttleSetRotation]);
  // React.useEffect(() => {
  //   throttleSetVelocity({
  //     variables: {id: entityId, velocity: {x: forwardSpeed, y: 0, z: 0}},
  //   });
  // }, [forwardSpeed, throttleSetVelocity]);
}
export default function UniversalSandboxEditor() {
  const [recenter, setRecenter] = React.useState<{}>({});
  const [zoomScale, setZoomScale] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [dragging, setDragging] = React.useState<Entity | undefined>();
  const [selecting, setSelecting] = React.useState<boolean>(false);
  const [lighting, setLighting] = React.useState<boolean>(false);
  const [camera, setCamera] = React.useState<boolean>(false);
  const [useEntityState] = usePatchedSubscriptions<
    Entity[],
    {flightId: string}
  >(sub, {flightId: "template"});
  const entities = useEntityState(state => state.data) || [];
  useJoystick();
  const client = useApolloClient();
  return (
    <div className="universal-sandbox-editor">
      <PropertyPalette
        selectedEntity={entities.find(e => selected && e.id === selected[0])}
      />
      <div className="level-editor-container">
        <Canvas
          id="level-editor"
          sRGB={true}
          gl={{antialias: true, logarithmicDepthBuffer: true}}
        >
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
                lighting={lighting}
                camera={camera}
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
        />
      </div>

      <Library setDragging={setDragging} dragging={Boolean(dragging)} />
    </div>
  );
}
