import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
const updateReactor = () => {
  //Loop through all of the simulators to isolate the systems
  App.flights.filter(f => f.running === true).forEach(f => {
    f.simulators
      .map(s => App.simulators.find(sim => sim.id === s))
      .forEach(sim => {
        const simId = sim.id;
        let oldLevel = App.systems
          .filter(s => s.simulatorId === simId)
          .filter(s => s.power.power)
          .reduce((prev, sys) => {
            return prev + sys.power.power;
          }, 0);
        const systems = App.systems.filter(
          s => s.type === "Reactor" && s.simulatorId === simId
        );
        const reactors = systems.filter(s => s.model === "reactor");
        const batteries = systems.filter(s => s.model === "battery");
        //Reduce the level by the amount supplied by the reactors
        const level = reactors.reduce((prev, next) => {
          const actualOutput = next.powerOutput * next.efficiency;
          return Math.round(prev - actualOutput);
        }, oldLevel);

        //Adjust the reactors heat
        reactors.forEach(reactor => {
          const { efficiency, heatRate, heat } = reactor;
          reactor.setHeat(
            heat +
              ((efficiency * heatRate) / (60 * 60) + level / (oldLevel * 1000))
          );
        });

        //Reduce the batteries by the amount left over
        //Each battery takes the remaining load evenly
        //If level is a negative number, charge the batteries
        batteries.forEach(batt => {
          const charge = level * (batt.batteryChargeRate / 1000);
          const newLevel = Math.min(
            1,
            Math.max(0, batt.batteryChargeLevel - charge)
          );
          //console.log('Estimated Time to Depletion:', batt.batteryChargeLevel / charge);
          //Trigger the event
          if (newLevel !== batt.batteryChargeLevel) {
            App.handleEvent(
              { id: batt.id, level: newLevel },
              "reactorBatteryChargeLevel"
            );
          }
        });
      });
  });
  setTimeout(updateReactor, 1000);
};

// This one is for cooling - not affected by flight paused status
function reactorHeat() {
  const reactors = App.systems.filter(
    s => s.type === "Reactor" && s.model === "reactor" && s.cooling === true
  );
  reactors.forEach(r => {
    r.setCoolant(Math.min(1, Math.max(0, r.coolant - 0.005)));
    r.setHeat(Math.min(1, Math.max(0, r.heat - 0.01)));
    if ((r.coolant === 0 || r.heat === 0) && r.cool) r.cool(false);
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
  });
  reactors.length > 0 &&
    pubsub.publish(
      "reactorUpdate",
      App.systems.filter(s => s.type === "Reactor")
    );
  setTimeout(reactorHeat, 1000 / 30);
}
updateReactor();
reactorHeat();
