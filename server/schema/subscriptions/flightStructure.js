export default `
stationSetUpdate: [Stationset]
missionsUpdate(missionId: ID): [Mission]
simulatorsUpdate(simulatorId: ID, template: Boolean): [Simulator]
flightsUpdate(id: ID): [Flight]
notify(simulatorId: ID!, station: String, trigger: String): Notification
`;
