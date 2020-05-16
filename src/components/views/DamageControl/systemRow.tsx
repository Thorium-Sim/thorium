import React from "react";
import {
  System,
  useSystemsCoreEnginesQuery,
  useSystemChangePowerMutation,
  useSystemUpgradeMutation,
} from "generated/graphql";
import {InputField, OutputField} from "components/generic/core";
import {Button} from "reactstrap";

function useEngineSpeed(system: System, simulatorId: string) {
  const {data} = useSystemsCoreEnginesQuery({
    variables: {simulatorId},
    skip: system.type !== "Engine",
  });
  if (system.type !== "Engine") return null;
  const engine = data?.engines?.find(e => e?.id === system.id);
  if (!engine) return null;
  const speedIndex =
    (system?.power?.powerLevels?.filter(
      p => p && system?.power?.power && p <= system?.power?.power,
    ).length || 0) - 1;
  const maxSpeed = engine?.speeds?.[speedIndex]
    ? engine?.speeds?.[speedIndex]?.number
    : 0;
  return `(${maxSpeed})`;
}
function systemTitle(sys: System) {
  if (sys?.damage?.taskReportDamage) {
    return "Task Report Damage";
  }
  if (sys?.damage?.destroyed) {
    return "Destroyed";
  }
  if (sys?.damage?.which === "engineering") {
    return "Engineering";
  }
  if (sys?.damage?.which === "rnd") {
    return "Research & Development";
  }
  if (sys?.damage?.damaged) {
    return "Damaged";
  }
  // Overloaded the power levels
  const powerLevelsIndex = (sys?.power?.powerLevels?.length || 0) - 1;
  if (
    (sys?.power?.powerLevels?.[powerLevelsIndex] || 0) <
    (sys?.power?.power || 0)
  ) {
    return "Overloaded Power";
  }
  if (
    sys.power &&
    sys.power.powerLevels &&
    sys.power.powerLevels.length > 0 &&
    !sys.power.powerLevels.find(
      p => p && sys?.power?.power && p <= sys.power.power,
    )
  ) {
    return "Insufficient Power";
  }
}

function systemStyle(sys: System) {
  const obj: {
    listStyle: string;
    cursor: string;
    color?: string;
    textShadow?: string;
  } = {
    listStyle: "none",
    cursor: "pointer",
  };
  if (
    sys.power &&
    sys.power.powerLevels &&
    sys.power.powerLevels.length > 0 &&
    !sys.power.powerLevels.find(
      p => p && sys?.power?.power && p <= sys.power.power,
    )
  ) {
    obj.color = "#888";
  }
  // Overloaded the power levels
  const powerLevelsIndex = (sys?.power?.powerLevels?.length || 0) - 1;
  if (
    (sys?.power?.powerLevels?.[powerLevelsIndex] || 0) <
    (sys?.power?.power || 0)
  ) {
    obj.color = "goldenrod";
  }
  if (sys?.damage?.damaged) {
    obj.color = "red";
  }
  if (sys?.damage?.taskReportDamage) {
    obj.color = "orangered";
  }
  if (!sys?.name) {
    obj.color = "purple";
  }
  if (sys?.damage?.which === "rnd") {
    obj.color = "orange";
  }
  if (sys?.damage?.which === "engineering") {
    obj.color = "rgb(0,128,255)";
  }
  if (sys?.damage?.destroyed) {
    obj.color = "black";
    obj.textShadow = "0px 0px 1px rgba(255,255,255,1)";
  }
  return obj;
}

function systemName(sys: System) {
  if (sys.type === "Shield" && sys.name !== "Shields") {
    return `${sys.name} Shields`;
  }
  return sys.displayName || sys.name;
}

const SystemRow: React.FC<{
  simulatorId: string;
  fluxPower: (id: string) => void;
  toggleDamage: (e: React.MouseEvent, s: System) => void;
  s: System;
  setContext: (e: React.MouseEvent, s: System) => void;
}> = ({simulatorId, toggleDamage, s, setContext, fluxPower}) => {
  const [setPowerMutation] = useSystemChangePowerMutation();
  const [setUpgraded] = useSystemUpgradeMutation();

  const setPower = (system: System, power: number) => {
    if (!system.id) return;
    setPowerMutation({
      variables: {
        systemId: system.id,
        power,
      },
    });
  };
  const engineSpeed = useEngineSpeed(s, simulatorId);
  if (!s) return null;
  const hasPower =
    (s.power?.powerLevels?.length || 0) > 0 &&
    (s.power?.power || s.power?.power === 0);
  return (
    <tr>
      <td
        onClick={e => toggleDamage(e, s)}
        onContextMenu={e => setContext(e, s)}
        title={systemTitle(s)}
        style={systemStyle(s)}
      >
        {systemName(s)} {engineSpeed}{" "}
      </td>
      <td>
        {hasPower && (
          <InputField
            prompt="What is the power?"
            onClick={value => setPower(s, parseInt(String(value), 10))}
          >
            {s.power?.power}
          </InputField>
        )}
      </td>
      <td>{hasPower && "/"}</td>
      <td>
        {hasPower && <OutputField>{s.power?.powerLevels?.[0]}</OutputField>}
      </td>
      <td>
        <input
          type="checkbox"
          checked={Boolean(s.upgraded)}
          disabled={Boolean(s.upgraded)}
          onClick={() => s.id && setUpgraded({variables: {systemId: s.id}})}
        />
      </td>
      <td>
        {hasPower && (
          <Button
            size="sm"
            color="warning"
            title="Flux"
            style={{height: "15px"}}
            onClick={() => s.id && fluxPower(s.id)}
          />
        )}
      </td>
    </tr>
  );
};

export default SystemRow;
