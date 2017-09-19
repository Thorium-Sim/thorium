export default `
uploadAsset(files: [UploadedFile!]!, simulatorId: ID, containerName: String, containerId: ID, folderPath: String): String
addAssetFolder(name: String!, folderPath: String! fullPath: String!): String
removeAssetFolder(id: ID!): String
addAssetContainer(name: String!, folderId: ID, folderPath: String, fullPath: String): String
removeAssetContainer(id: ID!): String
removeAssetObject(id: ID!): String
test(key: String): String
`;
