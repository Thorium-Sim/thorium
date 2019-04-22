// Regularly send a clock sync message
import { pubsub } from "../helpers/subscriptionManager.js";

function clockSync() {
  pubsub.publish("clockSync");
  setTimeout(clockSync, 5000);
}

clockSync();
