import App from '../app';

const updateHeat = () => {
  App.systems.forEach((sys) => {
    if (sys.type === 'Engine') {
      const speedVal = sys.on ? sys.speed : -10;
      const heatAdd = speedVal * sys.heatRate;
      const sysHeat = sys.heat;
      if (sysHeat + heatAdd >= 0 && sysHeat + heatAdd <= 100 && heatAdd !== 0) {
        App.handleEvent({ id: sys.id, heat: heatAdd }, 'addHeat', 'addedHeat');
      }
    }
  });
  setTimeout(updateHeat, 100);
};
updateHeat();
