export default `
  addCrewmember(crew: CrewInput): String
  removeCrewmember(id: ID): String
  updateCrewmember(crew: CrewInput): String
  newRandomCrewmember(simulatorId: ID!, type: String, position: String): String
removeAllCrew(simulatorId:ID!):String
crewImport(simulatorId:ID!, crew:[CrewInput]!):String
`;
