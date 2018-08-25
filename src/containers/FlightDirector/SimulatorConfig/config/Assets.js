import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import { withApollo } from "react-apollo";
import { Asset } from "../../../../helpers/assets";
const assetList = [
  {
    name: "Simulator",
    fullPath: "/3D/Mesh/Simulator",
    folderPath: "/3D/Mesh"
  },
  {
    name: "Simulator",
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
    name: "Login Logo",
    fullPath: "/Misc/Login Logo",
    folderPath: "/Misc"
  }
];

class Assets extends Component {
  render() {
    const { selectedSimulator: sim } = this.props;
    return (
      <Container className="assets">
        <p>Assets</p>
        <Row style={{ overflowY: "scroll", height: "80vh" }}>
          {assetList.map(a => (
            <Asset
              key={a.fullPath}
              fail
              asset={a.fullPath}
              simulatorId={sim.id}
            >
              {({ src }) => (
                <WrappedAssetDropdown
                  src={src}
                  sim={sim}
                  {...a}
                  update={() => this.forceUpdate()}
                />
              )}
            </Asset>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Assets;

class AssetDropzone extends Component {
  state = {};
  onDrop = evt => {
    const { folderPath, name, sim, update } = this.props;
    const data = new FormData();
    data.append("simulatorId", sim.id);
    data.append("containerName", name);
    data.append("folderPath", folderPath);
    Array.from(evt.target.files).forEach((f, index) =>
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
    ).then(() => {
      update();
    });
  };
  render() {
    const { name, fullPath, src } = this.props;
    return (
      <Col sm={4}>
        <h3>{name}</h3>
        <h4>{fullPath}</h4>
        <input type="file" onChange={this.onDrop} />
        <div>
          <img
            alt="Asset"
            style={{ width: "100%", maxHeight: "100%" }}
            src={src + `?${Date.now()}`}
          />
        </div>
      </Col>
    );
  }
}

const WrappedAssetDropdown = withApollo(AssetDropzone);
/*


*/
