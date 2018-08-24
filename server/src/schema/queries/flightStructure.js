export default `
simulators(template: Boolean, id: String): [Simulator]
stations: [Stationset]
station(simulatorId:ID!, station:String!):Station
missions(id: ID): [Mission]
flights(running: Boolean, id: ID): [Flight]
`;
