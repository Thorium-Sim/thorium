export default `
  createTeam(team: TeamInput!): String
  updateTeam(team: TeamInput!): String
  addCrewToTeam(teamId: ID!, crewId: ID!): String
  removeCrewFromTeam(teamId: ID!, crewId: ID!): String
  removeTeam(teamId: ID!): String
`;
