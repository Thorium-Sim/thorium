import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Provider, connect } from 'react-redux';

import SimulatorData from '../components/SimulatorData.jsx';
import StationData from '../components/StationData.jsx';
import CardContainer from './Card.jsx';
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

class App extends Component {
  componentDidMount() {
    let { dispatch } = this.props;
    //dispatch(fetchPresence());
  }
  render() {
    return (
      <div>
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
