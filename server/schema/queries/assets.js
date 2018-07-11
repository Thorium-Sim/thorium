export default `
  asset(assetKey: String!): Asset
  assets(assetKeys: [String!]!): [Asset]
  assetFolders(name: String, names: [String]): [AssetFolder]
`;
