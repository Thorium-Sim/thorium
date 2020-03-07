import React from "react";
import {Input} from "reactstrap";

interface TriggerConfigProps {
  allModuleTypes: string[];
  setConfig: (value: any) => void;
  configValue: string;
}
const TriggerConfig: React.FC<TriggerConfigProps> = ({
  configValue = "",
  setConfig,
  allModuleTypes,
}) => {
  const [triggerType, setTriggerType] = React.useState(
    configValue.split(":")[0],
  );
  const [triggerValue, setTriggerValue] = React.useState(() => {
    const value = configValue.split(":")[1];
    if (triggerType === "Timer")
      return parseInt(value.replace(" Seconds", ""), 10);
    if (triggerType === "Remote Access Code") return value;
    return null;
  });
  return (
    <>
      <Input
        value={triggerType}
        type="select"
        onChange={e => {
          setTriggerType(e.target.value);
          setTriggerValue(null);
          setConfig(e.target.value);
        }}
      >
        <option>Manual</option>
        <option>Immediate</option>
        <option>Timer</option>
        <option>Remote Access Code</option>
        {allModuleTypes.includes("Scan Trigger") && (
          <option>Scan Trigger</option>
        )}
        {allModuleTypes.includes("Proximity Trigger") && (
          <option>Proximity Trigger</option>
        )}
      </Input>
      {triggerType === "Timer" && (
        <label>
          Delay in Seconds
          <Input
            value={triggerValue as number | undefined}
            type="number"
            min="0"
            onChange={e => {
              setTriggerValue(e.target.value);
              setConfig(`${triggerType}: ${e.target.value} Seconds`);
            }}
          ></Input>
        </label>
      )}
      {triggerType === "Remote Access Code" && (
        <label>
          Remote Access Code
          <Input
            value={triggerValue as string | undefined}
            type="text"
            onChange={e => {
              setTriggerValue(e.target.value);
              setConfig(`${triggerType}:${e.target.value}`);
            }}
          ></Input>
        </label>
      )}
    </>
  );
};

export default TriggerConfig;
