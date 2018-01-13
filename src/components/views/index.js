import LongRangeComm from "./LongRangeComm";
import EngineControl from "./EngineControl";
import Thrusters from "./Thrusters";
import Navigation from "./Navigation";
import Sensors from "./Sensors";
import AdminAssets from "./AdminAssets";
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

import SecurityTeams from "./SecurityTeams";
import DamageTeams from "./DamageTeams";
import AlertCondition from "./AlertCondition";
import ProbeNetwork from "./ProbeNetwork";
import SelfDestruct from "./SelfDestruct";
import ProbeControl from "./ProbeControl";
import ReactorControl from "./ReactorControl";
import Viewscreen from "./Viewscreen";
import Messages from "./Messaging";
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
import DecksCore from "./ShipStructure/core";
import CargoCore from "./CargoControl/core";
import ActionsCore from "./Actions/core";
import ThrusterCore from "./Thrusters/core";
import TractorBeamCore from "./TractorBeam/core";
import CrewCore from "./Crew/core";
import SecurityTeamsCore from "./SecurityTeams/core";
import DamageTeamsCore from "./DamageTeams/core";
import ProbeNetworkCore from "./ProbeNetwork/core";
import SelfDestructCore from "./SelfDestruct/core";
import ProbeControlCore from "./ProbeControl/core";
import ReactorControlCore from "./ReactorControl/core";
import ViewscreenCore from "./Viewscreen/core";
import TimelineCore from "./Timeline";
import ShuttlesCore from "./Shuttles/core";
import SecurityDecksCore from "./SecurityDecks/core";
import HeatCore from "./Heat/core";
import ShipCore from "./Ship/core";
import ReactivationCore from "./DamageControl/reactivationCore";
import MessagingCore from "./Messaging/core";
import ClientsCore from "./Clients/core";
import JrNavigationCore from "./JrFlight/navigationCore";
import ExtrasCore from "./CoreExtras";
import SignalJammerCore from "./SignalJammer/core";

import ComposerWidget from "./LongRangeComm/Composer";
import CalculatorWidget from "./Widgets/calculator";
import RemoteWidget from "./RemoteAccess/widget";
import Keyboard from "./Widgets/keyboard";

const Views = {
  Login,
  LongRangeComm,
  AdminAssets,
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
  Library
};

export const Widgets = {
  keyboard: {
    widget: Keyboard,
    icon: "keyboard-o",
    name: "Keyboard",
    size: "lg",
    color: "rgb(50,50,200)"
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
  remote: {
    widget: RemoteWidget,
    icon: "rss",
    name: "Remote Access",
    color: "rgb(100,200,100)"
  },
  messages: {
    widget: Messages,
    icon: "comments-o",
    name: "Messaging",
    size: "lg",
    color: "rgb(100,150,200)"
  },
  damageReport: {
    widget: DamageControl,
    icon: "file-text",
    name: "Damage Report",
    size: "lg",
    color: "rgb(200, 100, 100)"
  },
  officerLog: {
    widget: OfficerLog,
    icon: "book",
    name: "Officer Log",
    size: "lg",
    color: "rgb(255,255,100)"
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
  DecksCore,
  CargoCore,
  ActionsCore,
  ThrusterCore,
  TractorBeamCore,
  CrewCore,
  SecurityTeamsCore,
  DamageTeamsCore,
  ProbeNetworkCore,
  SelfDestructCore,
  ProbeControlCore,
  ReactorControlCore,
  ViewscreenCore,
  TimelineCore,
  ShuttlesCore,
  SecurityDecksCore,
  HeatCore,
  ShipCore,
  ReactivationCore,
  MessagingCore,
  ClientsCore,
  JrNavigationCore,
  ExtrasCore,
  SignalJammerCore
};

export default Views;
