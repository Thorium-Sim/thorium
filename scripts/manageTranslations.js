import manageTranslations from "react-intl-translations-manager";
import * as fs from "fs";
import path from "path";
import { sync as globSync } from "glob";
import { sync as mkdirpSync } from "mkdirp";
import { transformFile } from "@babel/core";
import ProgressBar from "progress";

const regex = /\.(js|jsx)$/i;
function walkSync(dir, filelist) {
  if (dir[dir.length - 1] !== "/") dir = dir.concat("/");
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.existsSync(dir + file)) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = walkSync(dir + file + "/", filelist);
      } else if (regex.test(file)) {
        filelist.push(dir + file);
      }
    }
  });
  return filelist;
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

const files = walkSync("./client/src");
const bar = new ProgressBar(
  `Compiling: [:bar] :percent Elapsed: :elapseds ETA: :etas`,
  {
    total: files.length,
    complete: "=",
    incomplete: " ",
    width: 20
  }
);

files
  .reduce(
    (prev, file) =>
      prev.then(messages =>
        new Promise((resolve, reject) =>
          transformFile(
            file,
            {
              presets: ["env", "react", "stage-0"],
              plugins: ["react-intl"]
            },
            function(err, result) {
              bar.tick(1);
              if (err) reject(err);
              if (!result) {
                console.log("Failed to process file:", file);
                return resolve();
              }
              const { metadata } = result;
              const { messages } = metadata["react-intl"];
              if (messages.length === 0) return resolve();
              const filename = file
                .replace("./client/src", "./client/src/translations/src")
                .replace(".js", ".json");
              ensureDirectoryExistence(filename);
              fs.writeFile(filename, JSON.stringify(messages), err => {
                if (err) return reject(err);
                return resolve();
              });
            }
          )
        ).catch(err => {
          console.error("Error processing file:", file);
          console.error(err);
        })
      ),
    Promise.resolve([])
  )
  .then(res => {
    const filePattern = "./client/src/translations/**/*.json";
    const outputDir = "./client/src/locales/";

    const languages = require("../client/package.json").languages;

    manageTranslations({
      messagesDirectory: "client/src/translations",
      translationsDirectory: "client/src/locales",
      singleMessagesFile: true,
      languages // any language you need
    });
  })

  .catch(err => {
    throw new Error(err);
  });
