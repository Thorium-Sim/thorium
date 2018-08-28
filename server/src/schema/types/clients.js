export default `
type Client {
  id: ID
  connected: Boolean
  flight: Flight
  simulator: Simulator
  station: Station
  loginName: String
  loginState: String
  ping: String
  offlineState: String
  movie: String
  training: Boolean
  caches: [String]
  hypercard: String
  overlay: Boolean
}

type Sound {
  id: ID
  clients: [String]
  asset: String
  url: String
  volume: Float
  playbackRate: Float
  channel:[Int]
  looping: Boolean
}

input SoundInput {
  id: ID
  clients: [String]
  asset: String
  volume: Float
  playbackRate: Float
  channel: [Int]
  looping: Boolean
}
`;
