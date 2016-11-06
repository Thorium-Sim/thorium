import queries from './queries.js';
import mutations from './mutations.js';
import subscriptions from './subscriptions.js';
import * as types from './types';


export default `
#Types definition
${Object.keys(types).map((type) => {
  return types[type];
}).reduce((prev, next) => {
  return prev + next;
}, '')}

#Queries definition
${queries}

#Mutations definition
${mutations}

#Subscriptions definition
${subscriptions}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;

