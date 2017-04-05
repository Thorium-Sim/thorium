export default `
type Ship {
  clamps: Boolean
  ramps: Boolean
  airlock: Boolean
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
