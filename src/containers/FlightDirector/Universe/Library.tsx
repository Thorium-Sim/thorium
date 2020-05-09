import React, {Suspense} from "react";
import {Canvas} from "react-three-fiber";
import Entity from "./Entity";
import {FaPlusCircle} from "react-icons/fa";
import {ApolloProvider, useApolloClient} from "@apollo/client";
import {Entity as EntityT} from "generated/graphql";
import usePatchedSubscriptions from "helpers/hooks/usePatchedSubscriptions";
import gql from "graphql-tag.macro";
import {PositionTuple} from "./CanvasApp";
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

const sub = gql`
  subscription TemplateEntities {
    entities(flightId: "template", template: true) {
      id
      identity {
        name
      }
      template {
        category
      }
      appearance {
        color
        meshType
        modelAsset
        materialMapAsset
        ringMapAsset
        cloudMapAsset
        emissiveColor
        emissiveIntensity
        scale
      }
      light {
        intensity
        decay
        color
      }
      glow {
        glowMode
        color
      }
    }
  }
`;

export default function Library({
  dragging = false,
  setDragging,
}: {
  dragging: boolean;
  setDragging: React.Dispatch<any>;
}) {
  const [useEntityState, storeApi] = usePatchedSubscriptions<
    EntityT[],
    {flightId: string}
  >(sub, {flightId: "template"});
  const libraryItems = useEntityState(state => state.data) || [];
  const mousePosition = React.useRef<PositionTuple>([0, 0, 0]);
  const client = useApolloClient();
  return (
    <div>
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
                  <ambientLight intensity={1} />
                  <pointLight position={[10, 10, 10]} intensity={0.5} />
                  <Suspense fallback={null}>
                    <Entity
                      library
                      entity={l}
                      mousePosition={mousePosition}
                      storeApi={storeApi}
                      entityIndex={-1}
                    />
                  </Suspense>
                </ApolloProvider>
              </Canvas>
              {l.identity?.name || l.appearance?.meshType}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
