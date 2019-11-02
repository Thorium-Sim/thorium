const {app} = require("electron");
const path = require("path");

const isProd = !require("electron-is-dev");

module.exports = function bootstrap() {
  const childPath = isProd
    ? "build/server/index.js"
    : "server/build/server/index.js";
  const child = require("child_process").fork(
    path.join(app.getAppPath(), childPath),
    {env: {FORK: 1}},
  );

  app.on("before-quit", () => {
    child.kill();
  });

  return Promise.resolve(child);
};
