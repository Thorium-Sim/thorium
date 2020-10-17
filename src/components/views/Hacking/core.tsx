import React from "react";
import {
  Simulator,
  useComputerCoreHackingSubscription,
  useHackingPresetsQuery,
  useHackingActivateMutation,
  useHackingDeactivateMutation,
  useHackingAllowHackingMutation,
  useHackingSetPresetMutation,
} from "generated/graphql";
import "./style.scss";
import {Button, Input} from "reactstrap";
import {OutputField} from "components/generic/core";

interface HackingProps {
  simulator: Simulator;
}

const HackingCore: React.FC<HackingProps> = props => {
  const {simulator} = props;
  const {loading, data} = useComputerCoreHackingSubscription({
    variables: {simulatorId: simulator.id},
  });
  const {data: presetsData} = useHackingPresetsQuery();
  const [activate] = useHackingActivateMutation();
  const [deactivate] = useHackingDeactivateMutation();
  const [allowHacking] = useHackingAllowHackingMutation();
  const [setPreset] = useHackingSetPresetMutation();

  if (loading || !data) return null;
  const {computerCoreUpdate: computerCores} = data;
  const hacking = computerCores?.[0];
  if (!hacking) return <div>No Computer Core</div>;
  return (
    <div className="core-hacking">
      <div>
        <label>
          <Input
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              position: "relative",
            }}
            type="checkbox"
            checked={hacking.hackingActive || false}
            disabled={!hacking.activeHackingPreset}
            onChange={e =>
              hacking.id &&
              (e.target.checked
                ? activate({variables: {id: hacking.id}})
                : deactivate({variables: {id: hacking.id}}))
            }
          />
          Hacking Active
        </label>
      </div>
      <p>Hacking Preset: </p>
      <Input
        bsSize="sm"
        type="select"
        value={hacking.activeHackingPreset?.id || "nothing"}
        onChange={evt =>
          hacking.id &&
          setPreset({variables: {id: hacking.id, presetId: evt.target.value}})
        }
      >
        <option value="nothing">Choose a preset.</option>
        {presetsData?.hackingPresets.map(l => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </Input>
      <div>
        <p>Port Scan</p>
        <OutputField alert={hacking.hackingState === "scanning"}>
          Freq:{" "}
          {Math.round(
            (hacking.hackingPortScanFrequency || 0.5) * 37700 + 37700,
          ) / 100}{" "}
          MHz
        </OutputField>
        <Button
          size="sm"
          color="danger"
          onClick={() =>
            hacking.id &&
            allowHacking({variables: {id: hacking.id, state: "idle"}})
          }
          disabled={hacking.hackingState !== "scanning"}
        >
          Reject
        </Button>
        <Button
          size="sm"
          color="success"
          onClick={() =>
            hacking.id &&
            allowHacking({variables: {id: hacking.id, state: "hacking"}})
          }
          disabled={hacking.hackingState !== "scanning"}
        >
          Accept
        </Button>
      </div>
      <p>
        <strong>Hacking Log</strong>
      </p>
      <div style={{flex: 1, minHeight: "100px", overflowY: "auto"}}>
        {hacking.hackingLog.map((l, i) => (
          <p key={`log-${i}`}>{l}</p>
        ))}
      </div>
    </div>
  );
};
export default HackingCore;
