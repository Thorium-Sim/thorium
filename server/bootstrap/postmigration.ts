// Migrations that should happen after App is instantiated
import App from "../app";
import {InterfaceDevice} from "../classes/interface";
import {Entity, DMXDevice} from "../classes";
import * as components from "../classes/universe/components";

export default () => {
  return new Promise(done => {
    if (App.interfaceDevices.length === 0) {
      App.interfaceDevices = [
        new InterfaceDevice({
          id: "interface-device-1",
          class: "InterfaceDevice",
          name: "iPhone SE",
          width: 320,
          height: 568,
        }),
        new InterfaceDevice({
          id: "interface-device-2",
          class: "InterfaceDevice",
          name: "Desktop HD",
          width: 1920,
          height: 1080,
        }),
        new InterfaceDevice({
          id: "interface-device-3",
          class: "InterfaceDevice",
          name: "Desktop Widescreen",
          width: 1600,
          height: 900,
        }),
        new InterfaceDevice({
          id: "interface-device-4",
          class: "InterfaceDevice",
          name: "iPad Landscape",
          width: 1024,
          height: 768,
        }),
        new InterfaceDevice({
          id: "interface-device-5",
          class: "InterfaceDevice",
          name: "iPad Portrait",
          width: 768,
          height: 1024,
        }),
        new InterfaceDevice({
          id: "interface-device-6",
          class: "InterfaceDevice",
          name: "Pixel 2",
          width: 411,
          height: 731,
        }),
      ];
    }
    if (App.entities.filter(e => !e.template).length === 0) {
      const entity = new Entity({
        flightId: "template",
      });
      entity.stage = new components.Stage({
        scaleLabel: "Kilometers",
        scaleLabelShort: "KM",
        skyboxKey: "Star background",
        rootStage: true,
      });
      entity.identity = new components.Identity({
        name: "Base Universe",
        type: "root",
      });
      App.entities.push(entity);
    }
    if (App.dmxDevices.length === 0) {
      App.dmxDevices = [
        {
          id: "2c0dfa05-060c-48b4-8f53-cec0bd918970",
          name: "Basic RGB",
          channels: ["red", "green", "blue"],
        },
        {
          id: "645b5f9f-1dfa-44f1-91dc-356f4972947c",
          name: "Basic Channel",
          channels: ["intensity"],
        },
        {
          id: "655ff55a-c593-4a54-b348-06d3dfb66e3e",
          name: "OppskPar",
          channels: [
            "nothing",
            "nothing",
            "nothing",
            "intensity",
            "red",
            "green",
            "blue",
            "uv",
          ],
        },
      ].map((d: DMXDevice) => new DMXDevice(d));
    }
    done();
  });
};
