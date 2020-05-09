import React from "react";
import {TextureLoader} from "three";
import {useLoader} from "react-three-fiber";
import {AppearanceComponent} from "generated/graphql";

const EntitySprite: React.FC<{
  appearance?: AppearanceComponent;
}> = ({appearance}) => {
  const spriteTexture = useLoader(TextureLoader, require("./star-sprite.svg"));

  return (
    <sprite>
      <spriteMaterial
        attach="material"
        map={spriteTexture}
        color={appearance?.color || undefined}
        sizeAttenuation={false}
      ></spriteMaterial>
    </sprite>
  );
};

export default EntitySprite;
