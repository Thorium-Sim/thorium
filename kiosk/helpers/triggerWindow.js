const initHotkeys = require("./hotkeys");
const initRemote = require("./remote");
const { app } = require("electron");

module.exports = function triggerWindow(mainWindow) {
  mainWindow.setKiosk(true);
  initHotkeys(mainWindow);
  initRemote();

  mainWindow.on("closed", function() {
    app.quit();
  });
};
