export default `
type Asset {
  assetKey: String
  url: String
}

type AssetObject {
  id: ID
  folderPath: String
  containerId: String
  containerPath: String
  fullPath: String
  url: String
  simulatorId: String
}

type AssetContainer {
  id: ID
  folderPath: String
  fullPath: String
  name: String
  objects: [AssetObject]
}

type AssetFolder {
  id: ID
  name: String
  folderPath: String
  fullPath: String
  containers: [AssetContainer]
}
`;
