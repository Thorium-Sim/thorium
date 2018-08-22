export default `
simulators(template: Boolean, id: String): [Simulator]
stations: [Stationset]
missions(id: ID): [Mission]
flights(running: Boolean, id: ID): [Flight]
`;
