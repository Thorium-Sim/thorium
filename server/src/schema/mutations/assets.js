export default `
addAssetFolder(name: String!, folderPath: String! fullPath: String!): String
removeAssetFolder(fullPath: String!): String
removeAssetObject(fullPath: String!): String
test(key: String): String
downloadRemoteAssets(folderPath:String!, files:[RemoteAsset!]!):String
`;
