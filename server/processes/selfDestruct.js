import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

const interval = 1000;

const selfDestructCountdown = () => {
  App.simulators.forEach(s => {
    if (typeof s.ship.selfDestructTime === 'number' && s.ship.selfDestructTime > 0) {
      s.setSelfDestructTime(s.ship.selfDestructTime - interval);
      if (s.ship.selfDestructTime <= 0 && s.ship.selfDestructAuto) {
        // Get all the clients on this simulator
        App.clients.forEach(c => {
          if (c.simulatorId === s.id) {
            c.setOfflineState('blackout');
          }
        });
        pubsub.publish('clientChanged', App.clients);
      } 
    } else {
      s.setSelfDestructTime(null);
    }
  })
  pubsub.publish('simulatorsUpdate', App.simulators);
  setTimeout(selfDestructCountdown, interval);
}

selfDestructCountdown();