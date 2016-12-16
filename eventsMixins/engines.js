export default (Base) => class extends Base {
  speedChange(param) {
    this.handleEvent(param, 'speedChange', 'speedChanged');
  }
  addHeat(param) {
    this.handleEvent(param, 'addHeat', 'addedHeat');
  }
};
