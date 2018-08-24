export default `
  sensorsUpdate(simulatorId: ID, domain:String): [Sensors]
  sensorContactUpdate(simulatorId: ID, sensorId: ID, hostile: Boolean): [SensorContact]
  sensorsPing(sensorId: ID): String
`;
