export default `
type Shield implements SystemInterface{
  id: ID
  simulatorId: ID
  type: String
  name: String
  displayName: String
  stealthFactor: Float
  heat: Float
  coolant: Float
  position: Int
  power: Power
  frequency: Float
  state: Boolean 
  integrity: Float
  damage: Damage
}
`;
