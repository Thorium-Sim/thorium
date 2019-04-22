import App from "../app";

const interval = 1000 / 20;
function crmContactMove() {
  App.flights
    .filter(f => f.running === true)
    .forEach(f => {
      f.simulators
        .map(s => App.simulators.find(ss => ss.id === s))
        .forEach(simulator => {
          const crm = App.systems.find(
            s => s.simulatorId === simulator.id && s.class === "Crm"
          );
          if (!crm) return;

          crm.enemies.forEach(e => {
            e.velocity = {
              x: Math.max(e.maxVelocity * -1, Math.min(e.maxVelocity, e.velocity.x + Math.random() - 0.5)),
              y: Math.max(e.maxVelocity * -1, Math.min(e.maxVelocity,e.velocity.y + Math.random() - 0.5)),
              z: Math.max(e.maxVelocity * -1, Math.min(e.maxVelocity,e.velocity.z + Math.random() - 0.5))
            };
            e.position = {
              x: Math.min(1000, Math.max(-1000, e.position.x + e.velocity.x)),
              y: Math.min(1000, Math.max(-1000,e.position.y + e.velocity.y)),
              z: Math.min(1000, Math.max(-1000,e.position.z + e.velocity.z))
            };
            console.log(e);
          });
        });
    });
  setTimeout(crmContactMove, interval);
}

crmContactMove();
