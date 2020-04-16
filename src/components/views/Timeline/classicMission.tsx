import React from "react";
import {ListGroup, ListGroupItem} from "helpers/reactstrap";
import allowedMacros from "./allowedMacros";
import {FaCaretRight} from "react-icons/fa";
import TimelineItem from "./timelineItem";
import useLocalStorage from "helpers/hooks/useLocalStorage";
import triggerLocalMacros from "helpers/triggerLocalMacros";
import {
  TimelineStep as TimelineStepI,
  Station,
  Client,
  useSetSimulatorTimelineStepMutation,
  useExecuteMacrosMutation,
  Mission,
} from "generated/graphql";
import {excludedTimelineActions} from "./timelineControl";
import MissionBranchButton from "./missionBranchButton";

interface TimelineStepProps {
  t?: TimelineStepI;
  index: number;
  timeline: TimelineStepI[];
  onlyExecuteViewscreen: boolean;
  simulatorId: string;
  currentTimelineStep: number;
  executedTimelineSteps: string[];
  stations: Station[];
  clients: Client[];
  simArgs: any;
  auxTimelineId?: string;
  missions: Mission[];
}
const TimelineStep: React.FC<TimelineStepProps> = ({
  t,
  index,
  timeline,
  simulatorId,
  currentTimelineStep,
  executedTimelineSteps,
  stations,
  clients,
  simArgs,
  onlyExecuteViewscreen,
  missions,
}) => {
  const [setTimelineStep] = useSetSimulatorTimelineStepMutation();
  const [triggerMacros] = useExecuteMacrosMutation();

  const [expanded, setExpanded] = React.useState(false);
  const runMacro = (t: TimelineStepI) => {
    if (!t) return;
    const stepIndex = timeline.findIndex(i => i.id === t.id);
    const macros = t.timelineItems
      .filter(a =>
        onlyExecuteViewscreen ? allowedMacros.indexOf(a.event) > -1 : true,
      )
      .map(tt => {
        const args = !tt.args
          ? "{}"
          : typeof tt.args === "string"
          ? JSON.stringify({...JSON.parse(tt.args)})
          : JSON.stringify({...(tt.args as Object)});
        return {
          stepId: tt.id,
          event: tt.event,
          args,
          delay: tt.delay || 0,
        };
      });
    const variables = {
      simulatorId,
      macros,
    };
    triggerLocalMacros(macros);
    triggerMacros({variables});
    setTimelineStep({
      variables: {
        simulatorId,
        step: stepIndex + 1,
      },
    });
  };

  const updateValues = () => {};
  const updateDelay = () => {};
  const checkAction = () => {};
  const actions = {};
  const values = {};
  return (
    <ListGroupItem active={index === currentTimelineStep - 1}>
      <div
        onClick={() => t && runMacro(t)}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "calc(100% - 1px)",
          maxWidth: "285px",
        }}
      >
        <FaCaretRight
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setExpanded(ex => !ex);
          }}
          className={`expand-toggle ${expanded ? "expanded" : ""}`}
        />{" "}
        <strong>
          {index + 1}: {t?.name}
        </strong>
      </div>
      {t?.timelineItems.find(m => m.event === "setSimulatorMission") && (
        <>
          <p>
            <strong>Click a button to change timelines</strong>
          </p>
          {t?.timelineItems
            .filter(m => m.event === "setSimulatorMission")
            .map(
              ({args}) =>
                args && (
                  <MissionBranchButton
                    simulatorId={simulatorId}
                    missions={missions || []}
                    args={args}
                  />
                ),
            )}
        </>
      )}
      {expanded && (
        <ul className="timeline-list">
          {t?.timelineItems
            .filter(a =>
              onlyExecuteViewscreen
                ? allowedMacros.indexOf(a.event) > -1
                : true && !excludedTimelineActions.includes(a.event),
            )
            .map(i => (
              <TimelineItem
                id={i.id}
                name={i.name || ""}
                event={i.event}
                args={i.args || "{}"}
                showDescription={false}
                steps={timeline}
                itemDelay={i.delay || 0}
                delay={{}}
                simple
                simulatorId={simulatorId}
                actions={actions}
                checkAction={checkAction}
                executedTimelineSteps={executedTimelineSteps}
                key={i.id}
                values={values}
                updateValues={updateValues}
                updateDelay={updateDelay}
                stations={stations}
                clients={clients}
                simArgs={simArgs}
              />
            ))}
        </ul>
      )}
    </ListGroupItem>
  );
};

interface ClassicMissionProps {
  simulatorId: string;
  executedTimelineSteps: string[];
  currentTimelineStep: number;
  timeline: TimelineStepI[];
  auxTimelineId?: string;
  stations: Station[];
  clients: Client[];
  simArgs: any;
  missions: Mission[];
}
const ClassicMission: React.FC<ClassicMissionProps> = ({
  simulatorId,
  executedTimelineSteps,
  currentTimelineStep,
  timeline,
  auxTimelineId,
  stations,
  clients,
  simArgs,
  missions,
}) => {
  const [onlyExecuteViewscreen, setOnlyExecuteViewscreen] = useLocalStorage(
    "thorium_coreOnlyExecuteViewscreen",
    false,
  );

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={onlyExecuteViewscreen}
          onChange={e => setOnlyExecuteViewscreen(e.target.checked)}
        />{" "}
        Only Execute Viewscreen Actions
      </label>

      <ListGroup className="classic-timeline">
        {timeline.map((t, i) => (
          <TimelineStep
            key={t.id}
            t={t}
            index={i}
            timeline={timeline}
            onlyExecuteViewscreen={onlyExecuteViewscreen}
            simulatorId={simulatorId}
            currentTimelineStep={currentTimelineStep}
            executedTimelineSteps={executedTimelineSteps}
            auxTimelineId={auxTimelineId}
            stations={stations}
            clients={clients}
            simArgs={simArgs}
            missions={missions}
          />
        ))}
      </ListGroup>
    </>
  );
};
export default ClassicMission;
