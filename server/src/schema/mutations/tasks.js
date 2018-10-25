export default `

addTask(taskInput:TaskInput!):String
verifyTask(taskId:ID!, dismiss:Boolean):String
requestTaskVerify(id:ID!):String
denyTaskVerify(id:ID!):String
dismissVerifiedTasks(simulatorId:ID!):String
`;
