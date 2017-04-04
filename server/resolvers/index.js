import { EngineQueries, EngineMutations, EngineSubscriptions } from './engines';
import { ShieldQueries, ShieldMutations, ShieldSubscriptions } from './shields';
import { ClientQueries, ClientMutations, ClientSubscriptions, ClientTypes } from './clients';
import { FlightStructureQueries, FlightStructureMutations, FlightStructureSubscriptions, FlightStructureTypes } from './flightStructure';
import { ThrustersQueries, ThrustersMutations, ThrustersSubscriptions } from './thrusters';
import { AssetsQueries, AssetsMutations, AssetsSubscriptions, AssetsTypes } from './assets';
import { TransporterQueries, TransporterMutations, TransporterSubscriptions } from './transporters';
import { CoreLayoutQueries, CoreLayoutMutations, CoreLayoutSubscriptions } from './coreLayouts';
import { SensorsQueries, SensorsMutations, SensorsSubscriptions, SensorsTypes } from './sensors';
import { ShipStructureQueries, ShipStructureMutations, ShipStructureSubscriptions, ShipStructureTypes } from './shipStructure';
import { LRCommQueries, LRCommMutations, LRCommSubscriptions } from './lrComm';
import { InternalCommQueries, InternalCommMutations, InternalCommSubscriptions } from './internalComm';
import { SystemsQueries, SystemsMutations, SystemsSubscriptions, SystemsTypes } from './systems';
import { NavigationQueries, NavigationMutations, NavigationSubscriptions} from './navigation';
import { ShortRangeCommQueries, ShortRangeCommMutations, ShortRangeCommSubscriptions} from './shortRangeComm';

import App from '../../app';

function parseJSONLiteral(ast) {
  console.log(ast);
  /* switch (ast.kind) {
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
    FlightStructureQueries,
    ClientQueries,
    ShieldQueries,
    EngineQueries,
    ThrustersQueries,
    AssetsQueries,
    TransporterQueries,
    CoreLayoutQueries,
    SensorsQueries,
    ShipStructureQueries,
    LRCommQueries,
    InternalCommQueries,
    SystemsQueries,
    NavigationQueries,
    ShortRangeCommQueries
    );

  export const mutationMap = Object.assign({
    snapshot() {
      App.snapshot(true);
    },
  },
    FlightStructureMutations,
    ClientMutations,
    ShieldMutations,
    EngineMutations,
    ThrustersMutations,
    AssetsMutations,
    TransporterMutations,
    CoreLayoutMutations,
    SensorsMutations,
    ShipStructureMutations,
    LRCommMutations,
    InternalCommMutations,
    SystemsMutations,
    NavigationMutations,
    ShortRangeCommMutations
    );

  const subscriptionMap = Object.assign({},
    FlightStructureSubscriptions,
    ClientSubscriptions,
    ShieldSubscriptions,
    EngineSubscriptions,
    ThrustersSubscriptions,
    AssetsSubscriptions,
    TransporterSubscriptions,
    CoreLayoutSubscriptions,
    SensorsSubscriptions,
    ShipStructureSubscriptions,
    LRCommSubscriptions,
    InternalCommSubscriptions,
    SystemsSubscriptions,
    NavigationSubscriptions,
    ShortRangeCommSubscriptions
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
  }, AssetsTypes,
  SensorsTypes,
  FlightStructureTypes,
  ClientTypes,
  ShipStructureTypes,
  SystemsTypes
  );
