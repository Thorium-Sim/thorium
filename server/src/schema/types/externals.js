export default `
type Externals {
  simulators: [ExternalSimulator]
  missions: [ExternalMission]
}
type ExternalSimulator {
  title: String
  author: String
  description: String
  url: String
  date: String
}
type ExternalMission {
  title: String
  author: String
  description: String
  url: String
  date: String
}
`;
