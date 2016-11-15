/*import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { addTypenameToSelectionSet } from 'apollo-client/queries/queryTransform';
import fetch from 'node-fetch-polyfill';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3001/graphql',
  opts: {
    mode: 'cors',
  },
});

export default new ApolloClient({
  networkInterface,
  queryTransformer: addTypenameToSelectionSet,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  },
});
*/