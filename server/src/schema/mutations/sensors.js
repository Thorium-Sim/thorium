export default `
sensorScanRequest(id: ID!, request: String!): String
sensorScanResult(id: ID!, result: String!): String

#Macro: Processed Data
processedData(id: ID, simulatorId: ID, domain: String, data: String!, flash: Boolean): String

sensorScanCancel(id: ID!): String

#Macro: Scan Answers
setPresetAnswers(simulatorId: ID!, domain: String!, presetAnswers: [PresetAnswerInput]!): String

# Sensor Contacts
createSensorContact(id: ID!, contact: SensorContactInput!): String
createSensorContacts(id: ID!, contacts: [SensorContactInput!]!): String
moveSensorContact(id: ID!, contact: SensorContactInput!): String
removeSensorContact(id: ID!, contact: SensorContactInput!): String
removeAllSensorContacts(id: ID!, type: [String]): String
stopAllSensorContacts(id: ID!): String
updateSensorContact(id: ID, simulatorId: ID, contact: SensorContactInput!): String

#Macro: Sensor Contacts
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

toggleSensorsAutoTarget(id: ID!, target: Boolean!):String
toggleSensorsAutoThrusters(id: ID!, thrusters: Boolean!):String
setSensorsInterference(id: ID!, interference: Float!):String
setSensorsSegment(id: ID!, ring: Int!, line: Int! state: Boolean!): String
setAutoMovement(id:ID!, movement:CoordinatesInput!):String
updateSensorContacts(id:ID!, contacts:[SensorContactInput]!):String
destroySensorContact(id:ID!, contact:ID, contacts:[ID]):String
sensorsFireProjectile(simulatorId:ID!, contactId:ID!, speed:Float!, hitpoints:Int!):String
setSensorsDefaultHitpoints(id:ID, simulatorId:ID, hp:Int!):String
setSensorsDefaultSpeed(id:ID, simulatorId:ID, speed:Float!):String
`;
