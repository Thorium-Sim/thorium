import React, {Fragment} from "react";
import * as MacrosPrint from "../../macrosPrint";
import * as Macros from "../../macros";
import {Button, Input, Label} from "helpers/reactstrap";
import allowedMacros from "./allowedMacros";
import EventName from "../../../containers/FlightDirector/MissionConfig/EventName";
import {FaArrowDown, FaArrowRight} from "react-icons/fa";
import {TimelineStep, Station, Client, Mission} from "generated/graphql";
import MissionBranchButton from "./missionBranchButton";

interface ActionPreviewProps {
  id: string;
  event: string;
  args: string;
  simArgs: any;
  simulatorId: string;
  values: {[key: string]: any};
  delay: {[key: string]: number};
  itemDelay: number;
  updateDelay: React.Dispatch<React.SetStateAction<{[key: string]: number}>>;
  updateValues: (v: {[key: string]: any}) => void;
  stations: Station[];
  clients: Client[];
  simple?: boolean;
  steps: TimelineStep[];
}
const ActionPreview: React.FC<ActionPreviewProps> = ({
  id,
  event,
  args,
  simArgs = {},
  simulatorId,
  values,
  delay,
  itemDelay,
  updateDelay,
  updateValues,
  stations,
  clients,
  simple,
  steps,
}) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [previewKey, setPreviewKey] = React.useState<number>(Math.random());
  const argsValue = JSON.parse(args);
  const setArg = (key: string, value: any) => {
    const stepValues = values[id];
    updateValues({...values, [id]: {...stepValues, [key]: value}});
  };
  const EventMacro = Macros[event as keyof typeof Macros];
  const PrintMacro = MacrosPrint[event as keyof typeof MacrosPrint];
  return (
    <div className={`timeline-item`}>
      {edit ? (
        <Button
          size="sm"
          style={{height: "16px", lineHeight: 1}}
          color="warning"
          onClick={() => {
            updateValues({...values, [id]: null});
            setPreviewKey(Math.random());
          }}
        >
          Restore Values
        </Button>
      ) : (
        !simple && (
          <Button
            size="sm"
            style={{height: "16px", lineHeight: 1}}
            color="info"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
        )
      )}
      {values[id] && <p className={"text-danger"}>Edited</p>}
      <div className={edit ? "timeline-edit-mode" : "timeline-no-edit-mode"}>
        <div>
          <Label>
            Delay
            {simple ? (
              `: ${itemDelay}ms`
            ) : (
              <Input
                bsSize="sm"
                defaultValue={itemDelay}
                type="number"
                min="0"
                onChange={e =>
                  updateDelay({...delay, [id]: parseInt(e.target.value)})
                }
              />
            )}
          </Label>
        </div>
        {EventMacro &&
          (() => {
            const MacroPreview = edit ? EventMacro : PrintMacro || EventMacro;
            if (typeof args === "string") {
              args = JSON.parse(args);
            }
            return (
              <MacroPreview
                key={previewKey}
                simulatorId={simulatorId}
                args={{...argsValue, ...simArgs[id], ...values[id]}}
                updateArgs={edit ? setArg : () => {}}
                lite
                stations={stations}
                clients={clients}
                steps={steps}
              />
            );
          })()}
      </div>
    </div>
  );
};

interface TimelineItemProps {
  id: string;
  event: string;
  name: string;
  args: string;
  executedTimelineSteps: string[];
  steps: TimelineStep[];
  simulatorId: string;
  showDescription: boolean;
  actions: {[key: string]: boolean};
  checkAction: (step: string) => void;
  values: {[key: string]: any};
  updateValues: (v: {[key: string]: any}) => void;
  delay: {[key: string]: number};
  itemDelay: number;
  updateDelay: React.Dispatch<React.SetStateAction<{[key: string]: number}>>;
  stations: Station[];
  clients: Client[];
  simArgs: any;
  simple?: boolean;
  missions?: Mission[];
  index?: number;
}
const TimelineItem: React.FC<TimelineItemProps> = ({
  id,
  event,
  name,
  args,
  executedTimelineSteps,
  actions,
  checkAction,
  simulatorId,
  values,
  updateValues,
  delay,
  itemDelay,
  updateDelay,
  stations,
  clients,
  simArgs,
  simple,
  steps,
  showDescription,
  missions,
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(showDescription);
  if (event === "setSimulatorMission") {
    return (
      <MissionBranchButton
        simulatorId={simulatorId}
        missions={missions || []}
        args={args}
      />
    );
  }
  return (
    <li>
      {!simple && (
        <input
          type="checkbox"
          checked={actions[id]}
          onChange={() => checkAction(id)}
        />
      )}
      <span
        className={
          executedTimelineSteps.indexOf(id) > -1 &&
          allowedMacros.indexOf(event) === -1
            ? "text-success"
            : ""
        }
      >
        <EventName id={event} label={name} />
      </span>

      {args && (
        <Fragment>
          <p onClick={() => setExpanded(e => !e)}>
            {expanded ? <FaArrowDown /> : <FaArrowRight />} Details
          </p>
          {expanded && (
            <ActionPreview
              simulatorId={simulatorId}
              id={id}
              steps={steps}
              event={event}
              simArgs={simArgs}
              args={args}
              values={values}
              updateValues={updateValues}
              delay={delay}
              itemDelay={itemDelay}
              updateDelay={updateDelay}
              stations={stations}
              clients={clients}
              simple={simple}
            />
          )}
        </Fragment>
      )}
    </li>
  );
};

export default TimelineItem;
