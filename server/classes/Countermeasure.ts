import {System} from "./generic";
import {snakeCase} from "change-case";
import uuid from "uuid";

class CountermeasureResources {
  copper?: number;
  titanium?: number;
  carbon?: number;
  plastic?: number;
  plasma?: number;
  [key: string]: number;
  constructor({copper = 0, titanium = 0, carbon = 0, plastic = 0, plasma = 0}) {
    this.copper = copper;
    this.titanium = titanium;
    this.carbon = carbon;
    this.plastic = plastic;
    this.plasma = plasma;
  }
}

interface CountermeasureModuleParams {
  id?: string;
  name: string;
  description: string;
  powerRequirement?: number;
  resourceRequirements: CountermeasureResources;
  configurationOptions?: {type: string; label: string}[];
  config?: any;
  buildProgress?: number;
  activated?: boolean;
}

class CountermeasureModule {
  id?: string;
  name: string;
  description: string;
  powerRequirement?: number;
  resourceRequirements: CountermeasureResources;
  configurationOptions?: {type: string; label: string}[];
  config?: any;
  buildProgress?: number;
  activated?: boolean;
  constructor({
    id,
    name,
    description,
    resourceRequirements,
    powerRequirement = 0,
    configurationOptions = [],
    config = {},
    buildProgress = 0,
    activated = false,
  }: CountermeasureModuleParams) {
    this.id = id || snakeCase(name);
    this.name = name;
    this.description = description;
    this.powerRequirement = powerRequirement;
    this.resourceRequirements = new CountermeasureResources(
      resourceRequirements,
    );
    this.configurationOptions = configurationOptions;
    this.config = config;
    this.buildProgress = buildProgress;
    this.activated = activated;
  }
  activate() {
    this.activated = true;
  }
}

export const moduleTypes = [
  new CountermeasureModule({
    name: "Heat Coil",
    description:
      "Generates heat. Can be configured to pulse or produce a constant heat signature. This can mimic the heat signature of a ship.",
    resourceRequirements: {copper: 3, carbon: 2},
    powerRequirement: 1,
    configurationOptions: [
      {type: "Pulse:Constant", label: "Mode"},
      {type: "Trigger", label: "Trigger"},
    ],
  }),
  new CountermeasureModule({
    name: "Explosive Payload",
    description:
      "When activated, it explodes. Do not activate immediately upon launch. When activated, it will destroy the countermeasure.",
    resourceRequirements: {copper: 2, plasma: 3},
    configurationOptions: [{type: "Trigger", label: "Trigger"}],
  }),
  new CountermeasureModule({
    name: "Communications Array",
    description:
      "Broadcasts a repeating signal at a pre-defined frequency. The message in the signal can be pre-configured.",
    resourceRequirements: {copper: 2, titanium: 1, plastic: 1},
    powerRequirement: 0.25,
    configurationOptions: [
      {type: "Number", label: "Frequency"},
      {type: "TextArea", label: "Message"},
      {type: "Trigger", label: "Trigger"},
    ],
  }),
  new CountermeasureModule({
    name: "Battery Cell",
    description:
      "Provides power to other modules. More battery cells provide longer use of modules.",
    resourceRequirements: {carbon: 1, titanium: 2, plasma: 3},
    configurationOptions: [{type: "Trigger", label: "Trigger"}],
  }),
  new CountermeasureModule({
    name: "Sensor Scrambler",
    description:
      "Scrambles signals on the sensor grid. Can also be used to disrupt communication signals.",
    resourceRequirements: {copper: 1, plasma: 2, plastic: 1},
    powerRequirement: 0.5,
    configurationOptions: [{type: "Trigger", label: "Trigger"}],
  }),
  new CountermeasureModule({
    name: "Transport Inhibitor",
    description:
      "Blocks or limits the ability of nearby ships to use transporter systems.",
    resourceRequirements: {copper: 1, plasma: 2, titanium: 3},
    powerRequirement: 0.75,
    configurationOptions: [{type: "Trigger", label: "Trigger"}],
  }),
  new CountermeasureModule({
    name: "Ionizer",
    description:
      "Creates a cloud of particles which simulates the trail left by a small starship.",
    resourceRequirements: {plasma: 1, carbon: 1, titanium: 1},
    powerRequirement: 0.25,
    configurationOptions: [{type: "Trigger", label: "Trigger"}],
  }),
  new CountermeasureModule({
    name: "Chaff Deploy",
    description:
      "Releases a large amount of debris around the countermeasure. This can be used to block incoming explosive projectiles.",
    resourceRequirements: {carbon: 3, titanium: 1},
    powerRequirement: 0.25,
    configurationOptions: [{type: "Trigger", label: "Trigger"}],
  }),
  new CountermeasureModule({
    name: "Proximity Trigger",
    description:
      "Detects when ships approach. Other modules can use this to trigger their activation.",
    resourceRequirements: {copper: 1, titanium: 1, plastic: 3},
    powerRequirement: 0.25,
  }),
  new CountermeasureModule({
    name: "Scan Trigger",
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
    configurationOptions: [{type: "Trigger", label: "Trigger"}],
  }),
  new CountermeasureModule({
    name: "Notifier",
    description:
      "Uses encrypted, entangled quantum particles to securely send a message back to your station.",
    resourceRequirements: {plasma: 1, carbon: 1, titanium: 1, copper: 1},
    configurationOptions: [
      {type: "Trigger", label: "Trigger"},
      {type: "TextArea", label: "Message"},
    ],
  }),
];

