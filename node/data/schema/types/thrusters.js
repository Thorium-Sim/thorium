export default `
type Thruster {
  id: ID
  simulatorId: ID
  direction: Coordinates
  rotation: Rotation
  rotationDelta: Rotation
  rotationRequired: Rotation
  manualThrusters: Boolean
  power: Power
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
