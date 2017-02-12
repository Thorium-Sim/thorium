export default `
type Crew {
  id: ID
  simulatorId: ID
  firstName: String
  lastName: String
  gender: String
  age: Int
  rank: String
  position: String
  workRoom: Room
  restRoom: Room
}
`;

// TODO: Potentially make position a type
