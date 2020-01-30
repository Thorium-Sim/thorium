import {System} from "./generic";
import {snakeCase} from "change-case";

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
  id: string;
  name: string;
  description: string;
  powerRequirement: number;
  resourceRequirements: CountermeasureResources;
  constructor(
    name: string,
    description: string,
    resourceRequirements: CountermeasureResources,
    powerRequirement: number = 0,
  ) {
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
  new CountermeasureModule(
    "Heat Coil",
    "Generates heat. Can be configured to pulse or produce a constant heat signature.",
    {copper: 3, carbon: 2},
    1,
  ),
  new CountermeasureModule(
    "Explosive Payload",
    "When activated, it explodes. Do not activate immediately upon launch.",
    {copper: 2, plasma: 3},
  ),
  new CountermeasureModule(
    "Communications Array",
    "Broadcasts a repeating signal at a pre-defined frequency. The message in the signal can be pre-configured.",
    {copper: 2, titanium: 1, plastic: 1},
    0.25,
  ),
  new CountermeasureModule(
    "Battery Cell",
    "Provides power to other modules. More battery cells provide longer use of modules.",
    {carbon: 1, titanium: 2, plasma: 3},
  ),
  new CountermeasureModule(
    "Sensor Scrambler",
    "Scrambles signals on the sensor grid. Can also be used to disrupt communication signals.",
    {copper: 1, plasma: 2, plastic: 1},
    0.5,
  ),
  new CountermeasureModule(
    "Transport Inhibitor",
    "Blocks or limits the ability of nearby ships to use transporter systems.",
    {copper: 1, plasma: 2, titanium: 3},
    0.75,
  ),
  new CountermeasureModule(
    "Ionizer",
    "Creates a cloud of particles which simulates the trail left by a small starship.",
    {plasma: 1, carbon: 1, titanium: 1},
    0.25,
  ),
  new CountermeasureModule(
    "Proximity Detector",
    "Detects when ships approach. Other modules can use this to trigger their activation.",
    {copper: 1, titanium: 1, plastic: 3},
    0.25,
  ),
  new CountermeasureModule(
    "Scan Detector",
    "Detects when the module is scanned. Other modules can use this to trigger their activation.",
    {copper: 1, titanium: 1, plastic: 3},
    0.25,
  ),
  new CountermeasureModule(
    "Beacon",
    "Sends out a pulse which can be used by navigation to locate the module.",
    {plasma: 1, carbon: 1, copper: 2},
    0.5,
  ),
  new CountermeasureModule(
    "Notifier",
    "Uses encrypted, entangled quantum particles to securely send a message back to your station.",
    {plasma: 1, carbon: 1, titanium: 1, copper: 1},
  ),
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
    this.slot1 = params.slot1;
    this.slot2 = params.slot2;
    this.slot3 = params.slot3;
    this.slot4 = params.slot4;
    this.slot5 = params.slot5;
    this.slot6 = params.slot6;
    this.slot7 = params.slot7;
    this.slot8 = params.slot8;
  }
}
interface DefaultParams {
  materials?: CountermeasureResources;
  slots?: CountermeasureSlots;
  launched?: Countermeasure[];
}
export class Countermeasures extends System {
  materials: CountermeasureResources;
  slots: CountermeasureSlots;
  launched: Countermeasure[];
  constructor(params: DefaultParams = {}) {
    super({displayName: "Countermeasures", name: "Countermeasures", ...params});
    this.type = "Countermeasures";
    this.class = "Countermeasures";
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
  constructor(params) {}
}
