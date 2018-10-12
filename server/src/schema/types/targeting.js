export default `
type Targeting {
  id: ID
  simulatorId: ID
  type: String
  name: String
  displayName:String  
  power: Power
  damage: Damage
  contacts: [TargetingContact]
  classes: [TargetingClass]
  quadrants: Boolean
  range: Float
  coordinateTargeting: Boolean
  interference: Float
  targetedSensorContact: SensorContact
  calculatedTarget:StringCoordinates
  enteredTarget:StringCoordinates
}

type StringCoordinates {
  x: String
  y: String
  z: String
}

input StringCoordinatesInput {
  x: String
  y: String
  z: String
}
type TargetingClass {
  id: ID
  name: String
  size: Float
  icon: String
  picture: String
  speed: Float
  quadrant: Int
  moving: Boolean
}

input TargetClassInput {
  id: ID
  name: String
  size: Float
  icon: String
  picture: String
  speed: Float
  quadrant: Int
  moving: Boolean
}

type TargetingContact {
  id: ID
  class: ID
  name: String
  size: Float
  targeted: Boolean
  system: String
  icon: String
  picture: String
  speed: Float
  quadrant: Int
  destroyed: Boolean
  moving: Boolean
}
`;
