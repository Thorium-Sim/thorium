import express from "express";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import path from "path";
import chalk from "chalk";
import bodyParser from "body-parser";
import os from "os";

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
import exportSurvey from "../imports/surveys/export";
import importSurvey from "../imports/surveys/import";
import exportCoreLayout from "../imports/coreLayout/export";
import importCoreLayout from "../imports/coreLayout/import";
import errorhandler from "errorhandler";

export interface MulterFile {
  key: string; // Available using `S3`.
  path: string; // Available using `DiskStorage`.
  mimetype: string;
  originalname: string;
  size: number;
}

const exportsHandlers = {
  exportMission: exportMission,
  exportSimulator: exportSimulator,
  exportKeyboard: exportKeyboard,
  exportTacticalMap: exportTacticalMap,
  exportSoftwarePanel: exportSoftwarePanel,
  exportFlight,
  exportTrigger,
  exportSurvey,
  exportCoreLayout,
};

const importsHandlers = {
  importSimulator: importSimulator,
  importMission: importMission,
  importKeyboard: importKeyboard,
  importTacticalMap: importTacticalMap,
  importAssets: importAssets,
  importSoftwarePanel: importSoftwarePanel,
  importFlight,
  importTrigger,
  importSurvey,
  importCoreLayout,
};

const tmpDir = os.tmpdir();
const folder = `${tmpDir}${path.sep}`;
export default () => {
  const upload = multer({
    dest: folder,
  });

  const server = express();
  server.use(errorhandler({log: true}));
  server.use(bodyParser.json({limit: "20mb"}));

  // server.use(require("express-status-monitor")({}));

  server.use("*", cors());

  // server.use("/schema", (req, res) => {
  //   res.set("Content-Type", "text/plain");
  //   res.send(printSchema(schema));
  // });

  server.post("/upload", upload.any(), async (req, res) => {
    uploadAsset({}, Object.assign({}, req.body, {files: req.files}), {});
    res.end(JSON.stringify("success!"));
  });

  // Dynamic object exports
  Object.entries(exportsHandlers).forEach(([key, func]) => {
    server.get(`/${key}/:id`, (req, res) => {
      func(req.params.id, res);
    });
  });

  server.get("/exportLibrary/:simId", (req, res) => {
    exportLibrary(req.params.simId, null, res);
  });
  server.get("/exportLibrary/:simId/:entryId", (req, res) => {
    exportLibrary(req.params.simId, req.params.entryId, res);
  });

  Object.entries(importsHandlers).forEach(([key, func]) => {
    server.post(
      `/${key}`,
      upload.any(),
      async (req: express.Request & {files: MulterFile[]}, res) => {
        if (req.files[0]) {
          func(req.files[0].path, () => {
            fs.unlink(req.files[0].path, err => {
              if (err) {
                res.end("Error");
              }
              res.end("Complete");
            });
          });
        }
      },
    );
  });
  server.post(
    "/importLibrary/:simId",
    upload.any(),
    async (req: express.Request & {files: MulterFile[]}, res) => {
      const {simId} = req.params;
      if (req.files[0]) {
        importLibrary(req.files[0].path, simId, () => {
          fs.unlink(req.files[0].path, err => {
            if (err) {
              res.end("Error");
            }
            res.end("Complete");
          });
        });
      }
    },
  );

  if (process.env.NODE_ENV === "production") {
    // If we're in production, the last thing we want is for the server to crash
    // Print all server errors, but don't terminate the process
    setInterval(function() {}, Math.pow(2, 31) - 1);
    process.on("uncaughtException", err => {
      console.log(chalk.red(`Caught exception: ${err}\n`));
      console.log(err);
    });
  } else {
    server.use("/assets/", express.static(path.resolve("./assets")));
  }

  return server;
};
