import {System} from "./generic";
import {snakeCase} from "change-case";
import uuid = require("uuid");

class CountermeasureResources {
  copper?: number;
  titanium?: number;
  carbon?: number;
  plastic?: number;
  plasma?: number;
  constructor({copper = 0, titanium = 0, carbon = 0, plastic = 0, plasma = 0}) {
    this.copper = copper;
    this.titanium = titanium;
    this.carbon = carbon;
    this.plastic = plastic;
    this.plasma = plasma;
  }
}

class CountermeasureModule {
  id?: string;
  name: string;
  description: string;
  powerRequirement?: number;
  resourceRequirements: CountermeasureResources;
  constructor({
    name,
    description,
    resourceRequirements,
    powerRequirement = 0,
  }: CountermeasureModule) {
    this.id = snakeCase(name);
    this.name = name;
    this.description = description;
    this.powerRequirement = powerRequirement;
    this.resourceRequirements = new CountermeasureResources(
      resourceRequirements,
    );
  }
}
const moduleTypes = [
  new CountermeasureModule({
    name: "Heat Coil",
    description:
      "Generates heat. Can be configured to pulse or produce a constant heat signature.",
    resourceRequirements: {copper: 3, carbon: 2},
    powerRequirement: 1,
  }),
  new CountermeasureModule({
    name: "Explosive Payload",
    description:
      "When activated, it explodes. Do not activate immediately upon launch.",
    resourceRequirements: {copper: 2, plasma: 3},
  }),
  new CountermeasureModule({
    name: "Communications Array",
    description:
      "Broadcasts a repeating signal at a pre-defined frequency. The message in the signal can be pre-configured.",
    resourceRequirements: {copper: 2, titanium: 1, plastic: 1},
    powerRequirement: 0.25,
  }),
  new CountermeasureModule({
    name: "Battery Cell",
    description:
      "Provides power to other modules. More battery cells provide longer use of modules.",
    resourceRequirements: {carbon: 1, titanium: 2, plasma: 3},
  }),
  new CountermeasureModule({
    name: "Sensor Scrambler",
    description:
      "Scrambles signals on the sensor grid. Can also be used to disrupt communication signals.",
    resourceRequirements: {copper: 1, plasma: 2, plastic: 1},
    powerRequirement: 0.5,
  }),
  new CountermeasureModule({
    name: "Transport Inhibitor",
    description:
      "Blocks or limits the ability of nearby ships to use transporter systems.",
    resourceRequirements: {copper: 1, plasma: 2, titanium: 3},
    powerRequirement: 0.75,
  }),
  new CountermeasureModule({
    name: "Ionizer",
    description:
      "Creates a cloud of particles which simulates the trail left by a small starship.",
    resourceRequirements: {plasma: 1, carbon: 1, titanium: 1},
    powerRequirement: 0.25,
  }),
  new CountermeasureModule({
    name: "Proximity Detector",
    description:
      "Detects when ships approach. Other modules can use this to trigger their activation.",
    resourceRequirements: {copper: 1, titanium: 1, plastic: 3},
    powerRequirement: 0.25,
  }),
  new CountermeasureModule({
    name: "Scan Detector",
    description:
      "Detects when the module is scanned. Other modules can use this to trigger their activation.",
    resourceRequirements: {copper: 1, titanium: 1, plastic: 3},
    powerRequirement: 0.25,
  }),
  new CountermeasureModule({
    name: "Beacon",
    description:
      "Sends out a pulse which can be used by navigation to locate the module.",
    resourceRequirements: {plasma: 1, carbon: 1, copper: 2},
    powerRequirement: 0.5,
  }),
  new CountermeasureModule({
    name: "Notifier",
    description:
      "Uses encrypted, entangled quantum particles to securely send a message back to your station.",
    resourceRequirements: {plasma: 1, carbon: 1, titanium: 1, copper: 1},
  }),
];

class CountermeasureSlots {
  slot1?: Countermeasure;
  slot2?: Countermeasure;
  slot3?: Countermeasure;
  slot4?: Countermeasure;
  slot5?: Countermeasure;
  slot6?: Countermeasure;
  slot7?: Countermeasure;
  slot8?: Countermeasure;
  constructor(params: CountermeasureSlots) {
    this.slot1 = new Countermeasure(params.slot1);
    this.slot2 = new Countermeasure(params.slot2);
    this.slot3 = new Countermeasure(params.slot3);
    this.slot4 = new Countermeasure(params.slot4);
    this.slot5 = new Countermeasure(params.slot5);
    this.slot6 = new Countermeasure(params.slot6);
    this.slot7 = new Countermeasure(params.slot7);
    this.slot8 = new Countermeasure(params.slot8);
  }
}
interface DefaultParams {
  materials?: CountermeasureResources;
  slots?: CountermeasureSlots;
  launched?: Countermeasure[];
}
export class Countermeasures extends System {
  type = "Countermeasures";
  class = "Countermeasures";
  materials: CountermeasureResources;
  slots: CountermeasureSlots;
  launched: Countermeasure[];
  constructor(params: DefaultParams = {}) {
    super({displayName: "Countermeasures", name: "Countermeasures", ...params});
    this.materials = new CountermeasureResources(
      params.materials || {
        copper: 30,
        titanium: 30,
        carbon: 30,
        plastic: 30,
        plasma: 30,
      },
    );
    this.slots = new CountermeasureSlots(params.slots);
    this.launched = [];
    params.launched?.forEach(l => this.launched.push(new Countermeasure(l)));
  }
}

class Countermeasure {
  id: string;
  modules: CountermeasureModule[];
  constructor(params: Countermeasure) {
    this.id = params.id || uuid.v4();
    this.modules = [];
    params.modules?.forEach(m =>
      this.modules.push(new CountermeasureModule(m)),
    );
  }
}
