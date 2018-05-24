export default `
rotationUpdate(id: ID!, rotation: RotationInput, on: Boolean): String
rotationSet(id: ID!, rotation: RotationInput): String
requiredRotationSet(id: ID!, rotation: RotationInput): String
directionUpdate(id: ID!, direction: DirectionInput): String
positionUpdate:String
setThrusterRotationSpeed(id:ID!, speed:Float!):String
setThrusterMovementSpeed(id:ID!, speed:Float):String
`;
