import uuid from 'uuid';
import { System } from './generic';

export default class ShortRangeComm extends System {
  constructor(params){
    super(params);
    this.type = 'ShortRangeComm';
    this.class = 'ShortRangeComm';
    this.name = params.name || 'Short Range Communications';
    this.frequency = params.frequency || 0.5;
    this.amplitude = params.amplitude || 0.5;
    this.state = params.state || 'idle';
    this.arrows = [];
    this.signals = [];
    params.arrows.forEach(a => this.arrows.push(new Arrow(a)));
    params.signals.forEach(s => this.signals.push(new Signal(s)));
  }
  addCommSignal(commSignalInput) {
    this.signals.push(new Signal(commSignalInput));
  }
  removeCommSignal(signalId) {
    this.signals = this.signals.filter(s => s.id !== signalId);
  }
  updateCommSignal(signalId, commSignalInput) {
    this.signals.find(s => s.id === signalId).update(commSignalInput);
  }
  addArrow(commArrowInput) {
    this.arrows.push(new Arrow(commArrowInput));
  }
  removeArrow(arrowId) {
    this.arrows = this.arrows.filter(a => a.id !== arrowId);
  }
  connectArrow(arrowId) {
    this.arrows.find(a => a.id === arrowId).connect();
  }
  disconnectArrow(arrowId) {
    this.arrows.find(a => a.id === arrowId).disconnect();
  }
  updateComm({state, frequency, amplitude}) {
    //Update state, frequency, and/or amplitude
    if (state) this.state = state;
    if (frequency) this.frequency = frequency;
    if (amplitude) this.amplitude = amplitude;
  }
}

class Signal {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.image = params.image || 'Generic';
    this.name = params.name || 'General Use';
    this.range = params.range || {
      lower: 0.4,
      upper: 0.6
    }
  }
  update({image, name, range}){
    if (image) this.image = image;
    if (name) this.name = name;
    if (range) this.range = range;
  }
}

class Arrow {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.signal = params.signal || uuid.v4(); //Useless arrow
    this.frequency = params.frequency || 0.5;
    this.connected = params.connected || false;
  }
  connect() {
    this.connected = true;
  }
  disconnect() {
    this.connected = false;
  }
}