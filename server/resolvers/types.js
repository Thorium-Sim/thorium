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
import { IsochipsTypes } from "./isochips";
import { TacticalMapTypes } from "./tacticalMap";
import { ExocompTypes } from "./exocomp";
import { LibraryTypes } from "./library";

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
  LibraryTypes
);
