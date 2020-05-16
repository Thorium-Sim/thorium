import React from "react";
import {trainingSteps as MessagesTraining} from "./Messaging";

// Widget Icons
import {
  FaKeyboard,
  FaPenFancy,
  FaCalculator,
  FaListUl,
  FaRss,
  FaRegComment,
  FaRegFileAlt,
  FaRegFileCode,
  FaRegFileExcel,
  FaBook,
  FaTasks,
  FaCircleNotch,
  FaTerminal,
} from "react-icons/fa";

const LongRangeComm = React.lazy(() => import("./LongRangeComm"));
const EngineControl = React.lazy(() => import("./EngineControl"));
const Thrusters = React.lazy(() => import("./Thrusters"));
const Navigation = React.lazy(() => import("./Navigation"));
const Sensors = React.lazy(() => import("./Sensors"));
const ShieldControl = React.lazy(() => import("./ShieldControl"));
const Transporters = React.lazy(() => import("./Transporters"));
const Login = React.lazy(() => import("./Login"));
const SecurityDecks = React.lazy(() => import("./SecurityDecks"));
const SecurityScans = React.lazy(() => import("./SecurityScans"));
const CommDecoding = React.lazy(() => import("./CommDecoding"));
const Offline = React.lazy(() => import("./Offline"));
const CommInternal = React.lazy(() => import("./CommInternal"));
const Docking = React.lazy(() => import("./Docking"));
const CommShortRange = React.lazy(() => import("./CommShortRange"));
const PowerDistribution = React.lazy(() => import("./PowerDistribution"));
const PowerDistributionLeftWing = React.lazy(() =>
  import("./PowerDistribution/leftWing"),
);
const PowerDistributionRightWing = React.lazy(() =>
  import("./PowerDistribution/rightWing"),
);
const DamageControl = React.lazy(() => import("./DamageControl"));
const Targeting = React.lazy(() => import("./Targeting"));
const PhaserCharging = React.lazy(() => import("./PhaserCharging"));
const ProbeConstruction = React.lazy(() => import("./ProbeConstruction"));
const StealthField = React.lazy(() => import("./StealthField"));
const CargoControl = React.lazy(() => import("./CargoControl"));
const CoolantControl = React.lazy(() => import("./CoolantControl"));
const TractorBeam = React.lazy(() => import("./TractorBeam"));
const SecurityTeams = React.lazy(() => import("./Teams/security"));
const DamageTeams = React.lazy(() => import("./Teams"));
const MedicalTeams = React.lazy(() => import("./Teams/medical"));
const AlertCondition = React.lazy(() => import("./AlertCondition"));
const ProbeNetwork = React.lazy(() => import("./ProbeNetwork"));
const SelfDestruct = React.lazy(() => import("./SelfDestruct"));
const ProbeControl = React.lazy(() => import("./ProbeControl"));
const ReactorControl = React.lazy(() => import("./ReactorControl"));
const Viewscreen = React.lazy(() => import("./Viewscreen"));
const Messages = React.lazy(() => import("./Messaging"));
const Isochips = React.lazy(() => import("./Isochips"));
const Shuttles = React.lazy(() => import("./Shuttles"));
const Status = React.lazy(() => import("./Status"));
const JrOps = React.lazy(() => import("./JrOps"));
const JrComm = React.lazy(() => import("./JrComm"));
const JrFlight = React.lazy(() => import("./JrFlight"));
const JrSensors = React.lazy(() => import("./JrSensors"));
const JrEngineering = React.lazy(() => import("./JrEngineering"));
const TorpedoLoading = React.lazy(() => import("./TorpedoLoading"));
const SoundsTester = React.lazy(() => import("./SoundsTester"));
const NavigationAdvanced = React.lazy(() => import("./NavigationAdvanced"));
const SensorScans = React.lazy(() => import("./SensorScans"));
const OfficerLog = React.lazy(() => import("./OfficerLog"));
const SignalJammer = React.lazy(() => import("./SignalJammer"));
const Exocomps = React.lazy(() => import("./Exocomps"));
const Library = React.lazy(() => import("./Library"));
const CommandLibrary = React.lazy(() => import("./Library/CommandLibrary"));
const MedicalLibrary = React.lazy(() => import("./Library/MedicalLibrary"));
const DamageLibrary = React.lazy(() => import("./Library/DamageLibrary"));
const LegalLibrary = React.lazy(() => import("./Library/LegalLibrary"));
const SecurityLibrary = React.lazy(() => import("./Library/SecurityLibrary"));
const CodeCyphers = React.lazy(() => import("./CodeCyphers"));
const Interception = React.lazy(() => import("./CommInterception"));
const SoftwarePanels = React.lazy(() => import("./SoftwarePanels"));
const DamageStepControl = React.lazy(() => import("./DamageControl"));
const Roster = React.lazy(() => import("./Roster"));
const Objectives = React.lazy(() => import("./Objectives"));
const SurveyForm = React.lazy(() => import("./SurveyForm"));
const SecurityArmory = React.lazy(() => import("./Armory"));
const MedicalArmory = React.lazy(() => import("./Armory/medicalArmory"));
const DamageArmory = React.lazy(() => import("./Armory/damageArmory"));
const ComputerCore = React.lazy(() => import("./ComputerCore"));
const TargetingStandalone = React.lazy(() => import("./Targeting/standalone"));
const Decontamination = React.lazy(() => import("./Decontamination"));
const MedicalRoster = React.lazy(() => import("./MedicalRoster"));
const Sickbay = React.lazy(() => import("./Sickbay"));
const CommReview = React.lazy(() => import("./CommReview"));
const Thx = React.lazy(() => import("./Thx"));
const DilithiumStress = React.lazy(() => import("./DilithiumStress"));
const EngineeringReports = React.lazy(() =>
  import("./DamageControl/engineering"),
);
const RnDReports = React.lazy(() => import("./DamageControl/rnd"));
const Railgun = React.lazy(() => import("./Railgun"));
const RailgunLoading = React.lazy(() => import("./Railgun/loadingCard"));
const JumpDrive = React.lazy(() => import("./JumpDrive"));
const BridgeMap = React.lazy(() => import("./BridgeMap"));
const ThrustersLite = React.lazy(() => import("./Thrusters/lite"));
const ParticleDetector = React.lazy(() => import("./ParticleDetector"));
const Tasks = React.lazy(() => import("./Tasks"));
const ProbeScience = React.lazy(() => import("./ProbeScience"));
const CommandLine = React.lazy(() => import("./CommandLine"));
const DockingPorts = React.lazy(() => import("./DockingPorts"));
const SubspaceField = React.lazy(() => import("./SubspaceField"));
const Transwarp = React.lazy(() => import("./Transwarp"));
const SpecializedDocking = React.lazy(() => import("./SpecializedDocking"));
const Interface = React.lazy(() => import("./Interfaces"));
const SpaceEdventuresToken = React.lazy(() => import("./SpaceEdventuresToken"));
const Crm = React.lazy(() => import("./Crm"));
const CrmFighter = React.lazy(() => import("./CrmFighter"));
const Records = React.lazy(() => import("./Records"));
const StationControl = React.lazy(() => import("./StationControl"));
const Countermeasures = React.lazy(() => import("./Countermeasures"));

