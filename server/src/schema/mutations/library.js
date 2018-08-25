export default `
#Macro: Library: Add Entry
addLibraryEntry(entry: LibraryInput!):String
updateLibraryEntry(entry: LibraryInput!):String

#Macro: Library: Remove Entry
removeLibraryEntry(entry: ID, slug: String):String
importLibraryEntry(
  simulatorId: ID!
  # JSON String. Should be computed from an existing library
  entries: String!):String
`;
