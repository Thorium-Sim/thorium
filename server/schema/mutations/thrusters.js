export default `
#Macro: Add thruster system to simulator TODO: ADD ARGS
createThrusters(simulatorId: ID!):String
rotationUpdate(id: ID!, rotation: RotationInput, on: Boolean): String
rotationSet(id: ID!, rotation: RotationInput): String
requiredRotationSet(id: ID!, rotation: RotationInput): String
directionUpdate(id: ID!, direction: DirectionInput): String
positionUpdate:String
`;
