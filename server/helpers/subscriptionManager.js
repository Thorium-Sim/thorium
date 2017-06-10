// import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
/*
const pubsub = new RedisPubSub({
  connection: {
    host: 'redis.ralexanderson.com',
    port: 6379,
  },
});*/

export { pubsub };

