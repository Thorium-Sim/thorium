import SensorContact from "./sensorContact";
import { System } from "./generic";
import uuid from "uuid";
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
  updateContact({ id, icon, picture, size, name, infrared, color }) {
    const myContact = this.contacts.find(contact => contact.id === id);
    if (icon) myContact.updateIcon(icon);
    if (picture) myContact.updatePicture(picture);
    if (size) myContact.updateSize(size);
    if (name) myContact.updateName(name);
    if (infrared) myContact.updateInfrared(infrared);
    if (color) myContact.updateColor(color);
  }
  updateArmyContact({ id, icon, picture, size, name, infrared, color }) {
    const myContact = this.armyContacts.find(contact => contact.id === id);
    if (icon) myContact.updateIcon(icon);
    if (picture) myContact.updatePicture(picture);
    if (size) myContact.updateSize(size);
    if (name) myContact.updateName(name);
    if (infrared) myContact.updateInfrared(infrared);
    if (color) myContact.updateColor(color);
  }
  removeArmyContact(id) {
    const contactIndex = this.armyContacts.findIndex(
      contact => contact.id === id
    );
    this.armyContacts.splice(contactIndex, 1);
  }
  moveContact({ id, destination, speed, stop }) {
    const myContact = this.contacts.find(contact => contact.id === id);
    myContact.move(destination, speed, stop);
  }
  removeContact({ id }) {
    const contactIndex = this.contacts.findIndex(contact => contact.id === id);
    this.contacts.splice(contactIndex, 1);
  }
  stopContact({ id }) {
    const myContact = this.contacts.find(contact => contact.id === id);
    myContact.stop();
  }
  destroyContact({ id }) {
    const myContact = this.contacts.find(contact => contact.id === id);
    myContact.destroyed = true;
    setTimeout(this.removeContact.bind(this, { id }), 1000);
  }
  nudgeContacts(amount, speed, yaw) {
    this.contacts.forEach(c => c.nudge(amount, speed, yaw));
  }
  setPingMode(mode) {
    this.pingMode = mode;
  }
  break(report) {
    this.scanCanceled();
    super.break(report);
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
}
