import React from "react";
import {useThree} from "react-three-fiber";
import useEventListener from "./useEventListener";
import {CanvasContext} from "./CanvasContext";
import * as THREE from "three";
import {PlaneBufferGeometry} from "three";
import {get3DMousePosition} from "./use3DMousePosition";
import {Entity} from "generated/graphql";

interface DragSelectProps {
  entities: Entity[];
  selecting: boolean;
}
interface BoxInterface {
  x: number;
  y: number;
  width: number;
  height: number;
  startPointX: number;
  startPointY: number;
}

function selectEntities(
  entities: Entity[],
  setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  pointTopLeftX: number,
  pointBottomRightX: number,
  pointBottomRightY: number,
  pointTopLeftY: number,
) {
  const ids = entities
    .filter(({location}) => {
      if (!location) return false;
      return (
        location.position.x > pointTopLeftX &&
        location.position.x < pointBottomRightX &&
        location.position.y < pointBottomRightY &&
        location.position.y > pointTopLeftY
      );
    })
    .map(e => e.id);
  setSelected(ids);
}
const DragSelect: React.FC<DragSelectProps> = ({entities, selecting}) => {
  const [{dragging}, dispatch] = React.useContext(CanvasContext);
  const {camera, gl: renderer, viewport} = useThree();
  const [box, setBox] = React.useState<BoxInterface | null>(null);
  const {left, top} = renderer.domElement.getBoundingClientRect();

  const setSelected = React.useCallback(
    selected => {
      dispatch({type: "selected", selected});
    },
    [dispatch],
  );

  useEventListener(
    "mousedown",
    function (event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target?.parentElement?.id !== "level-editor") return;
      if (dragging || !selecting) return;
      dispatch({type: "dragging"});
      const position = get3DMousePosition(
        event.clientX - left,
        event.clientY - top,
        viewport.width,
        viewport.height,
        camera,
      );
      setBox({
        x: position.x,
        y: position.y,
        width: 0.001,
        height: 0.001,
        startPointX: position.x,
        startPointY: position.y,
      });
    },
    (document as unknown) as HTMLElement,
  );

  useEventListener(
    "mousemove",
    function (event: MouseEvent) {
      if (box) {
        const position = get3DMousePosition(
          event.clientX - left,
          event.clientY - top,
          viewport.width,
          viewport.height,
          camera,
        );
        const pointBottomRightX = Math.max(box.startPointX, position.x);
        const pointBottomRightY = Math.max(box.startPointY, position.y);
        const pointTopLeftX = Math.min(box.startPointX, position.x);
        const pointTopLeftY = Math.min(box.startPointY, position.y);

        const width = pointBottomRightX - pointTopLeftX;
        const height = pointBottomRightY - pointTopLeftY;
        // Since the box is centered around it's position, we have to
        // transform it.
        const x = pointTopLeftX + width / 2;
        const y = pointBottomRightY - height / 2;

        selectEntities(
          entities,
          setSelected,
          pointTopLeftX,
          pointBottomRightX,
          pointBottomRightY,
          pointTopLeftY,
        );
        setBox(box => {
          return {
            x,
            y,
            width: width || 0.01,
            height: height || 0.01,
            startPointX: box?.startPointX || 0,
            startPointY: box?.startPointY || 0,
          };
        });
      }
    },
    (document as unknown) as HTMLElement,
  );

  useEventListener(
    "mouseup",
    function (event: MouseEvent) {
      if (box) {
        const position = get3DMousePosition(
          event.clientX - left,
          event.clientY - top,
          viewport.width,
          viewport.height,
          camera,
        );
        const pointBottomRightX = Math.max(box.startPointX, position.x);
        const pointBottomRightY = Math.max(box.startPointY, position.y);
        const pointTopLeftX = Math.min(box.startPointX, position.x);
        const pointTopLeftY = Math.min(box.startPointY, position.y);

        selectEntities(
          entities,
          setSelected,
          pointTopLeftX,
          pointBottomRightX,
          pointBottomRightY,
          pointTopLeftY,
        );

        setBox(null);
        dispatch({type: "dropped"});
      }
    },
    (document as unknown) as HTMLElement,
  );

  const [planeGeo, edgeGeo] = React.useMemo(() => {
    const geo = new PlaneBufferGeometry(
      box ? box.width : 0,
      box ? box.height : 0,
    );
    return [geo, new THREE.EdgesGeometry(geo)];
  }, [box]);
  if (!box) return null;
  return (
    <>
      <mesh position={[box.x, box.y, 100]} geometry={planeGeo}>
        <meshBasicMaterial
          color={0x4ba0ff}
          transparent={true}
          opacity={0.3}
          attach="material"
        />
      </mesh>
      <lineSegments position={[box.x, box.y, 100]} geometry={edgeGeo}>
        <lineBasicMaterial color={0x55aaff} attach="material" />
      </lineSegments>
    </>
  );
};

export default DragSelect;
