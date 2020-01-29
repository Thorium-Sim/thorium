import React from "react";
import {capitalCase} from "change-case";
import gql from "graphql-tag.macro";
import {useMutation} from "react-apollo";
import MacroConfig from "components/views/Macros/macroConfig";
import MacroList from "./MacroList";
import LiveDataComponents from "components/views/Midi/LiveData";

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

const ValueConfig = ({comp, config, setMidiControl}) => {
  const ConfigComp = LiveDataComponents[comp]?.config;
  const setComponentConfig = compConfig => {
    setMidiControl(control => ({
      ...control,
      config: {...control.config, componentConfig: compConfig},
    }));
  };
  if (ConfigComp)
    return (
      <>
        <h3>Configure Live Data</h3>

        <ConfigComp
          config={config.componentConfig || {}}
          setComponentConfig={setComponentConfig}
        />
      </>
    );
  return null;
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
            <h3>{capitalCase(selectedComponent.id)}</h3>
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
                      {capitalCase(a)}
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
            {["valueAssignment", "toggle"].includes(actionMode) && (
              <select
                className="btn btn-success btn-block"
                value={config.valueAssignmentComponent || "nothing"}
                onChange={e => {
                  setMidiControl({
                    actionMode: actionMode || "valueAssignment",
                    config: {valueAssignmentComponent: e.target.value},
                  });
                }}
              >
                <option value="nothing" disabled>
                  Choose an Update Value
                </option>
                {Object.entries(LiveDataComponents)
                  .filter(([, comp]) => comp?.actionModes?.includes(actionMode))
                  .map(([l]) => (
                    <option key={l} value={l}>
                      {capitalCase(l)}
                    </option>
                  ))}
              </select>
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
        {config.valueAssignmentComponent && (
          <ValueConfig
            comp={config.valueAssignmentComponent}
            config={config}
            setMidiControl={setMidiControl}
          />
        )}
      </div>
    </>
  );
};
export default BoardConfig;
