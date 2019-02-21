export default `
addInterface(name: String!):String
renameInterface(id: ID!, name:String!):String
removeInterface(id:ID!):String
updateInterface(id:ID!, deviceType: ID
  components:JSON
  connections:JSON
  values:JSON
  config:JSON):String
addInterfaceToSimulator(simulatorId:ID!
  interfaceId:ID!):String
removeInterfaceFromSimulator(simulatorId:ID!
  interfaceId:ID!):String
addInterfaceDevice(name: String!):String
renameInterfaceDevice(id:ID!, name:String!):String
removeInterfaceDevice(id:ID!):String
updateInterfaceDevice(id:ID!, width:Int, height:Int):String
#Macro: Interfaces: Set Object Hidden
toggleInterfaceObjectHidden(id:ID!, objectId:ID!, hidden:Boolean!):String
`;
