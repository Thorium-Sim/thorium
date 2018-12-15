export default `
  updateViewscreenName(id: ID!, name: String!):String
  updateViewscreenSecondary(id: ID!, secondary: Boolean!):String
  
  #Macro: Viewscreen: Change Viewscreen Card
  updateViewscreenComponent(id: ID, simulatorId: ID, component: String!, data: String, secondary: Boolean):String
  updateViewscreenData(id: ID!, data: String!):String

  #Macro: Viewscreen: Set Viewscreen to Auto
  setViewscreenToAuto(id: ID, simulatorId:ID, secondary: Boolean): String  
  updateViewscreenAuto(id: ID!, auto: Boolean!):String
  toggleViewscreenVideo(simulatorId:ID!):String
`;
