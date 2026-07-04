import React from "react";

interface LogEntry {
  id: string;
  timestamp: string;
  type: string;
  contents: string;
}

interface ActivityLogProps {
  entries: LogEntry[];
}

// Crew-facing record of moments where the swarm made a difference — damage
// absorbed, repairs completed, signals amplified — color-coded by entry type.
const ActivityLog: React.FC<ActivityLogProps> = ({entries}) => (
  <div className="aegis-log">
    <h5>Swarm Activity Log</h5>
    <div className="aegis-log-entries">
      {entries.length === 0 && (
        <p className="aegis-log-empty">No recorded activity.</p>
      )}
      {entries.map(entry => (
        <div key={entry.id} className={`aegis-log-entry log-${entry.type}`}>
          <span className="log-time">
            {new Date(entry.timestamp).toLocaleTimeString()}
          </span>{" "}
          {entry.contents}
        </div>
      ))}
    </div>
  </div>
);

export default ActivityLog;
