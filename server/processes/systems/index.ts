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
  const flightIds = [];
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

      if (edited) flightIds.push(entity.flightId);
    }
  });

  flightIds
    .filter((a, i, arr) => arr.indexOf(a) === i)
    .forEach(flightId => {
      pubsub.publish("entities", {
        flightId,
        template: false,
        entities: App.entities,
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
