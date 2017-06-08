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
  #   "content":"HeatRate",
  #   "type":"number"
  # }
  heatRate: Int,

  # {
  #   "content":"Speeds",
  #   "type":"objectarray",
  #   "object":{
  #     "text":"text",
  #     "number":"number"
  #   }
  # }
  speeds: [SpeedInput]!,
  ): String
  
  #Macro: Remove engine system from simulator  TODO: ADD ARGS
  removeEngine(id: ID, simulatorId: ID, 
  # {
  #   "content":"Name",
  #   "type":"text"
  # }
  name: String): String
  
  #Macro: Add speed to engine TODO: ADD ARGS
  addSpeed(id: ID, name: String, speed: [SpeedInput]!): String 
  setSpeed(id: ID!, speed: Int!, on: Boolean): String
  addHeat(id: ID!, heat: Float): String
  engineCool(id: ID!, state: Boolean): String
`;
