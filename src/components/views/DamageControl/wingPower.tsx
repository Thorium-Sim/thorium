import React from "react";
import SystemRow from "./systemRow";
import {capitalCase} from "change-case";
import {OutputField, InputField} from "components/generic/core";
import {
  Reactor,
  System,
  useReactorSetWingPowerMutation,
} from "generated/graphql";

const WingPower: React.FC<{
  wing: "left" | "right";
  value: System[];
  reactor: Reactor & {[key: string]: number};
  fluxPower: (id: string) => void;
  simulatorId: string;
  toggleDamage: (e: React.MouseEvent, s: System) => void;
  setContext: (e: React.MouseEvent, s: System) => void;
  wingedSystems: {
    left: System[];
    right: System[];
    leftPower: number;
    rightPower: number;
    [key: string]: number | System[];
  };
}> = ({
  wing,
  value,
  reactor,
  fluxPower,
  simulatorId,
  toggleDamage,
  setContext,
  wingedSystems,
}) => {
  const [setWingPower] = useReactorSetWingPowerMutation();
  return (
    <React.Fragment>
      <tr>
        <th colSpan={6}>{capitalCase(wing)} Wing</th>
      </tr>
      {value.map(s => (
        <SystemRow
          key={s.id || ""}
          simulatorId={simulatorId}
          fluxPower={fluxPower}
          toggleDamage={toggleDamage}
          s={s}
          setContext={setContext}
        />
      ))}
      <tr>
        <td>{capitalCase(wing)} Wing Power</td>
        <td>
          <OutputField
            alert={wingedSystems[`${wing}Power`] > reactor[`${wing}WingPower`]}
          >
            {wingedSystems[`${wing}Power`]}
          </OutputField>
        </td>
        <td>/</td>
        <td>
          <InputField
            title={`${capitalCase(wing)} Wing Power Level`}
            prompt="What is the new power output?"
            onClick={value =>
              setWingPower({
                variables: {
                  id: reactor.id,
                  wing: wing,
                  power: parseInt(String(value), 10),
                },
              })
            }
          >
            {reactor[`${wing}WingPower`]}
          </InputField>
        </td>
        <td></td>
        <td />
      </tr>
    </React.Fragment>
  );
};
export default WingPower;
