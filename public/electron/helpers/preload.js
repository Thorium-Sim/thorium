const ipcRenderer = require("electron").ipcRenderer;
const webFrame = require("electron").webFrame;
let port;
let httpOnly;

let browserCount = require("electron").remote.getCurrentWindow().browserCount;

async function getPortAndHttpOnly() {
  const results = await ipcRenderer.invoke("get-port");
  port = results.port;
  httpOnly = results.httpOnly;
}
getPortAndHttpOnly();

const key = "thorium_clientPersistentId";
let clientId = sessionStorage.getItem(key);
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);

setClientId();

function setClient(id) {
  sessionStorage.setItem(key, id);
  localStorage.setItem("thorium_clientId", id);
  clientId = id;
}

async function setClientId() {
  const hostname = await ipcRenderer.invoke("get-hostname");

  const id = `${hostname}${browserCount > 1 ? ` (${browserCount})` : ""}`;
  const clientList = getClientList(hostname);
  const clientIndex = clientList.indexOf(clientId);
  setClient(id);
  clientList[clientIndex] = id;
  localStorage.setItem(key, JSON.stringify(clientList));
}

function getClientList(hostname) {
  let clientList = null;
  try {
    clientList = JSON.parse(localStorage.getItem(key));
  } catch {
    // It errored - it either doesn't exist or isn't JSON.
    // If it's blank, create a new one
  }
  if (!clientList) {
    clientList = [localStorage.getItem(key) || hostname];
    localStorage.setItem(key, JSON.stringify(clientList));
  }
  return clientList;
}

document.addEventListener("DOMContentLoaded", async function () {
  if (localStorage.getItem("thorium_startKiosked") !== "false") {
    if (document.getElementById("start-kiosked")) {
      document.getElementById("start-kiosked").checked = true;
    }
  }
  const autostart = await ipcRenderer.invoke("getServerAutostart");
  const autostartEl = document.getElementById("remember-server");
  if (autostartEl) {
    autostartEl.checked = Boolean(autostart);
    autostartEl.addEventListener("change", e => {
      ipcRenderer.send("setServerAutostart", e.target.checked);
    });
  }
  if (autostart) {
    const cancelAutostartEl = document.getElementById("stop-auto-start");
    cancelAutostartEl.hidden = false;
  }
});

window.cancelAutostart = function cancelAutostart() {
  ipcRenderer.send("cancelServerAutostart");
};

window.loadPage = function loadPage(url) {
  let auto = false;
  if (document.getElementById("remember-client").checked) auto = true;
  let kiosk = document.getElementById("start-kiosked").checked;
  localStorage.setItem("thorium_startKiosked", kiosk);
  ipcRenderer.send("loadPage", {url, auto, kiosk});
  return;
};
window.startServer = function startServer() {
  let auto = false;
  if (document.getElementById("remember-server").checked) {
    auto = true;
  }
  ipcRenderer.send("startServer", auto);
  return;
};
function printUrl() {
  return `http${httpOnly ? "" : "s"}://localhost${
    (port === 443 && !httpOnly) || (port === 80 && httpOnly) ? "" : `:${port}`
  }`;
}
function openBrowser() {
  ipcRenderer.send("open-external", printUrl());
  return;
}
window.getServers = function () {
  ipcRenderer.send("getServers");
};
window.serverAddress = function serverAddress() {
  let url = document
    .getElementById("server-address")
    .value.replace("/client", "");
  if (url.indexOf(":") === -1) url = `${url}:${port}`;
  let auto = false;
  if (document.getElementById("remember-client").checked) auto = true;
  ipcRenderer.send("loadPage", {url, auto});
};
ipcRenderer.on("info", function (event, data) {
  const output = document.getElementById("console");
  if (output) {
    output.innerText = `${data}\n${output.innerText}`;
  }
});

window.getIpAddress = async function (cb) {
  const ipAddress = await ipcRenderer.invoke("get-ipAddress");
  cb(ipAddress, port, httpOnly);
};

