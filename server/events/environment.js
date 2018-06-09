import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
App.on("updateEnvironment", ({ deckID, environment }) => {
  const deck = App.decks.find(d => d.id === deckID);
  const env = deck.environment;
  if (!env) return;
  env.update(environment);
  pubsub.publish("decksUpdate", App.decks);
});
