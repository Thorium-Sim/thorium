import * as React from "react";
import * as THREE from "three";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ReactThreeFiber, extend, useFrame, useThree} from "react-three-fiber";
import PanControls from "./PanControls";
import {CanvasContext} from "./CanvasContext";
import {Camera, Renderer, MOUSE} from "three";
import {StoreApi} from "zustand";
import {PatchData} from "helpers/hooks/usePatchedSubscriptions";
import {Entity} from "generated/graphql";
import {distance3d} from "components/views/Sensors/gridCore/constants";
extend({PanControls});

interface PanControlsInterface {
  enabled: boolean;
  args: [Camera, Renderer];
  enableRotate: boolean;
  screenSpacePanning: boolean;
  maxZoom: number;
  minZoom: number;
  zoomSpeed: number;
  mouseButtons: {MIDDLE: MOUSE; LEFT: MOUSE; RIGHT: MOUSE};
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      panControls: ReactThreeFiber.Object3DNode<
        PanControlsInterface,
        typeof PanControls
      >;
    }
  }
}

export default function PanControlsContainer({
  recenter,
  storeApi,
  stageId,
}: {
  recenter: {};
  storeApi: StoreApi<PatchData<Entity[]>>;
  stageId?: string;
}) {
  const [context, dispatch] = React.useContext(CanvasContext);
  const {camera, gl, size} = useThree();
  const maxSize = Math.max(size.width, size.height);
  const controls = React.useRef({reset: () => {}, update: () => {}, zoom0: 0});
  React.useEffect(() => {
    camera.position.set(0, 0, 1 / 0.0000000001);
    const radius = storeApi.getState().data.reduce((prev, next) => {
      if (!next.location || next.id === stageId) return prev;
      const distance = distance3d({x: 0, y: 0, z: 0}, next.location.position);
      if (distance > prev) return distance;
      return prev;
    }, 0);
    if (radius === 0) return;
    controls.current.zoom0 = 1 / ((radius * 2) / maxSize);
    controls.current.reset();
  }, [recenter, camera, storeApi, maxSize, stageId]);

  React.useEffect(() => {
    // Small heuristic to determine if the store has changed
    const storeData = storeApi.getState().data;
    const storeKeys = [
      storeData.length,
      storeData[0]?.id,
      storeData[storeData.length - 1]?.id,
    ];
    const unSub = storeApi.subscribe((store: PatchData<Entity[]> | null) => {
      if (!store) return;
      if (
        storeKeys[0] !== store.data.length ||
        storeKeys[1] !== store.data[0]?.id ||
        storeKeys[2] !== store.data[store.data.length - 1]?.id
      ) {
        unSub();
        dispatch({type: "recenter"});
      }
    });
    return () => unSub();
  }, [stageId, dispatch, storeApi]);
  useFrame(state => {
    controls.current.update();
  });
  return (
    <panControls
      ref={controls}
      enabled={!context.dragging}
      args={[camera, gl.domElement]}
      enableRotate={false}
      screenSpacePanning={true}
      maxZoom={5}
      minZoom={0.00000001}
      zoomSpeed={1}
      mouseButtons={{
        MIDDLE: THREE.MOUSE.DOLLY,
        LEFT: THREE.MOUSE.PAN,
        RIGHT: THREE.MOUSE.PAN,
      }}
    />
  );
}
