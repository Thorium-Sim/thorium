import fetch from "node-fetch";
import semver from "semver";
const fs = require("fs");
const request = require("request");
const path = require("path");
const paths = require("./paths");
const unzip = require("unzip");
const exec = require("child_process").exec;

// Check for updates on load
if (!process.env.CI && process.env.NODE_ENV === "production") {
  fetch("https://api.github.com/repos/thorium-sim/thorium/tags")
    .then(res => res.json())
    .then(res => {
      if (semver.gt(res[0].name, require("../../package.json").version)) {
        // It's newer. Download the latest.
        const platforms = {
          darwin: {
            url: "https://s3.amazonaws.com/thoriumsim/thorium-macos.zip",
            name: "thorium-macos"
          },
          linux: {
            url: "https://s3.amazonaws.com/thoriumsim/thorium-win.exe.zip",
            name: "thorium-win.exe"
          },
          win32: {
            url: "https://s3.amazonaws.com/thoriumsim/thorium-linux.zip",
            name: "thorium-linux"
          }
        };
        const processPath = process.execPath;
        const tempPath = path.resolve(paths.userData + "/" + "temp");

        if (!fs.existsSync(tempPath)) {
          fs.mkdirSync(tempPath);
        }
        console.log("Downloading update...");
        request({ uri: platforms[process.platform].url })
          .pipe(unzip.Extract({ path: tempPath }))
          .on("close", function() {
            console.log("Removing old version");
            fs.unlink(processPath, err => {
              if (err) {
                console.error(err);
              }
              console.log("Moving new version into place");
              fs.rename(
                tempPath + "/" + platforms[process.platform].name,
                processPath,
                error => {
                  if (error) {
                    console.error(error);
                  }
                  //Make it executable
                  if (["linux", "darwin"].indexOf(process.platform) > -1) {
                    const command = `chmod u+x ${processPath}`;
                    console.log(command);
                    exec(command);
                  }
                  console.log(
                    "Download Complete. Restart Thorium Server to apply changes."
                  );
                }
              );
            });
          });
      }
    })
    .catch(() => {
      //Oh well.
    });
}
