import {PubSub} from "graphql-subscriptions";
import EventEmitter from "events";

const ee = new EventEmitter.EventEmitter();
ee.setMaxListeners(250);

const pubsub = new PubSub({eventEmitter: ee});

export {pubsub};
