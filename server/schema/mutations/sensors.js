export default `
sensorScanRequest(id: ID!, request: String!): String
sensorScanResult(id: ID!, result: String!): String

#Macro: Send processed data to sensors
processedData(id: ID, simulatorId: ID, domain: String, data: String!): String

sensorScanCancel(id: ID!): String

#Macro: Set a list of preset scan answers and processed data
setPresetAnswers(simulatorId: ID!, domain: String!, presetAnswers: [PresetAnswerInput]!): String

# Sensor Contacts
createSensorContact(id: ID!, contact: SensorContactInput!): String
moveSensorContact(id: ID!, contact: SensorContactInput!): String
removeSensorContact(id: ID!, contact: SensorContactInput!): String
removeAllSensorContacts(id: ID!): String
stopAllSensorContacts(id: ID!): String
destroySensorContact(id: ID!, contact: SensorContactInput!): String
updateSensorContact(id: ID!, contact: SensorContactInput!): String

#Macro: Set a list of army contacts
setArmyContacts(simulatorId: ID!, domain: String!, armyContacts: [SensorContactInput]!):String

createSensorArmyContact(id: ID!, contact: SensorContactInput!): String
removeSensorArmyContact(id: ID!, contact: ID!): String
updateSensorArmyContact(id: ID!, contact: SensorContactInput!): String
nudgeSensorContacts(id: ID!, amount: CoordinatesInput, speed: Float!, yaw: Float): String
setSensorPingMode(id: ID!, mode: PING_MODES):String
pingSensors(id: ID!):String
animateSensorContacact:String

setSensorsHistory(id: ID!, history: Boolean!): String
# For scan history
newSensorScan(id: ID!, scan: SensorScanInput!): String
# For scan history
updateSensorScan(id: ID!, scan: SensorScanInput!): String
# For scan history
cancelSensorScan(id: ID!, scan: ID!):String
`;
