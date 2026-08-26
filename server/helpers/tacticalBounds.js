// Shared "keep on screen" clamp math for Tactical Map objects (server copy).
//
// Tactical items store their position as normalized {x, y, z} fractions where 0 is
// the left/top edge and 1 is the right/bottom edge. When an item has `keepOnScreen`
// enabled we constrain the position so the *entire* scaled icon stays within [0, 1].
//
// The footprint is computed against the canonical 1920x1080 viewscreen so the clamp is
// identical on the server (authoritative) and on every client, regardless of the actual
// canvas size.
//
// NOTE: This file is intentionally duplicated at
// `src/components/views/TacticalMap/preview/layerComps/clampToBounds.js`. The client
// (Vite, tsconfig include: src) and the server (tsconfig include: server) cannot import
// across that boundary, so keep the two copies in sync.

export const CANONICAL_WIDTH = 1920;
export const CANONICAL_HEIGHT = 1080;

export function getFootprint(
  item,
  canvasWidth = CANONICAL_WIDTH,
  canvasHeight = CANONICAL_HEIGHT,
) {
  const size = item.size || 1;
  const w = ((item.iconWidth || 0) * size) / canvasWidth;
  const h = ((item.iconHeight || 0) * size) / canvasHeight;
  return {w, h};
}

// Returns the normalized center point of an item rendered at `position`. A stored
// position anchors the icon's top-left corner (it is applied as a `translate`), so
// anything that should read as "at the object" — the training goal ring, the goal
// proximity check — has to add half the footprint.
export function getItemCenter(
  item,
  position,
  canvasWidth = CANONICAL_WIDTH,
  canvasHeight = CANONICAL_HEIGHT,
) {
  const {w, h} = getFootprint(item, canvasWidth, canvasHeight);
  return {x: position.x + w / 2, y: position.y + h / 2, z: position.z};
}

export function clampToBounds(position, footprint) {
  const maxX = Math.max(0, 1 - footprint.w);
  const maxY = Math.max(0, 1 - footprint.h);
  return {
    x: Math.min(Math.max(position.x, 0), maxX),
    y: Math.min(Math.max(position.y, 0), maxY),
    z: position.z,
  };
}

export function clampItemPosition(
  item,
  position,
  canvasWidth = CANONICAL_WIDTH,
  canvasHeight = CANONICAL_HEIGHT,
) {
  return clampToBounds(position, getFootprint(item, canvasWidth, canvasHeight));
}
