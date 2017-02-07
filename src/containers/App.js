import React, { Component, PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import {Signin, Register, Forgot, PasswordReset} from '../components/Accounts.jsx';
//import UserAdmin from '../components/admin/Users.jsx';
import CardContainer from './Card.jsx';
import Config from './Config';
import Lobby from './Lobby';
import Client from '../components/Client.jsx';

const TestCard = (props) => {
  return <CardContainer test={true} component={props.params.component} />
};
TestCard.propTypes = {
  params: PropTypes.object,
};

class NoMatch extends Component {
  render(){
    return (<div>No route matches your request. <a href="/">Go Home.</a></div>);
  }
}

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
  path: "/reset_password/:resetLink",
  component: PasswordReset
},
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
