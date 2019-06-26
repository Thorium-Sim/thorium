import React, { Fragment, Component, PureComponent } from "react";
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
} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import { Query, Mutation } from "react-apollo";
import FontAwesome from "react-fontawesome";
import playSound from "components/generic/SoundPlayer";
import SoundPicker from "helpers/soundPicker";

const QUERY = gql`
  query Ambiance($id: ID!) {
    simulators(id: $id) {
      id
      ambiance {
        id
        name
        asset
        volume
        channel
        playbackRate
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
      refetchQueries={[
        {
          query: QUERY,
          variables: {
            id: simulatorId
          }
        }
      ]}
    >
      {action => (
        <Card>
          <FormGroup className="macro-PlaySound">
            <Label>Sound</Label>
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="flex-row"
            >
              <SoundPicker
                selectedSound={asset || "nothing"}
                setSound={sound =>
                  action({
                    variables: {
                      id: simulatorId,
                      ambiance: { id, asset: sound }
                    }
                  })
                }
              />

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
              onMouseUp={e =>
                action({
                  variables: {
                    id: simulatorId,
                    ambiance: { id, volume: parseFloat(e.target.value) }
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
              onMouseUp={e =>
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
              onBlur={e =>
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
  render() {
    const {
      selectAmbiance,
      selectedAmbiance,
      ambiance,
      simulatorId: id
    } = this.props;

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
                  onClick={() => selectAmbiance(a.id)}
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
              refetchQueries={[
                {
                  query: QUERY,
                  variables: {
                    id
                  }
                }
              ]}
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
                  refetchQueries={[
                    {
                      query: QUERY,
                      variables: {
                        id
                      }
                    }
                  ]}
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
                  refetchQueries={[
                    {
                      query: QUERY,
                      variables: {
                        id
                      }
                    }
                  ]}
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
                        }).then(() => {
                          selectAmbiance(null);
                        });
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
                key={
                  ambiance.find(s => s.id === selectedAmbiance) &&
                  ambiance.find(s => s.id === selectedAmbiance).id
                }
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
class Ambiance extends PureComponent {
  state = {};
  render() {
    const { selectedAmbiance } = this.state;
    const { ambiance, selectedSimulator } = this.props;
    return (
      <Query query={QUERY} variables={{ id: selectedSimulator.id }}>
        {({ loading, data }) =>
          loading || !data.simulators ? null : (
            <AmbianceComp
              ambiance={ambiance}
              {...data.simulators[0]}
              selectedAmbiance={selectedAmbiance}
              selectAmbiance={a => this.setState({ selectedAmbiance: a })}
              simulatorId={selectedSimulator.id}
            />
          )
        }
      </Query>
    );
  }
}
export default Ambiance;
