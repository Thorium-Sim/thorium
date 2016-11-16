import ShortRangeComm from './ShortRangeComm';
import LongRangeComm from './LongRangeComm';
import AdminStations from './AdminStations';
import EngineControl from './EngineControl';
import Thrusters from './Thrusters';
import Navigation from './Navigation';
import Sensors from './Sensors';
import AdminAssets from './AdminAssets';
import ShieldControl from './ShieldControl';

import EngineControlCore from './EngineControl/core';

const Views = {ShortRangeComm,LongRangeComm,AdminStations,AdminAssets,Thrusters,EngineControl,Navigation,Sensors, ShieldControl};

export const Cores = {EngineControlCore};

export default Views;
