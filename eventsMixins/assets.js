export default (Base) => class extends Base {
  constructor(params) {
    super(params);
    this.assetFolders = [];
    this.assetContainers = [];
    this.assetObjects = [];
  }
  addAssetFolder(param) {
    this.handleEvent(param, 'addAssetFolder', 'addedAssetFolder');
  }
  addAssetContainer(param) {
    this.handleEvent(param, 'addAssetContainer', 'addedAssetContainer');
  }
  addAssetObject(param) {
    this.handleEvent(param, 'addAssetObject', 'addedAssetObject');
  }
  removeAssetFolder(param) {
    this.handleEvent(param, 'removeAssetFolder', 'removedAssetFolder');
  }
  removeAssetContainer(param) {
    this.handleEvent(param, 'removeAssetContainer', 'removedAssetContainer');
  }
  removeAssetObject(param) {
    this.handleEvent(param, 'removeAssetObject', 'removedAssetObject');
  }
};