class CountermeasureSlots {
  slot1: Countermeasure | null;
  slot2: Countermeasure | null;
  slot3: Countermeasure | null;
  slot4: Countermeasure | null;
  slot5: Countermeasure | null;
  slot6: Countermeasure | null;
  slot7: Countermeasure | null;
  slot8: Countermeasure | null;
  [key: string]: Countermeasure | null;
  constructor(params: CountermeasureSlots) {
    this.slot1 = params?.slot1 ? new Countermeasure(params.slot1) : null;
    this.slot2 = params?.slot2 ? new Countermeasure(params.slot2) : null;
    this.slot3 = params?.slot3 ? new Countermeasure(params.slot3) : null;
    this.slot4 = params?.slot4 ? new Countermeasure(params.slot4) : null;
    this.slot5 = params?.slot5 ? new Countermeasure(params.slot5) : null;
    this.slot6 = params?.slot6 ? new Countermeasure(params.slot6) : null;
    this.slot7 = params?.slot7 ? new Countermeasure(params.slot7) : null;
    this.slot8 = params?.slot8 ? new Countermeasure(params.slot8) : null;
  }
}

interface DefaultParams {
  storedMaterials?: CountermeasureResources;
  slots?: CountermeasureSlots;
  launched?: Countermeasure[];
}

export class Countermeasures extends System {
  type = "Countermeasures";
  class = "Countermeasures";
  storedMaterials: CountermeasureResources;
  slots: CountermeasureSlots;
  launched: Countermeasure[];
  constructor(params: DefaultParams = {}) {
    super({displayName: "Countermeasures", name: "Countermeasures", ...params});
    this.class = "Countermeasures";
    this.type = "Countermeasures";
    this.storedMaterials = new CountermeasureResources(
      params.storedMaterials || {
        copper: 99,
        titanium: 99,
        carbon: 99,
        plastic: 99,
        plasma: 99,
      },
    );
    this.slots = new CountermeasureSlots(params.slots);
    this.launched = [];
    params.launched?.forEach(l => this.launched.push(new Countermeasure(l)));
  }

