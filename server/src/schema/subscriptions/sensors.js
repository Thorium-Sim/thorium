export default `
  sensorsUpdate(simulatorId: ID, domain:String): [Sensors]
  sensorContactUpdate(sensorId: ID): [SensorContact]
  sensorsPing(sensorId: ID): String
`;
