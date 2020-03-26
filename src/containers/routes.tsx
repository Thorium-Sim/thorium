import React, {Component} from "react";
import {createBrowserHistory} from "history";
import {Router, Route, Routes, Link, useLocation} from "react-router-dom";
import gql from "graphql-tag.macro";
import {useApolloClient} from "@apollo/client";
import "./config.scss";
import TrainingContextProvider from "./TrainingContextProvider";
import SideNav from "./FlightDirector/sideNav";
import {FlightDirector, ClientsLobby, FlightConfig} from "./FlightDirector";

const Client = React.lazy(() => import("../components/client"));
const Config = React.lazy(() => import("./config"));
const Releases = React.lazy(() => import("./FlightDirector/releases"));
const Welcome = React.lazy(() => import("./FlightDirector/Welcome/Welcome"));

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

const FlightDirectorContainer: React.FC = () => {
  const location = useLocation();
  const isCore = location.pathname.includes("/core");
  return (
    <TrainingContextProvider>
      <div className="config-container">
        {!isCore && <SideNav />}

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="flight/:flightId/core" element={<FlightDirector />} />
          <Route path="flight" element={<FlightConfig />} />
          <Route path="flight/:flightId" element={<ClientsLobby />} />
          <Route path="config/*" element={<Config />} />
          <Route path="releases" element={<Releases />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </TrainingContextProvider>
  );
};

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
      <Routes>
        <Route path="client" element={<Client />} />

        <Route path="/*" element={<FlightDirectorContainer />} />
      </Routes>
    </Router>
  );
};

export default App;
