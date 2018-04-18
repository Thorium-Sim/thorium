import App from "../../../../app";
import { randomFromList } from "../constants";
const allowedComponents = {
  CableInput: ["Connect a #COLOR cable from #LABEL to #CABLE2."],
  ToggleSwitch: ["Set switch #LABEL to the #UPDOWN position."],
  ThreeWaySwitch: ["Set switch #LABEL to the #UPCENTER position."],
  Checkbox: ["Set checkbox #LABEL to #CHECKED."],
  //Rotor: ["Set rotor #LABEL to the #ROTOR position."],
  PushButton: [
    "Press button #LABEL #INT times.",
    "Hold down button #LABEL for #INT seconds"
  ]
};

// Get a random panel
// Filter all of the components on the panel based on if it has a label and if it is allowed
// Get a random component from that list
// Get one of the available messages for that component
// Parse the message to for random values,
// such as a cable to plug into or the position a switch should be in

export default ({ preamble }, { name, displayName = name, simulatorId }) => {
  const panels = App.softwarePanels.filter(s => s.simulatorId === simulatorId);
  const panel = randomFromList(panels);
  const components = panel.components.filter(
    c => c.label && Object.keys(allowedComponents).indexOf(c.component) > -1
  );
  if (components.length === 0) return "";
  const count = Math.round(Math.random() * 3) + 2;
  const comps = [];
  for (let i = 0; i <= count; i++) {
    comps.push(randomFromList(components));
  }
  const messages = comps
    .filter((c, i, a) => {
      return a.findIndex(d => c.label === d.label) === i;
    })
    .map(c => {
      return (
        randomFromList(allowedComponents[c.component])
          .replace("#LABEL", c.label)
          .replace("#COLOR", randomFromList(["red", "yellow", "green", "blue"]))
          .replace("#UPDOWN", randomFromList(["Up", "Down"]))
          .replace("#UPCENTER", randomFromList(["Up", "Down", "Center"]))
          /*.replace(
          "#ROTOR",
          randomFromList(
            "12-o'Clock",
            "8-o'Clock",
            "9-o'Clock",
            "10-o'Clock",
            "11-o'Clock",
            "1-o'Clock",
            "2-o'Clock",
            "3-o'Clock",
            "4-o'Clock"
          )
        )*/
          .replace("#CHECKED", randomFromList(["Checked", "Unchecked"]))
          .replace("#INT", Math.round(Math.random() * 7 + 2))
          .replace(
            "#CABLE2",
            randomFromList(
              panel.components
                .filter(d => d.label && d.component === "CableOutput")
                .map(d => d.label)
            )
          )
      );
    })
    .join("\n");
  console.log("Returning!", messages);
  return `${preamble ||
    `Panel maintenance must be performed to repair the ${displayName} system.`} Go to the ${
    panel.name
  } software panel and perform the following operations:
  
${messages}
`;
};
