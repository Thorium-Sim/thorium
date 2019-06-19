import React, { Component } from "react";
import { Col, Row, Container, ListGroup, ListGroupItem } from "reactstrap";
import { Mutation } from "react-apollo";
import FileExplorer from "components/views/TacticalMap/fileExplorer";
import gql from "graphql-tag.macro";

const assetList = [
  {
    name: "Button Click",
    fullPath: "buttonClick"
  },
  {
    name: "Button Hover",
    fullPath: "buttonHover"
  },
  {
    name: "Card Change",
    fullPath: "cardChange"
  },
  {
    name: "Notification",
    fullPath: "notification"
  }
];

class Assets extends Component {
  state = {};
  render() {
    const { selectedAsset } = this.state;
    const { selectedSimulator: sim } = this.props;
    const { soundEffects: soundEffectsData } = sim;
    const { __typename, ...soundEffects } = soundEffectsData;
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
                  mutation SetAssets(
                    $id: ID!
                    $soundEffects: SimulatorSoundEffectsInput!
                  ) {
                    setSimulatorSoundEffects(
                      id: $id
                      soundEffects: $soundEffects
                    )
                  }
                `}
              >
                {action => (
                  <FileExplorer
                    // key={soundEffects[selectedAsset]}
                    selectedFiles={[...soundEffects[selectedAsset]]}
                    onClick={(evt, container) => {
                      const variable = soundEffects[selectedAsset].includes(
                        container.fullPath
                      )
                        ? soundEffects[selectedAsset].filter(
                            s => s !== container.fullPath
                          )
                        : soundEffects[selectedAsset].concat(
                            container.fullPath
                          );
                      action({
                        variables: {
                          id: sim.id,
                          soundEffects: {
                            ...soundEffects,
                            [selectedAsset]: variable
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
