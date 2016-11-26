export default `
type Transporter {
  id: ID
  simulatorId: ID
  type: String
  targets: [TransporterTarget]
  requestedTarget: String
  destination: String
  charge: Float
  state: String
}
type TransporterTarget {
  id: ID
  icon: String
  moving: Boolean
}
`;
