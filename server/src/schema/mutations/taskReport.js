export default `
generateTaskReport(simulatorId:ID!, systemId:ID, name:String, type:String!, stepCount:Int):String
clearTaskReport(id:ID!):String
completeTaskReport(id:ID!):String
verifyTaskReportStep(id:ID!, stepId:ID!):String
assignTaskReportStep(id:ID!, stepId:ID!, station:String):String
`;
