import { PubSub } from "apollo-server-express";

const pubsub = new PubSub();

pubsub.ee.setMaxListeners(250);

export { pubsub };
