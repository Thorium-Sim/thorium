export default `
type Targeting {
  id: ID
  simulatorId: ID
  type: String
  name: String
  power: Power
  damage: Damage
  contacts: [TargetingContact]
  classes: [TargetingClass]
  quadrants: Boolean
}

type TargetingClass {
  id: ID
  name: String
  size: Float
  icon: String
  picture: String
  iconUrl: String
  pictureUrl: String
  speed: Float
  quadrant: Int
}

input TargetClassInput {
  id: ID
  name: String
  size: Float
  icon: String
  picture: String
  iconUrl: String
  pictureUrl: String
  speed: Float
  quadrant: Int
}

type TargetingContact {
  id: ID
  class: ID
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
`;