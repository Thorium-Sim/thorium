import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import os from "os";
import uuid from "uuid";
import importMission from "../imports/missions/import";
import importSimulator from "../imports/simulators/import";
import {gql} from "apollo-server-express";

// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Externals {
    simulators: [ExternalSimulator]
    missions: [ExternalMission]
  }
  type ExternalSimulator {
    title: String
    author: String
    description: String
    url: String
    date: String
  }
  type ExternalMission {
    title: String
    author: String
    description: String
    url: String
    date: String
  }
  extend type Query {
    externals: Externals
  }
  extend type Mutation {
    importSimulatorFromUrl(url: String!): String
    importMissionFromUrl(url: String!): String
  }
`;

const download = function (url, dest, callback) {
  fetch(url)
    .then(
      res =>
        new Promise((resolve, reject) => {
          if (res.status !== 200) return reject("Error downloading file.");
          const file = fs.createWriteStream(dest);
          res.body.pipe(file);
          const max = parseInt(res.headers.get("content-length"), 10);
          let total = 0;
          console.info("Download Beginning...");
          res.body.on("data", chunk => {
            total += chunk.length;
            if (total % 20 === 0) {
              console.info(
                `Download Progress: ${Math.round((total / max) * 100)}%`,
              );
            }
          });
          file.on("close", () => {
            console.info("Download Complete");
            resolve();
          });
          file.on("error", reject);
        }),
    )
    .then(() => {
      callback(null);
    })
    .catch(err => callback(err));
};

const resolver = {
  Externals: {
    simulators() {
      return fetch("https://thoriumsim.com/api/simulators")
        .then(res => res.json())
        .catch(() => []);
    },
    missions() {
      return fetch("https://thoriumsim.com/api/missions")
        .then(res => res.json())
        .catch(() => []);
    },
  },
  Query: {
    externals() {
      return {
        simulators: [],
        missions: [],
      };
    },
  },
  Mutation: {
    importSimulatorFromUrl(root, {url}) {
      const dest = path.resolve(`${os.tmpdir()}/${uuid.v4()}.zip`);
      download(url, dest, err => {
        if (err) {
          console.error("There was an error importing a simulator:", err);
          throw new Error(`Error importing simulator: ${err.message}`);
        }
        importSimulator(dest, () => {
          fs.unlink(dest, error => {
            if (err) console.error(error);
            console.info("Simulator Import Complete");
          });
        });
      });
    },
    importMissionFromUrl(root, {url}) {
      const dest = path.resolve(`${os.tmpdir()}/${uuid.v4()}.zip`);
      download(url, dest, err => {
        if (err) {
          console.error("There was an error importing a mission:", err);
          // throw new Error("Error importing mission:", err.message);
        }
        importMission(dest, () => {
          fs.unlink(dest, error => {
            if (err) console.error(error);
            console.info("Mission Import Complete");
          });
        });
      });
    },
  },
};

export default {schema, resolver};
