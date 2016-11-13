import { EngineQueries, EngineMutations, EngineSubscriptions } from './engines';
import { ShieldQueries, ShieldMutations, ShieldSubscriptions } from './shields';
import { ClientQueries, ClientMutations, ClientSubscriptions } from './clients';
import { SimulatorQueries, SimulatorMutations, SimulatorSubscriptions } from './simulators';
import { ThrustersQueries, ThrustersMutations, ThrustersSubscriptions } from './thrusters';

const queryMap = Object.assign({},
  SimulatorQueries,
  ClientQueries,
  ShieldQueries,
  EngineQueries,
  ThrustersQueries
  );

const mutationMap = Object.assign({},
  SimulatorMutations,
  ClientMutations,
  ShieldMutations,
  EngineMutations,
  ThrustersMutations
  );

const subscriptionMap = Object.assign({},
  SimulatorSubscriptions,
  ClientSubscriptions,
  ShieldSubscriptions,
  EngineSubscriptions,
  ThrustersSubscriptions
  );

export default {
  Query: queryMap,
  Mutation: mutationMap,
  Subscription: subscriptionMap,
};
