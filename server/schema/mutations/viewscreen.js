export default `
  updateViewscreenName(id: ID!, name: String!):String
  updateViewscreenSecondary(id: ID!, secondary: Boolean!):String
  
  #Macro: Change the viewscreen or apply data
  updateViewscreenComponent(id: ID!, component: String!, data: String, secondary: Boolean):String
  updateViewscreenData(id: ID!, data: String!):String

  #Macro: Set the viewscreen to auto mode
  setViewscreenToAuto(id: ID!, secondary: Boolean): String  
  updateViewscreenAuto(id: ID!, auto: Boolean!):String
`;
