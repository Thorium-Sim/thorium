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
// import exportSurvey from "../imports/surveys/export";
// import importSurvey from "../imports/surveys/import";
import exportCoreLayout from "../imports/coreLayout/export";
import importCoreLayout from "../imports/coreLayout/import";
import errorhandler from "errorhandler";

import App from "../app";
import yazl from "yazl";
import yauzl from "yauzl";
import paths from "../helpers/paths";
import {pascalCase} from "change-case";
import * as classes from "../classes";
import mkdirp from "mkdirp";

let assetDir = path.resolve("./");

if (process.env.NODE_ENV === "production") {
  assetDir = paths.userData;
}

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
  // exportSurvey,
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
  // importSurvey,
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

  // Generic imports and exports
  interface Exportable {
    exportable: string;
  }
  function streamToString(stream, cb) {
    const chunks = [];
    stream.on("data", chunk => {
      chunks.push(chunk.toString());
    });
    stream.on("end", () => {
      cb(chunks.join(""));
    });
  }
  Object.entries(classes).forEach(([classKey, classObj]) => {
    const exportObj = (classObj as unknown) as Exportable;
    if (exportObj.exportable) {
      server.get(
        `/export${pascalCase(exportObj.exportable)}/:id`,
        (req, res) => {
          const id = req.params.id.split(",");
          const objects = App?.[exportObj.exportable]?.filter(o =>
            id.includes(o.id),
          );
          if (objects.length === 0) {
            res.end(`No ${classKey}`);
            return;
          }
          if (!objects[0]?.serialize) {
            res.end(`Cannot export ${classKey}`);
            return;
          }
          const zipfile = new yazl.ZipFile();
          function addAsset(fileName) {
            let key = fileName;
            if (!key.split(".")[1]) {
              // No extension - find the most likely candidate
              const path = key.split("/").slice(0, -1).join("/");
              const filename = key.split("/")[key.split("/").length - 1];
              const folderPath = assetDir + "/assets" + path;
              if (!fs.existsSync(folderPath)) return;
              const files = fs.readdirSync(folderPath);
              const file = files
                .filter(f => !fs.statSync(folderPath + "/" + f).isDirectory())
                .find(f => f.indexOf(filename) > -1);
              if (!file) {
                console.error("Couldn't find file:", key);
                return;
              }
              key = path + "/" + file;
            }
            if (key.url) {
              const fileLoc = `${assetDir}/${key.url}`.replace("//", "/");
              if (fs.existsSync(fileLoc)) {
                zipfile.addFile(fileLoc, `${exportObj.exportable}${key.url}`);
              }
            } else {
              const objectLoc = `${assetDir}/assets/${key}`.replace("//", "/");
              if (!fs.existsSync(objectLoc)) return;
              zipfile.addFile(
                objectLoc,
                `${exportObj.exportable}/assets${key}`,
                {
                  mtime: new Date(),
                  mode: parseInt("0100664", 8), // -rw-rw-r--
                },
              );
            }
          }
          let allData = {};
          function addData(key: string, data: any) {
            allData[key] = allData[key] ? allData[key].concat(data) : [data];
          }
          let exportName;
          objects.forEach(obj => {
            exportName = obj.serialize({addData, addAsset}) || exportName;
          });
          const buff = Buffer.from(JSON.stringify(allData));
          zipfile.addBuffer(buff, `${exportObj.exportable}/data.json`, {
            mtime: new Date(),
            mode: parseInt("0100664", 8), // -rw-rw-r--
          });
          zipfile.end({forceZip64Format: false}, function () {
            res.set({
              "Content-Disposition": `attachment; filename=${exportName}`,
              "Content-Type": "application/octet-stream",
            });
            zipfile.outputStream.pipe(res);
          });
        },
      );
      server.post(
        `/import${pascalCase(exportObj.exportable)}`,
        upload.any(),
        async (req: express.Request & {files: MulterFile[]}, res) => {
          console.log(`Importing ${pascalCase(exportObj.exportable)}`);
          if (req.files[0]) {
            const importZip = await new Promise<yauzl.ZipFile>(
              (resolve, reject) =>
                yauzl.open(req.files[0].path, {lazyEntries: true}, function (
                  err,
                  importZip,
                ) {
                  if (err) reject(err);
                  resolve(importZip);
                }),
            );
            importZip.on("entry", function (entry) {
              if (entry.fileName.includes("data.json")) {
                // It's the data file. Read it, parse it, and load the data.
                importZip.openReadStream(entry, function (error, readStream) {
                  if (error) throw error;
                  streamToString(readStream, str => {
                    const data = JSON.parse(str);
                    Object.values(data).forEach((data: unknown[]) => {
                      // All values in the export are arrays; loop over them
                      data.forEach(obj => {
                        const Class = classes[(obj as {class: string}).class];
                        if (!Class) {
                          console.error(
                            "Error importing file: could not find class for ",
                            Class,
                          );
                        }
                        if (!Class.import) {
                          console.error(
                            `Error importing file: class "${Class}" has not implemented an import function.`,
                          );
                        }
                        Class.import(obj);
                      });
                    });
                    importZip.readEntry();
                  });
                });
              } else {
                // It's an asset. Load it into the file system.
                importZip.openReadStream(entry, function (error, readStream) {
                  if (error) throw error;
                  readStream.on("end", function () {
                    importZip.readEntry();
                  });

                  let filename = entry.fileName.replace(
                    `${exportObj.exportable}/`,
                    "",
                  );
                  const directoryPath = filename
                    .split("/")
                    .splice(0, filename.split("/").length - 1)
                    .join("/");
                  mkdirp.sync(`${assetDir}/${directoryPath}`);
                  readStream.pipe(
                    fs.createWriteStream(`${assetDir}/${filename}`),
                  );
                });
              }
            });
            importZip.on("close", () => {
              fs.unlink(req.files[0].path, err => {
                if (err) {
                  res.end("Error");
                }
                res.end("Complete");
              });
            });
            importZip.readEntry();
          }
        },
      );
    }
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
    setInterval(function () {}, Math.pow(2, 31) - 1);
    process.on("uncaughtException", err => {
      console.error(chalk.red(`Caught exception: ${err}\n`));
      console.error(err);
    });
  } else {
    server.use("/assets/", express.static(path.resolve("./assets")));
  }
  // console.info(server._router.stack.map(r => r.route?.path).filter(Boolean));

  return server;
};
