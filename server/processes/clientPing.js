// Loop through all of the clients and
// check to see if they are still connected
import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";

const clientPing = () => {
  App.clients.forEach(c => {
    // if (c.ping) {
    //   c.disconnect();
    // }
    if (c.connected) {
      const ping = uuid.v4();
      c.setPing(ping);
      pubsub.publish("clientPing", c);
    }
  });
  setTimeout(clientPing, 5000);
};
clientPing();
