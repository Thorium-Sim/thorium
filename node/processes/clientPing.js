// Loop through all of the clients and
// check to see if they are still connected
import App from '../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import uuid from 'uuid';

const clientPing = () => {
  let changed = false;
  App.clients.forEach((c) => {
    // Check if the pings are the same first
    if (c.sentPing) {// See if null
      if (c.ping !== c.sentPing) {
        // Didn't send a response. Disconnect it.
        c.disconnect();
        changed = true;
      }
    }
    if (c.connected) {
      const ping = uuid.v4();
      c.setPing(ping);
      pubsub.publish('clientPing', c);
    }
  });
  if (changed) {
    pubsub.publish('clientChanged', App.clients);
  }
  setTimeout(clientPing, 5000);
};
// clientPing();
