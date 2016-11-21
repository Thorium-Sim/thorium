export default `
  asset(assetKey: String!, simulatorId: ID): Asset
  assets(assetKeys: [String!]!, simulatorId: ID): [Asset]
  assetFolders: [AssetFolder]
`;
