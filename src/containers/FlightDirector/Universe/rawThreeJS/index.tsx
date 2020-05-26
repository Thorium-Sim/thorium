import React from "react";
import {ApolloClient, useApolloClient} from "@apollo/client";
import {StoreApi} from "zustand";
import usePatchedSubscriptions, {
  PatchData,
} from "helpers/hooks/usePatchedSubscriptions";
import {
  Entity as EntityInterface,
  EntitiesDocument,
  EntitiesQuery,
  EntityDataFragmentDoc,
} from "generated/graphql";
import {
  Scene,
  MOUSE,
  OrthographicCamera,
  PerspectiveCamera,
  Raycaster,
  Object3D,
} from "three";
import renderer from "./renderer";
import getOrthoCamera from "./orthoCamera";
import getPerspectiveCamera from "./perspectiveCamera";
import globals from "./globals";
import Grid from "./grid";
import {css} from "@emotion/core";
import {useParams} from "react-router";
import gql from "graphql-tag.macro";
import {CanvasContext, CanvasContextOutput} from "../CanvasContext";
import {distance3d} from "components/views/Sensors/gridCore/constants";
import Entity from "./entity";
import GameObjectManager from "./gameObjectManager";
import getPanControls from "./panControls";
import {clearEvents, initEvents, mouse} from "./mouseEvents";
import {get3DMousePosition} from "../use3DMousePosition";
import Nebula from "./nebula";
import {LensFlare} from "./lensFlare";
import {getOrbitControls} from "./orbitControls";
import {Wormhole} from "./wormhole";
import {Hyperspace} from "./hyperspace";

type OutsideState = CanvasContextOutput;

async function renderRawThreeJS(
  ref: React.RefObject<HTMLDivElement>,
  client: ApolloClient<object>,
  storeApi: StoreApi<PatchData<EntityInterface[]>>,
) {
  let outsideState: OutsideState = [
    {
      dragging: false,
      camera: false,
      zoomScale: false,
      recenter: {},
      selected: [],
      selecting: false,
      lighting: true,
      measuring: false,
      measured: false,
      speed: 28,
      timeInSeconds: 60,
      position: [0, 0, 0],
      controllingEntityId: localStorage.getItem("sandbox-controlling-id") || "",
    },
    () => {},
  ];

  const raycaster = new Raycaster();

  const gameObjectManager = new GameObjectManager();
  const scene = new Scene();
  const dimensions = ref.current?.getBoundingClientRect();

  if (!dimensions) return {updateState, cleanUp};

  renderer.setSize(dimensions.width, dimensions.height);
  // document.body.appendChild( renderer.domElement );
  // use ref as a mount point of the Three.js scene instead of the document.body
  ref.current?.appendChild(renderer.domElement);

  const nebula = new Nebula("Pretty");
  scene.add(nebula);

  // const wormhole = new Wormhole();
  // wormhole.position.set(0, 0, 5);
  // scene.add(wormhole);
  // gameObjectManager.addGameObject(wormhole);

  const hyperspace = new Hyperspace();
  hyperspace.position.set(0, 0, 5);
  scene.add(hyperspace);
  gameObjectManager.addGameObject(hyperspace);
  const grid = new Grid(dimensions);
  gameObjectManager.addGameObject(grid);
  scene.add(grid);
  client
    .query({query: EntitiesDocument, variables: {flightId: "cool flight"}})
    .then(res => {
      const entities: EntitiesQuery = res.data;
      entities.entities.forEach(e => {
        if (!e) return;
        const entity = new Entity(e);
        gameObjectManager.addGameObject(entity);
        scene.add(entity);
      });
    });

  const orthoCamera = getOrthoCamera(dimensions);
  const perspectiveCamera = getPerspectiveCamera(dimensions);
  let activeCamera: PerspectiveCamera | OrthographicCamera = orthoCamera;

  const panControls = getPanControls(orthoCamera, ref.current);
  const orbitControls = getOrbitControls(perspectiveCamera, ref.current);
  orbitControls.enabled = false;
  initEvents(ref.current);

  let isMouseDown = false;
  document.addEventListener("mousedown", e => {
    if (e.target !== renderer.domElement) return;
    isMouseDown = true;
    if (activeCamera !== orthoCamera) return;
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, orthoCamera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects[0]?.object) {
      outsideState[1]({
        type: "selected",
        selected: e.shiftKey
          ? outsideState[0].selected.concat(intersects[0].object.uuid)
          : [intersects[0].object.uuid],
      });
      panControls.enabled = false;
    }
  });
  document.addEventListener("mousemove", e => {
    if (!isMouseDown || activeCamera !== orthoCamera) return;
    const position = get3DMousePosition(
      e.clientX - dimensions.left,
      e.clientY - dimensions.top,
      dimensions.width,
      dimensions.height,
      orthoCamera,
    );
    gameObjectManager.gameObjects.forEach(object => {
      if (outsideState[0].selected.includes(object.uuid)) {
        object.position.set(position.x, position.y, position.z);
      }
    });
  });
  document.addEventListener("mouseup", e => {
    isMouseDown = false;
    if (activeCamera !== orthoCamera) return;
    panControls.enabled = true;
  });

  let then = 0;
  let frame: number;
  const render = function (now: number) {
    globals.time = now;
    globals.delta = Math.min(globals.time - then, 1 / 20);
    then = globals.time;

    frame = requestAnimationFrame(render);

    try {
      // Update the orbit controls if necessary
      if (activeCamera === perspectiveCamera) {
        orbitControls.update();
      }
      gameObjectManager.update({camera: activeCamera, delta: globals.delta});
    } catch (err) {
      console.error("There has been an error", err);
      cancelAnimationFrame(frame);
      throw err;
    }
    renderer.render(scene, activeCamera);
  };
  frame = requestAnimationFrame(render);

  const maxSize = Math.max(
    renderer.domElement.width,
    renderer.domElement.height,
  );

  // Start with perspective
  activeCamera = perspectiveCamera;
  grid.visible = false;
  nebula.visible = true;
  panControls.enabled = false;
  orbitControls.enabled = true;

  // const light = new LensFlare(0xffffff, 1.5, 2000);
  // light.position.set(0, 0, -500);
  // scene.add(light);

  function updateState(state: CanvasContextOutput) {
    const contextState = state[0];
    // Imperative functions to make the THREEJS objects reflect the state
    if (contextState.selecting) {
      panControls.mouseButtons = {
        MIDDLE: MOUSE.DOLLY,
        LEFT: MOUSE.ROTATE,
        RIGHT: MOUSE.PAN,
      };
    } else {
      panControls.mouseButtons = {
        MIDDLE: MOUSE.DOLLY,
        LEFT: MOUSE.PAN,
        RIGHT: MOUSE.PAN,
      };
    }
    if (outsideState[0].recenter !== contextState.recenter) {
      if (activeCamera !== orthoCamera) return;
      activeCamera.position.set(0, 0, 1 / 0.0000000001);
      const radius = gameObjectManager.gameObjects.reduce((prev, next) => {
        if (!next.visible) return prev;
        const distance = distance3d({x: 0, y: 0, z: 0}, next.position);
        if (distance > prev) return distance;
        return prev;
      }, 0);
      if (radius !== 0) {
        panControls.reset();
        const newZoom = 1 / ((radius * 2) / maxSize) / 100;
        panControls.zoom0 = newZoom;
        activeCamera.position.set(0, 0, 1 / 0.0000000001);
        activeCamera.updateProjectionMatrix();
      }
    }
    if (outsideState[0].camera !== contextState.camera) {
      if (contextState.camera) {
        activeCamera = perspectiveCamera;
        grid.visible = false;
        nebula.visible = true;
        panControls.enabled = false;
        orbitControls.enabled = true;
      } else {
        activeCamera = orthoCamera;
        grid.visible = true;
        nebula.visible = false;
        panControls.enabled = true;
        orbitControls.enabled = false;
      }
    }
    gameObjectManager.gameObjects.forEach(obj => {
      if (contextState.selected.includes(obj.uuid)) {
        if (obj.selected === false) {
          obj.selected = true;
        }
      } else if (obj.selected === true) {
        obj.selected = false;
      }
    });
    outsideState = state;
  }
  function cleanUp() {
    cancelAnimationFrame(frame);
    doDispose(scene);
    panControls.dispose();
    clearEvents(ref.current);
  }
  return {updateState, cleanUp};
}

