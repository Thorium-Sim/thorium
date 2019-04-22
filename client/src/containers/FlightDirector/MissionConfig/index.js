import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { withApollo, Query } from "react-apollo";
import { Container, Button } from "reactstrap";

import TimelineConfig from "./TimelineConfig";
import PrintMission from "./PrintMission";
import SubscriptionHelper from "helpers/subscriptionHelper";

import "./style.scss";
const MISSION_SUB = gql`
  subscription MissionSubscription($missionId: ID!) {
    missionsUpdate(missionId: $missionId) {
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
  setSelectedMission = mission => {
    this.setState({
      selectedMission: mission.id
    });
  };
  removeMission = () => {
    const { mission, history } = this.props;
    if (mission) {
      if (window.confirm("Are you sure you want to delete that mission?")) {
        this.props.client.mutate({
          mutation: gql`
            mutation RemoveMission($id: ID!) {
              removeMission(missionId: $id)
            }
          `,
          variables: { id: mission.id },
          refetchQueries: [
            {
              query: gql`
                query SideNav {
                  missions {
                    id
                    name
                  }
                }
              `
            }
          ]
        });
      }
      history.push("/config/mission");
      this.setState({
        selectedMission: null,
        selectedSimulator: null
      });
    }
  };
  updateMission = (type, e) => {
    const { mission } = this.props;
    const missionId = mission.id;
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
  exportMissionScript = mission => {
    this.setState({
      printingMission: mission
    });
  };
  render() {
    const { mission } = this.props;
    const { printingMission } = this.state;
    if (printingMission) {
      return (
        <PrintMission
          clearMission={() => this.setState({ printingMission: null })}
          mission={printingMission}
        />
      );
    }
    if (!mission) return null;
    return (
      <Container fluid className="missionConfig">
        <h4>
          Missions Config{" "}
          <Button color="danger" size="sm" onClick={this.removeMission}>
            Remove Mission
          </Button>
        </h4>
        <TimelineConfig
          type="mission"
          object={mission}
          client={this.props.client}
          removeMission={this.removeMission}
          updateMission={this.updateMission}
          exportMissionScript={this.exportMissionScript}
        />
      </Container>
    );
  }
}

const MissionsConfigQuery = gql`
  query MissionsQuery($missionId: ID!) {
    missions(id: $missionId) {
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

const MissionsConfigData = withApollo(
  ({
    match: {
      params: { missionId }
    },
    client,
    history
  }) => {
    return (
      <Query query={MissionsConfigQuery} variables={{ missionId }}>
        {({ loading, data, subscribeToMore }) => {
          if (loading || !data) return null;
          const mission = data.missions[0];
          return loading || !data ? null : (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: MISSION_SUB,
                  variables: { missionId: mission.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      missions: subscriptionData.data.missionsUpdate
                    });
                  }
                })
              }
            >
              <MissionsConfig
                history={history}
                client={client}
                mission={mission}
              />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
);
export default MissionsConfigData;
