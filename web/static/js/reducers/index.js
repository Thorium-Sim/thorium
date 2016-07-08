import simulators from './simulators';
import stations from './stations';
import cards from './cards';
import presence from './presence';
import assets from './assets';

import { combineReducers } from 'redux';

const thoriumApp = combineReducers({
  simulators,
  stations,
  cards,
  presence,
  assets,
});

export default thoriumApp;
