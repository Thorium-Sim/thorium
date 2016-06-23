import simulators from './simulators';
import stations from './stations';
import cards from './cards';

import { combineReducers } from 'redux';

const thoriumApp = combineReducers({
  simulators,
  stations,
  cards
});

export default thoriumApp;
