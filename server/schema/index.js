import * as queries from "./queries";
import * as mutations from "./mutations";
import * as subscriptions from "./subscriptions";
import * as types from "./types";

export default `
scalar UploadedFile

#Types definition
${Object.keys(types)
  .map(type => {
    return types[type];
  })
  .reduce((prev, next) => {
    return prev + next;
  }, "")}

#Queries definition
type Query {
  users(id: String, token: String, email: String): [user]
  ${Object.keys(queries).map(query => queries[query])}
}

#Mutations definition
type Mutation {
  snapshot: String
  ${Object.keys(mutations).map(mutation => mutations[mutation])}
}

#Subscriptions definition
type Subscription {
  ${Object.keys(subscriptions).map(subscription => subscriptions[subscription])}
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;
