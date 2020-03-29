import React from "react";
import {Entity} from "generated/graphql";
import {Mesh, Quaternion} from "three";
import {useFrame} from "react-three-fiber";
import usePrevious from "helpers/hooks/usePrevious";

const q = new Quaternion();
const q2 = new Quaternion();

export default function useClientSystems(
  entity: Entity,
  mesh: React.MutableRefObject<Mesh>,
) {
  const previousEntity = usePrevious(entity);
  const time = React.useRef(0);
  React.useEffect(() => {
    time.current = 0;
  }, [entity]);

  useFrame((state, delta) => {
    if (!mesh.current || !entity.interval) return;
    time.current += (delta * 1000) / entity.interval;
    const t = Math.min(time.current, 1);
    const rotation = entity.location?.rotation;
    const oldRotation = previousEntity.location?.rotation;
    if (!rotation || !oldRotation) return;
    q.set(rotation.x, rotation.y, rotation.z, rotation.w);
    q2.set(oldRotation.x, oldRotation.y, oldRotation.z, oldRotation.w);

    q2.slerp(q, t);
    mesh.current.rotation.setFromQuaternion(q2);
  });
}
