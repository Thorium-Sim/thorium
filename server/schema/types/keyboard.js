export default `
type Keyboard{
  id: ID
  name: String
  keys: [KeyboardKey]
}

type KeyboardKey {
  id: ID
  key: String
  meta: [String]
  actions: [KeyActions]
}

type KeyboardKeyInput {
  id: ID
  key: String
  meta: [String]
  actions: [KeyActionInput]
}
type KeyActions {
  id: ID
  event: String
  args: String
  delay: Int
}

input KeyActionInput {
  id: ID
  event: String
  args: String
  delay: Int
}
`;
