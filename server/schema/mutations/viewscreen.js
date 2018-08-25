export default `
  updateViewscreenName(id: ID!, name: String!):String
  updateViewscreenSecondary(id: ID!, secondary: Boolean!):String
  
  #Macro: Viewscreen Card
  updateViewscreenComponent(id: ID!, component: String!, data: String, secondary: Boolean):String
  updateViewscreenData(id: ID!, data: String!):String

  #Macro: Viewscreen Auto
  setViewscreenToAuto(id: ID!, secondary: Boolean): String  
  updateViewscreenAuto(id: ID!, auto: Boolean!):String
  toggleViewscreenVideo(simulatorId:ID!):String
`;
