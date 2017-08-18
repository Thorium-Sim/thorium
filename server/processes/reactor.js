import App from "../../app";

const updateReactor = () => {
  //Loop through all of the simulators to isolate the systems
  App.simulators.forEach(sim => {
    const simId = sim.id;
    let level = App.systems
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
    level = reactors.reduce((prev, next) => {
      const actualOutput = next.powerOutput * next.efficiency;
      return Math.round(level - actualOutput);
    }, level);
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
  setTimeout(updateReactor, 1000);
};
updateReactor();
