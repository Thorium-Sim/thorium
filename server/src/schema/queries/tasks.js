export default `
tasks: [Task]
taskTemplates: [TaskTemplate]
taskDefinitions(simulatorId: ID): [TaskDefinition]
taskInstructions(simulatorId: ID, definition: String!, requiredValues: JSON!, task: TaskInput):String
`;
