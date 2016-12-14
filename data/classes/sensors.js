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
