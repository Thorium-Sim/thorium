const {app} = require("electron");
const path = require("path");

const isProd = !require("electron-is-dev");

module.exports = function bootstrap(serverWindow) {
  const childPath = isProd
    ? "build/server/index.js"
    : "server/build/server/index.js";
  const child = require("child_process").fork(
    path.join(app.getAppPath(), childPath),
    [],
    {env: {FORK: 1}, silent: true},
  );

  child.stdout.on("data", function(data) {
    serverWindow.webContents.send("info", data);
  });
  child.stderr.on("data", function(data) {
    serverWindow.webContents.send("info", data);
  });

  app.on("before-quit", () => {
    child.kill();
  });

  return Promise.resolve(child);
};
