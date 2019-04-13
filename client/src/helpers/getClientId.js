import randomWords from "random-words";

const key = "thorium_clientId";
let clientId = sessionStorage.getItem(key);
let windows = [];
let broadcastChannel;
if (window.BroadcastChannel) {
  broadcastChannel = new BroadcastChannel("thorium_clientCount");
}
// This client ID implementation works as follows:
export function initializeClient() {
  if (window.BroadcastChannel) {
    broadcastChannel.onmessage = function(ev) {
      if (ev.data === "clientPing") {
        if (clientId) {
          broadcastChannel.postMessage(clientId);
        }
      } else {
        if (!windows.includes(ev.data)) windows.push(ev.data);
      }
    };
    getClientId();
  }
}

function setClient(id) {
  sessionStorage.setItem(key, id);
  clientId = id;
}
export function getClientId() {
  return new Promise(resolve => {
    if (clientId) {
      return resolve(clientId);
    }

    const clientList = getClientList();

    if (broadcastChannel) {
      broadcastChannel.postMessage("clientPing");
      // Lets give a bit of time for the windows to get back
      setTimeout(() => {
        if (clientId) {
          return resolve(clientId);
        }
        for (let i = 0; i < clientList.length; i++) {
          if (!windows.includes(clientList[i])) {
            setClient(clientList[i]);
            return resolve(clientId);
          }
        }
        if (!clientId) {
          setClient(randomWords(3).join("-"));
          clientList.push(clientId);
          localStorage.setItem(key, JSON.stringify(clientList));
          return resolve(clientId);
        }
      }, 500);
    } else {
      setClient(clientList[0]);
      return resolve(clientId);
    }
  }).then(res => {
    return res;
  });
}
export function setClientId(id) {
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
    clientList = [localStorage.getItem(key) || randomWords(3).join("-")];
    localStorage.setItem(key, JSON.stringify(clientList));
  }
  return clientList;
}
