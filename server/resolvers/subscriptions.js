import { EngineSubscriptions } from "./engines";
import { ShieldSubscriptions } from "./shields";
import { ClientSubscriptions } from "./clients";
import { FlightStructureSubscriptions } from "./flightStructure";
import { ThrustersSubscriptions } from "./thrusters";
import { AssetsSubscriptions } from "./assets";
import { TransporterSubscriptions } from "./transporters";
import { CoreLayoutSubscriptions } from "./coreLayouts";
import { SensorsSubscriptions } from "./sensors";
import { ShipStructureSubscriptions } from "./shipStructure";
import { LRCommSubscriptions } from "./lrComm";
import { InternalCommSubscriptions } from "./internalComm";
import { SystemsSubscriptions } from "./systems";
import { NavigationSubscriptions } from "./navigation";
import { ShortRangeCommSubscriptions } from "./shortRangeComm";
import { ShipSubscriptions } from "./ship";
import { ReactorSubscriptions } from "./reactor";
import { TargetingSubscriptions } from "./targeting";
import { TorpedoSubscriptions } from "./torpedo";
import { PhaserSubscriptions } from "./phasers";
import { ProbesSubscriptions } from "./probes";
import { StealthFieldSubscriptions } from "./stealthField";
import { ActionsSubscriptions } from "./actions";
import { CoolantSubscriptions } from "./coolant";
import { TractorBeamSubscriptions } from "./tractorBeam";
import { CrewSubscriptions } from "./crew";
import { TeamsSubscriptions } from "./teams";
import { SetSubscriptions } from "./set";
import { ViewscreenSubscriptions } from "./viewscreen";
import { MessagesSubscriptions } from "./messages";
import { IsochipsSubscriptions } from "./isochips";
import { DockingSubscriptions } from "./docking";
import { CoreFeedSubscriptions } from "./coreFeed";
import { TacticalMapSubscriptions } from "./tacticalMap";
import { OfficerLogSubscriptions } from "./officerLog";
import { SignalJammerSubscriptions } from "./signalJammer";
import { ExocompSubscriptions } from "./exocomp";
import { LibrarySubscriptions } from "./library";
import { SoftwarePanelsSubscriptions } from "./softwarePanels";
import { SurveyFormSubscriptions } from "./surveyform.js";
import { ObjectiveSubscriptions } from "./objective.js";

const subscriptionMap = Object.assign(
  {},
  FlightStructureSubscriptions,
  ClientSubscriptions,
  ShieldSubscriptions,
  EngineSubscriptions,
  ThrustersSubscriptions,
  AssetsSubscriptions,
  TransporterSubscriptions,
  CoreLayoutSubscriptions,
  SensorsSubscriptions,
  ShipStructureSubscriptions,
  LRCommSubscriptions,
  InternalCommSubscriptions,
  SystemsSubscriptions,
  NavigationSubscriptions,
  ShortRangeCommSubscriptions,
  ShipSubscriptions,
  ReactorSubscriptions,
  TargetingSubscriptions,
  TorpedoSubscriptions,
  PhaserSubscriptions,
  ProbesSubscriptions,
  StealthFieldSubscriptions,
  ActionsSubscriptions,
  CoolantSubscriptions,
  TractorBeamSubscriptions,
  CrewSubscriptions,
  TeamsSubscriptions,
  SetSubscriptions,
  ViewscreenSubscriptions,
  MessagesSubscriptions,
  IsochipsSubscriptions,
  DockingSubscriptions,
  CoreFeedSubscriptions,
  TacticalMapSubscriptions,
  OfficerLogSubscriptions,
  SignalJammerSubscriptions,
  ExocompSubscriptions,
  LibrarySubscriptions,
  SoftwarePanelsSubscriptions,
  SurveyFormSubscriptions,
  ObjectiveSubscriptions
);

export default subscriptionMap;
