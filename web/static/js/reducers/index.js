import simulators from './simulators';
import stations from './stations';
import cards from './cards';
import presence from './presence';
import systems from './systems';
import assets from './assets';
import missions from './missions';

import { combineReducers } from 'redux';

const thoriumApp = combineReducers({
  simulators,
  stations,
  cards,
  presence,
  systems,
  assets,
  missions,
});

export default thoriumApp;
