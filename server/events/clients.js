import App from "../../app";
import Client from "../classes/client";
import Viewscreen from "../classes/viewscreen";
import { pubsub } from "../helpers/subscriptionManager.js";

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
