import { Entity } from 'sourced';
import repoMixin from './repo';
import enginesMixin from './engines';
import assetsMixin from './assets';
import coreMixin from './core';
import sensorsMixin from './sensors';
import transportersMixin from './transporters';
import compose from 'compose-function';
import genericMixin from './generic';

const mixin = compose(genericMixin,
  enginesMixin,
  assetsMixin,
  coreMixin,
  sensorsMixin,
  transportersMixin,
  repoMixin
  );

export default class Events extends mixin(Entity) {
  constructor(params) {
    super(params);
    this.clients = [];
  }
  handleEvent(param, pres, past) {
    this.digest(pres, param);
    this.emit(past, param, this);
  }
  test(param) {
    console.log(this);
    this.handleEvent(param, 'test', 'tested');
  }
}
