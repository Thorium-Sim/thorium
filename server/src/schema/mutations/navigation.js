export default `
navCalculateCourse(id: ID!, destination: String!): String
navCancelCalculation(id: ID!): String

#Macro: Navigation: Send Course
navCourseResponse(id: ID!, x: String, y: String, z: String): String
navCourseEntry(id: ID!, x: String, y: String, z: String): String
navToggleCalculate(id: ID!, which: Boolean!): String
navSetDestinations(id: ID, destinations: [String]): String
navSetDestination(id: ID, destination: String): String
navSetScanning(id: ID, scanning: Boolean): String
navSetThrusters(id: ID!, thrusters: Boolean): String

#Macro: Navigation: Course Preset
navSetPresets(id: ID, presets:NavPresetInput ): String
`;
