// Different components for each attached joystick.
import React from "react";
import {
  useEntitySetThrustersMutation,
  useEntitySetEngineMutation,
} from "../../../generated/graphql";
import {throttle} from "helpers/debounce";
import {useGamepadAxis, useGamepadButton} from "helpers/hooks/useGamepad";

function calculateHatDirection(axis: number) {
  let up = 0;
  let down = 0;
  let left = 0;
  let right = 0;
  if (axis === -1 || axis === -0.71429 || axis === 1) {
    up = 1;
  }
  if (axis === -0.71429 || axis === -0.42857 || axis === -0.14286) {
    right = 1;
  }
  if (axis === -0.14286 || axis === 0.14286 || axis === 0.42857) {
    down = 1;
  }
  if (axis === 0.42857 || axis === 0.71429 || axis === 1) {
    left = 1;
  }
  return {up, down, left, right};
}
const ThrustmasterJoystick: React.FC<{controllingEntityId: string}> = ({
  controllingEntityId,
}) => {
  const id = "USB Game Controllers (Vendor: 07b5 Product: 0316)";

  const [setThrusterVelocity] = useEntitySetThrustersMutation();
  const [setEngine] = useEntitySetEngineMutation();
  const throttleSetThrusters = React.useCallback(
    throttle(setThrusterVelocity, 100),
    [],
  );
  const throttleSetEngine = React.useCallback(throttle(setEngine, 100), []);
  const axisCallback = React.useCallback(
    axes => {
      const z = axes[0] * -1;
      const x = axes[1];
      const forwardSpeed = axes[2] === null ? 0 : Math.abs(axes[2] - 1) / 2;
      const {up, down, left, right} = calculateHatDirection(axes[3]);
      const direction = {
        x: right ? 1 : left ? -1 : 0,
        y: 0,
        z: up ? 1 : down ? -1 : 0,
      };
      setThrusterVelocity({variables: {id: controllingEntityId, direction}});
      throttleSetThrusters({
        variables: {id: controllingEntityId, rotationDelta: {x, y: 0, z}},
      });
      throttleSetEngine({
        variables: {
          id: controllingEntityId,
          type: "impulse",
          currentSpeed: forwardSpeed,
        },
      });
    },
    [
      setThrusterVelocity,
      controllingEntityId,
      throttleSetThrusters,
      throttleSetEngine,
    ],
  );
  useGamepadAxis(id, [0, 1, 2, 9], axisCallback);

  return null;
};
const X52Joystick: React.FC<{controllingEntityId: string}> = ({
  controllingEntityId,
}) => {
  const id = "X52 H.O.T.A.S. (Vendor: 06a3 Product: 075c)";

  const [setThrusterVelocity] = useEntitySetThrustersMutation();
  const [setEngine] = useEntitySetEngineMutation();
  const throttleSetThrusters = React.useCallback(
    throttle(setThrusterVelocity, 100),
    [],
  );
  const throttleSetEngine = React.useCallback(throttle(setEngine, 100), []);
  const buttonCallback = React.useCallback(
    ([up, right, down, left]) => {
      const direction = {
        x: right ? 1 : left ? -1 : 0,
        y: 0,
        z: up ? 1 : down ? -1 : 0,
      };
      setThrusterVelocity({variables: {id: controllingEntityId, direction}});
    },
    [setThrusterVelocity, controllingEntityId],
  );
  const axisCallback = React.useCallback(
    axes => {
      const z = axes[0] * -1;
      const x = axes[1];
      const y = axes[2];
      const forwardSpeed = axes[3] === null ? 0 : Math.abs(axes[3] - 1) / 2;
      throttleSetThrusters({
        variables: {id: controllingEntityId, rotationDelta: {x, y, z}},
      });
      throttleSetEngine({
        variables: {
          id: controllingEntityId,
          type: "impulse",
          currentSpeed: forwardSpeed,
        },
      });
    },
    [throttleSetEngine, throttleSetThrusters, controllingEntityId],
  );
  useGamepadButton(id, [15, 16, 17, 18], buttonCallback);
  useGamepadAxis(id, [0, 1, 5, 2], axisCallback);

  return null;
};
const Joysticks: React.FC<{controllingEntityId: string}> = ({
  controllingEntityId,
}) => {
  return (
    <>
      <X52Joystick controllingEntityId={controllingEntityId} />
      <ThrustmasterJoystick controllingEntityId={controllingEntityId} />
    </>
  );
};
export default Joysticks;
