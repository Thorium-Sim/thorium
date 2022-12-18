import React from "react";

// Widget Icons

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
const PowerDistributionLeftWing = React.lazy(
  () => import("./PowerDistribution/leftWing"),
);
const PowerDistributionRightWing = React.lazy(
  () => import("./PowerDistribution/rightWing"),
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
const EngineeringReports = React.lazy(
  () => import("./DamageControl/engineering"),
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
const Hacking = React.lazy(() => import("./Hacking"));
const Documents = React.lazy(() => import("./Documents"));

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
  Documents,
  Hacking,
};

export default Views;
