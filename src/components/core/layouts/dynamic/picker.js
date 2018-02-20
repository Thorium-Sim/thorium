import React from "react";
import { titleCase } from "change-case";
import { Button } from "reactstrap";
import { MosaicWindowContext } from "react-mosaic-component";
const categories = [
  {
    name: "Generic",
    components: [
      "ActionsCore",
      "ExtrasCore",
      "RemoteCore",
      "MessagingCore",
      "ClientsCore"
    ]
  },
  {
    name: "Ship",
    components: [
      "ShipCore",
      "DecksCore",
      "CargoCore",
      "CrewCore",
      "HeatCore",
      "SelfDestructCore"
    ]
  },
  {
    name: "Flight",
    components: [
      "EngineControlCore",
      "ThrusterCore",
      "NavigationCore",
      "DockingCore"
    ]
  },
  {
    name: "Weapons",
    components: [
      "TargetingCore",
      "PhaserCore",
      "TorpedoCore",
      "ShieldControlCore"
    ]
  },
  {
    name: "Damage",
    components: [
      "SystemsCore",
      "DamageReportsCore",
      "DamageTeamsCore",
      "ReactivationCore"
    ]
  },
  {
    name: "Sensors",
    components: ["SensorsCore", "ProbeControlCore", "ProbeNetworkCore"]
  },
  {
    name: "Comm",
    components: [
      "CommShortRangeCore",
      "DecodingCore",
      "LRCommCore",
      "InternalCommCore",
      "SignalJammerCore",
      "CodeCyphersCore",
      "InterceptionCore",
      "ShortRangeSignalsCore"
    ]
  },
  {
    name: "Engineer",
    components: ["ReactorControlCore", "ExocompsCore"]
  },
  {
    name: "Security",
    components: ["SecurityDecksCore", "SecurityTeamsCore"]
  },
  {
    name: "Operations",
    components: [
      "TransporterCore",
      "StealthFieldCore",
      "TractorBeamCore",
      "ShuttlesCore"
    ]
  }
];

class Picker extends React.PureComponent {
  static contextTypes = MosaicWindowContext;
  context;
  update = e => {
    this.context.mosaicActions.replaceWith(
      this.context.mosaicWindowActions
        ? this.context.mosaicWindowActions.getPath()
        : [],
      e
    );
  };
  render() {
    return (
      <div className="core-picker">
        <h3>Pick a core:</h3>
        <div className="categories">
          {categories.map(c => (
            <div key={c.name} className="category">
              <strong>{c.name}</strong>
              {c.components.map(n => (
                <div key={n}>
                  <Button size="sm" onClick={() => this.update(n)}>
                    {titleCase(n.replace("Core", ""))}
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Picker;
