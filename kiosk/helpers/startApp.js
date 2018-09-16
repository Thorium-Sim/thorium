const electron = require("electron");
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const loadPage = require("./loadPage");
const startBonjour = require("./bonjour");
const settings = require("electron-settings");
const bootstrap = require("../../bootstrap").default;
const app = electron.app;

let mainWindow;
let browser;

module.exports = () => {
  app.on("ready", function() {
    const ipcMain = electron.ipcMain;
    ipcMain.on("loadPage", function(evt, uri) {
      loadPage(uri, mainWindow);
    });

    ipcMain.on("startServer", function() {
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

      globalShortcut.register("CommandOrControl+R", function() {
        mainWindow.reload();
      });

      globalShortcut.register("CommandOrControl+Alt+I", function() {
        mainWindow.webContents.openDevTools();
      });
      // Capture console messages
      const old_console_log = global.console.log;
      global.console.log = function log() {
        old_console_log(...arguments);
        mainWindow.webContents.send("info", arguments[0]);
      };

      // Start the Thorium server
      bootstrap();
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
    browser = startBonjour(mainWindow);
    //const savedURL = settings.get("url");
    // if (savedURL) {
    //   setTimeout(() => {
    //     loadPage(savedURL, mainWindow);
    //   }, 5000);
    // }
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true
      })
    );
    // mainWindow.webContents.on("did-fail-load", () => {
    //   // Load the default page
    //   mainWindow &&
    //     mainWindow.loadURL(
    //       url.format({
    //         pathname: path.join(__dirname, "../index.html"),
    //         protocol: "file:",
    //         slashes: true
    //       })
    //     );
    //   settings.deleteAll();
    //   setTimeout(() => {
    //     mainWindow.setKiosk(false);
    //   }, 1000);
    // });
  });
};

module.mainWindow = mainWindow;
