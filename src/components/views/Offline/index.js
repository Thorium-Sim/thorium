import React from "react";
import "./style.css";
import Soviet from "./soviet";

const Offline = props => {
  // Messages go here
  const messages = {
    blackout: { title: "", message: "" },
    offline: {
      title: "Station Offline",
      message:
        "This station is offline. This may be due to power loss or station damage."
    },
    power: {
      title: "Power Loss",
      message:
        "This station has insufficient power to operate. Please contact your chief engineer."
    },
    lockdown: {
      title: "Lockdown",
      message:
        "This station has been locked down by the central computer. No access permitted."
    },
    maintenance: {
      title: "Maintenance",
      message:
        "This station is down for maintenance. Please contact your system administrator for more information."
    }
  };
  const message = props.message || messages[props.clientObj.offlineState] || {};
  if (props.clientObj.offlineState === "soviet") return <Soviet />;
  return (
    <div>
      {props.clientObj.offlineState === "blackout" && (
        <div className="blackout-back" />
      )}
      <p className="offline-title">{message.title}</p>
      <p className="offline-message">{message.message}</p>
    </div>
  );
};

export default Offline;
