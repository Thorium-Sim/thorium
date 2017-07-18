export default `
#Macro: Add sensors system to simulator
addSensorsArray(simulatorId: ID!

# {
#   "content":"Domain",
#   "type":"select",
#   "enum":["external", "internal"]
# }
domain: String
): String
removeSensorsArray(id: ID!): String
sensorScanRequest(id: ID!, request: String!): String
sensorScanResult(id: ID!, result: String!): String
processedData(id: ID!, data: String!): String
sensorScanCancel(id: ID!): String
createSensorContact(id: ID!, contact: SensorContactInput!): String
moveSensorContact(id: ID!, contact: SensorContactInput!): String
removeSensorContact(id: ID!, contact: SensorContactInput!): String
removeAllSensorContacts(id: ID!): String
stopAllSensorContacts(id: ID!): String
destroySensorContact(id: ID!, contact: SensorContactInput!): String
updateSensorContact(id: ID!, contact: SensorContactInput!): String
createSensorArmyContact(id: ID!, contact: SensorContactInput!): String
removeSensorArmyContact(id: ID!, contact: ID!): String
updateSensorArmyContact(id: ID!, contact: SensorContactInput!): String
nudgeSensorContacts(id: ID!, amount: CoordinatesInput!, speed: Float!): String
animateSensorContacact:String
`;
