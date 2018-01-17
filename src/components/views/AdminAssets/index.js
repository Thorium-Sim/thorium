import React from "react";
import FileExplorer from "../TacticalMap/fileExplorer";
import { Row, Col, FormGroup, Label, Input, FormText } from "reactstrap";
const Assets = () => {
  const importAssets = evt => {
    if (evt.target.files[0]) {
      const data = new FormData();
      Array.from(evt.target.files).forEach((f, index) =>
        data.append(`files[${index}]`, f)
      );
      fetch(
        `${window.location.protocol}//${
          window.location.hostname
        }:3001/importAssets`,
        {
          method: "POST",
          body: data
        }
      ).then(() => {
        window.location.reload();
      });
    }
  };
  return (
    <Row>
      <Col sm={8} style={{ height: "80vh" }}>
        <FormGroup>
          <Label for="importFile">Import Assets</Label>
          <Input
            type="file"
            name="file"
            id="importFile"
            onChange={importAssets}
          />
          <FormText color="muted">
            Asset files will be in a ".aset" format.
          </FormText>
        </FormGroup>
        <FileExplorer
          config
          directory="/"
          selectedFiles={[]}
          onClick={(e, container) => {}}
          admin
        />
      </Col>
    </Row>
  );
};

export default Assets;
