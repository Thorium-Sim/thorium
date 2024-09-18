export default function getSide(x, y, width) {
  if (x === 0) return "Left";
  if (y === 0) return "Top";
  if (x + 1 === width) return "Right";
  if (y + 1 === width) return "Bottom";
}
