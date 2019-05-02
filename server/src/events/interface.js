import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

function performAction(id, action) {
  const sys = App.interfaces.find(s => s.id === id);
  if (sys) {
    action(sys);
  }
  pubsub.publish("interfaceUpdate", App.interfaces);
}

App.on("addInterface", ({ name }) => {
  App.interfaces.push(new Classes.Interface({ name }));
  pubsub.publish("interfaceUpdate", App.interfaces);
});

App.on("renameInterface", ({ id, name }) => {
  performAction(id, c => c.rename(name));
});

App.on("removeInterface", ({ id }) => {
  App.interfaces = App.interfaces.filter(c => c.id !== id);
  pubsub.publish("interfaceUpdate", App.interfaces);
});

App.on(
  "updateInterface",
  ({ id, deviceType, components, connections, values, config }) => {
    performAction(id, c =>
      c.update({ deviceType, components, connections, values, config })
    );
  }
);

App.on("addInterfaceToSimulator", ({ simulatorId, interfaceId }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  const interfaceData = App.interfaces.find(s => s.id === interfaceId);
  if (!simulator || !interfaceData) return;
  const id = uuid.v4();
  const interfaceObj = {
    ...interfaceData,
    templateId: interfaceData.id,
    id,
    simulatorId
  };
  App.interfaces.push(new Classes.Interface(interfaceObj));
});

App.on("removeInterfaceFromSimulator", ({ simulatorId, interfaceId }) => {
  App.interfaces = App.interfaces.filter(c => {
    if (!c.templateId) return true;
    if (c.templateId === interfaceId || c.id === interfaceId) return false;
    return true;
  });
});

App.on("addInterfaceDevice", ({ name, width, height, cb }) => {
  const device = new Classes.InterfaceDevice({ name, width, height });
  App.interfaceDevices.push(device);
  cb && cb(device.id);
});

App.on("renameInterfaceDevice", ({ id, name, cb }) => {
  const device = App.interfaceDevices.find(d => d.id === id);
  device && device.rename(name);
  cb && cb();
});

App.on("removeInterfaceDevice", ({ id, cb }) => {
  App.interfaceDevices = App.interfaceDevices.filter(c => c.id !== id);
  cb && cb();
});

App.on("updateInterfaceDevice", ({ id, width, height, cb }) => {
  const device = App.interfaceDevices.find(d => d.id === id);
  device && device.update({ width, height });
  cb && cb();
});

App.on("triggerInterfaceObject", ({ id, objectId }) => {
  const interfaceObj = App.interfaces.find(i => i.id === id);
  const macros = interfaceObj.triggerObject(objectId);
  App.handleEvent(
    { simulatorId: interfaceObj.simulatorId, macros },
    "triggerMacros"
  );
});

App.on(
  "toggleInterfaceObjectHidden",
  ({ simulatorId, id, objectId, hidden }) => {
    const interfaceObj = App.interfaces.find(i =>
      simulatorId
        ? i.simulatorId === simulatorId && i.templateId === id
        : i.id === id
    );
    interfaceObj.update({
      config: {
        ...interfaceObj.config,
        [objectId]: {
          ...interfaceObj.config[objectId],
          hidden: Boolean(hidden)
        }
      }
    });

    pubsub.publish("interfaceUpdate", App.interfaces);
  }
);

App.on("toggleInterfaceObjectPlaying", ({ simulatorId, id, objectId }) => {
  const interfaceObj = App.interfaces.find(i =>
    simulatorId
      ? i.simulatorId === simulatorId && i.templateId === id
      : i.id === id
  );
  const autoPlay = interfaceObj.config[objectId].autoPlay;
  const values = interfaceObj.values[objectId] || {};
  const initialPlaying = values.playing;
  const playing = !(initialPlaying || initialPlaying === false
    ? initialPlaying
    : autoPlay);
  interfaceObj.update({
    values: {
      ...interfaceObj.values,
      [objectId]: {
        ...interfaceObj.values[objectId],
        playing
      }
    }
  });

  pubsub.publish("interfaceUpdate", App.interfaces);
});
