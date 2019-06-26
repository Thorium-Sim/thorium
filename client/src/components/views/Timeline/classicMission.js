import React from "react";
import { ListGroup, ListGroupItem } from "helpers/reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import allowedMacros from "./allowedMacros";
import { FaCaretRight } from "react-icons/fa";
import TimelineItem from "./timelineItem";
import useLocalStorage from "helpers/hooks/useLocalStorage";

const TimelineStep = ({
  t,
  index,
  timeline,
  simulatorId,
  currentTimelineStep,
  updateTimelineStep,
  triggerMacros,
  executedTimelineSteps,
  stations,
  clients,
  simArgs,
  onlyExecuteViewscreen
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const runMacro = t => {
    if (!t) return;
    const stepIndex = timeline.findIndex(i => i.id === t.id);
    const variables = {
      simulatorId,
      macros: t.timelineItems
        .filter(a =>
          onlyExecuteViewscreen ? allowedMacros.indexOf(a.event) > -1 : true
        )
        .map(tt => {
          const args =
            typeof tt.args === "string"
              ? JSON.stringify({ ...JSON.parse(tt.args) })
              : JSON.stringify({ ...tt.args });
          return {
            stepId: tt.id,
            event: tt.event,
            args,
            delay: tt.delay
          };
        })
    };
    triggerMacros({ variables });
    updateTimelineStep &&
      updateTimelineStep({
        variables: {
          simulatorId,
          step: stepIndex + 1
        }
      });
  };

  const updateValues = () => {};
  const updateDelay = () => {};
  const checkAction = () => {};
  const actions = {};
  const values = {};
  return (
    <ListGroupItem active={index === currentTimelineStep - 1}>
      <div onClick={() => runMacro(t)}>
        <FaCaretRight
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setExpanded(ex => !ex);
          }}
          className={`expand-toggle ${expanded ? "expanded" : ""}`}
        />{" "}
        <strong>
          {index + 1}: {t.name}
        </strong>
      </div>
      {expanded && (
        <ul className="timeline-list">
          {t.timelineItems
            .filter(a =>
              onlyExecuteViewscreen ? allowedMacros.indexOf(a.event) > -1 : true
            )
            .map(i => (
              <TimelineItem
                {...i}
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

const ClassicMission = ({
  name,
  simulatorId,
  executedTimelineSteps,
  currentTimelineStep,
  timeline,
  auxTimelineId,
  stations,
  clients,
  simArgs
}) => {
  const [onlyExecuteViewscreen, setOnlyExecuteViewscreen] = useLocalStorage(
    "thorium_coreOnlyExecuteViewscreen",
    false
  );
  return (
    <>
      <h5>{name}</h5>
      <label>
        <input
          type="checkbox"
          checked={onlyExecuteViewscreen}
          onChange={e => setOnlyExecuteViewscreen(e.target.checked)}
        />{" "}
        Only Execute Viewscreen Actions
      </label>
      <Mutation
        mutation={gql`
          mutation UpdateTimelineStep($simulatorId: ID!, $step: Int!) {
            setSimulatorTimelineStep(simulatorId: $simulatorId, step: $step)
          }
        `}
      >
        {updateTimelineStep => (
          <Mutation
            mutation={gql`
              mutation ExecuteMacro($simulatorId: ID!, $macros: [MacroInput]!) {
                triggerMacros(simulatorId: $simulatorId, macros: $macros)
              }
            `}
          >
            {triggerMacros => (
              <ListGroup style={{ overflowY: "auto", paddingBottom: "20px" }}>
                {timeline.map((t, i) => (
                  <TimelineStep
                    key={t.id}
                    t={t}
                    index={i}
                    timeline={timeline}
                    onlyExecuteViewscreen={onlyExecuteViewscreen}
                    simulatorId={simulatorId}
                    currentTimelineStep={currentTimelineStep}
                    updateTimelineStep={updateTimelineStep}
                    triggerMacros={triggerMacros}
                    executedTimelineSteps={executedTimelineSteps}
                    auxTimelineId={auxTimelineId}
                    stations={stations}
                    clients={clients}
                    simArgs={simArgs}
                  />
                ))}
              </ListGroup>
            )}
          </Mutation>
        )}
      </Mutation>
    </>
  );
};
export default ClassicMission;
