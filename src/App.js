import React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./helpers/graphqlClient";
import App from "./containers/App";
import ErrorBoundary from "./helpers/errorBoundary";

import "./app.css";

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </ApolloProvider>
);

export default ApolloApp;
