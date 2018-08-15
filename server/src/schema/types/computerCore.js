export default `
type ComputerCore{
  id: ID
  simulatorId: ID
  users:[ComputerCoreUser]
  files:[ComputerCoreFile]
  virii:[ComputerCoreVirus]
  terminals:[ComputerCoreTerminals]
  history:[String]
}

type ComputerCoreUser {
  id: ID
  name: String
  password: String
  hacker: Boolean
  level: Int
}

type ComputerCoreFile {
  id: ID
  name: String
  level: Int
  corrupted: Boolean
  restoring: Boolean
}

type ComputerCoreVirus {
  id: ID
  name: String
}

type ComputerCoreTerminals {
  id: ID
  name: String
  status: TERMINAL_STATUS
}

enum TERMINAL_STATUS {
  F
  O
  S
  R
}

input ComputerCoreUserInput {
  name: String
  password: String
  hacker: Boolean
  level: Int
}
`;
