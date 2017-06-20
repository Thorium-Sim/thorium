import uuid from 'uuid';
import { System } from './generic';

export default class ShortRangeComm extends System {
  constructor(params){
    super(params);
    this.type = 'ShortRangeComm';
    this.class = 'ShortRangeComm';
    this.name = params.name || 'Short Range Communications';
    this.displayName = params.displayName || "Short Range Comm";
    this.frequency = params.frequency || 0.5;
    this.amplitude = params.amplitude || 0.5;
    this.state = params.state || 'idle';
    this.arrows = [];
    this.signals = [];
    const signals = params.signals || [];
    signals.forEach(s => this.signals.push(new Signal(s)));
    const arrows = params.arrows || [];
    arrows.forEach(a => this.arrows.push(new Arrow(a, this.signals)));
  }
  get stealthFactor() {
    if (this.state === 'hailing') return 1;
    return this.arrows.reduce((prev, next) => {
      return prev + (next.connected ? 0.1 : 0);
    },0)
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
    this.arrows.push(new Arrow(commArrowInput, this.signals));
  }
  removeArrow(arrowId) {
    this.arrows = this.arrows.filter(a => a.id !== arrowId);
  }
  connectArrow(arrowId) {
    this.state = 'idle';
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
  hail(){
    this.state = 'hailing';
  }
  cancelHail(){
    this.state = 'idle';
  }
  connectHail() {
    this.state = 'idle';
    //Loop through the signals to find
    //which signal we are hailing.
    const signalId = this.signals.reduce((prev, next) => {
      if (next.range.lower <= this.frequency && next.range.upper >= this.frequency) return next.id;
      return prev;
    }, null);
    this.addArrow({signal: signalId, frequency: this.frequency, connected: true});
  }
}

class Signal {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.image = params.image || 'Generic';
    this.name = params.name || 'General Use';
    this.color = params.color || '#888888';
    this.range = params.range || {
      lower: 0.4,
      upper: 0.6
    }
  }
  update({image, name, range, color}){
    if (image) this.image = image;
    if (name) this.name = name;
    if (range) this.range = range;
    if (color) this.color = color;
  }
}

class Arrow {
  constructor(params, signals) {
    this.id = params.id || uuid.v4();
    this.signal = params.signal || uuid.v4(); //Useless arrow
    // TODO: Set a random frequency within the range of the signal
    const signal = signals.find(s => s.id === params.signal)
    if (params.frequency){
      this.frequency = params.frequency;
    } else if (signal){
      // Get random frequency with the range of the signal
      this.frequency = Math.round((Math.random() * (signal.range.upper - signal.range.lower) + signal.range.lower) * 100) / 100;
    } else {
      this.frequency = Math.round(Math.random() * 100) / 100;
    }
    this.connected = params.connected || false;
  }
  connect() {
    this.connected = true;
  }
  disconnect() {
    this.connected = false;
  }
}