import React from "react";

function randomFromList(list) {
  if (!list) return;
  const length = list.length;
  const index = Math.floor(Math.random() * length);
  return list[index];
}

const ScanPresets = ({onChange = v => {}, domain, ...props}) => {
  const handleChange = React.useCallback(
    evt => {
      let dataField = evt.target.value;
      if (dataField === "omnicourse") {
        dataField = `Course Calculated:
      X: ${Math.round(Math.random() * 100000) / 100}
      Y: ${Math.round(Math.random() * 100000) / 100}
      Z: ${Math.round(Math.random() * 100000) / 100}`;
      }
      if (dataField === "weakness") {
        dataField = `Fault in ${randomFromList([
          "engines",
          "shields",
          "weapons",
          "hull",
          "sensors",
          "communications",
          "tractor beam",
        ])} detected.`;
      }
      if (dataField === "thrusterdodge") {
        dataField = `Incoming weapons detected. Recommend firing ${randomFromList(
          ["port", "starboard", "forward", "reverse", "up", "down"],
        )} thrusters to dodge.`;
      }
      onChange(dataField);
    },
    [onChange],
  );
  React.useEffect(() => {
    const keypress = evt => {
      if (evt.altKey) {
        evt.preventDefault();
        const index = parseInt(evt.code.substr(-1, 1), 10);
        if (!isNaN(index)) {
          const data =
            index === 0
              ? getPresetOptions(domain)[10]
              : getPresetOptions(domain)[index - 1];
          handleChange({target: {value: data.value}});
        }
      }
    };
    document.addEventListener("keydown", keypress);
    return () => document.removeEventListener("keydown", keypress);
  }, [domain, handleChange]);

  return (
    <select value={"answers"} onChange={handleChange} {...props}>
      <option value={"answers"} disabled>
        Answers
      </option>
      {getPresetOptions(domain).map(p => (
        <option key={p.label} value={p.value}>
          {p.label}
        </option>
      ))}
    </select>
  );
};
export default ScanPresets;

const getPresetOptions = which =>
  [
    {label: "None detected.", value: "None detected."},
    {
      label: "Specify",
      value: "Please specify what you wish to scan for.",
    },
    {
      label: "Does not compute",
      value: "The scan does not compute - Please restate or rephrase.",
    },
    {
      label: "Unknown",
      value: "Request is unknown or ambiguous. Please restate or clarify.",
    },
    {
      label: "Omni course",
      value: "omnicourse",
    },

    {
      label: "Eta",
      value:
        "At current speed this vessel will reach its destination in **minutes, **seconds.",
    },
    {
      label: "Destination",
      value: "Now approaching destination. Recommend slowing to Full Stop.",
    },
    {label: "Detected.", value: "Detected."},
    {
      label: "None in range",
      value: "None detected within sensor range.",
    },
    {
      label: "External sensors offline",
      value: "Unable to complete scan. External sensors are offline.",
    },
    {label: "Invalid", value: "Invalid search query."},
    {
      label: "No probe",
      value: "Unable to complete scan.  No probe has been launched.",
    },
    {
      label: "Ship not in range",
      value: "Unable to complete scan. Ship is not within range.",
    },
    {
      label: "Radiation interference",
      value: "Radiation is interfering with sensors.  Unable to complete scan.",
    },
    {
      label: "Scanning...",
      value: "Scanning... Results will be displayed on the main view screen.",
    },
    {
      label: "Sensors damaged",
      value: "Sensor systems have been damaged.  Unable to complete scan.",
    },
    {
      label: "Which contact.",
      value: "Please specify which contact you wish to scan.",
    },
    {
      label: "Thruster Dodge",
      value: "thrusterdodge",
    },
    {
      label: "Undocking Instructions",
      value:
        "This vessel is currently docked. The Boarding Ramps and the Docking Clamps must be retracted before the Thrusters can be used to undock.",
    },
    {
      label: "Undocking Completed",
      value:
        "This vessel has successfully undocked. It is recommended to calculate a course to our destination.",
    },
    {
      label: "Asteroids",
      value:
        "Asteroids detected in the area. It is recommended that Thrusters be used to dodge asteroids. The weapon systems can be used to destroy incoming projectiles before impact.",
    },
    {
      label: "On Course",
      value: "Now on course ",
    },
    {
      label: "Weakness",
      value: "weakness",
    },
    which && {
      label: `Use ${which === "internal" ? "External" : "Internal"}`,
      value: `Unable to complete scan. Recommend using ${
        which === "internal" ? "External" : "Internal"
      } Sensors.`,
    },
  ].filter(Boolean);
