export default function parseColor(currentColor, nextColor) {
  if (nextColor === "red") nextColor = "#f00";
  if (nextColor === "blue") nextColor = "#00f";
  if (nextColor === "green") nextColor = "#0f0";
  if (!currentColor) {
    return nextColor;
  }
  const currentColorHex = parseInt(currentColor.replace("#", "0x"), 16);
  const nextColorHex = parseInt(nextColor.replace("#", "0x"), 16);
  return `#${(currentColorHex | nextColorHex).toString(16).padStart(3, "0")}`;
}
