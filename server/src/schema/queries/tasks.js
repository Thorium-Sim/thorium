export default `
tasks(simulatorId: ID!, station: String): [Task]
taskTemplates: [TaskTemplate]
taskDefinitions(simulatorId: ID): [TaskDefinition]
taskInstructions(simulatorId: ID, definition: String!, requiredValues: JSON!, task: TaskInput):String
`;
