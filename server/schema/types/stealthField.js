export default `
type StealthField {
  id: ID
  simulatorId: ID
  type: String
  power: Power
  damage: Damage
  name: String
  displayName:String  
  activated: Boolean,
  charge: Boolean,
  state: Boolean,
  quadrants: StealthQuad
  locations: [Room]
}

type StealthQuad {
  fore: Float
  aft: Float
  port: Float
  starboard: Float
}
`;
