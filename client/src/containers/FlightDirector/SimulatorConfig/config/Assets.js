import React, { Component } from "react";
import { Col, Row, Container, ListGroup, ListGroupItem } from "reactstrap";
import { Mutation } from "react-apollo";
import FileExplorer from "components/views/TacticalMap/fileExplorer";
import gql from "graphql-tag";

const assetList = [
  {
    name: "Mesh",
    fullPath: "mesh",
    folderPath: "/3D/Mesh"
  },
  {
    name: "Texture",
    fullPath: "texture",
    folderPath: "/3D/Texture"
  },
  {
    name: "Right",
    fullPath: "side",
    folderPath: "/Ship Views"
  },
  {
    name: "Top",
    fullPath: "top",
    folderPath: "/Ship Views"
  },
  {
    name: "Login Logo",
    fullPath: "logo",
    folderPath: "/Misc"
  },
  {
    name: "Bridge Map",
    fullPath: "bridge",
    folderPath: "/Misc"
  }
];

class Assets extends Component {
  state = {};
  render() {
    const { selectedAsset } = this.state;
    const { selectedSimulator: sim } = this.props;
    const { assets: assetData } = sim;
    const { __typename, ...assets } = assetData;
    return (
      <Container className="assets">
        <p>Assets</p>
        <Row>
          <Col sm={4}>
            <ListGroup>
              {assetList.map(a => (
                <ListGroupItem
                  key={a.fullPath}
                  active={selectedAsset === a.fullPath}
                  onClick={() => this.setState({ selectedAsset: a.fullPath })}
                >
                  {a.name}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col sm={8} style={{ maxHeight: `80vh`, overflowY: "auto" }}>
            {selectedAsset && (
              <Mutation
                mutation={gql`
                  mutation SetAssets($id: ID!, $assets: SimulatorAssetsInput!) {
                    setSimulatorAssets(id: $id, assets: $assets)
                  }
                `}
              >
                {action => (
                  <FileExplorer
                    key={assets[selectedAsset]}
                    selectedFiles={[assets[selectedAsset]]}
                    onClick={(evt, container) => {
                      action({
                        variables: {
                          id: sim.id,
                          assets: {
                            ...assets,
                            [selectedAsset]: container.fullPath
                          }
                        }
                      }).then(() => {
                        this.props.update && this.props.update();
                      });
                    }}
                  />
                )}
              </Mutation>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Assets;
