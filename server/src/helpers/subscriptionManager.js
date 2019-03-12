import { PubSub } from "apollo-server-express";

const pubsub = new PubSub();

pubsub.ee.setMaxListeners(150);

export { pubsub };
