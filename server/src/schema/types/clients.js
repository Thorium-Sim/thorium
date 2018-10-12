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

  mobile: Boolean
  cards: [String]
  keypad: Keypad
}

type Keypad {
  id: ID
  code:[Int]
  enteredCode:[Int]
  codeLength:Int
  giveHints:Boolean
  allowedAttempts:Int
  attempts:Int
  locked:Boolean
}

type Scanner {
  id:ID
  scanRequest: String
  scanResults: String
  scanning: Boolean
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
