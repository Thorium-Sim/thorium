import React from "react";
import {
  Simulator,
  Aegis_Mode,
  useAegisSubscription,
  useAegisSetModeMutation,
  useAegisRecallMutation,
  useAegisPauseFabricationMutation,
  useAegisSetAttritionMutation,
  useAegisDestroyDroneMutation,
  useAegisSetDroneCountMutation,
  useAegisSetStructuralIntegrityMutation,
  useAegisHitStructureMutation,
  useAegisClearLogMutation,
} from "generated/graphql";
import {Button, Input} from "reactstrap";
import {InputField} from "components/generic/core";
import "./style.scss";

interface AegisCoreProps {
  children: React.ReactNode;
  simulator: Simulator;
}

function describeCrewSetting(aegis: {
  mode: Aegis_Mode;
  screenFocusX: number;
  screenFocusY: number;
  ecmIntensity: number;
  relayTarget: string;
  repairEffort: number;
}) {
  switch (aegis.mode) {
    case Aegis_Mode.Screen: {
      const magnitude = Math.min(
        1,
        Math.hypot(aegis.screenFocusX, aegis.screenFocusY),
      );
      if (magnitude < 0.05) {
        return "Focus: even coverage";
      }
      const bearing =
        (Math.round(
          (Math.atan2(aegis.screenFocusX, -aegis.screenFocusY) * 180) / Math.PI,
        ) +
          360) %
        360;
      return `Focus: ${bearing}° at ${Math.round(magnitude * 100)}%`;
    }
    case Aegis_Mode.Ecm:
      return `Jamming: ${Math.round(aegis.ecmIntensity * 100)}%`;
    case Aegis_Mode.Relay:
      return `Boosting: ${aegis.relayTarget}`;
    case Aegis_Mode.Repair:
      return `Effort: ${Math.round(aegis.repairEffort * 100)}%`;
    default:
      return "";
  }
}

const AegisCore: React.FC<AegisCoreProps> = props => {
  const {simulator} = props;
  const {loading, data} = useAegisSubscription({
    variables: {simulatorId: simulator.id},
  });
  const [setMode] = useAegisSetModeMutation();
  const [recall] = useAegisRecallMutation();
  const [pauseFabrication] = useAegisPauseFabricationMutation();
  const [setAttrition] = useAegisSetAttritionMutation();
  const [destroyDrone] = useAegisDestroyDroneMutation();
  const [setDroneCount] = useAegisSetDroneCountMutation();
  const [setIntegrity] = useAegisSetStructuralIntegrityMutation();
  const [hitStructure] = useAegisHitStructureMutation();
  const [clearLog] = useAegisClearLogMutation();

  if (loading || !data) {
    return null;
  }
  const {aegisUpdate: aegis} = data;
  if (!aegis) {
    return <div>No Aegis System</div>;
  }

  return (
    <div className="core-aegis">
      <div className="core-aegis-row">
        <span>Drones:</span>
        <InputField
          prompt={`How many drones? (0 - ${aegis.maxDrones})`}
          onClick={(value: string | number) => {
            setDroneCount({
              variables: {id: aegis.id, count: parseInt(`${value}`, 10) || 0},
            });
          }}
        >
          {aegis.droneCount} / {aegis.maxDrones}
        </InputField>
      </div>
      <div className="core-aegis-row">
        <span>Status:</span>
        <span className={aegis.deployed ? "text-success" : "text-info"}>
          {aegis.deployed ? "Deployed" : "Docked"}
        </span>
      </div>
      <div className="core-aegis-row">
        <span>Mode:</span>
        <Input
          type="select"
          bsSize="sm"
          value={aegis.mode}
          onChange={e =>
            setMode({
              variables: {id: aegis.id, mode: e.target.value as Aegis_Mode},
            })
          }
        >
          <option value={Aegis_Mode.Screen}>Defensive Screen</option>
          <option value={Aegis_Mode.Ecm}>Interference</option>
          <option value={Aegis_Mode.Relay}>Sensor Relay</option>
          <option value={Aegis_Mode.Repair}>Repair Swarm</option>
        </Input>
      </div>
      <div className="core-aegis-row">
        <span>Fabrication:</span>
        <span>
          {aegis.fabricating && !aegis.fabricationPaused
            ? `${Math.round(aegis.fabricationProgress * 100)}%`
            : aegis.fabricationPaused
            ? "Paused"
            : "Idle"}
        </span>
      </div>
      <div className="core-aegis-row">
        <span>Crew setting:</span>
        <span className="text-info">{describeCrewSetting(aegis)}</span>
      </div>
      <div className="core-aegis-row">
        <span>Integrity:</span>
        <InputField
          prompt="Set structural integrity (0 - 100)"
          alert={aegis.structuralIntegrity <= 0.33}
          onClick={(value: string | number) => {
            setIntegrity({
              variables: {
                id: aegis.id,
                integrity: (parseInt(`${value}`, 10) || 0) / 100,
              },
            });
          }}
        >
          {Math.round(aegis.structuralIntegrity * 100)}%
        </InputField>
        <Button
          size="sm"
          color="success"
          onClick={() =>
            setIntegrity({variables: {id: aegis.id, integrity: 1}})
          }
        >
          Restore
        </Button>
      </div>
      <Button
        size="sm"
        block
        color="danger"
        onClick={() => hitStructure({variables: {id: aegis.id}})}
      >
        Hit Structure
      </Button>
      <Button
        size="sm"
        block
        color="danger"
        disabled={aegis.droneCount === 0}
        onClick={() => destroyDrone({variables: {id: aegis.id}})}
      >
        Destroy Drone
      </Button>
      <Button
        size="sm"
        block
        color="warning"
        onClick={() =>
          pauseFabrication({
            variables: {id: aegis.id, paused: !aegis.fabricationPaused},
          })
        }
      >
        {aegis.fabricationPaused ? "Resume Fabrication" : "Pause Fabrication"}
      </Button>
      <Button
        size="sm"
        block
        color="info"
        disabled={!aegis.deployed}
        onClick={() => recall({variables: {id: aegis.id}})}
      >
        Force Recall
      </Button>
      <label className="core-aegis-attrition">
        <input
          type="checkbox"
          checked={aegis.attritionEnabled}
          onChange={e =>
            setAttrition({
              variables: {id: aegis.id, enabled: e.target.checked},
            })
          }
        />{" "}
        Attrition
      </label>
      <div className="core-aegis-log">
        <div className="core-aegis-row">
          <span>Log:</span>
          <Button
            size="sm"
            color="secondary"
            disabled={aegis.log.length === 0}
            onClick={() => clearLog({variables: {id: aegis.id}})}
          >
            Clear
          </Button>
        </div>
        <div className="core-aegis-log-entries">
          {aegis.log.slice(0, 8).map(entry => (
            <p key={entry.id} title={entry.contents}>
              {entry.contents}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AegisCore;
