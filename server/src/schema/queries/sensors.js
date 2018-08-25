export default `
    sensors(simulatorId: ID, domain: String): [Sensors]
    sensor(id:ID!):Sensors
    sensorContacts(sensorsId: ID): [SensorContact]
`;
