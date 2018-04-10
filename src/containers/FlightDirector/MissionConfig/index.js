import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import {
  Container,
  Card,
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import MagicContainer from "react-magic-hat";

import TimelineConfig from "./TimelineConfig";
import PrintMission from "./PrintMission";

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

const MissionList = ({
  missions,
  createMission,
  removeMission,
  setSelectedMission,
  selectedMission,
  importMission,
  openFrame
}) => {
  return (
    <Fragment>
      <Card className="scroll">
        {missions.map(e => {
          return (
            <li
              key={e.id}
              onClick={() => {
                setSelectedMission(e);
                openFrame();
              }}
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
        <Button onClick={createMission} size="sm" color="success">
          Add
        </Button>
        {selectedMission && (
          <Button onClick={removeMission} size="sm" color="danger">
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
          onChange={importMission}
        />
        <FormText color="muted">
          Mission files will be in a ".misn" format.
        </FormText>
      </FormGroup>
    </Fragment>
  );
};

const MissionConfig = ({
  mission,
  updateMission,
  exportMissionScript,
  close
}) => {
  return (
    <Fragment>
      <Button size="sm" color="secondary" onClick={close}>
        Go Back
      </Button>
      <h5>Mission Config</h5>
      <FormGroup>
        <Label>Mission Name</Label>
        <Input
          type="text"
          defaultValue={mission.name}
          onChange={e => updateMission("name", e)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Mission Description</Label>
        <Input
          type="textarea"
          defaultValue={mission.description}
          name="text"
          onChange={e => updateMission("description", e)}
        />
      </FormGroup>
      <a id="downloadAnchorElem" style={{ display: "none" }}>
        Nothing here
      </a>
      <Button
        tag="a"
        href={`${window.location.protocol}//${
          window.location.hostname
        }:${parseInt(window.location.port, 10) + 1}/exportMission/${
          mission.id
        }`}
        block
        color="info"
      >
        Export
      </Button>
      <Button
        color="warning"
        block
        onClick={() => exportMissionScript(mission)}
      >
        Export Mission Script
      </Button>
    </Fragment>
  );
};

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
        `${window.location.protocol}//${window.location.hostname}:${parseInt(
          window.location.port,
          10
        ) + 1}/importMission`,
        {
          method: "POST",
          body: data
        }
      ).then(() => {
        window.location.reload();
      });
    }
  };
  exportMissionScript = mission => {
    this.setState({
      printingMission: mission
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.missions) return null;
    const { missions } = this.props.data;
    const { selectedMission, printingMission } = this.state;
    const mission = missions.find(m => m.id === selectedMission);
    if (printingMission)
      return (
        <PrintMission
          clearMission={() => this.setState({ printingMission: null })}
          mission={printingMission}
        />
      );
    return (
      <Container fluid className="missionConfig">
        <h4>
          Missions Config{" "}
          <small>
            <Link to="/">Return to Main</Link>
          </small>
        </h4>
        <div className="magic-container">
          <MagicContainer
            renderFrame={({ id, page, activePage, actions }) => {
              switch (id) {
                case "mission-config":
                  return (
                    <div className="magic-child" style={{ flex: 1 }}>
                      <MissionConfig
                        mission={mission}
                        updateMission={this.updateMission}
                        exportMissionScript={this.exportMissionScript}
                        close={() => {
                          actions.closeNextFrame();
                          actions.setFrame(page, "");
                          this.setState({ selectedMission: null });
                        }}
                      />
                    </div>
                  );
                case "timeline-config":
                  return (
                    <div className="magic-child" style={{ flex: 4 }}>
                      <TimelineConfig
                        type="mission"
                        object={mission}
                        config={this.props.config}
                        client={this.props.client}
                      />
                    </div>
                  );
                default:
                  return (
                    <div className="magic-child">
                      <MissionList
                        missions={missions}
                        createMission={this.createMission}
                        removeMission={this.removeMission}
                        setSelectedMission={this.setSelectedMission}
                        selectedMission={selectedMission}
                        importMission={this.importMission}
                        openFrame={() => {
                          actions.setFrame(page, "mission-config");
                          actions.setNextFrame("timeline-config");
                        }}
                      />
                    </div>
                  );
              }
              // return (
              //   <div
              //     onClick={() =>
              //       page === activePage
              //         ? actions.setNextFrame("dummy")
              //         : actions.closeFrame(activePage)
              //     }
              //   >
              //     Hello
              //   </div>
              // );
            }}
            onEndAnimation={() => {}}
          />
        </div>
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
