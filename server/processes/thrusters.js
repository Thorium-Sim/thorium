import App from '../../app';

const updateThrusters = () => {
  App.systems.forEach((sys) => {
    if (sys.type === 'Thrusters' && sys.thrusting === true) {
      const rotationAdd = Object.assign({}, sys.rotation);
      rotationAdd.yaw += sys.rotationDelta.yaw * 3;
      rotationAdd.pitch += sys.rotationDelta.pitch * 3;
      rotationAdd.roll += sys.rotationDelta.roll * 3;
      if (rotationAdd.yaw >= 360) rotationAdd.yaw -= 360;
      if (rotationAdd.pitch >= 360) rotationAdd.pitch -= 360;
      if (rotationAdd.roll >= 360) rotationAdd.roll -= 360;
      if (rotationAdd.yaw < 0) rotationAdd.yaw += 360;
      if (rotationAdd.pitch < 0) rotationAdd.pitch += 360;
      if (rotationAdd.roll < 0) rotationAdd.roll += 360;
      App.handleEvent({id: sys.id, rotation: rotationAdd}, 'rotationSet');
    }
  });
  setTimeout(updateThrusters, 100);
};

updateThrusters();
