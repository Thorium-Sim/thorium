import express from "express";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import path from "path";
import chalk from "chalk";
import uploadAsset from "../helpers/uploadAsset";

import exportMission from "../imports/missions/export";
import importMission from "../imports/missions/import";
import exportSimulator from "../imports/simulators/export";
import importSimulator from "../imports/simulators/import";
import importAssets from "../imports/asset/import";
import exportLibrary from "../imports/library/export";
import importLibrary from "../imports/library/import";
import exportKeyboard from "../imports/keyboards/export";
import importKeyboard from "../imports/keyboards/import";
import exportTacticalMap from "../imports/tacticalMaps/export";
import importTacticalMap from "../imports/tacticalMaps/import";
import exportSoftwarePanel from "../imports/softwarePanels/export";
import importSoftwarePanel from "../imports/softwarePanels/import";
import exportFlight from "../imports/flights/export";
import importFlight from "../imports/flights/import";
import exportTrigger from "../imports/triggers/export";
import importTrigger from "../imports/triggers/import";

const exports = {
  exportMission: exportMission,
  exportSimulator: exportSimulator,
  exportKeyboard: exportKeyboard,
  exportTacticalMap: exportTacticalMap,
  exportLibrary: exportLibrary,
  exportSoftwarePanel: exportSoftwarePanel,
  exportFlight,
  exportTrigger
};

const imports = {
  importSimulator: importSimulator,
  importMission: importMission,
  importKeyboard: importKeyboard,
  importTacticalMap: importTacticalMap,
  importAssets: importAssets,
  importSoftwarePanel: importSoftwarePanel,
  importFlight,
  importTrigger
};
export default () => {
  let appDir = "./";
  const upload = multer({
    dest: appDir + "temp"
  });

  const server = express();

  server.on("error", err => {
    if (err.code === "EADDRINUSE") {
      console.log(
        chalk.redBright(
          "There is already a version of Thorium running on this computer. Shutting down..."
        )
      );
      process.exit(0);
    }
  });

  server.use(require("express-status-monitor")({}));

  server.use("*", cors());

  // server.use("/schema", (req, res) => {
  //   res.set("Content-Type", "text/plain");
  //   res.send(printSchema(schema));
  // });

  server.post("/upload", upload.any(), async (req, res) => {
    uploadAsset({}, Object.assign({}, req.body, { files: req.files }), {});
    res.end(JSON.stringify("success!"));
  });

  // Dynamic object exports
  Object.entries(exports).forEach(([key, func]) => {
    server.get(`/${key}/:id`, (req, res) => {
      func(req.params.id, res);
    });
  });

  server.get("/exportLibrary/:simId/:entryId", (req, res) => {
    exportLibrary(req.params.simId, req.params.entryId, res);
  });

  Object.entries(imports).forEach(([key, func]) => {
    server.post(`/${key}`, upload.any(), async (req, res) => {
      if (req.files[0]) {
        func(req.files[0].path, () => {
          fs.unlink(req.files[0].path, err => {
            if (err) {
              res.end("Error");
              throw new Error(err);
            }
            res.end("Complete");
          });
        });
      }
    });
  });
  server.post("/importLibrary/:simId", upload.any(), async (req, res) => {
    const { simId } = req.params;
    if (req.files[0]) {
      importLibrary(req.files[0].path, simId, () => {
        fs.unlink(req.files[0].path, err => {
          if (err) {
            res.end("Error");
            throw new Error(err);
          }
          res.end("Complete");
        });
      });
    }
  });

  if (!process.env.NODE_ENV) {
    server.use("/assets/", express.static(path.resolve("./assets")));

    // If we're in production, the last thing we want is for the server to crash
    // Print all server errors, but don't terminate the process
    setInterval(function() {}, Math.pow(2, 31) - 1);
    process.on("uncaughtException", err => {
      console.log(chalk.red(`Caught exception: ${err}\n`));
      console.log(err);
    });
  }

  return server;
};
