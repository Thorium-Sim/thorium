export default `
#Macro: Add sensors system to simulator TODO: ADD ARGS
addSensorsArray(simulatorId: ID!): String
removeSensorsArray(id: ID!): String
sensorScanRequest(id: ID!, request: String!): String
sensorScanResult(id: ID!, result: String!): String
processedData(id: ID!, data: String!): String
sensorScanCancel(id: ID!): String
createSensorContact(id: ID!, contact: SensorContactInput!): String
moveSensorContact(id: ID!, contact: SensorContactInput!): String
removeSensorContact(id: ID!, contact: SensorContactInput!): String
destroySensorContact(id: ID!, contact: SensorContactInput!): String
updateSensorContact(id: ID!, contact: SensorContactInput!): String
createSensorArmyContact(id: ID!, contact: SensorContactInput!): String
removeSensorArmyContact(id: ID!, contact: ID!): String
updateSensorArmyContact(id: ID!, contact: SensorContactInput!): String
animateSensorContacact:String
`;
