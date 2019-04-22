import LongRangeComm from "./LongRangeComm";
import EngineControl from "./EngineControl";
import Thrusters from "./Thrusters";
import Navigation from "./Navigation";
import Sensors from "./Sensors";
import ShieldControl from "./ShieldControl";
import Transporters from "./Transporters";
import Login from "./Login";
import SecurityDecks from "./SecurityDecks";
import SecurityScans from "./SecurityScans";
import CommDecoding from "./CommDecoding";
import Offline from "./Offline";
import CommInternal from "./CommInternal";
import Docking from "./Docking";
import CommShortRange from "./CommShortRange";
import PowerDistribution from "./PowerDistribution";
import DamageControl from "./DamageControl";
import Targeting from "./Targeting";
import PhaserCharging from "./PhaserCharging";
import ProbeConstruction from "./ProbeConstruction";
import StealthField from "./StealthField";
import CargoControl from "./CargoControl";
import CoolantControl from "./CoolantControl";
import TractorBeam from "./TractorBeam";

import SecurityTeams from "./Teams/security";
import DamageTeams from "./Teams";
import MedicalTeams from "./Teams/medical";
import AlertCondition from "./AlertCondition";
import ProbeNetwork from "./ProbeNetwork";
import SelfDestruct from "./SelfDestruct";
import ProbeControl from "./ProbeControl";
import ReactorControl from "./ReactorControl";
import Viewscreen from "./Viewscreen";
import Messages, { trainingSteps as MessagesTraining } from "./Messaging";
import Isochips from "./Isochips";
import Shuttles from "./Shuttles";
import Status from "./Status";
import JrOps from "./JrOps";
import JrComm from "./JrComm";
import JrFlight from "./JrFlight";
import JrSensors from "./JrSensors";
import JrEngineering from "./JrEngineering";
import TorpedoLoading from "./TorpedoLoading";
import SoundsTester from "./SoundsTester";
import NavigationAdvanced from "./NavigationAdvanced";
import SensorScans from "./SensorScans";
import OfficerLog from "./OfficerLog";
import SignalJammer from "./SignalJammer";
import Exocomps from "./Exocomps";
import Library from "./Library";
import CommandLibrary from "./Library/CommandLibrary";
import MedicalLibrary from "./Library/MedicalLibrary";
import DamageLibrary from "./Library/DamageLibrary";
import LegalLibrary from "./Library/LegalLibrary";
import SecurityLibrary from "./Library/SecurityLibrary";
import CodeCyphers from "./CodeCyphers";
import Interception from "./CommInterception";
import SoftwarePanels from "./SoftwarePanels";
import DamageStepControl from "./DamageControl";
import Roster from "./Roster";
import Objectives from "./Objectives";
import SurveyForm from "./SurveyForm";
import SecurityArmory from "./Armory";
import MedicalArmory from "./Armory/medicalArmory";
import DamageArmory from "./Armory/damageArmory";
import ComputerCore from "./ComputerCore";
import TargetingStandalone from "./Targeting/standalone";
import Decontamination from "./Decontamination";
import MedicalRoster from "./MedicalRoster";
import Sickbay from "./Sickbay";
import CommReview from "./CommReview";
import Thx from "./Thx";
import DilithiumStress from "./DilithiumStress";
import EngineeringReports from "./DamageControl/engineering";
import RnDReports from "./DamageControl/rnd";
import Railgun from "./Railgun";
import RailgunLoading from "./Railgun/loadingCard";
import JumpDrive from "./JumpDrive";
import BridgeMap from "./BridgeMap";
import ThrustersLite from "./Thrusters/lite";
import ParticleDetector from "./ParticleDetector";
import Tasks from "./Tasks";
import ProbeScience from "./ProbeScience";
import CommandLine from "./CommandLine";
import DockingPorts from "./DockingPorts";
import SubspaceField from "./SubspaceField";
import Transwarp from "./Transwarp";
import SpecializedDocking from "./SpecializedDocking";
import Interface from "./Interface";
import SpaceEdventuresToken from "./SpaceEdventuresToken";
import Crm from "./Crm";

