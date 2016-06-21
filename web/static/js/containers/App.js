import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { addTypenameToSelectionSet } from 'apollo-client/queries/queryTransform';
import { registerGqlTag } from 'apollo-client/gql';
import { ApolloProvider } from 'react-apollo';

import SimulatorData from '../components/SimulatorData.jsx';
registerGqlTag();

const client = new ApolloClient({
  networkInterface: createNetworkInterface('/graphql', {
    credentials: 'same-origin',
  }),
  queryTransformer: addTypenameToSelectionSet,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  },
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="jumbotron">
        <h2>Welcome to Thorium</h2>
        <p className="lead"></p>
        <p className="lead">
          <span>
            Seed/Reset RethinkDB: <a href="http://localhost:4000/reset">Click Here</a>
          </span>
          <br />
          <span>
            Try out GraphiQL: <a href="http://localhost:4000/graphql">Click Here</a>
          </span>
        </p>
                <SimulatorData />
      </div>
      </ApolloProvider>
      );
  }
}

export default App;
