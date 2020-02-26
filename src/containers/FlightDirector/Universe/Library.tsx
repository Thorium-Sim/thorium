import * as React from "react";
import {Canvas} from "react-three-fiber";
import Entity from "./Entity";
import {FaPlusCircle} from "react-icons/fa";
const libraryItems = [
  {
    type: "sphere",
    size: 1,
    scale: 1,
    material: "standard",
    color: 0x0088ff,
  },
  {
    type: "cube",
    size: 1,
    scale: 1,
    material: "standard",
    color: 0x882200,
  },
];
export default function Library({
  dragging = false,
  setDragging,
}: {
  dragging: boolean;
  setDragging: React.Dispatch<any>;
}) {
  return (
    <>
      <div className="library-opener">
        <FaPlusCircle />
      </div>
      <div className={`library ${dragging ? "dragging" : ""}`}>
        <div className="library-inner">
          {libraryItems.map(l => (
            <div
              key={l.type}
              className="library-item"
              onMouseDown={() => setDragging(l)}
            >
              <Canvas className="library-mesh" camera={{position: [0, 0, 3]}}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
                <Entity library entity={{id: "library-entity", ...l}} />
              </Canvas>
              {l.type}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
