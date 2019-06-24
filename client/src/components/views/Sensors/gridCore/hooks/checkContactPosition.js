import { SENSORS_OFFSET, distance3d } from "../constants";

export function checkContactPosition(c, node, dimensions) {
  const contactEl = node.querySelector(`#contact-${c.id}`);
  if (contactEl) {
    const { top, bottom, left, right } = contactEl.getBoundingClientRect();
    if (
      bottom < dimensions.top - SENSORS_OFFSET ||
      top > dimensions.top + dimensions.height ||
      left > dimensions.left + dimensions.width ||
      right < dimensions.left - SENSORS_OFFSET
    ) {
      return { ...c, delete: true };
    }
  } else {
    const distance = distance3d({ x: 0, y: 0, z: 0 }, c.destination);
    const maxDistance = c.type === "planet" ? 1 + c.size / 2 : 1.1;
    return { ...c, delete: distance > maxDistance };
  }
  return c;
}