// Cores
const EngineControlCore = React.lazy(() => import("./EngineControl/core"));
const TransporterCore = React.lazy(() => import("./Transporters/core"));
const SensorsGridCore = React.lazy(() => import("./Sensors/gridCore"));
const SensorsCore = React.lazy(() => import("./Sensors/core"));
const ShieldControlCore = React.lazy(() => import("./ShieldControl/core"));
const InternalCommCore = React.lazy(() => import("./CommInternal/core"));
const SystemsCore = React.lazy(() => import("./DamageControl/core"));
const DockingCore = React.lazy(() => import("./Docking/core"));
const NavigationCore = React.lazy(() => import("./Navigation/core"));
const CommShortRangeCore = React.lazy(() => import("./CommShortRange/core"));
const RemoteCore = React.lazy(() => import("./RemoteAccess/core"));
const DamageReportsCore = React.lazy(() =>
  import("./DamageControl/reportsCore"),
);
const TargetingCore = React.lazy(() => import("./Targeting/core"));
const PhaserCore = React.lazy(() => import("./PhaserCharging/core"));
const TorpedoCore = React.lazy(() => import("./TorpedoLoading/core"));
const StealthFieldCore = React.lazy(() => import("./StealthField/core"));
const CargoCore = React.lazy(() => import("./CargoControl/core"));
const ActionsCore = React.lazy(() => import("./Actions/core"));
const ThrusterCore = React.lazy(() => import("./Thrusters/core"));
const TractorBeamCore = React.lazy(() => import("./TractorBeam/core"));
const CrewCore = React.lazy(() => import("./Crew/core"));
const SecurityTeamsCore = React.lazy(() => import("./Teams/securityCore"));
const DamageTeamsCore = React.lazy(() => import("./Teams/core"));
const MedicalTeamsCore = React.lazy(() => import("./Teams/medicalCore"));
const ProbeNetworkCore = React.lazy(() => import("./ProbeNetwork/core"));
const SelfDestructCore = React.lazy(() => import("./SelfDestruct/core"));
const ProbeControlCore = React.lazy(() => import("./ProbeControl/core"));
const ReactorControlCore = React.lazy(() => import("./ReactorControl/core"));
const TimelineCore = React.lazy(() => import("./Timeline"));
const ShuttlesCore = React.lazy(() => import("./Shuttles/core"));
const SecurityDecksCore = React.lazy(() => import("./SecurityDecks/core"));
const HeatCore = React.lazy(() => import("./Heat/core"));
const ShipCore = React.lazy(() => import("./Ship/core"));

