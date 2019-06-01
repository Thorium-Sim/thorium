import App from "../app";
import Client from "../classes/client";
import Sound from "../classes/sound";
import Viewscreen from "../classes/viewscreen";
import { pubsub } from "../helpers/subscriptionManager.js";
import path from "path";
import paths from "../helpers/paths";
import fs from "fs";
import uuid from "uuid";
import tokenGenerator from "../helpers/tokenGenerator";
function randomFromList(list) {
  if (!list) return;
  const length = list.length;
  const index = Math.floor(Math.random() * length);
  return list[index];
}

function performKeypadAction(id, action) {
  const clientObj = App.clients.find(c => c.id === id);
  if (clientObj) {
    action(clientObj.keypad, clientObj);
    pubsub.publish("keypadUpdate", clientObj.keypad);
    pubsub.publish(
      "keypadsUpdate",
      App.clients.filter(c => c.simulatorId === clientObj.simulatorId)
    );
  }
}
function performScannerAction(id, action) {
  const clientObj = App.clients.find(c => c.id === id);
  if (clientObj) {
    action(clientObj.scanner, clientObj);
    pubsub.publish("scannerUpdate", clientObj.scanner);
    pubsub.publish(
      "scannersUpdate",
      App.clients.filter(c => c.simulatorId === clientObj.simulatorId)
    );
  }
}

App.on("clientConnect", ({ client, label, mobile, cards }) => {
  const clientObj = App.clients.find(c => c.id === client);
  if (clientObj) {
    // There is a client alread in the database
    // Just make sure it is connected
    clientObj.connect({ mobile, label, cards });
  } else {
    // Add it to the server
    const newClient = new Client({
      id: client,
      connected: true,
      label,
      mobile,
      cards
    });
    App.clients.push(newClient);
  }
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientDisconnect", ({ client }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj && clientObj.disconnect();
  pubsub.publish("clientChanged", App.clients);
});

App.on("clientSetFlight", ({ client, flightId, cb }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.setFlight(flightId);
  pubsub.publish("clientChanged", App.clients);
  cb && cb();
});
App.on("clientSetSimulator", ({ client, simulatorId, cb }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.setSimulator(simulatorId);
  pubsub.publish("clientChanged", App.clients);
  cb && cb();
});
App.on("clientSetStation", ({ client, stationName, cb }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.setStation(stationName);
  pubsub.publish("clientChanged", App.clients);
  // If the station name is 'Viewscreen', check for or create a viewscreen for the client
  if (
    stationName === "Viewscreen" &&
    !App.viewscreens.find(
      v => v.id === clientObj.id && v.simulatorId === clientObj.simulatorId
    )
  ) {
    App.viewscreens.push(
      new Viewscreen({
        id: clientObj.id,
        simulatorId: clientObj.simulatorId
      })
    );
    pubsub.publish("viewscreensUpdate", App.viewscreens);
  }
  cb && cb();
});
App.on("clientLogin", ({ client, loginName }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.login(loginName);

  // Log in the client to indicate that it was part of this flight
  const flight = App.flights.find(f => f.id === clientObj.flightId);
  flight.loginClient({
    id: clientObj.id,
    token: tokenGenerator(),
    simulatorId: clientObj.simulatorId,
    name: clientObj.station
  });

  pubsub.publish("clientChanged", App.clients);
});
App.on("clientSetEmail", ({ client, email }) => {
  const clientObj = App.clients.find(c => c.id === client);

  const flight = App.flights.find(f => f.id === clientObj.flightId);
  flight.addClientEmail(client, email);
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientLogout", ({ client }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.logout();
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientDiagnostic", ({ client }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.diagnostic();
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientReset", ({ client }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.reset();
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientLockScreen", ({ client }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.lockScreen();
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientUnlockScreen", ({ client }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.unlockScreen();
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientOfflineState", ({ client, state }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.setOfflineState(state);
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientSetTraining", ({ client, training }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.setTraining(training);
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientAddCache", ({ client, simulatorId, viewscreen, cacheItem }) => {
  const clientObj = App.clients.find(
    c =>
      c.id === client ||
      (c.simulatorId === simulatorId && c.station === "Viewscreen")
  );
  clientObj && clientObj.addCache(cacheItem);
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientRemoveCache", ({ client, cacheItem }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.removeCache(cacheItem);
  pubsub.publish("clientChanged", App.clients);
});

