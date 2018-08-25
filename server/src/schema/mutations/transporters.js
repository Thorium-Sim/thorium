export default `
setTransportDestination(transporter: ID!, destination: String!): String
setTransportTarget(transporter: ID!, target: String!): String
beginTransportScan(transporter: ID!): String
cancelTransportScan(transporter: ID!): String
clearTransportTargets(transporter: ID!): String
setTransportCharge(transporter: ID!, charge: Float!): String
completeTransport(transporter: ID!, target: ID!): String
#Macro: Transporters: Set Target Count
setTransporterTargets(transporter: ID!, targets: Int!): String
`;
