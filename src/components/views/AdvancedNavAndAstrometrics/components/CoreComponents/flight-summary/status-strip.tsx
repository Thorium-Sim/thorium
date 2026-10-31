import React from "react";
import {EngineStatus} from "../../../types";
import "./flight-summary.scss";

const STATUS_CLASS: Record<string, string> = {
  [EngineStatus.STOPPED]: "status-stopped",
  [EngineStatus.STARTUP]: "status-startup",
  [EngineStatus.ENGAGED]: "status-engaged",
  [EngineStatus.FULL_POWER]: "status-full-power",
  [EngineStatus.FLUX]: "status-flux",
};

export const StatusStrip: React.FC<{
  engineStatus: EngineStatus;
  flightSetName?: string;
  awaitingApproval?: boolean;
}> = ({engineStatus, flightSetName, awaitingApproval, children}) => (
  <div className="core-adv-nav-status">
    <span className={`core-adv-nav-pill ${STATUS_CLASS[engineStatus] || ""}`}>
      {engineStatus}
    </span>
    {awaitingApproval && (
      <span className="core-adv-nav-pill status-awaiting">
        Awaiting approval
      </span>
    )}
    <span className="core-adv-nav-flightset" title={flightSetName}>
      {flightSetName}
    </span>
    {children}
  </div>
);
