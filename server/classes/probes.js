import { System } from './generic';
import uuid from 'uuid';
import App from '../../app.js';

export default class Probes extends System {
  constructor(params) {
    super(params);
    this.class = 'Probes';
    this.type = 'Probes';
    this.name = params.name || 'Probe Launcher';
    // Whether probes launching is handled by torpedos (Odyssey, Galileo)
    // Or by the probe launcher itself (Phoenix, Voyager, Magellan)
    this.torpedo = params.torpedo || false; 
    this.probes = [];
    this.equipment = [];
    this.types = [];
    
    // Load the probes
    params.probes = params.probes || [];
    params.types = params.types || [];
    params.equipment = params.equipment || [];

    params.probes.forEach(p => this.probes.push(new Probe(p, this.id)));
    probesTypes.forEach(p => this.types.push(new ProbeType(p, this.id)));
    probesEquipment.forEach(e => this.equipment.push(new ProbeEquipment(e)));
  }
  destroyProbe(probeId) {
    this.probes = this.probes.filter(p => p.id !== probeId)
  }
  launchProbe(probe) {
    // Decriment the equipment and probe types apropriately.
    // Do some checking first
    const type = this.types.find(t => t.id === probe.type)
    if (type.count <= 0) throw new Error(`Insufficient quantity of ${type.name}`);
    probe.equipment.forEach(e => {
      const eq = this.equipment.find(eq => eq.id === e);
      if (eq.count <= 0) {
        throw new Error(`Insufficient quantity of ${eq.name}`);
      }
    });
    // Now do the updates.
    type.update({count: type.count - 1});
    probe.equipment.forEach(e => {
      const eq = this.equipment.find(eq => eq.id === e);
      eq.update({count: eq.count-1})
    });
    if (this.torpedo) {
      probe.launched = false;
      //Create a new torpedo linked to this probe
      probe.id = uuid.v4();
      App.handleEvent({type: 'probe', probe: probe.id},'torpedoAddWarhead');
    } else {
      probe.launched = true;
    }
    this.probes.push(new Probe(probe, this.id));
  }
  fireProbe(probeId){
    //For when tactical fires the probe
    this.probes.find(p => p.id === probeId).launch();
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
    this.probes.find(p => p.id === probeId).query(query);
  }
  probeQueryResponse(probeId, response) {
    this.probes.find(p => p.id === probeId).response(response);
  }
}

class Probe {
  constructor(params, parentId) {
    this.id = params.id || uuid.v4();
    this.parentId = parentId;
    this.type = params.type || null;
    this.launched = params.launched || true;
    this.equipment = params.equipment || [];
    this.query = params.query || '';
    this.querying = params.querying || false;
    this.response = params.query || '';
  }
  launch() {
    this.launched = true;
  }
  query(query){
    this.query = query;
    this.querying = true;
  }
  response(response){
    this.response = response;
    this.querying = false;
  }
}

class ProbeType {
  constructor(params, parentId) {
    this.id = params.id || uuid.v4();
    this.name = params.name || 'Probe';
    this.parentId = parentId;
    this.description = params.description || 'This is a probe';
    this.size = params.size || 1;
    this.count = params.count || 0;
  }
  update({name, description, size, count}){
    if (name) this.name = name;
    if (description) this.description = description;
    if (size) this.size = size;
    if (count) this.count = count;
  }
}
class ProbeEquipment {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.name = params.name || 'Equipment';
    this.description = params.description || 'This is a piece of probe equipment';
    this.size = params.size || 1;
    this.count = params.count || 0;
    this.availableProbes = params.availableProbes || [];
  }
  update({name, description, size, count}) {
    if (name) this.name = name;
    if (description) this.description = description;
    if (size) this.size = size;
    if (count) this.count = count;
  }
}

