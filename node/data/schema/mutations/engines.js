export default `
  #Macro: Add engine system to simulator
  createEngine(
  simulatorId: ID!, 
  # {
  #   "content":"Name",
  #   "type":"text"
  # }
  name: String!, 

  # {
  #   "content":"Speeds",
  #   "type":"objectarray",
  #   "object":{
  #     "text":"text",
  #     "number":"number"
  #   }
  # }
  speeds: [SpeedInput]!): String
  
  #Macro: Remove engine system from simulator  TODO: ADD ARGS
  removeEngine(id: ID, simulatorId: ID, name: String): String

  setSpeed(id: ID!, speed: Int!, on: Boolean): String
  addHeat(id: ID!, heat: Float): String
`;
