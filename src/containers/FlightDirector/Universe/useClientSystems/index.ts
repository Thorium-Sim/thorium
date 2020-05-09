import React from "react";
import {Entity} from "generated/graphql";
import {Mesh, Quaternion, Vector3} from "three";
import {useFrame} from "react-three-fiber";
import {CanvasContext} from "../CanvasContext";
import {StoreApi} from "zustand";
import {PatchData} from "helpers/hooks/usePatchedSubscriptions";
import {PositionTuple} from "../CanvasApp";

const q = new Quaternion();
const q2 = new Quaternion();
const v = new Vector3();
const v2 = new Vector3();

export default function useClientSystems(
  storeApi: StoreApi<PatchData<Entity[]>>,
  entityId: string,
  mesh: React.MutableRefObject<Mesh>,
  isDragging: boolean,
  mousePosition: React.MutableRefObject<PositionTuple>,
  stageId?: string,
) {
  const currentEntity = React.useRef<Entity>();
  const previousEntity = React.useRef<Entity>();
  const [
    {camera: perspectiveCamera, controllingEntityId, selected},
  ] = React.useContext(CanvasContext);
  const isSelected = selected.includes(entityId);

  const time = React.useRef(0);
  React.useEffect(() => {
    const unSub = storeApi.subscribe((store: PatchData<Entity[]> | null) => {
      if (!store) return;
      previousEntity.current = currentEntity.current;
      currentEntity.current = store.data.find(f => f.id === entityId);
      time.current = 0;
    });
    return () => unSub();
  }, [entityId, storeApi]);

  useFrame(({camera}, delta) => {
    if (isDragging) {
      mesh.current.position.set(...mousePosition.current);
      return;
    }

    if (
      !mesh.current ||
      !currentEntity.current?.interval ||
      !previousEntity.current
    )
      return;
    if (entityId === stageId) {
      // Put the object in the middle of the stage
      // if we are in its stage.
      mesh.current.position.set(0, 0, 0);
      return;
    }
    if (currentEntity.current?.location?.inert) {
      return;
    }
    time.current += (delta * 1000) / currentEntity.current.interval;
    const t = Math.min(time.current, 1);
    // Interpolate the Rotation
    const rotation = currentEntity.current.location?.rotation;
    const oldRotation = previousEntity.current.location?.rotation;
    if (rotation && oldRotation) {
      q.set(rotation.x, rotation.y, rotation.z, rotation.w);
      q2.set(oldRotation.x, oldRotation.y, oldRotation.z, oldRotation.w);
      q2.slerp(q, t);
      mesh.current.rotation.setFromQuaternion(q2);
    }
    // Interpolate the position
    const position = currentEntity.current.location?.position;
    const oldPosition = previousEntity.current.location?.position;

    if (!currentEntity.current.reset && position && oldPosition) {
      v.set(position.x, position.y, position.z);
      v2.set(oldPosition.x, oldPosition.y, oldPosition.z);
      v2.lerp(v, t);
      if (isSelected) {
        mesh.current.position.set(v2.x, v2.y, v2.z);
      } else {
        mesh.current.position.set(v2.x, v2.y, v2.z);
      }
    }

    // Set the camera to the position/rotation of the entity
    if (perspectiveCamera && entityId === controllingEntityId) {
      mesh.current.visible = false;
      const {x, y, z} = mesh.current.position;
      camera.position.set(x, y, z);
      q.setFromAxisAngle(v.set(1, 0, 0), Math.PI / 2);
      camera.rotation.setFromQuaternion(q2.multiply(q));
    } else {
      mesh.current.visible = true;
    }
  });
}
