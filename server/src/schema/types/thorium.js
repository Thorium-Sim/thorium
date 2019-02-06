export default `
# A type for all of the system-wide settings.
type Thorium{
  thoriumId: String
  autoUpdate: Boolean
  doTrack: Boolean
  askedToTrack: Boolean
  addedTaskTemplates: Boolean
  spaceEdventuresToken: String
  spaceEdventuresCenter: SpaceEdventuresCenter
}

type SpaceEdventuresCenter {
  id: ID
  name: String
  token: String
  simulators: NamedObject
  missions: NamedObject
  badges: NamedObject
}

type NamedObject {
  id: ID
  name: String
  description: String
}
`;
