import { Cores } from "components/views";

const categories = [
  {
    name: "Generic",
    components: [
      "ActionsCore",
      "ExtrasCore",
      "RemoteCore",
      "NewMessagingCore",
      "LoginNameCore",
      "CoreFeed"
    ],
    style: {
      gridTemplateRows: "100px 400px",
      gridTemplateColumns: "300px 300px 300px 300px",
      gridTemplateAreas: `"ActionsCore ExtrasCore RemoteCore CoreFeed"
"NewMessagingCore LoginNameCore LoginNameCore CoreFeed"`
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
      "ObjectivesCore",
      "AlertConditionCore"
    ],
    style: {
      gridTemplateRows: "200px 200px 400px",
      gridTemplateColumns: "400px 400px 400px",
      gridTemplateAreas: `"CrewCore CrewCore SelfDestructCore" "HeatCore ArmoryCore CargoCore" "ShipCore ObjectivesCore AlertConditionCore"`
    }
  },
  {
    name: "Flight",
    components: [
      "EngineControlCore",
      "ThrusterCore",
      "NavigationCore",
      "DockingCore",
      "SubspaceFieldCore",
      "TranswarpCore",
      "JumpDriveCore"
    ],
    style: {
      gridTemplateRows: "150px 125px 125px",
      gridTemplateColumns: "300px 300px 300px",
      gridTemplateAreas: `"NavigationCore ThrusterCore JumpDriveCore"
"EngineControlCore DockingCore JumpDriveCore" "SubspaceFieldCore TranswarpCore nothing"`
    }
  },
  {
    name: "Weapons",
    components: [
      "TargetingCore",
      "PhaserCore",
      "TorpedoCore",
      "RailgunCore",
      "BattleCore",
      "ShieldControlCore",
      "ThxCore",
      "CrmCore"
    ],
    style: {
      gridTemplateRows: "300px 100px 200px",
      gridTemplateColumns: "400px 400px 400px",
      gridTemplateAreas: `"TargetingCore TorpedoCore ShieldControlCore" "RailgunCore PhaserCore BattleCore" "ThxCore CrmCore BattleCore"`
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
      "ProbeNetworkCore",
      "AlternateSensorsCore"
    ],
    style: {
      gridTemplateRows: "300px 200px 300px",
      gridTemplateColumns: "600px 400px 400px",
      gridTemplateAreas: `"SensorsGridCore SensorsCore SensorsCore" "SensorsGridCore ProbeControlCore ProbeNetworkCore" "AlternateSensorsCore nothing nothing"`
    }
  },
  {
    name: "Comm",
    components: [
      "CommConvoCore",
      "CommShortRangeCore",
      "InternalCommCore",
      "SignalJammerCore",
      "CodeCyphersCore",
      "InterceptionCore",
      "ShortRangeSignalsCore"
    ],
    style: {
      gridTemplateRows: "150px 100px 100px 100px 200px",
      gridTemplateColumns: "400px 400px 400px",
      gridTemplateAreas: `"CommShortRangeCore CommConvoCore CodeCyphersCore"
      "CommShortRangeCore CommConvoCore CodeCyphersCore"
      "InternalCommCore CommConvoCore ShortRangeSignalsCore"
      "InterceptionCore CommConvoCore ShortRangeSignalsCore"
      "SignalJammerCore Nothing ShortRangeSignalsCore"`
    }
  },
  {
    name: "Engineer",
    components: [
      "ReactorControlCore",
      "ExocompsCore",
      "DockingPortCore",
      "SpecializedDockingCore",
      "CommandLineCore"
    ],
    style: {
      gridTemplateRows: "400px 300px",
      gridTemplateColumns: "400px 400px 400px",
      gridTemplateAreas: `"ReactorControlCore ExocompsCore DockingPortCore" "SpecializedDockingCore CommandLineCore nothing"`
    }
  },
  {
    name: "Security",
    components: [
      "SecurityDecksCore",
      "SecurityTeamsCore",
      "CrewCore",
      "RoomSearchCore"
    ],
    style: {
      gridTemplateRows: "300px 300px 200px",
      gridTemplateColumns: "400px 400px 400px",
      gridTemplateAreas: `"CrewCore CrewCore SecurityDecksCore RoomSearchCore" "SecurityTeamsCore SecurityTeamsCore SecurityDecksCore RoomSearchCore"`
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

const filterList = [
  "MessagingCore",
  "DecodingCore",
  "LRCommCore",
  "JrNavigationCore",
  "ReactivationCore",
  "TimelineCore",
  "TimelineThumbnailCore",
  "CardsCore",
  "HandheldScannerCore",
  "AssetsCore",
  "KeypadCore",
  "ClientsCore",
  "HypercardCore"
];
const other = {
  name: "Other",
  style: {
    gridTemplateRows: "40% 40%",
    gridTemplateColumns: "20% 20% 20% 20% 20%"
  },
  components: Object.keys(Cores)
    .filter(c => comps.indexOf(c) === -1)
    .filter(c => filterList.indexOf(c) === -1)
};

export default categories.concat(other);
