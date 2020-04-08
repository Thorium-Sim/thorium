import React from "react";
import {Entity} from "generated/graphql";
import {Mesh, Quaternion, Vector3} from "three";
import {useFrame} from "react-three-fiber";
import usePrevious from "helpers/hooks/usePrevious";
import {CanvasContext} from "../CanvasContext";

const q = new Quaternion();
const q2 = new Quaternion();
const v = new Vector3();
const v2 = new Vector3();

export default function useClientSystems(
  entity: Entity,
  mesh: React.MutableRefObject<Mesh>,
) {
  const previousEntity = usePrevious(entity);
  const [{camera: perspectiveCamera}] = React.useContext(CanvasContext);

  const time = React.useRef(0);
  React.useEffect(() => {
    time.current = 0;
  }, [entity]);
  useFrame(({camera}, delta) => {
    if (!mesh.current || !entity.interval) return;
    time.current += (delta * 1000) / entity.interval;
    const t = Math.min(time.current, 1);
    // Interpolate the Rotation
    const rotation = entity.location?.rotation;
    const oldRotation = previousEntity.location?.rotation;
    if (rotation && oldRotation) {
      q.set(rotation.x, rotation.y, rotation.z, rotation.w);
      q2.set(oldRotation.x, oldRotation.y, oldRotation.z, oldRotation.w);
      q2.slerp(q, t);
      mesh.current.rotation.setFromQuaternion(q2);
    }
    // Interpolate the position
    const position = entity.location?.position;
    const oldPosition = previousEntity.location?.position;
    if (position && oldPosition) {
      v.set(position.x, position.y, position.z);
      v2.set(oldPosition.x, oldPosition.y, oldPosition.z);
      v2.lerp(v, t);
      mesh.current.position.set(v2.x, v2.y, v2.z);
    }

    // Set the camera to the position/rotation of the entity
    if (
      perspectiveCamera &&
      entity.id === "daa36db8-76e9-4645-b4b7-b9ee741552bb"
    ) {
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