App.on("setClientHypercard", ({ clientId, simulatorId, component }) => {
  const clients = App.clients.filter(
    c => c.id === clientId || c.simulatorId === simulatorId
  );
  clients.forEach(c => {
    c.setHypercard(component);
  });
  pubsub.publish("clientChanged", App.clients);
});
App.on(
  "playSound",
  ({ sound, type, station, simulatorId, clientId, clients }) => {
    if (type === "random") {
      // Get a random sound from that folder.
      const soundExts = ["m4a", "wav", "mp3", "ogg", "aiff", "aif"];
      let assetDir = path.resolve("./assets/");
      if (process.env.NODE_ENV === "production") {
        assetDir = paths.userData + "/assets";
      }
      const sounds = fs
        .readdirSync(assetDir + sound.asset)
        .filter(
          f =>
            fs.lstatSync(assetDir + sound.asset + "/" + f).isFile() &&
            f[0] !== "." &&
            soundExts.find(s => f.indexOf(`.${s}`) > -1)
        )
        .map(f => `${sound.asset}/${f}`);
      if (sounds.length > -1) {
        sound.asset = randomFromList(sounds);
      }
    }
    if (!clients) {
      let stationObj = station || "all";
      if (station === "random") {
        const sim = App.simulators.find(s => s.id === simulatorId);
        if (sim) {
          stationObj = randomFromList(sim.stations).name;
        }
      }
      clients = App.clients.filter(
        c =>
          (c.simulatorId === simulatorId &&
            (c.station === stationObj || stationObj === "all")) ||
          c.id === clientId ||
          c.id === station ||
          (c.simulatorId === simulatorId &&
            stationObj === "Sound" &&
            c.soundPlayer)
      );
      clients = clients.map(c => c.id);
    }
    const soundObj = new Sound(sound);
    soundObj.clients = soundObj.clients.concat(clients);
    if (soundObj.looping) {
      // Check it with the sound list if it is looping
      const loopingSound = App.sounds.find(s => {
        // Check to see if the sound exists in the list
        return (
          s.looping &&
          JSON.stringify(s.clients.sort()) ===
            JSON.stringify(soundObj.clients.sort()) &&
          s.asset === soundObj.asset &&
          s.volume === soundObj.volume &&
          s.playbackRate === soundObj.playbackRate &&
          JSON.stringify(s.channel) === JSON.stringify(soundObj.channel)
        );
      });
      if (loopingSound) {
        App.sounds = App.sounds.filter(s => s.id !== loopingSound.id);
        return pubsub.publish("cancelSound", loopingSound);
      }
      App.sounds.push(soundObj);
    }
    pubsub.publish("soundSub", soundObj);
  }
);
App.on("stopAllSounds", ({ simulatorId, station }) => {
  const clients = App.clients.filter(s => {
    if (s.simulatorId !== simulatorId) return false;
    if (station) {
      if (s.station === station || s.id === station) return true;
      return false;
    }
    return true;
  });
  // Remove all of the sounds that have one of the clients
  App.sounds = App.sounds.filter(s => {
    const client = clients.find(c => s.clients.indexOf(c) > -1);
    if (client) return true;
    return false;
  });
  pubsub.publish("cancelAllSounds", clients);
});
App.on("cancelLoopingSounds", ({ simulatorId, station }) => {
  const clients = App.clients.filter(s => {
    if (s.simulatorId !== simulatorId) return false;
    if (station) {
      if (s.station === station || s.id === station) return true;
      return false;
    }
    return true;
  });
  // Remove all of the sounds that have one of the clients
  App.sounds = App.sounds.filter(s => {
    const client = clients.find(c => s.clients.indexOf(c) > -1);
    if (client) return true;
    return false;
  });
  pubsub.publish("cancelLoopingSounds", clients);
});
App.on(
  "applyClientSet",
  ({ id, flightId, simulatorId, templateId, stationSetId }) => {
    const set = App.sets.find(s => s.id === id);
    if (!set) return;
    const { name, clients } = set;
    // Rename the simulator
    const simulator = App.simulators.find(s => s.id === simulatorId);
    simulator.rename(name);

    clients
      .filter(
        c => c.simulatorId === templateId && c.stationSet === stationSetId
      )
      .forEach(c => {
        const client = App.clients.find(cl => c.clientId === cl.id);
        client.setFlight(flightId);
        client.setSimulator(simulatorId);
        client.setStation(c.station.replace("mobile:", ""));
        if (c.soundPlayer) client.setSoundPlayer(true);
        // If the station name is 'Viewscreen', check for or create a viewscreen for the client
        if (c.station === "Viewscreen") {
          const vs = App.viewscreens.find(
            v => v.id === client.id && v.simulatorId === client.simulatorId
          );
          if (!vs) {
            App.viewscreens.push(
              new Viewscreen({
                id: client.id,
                simulatorId: client.simulatorId,
                secondary: c.secondary
              })
            );
          } else {
            vs.secondary = c.secondary;
          }
        }
      });
    pubsub.publish("viewscreensUpdate", App.viewscreens);
    pubsub.publish("clientChanged", App.clients);
  }
);
App.on("clientMovieState", ({ client, movie }) => {
  const c = App.clients.find(c => c.id === client);
  c.setMovie(movie);
  pubsub.publish("clientChanged", App.clients);
});

