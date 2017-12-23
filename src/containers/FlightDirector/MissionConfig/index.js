import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import TimelineConfig from "./TimelineConfig";
import { Link } from "react-router-dom";
import "./style.css";
const MISSION_SUB = gql`
  subscription MissionSubscription {
    missionsUpdate {
      id
      name
      description
      timeline {
        id
        name
        description
        order
        timelineItems {
          id
          name
          type
          event
          args
          delay
        }
      }
    }
  }
`;

class MissionsConfig extends Component {
  state = {
    selectedMission: null
  };
  missionSubscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.missionSubscription && !nextProps.data.loading) {
      this.missionSubscription = nextProps.data.subscribeToMore({
        document: MISSION_SUB,
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            missions: subscriptionData.data.missionsUpdate
          });
        }
      });
    }
  }
  setSelectedMission = mission => {
    this.setState({
      selectedMission: mission.id
    });
  };
  createMission = () => {
    let name = prompt("What is the mission name?");
    if (name) {
      this.props.client.mutate({
        mutation: gql`
          mutation AddMission($name: String!) {
            createMission(name: $name)
          }
        `,
        variables: { name }
      });
    }
  };
  removeMission = () => {
    let mission = this.state.selectedMission;
    if (mission) {
      if (window.confirm("Are you sure you want to delete that mission?")) {
        this.props.client.mutate({
          mutation: gql`
            mutation RemoveMission($id: ID!) {
              removeMission(missionId: $id)
            }
          `,
          variables: { id: mission }
        });
      }
      this.setState({
        selectedMission: null,
        selectedSimulator: null
      });
    }
  };
  updateMission = (type, e) => {
    const missionId = this.state.selectedMission;
    const { value } = e.target;
    const obj = { missionId };
    obj[type] = value;
    this.props.client.mutate({
      mutation: gql`
        mutation EditMission(
          $missionId: ID!
          $name: String
          $description: String
        ) {
          editMission(
            missionId: $missionId
            name: $name
            description: $description
          )
        }
      `,
      variables: obj
    });
  };
  importMission = evt => {
    if (evt.target.files[0]) {
      const data = new FormData();
      Array.from(evt.target.files).forEach((f, index) =>
        data.append(`files[${index}]`, f)
      );
      fetch(
        `${window.location.protocol}//${
          window.location.hostname
        }:3001/importMission`,
        {
          method: "POST",
          body: data
        }
      );
    }
  };

  render() {
    if (this.props.data.loading || !this.props.data.missions) return null;
    const { missions } = this.props.data;
    const { selectedMission } = this.state;
    const mission = missions.find(m => m.id === selectedMission);
    return (
      <Container fluid className="missionConfig">
        <h4>
          Missions Config{" "}
          <small>
            <Link to="/">Return to Main</Link>
          </small>
        </h4>
        <Row>
          <Col sm="2">
            <Card className="scroll">
              {this.props.data.missions.map(e => {
                return (
                  <li
                    key={e.id}
                    onClick={() => this.setSelectedMission(e)}
                    className={`${
                      e.id === selectedMission ? "selected" : ""
                    } list-group-item`}
                  >
                    {e.name}
                  </li>
                );
              })}
            </Card>
            <ButtonGroup>
              <Button onClick={this.createMission} size="sm" color="success">
                Add
              </Button>
              {selectedMission && (
                <Button onClick={this.removeMission} size="sm" color="danger">
                  Remove
                </Button>
              )}
            </ButtonGroup>
            <FormGroup>
              <Label for="importFile">Import Mission</Label>
              <Input
                type="file"
                name="file"
                id="importFile"
                onChange={this.importMission}
              />
              <FormText color="muted">
                Mission files will be in a ".misn" format.
              </FormText>
            </FormGroup>
          </Col>
          {mission && (
            <Col sm="2">
              <h5>Mission Config</h5>
              <FormGroup>
                <Label>Mission Name</Label>
                <Input
                  type="text"
                  value={mission.name}
                  onChange={e => this.updateMission("name", e)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Mission Description</Label>
                <Input
                  type="textarea"
                  value={mission.description}
                  name="text"
                  onChange={e => this.updateMission("description", e)}
                />
              </FormGroup>
              <a id="downloadAnchorElem" style={{ display: "none" }}>
                Nothing here
              </a>
              <Button
                tag="a"
                href={`${window.location.protocol}//${
                  window.location.hostname
                }:3001/exportMission/${mission.id}`}
                block
                color="info"
              >
                Export
              </Button>
            </Col>
          )}
          {mission && (
            <Col sm="8">
              <TimelineConfig
                type="mission"
                object={mission}
                config={this.props.config}
                client={this.props.client}
              />
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

const MissionsConfigQuery = gql`
  query MissionsQuery {
    missions {
      id
      name
      description
      timeline {
        id
        description
        name
        order
        timelineItems {
          id
          args
          delay
          event
          name
          type
        }
      }
    }
  }
`;
export default graphql(MissionsConfigQuery, {})(withApollo(MissionsConfig));
