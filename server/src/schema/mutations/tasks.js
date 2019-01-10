export default `

#Macro: Tasks: Add Task
addTask(taskInput:TaskInput!):String
verifyTask(taskId:ID!, dismiss:Boolean):String
requestTaskVerify(id:ID!):String
denyTaskVerify(id:ID!):String
dismissVerifiedTasks(simulatorId:ID!):String
addTaskTemplate(definition: String!):String
removeTaskTemplate(id:ID!):String
renameTaskTemplate(id:ID!, name:String!):String
setTaskTemplateValues(id:ID!, values:JSON!):String
setTaskTemplateReportTypes(id:ID!, reportTypes:[String]!):String
`;
