export default `
type Set {
  id: ID
  name: String
  clients: [SetClient]
}

type SetClient {
  id: ID
  client: Client
  simulator: Simulator
  stationSet: Stationset
  station: String
}

input SetClientInput {
  id: ID
  clientId: ID
  simulatorId: ID
  stationSet: ID
  station: ID
}
`;