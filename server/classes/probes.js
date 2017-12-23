import { System } from "./generic";
import uuid from "uuid";
import App from "../app.js";

export default class Probes extends System {
  constructor(params) {
    super(params);
    this.class = "Probes";
    this.type = "Probes";
    this.name = params.name || "Probe Launcher";
    // Whether probes launching is handled by torpedos (Odyssey, Galileo)
    // Or by the probe launcher itself (Phoenix, Voyager, Magellan)
    this.torpedo = params.torpedo || false;
    this.probes = [];
    this.equipment = [];
    this.types = [];
    this.stealthCompromised = false;
    this.processedData = params.processedData || "";
    // Load the probes
    params.probes = params.probes || [];
    params.types = params.types || probesTypes;
    params.equipment = params.equipment || probesEquipment;

    params.probes.forEach(p => this.probes.push(new Probe(p, this.id)));
    params.types.forEach(p => this.types.push(new ProbeType(p, this.id)));
    params.equipment.forEach(e => this.equipment.push(new ProbeEquipment(e)));

    // Create the systems based on the equipment added to the probe
  }
  get stealthFactor() {
    if (this.stealthCompromised) return 1;
    return 0;
  }
  addProcessedData(data) {
    this.processedData = data;
  }
  destroyProbe(probeId) {
    this.probes = this.probes.filter(p => p.id !== probeId);
  }
  launchProbe(probe) {
    // Decriment the equipment and probe types apropriately.
    // Do some checking first
    const type = this.types.find(t => t.id === probe.type);
    if (type.count <= 0)
      throw new Error(`Insufficient quantity of ${type.name}`);
    probe.equipment.forEach(e => {
      const eq = this.equipment.find(eq => eq.id === e.id);
      if (eq.count - e.count < 0) {
        throw new Error(`Insufficient quantity of ${eq.name}`);
      }
    });
    // Now do the updates.
    type.update({ count: type.count - 1 });
    probe.equipment.forEach(e => {
      const eq = this.equipment.find(eq => eq.id === e.id);
      eq.update({ count: eq.count - e.count });
    });
    if (this.torpedo) {
      probe.launched = false;
      //Create a new torpedo linked to this probe
      probe.id = uuid.v4();
      App.handleEvent({ type: "probe", probe: probe.id }, "torpedoAddWarhead");
    } else {
      probe.launched = true;
      this.stealthCompromised = true;
      setTimeout(() => (this.stealthCompromised = false), 10 * 1000);
    }
    this.probes.push(new Probe(probe, this.id));
  }
  fireProbe(probeId) {
    //For when tactical fires the probe
    this.probes.find(p => p.id === probeId).launch();
    this.stealthCompromised = true;
    setTimeout(() => (this.stealthCompromised = false), 10 * 1000);
  }
  updateProbeType(probeType) {
    // Check to see if the type exists
    const type = this.types.find(p => p.id === probeType.id);
    if (type) {
      type.update(probeType);
    } else {
      // Add a new one!
      this.types.push(new ProbeType(probeType, this.id));
    }
  }
  updateProbeEquipment(probeEquipment) {
    // Check to see if the equipment exists
    const equipment = this.equipment.find(p => p.id === probeEquipment.id);
    if (equipment) {
      equipment.update(probeEquipment);
    } else {
      // Add a new one!
      this.equipment.push(new ProbeEquipment(probeEquipment));
    }
  }
  probeQuery(probeId, query) {
    this.probes.find(p => p.id === probeId).setQuery(query);
  }
  probeQueryResponse(probeId, response) {
    this.probes.find(p => p.id === probeId).setResponse(response);
  }
}

class Probe {
  constructor(params, parentId) {
    this.id = params.id || uuid.v4();
    this.parentId = parentId;
    this.name = params.name || "";
    this.type = params.type || null;
    this.launched = params.launched || true;
    this.equipment = params.equipment || [];
    this.query = params.query || "";
    this.querying = params.querying || false;
    this.response = params.query || "";
  }
  launch() {
    this.launched = true;
  }
  setQuery(query) {
    this.query = query;
    this.querying = !!query;
  }
  setResponse(response) {
    this.response = response;
    this.querying = false;
  }
}