// Cores
import EngineControlCore from "./EngineControl/core";
import TransporterCore from "./Transporters/core";
import SensorsGridCore from "./Sensors/gridCore";
import SensorsCore from "./Sensors/core";
import ShieldControlCore from "./ShieldControl/core";
import DecodingCore from "./CommDecoding/core";
import LRCommCore from "./LongRangeComm/core";
import InternalCommCore from "./CommInternal/core";
import SystemsCore from "./DamageControl/core";
import DockingCore from "./Docking/core";
import NavigationCore from "./Navigation/core";
import CommShortRangeCore from "./CommShortRange/core";
import RemoteCore from "./RemoteAccess/core";
import DamageReportsCore from "./DamageControl/reportsCore";
import TargetingCore from "./Targeting/core";
import PhaserCore from "./PhaserCharging/core";
import TorpedoCore from "./TorpedoLoading/core";
import StealthFieldCore from "./StealthField/core";
import CargoCore from "./CargoControl/core";
import ActionsCore from "./Actions/core";
import ThrusterCore from "./Thrusters/core";
import TractorBeamCore from "./TractorBeam/core";
import CrewCore from "./Crew/core";
import SecurityTeamsCore from "./Teams/securityCore";
import DamageTeamsCore from "./Teams/core";
import MedicalTeamsCore from "./Teams/medicalCore";
import ProbeNetworkCore from "./ProbeNetwork/core";
import SelfDestructCore from "./SelfDestruct/core";
import ProbeControlCore from "./ProbeControl/core";
import ReactorControlCore from "./ReactorControl/core";
import TimelineCore from "./Timeline";
import ShuttlesCore from "./Shuttles/core";
import SecurityDecksCore from "./SecurityDecks/core";
import HeatCore from "./Heat/core";
import ShipCore from "./Ship/core";
import ReactivationCore from "./DamageControl/reactivationCore";
import MessagingCore from "./Messaging/core";
import LoginNameCore from "./Clients/core";
import JrNavigationCore from "./JrFlight/navigationCore";
import ExtrasCore from "./CoreExtras";
import SignalJammerCore from "./SignalJammer/core";
import ExocompsCore from "./Exocomps/core";
import CodeCyphersCore from "./CodeCyphers/core";
import InterceptionCore from "./CommInterception/core";
import ShortRangeSignalsCore from "./CommShortRange/signalsCore";
import AlertConditionCore from "./AlertCondition/core";
import ObjectivesCore from "./Objectives/core";
import SurveyFormCore from "./SurveyForm/core";
import ArmoryCore from "./Armory/core";
import ComputerCoreCore from "./ComputerCore/core";
import DecontaminationCore from "./Decontamination/core";
import SickbayCore from "./Sickbay/core";
import ThxCore from "./Thx/core";
import CommConvoCore from "./CommDecoding/convoCore";
import ViewscreenCore from "./Viewscreen/core";
import BattleCore from "./Battle";
import RailgunCore from "./Railgun/core";
import HypercardCore from "./Clients/hypercardCore";
import ClientsCore from "./Clients/core";
import JumpDriveCore from "./JumpDrive/core";
import BridgeMapCore from "./BridgeMap/core";
import KeypadCore from "./Keypad/core";
import AssetsCore from "./AssetsCore/core";
import HandheldScannerCore from "./HandheldScanner/core";
import NewMessagingCore from "./Messaging/newCore";
import TasksCore from "./Tasks/core";
import AlternateSensorsCore from "./ParticleDetector/core";
import CoreFeed from "./CoreFeed";
import RoomSearchCore from "./RoomSearch";
import MacrosCore from "./Macros";
import DockingPortCore from "./DockingPorts/core";
import TaskReportCore from "./TaskReports/core";
import SubspaceFieldCore from "./SubspaceField/core";
import TranswarpCore from "./Transwarp/core";
import SpecializedDockingCore from "./SpecializedDocking/core";
import TimelineThumbnailCore from "./Timeline/thumbnailData";
import SpaceEdventuresTokenCore from "./SpaceEdventuresToken/core";
import CrmCore from "./Crm/core";

