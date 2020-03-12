import React from "react";
import {Color} from "three";

interface LightProps {
  intensity?: number;
  decay?: number;
  color?: string;
}

const Light: React.FC<LightProps> = ({
  intensity = 1,
  decay = 2,
  color = "#ffffff",
}) => {
  const threeColor = React.useMemo(() => new Color(color), [color]);
  return <pointLight intensity={intensity} decay={decay} color={threeColor} />;
};

export default Light;
