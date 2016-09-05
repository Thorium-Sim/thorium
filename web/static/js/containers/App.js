import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import {Signin, Register, Forgot, PasswordReset} from '../components/Accounts.jsx';
//import UserAdmin from '../components/admin/Users.jsx';
import SimulatorData from '../components/SimulatorData.jsx';
import StationData from '../components/StationData.jsx';
import CardContainer from './Card.jsx';
import Config from './Config.jsx';
import Lobby from './Lobby.jsx';
import Client from '../components/Client.jsx';
import actions from '../actions';
const {presence} = actions;
const {fetchPresence} = presence;

const routes = [
{
  path: '/config',
  component: Config,
},
{
  path: '/app',
  component: Client,
},
{
  path: '/',
  component: Lobby,
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
/* This component is currently broken. Needs fixed.
{
  path: '/admin/users',
  component: UserAdmin
},*/
{
  path: "/reset_password/:resetLink",
  component: PasswordReset
},
{
  path: '*',
  component:NoMatch
}
];

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
