import fetch from "node-fetch";
import semver from "semver";
import App from "../app";
import ProgressBar from "progress";

const fs = require("fs");
const request = require("request");
const path = require("path");
const paths = require("../helpers/paths");
// const unzip = require("unzip");
const exec = require("child_process").exec;

// Check for updates on load
export default autoUpdate => {
  // if (
  //   !process.env.CI &&
  //   process.env.NODE_ENV === "production" &&
  //   (App.autoUpdate || autoUpdate)
  // ) {
  //   return fetch("https://api.github.com/repos/thorium-sim/thorium/tags")
  //     .then(res => res.json())
  //     .then(res => {
  //       if (semver.gt(res[0].name, require("../../package.json").version)) {
  //         // It's newer. Download the latest.
  //         const platforms = {
  //           darwin: {
  //             url: "https://s3.amazonaws.com/thoriumsim/thorium-macos.zip",
  //             name: "thorium-macos"
  //           },
  //           linux: {
  //             url: "https://s3.amazonaws.com/thoriumsim/thorium-linux.zip",
  //             name: "thorium-linux"
  //           },
  //           win32: {
  //             url: "https://s3.amazonaws.com/thoriumsim/thorium-win.exe.zip",
  //             name: "thorium-win.exe"
  //           }
  //         };
  //         const processPath = process.execPath;
  //         const tempPath = path.resolve(paths.userData + "/" + "temp");
  //         if (!fs.existsSync(tempPath)) {
  //           fs.mkdirSync(tempPath);
  //         }
  //         console.log("Downloading update...");
  //         const exePath = path.resolve(
  //           processPath +
  //             `/../${platforms[process.platform].name.replace(".exe", "")}-${
  //               res[0].name
  //             }${process.platform === "win32" ? ".exe" : ""}`
  //         );
  //         let bar;
  //         request({ uri: platforms[process.platform].url })
  //           .on("response", function(data) {
  //             bar = new ProgressBar(
  //               `Downloading: [:bar] :percent Elapsed: :elapseds ETA: :etas`,
  //               {
  //                 total: parseInt(data.headers["content-length"], 10),
  //                 complete: "=",
  //                 incomplete: " ",
  //                 width: 20
  //               }
  //             );
  //           })
  //           .on("data", function(chunk) {
  //             bar.tick(chunk.length);
  //           })
  //           .pipe(unzip.Extract({ path: tempPath }))
  //           .on("close", function() {
  //             console.log("Moving new version into place");
  //             fs.rename(
  //               tempPath + "/" + platforms[process.platform].name,
  //               exePath,
  //               error => {
  //                 if (error) {
  //                   console.error(error);
  //                 }
  //                 if (["linux", "darwin"].indexOf(process.platform) > -1) {
  //                   const command = `chmod 777 ${exePath}`;
  //                   exec(command);
  //                 }
  //                 console.log(
  //                   `Download Complete. Close this window and open ${platforms[
  //                     process.platform
  //                   ].name.replace(".exe", "")}-${res[0].name}${
  //                     process.platform === "win32" ? ".exe" : ""
  //                   } for the updated version.`
  //                 );
  //               }
  //             );
  //             return;
  //           });
  //       }
  //     })
  //     .catch(() => {
  //       console.error("error auto updating");
  //     });
  // }
};
