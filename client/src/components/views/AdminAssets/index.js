import React, { Fragment, Component } from "react";
import FileExplorer from "../TacticalMap/fileExplorer";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Button,
  FormText
} from "helpers/reactstrap";
import { withApollo } from "react-apollo";

import Tour from "helpers/tourHelper";
import RemoteFiles from "./remoteFiles";
import gql from "graphql-tag.macro";

class Assets extends Component {
  state = {};
  transferFile = files => {
    const { client } = this.props;
    const { currentDirectory } = this.state;
    const variables = {
      folderPath: currentDirectory,
      files: files.map(({ name, url }) => ({ name, url }))
    };
    const mutation = gql`
      mutation RemoteAssetLoad($folderPath: String!, $files: [RemoteAsset!]!) {
        downloadRemoteAssets(folderPath: $folderPath, files: $files)
      }
    `;
    client.mutate({ mutation, variables });
  };
  render() {
    const trainingSteps = () => {
      return [
        {
          selector: ".nothing",
          content: (
            <span>
              Assets are image, 3D models, sounds, videos, and any other files
              which can be used in Thorium. Assets are arranged by use in a
              file-like structure.
            </span>
          )
        },
        {
          selector: ".import",
          content: <span>Asset files can be imported from .aset files.</span>
        },
        {
          selector: ".file-explorer-container",
          content: (
            <span>
              This file explorer can be used to browse, upload, and remove
              assets.
            </span>
          )
        }
      ];
    };
    const importAssets = evt => {
      if (evt.target.files[0]) {
        const data = new FormData();
        Array.from(evt.target.files).forEach((f, index) =>
          data.append(`files[${index}]`, f)
        );
        fetch(
          `${window.location.protocol}//${window.location.hostname}:${parseInt(
            window.location.port,
            10
          ) + 1}/importAssets`,
          {
            method: "POST",
            body: data
          }
        ).then(() => {
          window.location.reload();
        });
      }
    };
    const { emporium } = this.state;
    return (
      <Fragment>
        <h2>Assets Config</h2>
        <FormGroup className="import">
          {!emporium && (
            <Button
              color="success"
              onClick={() => this.setState({ emporium: true })}
            >
              Thorium Emporium (beta)
            </Button>
          )}
          <Label for="importFile">
            <input
              type="file"
              name="file"
              id="importFile"
              hidden
              value=""
              onChange={importAssets}
            />
            <div className="btn btn-info">Import Assets</div>
          </Label>
          <FormText color="muted">
            Asset files will be in a ".aset" format.
          </FormText>
        </FormGroup>
        <div className="file-explorer-container" style={{ height: "70vh" }}>
          {emporium ? (
            <Row style={{ height: "100%" }}>
              <Col sm={6} style={{ height: "100%", overflowY: "auto" }}>
                <FileExplorer
                  config
                  directory="/"
                  selectedFiles={[]}
                  folderChange={folder =>
                    this.setState({ currentDirectory: folder })
                  }
                  onClick={() => {}}
                  admin
                />
              </Col>
              <Col sm={6} style={{ height: "100%" }}>
                <h4>Remote Assets</h4>
                <div style={{ height: "80%", overflowY: "auto" }}>
                  <RemoteFiles transferFile={this.transferFile} />
                </div>
                <div>
                  Add assets to the emporium at{" "}
                  <a
                    href="https://thoriumsim.com/assets"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://thoriumsim.com/assets
                  </a>
                </div>
              </Col>
            </Row>
          ) : (
            <FileExplorer
              config
              directory="/"
              selectedFiles={[]}
              onClick={() => {}}
              admin
            />
          )}
        </div>
        <Tour
          steps={trainingSteps()}
          training={this.props.training}
          onRequestClose={this.props.stopTraining}
        />
      </Fragment>
    );
  }
}

export default withApollo(Assets);
