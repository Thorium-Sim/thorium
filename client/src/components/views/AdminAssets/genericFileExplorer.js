import React, { Fragment, Component } from "react";
import { Button } from "reactstrap";
import {
  FaBan,
  FaFolderOpen,
  FaFolder,
  FaUpload,
  FaShare,
  FaRegFileVideo,
  FaRegFileAudio
} from "react-icons/fa";
import ObjPreview from "../TacticalMap/3dObjPreview";
import Measure from "react-measure";
import "./fileExplorer.scss";

const widthFactor = 0.25;

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
      currentDirectory
    };
  }
  static defaultProps = {
    directory: "/"
  };
  setDirectory = directory => {
    this.setState({ currentDirectory: directory });
  };
  render() {
    const {
      assetFolders = [],
      directory,
      simple,
      admin,
      createFolder,
      massUpload,
      removeFolder
    } = this.props;
    let { currentDirectory, dimensions } = this.state;
    if (!assetFolders.find(a => a.fullPath === currentDirectory)) {
      currentDirectory = "/";
    }
    return (
      <div className="file-explorer">
        <div>
          {simple ? (
            <strong>{currentDirectory}</strong>
          ) : (
            <h4>{currentDirectory}</h4>
          )}
          {!simple && (
            <Fragment>
              {createFolder && (
                <Button
                  color="primary"
                  onClick={() => createFolder({ currentDirectory })}
                >
                  Create Folder <FaFolderOpen />
                </Button>
              )}
              {massUpload && (
                <label>
                  <input
                    ref="massUpload"
                    type="file"
                    id="mass-upload-folder"
                    multiple
                    hidden
                    onChange={event => massUpload({ event, currentDirectory })}
                  />
                  <div className="btn btn-info">
                    Upload Assets <FaUpload />
                  </div>
                </label>
              )}
            </Fragment>
          )}
        </div>
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
                  {currentDirectory !== directory &&
                    currentDirectory !== "/" && (
                      <div
                        style={{ maxWidth: dimensions.width * widthFactor }}
                        onClick={() => {
                          //Get the current directory's folder
                          let dir = assetFolders.filter(folder => {
                            return folder.fullPath === currentDirectory;
                          })[0];
                          this.setState({
                            currentDirectory: dir ? dir.folderPath : "/"
                          });
                        }}
                      >
                        <div className="file-container">
                          <FaShare
                            size="3em"
                            style={{ transform: "scaleX(-1)" }}
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
                          <FaFolder size="3em" name="folder" />
                          <p>
                            {folder.name}{" "}
                            {admin &&
                              removeFolder && (
                                <FaBan
                                  className="text-danger"
                                  onClick={e => removeFolder(folder, e)}
                                />
                              )}{" "}
                          </p>
                        </div>
                      </div>
                    ))}
                  <FolderRender
                    {...this.props}
                    dimensions={dimensions}
                    currentDirectory={currentDirectory}
                  />
                </div>
              )}
            </div>
          )}
        </Measure>
      </div>
    );
  }
}

const FolderRender = ({
  assetFolders,
  dimensions,
  onClick,
  onMouseDown,
  onMouseUp,
  selectedFiles = [],
  admin,
  removeObject,
  currentDirectory
}) => {
  if (!assetFolders) return null;
  if (assetFolders.length === 0) return "No Folders";
  const objects = assetFolders
    .concat({ fullPath: "/", objects: [] })
    .find(folder => folder.fullPath === currentDirectory).objects;
  if (!objects || objects.length === 0) return null;
  return objects.map(object => {
    return (
      <div
        style={{
          maxWidth: dimensions.width * widthFactor
        }}
        key={object.id}
        onClick={evt => onClick && onClick(evt, object)}
        onMouseDown={evt => onMouseDown && onMouseDown(evt, object)}
        onMouseUp={evt => onMouseUp && onMouseUp(evt, object)}
      >
        <div
          className={`file-container ${
            selectedFiles.indexOf(object.fullPath) > -1 ? "selected" : ""
          }`}
        >
          <AssetObject
            object={object}
            removeObject={admin && removeObject ? removeObject : null}
          />
        </div>
      </div>
    );
  });
};

class VideoPreview extends Component {
  state = { loaded: false };
  render() {
    return (
      <div>
        <FaRegFileVideo
          size="3em"
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
  const { contentType: ext } = object;
  if (object.fullPath.indexOf(".obj") > -1) {
    return (
      <div>
        <ObjPreview src={object.url} />
        <p>
          {object.name}{" "}
          {removeObject && (
            <FaBan
              className="text-danger"
              onClick={e => removeObject(object.fullPath, e)}
            />
          )}
        </p>
      </div>
    );
  }
  if (
    ["video/mov", "video/mp4", "video/ogv", "video/webm", "video/m4v"].indexOf(
      ext
    ) > -1
  ) {
    return (
      <div>
        <VideoPreview src={object.url} />
        <p>
          {object.name}{" "}
          {removeObject && (
            <FaBan
              className="text-danger"
              onClick={e => removeObject(object.fullPath, e)}
            />
          )}
        </p>
      </div>
    );
  }
  if (
    [
      "audio/m4a",
      "audio/wav",
      "audio/mp3",
      "audio/ogg",
      "audio/aiff",
      "audio/aif"
    ].indexOf(ext) > -1
  ) {
    return (
      <div>
        <FaRegFileAudio size="3em" />
        <p>
          {object.name}{" "}
          {removeObject && (
            <FaBan
              className="text-danger"
              onClick={e => removeObject(object.fullPath, e)}
            />
          )}
        </p>
      </div>
    );
  }
  return (
    <div>
      <img alt="object" draggable="false" src={object.url} />
      <p>
        {object.name}{" "}
        {removeObject && (
          <FaBan
            className="text-danger"
            onClick={e => removeObject(object.fullPath, e)}
          />
        )}
      </p>
    </div>
  );
};

export default FileExplorer;
