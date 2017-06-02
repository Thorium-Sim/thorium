import { pubsub } from '../helpers/subscriptionManager.js';

export const ActionsQueries = {
  actions() {
    // Return nothing, because we don't care about the query
    return {};
  }
};

// We aren't going to log these as events
export const ActionsMutations = {
  flash(root, {stationId, clientId, duration}) {
    pubsub.publish('actionsUpdate', {action: 'flash', stationId, clientId, duration});
  },
  spark(root, {stationId, clientId, duration}) {
    pubsub.publish('actionsUpdate', {action: 'spark', stationId, clientId, duration});
  },
  freak(root, {stationId, clientId, duration}) {
    pubsub.publish('actionsUpdate', {action: 'freak', stationId, clientId, duration});
  },
  beep(root, {stationId, clientId}) {
    pubsub.publish('actionsUpdate', {action: 'beep', stationId, clientId});
  },
  shutdown(root, {stationId, clientId}) {
    pubsub.publish('actionsUpdate', {action: 'shutdown', stationId, clientId});
  },
  restart(root, {stationId, clientId}) {
    pubsub.publish('actionsUpdate', {action: 'restart', stationId, clientId});
  },
  quit(root, {stationId, clientId}) {
    pubsub.publish('actionsUpdate', {action: 'quit', stationId, clientId});
  }
};

export const ActionsSubscriptions = {
  actionsUpdate({action, stationId:toStation, clientId:toClient, duration}, {stationId, clientId}) {
    if (toStation === 'all' || toClient === 'all' 
      || (toStation === stationId && toStation && stationId) 
      || (toClient === clientId && toClient && clientId)) {
      return {action, duration};
  }
}
};
