// Aspect-corrected distance between two normalized Tactical Map positions.
//
// Tactical items store position as normalized {x, y} fractions (0..1) of the
// canonical 1920x1080 (16:9) canvas — see server/helpers/tacticalBounds.js.
// A raw Euclidean distance between two normalized points is wrong: since x
// spans a wider physical distance than y for the same 0..1 delta, comparing
// it to a single radius produces an ellipse, not a circle. Converting the x
// delta into "y units" (multiplying by the aspect ratio) corrects for this,
// so a `trainingGoalRadius` reads as a true circle regardless of axis.

export const CANVAS_ASPECT_RATIO = 16 / 9;

export interface Point2D {
  x: number;
  y: number;
}

export function goalDistance(
  a: Point2D,
  b: Point2D,
  aspectRatio: number = CANVAS_ASPECT_RATIO,
): number {
  const dx = (a.x - b.x) * aspectRatio;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

export function withinGoalRadius(
  player: Point2D,
  goal: Point2D,
  radius: number,
  aspectRatio: number = CANVAS_ASPECT_RATIO,
): boolean {
  return goalDistance(player, goal, aspectRatio) <= radius;
}
