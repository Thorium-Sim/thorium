import React, {useRef, useState, useCallback, CSSProperties} from "react";
import gql from "graphql-tag.macro";
import {useMutation} from "@apollo/client";
import {useQuerySub} from "helpers/hooks/useQueryAndSubscribe";
import Preview from "components/views/TacticalMap/preview";
import "./AdvancedTrainingTacticalMapViewer.scss";

// Floating training exercise panel: a read-only-by-construction (core=false)
// render of a live, per-client tactical map instance, driven by the crew's
// Thrusters card (see server/processes/thrusters.js) or, as a fallback, the
// WASD/IJKL keyboard handler baked into the shared Preview component. Mirrors
// the layout/drag/position mechanics of AdvancedTrainingMediaViewer.tsx.

const TACTICAL_MAP_FRAGMENT = gql`
  fragment AdvancedTrainingTacticalMapData on TacticalMap {
    id
    name
    interval
    frozen
    layers {
      id
      name
      type
      items {
        id
        layerId
        font
        label
        fontSize
        fontColor
        icon
        size
        iconWidth
        iconHeight
        keepOnScreen
        speed
        velocity {
          x
          y
          z
        }
        location {
          x
          y
          z
        }
        destination {
          x
          y
          z
        }
        rotation
        opacity
        flash
        ijkl
        wasd
        trainingGoal
        trainingGoalRadius
      }
      paths {
        id
        layerId
        start {
          x
          y
          z
        }
        end {
          x
          y
          z
        }
        c1 {
          x
          y
          z
        }
        c2 {
          x
          y
          z
        }
        color
        width
        arrow
      }
      image
      color
      labels
      gridCols
      gridRows
      advance
      asset
      autoplay
      loop
      playbackSpeed
      opacity
      mute
    }
  }
`;

const TACTICAL_MAP_QUERY = gql`
  query AdvancedTrainingTacticalMapQuery($id: ID!) {
    tacticalMap(id: $id) {
      ...AdvancedTrainingTacticalMapData
    }
  }
  ${TACTICAL_MAP_FRAGMENT}
`;

const TACTICAL_MAP_SUB = gql`
  subscription AdvancedTrainingTacticalMapUpdate(
    $id: ID!
    $lowInterval: Boolean
  ) {
    tacticalMapUpdate(id: $id, lowInterval: $lowInterval) {
      ...AdvancedTrainingTacticalMapData
    }
  }
  ${TACTICAL_MAP_FRAGMENT}
`;

const UPDATE_TACTICAL_ITEM = gql`
  mutation AdvancedTrainingUpdateTacticalItem(
    $mapId: ID!
    $layerId: ID!
    $item: TacticalItemInput!
  ) {
    updateTacticalMapItem(mapId: $mapId, layerId: $layerId, item: $item)
  }
`;

const noop = () => {};

// Aspect-corrected distance units — see server/helpers/trainingGoalDistance.ts.
// Kept in sync manually (small, purely cosmetic — only used to size the ring).
const CANVAS_ASPECT_RATIO = 16 / 9;

interface AdvancedTrainingTacticalMapViewerProps {
  mapId: string;
  onClose: () => void;
  size?: "small" | "medium" | "large";
  position?: string;
  stripPosition?: "top" | "bottom";
  showDoneButton?: boolean;
  onMarkComplete?: () => void;
}

const SIZE_WIDTHS = {small: 0.25, medium: 0.4, large: 0.6};
const STRIP_HEIGHT = 64;
const MARGIN = 16;

// Same positioning approach as AdvancedTrainingMediaViewer.tsx: CSS-driven
// placement against a 3x3 anchor grid until the user drags, then pixel-based.
function getPositionStyle(
  position: string,
  stripPosition: "top" | "bottom" = "bottom",
): CSSProperties {
  const [vert, horiz] = position.split("-");
  const style: CSSProperties = {};

  if (horiz === "left") {
    style.left = MARGIN;
  } else if (horiz === "right") {
    style.right = MARGIN;
  } else {
    style.left = "50%";
  }

  if (vert === "top") {
    style.top = stripPosition === "top" ? STRIP_HEIGHT + MARGIN : MARGIN;
  } else if (vert === "bottom") {
    style.bottom = stripPosition === "bottom" ? STRIP_HEIGHT + MARGIN : MARGIN;
  } else {
    style.top = "50%";
  }

  const tx = horiz === "center" ? "-50%" : "0px";
  const ty = vert === "middle" ? "-50%" : "0px";
  if (tx !== "0px" || ty !== "0px") {
    style.transform = `translate(${tx}, ${ty})`;
  }

  return style;
}

const AdvancedTrainingTacticalMapViewer: React.FC<
  AdvancedTrainingTacticalMapViewerProps