class ProbeType {
  constructor(params, parentId) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "Probe";
    this.parentId = parentId;
    this.description = params.description || "This is a probe";
    this.size = params.size || 1;
    this.count = params.count || 0;
  }
  update({ name, description, size, count }) {
    if (name) this.name = name;
    if (description) this.description = description;
    if (size) this.size = size;
    if (count) this.count = count;
  }
}
class ProbeEquipment {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "Equipment";
    this.description =
      params.description || "This is a piece of probe equipment";
    this.size = params.size || 1;
    this.count = params.count || 0;
    this.availableProbes = params.availableProbes || [];
  }
  update({ name, description, size, count }) {
    if (name) this.name = name;
    if (description) this.description = description;
    if (size) this.size = size;
    if (count) this.count = count;
  }
}

const probesTypes = [
  {
    id: "class-i",
    name: "Class I Probe",
    description:
      "The smallest probe; can only hold 4 units of equipment. Use for probe networks and general purposes.",
    size: 4,
    count: 30
  },
  {
    id: "class-ii",
    name: "Class II Probe",
    description:
      "This medium-sized probe can hold 10 units of equipment. Use for probe networks and general purposes.",
    size: 10,
    count: 30
  },
  {
    id: "class-iii",
    name: "Class III Probe",
    description:
      "This is the largest standard probe. It can hold up to 16 units of equipment. Use for probe networks and general purposes.",
    size: 16,
    count: 30
  },
  {
    id: "defense",
    name: "Defensive Probe",
    description:
      "This weapon-like probe has access to additional equipment. You can use it to defend your ship. It holds 20 units of equipment.",
    size: 4,
    count: 20
  },
  {
    id: "science",
    name: "Science Probe",
    description:
      "This probe can use special emitters and detectors for specific scientific experiments. It holds 12 units of equipment.",
    size: 12,
    count: 20
  }
];
const probesEquipment = [
  {
    id: "probe-network-package",
    name: "Probe Network Package",
    description:
      "A probe network package instructs the probe to network with up to 7 other probes.",
    size: 0,
    count: 60,
    availableProbes: []
  },
  {
    id: "radio-transceiver",
    name: "Radio Transceiver",
    description: "A radio transceiver is used to let the probe communicate.",
    size: 1,
    count: 54,
    availableProbes: []
  },
  {
    id: "video-camera",
    name: "Video Camera",
    description: "A Video Camera can take still or moving pictures.",
    size: 1,
    count: 47,
    availableProbes: []
  },
  {
    id: "communications-signal-booster",
    name: "Communications Signal Booster",
    description:
      "A Communications Signal Booster gives the probe's radio more range.",
    size: 2,
    count: 38,
    availableProbes: []
  },
  {
    id: "encoding-sequencer",
    name: "Encoding Sequencer",
    description: "Encodes and encrypts signals, making them more secure.",
    size: 2,
    count: 25,
    availableProbes: []
  },
  {
    id: "extra-data-storage",
    name: "Extra Data Storage",
    description:
      "Increases the amount of on-board data storage, allowing the probe to store more data.",
    size: 2,
    count: 61,
    availableProbes: []
  },
  {
    id: "extra-fuel-cell",
    name: "Extra Fuel Cell",
    description:
      "An Extra Fuel Cell lets the probe travel further and perform longer.",
    size: 2,
    count: 79,
    availableProbes: []
  },
  {
    id: "sensor-array",
    name: "Sensor Array",
    description: "The Sensor Array gives the probe general scanning abilities.",
    size: 2,
    count: 120,
    availableProbes: []
  },
  {
    id: "chemical-analysis-package",
    name: "Chemical Analysis Package",
    description:
      "A Chemical Analysis Package lets the probe research what chemicals it has found.",
    size: 3,
    count: 24,
    availableProbes: []
  },
  {
    id: "sample-retrieval-package",
    name: "Sample Retrieval Package",
    description:
      "A Sample Retrieval Package lets the probe get something and return it to the ship.",
    size: 3,
    count: 22,
    availableProbes: []
  },
  {
    id: "radiation-shielding",
    name: "Radiation Shielding",
    description: "Protects the probe from moderate levels of radiaiton.",
    size: 3,
    count: 16,
    availableProbes: []
  },
  {
    id: "ecm-package",
    name: "ECM Package",
    description:
      "An ECM (Electronic Counter Measures) Package is used to jam electronics.",
    size: 4,
    count: 26,
    availableProbes: []
  },
  {
    id: "gas-giant-encounter-package",
    name: "Gas Giant Encounter Package",
    description:
      "A Gas Giant Encounter Package allows the probe to research a gas giant.",
    size: 4,
    count: 11,
    availableProbes: []
  },
  {
    id: "nebula-encounter-package",
    name: "Nebula Encounter Package",
    description:
      "A Nebula Encounter Package allows the probe to research a nebula.",
    size: 4,
    count: 14,
    availableProbes: []
  },
  {
    id: "planetary-encounter-package",
    name: "Planetary Encounter Package",
    description:
      "A Planetary Encounter Package allows the probe to research a planet.",
    size: 4,
    count: 14,
    availableProbes: []
  },
  {
    id: "decoy-package",
    name: "Decoy Package",
    description:
      "A Decoy Package sends out signals to make sensor devices detect the probe as a ship.",
    size: 4,
    count: 23,
    availableProbes: []
  },
  {
    id: "subspace-encounter-package",
    name: "Subspace Encounter Package",
    description:
      "A Subspace Encounter Package allows the probe to research subspace.",
    size: 5,
    count: 6,
    availableProbes: []
  },
  {
    id: "solar-encounter-package",
    name: "Solar Encounter Package",
    description:
      "A Solar Encounter Package allows the probe to research a star.",
    size: 5,
    count: 19,
    availableProbes: []
  },
  {
    id: "transporter-relay",
    name: "Transporter Relay",
    description:
      "A transporter relay extends the transporter range of this ship.",
    size: 5,
    count: 15,
    availableProbes: []
  },
  {
    id: "hologram-projector-package",
    name: "Hologram Projector Package",
    description:
      "A Hologram Projector Package makes the probe look like a ship.",
    size: 5,
    count: 5,
    availableProbes: []
  },
  {
    id: "metaphasic-shield-generator",
    name: "Metaphasic Shield Generator",
    description:
      "Shield Generator that can construct a Shield Grid with other probes up to 2,500 Km protecting from radiation.",
    size: 6,
    count: 7,
    availableProbes: []
  },
  {
    id: "self-destruct-kit",
    name: "Self-Destruct Kit",
    description:
      "A Self-Destruct Kit allows the probe to receive a self-destruct signal from the station.",
    size: 1,
    count: 17,
    availableProbes: ["defense"]
  },
  {
    id: "warp-nacelle",
    name: "Warp Nacelle",
    description:
      "A Warp Nacelle (warp core included) allows the probe to travel at warp speed.",
    size: 1,
    count: 20,
    availableProbes: ["defense"]
  },
  {
    id: "targeting-sensors",
    name: "Targeting Sensors",
    description: "Targeting sensors extends the targeting range of the probe.",
    size: 2,
    count: 21,
    availableProbes: ["defense"]
  },
  {
    id: "proximity-destruct",
    name: "Proximity Destruct",
    description:
      "A Proximity Self-Destruct detector tells the probe to blow-up when an enemy is near.",
    size: 2,
    count: 20,
    availableProbes: ["defense"]
  },
  {
    id: "titanium-armor-alloy",
    name: "Titanium Armor Alloy",
    description: "Titanium Armor Alloy increases the probe's defenses.",
    size: 2,
    count: 15,
    availableProbes: ["defense"]
  },
  {
    id: "stealth-field",
    name: "Stealth Field",
    description: "A stealth field masks the probe making it harder to detect.",
    size: 3,
    count: 7,
    availableProbes: ["defense"]
  },
  {
    id: "phaser-head",
    name: "Phaser Head",
    description:
      "A Phaser Head allows the probe to fire one phaser shot at an enemy ship.",
    size: 3,
    count: 27,
    availableProbes: ["defense"]
  },
  {
    id: "tachyon-emitter",
    name: "Tachyon Emitter",
    description:
      "A Tachyon Emitter allows the probe to interact with tachyon particles.",
    size: 3,
    count: 8,
    availableProbes: ["science"]
  },
  {
    id: "resonance-emitter",
    name: "Resonance Emitter",
    description:
      "A Resonance Emitter allows the probe to interact with resonating particles.",
    size: 3,
    count: 8,
    availableProbes: ["science"]
  },
  {
    id: "lithium-emitter",
    name: "Lithium Emitter",
    description:
      "A Lithium Emitter allows the probe to interact with lithium particles.",
    size: 3,
    count: 10,
    availableProbes: ["science"]
  },
  {
    id: "carbon-emitter",
    name: "Carbon Emitter",
    description:
      "A Carbon Emitter allows the probe to interact with carbon particles.",
    size: 3,
    count: 8,
    availableProbes: ["science"]
  },
  {
    id: "radiation-emitter",
    name: "Radiation Emitter",
    description:
      "A Radiation Emitter allows the probe to interact with radioactive particles.",
    size: 3,
    count: 8,
    availableProbes: ["science"]
  },
  {
    id: "oxygen-emitter",
    name: "Oxygen Emitter",
    description:
      "An Oxygen Emitter allows the probe to interact with oxygen particles.",
    size: 3,
    count: 8,
    availableProbes: ["science"]
  },
  {
    id: "hydrogen-emitter",
    name: "Hydrogen Emitter",
    description:
      "A Hydrogen Emitter allows the probe to interact with hydrogen particles.",
    size: 3,
    count: 8,
    availableProbes: ["science"]
  },
  {
    id: "helium-emitter",
    name: "Helium Emitter",
    description:
      "A Helium Emitter allows the probe to interact with helium particles.",
    size: 3,
    count: 8,
    availableProbes: ["science"]
  },
  {
    id: "graviton-emitter",
    name: "Graviton Emitter",
    description:
      "A Graviton Emitter allows the probe to interact with graviton particles.",
    size: 3,
    count: 8,
    availableProbes: ["science"]
  },
  {
    id: "magnetic-emitter",
    name: "Magnetic Emitter",
    description:
      "A Magnetic Emitter allows the probe to interact with magnetic particles.",
    size: 3,
    count: 8,
    availableProbes: ["science"]
  }
];

