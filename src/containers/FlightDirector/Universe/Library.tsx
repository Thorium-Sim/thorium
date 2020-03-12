import React, {Suspense} from "react";
import {Canvas} from "react-three-fiber";
import Entity from "./Entity";
import {FaPlusCircle} from "react-icons/fa";
import {ApolloProvider, useApolloClient} from "@apollo/client";
import {MeshTypeEnum, Entity as EntityT, GlowModeEnum} from "generated/graphql";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

const libraryItems: PartialBy<EntityT, "id">[] = [
  {
    identity: {
      name: "Star",
    },
    appearance: {
      meshType: MeshTypeEnum.Sphere,
      emissiveColor: "#ff8800",
      emissiveIntensity: 1.5,
      materialMapAsset: "/assets/3D/Texture/Planets/2k_sun.jpg",
    },
    glow: {
      glowMode: GlowModeEnum.Halo,
      color: "#ff8800",
    },
    light: {
      color: "#ffffff",
      decay: 2,
      intensity: 1,
    },
  },
  {
    identity: {
      name: "Mars",
    },
    appearance: {
      meshType: MeshTypeEnum.Sphere,
      materialMapAsset: "/assets/3D/Texture/Planets/mars.jpg",
    },
  },
  {
    identity: {
      name: "Saturn",
    },
    appearance: {
      meshType: MeshTypeEnum.Sphere,
      materialMapAsset: "/assets/3D/Texture/Planets/saturn.jpg",
      ringMapAsset: "/assets/3D/Texture/Planets/rings/rings1.png",
    },
  },
  {
    identity: {
      name: "Jupiter",
    },
    appearance: {
      meshType: MeshTypeEnum.Sphere,
      materialMapAsset: "/assets/3D/Texture/Planets/jupiter.jpg",
    },
  },
  {
    identity: {
      name: "Terrestrial",
    },
    appearance: {
      meshType: MeshTypeEnum.Sphere,
      materialMapAsset: "/assets/3D/Texture/Planets/Terrestrial1.jpg",
      // cloudMapAsset: "/assets/3D/Texture/Planets/Clouds/Clouds1.png",
    },
  },
  {
    appearance: {
      meshType: MeshTypeEnum.Sphere,
      color: "#0088ff",
    },
  },
  {
    appearance: {
      meshType: MeshTypeEnum.Cube,
      color: "#88ff00",
    },
  },
  {
    appearance: {
      meshType: MeshTypeEnum.Sprite,
      materialMapAsset: require("./star-sprite.svg"),
      color: "#ffffff",
    },
  },
];
export default function Library({
  dragging = false,
  setDragging,
}: {
  dragging: boolean;
  setDragging: React.Dispatch<any>;
}) {
  const client = useApolloClient();
  return (
    <>
      <div className="library-opener">
        <FaPlusCircle />
      </div>
      <div className={`library ${dragging ? "dragging" : ""}`}>
        <div className="library-inner">
          {libraryItems.map((l, i) => (
            <div
              key={l.identity?.name || l.appearance?.meshType || `library-${i}`}
              className="library-item"
              onMouseDown={() => setDragging(l)}
            >
              <Canvas className="library-mesh" camera={{position: [0, 0, 3]}}>
                <ApolloProvider client={client}>
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} intensity={0.5} />
                  <Suspense fallback={null}>
                    <Entity
                      index={0}
                      library
                      entity={{id: "library-entity", ...l}}
                    />
                  </Suspense>
                </ApolloProvider>
              </Canvas>
              {l.identity?.name || l.appearance?.meshType}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