const MessagingCore = React.lazy(() => import("./Messaging/core"));
const HypercardAndLoginNameCore = React.lazy(() => import("./Clients/core"));
const JrNavigationCore = React.lazy(() => import("./JrFlight/navigationCore"));
const ExtrasCore = React.lazy(() => import("./CoreExtras"));
const SignalJammerCore = React.lazy(() => import("./SignalJammer/core"));
const ExocompsCore = React.lazy(() => import("./Exocomps/core"));
const CodeCyphersCore = React.lazy(() => import("./CodeCyphers/core"));
const InterceptionCore = React.lazy(() => import("./CommInterception/core"));
const ShortRangeSignalsCore = React.lazy(() =>
  import("./CommShortRange/signalsCore"),
);
const AlertConditionCore = React.lazy(() => import("./AlertCondition/core"));
const ObjectivesCore = React.lazy(() => import("./Objectives/core"));
const SurveyFormCore = React.lazy(() => import("./SurveyForm/core"));
const ArmoryCore = React.lazy(() => import("./Armory/core"));
const ComputerCoreCore = React.lazy(() => import("./ComputerCore/core"));
const DecontaminationCore = React.lazy(() => import("./Decontamination/core"));
const SickbayCore = React.lazy(() => import("./Sickbay/core"));
const ThxCore = React.lazy(() => import("./Thx/core"));
const CommDecodingCore = React.lazy(() => import("./CommDecoding/core"));
const ViewscreenCore = React.lazy(() => import("./Viewscreen/core"));
const BattleCore = React.lazy(() => import("./Battle"));
const RailgunCore = React.lazy(() => import("./Railgun/core"));
const ClientsCore = React.lazy(() => import("./Clients/core"));
const JumpDriveCore = React.lazy(() => import("./JumpDrive/core"));
const BridgeMapCore = React.lazy(() => import("./BridgeMap/core"));
const KeypadCore = React.lazy(() => import("./Keypad/core"));
const AssetsCore = React.lazy(() => import("./AssetsCore/core"));
const HandheldScannerCore = React.lazy(() => import("./HandheldScanner/core"));
const TasksCore = React.lazy(() => import("./Tasks/core"));
const AlternateSensorsCore = React.lazy(() =>
  import("./ParticleDetector/core"),
);
const CoreFeed = React.lazy(() => import("./CoreFeed"));
const RoomSearchCore = React.lazy(() => import("./RoomSearch"));
const MacrosCore = React.lazy(() => import("./Macros"));
const DockingPortCore = React.lazy(() => import("./DockingPorts/core"));
const TaskReportCore = React.lazy(() => import("./TaskReports/core"));
const SubspaceFieldCore = React.lazy(() => import("./SubspaceField/core"));
const TranswarpCore = React.lazy(() => import("./Transwarp/core"));
const SpecializedDockingCore = React.lazy(() =>
  import("./SpecializedDocking/core"),
);
const TimelineThumbnailCore = React.lazy(() => import("./Timeline"));
const SpaceEdventuresTokenCore = React.lazy(() =>
  import("./SpaceEdventuresToken/core"),
);
const CrmCore = React.lazy(() => import("./Crm/core"));
const CardsCore = React.lazy(() => import("./StationControl/core"));
const CommandLineCore = React.lazy(() => import("./CommandLine/core"));
const AuxTimelineCore = React.lazy(() => import("./Timeline/auxTimelineData"));
const LightingCore = React.lazy(() => import("./Lighting"));
const MacroButtonsCore = React.lazy(() => import("./Macros/macroButtons"));
const OfficerLogCore = React.lazy(() => import("./OfficerLog/core"));
const RecordsCore = React.lazy(() => import("./Records/core"));
const MIDICore = React.lazy(() => import("./Midi"));
const CountermeasuresCore = React.lazy(() => import("./Countermeasures/core"));
const TaskFlowCore = React.lazy(() => import("./Tasks/taskFlowCore"));

