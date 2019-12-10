import App from "../app";
import {pubsub} from "../helpers/subscriptionManager.js";
import Motu from "motu-control";

App.on("motuAdd", ({address}) => {
  const motu = new Motu(address);
  App.motus.push(motu);
  motu.on("changed", () => {
    App.handleEvent(motu, "motuChange");
  });
  pubsub.publish("motu", motu);
  pubsub.publish("motus", App.motus);
});

App.on("motuRemove", ({id}) => {
  App.motus = App.motus.filter(m => m._address !== id);
  pubsub.publish("motus", App.motus);
});

// An event for when the Motu's event emitter fires off.
App.on("motuChange", motu => {
  pubsub.publish("motu", motu);
  pubsub.publish("motus", App.motus);
});
