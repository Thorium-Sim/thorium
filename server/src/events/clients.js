import App from "../app";
import Client from "../classes/client";
import Sound from "../classes/sound";
import Viewscreen from "../classes/viewscreen";
import { pubsub } from "../helpers/subscriptionManager.js";

function randomFromList(list) {
  if (!list) return;
  const length = list.length;
  const index = Math.floor(Math.random() * length);
  return list[index];
}

App.on("clientConnect", ({ client }) => {
  const clientObj = App.clients.find(c => c.id === client);
  if (clientObj) {
    // There is a client alread in the database
    // Just make sure it is connected
    clientObj.connect();
  } else {
    // Add it to the server
    const newClient = new Client({ id: client, connected: true });
    App.clients.push(newClient);
  }
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientDisconnect", ({ client }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj && clientObj.disconnect();
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientPing", ({ client, ping }) => {
  // Check to see if the client is still connected
  // This is the return ping. We'll reconnect/disconnect it
  // in the next interval
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.ping = ping;
});

App.on("clientSetFlight", ({ client, flightId }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.setFlight(flightId);
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientSetSimulator", ({ client, simulatorId }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.setSimulator(simulatorId);
  pubsub.publish("clientChanged", App.clients);
});
App.on("clientSetStation", ({ client, stationName }) => {
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
});
App.on("clientLogin", ({ client, loginName }) => {
  const clientObj = App.clients.find(c => c.id === client);
  clientObj.login(loginName);
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
App.on("playSound", ({ sound, station, simulatorId, clientId }) => {
  let clients;
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
      c.id === clientId
  );
  clients = clients.map(c => c.id);
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
});
App.on("stopAllSounds", ({ simulatorId }) => {
  const clients = App.clients.filter(s => s.simulatorId === simulatorId);
  // Remove all of the sounds that have one of the clients
  App.sounds = App.sounds.filter(s => {
    const client = clients.find(c => s.clients.indexOf(c) > -1);
    if (client) return true;
    return false;
  });
  pubsub.publish("cancelAllSounds", clients);
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
        client.setStation(c.station);
        // If the station name is 'Viewscreen', check for or create a viewscreen for the client
        if (
          c.station === "Viewscreen" &&
          !App.viewscreens.find(
            v => v.id === client.id && v.simulatorId === client.simulatorId
          )
        ) {
          App.viewscreens.push(
            new Viewscreen({
              id: client.id,
              simulatorId: client.simulatorId
            })
          );
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

App.on("setClientOverlay", ({ id, overlay }) => {
  const c = App.clients.find(c => c.id === id);
  c.setOverlay(overlay);
  pubsub.publish("clientChanged", App.clients);
});
