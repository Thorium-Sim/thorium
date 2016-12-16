export default (Base) => class extends Base {
  constructor(params) {
    super(params);
    this.simulators = [];
    this.systems = [];
  }
  addSimulator(param) {
    this.handleEvent(param, 'addSimulator', 'addedSimulator');
  }
  addSystem(param) {
    this.handleEvent(param, 'addSystem', 'addedSystem');
  }
};
