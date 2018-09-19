import React, { Component } from "react";
import createHistory from "history/createBrowserHistory";
import PropTypes from "prop-types";
import { Router, Route, Switch, Link } from "react-router-dom";
import CardContainer from "../components/client/Card";
import Client from "../components/client";
import { FlightDirector } from "./FlightDirector";
import Config from "./config";
import Releases from "./FlightDirector/releases";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

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
        No route matches your request. <Link to="/">Go Home.</Link>
      </div>
    );
  }
}

const CLOCK_SYNC = gql`
  subscription ClockSync {
    clockSync
  }
`;

class App extends Component {
  componentDidMount() {
    this.clockSync = this.props.client
      .subscribe({
        query: CLOCK_SYNC
      })
      .subscribe({
        next: ({ loading, data: { clockSync } }) => {
          // This magic number is the round-trip offset. Could be better, but this works for now.
          window.thorium.clockSync = new Date(clockSync) - new Date() + 400;
        },
        error(err) {
          console.error("Error resetting cache", err);
        }
      });
  }
  componentWillUnmount() {
    this.clockSync && this.clockSync.unsubscribe();
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Config} />
          <Route path="/releases" exact render={() => <Releases />} />

          <Route path="/client" component={Client} />
          <Route
            path="/config/flight/:flightId/core"
            render={props => <FlightDirector {...props} history={history} />}
          />
          <Route path="/config/:comp" component={Config} />
          <Route path="/config/flight" component={Config} />
          <Route path="/test" exact component={TestCard} />

          <Route path="/test/:component" component={TestCard} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default withApollo(App);
