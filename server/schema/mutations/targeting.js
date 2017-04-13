export default `
  createTargetingContact(id: ID!, target: TargetInput):String
  targetTargetingContact(id: ID!, targetId: ID!):String
  untargetTargetingContact(id: ID!, targetId: ID!):String
  targetSystem(id: ID!, targetId: ID!, system: String!):String
  updateTarget(id: ID!, target: TargetInput):String
  removeTarget(id: ID!, targetId: ID!):String
`;
