export default function randomOnSphere(size) {
  let x = 1;
  let y = 1;
  let z = 1;
  while (Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) > 1) {
    x = (Math.random() - 0.5) * 2;
    y = (Math.random() - 0.5) * 2;
    z = (Math.random() - 0.5) * 2;
  }
  return { x: x * size, y: y * size, z: z * size };
}
