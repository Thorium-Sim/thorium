import React, { Component } from "react";
import { Button } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
import FontAwesome from "react-fontawesome";
import ObjPreview from "./3dObjPreview";

import "./fileExplorer.css";

const ASSET_FOLDER_SUB = gql`
  subscription AssetFolderSubscription {
    assetFolderChange {
      name
      fullPath
      id
      folderPath
      containers {
        id
        fullPath
        folderPath
        name
        objects {
          id
          containerId
          containerPath
          simulatorId
          fullPath
          url
        }
      }
    }
  }
`;

const ADD_ASSET_FOLDER = gql`
  mutation AddAssetFolder(
    $name: String!
    $fullPath: String!
    $folderPath: String!
  ) {
    addAssetFolder(name: $name, fullPath: $fullPath, folderPath: $folderPath)
  }
`;

const REMOVE_ASSET_FOLDER = gql`
  mutation RemoveAssetFolder($id: ID!) {
    removeAssetFolder(id: $id)
  }
`;

const REMOVE_ASSET_CONTAINER = gql`
  mutation RemoveAssetContainer($id: ID!) {
    removeAssetContainer(id: $id)
  }
`;

class FileExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDirectory: props.directory || "/"
    };
  }
  static defaultProps = {
    directory: "/"
  };
  componentWillReceiveProps(nextProps) {
    if (!this.assetFolderSubscription && !nextProps.data.loading) {
      this.assetFolderSubscription = nextProps.data.subscribeToMore({
        document: ASSET_FOLDER_SUB,
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            assetFolders: subscriptionData.data.assetFolderChange
          });
        }
      });
    }
  }
  setDirectory = directory => {
    this.setState({ currentDirectory: directory });
  };
  _createFolder = () => {
    let name = prompt("What is the name of the folder?");
    if (name) {
      const currentDirectory =
        this.state.currentDirectory === "/" ? "" : this.state.currentDirectory;
      let variables = {
        name: name,
        folderPath: this.state.currentDirectory,
        fullPath: `${currentDirectory}/${name}`
      };
      const mutation = ADD_ASSET_FOLDER;
      this.props.client.mutate({ mutation, variables });
    }
  };
  _removeFolder = (id, e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to remove this folder?")) {
      const mutation = REMOVE_ASSET_FOLDER;
      const variables = {
        id
      };
      this.props.client.mutate({ mutation, variables });
    }
  };
  _removeObject = id => {
    if (window.confirm("Are you sure you want to remove this asset?")) {
      const mutation = REMOVE_ASSET_CONTAINER;
      const variables = {
        id
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  };
  _massUpload = e => {
    const files = e.target.files;
    if (e.target.files.length === 0) return;
    if (e.target.files.length > 1) return this.doMassUplaod(files);
    const name = prompt("What would you like to name the uploaded file?");
    if (name) {
      this.doMassUplaod(files, name);
    }
  };
  doMassUplaod = (files, name) => {
    const data = new FormData();
    data.append("simulatorId", "default");
    data.append("folderPath", this.state.currentDirectory);
    if (name) data.append("name", name);
    Array.from(files).forEach((f, index) => data.append(`files[${index}]`, f));
    fetch(
      `${window.location.protocol}//${window.location.hostname}:${parseInt(
        window.location.port,
        10
      ) + 1}/upload`,
      {
        method: "POST",
        body: data
      }
    );
  };
  render() {
    if (this.props.data.loading || !this.props.data.assetFolders) return null;
    const { assetFolders = [] } = this.props.data;
    let { currentDirectory } = this.state;
    const { directory, selectedFiles = [] } = this.props;
    if (!assetFolders.find(a => a.fullPath === currentDirectory)) {
      currentDirectory = "/";
    }
    return (
      <div className="file-explorer">
        <div>
          <h4>{currentDirectory}</h4>
          <Button color="primary" onClick={this._createFolder}>
            Create Folder <FontAwesome name="folder-open" />
          </Button>
          <Button color="warning" style={{ position: "relative" }}>
            <div
              style={{
                opacity: 0,
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }}
            >
              <input
                ref="massUpload"
                type="file"
                id="mass-upload-folder"
                multiple
                onChange={this._massUpload}
              />
            </div>
            Upload Assets <FontAwesome name="upload" />
          </Button>
        </div>
        <div className="directory-container">
          {currentDirectory !== directory && (
            <div
              onClick={() => {
                //Get the current directory's folder
                let dir = this.props.data.assetFolders.filter(folder => {
                  return folder.fullPath === currentDirectory;
                })[0];
                this.setState({
                  currentDirectory: dir.folderPath
                });
              }}
            >
              <div className="file-container">
                <FontAwesome flip="horizontal" size="5x" name="share" />
                <p>Back</p>
              </div>
            </div>
          )}
          {assetFolders
            .filter(folder => {
              return folder.folderPath === currentDirectory;
            })
            .map(folder => (
              <div
                key={folder.id}
                onClick={() => this.setDirectory(folder.fullPath)}
              >
                <div className="file-container">
                  <FontAwesome size="5x" name="folder" />
                  <p>
                    {folder.name}{" "}
                    <FontAwesome
                      name="ban"
                      className="text-danger"
                      onClick={e => this._removeFolder(folder.id, e)}
                    />{" "}
                  </p>
                </div>
              </div>
            ))}
          {this.props.data.assetFolders &&
            this.props.data.assetFolders.length &&
            this.props.data.assetFolders
              .find(folder => folder.fullPath === currentDirectory)
              .containers.map(container => {
                const object =
                  container.objects.find(o => o.simulatorId === "default") ||
                  container.objects[0];
                if (!object) return null;
                return (
                  <div
                    key={container.id}
                    onClick={evt =>
                      this.props.onClick && this.props.onClick(evt, container)
                    }
                    onMouseDown={evt =>
                      this.props.onMouseDown &&
                      this.props.onMouseDown(evt, container)
                    }
                    onMouseUp={evt =>
                      this.props.onMouseUp &&
                      this.props.onMouseUp(evt, container)
                    }
                  >
                    <div
                      className={`file-container ${
                        selectedFiles.indexOf(container.fullPath) > -1
                          ? "selected"
                          : ""
                      }`}
                    >
                      <AssetObject
                        object={object}
                        container={container}
                        removeObject={
                          this.props.admin ? this._removeObject : null
                        }
                      />
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
}

class VideoPreview extends Component {
  state = { loaded: false };
  render() {
    return (
      <div>
        <FontAwesome
          size="5x"
          name="file-video-o"
          style={{ display: !this.state.loaded ? "block" : "none" }}
        />
        <video
          alt="object"
          src={this.props.src}
          style={{
            width: "100%",
            display: this.state.loaded ? "block" : "none"
          }}
          onLoadedData={() => this.setState({ loaded: true })}
        />
      </div>
    );
  }
}

const AssetObject = ({ object, container, removeObject }) => {
  const ext1 = object.url.match(/\..*$/gi);
  const ext = ext1 ? ext1[0].replace(".", "").toLowerCase() : null;
  if (ext === "obj") {
    return (
      <div>
        <ObjPreview src={object.url} />
        <p>
          {container.name}{" "}
          <FontAwesome
            name="ban"
            className="text-danger"
            onClick={() => removeObject(container.id)}
          />
        </p>
      </div>
    );
  }
  if (["mov", "mp4", "ogv", "m4v"].indexOf(ext) > -1) {
    return (
      <div>
        <VideoPreview src={object.url} />
        <p>
          {container.name}{" "}
          <FontAwesome
            name="ban"
            className="text-danger"
            onClick={() => removeObject(container.id)}
          />
        </p>
      </div>
    );
  }
  if (["m4a", "wav", "mp3", "aiff", "aif"].indexOf(ext) > -1) {
    return (
      <div>
        <FontAwesome size="5x" name="file-audio-o" />
        <p>
          {container.name}{" "}
          <FontAwesome
            name="ban"
            className="text-danger"
            onClick={() => removeObject(container.id)}
          />
        </p>
      </div>
    );
  }
  return (
    <div>
      <img alt="object" draggable="false" src={object.url} />
      <p>
        {container.name}{" "}
        {removeObject && (
          <FontAwesome
            name="ban"
            className="text-danger"
            onClick={() => removeObject(container.id)}
          />
        )}
      </p>
    </div>
  );
};

const ASSET_FOLDER_QUERY = gql`
  query GetAssetFolders {
    assetFolders {
      name
      fullPath
      id
      folderPath
      containers {
        id
        fullPath
        folderPath
        name
        objects {
          id
          containerId
          containerPath
          simulatorId
          fullPath
          url
        }
      }
    }
  }
`;

export default graphql(ASSET_FOLDER_QUERY)(withApollo(FileExplorer));
