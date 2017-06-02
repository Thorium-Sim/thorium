export default `
flash(stationId: ID, clientId: ID, duration: Float): String
spark(stationId: ID, clientId: ID, duration: Float): String
freak(stationId: ID, clientId: ID, duration: Float): String
beep(stationId: ID, clientId: ID): String
shutdown(stationId: ID, clientId: ID): String
restart(stationId: ID, clientId: ID): String
quit(stationId: ID, clientId: ID): String
`;