function doDispose(obj: any) {
  if (obj !== null) {
    for (var i = 0; i < obj.children.length; i++) {
      doDispose(obj.children[i]);
    }
    if (obj.geometry) {
      obj.geometry.dispose();
      obj.geometry = undefined;
    }
    if (obj.material) {
      if (obj.material.map) {
        obj.material.map.dispose();
        obj.material.map = undefined;
      }
      obj.material.dispose();
      obj.material = undefined;
    }
  }
  obj = undefined;
}

const sub = gql`
  subscription Entities($flightId: ID!, $stageId: ID!) {
    entities(flightId: $flightId, stageId: $stageId, template: false) {
      ...EntityData
    }
  }
  ${EntityDataFragmentDoc}
`;

const RawTHREEJS: React.FC = () => {
  const {stageId: currentStage = "root-stage"} = useParams();
  const flightId = "cool flight";

  const [, storeApi] = usePatchedSubscriptions<
    EntityInterface[],
    {flightId: string; stageId: string}
  >(sub, {flightId, stageId: currentStage});
  const client = useApolloClient();

  const threeRef = React.useRef<HTMLDivElement>(null);

  const updateStateCallback = React.useRef((state: CanvasContextOutput) => {});
  const outsideState = React.useContext(CanvasContext);
  React.useLayoutEffect(() => {
    let cleanup = () => {};
    renderRawThreeJS(threeRef, client, storeApi).then(
      ({updateState, cleanUp}) => {
        cleanup = cleanUp;
        updateStateCallback.current = updateState;
        updateState(outsideState);
      },
    );
    return () => {
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useLayoutEffect(() => {
    updateStateCallback.current(outsideState);
  });
  return (
    <div
      ref={threeRef}
      css={css`
        canvas {
          width: 100%;
          height: 100%;
        }
      `}
    />
  );
};

export default RawTHREEJS;
