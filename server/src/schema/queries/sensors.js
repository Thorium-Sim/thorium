export default `
    sensors(simulatorId: ID, domain: String): [Sensors]
    sensor(id:ID!):Sensors
    sensorContacts(simulatorId: ID, sensorsId: ID, hostile: Boolean, type: String): [SensorContact]
`;
