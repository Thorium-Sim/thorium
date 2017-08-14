export default `
navCalculateCourse(id: ID!, destination: String!): String
navCancelCalculation(id: ID!): String
navCourseResponse(id: ID!, x: String, y: String, z: String): String
navCourseEntry(id: ID!, x: String, y: String, z: String): String
navToggleCalculate(id: ID!, which: Boolean!): String

`;
