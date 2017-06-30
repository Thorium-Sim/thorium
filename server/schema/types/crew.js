export default `
type Crew {
  id: ID
  simulatorId: ID
  firstName: String
  lastName: String
  name: String
  gender: String
  age: Int
  rank: String
  position: String
  workRoom: Room
  restRoom: Room
}

input CrewInput {
  id: ID
  simulatorId: ID
  firstName: String
  lastName: String
  gender: String
  age: Int
  rank: String
  position: String
  workRoom: Int
  restRoom: Int
}
`;

// TODO: Potentially make position a type
