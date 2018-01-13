export default `
#Macro: Add an entry to the library database
addLibraryEntry(entry: LibraryInput!):String
updateLibraryEntry(entry: LibraryInput!):String

#Macro: Remove an entry from the library database
removeLibraryEntry(entry: ID, slug: String):String
importLibraryEntry(
  simulatorId: ID!
  # JSON String. Should be computed from an existing library
  entries: String!):String
`;
