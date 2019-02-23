import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import os from "os";
import https from "https";
import ProgressBar from "progress";
import uuid from "uuid";
import importMission from "../imports/missions/import";
import importSimulator from "../imports/simulators/import";
import { gql } from "apollo-server-express";

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

const download = function(url, dest, callback) {
  const file = fs.createWriteStream(dest);
  https.get(url, function(res) {
    const bar = new ProgressBar(
      `Downloading: [:bar] :percent Elapsed: :elapseds ETA: :etas`,
      {
        total: parseInt(res.headers["content-length"], 10),
        complete: "=",
        incomplete: " ",
        width: 20
      }
    );

    res
      .on("data", function(chunk) {
        file.write(chunk);
        bar.tick(chunk.length);
      })
      .on("end", function() {
        file.end();
        callback(null);
      })
      .on("error", function(err) {
        callback(err.message);
      });
  });
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
    }
  },
  Query: {
    externals() {
      return {
        simulators: [],
        missions: []
      };
    }
  },
  Mutation: {
    importSimulatorFromUrl(root, { url }) {
      const dest = path.resolve(`${os.tmpdir()}/${uuid.v4()}.zip`);
      download(url, dest, err => {
        if (err) {
          console.log("There was an error importing a simulator:", err);
          throw new Error("Error importing simulator:", err.message);
        }
        importSimulator(dest, () => {
          fs.unlink(dest, error => {
            if (err) console.log(error);
            console.log("Simulator Import Complete");
          });
        });
      });
    },
    importMissionFromUrl(root, { url }) {
      const dest = path.resolve(`${os.tmpdir()}/${uuid.v4()}.zip`);
      download(url, dest, err => {
        if (err) {
          console.log("There was an error importing a mission:", err);
          throw new Error("Error importing mission:", err.message);
        }
        importMission(dest, () => {
          fs.unlink(dest, error => {
            if (err) console.log(error);
            console.log("Mission Import Complete");
          });
        });
      });
    }
  }
};

export default { schema, resolver };
