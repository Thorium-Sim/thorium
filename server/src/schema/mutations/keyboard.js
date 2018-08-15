export default `
addKeyboard(name:String!):String
removeKeyboard(id:ID!):String
renameKeyboard(id:ID!, name:String!):String
updateKeyboardKey(id:ID!, key:KeyboardKeyInput!):String
triggerKeyboardAction(simulatorId: ID!, id:ID!, key:String!, meta:[String]!):String
`;
