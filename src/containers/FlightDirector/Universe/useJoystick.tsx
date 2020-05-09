import * as React from "react";
import {
  useEntitySetThrustersMutation,
  useEntitySetEngineMutation,
} from "../../../generated/graphql";
import {throttle} from "helpers/debounce";
import {useGamepadAxis, useGamepadButton} from "helpers/hooks/useGamepad";

export default function useJoystick(id: string, controllingEntityId: string) {
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
}
