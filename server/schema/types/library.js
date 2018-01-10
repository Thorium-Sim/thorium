export default `
type LibraryEntry {
  id: ID
  simulatorId: ID
  title: String
  body: String
  image: String
  type: String
  categories: [String]
  seeAlso: [LibraryEntry]
}
type LibraryCategory {
  name: String
  entries: [LibraryEntry]
}

input LibraryInput {
  id: ID
  simulatorId: ID
  title: String
  body: String
  image: String
  type: String
  categories: [String]
  seeAlso: [ID]
}
`;
