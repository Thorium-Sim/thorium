import {Entity} from "../../classes/universe/entity";

// This system resets certain values every frame so they are
// cleared out for the next frame
export function reset(entity: Entity) {
  return false;
}
