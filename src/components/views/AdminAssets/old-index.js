import React, { Component } from "react";
import { Button, Row, Col, Card } from "reactstrap";
import "whatwg-fetch";
import FontAwesome from "react-fontawesome";
import "./style.scss";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import ImageViewer from "./imageViewer";

const ASSET_FOLDER_SUB = gql`
  subscription AssetFolderSubscription {
    assetFolderChange {
      id
      folderPath
      fullPath
      name
      containers {
        id
        name
        fullPath
        folderPath
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

class AdminAssetsView extends Component {
  constructor(props) {
    super(props);
    this.assetFolderSubscription = null;
    this.state = {
      currentDirectory: "/",
      currentContainer: {},
      imageModal: null
    };
  }
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
  componentWillUnmount() {
    this.assetFolderSubscription && this.assetFolderSubscription();
  }
  _setDirectory(directory) {
    this.setState({ currentDirectory: directory });
  }
  _setContainer(container) {
    this.setState({ currentContainer: container });
  }
  _createFolder() {
    let name = prompt("What is the name of the folder?");
    const currentDirectory =
      this.state.currentDirectory === "/" ? "" : this.state.currentDirectory;
    let obj = {
      name: name,
      folderPath: this.state.currentDirectory,
      fullPath: `${currentDirectory}/${name}`
    };
    this.props.addAssetFolder(obj);
  }
  _createContainer() {
    let name = prompt("What is the name of the container?"); //Get the current directory's folder
    let directory = this.props.data.assetFolders.filter(folder => {
      return folder.fullPath === this.state.currentDirectory;
    })[0];
    let obj = {
      name: name,
      folderId: directory.id,
      folderPath: this.state.currentDirectory,
      fullPath: this.state.currentDirectory + "/" + name
    };
    this.props.addAssetContainer(obj);
  }
  _createObject(e) {
    // Manually upload the file
    const data = new FormData();
    data.append("simulatorId", this.refs.simulatorSelect.value || "default");
    data.append("containerId", this.state.currentContainer.id);
    Array.from(e.target.files).forEach((f, index) =>
      data.append(`files[${index}]`, f)
    );
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
  }
  _deleteFolder(directory) {
    //First delete all of the objects attached to containers attached to this folder
    /*this.props.cardData.assets.containers.filter((container) => {
			return container.folderId === directory.id;
		}).forEach((container) => {
			this._deletecontainer(container);
		});*/
    //Now delete the folder
    this.props.removeAssetFolder({ id: directory.id });
  }
  _deleteContainer(container) {
    //First delete all of the objects attached to this container
    /*this.props.cardData.assets.objects.filter((object) => {
			return object.containerId === container.id;
		}).forEach((object) => {
			//this.props.operationChannel.push("delete",{table:"assetobjects",filter:{id:object.id}});
		});*/
    //Now delete the container
    if (this.state.currentContainer.id === container.id) {
      this.setState({
        currentContainer: {}
      });
    }
    this.props.removeAssetContainer({ id: container.id });
  }
  _deleteObject(object) {
    //Just delete the object
    this.props.removeAssetObject({ id: object.id });
  }
  _massUpload = e => {
    const data = new FormData();
    data.append("simulatorId", "default");
    data.append("folderPath", this.state.currentDirectory);
    Array.from(e.target.files).forEach((f, index) =>
      data.append(`files[${index}]`, f)
    );
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
  openModal(object) {
    this.setState({
      imageModal: {
        name: object.fullPath,
        image: object.url
      }
    });
  }
  closeModal() {
    this.setState({
      imageModal: null
    });
  }
  render() {
    return this.props.data.loading ? (
      <span>Loading...</span>
    ) : (
      <div className="cardAdminAssets">
        <Row>
          <Col sm="4">
            <div className="btn-group">
              <Button color="primary" onClick={this._createFolder.bind(this)}>
                <FontAwesome name="folder-open" />
              </Button>
              <Button
                color="primary"
                onClick={this._createContainer.bind(this)}
              >
                <FontAwesome name="file" />
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
                <FontAwesome name="upload" />
              </Button>
            </div>

            <p>
              <strong>Path: {this.state.currentDirectory}</strong>
            </p>
            <Card className="flintassetbrowser">
              <ul>
                {this.state.currentDirectory !== "/" ? (
                  <li className="folder">
                    <FontAwesome name="folder" />
                    <button
                      onClick={() => {
                        //Get the current directory's folder
                        let directory = this.props.data.assetFolders.filter(
                          folder => {
                            return (
                              folder.fullPath === this.state.currentDirectory
                            );
                          }
                        )[0];
                        this.setState({
                          currentDirectory: directory.folderPath,
                          currentContainer: {}
                        });
                      }}
                      className="cd-dot-dot btn btn-link"
                    >
                      <span className="glyphicon-class">&laquo; Back</span>
                    </button>
                  </li>
                ) : (
                  <div />
                )}
                {this.props.data.assetFolders
                  .filter(folder => {
                    return folder.folderPath === this.state.currentDirectory;
                  })
                  .map(folder => {
                    return (
                      <li key={folder.id}>
                        <FontAwesome name="folder" />
                        <button
                          onClick={this._setDirectory.bind(
                            this,
                            folder.fullPath
                          )}
                          className="folder btn btn-link"
                        >
                          <span className="glyphicon-class">{folder.name}</span>
                        </button>
                        <FontAwesome
                          name="ban"
                          className="text-danger"
                          onClick={this._deleteFolder.bind(this, folder)}
                        />
                      </li>
                    );
                  })}
                {this.props.data.assetFolders &&
                  this.props.data.assetFolders.length &&
                  this.props.data.assetFolders
                    .find(
                      folder => folder.fullPath === this.state.currentDirectory
                    )
                    .containers.map(container => {
                      return (
                        <li key={container.id}>
                          <FontAwesome name="file" />
                          <button
                            onClick={this._setContainer.bind(this, container)}
                            className="containerLink btn btn-link"
                          >
                            <span className="glyphicon-class">
                              {container.name}
                            </span>
                          </button>
                          <FontAwesome
                            name="ban"
                            className="text-danger"
                            onClick={this._deleteContainer.bind(
                              this,
                              container
                            )}
                          />
                        </li>
                      );
                    })}
              </ul>
            </Card>
          </Col>
          {this.state.currentContainer.id ? (
            <Col className="col-sm-8">
              <h2>Asset: {this.state.currentContainer.name}</h2>
              <h3 className="selectable">
                Asset Path: {this.state.currentContainer.fullPath}
              </h3>
              <h3>Objects:</h3>
              <ul>
                {this.props.data.assetFolders
                  .find(
                    folder => folder.fullPath === this.state.currentDirectory
                  )
                  .containers.find(
                    container => container.id === this.state.currentContainer.id
                  )
                  .objects.map(object => {
                    return (
                      <li key={object.id}>
                        {object.simulatorId}
                        <img
                          alt="Asset"
                          src={object.url}
                          className="img-small"
                          onClick={this.openModal.bind(this, object)}
                        />
                        <FontAwesome
                          name="ban"
                          className="text-ban"
                          onClick={this._deleteObject.bind(this, object)}
                        />
                      </li>
                    );
                  })}
              </ul>
              <select ref="simulatorSelect" className="c-select">
                <option value="default">Default</option>;
                {this.props.data.simulators.map(simulator => {
                  return (
                    <option key={simulator.id} value={simulator.id}>
                      {simulator.name}
                    </option>
                  );
                })}
              </select>
              <input type="file" onChange={this._createObject.bind(this)} />
            </Col>
          ) : (
            <div />
          )}
        </Row>
        {this.state.imageModal && (
          <ImageViewer
            isOpen={this.state.imageModal}
            toggle={this.closeModal.bind(this)}
            name={this.state.imageModal.name}
            image={this.state.imageModal.image}
          />
        )}
      </div>
    );
  }
}

const ASSET_FOLDER_QUERY = gql`
  query GetAssetFolders {
    simulators {
      id
      name
    }
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

const ADD_ASSET_CONTAINER = gql`
  mutation AddAssetContainer(
    $name: String!
    $folderId: ID
    $fullPath: String
    $folderPath: String
  ) {
    addAssetContainer(
      name: $name
      folderId: $folderId
      fullPath: $fullPath
      folderPath: $folderPath
    )
  }
`;

const REMOVE_ASSET_CONTAINER = gql`
  mutation RemoveAssetContainer($id: ID!) {
    removeAssetContainer(id: $id)
  }
`;

const REMOVE_ASSET_OBJECT = gql`
  mutation RemoveAssetObject($id: ID!) {
    removeAssetObject(id: $id)
  }
`;

export default compose(
  graphql(ASSET_FOLDER_QUERY),
  graphql(ADD_ASSET_FOLDER, {
    name: "addAssetFolder",
    props: ({ addAssetFolder }) => ({
      addAssetFolder: props =>
        addAssetFolder({
          variables: Object.assign(props)
        })
    })
  }),
  graphql(REMOVE_ASSET_FOLDER, {
    name: "removeAssetFolder",
    props: ({ removeAssetFolder }) => ({
      removeAssetFolder: props =>
        removeAssetFolder({
          variables: Object.assign(props)
        })
    })
  }),
  graphql(ADD_ASSET_CONTAINER, {
    name: "addAssetContainer",
    props: ({ addAssetContainer }) => ({
      addAssetContainer: props =>
        addAssetContainer({
          variables: Object.assign(props)
        })
    })
  }),
  graphql(REMOVE_ASSET_CONTAINER, {
    name: "removeAssetContainer",
    props: ({ removeAssetContainer }) => ({
      removeAssetContainer: props =>
        removeAssetContainer({
          variables: Object.assign(props)
        })
    })
  }),
  graphql(REMOVE_ASSET_OBJECT, {
    name: "removeAssetObject",
    props: ({ removeAssetObject }) => ({
      removeAssetObject: props =>
        removeAssetObject({
          variables: Object.assign(props)
        })
    })
  })
)(AdminAssetsView);
