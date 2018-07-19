import express from "express";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import { printSchema } from "graphql/utilities/schemaPrinter";
import exportMission from "../imports/missions/export";
import importMission from "../imports/missions/import";
import exportSimulator from "../imports/simulators/export";
import importSimulator from "../imports/simulators/import";
import importAssets from "../imports/asset/import";
import exportLibrary from "../imports/library/export";
import { uploadAsset } from "../resolvers/assets";
import schema from "../data";
import path from "path";
import chalk from "chalk";

export default () => {
  let appDir = "./";
  const upload = multer({
    dest: appDir + "temp"
  });

  const server = express();
  server.use(require("express-status-monitor")({}));

  server.use("*", cors());

  server.use("/schema", (req, res) => {
    res.set("Content-Type", "text/plain");
    res.send(printSchema(schema));
  });

  server.post("/upload", upload.any(), async (req, res) => {
    uploadAsset({}, Object.assign({}, req.body, { files: req.files }), {});
    res.end(JSON.stringify("success!"));
  });

  server.get("/exportMission/:missionId", (req, res) => {
    exportMission(req.params.missionId, res);
  });

  server.get("/exportSimulator/:simId", (req, res) => {
    exportSimulator(req.params.simId, res);
  });

  server.get("/exportLibrary/:simId", (req, res) => {
    exportLibrary(req.params.simId, null, res);
  });
  server.get("/exportLibrary/:simId/:entryId", (req, res) => {
    exportLibrary(req.params.simId, req.params.entryId, res);
  });

  server.post("/importSimulator", upload.any(), async (req, res) => {
    if (req.files[0]) {
      importSimulator(req.files[0].path, () => {
        fs.unlink(req.files[0].path, err => {
          res.end("Error");
          if (err) throw new Error(err);
          res.end("Complete");
        });
      });
    }
  });

  server.post("/importMission", upload.any(), async (req, res) => {
    if (req.files[0]) {
      importMission(req.files[0].path, () => {
        fs.unlink(req.files[0].path, err => {
          res.end("Error");
          if (err) throw new Error(err);
          res.end("Complete");
        });
      });
    }
  });

  server.post("/importAssets", upload.any(), async (req, res) => {
    if (req.files[0]) {
      importAssets(req.files[0].path, () => {
        fs.unlink(req.files[0].path, err => {
          res.end("Error");
          if (err) throw new Error(err);
          res.end("Complete");
        });
      });
    }
  });
  if (!process.env.NODE_ENV) {
    server.use("/assets/", express.static(path.resolve("./assets")));

    // If we're in production, the last thing we want is for the server to crash
    // Print all server errors, but don't terminate the process
    process.on("uncaughtException", err => {
      console.log(chalk.red(`Caught exception: ${err}\n`));
      console.log(err);
    });
  }

  return server;
};
