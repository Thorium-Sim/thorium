import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import { Asset } from "../../../../helpers/assets";
const assetList = [
  {
    name: "Mesh",
    fullPath: "/3D/Mesh/Simulator",
    folderPath: "/3D/Mesh"
  },
  {
    name: "Texture",
    fullPath: "/3D/Texture/Simulator",
    folderPath: "/3D/Texture"
  },
  {
    name: "Right",
    fullPath: "/Ship Views/Right",
    folderPath: "/Ship Views"
  },
  {
    name: "Top",
    fullPath: "/Ship Views/Top",
    folderPath: "/Ship Views"
  },
  {
    name: "Front",
    fullPath: "/Ship Views/Front",
    folderPath: "/Ship Views"
  },
  {
    name: "Back",
    fullPath: "/Ship Views/Back",
    folderPath: "/Ship Views"
  },
  {
    name: "Left",
    fullPath: "/Ship Views/Left",
    folderPath: "/Ship Views"
  },
  {
    name: "Login Logo",
    fullPath: "/Misc/Login Logo",
    folderPath: "/Misc"
  }
];

const Assets = ({ selectedSimulator: sim }) => {
  return (
    <Container className="assets">
      <p>Assets</p>
      <Row style={{ overflowY: "scroll", height: "80vh" }}>
        {assetList.map(a =>
          <Asset key={a.fullPath} asset={a.fullPath} simulatorId={sim.id}>
            {({ src }) => <WrappedAssetDropdown src={src} sim={sim} {...a} />}
          </Asset>
        )}
      </Row>
    </Container>
  );
};

export default Assets;

class AssetDropzone extends Component {
  state = {};
  onDrop = evt => {
    const { folderPath, name, sim, client } = this.props;

    const mutation = gql`
      mutation UploadAsset(
        $files: [UploadedFile!]!
        $folderPath: String
        $simulatorId: ID
        $containerName: String
      ) {
        uploadAsset(
          files: $files
          folderPath: $folderPath
          simulatorId: $simulatorId
          containerName: $containerName
        )
      }
    `;
    const variables = {
      files: evt.target.files,
      folderPath,
      containerName: name,
      simulatorId: sim.id
    };
    client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const { name, fullPath, src } = this.props;
    return (
      <Col sm={4}>
        <h3>
          {name}
        </h3>
        <h4>
          {fullPath}
        </h4>
        <input type="file" onChange={this.onDrop} />
        <div>
          {src
            ? <img style={{ width: "100%", maxHeight: "100%" }} src={src} />
            : <p>Drop your file, or click to select files to upload.</p>}
        </div>
      </Col>
    );
  }
}

const WrappedAssetDropdown = withApollo(AssetDropzone);
/*


*/
