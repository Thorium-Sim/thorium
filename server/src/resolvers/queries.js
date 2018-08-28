import { EngineQueries } from "./engines";
import { ShieldQueries } from "./shields";
import { ClientQueries } from "./clients";
import { FlightStructureQueries } from "./flightStructure";
import { ThrustersQueries } from "./thrusters";
import { AssetsQueries } from "./assets";
import { TransporterQueries } from "./transporters";
import { CoreLayoutQueries } from "./coreLayouts";
import { SensorsQueries } from "./sensors";
import { ShipStructureQueries } from "./shipStructure";
import { LRCommQueries } from "./lrComm";
import { InternalCommQueries } from "./internalComm";
import { SystemsQueries } from "./systems";
import { NavigationQueries } from "./navigation";
import { ShortRangeCommQueries } from "./shortRangeComm";
import { ShipQueries } from "./ship";
import { ReactorQueries } from "./reactor";
import { TargetingQueries } from "./targeting";
import { TorpedoQueries } from "./torpedo";
import { PhaserQueries } from "./phasers";
import { ProbesQueries } from "./probes";
import { StealthFieldQueries } from "./stealthField";
import { ActionsQueries } from "./actions";
import { CoolantQueries } from "./coolant";
import { TractorBeamQueries } from "./tractorBeam";
import { CrewQueries } from "./crew";
import { TeamsQueries } from "./teams";
import { SetQueries } from "./set";
import { ViewscreenQueries } from "./viewscreen";
import { MessagesQueries } from "./messages";
import { IsochipsQueries } from "./isochips";
import { DockingQueries } from "./docking";
import { CoreFeedQueries } from "./coreFeed";
import { TacticalMapQueries } from "./tacticalMap";
import { OfficerLogQueries } from "./officerLog";
import { SignalJammerQueries } from "./signalJammer";
import { ExocompQueries } from "./exocomp";
import { LibraryQueries } from "./library";
import { SoftwarePanelsQueries } from "./softwarePanels";
import { SurveyFormQueries } from "./surveyform.js";
import { ObjectiveQueries } from "./objective.js";
import { KeyboardQueries } from "./keyboard.js";
import { ComputerCoreQueries } from "./computerCore.js";
import { SickbayQueries } from "./sickbay.js";
import { ThxQueries } from "./thx.js";
import { ThoriumQueries } from "./thorium.js";
import { ExternalsQueries } from "./externals";
import { RailgunQueries } from "./railgun.js";

const queryMap = Object.assign(
  {},
  FlightStructureQueries,
  ClientQueries,
  ShieldQueries,
  EngineQueries,
  ThrustersQueries,
  AssetsQueries,
  TransporterQueries,
  CoreLayoutQueries,
  SensorsQueries,
  ShipStructureQueries,
  LRCommQueries,
  InternalCommQueries,
  SystemsQueries,
  NavigationQueries,
  ShortRangeCommQueries,
  ShipQueries,
  ReactorQueries,
  TargetingQueries,
  TorpedoQueries,
  PhaserQueries,
  ProbesQueries,
  StealthFieldQueries,
  ActionsQueries,
  CoolantQueries,
  TractorBeamQueries,
  CrewQueries,
  TeamsQueries,
  SetQueries,
  ViewscreenQueries,
  MessagesQueries,
  IsochipsQueries,
  DockingQueries,
  CoreFeedQueries,
  TacticalMapQueries,
  OfficerLogQueries,
  SignalJammerQueries,
  ExocompQueries,
  LibraryQueries,
  SoftwarePanelsQueries,
  SurveyFormQueries,
  ObjectiveQueries,
  KeyboardQueries,
  ComputerCoreQueries,
  SickbayQueries,
  ThxQueries,
  ThoriumQueries,
  ExternalsQueries,
  RailgunQueries
);

export default queryMap;
