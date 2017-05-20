import App from '../../app';

const updatePhasers = () => {
  //Loop through all of the simulators to isolate the systems
  const phaserChargeRate = 1;
  const phaserFireRate = -0.5;
  const phaserDischargeRate = -5;
  App.systems.filter(p => p.type === 'Phasers').forEach(sys => {
    sys.beams.filter(b => b.state !== 'idle').forEach(beam => {
      let rate = phaserChargeRate;
      if (beam.state === 'discharging') rate = phaserDischargeRate;
      if (beam.state === 'firing') rate = phaserFireRate;
      const charge = beam.charge + (rate * 0.1);
      App.handleEvent({id: sys.id, beamId: beam.id, charge}, 'setPhaserBeamCharge')
    })
  })
  setTimeout(updatePhasers, 100);
};
updatePhasers();