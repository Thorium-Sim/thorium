export default `
type CoreLayout {
  id: ID
  simulatorId: ID
  name: String
  x: Int
  y: Int
  h: Int
  w: Int
  objectId: ID
  component: String
}
input CoreLayoutInput {
  id: ID
  simulatorId: ID
  name: String
  x: Int
  y: Int
  w: Int
  h: Int
  objectId: ID
  component: String
}
`;
