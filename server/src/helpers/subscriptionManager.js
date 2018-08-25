import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

pubsub.ee.setMaxListeners(150);

export { pubsub };
