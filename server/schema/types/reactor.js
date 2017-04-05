export default `
type Reactor {
  id: ID
  simulatorId: ID
  type: String
  name: String
  heat: Float
  coolant: Coolant
  damage: Damage
  #One of 'reactor' or 'battery'
  type: String
  ejected: Boolean
  powerOutput: Int
  efficiency: Float
  powerMode: String
  batteryChargeLevel: Float
  batteryChargeRate: Float
}
`;
