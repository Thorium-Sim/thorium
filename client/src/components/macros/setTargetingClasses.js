import React from "react";
import uuid from "uuid";
import CoreTargets from "../views/Targeting/coreTargets";

const SetTargetingClasses = ({ updateArgs = () => {}, args = {} }) => {
  const targeting = {
    classes: args.classInput || [],
    id: "targeting",
    contacts: []
  };
  return (
    <div style={{ backgroundColor: "black" }}>
      <CoreTargets
        targeting={targeting}
        macro
        removeClass={id =>
          updateArgs("classInput", args.classInput.filter(c => c.id !== id))
        }
        updateClass={(id, key, value) => {
          updateArgs(
            "classInput",
            args.classInput.map(c => {
              if (c.id === id) {
                return { ...c, [key]: value };
              }
              return c;
            })
          );
        }}
        addTargetClass={() => {
          updateArgs("classInput", [
            ...(args.classInput || []),
            {
              id: uuid.v4(),
              icon: "/Sensor Contacts/Icons/Default.svg",
              moving: true,
              name: "Target",
              picture: "/Sensor Contacts/Pictures/Default.png"
            }
          ]);
        }}
      />
    </div>
  );
};
export default SetTargetingClasses;
