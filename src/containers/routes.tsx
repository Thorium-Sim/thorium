import React, {Component} from "react";
import {createBrowserHistory} from "history";
import {Router, Route, Switch, Link} from "react-router-dom";
import {FlightDirector} from "./FlightDirector";
import gql from "graphql-tag.macro";
import {useApolloClient} from "@apollo/client";

const Client = React.lazy(() => import("../components/client"));
const Config = React.lazy(() => import("./config"));
const Releases = React.lazy(() => import("./FlightDirector/releases"));

const history = createBrowserHistory();

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

declare global {
  interface Window {
    thorium: any;
  }
}

const App: React.FC = () => {
  const client = useApolloClient();
  React.useEffect(() => {
    const unsubscribe = client
      .subscribe({
        query: CLOCK_SYNC,
      })
      .subscribe({
        next: ({data: {clockSync}}) => {
          // This magic number is the round-trip offset. Could be better, but this works for now.
          window.thorium.clockSync = parseInt(clockSync, 10) - Date.now() + 400;
        },
        error(err) {
          console.error("Error resetting cache", err);
        },
      });

    return () => unsubscribe.unsubscribe();
  }, [client]);

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" children={<Config />} />
        <Route path="/releases" exact children={<Releases />} />

        <Route path="/client" children={<Client />} />
        <Route
          path="/config/flight/:flightId/core"
          children={<FlightDirector />}
        />
        <Route path="/config/:comp" children={<Config />} />
        <Route path="/config/flight" children={<Config />} />

        <Route path="*" children={<NoMatch />} />
      </Switch>
    </Router>
  );
};

export default App;
