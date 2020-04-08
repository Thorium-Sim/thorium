import * as React from "react";
import {useLoader} from "react-three-fiber";

import {TextureLoader, Color, FrontSide} from "three";

import {whiteImage} from "./whiteImage";

interface EntityMaterialProps {
  materialMapAsset?: string;
  color?: string;
  emissiveColor?: string;
  emissiveIntensity?: number;
}

const EntityMaterial: React.FC<EntityMaterialProps> = ({
  materialMapAsset,
  color,
  emissiveColor,
  emissiveIntensity,
}) => {
  const mapTexture = useLoader(
    TextureLoader,
    materialMapAsset ? `/assets${materialMapAsset}` : whiteImage,
  );
  return (
    <meshStandardMaterial
      attach="material"
      key={materialMapAsset}
      map={materialMapAsset ? mapTexture : undefined}
      color={color ? new Color(color) : undefined}
      emissive={emissiveColor ? new Color(emissiveColor) : undefined}
      emissiveIntensity={emissiveIntensity || 0}
      side={FrontSide}
    />
  );
};

export default EntityMaterial;