  get materials() {
    const usedMaterials = Object.entries(this.slots).reduce(
      (prev, [, slot]) => {
        slot?.modules.forEach(mod => {
          prev.copper +=
            (mod.resourceRequirements.copper || 0) * mod.buildProgress;
          prev.carbon +=
            (mod.resourceRequirements.carbon || 0) * mod.buildProgress;
          prev.plasma +=
            (mod.resourceRequirements.plasma || 0) * mod.buildProgress;
          prev.plastic +=
            (mod.resourceRequirements.plastic || 0) * mod.buildProgress;
          prev.titanium +=
            (mod.resourceRequirements.titanium || 0) * mod.buildProgress;
        });
        return prev;
      },
      {copper: 0, carbon: 0, plasma: 0, plastic: 0, titanium: 0},
    );
    return {
      copper: this.storedMaterials.copper - usedMaterials.copper,
      carbon: this.storedMaterials.carbon - usedMaterials.carbon,
      plasma: this.storedMaterials.plasma - usedMaterials.plasma,
      plastic: this.storedMaterials.plastic - usedMaterials.plastic,
      titanium: this.storedMaterials.titanium - usedMaterials.titanium,
    };
  }
  setResource(resource, value) {
    this.storedMaterials[resource] = value;
  }
  createCountermeasure(slot: string, name: string) {
    const countermeasure = new Countermeasure({id: uuid.v4(), name});
    this.slots[slot] = countermeasure;
  }
  removeCountermeasure(slot) {
    if (this.slots[slot]) {
      const countermeasure: Countermeasure = this.slots[slot];
      this.slots[slot] = null;

      // Remove all of the unused materials from the countermeasure modules
      countermeasure.modules.forEach(m => {
        // Half the build progress so at least some materials are recycled.
        const usedMaterialValue = m.buildProgress * 0.5;
        Object.entries(m.resourceRequirements).forEach(([key, value]) => {
          this.storedMaterials[key] = Math.round(
            this.storedMaterials[key] - usedMaterialValue * value,
          );
        });
      });
    }
  }
  launchCountermeasure(slot) {
    if (this.slots[slot]?.readyToLaunch) {
      // For now, activate all of the modules when launched.
      // TODO: When the Universal Sandbox is completed,
      // make them know when and how to activate properly.
      this.slots[slot].modules.forEach(m => m.activate());

      this.launched.push(this.slots[slot]);
      // Properly remove the materials that were used.
      const countermeasure: Countermeasure = this.slots[slot];

      this.slots[slot] = null;
      countermeasure.modules.forEach(m => {
        const usedMaterialValue = m.buildProgress;
        Object.entries(m.resourceRequirements).forEach(([key, value]) => {
          this.storedMaterials[key] = Math.round(
            this.storedMaterials[key] - usedMaterialValue * value,
          );
        });
      });
    }
  }
  buildCountermeasure(slot) {
    this.slots[slot]?.build();
  }
  addCountermeasureModule(slot, moduleType) {
    const countermeasure = this.slots[slot];
    countermeasure?.addModule(moduleType);
    return countermeasure;
  }
  removeCountermeasureModule(slot, id) {
    this.slots[slot]?.removeModule(id);
  }
  configureCountermeasureModule(slot, id, config) {
    this.slots[slot]?.configureModule(id, config);
  }
  setSlotActivation(slot, active) {
    this.slots[slot]?.setActive(active);
  }
  setFDNote(id, note) {
    const cm =
      this.launched.find(l => l.id === id) ||
      Object.values(this.slots).find(s => s?.id === id);
    cm?.setNote(note);
  }
}

interface CountermeasureParams {
  id: string;
  name: string;
  modules?: CountermeasureModule[];
  locked?: boolean;
  active?: boolean;
  building?: boolean;
  totalPowerUsed?: number;
  note?: string;
}
class Countermeasure {
  id: string;
  name: string;
  modules: CountermeasureModule[];
  locked: boolean;
  active: boolean;
  building: boolean;
  totalPowerUsed: number;
  note: string;
  constructor(params: CountermeasureParams) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "Countermeasure";
    this.modules = [];
    params.modules?.forEach(m =>
      this.modules.push(new CountermeasureModule(m)),
    );
    this.locked = params.locked || false;
    this.active = params.active || false;
    this.building = params.building || false;
    this.totalPowerUsed = params.totalPowerUsed || 0;
    this.note = params.note || "";
  }

  get readyToLaunch() {
    // If we have a module and all of the modules are built, then the countermeasure is ready to launch.
    return (
      this.modules.length > 0 &&
      this.modules.reduce((acc, next) => {
        if (!acc) return false;
        if (next.buildProgress < 1) return false;
        return true;
      }, true)
    );
  }
  get powerUsage() {
    return this.modules.reduce((acc, mod) => {
      return acc + (mod.powerRequirement || 0);
    }, 0);
  }
  get availablePower() {
    // Each battery provides 1 unit of power for one unit of power usage.
    // Countermeasures come with half a unit worth of power by default.
    return this.modules.filter(f => f.name === "Battery Cell").length + 0.5;
  }
  get buildPercentage() {
    if (this.modules.length === 0) return 0;
    return (
      this.modules.reduce(
        (acc, m) => (m.buildProgress ? m.buildProgress + acc : acc),
        0,
      ) / this.modules.length
    );
  }
  usePower(amount) {
    if (!this.active) return;
    if (this.totalPowerUsed >= this.availablePower) {
      this.active = false;
      return;
    }
    // Multiply the amount by the power usage
    this.totalPowerUsed += amount * this.powerUsage;
  }
  build() {
    this.building = true;
  }
  setActive(tf) {
    this.active = tf;
  }
  addModule(moduleType) {
    if (!this.building) {
      const mod = moduleTypes.find(
        m => m.name === moduleType || m.id === moduleType,
      );
      if (!mod) return;
      this.modules.push(new CountermeasureModule({...mod, id: uuid.v4()}));
    }
  }
  removeModule(id) {
    if (!this.building) {
      this.modules = this.modules.filter(m => m.id !== id);
    }
  }
  configureModule(id, config) {
    if (!this.building) {
      const mod = this.modules.find(m => m.id === id);
      if (mod) {
        mod.config = config;
      }
    }
  }
  activateModule(id) {
    this.modules.find(m => m.id === id)?.activate();
  }
  setNote(note) {
    this.note = note;
  }
}
