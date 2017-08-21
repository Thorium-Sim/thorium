import App from "../../app";

const updateHeat = () => {
  App.systems.forEach(sys => {
    if (sys.type === "Engine") {
      const speedVal = sys.on ? sys.speed : -4;
      let heatAdd = Math.min(
        1,
        Math.max(0, sys.heat + speedVal * sys.heatRate * 1 / 1000)
      );
      if (sys.cooling) {
        App.handleEvent({ id: sys.id }, "applyEngineCoolant");
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
