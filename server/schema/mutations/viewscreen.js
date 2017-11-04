export default `
  updateViewscreenName(id: ID!, name: String!):String

  #Macro: Change the viewscreen or apply data
  updateViewscreenComponent(id: ID!, component: String!, data: String):String
  updateViewscreenData(id: ID!, data: String!):String

  #Macro: Set the viewscreen to auto mode
  setViewscreenToAuto(id: ID!): String  
  updateViewscreenAuto(id: ID!, auto: Boolean!):String
`;
