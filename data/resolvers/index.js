import { EngineQueries, EngineMutations, EngineSubscriptions } from './engines';
import { ShieldQueries, ShieldMutations, ShieldSubscriptions } from './shields';
import { ClientQueries, ClientMutations, ClientSubscriptions } from './clients';
import { SimulatorQueries, SimulatorMutations, SimulatorSubscriptions } from './simulators';
import { ThrustersQueries, ThrustersMutations, ThrustersSubscriptions } from './thrusters';
import { AssetsQueries, AssetsMutations, AssetsSubscriptions, AssetsTypes } from './assets';


function parseJSONLiteral(ast) {
  console.log(ast);
  /*switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.forEach(field => {
        value[field.name.value] = parseJSONLiteral(field.value);
      });
      return value;
    }
    case Kind.LIST:
      return ast.values.map(parseJSONLiteral);
    default:
      return null;
  }*/
}

const queryMap = Object.assign({},
  SimulatorQueries,
  ClientQueries,
  ShieldQueries,
  EngineQueries,
  ThrustersQueries,
  AssetsQueries
  );

const mutationMap = Object.assign({},
  SimulatorMutations,
  ClientMutations,
  ShieldMutations,
  EngineMutations,
  ThrustersMutations,
  AssetsMutations
  );

const subscriptionMap = Object.assign({},
  SimulatorSubscriptions,
  ClientSubscriptions,
  ShieldSubscriptions,
  EngineSubscriptions,
  ThrustersSubscriptions,
  AssetsSubscriptions
  );

export default Object.assign({
  Query: queryMap,
  Mutation: mutationMap,
  Subscription: subscriptionMap,
  UploadedFile: {
    __parseLiteral: parseJSONLiteral,
    __serialize: value => value,
    __parseValue: value => value,
  },
}, AssetsTypes);
