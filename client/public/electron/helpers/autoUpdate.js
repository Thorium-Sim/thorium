const {ipcMain} = require("electron");
const {autoUpdater} = require("electron-updater");
const oldVersion = require("../../../package.json").version;

module.exports = function autoUpdateInit() {
  ipcMain.on("check-for-updates", async event => {
    autoUpdater.checkForUpdates();
    autoUpdater.on("update-available", info => {
      event.sender.send("has-updates", {oldVersion, newVersion: info.version});
    });
  });
  ipcMain.on("downloadAutoUpdate", async event => {
    autoUpdater.downloadUpdate();

    autoUpdater.on("download-progress", progressObj => {
      event.sender.send("download-progress", progressObj.percent);
    });
    autoUpdater.on("update-downloaded", () => {
      event.sender.send("download-complete", {});
    });
  });
};
