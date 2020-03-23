import React, {Fragment} from "react";
import FileExplorer from "../TacticalMap/fileExplorer";
import {Row, Col, FormGroup, Label, Button, FormText} from "helpers/reactstrap";

import Tour from "helpers/tourHelper";
import RemoteFiles from "./remoteFiles";
import {TrainingContext} from "containers/TrainingContextProvider";
import {useRemoteAssetLoadMutation} from "generated/graphql";

interface FileI {
  name: string;
  url: string;
}

const trainingSteps = [
  {
    selector: ".nothing",
    content: (
      <span>
        Assets are image, 3D models, sounds, videos, and any other files which
        can be used in Thorium. Assets are arranged by use in a file-like
        structure.
      </span>
    ),
  },
  {
    selector: ".import",
    content: <span>Asset files can be imported from .aset files.</span>,
  },
  {
    selector: ".file-explorer-container",
    content: (
      <span>
        This file explorer can be used to browse, upload, and remove assets.
      </span>
    ),
  },
];
const Assets: React.FC = () => {
  const [currentDirectory, setCurrentDirectory] = React.useState<string | null>(
    null,
  );
  const [emporium, setEmporium] = React.useState(false);

  const {training, stopTraining} = React.useContext(TrainingContext);

  const [remoteAssetMutation] = useRemoteAssetLoadMutation();

  const transferFile = (files: FileI[]) => {
    if (!currentDirectory) return;
    remoteAssetMutation({
      variables: {
        folderPath: currentDirectory,
        files: files.map(({name, url}) => ({name, url})),
      },
    });
  };

  const importAssets = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt?.target?.files?.[0]) {
      const data = new FormData();
      Array.from(evt.target.files).forEach((f, index) =>
        data.append(`files[${index}]`, f),
      );
      fetch(`/importAssets`, {
        method: "POST",
        body: data,
      }).then(() => {
        window.location.reload();
      });
    }
  };
  return (
    <Fragment>
      <h2>Assets Config</h2>
      <FormGroup className="import">
        {!emporium && (
          <Button color="success" onClick={() => setEmporium(true)}>
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
      <div className="file-explorer-container" style={{height: "70vh"}}>
        {emporium ? (
          <Row style={{height: "100%"}}>
            <Col sm={6} style={{height: "100%", overflowY: "auto"}}>
              <FileExplorer
                directory="/"
                selectedFiles={[]}
                folderChange={folder => setCurrentDirectory(folder)}
                onClick={() => {}}
                admin
              />
            </Col>
            <Col sm={6} style={{height: "100%"}}>
              <h4>Remote Assets</h4>
              <div style={{height: "80%", overflowY: "auto"}}>
                <RemoteFiles transferFile={transferFile} />
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
            directory="/"
            selectedFiles={[]}
            onClick={() => {}}
            admin
          />
        )}
      </div>
      <Tour
        steps={trainingSteps}
        training={training}
        onRequestClose={stopTraining}
      />
    </Fragment>
  );
};

export default Assets;
