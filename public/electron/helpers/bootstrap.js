const {app} = require("electron");
const path = require("path");
const isProd = !require("electron-is-dev");
const settings = require("electron-settings");

let restartCount = 0;
module.exports = function bootstrap(serverWindow) {
  function startServer() {
    let port = settings.get("port") || 443;
    let httpOnly =
      settings.get("httpOnly") === "true" ||
      settings.get("httpOnly") === true ||
      false;

    const childPath = isProd
      ? "build/server/index.js"
      : "server/build/server/index.js";
    const child = require("child_process").fork(
      path.join(app.getAppPath(), childPath),
      [],
      {
        env: {
          FORK: 1,
          PORT: parseInt(port, 10),
          HTTP_ONLY: httpOnly,
          NODE_ENV: "production",
          ...process.env,
        },
        // execArgv: [
        //   "--nouse-idle-notification",
        //   "--expose-gc",
        //   "--max-new-space-size=2048",
        //   "--max-old-space-size=8192",
        // ],
        silent: true,
        maxBuffer: 1024 * 1024 * 1024,
      },
    );

    child.stdout.on("data", function(data) {
      const message = data.toString();
      serverWindow.webContents.send("info", message);
    });
    child.stderr.on("data", function(data) {
      const error = data.toString();
      if (error.includes("DeprecationWarning: Buffer()")) return;
      serverWindow.webContents.send("info", error);
    });
    child.on("close", function(code) {
      if (serverWindow && restartCount < 10) {
        try {
          serverWindow.webContents.send(
            "info",
            `Server process closed. Restarting...`,
          );
          startServer();
        } catch {
          // Do nothing, we're probably shutting down.
        }
      } else {
        if (serverWindow) {
          serverWindow.webContents.send(
            "info",
            `Server process closed. Too many restarts. Closing Thorium Server.`,
          );
        }
        app.quit();
      }
      restartCount++;
    });
    child.on("error", function(err) {
      serverWindow.webContents.send(
        "info",
        `Error in server process: ${err.message}`,
      );
      console.log(err);
    });

    app.on("before-quit", () => {
      child.kill();
    });
  }
  startServer();
  return Promise.resolve();
};

setInterval(() => {
  restartCount = Math.max(0, restartCount - 1);
}, 10 * 1000);
