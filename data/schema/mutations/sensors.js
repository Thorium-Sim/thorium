export default `
addSensorsArray(simulatorId: ID!): String
removeSensorsArray(id: ID!): String
sensorScanRequest(id: ID!, request: String!): String
sensorScanResult(id: ID!, result: String!): String
processedData(id: ID!, data: String!): String
createSensorContact(id: ID!, contact: SensorContactInput!): String
moveSensorContact(id: ID!, contact: SensorContactInput!): String
removeSensorContact(id: ID!, contact: SensorContactInput!): String
destroySensorContact(id: ID!, contact: SensorContactInput!): String
updateSensorContactInfrared(id: ID!, contact: SensorContactInput!): String
updateSensorContactIcon(id: ID!, contact: SensorContactInput!): String
updateSensorContactName(id: ID!, contact: SensorContactInput!): String
updateSensorContactPicture(id: ID!, contact: SensorContactInput!): String
`;
