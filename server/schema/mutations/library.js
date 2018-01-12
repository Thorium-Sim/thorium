export default `
#Macro: Add an entry to the library database
addLibraryEntry(entry: LibraryInput!):String
updateLibraryEntry(entry: LibraryInput!):String
removeLibraryEntry(entry: ID!):String
importLibraryEntry(
  simulatorId: ID!
  # JSON String. Should be computed from an existing library
  entries: String!):String
`;
