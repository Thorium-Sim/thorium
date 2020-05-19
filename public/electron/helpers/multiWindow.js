const {screen, BrowserWindow} = require("electron");
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
let serverWindow = null;

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
      sandbox: true,
    },
  };
  if (server) {
    if (serverOpen) return;
    serverOpen = true;
    config.webPreferences.preload = path.resolve(__dirname + "/preload.js");
    serverWindow = new BrowserWindow(config);

    // Close all the other windows.
    bonjour.stop();
    windows.forEach(w => w.close());
    windows = [];

    // Change to the server page
    serverWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "../server.html"),
        protocol: "file:",
        slashes: true,
      }),
    );

    // Capture console messages
    const old_console_log = global.console.log;
    const old_console_info = global.console.info;
    global.console.log = function log() {
      old_console_log(...arguments);
      serverWindow.webContents.send("info", arguments[0]);
    };
    global.console.info = function info() {
      old_console_info(...arguments);
      serverWindow.webContents.send("info", arguments[0]);
    };

    // Start the Thorium server
    bootstrap(serverWindow).then(() =>
      setTimeout(() => console.info("Thorium Started"), 1000),
    );
    return;
  } else {
    if (main) {
      config.webPreferences.preload = path.resolve(__dirname + "/preload.js");
    } else {
      config.webPreferences.preload = `file:/${path.resolve(
        `${__dirname}/externalPreload.js`,
      )}`;
    }
    const window = new BrowserWindow(config);
    window.uniqueId = uuid.v4();
    window.browserCount = browserCount;
    window.on("closed", function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.

      windows.splice(
        windows.findIndex(w => w.uniqueId === window.uniqueId),
        1,
      );
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
    window.focus();
    window.webContents.focus();

    windows.push(window);
  }
}

module.exports.addWindow = addWindow;
