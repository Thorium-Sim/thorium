export default `
type Mutation {
  addSimulator(id: String, 
  name: String, 
  alertlevel: String, 
  layout: String, timeline:String): [simulator]
  clientConnect(id: ID!, flightId: ID, simulatorId: ID, station: ID, loginName: String, loginState: Boolean): String
  clientDisconnect(id: ID!): String
}`;
