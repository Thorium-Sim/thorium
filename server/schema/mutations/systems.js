export default `
addSystemToSimulator(simulatorId: ID!, className: String!, params: String!): String
removeSystemFromSimulator(systemId: ID, simulatorId: ID, type: String): String
updateSystemName(systemId: ID!, name: String, displayName: String): String

damageSystem(systemId: ID!, report: String): String
damageReport(systemId: ID!, report: String!): String
repairSystem(systemId: ID!): String
requestDamageReport(systemId: ID!): String
systemReactivationCode(systemId: ID!, station: String!, code: String!): String
systemReactivationCodeResponse(systemId: ID!, response: Boolean!): String
changePower(systemId: ID!, power: Int!): String
changeSystemPowerLevels(systemId: ID!, powerLevels: [Int]!): String
updateSystemRooms(systemId: ID!, locations:[ID]): String
addSystemDamageStep(systemId: ID!, step: DamageStepInput!): String
updateSystemDamageStep(systemId: ID!, step: DamageStepInput!): String
removeSystemDamageStep(systemId: ID!, step: ID!):String
generateDamageReport(systemId: ID!, steps: Int): String

#Macro: Break a system
breakSystem(simulatorId: ID!, type: String!, name: String): String

#Macro: Fix a system
fixSystem(simulatorId: ID!, type: String!, name: String): String

`;
