import React from "react";
import GridCore from "../views/Sensors/gridCore";
import { css } from "styled-components/macro";

const parseActions = ({ timelineItems }) => {
  return timelineItems.map(t => ({ ...t, args: JSON.parse(t.args) }));
};
const getArmyContacts = steps => {
  return steps
    .reduce((acc, step) => {
      const actions = parseActions(step);
      return acc.concat(
        actions
          .filter(e => e.event === "setArmyContacts")
          .map(e => e.args.armyContacts)
      );
    }, [])
    .flat();
};
const getContacts = (steps, currentStep, stepId, delay) => {
  // Get the last step where sensors contacts were updated.
  const stepIndex = steps.findIndex(s => s.id === currentStep);
  const sensorGrid = steps.reduce((acc, step, i) => {
    if (i > stepIndex) return acc;
    const actions = parseActions(step);
    const sensorGrids = actions.filter(
      a =>
        a.event === "updateSensorGrid" &&
        a.id !== stepId &&
        (stepIndex > i || a.delay < delay)
    );
    if (sensorGrids.length === 0) return acc;
    return sensorGrids[0];
  }, null);
  if (sensorGrid)
    return sensorGrid.args.contacts.map(c => ({
      ...c,
      location: c.destination,
      destination: c.destination
    }));
  return [];
};
export default ({
  id,
  steps,
  currentStep,
  updateArgs,
  args,
  client,
  delay,
  lite
}) => {
  const armyContacts = getArmyContacts(steps, currentStep, id, delay);
  const { contacts } = args;
  if (!contacts) {
    updateArgs("contacts", getContacts(steps, currentStep));
    return null;
  }
  return (
    <div
      css={css`
        height: 60vh;
      `}
    >
      <GridCore
        simulator={{}}
        lite
        ultraLite={lite}
        defaultSensors={{ id: "sensors", armyContacts }}
        contacts={contacts}
        updateContacts={contacts => updateArgs("contacts", contacts)}
      />
      <small>
        Note: Use a "Set Army Sensor Contacts" timeline action to configure the
        available sensor contacts. Lots of features are still missing. If there
        is something this timeline action doesn't do, submit an issue describing
        what you want it to do.
      </small>
    </div>
  );
};
