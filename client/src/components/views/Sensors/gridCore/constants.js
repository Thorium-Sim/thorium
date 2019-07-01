export function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

export const speeds = [
  { value: "1000", label: "Instant" },
  { value: "5", label: "Warp" },
  { value: "1", label: "Very Fast" },
  { value: "0.6", label: "Fast" },
  { value: "0.4", label: "Moderate" },
  { value: "0.2", label: "Slow" },
  { value: "0.05", label: "Very Slow" }
];

export const SENSORS_OFFSET = 45;
