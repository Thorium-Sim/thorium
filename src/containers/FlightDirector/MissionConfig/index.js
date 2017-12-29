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
    selectedMission: null,
    loadingMission: false
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
      this.setState({
        loadingMission: true
      });
      fetch(
        `${window.location.protocol}//${
          window.location.hostname
        }:3001/importMission`,
        {
          method: "POST",
          body: data
        }
      ).then(() => {
        window.location.reload();
      });
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
        {this.state.loadingMission && (
          <div className="loading">
            <svg
              id="loader-1"
              version="1.1"
              viewBox="0 0 40 40"
              x="0px"
              y="0px"
              xmlSpace="preserve"
            >
              <path
                d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946&#xA;    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634&#xA;    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
                fill="#000"
                opacity="0.2"
              />
              <path
                d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0&#xA;    C22.32,8.481,24.301,9.057,26.013,10.047z"
                fill="#000"
              />
            </svg>
            <h1>Loading Mission</h1>
            <h4>This page will automatically refresh</h4>
          </div>
        )}
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
