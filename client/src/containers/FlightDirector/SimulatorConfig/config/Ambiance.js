import React, { Fragment, Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  Card,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import FontAwesome from "react-fontawesome";
import SubscriptionHelper from "helpers/subscriptionHelper";
import playSound from "components/generic/SoundPlayer";
const queryData = `
id
ambiance {
  id
  name
  asset
  volume
  channel
  playbackRate
}`;

const QUERY = gql`
query Ambiance($id:String!) {
  simulators(id:$id) {
    ${queryData}
  }
}`;

const SUB = gql`
subscription AmbianceUpdate($id:ID!) {
  simulatorsUpdate(simulatorId:$id) {
    ${queryData}
  }
}
`;

const SOUNDS_QUERY = gql`
  query Sounds {
    assetFolders(name: "Sounds") {
      id
      name
      objects {
        id
        name
        fullPath
      }
    }
  }
`;

const AmbianceConfig = ({
  simulatorId,
  playSound,
  removeSound,
  id,
  asset,
  volume,
  playbackRate,
  channel
}) => {
  return (
    <Mutation
      mutation={gql`
        mutation UpdateAmbiance($id: ID!, $ambiance: AmbianceInput!) {
          updateSimulatorAmbiance(id: $id, ambiance: $ambiance)
        }
      `}
    >
      {action => (
        <Card>
          <FormGroup className="macro-PlaySound">
            <Label>Sound</Label>
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="flex-row"
            >
              <Query query={SOUNDS_QUERY}>
                {({ loading, data: { assetFolders } }) =>
                  loading ? (
                    <p>Loading</p>
                  ) : (
                    <Input
                      type="select"
                      value={asset || "nothing"}
                      onChange={e =>
                        action({
                          variables: {
                            id: simulatorId,
                            ambiance: { id, asset: e.target.value }
                          }
                        })
                      }
                    >
                      <option value="nothing" disabled>
                        Select a Sound
                      </option>
                      {assetFolders[0] &&
                        assetFolders[0].objects
                          .concat()
                          .sort((a, b) => {
                            if (a.name > b.name) return 1;
                            if (a.name < b.name) return -1;
                            return 0;
                          })
                          .map(c => (
                            <option key={c.id} value={c.fullPath}>
                              {c.name}
                            </option>
                          ))}
                    </Input>
                  )
                }
              </Query>
              <FontAwesome
                style={{ margin: "10px", cursor: "pointer" }}
                name="volume-up"
                size="lg"
                onClick={() => {
                  playSound({
                    id,
                    url: `/assets${asset}`,
                    playbackRate,
                    volume
                  });
                  setTimeout(() => removeSound(id, true), 7000);
                }}
              />
            </div>
            <Label>Volume</Label>
            <Input
              type="range"
              min={0}
              step={0.01}
              max={1}
              defaultValue={volume}
              onChange={e =>
                action({
                  variables: {
                    id: simulatorId,
                    ambiance: { id, volume: parseInt(e.target.value, 10) }
                  }
                })
              }
            />
            <Label>Playback Rate: {playbackRate}x</Label>
            <Input
              type="range"
              min={0.1}
              step={0.01}
              max={4}
              defaultValue={playbackRate}
              onChange={e =>
                action({
                  variables: {
                    id: simulatorId,
                    ambiance: { id, playbackRate: parseFloat(e.target.value) }
                  }
                })
              }
            />
            <Label>
              Channels <small>Advanced</small>
            </Label>
            <Input
              type="text"
              placeholder="0,1"
              defaultValue={channel}
              onChange={e =>
                action({
                  variables: {
                    id: simulatorId,
                    ambiance: { id, channel: e.target.value.split(",") }
                  }
                })
              }
            />
          </FormGroup>
        </Card>
      )}
    </Mutation>
  );
};

const AmbianceConfigWrapped = playSound(AmbianceConfig);

class AmbianceComp extends Component {
  state = {};
  render() {
    const { selectedAmbiance } = this.state;
    const { id, ambiance } = this.props;
    return (
      <Container>
        <Row>
          <Col sm={3}>
            <ListGroup>
              {ambiance.length === 0 && (
                <ListGroupItem>No Ambiance</ListGroupItem>
              )}
              {ambiance.map(a => (
                <ListGroupItem
                  key={a.id}
                  active={selectedAmbiance === a.id}
                  onClick={() => this.setState({ selectedAmbiance: a.id })}
                >
                  {a.name}
                </ListGroupItem>
              ))}
            </ListGroup>
            <Mutation
              mutation={gql`
                mutation AddAmbiance($id: ID!, $name: String!) {
                  addSimulatorAmbiance(id: $id, name: $name)
                }
              `}
            >
              {action => (
                <Button
                  color="success"
                  block
                  onClick={() => {
                    const name = window.prompt(
                      "What would you like to call this ambiance? (Bridge)"
                    );
                    if (!name) return;
                    action({ variables: { id, name } });
                  }}
                >
                  Add Ambiance
                </Button>
              )}
            </Mutation>
            {selectedAmbiance && (
              <Fragment>
                <Mutation
                  mutation={gql`
                    mutation UpdateAmbiance(
                      $id: ID!
                      $ambiance: AmbianceInput!
                    ) {
                      updateSimulatorAmbiance(id: $id, ambiance: $ambiance)
                    }
                  `}
                >
                  {action => (
                    <Button
                      color="warning"
                      block
                      onClick={() => {
                        const name = window.prompt(
                          "What would you like to rename this ambiance to?",
                          ambiance.find(s => s.id === selectedAmbiance).name
                        );
                        if (!name) return;
                        action({
                          variables: {
                            id,
                            ambiance: { id: selectedAmbiance, name }
                          }
                        });
                      }}
                    >
                      Rename Ambiance
                    </Button>
                  )}
                </Mutation>
                <Mutation
                  mutation={gql`
                    mutation AddAmbiance($id: ID!, $ambianceId: ID!) {
                      removeSimulatorAmbiance(id: $id, ambianceId: $ambianceId)
                    }
                  `}
                >
                  {action => (
                    <Button
                      color="danger"
                      block
                      onClick={() => {
                        if (
                          !window.confirm(
                            "Are you sure you want to delete this ambiance?"
                          )
                        )
                          return;
                        action({
                          variables: { id, ambianceId: selectedAmbiance }
                        });
                        this.setState({ selectedAmbiance: null });
                      }}
                    >
                      Delete Ambiance
                    </Button>
                  )}
                </Mutation>
              </Fragment>
            )}
          </Col>
          <Col sm={9}>
            <p>
              Do not create multiple ambiance tracks unless your set has support
              for multi-channel audio. If you do not configure your channels
              properly, the ambiance tracks will layer on top of each other.
            </p>
            {selectedAmbiance && (
              <AmbianceConfigWrapped
                key={ambiance.find(s => s.id === selectedAmbiance).id}
                simulatorId={id}
                {...ambiance.find(s => s.id === selectedAmbiance)}
              />
            )}{" "}
          </Col>
        </Row>
      </Container>
    );
  }
}
const Ambiance = ({ selectedSimulator }) => {
  return (
    <Query query={QUERY} variables={{ id: selectedSimulator.id }}>
      {({ loading, data, subscribeToMore }) =>
        loading ? null : (
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: SUB,
                variables: { id: selectedSimulator.id },
                updateQuery: (previousResult, { subscriptionData }) => {
                  return Object.assign({}, previousResult, {
                    simulators: subscriptionData.data.simulatorsUpdate
                  });
                }
              })
            }
          >
            <AmbianceComp {...data.simulators[0]} />
          </SubscriptionHelper>
        )
      }
    </Query>
  );
};
export default Ambiance;
