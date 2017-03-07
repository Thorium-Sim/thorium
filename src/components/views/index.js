import ShortRangeComm from './ShortRangeComm';
import LongRangeComm from './LongRangeComm';
import EngineControl from './EngineControl';
import Thrusters from './Thrusters';
import Navigation from './Navigation';
import Sensors from './Sensors';
import AdminAssets from './AdminAssets';
import ShieldControl from './ShieldControl';
import Transporters from './Transporters';
import Login from './Login';
import SecurityDecks from './SecurityDecks';
import SecurityTeams from './SecurityTeams';
import SecurityScans from './SecurityScans';
import CommDecoding from './CommDecoding';
import Offline from './Offline';

import EngineControlCore from './EngineControl/core';
import TransporterCore from './Transporters/core';
import SensorsGridCore from './Sensors/gridCore';
import SensorsCore from './Sensors/core';
import ShieldControlCore from './ShieldControl/core';
import LRCommCore from './CommDecoding/core';

import ComposerWidget from './LongRangeComm/Composer';


const Views = { Login,
  ShortRangeComm,
  LongRangeComm,
  AdminAssets,
  Thrusters,
  EngineControl,
  Navigation,
  Sensors,
  ShieldControl,
  Transporters,
  SecurityDecks,
  SecurityTeams,
  SecurityScans,
  CommDecoding,
  Offline,
};

export const Widgets = {
  composer: {widget: ComposerWidget, icon: 'pencil-square'},
};

export const Cores = { EngineControlCore,
  TransporterCore,
  SensorsGridCore,
  SensorsCore,
  ShieldControlCore,
  LRCommCore,
};

export default Views;