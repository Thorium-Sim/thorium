import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Provider, connect } from 'react-redux';

import SimulatorData from '../components/SimulatorData.jsx';
import StationData from '../components/StationData.jsx';
import CardContainer from './Card.jsx';
import actions from '../actions';
const {presence} = actions;
const {fetchPresence} = presence;

const routes = [
{
  path:'/simulator/:simulatorId/station/:stationId/card/:cardIndex',
  component:CardContainer,
},
{
  path: '/simulator/:simulatorId',
  component: StationData,
},
{
  path: '/',
  component: SimulatorData,
},
{
  path: '*',
  component:NoMatch
}
];


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

class App extends Component {
  componentDidMount() {
    let { dispatch } = this.props;
    //dispatch(fetchPresence());
  }
  render() {
    return (
      <div>
      <Router routes={routes} history={browserHistory} />
      {this.props.data.presence.map((p) => (
        <p key={p.clientId}>{`${p.clientId} [${p.metas.length}]`}</p>
        ))}
      </div>
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
