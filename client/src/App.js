import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import client from "./helpers/graphqlClient";
import Routes from "./containers/routes";
import ErrorBoundary from "./helpers/errorBoundary";
import EasterEgg from "./helpers/easter-egg";
import IntlProvider from "./helpers/intl";
import "./app.scss";
import "./fonts.scss";

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <IntlProvider>
        <ErrorBoundary>
          <Routes />
          <EasterEgg />
        </ErrorBoundary>
      </IntlProvider>
    </ApolloHooksProvider>
  </ApolloProvider>
);

export default ApolloApp;
