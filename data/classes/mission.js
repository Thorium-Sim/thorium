import uuid from 'uuid';

export default class Mission {
  constructor(params){
    this.class = 'Mission';
    this.id = params.id || uuid.v4();
    this.name = params.name || 'Mission';
    // These are ID references to the 
    // template simulator objects.
    this.simulators = params.simulators || [];
  }
}
