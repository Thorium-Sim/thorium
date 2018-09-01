import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import os from "os";
import https from "https";
import ProgressBar from "progress";
import uuid from "uuid";
import importMission from "../imports/missions/import";
import importSimulator from "../imports/simulators/import";

export const ExternalsQueries = {
  externals() {
    return {
      simulators: [],
      missions: []
    };
  }
};

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

export const ExternalsMutations = {
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
};

export const ExternalsTypes = {
  Externals: {
    simulators() {
      return fetch("https://thoriumsim.com/api/simulators")
        .then(res => res.json())
        .catch(() => {
          return [];
        });
    },
    missions() {
      return fetch("https://thoriumsim.com/api/missions")
        .then(res => res.json())
        .catch(() => {
          return [];
        });
    }
  }
};
