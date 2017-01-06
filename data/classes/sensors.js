import SensorContact from './sensorContact';
import { System } from './generic';

export default class Sensors extends System {
  constructor(params) {
    super(params);
    this.type = 'Sensors';
    this.class = 'Sensors';
    this.scanResults = params.scanResults || '';
    this.scanRequest = params.scanRequest || '';
    this.processedData = params.processedData || '';
    this.scanning = params.scanning || false;
    // Initialize the contacts and army contacts;
    this.contacts = [];
    this.armyContacts = [];
    if (params.contacts) {
      params.contacts.forEach((contact) => {
        this.contacts.push(new SensorContact(contact));
      });
    }
    if (params.armyContacts) {
      params.armyContacts.forEach((contact) => {
        this.armyContacts.push(new SensorContact(contact));
      });
    }
  }
  scanRequested(request) {
    this.scanning = true;
    this.scanResquest = request;
  }
  // TODO: Add Scan Canceled
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
    this.contacts.push(new SensorContact(contact));
  }
  createArmyContact(contact) {
    this.armyContacts.push(new SensorContact(contact));
  }
  updateContact({ id, icon, picture, size, name, infrared }) {
    const myContact = this.contacts.find((contact) => contact.id === id);
    if (icon) myContact.updateIcon(icon);
    if (picture) myContact.updatePicture(picture);
    if (size) myContact.updateSize(size);
    if (name) myContact.updateName(name);
    if (infrared) myContact.updateInfrared(infrared);
  }
  updateArmyContact({ id, icon, picture, size, name, infrared }) {
    const myContact = this.armyContacts.find((contact) => contact.id === id);
    if (icon) myContact.updateIcon(icon);
    if (picture) myContact.updatePicture(picture);
    if (size) myContact.updateSize(size);
    if (name) myContact.updateName(name);
    if (infrared) myContact.updateInfrared(infrared);
  }
  removeArmyContact({ id }) {
    const contactIndex = this.armyContacts.findIndex((contact) => contact.id === id);
    this.armyContacts.splice(contactIndex, 1);
  }
  moveContact({ id, destination, speed, stop }) {
    const myContact = this.contacts.find((contact) => contact.id === id);
    myContact.move(destination, speed, stop);
  }
  removeContact({ id }) {
    const contactIndex = this.contacts.findIndex((contact) => contact.id === id);
    this.contacts.splice(contactIndex, 1);
  }
  destroyContact({ id }) {
    const myContact = this.contacts.find((contact) => contact.id === id);
    myContact.destroyed = true;
    setTimeout(this.removeContact.bind(this, { id }), 1000);
  }
}
