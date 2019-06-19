import React, { Fragment, Component } from "react";
import { Button } from "helpers/reactstrap";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag.macro";
import FontAwesome from "react-fontawesome";
import ObjPreview from "./3dObjPreview";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Measure from "react-measure";
import matchSorter from "match-sorter";
import debounce from "helpers/debounce";
import "./fileExplorer.scss";

const ASSET_FOLDER_SUB = gql`
  subscription AssetFolderSubscription {
    assetFolderChange {
      name
      fullPath
      id
      folderPath
      objects {
        id
        name
        fullPath
        url
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
  mutation RemoveAssetFolder($fullPath: String!) {
    removeAssetFolder(fullPath: $fullPath)
  }
`;

const REMOVE_ASSET_CONTAINER = gql`
  mutation RemoveAssetObject($fullPath: String!) {
    removeAssetObject(fullPath: $fullPath)
  }
`;

class FileExplorer extends Component {
  constructor(props) {
    super(props);
    const { selectedFiles } = props;
    let currentDirectory = props.directory || "/";
    if (selectedFiles && selectedFiles[0]) {
      currentDirectory = selectedFiles[0]
        .split("/")
        .slice(0, -1)
        .join("/");
    }
    this.state = {
      currentDirectory,
      search: ""
    };
    this.props.folderChange && this.props.folderChange(currentDirectory);
  }
  static defaultProps = {
    directory: "/"
  };
  setDirectory = directory => {
    this.setState({ currentDirectory: directory });
    this.props.folderChange && this.props.folderChange(directory);
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
  _removeFolder = (fullPath, e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to remove this folder? This will permenantly delete all of the files inside the folder."
      )
    ) {
      const mutation = REMOVE_ASSET_FOLDER;
      const variables = {
        fullPath
      };
      this.props.client.mutate({ mutation, variables });
    }
  };
  _removeObject = (fullPath, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      window.confirm("Are you sure you want to permenantly remove this asset?")
    ) {
      const mutation = REMOVE_ASSET_CONTAINER;
      const variables = {
        fullPath
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
    if (e.target.files.length > 1) return this.doMassUpload(files);
    const fileName = files[0].name.slice(0, files[0].name.lastIndexOf("."));
    const name = prompt(
      "What would you like to name the uploaded file?",
      fileName
    );
    if (name) {
      this.doMassUpload(files, name);
    }
  };
  doMassUpload = (files, name) => {
    const data = new FormData();
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
  setSearch = debounce(searchValue => {
    this.setState({ search: searchValue });
  }, 500);
  render() {
    if (this.props.data.loading || !this.props.data.assetFolders) return null;
    const { assetFolders = [] } = this.props.data;
    let { currentDirectory, dimensions } = this.state;
    const { directory, selectedFiles = [], simple } = this.props;
    if (!assetFolders.find(a => a.fullPath === currentDirectory)) {
      currentDirectory = "/";
    }
    const widthFactor = 0.25;
    return (
      <div className="file-explorer">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: ASSET_FOLDER_SUB,
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  assetFolders: subscriptionData.data.assetFolderChange
                });
              }
            })
          }
        />
        <div>
          {simple ? (
            <strong>{currentDirectory}</strong>
          ) : (
            <h4>{currentDirectory}</h4>
          )}
          {!simple && (
            <Fragment>
              <Button color="primary" size="sm" onClick={this._createFolder}>
                Create Folder <FontAwesome name="folder-open" />
              </Button>
              <label>
                <input
                  ref="massUpload"
                  type="file"
                  id="mass-upload-folder"
                  multiple
                  hidden
                  onChange={this._massUpload}
                />
                <div className="btn btn-warning btn-sm">
                  Upload Assets <FontAwesome name="upload" />
                </div>
              </label>
            </Fragment>
          )}
        </div>
        <input
          type={"search"}
          placeholder="Search..."
          value={this.state.searchText}
          onChange={e => {
            this.setState({ searchText: e.target.value });
            if (!e.target.value) {
              this.setState({ search: "" });
            } else {
              this.setSearch(e.target.value);
            }
          }}
        />
        <Measure
          bounds
          onResize={contentRect => {
            this.setState({ dimensions: contentRect.bounds });
          }}
        >
          {({ measureRef }) => (
            <div ref={measureRef}>
              {dimensions && (
                <div className="directory-container">
                  {this.state.search ? (
                    <>
                      {matchSorter(
                        assetFolders.reduce(
                          (acc, next) => acc.concat(next.objects || []),
                          []
                        ),
                        this.state.search,
                        { keys: ["name"] }
                      ).map(object => {
                        return (
                          <div
                            style={{ maxWidth: dimensions.width * widthFactor }}
                            key={object.id}
                            onClick={evt =>
                              this.props.onClick &&
                              this.props.onClick(evt, object)
                            }
                            onMouseDown={evt =>
                              this.props.onMouseDown &&
                              this.props.onMouseDown(evt, object)
                            }
                            onMouseUp={evt =>
                              this.props.onMouseUp &&
                              this.props.onMouseUp(evt, object)
                            }
                          >
                            <div
                              className={`file-container ${
                                selectedFiles.indexOf(object.fullPath) > -1
                                  ? "selected"
                                  : ""
                              }`}
                            >
                              <AssetObject object={object} />
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {currentDirectory !== directory &&
                        currentDirectory !== "/" && (
                          <div
                            style={{ maxWidth: dimensions.width * widthFactor }}
                            onClick={() => {
                              //Get the current directory's folder
                              let dir = this.props.data.assetFolders.filter(
                                folder => {
                                  return folder.fullPath === currentDirectory;
                                }
                              )[0];
                              this.setState({
                                currentDirectory: dir ? dir.folderPath : "/"
                              });
                              this.props.folderChange &&
                                this.props.folderChange(
                                  dir ? dir.folderPath : "/"
                                );
                            }}
                          >
                            <div className="file-container">
                              <FontAwesome
                                flip="horizontal"
                                size="3x"
                                name="share"
                              />
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
                            style={{ maxWidth: dimensions.width * widthFactor }}
                            key={folder.id}
                            onClick={() => this.setDirectory(folder.fullPath)}
                          >
                            <div className="file-container">
                              <FontAwesome size="3x" name="folder" />
                              <p>
                                {folder.name}{" "}
                                {this.props.admin && (
                                  <FontAwesome
                                    name="ban"
                                    className="text-danger"
                                    onClick={e =>
                                      this._removeFolder(folder.fullPath, e)
                                    }
                                  />
                                )}{" "}
                              </p>
                            </div>
                          </div>
                        ))}
                      {this.props.data.assetFolders &&
                        this.props.data.assetFolders.length &&
                        this.props.data.assetFolders
                          .concat({ fullPath: "/", objects: [] })
                          .find(folder => folder.fullPath === currentDirectory)
                          .objects.map(object => {
                            return (
                              <div
                                style={{
                                  maxWidth: dimensions.width * widthFactor
                                }}
                                key={object.id}
                                onClick={evt =>
                                  this.props.onClick &&
                                  this.props.onClick(evt, object)
                                }
                                onMouseDown={evt =>
                                  this.props.onMouseDown &&
                                  this.props.onMouseDown(evt, object)
                                }
                                onMouseUp={evt =>
                                  this.props.onMouseUp &&
                                  this.props.onMouseUp(evt, object)
                                }
                              >
                                <div
                                  className={`file-container ${
                                    selectedFiles.indexOf(object.fullPath) > -1
                                      ? "selected"
                                      : ""
                                  }`}
                                >
                                  <AssetObject
                                    object={object}
                                    removeObject={
                                      this.props.admin
                                        ? this._removeObject
                                        : null
                                    }
                                  />
                                </div>
                              </div>
                            );
                          })}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </Measure>
      </div>
    );
  }
}

export class VideoPreview extends Component {
  state = { loaded: false };
  render() {
    return (
      <div>
        <FontAwesome
          size="3x"
          name="file-video-o"
          style={{ display: !this.state.loaded ? "block" : "none" }}
        />
        <video
          alt="object"
          muted
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

const AssetObject = ({ object, removeObject }) => {
  const ext1 = object.url.match(/\..*$/gi);
  const ext = ext1 ? ext1[0].replace(".", "").toLowerCase() : null;
  if (ext === "obj") {
    return (
      <div>
        <ObjPreview src={object.url} />
        <p>
          {object.name}{" "}
          {removeObject && (
            <FontAwesome
              name="ban"
              className="text-danger"
              onClick={e => removeObject(object.fullPath, e)}
            />
          )}
        </p>
      </div>
    );
  }
  if (["mov", "mp4", "ogv", "webm", "m4v"].indexOf(ext) > -1) {
    return (
      <div>
        <VideoPreview src={object.url} />
        <p>
          {object.name}{" "}
          {removeObject && (
            <FontAwesome
              name="ban"
              className="text-danger"
              onClick={e => removeObject(object.fullPath, e)}
            />
          )}
        </p>
      </div>
    );
  }
  if (["m4a", "wav", "mp3", "ogg", "aiff", "aif"].indexOf(ext) > -1) {
    return (
      <div>
        <FontAwesome size="3x" name="file-audio-o" />
        <p>
          {object.name}{" "}
          {removeObject && (
            <FontAwesome
              name="ban"
              className="text-danger"
              onClick={e => removeObject(object.fullPath, e)}
            />
          )}
        </p>
        <audio className="audio-preview" controls src={object.url} />
      </div>
    );
  }
  return (
    <div>
      <img alt="object" draggable="false" src={object.url} />
      <p>
        {object.name}{" "}
        {removeObject && (
          <FontAwesome
            name="ban"
            className="text-danger"
            onClick={e => removeObject(object.fullPath, e)}
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
      objects {
        id
        name
        fullPath
        url
      }
    }
  }
`;

export default graphql(ASSET_FOLDER_QUERY)(withApollo(FileExplorer));
