import { gql } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import { getFolders } from "../helpers/uploadAsset";
import path from "path";
import os from "os";
import { ncp } from "ncp";
import { download } from "../bootstrap/init";
import uuid from "uuid";
import fs from "fs";
import assetDir from "../helpers/assetDir";
const mutationHelper = require("../helpers/mutationHelper").default;

// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
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

  input RemoteAsset {
    url: String
    name: String
  }

  type SimulatorAssets {
    mesh: String
    texture: String
    side: String
    top: String
    logo: String
    bridge: String
  }

  input SimulatorAssetsInput {
    mesh: String
    texture: String
    side: String
    top: String
    logo: String
    bridge: String
  }

  extend type Simulator {
    assets: SimulatorAssets
    soundEffects: JSON
  }
  extend type Query {
    asset(assetKey: String!): Asset
    assets(assetKeys: [String!]!): [Asset]
    assetFolders(name: String, names: [String]): [AssetFolder]
  }
  extend type Mutation {
    addAssetFolder(
      name: String!
      folderPath: String!
      fullPath: String!
    ): String
    removeAssetFolder(fullPath: String!): String
    removeAssetObject(fullPath: String!): String
    downloadRemoteAssets(folderPath: String!, files: [RemoteAsset!]!): String
  }
  extend type Subscription {
    assetFolderChange: [AssetFolder]
  }
`;

const resolver = {
  Query: {
    asset(root, { assetKey }) {
      return { assetKey, url: `/assets${assetKey}` };
    },
    assets(root, { assetKeys }) {
      return assetKeys.map(a => ({ assetKey: a, url: `/assets${a}` }));
    },
    assetFolders(root, { name, names }) {
      const folders = getFolders(assetDir);
      if (name) return folders.filter(f => f.name === name);
      if (names) return folders.filter(f => names.indexOf(f.name) > -1);
      return folders;
    }
  },
  Mutation: {
    ...mutationHelper(schema, ["downloadRemoteAssets"]),
    downloadRemoteAssets(root, { folderPath, files }, context) {
      Promise.all(
        files.map(file => {
          const filePath = `${assetDir}${folderPath}/${file.name}`;
          const dest = path.resolve(`${os.tmpdir()}/${file.name}-${uuid.v4()}`);
          return new Promise(resolve =>
            download(file.url, dest, err => {
              if (err) {
                console.log("There was an error", err);
              }
              ncp(dest, filePath, err => {
                if (err) {
                  console.error("Error!", err);
                }
                resolve();
              });
            })
          );
        })
      ).then(() => {
        pubsub.publish("assetFolderChange", getFolders(assetDir));
      });
    }
  },
  Subscription: {
    assetFolderChange: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: () => pubsub.asyncIterator("assetFolderChange")
    }
  },
  AssetFolder: {
    objects({ name, fullPath }) {
      return fs
        .readdirSync(assetDir + fullPath)
        .filter(
          f =>
            fs.lstatSync(assetDir + fullPath + "/" + f).isFile() && f[0] !== "."
        )
        .map(f => ({
          url: `/assets${fullPath}/${f}`,
          name: f,
          fullPath: `${fullPath}/${f}`,
          folderPath: fullPath,
          id: `${fullPath}/${f}`
        }));
    }
  }
};

export default { schema, resolver };
