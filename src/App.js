import React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./helpers/graphqlClient";
import Routes from "./containers/routes";
import ErrorBoundary from "./helpers/errorBoundary";
import EasterEgg from "./helpers/easter-egg";
import "./app.css";

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <ErrorBoundary>
      <Routes />
      <EasterEgg />
    </ErrorBoundary>
  </ApolloProvider>
);

export default ApolloApp;
