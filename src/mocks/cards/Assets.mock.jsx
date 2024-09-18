import assets from "../data/assets";
import {AssetFoldersDocument} from "../../generated/graphql";

export const assetsMocks = [
  {
    request: {
      query: AssetFoldersDocument,
    },
    result: {
      data: assets,
    },
  },
];
