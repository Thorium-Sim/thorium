const canvasSize = 2000;
export default function calculatePosition({
  position,
  center,
  zoomFactor,
  track = true
}) {
  return {
    x:
      (zoomFactor * (position.x - (track ? center.x : 0))) /
        (canvasSize / 2 / 50) +
      50,
    y:
      (zoomFactor * (position.y - (track ? center.y : 0))) /
        (canvasSize / 2 / 50) +
      50
  };
}
