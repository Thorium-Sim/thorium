import parseColor from "./parseColor";
function getDirection(x, y, width) {
  if (x === 0) return {x: 1, y: 0};
  if (y === 0) return {x: 0, y: 1};
  if (x + 1 === width) return {x: -1, y: 0};
  if (y + 1 === width) return {x: 0, y: -1};
}
const colorMap = {
  "#f00": "Red",
  "#ff0": "Yellow",
  "#0f0": "Green",
  "#0ff": "LightBlue",
  "#00f": "Blue",
  "#f0f": "Purple",
  "#fff": "White",
};
export default function parseLaser(objects, width) {
  let x = objects.findIndex(row => row.find(r => r.includes("Emitter")));
  if ((!x && x !== 0) || !objects[x]) return {segments: null, checkPoints: {}};
  let y = objects[x].findIndex(cell => cell.includes("Emitter"));
  let color = parseColor(
    null,
    objects[x][y].replace("Emitter", "").replace("-Locked", "").toLowerCase(),
  );
  let direction = getDirection(x, y, width);
  const checkPoints = {};
  const segments = [
    {
      color,
      direction,
      start: {x, y},
      end: {x: x + direction.x, y: y + direction.y},
    },
  ];
  x = x + direction.x;
  y = y + direction.y;

  for (let i = 0; i < 512; i++) {
    // Block for moving the laser around.
    const nextObject = objects[x] && objects[x][y];
    if (
      (!nextObject && nextObject !== "") ||
      nextObject.replace("-Locked", "") === "Obstacle"
    )
      return {segments, checkPoints};
    if (nextObject.includes("Filter")) {
      color = parseColor(
        color,
        nextObject.replace("Filter", "").replace("-Locked", "").toLowerCase(),
      );
    }
    if (nextObject.includes(`CheckPoint`)) {
      if (nextObject.includes(`CheckPoint${colorMap[color]}`)) {
        checkPoints[`${x},${y}`] = true;
      } else {
        return {segments, checkPoints};
      }
    }
    if (nextObject.includes("Mirror")) {
      const mirrorDirection = nextObject
        .replace("Mirror", "")
        .replace("-Locked", "");
      if (mirrorDirection === "1" && (direction.x === -1 || direction.y === -1))
        return {segments, checkPoints};
      if (mirrorDirection === "2" && (direction.x === -1 || direction.y === 1))
        return {segments, checkPoints};
      if (mirrorDirection === "3" && (direction.x === 1 || direction.y === 1))
        return {segments, checkPoints};
      if (mirrorDirection === "4" && (direction.x === 1 || direction.y === -1))
        return {segments, checkPoints};
      if (mirrorDirection === "1" || mirrorDirection === "3") {
        direction = {x: -direction.y, y: -direction.x};
      } else {
        direction = {x: direction.y, y: direction.x};
      }
    }
    segments.push({
      color,
      direction,
      start: {x, y},
      end: {x: x + direction.x, y: y + direction.y},
    });
    x = x + direction.x;
    y = y + direction.y;
  }
  return {segments, checkPoints};
}
