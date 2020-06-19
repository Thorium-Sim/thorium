const webFrame = require("electron").webFrame;

let browserCount = require("electron").remote.getCurrentWindow().browserCount;
const key = "thorium_clientPersistentId";
let clientId = sessionStorage.getItem(key);

webFrame.setVisualZoomLevelLimits(1, 1);

setClientId(
  `${require("os").hostname()}${browserCount > 1 ? ` (${browserCount})` : ""}`,
);

function setClient(id) {
  sessionStorage.setItem(key, id);
  clientId = id;
  localStorage.setItem("thorium_clientId", id);
}

function setClientId(id) {
  const clientList = getClientList();
  const clientIndex = clientList.indexOf(clientId);
  setClient(id);
  clientList[clientIndex] = id;
  localStorage.setItem(key, JSON.stringify(clientList));
}

function getClientList() {
  let clientList = null;
  try {
    clientList = JSON.parse(localStorage.getItem(key));
  } catch {
    // It errored - it either doesn't exist or isn't JSON.
    // If it's blank, create a new one
  }
  if (!clientList) {
    clientList = [localStorage.getItem(key) || require("os").hostname()];
    localStorage.setItem(key, JSON.stringify(clientList));
  }
  return clientList;
}
