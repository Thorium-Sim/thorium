import uuid from 'uuid';
import SensorContact from './sensorContact';

export default class Sensors {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.type = 'Sensors';
    this.class = 'Sensors';
    this.scanResults = '';
    this.scanRequest = '';
    this.processedData = '';
    this.contacts = [];
    this.armyContacts = [];
  }
  scanRequested(request) {
    this.scanResquest = request;
  }
  scanResulted(result) {
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
