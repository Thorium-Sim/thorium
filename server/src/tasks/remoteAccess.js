import reportReplace from "../helpers/reportReplacer";
import App from "../app";
import { randomCode } from "../classes/generic/damageReports/constants";

export default [
  {
    name: "Send Remote Access Code",
    class: "Remote Access",
    active({ simulator }) {
      return (
        simulator &&
        simulator.stations.find(s => s.widgets.indexOf("remote") > -1)
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s => s.widgets.indexOf("remote") > -1)
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A remote access code needs to be sent."
      },
      code: {
        input: () => "text",
        value: () => randomCode()
      },
      backup: {
        input: () => ({ type: "text", placeholder: "Optional" }),
        value: () => randomCode()
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, code, backup },
      task = {}
    }) {
      const station =
        simulator &&
        simulator.stations.find(s => s.widgets.indexOf("remote") > -1);
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Use the remote access widget to send the following remote access code: ${code}${backup &&
            `

If the code is rejected, send a backup remote access code: ${backup}`}`,
          { simulator }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of remote access codes"
        } to use the remote access widget to send the following remote access code: ${code}${backup &&
          `

If the code is rejected, have them send a backup remote access code: ${backup}`}`,
        { simulator }
      );
    },
    verify({ simulator, requiredValues }) {
      const code = simulator.ship.remoteAccessCodes.find(
        c =>
          c.state === "sent" &&
          (c.code === requiredValues.code || c.code === requiredValues.backup)
      );
      if (code) {
        // Automatically accept the code.
        App.handleEvent(
          { simulatorId: simulator.id, codeId: code.id, state: "Accepted" },
          "remoteAccessUpdateCode"
        );
        return true;
      }
    }
  }
];
