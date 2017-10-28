// import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub } from "graphql-subscriptions";

let date = Date().toString();
let pubs = {};
class PubSubExtended extends PubSub {
  publish(a, b, c) {
    if (process.env.DEBUG) {
      if (date !== Date().toString()) {
        pubs = {};
        date = Date().toString();
      }
      pubs[a] = pubs[a] ? pubs[a] + 1 : 1;
    }
    super.publish(a, b, c);
  }
}

const pubsub = new PubSubExtended();
/*
const pubsub = new RedisPubSub({
  connection: {
    host: 'redis.ralexanderson.com',
    port: 6379,
  },
});*/

pubsub.ee.setMaxListeners(150);

export { pubsub };
