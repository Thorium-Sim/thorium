import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

const updateHeat = () => {
  App.systems.forEach(sys => {
    if (sys.type === "Engine") {
      const speedVal = sys.on ? sys.speed : -4;
      let heatAdd = Math.min(
        1,
        Math.max(0, sys.heat + speedVal * sys.heatRate * 1 / 50000)
      );
      if (sys.cooling) {
        App.handleEvent({ id: sys.id }, "applyEngineCoolant");
        pubsub.publish(
          "coolantSystemUpdate",
          App.systems
            .filter(s => (s.coolant || s.coolant === 0) && s.type !== "Coolant")
            .map(s => {
              return {
                systemId: s.id,
                simulatorId: s.simulatorId,
                name: s.name,
                coolant: s.coolant
              };
            })
        );
      } else {
        if (sys.heat !== heatAdd) {
          App.handleEvent({ id: sys.id, heat: heatAdd }, "addHeat");
        }
      }
    }
  });
  setTimeout(updateHeat, 100 / 3);
};
updateHeat();
