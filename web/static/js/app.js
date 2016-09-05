import "phoenix_html";
import React from 'react';
import { render } from 'react-dom';
import guid from './helpers/guid';
import App from './containers/App';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { addTypenameToSelectionSet } from 'apollo-client/queries/queryTransform';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';

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


//Set a clientId for the client
let clientId = localStorage.getItem('thorium_clientId');
if (!clientId) {
  clientId = guid();
  localStorage.setItem('thorium_clientId',clientId);
}


  render(
   (<ApolloProvider client={client}>
    <App />
    </ApolloProvider>),
   document.getElementById('app')
   );
