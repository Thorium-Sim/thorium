import { EngineQueries, EngineMutations, EngineSubscriptions } from './engines';
import { ShieldQueries, ShieldMutations, ShieldSubscriptions } from './shields';
import { ClientQueries, ClientMutations, ClientSubscriptions } from './clients';
import { SimulatorQueries, SimulatorMutations, SimulatorSubscriptions } from './simulators';

const queryMap = Object.assign({},
  SimulatorQueries,
  ClientQueries,
  ShieldQueries,
  EngineQueries
  );

const mutationMap = Object.assign({},
  SimulatorMutations,
  ClientMutations,
  ShieldMutations,
  EngineMutations
  );

const subscriptionMap = Object.assign({},
  SimulatorSubscriptions,
  ClientSubscriptions,
  ShieldSubscriptions,
  EngineSubscriptions
  );

export default {
  Query: queryMap,
  Mutation: mutationMap,
  Subscription: subscriptionMap,
};
