import React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./helpers/graphqlClient";
import App from "./containers/App";
import ErrorBoundary from "./helpers/errorBoundary";
import EasterEgg from "./helpers/easter-egg";
import "./app.css";

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <ErrorBoundary>
      <App />
      <EasterEgg />
    </ErrorBoundary>
  </ApolloProvider>
);

export default ApolloApp;