const probesTypes = [ {
  id: 'class-i',
  name: 'Class I Probe',
  description: 'The smallest probe; can only hold 4 units of equipment. Use for probe networks.',
  size: 4,
  count: 30,
},
{
  id: 'class-ii',
  name: 'Class II Probe',
  description: 'This medium-sized probe can hold 10 units of equipment. Use for probe networks.',
  size: 10,
  count: 30,
},
{
  id: 'class-iii',
  name: 'Class III Probe',
  description: 'This is the largest probe. It can hold up to 16 units of equipment. Use for probe networks.',
  size: 16,
  count: 30,
},
{
  id: 'defense',
  name: 'Defensive Probe',
  description: 'This weapon-like probe can be used to attack. It holds 20 units of equipment.',
  size: 4,
  count: 20,
},
{
  id: 'science',
  name: 'Science Probe',
  description: 'This probe can use special emitters and detectors. It holds 12 units of equipment.',
  size: 12,
  count: 20,
}
];
const probesEquipment = [
{
  id: 'probe-network package',
  name: 'Probe Network Package',
  description: 'A probe network package instructs the probe to network with up to 7 other probes.',
  size: 0,
  count: 60,
  availableProbes: []
},
{
  id: 'radio-transceiver',
  name: 'Radio Transceiver',
  description: 'A radio transceiver is used to let the probe communicate.',
  size: 1,
  count: 54,
  availableProbes: []
},
{
  id: 'video-camera',
  name: 'Video Camera',
  description: 'A Video Camera can take still or moving pictures.',
  size: 1,
  count: 47,
  availableProbes: []
},
{
  id: 'communications-signal booster',
  name: 'Communications Signal Booster',
  description: 'A Communications Signal Booster gives the probe\'s radio more range.',
  size: 2,
  count: 38,
  availableProbes: []
},
{
  id: 'encoding-sequencer',
  name: 'Encoding Sequencer',
  description: 'Encodes and encrypts signals, making them more secure.',
  size: 2,
  count: 25,
  availableProbes: []
},
{
  id: 'extra-data storage',
  name: 'Extra Data Storage',
  description: 'Increases the amount of on-board data storage, allowing the probe to store more data.',
  size: 2,
  count: 61,
  availableProbes: []
},
{
  id: 'extra-fuel cell',
  name: 'Extra Fuel Cell',
  description: 'An Extra Fuel Cell lets the probe travel further and perform longer.',
  size: 2,
  count: 79,
  availableProbes: []
},
{
  id: 'sensor-array',
  name: 'Sensor Array',
  description: 'The Sensor Array gives the probe general scanning abilities.',
  size: 2,
  count: 120,
  availableProbes: []
},
{
  id: 'chemical-analysis package',
  name: 'Chemical Analysis Package',
  description: 'A Chemical Analysis Package lets the probe research what chemicals it has found.',
  size: 3,
  count: 24,
  availableProbes: []
},
{
  id: 'sample-retrieval package',
  name: 'Sample Retrieval Package',
  description: 'A Sample Retrieval Package lets the probe get something and return it to the ship.',
  size: 3,
  count: 22,
  availableProbes: []
},
{
  id: 'radiation-shielding',
  name: 'Radiation Shielding',
  description: 'Protects the probe from moderate levels of radiaiton.',
  size: 3,
  count: 16,
  availableProbes: []
},
{
  id: 'ecm-package',
  name: 'ECM Package',
  description: 'An ECM (Electronic Counter Measures) Package is used to jam electronics.',
  size: 4,
  count: 26,
  availableProbes: []
},
{
  id: 'gas-giant encounter package',
  name: 'Gas Giant Encounter Package',
  description: 'A Gas Giant Encounter Package allows the probe to research a gas giant.',
  size: 4,
  count: 11,
  availableProbes: []
},
{
  id: 'nebula-encounter package',
  name: 'Nebula Encounter Package',
  description: 'A Nebula Encounter Package allows the probe to research a nebula.',
  size: 4,
  count: 14,
  availableProbes: []
},
{
  id: 'planetary-encounter package',
  name: 'Planetary Encounter Package',
  description: 'A Planetary Encounter Package allows the probe to research a planet.',
  size: 4,
  count: 14,
  availableProbes: []
},
{
  id: 'decoy-package',
  name: 'Decoy Package',
  description: 'A Decoy Package sends out signals to make sensor devices detect the probe as a ship.',
  size: 4,
  count: 23,
  availableProbes: []
},
{
  id: 'subspace-encounter package',
  name: 'Subspace Encounter Package',
  description: 'A Subspace Encounter Package allows the probe to research subspace.',
  size: 5,
  count: 6,
  availableProbes: []
},
{
  id: 'solar-encounter package',
  name: 'Solar Encounter Package',
  description: 'A Solar Encounter Package allows the probe to research a star.',
  size: 5,
  count: 19,
  availableProbes: []
},
{
  id: 'transporter-relay',
  name: 'Transporter Relay',
  description: 'A transporter relay extends the transporter range of this ship.',
  size: 5,
  count: 15,
  availableProbes: []
},
{
  id: 'hologram-projector package',
  name: 'Hologram Projector Package',
  description: 'A Hologram Projector Package makes the probe look like a ship.',
  size: 5,
  count: 5,
  availableProbes: []
},
{
  id: 'metaphasic-shield generator',
  name: 'Metaphasic Shield Generator',
  description: 'Shield Generator that can construct a Shield Grid with other probes up to 2,500 Km protecting from radiation.',
  size: 6,
  count: 7,
  availableProbes: []
},
{
  id: 'self-destruct-kit',
  name: 'Self-Destruct Kit',
  description: 'A Self-Destruct Kit allows the probe to receive a self-destruct signal from the station.',
  size: 1,
  count: 17,
  availableProbes: [ 'defense' ]
},
{
  id: 'warp-nacelle',
  name: 'Warp Nacelle',
  description: 'A Warp Nacelle (warp core included) allows the probe to travel at warp speed.',
  size: 1,
  count: 20,
  availableProbes: [ 'defense' ]
},
{
  id: 'targeting-sensors',
  name: 'Targeting Sensors',
  description: 'Targeting sensors extends the targeting range of the probe.',
  size: 2,
  count: 21,
  availableProbes: [ 'defense' ]
},
{
  id: 'proximity-destruct',
  name: 'Proximity Destruct',
  description: 'A Proximity Self-Destruct detector tells the probe to blow-up when an enemy is near.',
  size: 2,
  count: 20,
  availableProbes: [ 'defense' ]
},
{
  id: 'titanium-armor alloy',
  name: 'Titanium Armor Alloy',
  description: 'Titanium Armor Alloy increases the probe\'s defenses.',
  size: 2,
  count: 15,
  availableProbes: [ 'defense' ]
},
{
  id: 'stealth-field',
  name: 'Stealth Field',
  description: 'A stealth field masks the probe making it harder to detect.',
  size: 3,
  count: 7,
  availableProbes: [ 'defense' ]
},
{
  id: 'phaser-head',
  name: 'Phaser Head',
  description: 'A Phaser Head allows the probe to fire one phaser shot at an enemy ship.',
  size: 3,
  count: 27,
  availableProbes: [ 'defense' ]
},
{
  id: 'tachyon-emitter',
  name: 'Tachyon Emitter',
  description: 'A Tachyon Emitter allows the probe to interact with tachyon particles.',
  size: 3,
  count: 8,
  availableProbes: [ 'science' ]
},
{
  id: 'resonance-emitter',
  name: 'Resonance Emitter',
  description: 'A Resonance Emitter allows the probe to interact with resonating particles.',
  size: 3,
  count: 8,
  availableProbes: [ 'science' ]
},
{
  id: 'lithium-emitter',
  name: 'Lithium Emitter',
  description: 'A Lithium Emitter allows the probe to interact with lithium particles.',
  size: 3,
  count: 10,
  availableProbes: [ 'science' ]
},
{
  id: 'carbon-emitter',
  name: 'Carbon Emitter',
  description: 'A Carbon Emitter allows the probe to interact with carbon particles.',
  size: 3,
  count: 8,
  availableProbes: [ 'science' ]
},
{
  id: 'radiation-emitter',
  name: 'Radiation Emitter',
  description: 'A Radiation Emitter allows the probe to interact with radioactive particles.',
  size: 3,
  count: 8,
  availableProbes: [ 'science' ]
},
{
  id: 'oxygen-emitter',
  name: 'Oxygen Emitter',
  description: 'An Oxygen Emitter allows the probe to interact with oxygen particles.',
  size: 3,
  count: 8,
  availableProbes: [ 'science' ]
},
{
  id: 'hydrogen-emitter',
  name: 'Hydrogen Emitter',
  description: 'A Hydrogen Emitter allows the probe to interact with hydrogen particles.',
  size: 3,
  count: 8,
  availableProbes: [ 'science' ]
},
{
  id: 'helium-emitter',
  name: 'Helium Emitter',
  description: 'A Helium Emitter allows the probe to interact with helium particles.',
  size: 3,
  count: 8,
  availableProbes: [ 'science' ]
},
{
  id: 'graviton-emitter',
  name: 'Graviton Emitter',
  description: 'A Graviton Emitter allows the probe to interact with graviton particles.',
  size: 3,
  count: 8,
  availableProbes: [ 'science' ]
},
{
  id: 'magnetic-emitter',
  name: 'Magnetic Emitter',
  description: 'A Magnetic Emitter allows the probe to interact with magnetic particles.',
  size: 3,
  count: 8,
  availableProbes: [ 'science' ] } ];