import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { ListGroup, ListGroupItem } from "helpers/reactstrap";
import MissionSelector from "./missionSelector";
import Mission from "./mission";

const AuxTimeline = props => {
  const {
    simulator: { id },
    missions,
    auxTimelines
  } = props;
  const [selectedMission, setSelectedMission] = React.useState(null);
  const mission = auxTimelines.find(s => s.id === selectedMission);
  return (
    <div className="core-auxtimeline core-timeline">
      <div className="auxtimeline-list">
        <ListGroup>
          {auxTimelines.map(a => (
            <ListGroupItem
              key={a.id}
              active={a.id === selectedMission}
              onClick={() => setSelectedMission(a.id)}
            >
              {a.mission.name} ({a.currentTimelineStep + 1}/
              {a.mission.timeline.length})
            </ListGroupItem>
          ))}
        </ListGroup>
        <Mutation
          mutation={gql`
            mutation AddMission($simulatorId: ID!, $missionId: ID!) {
              startAuxTimeline(simulatorId: $simulatorId, missionId: $missionId)
            }
          `}
        >
          {action => (
            <MissionSelector
              simulatorId={id}
              mission={null}
              missions={missions}
              onChange={e =>
                action({
                  variables: { simulatorId: id, missionId: e.target.value }
                }).then(res => setSelectedMission(res.data.startAuxTimeline))
              }
            />
          )}
        </Mutation>
      </div>
      <div className="timeline-info">
        {mission && (
          <Mission
            auxTimelineId={mission.id}
            {...props}
            simulatorId={id}
            {...mission}
            {...mission.mission}
          />
        )}
      </div>
    </div>
  );
};
export default AuxTimeline;
