const {screen, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const {bonjour} = require("./bonjour");
const uuid = require("uuid");
const url = require("url");
const bootstrap = require("./bootstrap");
let windows = [];

function checkWindow() {
  let displays = screen.getAllDisplays();
  let externalDisplay = displays.find(display => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });
  if (externalDisplay) {
    module.exports.addWindow({
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50,
    });
  }
}

module.exports.checkWindow = checkWindow;
module.exports.windows = windows;

let serverOpen = false;
let browserCount = 0;
function addWindow({main, x, y, loadedUrl, server}) {
  browserCount++;
  const config = {
    backgroundColor: "#2e2c29",
    width: 800,
    height: 700,
    x,
    y,
    kiosk: false,
    webPreferences: {
      nodeIntegration: false,
    },
  };
  if (server) {
    if (serverOpen) return;
    serverOpen = true;
    const window = new BrowserWindow(config);
    window.uniqueId = uuid.v4();
    window.browserCount = browserCount;

    window.on("closed", function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.

      windows = windows.filter(w => w.uniqueId !== window.uniqueId);
      if (windows.length === 0) {
        bonjour.stop();
      }
    });

    // Change to the server page
    window.loadURL(
      url.format({
        pathname: path.join(__dirname, "../server.html"),
        protocol: "file:",
        slashes: true,
      }),
    );
    ipcMain.on("openBrowser", function() {
      var ipaddress = require("./ipaddress");
      var openBrowser = require("react-dev-utils/openBrowser");
      console.log(`http://${ipaddress}:4444`);
      openBrowser(`http://${ipaddress}:4444`);
    });

    // Capture console messages
    const old_console_log = global.console.log;
    global.console.log = function log() {
      old_console_log(...arguments);
      window.webContents.send("info", arguments[0]);
    };

    // Start the Thorium server
    bootstrap().then(() =>
      setTimeout(() => console.log("Thorium Started"), 1000),
    );
    windows.push(window);
    return;
  } else {
    if (main) {
      config.webPreferences.preload = path.resolve(__dirname + "/preload.js");
    } else {
      config.webPreferences.preload = path.resolve(
        __dirname + "/externalPreload.js",
      );
    }
    const window = new BrowserWindow(config);
    window.uniqueId = uuid.v4();
    window.browserCount = browserCount;
    window.on("closed", function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.

      windows = windows.filter(w => w.uniqueId !== window.uniqueId);
      if (windows.length === 0) {
        bonjour.stop();
      }
    });
    window.loadURL(
      loadedUrl
        ? loadedUrl
        : url.format({
            pathname: path.join(
              __dirname,
              main ? "../index.html" : "../external.html",
            ),
            protocol: "file:",
            slashes: true,
          }),
    );
  }
  windows.push(window);
}

module.exports.addWindow = addWindow;
