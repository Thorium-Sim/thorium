import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Provider, connect } from 'react-redux';

import SimulatorData from '../components/SimulatorData.jsx';
import StationData from '../components/StationData.jsx';
import CardContainer from './Card.jsx';
import Config from './Config.jsx';
import Lobby from './Lobby.jsx';
import actions from '../actions';
const {presence} = actions;
const {fetchPresence} = presence;

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
}


const routes = [
{
  path:'/app/simulator/:simulatorId/station/:stationId/card/:cardIndex',
  component:CardContainer,
},
{
  path: '/app/simulator/:simulatorId',
  component: StationData,
},
{
  path: '/config',
  component: Config,
},
{
  path: '/app',
  component: SimulatorData,
},
{
  path: '/',
  component: Lobby,
},
{
  path: '*',
  component:NoMatch
}
];


class App extends Component {
  render() {
    return (
      <Router routes={routes} history={browserHistory} />
      );
  }
}

function select(state){
  return {
    data: state
  };
}
const AppData = connect(select)(App);

export default AppData;