/*
const odysseyEquipment = [
  {
    "id": "probe-network-package",
    "name": "Probe Network Package",
    "size": 1,
    "count": 9,
    "availableProbes": [],
    "description":
      "The probe network package equips the probe with special equipment allowing it to interact with other probes within the network creating a sensor and defensive parimeter around this vessel."
  },
  {
    "id": "radio-transceiver",
    "name": "Radio Transceiver",
    "size": 1,
    "count": 8,
    "availableProbes": [],
    "description": "A radio transceiver is used to let the probe communicate."
  },
  {
    "id": "central-processing-unit",
    "name": "Central Processing Unit",
    "size": 1,
    "count": 13,
    "availableProbes": ["science"],
    "description":
      "A Central Processing Unit (CPU) increases the probes ability to analyze data."
  },
  {
    "id": "coding-sequencer",
    "name": "Coding Sequencer",
    "size": 1,
    "count": 9,
    "availableProbes": [],
    "description":
      "A Coding Sequencer encodes all communications entering and exiting the probe."
  },
  {
    "id": "camera-stills-only",
    "name": "Camera  (Stills Only)",
    "size": 1,
    "count": 12,
    "availableProbes": [],
    "description":
      "The Still Photo Camera creates high resolution photos of the space surrounding the probe."
  },
  {
    "id": "communications-signal-booster",
    "name": "Communications Signal Booster",
    "size": 1,
    "count": 5,
    "availableProbes": [],
    "description":
      "A Communications Signal Booster gives the probe's radio more range."
  },
  {
    "id": "video-camera",
    "name": "Video Camera",
    "size": 1,
    "count": 9,
    "availableProbes": [],
    "description":
      "The Video Camera can take thousands of photos per second creating a stunning moving picture of the surrounding space."
  },
  {
    "id": "data-storage-disk-100-terabytes",
    "name": "Data Storage Disk (100 Terabytes)",
    "size": 1,
    "count": 4,
    "availableProbes": ["science"],
    "description":
      "The data storage disk allows the probe to store up to 100 gigaquads of information within its data banks."
  },
  {
    "id": "extra-fuel-cell",
    "name": "Extra Fuel Cell",
    "size": 1,
    "count": 7,
    "availableProbes": [],
    "description":
      "An Extra Fuel Cell lets the probe travel further by increasing the energy available on the probe."
  },
  {
    "id": "sensor-array",
    "name": "Sensor Array",
    "size": 1,
    "count": 9,
    "availableProbes": [],
    "description":
      "The Sensor Array allows the probe to scan and detect objects around it."
  },
  {
    "id": "chemical-analysis-package",
    "name": "Chemical Analysis Package",
    "size": 1,
    "count": 14,
    "availableProbes": ["science"],
    "description":
      "A Chemical Analysis Package lets the probe research what chemicals it has found."
  },
  {
    "id": "sample-retrieval-package",
    "name": "Sample Retrieval Package",
    "size": 1,
    "count": 12,
    "availableProbes": [],
    "description":
      "A Sample Retrieval Packagea lets the probe collect samples with robotic arms"
  },
  {
    "id": "planetary-encounter-packaging",
    "name": "Planetary Encounter Packaging",
    "size": 1,
    "count": 6,
    "availableProbes": ["science"],
    "description":
      "The planetary encounter package allows the probe to scan planets with greater accuracy."
  },
  {
    "id": "ecm-package",
    "name": "Ecm Package",
    "size": 1,
    "count": 10,
    "availableProbes": ["defense"],
    "description":
      "An ECM (Electronic Counter Measures) Package is used to jam electronics."
  },
  {
    "id": "em-shield",
    "name": "Em Shield",
    "size": 1,
    "count": 12,
    "availableProbes": [],
    "description":
      "An EM Shield (Electro-Magnetic) protects the probe from electro-magnetic radiation."
  },
  {
    "id": "gas-giant-encounter-package",
    "name": "Gas Giant Encounter Package",
    "size": 1,
    "count": 14,
    "availableProbes": ["science"],
    "description":
      "A Gas Giant Encounter Package allows the probe to research a gas giant."
  },
  {
    "id": "nebula-encounter-package",
    "name": "Nebula Encounter Package",
    "size": 1,
    "count": 4,
    "availableProbes": ["science"],
    "description":
      "A Nebula Encounter Package allows the probe to research a nebula."
  },
  {
    "id": "debris-encounter-package",
    "name": "Debris Encounter Package",
    "size": 1,
    "count": 7,
    "availableProbes": ["science"],
    "description":
      "A Debris/Asteroid Field encounter package allows the probe to explore any kind of loose debris."
  },
  {
    "id": "signal-jammer",
    "name": "Signal Jammer",
    "size": 1,
    "count": 13,
    "availableProbes": ["defense"],
    "description":
      "The Signal Jammer allows the probe to dampen certain frequencies of signals."
  },
  {
    "id": "solar-encounter-package",
    "name": "Solar Encounter Package",
    "size": 1,
    "count": 13,
    "availableProbes": ["science"],
    "description":
      "A Solar Encounter Package allows the probe to research a star."
  },
  {
    "id": "radiation-protective-covering",
    "name": "Radiation Protective Covering",
    "size": 1,
    "count": 9,
    "availableProbes": [],
    "description":
      "A Radiation Protective Covering is a special type of armor used to repel radiation."
  },
  {
    "id": "phaser-head",
    "name": "Phaser Head",
    "size": 1,
    "count": 11,
    "availableProbes": ["defense"],
    "description":
      "A phaser head allows the probe to fire a single phaser fire."
  },
  {
    "id": "transporter-relay",
    "name": "Transporter Relay",
    "size": 1,
    "count": 7,
    "availableProbes": [],
    "description":
      "A transporter can extend the transport range of a vessel considerably."
  },
  {
    "id": "self-destruct-kit",
    "name": "Self-Destruct Kit",
    "size": 1,
    "count": 10,
    "availableProbes": ["defense"],
    "description":
      "A Self-Destruct kit give the probe the ability to destroy itself in a massive explosion."
  },
  {
    "id": "decoy-pack",
    "name": "Decoy Pack",
    "size": 1,
    "count": 4,
    "availableProbes": ["defense"],
    "description":
      "A Decoy Package sends out signals to make sensor devices detect the probe as a ship."
  },
  {
    "id": "subspace-encounter-package",
    "name": "Subspace Encounter Package",
    "size": 1,
    "count": 6,
    "availableProbes": ["science"],
    "description":
      "A Subspace Encounter Package allows the probe to research subspace."
  },
  {
    "id": "holographic-projection-unit",
    "name": "Holographic Projection Unit",
    "size": 1,
    "count": 11,
    "availableProbes": [],
    "description":
      "A Holographic Projection Unit allows the probe to project holograms within space."
  },
  {
    "id": "tachyon-emission-detectors",
    "name": "Tachyon Emission Detectors",
    "size": 1,
    "count": 9,
    "availableProbes": ["defense"],
    "description":
      "A Tachyon Emission Detector is used to find tachyon emissions using very specific bands of particle detection sensors."
  }
];
const odysseyTypes = [
  {
    "id": "class-i",
    "name": "Short Range",
    "parentId": "18bea077-8dcc-4151-8638-d48124b44e14",
    "description": "Short range probes are cheap, disposable probes designed for limited use. They cannot move further than the edge of sensor range. ",
    "size": 2,
    "count": 4
  },
  {
    "id": "class-ii",
    "name": "Long Range",
    "parentId": "18bea077-8dcc-4151-8638-d48124b44e14",
    "description": "Larger, and equipped with enough fuel to last for several days. They are designed to monitor areas and objects that are far away from the ship.",
    "size": 3,
    "count": 4
  },
  {
    "id": "science",
    "name": "Science",
    "parentId": "18bea077-8dcc-4151-8638-d48124b44e14",
    "description": "Specifically designed for scientific purposes.  This probe type is equippable with a wide array of customizable features.",
    "size": 3,
    "count": 3
  }
]
*/
