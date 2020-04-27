import produce from "immer";
import App from "../../app";
import {rotation} from "./rotation";
import {pubsub} from "../../helpers/subscriptionManager";
import {reset} from "./reset";
import {thrusters} from "./thrusters";
import {movement} from "./movement";
import {engines} from "./engines";

// Systems execute on every entity at a specific interval. Lets grab all the entities and loop over them.
const interval = 1000 / 10;
function processSystems(delta) {
  const flightIds: {[key: string]: string[]} = {};
  App.entities = produce(App.entities, draft => {
    for (let entity of draft) {
      let edited = false;
      if (entity.template) continue;
      // These systems run in a specific order to make sure
      // dependencies line up correctly.
      thrusters(entity, delta);
      engines(entity, delta);

      edited = rotation(entity, delta) || edited;
      edited = movement(entity, delta) || edited;

      reset(entity);
      // Update the interval based on the draft;
      entity.interval = delta;

      if (edited) {
        flightIds[entity.flightId] = flightIds[entity.flightId] || [];
        if (entity.stageChild?.parentId) {
          flightIds[entity.flightId].push(entity.stageChild.parentId);
        }
      }
    }
  });

  Object.entries(flightIds).forEach(([flightId, stageIds]) => {
    const noDuplicateStageIds = stageIds.filter(
      (a, i, arr) => Boolean(a) && arr.indexOf(a) === i,
    );
    noDuplicateStageIds.forEach(stageId => {
      pubsub.publish("entities", {
        flightId,
        stageId,
        template: false,
        entities: App.entities,
      });
    });
  });

  // Trigger the next processing
  const time = Date.now();
  setTimeout(() => {
    const delta = Date.now() - time;
    processSystems(delta);
  }, interval);
}

processSystems(interval);
