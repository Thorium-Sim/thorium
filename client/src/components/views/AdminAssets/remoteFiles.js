import React, { Fragment, Component } from "react";
import { Alert, Button } from "helpers/reactstrap";
import GenericFileExplorer from "./genericFileExplorer";

class RemoteFiles extends Component {
  state = { loading: true, selectedFiles: [] };
  componentDidMount() {
    // Fetch the assets
    const url = "https://us-central1-thorium-sim.cloudfunctions.net/assets";
    // Provide some kind of access method. Maybe make it so you have to subscribe to use this service.
    // Just to pay to keep the lights on.
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.error) throw new Error(res.error);
        this.setState({ loading: false, folders: res });
      })
      .catch(err => this.setState({ error: err.message }));
  }
  toggleFile = fullPath => {
    this.setState(state => ({
      selectedFiles:
        state.selectedFiles.indexOf(fullPath) > -1
          ? state.selectedFiles.filter(s => s !== fullPath)
          : state.selectedFiles.concat(fullPath)
    }));
  };
  transferFile = () => {
    const { transferFile } = this.props;
    const { folders, selectedFiles } = this.state;
    const objects = folders.reduce(
      (prev, next) => prev.concat(next.objects),
      []
    );
    const files = selectedFiles.map(s => objects.find(o => o.fullPath === s));
    transferFile(files);
    this.setState({ selectedFiles: [] });
  };
  render() {
    const { error, loading, folders, selectedFiles } = this.state;
    if (error) return <Alert color="danger">{error}</Alert>;
    if (loading)
      return (
        <Alert color="info">Loading assets. This could take a while...</Alert>
      );
    return (
      <Fragment>
        {selectedFiles.length > 0 && (
          <Button onClick={this.transferFile}>
            {"<"} Transfer Files into Current Folder
          </Button>
        )}
        <GenericFileExplorer
          assetFolders={folders}
          selectedFiles={selectedFiles}
          onClick={(e, file) => this.toggleFile(file.fullPath)}
          admin
        />
      </Fragment>
    );
  }
}

export default RemoteFiles;
