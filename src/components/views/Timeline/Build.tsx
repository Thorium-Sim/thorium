import React from "react";
import {
  Station,
  Client,
  Mission,
  useEditMissionMutation,
  TimelineStep,
  useTimelineUpdateStepMutation,
  useTimelineRemoveItemMutation,
} from "generated/graphql";
import TimelineStepButtons from "containers/FlightDirector/MissionConfig/TimelineStepButtons";
import MissionConfig from "containers/FlightDirector/MissionConfig/MissionConfig";
import StepPicker from "./StepPicker";
import {ListGroup, ListGroupItem, FormGroup, Input, Label} from "reactstrap";
import EventName from "containers/FlightDirector/MissionConfig/EventName";
import {TimelineMacroConfig} from "containers/FlightDirector/MissionConfig/TimelineConfig";
import {FaBan} from "react-icons/fa";
import {Link} from "react-router-dom";

interface TimelineActionListProps {
  missionId: string;
  timeline: TimelineStep[];
  step: TimelineStep;
  stations: Station[];
  clients: Client[];
}

const TimelineActionList: React.FC<TimelineActionListProps> = ({
  missionId,
  timeline,
  step,
  stations,
  clients,
}) => {
  const [selectedAction, setSelectedAction] = React.useState<string | null>(
    "info",
  );

  const [updateStepMutation] = useTimelineUpdateStepMutation();
  const [removeItemMutation] = useTimelineRemoveItemMutation();

  const updateStep = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const variables = {
      timelineStepId: step.id,
      missionId,
      [type]: e.target.value,
    };
    updateStepMutation({variables});
  };

  const removeTimelineItem = (timelineItemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!step.id) return;
    if (!missionId) return;
    if (window.confirm("Are you sure you want to remove this timeline item?")) {
      if (timelineItemId === selectedAction) {
        setSelectedAction(null);
      }

      const variables = {
        timelineStepId: step.id,
        timelineItemId: timelineItemId,
        missionId,
      };
      removeItemMutation({variables});
    }
  };

  return (
    <ListGroup>
      <ListGroupItem
        active={selectedAction === "info"}
        onClick={() => setSelectedAction("info")}
      >
        <div>
          <strong>Step Info</strong>
        </div>
        {selectedAction === "info" && (
          <>
            {" "}
            <FormGroup>
              <Label>Step Name</Label>
              <Input
                type="text"
                key={step.id}
                defaultValue={step && step.name}
                onChange={e => updateStep("name", e)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Step Description</Label>
              <Input
                type="textarea"
                rows={8}
                key={step.id}
                defaultValue={step.description || ""}
                placeholder="Here is where you would explain what is going on during this part of the mission. This serves as your script, explaining what actions should be taken and where the story goes next."
                onChange={e => updateStep("description", e)}
              />
            </FormGroup>
          </>
        )}
      </ListGroupItem>
      {step.timelineItems.map(t => (
        <ListGroupItem
          key={t.id}
          active={selectedAction === t.id}
          onClick={() => setSelectedAction(t.id)}
        >
          <div className="timeline-action-name">
            <strong>
              <EventName id={t.event} />
            </strong>
            <FaBan
              className="text-danger"
              onClick={e => removeTimelineItem(t.id, e)}
            />
          </div>
          {selectedAction === t.id && (
            <TimelineMacroConfig
              omitName
              missionId={missionId}
              timeline={timeline}
              selectedTimelineItem={selectedAction}
              selectedTimelineStep={step.id}
              stations={stations}
              clients={clients}
            />
          )}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

interface BuildProps {
  simulatorId: string;
  currentTimelineStep: number;
  mission: Mission;
  stations: Station[];
  clients: Client[];
}
const Build: React.FC<BuildProps> = ({
  simulatorId,
  currentTimelineStep,
  mission,
  stations,
  clients,
}) => {
  const [selectedStep, setSelectedStep] = React.useState(
    mission.timeline[currentTimelineStep]?.id ||
      mission.timeline[0]?.id ||
      "mission",
  );

  const currentStep = mission.timeline.find(t => t.id === selectedStep);
  const [editMissionMutation] = useEditMissionMutation();

  const updateMission = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {value, checked} = e.target;
    editMissionMutation({
      variables: {
        missionId: mission.id,
        [type]: value === "on" ? checked : value,
      },
    });
  };

  return (
    <div className="mission-builder">
      <StepPicker
        mission={mission}
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
      />
      <TimelineStepButtons
        mission={mission}
        setSelectedTimelineStep={v => setSelectedStep(v || "mission")}
        selectedTimelineStep={
          selectedStep === "mission" ? "mission" : currentStep?.id || "mission"
        }
        simple
      />
      {selectedStep === "mission" || !currentStep ? (
        <MissionConfig mission={mission} updateMission={updateMission} />
      ) : (
        <>
          <TimelineActionList
            missionId={mission.id}
            timeline={mission.timeline}
            step={currentStep}
            stations={stations}
            clients={clients}
          />
        </>
      )}
      <Link to={`/config/mission/${mission.id}/mission`}>
        Go To Mission Config
      </Link>
    </div>
  );
};

export default Build;
