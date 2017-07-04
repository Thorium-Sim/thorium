import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, browserHistory } from 'react-router';
//import { Signin, Register, Forgot, PasswordReset } from '../components/Accounts.jsx';
// import UserAdmin from '../components/admin/Users.jsx';
import CardContainer from './Card.jsx';
//import Config from './Config';
import Lobby from './Lobby';
import Client from '../components/Client.jsx';
import {FlightConfig, FlightDirector, MissionConfig, SimulatorConfig, Welcome} from './FlightDirector';

const TestCard = (props) => {
  return <CardContainer test={true} component={props.params.component} />;
};
TestCard.propTypes = {
  params: PropTypes.object,
};

class NoMatch extends Component {
  render() {
    return (<div>No route matches your request. <a href="/">Go Home.</a></div>);
  }
}

const routes = [
{
  path: '/client',
  component: Client,
},
{
  path: '/lobby',
  component: Lobby,
},
{
  path: '/',
  component: Welcome
}, 
{
  path: '/flight/config/:flightId',
  component: FlightConfig
},
{
  path: '/missionConfig',
  component: MissionConfig
},
{
  path: '/simulatorConfig',
  component: SimulatorConfig
},
{
  path: '/flight/:flightId',
  component: FlightDirector
},
/*{
  path: '/login',
  component: Signin
},
{
  path: '/register',
  component: Register
},
{
  path: "/reset_password/:resetLink",
  component: PasswordReset
},
{
  path: '/forgot',
  component: Forgot
},*/
{
  path: '/test',
  component: TestCard
},
{
  path: '/test/:component',
  component: TestCard
},
/* This component is currently broken. Needs fixed.
{
  path: '/admin/users',
  component: UserAdmin
},*/
{
  path: '*',
  component:NoMatch
}
];

export default class App extends Component {
  render() {
    return (
      <Router routes={routes} history={browserHistory} />
      );
  }
}
