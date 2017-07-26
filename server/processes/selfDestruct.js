import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

const interval = 1000;

const selfDestructCountdown = () => {
  App.simulators.forEach(s => {
    if (typeof s.ship.selfDestructCountdown === 'number' && s.ship.selfDestructCountdown > 0) {
      s.setSelfDestructTime(s.ship.selfDestructCountdown - interval);
      if (s.ship.selfDestructCountdown <= 0 && s.ship.selfDestructAuto) {
        // Get all the clients on this simulator
        App.clients.forEach(c => {
          if (c.simulatorId === s.id) {
            c.setOfflineState('blackout');
          }
        });
        pubsub.publish('clientChanged', App.clients);
      } 
    }
  })
  pubsub.publish('simulatorsUpdate', App.simulators);
  setTimeout(selfDestructCountdown, interval);
}

selfDestructCountdown();