const thorium = {
  sendMessage: function (arg) {
    return ipcRenderer.send("remoteMessage", arg);
  },
  getDMXDeviceList: function () {
    return ipcRenderer.invoke("get-usbDevices");
  },
  activateDMX: function (config) {
    return ipcRenderer.send("activate-dmx", config);
  },
  sendDMXValue: function (universe) {
    return ipcRenderer.send("send-dmx-value", universe);
  },
};

document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Network Settings
    const httpOnlyEl = document.getElementById("http-only");
    const portEl = document.getElementById("port");
    if (httpOnlyEl) {
      httpOnlyEl.checked = httpOnly;

      httpOnlyEl.addEventListener("change", e => {
        ipcRenderer.send("set-httpOnly", e.target.checked);
        httpOnly = e.target.checked;
        thorium.httpOnly = e.target.checked;
        if (portEl.value === "443" && httpOnly) {
          portEl.value = "80";
          ipcRenderer.send("set-port", 80);
          port = 80;
          thorium.port = 80;
        } else if (portEl.value === "80" && !httpOnly) {
          portEl.value = "443";
          ipcRenderer.send("set-port", 443);
          port = 443;
          thorium.port = 443;
        }
      });
    }
    if (portEl) {
      portEl.value = port;

      portEl.addEventListener("change", e => {
        ipcRenderer.send("set-port", e.target.value);
        port = e.target.value;
        thorium.port = e.target.value;
      });
    }
    // Server Browser Open
    const openEl = document.getElementById("open-in-browser");
    if (openEl) {
      openEl.addEventListener("click", openBrowser);
    }
    const kioskEl = document.getElementById("open-client-window");
    if (kioskEl) {
      kioskEl.addEventListener("click", function openClient() {
        ipcRenderer.send("loadPage", {
          url: `${printUrl()}/client`,
          kiosk: false,
          auto: false,
        });
      });
    }

    // Auto Update
    const autoUpdateEl = document.getElementById("auto-update");
    const autoUpdateLabel = document.getElementById("auto-update-label");
    const autoUpdateButton = document.getElementById("auto-update-download");
    const autoUpdateProgress = document.getElementById("download-progress");
    if (autoUpdateEl) {
      ipcRenderer.send("check-for-updates");

      ipcRenderer.on("has-updates", function (e, {oldVersion, newVersion}) {
        autoUpdateLabel.innerText = `Your version of Thorium is outdated. Current version is ${newVersion}. Your version is ${oldVersion}`;
        autoUpdateEl.classList.add("shown");
      });

      autoUpdateButton.addEventListener("click", () => {
        ipcRenderer.send("downloadAutoUpdate");
        ipcRenderer.on("download-progress", function (e, progress) {
          autoUpdateProgress.value = progress;
        });
        ipcRenderer.on("download-complete", function () {
          autoUpdateLabel.innerText = `Update Complete! Restart the app to apply the update.`;
          autoUpdateProgress.hidden = true;
        });
        autoUpdateLabel.innerText = `Update is being downloaded. Please wait.`;
        autoUpdateButton.hidden = true;
        autoUpdateProgress.hidden = false;
      });
    }
  },
  false,
);

ipcRenderer.on("clearUrl", function () {
  localStorage.setItem("thorium_url", "");
});

ipcRenderer.on("updateServers", function updateServers(e, servers) {
  if (document.getElementById("loading")) {
    if (servers.length === 0) {
      document.getElementById("loading").classList.remove("hidden");
      document.getElementById("servers").classList.add("hidden");
    } else {
      document.getElementById("loading").classList.add("hidden");
      document.getElementById("servers").classList.remove("hidden");
    }
    const markup = servers.map(
      s => `<button onclick="loadPage('${s.url}')">${s.name}</button>`,
    );
    document.getElementById("serverList").innerHTML = markup;
  }
});

window.thorium = thorium;
