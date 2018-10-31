import GraphQLJSON from "graphql-type-json";
import queryMap from "./queries";
import mutationMap from "./mutations";
import subscriptionMap from "./subscriptions";
import types from "./types";

export default Object.assign(
  {
    JSON: GraphQLJSON,
    Query: queryMap,
    Mutation: mutationMap,
    Subscription: subscriptionMap
  },
  types
);
