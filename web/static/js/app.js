// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";

// Import local files
import React from 'react';
import { render } from 'react-dom';
import guid from './helpers/guid';
import App from './containers/App';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { addTypenameToSelectionSet } from 'apollo-client/queries/queryTransform';
import { registerGqlTag } from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';


//Set a clientId for the client
let clientId = localStorage.getItem('thorium_clientId');
if (!clientId) {
  clientId = guid();
  localStorage.setItem('thorium_clientId',clientId);
}

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

  render(
   (<ApolloProvider client={client}>
    <App />
    </ApolloProvider>),
   document.getElementById('app')
   );
