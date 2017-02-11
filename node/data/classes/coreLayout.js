import uuid from 'uuid';

export default class CoreLayout {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || 'default';
    this.x = params.x || 0;
    this.y = params.y || 0;
    this.w = params.w || 10;
    this.h = params.h || 10;
    this.component = params.component || 'CounterCore';
    this.class = 'CoreLayout';
  }
}

