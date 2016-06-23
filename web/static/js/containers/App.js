import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { devTools, persistState, DevTools, DebugPanel, LogMonitor } from 'redux-devtools';

import thoriumApp from '../reducers';
import SimulatorData from '../components/SimulatorData.jsx';
import {StationData} from '../components/StationData.jsx';
import CardContainer from './Card.jsx';

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
  )(createStore);

let store = createStoreWithMiddleware(thoriumApp);

const Dev = () => (
  <div className="jumbotron">
  <h2>Welcome to Thorium</h2>
  <p className="lead"></p>
  <p className="lead">
  <span>
  Seed/Reset RethinkDB: <a href="/reset">Click Here</a>
  </span>
  <br />

  </p>
  </div>
  );

class NoMatch extends Component {
  render(){
    return (<div>No route matches your request. <a href="/">Go Home.</a></div>);
  }
};

class App extends Component {
  render() {
    return (
      <div>
      <Provider store={store}>
      <Router history={browserHistory}>
          <Route path="/" components={SimulatorData} />
          <Route path="simulator">
            <Route path=":simulatorId" component={StationData} />
              <Route path=":simulatorId/station/:stationId/card">
                <Route path=":cardIndex" component={CardContainer} />
              </Route>
            </Route>
          <Route path="*" components={NoMatch}/>
      </Router>
      </Provider>
      </div>
      );
  }
}

export default App;
