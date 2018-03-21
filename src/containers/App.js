import React, { Component } from "react";
import createHistory from "history/createBrowserHistory";
import PropTypes from "prop-types";
import { Router, Route, Switch, Link } from "react-router-dom";
import CardContainer from "./Card";
import Client from "../components/Client";
import TacticalMapCore from "../components/views/TacticalMap";
import DebugList from "./DebugList";
import {
  FlightConfig,
  FlightDirector,
  SetConfig,
  MissionConfig,
  SimulatorConfig,
  AssetConfig,
  Welcome,
  ClientsLobby,
  SoftwarePanels,
  SurveyForms
} from "./FlightDirector";

const history = createHistory();

const TestCard = props => {
  return <CardContainer test={true} component={props.match.params.component} />;
};
TestCard.propTypes = {
  params: PropTypes.object
};

class NoMatch extends Component {
  render() {
    return (
      <div>
        No route matches your request. <a href="/">Go Home.</a>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/client" component={Client} />
          <Route
            path="/flightConfig"
            render={props => <FlightConfig {...props} history={history} />}
          />
          <Route path="/missionConfig" component={MissionConfig} />
          <Route path="/simulatorConfig" component={SimulatorConfig} />
          <Route path="/assetConfig" component={AssetConfig} />
          <Route
            path="/tacticalConfig"
            render={props => {
              return (
                <div style={{ height: "100%" }}>
                  <h4>
                    Tactical Config{" "}
                    <small>
                      <Link to="/">Return to Main</Link>
                    </small>
                  </h4>
                  <TacticalMapCore dedicated={true} {...props} />
                </div>
              );
            }}
          />
          <Route path="/setConfig" component={SetConfig} />
          <Route
            path="/flight/:flightId"
            exact
            render={props => <ClientsLobby {...props} history={history} />}
          />
          <Route
            path="/flight/:flightId/core"
            render={props => <FlightDirector {...props} history={history} />}
          />
          <Route path="/debug" component={DebugList} />
          <Route path="/test" exact component={TestCard} />
          <Route
            path="/softwarePanels"
            render={props => <SoftwarePanels {...props} history={history} />}
          />
          <Route
            path="/surveyForms"
            render={props => <SurveyForms {...props} history={history} />}
          />
          <Route path="/test/:component" component={TestCard} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}
