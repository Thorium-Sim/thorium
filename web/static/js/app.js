// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";

// Import local files
import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import thoriumApp from './reducers';
import guid from './helpers/guid';
import App from './containers/App';

//Set a clientId for the client
let clientId = localStorage.getItem('thorium_clientId');
if (!clientId) {
  clientId = guid();
  localStorage.setItem('thorium_clientId',clientId);
}

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
   // loggerMiddleware // neat middleware that logs actions
   )
  )(createStore);

  let store = createStoreWithMiddleware(thoriumApp);

  render(
   (<Provider store={store}>
    <App />
    </Provider>),
   document.getElementById('app')
   );
