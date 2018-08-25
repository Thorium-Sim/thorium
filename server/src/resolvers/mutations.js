import App from "../app";
import { EngineMutations } from "./engines";
import { ShieldMutations } from "./shields";
import { ClientMutations } from "./clients";
import { FlightStructureMutations } from "./flightStructure";
import { ThrustersMutations } from "./thrusters";
import { AssetsMutations } from "./assets";
import { TransporterMutations } from "./transporters";
import { CoreLayoutMutations } from "./coreLayouts";
import { SensorsMutations } from "./sensors";
import { ShipStructureMutations } from "./shipStructure";
import { LRCommMutations } from "./lrComm";
import { InternalCommMutations } from "./internalComm";
import { SystemsMutations } from "./systems";
import { NavigationMutations } from "./navigation";
import { ShortRangeCommMutations } from "./shortRangeComm";
import { ShipMutations } from "./ship";
import { ReactorMutations } from "./reactor";
import { TargetingMutations } from "./targeting";
import { TorpedoMutations } from "./torpedo";
import { PhaserMutations } from "./phasers";
import { ProbesMutations } from "./probes";
import { StealthFieldMutations } from "./stealthField";
import { ActionsMutations } from "./actions";
import { CoolantMutations } from "./coolant";
import { TractorBeamMutations } from "./tractorBeam";
import { CrewMutations } from "./crew";
import { TeamsMutations } from "./teams";
import { SetMutations } from "./set";
import { ViewscreenMutations } from "./viewscreen";
import { MessagesMutations } from "./messages";
import { IsochipsMutations } from "./isochips";
import { DockingMutations } from "./docking";
import { CoreFeedMutations } from "./coreFeed";
import { TacticalMapMutations } from "./tacticalMap";
import { OfficerLogMutations } from "./officerLog";
import { SignalJammerMutations } from "./signalJammer";
import { ExocompMutations } from "./exocomp";
import { LibraryMutations } from "./library";
import { SoftwarePanelsMutations } from "./softwarePanels";
import { IssueTrackerMutations } from "./issueTracker";
import { SurveyFormMutations } from "./surveyform.js";
import { ObjectiveMutations } from "./objective.js";
import { KeyboardMutations } from "./keyboard.js";
import { ComputerCoreMutations } from "./computerCore.js";
import { SickbayMutations } from "./sickbay.js";
import { ThxMutations } from "./thx.js";
import { ThoriumMutations } from "./thorium.js";
import { ExternalsMutations } from "./externals";

const mutationMap = Object.assign(
  FlightStructureMutations,
  ClientMutations,
  ShieldMutations,
  EngineMutations,
  ThrustersMutations,
  AssetsMutations,
  TransporterMutations,
  CoreLayoutMutations,
  SensorsMutations,
  ShipStructureMutations,
  LRCommMutations,
  InternalCommMutations,
  SystemsMutations,
  NavigationMutations,
  ShortRangeCommMutations,
  ShipMutations,
  ReactorMutations,
  TargetingMutations,
  TorpedoMutations,
  PhaserMutations,
  ProbesMutations,
  StealthFieldMutations,
  IssueTrackerMutations,
  ActionsMutations,
  CoolantMutations,
  TractorBeamMutations,
  CrewMutations,
  TeamsMutations,
  SetMutations,
  ViewscreenMutations,
  MessagesMutations,
  IsochipsMutations,
  DockingMutations,
  CoreFeedMutations,
  TacticalMapMutations,
  OfficerLogMutations,
  SignalJammerMutations,
  ExocompMutations,
  LibraryMutations,
  SoftwarePanelsMutations,
  SurveyFormMutations,
  ObjectiveMutations,
  KeyboardMutations,
  ComputerCoreMutations,
  SickbayMutations,
  ThxMutations,
  ThoriumMutations,
  ExternalsMutations
);

export default mutationMap;