// Widgets
const ComposerWidget = React.lazy(() => import("./LongRangeComm/Composer"));
const CalculatorWidget = React.lazy(() => import("./Widgets/calculator"));
const RemoteWidget = React.lazy(() => import("./RemoteAccess/widget"));
const Keyboard = React.lazy(() => import("./Widgets/keyboard"));
const SensorsWidget = React.lazy(() => import("./Sensors/widget"));

const Views = {
  Login,
  LongRangeComm,
  Thrusters,
  EngineControl,
  Navigation,
  Sensors,
  ShieldControl,
  Transporters,
  SecurityDecks,
  SecurityScans,
  CommDecoding,
  Offline,
  CommInternal,
  Docking,
  CommShortRange,
  PowerDistribution,
  DamageControl,
  Targeting,
  PhaserCharging,
  ProbeConstruction,
  StealthField,
  CargoControl,
  CoolantControl,
  TractorBeam,
  SecurityTeams,
  DamageTeams,
  AlertCondition,
  ProbeNetwork,
  SelfDestruct,
  ProbeControl,
  ReactorControl,
  Viewscreen,
  Messages,
  Isochips,
  Shuttles,
  Status,
  JrOps,
  JrComm,
  JrFlight,
  JrSensors,
  JrEngineering,
  TorpedoLoading,
  SoundsTester,
  NavigationAdvanced,
  SensorScans,
  OfficerLog,
  SignalJammer,
  Exocomps,
  Library,
  CommandLibrary,
  MedicalLibrary,
  DamageLibrary,
  LegalLibrary,
  SecurityLibrary,
  CodeCyphers,
  Interception,
  SoftwarePanels,
  DamageStepControl,
  Roster,
  Objectives,
  SurveyForm,
  SecurityArmory,
  MedicalArmory,
  DamageArmory,
  MedicalTeams,
  ComputerCore,
  TargetingStandalone,
  Decontamination,
  MedicalRoster,
  Sickbay,
  CommReview,
  Thx,
  DilithiumStress,
  EngineeringReports,
  RnDReports,
  Railgun,
  RailgunLoading,
  JumpDrive,
  BridgeMap,
  ThrustersLite,
  ParticleDetector,
  Tasks,
  ProbeScience,
  CommandLine,
  DockingPorts,
  SubspaceField,
  Transwarp,
  SpecializedDocking,
  Interface,
  SpaceEdventuresToken,
  Crm,
  CrmFighter,
  Records,
  StationControl,
  Countermeasures,
  PowerDistributionLeftWing,
  PowerDistributionRightWing,
};

