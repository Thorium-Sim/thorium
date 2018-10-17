import { EngineTypes } from "./engines";
import { ClientTypes } from "./clients";
import { FlightStructureTypes } from "./flightStructure";
import { AssetsTypes } from "./assets";
import { SensorsTypes } from "./sensors";
import { ShipStructureTypes } from "./shipStructure";
import { SystemsTypes } from "./systems";
import { TargetingTypes } from "./targeting";
import { ProbesTypes } from "./probes";
import { CrewTypes } from "./crew";
import { TeamsTypes } from "./teams";
import { SetTypes } from "./set";
import { LRCommTypes } from "./lrComm";
import { IsochipsTypes } from "./isochips";
import { TacticalMapTypes } from "./tacticalMap";
import { ExocompTypes } from "./exocomp";
import { LibraryTypes } from "./library";
import { ShieldTypes } from "./shields";
import { PhaserTypes } from "./phasers";
import { ReactorTypes } from "./reactor";
import { ShortRangeCommTypes } from "./shortRangeComm";
import { TorpedoTypes } from "./torpedo";
import { SignalJammerTypes } from "./signalJammer";
import { NavigationTypes } from "./navigation";
import { StealthFieldTypes } from "./stealthField";
import { SickbayTypes } from "./sickbay";
import { ThxTypes } from "./thx";
import { ExternalsTypes } from "./externals";
import { ViewscreenTypes } from "./viewscreen";
import { TaskTypes } from "./tasks";

export default Object.assign(
  AssetsTypes,
  EngineTypes,
  SensorsTypes,
  FlightStructureTypes,
  ClientTypes,
  ShipStructureTypes,
  SystemsTypes,
  TargetingTypes,
  ProbesTypes,
  CrewTypes,
  TeamsTypes,
  SetTypes,
  IsochipsTypes,
  TacticalMapTypes,
  ExocompTypes,
  LibraryTypes,
  ShieldTypes,
  PhaserTypes,
  ReactorTypes,
  ShortRangeCommTypes,
  SignalJammerTypes,
  TorpedoTypes,
  NavigationTypes,
  StealthFieldTypes,
  SickbayTypes,
  LRCommTypes,
  ThxTypes,
  ExternalsTypes,
  ViewscreenTypes,
  TaskTypes
);
