import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import gql from "graphql-tag.macro";
import {useApolloClient, useMutation} from "@apollo/client";
import "./config.scss";
import TrainingContextProvider from "./TrainingContextProvider";
import SideNav from "./FlightDirector/sideNav";
import {FlightDirector, ClientsLobby, FlightConfig} from "./FlightDirector";
import {getClientId} from "helpers/getClientId";
import useInterval from "helpers/hooks/useInterval";

const Client = React.lazy(() => import("../components/client"));
const Config = React.lazy(() => import("./config"));
const Releases = React.lazy(() => import("./FlightDirector/releases"));
const Welcome = React.lazy(() => import("./FlightDirector/Welcome/Welcome"));

class NoMatch extends Component {
  render() {
    return (
      <div>
        No route matches your request. <Link to="/">Go Home.</Link>
      </div>
    );
  }
}

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

const CLOCK_SYNC = gql`
  subscription ClockSync($clientId: ID!) {
    clockSync(clientId: $clientId)
  }
`;
const CLOCK_SYNC_MUTATION = gql`
  mutation SendClockPing($clientId: ID!) {
    clockSync(clientId: $clientId)
  }
`;

function useClockSync() {
  const client = useApolloClient();
  const [clientId, setClientId] = React.useState("");
  const sentTime = React.useRef(0);

  const [clockSync] = useMutation(CLOCK_SYNC_MUTATION, {variables: {clientId}});

  React.useEffect(() => {
    getClientId().then(res => setClientId(res));
  }, []);

  useInterval(() => {
    if (clientId) {
      sentTime.current = Date.now();
      clockSync().catch(() => {});
    }
  }, 5000);
  React.useEffect(() => {
    if (!clientId) return;
    const unsubscribe = client
      .subscribe({
        query: CLOCK_SYNC,
        variables: {clientId},
      })
      .subscribe({
        next: ({data: {clockSync}}) => {
          // This magic number is the round-trip offset. Could be better, but this works for now.
          window.thorium.clockSync = parseInt(clockSync, 10) - sentTime.current;
          window.thorium.roundTrip = Date.now() - sentTime.current;
        },
        error(err) {
          console.error("Error resetting cache", err);
        },
      });

    return () => unsubscribe.unsubscribe();
  }, [client, clientId]);
}

const ClockSync = React.memo(() => {
  useClockSync();
  return null;
});

const App: React.FC = () => {
  return (
    <>
      <ClockSync />
      <Router>
        <Routes>
          <Route path="client" element={<Client />} />

          <Route path="/*" element={<FlightDirectorContainer />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
