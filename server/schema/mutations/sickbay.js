export default `
setSickbayBunks(id:ID!, count:Int):String
addSickbayCrew(id:ID!, crew:CrewInput!):String
removeSickbayCrew(id:ID!, crewId:ID!):String
updateSickbayCrew(id:ID!, crewId:ID!, crew:CrewInput!):String
scanSickbayBunk(id:ID!, bunkId:ID!, request:String!):String
cancelSickbayBunkScan(id:ID!, bunkId:ID!):String
sickbayBunkScanResponse(id:ID!, bunkId:ID!, response:String!):String
assignPatient(id:ID!, bunkId:ID!, crewId:ID!):String
dischargePatient(id:ID!, bunkId:ID!):String
startDeconProgram(id:ID, program:String!, location: String!):String
updateDeconOffset(id:ID!, offset:Float!):String
cancelDeconProgram(id:ID!):String
completeDeconProgram(id:ID!):String
setDeconAutoFinish(id:ID!, finish:Boolean!):String
updatePatientChart(crewId:ID!, chart:ChartInput!):String
`;
