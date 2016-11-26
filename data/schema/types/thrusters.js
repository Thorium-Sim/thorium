export default `
type Thruster {
  id: ID
  simulatorId: ID
  direction: Direction
  rotation: Rotation
  rotationDelta: Rotation
  rotationRequired: Rotation
  manualThrusters: Boolean
}
type Direction {
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
