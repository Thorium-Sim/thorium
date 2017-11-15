import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

const updateVelocity = () => {
  App.systems
    .filter(
      sys =>
        sys.type === "Engine" && sys.useAcceleration === true && sys.on === true
    )
    .forEach(sys => {
      const maxSpeed = sys.speeds.reduce((prev, next) => {
        if (next.velocity > prev) return next.velocity;
      }, 0);
      const sim = App.simulators.find(s => s.id === sys.simulatorId);
      /*
      Full Impulse is 7.5 x 10^7 m/s
      Or  75,000 km/s
      Speeds:
        1. 1,250 km/s^2
        2. 2,500 km/s^2
        3. 5,000 km/s^2
        4.10,000 km/s^2*/
      const speed = Math.round(
        sim.ship.speed + sys.acceleration * sys.speedFactor
      );
      sim.ship.speed = Math.min(maxSpeed, Math.max(0, speed));
      pubsub.publish("engineUpdate", sys);
    });
  setTimeout(updateVelocity, 250);
};
updateVelocity();
