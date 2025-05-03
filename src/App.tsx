import React from "react";
import {ApolloProvider} from "@apollo/client";
import client from "./helpers/graphqlClient";
import Routes from "./containers/routes";
import ErrorBoundary from "./helpers/errorBoundary";
import EasterEgg from "./helpers/easter-egg";
import "./app.scss";
import "./fonts.scss";

const ApolloApp = () => (
  <React.Suspense fallback="Loading...">
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <Routes />
        <EasterEgg />
      </ErrorBoundary>
    </ApolloProvider>
  </React.Suspense>
);

export default ApolloApp;