> = ({
  mapId,
  onClose,
  size = "medium",
  position = "bottom-right",
  stripPosition = "bottom",
  showDoneButton = false,
  onMarkComplete,
}) => {
  const [dragPos, setDragPos] = useState<{x: number; y: number} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({x: 0, y: 0, posX: 0, posY: 0});
  const viewerRef = useRef<HTMLDivElement>(null);

  const [updateTacticalItemMutation] = useMutation(UPDATE_TACTICAL_ITEM);
  const updateObject = useCallback(
    (key: string, value: any, object: any) => {
      if (!object?.layerId) {
        return;
      }
      updateTacticalItemMutation({
        variables: {
          mapId,
          layerId: object.layerId,
          item: {id: object.id, [key]: value},
        },
      });
    },
    [mapId, updateTacticalItemMutation],
  );

  // Unlike the FD's own editor (which passes lowInterval to cut chatter
  // while it isn't the thing being piloted), this is the trainee's live,
  // actively-controlled view — it needs the same full-rate updates as any
  // other crew viewscreen, or thruster/WASD movement reads as stalled.
  const {data} = useQuerySub(TACTICAL_MAP_QUERY, TACTICAL_MAP_SUB, {
    variables: {id: mapId, lowInterval: false},
    skip: !mapId,
  });
  const tacticalMap = data?.tacticalMap;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["INPUT", "BUTTON", "SVG", "PATH"].includes(tag)) {
        return;
      }

      let startPosX = dragPos?.x ?? 0;
      let startPosY = dragPos?.y ?? 0;
      if (!dragPos && viewerRef.current) {
        const rect = viewerRef.current.getBoundingClientRect();
        startPosX = rect.left;
        startPosY = rect.top;
        setDragPos({x: startPosX, y: startPosY});
      }

      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        posX: startPosX,
        posY: startPosY,
      };
    },
    [dragPos],
  );

  React.useEffect(() => {
    if (!isDragging) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setDragPos({
        x: Math.max(
          0,
          Math.min(
            window.innerWidth * (1 - (SIZE_WIDTHS[size] || 0.4)),
            dragStartRef.current.posX + dx,
          ),
        ),
        y: Math.max(
          0,
          Math.min(window.innerHeight * 0.75, dragStartRef.current.posY + dy),
        ),
      });
    };
    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, size]);

  const viewerWidth = `${(SIZE_WIDTHS[size] || 0.4) * 100}vw`;

  const positionStyle: CSSProperties = dragPos
    ? {
        left: 0,
        top: 0,
        right: "auto",
        bottom: "auto",
        transform: `translate(${dragPos.x}px, ${dragPos.y}px)`,
      }
    : getPositionStyle(position, stripPosition);

  // Goal targets are drawn here (rather than in the shared IconMarkup), so
  // the training exercise doesn't touch the general-purpose tactical map
  // renderer used by the FD editor and viewscreens.
  const goalItems = (tacticalMap?.layers || [])
    .filter((l: any) => l.type === "objects")
    .flatMap((l: any) => l.items)
    .filter((i: any) => i.trainingGoal);

  return (
    <div
      ref={viewerRef}
      className="advanced-training-tactical-map-viewer"
      style={{...positionStyle, width: viewerWidth}}
      onMouseDown={handleMouseDown}
    >
      <div className="tactical-map-viewer-header">
        <span className="tactical-map-viewer-title">Tactical Map</span>
        <button className="tactical-map-viewer-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
      <div className="tactical-map-viewer-canvas">
        {tacticalMap && (
          <>
            <Preview
              tacticalMapId={mapId}
              simulatorId={null}
              viewscreen={{}}
              interval={tacticalMap.interval}
              frozen={tacticalMap.frozen}
              layers={tacticalMap.layers}
              core={false}
              speed={1000}
              layerId={null}
              objectId={null}
              selectObject={noop}
              updateObject={updateObject}
              removeObject={noop}
              updatePath={noop}
              removePath={noop}
            />
            {goalItems.map((g: any) => {
              const r = g.trainingGoalRadius ?? 0.08;
              const widthPct = ((2 * r) / CANVAS_ASPECT_RATIO) * 100;
              const heightPct = 2 * r * 100;
              return (
                <div
                  key={g.id}
                  className="tactical-goal-ring"
                  style={{
                    left: `${g.location.x * 100}%`,
                    top: `${g.location.y * 100}%`,
                    width: `${widthPct}%`,
                    height: `${heightPct}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}
          </>
        )}
      </div>
      {showDoneButton && (
        <div className="tactical-map-viewer-footer">
          <button
            className="tactical-map-viewer-done"
            onClick={() => onMarkComplete?.()}
          >
            Mark Exercise Complete
          </button>
        </div>
      )}
    </div>
  );
};

export default AdvancedTrainingTacticalMapViewer;
