export default `
  type Team {
    id: ID
    type: TEAM_TYPES
    simulatorId: ID
    name: String
    priority: PRIORITIES
    location: Location
    orders: String
    officers: [Crew]
  }

  input TeamInput {
    id: ID
    type: TEAM_TYPES
    simulatorId: ID
    name: String
    priority: PRIORITIES
    location: String
    orders: String
    officers: [ID]
  }
  enum TEAM_TYPES {
    security
    damage
    medical
  }
  enum PRIORITIES {
    low
    normal
    critical
    emergency
  }
`;
