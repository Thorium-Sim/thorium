import simulators from './simulators';
import stations from './stations';
import cards from './cards';
import presence from './presence';
import { combineReducers } from 'redux';

const thoriumApp = combineReducers({
  simulators,
  stations,
  cards,
  presence
});

export default thoriumApp;
