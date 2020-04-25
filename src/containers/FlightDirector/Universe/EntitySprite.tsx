import React from "react";
import {Mesh, TextureLoader, Vector3} from "three";
import {useLoader} from "react-three-fiber";
import {AppearanceComponent} from "generated/graphql";

const EntitySprite = React.forwardRef<
  Mesh,
  {
    position?: Vector3 | [number, number, number];
    appearance?: AppearanceComponent;
  }
>(({position, appearance}, mesh) => {
  const spriteTexture = useLoader(TextureLoader, require("./star-sprite.svg"));

  return (
    <sprite
      ref={mesh}
      position={position}
      scale={[20000000, 20000000, 20000000]}
    >
      <spriteMaterial
        attach="material"
        map={spriteTexture}
        color={appearance?.color || undefined}
        sizeAttenuation={false}
      ></spriteMaterial>
    </sprite>
  );
});

export default EntitySprite;