App.on("clientSetSoundPlayer", ({ client, soundPlayer }) => {
  const c = App.clients.find(c => c.id === client);
  c.setSoundPlayer(soundPlayer);
  pubsub.publish("clientChanged", App.clients);
});

App.on("setClientOverlay", ({ id, overlay }) => {
  const c = App.clients.find(c => c.id === id);
  c.setOverlay(overlay);
  pubsub.publish("clientChanged", App.clients);
});

App.on("clientCrack", ({ id, crack }) => {
  const c = App.clients.find(c => c.id === id);
  if (!c) return;
  const simulator = App.simulators.find(s => s.id === c.simulatorId);
  if (!simulator) return;
  crack ? simulator.crackClient(c.id) : simulator.uncrackClient(c.id);
  pubsub.publish("clientChanged", App.clients);
});
App.on("setKeypadCode", ({ id, code }) => {
  performKeypadAction(id, client => {
    client.setCode(code);
  });
});

App.on("setKeypadEnteredCode", ({ id, code }) => {
  performKeypadAction(id, (keypad, client) => {
    keypad.setEnteredCode(code);
    const match = keypad.code.join("") === keypad.enteredCode.join("");
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: client.simulatorId,
      type: "Keypad",
      station: "Core",
      title: match ? `Keypad Code Accepted` : `Keypad Code Entered`,
      body: `${keypad.id} - ${code}`,
      color: match ? "success" : "info"
    });
    App.handleEvent(
      {
        simulatorId: client.simulatorId,
        title: match ? `Keypad Code Accepted` : `Keypad Code Entered`,
        component: "KeypadCore",
        body: `${keypad.id} - ${code}`,
        color: match ? "success" : "info"
      },
      "addCoreFeed"
    );
  });
});

App.on("setKeypadHint", ({ id, hint }) => {
  performKeypadAction(id, client => {
    client.setHint(hint);
  });
});

App.on("setKeypadLocked", ({ id, locked }) => {
  performKeypadAction(id, client => {
    client.setLocked(locked);
  });
});

App.on("resetKeypad", ({ id }) => {
  performKeypadAction(id, client => {
    client.reset();
  });
});

App.on("setCodeLength", ({ id, len }) => {
  performKeypadAction(id, client => {
    client.setCodeLength(len);
  });
});

App.on("setKeypadAllowedAttempts", ({ id, attempts }) => {
  performKeypadAction(id, client => {
    client.setAllowedAttempts(attempts);
  });
});

App.on("handheldScannerScan", ({ id, request }) => {
  performScannerAction(id, (scanner, client) => {
    scanner.scan(request);
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: client.simulatorId,
      type: "Handheld Scanner",
      station: "Core",
      title: `New Handheld Scan`,
      body: request,
      color: "info"
    });
    App.handleEvent(
      {
        simulatorId: client.simulatorId,
        title: "New Handheld Scan",
        component: "HandheldScannerCore",
        body: request,
        color: "info"
      },
      "addCoreFeed"
    );
  });
});

App.on("handheldScannerCancel", ({ id }) => {
  performScannerAction(id, (scanner, client) => {
    scanner.cancelScan();
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: client.simulatorId,
      type: "Handheld Scanner",
      station: "Core",
      title: `Handheld Scan Cancelled`,
      body: "",
      color: "info"
    });
    App.handleEvent(
      {
        simulatorId: client.simulatorId,
        title: "Handheld Scan Cancelled",
        component: "HandheldScannerCore",
        body: "",
        color: "info"
      },
      "addCoreFeed"
    );
  });
});

App.on("handheldScannerResponse", ({ id, response }) => {
  performScannerAction(id, scanner => {
    scanner.scanResponse(response);
  });
});
