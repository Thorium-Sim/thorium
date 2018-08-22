export default `
type Thruster {
  id: ID
  name: String
  type: String
  simulatorId: ID
  direction: Coordinates
  rotation: Rotation
  rotationDelta: Rotation
  rotationRequired: Rotation
  manualThrusters: Boolean
  power: Power
  damage: Damage
  rotationSpeed:Float
  movementSpeed:Float
}
type Coordinates {
  x: Float
  y: Float
  z: Float
}
type Rotation {
  yaw: Float
  pitch: Float
  roll: Float
}
input RotationInput {
  yaw: Float
  pitch: Float
  roll: Float
}
input DirectionInput {
  x: Float
  y: Float
  z: Float
}
`;
