export default `
type Keyboard{
  id: ID
  simulatorId: ID
  name: String
  default: Boolean
  keys: [KeyboardKey]
}

type KeyboardKey {
  id: ID
  key: String
  meta: [String]
  actions: [KeyActions]
}

type KeyActions {
  event: String
  args: String
  delay: Int
}
`;
