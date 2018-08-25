import uuid from "uuid";
import { System } from "./generic";
import SensorContact from "./sensorContact";
class Scan {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.timestamp = params.timestamp || new Date().toString();
    this.mode = params.mode || "Standard";
    this.location = params.location || "";
    this.request = params.request || "Scanning for something";
    this.response = params.response || "";
    this.scanning = params.scanning || true;
    this.cancelled = params.cancelled || false;
  }
  update({ response, cancelled }) {
    if (response || response === "") {
      this.response = response;
      this.scanning = false;
    }
    if (cancelled) {
      this.cancelled = true;
      this.response = "Scan Cancelled";
      this.scanning = false;
    }
  }
}
export default class Sensors extends System {
  constructor(params) {
    super(params);
    this.type = "Sensors";
    this.class = "Sensors";
    this.domain = params.domain || "external";
    if (this.domain === "external") {
      this.name = "External Sensors";
    } else {
      this.name = "Internal Sensors";
    }
    if (params.name) {
      this.name = params.name;
    }
    this.pings = params.pings || true;
    this.pingMode = params.pingMode || "manual";
    this.timeSincePing = params.timeSincePing || 0;
    this.scanResults = params.scanResults || "";
    this.scanRequest = params.scanRequest || "";
    this.processedData = params.processedData || "";
    this.presetAnswers = params.presetAnswers || [];
    this.scanning = params.scanning || false;
    this.autoTarget = params.autoTarget || false;
    this.history = params.history || false;
    this.scans = [];

    if (params.scans) {
      params.scans.forEach(scan => {
        this.scans.push(new Scan(scan));
      });
    }
    // Initialize the contacts and army contacts;
    this.contacts = [];
    this.armyContacts = [];
    if (params.contacts) {
      params.contacts.forEach(contact => {
        this.contacts.push(new SensorContact(contact));
      });
    }
    if (params.armyContacts) {
      params.armyContacts.forEach(contact => {
        this.armyContacts.push(new SensorContact(contact));
      });
    }
    this.frozen = params.frozen || false;
    this.autoThrusters = params.autoThrusters || false;
    this.interference = params.interference || 0;
    this.movement = params.movement || { x: 0, y: 0, z: 0 };
    this.thrusterMovement = params.thrusterMovement || { x: 0, y: 0, z: 0 };

    this.segments = params.segments || [
      { segment: "a1", state: false },
      { segment: "b1", state: false },
      { segment: "c1", state: false },
      { segment: "a2", state: false },
      { segment: "b2", state: false },
      { segment: "c2", state: false },
      { segment: "a3", state: false },
      { segment: "b3", state: false },
      { segment: "c3", state: false },
      { segment: "a4", state: false },
      { segment: "b4", state: false },
      { segment: "c4", state: false },
      { segment: "a5", state: false },
      { segment: "b5", state: false },
      { segment: "c5", state: false },
      { segment: "a6", state: false },
      { segment: "b6", state: false },
      { segment: "c6", state: false },
      { segment: "a7", state: false },
      { segment: "b7", state: false },
      { segment: "c7", state: false },
      { segment: "a8", state: false },
      { segment: "b8", state: false },
      { segment: "c8", state: false },
      { segment: "a9", state: false },
      { segment: "b9", state: false },
      { segment: "c9", state: false },
      { segment: "a10", state: false },
      { segment: "b10", state: false },
      { segment: "c10", state: false },
      { segment: "a11", state: false },
      { segment: "b11", state: false },
      { segment: "c11", state: false },
      { segment: "a12", state: false },
      { segment: "b12", state: false },
      { segment: "c12", state: false }
    ];
  }

  get stealthFactor() {
    if (this.history) {
      return Math.min(
        0.9,
        this.scans.reduce((prev, next) => {
          if (next.scanning) return prev + 0.3;
          return prev;
        }, 0)
      );
    }
    if (this.scanning) return 0.5;
    return 0.1;
  }

  trainingMode() {
    this.training = true;

    this.createContact({
      name: "Training Contact",
      icon: "/Sensor Contacts/Icons/N.svg",
      picture: "/Sensor Contacts/Pictures/Astra Heavy Cruiser.png",
      location: { x: -0.3, y: -0.19, z: 0 },
      destination: { x: -0.3, y: -0.19, z: 0 }
    });
  }

