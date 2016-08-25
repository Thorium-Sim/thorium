import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Provider, connect } from 'react-redux';
import {Signin, Register, Forgot, PasswordReset} from '../components/Accounts.jsx';
import UserAdmin from '../components/admin/Users.jsx';

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
  path: '/login',
  component: Signin
},
{
  path: '/register',
  component: Register
},
{
  path: '/forgot',
  component: Forgot
},
{
  path: '/admin/users',
  component: UserAdmin
},
{
  path: "/reset_password/:resetLink",
  component: PasswordReset
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

export default class App extends Component {
  render() {
    return (
      <Router routes={routes} history={browserHistory} />
      );
  }
}
