const { app, globalShortcut } = require("electron");
module.exports = mainWindow => {
  // Create the browser window.
  globalShortcut.register("CommandOrControl+Alt+E", function() {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  });

  globalShortcut.register("CommandOrControl+Q", function() {
    // Do nothing.
  });

  globalShortcut.register("CommandOrControl+W", function() {
    // Do nothing.
  });

  globalShortcut.register("CommandOrControl+R", function() {
    mainWindow.reload();
  });

  globalShortcut.register("CommandOrControl+Alt+I", function() {
    mainWindow.webContents.openDevTools();
  });
  globalShortcut.register("CommandOrControl+Alt+K", function() {
    if (mainWindow.isKiosk()) {
      mainWindow.setKiosk(false);
    } else {
      mainWindow.setKiosk(true);
    }
  });
  globalShortcut.register("CommandOrControl+Alt+Q", function() {
    app.quit();
  });
};
