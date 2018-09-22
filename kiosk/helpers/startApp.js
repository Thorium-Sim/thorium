const {
  app,
  globalShortcut,
  BrowserWindow,
  ipcMain
} = require("electron");
const { autoUpdater } = require("electron-updater");

const path = require("path");
const url = require("url");
const loadPage = require("./loadPage");
const startBonjour = require("./bonjour");
const settings = require("electron-settings");
const bootstrap = require("../../bootstrap").default;
const {setMenubar} = require("./setMenubar");
const hotkeys = require('./hotkeys');
let mainWindow;
let browser;

module.exports = () => {
  function startServer() {
    console.log("Starting server - main");
    // Stop the bonjour browser
    browser && browser.stop();

    // Change to the server page
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "../server.html"),
        protocol: "file:",
        slashes: true
      })
    );
    ipcMain.on("openBrowser", function() {
      console.log("open in browser");
      var ipaddress = require("./helpers/ipaddress");
      var openBrowser = require("react-dev-utils/openBrowser");
      console.log(`http://${ipaddress}:1337`);
      openBrowser(`http://${ipaddress}:1337`);
    });
    hotkeys(mainWindow);

    // Capture console messages
    const old_console_log = global.console.log;
    global.console.log = function log() {
      old_console_log(...arguments);
      mainWindow.webContents.send("info", arguments[0]);
    };

    // Start the Thorium server
    bootstrap().then(() =>
      setTimeout(() => console.log("Thorium Started"), 1000)
    );
  }
  app.on("ready", function() {
    autoUpdater.checkForUpdatesAndNotify();
    ipcMain.on("loadPage", function(evt, { url, auto }) {
      if (auto) {
        settings.set("autostart", url);
      }
      loadPage(url, mainWindow).catch(() => {
        settings.set("autostart", null);
        browser = startBonjour(mainWindow);
      });
    });

    ipcMain.on("startServer", function(evt, auto) {
      if (auto) {
        settings.set("autostart", "server");
      }
      startServer();
    });
    mainWindow = new BrowserWindow({
      backgroundColor: "#2e2c29",
      width: 800,
      height: 600,
      kiosk: false,
      webPreferences: {
        nodeIntegration: false,
        preload: path.resolve(__dirname + "/../preload.js")
      }
    });
    mainWindow.on("closed", function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      browser && browser.stop();
      mainWindow = null;
    });
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true
      })
    );
    if (settings.get("autostart") === "server") {
      startServer();
    } else if (settings.get("autostart")) {
      // Check to see if the page will work.
      const url = settings.get("autostart");
      // Do a fetch
      loadPage(url, mainWindow).catch(() => {
        settings.set("autostart", null);
        browser = startBonjour(mainWindow);
      });
    } else {
      browser = startBonjour(mainWindow);
    }
    setMenubar(mainWindow);
    app.on("window-all-closed", function() {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      app.quit();
    });
  });
};

module.mainWindow = mainWindow;
