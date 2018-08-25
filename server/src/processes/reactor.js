import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import throttle from "../helpers/throttle";
import uuid from "uuid";

const throttles = {};

const triggerWarning = sys => {
  if (!throttles[sys.id]) {
    throttles[sys.id] = throttle(sys => {
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: sys.simulatorId,
        type: "Reactor",
        station: "Core",
        title: `Dilithium Crystal Stress`,
        body: "",
        color: "danger"
      });
      App.handleEvent(
        {
          simulatorId: sys.simulatorId,
          component: "ReactorControlCore",
          title: `Dilithium Crystal Stress`,
          body: null,
          color: "danger"
        },
        "addCoreFeed"
      );
    }, 10 * 1000);
  }
  return throttles[sys.id];
};

const calcStressLevel = ({
  alphaTarget,
  betaTarget,
  alphaLevel,
  betaLevel
}) => {
  const alphaDif = Math.abs(alphaTarget - alphaLevel);
  const betaDif = Math.abs(betaTarget - betaLevel);
  const stressLevel = alphaDif + betaDif > 100 ? 100 : alphaDif + betaDif;
  return stressLevel;
};

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
          const { efficiency, externalPower, heatRate, heat } = reactor;
          if (externalPower) return reactor.setHeat(heat - 0.005);
          const minute30 = 30 * 60;
          const standardHeat = Math.pow(efficiency, 2) / minute30;
          const unblanaceHeat = Math.abs(Math.cbrt(level - oldLevel)) / 5000;
          reactor.setHeat(heat + (standardHeat + unblanaceHeat) * heatRate);
        });

        //Reduce the batteries by the amount left over
        //Each battery takes the remaining load evenly
        //If level is a negative number, charge the batteries
        batteries.forEach(batt => {
          const charge = level * (batt.batteryChargeRate / 40);

          const newLevel = Math.min(
            1,
            Math.max(0, batt.batteryChargeLevel - charge)
          );
          batt.setDepletion(batt.batteryChargeLevel / charge);
          //Trigger the event
          if (newLevel !== batt.batteryChargeLevel) {
            App.handleEvent(
              { id: batt.id, level: newLevel },
              "reactorBatteryChargeLevel"
            );
          }
        });

        // Update the dilithium stress levels
        // See if we have the dilithium stress card

        if (
          sim.stations.find(s =>
            s.cards.find(c => c.component === "DilithiumStress")
          )
        ) {
          const dilithiumSys = systems[0];
          if (!dilithiumSys) return;
          let { alphaLevel, betaLevel, alphaTarget, betaTarget } = dilithiumSys;
          const alphaDif = alphaTarget - alphaLevel;
          const betaDif = betaTarget - betaLevel;
          if (alphaDif <= 0) alphaTarget -= 0.1;
          else alphaTarget += 0.1;
          if (betaDif <= 0) betaTarget -= 0.1;
          else betaTarget += 0.1;
          if (alphaTarget > 100 || alphaTarget < 0)
            alphaTarget = Math.round(Math.random() * 100);
          if (betaTarget > 100 || betaTarget < 0)
            betaTarget = Math.round(Math.random() * 100);
          dilithiumSys.updateDilithiumStress({ alphaTarget, betaTarget });
          const stressLevel = calcStressLevel({
            alphaLevel,
            betaLevel,
            alphaTarget,
            betaTarget
          });
          if (stressLevel > 90 && !dilithiumSys.alerted) {
            // It's too high of a stress level. Mark the alert and trigger a notification
            // Use a throttle so the warning doesn't happen too often
            triggerWarning(dilithiumSys)(dilithiumSys);
            dilithiumSys.alerted = true;
          }
          if (stressLevel < 30) {
            dilithiumSys.alerted = false;
          }
        }
      });
  });
  setTimeout(updateReactor, 1000);
};
let count = 0;
// This one is for cooling - not affected by flight paused status
function reactorHeat() {
  const reactors = App.systems.filter(
    s => s.type === "Reactor" && s.model === "reactor" && s.cooling === true
  );
  reactors.forEach(r => {
    if ((r.coolant === 0 || r.heat === 0) && r.cool) r.cool(false);
    else {
      r.setCoolant(Math.min(1, Math.max(0, r.coolant - 0.005)));
      r.setHeat(Math.min(1, Math.max(0, r.heat - 0.01)));
    }
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
  if (reactors.length > 0 || count > 30) {
    count = 0;
    pubsub.publish(
      "reactorUpdate",
      App.systems.filter(s => s.type === "Reactor")
    );
  }
  count++;
  setTimeout(reactorHeat, 1000 / 30);
}
updateReactor();
reactorHeat();
