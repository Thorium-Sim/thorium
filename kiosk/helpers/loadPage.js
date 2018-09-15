const triggerWindow = require("./triggerWindow");
const settings = require("electron-settings");

module.exports = function loadPage(uri, mainWindow) {
  settings.set("url", uri);
  mainWindow && mainWindow.loadURL(uri);
  triggerWindow(mainWindow);
};