export const Widgets = {
  keyboard: {
    widget: Keyboard,
    icon: FaKeyboard,
    name: "Keyboard",
    size: "lg",
    color: "rgb(90,180,255)",
  },
  composer: {
    widget: ComposerWidget,
    icon: FaPenFancy,
    name: "Long Range Message Composer",
    color: "rgb(200,150,255)",
  },
  calculator: {
    widget: CalculatorWidget,
    icon: FaCalculator,
    name: "Calculator",
    color: "rgb(255,200,100)",
  },
  objectives: {
    widget: Objectives,
    icon: FaListUl,
    name: "Objectives",
    color: "rgb(200,200,200)",
  },
  remote: {
    widget: RemoteWidget,
    icon: FaRss,
    name: "Remote Access",
    color: "rgb(100,200,100)",
    training: [
      {
        selector: ".remote-access",
        content:
          "Remote access codes are used to send commands or information from one system to another. You can send remote access codes to systems on your ship or to systems on antoher ship.",
      },
      {
        selector: ".remote-access",
        content:
          "To send a remote access code, type the code in the text box and click the send button. The results of the remote access code will soon appear as a notification in the top right corner of your screen.",
      },
    ],
  },
  messages: {
    widget: Messages,
    icon: FaRegComment,
    name: "Messaging",
    size: "lg",
    color: "rgb(100,150,200)",
    training: MessagesTraining,
  },
  damageReport: {
    widget: DamageControl,
    icon: FaRegFileAlt,
    name: "Damage Report",
    size: "lg",
    color: "rgb(200, 100, 100)",
  },
  engineeringReport: {
    widget: EngineeringReports,
    icon: FaRegFileCode,
    name: "Engineering Report",
    size: "lg",
    color: "rgb(180,100, 30)",
  },
  rndReport: {
    widget: RnDReports,
    icon: FaRegFileExcel,
    name: "R&D Report",
    size: "lg",
    color: "rgb(180,100, 130)",
  },
  officerLog: {
    widget: OfficerLog,
    icon: FaBook,
    name: "Officer Log",
    size: "lg",
    color: "rgb(255,255,100)",
  },
  tasks: {
    widget: Tasks,
    icon: FaTasks,
    name: "Tasks",
    size: "lg",
    color: "#6F84EE",
  },
  sensors: {
    widget: SensorsWidget,
    icon: FaCircleNotch,
    name: "Sensors",
    size: "xl",
    color: "#6FEDC5",
  },
  commandLine: {
    widget: CommandLine,
    icon: FaTerminal,
    name: "Command Line",
    size: "lg",
    color: "#5FFF5F",
  },
};

export const Cores = {
  EngineControlCore,
  TransporterCore,
  SensorsGridCore,
  SensorsCore,
  ShieldControlCore,
  InternalCommCore,
  SystemsCore,
  DockingCore,
  NavigationCore,
  CommShortRangeCore,
  RemoteCore,
  DamageReportsCore,
  TargetingCore,
  PhaserCore,
  TorpedoCore,
  StealthFieldCore,
  CargoCore,
  ActionsCore,
  ThrusterCore,
  TractorBeamCore,
  CrewCore,
  SecurityTeamsCore,
  DamageTeamsCore,
  MedicalTeamsCore,
  ProbeNetworkCore,
  SelfDestructCore,
  ProbeControlCore,
  ReactorControlCore,
  TimelineCore,
  ShuttlesCore,
  SecurityDecksCore,
  HeatCore,
  ShipCore,
  MessagingCore,
  JrNavigationCore,
  ExtrasCore,
  SignalJammerCore,
  CodeCyphersCore,
  InterceptionCore,
  ExocompsCore,
  ShortRangeSignalsCore,
  AlertConditionCore,
  ObjectivesCore,
  SurveyFormCore,
  ArmoryCore,
  ComputerCoreCore,
  DecontaminationCore,
  SickbayCore,
  ThxCore,
  CommDecodingCore,
  ViewscreenCore,
  BattleCore,
  RailgunCore,
  HypercardAndLoginNameCore,
  JumpDriveCore,
  ClientsCore,
  BridgeMapCore,
  KeypadCore,
  AssetsCore,
  HandheldScannerCore,
  TasksCore,
  AlternateSensorsCore,
  CoreFeed,
  RoomSearchCore,
  MacrosCore,
  DockingPortCore,
  TaskReportCore,
  SubspaceFieldCore,
  TranswarpCore,
  SpecializedDockingCore,
  TimelineThumbnailCore,
  SpaceEdventuresTokenCore,
  CrmCore,
  CardsCore,
  CommandLineCore,
  AuxTimelineCore,
  LightingCore,
  MacroButtonsCore,
  OfficerLogCore,
  RecordsCore,
  MIDICore,
  CountermeasuresCore,
  TaskFlowCore,
};

export default Views;
