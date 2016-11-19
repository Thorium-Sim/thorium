import uuid from 'uuid';

export class AssetObject {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.folderPath = params.folderPath || null;
    this.containerId = params.containerId || null;
    this.fullPath = params.fullPath || null;
    this.url = params.url || null;
    this.simulatorId = params.simulatorId || null;
  }
}

export class AssetFolder {
  constructor(props) {
    this.id = props.id || uuid.v4();
    this.folderPath = props.folderPath || null;
    this.fullPath = props.fullPath || null;
    this.name = props.name || null;
  }
}

export class AssetContainer {
  constructor(props) {
    this.id = props.id || uuid.v4();
    this.folderPath = props.folderPath || null;
    this.fullPath = props.fullPath || null;
    this.folderId = props.folderId || null;
    this.name = props.name || null;
  }
}
