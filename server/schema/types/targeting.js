export default `
type Targeting {
  id: ID
  simulatorId: ID
  type: String
  name: String
  power: Power
  damage: Damage
  contacts: [TargetingContact]
  quadrants: Boolean
}

type TargetingContact {
  id: ID
  name: String
  size: Float
  targeted: Boolean
  system: String
  icon: String
  iconUrl: String
  picture: String
  pictureUrl: String
  speed: Float
  quadrant: Int
}

input TargetInput {
  name: String
  size: Float
  targeted: Boolean
  system: String
  icon: String
  picture: String
  speed: Float
  quadrant: Int
}
`;