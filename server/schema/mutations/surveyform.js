export default `
createSurveyForm(name:String!):String
removeSurveyForm(id:ID!):String
updateSurveyForm(id:ID!, form:[FormFieldsInput]!):String
triggerSurvey(simulatorId:ID!, id:ID!):String
surveyFormResponse(id:ID!, response:FormResultsInput):String
`;
