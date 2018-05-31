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
`;
