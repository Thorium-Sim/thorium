export default `
stationSetUpdate: [Stationset]
missionsUpdate: [Mission]
simulatorsUpdate(simulatorId: ID, template: Boolean): [Simulator]
flightsUpdate: [Flight]
notify(simulatorId: ID!, station: String, trigger: String): Notification
`;