  newScan(scan) {
    this.scans.push(new Scan(scan));
  }
  updateScan(scan) {
    this.scans.find(s => s.id === scan.id).update(scan);
  }
  cancelScan(id) {
    this.scans.find(s => s.id === id).update({ cancelled: true });
  }

  scanRequested(request) {
    this.scanning = true;
    this.scanRequest = request;
  }
  scanCanceled() {
    this.scanning = false;
  }
  scanResulted(result) {
    this.scanning = false;
    this.scanResults = result;
  }
  processedDatad(data) {
    this.processedData = data;
  }
  setPresetAnswers(presetAnswers) {
    this.presetAnswers = presetAnswers;
  }
  createContact(contact) {
    const newContact = contact;
    newContact.sensorId = this.id;
    this.contacts.push(new SensorContact(newContact));
  }
  setArmyContacts(armyContacts) {
    this.armyContacts = [];
    armyContacts.forEach(c => this.createArmyContact(c));
  }
  createArmyContact(contact) {
    const newContact = contact;
    newContact.sensorId = this.id;
    this.armyContacts.push(new SensorContact(newContact));
  }
  updateContact({
    id,
    icon,
    picture,
    size,
    name,
    infrared,
    color,
    locked,
    disabled
  }) {
    const myContact = this.contacts.find(contact => contact.id === id);
    if (icon) myContact.updateIcon(icon);
    if (picture) myContact.updatePicture(picture);
    if (size) myContact.updateSize(size);
    if (name) myContact.updateName(name);
    if (infrared) myContact.updateInfrared(infrared);
    if (color) myContact.updateColor(color);
    if (locked || locked === false) myContact.updateLocked(locked);
    if (disabled || disabled === false) myContact.updateDisabled(disabled);
  }
  updateArmyContact({
    id,
    icon,
    picture,
    size,
    name,
    infrared,
    color,
    locked,
    disabled
  }) {
    const myContact = this.armyContacts.find(contact => contact.id === id);
    if (icon) myContact.updateIcon(icon);
    if (picture) myContact.updatePicture(picture);
    if (size) myContact.updateSize(size);
    if (name) myContact.updateName(name);
    if (infrared) myContact.updateInfrared(infrared);
    if (color) myContact.updateColor(color);
    if (locked || locked === false) myContact.updateLocked(locked);
    if (disabled || disabled === false) myContact.updateDisabled(disabled);
  }
  removeArmyContact(id) {
    const contactIndex = this.armyContacts.findIndex(
      contact => contact.id === id
    );
    this.armyContacts.splice(contactIndex, 1);
  }
  moveContact({ id, destination, speed, stop }) {
    const myContact = this.contacts.find(contact => contact.id === id);
    myContact && myContact.move(destination, speed, stop);
  }
  removeContact({ id }) {
    this.contacts = this.contacts.filter(c => c.id !== id);
  }
  stopContact({ id }) {
    const myContact = this.contacts.find(contact => contact.id === id);
    myContact && myContact.stop();
  }
  destroyContact({ id }) {
    const myContact = this.contacts.find(contact => contact.id === id);
    if (myContact) {
      myContact.destroyed = true;
      setTimeout(this.removeContact.bind(this, { id }), 1000);
    }
  }
  nudgeContacts(amount, speed, yaw) {
    this.contacts.forEach(c => c.nudge(amount, speed, yaw));
  }
  setPingMode(mode) {
    this.pingMode = mode;
  }
  break(report, destroyed, which) {
    this.scanCanceled();
    super.break(report, destroyed, which);
  }
  setPower(powerLevel) {
    if (
      this.power.powerLevels.length &&
      powerLevel < this.power.powerLevels[0]
    ) {
      this.scanCanceled();
    }
    super.setPower(powerLevel);
  }
  setAutoTarget(target) {
    this.autoTarget = target;
  }
  setFrozen(frozen) {
    this.frozen = frozen;
  }
  setAutoThrusters(t) {
    this.autoThrusters = t;
    if (!t) {
      this.thrusterMovement = { x: 0, y: 0, z: 0 };
    }
  }
  setInterference(i) {
    this.interference = i;
  }
  setMovement(m) {
    this.movement = m;
  }
  setSegment(segment, state) {
    this.segments.find(s => s.segment === segment).state = state;
  }
}
