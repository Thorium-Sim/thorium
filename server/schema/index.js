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
  #Macro: Add a system to a simulator
  snapshot: String
  #Macro: Add a system to a simulator
  addSystem(
  #{
    #   "content":"Simulator",
    #   "type":"select",
    #   "query": "simulators(template: false){id, name}",
    #   "queryName": "simulators",
    #   "key":"id",
    #   "value":"name"
    #
    #}
  simulatorId: ID): String
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
