export default (Base) => class extends Base {
  constructor(params) {
    super(params);
    this.coreLayouts = [];
  }
  updateCoreLayout(param) {
    this.handleEvent(param, 'updateCoreLayout', 'updatedCoreLayout');
  }
  addCoreLayout(param) {
    this.handleEvent(param, 'addCoreLayout', 'addedCoreLayout');
  }
  removeCoreLayout(param) {
    this.handleEvent(param, 'removeCoreLayout', 'removedCoreLayout');
  }
};
