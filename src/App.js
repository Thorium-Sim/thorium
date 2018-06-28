import React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./helpers/graphqlClient";
import Routes from "./containers/routes";
import ErrorBoundary from "./helpers/errorBoundary";
import EasterEgg from "./helpers/easter-egg";
import IntlProvider from "./helpers/intl";
import "./app.css";

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <IntlProvider>
      <ErrorBoundary>
        <Routes />
        <EasterEgg />
      </ErrorBoundary>
    </IntlProvider>
  </ApolloProvider>
);

export default ApolloApp;
