import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, browserHistory } from 'react-router';
import CardContainer from './Card.jsx';
import Client from '../components/Client.jsx';
import DebugList from './DebugList';
import {FlightConfig, FlightDirector, MissionConfig, SimulatorConfig, AssetConfig, Welcome} from './FlightDirector';

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
  path: '/',
  component: Welcome
}, 
{
  path: '/flightConfig',
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
  path: '/assetConfig',
  component: AssetConfig
},
{
  path: '/flight/:flightId',
  component: FlightDirector
},
{
  path: '/debug',
  component: DebugList
},
{
  path: '/test',
  component: TestCard
},
{
  path: '/test/:component',
  component: TestCard
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
