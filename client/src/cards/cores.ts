import React from "react";

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
const DamageReportsCore = React.lazy(
  () => import("./DamageControl/reportsCore"),
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
const ShortRangeSignalsCore = React.lazy(
  () => import("./CommShortRange/signalsCore"),
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
const AlternateSensorsCore = React.lazy(
  () => import("./ParticleDetector/core"),
);
const CoreFeed = React.lazy(() => import("./CoreFeed"));
const RoomSearchCore = React.lazy(() => import("./RoomSearch"));
const MacrosCore = React.lazy(() => import("./Macros"));
const DockingPortCore = React.lazy(() => import("./DockingPorts/core"));
const TaskReportCore = React.lazy(() => import("./TaskReports/core"));
const SubspaceFieldCore = React.lazy(() => import("./SubspaceField/core"));
const TranswarpCore = React.lazy(() => import("./Transwarp/core"));
const SpecializedDockingCore = React.lazy(
  () => import("./SpecializedDocking/core"),
);
const TimelineThumbnailCore = React.lazy(() => import("./Timeline"));
const SpaceEdventuresTokenCore = React.lazy(
  () => import("./SpaceEdventuresToken/core"),
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
const DocumentsCore = React.lazy(() => import("./Documents/core"));
const HackingCore = React.lazy(() => import("./Hacking/core"));
const PrintQueueCore = React.lazy(() => import("./PrintQueue/core"));

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
  DocumentsCore,
  HackingCore,
  PrintQueueCore,
};
