const electron = require("electron");
const app = electron.app;

module.exports = function(mainWindow) {
  var template = [
    {
      label: "Application",
      submenu: [
        {
          label: "About Application",
          selector: "orderFrontStandardAboutPanel:"
        },
        {
          label: "Quit",
          accelerator: "CmdOrCtrl+Alt+Q",
          click: function() {
            app.quit();
          }
        },
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+Alt+R",
          click: function() {
            mainWindow && mainWindow.reload();
          }
        },

        {
          label: "Kiosk",
          accelerator: "CmdOrCtrl+Alt+K",
          click: function() {
            if (mainWindow && mainWindow.isKiosk()) {
              mainWindow.setKiosk(false);
            } else {
              mainWindow.setKiosk(true);
            }
          }
        },
        {
          label: "Dev Tools",
          accelerator: "CmdOrCtrl+Alt+I",
          click: function() {
            mainWindow && mainWindow.webContents.openDevTools();
          }
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        }
      ]
    }
  ];
  return template;
};
