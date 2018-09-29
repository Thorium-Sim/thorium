export default `
type Transporter {
  id: ID
  simulatorId: ID
  type: String
  name: String
  targets: [TransporterTarget]
  requestedTarget: String
  destination: String
  charge: Float
  state: String
  power: Power
  damage: Damage
  chargeSpeed: Float
}
type TransporterTarget {
  id: ID
  icon: String
  moving: Boolean
  position: Coordinates
}
input TransporterInput {
  id: ID
  simulatorId: ID
  requestedTarget: String
  destination: String
  charge: Float
  state: String
}
`;
