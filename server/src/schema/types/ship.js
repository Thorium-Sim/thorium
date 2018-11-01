export default `
type Ship {
  clamps: Boolean
  ramps: Boolean
  airlock: Boolean
  bridgeCrew: Int
  radiation: Float
  velocity: Float
  remoteAccessCodes: [RemoteAccessCode]
  selfDestructTime: Float
  selfDestructCode: String
  selfDestructAuto: Boolean
  inventoryLogs:[InventoryLog]
}

type InventoryLog {
  timestamp: String
  log:String
}

type RemoteAccessCode {
  id: ID
  code: String
  state: String
  station: String
  timestamp: String
}
`;
