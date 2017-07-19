import SensorContact from './sensorContact';
import { System } from './generic';

export default class Sensors extends System {
  constructor(params) {
    super(params);
    this.type = 'Sensors';
    this.class = 'Sensors';
    this.domain = params.domain || 'external';
    if (this.domain === 'external') {
      this.name = 'External Sensors';
    } else {
      this.name = 'Internal Sensors';
    }
    if (params.name) {
      this.name = params.name;
    }
    this.pingMode = 'manual';
    this.scanResults = params.scanResults || '';
    this.scanRequest = params.scanRequest || '';
    this.processedData = params.processedData || '';
    this.scanning = params.scanning || false;
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
  // TODO: Update to include the scan mode: Active, Passive, Manual
  get stealthFactor() {
    if (this.scanning) return 0.5;
    return 0.1;
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
  createContact(contact) {
    const newContact = contact;
    newContact.sensorId = this.id;
    this.contacts.push(new SensorContact(newContact));
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
  nudgeContacts(amount, speed) {
    this.contacts.forEach(c => c.nudge(amount, speed));
  }
  setPingMode(mode) {
    this.pingMode = mode;
  }
}
