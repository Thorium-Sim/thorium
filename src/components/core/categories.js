import { Cores } from "../views";

const categories = [
  {
    name: "Generic",
    components: [
      "ActionsCore",
      "ExtrasCore",
      "RemoteCore",
      "MessagingCore",
      "ClientsCore"
    ],
    style: {
      gridTemplateRows: "100px 400px",
      gridTemplateColumns: "400px 400px 400px",
      gridTemplateAreas: `"ActionsCore ExtrasCore RemoteCore"
"MessagingCore ClientsCore ClientsCore"`
    }
  },
  {
    name: "Ship",
    components: [
      "ShipCore",
      "CargoCore",
      "CrewCore",
      "ArmoryCore",
      "HeatCore",
      "SelfDestructCore",
      "ObjectivesCore"
    ],
    style: {
      gridTemplateRows: "200px 200px 400px",
      gridTemplateColumns: "400px 400px 400px",
      gridTemplateAreas: `"CrewCore CrewCore SelfDestructCore" "HeatCore ObjectivesCore CargoCore" "ShipCore ObjectivesCore CargoCore"`
    }
  },
  {
    name: "Flight",
    components: [
      "EngineControlCore",
      "ThrusterCore",
      "NavigationCore",
      "DockingCore"
    ],
    style: {
      gridTemplateRows: "150px 125px 125px",
      gridTemplateColumns: "300px 300px",
      gridTemplateAreas: `"NavigationCore ThrusterCore"
"EngineControlCore DockingCore" "nothing nothing"`
    }
  },
  {
    name: "Weapons",
    components: [
      "TargetingCore",
      "PhaserCore",
      "TorpedoCore",
      "ShieldControlCore"
    ],
    style: {
      gridTemplateRows: "200px 200px",
      gridTemplateColumns: "400px 400px 400px",
      gridTemplateAreas: `"TargetingCore PhaserCore ShieldControlCore" "TargetingCore TorpedoCore ShieldControlCore"`
    }
  },
  {
    name: "Damage",
    components: ["SystemsCore", "DamageReportsCore", "DamageTeamsCore"],
    style: {
      gridTemplateRows: "400px 400px",
      gridTemplateColumns: "400px 400px 400px",
      gridTemplateAreas: `"SystemsCore DamageTeamsCore DamageTeamsCore" "SystemsCore DamageReportsCore DamageReportsCore"`
    }
  },
  {
    name: "Sensors",
    components: [
      "SensorsGridCore",
      "SensorsCore",
      "ProbeControlCore",
      "ProbeNetworkCore"
    ],
    style: {
      gridTemplateRows: "300px 200px",
      gridTemplateColumns: "600px 400px 400px",
      gridTemplateAreas: `"SensorsGridCore SensorsCore SensorsCore" "SensorsGridCore ProbeControlCore ProbeNetworkCore"`
    }
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
    ],
    style: {
      gridTemplateRows: "150px 100px 100px 100px 200px",
      gridTemplateColumns: "400px 400px 400px",
      gridTemplateAreas: `"CommShortRangeCore DecodingCore LRCommCore"
      "CommShortRangeCore DecodingCore LRCommCore"
      "InternalCommCore CodeCyphersCore ShortRangeSignalsCore"
      "InterceptionCore CodeCyphersCore ShortRangeSignalsCore"
      "SignalJammerCore Nothing ShortRangeSignalsCore"`
    }
  },
  {
    name: "Engineer",
    components: ["ReactorControlCore", "ExocompsCore"],
    style: {
      gridTemplateRows: "200px",
      gridTemplateColumns: "400px 400px",
      gridTemplateAreas: `"ReactorControlCore ExocompsCore"`
    }
  },
  {
    name: "Security",
    components: ["SecurityDecksCore", "SecurityTeamsCore", "CrewCore"],
    style: {
      gridTemplateRows: "200px 200px",
      gridTemplateColumns: "400px 400px 400px",
      gridTemplateAreas: `"CrewCore CrewCore SecurityDecksCore" "SecurityTeamsCore SecurityTeamsCore SecurityDecksCore"`
    }
  },
  {
    name: "Operations",
    components: [
      "TransporterCore",
      "StealthFieldCore",
      "TractorBeamCore",
      "ShuttlesCore",
      "ComputerCoreCore"
    ],
    style: {
      gridTemplateRows: "200px 200px",
      gridTemplateColumns: "400px 400px 400px",
      gridTemplateAreas: `"TransporterCore StealthFieldCore ComputerCoreCore" "TractorBeamCore ShuttlesCore ComputerCoreCore"`
    }
  },
  {
    name: "Medical",
    components: ["MedicalTeamsCore", "SickbayCore", "DecontaminationCore"],
    style: {
      gridTemplateRows: "200px 200px",
      gridTemplateColumns: "400px 400px 400px",
      gridTemplateAreas: `"MedicalTeamsCore SickbayCore SickbayCore" "MedicalTeamsCore DecontaminationCore DecontaminationCore"`
    }
  }
];

const comps = categories.reduce(
  (prev, next) => prev.concat(next.components),
  []
);

const other = {
  name: "Other",
  components: Object.keys(Cores).filter(c => comps.indexOf(c) === -1)
};

export default categories.concat(other);
