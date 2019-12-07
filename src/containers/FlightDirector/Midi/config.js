import React from "react";
import titleCase from "title-case";
import {ListGroup, ListGroupItem} from "reactstrap";
import {FaBan} from "react-icons/fa";
import EventPicker from "../MissionConfig/EventPicker";
import EventName from "../MissionConfig/EventName";
import gql from "graphql-tag.macro";
import {useMutation} from "react-apollo";
import uuid from "uuid";
import MacroConfig from "components/views/Macros/macroConfig";

const midiFragment = gql`
  fragment MidiSetData on MidiSet {
    id
    name
    deviceName
    controls {
      id
      channel
      messageType
      key
      controllerNumber
      channelModeMessage
      actionMode
      config
    }
  }
`;

const actions = {
  buttonActions: ["macro", "momentaryMacro", "toggle"],

  rotorActions: ["valueAssignment"],

  sliderActions: ["valueAssignment"],
};

const MacroList = ({
  type,
  actions = [],
  setMidiControl,
  selectedAction,
  setSelectedAction,
}) => {
  function addAction(e) {
    const {value: event} = e.target;
    setMidiControl(({config}) => {
      const macroKey = type === "down" ? "macros" : "upMacros";
      const macros = config[macroKey] || [];
      return {
        config: {...config, [macroKey]: macros.concat({id: uuid.v4(), event})},
      };
    });
  }
  function removeAction(id) {
    setMidiControl(({config}) => {
      const macroKey = type === "down" ? "macros" : "upMacros";
      const macros = config[macroKey] || [];
      return {config: {...config, [macroKey]: macros.filter(m => m.id !== id)}};
    });
  }
  return (
    <>
      <h4>{type === "up" ? "Button Down Macros" : "Button Up Macros"}</h4>
      <ListGroup className="scroll">
        {actions.map(e => {
          return (
            <ListGroupItem
              active={e.id === selectedAction}
              key={e.id}
              onClick={() => setSelectedAction(e.id)}
            >
              <EventName id={e.event} label={e.event} />{" "}
              <FaBan
                className="text-danger pull-right"
                onClick={evt => {
                  evt.preventDefault();
                  evt.stopPropagation();
                  removeAction(e.id);
                }}
              />
            </ListGroupItem>
          );
        })}
      </ListGroup>
      <EventPicker
        className={"btn btn-sm btn-success btn-block"}
        handleChange={e => addAction(e)}
      />
    </>
  );
};

const SET_MIDI_CONTROL = gql`
  mutation SetMidiControl($id: ID!, $control: MidiControlInput!) {
    midiSetControl(id: $id, control: $control) {
      ...MidiSetData
    }
  }
  ${midiFragment}
`;

const deviceActionExclusions = {
  "X-TOUCH MINI": [],
  "BCF2000 Port 1": ["momentaryMacro"],
};

const BoardConfig = ({selectedComponent, midiSet}) => {
  const [selectedAction, setSelectedAction] = React.useState(null);
  const [setMidiControlMutation] = useMutation(SET_MIDI_CONTROL);
  const excludedActions = deviceActionExclusions[midiSet?.deviceName] || [];
  const control =
    midiSet?.controls.find(
      c =>
        c.channel === (selectedComponent?.channel ?? null) &&
        c.messageType === (selectedComponent?.messageType ?? null) &&
        c.key === (selectedComponent?.key ?? null) &&
        c.controllerNumber === (selectedComponent?.controllerNumber ?? null) &&
        c.channelModeMessage ===
          (selectedComponent?.channelModeMessage ?? null),
    ) || {};

  const allowedActions =
    selectedComponent &&
    actions[`${selectedComponent?.id.replace(/^(\D*)\d+$/gm, "$1")}Actions`];

  const {
    actionMode = allowedActions?.length === 1 ? allowedActions[0] : null,
    config = {},
  } = control;

  const setMidiControl = controlUpdate => {
    const {id, __typedef, encoder, ...controlVal} = {
      ...selectedComponent,
      ...control,
    };
    let updateVal = controlUpdate;
    if (typeof controlUpdate === "function") {
      updateVal = controlUpdate(controlVal);
    }
    setMidiControlMutation({
      variables: {id: midiSet.id, control: {...controlVal, ...updateVal}},
    });
  };

  const action =
    config.macros?.find(a => a.id === selectedAction) ||
    config.upMacros?.find(a => a.id === selectedAction);

  function updateAction(action) {
    setMidiControl(({config}) => {
      const macroAction = config.macros?.find(a => a.id === selectedAction);

      const macroKey = macroAction ? "macros" : "upMacros";
      const macros = config[macroAction ? "macros" : "upMacros"].map(a =>
        a.id === action.id ? action : a,
      );

      return {config: {...config, [macroKey]: macros}};
    });
  }
  return (
    <>
      <div className="midi-config">
        {selectedComponent ? (
          <>
            <h3>{titleCase(selectedComponent.id)}</h3>
            {allowedActions.length > 1 && (
              <select
                className="btn btn-primary btn-block"
                value={actionMode || "nothing"}
                onChange={e => {
                  setMidiControl({
                    actionMode: e.target.value,
                  });
                }}
              >
                <option disabled value="nothing">
                  Choose an Action Mode
                </option>
                {allowedActions
                  .filter(a => !excludedActions.includes(a))
                  .map(a => (
                    <option key={a} value={a}>
                      {titleCase(a)}
                    </option>
                  ))}
              </select>
            )}
            {actionMode?.toLowerCase().includes("macro") && (
              <MacroList
                type="down"
                actions={config.macros}
                setMidiControl={setMidiControl}
                selectedAction={selectedAction}
                setSelectedAction={setSelectedAction}
              ></MacroList>
            )}
            {actionMode === "momentaryMacro" && (
              <MacroList
                type="up"
                actions={config.upMacros}
                setMidiControl={setMidiControl}
                selectedAction={selectedAction}
                setSelectedAction={setSelectedAction}
              ></MacroList>
            )}
          </>
        ) : null}
      </div>
      <div className="midi-macro">
        {action && (
          <>
            <h3>Configure Macro</h3>
            <MacroConfig
              key={action.id}
              action={action}
              updateAction={updateAction}
            />
          </>
        )}
      </div>
    </>
  );
};
export default BoardConfig;
