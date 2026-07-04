// Shared "keep on screen" clamp math for Tactical Map objects.
//
// Tactical items store their position as normalized {x, y, z} fractions where 0 is
// the left/top edge and 1 is the right/bottom edge, rendered with
// `translate(x*100%, y*100%)`. When an item has `keepOnScreen` enabled we constrain
// the position so the *entire* scaled icon stays within [0, 1].
//
// The footprint is computed against the canonical 1920x1080 viewscreen so the clamp
// is identical on the server (authoritative) and on every client, regardless of the
// actual canvas size (the rendered position is normalized, so it is scale-invariant).
//
// NOTE: This file is intentionally duplicated at
// `server/helpers/tacticalBounds.js`. The client (Vite, tsconfig include: src) and the
// server (tsconfig include: server) cannot import across that boundary, so keep the two
// copies in sync.

export const CANONICAL_WIDTH = 1920;
export const CANONICAL_HEIGHT = 1080;

// Returns the normalized {w, h} footprint of the scaled icon. `iconWidth`/`iconHeight`
// are the icon image's intrinsic pixel dimensions (measured once on the client).
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

// Clamps a normalized position so the icon's footprint stays fully on screen.
export function clampToBounds(position, footprint) {
  const maxX = Math.max(0, 1 - footprint.w);
  const maxY = Math.max(0, 1 - footprint.h);
  return {
    x: Math.min(Math.max(position.x, 0), maxX),
    y: Math.min(Math.max(position.y, 0), maxY),
    z: position.z,
  };
}

// Convenience: clamp a position for a given item using its stored footprint.
export function clampItemPosition(
  item,
  position,
  canvasWidth = CANONICAL_WIDTH,
  canvasHeight = CANONICAL_HEIGHT,
) {
  return clampToBounds(
    position,
    getFootprint(item, canvasWidth, canvasHeight),
  );
}
