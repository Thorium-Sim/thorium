export default `
type Asset {
  assetKey: String
  url: String
}

type AssetObject {
  id: ID
  name: String
  folderPath: String
  fullPath: String
  url: String
}

type AssetFolder {
  id: ID
  name: String
  folderPath: String
  fullPath: String
  objects: [AssetObject]
}
`;
