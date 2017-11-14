import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

const updateVelocity = () => {
  App.systems.filter(sys => sys.type === "Engine").forEach(sys => {
    const speedVal = sys.on ? sys.speed : 0;

    /*
      Full Impulse is 7.5 x 10^7 m/s
      Or  75,000 km/s
      Speeds:
        1. 1,250 km/s^2
        2. 2,500 km/s^2
        3. 5,000 km/s^2
        4.10,000 km/s^2*/
  });
  setTimeout(updateVelocity, 500);
};
updateVelocity();
