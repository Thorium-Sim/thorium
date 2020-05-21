import {Vector2} from "three";

export const mouse = new Vector2();

let dimensions: DOMRect;
function onMouseMove(event: MouseEvent) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  if (!dimensions && event.target) {
    dimensions = (event.target as HTMLDivElement).getBoundingClientRect();
  }
  mouse.x = ((event.clientX - dimensions.left) / dimensions.width) * 2 - 1;
  mouse.y = -((event.clientY - dimensions.top) / dimensions.height) * 2 + 1;
}

export function clearEvents(domElement: HTMLDivElement | null) {
  if (domElement) {
    domElement.removeEventListener("mousemove", onMouseMove);
  }
}
export function initEvents(domElement: HTMLDivElement | null) {
  if (domElement) {
    domElement.addEventListener("mousemove", onMouseMove);
  }
}
