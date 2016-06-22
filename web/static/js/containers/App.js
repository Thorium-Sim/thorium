import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { addTypenameToSelectionSet } from 'apollo-client/queries/queryTransform';
import { registerGqlTag } from 'apollo-client/gql';
import { ApolloProvider } from 'react-apollo';

import SimulatorData from '../components/SimulatorData.jsx';
import {StationData} from '../components/StationData.jsx';
import CardContainer from './Card.jsx';
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

const Dev = () => (
  <div className="jumbotron">
  <h2>Welcome to Thorium</h2>
  <p className="lead"></p>
  <p className="lead">
  <span>
  Seed/Reset RethinkDB: <a href="/reset">Click Here</a>
  </span>
  <br />
  <span>
  Try out GraphiQL: <a href="/graphql">Click Here</a>
  </span>
  </p>
  </div>
  );

const NoMatch = () => (<div>No route matches your request. <a href="/">Go Home.</a></div>);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <Router history={browserHistory}>
          <Route path="/" components={SimulatorData} />
          <Route path="simulator">
            <Route path=":simulatorId" component={StationData} />
              <Route path=":simulatorId/station/:stationId/card">
                <Route path=":cardIndex" component={CardContainer} />
              </Route>
            </Route>
          <Route path="*" components={NoMatch}/>
      </Router>
      </ApolloProvider>
      );
  }
}

export default App;
