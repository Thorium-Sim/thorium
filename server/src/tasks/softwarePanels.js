import reportReplace from "../helpers/reportReplacer";
import App from "../app";
import { randomFromList } from "../classes/generic/damageReports/constants";
import { Probes } from "../classes";

const allowedComponents = {
  CableInput: ["Connect a #COLOR cable from #LABEL to #CABLE2."],
  ToggleSwitch: ["Set #LABEL to the #UPDOWN position."],
  ThreeWaySwitch: ["Set #LABEL to the #UPCENTER position."],
  Checkbox: ["Set #LABEL to #CHECKED."],
  //Rotor: ["Set rotor #LABEL to the #ROTOR position."],
  PushButton: [
    "Press button #LABEL #INT times.",
    "Hold down button #LABEL for #INT seconds"
  ]
};

export default [
  {
    name: "Panel Actions",
    class: "Panels",
    active({ simulator }) {
      return simulator && simulator.panels.length > 0;
    },
    stations({ simulator }) {
      return [];
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "Panel maintenance must be performed."
      },
      panel: {
        input: ({ simulator }) =>
          simulator
            ? simulator.panels.map(p => {
                const panel = App.softwarePanels.find(pp => (pp.id = p));
                return { label: panel.name, value: panel.id };
              })
            : App.softwarePanels.map(panel => ({
                label: panel.name,
                value: panel.id
              })),
        value: ({ simulator }) =>
          randomFromList(
            simulator ? simulator.panels : App.softwarePanels.map(p => p.id)
          )
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, panel },
      task = {}
    }) {
      const panelObj = App.softwarePanels.find(p => p.id === panel);
      const components = panelObj.components.filter(
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
          return randomFromList(allowedComponents[c.component])
            .replace("#LABEL", c.label)
            .replace(
              "#COLOR",
              randomFromList(["red", "yellow", "green", "blue"])
            )
            .replace("#UPDOWN", randomFromList(["Up", "Down"]))
            .replace("#UPCENTER", randomFromList(["Up", "Down", "Center"]))
            .replace("#CHECKED", randomFromList(["Checked", "Unchecked"]))
            .replace("#INT", Math.round(Math.random() * 7 + 2))
            .replace(
              "#CABLE2",
              randomFromList(
                panelObj.components
                  .filter(d => d.label && d.component === "CableOutput")
                  .map(d => d.label)
              )
            );
        })
        .join("\n");

      return reportReplace(
        `${preamble} Go to the ${
          panelObj.name
        } panel and perform the following operations:
        
${messages}`,
        { simulator }
      );
    },
    verify({ simulator, requiredValues }) {
      // I'm not going to check this. Too complicated.
      return false;
    }
  }
];
