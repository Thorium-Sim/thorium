import React from "react";
import {CountermeasureSlot, Countermeasure} from "generated/graphql";
import {ReactComponent as CenterSVG} from "./countermeasure-center.svg";

interface CenterProps {
  setSlot: (nextState: string) => void;
  slot: (Countermeasure & {slotId: string}) | null;
  slots: CountermeasureSlot;
}
const Center: React.FC<CenterProps> = ({slots, slot, setSlot}) => {
  return (
    <div className="inner-center">
      {Object.entries(slots)
        .filter(([key]) => key !== "__typename")
        .map(([key, value]) => {
          if (typeof value === "string") return null;
          return (
            <div
              key={key}
              className={`slot ${key} ${value?.id ? "exists" : ""} ${
                slot?.slotId === key ? "selected" : ""
              } ${value?.locked ? "locked" : ""} ${
                value?.building ? "building" : ""
              } ${value?.active ? "active" : ""}`}
              style={{
                ["--end-angle" as any]: value?.building
                  ? `${(value.buildPercentage || 0) * 100}%`
                  : "0%",
              }}
              onClick={() => setSlot(key)}
            ></div>
          );
        })}
      <CenterSVG />
    </div>
  );
};

export default Center;
