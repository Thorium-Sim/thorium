import * as queries from './queries';
import * as mutations from './mutations';
import * as subscriptions from './subscriptions';
import * as types from './types';


export default `
#Types definition
${Object.keys(types).map((type) => {
  return types[type];
}).reduce((prev, next) => {
  return prev + next;
}, '')}

#Queries definition
type Query {
  simulators(template: Boolean, id: String): [simulator]
  stations(name: String): [stationset]
  missions: [mission]
  flights: [flight]
  sessions: [session]
  users(id: String, token: String, email: String): [user]
  clients: [client]
  ${Object.keys(queries).map(query => queries[query])}
}

#Mutations definition
type Mutation {
  addSimulator(id: String, 
  name: String, 
  alertlevel: String, 
  layout: String, timeline:String): [simulator]
  clientConnect(id: ID!, flightId: ID, simulatorId: ID, station: ID, loginName: String, loginState: Boolean): String
  clientDisconnect(id: ID!): String
  ${Object.keys(mutations).map(mutation => mutations[mutation])}
}

#Subscriptions definition
type Subscription {
  simulator: String
  postUpvoted: String
  ${Object.keys(subscriptions).map(subscription => subscriptions[subscription])}
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;

