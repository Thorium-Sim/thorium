import React, {Suspense} from "react";
import {Canvas} from "react-three-fiber";
import Entity from "./Entity";
import {FaPlusCircle} from "react-icons/fa";
import {ApolloProvider, useApolloClient} from "@apollo/client";
import {MeshTypeEnum} from "generated/graphql";

const libraryItems = [
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
  // {
  //   type: "cube",
  //   size: 1,
  //   scale: 1,
  //   material: "standard",
  //   color: 0x882200,
  // },
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
          {libraryItems.map(l => (
            <div
              key={l.appearance.meshType}
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
              {l.appearance.meshType}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
