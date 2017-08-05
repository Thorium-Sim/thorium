// @flow
import uuid from "uuid";

export class AssetObject {
  id: string;
  containerPath: string;
  containerId: string;
  fullPath: string;
  url: string;
  simulatorId: string;
  class: string;
  constructor(params: {
    id: string,
    containerPath: string,
    containerId: string,
    fullPath: string,
    url: string,
    simulatorId: string,
    class: string
  }) {
    this.id = params.id || uuid.v4();
    this.containerPath = params.containerPath;
    this.containerId = params.containerId;
    this.fullPath = params.fullPath;
    this.url = params.url;
    this.simulatorId = params.simulatorId;
    this.class = "AssetObject";
  }
}

export class AssetFolder {
  id: string;
  folderPath: string;
  fullPath: string;
  name: string;
  class: string;

  constructor(props: {
    id: string,
    folderPath: string,
    fullPath: string,
    name: string,
    class: string
  }) {
    this.id = props.id || uuid.v4();
    this.folderPath = props.folderPath;
    this.fullPath = props.fullPath;
    this.name = props.name;
    this.class = "AssetFolder";
  }
}

export class AssetContainer {
  id: string;
  folderPath: string;
  fullPath: string;
  folderId: string;
  name: string;
  class: string;

  constructor(props: {
    id: string,
    folderPath: string,
    fullPath: string,
    folderId: string,
    name: string,
    class: string
  }) {
    this.id = props.id || uuid.v4();
    this.folderPath = props.folderPath;
    this.fullPath = props.fullPath;
    this.folderId = props.folderId;
    this.name = props.name;
    this.class = "AssetContainer";
  }
}
