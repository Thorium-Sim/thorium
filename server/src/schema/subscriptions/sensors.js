export default `
  sensorsUpdate(simulatorId: ID, domain:String): [Sensors]
  sensorContactUpdate(simulatorId: ID, sensorId: ID, hostile: Boolean, type: String): [SensorContact]
  sensorsPing(sensorId: ID): String
`;
