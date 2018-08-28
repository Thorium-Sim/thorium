export default `
setRailgunAmmo(id:ID!, ammo:Int):String
setRailgunMaxAmmo(id:ID!, ammo:Int!):String
setRailgunAvailableAmmo(id:ID!, ammo:Int!):String
fireRailgun(id:ID!, simulatorId:ID!, contactId:ID):String
loadRailgun(id:ID!):String
`;
