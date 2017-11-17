import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import FontAwesome from "react-fontawesome";
import "./fileExplorer.css";

const noop = () => {};
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
  setDirectory = directory => {
    this.setState({ currentDirectory: directory });
  };
  render() {
    if (this.props.data.loading || !this.props.data.assetFolders) return null;
    const assetFolders = this.props.data.assetFolders;
    const { directory } = this.props;
    return (
      <div className="file-explorer">
        <Row>
          {this.state.currentDirectory !== directory && (
            <Col
              onClick={() => {
                //Get the current directory's folder
                let dir = this.props.data.assetFolders.filter(folder => {
                  return folder.fullPath === this.state.currentDirectory;
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
            </Col>
          )}
          {assetFolders
            .filter(folder => {
              return folder.folderPath === this.state.currentDirectory;
            })
            .map(folder => (
              <Col
                key={folder.id}
                onClick={() => this.setDirectory(folder.fullPath)}
              >
                <div className="file-container">
                  <FontAwesome size="5x" name="folder" />
                  <p>{folder.name}</p>
                </div>
              </Col>
            ))}
          {this.props.data.assetFolders &&
            this.props.data.assetFolders.length &&
            this.props.data.assetFolders
              .find(folder => folder.fullPath === this.state.currentDirectory)
              .containers.map(container => {
                const object =
                  container.objects.find(o => o.simulatorId === "default") ||
                  container.objects[0];
                if (!object) return null;
                return (
                  <Col
                    key={container.id}
                    onClick={evt =>
                      this.props.onClick && this.props.onClick(evt, container)}
                    onMouseDown={evt =>
                      this.props.onMouseDown &&
                      this.props.onMouseDown(evt, container)}
                    onMouseUp={evt =>
                      this.props.onMouseUp &&
                      this.props.onMouseUp(evt, container)}
                  >
                    <div className="file-container">
                      <img draggable="false" src={object.url} />
                      <p>{container.name}</p>
                    </div>
                  </Col>
                );
              })}
        </Row>
      </div>
    );
  }
}

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

export default graphql(ASSET_FOLDER_QUERY)(FileExplorer);
