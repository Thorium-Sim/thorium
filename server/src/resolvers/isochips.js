import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const IsochipsQueries = {};

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Events is tough to return data for mutations
export const IsochipsMutations = {};

export const IsochipsSubscriptions = {};

export const IsochipsTypes = {};
