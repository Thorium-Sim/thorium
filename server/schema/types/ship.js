export default `
type Ship {
  clamps: Boolean
  ramps: Boolean
  airlock: Boolean
  powerMode: String
  remoteAccessCodes: [RemoteAccessCode]
}

type RemoteAccessCode {
  id: ID
  code: String
  state: String
  station: String
  timestamp: String
}
`;