// Widgets
import ComposerWidget from "./LongRangeComm/Composer";
import CalculatorWidget from "./Widgets/calculator";
import RemoteWidget from "./RemoteAccess/widget";
import Keyboard from "./Widgets/keyboard";
import SensorsWidget from "./Sensors/widget";

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
  Crm
};

export const Widgets = {
  keyboard: {
    widget: Keyboard,
    icon: "keyboard-o",
    name: "Keyboard",
    size: "lg",
    color: "rgb(90,180,255)"
  },
  composer: {
    widget: ComposerWidget,
    icon: "pencil-square-o",
    name: "Long Range Message Composer",
    color: "rgb(200,150,255)"
  },
  calculator: {
    widget: CalculatorWidget,
    icon: "calculator",
    name: "Calculator",
    color: "rgb(255,200,100)"
  },
  objectives: {
    widget: Objectives,
    icon: "list-ul",
    name: "Objectives",
    color: "rgb(200,200,200)"
  },
  remote: {
    widget: RemoteWidget,
    icon: "rss",
    name: "Remote Access",
    color: "rgb(100,200,100)",
    training: [
      {
        selector: ".remote-access",
        content:
          "Remote access codes are used to send commands or information from one system to another. You can send remote access codes to systems on your ship or to systems on antoher ship."
      },
      {
        selector: ".remote-access",
        content:
          "To send a remote access code, type the code in the text box and click the send button. The results of the remote access code will soon appear as a notification in the top right corner of your screen."
      }
    ]
  },
  messages: {
    widget: Messages,
    icon: "comments-o",
    name: "Messaging",
    size: "lg",
    color: "rgb(100,150,200)",
    training: MessagesTraining
  },
  damageReport: {
    widget: DamageControl,
    icon: "file-text",
    name: "Damage Report",
    size: "lg",
    color: "rgb(200, 100, 100)"
  },
  engineeringReport: {
    widget: EngineeringReports,
    icon: "file-code-o",
    name: "Engineering Report",
    size: "lg",
    color: "rgb(180,100, 30)"
  },
  rndReport: {
    widget: RnDReports,
    icon: "file-excel-o",
    name: "R&D Report",
    size: "lg",
    color: "rgb(180,100, 130)"
  },
  officerLog: {
    widget: OfficerLog,
    icon: "book",
    name: "Officer Log",
    size: "lg",
    color: "rgb(255,255,100)"
  },
  tasks: {
    widget: Tasks,
    icon: "tasks",
    name: "Tasks",
    size: "lg",
    color: "#6F84EE"
  },
  sensors: {
    widget: SensorsWidget,
    icon: "circle-o-notch",
    name: "Sensors",
    size: "lg",
    color: "#6FEDC5"
  },
  commandLine: {
    widget: CommandLine,
    icon: "terminal",
    name: "Command Line",
    size: "lg",
    color: "#5FFF5F"
  }
};

export const Cores = {
  EngineControlCore,
  TransporterCore,
  SensorsGridCore,
  SensorsCore,
  ShieldControlCore,
  DecodingCore,
  LRCommCore,
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
  ReactivationCore,
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
  CommConvoCore,
  ViewscreenCore,
  BattleCore,
  RailgunCore,
  LoginNameCore,
  HypercardCore,
  JumpDriveCore,
  ClientsCore,
  BridgeMapCore,
  KeypadCore,
  AssetsCore,
  HandheldScannerCore,
  NewMessagingCore,
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
  CrmCore
};

export default Views;
