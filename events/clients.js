import App from '../app';
import Client from '../data/classes/client';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('clientConnected', ({ client }) => {
  const clientObj = App.clients.find((c) => c.id === client);
  if (clientObj) {
    // There is a client alread in the database
    // Just make sure it is connected
    clientObj.connect();
  } else {
    // Add it to the server
    const newClient = new Client({ id: client, connected: true });
    App.clients.push(newClient);
  }
  pubsub.publish('clientChanged', App.clients);
});
App.on('clientDisconnected', ({ client }) => {
  const clientObj = App.clients.find((c) => c.id === client);
  clientObj.disconnect();
  pubsub.publish('clientChanged', App.clients);
});
App.on('clientPinged', ({ client, ping }) => {
  // Check to see if the client is still connected
  // This is the return ping. We'll reconnect/disconnect it
  // in the next interval
  const clientObj = App.clients.find((c) => c.id === client);
  clientObj.ping = ping;
});

App.on('clientSetedFlight', ({ client, flightId }) => {
  const clientObj = App.clients.find((c) => c.id === client);
  clientObj.flightId = flightId;
  pubsub.publish('clientChanged', App.clients);
});
App.on('clientSetedSimulator', ({ client, simulatorId }) => {
  const clientObj = App.clients.find((c) => c.id === client);
  clientObj.simulatorId = simulatorId;
  pubsub.publish('clientChanged', App.clients);
});
App.on('clientSetedStation', ({ client, station }) => {
  const clientObj = App.clients.find((c) => c.id === client);
  clientObj.station = station;
  pubsub.publish('clientChanged', App.clients);
});
App.on('clientLogined', ({ client, loginName }) => {
  const clientObj = App.clients.find((c) => c.id === client);
  clientObj.loginName = loginName;
  clientObj.loginState = 'login';
  pubsub.publish('clientChanged', App.clients);
});
App.on('clientLogouted', ({ client }) => {
  const clientObj = App.clients.find((c) => c.id === client);
  clientObj.loginName = null;
  clientObj.loginState = 'logout';
  pubsub.publish('clientChanged', App.clients);
});
App.on('clientDiagnosticed', ({ client }) => {
  const clientObj = App.clients.find((c) => c.id === client);
  clientObj.loginState = 'diagnostic';
  pubsub.publish('clientChanged', App.clients);
});
App.on('clientReseted', ({ client }) => {
  const clientObj = App.clients.find((c) => c.id === client);
  clientObj.loginState = 'reset';
  pubsub.publish('clientChanged', App.clients);
});
App.on('clientLockScreened', ({ client }) => {
  const clientObj = App.clients.find((c) => c.id === client);
  clientObj.loginState = 'locked';
  pubsub.publish('clientChanged', App.clients);
});
App.on('clientUnlockScreened', ({ client }) => {
  const clientObj = App.clients.find((c) => c.id === client);
  clientObj.loginState = 'login';
  pubsub.publish('clientChanged', App.clients);
});
