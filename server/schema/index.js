import queries from "./queries";
import mutations from "./mutations";
import subscriptions from "./subscriptions";
import types from "./types";

const schema = `
scalar UploadedFile

#Types definition
${types}

type role {
  id: ID
  userId: String
  name: String
}
type user {
  id: ID
  email: String
  token: String
  tokenexpire: Int
  roles: [role]
}

#Queries definition
type Query {
  users(id: String, token: String, email: String): [user]
  ${queries}
}

#Mutations definition
type Mutation {
  #Macro: Trigger a snapshot
  snapshot: String
  ${mutations}
}

#Subscriptions definition
type Subscription {
  ${subscriptions}
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;

export default schema;
