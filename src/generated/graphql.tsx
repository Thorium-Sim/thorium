import gql from "graphql-tag.macro";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: {[key: string]: any};
  BigInt: any;
};

export type Action = {
  __typename?: "Action";
  action?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  voice?: Maybe<Scalars["String"]>;
  duration?: Maybe<Scalars["Float"]>;
};

export type ActionInput = {
  id?: Maybe<Scalars["ID"]>;
  event?: Maybe<Scalars["String"]>;
  args?: Maybe<Scalars["String"]>;
  delay?: Maybe<Scalars["Int"]>;
  noCancelOnReset?: Maybe<Scalars["Boolean"]>;
  needsConfig?: Maybe<Scalars["Boolean"]>;
};

export type Ambiance = {
  __typename?: "Ambiance";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  asset?: Maybe<Scalars["String"]>;
  volume?: Maybe<Scalars["Float"]>;
  channel?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  playbackRate?: Maybe<Scalars["Float"]>;
};

export type AmbianceInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  asset?: Maybe<Scalars["String"]>;
  volume?: Maybe<Scalars["Float"]>;
  channel?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  playbackRate?: Maybe<Scalars["Float"]>;
};

export type AppearanceComponent = {
  __typename?: "AppearanceComponent";
  meshType?: Maybe<MeshTypeEnum>;
  modelAsset?: Maybe<Scalars["String"]>;
  materialMapAsset?: Maybe<Scalars["String"]>;
  color?: Maybe<Scalars["String"]>;
  scale?: Maybe<Scalars["Float"]>;
};

export type Asset = {
  __typename?: "Asset";
  assetKey?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type AssetFolder = {
  __typename?: "AssetFolder";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  folderPath?: Maybe<Scalars["String"]>;
  fullPath?: Maybe<Scalars["String"]>;
  objects?: Maybe<Array<Maybe<AssetObject>>>;
};

export type AssetObject = {
  __typename?: "AssetObject";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  folderPath?: Maybe<Scalars["String"]>;
  fullPath?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type BehaviorComponent = {
  __typename?: "BehaviorComponent";
  behavior: Behaviors;
  targetId?: Maybe<Scalars["ID"]>;
  destination?: Maybe<EntityCoordinates>;
};

export enum Behaviors {
  HoldPosition = "holdPosition",
  Wander = "wander",
  Follow = "follow",
  Avoid = "avoid",
  Attack = "attack",
}

export type Card = {
  __typename?: "Card";
  name?: Maybe<Scalars["String"]>;
  component?: Maybe<Scalars["String"]>;
  hidden?: Maybe<Scalars["Boolean"]>;
  assigned?: Maybe<Scalars["Boolean"]>;
  newStation?: Maybe<Scalars["Boolean"]>;
};

export type CardInput = {
  name?: Maybe<Scalars["String"]>;
  component?: Maybe<Scalars["String"]>;
};

export enum ChannelModeMessageType {
  Allsoundoff = "allsoundoff",
  Resetallcontrollers = "resetallcontrollers",
  Localcontroloff = "localcontroloff",
  Localcontrolon = "localcontrolon",
  Allnotesoff = "allnotesoff",
  Omnimodeoff = "omnimodeoff",
  Omnimodeon = "omnimodeon",
  Monomodeon = "monomodeon",
  Polymodeon = "polymodeon",
}

export type Chart = {
  __typename?: "Chart";
  id?: Maybe<Scalars["ID"]>;
  admitTime?: Maybe<Scalars["String"]>;
  dischargeTime?: Maybe<Scalars["String"]>;
  bloodPressure?: Maybe<Scalars["String"]>;
  heartRate?: Maybe<Scalars["Float"]>;
  temperature?: Maybe<Scalars["Float"]>;
  o2levels?: Maybe<Scalars["Float"]>;
  symptoms?: Maybe<Array<Maybe<Scalars["String"]>>>;
  diagnosis?: Maybe<Array<Maybe<Scalars["String"]>>>;
  treatment?: Maybe<Scalars["String"]>;
  treatmentRequest?: Maybe<Scalars["Boolean"]>;
  painPoints?: Maybe<Array<Maybe<PainPoint>>>;
};

export type ChartInput = {
  id?: Maybe<Scalars["ID"]>;
  admitTime?: Maybe<Scalars["String"]>;
  dischargeTime?: Maybe<Scalars["String"]>;
  bloodPressure?: Maybe<Scalars["String"]>;
  heartRate?: Maybe<Scalars["Float"]>;
  temperature?: Maybe<Scalars["Float"]>;
  o2levels?: Maybe<Scalars["Float"]>;
  symptoms?: Maybe<Array<Maybe<Scalars["String"]>>>;
  treatment?: Maybe<Scalars["String"]>;
  treatmentRequest?: Maybe<Scalars["Boolean"]>;
  painPoints?: Maybe<Array<Maybe<PainPointInput>>>;
};

export type Client = {
  __typename?: "Client";
  id: Scalars["ID"];
  label?: Maybe<Scalars["String"]>;
  connected?: Maybe<Scalars["Boolean"]>;
  flight?: Maybe<Flight>;
  simulator?: Maybe<Simulator>;
  station?: Maybe<Station>;
  loginName?: Maybe<Scalars["String"]>;
  loginState?: Maybe<Scalars["String"]>;
  ping?: Maybe<Scalars["String"]>;
  offlineState?: Maybe<Scalars["String"]>;
  movie?: Maybe<Scalars["String"]>;
  training?: Maybe<Scalars["Boolean"]>;
  soundPlayer?: Maybe<Scalars["Boolean"]>;
  caches?: Maybe<Array<Maybe<Scalars["String"]>>>;
  hypercard?: Maybe<Scalars["String"]>;
  overlay?: Maybe<Scalars["Boolean"]>;
  cracked?: Maybe<Scalars["Boolean"]>;
  commandLineOutput?: Maybe<Array<Maybe<Scalars["String"]>>>;
  commandLineFeedback?: Maybe<Array<Maybe<CommandLineFeedback>>>;
  currentCard?: Maybe<Card>;
  token?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  mobile?: Maybe<Scalars["Boolean"]>;
  cards?: Maybe<Array<Maybe<Scalars["String"]>>>;
  keypad?: Maybe<Keypad>;
};

export type CommandLine = {
  __typename?: "CommandLine";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  commands?: Maybe<Array<Maybe<CommandLineCommand>>>;
  components?: Maybe<Scalars["JSON"]>;
  connections?: Maybe<Scalars["JSON"]>;
  values?: Maybe<Scalars["JSON"]>;
  config?: Maybe<Scalars["JSON"]>;
};

export type CommandLineCommand = {
  __typename?: "CommandLineCommand";
  name?: Maybe<Scalars["String"]>;
  help?: Maybe<Scalars["String"]>;
  hidden?: Maybe<Scalars["Boolean"]>;
};

export type CommandLineFeedback = {
  __typename?: "CommandLineFeedback";
  id?: Maybe<Scalars["ID"]>;
  clientId?: Maybe<Scalars["ID"]>;
  command?: Maybe<Scalars["String"]>;
  approve?: Maybe<Scalars["String"]>;
  deny?: Maybe<Scalars["String"]>;
  triggers?: Maybe<Array<Maybe<TimelineItem>>>;
};

export type CommArrow = {
  __typename?: "CommArrow";
  id?: Maybe<Scalars["ID"]>;
  signal?: Maybe<Scalars["ID"]>;
  frequency?: Maybe<Scalars["Float"]>;
  connected?: Maybe<Scalars["Boolean"]>;
  muted?: Maybe<Scalars["Boolean"]>;
};

export type CommArrowExtended = {
  __typename?: "CommArrowExtended";
  id?: Maybe<Scalars["ID"]>;
  signal?: Maybe<Scalars["ID"]>;
  range?: Maybe<Scalars["String"]>;
  frequency?: Maybe<Scalars["Float"]>;
  connected?: Maybe<Scalars["Boolean"]>;
};

export type CommArrowInput = {
  id?: Maybe<Scalars["ID"]>;
  signal?: Maybe<Scalars["ID"]>;
  frequency?: Maybe<Scalars["Float"]>;
  connected?: Maybe<Scalars["Boolean"]>;
};

export type CommRange = {
  __typename?: "CommRange";
  lower?: Maybe<Scalars["Float"]>;
  upper?: Maybe<Scalars["Float"]>;
};

export type CommRanges = {
  __typename?: "CommRanges";
  military?: Maybe<CommRange>;
  commercial?: Maybe<CommRange>;
  priority?: Maybe<CommRange>;
  emergency?: Maybe<CommRange>;
};

export type CommSignal = {
  __typename?: "CommSignal";
  id?: Maybe<Scalars["ID"]>;
  image?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  range?: Maybe<CommRange>;
  color?: Maybe<Scalars["String"]>;
};

export type CommSignalExtended = {
  __typename?: "CommSignalExtended";
  id?: Maybe<Scalars["ID"]>;
  color?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  ranges?: Maybe<CommRanges>;
};

export type CommSignalInput = {
  id?: Maybe<Scalars["ID"]>;
  image?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  range?: Maybe<RangeInput>;
  color?: Maybe<Scalars["String"]>;
};

export type CommUpdateInput = {
  state?: Maybe<Scalars["String"]>;
  frequency?: Maybe<Scalars["Float"]>;
  amplitude?: Maybe<Scalars["Float"]>;
};

export type ComputerCore = {
  __typename?: "ComputerCore";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  users?: Maybe<Array<Maybe<ComputerCoreUser>>>;
  files?: Maybe<Array<Maybe<ComputerCoreFile>>>;
  virii?: Maybe<Array<Maybe<ComputerCoreVirus>>>;
  terminals?: Maybe<Array<Maybe<ComputerCoreTerminals>>>;
  history?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type ComputerCoreFile = {
  __typename?: "ComputerCoreFile";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  level?: Maybe<Scalars["Int"]>;
  corrupted?: Maybe<Scalars["Boolean"]>;
  restoring?: Maybe<Scalars["Boolean"]>;
};

export type ComputerCoreTerminals = {
  __typename?: "ComputerCoreTerminals";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  status?: Maybe<Terminal_Status>;
};

export type ComputerCoreUser = {
  __typename?: "ComputerCoreUser";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  hacker?: Maybe<Scalars["Boolean"]>;
  level?: Maybe<Scalars["Int"]>;
};

export type ComputerCoreUserInput = {
  name?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  hacker?: Maybe<Scalars["Boolean"]>;
  level?: Maybe<Scalars["Int"]>;
};

export type ComputerCoreVirus = {
  __typename?: "ComputerCoreVirus";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type Coolant = {
  __typename?: "Coolant";
  temperature?: Maybe<Scalars["Float"]>;
  quantity?: Maybe<Scalars["Float"]>;
  rate?: Maybe<Scalars["Float"]>;
};

export type CoolantRegulator = {
  __typename?: "CoolantRegulator";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  coolant?: Maybe<Coolant>;
  damage?: Maybe<Scalars["Float"]>;
};

export type CoolantTank = SystemInterface & {
  __typename?: "CoolantTank";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  coolant?: Maybe<Scalars["Float"]>;
  coolantRate?: Maybe<Scalars["Float"]>;
  damage?: Maybe<Damage>;
  power?: Maybe<Power>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
};

export type Coordinates = {
  __typename?: "Coordinates";
  x?: Maybe<Scalars["Float"]>;
  y?: Maybe<Scalars["Float"]>;
  z?: Maybe<Scalars["Float"]>;
};

export type CoordinatesInput = {
  x?: Maybe<Scalars["Float"]>;
  y?: Maybe<Scalars["Float"]>;
  z?: Maybe<Scalars["Float"]>;
};

export type CoreFeed = {
  __typename?: "CoreFeed";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  component?: Maybe<Scalars["String"]>;
  ignored?: Maybe<Scalars["Boolean"]>;
  timestamp?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  body?: Maybe<Scalars["String"]>;
  color?: Maybe<Scalars["String"]>;
};

export type CoreLayout = {
  __typename?: "CoreLayout";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  config?: Maybe<Scalars["String"]>;
};

export type CoreLayoutInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  config?: Maybe<Scalars["String"]>;
};

export type Countermeasure = {
  __typename?: "Countermeasure";
  id: Scalars["ID"];
  name: Scalars["String"];
  modules: Array<CountermeasureModule>;
  locked: Scalars["Boolean"];
  active: Scalars["Boolean"];
  building: Scalars["Boolean"];
  totalPowerUsed: Scalars["Float"];
  readyToLaunch: Scalars["Boolean"];
  powerUsage: Scalars["Float"];
  availablePower: Scalars["Float"];
  buildPercentage: Scalars["Float"];
  note: Scalars["String"];
};

export type CountermeasureConfigOptions = {
  __typename?: "CountermeasureConfigOptions";
  type: Scalars["String"];
  label: Scalars["String"];
};

export type CountermeasureModule = {
  __typename?: "CountermeasureModule";
  id: Scalars["ID"];
  name: Scalars["String"];
  description: Scalars["String"];
  powerRequirement: Scalars["Float"];
  resourceRequirements: CountermeasureResources;
  configurationOptions: Array<CountermeasureConfigOptions>;
  config: Scalars["JSON"];
  buildProgress: Scalars["Float"];
  activated: Scalars["Boolean"];
};

export type CountermeasureResources = {
  __typename?: "CountermeasureResources";
  copper: Scalars["Float"];
  titanium: Scalars["Float"];
  carbon: Scalars["Float"];
  plastic: Scalars["Float"];
  plasma: Scalars["Float"];
};

export type Countermeasures = SystemInterface & {
  __typename?: "Countermeasures";
  id: Scalars["ID"];
  simulatorId?: Maybe<Scalars["ID"]>;
  class?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  displayName: Scalars["String"];
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  damage: Damage;
  power: Power;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  materials: CountermeasureResources;
  slots: CountermeasureSlot;
  launched: Array<Countermeasure>;
};

export type CountermeasureSlot = {
  __typename?: "CountermeasureSlot";
  slot1?: Maybe<Countermeasure>;
  slot2?: Maybe<Countermeasure>;
  slot3?: Maybe<Countermeasure>;
  slot4?: Maybe<Countermeasure>;
  slot5?: Maybe<Countermeasure>;
  slot6?: Maybe<Countermeasure>;
  slot7?: Maybe<Countermeasure>;
  slot8?: Maybe<Countermeasure>;
};

export enum CountermeasureSlotEnum {
  Slot1 = "slot1",
  Slot2 = "slot2",
  Slot3 = "slot3",
  Slot4 = "slot4",
  Slot5 = "slot5",
  Slot6 = "slot6",
  Slot7 = "slot7",
  Slot8 = "slot8",
}

export type Crew = {
  __typename?: "Crew";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  gender?: Maybe<Scalars["String"]>;
  age?: Maybe<Scalars["Int"]>;
  rank?: Maybe<Scalars["String"]>;
  position?: Maybe<Scalars["String"]>;
  killed?: Maybe<Scalars["Boolean"]>;
  location?: Maybe<Deck>;
  workRoom?: Maybe<Room>;
  restRoom?: Maybe<Room>;
  inventory?: Maybe<Array<Maybe<InventoryItem>>>;
  charts?: Maybe<Array<Maybe<Chart>>>;
};

export type CrewCountInput = {
  crew?: Maybe<Scalars["ID"]>;
  count?: Maybe<Scalars["Int"]>;
};

export type CrewInput = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  gender?: Maybe<Scalars["String"]>;
  age?: Maybe<Scalars["String"]>;
  rank?: Maybe<Scalars["String"]>;
  position?: Maybe<Scalars["String"]>;
  killed?: Maybe<Scalars["Boolean"]>;
  workRoom?: Maybe<Scalars["Int"]>;
  restRoom?: Maybe<Scalars["Int"]>;
};

export type Crm = SystemInterface & {
  __typename?: "Crm";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  damage?: Maybe<Damage>;
  power?: Maybe<Power>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  password?: Maybe<Scalars["String"]>;
  activated?: Maybe<Scalars["Boolean"]>;
  fighterImage?: Maybe<Scalars["String"]>;
  fighters?: Maybe<Array<Maybe<CrmFighter>>>;
  enemies?: Maybe<Array<Maybe<CrmFighter>>>;
  fighterStrength?: Maybe<Scalars["Float"]>;
  enemyStrength?: Maybe<Scalars["Float"]>;
  fighterCount?: Maybe<Scalars["Int"]>;
  enemyCount?: Maybe<Scalars["Int"]>;
  fighterDestroyedCount?: Maybe<Scalars["Int"]>;
  enemyDestroyedCount?: Maybe<Scalars["Int"]>;
  fighterIcon?: Maybe<Scalars["String"]>;
  enemyIcon?: Maybe<Scalars["String"]>;
  attacking?: Maybe<Scalars["Boolean"]>;
  interval?: Maybe<Scalars["Float"]>;
  phasers?: Maybe<Array<Maybe<CrmPhaserShot>>>;
  torpedos?: Maybe<Array<Maybe<CrmTorpedo>>>;
};

export type CrmFighter = {
  __typename?: "CrmFighter";
  id?: Maybe<Scalars["ID"]>;
  clientId?: Maybe<Scalars["ID"]>;
  client?: Maybe<Client>;
  icon?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  speed?: Maybe<Scalars["Float"]>;
  strength?: Maybe<Scalars["Float"]>;
  attacking?: Maybe<Scalars["Boolean"]>;
  hull?: Maybe<Scalars["Float"]>;
  shield?: Maybe<Scalars["Float"]>;
  shieldRaised?: Maybe<Scalars["Boolean"]>;
  phaserLevel?: Maybe<Scalars["Float"]>;
  torpedoCount?: Maybe<Scalars["Int"]>;
  torpedoLoaded?: Maybe<Scalars["Boolean"]>;
  destroyed?: Maybe<Scalars["Boolean"]>;
  docked?: Maybe<Scalars["Boolean"]>;
  position?: Maybe<Coordinates>;
  velocity?: Maybe<Coordinates>;
  frags?: Maybe<Scalars["Int"]>;
};

export type CrmPhaserShot = {
  __typename?: "CrmPhaserShot";
  target?: Maybe<Coordinates>;
  destination?: Maybe<Coordinates>;
};

export type CrmTorpedo = {
  __typename?: "CrmTorpedo";
  id?: Maybe<Scalars["ID"]>;
  position?: Maybe<Coordinates>;
  destroyed?: Maybe<Scalars["Boolean"]>;
};

export type Damage = {
  __typename?: "Damage";
  damaged?: Maybe<Scalars["Boolean"]>;
  destroyed?: Maybe<Scalars["Boolean"]>;
  report?: Maybe<Scalars["String"]>;
  reportSteps?: Maybe<Array<Maybe<DamageReportStep>>>;
  requested?: Maybe<Scalars["Boolean"]>;
  reactivationCode?: Maybe<Scalars["String"]>;
  neededReactivationCode?: Maybe<Scalars["String"]>;
  currentStep?: Maybe<Scalars["Int"]>;
  validate?: Maybe<Scalars["Boolean"]>;
  which?: Maybe<Damage_Types>;
  taskReportDamage?: Maybe<Scalars["Boolean"]>;
};

export enum Damage_Step_Types {
  Required = "required",
  Optional = "optional",
}

export enum Damage_Types {
  Default = "default",
  Rnd = "rnd",
  Engineering = "engineering",
}

export type DamageReportStep = {
  __typename?: "DamageReportStep";
  id?: Maybe<Scalars["ID"]>;
  text?: Maybe<Scalars["String"]>;
  validate?: Maybe<Scalars["Boolean"]>;
  validated?: Maybe<Scalars["Boolean"]>;
};

export type DamageStep = {
  __typename?: "DamageStep";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  args?: Maybe<DamageStepArgs>;
};

export type DamageStepArgs = {
  __typename?: "DamageStepArgs";
  end?: Maybe<Scalars["Boolean"]>;
  cleanup?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  orders?: Maybe<Scalars["String"]>;
  room?: Maybe<Scalars["String"]>;
  preamble?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  code?: Maybe<Scalars["String"]>;
  backup?: Maybe<Scalars["String"]>;
  inventory?: Maybe<Scalars["String"]>;
  destination?: Maybe<Scalars["String"]>;
  equipment?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
  reactivate?: Maybe<Scalars["Boolean"]>;
};

export type DamageStepArgsInput = {
  end?: Maybe<Scalars["Boolean"]>;
  cleanup?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  orders?: Maybe<Scalars["String"]>;
  room?: Maybe<Scalars["String"]>;
  preamble?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  code?: Maybe<Scalars["String"]>;
  backup?: Maybe<Scalars["String"]>;
  inventory?: Maybe<Scalars["String"]>;
  destination?: Maybe<Scalars["String"]>;
  equipment?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
  reactivate?: Maybe<Scalars["Boolean"]>;
};

export type DamageStepInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  args?: Maybe<DamageStepArgsInput>;
  type?: Maybe<Damage_Step_Types>;
};

export type DamageTask = {
  __typename?: "DamageTask";
  id?: Maybe<Scalars["ID"]>;
  taskTemplate?: Maybe<TaskTemplate>;
  required?: Maybe<Scalars["Boolean"]>;
  nextSteps?: Maybe<Array<Maybe<TaskTemplate>>>;
};

export type DamageTaskInput = {
  id?: Maybe<Scalars["ID"]>;
  required?: Maybe<Scalars["Boolean"]>;
  nextSteps?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type Deck = {
  __typename?: "Deck";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  number?: Maybe<Scalars["Int"]>;
  svgPath?: Maybe<Scalars["String"]>;
  doors?: Maybe<Scalars["Boolean"]>;
  evac?: Maybe<Scalars["Boolean"]>;
  rooms?: Maybe<Array<Maybe<Room>>>;
  hallway?: Maybe<Scalars["String"]>;
  crewCount?: Maybe<Scalars["Int"]>;
  environment?: Maybe<Environment>;
};

export type DirectionInput = {
  x?: Maybe<Scalars["Float"]>;
  y?: Maybe<Scalars["Float"]>;
  z?: Maybe<Scalars["Float"]>;
};

export enum Docking_Direction {
  Unspecified = "unspecified",
  Arriving = "arriving",
  Departing = "departing",
}

export enum Docking_Types {
  Shuttlebay = "shuttlebay",
  Dockingport = "dockingport",
  Specialized = "specialized",
}

export type DockingPort = {
  __typename?: "DockingPort";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  shipName?: Maybe<Scalars["String"]>;
  type?: Maybe<Docking_Types>;
  clamps?: Maybe<Scalars["Boolean"]>;
  compress?: Maybe<Scalars["Boolean"]>;
  doors?: Maybe<Scalars["Boolean"]>;
  image?: Maybe<Scalars["String"]>;
  docked?: Maybe<Scalars["Boolean"]>;
  damage?: Maybe<Damage>;
  direction?: Maybe<Docking_Direction>;
  position?: Maybe<Coordinates>;
  deck?: Maybe<Deck>;
  inventory?: Maybe<Array<Maybe<InventoryItem>>>;
};

export type DockingPortInput = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  shipName?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  clamps?: Maybe<Scalars["Boolean"]>;
  compress?: Maybe<Scalars["Boolean"]>;
  doors?: Maybe<Scalars["Boolean"]>;
  image?: Maybe<Scalars["String"]>;
  docked?: Maybe<Scalars["Boolean"]>;
  direction?: Maybe<Docking_Direction>;
  position?: Maybe<CoordinatesInput>;
  deckId?: Maybe<Scalars["ID"]>;
};

export type Engine = SystemInterface & {
  __typename?: "Engine";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  power?: Maybe<Power>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  speeds?: Maybe<Array<Maybe<Speed>>>;
  speed?: Maybe<Scalars["Int"]>;
  previousSpeed?: Maybe<Scalars["Int"]>;
  velocity?: Maybe<Scalars["Float"]>;
  speedFactor?: Maybe<Scalars["Float"]>;
  acceleration?: Maybe<Scalars["Float"]>;
  useAcceleration?: Maybe<Scalars["Boolean"]>;
  heat?: Maybe<Scalars["Float"]>;
  damage?: Maybe<Damage>;
  on?: Maybe<Scalars["Boolean"]>;
  coolant?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
};

export type EntitiesLocationInput = {
  id: Scalars["ID"];
  position: EntityCoordinatesInput;
};

export type EntitiesPatch = Patch & {
  __typename?: "EntitiesPatch";
  op?: Maybe<OperationsEnum>;
  path?: Maybe<Array<Maybe<Scalars["JSON"]>>>;
  value?: Maybe<Scalars["JSON"]>;
  values?: Maybe<Array<Entity>>;
};

export type Entity = {
  __typename?: "Entity";
  id: Scalars["ID"];
  appearance?: Maybe<AppearanceComponent>;
  behavior?: Maybe<BehaviorComponent>;
  identity?: Maybe<IdentityComponent>;
  location?: Maybe<LocationComponent>;
};

export type EntityCoordinates = {
  __typename?: "EntityCoordinates";
  x: Scalars["BigInt"];
  y: Scalars["BigInt"];
  z: Scalars["BigInt"];
};

export type EntityCoordinatesInput = {
  x: Scalars["BigInt"];
  y: Scalars["BigInt"];
  z: Scalars["BigInt"];
};

export type EntityPatch = Patch & {
  __typename?: "EntityPatch";
  op?: Maybe<OperationsEnum>;
  path?: Maybe<Array<Maybe<Scalars["JSON"]>>>;
  value?: Maybe<Scalars["JSON"]>;
  values?: Maybe<Entity>;
};

export type Environment = {
  __typename?: "Environment";
  id?: Maybe<Scalars["ID"]>;
  oxygen?: Maybe<Scalars["Float"]>;
  nitrogen?: Maybe<Scalars["Float"]>;
  trace?: Maybe<Scalars["Float"]>;
  pressure?: Maybe<Scalars["Float"]>;
  temperature?: Maybe<Scalars["Float"]>;
  humidity?: Maybe<Scalars["Float"]>;
  gravity?: Maybe<Scalars["Float"]>;
};

export type EnvironmentInput = {
  id?: Maybe<Scalars["ID"]>;
  oxygen?: Maybe<Scalars["Float"]>;
  nitrogen?: Maybe<Scalars["Float"]>;
  trace?: Maybe<Scalars["Float"]>;
  pressure?: Maybe<Scalars["Float"]>;
  temperature?: Maybe<Scalars["Float"]>;
  humidity?: Maybe<Scalars["Float"]>;
  gravity?: Maybe<Scalars["Float"]>;
};

export type EquipmentInput = {
  id?: Maybe<Scalars["ID"]>;
  count?: Maybe<Scalars["Int"]>;
};

export type Exocomp = {
  __typename?: "Exocomp";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  class?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["String"]>;
  completion?: Maybe<Scalars["Float"]>;
  parts?: Maybe<Array<Maybe<Scalars["String"]>>>;
  destination?: Maybe<System>;
  logs?: Maybe<Array<Maybe<ExocompLog>>>;
  difficulty?: Maybe<Scalars["Float"]>;
  damage?: Maybe<Damage>;
};

export type ExocompInput = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  parts?: Maybe<Array<Maybe<Scalars["String"]>>>;
  destination?: Maybe<Scalars["ID"]>;
  upgrade?: Maybe<Scalars["Boolean"]>;
};

export type ExocompLog = {
  __typename?: "ExocompLog";
  timestamp?: Maybe<Scalars["Float"]>;
  message?: Maybe<Scalars["String"]>;
};

export type ExternalMission = {
  __typename?: "ExternalMission";
  title?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
};

export type Externals = {
  __typename?: "Externals";
  simulators?: Maybe<Array<Maybe<ExternalSimulator>>>;
  missions?: Maybe<Array<Maybe<ExternalMission>>>;
};

export type ExternalSimulator = {
  __typename?: "ExternalSimulator";
  title?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
};

export type Flight = {
  __typename?: "Flight";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
  running?: Maybe<Scalars["Boolean"]>;
  timelineStep?: Maybe<Scalars["Int"]>;
  simulators?: Maybe<Array<Maybe<Simulator>>>;
  flightType?: Maybe<Scalars["String"]>;
  transmitted?: Maybe<Scalars["Boolean"]>;
  clients?: Maybe<Array<Maybe<SpaceEdventuresClient>>>;
};

export type FlightType = {
  __typename?: "FlightType";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  flightHours?: Maybe<Scalars["Float"]>;
  classHours?: Maybe<Scalars["Float"]>;
};

export type FormFields = {
  __typename?: "FormFields";
  id?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  options?: Maybe<Array<Maybe<FormOptions>>>;
  value?: Maybe<Scalars["String"]>;
  max?: Maybe<Scalars["Int"]>;
  min?: Maybe<Scalars["Int"]>;
};

export type FormFieldsInput = {
  id?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  options?: Maybe<Array<Maybe<FormOptionsInput>>>;
  value?: Maybe<Scalars["String"]>;
  max?: Maybe<Scalars["Int"]>;
  min?: Maybe<Scalars["Int"]>;
};

export type FormOptions = {
  __typename?: "FormOptions";
  id?: Maybe<Scalars["ID"]>;
  label?: Maybe<Scalars["String"]>;
};

export type FormOptionsInput = {
  id?: Maybe<Scalars["ID"]>;
  label?: Maybe<Scalars["String"]>;
};

export type FormResults = {
  __typename?: "FormResults";
  client?: Maybe<Scalars["String"]>;
  station?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  form?: Maybe<Array<Maybe<FormFields>>>;
};

export type FormResultsInput = {
  client?: Maybe<Scalars["String"]>;
  form?: Maybe<Array<Maybe<FormFieldsInput>>>;
};

export type GoogleSheet = {
  __typename?: "GoogleSheet";
  id?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
};

export type GoogleSheetFile = {
  __typename?: "GoogleSheetFile";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type GoogleSheets = {
  __typename?: "GoogleSheets";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type GoogleSpreadsheet = {
  __typename?: "GoogleSpreadsheet";
  id?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
  sheets?: Maybe<Array<Maybe<GoogleSheet>>>;
};

export type HeatInterface = {
  heat?: Maybe<Scalars["Float"]>;
  coolant?: Maybe<Scalars["Float"]>;
};

export type History = {
  __typename?: "History";
  date?: Maybe<Scalars["String"]>;
  text?: Maybe<Scalars["String"]>;
};

export type IdentityComponent = {
  __typename?: "IdentityComponent";
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type Interface = {
  __typename?: "Interface";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  templateId?: Maybe<Scalars["ID"]>;
  deviceType?: Maybe<InterfaceDevice>;
  name?: Maybe<Scalars["String"]>;
  components?: Maybe<Scalars["JSON"]>;
  connections?: Maybe<Scalars["JSON"]>;
  values?: Maybe<Scalars["JSON"]>;
  config?: Maybe<Scalars["JSON"]>;
};

export type InterfaceDevice = {
  __typename?: "InterfaceDevice";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
  height?: Maybe<Scalars["Int"]>;
  isLandscape?: Maybe<Scalars["Boolean"]>;
};

export type InternalComm = SystemInterface & {
  __typename?: "InternalComm";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  power?: Maybe<Power>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  state?: Maybe<Scalars["String"]>;
  outgoing?: Maybe<Scalars["String"]>;
  incoming?: Maybe<Scalars["String"]>;
  damage?: Maybe<Damage>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
};

export type InventoryCount = {
  inventory?: Maybe<Scalars["ID"]>;
  count?: Maybe<Scalars["Int"]>;
};

export type InventoryCountInput = {
  id?: Maybe<Scalars["ID"]>;
  count?: Maybe<Scalars["Int"]>;
};

export type InventoryItem = {
  __typename?: "InventoryItem";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  count?: Maybe<Scalars["Int"]>;
  metadata?: Maybe<InventoryMetadata>;
  roomCount?: Maybe<Array<Maybe<RoomCount>>>;
  teamCount?: Maybe<Array<Maybe<TeamCount>>>;
};

export type InventoryItemInput = {
  simulatorId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  metadata?: Maybe<InventoryMetadataInput>;
  roomCount?: Maybe<Array<Maybe<RoomCountInput>>>;
  crewCount?: Maybe<Array<Maybe<CrewCountInput>>>;
};

export type InventoryLog = {
  __typename?: "InventoryLog";
  timestamp?: Maybe<Scalars["String"]>;
  log?: Maybe<Scalars["String"]>;
};

export type InventoryMetadata = {
  __typename?: "InventoryMetadata";
  type?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  science?: Maybe<Scalars["Boolean"]>;
  defense?: Maybe<Scalars["Boolean"]>;
};

export type InventoryMetadataInput = {
  type?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  science?: Maybe<Scalars["Boolean"]>;
  defense?: Maybe<Scalars["Boolean"]>;
};

export type Isochip = {
  __typename?: "Isochip";
  id?: Maybe<Scalars["ID"]>;
  system?: Maybe<System>;
  simulator?: Maybe<Simulator>;
  slot?: Maybe<Scalars["Int"]>;
  requiredChip?: Maybe<Scalars["Int"]>;
  chip?: Maybe<Scalars["Int"]>;
  label?: Maybe<Scalars["String"]>;
  state?: Maybe<Isochip_States>;
};

export enum Isochip_States {
  Empty = "empty",
  Diagnostic = "diagnostic",
  Nominal = "nominal",
  Invalid = "invalid",
}

export type IsochipInput = {
  system?: Maybe<Scalars["ID"]>;
  simulator?: Maybe<Scalars["ID"]>;
  slot?: Maybe<Scalars["Int"]>;
  requiredChip?: Maybe<Scalars["Int"]>;
  chip?: Maybe<Scalars["Int"]>;
  label?: Maybe<Scalars["String"]>;
};

export type JumpDrive = SystemInterface & {
  __typename?: "JumpDrive";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  power?: Maybe<Power>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  damage?: Maybe<Damage>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  sectors?: Maybe<JumpDriveSectors>;
  env?: Maybe<Scalars["Float"]>;
  activated?: Maybe<Scalars["Boolean"]>;
  stress?: Maybe<Scalars["Float"]>;
  enabled?: Maybe<Scalars["Boolean"]>;
  ringsExtended?: Maybe<Scalars["Boolean"]>;
};

export type JumpDriveSector = {
  __typename?: "JumpDriveSector";
  level?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Float"]>;
};

export type JumpDriveSectors = {
  __typename?: "JumpDriveSectors";
  fore?: Maybe<JumpDriveSector>;
  aft?: Maybe<JumpDriveSector>;
  starboard?: Maybe<JumpDriveSector>;
  port?: Maybe<JumpDriveSector>;
};

export type Keyboard = {
  __typename?: "Keyboard";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  keys?: Maybe<Array<Maybe<KeyboardKey>>>;
};

export type KeyboardKey = {
  __typename?: "KeyboardKey";
  id?: Maybe<Scalars["ID"]>;
  key?: Maybe<Scalars["String"]>;
  meta?: Maybe<Array<Maybe<Scalars["String"]>>>;
  actions?: Maybe<Array<Maybe<MacroAction>>>;
};

export type KeyboardKeyInput = {
  id?: Maybe<Scalars["ID"]>;
  key?: Maybe<Scalars["String"]>;
  meta?: Maybe<Array<Maybe<Scalars["String"]>>>;
  actions?: Maybe<Array<Maybe<ActionInput>>>;
};

export type Keypad = {
  __typename?: "Keypad";
  id?: Maybe<Scalars["ID"]>;
  label?: Maybe<Scalars["String"]>;
  code?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  enteredCode?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  codeLength?: Maybe<Scalars["Int"]>;
  giveHints?: Maybe<Scalars["Boolean"]>;
  allowedAttempts?: Maybe<Scalars["Int"]>;
  attempts?: Maybe<Scalars["Int"]>;
  locked?: Maybe<Scalars["Boolean"]>;
};

export type LibraryCategory = {
  __typename?: "LibraryCategory";
  name?: Maybe<Scalars["String"]>;
  entries?: Maybe<Array<Maybe<LibraryEntry>>>;
};

export type LibraryEntry = {
  __typename?: "LibraryEntry";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
  body?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  categories?: Maybe<Array<Maybe<Scalars["String"]>>>;
  seeAlso?: Maybe<Array<Maybe<LibraryEntry>>>;
  font?: Maybe<Scalars["String"]>;
};

export type LibraryInput = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
  body?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  categories?: Maybe<Array<Maybe<Scalars["String"]>>>;
  seeAlso?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  font?: Maybe<Scalars["String"]>;
};

export type Lighting = {
  __typename?: "Lighting";
  intensity?: Maybe<Scalars["Float"]>;
  action?: Maybe<Lighting_Action>;
  actionStrength?: Maybe<Scalars["Float"]>;
  transitionDuration?: Maybe<Scalars["Int"]>;
  useAlertColor?: Maybe<Scalars["Boolean"]>;
  color?: Maybe<Scalars["String"]>;
};

export enum Lighting_Action {
  Normal = "normal",
  Fade = "fade",
  Shake = "shake",
  Strobe = "strobe",
  Oscillate = "oscillate",
}

export type LightingInput = {
  intensity?: Maybe<Scalars["Float"]>;
  action?: Maybe<Lighting_Action>;
  actionStrength?: Maybe<Scalars["Float"]>;
  transitionDuration?: Maybe<Scalars["Int"]>;
  useAlertColor?: Maybe<Scalars["Boolean"]>;
  color?: Maybe<Scalars["String"]>;
};

export type Location = Deck | Room;

export type LocationComponent = {
  __typename?: "LocationComponent";
  position: EntityCoordinates;
  velocity: EntityCoordinates;
  acceleration: EntityCoordinates;
  rotation: Quaternion;
  rotationVelocity: EntityCoordinates;
  rotationAcceleration: EntityCoordinates;
};

export type Log = {
  __typename?: "Log";
  id?: Maybe<Scalars["ID"]>;
  clientId?: Maybe<Scalars["ID"]>;
  flightId?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  timestamp?: Maybe<Scalars["String"]>;
  log?: Maybe<Scalars["String"]>;
};

export type LogInput = {
  clientId?: Maybe<Scalars["ID"]>;
  flightId?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  timestamp?: Maybe<Scalars["String"]>;
  log?: Maybe<Scalars["String"]>;
};

export type LongRangeCommInput = {
  id?: Maybe<Scalars["ID"]>;
  interception?: Maybe<Scalars["Boolean"]>;
  locked?: Maybe<Scalars["Boolean"]>;
  decoded?: Maybe<Scalars["Boolean"]>;
};

export type LrCommunications = SystemInterface & {
  __typename?: "LRCommunications";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  power?: Maybe<Power>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  damage?: Maybe<Damage>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  messages?: Maybe<Array<Maybe<LrMessage>>>;
  satellites?: Maybe<Scalars["Int"]>;
  interception?: Maybe<Scalars["Boolean"]>;
  locked?: Maybe<Scalars["Boolean"]>;
  decoded?: Maybe<Scalars["Boolean"]>;
  difficulty?: Maybe<Scalars["Int"]>;
  presetMessages?: Maybe<Array<Maybe<PresetAnswer>>>;
};

export type LrCommunicationsMessagesArgs = {
  crew?: Maybe<Scalars["Boolean"]>;
  sent?: Maybe<Scalars["Boolean"]>;
  approved?: Maybe<Scalars["Boolean"]>;
};

export type LrMessage = {
  __typename?: "LRMessage";
  id?: Maybe<Scalars["ID"]>;
  message?: Maybe<Scalars["String"]>;
  decodedMessage?: Maybe<Scalars["String"]>;
  crew?: Maybe<Scalars["Boolean"]>;
  sent?: Maybe<Scalars["Boolean"]>;
  deleted?: Maybe<Scalars["Boolean"]>;
  encrypted?: Maybe<Scalars["Boolean"]>;
  approved?: Maybe<Scalars["Boolean"]>;
  sender?: Maybe<Scalars["String"]>;
  datestamp?: Maybe<Scalars["String"]>;
  timestamp?: Maybe<Scalars["String"]>;
  a?: Maybe<Scalars["Int"]>;
  f?: Maybe<Scalars["Int"]>;
  ra?: Maybe<Scalars["Int"]>;
  rf?: Maybe<Scalars["Int"]>;
};

export type Macro = {
  __typename?: "Macro";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  actions?: Maybe<Array<Maybe<MacroAction>>>;
};

export type MacroAction = {
  __typename?: "MacroAction";
  id?: Maybe<Scalars["ID"]>;
  event?: Maybe<Scalars["String"]>;
  args?: Maybe<Scalars["String"]>;
  delay?: Maybe<Scalars["Int"]>;
  needsConfig?: Maybe<Scalars["String"]>;
  noCancelOnReset?: Maybe<Scalars["Boolean"]>;
};

export type MacroButton = {
  __typename?: "MacroButton";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  actions?: Maybe<Array<Maybe<MacroAction>>>;
  color?: Maybe<NotifyColors>;
  category?: Maybe<Scalars["String"]>;
};

export type MacroButtonConfig = {
  __typename?: "MacroButtonConfig";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  buttons?: Maybe<Array<Maybe<MacroButton>>>;
};

export type MacroInput = {
  stepId?: Maybe<Scalars["ID"]>;
  event?: Maybe<Scalars["String"]>;
  args?: Maybe<Scalars["String"]>;
  delay?: Maybe<Scalars["Int"]>;
  noCancelOnReset?: Maybe<Scalars["Boolean"]>;
};

export enum MeshTypeEnum {
  Sphere = "sphere",
  Cube = "cube",
  Model = "model",
  Sprite = "sprite",
}

export type Message = {
  __typename?: "Message";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  destination?: Maybe<Scalars["String"]>;
  sender?: Maybe<Scalars["String"]>;
  timestamp?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
};

export type MessageInput = {
  simulatorId?: Maybe<Scalars["ID"]>;
  destination?: Maybe<Scalars["String"]>;
  sender?: Maybe<Scalars["String"]>;
  timestamp?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
};

export enum MidiActionMode {
  Macro = "macro",
  MomentaryMacro = "momentaryMacro",
  Toggle = "toggle",
  ValueAssignment = "valueAssignment",
}

export type MidiControl = {
  __typename?: "MidiControl";
  id?: Maybe<Scalars["ID"]>;
  channel?: Maybe<Scalars["Int"]>;
  messageType?: Maybe<MidiMessageType>;
  key?: Maybe<Scalars["Int"]>;
  controllerNumber?: Maybe<Scalars["Int"]>;
  channelModeMessage?: Maybe<ChannelModeMessageType>;
  actionMode?: Maybe<MidiActionMode>;
  config?: Maybe<Scalars["JSON"]>;
};

export type MidiControlInput = {
  channel?: Maybe<Scalars["Int"]>;
  messageType?: Maybe<MidiMessageType>;
  key?: Maybe<Scalars["Int"]>;
  controllerNumber?: Maybe<Scalars["Int"]>;
  channelModeMessage?: Maybe<ChannelModeMessageType>;
  actionMode?: Maybe<MidiActionMode>;
  config?: Maybe<Scalars["JSON"]>;
};

export enum MidiMessageType {
  Noteoff = "noteoff",
  Noteon = "noteon",
  Keypressure = "keypressure",
  Controlchange = "controlchange",
  Programchange = "programchange",
  Channelpressure = "channelpressure",
  Pitchbendchange = "pitchbendchange",
}

export type MidiSet = {
  __typename?: "MidiSet";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  deviceName?: Maybe<Scalars["String"]>;
  controls?: Maybe<Array<Maybe<MidiControl>>>;
};

export type Mission = {
  __typename?: "Mission";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  timeline?: Maybe<Array<Maybe<TimelineStep>>>;
  simulators?: Maybe<Array<Maybe<Simulator>>>;
  aux?: Maybe<Scalars["Boolean"]>;
};

export type Motu = {
  __typename?: "Motu";
  id?: Maybe<Scalars["ID"]>;
  offline?: Maybe<Scalars["Boolean"]>;
  address?: Maybe<Scalars["String"]>;
  inputs?: Maybe<Array<Maybe<MotuInput>>>;
  outputs?: Maybe<Array<Maybe<MotuOutput>>>;
  sends?: Maybe<Array<Maybe<MotuPatch>>>;
};

export type MotuChannel = {
  __typename?: "MotuChannel";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  chan?: Maybe<Scalars["Int"]>;
  type?: Maybe<MotuType>;
  fader?: Maybe<Scalars["Float"]>;
  mute?: Maybe<Scalars["Int"]>;
};

export type MotuChannelInput = {
  fader?: Maybe<Scalars["Float"]>;
  mute?: Maybe<Scalars["Int"]>;
};

export type MotuComp = {
  __typename?: "MotuComp";
  enable?: Maybe<Scalars["Float"]>;
  release?: Maybe<Scalars["Float"]>;
  makeup?: Maybe<Scalars["Float"]>;
  trim?: Maybe<Scalars["Float"]>;
  peak?: Maybe<Scalars["Float"]>;
  attack?: Maybe<Scalars["Float"]>;
  ratio?: Maybe<Scalars["Float"]>;
  threshold?: Maybe<Scalars["Float"]>;
};

export type MotuEq = {
  __typename?: "MotuEQ";
  enable?: Maybe<Scalars["Int"]>;
  freq?: Maybe<Scalars["Float"]>;
  gain?: Maybe<Scalars["Float"]>;
  bw?: Maybe<Scalars["Float"]>;
  mode?: Maybe<Scalars["Int"]>;
};

export type MotuGate = {
  __typename?: "MotuGate";
  release?: Maybe<Scalars["Float"]>;
  enable?: Maybe<Scalars["Int"]>;
  attack?: Maybe<Scalars["Float"]>;
  threshold?: Maybe<Scalars["Float"]>;
};

export type MotuInput = {
  __typename?: "MotuInput";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  chan?: Maybe<Scalars["Int"]>;
  type?: Maybe<MotuType>;
  gate?: Maybe<MotuGate>;
  comp?: Maybe<MotuComp>;
  fader?: Maybe<Scalars["Float"]>;
  mute?: Maybe<Scalars["Int"]>;
  pan?: Maybe<Scalars["Float"]>;
  highshelf?: Maybe<MotuEq>;
  mid1?: Maybe<MotuEq>;
  mid2?: Maybe<MotuEq>;
  lowshelf?: Maybe<MotuEq>;
};

export type MotuOutput = {
  __typename?: "MotuOutput";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  chan?: Maybe<Scalars["Int"]>;
  type?: Maybe<MotuType>;
  prefader?: Maybe<Scalars["Float"]>;
  fader?: Maybe<Scalars["Float"]>;
  mute?: Maybe<Scalars["Int"]>;
  panner?: Maybe<Scalars["Float"]>;
  highshelf?: Maybe<MotuEq>;
  mid1?: Maybe<MotuEq>;
  mid2?: Maybe<MotuEq>;
  lowshelf?: Maybe<MotuEq>;
};

export type MotuPatch = {
  __typename?: "MotuPatch";
  input?: Maybe<MotuInput>;
  output?: Maybe<MotuOutput>;
  send?: Maybe<Scalars["Float"]>;
  mute?: Maybe<Scalars["Boolean"]>;
};

export enum MotuType {
  Chan = "chan",
  Aux = "aux",
  Group = "group",
}

export type Mutation = {
  __typename?: "Mutation";
  _empty?: Maybe<Scalars["String"]>;
  entitySetAppearance?: Maybe<Scalars["String"]>;
  entityRemoveAppearance?: Maybe<Scalars["String"]>;
  entitySetBehavior?: Maybe<Scalars["String"]>;
  entityRemoveBehavior?: Maybe<Scalars["String"]>;
  entitySetIdentity?: Maybe<Scalars["String"]>;
  entityRemoveIdentity?: Maybe<Scalars["String"]>;
  entitySetLocation?: Maybe<Scalars["String"]>;
  entitiesSetPosition?: Maybe<Scalars["String"]>;
  entityRemoveLocation?: Maybe<Scalars["String"]>;
  triggerAction?: Maybe<Scalars["String"]>;
  addSimulatorAmbiance?: Maybe<Scalars["String"]>;
  updateSimulatorAmbiance?: Maybe<Scalars["String"]>;
  removeSimulatorAmbiance?: Maybe<Scalars["String"]>;
  setStationAmbiance?: Maybe<Scalars["String"]>;
  addAssetFolder?: Maybe<Scalars["String"]>;
  removeAssetFolder?: Maybe<Scalars["String"]>;
  removeAssetObject?: Maybe<Scalars["String"]>;
  downloadRemoteAssets?: Maybe<Scalars["String"]>;
  clientConnect?: Maybe<Scalars["String"]>;
  clientDisconnect?: Maybe<Scalars["String"]>;
  clientPing?: Maybe<Scalars["String"]>;
  clientSetFlight?: Maybe<Scalars["String"]>;
  clientSetSimulator?: Maybe<Scalars["String"]>;
  clientSetStation?: Maybe<Scalars["String"]>;
  clientLogin?: Maybe<Scalars["String"]>;
  clientSetEmail?: Maybe<Scalars["String"]>;
  clientLogout?: Maybe<Scalars["String"]>;
  clientDiagnostic?: Maybe<Scalars["String"]>;
  clientReset?: Maybe<Scalars["String"]>;
  clientLockScreen?: Maybe<Scalars["String"]>;
  clientUnlockScreen?: Maybe<Scalars["String"]>;
  clientOfflineState?: Maybe<Scalars["String"]>;
  clientMovieState?: Maybe<Scalars["String"]>;
  clientSetTraining?: Maybe<Scalars["String"]>;
  clientSetSoundPlayer?: Maybe<Scalars["String"]>;
  clientAddCache?: Maybe<Scalars["String"]>;
  clientRemoveCache?: Maybe<Scalars["String"]>;
  setClientHypercard?: Maybe<Scalars["String"]>;
  playSound?: Maybe<Scalars["String"]>;
  stopAllSounds?: Maybe<Scalars["String"]>;
  cancelLoopingSounds?: Maybe<Scalars["String"]>;
  applyClientSet?: Maybe<Scalars["String"]>;
  setClientOverlay?: Maybe<Scalars["String"]>;
  clientCrack?: Maybe<Scalars["String"]>;
  clientSetCard?: Maybe<Scalars["String"]>;
  setKeypadCode?: Maybe<Scalars["String"]>;
  setKeypadEnteredCode?: Maybe<Scalars["String"]>;
  setKeypadHint?: Maybe<Scalars["String"]>;
  setKeypadLocked?: Maybe<Scalars["String"]>;
  resetKeypad?: Maybe<Scalars["String"]>;
  setCodeLength?: Maybe<Scalars["String"]>;
  setKeypadAllowedAttempts?: Maybe<Scalars["String"]>;
  handheldScannerScan?: Maybe<Scalars["String"]>;
  handheldScannerCancel?: Maybe<Scalars["String"]>;
  handheldScannerResponse?: Maybe<Scalars["String"]>;
  addCommandLine?: Maybe<Scalars["String"]>;
  renameCommandLine?: Maybe<Scalars["String"]>;
  removeCommandLine?: Maybe<Scalars["String"]>;
  updateCommandLine?: Maybe<Scalars["String"]>;
  executeCommandLine?: Maybe<Scalars["String"]>;
  addCommandLineToSimulator?: Maybe<Scalars["String"]>;
  removeCommandLineFromSimulator?: Maybe<Scalars["String"]>;
  addCommandLineOutput?: Maybe<Scalars["String"]>;
  handleCommandLineFeedback?: Maybe<Scalars["String"]>;
  addComputerCoreUser?: Maybe<ComputerCoreUser>;
  updateComputerCoreUser?: Maybe<Scalars["String"]>;
  removeComputerCoreUser?: Maybe<Scalars["String"]>;
  restoreComputerCoreFile?: Maybe<Scalars["String"]>;
  deleteComputerCoreVirus?: Maybe<Scalars["String"]>;
  restartComputerCoreTerminal?: Maybe<Scalars["String"]>;
  addViriiToComputerCore?: Maybe<Scalars["String"]>;
  setCoolantTank?: Maybe<Scalars["String"]>;
  transferCoolant?: Maybe<Scalars["String"]>;
  ignoreCoreFeed?: Maybe<Scalars["String"]>;
  syncTimer?: Maybe<Scalars["String"]>;
  updateCoreLayout?: Maybe<Scalars["String"]>;
  addCoreLayout?: Maybe<Scalars["String"]>;
  removeCoreLayout?: Maybe<Scalars["String"]>;
  reorderCoreLayouts?: Maybe<Scalars["String"]>;
  addCrewmember?: Maybe<Scalars["String"]>;
  removeCrewmember?: Maybe<Scalars["String"]>;
  updateCrewmember?: Maybe<Scalars["String"]>;
  newRandomCrewmember?: Maybe<Scalars["String"]>;
  removeAllCrew?: Maybe<Scalars["String"]>;
  crewImport?: Maybe<Scalars["String"]>;
  crmSetActivated?: Maybe<Scalars["String"]>;
  crmSetPassword?: Maybe<Scalars["String"]>;
  crmAddEnemy?: Maybe<Scalars["String"]>;
  crmSetAcceleration?: Maybe<Scalars["String"]>;
  crmSetPhaserCharge?: Maybe<Scalars["String"]>;
  crmSetShieldState?: Maybe<Scalars["String"]>;
  crmLoadTorpedo?: Maybe<Scalars["String"]>;
  crmFireTorpedo?: Maybe<Scalars["String"]>;
  crmFirePhaser?: Maybe<Scalars["String"]>;
  crmStopPhaser?: Maybe<Scalars["String"]>;
  crmSetFighterDocked?: Maybe<Scalars["String"]>;
  crmRestockTorpedos?: Maybe<Scalars["String"]>;
  crmSetAttacking?: Maybe<Scalars["String"]>;
  crmSetFighterImage?: Maybe<Scalars["String"]>;
  crmSetFighterIcon?: Maybe<Scalars["String"]>;
  crmSetEnemyIcon?: Maybe<Scalars["String"]>;
  crmSetEnemyCount?: Maybe<Scalars["String"]>;
  crmRestoreFighter?: Maybe<Scalars["String"]>;
  crmDestroyUndockedFighters?: Maybe<Scalars["String"]>;
  crmRestoreFighters?: Maybe<Scalars["String"]>;
  crmSetFighterStrength?: Maybe<Scalars["String"]>;
  crmSetEnemyStrength?: Maybe<Scalars["String"]>;
  damageSystem?: Maybe<Scalars["String"]>;
  damageReport?: Maybe<Scalars["String"]>;
  updateCurrentDamageStep?: Maybe<Scalars["String"]>;
  repairSystem?: Maybe<Scalars["String"]>;
  requestDamageReport?: Maybe<Scalars["String"]>;
  systemReactivationCode?: Maybe<Scalars["String"]>;
  systemReactivationCodeResponse?: Maybe<Scalars["String"]>;
  addSystemDamageStep?: Maybe<Scalars["String"]>;
  updateSystemDamageStep?: Maybe<Scalars["String"]>;
  removeSystemDamageStep?: Maybe<Scalars["String"]>;
  generateDamageReport?: Maybe<Scalars["String"]>;
  addSystemDamageTask?: Maybe<Scalars["String"]>;
  removeSystemDamageTask?: Maybe<Scalars["String"]>;
  updateSystemDamageTask?: Maybe<Scalars["String"]>;
  breakSystem?: Maybe<Scalars["String"]>;
  fixSystem?: Maybe<Scalars["String"]>;
  setDamageStepValidation?: Maybe<Scalars["String"]>;
  validateDamageStep?: Maybe<Scalars["String"]>;
  addSimulatorDamageStep?: Maybe<Scalars["String"]>;
  updateSimulatorDamageStep?: Maybe<Scalars["String"]>;
  removeSimulatorDamageStep?: Maybe<Scalars["String"]>;
  addSimulatorDamageTask?: Maybe<Scalars["String"]>;
  removeSimulatorDamageTask?: Maybe<Scalars["String"]>;
  updateSimulatorDamageTask?: Maybe<Scalars["String"]>;
  addDeck?: Maybe<Scalars["String"]>;
  removeDeck?: Maybe<Scalars["String"]>;
  addDecksBulk?: Maybe<Scalars["String"]>;
  updateDeckSvg?: Maybe<Scalars["String"]>;
  deckDoors?: Maybe<Scalars["String"]>;
  deckEvac?: Maybe<Scalars["String"]>;
  updateHallwaySvg?: Maybe<Scalars["String"]>;
  createDockingPort?: Maybe<Scalars["String"]>;
  updateDockingPort?: Maybe<Scalars["String"]>;
  removeDockingPort?: Maybe<Scalars["String"]>;
  addSpeed?: Maybe<Scalars["String"]>;
  setSpeed?: Maybe<Scalars["String"]>;
  setEngineSpeeds?: Maybe<Scalars["String"]>;
  addHeat?: Maybe<Scalars["String"]>;
  addCoolant?: Maybe<Scalars["String"]>;
  setHeatRate?: Maybe<Scalars["String"]>;
  engineCool?: Maybe<Scalars["String"]>;
  setEngineAcceleration?: Maybe<Scalars["String"]>;
  setEngineUseAcceleration?: Maybe<Scalars["String"]>;
  setEngineSpeedFactor?: Maybe<Scalars["String"]>;
  updateEnvironment?: Maybe<Scalars["String"]>;
  setSimulatorExocomps?: Maybe<Scalars["String"]>;
  deployExocomp?: Maybe<Scalars["String"]>;
  recallExocomp?: Maybe<Scalars["String"]>;
  exocompCompleteUpgrade?: Maybe<Scalars["String"]>;
  updateExocompDifficulty?: Maybe<Scalars["String"]>;
  importSimulatorFromUrl?: Maybe<Scalars["String"]>;
  importMissionFromUrl?: Maybe<Scalars["String"]>;
  startFlight?: Maybe<Scalars["String"]>;
  resetFlight?: Maybe<Scalars["String"]>;
  deleteFlight?: Maybe<Scalars["String"]>;
  pauseFlight?: Maybe<Scalars["String"]>;
  resumeFlight?: Maybe<Scalars["String"]>;
  clientAddExtra?: Maybe<Scalars["String"]>;
  googleSheetsAuthorize?: Maybe<Scalars["String"]>;
  googleSheetsCompleteAuthorize?: Maybe<Scalars["String"]>;
  googleSheetsRevoke?: Maybe<Scalars["String"]>;
  googleSheetsFileSearch?: Maybe<Array<Maybe<GoogleSheetFile>>>;
  googleSheetsAppendData?: Maybe<Scalars["String"]>;
  addInterface?: Maybe<Scalars["String"]>;
  renameInterface?: Maybe<Scalars["String"]>;
  removeInterface?: Maybe<Scalars["String"]>;
  updateInterface?: Maybe<Scalars["String"]>;
  addInterfaceToSimulator?: Maybe<Scalars["String"]>;
  removeInterfaceFromSimulator?: Maybe<Scalars["String"]>;
  addInterfaceDevice?: Maybe<Scalars["String"]>;
  renameInterfaceDevice?: Maybe<Scalars["String"]>;
  removeInterfaceDevice?: Maybe<Scalars["String"]>;
  updateInterfaceDevice?: Maybe<Scalars["String"]>;
  triggerInterfaceObject?: Maybe<Scalars["String"]>;
  toggleInterfaceObjectHidden?: Maybe<Scalars["String"]>;
  toggleInterfaceObjectPlaying?: Maybe<Scalars["String"]>;
  internalCommConnectOutgoing?: Maybe<Scalars["String"]>;
  internalCommConnectIncoming?: Maybe<Scalars["String"]>;
  internalCommCancelIncoming?: Maybe<Scalars["String"]>;
  internalCommCancelOutgoing?: Maybe<Scalars["String"]>;
  internalCommCallIncoming?: Maybe<Scalars["String"]>;
  internalCommCallOutgoing?: Maybe<Scalars["String"]>;
  addInventory?: Maybe<Scalars["String"]>;
  removeInventory?: Maybe<Scalars["String"]>;
  moveInventory?: Maybe<Scalars["String"]>;
  updateInventoryCount?: Maybe<Scalars["String"]>;
  updateInventoryMetadata?: Maybe<Scalars["String"]>;
  updateCrewInventory?: Maybe<Scalars["String"]>;
  removeCrewInventory?: Maybe<Scalars["String"]>;
  transferCargo?: Maybe<Scalars["String"]>;
  insertIsochip?: Maybe<Isochip>;
  updateIsochip?: Maybe<Isochip>;
  batchIsochipUpdate?: Maybe<Array<Maybe<Isochip>>>;
  setJumpdriveActivated?: Maybe<Scalars["String"]>;
  setJumpdriveEnvs?: Maybe<Scalars["String"]>;
  setJumpdriveSectorLevel?: Maybe<Scalars["String"]>;
  setJumpdriveSectorOffset?: Maybe<Scalars["String"]>;
  fluxJumpdriveSector?: Maybe<Scalars["String"]>;
  setJumpDriveEnabled?: Maybe<Scalars["String"]>;
  hitJumpDriveStress?: Maybe<Scalars["String"]>;
  setJumpDriveRingsExtended?: Maybe<Scalars["String"]>;
  addKeyboard?: Maybe<Scalars["String"]>;
  removeKeyboard?: Maybe<Scalars["String"]>;
  renameKeyboard?: Maybe<Scalars["String"]>;
  updateKeyboardKey?: Maybe<Scalars["String"]>;
  triggerKeyboardAction?: Maybe<Scalars["String"]>;
  addLibraryEntry?: Maybe<Scalars["String"]>;
  updateLibraryEntry?: Maybe<Scalars["String"]>;
  removeLibraryEntry?: Maybe<Scalars["String"]>;
  importLibraryEntry?: Maybe<Scalars["String"]>;
  sendLongRangeMessage?: Maybe<Scalars["String"]>;
  longRangeMessageSend?: Maybe<Scalars["String"]>;
  deleteLongRangeMessage?: Maybe<Scalars["String"]>;
  updateLongRangeDecodedMessage?: Maybe<Scalars["String"]>;
  updateLongRangeComm?: Maybe<Scalars["String"]>;
  approveLongRangeMessage?: Maybe<Scalars["String"]>;
  encryptLongRangeMessage?: Maybe<Scalars["String"]>;
  setLongRangeSatellites?: Maybe<Scalars["String"]>;
  addInterceptionSignal?: Maybe<Scalars["String"]>;
  removeInterceptionSignal?: Maybe<Scalars["String"]>;
  setInterceptionDifficulty?: Maybe<Scalars["String"]>;
  setLongRangePresetMessages?: Maybe<Scalars["String"]>;
  addMacro?: Maybe<Scalars["ID"]>;
  removeMacro?: Maybe<Scalars["String"]>;
  renameMacro?: Maybe<Scalars["String"]>;
  updateMacroActions?: Maybe<Scalars["String"]>;
  triggerMacroAction?: Maybe<Scalars["String"]>;
  addMacroButtonConfig?: Maybe<Scalars["ID"]>;
  removeMacroButtonConfig?: Maybe<Scalars["String"]>;
  renameMacroButtonConfig?: Maybe<Scalars["String"]>;
  addMacroButton?: Maybe<Scalars["String"]>;
  removeMacroButton?: Maybe<Scalars["String"]>;
  renameMacroButton?: Maybe<Scalars["String"]>;
  setMacroButtonCategory?: Maybe<Scalars["String"]>;
  setMacroButtonColor?: Maybe<Scalars["String"]>;
  updateMacroButtonActions?: Maybe<Scalars["String"]>;
  triggerMacroButton?: Maybe<Scalars["String"]>;
  toggleStationMessageGroup?: Maybe<Scalars["String"]>;
  sendMessage?: Maybe<Scalars["String"]>;
  midiSetCreate?: Maybe<MidiSet>;
  midiSetRename?: Maybe<MidiSet>;
  midiSetRemove?: Maybe<Scalars["Boolean"]>;
  midiSetControl?: Maybe<MidiSet>;
  simulatorAddMidiSet?: Maybe<Simulator>;
  simulatorRemoveMidiSet?: Maybe<Simulator>;
  createMission?: Maybe<Scalars["String"]>;
  removeMission?: Maybe<Scalars["String"]>;
  editMission?: Maybe<Scalars["String"]>;
  importMission?: Maybe<Scalars["String"]>;
  addTimelineStep?: Maybe<Scalars["ID"]>;
  removeTimelineStep?: Maybe<Scalars["String"]>;
  reorderTimelineStep?: Maybe<Scalars["String"]>;
  updateTimelineStep?: Maybe<Scalars["String"]>;
  addTimelineItemToTimelineStep?: Maybe<Scalars["String"]>;
  removeTimelineStepItem?: Maybe<Scalars["String"]>;
  updateTimelineStepItem?: Maybe<Scalars["String"]>;
  duplicateTimelineStep?: Maybe<Scalars["String"]>;
  startAuxTimeline?: Maybe<Scalars["ID"]>;
  setAuxTimelineStep?: Maybe<Scalars["String"]>;
  motuAdd?: Maybe<Scalars["String"]>;
  motuRemove?: Maybe<Scalars["String"]>;
  motuUpdateChannel?: Maybe<Scalars["String"]>;
  motuSetSendMute?: Maybe<Scalars["String"]>;
  navCalculateCourse?: Maybe<Scalars["String"]>;
  navCancelCalculation?: Maybe<Scalars["String"]>;
  navCourseResponse?: Maybe<Scalars["String"]>;
  navCourseEntry?: Maybe<Scalars["String"]>;
  navToggleCalculate?: Maybe<Scalars["String"]>;
  navSetDestinations?: Maybe<Scalars["String"]>;
  navSetDestination?: Maybe<Scalars["String"]>;
  navSetScanning?: Maybe<Scalars["String"]>;
  navSetThrusters?: Maybe<Scalars["String"]>;
  navSetPresets?: Maybe<Scalars["String"]>;
  addObjective?: Maybe<Scalars["String"]>;
  completeObjective?: Maybe<Scalars["String"]>;
  objectiveSetCrewComplete?: Maybe<Scalars["String"]>;
  addLog?: Maybe<Scalars["String"]>;
  chargePhaserBeam?: Maybe<Scalars["String"]>;
  dischargePhaserBeam?: Maybe<Scalars["String"]>;
  firePhaserBeam?: Maybe<Scalars["String"]>;
  stopPhaserBeams?: Maybe<Scalars["String"]>;
  coolPhaserBeam?: Maybe<Scalars["String"]>;
  phaserArc?: Maybe<Scalars["String"]>;
  setPhaserBeamCharge?: Maybe<Scalars["String"]>;
  setPhaserBeamHeat?: Maybe<Scalars["String"]>;
  setPhaserBeamCount?: Maybe<Scalars["String"]>;
  setPhaserHoldToCharge?: Maybe<Scalars["String"]>;
  setPhaserChargeSpeed?: Maybe<Scalars["String"]>;
  stopChargingPhasers?: Maybe<Scalars["String"]>;
  changePower?: Maybe<Scalars["String"]>;
  changeSystemPowerLevels?: Maybe<Scalars["String"]>;
  changeSystemDefaultPowerLevel?: Maybe<Scalars["String"]>;
  fluxSystemPower?: Maybe<Scalars["String"]>;
  destroyProbe?: Maybe<Scalars["String"]>;
  destroyAllProbes?: Maybe<Scalars["String"]>;
  launchProbe?: Maybe<Scalars["String"]>;
  fireProbe?: Maybe<Scalars["String"]>;
  updateProbeType?: Maybe<Scalars["String"]>;
  updateProbeEquipment?: Maybe<Scalars["String"]>;
  probeQuery?: Maybe<Scalars["String"]>;
  probeQueryResponse?: Maybe<Scalars["String"]>;
  probeProcessedData?: Maybe<Scalars["String"]>;
  setProbeTorpedo?: Maybe<Scalars["String"]>;
  setProbeCharge?: Maybe<Scalars["String"]>;
  activateProbeEmitter?: Maybe<Scalars["String"]>;
  setRailgunAmmo?: Maybe<Scalars["String"]>;
  setRailgunMaxAmmo?: Maybe<Scalars["String"]>;
  setRailgunAvailableAmmo?: Maybe<Scalars["String"]>;
  fireRailgun?: Maybe<Scalars["String"]>;
  loadRailgun?: Maybe<Scalars["String"]>;
  reactorEject?: Maybe<Scalars["String"]>;
  reactorChangeModel?: Maybe<Scalars["String"]>;
  reactorChangeOutput?: Maybe<Scalars["String"]>;
  reactorChangeEfficiency?: Maybe<Scalars["String"]>;
  reactorBatteryChargeLevel?: Maybe<Scalars["String"]>;
  reactorBatteryChargeRate?: Maybe<Scalars["String"]>;
  updateDilithiumStress?: Maybe<Scalars["String"]>;
  fluxDilithiumStress?: Maybe<Scalars["String"]>;
  setReactorEffciciencies?: Maybe<Scalars["String"]>;
  setDilithiumStressRate?: Maybe<Scalars["String"]>;
  reactorRequireBalance?: Maybe<Scalars["String"]>;
  recordsCreate?: Maybe<Scalars["String"]>;
  recordsCreateSnippet?: Maybe<Scalars["String"]>;
  recordsAddToSnippet?: Maybe<Scalars["String"]>;
  recordsRemoveFromSnippet?: Maybe<Scalars["String"]>;
  recordsDeleteRecord?: Maybe<Scalars["String"]>;
  recordsGenerateRecords?: Maybe<RecordSnippet>;
  recordsCreateOnSnippet?: Maybe<RecordSnippet>;
  recordsShowSnippet?: Maybe<RecordSnippet>;
  recordsHideSnippet?: Maybe<RecordSnippet>;
  recordTemplateCreateSnippet?: Maybe<Scalars["String"]>;
  recordTemplateAddToSnippet?: Maybe<Scalars["String"]>;
  recordTemplateDeleteSnippet?: Maybe<Scalars["String"]>;
  recordTemplateRename?: Maybe<Scalars["String"]>;
  recordTemplateUpdateRecord?: Maybe<Scalars["String"]>;
  recordTemplateRemoveFromSnippet?: Maybe<Scalars["String"]>;
  addRoom?: Maybe<Scalars["String"]>;
  removeRoom?: Maybe<Scalars["String"]>;
  addRoomsBulk?: Maybe<Scalars["String"]>;
  renameRoom?: Maybe<Scalars["String"]>;
  updateRoomRoles?: Maybe<Scalars["String"]>;
  updateRoomSvg?: Maybe<Scalars["String"]>;
  roomGas?: Maybe<Scalars["String"]>;
  importRooms?: Maybe<Scalars["String"]>;
  changeRoomDeck?: Maybe<Scalars["String"]>;
  snapshot?: Maybe<Scalars["String"]>;
  test?: Maybe<Scalars["String"]>;
  sensorScanRequest?: Maybe<Scalars["String"]>;
  sensorScanResult?: Maybe<Scalars["String"]>;
  processedData?: Maybe<Scalars["String"]>;
  sensorScanCancel?: Maybe<Scalars["String"]>;
  setPresetAnswers?: Maybe<Scalars["String"]>;
  createSensorContact?: Maybe<Scalars["String"]>;
  createSensorContacts?: Maybe<Scalars["String"]>;
  moveSensorContact?: Maybe<Scalars["String"]>;
  removeSensorContact?: Maybe<Scalars["String"]>;
  removeAllSensorContacts?: Maybe<Scalars["String"]>;
  stopAllSensorContacts?: Maybe<Scalars["String"]>;
  updateSensorContact?: Maybe<Scalars["String"]>;
  setArmyContacts?: Maybe<Scalars["String"]>;
  createSensorArmyContact?: Maybe<Scalars["String"]>;
  removeSensorArmyContact?: Maybe<Scalars["String"]>;
  updateSensorArmyContact?: Maybe<Scalars["String"]>;
  nudgeSensorContacts?: Maybe<Scalars["String"]>;
  setSensorPingMode?: Maybe<Scalars["String"]>;
  pingSensors?: Maybe<Scalars["String"]>;
  animateSensorContacact?: Maybe<Scalars["String"]>;
  setSensorsHistory?: Maybe<Scalars["String"]>;
  newSensorScan?: Maybe<Scalars["String"]>;
  updateSensorScan?: Maybe<Scalars["String"]>;
  cancelSensorScan?: Maybe<Scalars["String"]>;
  toggleSensorsAutoTarget?: Maybe<Scalars["String"]>;
  toggleSensorsAutoThrusters?: Maybe<Scalars["String"]>;
  setSensorsInterference?: Maybe<Scalars["String"]>;
  setSensorsSegment?: Maybe<Scalars["String"]>;
  setAutoMovement?: Maybe<Scalars["String"]>;
  updateSensorContacts?: Maybe<Scalars["String"]>;
  updateSensorGrid?: Maybe<Scalars["String"]>;
  destroySensorContact?: Maybe<Scalars["String"]>;
  sensorsFireProjectile?: Maybe<Scalars["String"]>;
  setSensorsDefaultHitpoints?: Maybe<Scalars["String"]>;
  setSensorsDefaultSpeed?: Maybe<Scalars["String"]>;
  setSensorsMissPercent?: Maybe<Scalars["String"]>;
  createSet?: Maybe<Scalars["String"]>;
  removeSet?: Maybe<Scalars["String"]>;
  addClientToSet?: Maybe<Scalars["String"]>;
  removeClientFromSet?: Maybe<Scalars["String"]>;
  updateSetClient?: Maybe<Scalars["String"]>;
  renameSet?: Maybe<Scalars["String"]>;
  shieldRaised?: Maybe<Scalars["String"]>;
  shieldLowered?: Maybe<Scalars["String"]>;
  shieldIntegritySet?: Maybe<Scalars["String"]>;
  shieldFrequencySet?: Maybe<Scalars["String"]>;
  shieldFrequencySetAll?: Maybe<Scalars["String"]>;
  hitShields?: Maybe<Scalars["String"]>;
  restoreShields?: Maybe<Scalars["String"]>;
  shipDockingChange?: Maybe<Scalars["String"]>;
  shipSetDocking?: Maybe<Scalars["String"]>;
  remoteAccessSendCode?: Maybe<Scalars["String"]>;
  remoteAccessUpdateCode?: Maybe<Scalars["String"]>;
  setSelfDestructTime?: Maybe<Scalars["String"]>;
  setSelfDestructCode?: Maybe<Scalars["String"]>;
  setSelfDestructAuto?: Maybe<Scalars["String"]>;
  notify?: Maybe<Scalars["String"]>;
  commAddSignal?: Maybe<Scalars["String"]>;
  commUpdateSignal?: Maybe<Scalars["String"]>;
  commUpdateSignals?: Maybe<Scalars["String"]>;
  commRemoveSignal?: Maybe<Scalars["String"]>;
  commAddArrow?: Maybe<Scalars["String"]>;
  commRemoveArrow?: Maybe<Scalars["String"]>;
  commConnectArrow?: Maybe<Scalars["String"]>;
  commDisconnectArrow?: Maybe<Scalars["String"]>;
  commUpdate?: Maybe<Scalars["String"]>;
  commHail?: Maybe<Scalars["String"]>;
  cancelHail?: Maybe<Scalars["String"]>;
  connectHail?: Maybe<Scalars["String"]>;
  addShortRangeComm?: Maybe<Scalars["String"]>;
  removeShortRangeComm?: Maybe<Scalars["String"]>;
  muteShortRangeComm?: Maybe<Scalars["String"]>;
  setSickbayBunks?: Maybe<Scalars["String"]>;
  addSickbayCrew?: Maybe<Scalars["String"]>;
  removeSickbayCrew?: Maybe<Scalars["String"]>;
  updateSickbayCrew?: Maybe<Scalars["String"]>;
  scanSickbayBunk?: Maybe<Scalars["String"]>;
  cancelSickbayBunkScan?: Maybe<Scalars["String"]>;
  sickbayBunkScanResponse?: Maybe<Scalars["String"]>;
  assignPatient?: Maybe<Scalars["String"]>;
  dischargePatient?: Maybe<Scalars["String"]>;
  startDeconProgram?: Maybe<Scalars["String"]>;
  updateDeconOffset?: Maybe<Scalars["String"]>;
  cancelDeconProgram?: Maybe<Scalars["String"]>;
  completeDeconProgram?: Maybe<Scalars["String"]>;
  setDeconAutoFinish?: Maybe<Scalars["String"]>;
  updatePatientChart?: Maybe<Scalars["String"]>;
  updateSignalJammer?: Maybe<Scalars["String"]>;
  signalJammerSignals?: Maybe<Scalars["String"]>;
  fluxSignalJammer?: Maybe<Scalars["String"]>;
  setSignalJammerSensorsInterference?: Maybe<Scalars["String"]>;
  createSimulator?: Maybe<Scalars["String"]>;
  removeSimulator?: Maybe<Scalars["String"]>;
  triggerMacros?: Maybe<Scalars["String"]>;
  autoAdvance?: Maybe<Scalars["String"]>;
  trainingMode?: Maybe<Scalars["String"]>;
  setAlertConditionLock?: Maybe<Scalars["String"]>;
  renameSimulator?: Maybe<Scalars["String"]>;
  changeSimulatorLayout?: Maybe<Scalars["String"]>;
  changeSimulatorCaps?: Maybe<Scalars["String"]>;
  changeSimulatorAlertLevel?: Maybe<Scalars["String"]>;
  hideSimulatorCard?: Maybe<Scalars["String"]>;
  unhideSimulatorCard?: Maybe<Scalars["String"]>;
  stationAssignCard?: Maybe<Scalars["String"]>;
  stationUnassignCard?: Maybe<Scalars["String"]>;
  flipSimulator?: Maybe<Scalars["String"]>;
  toggleSimulatorCardHidden?: Maybe<Scalars["String"]>;
  changeSimulatorExocomps?: Maybe<Scalars["String"]>;
  changeSimulatorBridgeCrew?: Maybe<Scalars["String"]>;
  changeSimulatorExtraPeople?: Maybe<Scalars["String"]>;
  changeSimulatorRadiation?: Maybe<Scalars["String"]>;
  setSimulatorTimelineStep?: Maybe<Scalars["String"]>;
  setSimulatorMission?: Maybe<Scalars["String"]>;
  setSimulatorMissionConfig?: Maybe<Scalars["String"]>;
  updateSimulatorPanels?: Maybe<Scalars["String"]>;
  updateSimulatorCommandLines?: Maybe<Scalars["String"]>;
  updateSimulatorTriggers?: Maybe<Scalars["String"]>;
  setSimulatorTriggersPaused?: Maybe<Scalars["String"]>;
  updateSimulatorInterfaces?: Maybe<Scalars["String"]>;
  setStepDamage?: Maybe<Scalars["String"]>;
  setVerifyDamage?: Maybe<Scalars["String"]>;
  setBridgeMessaging?: Maybe<Scalars["String"]>;
  setSimulatorAssets?: Maybe<Scalars["String"]>;
  setSimulatorSoundEffects?: Maybe<Scalars["String"]>;
  updateSimulatorLighting?: Maybe<Scalars["String"]>;
  setSimulatorHasPrinter?: Maybe<Scalars["String"]>;
  setSimulatorHasLegs?: Maybe<Scalars["String"]>;
  setSimulatorSpaceEdventuresId?: Maybe<Scalars["String"]>;
  addSimulatorStationCard?: Maybe<Scalars["String"]>;
  removeSimulatorStationCard?: Maybe<Scalars["String"]>;
  editSimulatorStationCard?: Maybe<Scalars["String"]>;
  setSimulatorStationMessageGroup?: Maybe<Scalars["String"]>;
  setSimulatorStationLogin?: Maybe<Scalars["String"]>;
  setSimulatorStationLayout?: Maybe<Scalars["String"]>;
  setSimulatorStationExecutive?: Maybe<Scalars["String"]>;
  setSimulatorStationWidget?: Maybe<Scalars["String"]>;
  createSoftwarePanel?: Maybe<Scalars["String"]>;
  updateSoftwarePanel?: Maybe<Scalars["String"]>;
  removeSoftwarePanel?: Maybe<Scalars["String"]>;
  createStationSet?: Maybe<Scalars["String"]>;
  removeStationSet?: Maybe<Scalars["String"]>;
  renameStationSet?: Maybe<Scalars["String"]>;
  setStationSetCrewCount?: Maybe<Scalars["String"]>;
  addStationToStationSet?: Maybe<Scalars["String"]>;
  removeStationFromStationSet?: Maybe<Scalars["String"]>;
  editStationInStationSet?: Maybe<Scalars["String"]>;
  addCardToStation?: Maybe<Scalars["String"]>;
  removeCardFromStation?: Maybe<Scalars["String"]>;
  editCardInStationSet?: Maybe<Scalars["String"]>;
  setStationLogin?: Maybe<Scalars["String"]>;
  setStationLayout?: Maybe<Scalars["String"]>;
  setStationExecutive?: Maybe<Scalars["String"]>;
  toggleStationWidgets?: Maybe<Scalars["String"]>;
  setStationDescription?: Maybe<Scalars["String"]>;
  setStationTraining?: Maybe<Scalars["String"]>;
  reorderStationWidgets?: Maybe<Scalars["String"]>;
  setStealthActivated?: Maybe<Scalars["String"]>;
  setStealthCharge?: Maybe<Scalars["String"]>;
  activateStealth?: Maybe<Scalars["String"]>;
  deactivateStealth?: Maybe<Scalars["String"]>;
  setStealthQuadrant?: Maybe<Scalars["String"]>;
  fluxStealthQuadrants?: Maybe<Scalars["String"]>;
  stealthChangeAlert?: Maybe<Scalars["String"]>;
  fluxSubspaceField?: Maybe<Scalars["String"]>;
  normalSubspaceField?: Maybe<Scalars["String"]>;
  setSubspaceFieldSectorValue?: Maybe<Scalars["String"]>;
  createSurveyForm?: Maybe<Scalars["String"]>;
  removeSurveyForm?: Maybe<Scalars["String"]>;
  setSurveyFormGoogleSheet?: Maybe<Scalars["String"]>;
  updateSurveyForm?: Maybe<Scalars["String"]>;
  triggerSurvey?: Maybe<Scalars["String"]>;
  surveyFormResponse?: Maybe<Scalars["String"]>;
  endSurvey?: Maybe<Scalars["String"]>;
  addSystemToSimulator?: Maybe<Scalars["String"]>;
  removeSystemFromSimulator?: Maybe<Scalars["String"]>;
  updateSystemName?: Maybe<Scalars["String"]>;
  updateSystemUpgradeMacros?: Maybe<Scalars["String"]>;
  updateSystemUpgradeBoard?: Maybe<Scalars["String"]>;
  upgradeSystem?: Maybe<Scalars["String"]>;
  updateSystemRooms?: Maybe<Scalars["String"]>;
  newTacticalMap?: Maybe<Scalars["String"]>;
  updateTacticalMap?: Maybe<Scalars["String"]>;
  freezeTacticalMap?: Maybe<Scalars["String"]>;
  duplicateTacticalMap?: Maybe<Scalars["String"]>;
  loadTacticalMap?: Maybe<Scalars["String"]>;
  removeTacticalMap?: Maybe<Scalars["String"]>;
  addTacticalMapLayer?: Maybe<Scalars["String"]>;
  updateTacticalMapLayer?: Maybe<Scalars["String"]>;
  reorderTacticalMapLayer?: Maybe<Scalars["String"]>;
  removeTacticalMapLayer?: Maybe<Scalars["String"]>;
  addTacticalMapItem?: Maybe<Scalars["String"]>;
  updateTacticalMapItem?: Maybe<Scalars["String"]>;
  removeTacticalMapItem?: Maybe<Scalars["String"]>;
  addTacticalMapPath?: Maybe<Scalars["String"]>;
  updateTacticalMapPath?: Maybe<Scalars["String"]>;
  removeTacticalMapPath?: Maybe<Scalars["String"]>;
  showViewscreenTactical?: Maybe<Scalars["String"]>;
  addTacticalMapsToFlight?: Maybe<Scalars["String"]>;
  createTargetingContact?: Maybe<Scalars["String"]>;
  targetTargetingContact?: Maybe<Scalars["String"]>;
  untargetTargetingContact?: Maybe<Scalars["String"]>;
  targetSystem?: Maybe<Scalars["String"]>;
  removeTarget?: Maybe<Scalars["String"]>;
  addTargetClass?: Maybe<Scalars["String"]>;
  removeTargetClass?: Maybe<Scalars["String"]>;
  updateTargetClass?: Maybe<Scalars["String"]>;
  setTargetClassCount?: Maybe<Scalars["String"]>;
  setCoordinateTargeting?: Maybe<Scalars["String"]>;
  setTargetingCalculatedTarget?: Maybe<Scalars["String"]>;
  setTargetingEnteredTarget?: Maybe<Scalars["String"]>;
  clearAllTargetingContacts?: Maybe<Scalars["String"]>;
  setTargetingRange?: Maybe<Scalars["String"]>;
  setTargetingClasses?: Maybe<Scalars["String"]>;
  generateTaskReport?: Maybe<Scalars["String"]>;
  clearTaskReport?: Maybe<Scalars["String"]>;
  completeTaskReport?: Maybe<Scalars["String"]>;
  verifyTaskReportStep?: Maybe<Scalars["String"]>;
  assignTaskReportStep?: Maybe<Scalars["String"]>;
  requestVerifyTaskReportStep?: Maybe<Scalars["String"]>;
  addTask?: Maybe<Scalars["String"]>;
  verifyTask?: Maybe<Scalars["String"]>;
  requestTaskVerify?: Maybe<Scalars["String"]>;
  denyTaskVerify?: Maybe<Scalars["String"]>;
  dismissVerifiedTasks?: Maybe<Scalars["String"]>;
  addTaskTemplate?: Maybe<Scalars["String"]>;
  removeTaskTemplate?: Maybe<Scalars["String"]>;
  renameTaskTemplate?: Maybe<Scalars["String"]>;
  setTaskTemplateValues?: Maybe<Scalars["String"]>;
  setTaskTemplateReportTypes?: Maybe<Scalars["String"]>;
  setTaskTemplateMacros?: Maybe<Scalars["String"]>;
  setTaskTemplatePreMacros?: Maybe<Scalars["String"]>;
  createTeam?: Maybe<Scalars["String"]>;
  updateTeam?: Maybe<Scalars["String"]>;
  addCrewToTeam?: Maybe<Scalars["String"]>;
  removeCrewFromTeam?: Maybe<Scalars["String"]>;
  removeTeam?: Maybe<Scalars["String"]>;
  _template?: Maybe<Scalars["String"]>;
  setTrackingPreference?: Maybe<Scalars["String"]>;
  importTaskTemplates?: Maybe<Scalars["String"]>;
  setSpaceEdventuresToken?: Maybe<SpaceEdventuresCenter>;
  assignSpaceEdventuresBadge?: Maybe<Scalars["String"]>;
  assignSpaceEdventuresMission?: Maybe<Scalars["String"]>;
  assignSpaceEdventuresFlightType?: Maybe<Scalars["String"]>;
  assignSpaceEdventuresFlightRecord?: Maybe<Scalars["String"]>;
  getSpaceEdventuresLogin?: Maybe<Scalars["String"]>;
  removeSpaceEdventuresClient?: Maybe<Scalars["String"]>;
  generic?: Maybe<Scalars["String"]>;
  addIssue?: Maybe<Scalars["String"]>;
  addIssueUpload?: Maybe<Scalars["String"]>;
  rotationUpdate?: Maybe<Scalars["String"]>;
  rotationSet?: Maybe<Scalars["String"]>;
  requiredRotationSet?: Maybe<Scalars["String"]>;
  directionUpdate?: Maybe<Scalars["String"]>;
  positionUpdate?: Maybe<Scalars["String"]>;
  setThrusterRotationSpeed?: Maybe<Scalars["String"]>;
  setThrusterMovementSpeed?: Maybe<Scalars["String"]>;
  chargeThx?: Maybe<Scalars["String"]>;
  lockThx?: Maybe<Scalars["String"]>;
  activateThx?: Maybe<Scalars["String"]>;
  deactivateThx?: Maybe<Scalars["String"]>;
  resetThx?: Maybe<Scalars["String"]>;
  torpedoAddWarhead?: Maybe<Scalars["String"]>;
  torpedoRemoveWarhead?: Maybe<Scalars["String"]>;
  torpedoLoadWarhead?: Maybe<Scalars["String"]>;
  torpedoSetWarheadCount?: Maybe<Scalars["String"]>;
  torpedoUnload?: Maybe<Scalars["String"]>;
  torpedoFire?: Maybe<Scalars["String"]>;
  setTractorBeamState?: Maybe<Scalars["String"]>;
  setTractorBeamTarget?: Maybe<Scalars["String"]>;
  setTractorBeamStrength?: Maybe<Scalars["String"]>;
  setTractorBeamStress?: Maybe<Scalars["String"]>;
  setTractorBeamScanning?: Maybe<Scalars["String"]>;
  setTractorBeamTargetLabel?: Maybe<Scalars["String"]>;
  addTractorTarget?: Maybe<Scalars["String"]>;
  removeTractorTarget?: Maybe<Scalars["String"]>;
  setTransportDestination?: Maybe<Scalars["String"]>;
  setTransportTarget?: Maybe<Scalars["String"]>;
  beginTransportScan?: Maybe<Scalars["String"]>;
  cancelTransportScan?: Maybe<Scalars["String"]>;
  clearTransportTargets?: Maybe<Scalars["String"]>;
  setTransportCharge?: Maybe<Scalars["String"]>;
  completeTransport?: Maybe<Scalars["String"]>;
  setTransporterTargets?: Maybe<Scalars["String"]>;
  setTransporterChargeSpeed?: Maybe<Scalars["String"]>;
  setTranswarpActive?: Maybe<Scalars["String"]>;
  fluxTranswarp?: Maybe<Scalars["String"]>;
  normalTranswarp?: Maybe<Scalars["String"]>;
  setTranswarpSectorValue?: Maybe<Scalars["String"]>;
  addTrigger?: Maybe<Scalars["String"]>;
  renameTrigger?: Maybe<Scalars["String"]>;
  removeTrigger?: Maybe<Scalars["String"]>;
  updateTrigger?: Maybe<Scalars["String"]>;
  addTriggerToSimulator?: Maybe<Scalars["String"]>;
  removeTriggerFromSimulator?: Maybe<Scalars["String"]>;
  updateViewscreenName?: Maybe<Scalars["String"]>;
  updateViewscreenSecondary?: Maybe<Scalars["String"]>;
  updateViewscreenComponent?: Maybe<Scalars["String"]>;
  updateViewscreenData?: Maybe<Scalars["String"]>;
  setViewscreenToAuto?: Maybe<Scalars["String"]>;
  setViewscreenPictureInPicture?: Maybe<Scalars["String"]>;
  removeViewscreenPictureInPicture?: Maybe<Scalars["String"]>;
  updateViewscreenAuto?: Maybe<Scalars["String"]>;
  toggleViewscreenVideo?: Maybe<Scalars["String"]>;
  countermeasuresCreateCountermeasure?: Maybe<Countermeasure>;
  countermeasuresRemoveCountermeasure?: Maybe<Scalars["String"]>;
  countermeasuresLaunchCountermeasure?: Maybe<Scalars["String"]>;
  countermeasuresActivateCountermeasure?: Maybe<Scalars["String"]>;
  countermeasuresDeactivateCountermeasure?: Maybe<Scalars["String"]>;
  countermeasuresLaunchUnlockedCountermeasures?: Maybe<Scalars["String"]>;
  countermeasuresBuildCountermeasure?: Maybe<Scalars["String"]>;
  countermeasuresAddModule?: Maybe<Countermeasure>;
  countermeasuresRemoveModule?: Maybe<Scalars["String"]>;
  countermeasuresConfigureModule?: Maybe<Scalars["String"]>;
  countermeasuresSetResource?: Maybe<Scalars["String"]>;
  countermeasuresSetFDNote?: Maybe<Scalars["String"]>;
  entityCreate: Entity;
  entityRemove?: Maybe<Scalars["String"]>;
};

export type MutationEntitySetAppearanceArgs = {
  id?: Maybe<Scalars["ID"]>;
  color?: Maybe<Scalars["String"]>;
  meshType?: Maybe<MeshTypeEnum>;
  modelAsset?: Maybe<Scalars["String"]>;
  materialMapAsset?: Maybe<Scalars["String"]>;
  scale?: Maybe<Scalars["Float"]>;
};

export type MutationEntityRemoveAppearanceArgs = {
  id: Scalars["ID"];
};

export type MutationEntitySetBehaviorArgs = {
  id: Scalars["ID"];
  behavior: Behaviors;
  targetId?: Maybe<Scalars["ID"]>;
  destination?: Maybe<EntityCoordinatesInput>;
};

export type MutationEntityRemoveBehaviorArgs = {
  id: Scalars["ID"];
};

export type MutationEntitySetIdentityArgs = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type MutationEntityRemoveIdentityArgs = {
  id: Scalars["ID"];
};

export type MutationEntitySetLocationArgs = {
  id?: Maybe<Scalars["ID"]>;
  position?: Maybe<EntityCoordinatesInput>;
  velocity?: Maybe<EntityCoordinatesInput>;
  acceleration?: Maybe<EntityCoordinatesInput>;
  rotation?: Maybe<QuaternionInput>;
  rotationVelocity?: Maybe<EntityCoordinatesInput>;
  rotationAcceleration?: Maybe<EntityCoordinatesInput>;
};

export type MutationEntitiesSetPositionArgs = {
  entities: Array<EntitiesLocationInput>;
};

export type MutationEntityRemoveLocationArgs = {
  id: Scalars["ID"];
};

export type MutationTriggerActionArgs = {
  action: Scalars["String"];
  message?: Maybe<Scalars["String"]>;
  voice?: Maybe<Scalars["String"]>;
  simulatorId: Scalars["ID"];
  stationId?: Maybe<Scalars["String"]>;
  clientId?: Maybe<Scalars["ID"]>;
  duration?: Maybe<Scalars["Float"]>;
};

export type MutationAddSimulatorAmbianceArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationUpdateSimulatorAmbianceArgs = {
  id: Scalars["ID"];
  ambiance: AmbianceInput;
};

export type MutationRemoveSimulatorAmbianceArgs = {
  id: Scalars["ID"];
  ambianceId: Scalars["ID"];
};

export type MutationSetStationAmbianceArgs = {
  stationSetID: Scalars["ID"];
  stationName: Scalars["String"];
  ambiance?: Maybe<Scalars["String"]>;
};

export type MutationAddAssetFolderArgs = {
  name: Scalars["String"];
  folderPath: Scalars["String"];
  fullPath: Scalars["String"];
};

export type MutationRemoveAssetFolderArgs = {
  fullPath: Scalars["String"];
};

export type MutationRemoveAssetObjectArgs = {
  fullPath: Scalars["String"];
};

export type MutationDownloadRemoteAssetsArgs = {
  folderPath: Scalars["String"];
  files: Array<RemoteAsset>;
};

export type MutationClientConnectArgs = {
  client: Scalars["ID"];
  label?: Maybe<Scalars["String"]>;
  mobile?: Maybe<Scalars["Boolean"]>;
  cards?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type MutationClientDisconnectArgs = {
  client: Scalars["ID"];
};

export type MutationClientPingArgs = {
  client: Scalars["ID"];
};

export type MutationClientSetFlightArgs = {
  client: Scalars["ID"];
  flightId: Scalars["ID"];
};

export type MutationClientSetSimulatorArgs = {
  client: Scalars["ID"];
  simulatorId: Scalars["ID"];
};

export type MutationClientSetStationArgs = {
  client: Scalars["ID"];
  stationName: Scalars["ID"];
};

export type MutationClientLoginArgs = {
  client: Scalars["ID"];
  loginName?: Maybe<Scalars["String"]>;
};

export type MutationClientSetEmailArgs = {
  client: Scalars["ID"];
  email: Scalars["String"];
};

export type MutationClientLogoutArgs = {
  client: Scalars["ID"];
};

export type MutationClientDiagnosticArgs = {
  client: Scalars["ID"];
};

export type MutationClientResetArgs = {
  client: Scalars["ID"];
};

export type MutationClientLockScreenArgs = {
  client: Scalars["ID"];
};

export type MutationClientUnlockScreenArgs = {
  client: Scalars["ID"];
};

export type MutationClientOfflineStateArgs = {
  client: Scalars["ID"];
  state?: Maybe<Scalars["String"]>;
};

export type MutationClientMovieStateArgs = {
  client: Scalars["ID"];
  movie: Scalars["String"];
};

export type MutationClientSetTrainingArgs = {
  client: Scalars["ID"];
  training: Scalars["Boolean"];
};

export type MutationClientSetSoundPlayerArgs = {
  client: Scalars["ID"];
  soundPlayer: Scalars["Boolean"];
};

export type MutationClientAddCacheArgs = {
  client?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  viewscreen?: Maybe<Scalars["Boolean"]>;
  cacheItem: Scalars["String"];
};

export type MutationClientRemoveCacheArgs = {
  client: Scalars["ID"];
  cacheItem: Scalars["String"];
};

export type MutationSetClientHypercardArgs = {
  clientId?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  component?: Maybe<Scalars["String"]>;
};

export type MutationPlaySoundArgs = {
  sound: SoundInput;
  station?: Maybe<Scalars["String"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  clientId?: Maybe<Scalars["String"]>;
};

export type MutationStopAllSoundsArgs = {
  simulatorId: Scalars["ID"];
  station?: Maybe<Scalars["String"]>;
};

export type MutationCancelLoopingSoundsArgs = {
  simulatorId: Scalars["ID"];
  station?: Maybe<Scalars["String"]>;
};

export type MutationApplyClientSetArgs = {
  id: Scalars["ID"];
  flightId: Scalars["ID"];
  simulatorId: Scalars["ID"];
  templateId: Scalars["ID"];
  stationSetId: Scalars["ID"];
};

export type MutationSetClientOverlayArgs = {
  id: Scalars["ID"];
  overlay: Scalars["Boolean"];
};

export type MutationClientCrackArgs = {
  id: Scalars["ID"];
  crack: Scalars["Boolean"];
};

export type MutationClientSetCardArgs = {
  id: Scalars["ID"];
  card: Scalars["String"];
};

export type MutationSetKeypadCodeArgs = {
  id: Scalars["ID"];
  code?: Maybe<Array<Maybe<Scalars["Int"]>>>;
};

export type MutationSetKeypadEnteredCodeArgs = {
  id: Scalars["ID"];
  code?: Maybe<Array<Scalars["Int"]>>;
};

export type MutationSetKeypadHintArgs = {
  id: Scalars["ID"];
  hint: Scalars["Boolean"];
};

export type MutationSetKeypadLockedArgs = {
  id: Scalars["ID"];
  locked: Scalars["Boolean"];
};

export type MutationResetKeypadArgs = {
  id: Scalars["ID"];
};

export type MutationSetCodeLengthArgs = {
  id: Scalars["ID"];
  len: Scalars["Int"];
};

export type MutationSetKeypadAllowedAttemptsArgs = {
  id: Scalars["ID"];
  attempts: Scalars["Int"];
};

export type MutationHandheldScannerScanArgs = {
  id: Scalars["ID"];
  request: Scalars["String"];
};

export type MutationHandheldScannerCancelArgs = {
  id: Scalars["ID"];
};

export type MutationHandheldScannerResponseArgs = {
  id: Scalars["ID"];
  response: Scalars["String"];
};

export type MutationAddCommandLineArgs = {
  name: Scalars["String"];
};

export type MutationRenameCommandLineArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationRemoveCommandLineArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateCommandLineArgs = {
  id: Scalars["ID"];
  components?: Maybe<Scalars["JSON"]>;
  connections?: Maybe<Scalars["JSON"]>;
  values?: Maybe<Scalars["JSON"]>;
  config?: Maybe<Scalars["JSON"]>;
};

export type MutationExecuteCommandLineArgs = {
  simulatorId: Scalars["ID"];
  command: Scalars["String"];
  arg?: Maybe<Scalars["String"]>;
};

export type MutationAddCommandLineToSimulatorArgs = {
  simulatorId: Scalars["ID"];
  commandLine: Scalars["ID"];
};

export type MutationRemoveCommandLineFromSimulatorArgs = {
  simulatorId: Scalars["ID"];
  commandLine: Scalars["ID"];
};

export type MutationAddCommandLineOutputArgs = {
  simulatorId: Scalars["ID"];
  clientId: Scalars["ID"];
  output: Scalars["String"];
};

export type MutationHandleCommandLineFeedbackArgs = {
  simulatorId: Scalars["ID"];
  clientId: Scalars["ID"];
  feedbackId: Scalars["ID"];
  ignore?: Maybe<Scalars["Boolean"]>;
  isApproved: Scalars["Boolean"];
};

export type MutationAddComputerCoreUserArgs = {
  id: Scalars["ID"];
  user?: Maybe<ComputerCoreUserInput>;
};

export type MutationUpdateComputerCoreUserArgs = {
  id: Scalars["ID"];
  userId: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  level?: Maybe<Scalars["Int"]>;
  password?: Maybe<Scalars["String"]>;
  hacker?: Maybe<Scalars["Boolean"]>;
};

export type MutationRemoveComputerCoreUserArgs = {
  id: Scalars["ID"];
  userId: Scalars["ID"];
};

export type MutationRestoreComputerCoreFileArgs = {
  id: Scalars["ID"];
  fileId?: Maybe<Scalars["ID"]>;
  all?: Maybe<Scalars["Boolean"]>;
  level?: Maybe<Scalars["Int"]>;
};

export type MutationDeleteComputerCoreVirusArgs = {
  id: Scalars["ID"];
  virusId: Scalars["ID"];
};

export type MutationRestartComputerCoreTerminalArgs = {
  id: Scalars["ID"];
  terminalId: Scalars["ID"];
};

export type MutationAddViriiToComputerCoreArgs = {
  id: Scalars["ID"];
};

export type MutationSetCoolantTankArgs = {
  id: Scalars["ID"];
  coolant: Scalars["Float"];
};

export type MutationTransferCoolantArgs = {
  coolantId: Scalars["ID"];
  systemId?: Maybe<Scalars["ID"]>;
  which?: Maybe<Scalars["String"]>;
};

export type MutationIgnoreCoreFeedArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type MutationSyncTimerArgs = {
  time?: Maybe<Scalars["String"]>;
  active?: Maybe<Scalars["Boolean"]>;
  simulatorId: Scalars["ID"];
};

export type MutationUpdateCoreLayoutArgs = {
  layout?: Maybe<CoreLayoutInput>;
};

export type MutationAddCoreLayoutArgs = {
  layout?: Maybe<CoreLayoutInput>;
};

export type MutationRemoveCoreLayoutArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type MutationReorderCoreLayoutsArgs = {
  layouts: Array<Scalars["ID"]>;
};

export type MutationAddCrewmemberArgs = {
  crew?: Maybe<CrewInput>;
};

export type MutationRemoveCrewmemberArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type MutationUpdateCrewmemberArgs = {
  crew?: Maybe<CrewInput>;
};

export type MutationNewRandomCrewmemberArgs = {
  simulatorId: Scalars["ID"];
  type?: Maybe<Scalars["String"]>;
  position?: Maybe<Scalars["String"]>;
};

export type MutationRemoveAllCrewArgs = {
  simulatorId: Scalars["ID"];
};

export type MutationCrewImportArgs = {
  simulatorId: Scalars["ID"];
  crew: Array<Maybe<CrewInput>>;
};

export type MutationCrmSetActivatedArgs = {
  id: Scalars["ID"];
  state: Scalars["Boolean"];
};

export type MutationCrmSetPasswordArgs = {
  id: Scalars["ID"];
  password: Scalars["String"];
};

export type MutationCrmAddEnemyArgs = {
  id: Scalars["ID"];
};

export type MutationCrmSetAccelerationArgs = {
  id: Scalars["ID"];
  clientId: Scalars["ID"];
  acceleration: CoordinatesInput;
};

export type MutationCrmSetPhaserChargeArgs = {
  id: Scalars["ID"];
  clientId: Scalars["ID"];
  phaser: Scalars["Float"];
};

export type MutationCrmSetShieldStateArgs = {
  id: Scalars["ID"];
  clientId: Scalars["ID"];
  shield: Scalars["Boolean"];
};

export type MutationCrmLoadTorpedoArgs = {
  id: Scalars["ID"];
  clientId: Scalars["ID"];
};

export type MutationCrmFireTorpedoArgs = {
  id: Scalars["ID"];
  clientId: Scalars["ID"];
  target: Scalars["ID"];
};

export type MutationCrmFirePhaserArgs = {
  id: Scalars["ID"];
  clientId: Scalars["ID"];
  target: Scalars["ID"];
};

export type MutationCrmStopPhaserArgs = {
  id: Scalars["ID"];
  clientId: Scalars["ID"];
};

export type MutationCrmSetFighterDockedArgs = {
  id: Scalars["ID"];
  clientId: Scalars["ID"];
  docked: Scalars["Boolean"];
};

export type MutationCrmRestockTorpedosArgs = {
  id: Scalars["ID"];
  clientId: Scalars["ID"];
};

export type MutationCrmSetAttackingArgs = {
  id: Scalars["ID"];
  attacking: Scalars["Boolean"];
};

export type MutationCrmSetFighterImageArgs = {
  id: Scalars["ID"];
  image: Scalars["String"];
};

export type MutationCrmSetFighterIconArgs = {
  id: Scalars["ID"];
  image: Scalars["String"];
};

export type MutationCrmSetEnemyIconArgs = {
  id: Scalars["ID"];
  image: Scalars["String"];
};

export type MutationCrmSetEnemyCountArgs = {
  id: Scalars["ID"];
  count: Scalars["Int"];
};

export type MutationCrmRestoreFighterArgs = {
  id: Scalars["ID"];
  clientId: Scalars["ID"];
};

export type MutationCrmDestroyUndockedFightersArgs = {
  id: Scalars["ID"];
};

export type MutationCrmRestoreFightersArgs = {
  id: Scalars["ID"];
};

export type MutationCrmSetFighterStrengthArgs = {
  id: Scalars["ID"];
  strength: Scalars["Float"];
};

export type MutationCrmSetEnemyStrengthArgs = {
  id: Scalars["ID"];
  strength: Scalars["Float"];
};

export type MutationDamageSystemArgs = {
  systemId: Scalars["ID"];
  report?: Maybe<Scalars["String"]>;
  destroyed?: Maybe<Scalars["Boolean"]>;
  which?: Maybe<Scalars["String"]>;
};

export type MutationDamageReportArgs = {
  systemId: Scalars["ID"];
  report: Scalars["String"];
};

export type MutationUpdateCurrentDamageStepArgs = {
  systemId: Scalars["ID"];
  step: Scalars["Int"];
};

export type MutationRepairSystemArgs = {
  systemId: Scalars["ID"];
};

export type MutationRequestDamageReportArgs = {
  systemId: Scalars["ID"];
};

export type MutationSystemReactivationCodeArgs = {
  systemId: Scalars["ID"];
  station: Scalars["String"];
  code: Scalars["String"];
};

export type MutationSystemReactivationCodeResponseArgs = {
  systemId: Scalars["ID"];
  response: Scalars["Boolean"];
};

export type MutationAddSystemDamageStepArgs = {
  systemId: Scalars["ID"];
  step: DamageStepInput;
};

export type MutationUpdateSystemDamageStepArgs = {
  systemId: Scalars["ID"];
  step: DamageStepInput;
};

export type MutationRemoveSystemDamageStepArgs = {
  systemId: Scalars["ID"];
  step: Scalars["ID"];
};

export type MutationGenerateDamageReportArgs = {
  systemId: Scalars["ID"];
  steps?: Maybe<Scalars["Int"]>;
};

export type MutationAddSystemDamageTaskArgs = {
  systemId: Scalars["ID"];
  task: DamageTaskInput;
};

export type MutationRemoveSystemDamageTaskArgs = {
  systemId: Scalars["ID"];
  taskId: Scalars["ID"];
};

export type MutationUpdateSystemDamageTaskArgs = {
  systemId: Scalars["ID"];
  task: DamageTaskInput;
};

export type MutationBreakSystemArgs = {
  simulatorId: Scalars["ID"];
  type: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
};

export type MutationFixSystemArgs = {
  simulatorId: Scalars["ID"];
  type: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
};

export type MutationSetDamageStepValidationArgs = {
  id: Scalars["ID"];
  validation: Scalars["Boolean"];
};

export type MutationValidateDamageStepArgs = {
  id: Scalars["ID"];
};

export type MutationAddSimulatorDamageStepArgs = {
  simulatorId: Scalars["ID"];
  step: DamageStepInput;
};

export type MutationUpdateSimulatorDamageStepArgs = {
  simulatorId: Scalars["ID"];
  step: DamageStepInput;
};

export type MutationRemoveSimulatorDamageStepArgs = {
  simulatorId: Scalars["ID"];
  step: Scalars["ID"];
};

export type MutationAddSimulatorDamageTaskArgs = {
  simulatorId: Scalars["ID"];
  task: DamageTaskInput;
};

export type MutationRemoveSimulatorDamageTaskArgs = {
  simulatorId: Scalars["ID"];
  taskId: Scalars["ID"];
};

export type MutationUpdateSimulatorDamageTaskArgs = {
  simulatorId: Scalars["ID"];
  task: DamageTaskInput;
};

export type MutationAddDeckArgs = {
  simulatorId: Scalars["ID"];
  number: Scalars["Int"];
  svgPath?: Maybe<Scalars["String"]>;
  doors?: Maybe<Scalars["Boolean"]>;
  evac?: Maybe<Scalars["Boolean"]>;
};

export type MutationRemoveDeckArgs = {
  deckId: Scalars["ID"];
};

export type MutationAddDecksBulkArgs = {
  simulatorId: Scalars["ID"];
  decks: Scalars["String"];
};

export type MutationUpdateDeckSvgArgs = {
  deckId: Scalars["ID"];
  svg: Scalars["String"];
};

export type MutationDeckDoorsArgs = {
  deckId: Scalars["ID"];
  doors?: Maybe<Scalars["Boolean"]>;
};

export type MutationDeckEvacArgs = {
  deckId: Scalars["ID"];
  evac?: Maybe<Scalars["Boolean"]>;
};

export type MutationUpdateHallwaySvgArgs = {
  deckId: Scalars["ID"];
  svg?: Maybe<Scalars["String"]>;
};

export type MutationCreateDockingPortArgs = {
  port: DockingPortInput;
};

export type MutationUpdateDockingPortArgs = {
  port: DockingPortInput;
};

export type MutationRemoveDockingPortArgs = {
  port: Scalars["ID"];
};

export type MutationAddSpeedArgs = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  speed: Array<Maybe<SpeedInput>>;
};

export type MutationSetSpeedArgs = {
  id: Scalars["ID"];
  speed: Scalars["Int"];
  on?: Maybe<Scalars["Boolean"]>;
};

export type MutationSetEngineSpeedsArgs = {
  id: Scalars["ID"];
  speeds: Array<Maybe<SpeedInput>>;
};

export type MutationAddHeatArgs = {
  id: Scalars["ID"];
  heat?: Maybe<Scalars["Float"]>;
};

export type MutationAddCoolantArgs = {
  id: Scalars["ID"];
  coolant?: Maybe<Scalars["Float"]>;
};

export type MutationSetHeatRateArgs = {
  id: Scalars["ID"];
  rate?: Maybe<Scalars["Float"]>;
};

export type MutationEngineCoolArgs = {
  id: Scalars["ID"];
  state?: Maybe<Scalars["Boolean"]>;
};

export type MutationSetEngineAccelerationArgs = {
  id: Scalars["ID"];
  acceleration: Scalars["Float"];
};

export type MutationSetEngineUseAccelerationArgs = {
  id: Scalars["ID"];
  useAcceleration: Scalars["Boolean"];
};

export type MutationSetEngineSpeedFactorArgs = {
  id: Scalars["ID"];
  speedFactor: Scalars["Float"];
};

export type MutationUpdateEnvironmentArgs = {
  deckID: Scalars["ID"];
  environment?: Maybe<EnvironmentInput>;
};

export type MutationSetSimulatorExocompsArgs = {
  simulatorId: Scalars["ID"];
  count: Scalars["Int"];
};

export type MutationDeployExocompArgs = {
  exocomp: ExocompInput;
};

export type MutationRecallExocompArgs = {
  exocomp: Scalars["ID"];
};

export type MutationExocompCompleteUpgradeArgs = {
  exocomp: Scalars["ID"];
};

export type MutationUpdateExocompDifficultyArgs = {
  exocomp: Scalars["ID"];
  difficulty: Scalars["Float"];
};

export type MutationImportSimulatorFromUrlArgs = {
  url: Scalars["String"];
};

export type MutationImportMissionFromUrlArgs = {
  url: Scalars["String"];
};

export type MutationStartFlightArgs = {
  name?: Maybe<Scalars["String"]>;
  simulators: Array<SimulatorInput>;
  flightType?: Maybe<Scalars["String"]>;
};

export type MutationResetFlightArgs = {
  flightId: Scalars["ID"];
  full?: Maybe<Scalars["Boolean"]>;
};

export type MutationDeleteFlightArgs = {
  flightId: Scalars["ID"];
};

export type MutationPauseFlightArgs = {
  flightId: Scalars["ID"];
};

export type MutationResumeFlightArgs = {
  flightId: Scalars["ID"];
};

export type MutationClientAddExtraArgs = {
  flightId: Scalars["ID"];
  simulatorId: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationGoogleSheetsCompleteAuthorizeArgs = {
  token: Scalars["String"];
};

export type MutationGoogleSheetsFileSearchArgs = {
  searchText: Scalars["String"];
};

export type MutationGoogleSheetsAppendDataArgs = {
  spreadsheetId?: Maybe<Scalars["ID"]>;
  sheetId?: Maybe<Scalars["String"]>;
  data?: Maybe<Scalars["JSON"]>;
};

export type MutationAddInterfaceArgs = {
  name: Scalars["String"];
};

export type MutationRenameInterfaceArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationRemoveInterfaceArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateInterfaceArgs = {
  id: Scalars["ID"];
  deviceType?: Maybe<Scalars["ID"]>;
  components?: Maybe<Scalars["JSON"]>;
  connections?: Maybe<Scalars["JSON"]>;
  values?: Maybe<Scalars["JSON"]>;
  config?: Maybe<Scalars["JSON"]>;
};

export type MutationAddInterfaceToSimulatorArgs = {
  simulatorId: Scalars["ID"];
  interfaceId: Scalars["ID"];
};

export type MutationRemoveInterfaceFromSimulatorArgs = {
  simulatorId: Scalars["ID"];
  interfaceId: Scalars["ID"];
};

export type MutationAddInterfaceDeviceArgs = {
  name: Scalars["String"];
  width: Scalars["Int"];
  height: Scalars["Int"];
};

export type MutationRenameInterfaceDeviceArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationRemoveInterfaceDeviceArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateInterfaceDeviceArgs = {
  id: Scalars["ID"];
  width?: Maybe<Scalars["Int"]>;
  height?: Maybe<Scalars["Int"]>;
};

export type MutationTriggerInterfaceObjectArgs = {
  id: Scalars["ID"];
  objectId: Scalars["ID"];
};

export type MutationToggleInterfaceObjectHiddenArgs = {
  id: Scalars["ID"];
  objectId: Scalars["ID"];
  hidden: Scalars["Boolean"];
};

export type MutationToggleInterfaceObjectPlayingArgs = {
  id: Scalars["ID"];
  objectId: Scalars["ID"];
};

export type MutationInternalCommConnectOutgoingArgs = {
  id: Scalars["ID"];
};

export type MutationInternalCommConnectIncomingArgs = {
  id: Scalars["ID"];
};

export type MutationInternalCommCancelIncomingArgs = {
  id: Scalars["ID"];
};

export type MutationInternalCommCancelOutgoingArgs = {
  id: Scalars["ID"];
};

export type MutationInternalCommCallIncomingArgs = {
  id: Scalars["ID"];
  incoming?: Maybe<Scalars["String"]>;
};

export type MutationInternalCommCallOutgoingArgs = {
  id: Scalars["ID"];
  outgoing?: Maybe<Scalars["String"]>;
};

export type MutationAddInventoryArgs = {
  inventory?: Maybe<InventoryItemInput>;
};

export type MutationRemoveInventoryArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type MutationMoveInventoryArgs = {
  id: Scalars["ID"];
  fromRoom: Scalars["ID"];
  toRoom: Scalars["ID"];
  count: Scalars["Int"];
  toSimulator?: Maybe<Scalars["ID"]>;
};

export type MutationUpdateInventoryCountArgs = {
  id: Scalars["ID"];
  room: Scalars["ID"];
  count: Scalars["Int"];
};

export type MutationUpdateInventoryMetadataArgs = {
  id?: Maybe<Scalars["ID"]>;
  metadata?: Maybe<InventoryMetadataInput>;
};

export type MutationUpdateCrewInventoryArgs = {
  crewId: Scalars["ID"];
  inventory: Array<Maybe<InventoryCount>>;
  roomId?: Maybe<Scalars["ID"]>;
};

export type MutationRemoveCrewInventoryArgs = {
  crewId: Scalars["ID"];
  inventory: Array<Maybe<InventoryCount>>;
  roomId: Scalars["ID"];
};

export type MutationTransferCargoArgs = {
  inventory?: Maybe<Array<Maybe<InventoryCountInput>>>;
  fromRoom: Scalars["ID"];
  toRoom: Scalars["ID"];
};

export type MutationInsertIsochipArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  slot?: Maybe<Scalars["Int"]>;
  chip?: Maybe<Scalars["Int"]>;
};

export type MutationUpdateIsochipArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  slot?: Maybe<Scalars["Int"]>;
  isochip?: Maybe<IsochipInput>;
};

export type MutationBatchIsochipUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  chips?: Maybe<Array<Maybe<IsochipInput>>>;
};

export type MutationSetJumpdriveActivatedArgs = {
  id: Scalars["ID"];
  activated: Scalars["Boolean"];
};

export type MutationSetJumpdriveEnvsArgs = {
  id: Scalars["ID"];
  envs: Scalars["Float"];
};

export type MutationSetJumpdriveSectorLevelArgs = {
  id: Scalars["ID"];
  sector: Scalars["String"];
  level: Scalars["Int"];
};

export type MutationSetJumpdriveSectorOffsetArgs = {
  id: Scalars["ID"];
  sector: Scalars["String"];
  offset: Scalars["Float"];
};

export type MutationFluxJumpdriveSectorArgs = {
  id: Scalars["ID"];
  sector?: Maybe<Scalars["String"]>;
};

export type MutationSetJumpDriveEnabledArgs = {
  id: Scalars["ID"];
  enabled?: Maybe<Scalars["Boolean"]>;
};

export type MutationHitJumpDriveStressArgs = {
  id: Scalars["ID"];
  sector: Scalars["String"];
};

export type MutationSetJumpDriveRingsExtendedArgs = {
  id: Scalars["ID"];
  ringsExtended: Scalars["Boolean"];
};

export type MutationAddKeyboardArgs = {
  name: Scalars["String"];
};

export type MutationRemoveKeyboardArgs = {
  id: Scalars["ID"];
};

export type MutationRenameKeyboardArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationUpdateKeyboardKeyArgs = {
  id: Scalars["ID"];
  key: KeyboardKeyInput;
};

export type MutationTriggerKeyboardActionArgs = {
  simulatorId: Scalars["ID"];
  id: Scalars["ID"];
  key: Scalars["String"];
  meta: Array<Maybe<Scalars["String"]>>;
};

export type MutationAddLibraryEntryArgs = {
  entry: LibraryInput;
};

export type MutationUpdateLibraryEntryArgs = {
  entry: LibraryInput;
};

export type MutationRemoveLibraryEntryArgs = {
  entry?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
};

export type MutationImportLibraryEntryArgs = {
  simulatorId: Scalars["ID"];
  entries: Scalars["String"];
};

export type MutationSendLongRangeMessageArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  message: Scalars["String"];
  crew?: Maybe<Scalars["Boolean"]>;
  sender?: Maybe<Scalars["String"]>;
  decoded?: Maybe<Scalars["Boolean"]>;
};

export type MutationLongRangeMessageSendArgs = {
  id?: Maybe<Scalars["ID"]>;
  message: Scalars["ID"];
};

export type MutationDeleteLongRangeMessageArgs = {
  id: Scalars["ID"];
  message: Scalars["ID"];
};

export type MutationUpdateLongRangeDecodedMessageArgs = {
  id: Scalars["ID"];
  messageId: Scalars["ID"];
  decodedMessage?: Maybe<Scalars["String"]>;
  a?: Maybe<Scalars["Int"]>;
  f?: Maybe<Scalars["Int"]>;
};

export type MutationUpdateLongRangeCommArgs = {
  longRangeComm: LongRangeCommInput;
};

export type MutationApproveLongRangeMessageArgs = {
  id: Scalars["ID"];
  message: Scalars["ID"];
};

export type MutationEncryptLongRangeMessageArgs = {
  id: Scalars["ID"];
  message: Scalars["ID"];
};

export type MutationSetLongRangeSatellitesArgs = {
  id: Scalars["ID"];
  num: Scalars["Int"];
};

export type MutationAddInterceptionSignalArgs = {
  id: Scalars["ID"];
};

export type MutationRemoveInterceptionSignalArgs = {
  id: Scalars["ID"];
};

export type MutationSetInterceptionDifficultyArgs = {
  id: Scalars["ID"];
  difficulty: Scalars["Int"];
};

export type MutationSetLongRangePresetMessagesArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  messages?: Maybe<Array<Maybe<PresetAnswerInput>>>;
};

export type MutationAddMacroArgs = {
  name: Scalars["String"];
};

export type MutationRemoveMacroArgs = {
  id: Scalars["ID"];
};

export type MutationRenameMacroArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationUpdateMacroActionsArgs = {
  id: Scalars["ID"];
  actions?: Maybe<Array<Maybe<ActionInput>>>;
};

export type MutationTriggerMacroActionArgs = {
  simulatorId: Scalars["ID"];
  macroId: Scalars["ID"];
};

export type MutationAddMacroButtonConfigArgs = {
  name: Scalars["String"];
};

export type MutationRemoveMacroButtonConfigArgs = {
  id: Scalars["ID"];
};

export type MutationRenameMacroButtonConfigArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationAddMacroButtonArgs = {
  configId: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationRemoveMacroButtonArgs = {
  configId: Scalars["ID"];
  id: Scalars["ID"];
};

export type MutationRenameMacroButtonArgs = {
  configId: Scalars["ID"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationSetMacroButtonCategoryArgs = {
  configId: Scalars["ID"];
  id: Scalars["ID"];
  category: Scalars["String"];
};

export type MutationSetMacroButtonColorArgs = {
  configId: Scalars["ID"];
  id: Scalars["ID"];
  color: NotifyColors;
};

export type MutationUpdateMacroButtonActionsArgs = {
  configId: Scalars["ID"];
  id: Scalars["ID"];
  actions?: Maybe<Array<Maybe<ActionInput>>>;
};

export type MutationTriggerMacroButtonArgs = {
  simulatorId: Scalars["ID"];
  configId: Scalars["ID"];
  buttonId: Scalars["ID"];
};

export type MutationToggleStationMessageGroupArgs = {
  stationSetId: Scalars["ID"];
  station: Scalars["String"];
  group: Scalars["String"];
  state: Scalars["Boolean"];
};

export type MutationSendMessageArgs = {
  message: MessageInput;
};

export type MutationMidiSetCreateArgs = {
  name: Scalars["String"];
  deviceName: Scalars["String"];
};

export type MutationMidiSetRenameArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationMidiSetRemoveArgs = {
  id: Scalars["ID"];
};

export type MutationMidiSetControlArgs = {
  id: Scalars["ID"];
  control: MidiControlInput;
};

export type MutationSimulatorAddMidiSetArgs = {
  simulatorId: Scalars["ID"];
  midiSet: Scalars["ID"];
};

export type MutationSimulatorRemoveMidiSetArgs = {
  simulatorId: Scalars["ID"];
  midiSet: Scalars["ID"];
};

export type MutationCreateMissionArgs = {
  name: Scalars["String"];
};

export type MutationRemoveMissionArgs = {
  missionId: Scalars["ID"];
};

export type MutationEditMissionArgs = {
  missionId: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  aux?: Maybe<Scalars["Boolean"]>;
  simulators?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type MutationImportMissionArgs = {
  jsonString: Scalars["String"];
};

export type MutationAddTimelineStepArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  missionId?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type MutationRemoveTimelineStepArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  missionId?: Maybe<Scalars["ID"]>;
  timelineStepId: Scalars["ID"];
};

export type MutationReorderTimelineStepArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  missionId?: Maybe<Scalars["ID"]>;
  timelineStepId: Scalars["ID"];
  order: Scalars["Int"];
};

export type MutationUpdateTimelineStepArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  missionId?: Maybe<Scalars["ID"]>;
  timelineStepId: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type MutationAddTimelineItemToTimelineStepArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  missionId?: Maybe<Scalars["ID"]>;
  timelineStepId: Scalars["ID"];
  timelineItem: TimelineItemInput;
};

export type MutationRemoveTimelineStepItemArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  missionId?: Maybe<Scalars["ID"]>;
  timelineStepId: Scalars["ID"];
  timelineItemId: Scalars["ID"];
};

export type MutationUpdateTimelineStepItemArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  missionId?: Maybe<Scalars["ID"]>;
  timelineStepId: Scalars["ID"];
  timelineItemId: Scalars["ID"];
  updateTimelineItem: TimelineItemInput;
};

export type MutationDuplicateTimelineStepArgs = {
  missionId: Scalars["ID"];
  timelineStepId: Scalars["ID"];
};

export type MutationStartAuxTimelineArgs = {
  simulatorId: Scalars["ID"];
  missionId: Scalars["ID"];
};

export type MutationSetAuxTimelineStepArgs = {
  simulatorId: Scalars["ID"];
  timelineId: Scalars["ID"];
  step: Scalars["Int"];
};

export type MutationMotuAddArgs = {
  address: Scalars["String"];
};

export type MutationMotuRemoveArgs = {
  id: Scalars["ID"];
};

export type MutationMotuUpdateChannelArgs = {
  id: Scalars["ID"];
  channelId: Scalars["ID"];
  channel: MotuChannelInput;
};

export type MutationMotuSetSendMuteArgs = {
  id: Scalars["ID"];
  inputId: Scalars["ID"];
  outputId: Scalars["ID"];
  mute: Scalars["Boolean"];
};

export type MutationNavCalculateCourseArgs = {
  id: Scalars["ID"];
  destination: Scalars["String"];
};

export type MutationNavCancelCalculationArgs = {
  id: Scalars["ID"];
};

export type MutationNavCourseResponseArgs = {
  id: Scalars["ID"];
  x?: Maybe<Scalars["String"]>;
  y?: Maybe<Scalars["String"]>;
  z?: Maybe<Scalars["String"]>;
};

export type MutationNavCourseEntryArgs = {
  id: Scalars["ID"];
  x?: Maybe<Scalars["String"]>;
  y?: Maybe<Scalars["String"]>;
  z?: Maybe<Scalars["String"]>;
};

export type MutationNavToggleCalculateArgs = {
  id: Scalars["ID"];
  which: Scalars["Boolean"];
};

export type MutationNavSetDestinationsArgs = {
  id?: Maybe<Scalars["ID"]>;
  destinations?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type MutationNavSetDestinationArgs = {
  id?: Maybe<Scalars["ID"]>;
  destination?: Maybe<Scalars["String"]>;
};

export type MutationNavSetScanningArgs = {
  id?: Maybe<Scalars["ID"]>;
  scanning?: Maybe<Scalars["Boolean"]>;
};

export type MutationNavSetThrustersArgs = {
  id: Scalars["ID"];
  thrusters?: Maybe<Scalars["Boolean"]>;
};

export type MutationNavSetPresetsArgs = {
  id?: Maybe<Scalars["ID"]>;
  presets?: Maybe<NavPresetInput>;
};

export type MutationAddObjectiveArgs = {
  objective: ObjectiveInput;
};

export type MutationCompleteObjectiveArgs = {
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["Boolean"]>;
  cancel?: Maybe<Scalars["Boolean"]>;
};

export type MutationObjectiveSetCrewCompleteArgs = {
  id: Scalars["ID"];
  crewComplete: Scalars["Boolean"];
};

export type MutationAddLogArgs = {
  log?: Maybe<LogInput>;
};

export type MutationChargePhaserBeamArgs = {
  id: Scalars["ID"];
  beamId: Scalars["ID"];
};

export type MutationDischargePhaserBeamArgs = {
  id: Scalars["ID"];
  beamId: Scalars["ID"];
};

export type MutationFirePhaserBeamArgs = {
  id: Scalars["ID"];
  beamId: Scalars["ID"];
};

export type MutationStopPhaserBeamsArgs = {
  id: Scalars["ID"];
};

export type MutationCoolPhaserBeamArgs = {
  id: Scalars["ID"];
  beamId?: Maybe<Scalars["ID"]>;
};

export type MutationPhaserArcArgs = {
  id: Scalars["ID"];
  arc: Scalars["Float"];
};

export type MutationSetPhaserBeamChargeArgs = {
  id: Scalars["ID"];
  beamId: Scalars["ID"];
  charge: Scalars["Float"];
};

export type MutationSetPhaserBeamHeatArgs = {
  id: Scalars["ID"];
  beamId: Scalars["ID"];
  heat: Scalars["Float"];
};

export type MutationSetPhaserBeamCountArgs = {
  id: Scalars["ID"];
  beamCount: Scalars["Int"];
};

export type MutationSetPhaserHoldToChargeArgs = {
  id: Scalars["ID"];
  holdToCharge: Scalars["Boolean"];
};

export type MutationSetPhaserChargeSpeedArgs = {
  id: Scalars["ID"];
  speed: Scalars["Float"];
};

export type MutationStopChargingPhasersArgs = {
  id: Scalars["ID"];
};

export type MutationChangePowerArgs = {
  systemId: Scalars["ID"];
  power: Scalars["Int"];
};

export type MutationChangeSystemPowerLevelsArgs = {
  systemId: Scalars["ID"];
  powerLevels: Array<Maybe<Scalars["Int"]>>;
};

export type MutationChangeSystemDefaultPowerLevelArgs = {
  id: Scalars["ID"];
  level: Scalars["Int"];
};

export type MutationFluxSystemPowerArgs = {
  id?: Maybe<Scalars["ID"]>;
  all?: Maybe<Scalars["Boolean"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type MutationDestroyProbeArgs = {
  id: Scalars["ID"];
  probeId: Scalars["ID"];
};

export type MutationDestroyAllProbesArgs = {
  id: Scalars["ID"];
};

export type MutationLaunchProbeArgs = {
  id: Scalars["ID"];
  probe: ProbeInput;
};

export type MutationFireProbeArgs = {
  id: Scalars["ID"];
  probeId: Scalars["ID"];
};

export type MutationUpdateProbeTypeArgs = {
  id: Scalars["ID"];
  probeType: ProbeTypeInput;
};

export type MutationUpdateProbeEquipmentArgs = {
  id: Scalars["ID"];
  probeEquipment: ProbeEquipmentInput;
};

export type MutationProbeQueryArgs = {
  id: Scalars["ID"];
  probeId: Scalars["ID"];
  query?: Maybe<Scalars["String"]>;
};

export type MutationProbeQueryResponseArgs = {
  id: Scalars["ID"];
  probeId: Scalars["ID"];
  response?: Maybe<Scalars["String"]>;
};

export type MutationProbeProcessedDataArgs = {
  id: Scalars["ID"];
  data?: Maybe<Scalars["String"]>;
  flash?: Maybe<Scalars["Boolean"]>;
};

export type MutationSetProbeTorpedoArgs = {
  id: Scalars["ID"];
  torpedo: Scalars["Boolean"];
};

export type MutationSetProbeChargeArgs = {
  id: Scalars["ID"];
  probeId: Scalars["ID"];
  charge: Scalars["Float"];
};

export type MutationActivateProbeEmitterArgs = {
  id: Scalars["ID"];
  probeId: Scalars["ID"];
};

export type MutationSetRailgunAmmoArgs = {
  id: Scalars["ID"];
  ammo?: Maybe<Scalars["Int"]>;
};

export type MutationSetRailgunMaxAmmoArgs = {
  id: Scalars["ID"];
  ammo: Scalars["Int"];
};

export type MutationSetRailgunAvailableAmmoArgs = {
  id: Scalars["ID"];
  ammo: Scalars["Int"];
};

export type MutationFireRailgunArgs = {
  id: Scalars["ID"];
  simulatorId: Scalars["ID"];
  contactId?: Maybe<Scalars["ID"]>;
};

export type MutationLoadRailgunArgs = {
  id: Scalars["ID"];
};

export type MutationReactorEjectArgs = {
  id: Scalars["ID"];
  tf: Scalars["Boolean"];
};

export type MutationReactorChangeModelArgs = {
  id: Scalars["ID"];
  model: Scalars["String"];
};

export type MutationReactorChangeOutputArgs = {
  id: Scalars["ID"];
  output: Scalars["Int"];
};

export type MutationReactorChangeEfficiencyArgs = {
  id: Scalars["ID"];
  efficiency?: Maybe<Scalars["Float"]>;
};

export type MutationReactorBatteryChargeLevelArgs = {
  id: Scalars["ID"];
  level: Scalars["Float"];
};

export type MutationReactorBatteryChargeRateArgs = {
  id: Scalars["ID"];
  rate: Scalars["Float"];
};

export type MutationUpdateDilithiumStressArgs = {
  id: Scalars["ID"];
  alphaLevel?: Maybe<Scalars["Float"]>;
  betaLevel?: Maybe<Scalars["Float"]>;
  alphaTarget?: Maybe<Scalars["Float"]>;
  betaTarget?: Maybe<Scalars["Float"]>;
};

export type MutationFluxDilithiumStressArgs = {
  id: Scalars["ID"];
};

export type MutationSetReactorEffcicienciesArgs = {
  id: Scalars["ID"];
  efficiencies: Array<Maybe<ReactorEfficiencyInput>>;
};

export type MutationSetDilithiumStressRateArgs = {
  id: Scalars["ID"];
  rate: Scalars["Float"];
};

export type MutationReactorRequireBalanceArgs = {
  id: Scalars["ID"];
  balance: Scalars["Boolean"];
};

export type MutationRecordsCreateArgs = {
  simulatorId: Scalars["ID"];
  contents: Scalars["String"];
  timestamp?: Maybe<Scalars["String"]>;
  category?: Maybe<Scalars["String"]>;
};

export type MutationRecordsCreateSnippetArgs = {
  simulatorId: Scalars["ID"];
  recordIds: Array<Scalars["ID"]>;
  name: Scalars["String"];
  type?: Maybe<RecordSnippetType>;
};

export type MutationRecordsAddToSnippetArgs = {
  simulatorId: Scalars["ID"];
  snippetId: Scalars["ID"];
  recordIds: Array<Scalars["ID"]>;
};

export type MutationRecordsRemoveFromSnippetArgs = {
  simulatorId: Scalars["ID"];
  snippetId: Scalars["ID"];
  recordId: Scalars["ID"];
};

export type MutationRecordsDeleteRecordArgs = {
  simulatorId: Scalars["ID"];
  recordId: Scalars["ID"];
};

export type MutationRecordsGenerateRecordsArgs = {
  simulatorId: Scalars["ID"];
  name: Scalars["String"];
  count?: Maybe<Scalars["Int"]>;
  visible?: Maybe<Scalars["Boolean"]>;
};

export type MutationRecordsCreateOnSnippetArgs = {
  simulatorId: Scalars["ID"];
  snippetId?: Maybe<Scalars["ID"]>;
  snippetName?: Maybe<Scalars["String"]>;
  contents: Scalars["String"];
  timestamp?: Maybe<Scalars["String"]>;
  category?: Maybe<Scalars["String"]>;
};

export type MutationRecordsShowSnippetArgs = {
  simulatorId: Scalars["ID"];
  snippetId: Scalars["ID"];
};

export type MutationRecordsHideSnippetArgs = {
  simulatorId: Scalars["ID"];
  snippetId: Scalars["ID"];
};

export type MutationRecordTemplateCreateSnippetArgs = {
  name: Scalars["String"];
};

export type MutationRecordTemplateAddToSnippetArgs = {
  snippetId: Scalars["ID"];
  contents: Scalars["String"];
  timestamp?: Maybe<Scalars["String"]>;
  category?: Maybe<Scalars["String"]>;
  modified?: Maybe<Scalars["Boolean"]>;
};

export type MutationRecordTemplateDeleteSnippetArgs = {
  snippetId: Scalars["ID"];
};

export type MutationRecordTemplateRenameArgs = {
  snippetId: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationRecordTemplateUpdateRecordArgs = {
  snippetId: Scalars["ID"];
  recordId?: Maybe<Scalars["ID"]>;
  contents?: Maybe<Scalars["String"]>;
  timestamp?: Maybe<Scalars["String"]>;
  category?: Maybe<Scalars["String"]>;
  modified?: Maybe<Scalars["Boolean"]>;
};

export type MutationRecordTemplateRemoveFromSnippetArgs = {
  snippetId: Scalars["ID"];
  recordId: Scalars["ID"];
};

export type MutationAddRoomArgs = {
  simulatorId: Scalars["ID"];
  deckId?: Maybe<Scalars["ID"]>;
  deckNumber?: Maybe<Scalars["Int"]>;
  name: Scalars["String"];
  svgPath?: Maybe<Scalars["String"]>;
};

export type MutationRemoveRoomArgs = {
  roomId: Scalars["ID"];
};

export type MutationAddRoomsBulkArgs = {
  simulatorId: Scalars["ID"];
  rooms: Scalars["String"];
};

export type MutationRenameRoomArgs = {
  roomId: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationUpdateRoomRolesArgs = {
  roomId: Scalars["ID"];
  roles?: Maybe<Array<Maybe<RoomRoles>>>;
};

export type MutationUpdateRoomSvgArgs = {
  roomId: Scalars["ID"];
  svg: Scalars["String"];
};

export type MutationRoomGasArgs = {
  roomId: Scalars["ID"];
  gas?: Maybe<Scalars["Boolean"]>;
};

export type MutationImportRoomsArgs = {
  simulatorId: Scalars["ID"];
  rooms: Array<Maybe<RoomInput>>;
};

export type MutationChangeRoomDeckArgs = {
  roomId: Scalars["ID"];
  deckId: Scalars["ID"];
};

export type MutationTestArgs = {
  key?: Maybe<Scalars["String"]>;
};

export type MutationSensorScanRequestArgs = {
  id: Scalars["ID"];
  request: Scalars["String"];
};

export type MutationSensorScanResultArgs = {
  id: Scalars["ID"];
  result: Scalars["String"];
};

export type MutationProcessedDataArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  domain?: Maybe<Scalars["String"]>;
  data: Scalars["String"];
  flash?: Maybe<Scalars["Boolean"]>;
};

export type MutationSensorScanCancelArgs = {
  id: Scalars["ID"];
};

export type MutationSetPresetAnswersArgs = {
  simulatorId: Scalars["ID"];
  domain: Scalars["String"];
  presetAnswers: Array<Maybe<PresetAnswerInput>>;
};

export type MutationCreateSensorContactArgs = {
  id: Scalars["ID"];
  contact: SensorContactInput;
};

export type MutationCreateSensorContactsArgs = {
  id: Scalars["ID"];
  contacts: Array<SensorContactInput>;
};

export type MutationMoveSensorContactArgs = {
  id: Scalars["ID"];
  contact: SensorContactInput;
};

export type MutationRemoveSensorContactArgs = {
  id: Scalars["ID"];
  contact: SensorContactInput;
};

export type MutationRemoveAllSensorContactsArgs = {
  id: Scalars["ID"];
  type?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type MutationStopAllSensorContactsArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateSensorContactArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  contact: SensorContactInput;
};

export type MutationSetArmyContactsArgs = {
  simulatorId: Scalars["ID"];
  domain: Scalars["String"];
  armyContacts: Array<Maybe<SensorContactInput>>;
};

export type MutationCreateSensorArmyContactArgs = {
  id: Scalars["ID"];
  contact: SensorContactInput;
};

export type MutationRemoveSensorArmyContactArgs = {
  id: Scalars["ID"];
  contact: Scalars["ID"];
};

export type MutationUpdateSensorArmyContactArgs = {
  id: Scalars["ID"];
  contact: SensorContactInput;
};

export type MutationNudgeSensorContactsArgs = {
  id: Scalars["ID"];
  amount?: Maybe<CoordinatesInput>;
  speed: Scalars["Float"];
  yaw?: Maybe<Scalars["Float"]>;
};

export type MutationSetSensorPingModeArgs = {
  id: Scalars["ID"];
  mode?: Maybe<Ping_Modes>;
};

export type MutationPingSensorsArgs = {
  id: Scalars["ID"];
};

export type MutationSetSensorsHistoryArgs = {
  id: Scalars["ID"];
  history: Scalars["Boolean"];
};

export type MutationNewSensorScanArgs = {
  id: Scalars["ID"];
  scan: SensorScanInput;
};

export type MutationUpdateSensorScanArgs = {
  id: Scalars["ID"];
  scan: SensorScanInput;
};

export type MutationCancelSensorScanArgs = {
  id: Scalars["ID"];
  scan: Scalars["ID"];
};

export type MutationToggleSensorsAutoTargetArgs = {
  id: Scalars["ID"];
  target: Scalars["Boolean"];
};

export type MutationToggleSensorsAutoThrustersArgs = {
  id: Scalars["ID"];
  thrusters: Scalars["Boolean"];
};

export type MutationSetSensorsInterferenceArgs = {
  id: Scalars["ID"];
  interference: Scalars["Float"];
};

export type MutationSetSensorsSegmentArgs = {
  id: Scalars["ID"];
  ring: Scalars["Int"];
  line: Scalars["Int"];
  state: Scalars["Boolean"];
};

export type MutationSetAutoMovementArgs = {
  id: Scalars["ID"];
  movement: CoordinatesInput;
};

export type MutationUpdateSensorContactsArgs = {
  id: Scalars["ID"];
  contacts: Array<Maybe<SensorContactInput>>;
};

export type MutationUpdateSensorGridArgs = {
  simulatorId: Scalars["ID"];
  contacts: Array<Maybe<SensorContactInput>>;
};

export type MutationDestroySensorContactArgs = {
  id: Scalars["ID"];
  contact?: Maybe<Scalars["ID"]>;
  contacts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type MutationSensorsFireProjectileArgs = {
  simulatorId: Scalars["ID"];
  contactId: Scalars["ID"];
  speed: Scalars["Float"];
  hitpoints: Scalars["Int"];
  miss?: Maybe<Scalars["Boolean"]>;
};

export type MutationSetSensorsDefaultHitpointsArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  hp: Scalars["Int"];
};

export type MutationSetSensorsDefaultSpeedArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  speed: Scalars["Float"];
};

export type MutationSetSensorsMissPercentArgs = {
  id: Scalars["ID"];
  miss: Scalars["Float"];
};

export type MutationCreateSetArgs = {
  name: Scalars["String"];
};

export type MutationRemoveSetArgs = {
  id: Scalars["ID"];
};

export type MutationAddClientToSetArgs = {
  id: Scalars["ID"];
  client: SetClientInput;
};

export type MutationRemoveClientFromSetArgs = {
  id: Scalars["ID"];
  clientId: Scalars["ID"];
};

export type MutationUpdateSetClientArgs = {
  id: Scalars["ID"];
  client: SetClientInput;
};

export type MutationRenameSetArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationShieldRaisedArgs = {
  id: Scalars["ID"];
};

export type MutationShieldLoweredArgs = {
  id: Scalars["ID"];
};

export type MutationShieldIntegritySetArgs = {
  id: Scalars["ID"];
  integrity?: Maybe<Scalars["Float"]>;
};

export type MutationShieldFrequencySetArgs = {
  id: Scalars["ID"];
  frequency?: Maybe<Scalars["Float"]>;
};

export type MutationShieldFrequencySetAllArgs = {
  simulatorId: Scalars["ID"];
  frequency: Scalars["Float"];
};

export type MutationHitShieldsArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type MutationRestoreShieldsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type MutationShipDockingChangeArgs = {
  simulatorId: Scalars["ID"];
  which: Scalars["String"];
  state: Scalars["Boolean"];
};

export type MutationShipSetDockingArgs = {
  simulatorId: Scalars["ID"];
  clamps?: Maybe<Scalars["Boolean"]>;
  ramps?: Maybe<Scalars["Boolean"]>;
  airlock?: Maybe<Scalars["Boolean"]>;
  legs?: Maybe<Scalars["Boolean"]>;
};

export type MutationRemoteAccessSendCodeArgs = {
  simulatorId: Scalars["ID"];
  code: Scalars["String"];
  station: Scalars["String"];
};

export type MutationRemoteAccessUpdateCodeArgs = {
  simulatorId: Scalars["ID"];
  codeId: Scalars["ID"];
  state: Scalars["String"];
};

export type MutationSetSelfDestructTimeArgs = {
  simulatorId: Scalars["ID"];
  time?: Maybe<Scalars["Float"]>;
};

export type MutationSetSelfDestructCodeArgs = {
  simulatorId: Scalars["ID"];
  code?: Maybe<Scalars["String"]>;
};

export type MutationSetSelfDestructAutoArgs = {
  simulatorId: Scalars["ID"];
  auto?: Maybe<Scalars["Boolean"]>;
};

export type MutationNotifyArgs = {
  simulatorId: Scalars["ID"];
  type?: Maybe<Scalars["String"]>;
  station?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  body?: Maybe<Scalars["String"]>;
  color?: Maybe<NotifyColors>;
};

export type MutationCommAddSignalArgs = {
  id: Scalars["ID"];
  commSignalInput: CommSignalInput;
};

export type MutationCommUpdateSignalArgs = {
  id: Scalars["ID"];
  commSignalInput: CommSignalInput;
};

export type MutationCommUpdateSignalsArgs = {
  id: Scalars["ID"];
  signals: Array<Maybe<CommSignalInput>>;
};

export type MutationCommRemoveSignalArgs = {
  id: Scalars["ID"];
  signalId: Scalars["ID"];
};

export type MutationCommAddArrowArgs = {
  id: Scalars["ID"];
  commArrowInput: CommArrowInput;
};

export type MutationCommRemoveArrowArgs = {
  id: Scalars["ID"];
  arrowId: Scalars["ID"];
};

export type MutationCommConnectArrowArgs = {
  id: Scalars["ID"];
  arrowId: Scalars["ID"];
};

export type MutationCommDisconnectArrowArgs = {
  id: Scalars["ID"];
  arrowId: Scalars["ID"];
};

export type MutationCommUpdateArgs = {
  id: Scalars["ID"];
  commUpdateInput: CommUpdateInput;
};

export type MutationCommHailArgs = {
  id: Scalars["ID"];
};

export type MutationCancelHailArgs = {
  id: Scalars["ID"];
  core?: Maybe<Scalars["Boolean"]>;
};

export type MutationConnectHailArgs = {
  id: Scalars["ID"];
};

export type MutationAddShortRangeCommArgs = {
  simulatorId: Scalars["ID"];
  frequency?: Maybe<Scalars["Float"]>;
  signalName?: Maybe<Scalars["String"]>;
};

export type MutationRemoveShortRangeCommArgs = {
  simulatorId: Scalars["ID"];
  frequency?: Maybe<Scalars["Float"]>;
  signalName?: Maybe<Scalars["String"]>;
};

export type MutationMuteShortRangeCommArgs = {
  id: Scalars["ID"];
  arrowId: Scalars["ID"];
  mute: Scalars["Boolean"];
};

export type MutationSetSickbayBunksArgs = {
  id: Scalars["ID"];
  count?: Maybe<Scalars["Int"]>;
};

export type MutationAddSickbayCrewArgs = {
  id: Scalars["ID"];
  crew: CrewInput;
};

export type MutationRemoveSickbayCrewArgs = {
  id: Scalars["ID"];
  crewId: Scalars["ID"];
};

export type MutationUpdateSickbayCrewArgs = {
  id: Scalars["ID"];
  crewId: Scalars["ID"];
  crew: CrewInput;
};

export type MutationScanSickbayBunkArgs = {
  id: Scalars["ID"];
  bunkId: Scalars["ID"];
  request: Scalars["String"];
};

export type MutationCancelSickbayBunkScanArgs = {
  id: Scalars["ID"];
  bunkId: Scalars["ID"];
};

export type MutationSickbayBunkScanResponseArgs = {
  id: Scalars["ID"];
  bunkId: Scalars["ID"];
  response: Scalars["String"];
};

export type MutationAssignPatientArgs = {
  id: Scalars["ID"];
  bunkId: Scalars["ID"];
  crewId: Scalars["ID"];
};

export type MutationDischargePatientArgs = {
  id: Scalars["ID"];
  bunkId: Scalars["ID"];
};

export type MutationStartDeconProgramArgs = {
  id?: Maybe<Scalars["ID"]>;
  program: Scalars["String"];
  location: Scalars["String"];
};

export type MutationUpdateDeconOffsetArgs = {
  id: Scalars["ID"];
  offset: Scalars["Float"];
};

export type MutationCancelDeconProgramArgs = {
  id: Scalars["ID"];
};

export type MutationCompleteDeconProgramArgs = {
  id: Scalars["ID"];
};

export type MutationSetDeconAutoFinishArgs = {
  id: Scalars["ID"];
  finish: Scalars["Boolean"];
};

export type MutationUpdatePatientChartArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  crewId: Scalars["ID"];
  chart: ChartInput;
};

export type MutationUpdateSignalJammerArgs = {
  jammer: SignalJammerInput;
};

export type MutationSignalJammerSignalsArgs = {
  id: Scalars["ID"];
  type: Scalars["String"];
  signals: Scalars["Int"];
};

export type MutationFluxSignalJammerArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type MutationSetSignalJammerSensorsInterferenceArgs = {
  id: Scalars["ID"];
  interference: Scalars["Boolean"];
};

export type MutationCreateSimulatorArgs = {
  name: Scalars["String"];
  template?: Maybe<Scalars["Boolean"]>;
};

export type MutationRemoveSimulatorArgs = {
  simulatorId: Scalars["ID"];
};

export type MutationTriggerMacrosArgs = {
  simulatorId: Scalars["ID"];
  macros: Array<Maybe<MacroInput>>;
};

export type MutationAutoAdvanceArgs = {
  simulatorId: Scalars["ID"];
  prev?: Maybe<Scalars["Boolean"]>;
  limited?: Maybe<Scalars["Boolean"]>;
};

export type MutationTrainingModeArgs = {
  simulatorId: Scalars["ID"];
};

export type MutationSetAlertConditionLockArgs = {
  simulatorId: Scalars["ID"];
  lock: Scalars["Boolean"];
};

export type MutationRenameSimulatorArgs = {
  simulatorId: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationChangeSimulatorLayoutArgs = {
  simulatorId: Scalars["ID"];
  layout: Scalars["String"];
};

export type MutationChangeSimulatorCapsArgs = {
  simulatorId: Scalars["ID"];
  caps: Scalars["Boolean"];
};

export type MutationChangeSimulatorAlertLevelArgs = {
  simulatorId: Scalars["ID"];
  alertLevel: Scalars["String"];
};

export type MutationHideSimulatorCardArgs = {
  simulatorId: Scalars["ID"];
  cardName: Scalars["String"];
  delay?: Maybe<Scalars["Int"]>;
};

export type MutationUnhideSimulatorCardArgs = {
  simulatorId: Scalars["ID"];
  cardName: Scalars["String"];
};

export type MutationStationAssignCardArgs = {
  simulatorId: Scalars["ID"];
  assignedToStation: Scalars["String"];
  cardName: Scalars["String"];
};

export type MutationStationUnassignCardArgs = {
  simulatorId: Scalars["ID"];
  cardName: Scalars["String"];
};

export type MutationFlipSimulatorArgs = {
  simulatorId: Scalars["ID"];
  flip: Scalars["Boolean"];
};

export type MutationToggleSimulatorCardHiddenArgs = {
  simulatorId: Scalars["ID"];
  cardName: Scalars["String"];
  toggle: Scalars["Boolean"];
};

export type MutationChangeSimulatorExocompsArgs = {
  simulatorId: Scalars["ID"];
  exocomps: Scalars["Int"];
};

export type MutationChangeSimulatorBridgeCrewArgs = {
  simulatorId: Scalars["ID"];
  crew: Scalars["Int"];
};

export type MutationChangeSimulatorExtraPeopleArgs = {
  simulatorId: Scalars["ID"];
  crew: Scalars["Int"];
};

export type MutationChangeSimulatorRadiationArgs = {
  simulatorId: Scalars["ID"];
  radiation: Scalars["Float"];
};

export type MutationSetSimulatorTimelineStepArgs = {
  simulatorId: Scalars["ID"];
  timelineId?: Maybe<Scalars["ID"]>;
  step: Scalars["Int"];
};

export type MutationSetSimulatorMissionArgs = {
  simulatorId: Scalars["ID"];
  missionId: Scalars["ID"];
};

export type MutationSetSimulatorMissionConfigArgs = {
  simulatorId: Scalars["ID"];
  missionId: Scalars["ID"];
  stationSetId: Scalars["ID"];
  actionId: Scalars["ID"];
  args: Scalars["JSON"];
};

export type MutationUpdateSimulatorPanelsArgs = {
  simulatorId: Scalars["ID"];
  panels: Array<Maybe<Scalars["ID"]>>;
};

export type MutationUpdateSimulatorCommandLinesArgs = {
  simulatorId: Scalars["ID"];
  commandLines: Array<Maybe<Scalars["ID"]>>;
};

export type MutationUpdateSimulatorTriggersArgs = {
  simulatorId: Scalars["ID"];
  triggers: Array<Maybe<Scalars["ID"]>>;
};

export type MutationSetSimulatorTriggersPausedArgs = {
  simulatorId: Scalars["ID"];
  paused: Scalars["Boolean"];
};

export type MutationUpdateSimulatorInterfacesArgs = {
  simulatorId: Scalars["ID"];
  interfaces: Array<Maybe<Scalars["ID"]>>;
};

export type MutationSetStepDamageArgs = {
  simulatorId: Scalars["ID"];
  stepDamage: Scalars["Boolean"];
};

export type MutationSetVerifyDamageArgs = {
  simulatorId: Scalars["ID"];
  verifyStep: Scalars["Boolean"];
};

export type MutationSetBridgeMessagingArgs = {
  id: Scalars["ID"];
  messaging: Scalars["Boolean"];
};

export type MutationSetSimulatorAssetsArgs = {
  id: Scalars["ID"];
  assets: SimulatorAssetsInput;
};

export type MutationSetSimulatorSoundEffectsArgs = {
  id: Scalars["ID"];
  soundEffects: Scalars["JSON"];
};

export type MutationUpdateSimulatorLightingArgs = {
  id: Scalars["ID"];
  lighting: LightingInput;
};

export type MutationSetSimulatorHasPrinterArgs = {
  simulatorId: Scalars["ID"];
  hasPrinter: Scalars["Boolean"];
};

export type MutationSetSimulatorHasLegsArgs = {
  simulatorId: Scalars["ID"];
  hasLegs: Scalars["Boolean"];
};

export type MutationSetSimulatorSpaceEdventuresIdArgs = {
  simulatorId: Scalars["ID"];
  spaceEdventuresId: Scalars["String"];
};

export type MutationAddSimulatorStationCardArgs = {
  simulatorId: Scalars["ID"];
  station: Scalars["String"];
  cardName: Scalars["String"];
  cardComponent: Scalars["String"];
};

export type MutationRemoveSimulatorStationCardArgs = {
  simulatorId: Scalars["ID"];
  station: Scalars["String"];
  cardName: Scalars["String"];
};

export type MutationEditSimulatorStationCardArgs = {
  simulatorId: Scalars["ID"];
  station: Scalars["String"];
  cardName: Scalars["String"];
  newCardName?: Maybe<Scalars["String"]>;
  cardComponent?: Maybe<Scalars["String"]>;
};

export type MutationSetSimulatorStationMessageGroupArgs = {
  simulatorId: Scalars["ID"];
  station: Scalars["String"];
  group: Scalars["String"];
  state: Scalars["Boolean"];
};

export type MutationSetSimulatorStationLoginArgs = {
  simulatorId: Scalars["ID"];
  station: Scalars["String"];
  login: Scalars["Boolean"];
};

export type MutationSetSimulatorStationLayoutArgs = {
  simulatorId: Scalars["ID"];
  station: Scalars["String"];
  layout: Scalars["String"];
};

export type MutationSetSimulatorStationExecutiveArgs = {
  simulatorId: Scalars["ID"];
  station: Scalars["String"];
  exec: Scalars["Boolean"];
};

export type MutationSetSimulatorStationWidgetArgs = {
  simulatorId: Scalars["ID"];
  station: Scalars["String"];
  widget: Scalars["String"];
  state: Scalars["Boolean"];
};

export type MutationCreateSoftwarePanelArgs = {
  panel: SoftwarePanelInput;
};

export type MutationUpdateSoftwarePanelArgs = {
  panel: SoftwarePanelInput;
};

export type MutationRemoveSoftwarePanelArgs = {
  panel: Scalars["ID"];
};

export type MutationCreateStationSetArgs = {
  name: Scalars["String"];
  simulatorId: Scalars["ID"];
};

export type MutationRemoveStationSetArgs = {
  stationSetID: Scalars["ID"];
};

export type MutationRenameStationSetArgs = {
  stationSetID: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationSetStationSetCrewCountArgs = {
  stationSetID: Scalars["ID"];
  crewCount: Scalars["Int"];
};

export type MutationAddStationToStationSetArgs = {
  stationSetID: Scalars["ID"];
  stationName: Scalars["String"];
};

export type MutationRemoveStationFromStationSetArgs = {
  stationSetID: Scalars["ID"];
  stationName: Scalars["String"];
};

export type MutationEditStationInStationSetArgs = {
  stationSetID: Scalars["ID"];
  stationName: Scalars["String"];
  newStationName: Scalars["String"];
};

export type MutationAddCardToStationArgs = {
  stationSetID: Scalars["ID"];
  stationName: Scalars["String"];
  cardName: Scalars["String"];
  cardComponent: Scalars["String"];
  cardIcon?: Maybe<Scalars["String"]>;
};

export type MutationRemoveCardFromStationArgs = {
  stationSetID: Scalars["ID"];
  stationName: Scalars["String"];
  cardName: Scalars["String"];
};

export type MutationEditCardInStationSetArgs = {
  stationSetID: Scalars["ID"];
  stationName: Scalars["String"];
  cardName: Scalars["String"];
  newCardName?: Maybe<Scalars["String"]>;
  cardComponent?: Maybe<Scalars["String"]>;
  cardIcon?: Maybe<Scalars["String"]>;
};

export type MutationSetStationLoginArgs = {
  stationSetID: Scalars["ID"];
  stationName: Scalars["String"];
  login: Scalars["Boolean"];
};

export type MutationSetStationLayoutArgs = {
  stationSetID: Scalars["ID"];
  stationName: Scalars["String"];
  layout: Scalars["String"];
};

export type MutationSetStationExecutiveArgs = {
  stationSetID: Scalars["ID"];
  stationName: Scalars["String"];
  exec: Scalars["Boolean"];
};

export type MutationToggleStationWidgetsArgs = {
  stationSetID: Scalars["ID"];
  stationName: Scalars["String"];
  widget: Scalars["String"];
  state: Scalars["Boolean"];
};

export type MutationSetStationDescriptionArgs = {
  stationSetID: Scalars["ID"];
  stationName: Scalars["String"];
  description: Scalars["String"];
};

export type MutationSetStationTrainingArgs = {
  stationSetID: Scalars["ID"];
  stationName: Scalars["String"];
  training?: Maybe<Scalars["String"]>;
};

export type MutationReorderStationWidgetsArgs = {
  stationSetId: Scalars["ID"];
  stationName: Scalars["String"];
  widget: Scalars["String"];
  order: Scalars["Int"];
};

export type MutationSetStealthActivatedArgs = {
  id?: Maybe<Scalars["ID"]>;
  state?: Maybe<Scalars["Boolean"]>;
};

export type MutationSetStealthChargeArgs = {
  id?: Maybe<Scalars["ID"]>;
  state?: Maybe<Scalars["Boolean"]>;
};

export type MutationActivateStealthArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type MutationDeactivateStealthArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type MutationSetStealthQuadrantArgs = {
  id?: Maybe<Scalars["ID"]>;
  which?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["Float"]>;
};

export type MutationFluxStealthQuadrantsArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type MutationStealthChangeAlertArgs = {
  id: Scalars["ID"];
  change: Scalars["Boolean"];
};

export type MutationFluxSubspaceFieldArgs = {
  id: Scalars["ID"];
  which?: Maybe<Scalars["String"]>;
};

export type MutationNormalSubspaceFieldArgs = {
  id: Scalars["ID"];
  which?: Maybe<Scalars["String"]>;
};

export type MutationSetSubspaceFieldSectorValueArgs = {
  id?: Maybe<Scalars["ID"]>;
  which: Scalars["String"];
  value: Scalars["Int"];
};

export type MutationCreateSurveyFormArgs = {
  name: Scalars["String"];
};

export type MutationRemoveSurveyFormArgs = {
  id: Scalars["ID"];
};

export type MutationSetSurveyFormGoogleSheetArgs = {
  id: Scalars["ID"];
  spreadsheetId?: Maybe<Scalars["ID"]>;
  spreadsheetName?: Maybe<Scalars["String"]>;
  sheetId?: Maybe<Scalars["ID"]>;
};

export type MutationUpdateSurveyFormArgs = {
  id: Scalars["ID"];
  form: Array<Maybe<FormFieldsInput>>;
};

export type MutationTriggerSurveyArgs = {
  simulatorId: Scalars["ID"];
  id: Scalars["ID"];
};

export type MutationSurveyFormResponseArgs = {
  id: Scalars["ID"];
  response?: Maybe<FormResultsInput>;
};

export type MutationEndSurveyArgs = {
  id: Scalars["ID"];
};

export type MutationAddSystemToSimulatorArgs = {
  simulatorId: Scalars["ID"];
  className: Scalars["String"];
  params: Scalars["String"];
};

export type MutationRemoveSystemFromSimulatorArgs = {
  systemId?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
};

export type MutationUpdateSystemNameArgs = {
  systemId: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
};

export type MutationUpdateSystemUpgradeMacrosArgs = {
  systemId: Scalars["ID"];
  upgradeMacros?: Maybe<Array<Maybe<TimelineItemInput>>>;
};

export type MutationUpdateSystemUpgradeBoardArgs = {
  systemId: Scalars["ID"];
  upgradeBoard?: Maybe<Scalars["ID"]>;
};

export type MutationUpgradeSystemArgs = {
  systemId: Scalars["ID"];
};

export type MutationUpdateSystemRoomsArgs = {
  systemId: Scalars["ID"];
  locations?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type MutationNewTacticalMapArgs = {
  name: Scalars["String"];
  flightId?: Maybe<Scalars["ID"]>;
};

export type MutationUpdateTacticalMapArgs = {
  id: Scalars["ID"];
};

export type MutationFreezeTacticalMapArgs = {
  id: Scalars["ID"];
  freeze: Scalars["Boolean"];
};

export type MutationDuplicateTacticalMapArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationLoadTacticalMapArgs = {
  id: Scalars["ID"];
  flightId: Scalars["ID"];
};

export type MutationRemoveTacticalMapArgs = {
  id: Scalars["ID"];
};

export type MutationAddTacticalMapLayerArgs = {
  mapId: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationUpdateTacticalMapLayerArgs = {
  mapId: Scalars["ID"];
  layer: TacticalLayerInput;
};

export type MutationReorderTacticalMapLayerArgs = {
  mapId: Scalars["ID"];
  layer: Scalars["ID"];
  order: Scalars["Int"];
};

export type MutationRemoveTacticalMapLayerArgs = {
  mapId: Scalars["ID"];
  layerId: Scalars["ID"];
};

export type MutationAddTacticalMapItemArgs = {
  mapId: Scalars["ID"];
  layerId: Scalars["ID"];
  item: TacticalItemInput;
};

export type MutationUpdateTacticalMapItemArgs = {
  mapId: Scalars["ID"];
  layerId: Scalars["ID"];
  item: TacticalItemInput;
};

export type MutationRemoveTacticalMapItemArgs = {
  mapId: Scalars["ID"];
  layerId: Scalars["ID"];
  itemId: Scalars["ID"];
};

export type MutationAddTacticalMapPathArgs = {
  mapId: Scalars["ID"];
  layerId: Scalars["ID"];
  path: TacticalPathInput;
};

export type MutationUpdateTacticalMapPathArgs = {
  mapId: Scalars["ID"];
  layerId: Scalars["ID"];
  path: TacticalPathInput;
};

export type MutationRemoveTacticalMapPathArgs = {
  mapId: Scalars["ID"];
  layerId: Scalars["ID"];
  pathId: Scalars["ID"];
};

export type MutationShowViewscreenTacticalArgs = {
  mapId: Scalars["ID"];
  secondary?: Maybe<Scalars["Boolean"]>;
  viewscreenId?: Maybe<Scalars["ID"]>;
};

export type MutationAddTacticalMapsToFlightArgs = {
  mapIds: Array<Scalars["ID"]>;
};

export type MutationCreateTargetingContactArgs = {
  id: Scalars["ID"];
  targetClass: Scalars["ID"];
};

export type MutationTargetTargetingContactArgs = {
  id: Scalars["ID"];
  targetId: Scalars["ID"];
};

export type MutationUntargetTargetingContactArgs = {
  id: Scalars["ID"];
  targetId: Scalars["ID"];
};

export type MutationTargetSystemArgs = {
  id: Scalars["ID"];
  targetId: Scalars["ID"];
  system: Scalars["String"];
};

export type MutationRemoveTargetArgs = {
  id: Scalars["ID"];
  targetId: Scalars["ID"];
};

export type MutationAddTargetClassArgs = {
  id: Scalars["ID"];
  classInput: TargetClassInput;
};

export type MutationRemoveTargetClassArgs = {
  id: Scalars["ID"];
  classId: Scalars["ID"];
};

export type MutationUpdateTargetClassArgs = {
  id: Scalars["ID"];
  classInput: TargetClassInput;
};

export type MutationSetTargetClassCountArgs = {
  id: Scalars["ID"];
  classId: Scalars["ID"];
  count: Scalars["Int"];
};

export type MutationSetCoordinateTargetingArgs = {
  id: Scalars["ID"];
  which: Scalars["Boolean"];
};

export type MutationSetTargetingCalculatedTargetArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  coordinates?: Maybe<CoordinatesInput>;
  contactId?: Maybe<Scalars["ID"]>;
};

export type MutationSetTargetingEnteredTargetArgs = {
  id: Scalars["ID"];
  coordinates?: Maybe<StringCoordinatesInput>;
};

export type MutationClearAllTargetingContactsArgs = {
  id: Scalars["ID"];
};

export type MutationSetTargetingRangeArgs = {
  id: Scalars["ID"];
  range: Scalars["Float"];
};

export type MutationSetTargetingClassesArgs = {
  id: Scalars["ID"];
  classInput: Array<Maybe<TargetClassInput>>;
};

export type MutationGenerateTaskReportArgs = {
  simulatorId: Scalars["ID"];
  systemId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  type: Scalars["String"];
  stepCount?: Maybe<Scalars["Int"]>;
};

export type MutationClearTaskReportArgs = {
  id: Scalars["ID"];
};

export type MutationCompleteTaskReportArgs = {
  id: Scalars["ID"];
};

export type MutationVerifyTaskReportStepArgs = {
  id: Scalars["ID"];
  stepId: Scalars["ID"];
};

export type MutationAssignTaskReportStepArgs = {
  id: Scalars["ID"];
  stepId: Scalars["ID"];
  station?: Maybe<Scalars["String"]>;
};

export type MutationRequestVerifyTaskReportStepArgs = {
  id: Scalars["ID"];
  stepId: Scalars["ID"];
};

export type MutationAddTaskArgs = {
  taskInput: TaskInput;
};

export type MutationVerifyTaskArgs = {
  taskId: Scalars["ID"];
  dismiss?: Maybe<Scalars["Boolean"]>;
};

export type MutationRequestTaskVerifyArgs = {
  id: Scalars["ID"];
};

export type MutationDenyTaskVerifyArgs = {
  id: Scalars["ID"];
};

export type MutationDismissVerifiedTasksArgs = {
  simulatorId: Scalars["ID"];
};

export type MutationAddTaskTemplateArgs = {
  definition: Scalars["String"];
};

export type MutationRemoveTaskTemplateArgs = {
  id: Scalars["ID"];
};

export type MutationRenameTaskTemplateArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationSetTaskTemplateValuesArgs = {
  id: Scalars["ID"];
  values: Scalars["JSON"];
};

export type MutationSetTaskTemplateReportTypesArgs = {
  id: Scalars["ID"];
  reportTypes: Array<Maybe<Scalars["String"]>>;
};

export type MutationSetTaskTemplateMacrosArgs = {
  id: Scalars["ID"];
  macros: Array<Maybe<TimelineItemInput>>;
};

export type MutationSetTaskTemplatePreMacrosArgs = {
  id: Scalars["ID"];
  macros: Array<Maybe<TimelineItemInput>>;
};

export type MutationCreateTeamArgs = {
  team: TeamInput;
};

export type MutationUpdateTeamArgs = {
  team: TeamInput;
};

export type MutationAddCrewToTeamArgs = {
  teamId: Scalars["ID"];
  crewId: Scalars["ID"];
};

export type MutationRemoveCrewFromTeamArgs = {
  teamId: Scalars["ID"];
  crewId: Scalars["ID"];
};

export type MutationRemoveTeamArgs = {
  teamId: Scalars["ID"];
};

export type MutationSetTrackingPreferenceArgs = {
  pref: Scalars["Boolean"];
};

export type MutationSetSpaceEdventuresTokenArgs = {
  token: Scalars["String"];
};

export type MutationAssignSpaceEdventuresBadgeArgs = {
  station?: Maybe<Scalars["String"]>;
  badgeId: Scalars["ID"];
};

export type MutationAssignSpaceEdventuresMissionArgs = {
  station?: Maybe<Scalars["String"]>;
  badgeId: Scalars["ID"];
};

export type MutationAssignSpaceEdventuresFlightTypeArgs = {
  flightId: Scalars["ID"];
  flightType: Scalars["ID"];
};

export type MutationAssignSpaceEdventuresFlightRecordArgs = {
  flightId: Scalars["ID"];
};

export type MutationGetSpaceEdventuresLoginArgs = {
  token: Scalars["String"];
};

export type MutationRemoveSpaceEdventuresClientArgs = {
  flightId: Scalars["ID"];
  clientId: Scalars["ID"];
};

export type MutationGenericArgs = {
  simulatorId: Scalars["ID"];
  key: Scalars["String"];
};

export type MutationAddIssueArgs = {
  title: Scalars["String"];
  body: Scalars["String"];
  person: Scalars["String"];
  priority: Scalars["String"];
  type: Scalars["String"];
};

export type MutationAddIssueUploadArgs = {
  data: Scalars["String"];
  filename: Scalars["String"];
  ext: Scalars["String"];
};

export type MutationRotationUpdateArgs = {
  id: Scalars["ID"];
  rotation?: Maybe<RotationInput>;
  on?: Maybe<Scalars["Boolean"]>;
};

export type MutationRotationSetArgs = {
  id: Scalars["ID"];
  rotation?: Maybe<RotationInput>;
};

export type MutationRequiredRotationSetArgs = {
  id: Scalars["ID"];
  rotation?: Maybe<RotationInput>;
};

export type MutationDirectionUpdateArgs = {
  id: Scalars["ID"];
  direction?: Maybe<DirectionInput>;
};

export type MutationSetThrusterRotationSpeedArgs = {
  id: Scalars["ID"];
  speed: Scalars["Float"];
};

export type MutationSetThrusterMovementSpeedArgs = {
  id: Scalars["ID"];
  speed?: Maybe<Scalars["Float"]>;
};

export type MutationChargeThxArgs = {
  id: Scalars["ID"];
  clientId: Scalars["ID"];
  charge: Scalars["Float"];
};

export type MutationLockThxArgs = {
  id: Scalars["ID"];
  clientId: Scalars["ID"];
};

export type MutationActivateThxArgs = {
  id: Scalars["ID"];
};

export type MutationDeactivateThxArgs = {
  id: Scalars["ID"];
};

export type MutationResetThxArgs = {
  id: Scalars["ID"];
};

export type MutationTorpedoAddWarheadArgs = {
  id: Scalars["ID"];
  warhead: WarheadInput;
};

export type MutationTorpedoRemoveWarheadArgs = {
  id: Scalars["ID"];
  warheadId: Scalars["ID"];
};

export type MutationTorpedoLoadWarheadArgs = {
  id: Scalars["ID"];
  warheadId: Scalars["ID"];
};

export type MutationTorpedoSetWarheadCountArgs = {
  id: Scalars["ID"];
  warheadType: Scalars["String"];
  count: Scalars["Int"];
};

export type MutationTorpedoUnloadArgs = {
  id: Scalars["ID"];
};

export type MutationTorpedoFireArgs = {
  id: Scalars["ID"];
};

export type MutationSetTractorBeamStateArgs = {
  id: Scalars["ID"];
  state: Scalars["Boolean"];
};

export type MutationSetTractorBeamTargetArgs = {
  id: Scalars["ID"];
  target: Scalars["Boolean"];
};

export type MutationSetTractorBeamStrengthArgs = {
  id: Scalars["ID"];
  strength: Scalars["Float"];
};

export type MutationSetTractorBeamStressArgs = {
  id: Scalars["ID"];
  stress: Scalars["Float"];
};

export type MutationSetTractorBeamScanningArgs = {
  id: Scalars["ID"];
  scanning: Scalars["Boolean"];
};

export type MutationSetTractorBeamTargetLabelArgs = {
  id: Scalars["ID"];
  label: Scalars["String"];
};

export type MutationAddTractorTargetArgs = {
  id: Scalars["ID"];
  label?: Maybe<Scalars["String"]>;
};

export type MutationRemoveTractorTargetArgs = {
  id: Scalars["ID"];
};

export type MutationSetTransportDestinationArgs = {
  transporter: Scalars["ID"];
  destination: Scalars["String"];
};

export type MutationSetTransportTargetArgs = {
  transporter: Scalars["ID"];
  target: Scalars["String"];
};

export type MutationBeginTransportScanArgs = {
  transporter: Scalars["ID"];
};

export type MutationCancelTransportScanArgs = {
  transporter: Scalars["ID"];
};

export type MutationClearTransportTargetsArgs = {
  transporter: Scalars["ID"];
};

export type MutationSetTransportChargeArgs = {
  transporter: Scalars["ID"];
  charge: Scalars["Float"];
};

export type MutationCompleteTransportArgs = {
  transporter: Scalars["ID"];
  target: Scalars["ID"];
};

export type MutationSetTransporterTargetsArgs = {
  transporter: Scalars["ID"];
  targets: Scalars["Int"];
};

export type MutationSetTransporterChargeSpeedArgs = {
  id: Scalars["ID"];
  chargeSpeed: Scalars["Float"];
};

export type MutationSetTranswarpActiveArgs = {
  id: Scalars["ID"];
  active: Scalars["Boolean"];
};

export type MutationFluxTranswarpArgs = {
  id: Scalars["ID"];
  quad?: Maybe<Scalars["String"]>;
  field?: Maybe<Scalars["String"]>;
};

export type MutationNormalTranswarpArgs = {
  id: Scalars["ID"];
  quad?: Maybe<Scalars["String"]>;
  field?: Maybe<Scalars["String"]>;
};

export type MutationSetTranswarpSectorValueArgs = {
  id: Scalars["ID"];
  quad: Scalars["String"];
  field: Scalars["String"];
  value: Scalars["Int"];
};

export type MutationAddTriggerArgs = {
  name: Scalars["String"];
};

export type MutationRenameTriggerArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationRemoveTriggerArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateTriggerArgs = {
  id: Scalars["ID"];
  components?: Maybe<Scalars["JSON"]>;
  connections?: Maybe<Scalars["JSON"]>;
  values?: Maybe<Scalars["JSON"]>;
  config?: Maybe<Scalars["JSON"]>;
};

export type MutationAddTriggerToSimulatorArgs = {
  simulatorId: Scalars["ID"];
  trigger: Scalars["ID"];
};

export type MutationRemoveTriggerFromSimulatorArgs = {
  simulatorId: Scalars["ID"];
  trigger: Scalars["ID"];
};

export type MutationUpdateViewscreenNameArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationUpdateViewscreenSecondaryArgs = {
  id: Scalars["ID"];
  secondary: Scalars["Boolean"];
};

export type MutationUpdateViewscreenComponentArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  component: Scalars["String"];
  data?: Maybe<Scalars["String"]>;
  secondary?: Maybe<Scalars["Boolean"]>;
};

export type MutationUpdateViewscreenDataArgs = {
  id: Scalars["ID"];
  data: Scalars["String"];
};

export type MutationSetViewscreenToAutoArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  secondary?: Maybe<Scalars["Boolean"]>;
};

export type MutationSetViewscreenPictureInPictureArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  secondary?: Maybe<Scalars["Boolean"]>;
  component: Scalars["String"];
  data?: Maybe<Scalars["JSON"]>;
  size?: Maybe<Pip_Size>;
  position?: Maybe<Pip_Position>;
};

export type MutationRemoveViewscreenPictureInPictureArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  secondary?: Maybe<Scalars["Boolean"]>;
};

export type MutationUpdateViewscreenAutoArgs = {
  id: Scalars["ID"];
  auto: Scalars["Boolean"];
};

export type MutationToggleViewscreenVideoArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  viewscreenId?: Maybe<Scalars["ID"]>;
};

export type MutationCountermeasuresCreateCountermeasureArgs = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
  name: Scalars["String"];
};

export type MutationCountermeasuresRemoveCountermeasureArgs = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
};

export type MutationCountermeasuresLaunchCountermeasureArgs = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
};

export type MutationCountermeasuresActivateCountermeasureArgs = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
};

export type MutationCountermeasuresDeactivateCountermeasureArgs = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
};

export type MutationCountermeasuresLaunchUnlockedCountermeasuresArgs = {
  id: Scalars["ID"];
};

export type MutationCountermeasuresBuildCountermeasureArgs = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
};

export type MutationCountermeasuresAddModuleArgs = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
  moduleType: Scalars["String"];
};

export type MutationCountermeasuresRemoveModuleArgs = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
  moduleId: Scalars["ID"];
};

export type MutationCountermeasuresConfigureModuleArgs = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
  moduleId: Scalars["ID"];
  config: Scalars["JSON"];
};

export type MutationCountermeasuresSetResourceArgs = {
  id: Scalars["ID"];
  resource: Scalars["String"];
  value: Scalars["Float"];
};

export type MutationCountermeasuresSetFdNoteArgs = {
  id: Scalars["ID"];
  countermeasureId: Scalars["ID"];
  note: Scalars["String"];
};

export type MutationEntityCreateArgs = {
  flightId: Scalars["ID"];
};

export type MutationEntityRemoveArgs = {
  id: Array<Scalars["ID"]>;
};

export type NamedObject = {
  __typename?: "NamedObject";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type Navigation = SystemInterface & {
  __typename?: "Navigation";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  power?: Maybe<Power>;
  damage?: Maybe<Damage>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  calculate?: Maybe<Scalars["Boolean"]>;
  currentCourse?: Maybe<NavLoc>;
  calculatedCourse?: Maybe<NavLoc>;
  destination?: Maybe<Scalars["String"]>;
  scanning?: Maybe<Scalars["Boolean"]>;
  destinations?: Maybe<Array<Maybe<Scalars["String"]>>>;
  presets?: Maybe<Array<Maybe<NavPreset>>>;
  thrusters?: Maybe<Scalars["Boolean"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
};

export type NavLoc = {
  __typename?: "NavLoc";
  x?: Maybe<Scalars["String"]>;
  y?: Maybe<Scalars["String"]>;
  z?: Maybe<Scalars["String"]>;
};

export type NavLocInput = {
  x?: Maybe<Scalars["String"]>;
  y?: Maybe<Scalars["String"]>;
  z?: Maybe<Scalars["String"]>;
};

export type NavPreset = {
  __typename?: "NavPreset";
  name?: Maybe<Scalars["String"]>;
  course?: Maybe<NavLoc>;
};

export type NavPresetInput = {
  name?: Maybe<Scalars["String"]>;
  course?: Maybe<NavLocInput>;
};

export type Notification = {
  __typename?: "Notification";
  id?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
  body?: Maybe<Scalars["String"]>;
  color?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  trigger?: Maybe<Scalars["String"]>;
  duration?: Maybe<Scalars["Int"]>;
  relevantCards?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export enum NotifyColors {
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Info = "info",
  Light = "light",
  Dark = "dark",
}

export type Objective = {
  __typename?: "Objective";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  timestamp?: Maybe<Scalars["String"]>;
  station?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  completed?: Maybe<Scalars["Boolean"]>;
  cancelled?: Maybe<Scalars["Boolean"]>;
  crewComplete?: Maybe<Scalars["Boolean"]>;
};

export type ObjectiveInput = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  station?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  completed?: Maybe<Scalars["Boolean"]>;
  cancelled?: Maybe<Scalars["Boolean"]>;
  crewComplete?: Maybe<Scalars["Boolean"]>;
};

export enum OperationsEnum {
  Add = "add",
  Remove = "remove",
  Replace = "replace",
}

export type PainPoint = {
  __typename?: "PainPoint";
  x?: Maybe<Scalars["Float"]>;
  y?: Maybe<Scalars["Float"]>;
};

export type PainPointInput = {
  x?: Maybe<Scalars["Float"]>;
  y?: Maybe<Scalars["Float"]>;
};

export type PanelCable = {
  __typename?: "PanelCable";
  id?: Maybe<Scalars["ID"]>;
  color?: Maybe<Scalars["String"]>;
  components?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type PanelCableInput = {
  id?: Maybe<Scalars["ID"]>;
  color?: Maybe<Scalars["String"]>;
  components?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type PanelComponent = {
  __typename?: "PanelComponent";
  id?: Maybe<Scalars["ID"]>;
  component?: Maybe<Scalars["String"]>;
  level?: Maybe<Scalars["Float"]>;
  label?: Maybe<Scalars["String"]>;
  color?: Maybe<Scalars["String"]>;
  x?: Maybe<Scalars["Float"]>;
  y?: Maybe<Scalars["Float"]>;
  scale?: Maybe<Scalars["Float"]>;
};

export type PanelComponentInput = {
  id?: Maybe<Scalars["ID"]>;
  component?: Maybe<Scalars["String"]>;
  level?: Maybe<Scalars["Float"]>;
  label?: Maybe<Scalars["String"]>;
  color?: Maybe<Scalars["String"]>;
  x?: Maybe<Scalars["Float"]>;
  y?: Maybe<Scalars["Float"]>;
  scale?: Maybe<Scalars["Float"]>;
};

export type PanelConnection = {
  __typename?: "PanelConnection";
  id?: Maybe<Scalars["ID"]>;
  to?: Maybe<Scalars["ID"]>;
  from?: Maybe<Scalars["ID"]>;
};

export type PanelConnectionInput = {
  id?: Maybe<Scalars["ID"]>;
  to?: Maybe<Scalars["ID"]>;
  from?: Maybe<Scalars["ID"]>;
};

export enum ParticleTypes {
  Dilithium = "Dilithium",
  Tachyon = "Tachyon",
  Neutrino = "Neutrino",
  AntiMatter = "AntiMatter",
  Anomaly = "Anomaly",
  Resonance = "Resonance",
  Graviton = "Graviton",
  Lithium = "Lithium",
  Magnetic = "Magnetic",
  Helium = "Helium",
  Hydrogen = "Hydrogen",
  Oxygen = "Oxygen",
  Carbon = "Carbon",
  Radiation = "Radiation",
}

export type Patch = {
  op?: Maybe<OperationsEnum>;
  path?: Maybe<Array<Maybe<Scalars["JSON"]>>>;
  value?: Maybe<Scalars["JSON"]>;
};

export type Phaser = SystemInterface & {
  __typename?: "Phaser";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  power?: Maybe<Power>;
  damage?: Maybe<Damage>;
  arc?: Maybe<Scalars["Float"]>;
  coolant?: Maybe<Scalars["Float"]>;
  beams?: Maybe<Array<Maybe<PhaserBeam>>>;
  locations?: Maybe<Array<Maybe<Room>>>;
  holdToCharge?: Maybe<Scalars["Boolean"]>;
  chargeSpeed?: Maybe<Scalars["Float"]>;
};

export type PhaserBeam = {
  __typename?: "PhaserBeam";
  id?: Maybe<Scalars["ID"]>;
  power?: Maybe<Power>;
  damage?: Maybe<Damage>;
  charge?: Maybe<Scalars["Float"]>;
  state?: Maybe<Scalars["String"]>;
  heat?: Maybe<Scalars["Float"]>;
};

export enum Ping_Modes {
  Active = "active",
  Passive = "passive",
  Manual = "manual",
}

export enum Pip_Position {
  BottomLeft = "bottomLeft",
  BottomRight = "bottomRight",
  TopLeft = "topLeft",
  TopRight = "topRight",
  Center = "center",
}

export enum Pip_Size {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export type Power = {
  __typename?: "Power";
  power?: Maybe<Scalars["Int"]>;
  powerLevels?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  defaultLevel?: Maybe<Scalars["Int"]>;
};

export type PresetAnswer = {
  __typename?: "PresetAnswer";
  label?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type PresetAnswerInput = {
  label?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export enum Priorities {
  Low = "low",
  Normal = "normal",
  Critical = "critical",
  Emergency = "emergency",
}

export type Probe = {
  __typename?: "Probe";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["ID"]>;
  launched?: Maybe<Scalars["Boolean"]>;
  equipment?: Maybe<Array<Maybe<ProbeEquipment>>>;
  engine?: Maybe<Engine>;
  phaser?: Maybe<Phaser>;
  navigation?: Maybe<Navigation>;
  query?: Maybe<Scalars["String"]>;
  querying?: Maybe<Scalars["Boolean"]>;
  response?: Maybe<Scalars["String"]>;
  charge?: Maybe<Scalars["Float"]>;
  history?: Maybe<Array<Maybe<History>>>;
};

export type ProbeEquipment = {
  __typename?: "ProbeEquipment";
  id?: Maybe<Scalars["ID"]>;
  description?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  count?: Maybe<Scalars["Int"]>;
  damage?: Maybe<Damage>;
  availableProbes?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type ProbeEquipmentInput = {
  description?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  count?: Maybe<Scalars["Int"]>;
};

export type ProbeInput = {
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["ID"]>;
  equipment?: Maybe<Array<Maybe<EquipmentInput>>>;
};

export type Probes = SystemInterface & {
  __typename?: "Probes";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  power?: Maybe<Power>;
  damage?: Maybe<Damage>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  torpedo?: Maybe<Scalars["Boolean"]>;
  processedData?: Maybe<Scalars["String"]>;
  probes?: Maybe<Array<Maybe<Probe>>>;
  equipment?: Maybe<Array<Maybe<ProbeEquipment>>>;
  types?: Maybe<Array<Maybe<ProbeType>>>;
  scienceTypes?: Maybe<Array<Maybe<ScienceType>>>;
};

export type ProbesProbesArgs = {
  network?: Maybe<Scalars["Boolean"]>;
};

export type ProbeType = {
  __typename?: "ProbeType";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  count?: Maybe<Scalars["Int"]>;
  availableEquipment?: Maybe<Array<Maybe<ProbeEquipment>>>;
};

export type ProbeTypeInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  count?: Maybe<Scalars["Int"]>;
};

export type Quaternion = {
  __typename?: "Quaternion";
  x: Scalars["Float"];
  y: Scalars["Float"];
  z: Scalars["Float"];
  w: Scalars["Float"];
};

export type QuaternionInput = {
  x: Scalars["Float"];
  y: Scalars["Float"];
  z: Scalars["Float"];
  w: Scalars["Float"];
};

export type Query = {
  __typename?: "Query";
  _empty?: Maybe<Scalars["String"]>;
  actions?: Maybe<Action>;
  asset?: Maybe<Asset>;
  assets?: Maybe<Array<Maybe<Asset>>>;
  assetFolders?: Maybe<Array<Maybe<AssetFolder>>>;
  clients?: Maybe<Array<Maybe<Client>>>;
  keypad?: Maybe<Keypad>;
  keypads?: Maybe<Array<Maybe<Keypad>>>;
  scanner?: Maybe<Scanner>;
  scanners?: Maybe<Array<Maybe<Scanner>>>;
  commandLine?: Maybe<Array<Maybe<CommandLine>>>;
  commandLineCommands?: Maybe<Array<Maybe<CommandLineCommand>>>;
  computerCore?: Maybe<Array<Maybe<ComputerCore>>>;
  oneComputerCore?: Maybe<ComputerCore>;
  coolant?: Maybe<Array<Maybe<CoolantTank>>>;
  systemCoolant?: Maybe<Array<Maybe<SystemCoolant>>>;
  coreFeed?: Maybe<Array<Maybe<CoreFeed>>>;
  coreLayouts?: Maybe<Array<Maybe<CoreLayout>>>;
  crew?: Maybe<Array<Maybe<Crew>>>;
  crewCount?: Maybe<Scalars["Int"]>;
  crm?: Maybe<Crm>;
  crmFighter?: Maybe<CrmFighter>;
  decks?: Maybe<Array<Maybe<Deck>>>;
  docking?: Maybe<Array<Maybe<DockingPort>>>;
  engines?: Maybe<Array<Maybe<Engine>>>;
  engine?: Maybe<Engine>;
  exocomps?: Maybe<Array<Maybe<Exocomp>>>;
  externals?: Maybe<Externals>;
  flights?: Maybe<Array<Maybe<Flight>>>;
  events?: Maybe<Array<Maybe<Scalars["String"]>>>;
  googleSheets?: Maybe<Scalars["String"]>;
  googleSheetsGetSpreadsheet?: Maybe<GoogleSpreadsheet>;
  interfaces?: Maybe<Array<Maybe<Interface>>>;
  interfaceDevices?: Maybe<Array<Maybe<InterfaceDevice>>>;
  internalComm?: Maybe<Array<Maybe<InternalComm>>>;
  inventory?: Maybe<Array<Maybe<InventoryItem>>>;
  isochips?: Maybe<Array<Maybe<Isochip>>>;
  jumpDrive?: Maybe<Array<Maybe<JumpDrive>>>;
  keyboard?: Maybe<Array<Maybe<Keyboard>>>;
  libraryEntries?: Maybe<Array<Maybe<LibraryEntry>>>;
  longRangeCommunications?: Maybe<Array<Maybe<LrCommunications>>>;
  macros?: Maybe<Array<Maybe<Macro>>>;
  macroButtons?: Maybe<Array<Maybe<MacroButtonConfig>>>;
  messages?: Maybe<Array<Maybe<Message>>>;
  midiSets?: Maybe<Array<Maybe<MidiSet>>>;
  missions?: Maybe<Array<Maybe<Mission>>>;
  auxTimelines?: Maybe<Array<Maybe<TimelineInstance>>>;
  motus?: Maybe<Array<Maybe<Motu>>>;
  motu?: Maybe<Motu>;
  motuChannel?: Maybe<MotuChannel>;
  motuSend?: Maybe<MotuPatch>;
  navigation?: Maybe<Array<Maybe<Navigation>>>;
  navigate?: Maybe<Navigation>;
  objective?: Maybe<Array<Maybe<Objective>>>;
  officerLogs?: Maybe<Array<Maybe<Log>>>;
  shipLogs?: Maybe<Array<Maybe<Log>>>;
  phasers?: Maybe<Array<Maybe<Phaser>>>;
  phaser?: Maybe<Phaser>;
  probes?: Maybe<Array<Maybe<Probes>>>;
  probe?: Maybe<Probes>;
  railgun?: Maybe<Array<Maybe<Railgun>>>;
  reactors?: Maybe<Array<Maybe<Reactor>>>;
  reactor?: Maybe<Reactor>;
  recordSnippets?: Maybe<Array<Maybe<RecordSnippet>>>;
  recordTemplates?: Maybe<Array<Maybe<RecordSnippet>>>;
  rooms?: Maybe<Array<Maybe<Room>>>;
  sensors?: Maybe<Array<Maybe<Sensors>>>;
  sensor?: Maybe<Sensors>;
  sensorContacts?: Maybe<Array<Maybe<SensorContact>>>;
  sets?: Maybe<Array<Maybe<Set>>>;
  shields?: Maybe<Array<Maybe<Shield>>>;
  shortRangeComm?: Maybe<Array<Maybe<ShortRangeComm>>>;
  sickbay?: Maybe<Array<Maybe<Sickbay>>>;
  sickbaySingle?: Maybe<Sickbay>;
  symptoms?: Maybe<Array<Maybe<Scalars["String"]>>>;
  signalJammers?: Maybe<Array<Maybe<SignalJammer>>>;
  simulators?: Maybe<Array<Maybe<Simulator>>>;
  softwarePanels?: Maybe<Array<Maybe<SoftwarePanel>>>;
  stations?: Maybe<Array<Maybe<StationSet>>>;
  station?: Maybe<Station>;
  stealthField?: Maybe<Array<Maybe<StealthField>>>;
  stealth?: Maybe<StealthField>;
  subspaceField?: Maybe<Array<Maybe<SubspaceField>>>;
  surveyform?: Maybe<Array<Maybe<SurveyForm>>>;
  systems?: Maybe<Array<Maybe<System>>>;
  system?: Maybe<System>;
  tacticalMaps?: Maybe<Array<Maybe<TacticalMap>>>;
  tacticalMap?: Maybe<TacticalMap>;
  targeting?: Maybe<Array<Maybe<Targeting>>>;
  taskReport?: Maybe<Array<Maybe<TaskReport>>>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  taskTemplates?: Maybe<Array<Maybe<TaskTemplate>>>;
  taskDefinitions?: Maybe<Array<Maybe<TaskDefinition>>>;
  taskInstructions?: Maybe<Scalars["String"]>;
  teams?: Maybe<Array<Maybe<Team>>>;
  damagePositions?: Maybe<Array<Maybe<Scalars["String"]>>>;
  exocompParts?: Maybe<Array<Maybe<Scalars["String"]>>>;
  _template?: Maybe<Template>;
  thorium?: Maybe<Thorium>;
  thrusters?: Maybe<Array<Maybe<Thruster>>>;
  thruster?: Maybe<Thruster>;
  thx?: Maybe<Array<Maybe<Thx>>>;
  torpedos?: Maybe<Array<Maybe<Torpedo>>>;
  torpedo?: Maybe<Torpedo>;
  tractorBeam?: Maybe<Array<Maybe<TractorBeam>>>;
  transporters?: Maybe<Array<Maybe<Transporter>>>;
  transwarp?: Maybe<Array<Maybe<Transwarp>>>;
  triggers?: Maybe<Array<Maybe<Trigger>>>;
  viewscreens?: Maybe<Array<Maybe<Viewscreen>>>;
  countermeasures?: Maybe<Countermeasures>;
  countermeasureModuleType: Array<CountermeasureModule>;
  entity?: Maybe<Entity>;
  entities: Array<Maybe<Entity>>;
};

export type QueryActionsArgs = {
  stationId?: Maybe<Scalars["ID"]>;
  clientId?: Maybe<Scalars["ID"]>;
};

export type QueryAssetArgs = {
  assetKey: Scalars["String"];
};

export type QueryAssetsArgs = {
  assetKeys: Array<Scalars["String"]>;
};

export type QueryAssetFoldersArgs = {
  name?: Maybe<Scalars["String"]>;
  names?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type QueryClientsArgs = {
  all?: Maybe<Scalars["Boolean"]>;
  clientId?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  stationName?: Maybe<Scalars["String"]>;
  flightId?: Maybe<Scalars["ID"]>;
};

export type QueryKeypadArgs = {
  client: Scalars["ID"];
};

export type QueryKeypadsArgs = {
  simulatorId: Scalars["ID"];
};

export type QueryScannerArgs = {
  client: Scalars["ID"];
};

export type QueryScannersArgs = {
  simulatorId: Scalars["ID"];
};

export type QueryCommandLineArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryCommandLineCommandsArgs = {
  simulatorId: Scalars["ID"];
};

export type QueryComputerCoreArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryOneComputerCoreArgs = {
  id: Scalars["ID"];
};

export type QueryCoolantArgs = {
  simulatorId: Scalars["ID"];
};

export type QuerySystemCoolantArgs = {
  simulatorId: Scalars["ID"];
  systemId?: Maybe<Scalars["ID"]>;
};

export type QueryCoreFeedArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryCoreLayoutsArgs = {
  name?: Maybe<Scalars["String"]>;
};

export type QueryCrewArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  position?: Maybe<Scalars["String"]>;
  killed?: Maybe<Scalars["Boolean"]>;
};

export type QueryCrewCountArgs = {
  simulatorId: Scalars["ID"];
  position?: Maybe<Scalars["String"]>;
  killed?: Maybe<Scalars["Boolean"]>;
};

export type QueryCrmArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryCrmFighterArgs = {
  simulatorId: Scalars["ID"];
  clientId: Scalars["ID"];
};

export type QueryDecksArgs = {
  simulatorId: Scalars["ID"];
  number?: Maybe<Scalars["Int"]>;
};

export type QueryDockingArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Docking_Types>;
};

export type QueryEnginesArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryEngineArgs = {
  id: Scalars["ID"];
};

export type QueryExocompsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryFlightsArgs = {
  running?: Maybe<Scalars["Boolean"]>;
  id?: Maybe<Scalars["ID"]>;
};

export type QueryGoogleSheetsGetSpreadsheetArgs = {
  spreadsheetId: Scalars["ID"];
};

export type QueryInterfacesArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryInternalCommArgs = {
  simulatorId: Scalars["ID"];
};

export type QueryInventoryArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  deck?: Maybe<Scalars["ID"]>;
  room?: Maybe<Scalars["ID"]>;
};

export type QueryIsochipsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryJumpDriveArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryLibraryEntriesArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  all?: Maybe<Scalars["Boolean"]>;
};

export type QueryLongRangeCommunicationsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryMessagesArgs = {
  simulatorId: Scalars["ID"];
  station?: Maybe<Scalars["String"]>;
  group?: Maybe<Scalars["ID"]>;
};

export type QueryMidiSetsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryMissionsArgs = {
  id?: Maybe<Scalars["ID"]>;
  aux?: Maybe<Scalars["Boolean"]>;
};

export type QueryAuxTimelinesArgs = {
  simulatorId: Scalars["ID"];
};

export type QueryMotuArgs = {
  id: Scalars["ID"];
};

export type QueryMotuChannelArgs = {
  id: Scalars["ID"];
  channelId: Scalars["ID"];
};

export type QueryMotuSendArgs = {
  id: Scalars["ID"];
  inputId: Scalars["ID"];
  outputId: Scalars["ID"];
};

export type QueryNavigationArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryNavigateArgs = {
  id: Scalars["ID"];
};

export type QueryObjectiveArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryOfficerLogsArgs = {
  clientId?: Maybe<Scalars["ID"]>;
  flightId: Scalars["ID"];
};

export type QueryShipLogsArgs = {
  simulatorId: Scalars["ID"];
};

export type QueryPhasersArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryPhaserArgs = {
  id: Scalars["ID"];
};

export type QueryProbesArgs = {
  simulatorId: Scalars["ID"];
};

export type QueryProbeArgs = {
  id: Scalars["ID"];
};

export type QueryRailgunArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryReactorsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  model?: Maybe<Scalars["String"]>;
};

export type QueryReactorArgs = {
  id: Scalars["ID"];
};

export type QueryRecordSnippetsArgs = {
  simulatorId: Scalars["ID"];
  visible?: Maybe<Scalars["Boolean"]>;
};

export type QueryRoomsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  deck?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  role?: Maybe<RoomRoles>;
};

export type QuerySensorsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  domain?: Maybe<Scalars["String"]>;
};

export type QuerySensorArgs = {
  id: Scalars["ID"];
};

export type QuerySensorContactsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  sensorsId?: Maybe<Scalars["ID"]>;
  hostile?: Maybe<Scalars["Boolean"]>;
  type?: Maybe<Scalars["String"]>;
};

export type QueryShieldsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryShortRangeCommArgs = {
  simulatorId: Scalars["ID"];
};

export type QuerySickbayArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QuerySickbaySingleArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type QuerySignalJammersArgs = {
  simulatorId: Scalars["ID"];
};

export type QuerySimulatorsArgs = {
  template?: Maybe<Scalars["Boolean"]>;
  id?: Maybe<Scalars["ID"]>;
};

export type QuerySoftwarePanelsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryStationArgs = {
  simulatorId: Scalars["ID"];
  station: Scalars["String"];
};

export type QueryStealthFieldArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryStealthArgs = {
  id: Scalars["ID"];
};

export type QuerySubspaceFieldArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QuerySurveyformArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  active?: Maybe<Scalars["Boolean"]>;
};

export type QuerySystemsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  power?: Maybe<Scalars["Boolean"]>;
  heat?: Maybe<Scalars["Boolean"]>;
  extra?: Maybe<Scalars["Boolean"]>;
  damageWhich?: Maybe<Scalars["String"]>;
};

export type QuerySystemArgs = {
  id: Scalars["ID"];
};

export type QueryTacticalMapsArgs = {
  flightId?: Maybe<Scalars["ID"]>;
};

export type QueryTacticalMapArgs = {
  id: Scalars["ID"];
};

export type QueryTargetingArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryTaskReportArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  cleared?: Maybe<Scalars["Boolean"]>;
};

export type QueryTasksArgs = {
  simulatorId: Scalars["ID"];
  station?: Maybe<Scalars["String"]>;
  definitions?: Maybe<Array<Scalars["String"]>>;
};

export type QueryTaskDefinitionsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryTaskInstructionsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  definition: Scalars["String"];
  requiredValues: Scalars["JSON"];
  task?: Maybe<TaskInput>;
};

export type QueryTeamsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  cleared?: Maybe<Scalars["Boolean"]>;
};

export type Query_TemplateArgs = {
  simulatorId: Scalars["ID"];
};

export type QueryThrustersArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryThrusterArgs = {
  id: Scalars["ID"];
};

export type QueryThxArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryTorpedosArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryTorpedoArgs = {
  id: Scalars["ID"];
};

export type QueryTractorBeamArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryTransportersArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryTranswarpArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryTriggersArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryViewscreensArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryCountermeasuresArgs = {
  simulatorId: Scalars["ID"];
};

export type QueryEntityArgs = {
  id: Scalars["ID"];
};

export type QueryEntitiesArgs = {
  flightId: Scalars["ID"];
};

export type Railgun = SystemInterface & {
  __typename?: "Railgun";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  power?: Maybe<Power>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  heat?: Maybe<Scalars["Float"]>;
  damage?: Maybe<Damage>;
  coolant?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  availableAmmo?: Maybe<Scalars["Int"]>;
  maxAmmo?: Maybe<Scalars["Int"]>;
  ammo?: Maybe<Scalars["Int"]>;
};

export type RangeInput = {
  upper?: Maybe<Scalars["Float"]>;
  lower?: Maybe<Scalars["Float"]>;
};

export type Reactor = SystemInterface & {
  __typename?: "Reactor";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  power?: Maybe<Power>;
  heat?: Maybe<Scalars["Float"]>;
  heatRate?: Maybe<Scalars["Float"]>;
  coolant?: Maybe<Scalars["Float"]>;
  damage?: Maybe<Damage>;
  model?: Maybe<Reactor_Models>;
  ejected?: Maybe<Scalars["Boolean"]>;
  externalPower?: Maybe<Scalars["Boolean"]>;
  powerOutput?: Maybe<Scalars["Int"]>;
  efficiency?: Maybe<Scalars["Float"]>;
  efficiencies?: Maybe<Array<Maybe<ReactorEfficiency>>>;
  batteryChargeLevel?: Maybe<Scalars["Float"]>;
  batteryChargeRate?: Maybe<Scalars["Float"]>;
  depletion?: Maybe<Scalars["Float"]>;
  alphaLevel?: Maybe<Scalars["Float"]>;
  betaLevel?: Maybe<Scalars["Float"]>;
  alphaTarget?: Maybe<Scalars["Float"]>;
  betaTarget?: Maybe<Scalars["Float"]>;
  dilithiumRate?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  requireBalance?: Maybe<Scalars["Boolean"]>;
};

export enum Reactor_Models {
  Reactor = "reactor",
  Battery = "battery",
}

export type ReactorEfficiency = {
  __typename?: "ReactorEfficiency";
  label?: Maybe<Scalars["String"]>;
  color?: Maybe<Scalars["String"]>;
  efficiency?: Maybe<Scalars["Float"]>;
};

export type ReactorEfficiencyInput = {
  label?: Maybe<Scalars["String"]>;
  color?: Maybe<Scalars["String"]>;
  efficiency?: Maybe<Scalars["Float"]>;
};

export type RecordEntry = {
  __typename?: "RecordEntry";
  id?: Maybe<Scalars["ID"]>;
  contents?: Maybe<Scalars["String"]>;
  original?: Maybe<Scalars["String"]>;
  timestamp?: Maybe<Scalars["String"]>;
  category?: Maybe<Scalars["String"]>;
  modified?: Maybe<Scalars["Boolean"]>;
};

export type RecordSnippet = {
  __typename?: "RecordSnippet";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  sensorContactId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<RecordSnippetType>;
  visible?: Maybe<Scalars["Boolean"]>;
  launched?: Maybe<Scalars["Boolean"]>;
  records?: Maybe<Array<Maybe<RecordEntry>>>;
  templateRecords?: Maybe<Array<Maybe<RecordEntry>>>;
};

export enum RecordSnippetType {
  Normal = "normal",
  Buoy = "buoy",
  External = "external",
}

export type RemoteAccessCode = {
  __typename?: "RemoteAccessCode";
  id?: Maybe<Scalars["ID"]>;
  code?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["String"]>;
  station?: Maybe<Scalars["String"]>;
  timestamp?: Maybe<Scalars["String"]>;
};

export type RemoteAsset = {
  url?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type Room = {
  __typename?: "Room";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  deck?: Maybe<Deck>;
  name?: Maybe<Scalars["String"]>;
  roles?: Maybe<Array<Maybe<RoomRoles>>>;
  gas?: Maybe<Scalars["Boolean"]>;
  svgPath?: Maybe<Scalars["String"]>;
  inventory?: Maybe<Array<Maybe<InventoryItem>>>;
  systems?: Maybe<Array<Maybe<System>>>;
};

export type RoomCount = {
  __typename?: "RoomCount";
  room?: Maybe<Room>;
  count?: Maybe<Scalars["Int"]>;
};

export type RoomCountInput = {
  room?: Maybe<Scalars["ID"]>;
  count?: Maybe<Scalars["Int"]>;
};

export type RoomInput = {
  name?: Maybe<Scalars["String"]>;
  deck?: Maybe<Scalars["Int"]>;
  roles?: Maybe<Array<Maybe<RoomRoles>>>;
};

export enum RoomRoles {
  Probe = "probe",
  Torpedo = "torpedo",
  DamageTeam = "damageTeam",
  SecurityTeam = "securityTeam",
  MedicalTeam = "medicalTeam",
}

export type Rotation = {
  __typename?: "Rotation";
  yaw?: Maybe<Scalars["Float"]>;
  pitch?: Maybe<Scalars["Float"]>;
  roll?: Maybe<Scalars["Float"]>;
};

export type RotationInput = {
  yaw?: Maybe<Scalars["Float"]>;
  pitch?: Maybe<Scalars["Float"]>;
  roll?: Maybe<Scalars["Float"]>;
};

export type Scanner = {
  __typename?: "Scanner";
  id?: Maybe<Scalars["ID"]>;
  label?: Maybe<Scalars["String"]>;
  scanRequest?: Maybe<Scalars["String"]>;
  scanResults?: Maybe<Scalars["String"]>;
  scanning?: Maybe<Scalars["Boolean"]>;
};

export enum Science_Burst_Detector {
  Burst = "burst",
  Detector = "detector",
}

export type ScienceProbeEvent = {
  __typename?: "ScienceProbeEvent";
  simulatorId: Scalars["ID"];
  name: Scalars["String"];
  type: Scalars["String"];
  charge: Scalars["Float"];
};

export type ScienceType = {
  __typename?: "ScienceType";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Science_Burst_Detector>;
  description?: Maybe<Scalars["String"]>;
  equipment?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type SensorContact = {
  __typename?: "SensorContact";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  icon?: Maybe<Scalars["String"]>;
  picture?: Maybe<Scalars["String"]>;
  color?: Maybe<Scalars["String"]>;
  rotation?: Maybe<Scalars["Float"]>;
  speed?: Maybe<Scalars["Float"]>;
  location?: Maybe<Coordinates>;
  destination?: Maybe<Coordinates>;
  position?: Maybe<Coordinates>;
  startTime?: Maybe<Scalars["Float"]>;
  endTime?: Maybe<Scalars["Float"]>;
  movementTime?: Maybe<Scalars["Int"]>;
  infrared?: Maybe<Scalars["Boolean"]>;
  cloaked?: Maybe<Scalars["Boolean"]>;
  destroyed?: Maybe<Scalars["Boolean"]>;
  forceUpdate?: Maybe<Scalars["Boolean"]>;
  targeted?: Maybe<Scalars["Boolean"]>;
  selected?: Maybe<Scalars["Boolean"]>;
  locked?: Maybe<Scalars["Boolean"]>;
  disabled?: Maybe<Scalars["Boolean"]>;
  hostile?: Maybe<Scalars["Boolean"]>;
  hitpoints?: Maybe<Scalars["Int"]>;
  autoFire?: Maybe<Scalars["Boolean"]>;
  particle?: Maybe<ParticleTypes>;
};

export type SensorContactInput = {
  sensorId?: Maybe<Scalars["ID"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  icon?: Maybe<Scalars["String"]>;
  picture?: Maybe<Scalars["String"]>;
  color?: Maybe<Scalars["String"]>;
  speed?: Maybe<Scalars["Float"]>;
  rotation?: Maybe<Scalars["Float"]>;
  location?: Maybe<CoordinatesInput>;
  destination?: Maybe<CoordinatesInput>;
  infrared?: Maybe<Scalars["Boolean"]>;
  cloaked?: Maybe<Scalars["Boolean"]>;
  destroyed?: Maybe<Scalars["Boolean"]>;
  locked?: Maybe<Scalars["Boolean"]>;
  disabled?: Maybe<Scalars["Boolean"]>;
  hostile?: Maybe<Scalars["Boolean"]>;
  hitpoints?: Maybe<Scalars["Int"]>;
  autoFire?: Maybe<Scalars["Boolean"]>;
  particle?: Maybe<ParticleTypes>;
};

export type Sensors = SystemInterface & {
  __typename?: "Sensors";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  domain?: Maybe<Scalars["String"]>;
  pings?: Maybe<Scalars["Boolean"]>;
  timeSincePing?: Maybe<Scalars["Int"]>;
  pingMode?: Maybe<Ping_Modes>;
  scanResults?: Maybe<Scalars["String"]>;
  scanRequest?: Maybe<Scalars["String"]>;
  processedData?: Maybe<Scalars["String"]>;
  presetAnswers?: Maybe<Array<Maybe<PresetAnswer>>>;
  scanning?: Maybe<Scalars["Boolean"]>;
  power?: Maybe<Power>;
  contacts?: Maybe<Array<Maybe<SensorContact>>>;
  armyContacts?: Maybe<Array<Maybe<SensorContact>>>;
  damage?: Maybe<Damage>;
  scans?: Maybe<Array<Maybe<SensorScan>>>;
  history?: Maybe<Scalars["Boolean"]>;
  autoTarget?: Maybe<Scalars["Boolean"]>;
  frozen?: Maybe<Scalars["Boolean"]>;
  autoThrusters?: Maybe<Scalars["Boolean"]>;
  interference?: Maybe<Scalars["Float"]>;
  movement?: Maybe<Coordinates>;
  segments?: Maybe<Array<Maybe<SensorsSegment>>>;
  locations?: Maybe<Array<Maybe<Room>>>;
  defaultHitpoints?: Maybe<Scalars["Int"]>;
  defaultSpeed?: Maybe<Scalars["Float"]>;
  missPercent?: Maybe<Scalars["Float"]>;
};

export type SensorScan = {
  __typename?: "SensorScan";
  id?: Maybe<Scalars["ID"]>;
  timestamp?: Maybe<Scalars["String"]>;
  mode?: Maybe<Scalars["String"]>;
  location?: Maybe<Scalars["String"]>;
  request?: Maybe<Scalars["String"]>;
  response?: Maybe<Scalars["String"]>;
  scanning?: Maybe<Scalars["Boolean"]>;
  cancelled?: Maybe<Scalars["Boolean"]>;
};

export type SensorScanInput = {
  id?: Maybe<Scalars["ID"]>;
  timestamp?: Maybe<Scalars["String"]>;
  mode?: Maybe<Scalars["String"]>;
  location?: Maybe<Scalars["String"]>;
  request?: Maybe<Scalars["String"]>;
  response?: Maybe<Scalars["String"]>;
  scanning?: Maybe<Scalars["Boolean"]>;
  cancelled?: Maybe<Scalars["Boolean"]>;
};

export type SensorsSegment = {
  __typename?: "SensorsSegment";
  ring?: Maybe<Scalars["Int"]>;
  line?: Maybe<Scalars["Int"]>;
  state?: Maybe<Scalars["Boolean"]>;
};

export type Set = {
  __typename?: "Set";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  clients?: Maybe<Array<Maybe<SetClient>>>;
};

export type SetClient = {
  __typename?: "SetClient";
  id?: Maybe<Scalars["ID"]>;
  client?: Maybe<Client>;
  simulator?: Maybe<Simulator>;
  stationSet?: Maybe<StationSet>;
  station?: Maybe<Scalars["String"]>;
  secondary?: Maybe<Scalars["Boolean"]>;
  soundPlayer?: Maybe<Scalars["Boolean"]>;
};

export type SetClientInput = {
  id?: Maybe<Scalars["ID"]>;
  clientId?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  stationSet?: Maybe<Scalars["ID"]>;
  station?: Maybe<Scalars["ID"]>;
  secondary?: Maybe<Scalars["Boolean"]>;
  soundPlayer?: Maybe<Scalars["Boolean"]>;
};

export type Shield = SystemInterface & {
  __typename?: "Shield";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  heat?: Maybe<Scalars["Float"]>;
  coolant?: Maybe<Scalars["Float"]>;
  position?: Maybe<Scalars["Int"]>;
  power?: Maybe<Power>;
  frequency?: Maybe<Scalars["Float"]>;
  state?: Maybe<Scalars["Boolean"]>;
  integrity?: Maybe<Scalars["Float"]>;
  damage?: Maybe<Damage>;
  locations?: Maybe<Array<Maybe<Room>>>;
};

export type Ship = {
  __typename?: "Ship";
  clamps?: Maybe<Scalars["Boolean"]>;
  ramps?: Maybe<Scalars["Boolean"]>;
  airlock?: Maybe<Scalars["Boolean"]>;
  legs?: Maybe<Scalars["Boolean"]>;
  bridgeCrew?: Maybe<Scalars["Int"]>;
  extraPeople?: Maybe<Scalars["Int"]>;
  radiation?: Maybe<Scalars["Float"]>;
  velocity?: Maybe<Scalars["Float"]>;
  remoteAccessCodes?: Maybe<Array<Maybe<RemoteAccessCode>>>;
  selfDestructTime?: Maybe<Scalars["Float"]>;
  selfDestructCode?: Maybe<Scalars["String"]>;
  selfDestructAuto?: Maybe<Scalars["Boolean"]>;
  inventoryLogs?: Maybe<Array<Maybe<InventoryLog>>>;
};

export type ShortRangeComm = SystemInterface & {
  __typename?: "ShortRangeComm";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  power?: Maybe<Power>;
  damage?: Maybe<Damage>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  heat?: Maybe<Scalars["Float"]>;
  coolant?: Maybe<Scalars["Float"]>;
  frequency?: Maybe<Scalars["Float"]>;
  amplitude?: Maybe<Scalars["Float"]>;
  state?: Maybe<Scalars["String"]>;
  arrows?: Maybe<Array<Maybe<CommArrow>>>;
  signals?: Maybe<Array<Maybe<CommSignal>>>;
  locations?: Maybe<Array<Maybe<Room>>>;
};

export type ShortRangeCommExtended = {
  __typename?: "ShortRangeCommExtended";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  power?: Maybe<Power>;
  damage?: Maybe<Damage>;
  name?: Maybe<Scalars["String"]>;
  frequency?: Maybe<Scalars["Float"]>;
  amplitude?: Maybe<Scalars["Float"]>;
  state?: Maybe<Scalars["String"]>;
  arrows?: Maybe<Array<Maybe<CommArrow>>>;
  signals?: Maybe<Array<Maybe<CommSignal>>>;
};

export type Sickbay = SystemInterface & {
  __typename?: "Sickbay";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  type?: Maybe<Scalars["String"]>;
  damage?: Maybe<Damage>;
  power?: Maybe<Power>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  deconProgram?: Maybe<Scalars["String"]>;
  deconLocation?: Maybe<Scalars["String"]>;
  deconActive?: Maybe<Scalars["Boolean"]>;
  deconOffset?: Maybe<Scalars["Float"]>;
  autoFinishDecon?: Maybe<Scalars["Boolean"]>;
  sickbayRoster?: Maybe<Array<Maybe<Crew>>>;
  bunks?: Maybe<Array<Maybe<SickbayBunk>>>;
};

export type SickbayBunk = {
  __typename?: "SickbayBunk";
  id?: Maybe<Scalars["ID"]>;
  sickbayId?: Maybe<Scalars["ID"]>;
  scanRequest?: Maybe<Scalars["String"]>;
  scanResults?: Maybe<Scalars["String"]>;
  scanning?: Maybe<Scalars["Boolean"]>;
  patient?: Maybe<Crew>;
};

export type Signal = {
  __typename?: "Signal";
  id?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  level?: Maybe<Scalars["Float"]>;
  power?: Maybe<Scalars["Float"]>;
};

export type SignalJammer = SystemInterface & {
  __typename?: "SignalJammer";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  damage?: Maybe<Damage>;
  power?: Maybe<Power>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  addsSensorsInterference?: Maybe<Scalars["Boolean"]>;
  active?: Maybe<Scalars["Boolean"]>;
  level?: Maybe<Scalars["Float"]>;
  strength?: Maybe<Scalars["Float"]>;
  signals?: Maybe<Array<Maybe<Signal>>>;
  locations?: Maybe<Array<Maybe<Room>>>;
};

export type SignalJammerInput = {
  id?: Maybe<Scalars["ID"]>;
  active?: Maybe<Scalars["Boolean"]>;
  level?: Maybe<Scalars["Float"]>;
  strength?: Maybe<Scalars["Float"]>;
};

export type Simulator = {
  __typename?: "Simulator";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  alertlevel?: Maybe<Scalars["String"]>;
  alertLevelLock?: Maybe<Scalars["Boolean"]>;
  layout?: Maybe<Scalars["String"]>;
  caps?: Maybe<Scalars["Boolean"]>;
  template?: Maybe<Scalars["Boolean"]>;
  templateId?: Maybe<Scalars["ID"]>;
  systems?: Maybe<Array<Maybe<System>>>;
  stations?: Maybe<Array<Maybe<Station>>>;
  mission?: Maybe<Mission>;
  missionConfigs?: Maybe<Scalars["JSON"]>;
  currentTimelineStep?: Maybe<Scalars["Int"]>;
  executedTimelineSteps?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  timelines?: Maybe<Array<Maybe<TimelineInstance>>>;
  decks?: Maybe<Array<Maybe<Deck>>>;
  rooms?: Maybe<Array<Maybe<Room>>>;
  ship?: Maybe<Ship>;
  stepDamage?: Maybe<Scalars["Boolean"]>;
  verifyStep?: Maybe<Scalars["Boolean"]>;
  requiredDamageSteps?: Maybe<Array<Maybe<DamageStep>>>;
  optionalDamageSteps?: Maybe<Array<Maybe<DamageStep>>>;
  exocomps?: Maybe<Scalars["Int"]>;
  training?: Maybe<Scalars["Boolean"]>;
  panels?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  commandLines?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  triggers?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  triggersPaused?: Maybe<Scalars["Boolean"]>;
  interfaces?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  midiSets?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  bridgeOfficerMessaging?: Maybe<Scalars["Boolean"]>;
  hasPrinter?: Maybe<Scalars["Boolean"]>;
  hasLegs?: Maybe<Scalars["Boolean"]>;
  spaceEdventuresId?: Maybe<Scalars["String"]>;
  flipped?: Maybe<Scalars["Boolean"]>;
  ambiance?: Maybe<Array<Maybe<Ambiance>>>;
  assets?: Maybe<SimulatorAssets>;
  soundEffects?: Maybe<Scalars["JSON"]>;
  damageTasks?: Maybe<Array<Maybe<DamageTask>>>;
  lighting?: Maybe<Lighting>;
  stationSets?: Maybe<Array<Maybe<StationSet>>>;
  stationSet?: Maybe<StationSet>;
};

export type SimulatorAssets = {
  __typename?: "SimulatorAssets";
  mesh?: Maybe<Scalars["String"]>;
  texture?: Maybe<Scalars["String"]>;
  side?: Maybe<Scalars["String"]>;
  top?: Maybe<Scalars["String"]>;
  logo?: Maybe<Scalars["String"]>;
  bridge?: Maybe<Scalars["String"]>;
};

export type SimulatorAssetsInput = {
  mesh?: Maybe<Scalars["String"]>;
  texture?: Maybe<Scalars["String"]>;
  side?: Maybe<Scalars["String"]>;
  top?: Maybe<Scalars["String"]>;
  logo?: Maybe<Scalars["String"]>;
  bridge?: Maybe<Scalars["String"]>;
};

export type SimulatorInput = {
  simulatorId: Scalars["ID"];
  stationSet: Scalars["ID"];
  missionId?: Maybe<Scalars["ID"]>;
};

export type SoftwarePanel = {
  __typename?: "SoftwarePanel";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  cables?: Maybe<Array<Maybe<PanelCable>>>;
  components?: Maybe<Array<Maybe<PanelComponent>>>;
  connections?: Maybe<Array<Maybe<PanelConnection>>>;
};

export type SoftwarePanelInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  cables?: Maybe<Array<Maybe<PanelCableInput>>>;
  components?: Maybe<Array<Maybe<PanelComponentInput>>>;
  connections?: Maybe<Array<Maybe<PanelConnectionInput>>>;
};

export type Sound = {
  __typename?: "Sound";
  id?: Maybe<Scalars["ID"]>;
  clients?: Maybe<Array<Maybe<Scalars["String"]>>>;
  asset?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  volume?: Maybe<Scalars["Float"]>;
  playbackRate?: Maybe<Scalars["Float"]>;
  channel?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  looping?: Maybe<Scalars["Boolean"]>;
};

export type SoundInput = {
  id?: Maybe<Scalars["ID"]>;
  clients?: Maybe<Array<Maybe<Scalars["String"]>>>;
  asset?: Maybe<Scalars["String"]>;
  volume?: Maybe<Scalars["Float"]>;
  playbackRate?: Maybe<Scalars["Float"]>;
  channel?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  looping?: Maybe<Scalars["Boolean"]>;
};

export type SpaceEdventuresCenter = {
  __typename?: "SpaceEdventuresCenter";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  simulators?: Maybe<Array<Maybe<NamedObject>>>;
  missions?: Maybe<Array<Maybe<NamedObject>>>;
  badges?: Maybe<Array<Maybe<NamedObject>>>;
  flightTypes?: Maybe<Array<Maybe<FlightType>>>;
};

export type SpaceEdventuresClient = {
  __typename?: "SpaceEdventuresClient";
  id?: Maybe<Scalars["ID"]>;
  token?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
};

export type Speed = {
  __typename?: "Speed";
  text?: Maybe<Scalars["String"]>;
  number?: Maybe<Scalars["Float"]>;
  velocity?: Maybe<Scalars["Float"]>;
  optimal?: Maybe<Scalars["Boolean"]>;
};

export type SpeedInput = {
  text?: Maybe<Scalars["String"]>;
  number?: Maybe<Scalars["Float"]>;
  velocity?: Maybe<Scalars["Float"]>;
  optimal?: Maybe<Scalars["Boolean"]>;
};

export type Station = {
  __typename?: "Station";
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  training?: Maybe<Scalars["String"]>;
  login?: Maybe<Scalars["Boolean"]>;
  executive?: Maybe<Scalars["Boolean"]>;
  messageGroups?: Maybe<Array<Maybe<Scalars["String"]>>>;
  layout?: Maybe<Scalars["String"]>;
  widgets?: Maybe<Array<Maybe<Scalars["String"]>>>;
  cards?: Maybe<Array<Maybe<Card>>>;
  ambiance?: Maybe<Scalars["String"]>;
};

export type StationCardsArgs = {
  showHidden?: Maybe<Scalars["Boolean"]>;
};

export type StationSet = {
  __typename?: "StationSet";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  simulator?: Maybe<Simulator>;
  crewCount?: Maybe<Scalars["Int"]>;
  stations?: Maybe<Array<Maybe<Station>>>;
};

export type StealthField = SystemInterface & {
  __typename?: "StealthField";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  power?: Maybe<Power>;
  damage?: Maybe<Damage>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  activated?: Maybe<Scalars["Boolean"]>;
  charge?: Maybe<Scalars["Boolean"]>;
  changeAlert?: Maybe<Scalars["Boolean"]>;
  state?: Maybe<Scalars["Boolean"]>;
  quadrants?: Maybe<StealthQuad>;
  locations?: Maybe<Array<Maybe<Room>>>;
};

export type StealthQuad = {
  __typename?: "StealthQuad";
  fore?: Maybe<Scalars["Float"]>;
  aft?: Maybe<Scalars["Float"]>;
  port?: Maybe<Scalars["Float"]>;
  starboard?: Maybe<Scalars["Float"]>;
};

export type StringCoordinates = {
  __typename?: "StringCoordinates";
  x?: Maybe<Scalars["String"]>;
  y?: Maybe<Scalars["String"]>;
  z?: Maybe<Scalars["String"]>;
};

export type StringCoordinatesInput = {
  x?: Maybe<Scalars["String"]>;
  y?: Maybe<Scalars["String"]>;
  z?: Maybe<Scalars["String"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  _empty?: Maybe<Scalars["String"]>;
  actionsUpdate?: Maybe<Action>;
  assetFolderChange?: Maybe<Array<Maybe<AssetFolder>>>;
  clientChanged?: Maybe<Array<Maybe<Client>>>;
  clientPing?: Maybe<Scalars["Boolean"]>;
  keypadsUpdate?: Maybe<Array<Maybe<Keypad>>>;
  keypadUpdate?: Maybe<Keypad>;
  scannersUpdate?: Maybe<Array<Maybe<Scanner>>>;
  scannerUpdate?: Maybe<Scanner>;
  commandLineOutputUpdate?: Maybe<Scalars["String"]>;
  commandLinesOutputUpdate?: Maybe<Array<Maybe<Client>>>;
  clearCache?: Maybe<Scalars["Boolean"]>;
  soundSub?: Maybe<Sound>;
  cancelSound?: Maybe<Scalars["ID"]>;
  cancelAllSounds?: Maybe<Scalars["Boolean"]>;
  cancelLoopingSounds?: Maybe<Scalars["Boolean"]>;
  commandLineUpdate?: Maybe<Array<Maybe<CommandLine>>>;
  computerCoreUpdate?: Maybe<Array<Maybe<ComputerCore>>>;
  coolantUpdate?: Maybe<Array<Maybe<CoolantTank>>>;
  coolantSystemUpdate?: Maybe<Array<Maybe<SystemCoolant>>>;
  coreFeedUpdate?: Maybe<Array<Maybe<CoreFeed>>>;
  syncTime?: Maybe<Timer>;
  coreLayoutChange?: Maybe<Array<Maybe<CoreLayout>>>;
  crewUpdate?: Maybe<Array<Maybe<Crew>>>;
  crewCountUpdate?: Maybe<Scalars["Int"]>;
  crmUpdate?: Maybe<Crm>;
  crmMovementUpdate?: Maybe<Crm>;
  crmFighterUpdate?: Maybe<CrmFighter>;
  decksUpdate?: Maybe<Array<Maybe<Deck>>>;
  dockingUpdate?: Maybe<Array<Maybe<DockingPort>>>;
  speedChange?: Maybe<Engine>;
  heatChange?: Maybe<Engine>;
  engineUpdate?: Maybe<Engine>;
  exocompsUpdate?: Maybe<Array<Maybe<Exocomp>>>;
  flightsUpdate?: Maybe<Array<Maybe<Flight>>>;
  googleSheetsUpdate?: Maybe<Array<Maybe<GoogleSheets>>>;
  interfaceUpdate?: Maybe<Array<Maybe<Interface>>>;
  internalCommUpdate?: Maybe<Array<Maybe<InternalComm>>>;
  inventoryUpdate?: Maybe<Array<Maybe<InventoryItem>>>;
  isochipsUpdate?: Maybe<Array<Maybe<Isochip>>>;
  jumpDriveUpdate?: Maybe<Array<Maybe<JumpDrive>>>;
  keyboardUpdate?: Maybe<Array<Maybe<Keyboard>>>;
  libraryEntriesUpdate?: Maybe<Array<Maybe<LibraryEntry>>>;
  longRangeCommunicationsUpdate?: Maybe<Array<Maybe<LrCommunications>>>;
  macrosUpdate?: Maybe<Array<Maybe<Macro>>>;
  macroButtonsUpdate?: Maybe<Array<Maybe<MacroButtonConfig>>>;
  messageUpdates?: Maybe<Array<Maybe<Message>>>;
  sendMessage?: Maybe<Message>;
  midiSets?: Maybe<Array<Maybe<MidiSet>>>;
  missionsUpdate?: Maybe<Array<Maybe<Mission>>>;
  auxTimelinesUpdate?: Maybe<Array<Maybe<TimelineInstance>>>;
  motus?: Maybe<Array<Maybe<Motu>>>;
  motu?: Maybe<Motu>;
  motuChannel?: Maybe<MotuChannel>;
  motuSend?: Maybe<MotuPatch>;
  navigationUpdate?: Maybe<Array<Maybe<Navigation>>>;
  objectiveUpdate?: Maybe<Array<Maybe<Objective>>>;
  officerLogsUpdate?: Maybe<Array<Maybe<Log>>>;
  shipLogsUpdate?: Maybe<Array<Maybe<Log>>>;
  phasersUpdate?: Maybe<Array<Maybe<Phaser>>>;
  probesUpdate?: Maybe<Array<Maybe<Probes>>>;
  scienceProbeEmitter?: Maybe<ScienceProbeEvent>;
  railgunUpdate?: Maybe<Array<Maybe<Railgun>>>;
  reactorUpdate?: Maybe<Array<Maybe<Reactor>>>;
  recordSnippetsUpdate?: Maybe<Array<Maybe<RecordSnippet>>>;
  recordTemplatesUpdate?: Maybe<Array<Maybe<RecordSnippet>>>;
  roomsUpdate?: Maybe<Array<Maybe<Room>>>;
  sensorsUpdate?: Maybe<Array<Maybe<Sensors>>>;
  sensorContactUpdate?: Maybe<Array<Maybe<SensorContact>>>;
  sensorsPing?: Maybe<Scalars["String"]>;
  setsUpdate?: Maybe<Array<Maybe<Set>>>;
  shieldsUpdate?: Maybe<Array<Maybe<Shield>>>;
  notify?: Maybe<Notification>;
  widgetNotify?: Maybe<Scalars["String"]>;
  shortRangeCommUpdate?: Maybe<Array<Maybe<ShortRangeComm>>>;
  sickbayUpdate?: Maybe<Array<Maybe<Sickbay>>>;
  signalJammersUpdate?: Maybe<Array<Maybe<SignalJammer>>>;
  simulatorsUpdate?: Maybe<Array<Maybe<Simulator>>>;
  softwarePanelsUpdate?: Maybe<Array<Maybe<SoftwarePanel>>>;
  stationSetUpdate?: Maybe<Array<Maybe<StationSet>>>;
  stealthFieldUpdate?: Maybe<Array<Maybe<StealthField>>>;
  subspaceFieldUpdate?: Maybe<Array<Maybe<SubspaceField>>>;
  surveyformUpdate?: Maybe<Array<Maybe<SurveyForm>>>;
  systemsUpdate?: Maybe<Array<Maybe<System>>>;
  tacticalMapsUpdate?: Maybe<Array<Maybe<TacticalMap>>>;
  tacticalMapUpdate?: Maybe<TacticalMap>;
  targetingUpdate?: Maybe<Array<Maybe<Targeting>>>;
  taskReportUpdate?: Maybe<Array<Maybe<TaskReport>>>;
  tasksUpdate?: Maybe<Array<Maybe<Task>>>;
  taskTemplatesUpdate?: Maybe<Array<Maybe<TaskTemplate>>>;
  teamsUpdate?: Maybe<Array<Maybe<Team>>>;
  _templateUpdate?: Maybe<Template>;
  thoriumUpdate?: Maybe<Thorium>;
  clockSync?: Maybe<Scalars["String"]>;
  rotationChange?: Maybe<Thruster>;
  thxUpdate?: Maybe<Array<Maybe<Thx>>>;
  torpedosUpdate?: Maybe<Array<Maybe<Torpedo>>>;
  tractorBeamUpdate?: Maybe<Array<Maybe<TractorBeam>>>;
  transporterUpdate?: Maybe<Transporter>;
  transwarpUpdate?: Maybe<Array<Maybe<Transwarp>>>;
  triggersUpdate?: Maybe<Array<Maybe<Trigger>>>;
  viewscreensUpdate?: Maybe<Array<Maybe<Viewscreen>>>;
  viewscreenVideoToggle?: Maybe<Scalars["Boolean"]>;
  countermeasuresUpdate?: Maybe<Countermeasures>;
  entity?: Maybe<Array<Maybe<EntityPatch>>>;
  entities?: Maybe<Array<Maybe<EntitiesPatch>>>;
};

export type SubscriptionActionsUpdateArgs = {
  simulatorId: Scalars["ID"];
  stationId?: Maybe<Scalars["ID"]>;
  clientId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionClientChangedArgs = {
  all?: Maybe<Scalars["Boolean"]>;
  clientId?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  stationName?: Maybe<Scalars["String"]>;
  flightId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionClientPingArgs = {
  clientId: Scalars["ID"];
};

export type SubscriptionKeypadsUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionKeypadUpdateArgs = {
  client: Scalars["ID"];
};

export type SubscriptionScannersUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionScannerUpdateArgs = {
  client: Scalars["ID"];
};

export type SubscriptionCommandLineOutputUpdateArgs = {
  clientId: Scalars["ID"];
};

export type SubscriptionCommandLinesOutputUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionClearCacheArgs = {
  client?: Maybe<Scalars["ID"]>;
  flight?: Maybe<Scalars["ID"]>;
};

export type SubscriptionSoundSubArgs = {
  clientId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionCancelSoundArgs = {
  clientId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionCancelAllSoundsArgs = {
  clientId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionCancelLoopingSoundsArgs = {
  clientId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionCommandLineUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionComputerCoreUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionCoolantUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionCoolantSystemUpdateArgs = {
  simulatorId: Scalars["ID"];
  systemId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionCoreFeedUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionSyncTimeArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionCrewUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  position?: Maybe<Scalars["String"]>;
  killed?: Maybe<Scalars["Boolean"]>;
};

export type SubscriptionCrewCountUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  position?: Maybe<Scalars["String"]>;
  killed?: Maybe<Scalars["Boolean"]>;
};

export type SubscriptionCrmUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionCrmMovementUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionCrmFighterUpdateArgs = {
  simulatorId: Scalars["ID"];
  clientId: Scalars["ID"];
};

export type SubscriptionDecksUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionDockingUpdateArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Docking_Types>;
};

export type SubscriptionSpeedChangeArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionHeatChangeArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionEngineUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionExocompsUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionFlightsUpdateArgs = {
  running?: Maybe<Scalars["Boolean"]>;
  id?: Maybe<Scalars["ID"]>;
};

export type SubscriptionGoogleSheetsUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionInterfaceUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionInternalCommUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionInventoryUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionIsochipsUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionJumpDriveUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionLibraryEntriesUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  all?: Maybe<Scalars["Boolean"]>;
};

export type SubscriptionLongRangeCommunicationsUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionMessageUpdatesArgs = {
  simulatorId: Scalars["ID"];
  station?: Maybe<Scalars["String"]>;
};

export type SubscriptionSendMessageArgs = {
  simulatorId: Scalars["ID"];
  station?: Maybe<Scalars["String"]>;
};

export type SubscriptionMidiSetsArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionMissionsUpdateArgs = {
  missionId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionAuxTimelinesUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionMotuArgs = {
  id: Scalars["ID"];
};

export type SubscriptionMotuChannelArgs = {
  id: Scalars["ID"];
  channelId: Scalars["ID"];
};

export type SubscriptionMotuSendArgs = {
  id: Scalars["ID"];
  inputId: Scalars["ID"];
  outputId: Scalars["ID"];
};

export type SubscriptionNavigationUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionObjectiveUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionOfficerLogsUpdateArgs = {
  clientId?: Maybe<Scalars["ID"]>;
  flightId: Scalars["ID"];
};

export type SubscriptionShipLogsUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionPhasersUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionProbesUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionScienceProbeEmitterArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionRailgunUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionReactorUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionRecordSnippetsUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  visible?: Maybe<Scalars["Boolean"]>;
};

export type SubscriptionRoomsUpdateArgs = {
  simulatorId: Scalars["ID"];
  role?: Maybe<RoomRoles>;
};

export type SubscriptionSensorsUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  domain?: Maybe<Scalars["String"]>;
};

export type SubscriptionSensorContactUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  sensorId?: Maybe<Scalars["ID"]>;
  hostile?: Maybe<Scalars["Boolean"]>;
  type?: Maybe<Scalars["String"]>;
};

export type SubscriptionSensorsPingArgs = {
  sensorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionShieldsUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionNotifyArgs = {
  simulatorId: Scalars["ID"];
  station?: Maybe<Scalars["String"]>;
  trigger?: Maybe<Scalars["String"]>;
};

export type SubscriptionWidgetNotifyArgs = {
  simulatorId: Scalars["ID"];
  station?: Maybe<Scalars["String"]>;
};

export type SubscriptionShortRangeCommUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionSickbayUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionSignalJammersUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionSimulatorsUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  template?: Maybe<Scalars["Boolean"]>;
};

export type SubscriptionSoftwarePanelsUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionStealthFieldUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionSubspaceFieldUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionSurveyformUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  active?: Maybe<Scalars["Boolean"]>;
};

export type SubscriptionSystemsUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  power?: Maybe<Scalars["Boolean"]>;
  heat?: Maybe<Scalars["Boolean"]>;
  extra?: Maybe<Scalars["Boolean"]>;
  damageWhich?: Maybe<Scalars["String"]>;
};

export type SubscriptionTacticalMapsUpdateArgs = {
  flightId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionTacticalMapUpdateArgs = {
  id: Scalars["ID"];
  lowInterval?: Maybe<Scalars["Boolean"]>;
};

export type SubscriptionTargetingUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionTaskReportUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  cleared?: Maybe<Scalars["Boolean"]>;
};

export type SubscriptionTasksUpdateArgs = {
  simulatorId: Scalars["ID"];
  station?: Maybe<Scalars["String"]>;
  definitions?: Maybe<Array<Scalars["String"]>>;
};

export type SubscriptionTeamsUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  cleared?: Maybe<Scalars["Boolean"]>;
};

export type Subscription_TemplateUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionRotationChangeArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionThxUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionTorpedosUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionTractorBeamUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionTransporterUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionTranswarpUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionTriggersUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionViewscreensUpdateArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionViewscreenVideoToggleArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  viewscreenId?: Maybe<Scalars["ID"]>;
};

export type SubscriptionCountermeasuresUpdateArgs = {
  simulatorId: Scalars["ID"];
};

export type SubscriptionEntityArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type SubscriptionEntitiesArgs = {
  flightId: Scalars["ID"];
};

export type SubspaceField = SystemInterface & {
  __typename?: "SubspaceField";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  damage?: Maybe<Damage>;
  power?: Maybe<Power>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  totalPower?: Maybe<Scalars["Int"]>;
  fore?: Maybe<SubspaceFieldSector>;
  aft?: Maybe<SubspaceFieldSector>;
  port?: Maybe<SubspaceFieldSector>;
  starboard?: Maybe<SubspaceFieldSector>;
  ventral?: Maybe<SubspaceFieldSector>;
  dorsal?: Maybe<SubspaceFieldSector>;
};

export type SubspaceFieldSector = {
  __typename?: "SubspaceFieldSector";
  required?: Maybe<Scalars["Int"]>;
  value?: Maybe<Scalars["Int"]>;
};

export type SurveyForm = {
  __typename?: "SurveyForm";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
  active?: Maybe<Scalars["Boolean"]>;
  googleSpreadsheet?: Maybe<Scalars["ID"]>;
  googleSpreadsheetName?: Maybe<Scalars["String"]>;
  googleSheet?: Maybe<Scalars["String"]>;
  form?: Maybe<Array<Maybe<FormFields>>>;
  results?: Maybe<Array<Maybe<FormResults>>>;
};

export type System = SystemInterface & {
  __typename?: "System";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  upgradeMacros?: Maybe<Array<Maybe<TimelineItem>>>;
  upgradeBoard?: Maybe<Scalars["ID"]>;
  extra?: Maybe<Scalars["Boolean"]>;
  damage?: Maybe<Damage>;
  power?: Maybe<Power>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  heat?: Maybe<Scalars["Float"]>;
  coolant?: Maybe<Scalars["Float"]>;
  heatRate?: Maybe<Scalars["Float"]>;
  isochips?: Maybe<Array<Maybe<Isochip>>>;
  locations?: Maybe<Array<Maybe<Room>>>;
  requiredDamageSteps?: Maybe<Array<Maybe<DamageStep>>>;
  optionalDamageSteps?: Maybe<Array<Maybe<DamageStep>>>;
  damageTasks?: Maybe<Array<Maybe<DamageTask>>>;
};

export type SystemCoolant = {
  __typename?: "SystemCoolant";
  systemId?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  coolant?: Maybe<Scalars["Float"]>;
  coolantRate?: Maybe<Scalars["Float"]>;
};

export type SystemInterface = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  damage?: Maybe<Damage>;
  power?: Maybe<Power>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
};

export enum Tactical_Types {
  Grid = "grid",
  Image = "image",
  Objects = "objects",
  Path = "path",
  Video = "video",
}

export type TacticalItem = {
  __typename?: "TacticalItem";
  id?: Maybe<Scalars["ID"]>;
  layerId?: Maybe<Scalars["ID"]>;
  label?: Maybe<Scalars["String"]>;
  font?: Maybe<Scalars["String"]>;
  fontSize?: Maybe<Scalars["Float"]>;
  fontColor?: Maybe<Scalars["String"]>;
  flash?: Maybe<Scalars["Boolean"]>;
  icon?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  opacity?: Maybe<Scalars["Float"]>;
  speed?: Maybe<Scalars["Float"]>;
  velocity?: Maybe<Coordinates>;
  location?: Maybe<Coordinates>;
  locationJson?: Maybe<Scalars["String"]>;
  destination?: Maybe<Coordinates>;
  rotation?: Maybe<Scalars["Float"]>;
  wasd?: Maybe<Scalars["Boolean"]>;
  ijkl?: Maybe<Scalars["Boolean"]>;
  thrusters?: Maybe<Scalars["Boolean"]>;
  rotationMatch?: Maybe<Scalars["Boolean"]>;
  thrusterControls?: Maybe<ThrusterControls>;
};

export type TacticalItemInput = {
  id?: Maybe<Scalars["ID"]>;
  label?: Maybe<Scalars["String"]>;
  font?: Maybe<Scalars["String"]>;
  fontSize?: Maybe<Scalars["Float"]>;
  fontColor?: Maybe<Scalars["String"]>;
  flash?: Maybe<Scalars["Boolean"]>;
  icon?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  opacity?: Maybe<Scalars["Float"]>;
  speed?: Maybe<Scalars["Float"]>;
  velocity?: Maybe<CoordinatesInput>;
  location?: Maybe<CoordinatesInput>;
  destination?: Maybe<CoordinatesInput>;
  rotation?: Maybe<Scalars["Float"]>;
  wasd?: Maybe<Scalars["Boolean"]>;
  ijkl?: Maybe<Scalars["Boolean"]>;
  thrusters?: Maybe<Scalars["Boolean"]>;
  rotationMatch?: Maybe<Scalars["Boolean"]>;
  thrusterControls?: Maybe<ThrusterControlsInput>;
};

export type TacticalLayer = {
  __typename?: "TacticalLayer";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Tactical_Types>;
  opacity?: Maybe<Scalars["Float"]>;
  items?: Maybe<Array<Maybe<TacticalItem>>>;
  image?: Maybe<Scalars["String"]>;
  color?: Maybe<Scalars["String"]>;
  labels?: Maybe<Scalars["Boolean"]>;
  gridCols?: Maybe<Scalars["Int"]>;
  gridRows?: Maybe<Scalars["Int"]>;
  paths?: Maybe<Array<Maybe<TacticalPath>>>;
  advance?: Maybe<Scalars["Boolean"]>;
  asset?: Maybe<Scalars["String"]>;
  autoplay?: Maybe<Scalars["Boolean"]>;
  loop?: Maybe<Scalars["Boolean"]>;
  playbackSpeed?: Maybe<Scalars["Float"]>;
};

export type TacticalLayerInput = {
  id?: Maybe<Scalars["ID"]>;
  type?: Maybe<Tactical_Types>;
  opacity?: Maybe<Scalars["Float"]>;
  image?: Maybe<Scalars["String"]>;
  color?: Maybe<Scalars["String"]>;
  labels?: Maybe<Scalars["Boolean"]>;
  gridCols?: Maybe<Scalars["Int"]>;
  gridRows?: Maybe<Scalars["Int"]>;
  advance?: Maybe<Scalars["Boolean"]>;
  asset?: Maybe<Scalars["String"]>;
  autoplay?: Maybe<Scalars["Boolean"]>;
  loop?: Maybe<Scalars["Boolean"]>;
  playbackSpeed?: Maybe<Scalars["Float"]>;
};

export type TacticalMap = {
  __typename?: "TacticalMap";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  template?: Maybe<Scalars["Boolean"]>;
  flight?: Maybe<Flight>;
  layers?: Maybe<Array<Maybe<TacticalLayer>>>;
  frozen?: Maybe<Scalars["Boolean"]>;
  interval?: Maybe<Scalars["Float"]>;
};

export type TacticalPath = {
  __typename?: "TacticalPath";
  id?: Maybe<Scalars["ID"]>;
  layerId?: Maybe<Scalars["ID"]>;
  start?: Maybe<Coordinates>;
  end?: Maybe<Coordinates>;
  c1?: Maybe<Coordinates>;
  c2?: Maybe<Coordinates>;
  color?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Float"]>;
  arrow?: Maybe<Scalars["Boolean"]>;
};

export type TacticalPathInput = {
  id?: Maybe<Scalars["ID"]>;
  start?: Maybe<CoordinatesInput>;
  end?: Maybe<CoordinatesInput>;
  c1?: Maybe<CoordinatesInput>;
  c2?: Maybe<CoordinatesInput>;
  color?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Float"]>;
  arrow?: Maybe<Scalars["Boolean"]>;
};

export type TargetClassInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  icon?: Maybe<Scalars["String"]>;
  picture?: Maybe<Scalars["String"]>;
  speed?: Maybe<Scalars["Float"]>;
  quadrant?: Maybe<Scalars["Int"]>;
  moving?: Maybe<Scalars["Boolean"]>;
  clickToTarget?: Maybe<Scalars["Boolean"]>;
};

export type Targeting = SystemInterface & {
  __typename?: "Targeting";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  power?: Maybe<Power>;
  damage?: Maybe<Damage>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  contacts?: Maybe<Array<Maybe<TargetingContact>>>;
  classes?: Maybe<Array<Maybe<TargetingClass>>>;
  quadrants?: Maybe<Scalars["Boolean"]>;
  range?: Maybe<Scalars["Float"]>;
  coordinateTargeting?: Maybe<Scalars["Boolean"]>;
  interference?: Maybe<Scalars["Float"]>;
  targetedSensorContact?: Maybe<SensorContact>;
  calculatedTarget?: Maybe<StringCoordinates>;
  enteredTarget?: Maybe<StringCoordinates>;
};

export type TargetingClass = {
  __typename?: "TargetingClass";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  icon?: Maybe<Scalars["String"]>;
  picture?: Maybe<Scalars["String"]>;
  speed?: Maybe<Scalars["Float"]>;
  quadrant?: Maybe<Scalars["Int"]>;
  moving?: Maybe<Scalars["Boolean"]>;
  clickToTarget?: Maybe<Scalars["Boolean"]>;
};

export type TargetingContact = {
  __typename?: "TargetingContact";
  id?: Maybe<Scalars["ID"]>;
  class?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  targeted?: Maybe<Scalars["Boolean"]>;
  system?: Maybe<Scalars["String"]>;
  icon?: Maybe<Scalars["String"]>;
  picture?: Maybe<Scalars["String"]>;
  speed?: Maybe<Scalars["Float"]>;
  quadrant?: Maybe<Scalars["Int"]>;
  destroyed?: Maybe<Scalars["Boolean"]>;
  moving?: Maybe<Scalars["Boolean"]>;
  clickToTarget?: Maybe<Scalars["Boolean"]>;
};

export type Task = {
  __typename?: "Task";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  station?: Maybe<Scalars["String"]>;
  systemId?: Maybe<Scalars["ID"]>;
  deck?: Maybe<Deck>;
  room?: Maybe<Room>;
  definition?: Maybe<Scalars["String"]>;
  verified?: Maybe<Scalars["Boolean"]>;
  verifyRequested?: Maybe<Scalars["Boolean"]>;
  dismissed?: Maybe<Scalars["Boolean"]>;
  values?: Maybe<Scalars["JSON"]>;
  instructions?: Maybe<Scalars["String"]>;
  startTime?: Maybe<Scalars["String"]>;
  endTime?: Maybe<Scalars["String"]>;
  timeElapsedInMS?: Maybe<Scalars["Int"]>;
  macros?: Maybe<Array<Maybe<TimelineItem>>>;
  assigned?: Maybe<Scalars["Boolean"]>;
};

export type TaskDefinition = {
  __typename?: "TaskDefinition";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  class?: Maybe<Scalars["String"]>;
  stations?: Maybe<Array<Maybe<Station>>>;
  active?: Maybe<Scalars["Boolean"]>;
  valuesInput?: Maybe<Scalars["JSON"]>;
  valuesValue?: Maybe<Scalars["JSON"]>;
};

export type TaskInput = {
  simulatorId?: Maybe<Scalars["ID"]>;
  definition?: Maybe<Scalars["String"]>;
  values?: Maybe<Scalars["JSON"]>;
  station?: Maybe<Scalars["String"]>;
  macros?: Maybe<Array<Maybe<TimelineItemInput>>>;
  preMacros?: Maybe<Array<Maybe<TimelineItemInput>>>;
};

export type TaskReport = {
  __typename?: "TaskReport";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  system?: Maybe<System>;
  type?: Maybe<Scalars["String"]>;
  stepCount?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
  tasks?: Maybe<Array<Maybe<Task>>>;
};

export type TaskTemplate = {
  __typename?: "TaskTemplate";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  values?: Maybe<Scalars["JSON"]>;
  definition?: Maybe<Scalars["String"]>;
  reportTypes?: Maybe<Array<Maybe<Scalars["String"]>>>;
  macros?: Maybe<Array<Maybe<TimelineItem>>>;
  preMacros?: Maybe<Array<Maybe<TimelineItem>>>;
};

export type Team = {
  __typename?: "Team";
  id?: Maybe<Scalars["ID"]>;
  type?: Maybe<Team_Types>;
  simulatorId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  priority?: Maybe<Priorities>;
  location?: Maybe<Location>;
  orders?: Maybe<Scalars["String"]>;
  officers?: Maybe<Array<Maybe<Crew>>>;
  cleared?: Maybe<Scalars["Boolean"]>;
};

export enum Team_Types {
  Security = "security",
  Damage = "damage",
  Medical = "medical",
}

export type TeamCount = {
  __typename?: "TeamCount";
  team?: Maybe<Team>;
  count?: Maybe<Scalars["Int"]>;
};

export type TeamCountInput = {
  __typename?: "TeamCountInput";
  team?: Maybe<Scalars["ID"]>;
  count?: Maybe<Scalars["Int"]>;
};

export type TeamInput = {
  id?: Maybe<Scalars["ID"]>;
  type?: Maybe<Team_Types>;
  simulatorId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  priority?: Maybe<Priorities>;
  location?: Maybe<Scalars["String"]>;
  orders?: Maybe<Scalars["String"]>;
  officers?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type Template = {
  __typename?: "Template";
  id?: Maybe<Scalars["ID"]>;
};

export enum Terminal_Status {
  F = "F",
  O = "O",
  S = "S",
  R = "R",
}

export type Thorium = {
  __typename?: "Thorium";
  thoriumId?: Maybe<Scalars["String"]>;
  doTrack?: Maybe<Scalars["Boolean"]>;
  askedToTrack?: Maybe<Scalars["Boolean"]>;
  addedTaskTemplates?: Maybe<Scalars["Boolean"]>;
  spaceEdventuresToken?: Maybe<Scalars["String"]>;
  spaceEdventuresCenter?: Maybe<SpaceEdventuresCenter>;
  port?: Maybe<Scalars["Int"]>;
  httpOnly?: Maybe<Scalars["Boolean"]>;
};

export type Thruster = SystemInterface & {
  __typename?: "Thruster";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  type?: Maybe<Scalars["String"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  direction?: Maybe<Coordinates>;
  rotation?: Maybe<Rotation>;
  rotationDelta?: Maybe<Rotation>;
  rotationRequired?: Maybe<Rotation>;
  manualThrusters?: Maybe<Scalars["Boolean"]>;
  power?: Maybe<Power>;
  damage?: Maybe<Damage>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  rotationSpeed?: Maybe<Scalars["Float"]>;
  movementSpeed?: Maybe<Scalars["Float"]>;
};

export type ThrusterControls = {
  __typename?: "ThrusterControls";
  rotation?: Maybe<Scalars["String"]>;
  reversed?: Maybe<Scalars["Boolean"]>;
  matchRotation?: Maybe<Scalars["Boolean"]>;
  up?: Maybe<Scalars["String"]>;
  down?: Maybe<Scalars["String"]>;
  left?: Maybe<Scalars["String"]>;
  right?: Maybe<Scalars["String"]>;
};

export type ThrusterControlsInput = {
  rotation?: Maybe<Scalars["String"]>;
  reversed?: Maybe<Scalars["Boolean"]>;
  matchRotation?: Maybe<Scalars["Boolean"]>;
  up?: Maybe<Scalars["String"]>;
  down?: Maybe<Scalars["String"]>;
  left?: Maybe<Scalars["String"]>;
  right?: Maybe<Scalars["String"]>;
};

export type Thx = SystemInterface & {
  __typename?: "Thx";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  damage?: Maybe<Damage>;
  power?: Maybe<Power>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  activated?: Maybe<Scalars["Boolean"]>;
  clients?: Maybe<Array<Maybe<ThxClient>>>;
};

export type ThxClient = {
  __typename?: "ThxClient";
  id?: Maybe<Scalars["ID"]>;
  charge?: Maybe<Scalars["Float"]>;
  lock?: Maybe<Scalars["Boolean"]>;
  station?: Maybe<Station>;
  executive?: Maybe<Scalars["Boolean"]>;
  connected?: Maybe<Scalars["Boolean"]>;
};

export enum Timeline_Item_Config_Type {
  Client = "client",
  Station = "station",
}

export type TimelineInstance = {
  __typename?: "TimelineInstance";
  id?: Maybe<Scalars["ID"]>;
  mission?: Maybe<Mission>;
  currentTimelineStep?: Maybe<Scalars["Int"]>;
  executedTimelineSteps?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type TimelineItem = {
  __typename?: "TimelineItem";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  event?: Maybe<Scalars["String"]>;
  needsConfig?: Maybe<Scalars["Boolean"]>;
  args?: Maybe<Scalars["String"]>;
  delay?: Maybe<Scalars["Int"]>;
  noCancelOnReset?: Maybe<Scalars["Boolean"]>;
};

export type TimelineItemInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  event?: Maybe<Scalars["String"]>;
  args?: Maybe<Scalars["String"]>;
  delay?: Maybe<Scalars["Int"]>;
  noCancelOnReset?: Maybe<Scalars["Boolean"]>;
};

export type TimelineStep = {
  __typename?: "TimelineStep";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  order?: Maybe<Scalars["Int"]>;
  timelineItems?: Maybe<Array<Maybe<TimelineItem>>>;
};

export type Timer = {
  __typename?: "Timer";
  time?: Maybe<Scalars["String"]>;
  active?: Maybe<Scalars["Boolean"]>;
};

export type Torpedo = SystemInterface & {
  __typename?: "Torpedo";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  power?: Maybe<Power>;
  damage?: Maybe<Damage>;
  inventory?: Maybe<Array<Maybe<Warhead>>>;
  loaded?: Maybe<Scalars["ID"]>;
  state?: Maybe<Scalars["String"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
};

export type TractorBeam = SystemInterface & {
  __typename?: "TractorBeam";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  power?: Maybe<Power>;
  damage?: Maybe<Damage>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  state?: Maybe<Scalars["Boolean"]>;
  target?: Maybe<Scalars["Boolean"]>;
  targetLabel?: Maybe<Scalars["String"]>;
  strength?: Maybe<Scalars["Float"]>;
  stress?: Maybe<Scalars["Float"]>;
  scanning?: Maybe<Scalars["Boolean"]>;
};

export type Transporter = SystemInterface & {
  __typename?: "Transporter";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  targets?: Maybe<Array<Maybe<TransporterTarget>>>;
  requestedTarget?: Maybe<Scalars["String"]>;
  destination?: Maybe<Scalars["String"]>;
  charge?: Maybe<Scalars["Float"]>;
  state?: Maybe<Scalars["String"]>;
  power?: Maybe<Power>;
  damage?: Maybe<Damage>;
  chargeSpeed?: Maybe<Scalars["Float"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
};

export type TransporterInput = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  requestedTarget?: Maybe<Scalars["String"]>;
  destination?: Maybe<Scalars["String"]>;
  charge?: Maybe<Scalars["Float"]>;
  state?: Maybe<Scalars["String"]>;
};

export type TransporterTarget = {
  __typename?: "TransporterTarget";
  id?: Maybe<Scalars["ID"]>;
  icon?: Maybe<Scalars["String"]>;
  moving?: Maybe<Scalars["Boolean"]>;
  position?: Maybe<Coordinates>;
};

export type Transwarp = SystemInterface & {
  __typename?: "Transwarp";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  damage?: Maybe<Damage>;
  power?: Maybe<Power>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  locations?: Maybe<Array<Maybe<Room>>>;
  heat?: Maybe<Scalars["Float"]>;
  heatRate?: Maybe<Scalars["Float"]>;
  coolant?: Maybe<Scalars["Float"]>;
  active?: Maybe<Scalars["Boolean"]>;
  quad1?: Maybe<TranswarpQuad>;
  quad2?: Maybe<TranswarpQuad>;
  quad3?: Maybe<TranswarpQuad>;
  quad4?: Maybe<TranswarpQuad>;
};

export type TranswarpQuad = {
  __typename?: "TranswarpQuad";
  field?: Maybe<SubspaceFieldSector>;
  core?: Maybe<SubspaceFieldSector>;
  warp?: Maybe<SubspaceFieldSector>;
};

export type Trigger = {
  __typename?: "Trigger";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  components?: Maybe<Scalars["JSON"]>;
  connections?: Maybe<Scalars["JSON"]>;
  values?: Maybe<Scalars["JSON"]>;
  config?: Maybe<Scalars["JSON"]>;
};

export type Viewscreen = {
  __typename?: "Viewscreen";
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  component?: Maybe<Scalars["String"]>;
  data?: Maybe<Scalars["String"]>;
  auto?: Maybe<Scalars["Boolean"]>;
  secondary?: Maybe<Scalars["Boolean"]>;
  overlay?: Maybe<Scalars["Boolean"]>;
  pictureInPicture?: Maybe<ViewscreenPictureInPicture>;
};

export type ViewscreenPictureInPicture = {
  __typename?: "ViewscreenPictureInPicture";
  component?: Maybe<Scalars["String"]>;
  data?: Maybe<Scalars["JSON"]>;
  position?: Maybe<Pip_Position>;
  size?: Maybe<Pip_Size>;
};

export type Warhead = {
  __typename?: "Warhead";
  id?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  probe?: Maybe<Probe>;
};

export type WarheadInput = {
  type?: Maybe<Scalars["String"]>;
  probe?: Maybe<Scalars["ID"]>;
};

export type ClientDataFragment = {__typename?: "Client"} & Pick<
  Client,
  | "id"
  | "token"
  | "email"
  | "cracked"
  | "loginName"
  | "loginState"
  | "offlineState"
  | "hypercard"
  | "movie"
  | "training"
  | "caches"
  | "overlay"
  | "soundPlayer"
> & {
    flight: Maybe<
      {__typename?: "Flight"} & Pick<Flight, "id" | "name" | "date">
    >;
    simulator: Maybe<
      {__typename?: "Simulator"} & Pick<Simulator, "id" | "name">
    >;
    station: Maybe<{__typename?: "Station"} & Pick<Station, "name">>;
    currentCard: Maybe<
      {__typename?: "Card"} & Pick<Card, "name" | "component">
    >;
  };

export type ClientQueryVariables = {
  clientId: Scalars["ID"];
};

export type ClientQuery = {__typename?: "Query"} & {
  clients: Maybe<Array<Maybe<{__typename?: "Client"} & ClientDataFragment>>>;
};

export type ClientUpdateSubscriptionVariables = {
  clientId: Scalars["ID"];
};

export type ClientUpdateSubscription = {__typename?: "Subscription"} & {
  clientChanged: Maybe<
    Array<Maybe<{__typename?: "Client"} & ClientDataFragment>>
  >;
};

export type ClientPingMutationVariables = {
  clientId: Scalars["ID"];
};

export type ClientPingMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "clientPing"
>;

export type RegisterClientMutationVariables = {
  client: Scalars["ID"];
};

export type RegisterClientMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "clientConnect"
>;

export type RemoveClientMutationVariables = {
  client: Scalars["ID"];
};

export type RemoveClientMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "clientDisconnect"
>;

export type SimulatorDataFragment = {__typename?: "Simulator"} & Pick<
  Simulator,
  | "id"
  | "name"
  | "caps"
  | "alertlevel"
  | "layout"
  | "bridgeOfficerMessaging"
  | "training"
  | "hasPrinter"
  | "hasLegs"
  | "panels"
  | "flipped"
  | "soundEffects"
> & {
    assets: Maybe<
      {__typename?: "SimulatorAssets"} & Pick<
        SimulatorAssets,
        "mesh" | "texture" | "side" | "top" | "logo" | "bridge"
      >
    >;
    stations: Maybe<
      Array<
        Maybe<
          {__typename?: "Station"} & Pick<
            Station,
            | "name"
            | "login"
            | "training"
            | "ambiance"
            | "executive"
            | "layout"
            | "messageGroups"
            | "widgets"
          > & {
              cards: Maybe<
                Array<
                  Maybe<
                    {__typename?: "Card"} & Pick<
                      Card,
                      | "name"
                      | "component"
                      | "hidden"
                      | "assigned"
                      | "newStation"
                    >
                  >
                >
              >;
            }
        >
      >
    >;
  };

export type SimulatorQueryVariables = {
  simulatorId: Scalars["ID"];
};

export type SimulatorQuery = {__typename?: "Query"} & {
  simulators: Maybe<
    Array<Maybe<{__typename?: "Simulator"} & SimulatorDataFragment>>
  >;
};

export type SimulatorUpdateSubscriptionVariables = {
  simulatorId: Scalars["ID"];
};

export type SimulatorUpdateSubscription = {__typename?: "Subscription"} & {
  simulatorsUpdate: Maybe<
    Array<Maybe<{__typename?: "Simulator"} & SimulatorDataFragment>>
  >;
};

export type CountermeasureModuleFragment = {
  __typename?: "CountermeasureModule";
} & Pick<
  CountermeasureModule,
  "id" | "name" | "config" | "buildProgress" | "activated" | "powerRequirement"
> & {
    resourceRequirements: {__typename?: "CountermeasureResources"} & Pick<
      CountermeasureResources,
      "copper" | "titanium" | "carbon" | "plastic" | "plasma"
    >;
    configurationOptions: Array<
      {__typename?: "CountermeasureConfigOptions"} & Pick<
        CountermeasureConfigOptions,
        "type" | "label"
      >
    >;
  };

export type CountermeasureFragment = {__typename?: "Countermeasure"} & Pick<
  Countermeasure,
  | "id"
  | "name"
  | "locked"
  | "active"
  | "building"
  | "totalPowerUsed"
  | "readyToLaunch"
  | "powerUsage"
  | "availablePower"
  | "buildPercentage"
  | "note"
> & {
    modules: Array<
      {__typename?: "CountermeasureModule"} & CountermeasureModuleFragment
    >;
  };

export type CountermeasuresSubscriptionVariables = {
  simulatorId: Scalars["ID"];
};

export type CountermeasuresSubscription = {__typename?: "Subscription"} & {
  countermeasuresUpdate: Maybe<
    {__typename?: "Countermeasures"} & Pick<
      Countermeasures,
      "id" | "name" | "displayName"
    > & {
        damage: {__typename?: "Damage"} & Pick<Damage, "damaged">;
        power: {__typename?: "Power"} & Pick<Power, "power" | "powerLevels">;
        materials: {__typename?: "CountermeasureResources"} & Pick<
          CountermeasureResources,
          "copper" | "titanium" | "carbon" | "plastic" | "plasma"
        >;
        launched: Array<
          {__typename?: "Countermeasure"} & CountermeasureFragment
        >;
        slots: {__typename?: "CountermeasureSlot"} & {
          slot1: Maybe<
            {__typename?: "Countermeasure"} & CountermeasureFragment
          >;
          slot2: Maybe<
            {__typename?: "Countermeasure"} & CountermeasureFragment
          >;
          slot3: Maybe<
            {__typename?: "Countermeasure"} & CountermeasureFragment
          >;
          slot4: Maybe<
            {__typename?: "Countermeasure"} & CountermeasureFragment
          >;
          slot5: Maybe<
            {__typename?: "Countermeasure"} & CountermeasureFragment
          >;
          slot6: Maybe<
            {__typename?: "Countermeasure"} & CountermeasureFragment
          >;
          slot7: Maybe<
            {__typename?: "Countermeasure"} & CountermeasureFragment
          >;
          slot8: Maybe<
            {__typename?: "Countermeasure"} & CountermeasureFragment
          >;
        };
      }
  >;
};

export type CountermeasuresCoreSubscriptionVariables = {
  simulatorId: Scalars["ID"];
};

export type CountermeasuresCoreSubscription = {__typename?: "Subscription"} & {
  countermeasuresUpdate: Maybe<
    {__typename?: "Countermeasures"} & Pick<
      Countermeasures,
      "id" | "name" | "displayName"
    > & {
        materials: {__typename?: "CountermeasureResources"} & Pick<
          CountermeasureResources,
          "copper" | "titanium" | "carbon" | "plastic" | "plasma"
        >;
        launched: Array<
          {__typename?: "Countermeasure"} & Pick<
            Countermeasure,
            "id" | "name" | "powerUsage" | "availablePower"
          > & {
              modules: Array<
                {__typename?: "CountermeasureModule"} & Pick<
                  CountermeasureModule,
                  "id" | "name" | "config" | "activated"
                > & {
                    configurationOptions: Array<
                      {__typename?: "CountermeasureConfigOptions"} & Pick<
                        CountermeasureConfigOptions,
                        "type" | "label"
                      >
                    >;
                  }
              >;
            }
        >;
      }
  >;
};

export type CountermeasureModulesQueryVariables = {};

export type CountermeasureModulesQuery = {__typename?: "Query"} & {
  countermeasureModuleType: Array<
    {__typename?: "CountermeasureModule"} & Pick<
      CountermeasureModule,
      "id" | "name" | "description" | "powerRequirement"
    > & {
        resourceRequirements: {__typename?: "CountermeasureResources"} & Pick<
          CountermeasureResources,
          "copper" | "titanium" | "carbon" | "plastic" | "plasma"
        >;
        configurationOptions: Array<
          {__typename?: "CountermeasureConfigOptions"} & Pick<
            CountermeasureConfigOptions,
            "type" | "label"
          >
        >;
      }
  >;
};

export type CountermeasureRemoveModuleMutationVariables = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
  moduleId: Scalars["ID"];
};

export type CountermeasureRemoveModuleMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "countermeasuresRemoveModule">;

export type CountermeasureSetResourceMutationVariables = {
  id: Scalars["ID"];
  resource: Scalars["String"];
  value: Scalars["Float"];
};

export type CountermeasureSetResourceMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "countermeasuresSetResource">;

export type CountermeasuresActivateCountermeasureMutationVariables = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
};

export type CountermeasuresActivateCountermeasureMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "countermeasuresActivateCountermeasure">;

export type CountermeasuresAddModuleMutationVariables = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
  moduleType: Scalars["String"];
};

export type CountermeasuresAddModuleMutation = {__typename?: "Mutation"} & {
  countermeasuresAddModule: Maybe<
    {__typename?: "Countermeasure"} & Pick<Countermeasure, "id"> & {
        modules: Array<
          {__typename?: "CountermeasureModule"} & Pick<
            CountermeasureModule,
            | "id"
            | "name"
            | "description"
            | "powerRequirement"
            | "config"
            | "buildProgress"
            | "activated"
          > & {
              resourceRequirements: {
                __typename?: "CountermeasureResources";
              } & Pick<
                CountermeasureResources,
                "copper" | "titanium" | "plasma" | "carbon"
              >;
              configurationOptions: Array<
                {__typename?: "CountermeasureConfigOptions"} & Pick<
                  CountermeasureConfigOptions,
                  "type" | "label"
                >
              >;
            }
        >;
      }
  >;
};

export type CountermeasuresBuildCountermeasureMutationVariables = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
};

export type CountermeasuresBuildCountermeasureMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "countermeasuresBuildCountermeasure">;

export type CountermeasuresConfigureModuleMutationVariables = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
  moduleId: Scalars["ID"];
  config: Scalars["JSON"];
};

export type CountermeasuresConfigureModuleMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "countermeasuresConfigureModule">;

export type CountermeasureCreateCountermeasureMutationVariables = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
  name: Scalars["String"];
};

export type CountermeasureCreateCountermeasureMutation = {
  __typename?: "Mutation";
} & {
  countermeasuresCreateCountermeasure: Maybe<
    {__typename?: "Countermeasure"} & Pick<Countermeasure, "id">
  >;
};

export type CountermeasuresDeactivateCountermeasureMutationVariables = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
};

export type CountermeasuresDeactivateCountermeasureMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "countermeasuresDeactivateCountermeasure">;

export type CountermeasuresLaunchCountermeasureMutationVariables = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
};

export type CountermeasuresLaunchCountermeasureMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "countermeasuresLaunchCountermeasure">;

export type CountermeasuresLaunchUnlockedCountermeasuresMutationVariables = {
  id: Scalars["ID"];
};

export type CountermeasuresLaunchUnlockedCountermeasuresMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "countermeasuresLaunchUnlockedCountermeasures">;

export type CountermeasureRemoveCountermeasureMutationVariables = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
};

export type CountermeasureRemoveCountermeasureMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "countermeasuresRemoveCountermeasure">;

export type CountermeasuresRemoveModuleMutationVariables = {
  id: Scalars["ID"];
  slot: CountermeasureSlotEnum;
  moduleId: Scalars["ID"];
};

export type CountermeasuresRemoveModuleMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "countermeasuresRemoveModule">;

export type CountermeasuresSetFdNoteMutationVariables = {
  id: Scalars["ID"];
  countermeasureId: Scalars["ID"];
  note: Scalars["String"];
};

export type CountermeasuresSetFdNoteMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "countermeasuresSetFDNote"
>;

export type TemplateFragmentFragment = {__typename: "Template"} & Pick<
  Template,
  "id"
>;

export type TemplateQueryVariables = {
  simulatorId: Scalars["ID"];
};

export type TemplateQuery = {__typename?: "Query"} & {
  _template: Maybe<{__typename?: "Template"} & TemplateFragmentFragment>;
};

export type TemplateUpdateSubscriptionVariables = {
  simulatorId: Scalars["ID"];
};

export type TemplateUpdateSubscription = {__typename?: "Subscription"} & {
  _templateUpdate: Maybe<{__typename: "Template"} & TemplateFragmentFragment>;
};

export type ClientChangedSubscriptionVariables = {};

export type ClientChangedSubscription = {__typename?: "Subscription"} & {
  clientChanged: Maybe<
    Array<
      Maybe<
        {__typename?: "Client"} & Pick<
          Client,
          | "id"
          | "label"
          | "mobile"
          | "cards"
          | "loginName"
          | "loginState"
          | "training"
          | "soundPlayer"
        > & {
            flight: Maybe<
              {__typename?: "Flight"} & Pick<Flight, "id" | "name" | "date"> & {
                  simulators: Maybe<
                    Array<
                      Maybe<
                        {__typename?: "Simulator"} & Pick<
                          Simulator,
                          "id" | "name"
                        >
                      >
                    >
                  >;
                }
            >;
            simulator: Maybe<
              {__typename?: "Simulator"} & Pick<
                Simulator,
                "id" | "name" | "alertlevel" | "layout" | "interfaces"
              > & {
                  stations: Maybe<
                    Array<
                      Maybe<{__typename?: "Station"} & Pick<Station, "name">>
                    >
                  >;
                }
            >;
            station: Maybe<{__typename?: "Station"} & Pick<Station, "name">>;
          }
      >
    >
  >;
};

export type DisconnectClientMutationVariables = {
  client: Scalars["ID"];
};

export type DisconnectClientMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "clientDisconnect"
>;

export type FlightsSubSubscriptionVariables = {};

export type FlightsSubSubscription = {__typename?: "Subscription"} & {
  flightsUpdate: Maybe<
    Array<
      Maybe<
        {__typename?: "Flight"} & Pick<
          Flight,
          "id" | "name" | "date" | "running"
        > & {
            simulators: Maybe<
              Array<
                Maybe<
                  {__typename?: "Simulator"} & Pick<
                    Simulator,
                    "id" | "name"
                  > & {
                      stations: Maybe<
                        Array<
                          Maybe<
                            {__typename?: "Station"} & Pick<Station, "name">
                          >
                        >
                      >;
                    }
                >
              >
            >;
          }
      >
    >
  >;
};

export type ClientsInterfacesAndKeyboardsQueryVariables = {};

export type ClientsInterfacesAndKeyboardsQuery = {__typename?: "Query"} & {
  interfaces: Maybe<
    Array<Maybe<{__typename?: "Interface"} & Pick<Interface, "id" | "name">>>
  >;
  keyboard: Maybe<
    Array<Maybe<{__typename?: "Keyboard"} & Pick<Keyboard, "id" | "name">>>
  >;
};

export type SetClientFlightMutationVariables = {
  client: Scalars["ID"];
  id: Scalars["ID"];
};

export type SetClientFlightMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "clientSetFlight"
>;

export type SetClientSimulatorMutationVariables = {
  client: Scalars["ID"];
  id: Scalars["ID"];
};

export type SetClientSimulatorMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "clientSetSimulator"
>;

export type SetClientStationMutationVariables = {
  client: Scalars["ID"];
  id: Scalars["ID"];
};

export type SetClientStationMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "clientSetStation"
>;

export type SetSoundPlayerMutationVariables = {
  id: Scalars["ID"];
  soundPlayer: Scalars["Boolean"];
};

export type SetSoundPlayerMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "clientSetSoundPlayer"
>;

export type EntityCreateMutationVariables = {
  flightId: Scalars["ID"];
  position: EntityCoordinatesInput;
  name: Scalars["String"];
  color?: Maybe<Scalars["String"]>;
  meshType: MeshTypeEnum;
  materialMapAsset?: Maybe<Scalars["String"]>;
};

export type EntityCreateMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "entitySetLocation" | "entitySetIdentity" | "entitySetAppearance"
> & {entityCreate: {__typename?: "Entity"} & Pick<Entity, "id">};

export type EntityRemoveMutationVariables = {
  id: Array<Scalars["ID"]>;
};

export type EntityRemoveMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "entityRemove"
>;

export type EntitySetAppearanceMutationVariables = {
  id: Scalars["ID"];
  color?: Maybe<Scalars["String"]>;
  meshType?: Maybe<MeshTypeEnum>;
  modelAsset?: Maybe<Scalars["String"]>;
  materialMapAsset?: Maybe<Scalars["String"]>;
  scale?: Maybe<Scalars["Float"]>;
};

export type EntitySetAppearanceMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "entitySetAppearance"
>;

export type EntitySetIdentityMutationVariables = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type EntitySetIdentityMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "entitySetIdentity"
>;

export type EntitiesSetPositionMutationVariables = {
  entities: Array<EntitiesLocationInput>;
};

export type EntitiesSetPositionMutation = {__typename?: "Mutation"} & Pick<
  Mutation,
  "entitiesSetPosition"
>;

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}
const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: "INTERFACE",
        name: "SystemInterface",
        possibleTypes: [
          {
            name: "System",
          },
          {
            name: "CoolantTank",
          },
          {
            name: "Crm",
          },
          {
            name: "Engine",
          },
          {
            name: "InternalComm",
          },
          {
            name: "JumpDrive",
          },
          {
            name: "LRCommunications",
          },
          {
            name: "Navigation",
          },
          {
            name: "Phaser",
          },
          {
            name: "Probes",
          },
          {
            name: "Railgun",
          },
          {
            name: "Reactor",
          },
          {
            name: "Sensors",
          },
          {
            name: "Shield",
          },
          {
            name: "ShortRangeComm",
          },
          {
            name: "Sickbay",
          },
          {
            name: "SignalJammer",
          },
          {
            name: "StealthField",
          },
          {
            name: "SubspaceField",
          },
          {
            name: "Targeting",
          },
          {
            name: "Thruster",
          },
          {
            name: "Thx",
          },
          {
            name: "Torpedo",
          },
          {
            name: "TractorBeam",
          },
          {
            name: "Transporter",
          },
          {
            name: "Transwarp",
          },
          {
            name: "Countermeasures",
          },
        ],
      },
      {
        kind: "UNION",
        name: "Location",
        possibleTypes: [
          {
            name: "Deck",
          },
          {
            name: "Room",
          },
        ],
      },
      {
        kind: "INTERFACE",
        name: "Patch",
        possibleTypes: [
          {
            name: "EntityPatch",
          },
          {
            name: "EntitiesPatch",
          },
        ],
      },
      {
        kind: "INTERFACE",
        name: "HeatInterface",
        possibleTypes: [],
      },
    ],
  },
};
export default result;

export const ClientDataFragmentDoc = gql`
  fragment ClientData on Client {
    id
    token
    email
    cracked
    flight {
      id
      name
      date
    }
    simulator {
      id
      name
    }
    station {
      name
    }
    currentCard {
      name
      component
    }
    loginName
    loginState
    offlineState
    hypercard
    movie
    training
    caches
    overlay
    soundPlayer
  }
`;
export const SimulatorDataFragmentDoc = gql`
  fragment SimulatorData on Simulator {
    id
    name
    caps
    alertlevel
    layout
    bridgeOfficerMessaging
    training
    hasPrinter
    hasLegs
    panels
    flipped
    assets {
      mesh
      texture
      side
      top
      logo
      bridge
    }
    soundEffects
    stations {
      name
      login
      training
      ambiance
      executive
      layout
      messageGroups
      widgets
      cards {
        name
        component
        hidden
        assigned
        newStation
      }
    }
  }
`;
export const CountermeasureModuleFragmentDoc = gql`
  fragment CountermeasureModule on CountermeasureModule {
    id
    name
    config
    buildProgress
    activated
    powerRequirement
    resourceRequirements {
      copper
      titanium
      carbon
      plastic
      plasma
    }
    configurationOptions {
      type
      label
    }
  }
`;
export const CountermeasureFragmentDoc = gql`
  fragment Countermeasure on Countermeasure {
    id
    name
    modules {
      ...CountermeasureModule
    }
    locked
    active
    building
    totalPowerUsed
    readyToLaunch
    powerUsage
    availablePower
    buildPercentage
    note
  }
  ${CountermeasureModuleFragmentDoc}
`;
export const TemplateFragmentFragmentDoc = gql`
  fragment TemplateFragment on Template {
    id
    __typename
  }
`;
export const ClientDocument = gql`
  query Client($clientId: ID!) {
    clients(clientId: $clientId) {
      ...ClientData
    }
  }
  ${ClientDataFragmentDoc}
`;

/**
 * __useClientQuery__
 *
 * To run a query within a React component, call `useClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useClientQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ClientQuery,
    ClientQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<ClientQuery, ClientQueryVariables>(
    ClientDocument,
    baseOptions,
  );
}
export function useClientLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ClientQuery,
    ClientQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<ClientQuery, ClientQueryVariables>(
    ClientDocument,
    baseOptions,
  );
}
export type ClientQueryHookResult = ReturnType<typeof useClientQuery>;
export type ClientLazyQueryHookResult = ReturnType<typeof useClientLazyQuery>;
export type ClientQueryResult = ApolloReactCommon.QueryResult<
  ClientQuery,
  ClientQueryVariables
>;
export const ClientUpdateDocument = gql`
  subscription ClientUpdate($clientId: ID!) {
    clientChanged(clientId: $clientId) {
      ...ClientData
    }
  }
  ${ClientDataFragmentDoc}
`;

/**
 * __useClientUpdateSubscription__
 *
 * To run a query within a React component, call `useClientUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useClientUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientUpdateSubscription({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useClientUpdateSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    ClientUpdateSubscription,
    ClientUpdateSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    ClientUpdateSubscription,
    ClientUpdateSubscriptionVariables
  >(ClientUpdateDocument, baseOptions);
}
export type ClientUpdateSubscriptionHookResult = ReturnType<
  typeof useClientUpdateSubscription
>;
export type ClientUpdateSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  ClientUpdateSubscription
>;
export const ClientPingDocument = gql`
  mutation ClientPing($clientId: ID!) {
    clientPing(client: $clientId)
  }
`;
export type ClientPingMutationFn = ApolloReactCommon.MutationFunction<
  ClientPingMutation,
  ClientPingMutationVariables
>;

/**
 * __useClientPingMutation__
 *
 * To run a mutation, you first call `useClientPingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClientPingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clientPingMutation, { data, loading, error }] = useClientPingMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useClientPingMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ClientPingMutation,
    ClientPingMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ClientPingMutation,
    ClientPingMutationVariables
  >(ClientPingDocument, baseOptions);
}
export type ClientPingMutationHookResult = ReturnType<
  typeof useClientPingMutation
>;
export type ClientPingMutationResult = ApolloReactCommon.MutationResult<
  ClientPingMutation
>;
export type ClientPingMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ClientPingMutation,
  ClientPingMutationVariables
>;
export const RegisterClientDocument = gql`
  mutation RegisterClient($client: ID!) {
    clientConnect(client: $client)
  }
`;
export type RegisterClientMutationFn = ApolloReactCommon.MutationFunction<
  RegisterClientMutation,
  RegisterClientMutationVariables
>;

/**
 * __useRegisterClientMutation__
 *
 * To run a mutation, you first call `useRegisterClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerClientMutation, { data, loading, error }] = useRegisterClientMutation({
 *   variables: {
 *      client: // value for 'client'
 *   },
 * });
 */
export function useRegisterClientMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterClientMutation,
    RegisterClientMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RegisterClientMutation,
    RegisterClientMutationVariables
  >(RegisterClientDocument, baseOptions);
}
export type RegisterClientMutationHookResult = ReturnType<
  typeof useRegisterClientMutation
>;
export type RegisterClientMutationResult = ApolloReactCommon.MutationResult<
  RegisterClientMutation
>;
export type RegisterClientMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterClientMutation,
  RegisterClientMutationVariables
>;
export const RemoveClientDocument = gql`
  mutation RemoveClient($client: ID!) {
    clientDisconnect(client: $client)
  }
`;
export type RemoveClientMutationFn = ApolloReactCommon.MutationFunction<
  RemoveClientMutation,
  RemoveClientMutationVariables
>;

/**
 * __useRemoveClientMutation__
 *
 * To run a mutation, you first call `useRemoveClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeClientMutation, { data, loading, error }] = useRemoveClientMutation({
 *   variables: {
 *      client: // value for 'client'
 *   },
 * });
 */
export function useRemoveClientMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveClientMutation,
    RemoveClientMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RemoveClientMutation,
    RemoveClientMutationVariables
  >(RemoveClientDocument, baseOptions);
}
export type RemoveClientMutationHookResult = ReturnType<
  typeof useRemoveClientMutation
>;
export type RemoveClientMutationResult = ApolloReactCommon.MutationResult<
  RemoveClientMutation
>;
export type RemoveClientMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveClientMutation,
  RemoveClientMutationVariables
>;
export const SimulatorDocument = gql`
  query Simulator($simulatorId: ID!) {
    simulators(id: $simulatorId) {
      ...SimulatorData
    }
  }
  ${SimulatorDataFragmentDoc}
`;

/**
 * __useSimulatorQuery__
 *
 * To run a query within a React component, call `useSimulatorQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimulatorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimulatorQuery({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useSimulatorQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SimulatorQuery,
    SimulatorQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<SimulatorQuery, SimulatorQueryVariables>(
    SimulatorDocument,
    baseOptions,
  );
}
export function useSimulatorLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SimulatorQuery,
    SimulatorQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<SimulatorQuery, SimulatorQueryVariables>(
    SimulatorDocument,
    baseOptions,
  );
}
export type SimulatorQueryHookResult = ReturnType<typeof useSimulatorQuery>;
export type SimulatorLazyQueryHookResult = ReturnType<
  typeof useSimulatorLazyQuery
>;
export type SimulatorQueryResult = ApolloReactCommon.QueryResult<
  SimulatorQuery,
  SimulatorQueryVariables
>;
export const SimulatorUpdateDocument = gql`
  subscription SimulatorUpdate($simulatorId: ID!) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      ...SimulatorData
    }
  }
  ${SimulatorDataFragmentDoc}
`;

/**
 * __useSimulatorUpdateSubscription__
 *
 * To run a query within a React component, call `useSimulatorUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSimulatorUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimulatorUpdateSubscription({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useSimulatorUpdateSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    SimulatorUpdateSubscription,
    SimulatorUpdateSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    SimulatorUpdateSubscription,
    SimulatorUpdateSubscriptionVariables
  >(SimulatorUpdateDocument, baseOptions);
}
export type SimulatorUpdateSubscriptionHookResult = ReturnType<
  typeof useSimulatorUpdateSubscription
>;
export type SimulatorUpdateSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  SimulatorUpdateSubscription
>;
export const CountermeasuresDocument = gql`
  subscription Countermeasures($simulatorId: ID!) {
    countermeasuresUpdate(simulatorId: $simulatorId) {
      id
      name
      displayName
      damage {
        damaged
      }
      power {
        power
        powerLevels
      }
      materials {
        copper
        titanium
        carbon
        plastic
        plasma
      }
      launched {
        ...Countermeasure
      }
      slots {
        slot1 {
          ...Countermeasure
        }
        slot2 {
          ...Countermeasure
        }
        slot3 {
          ...Countermeasure
        }
        slot4 {
          ...Countermeasure
        }
        slot5 {
          ...Countermeasure
        }
        slot6 {
          ...Countermeasure
        }
        slot7 {
          ...Countermeasure
        }
        slot8 {
          ...Countermeasure
        }
      }
    }
  }
  ${CountermeasureFragmentDoc}
`;

/**
 * __useCountermeasuresSubscription__
 *
 * To run a query within a React component, call `useCountermeasuresSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCountermeasuresSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountermeasuresSubscription({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useCountermeasuresSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    CountermeasuresSubscription,
    CountermeasuresSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    CountermeasuresSubscription,
    CountermeasuresSubscriptionVariables
  >(CountermeasuresDocument, baseOptions);
}
export type CountermeasuresSubscriptionHookResult = ReturnType<
  typeof useCountermeasuresSubscription
>;
export type CountermeasuresSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  CountermeasuresSubscription
>;
export const CountermeasuresCoreDocument = gql`
  subscription CountermeasuresCore($simulatorId: ID!) {
    countermeasuresUpdate(simulatorId: $simulatorId) {
      id
      name
      displayName
      materials {
        copper
        titanium
        carbon
        plastic
        plasma
      }
      launched {
        id
        name
        modules {
          id
          name
          config
          activated
          configurationOptions {
            type
            label
          }
        }
        powerUsage
        availablePower
      }
    }
  }
`;

/**
 * __useCountermeasuresCoreSubscription__
 *
 * To run a query within a React component, call `useCountermeasuresCoreSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCountermeasuresCoreSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountermeasuresCoreSubscription({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useCountermeasuresCoreSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    CountermeasuresCoreSubscription,
    CountermeasuresCoreSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    CountermeasuresCoreSubscription,
    CountermeasuresCoreSubscriptionVariables
  >(CountermeasuresCoreDocument, baseOptions);
}
export type CountermeasuresCoreSubscriptionHookResult = ReturnType<
  typeof useCountermeasuresCoreSubscription
>;
export type CountermeasuresCoreSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  CountermeasuresCoreSubscription
>;
export const CountermeasureModulesDocument = gql`
  query CountermeasureModules {
    countermeasureModuleType {
      id
      name
      description
      powerRequirement
      resourceRequirements {
        copper
        titanium
        carbon
        plastic
        plasma
      }
      configurationOptions {
        type
        label
      }
    }
  }
`;

/**
 * __useCountermeasureModulesQuery__
 *
 * To run a query within a React component, call `useCountermeasureModulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountermeasureModulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountermeasureModulesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountermeasureModulesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CountermeasureModulesQuery,
    CountermeasureModulesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    CountermeasureModulesQuery,
    CountermeasureModulesQueryVariables
  >(CountermeasureModulesDocument, baseOptions);
}
export function useCountermeasureModulesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CountermeasureModulesQuery,
    CountermeasureModulesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    CountermeasureModulesQuery,
    CountermeasureModulesQueryVariables
  >(CountermeasureModulesDocument, baseOptions);
}
export type CountermeasureModulesQueryHookResult = ReturnType<
  typeof useCountermeasureModulesQuery
>;
export type CountermeasureModulesLazyQueryHookResult = ReturnType<
  typeof useCountermeasureModulesLazyQuery
>;
export type CountermeasureModulesQueryResult = ApolloReactCommon.QueryResult<
  CountermeasureModulesQuery,
  CountermeasureModulesQueryVariables
>;
export const CountermeasureRemoveModuleDocument = gql`
  mutation CountermeasureRemoveModule(
    $id: ID!
    $slot: CountermeasureSlotEnum!
    $moduleId: ID!
  ) {
    countermeasuresRemoveModule(id: $id, slot: $slot, moduleId: $moduleId)
  }
`;
export type CountermeasureRemoveModuleMutationFn = ApolloReactCommon.MutationFunction<
  CountermeasureRemoveModuleMutation,
  CountermeasureRemoveModuleMutationVariables
>;

/**
 * __useCountermeasureRemoveModuleMutation__
 *
 * To run a mutation, you first call `useCountermeasureRemoveModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountermeasureRemoveModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countermeasureRemoveModuleMutation, { data, loading, error }] = useCountermeasureRemoveModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      slot: // value for 'slot'
 *      moduleId: // value for 'moduleId'
 *   },
 * });
 */
export function useCountermeasureRemoveModuleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CountermeasureRemoveModuleMutation,
    CountermeasureRemoveModuleMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CountermeasureRemoveModuleMutation,
    CountermeasureRemoveModuleMutationVariables
  >(CountermeasureRemoveModuleDocument, baseOptions);
}
export type CountermeasureRemoveModuleMutationHookResult = ReturnType<
  typeof useCountermeasureRemoveModuleMutation
>;
export type CountermeasureRemoveModuleMutationResult = ApolloReactCommon.MutationResult<
  CountermeasureRemoveModuleMutation
>;
export type CountermeasureRemoveModuleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CountermeasureRemoveModuleMutation,
  CountermeasureRemoveModuleMutationVariables
>;
export const CountermeasureSetResourceDocument = gql`
  mutation CountermeasureSetResource(
    $id: ID!
    $resource: String!
    $value: Float!
  ) {
    countermeasuresSetResource(id: $id, resource: $resource, value: $value)
  }
`;
export type CountermeasureSetResourceMutationFn = ApolloReactCommon.MutationFunction<
  CountermeasureSetResourceMutation,
  CountermeasureSetResourceMutationVariables
>;

/**
 * __useCountermeasureSetResourceMutation__
 *
 * To run a mutation, you first call `useCountermeasureSetResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountermeasureSetResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countermeasureSetResourceMutation, { data, loading, error }] = useCountermeasureSetResourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      resource: // value for 'resource'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useCountermeasureSetResourceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CountermeasureSetResourceMutation,
    CountermeasureSetResourceMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CountermeasureSetResourceMutation,
    CountermeasureSetResourceMutationVariables
  >(CountermeasureSetResourceDocument, baseOptions);
}
export type CountermeasureSetResourceMutationHookResult = ReturnType<
  typeof useCountermeasureSetResourceMutation
>;
export type CountermeasureSetResourceMutationResult = ApolloReactCommon.MutationResult<
  CountermeasureSetResourceMutation
>;
export type CountermeasureSetResourceMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CountermeasureSetResourceMutation,
  CountermeasureSetResourceMutationVariables
>;
export const CountermeasuresActivateCountermeasureDocument = gql`
  mutation CountermeasuresActivateCountermeasure(
    $id: ID!
    $slot: CountermeasureSlotEnum!
  ) {
    countermeasuresActivateCountermeasure(id: $id, slot: $slot)
  }
`;
export type CountermeasuresActivateCountermeasureMutationFn = ApolloReactCommon.MutationFunction<
  CountermeasuresActivateCountermeasureMutation,
  CountermeasuresActivateCountermeasureMutationVariables
>;

/**
 * __useCountermeasuresActivateCountermeasureMutation__
 *
 * To run a mutation, you first call `useCountermeasuresActivateCountermeasureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountermeasuresActivateCountermeasureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countermeasuresActivateCountermeasureMutation, { data, loading, error }] = useCountermeasuresActivateCountermeasureMutation({
 *   variables: {
 *      id: // value for 'id'
 *      slot: // value for 'slot'
 *   },
 * });
 */
export function useCountermeasuresActivateCountermeasureMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CountermeasuresActivateCountermeasureMutation,
    CountermeasuresActivateCountermeasureMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CountermeasuresActivateCountermeasureMutation,
    CountermeasuresActivateCountermeasureMutationVariables
  >(CountermeasuresActivateCountermeasureDocument, baseOptions);
}
export type CountermeasuresActivateCountermeasureMutationHookResult = ReturnType<
  typeof useCountermeasuresActivateCountermeasureMutation
>;
export type CountermeasuresActivateCountermeasureMutationResult = ApolloReactCommon.MutationResult<
  CountermeasuresActivateCountermeasureMutation
>;
export type CountermeasuresActivateCountermeasureMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CountermeasuresActivateCountermeasureMutation,
  CountermeasuresActivateCountermeasureMutationVariables
>;
export const CountermeasuresAddModuleDocument = gql`
  mutation CountermeasuresAddModule(
    $id: ID!
    $slot: CountermeasureSlotEnum!
    $moduleType: String!
  ) {
    countermeasuresAddModule(id: $id, slot: $slot, moduleType: $moduleType) {
      id
      modules {
        id
        name
        description
        powerRequirement
        resourceRequirements {
          copper
          titanium
          plasma
          plasma
          carbon
        }
        configurationOptions {
          type
          label
        }
        config
        buildProgress
        activated
      }
    }
  }
`;
export type CountermeasuresAddModuleMutationFn = ApolloReactCommon.MutationFunction<
  CountermeasuresAddModuleMutation,
  CountermeasuresAddModuleMutationVariables
>;

/**
 * __useCountermeasuresAddModuleMutation__
 *
 * To run a mutation, you first call `useCountermeasuresAddModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountermeasuresAddModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countermeasuresAddModuleMutation, { data, loading, error }] = useCountermeasuresAddModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      slot: // value for 'slot'
 *      moduleType: // value for 'moduleType'
 *   },
 * });
 */
export function useCountermeasuresAddModuleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CountermeasuresAddModuleMutation,
    CountermeasuresAddModuleMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CountermeasuresAddModuleMutation,
    CountermeasuresAddModuleMutationVariables
  >(CountermeasuresAddModuleDocument, baseOptions);
}
export type CountermeasuresAddModuleMutationHookResult = ReturnType<
  typeof useCountermeasuresAddModuleMutation
>;
export type CountermeasuresAddModuleMutationResult = ApolloReactCommon.MutationResult<
  CountermeasuresAddModuleMutation
>;
export type CountermeasuresAddModuleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CountermeasuresAddModuleMutation,
  CountermeasuresAddModuleMutationVariables
>;
export const CountermeasuresBuildCountermeasureDocument = gql`
  mutation CountermeasuresBuildCountermeasure(
    $id: ID!
    $slot: CountermeasureSlotEnum!
  ) {
    countermeasuresBuildCountermeasure(id: $id, slot: $slot)
  }
`;
export type CountermeasuresBuildCountermeasureMutationFn = ApolloReactCommon.MutationFunction<
  CountermeasuresBuildCountermeasureMutation,
  CountermeasuresBuildCountermeasureMutationVariables
>;

/**
 * __useCountermeasuresBuildCountermeasureMutation__
 *
 * To run a mutation, you first call `useCountermeasuresBuildCountermeasureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountermeasuresBuildCountermeasureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countermeasuresBuildCountermeasureMutation, { data, loading, error }] = useCountermeasuresBuildCountermeasureMutation({
 *   variables: {
 *      id: // value for 'id'
 *      slot: // value for 'slot'
 *   },
 * });
 */
export function useCountermeasuresBuildCountermeasureMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CountermeasuresBuildCountermeasureMutation,
    CountermeasuresBuildCountermeasureMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CountermeasuresBuildCountermeasureMutation,
    CountermeasuresBuildCountermeasureMutationVariables
  >(CountermeasuresBuildCountermeasureDocument, baseOptions);
}
export type CountermeasuresBuildCountermeasureMutationHookResult = ReturnType<
  typeof useCountermeasuresBuildCountermeasureMutation
>;
export type CountermeasuresBuildCountermeasureMutationResult = ApolloReactCommon.MutationResult<
  CountermeasuresBuildCountermeasureMutation
>;
export type CountermeasuresBuildCountermeasureMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CountermeasuresBuildCountermeasureMutation,
  CountermeasuresBuildCountermeasureMutationVariables
>;
export const CountermeasuresConfigureModuleDocument = gql`
  mutation CountermeasuresConfigureModule(
    $id: ID!
    $slot: CountermeasureSlotEnum!
    $moduleId: ID!
    $config: JSON!
  ) {
    countermeasuresConfigureModule(
      id: $id
      slot: $slot
      moduleId: $moduleId
      config: $config
    )
  }
`;
export type CountermeasuresConfigureModuleMutationFn = ApolloReactCommon.MutationFunction<
  CountermeasuresConfigureModuleMutation,
  CountermeasuresConfigureModuleMutationVariables
>;

/**
 * __useCountermeasuresConfigureModuleMutation__
 *
 * To run a mutation, you first call `useCountermeasuresConfigureModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountermeasuresConfigureModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countermeasuresConfigureModuleMutation, { data, loading, error }] = useCountermeasuresConfigureModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      slot: // value for 'slot'
 *      moduleId: // value for 'moduleId'
 *      config: // value for 'config'
 *   },
 * });
 */
export function useCountermeasuresConfigureModuleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CountermeasuresConfigureModuleMutation,
    CountermeasuresConfigureModuleMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CountermeasuresConfigureModuleMutation,
    CountermeasuresConfigureModuleMutationVariables
  >(CountermeasuresConfigureModuleDocument, baseOptions);
}
export type CountermeasuresConfigureModuleMutationHookResult = ReturnType<
  typeof useCountermeasuresConfigureModuleMutation
>;
export type CountermeasuresConfigureModuleMutationResult = ApolloReactCommon.MutationResult<
  CountermeasuresConfigureModuleMutation
>;
export type CountermeasuresConfigureModuleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CountermeasuresConfigureModuleMutation,
  CountermeasuresConfigureModuleMutationVariables
>;
export const CountermeasureCreateCountermeasureDocument = gql`
  mutation CountermeasureCreateCountermeasure(
    $id: ID!
    $slot: CountermeasureSlotEnum!
    $name: String!
  ) {
    countermeasuresCreateCountermeasure(id: $id, slot: $slot, name: $name) {
      id
    }
  }
`;
export type CountermeasureCreateCountermeasureMutationFn = ApolloReactCommon.MutationFunction<
  CountermeasureCreateCountermeasureMutation,
  CountermeasureCreateCountermeasureMutationVariables
>;

/**
 * __useCountermeasureCreateCountermeasureMutation__
 *
 * To run a mutation, you first call `useCountermeasureCreateCountermeasureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountermeasureCreateCountermeasureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countermeasureCreateCountermeasureMutation, { data, loading, error }] = useCountermeasureCreateCountermeasureMutation({
 *   variables: {
 *      id: // value for 'id'
 *      slot: // value for 'slot'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCountermeasureCreateCountermeasureMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CountermeasureCreateCountermeasureMutation,
    CountermeasureCreateCountermeasureMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CountermeasureCreateCountermeasureMutation,
    CountermeasureCreateCountermeasureMutationVariables
  >(CountermeasureCreateCountermeasureDocument, baseOptions);
}
export type CountermeasureCreateCountermeasureMutationHookResult = ReturnType<
  typeof useCountermeasureCreateCountermeasureMutation
>;
export type CountermeasureCreateCountermeasureMutationResult = ApolloReactCommon.MutationResult<
  CountermeasureCreateCountermeasureMutation
>;
export type CountermeasureCreateCountermeasureMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CountermeasureCreateCountermeasureMutation,
  CountermeasureCreateCountermeasureMutationVariables
>;
export const CountermeasuresDeactivateCountermeasureDocument = gql`
  mutation CountermeasuresDeactivateCountermeasure(
    $id: ID!
    $slot: CountermeasureSlotEnum!
  ) {
    countermeasuresDeactivateCountermeasure(id: $id, slot: $slot)
  }
`;
export type CountermeasuresDeactivateCountermeasureMutationFn = ApolloReactCommon.MutationFunction<
  CountermeasuresDeactivateCountermeasureMutation,
  CountermeasuresDeactivateCountermeasureMutationVariables
>;

/**
 * __useCountermeasuresDeactivateCountermeasureMutation__
 *
 * To run a mutation, you first call `useCountermeasuresDeactivateCountermeasureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountermeasuresDeactivateCountermeasureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countermeasuresDeactivateCountermeasureMutation, { data, loading, error }] = useCountermeasuresDeactivateCountermeasureMutation({
 *   variables: {
 *      id: // value for 'id'
 *      slot: // value for 'slot'
 *   },
 * });
 */
export function useCountermeasuresDeactivateCountermeasureMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CountermeasuresDeactivateCountermeasureMutation,
    CountermeasuresDeactivateCountermeasureMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CountermeasuresDeactivateCountermeasureMutation,
    CountermeasuresDeactivateCountermeasureMutationVariables
  >(CountermeasuresDeactivateCountermeasureDocument, baseOptions);
}
export type CountermeasuresDeactivateCountermeasureMutationHookResult = ReturnType<
  typeof useCountermeasuresDeactivateCountermeasureMutation
>;
export type CountermeasuresDeactivateCountermeasureMutationResult = ApolloReactCommon.MutationResult<
  CountermeasuresDeactivateCountermeasureMutation
>;
export type CountermeasuresDeactivateCountermeasureMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CountermeasuresDeactivateCountermeasureMutation,
  CountermeasuresDeactivateCountermeasureMutationVariables
>;
export const CountermeasuresLaunchCountermeasureDocument = gql`
  mutation CountermeasuresLaunchCountermeasure(
    $id: ID!
    $slot: CountermeasureSlotEnum!
  ) {
    countermeasuresLaunchCountermeasure(id: $id, slot: $slot)
  }
`;
export type CountermeasuresLaunchCountermeasureMutationFn = ApolloReactCommon.MutationFunction<
  CountermeasuresLaunchCountermeasureMutation,
  CountermeasuresLaunchCountermeasureMutationVariables
>;

/**
 * __useCountermeasuresLaunchCountermeasureMutation__
 *
 * To run a mutation, you first call `useCountermeasuresLaunchCountermeasureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountermeasuresLaunchCountermeasureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countermeasuresLaunchCountermeasureMutation, { data, loading, error }] = useCountermeasuresLaunchCountermeasureMutation({
 *   variables: {
 *      id: // value for 'id'
 *      slot: // value for 'slot'
 *   },
 * });
 */
export function useCountermeasuresLaunchCountermeasureMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CountermeasuresLaunchCountermeasureMutation,
    CountermeasuresLaunchCountermeasureMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CountermeasuresLaunchCountermeasureMutation,
    CountermeasuresLaunchCountermeasureMutationVariables
  >(CountermeasuresLaunchCountermeasureDocument, baseOptions);
}
export type CountermeasuresLaunchCountermeasureMutationHookResult = ReturnType<
  typeof useCountermeasuresLaunchCountermeasureMutation
>;
export type CountermeasuresLaunchCountermeasureMutationResult = ApolloReactCommon.MutationResult<
  CountermeasuresLaunchCountermeasureMutation
>;
export type CountermeasuresLaunchCountermeasureMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CountermeasuresLaunchCountermeasureMutation,
  CountermeasuresLaunchCountermeasureMutationVariables
>;
export const CountermeasuresLaunchUnlockedCountermeasuresDocument = gql`
  mutation CountermeasuresLaunchUnlockedCountermeasures($id: ID!) {
    countermeasuresLaunchUnlockedCountermeasures(id: $id)
  }
`;
export type CountermeasuresLaunchUnlockedCountermeasuresMutationFn = ApolloReactCommon.MutationFunction<
  CountermeasuresLaunchUnlockedCountermeasuresMutation,
  CountermeasuresLaunchUnlockedCountermeasuresMutationVariables
>;

/**
 * __useCountermeasuresLaunchUnlockedCountermeasuresMutation__
 *
 * To run a mutation, you first call `useCountermeasuresLaunchUnlockedCountermeasuresMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountermeasuresLaunchUnlockedCountermeasuresMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countermeasuresLaunchUnlockedCountermeasuresMutation, { data, loading, error }] = useCountermeasuresLaunchUnlockedCountermeasuresMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCountermeasuresLaunchUnlockedCountermeasuresMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CountermeasuresLaunchUnlockedCountermeasuresMutation,
    CountermeasuresLaunchUnlockedCountermeasuresMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CountermeasuresLaunchUnlockedCountermeasuresMutation,
    CountermeasuresLaunchUnlockedCountermeasuresMutationVariables
  >(CountermeasuresLaunchUnlockedCountermeasuresDocument, baseOptions);
}
export type CountermeasuresLaunchUnlockedCountermeasuresMutationHookResult = ReturnType<
  typeof useCountermeasuresLaunchUnlockedCountermeasuresMutation
>;
export type CountermeasuresLaunchUnlockedCountermeasuresMutationResult = ApolloReactCommon.MutationResult<
  CountermeasuresLaunchUnlockedCountermeasuresMutation
>;
export type CountermeasuresLaunchUnlockedCountermeasuresMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CountermeasuresLaunchUnlockedCountermeasuresMutation,
  CountermeasuresLaunchUnlockedCountermeasuresMutationVariables
>;
export const CountermeasureRemoveCountermeasureDocument = gql`
  mutation CountermeasureRemoveCountermeasure(
    $id: ID!
    $slot: CountermeasureSlotEnum!
  ) {
    countermeasuresRemoveCountermeasure(id: $id, slot: $slot)
  }
`;
export type CountermeasureRemoveCountermeasureMutationFn = ApolloReactCommon.MutationFunction<
  CountermeasureRemoveCountermeasureMutation,
  CountermeasureRemoveCountermeasureMutationVariables
>;

/**
 * __useCountermeasureRemoveCountermeasureMutation__
 *
 * To run a mutation, you first call `useCountermeasureRemoveCountermeasureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountermeasureRemoveCountermeasureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countermeasureRemoveCountermeasureMutation, { data, loading, error }] = useCountermeasureRemoveCountermeasureMutation({
 *   variables: {
 *      id: // value for 'id'
 *      slot: // value for 'slot'
 *   },
 * });
 */
export function useCountermeasureRemoveCountermeasureMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CountermeasureRemoveCountermeasureMutation,
    CountermeasureRemoveCountermeasureMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CountermeasureRemoveCountermeasureMutation,
    CountermeasureRemoveCountermeasureMutationVariables
  >(CountermeasureRemoveCountermeasureDocument, baseOptions);
}
export type CountermeasureRemoveCountermeasureMutationHookResult = ReturnType<
  typeof useCountermeasureRemoveCountermeasureMutation
>;
export type CountermeasureRemoveCountermeasureMutationResult = ApolloReactCommon.MutationResult<
  CountermeasureRemoveCountermeasureMutation
>;
export type CountermeasureRemoveCountermeasureMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CountermeasureRemoveCountermeasureMutation,
  CountermeasureRemoveCountermeasureMutationVariables
>;
export const CountermeasuresRemoveModuleDocument = gql`
  mutation CountermeasuresRemoveModule(
    $id: ID!
    $slot: CountermeasureSlotEnum!
    $moduleId: ID!
  ) {
    countermeasuresRemoveModule(id: $id, slot: $slot, moduleId: $moduleId)
  }
`;
export type CountermeasuresRemoveModuleMutationFn = ApolloReactCommon.MutationFunction<
  CountermeasuresRemoveModuleMutation,
  CountermeasuresRemoveModuleMutationVariables
>;

/**
 * __useCountermeasuresRemoveModuleMutation__
 *
 * To run a mutation, you first call `useCountermeasuresRemoveModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountermeasuresRemoveModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countermeasuresRemoveModuleMutation, { data, loading, error }] = useCountermeasuresRemoveModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      slot: // value for 'slot'
 *      moduleId: // value for 'moduleId'
 *   },
 * });
 */
export function useCountermeasuresRemoveModuleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CountermeasuresRemoveModuleMutation,
    CountermeasuresRemoveModuleMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CountermeasuresRemoveModuleMutation,
    CountermeasuresRemoveModuleMutationVariables
  >(CountermeasuresRemoveModuleDocument, baseOptions);
}
export type CountermeasuresRemoveModuleMutationHookResult = ReturnType<
  typeof useCountermeasuresRemoveModuleMutation
>;
export type CountermeasuresRemoveModuleMutationResult = ApolloReactCommon.MutationResult<
  CountermeasuresRemoveModuleMutation
>;
export type CountermeasuresRemoveModuleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CountermeasuresRemoveModuleMutation,
  CountermeasuresRemoveModuleMutationVariables
>;
export const CountermeasuresSetFdNoteDocument = gql`
  mutation CountermeasuresSetFDNote(
    $id: ID!
    $countermeasureId: ID!
    $note: String!
  ) {
    countermeasuresSetFDNote(
      id: $id
      countermeasureId: $countermeasureId
      note: $note
    )
  }
`;
export type CountermeasuresSetFdNoteMutationFn = ApolloReactCommon.MutationFunction<
  CountermeasuresSetFdNoteMutation,
  CountermeasuresSetFdNoteMutationVariables
>;

/**
 * __useCountermeasuresSetFdNoteMutation__
 *
 * To run a mutation, you first call `useCountermeasuresSetFdNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountermeasuresSetFdNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countermeasuresSetFdNoteMutation, { data, loading, error }] = useCountermeasuresSetFdNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      countermeasureId: // value for 'countermeasureId'
 *      note: // value for 'note'
 *   },
 * });
 */
export function useCountermeasuresSetFdNoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CountermeasuresSetFdNoteMutation,
    CountermeasuresSetFdNoteMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CountermeasuresSetFdNoteMutation,
    CountermeasuresSetFdNoteMutationVariables
  >(CountermeasuresSetFdNoteDocument, baseOptions);
}
export type CountermeasuresSetFdNoteMutationHookResult = ReturnType<
  typeof useCountermeasuresSetFdNoteMutation
>;
export type CountermeasuresSetFdNoteMutationResult = ApolloReactCommon.MutationResult<
  CountermeasuresSetFdNoteMutation
>;
export type CountermeasuresSetFdNoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CountermeasuresSetFdNoteMutation,
  CountermeasuresSetFdNoteMutationVariables
>;
export const TemplateDocument = gql`
  query Template($simulatorId: ID!) {
    _template(simulatorId: $simulatorId) {
      ...TemplateFragment
    }
  }
  ${TemplateFragmentFragmentDoc}
`;

/**
 * __useTemplateQuery__
 *
 * To run a query within a React component, call `useTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTemplateQuery({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useTemplateQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TemplateQuery,
    TemplateQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<TemplateQuery, TemplateQueryVariables>(
    TemplateDocument,
    baseOptions,
  );
}
export function useTemplateLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TemplateQuery,
    TemplateQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<TemplateQuery, TemplateQueryVariables>(
    TemplateDocument,
    baseOptions,
  );
}
export type TemplateQueryHookResult = ReturnType<typeof useTemplateQuery>;
export type TemplateLazyQueryHookResult = ReturnType<
  typeof useTemplateLazyQuery
>;
export type TemplateQueryResult = ApolloReactCommon.QueryResult<
  TemplateQuery,
  TemplateQueryVariables
>;
export const TemplateUpdateDocument = gql`
  subscription TemplateUpdate($simulatorId: ID!) {
    _templateUpdate(simulatorId: $simulatorId) {
      ...TemplateFragment
      __typename
    }
  }
  ${TemplateFragmentFragmentDoc}
`;

/**
 * __useTemplateUpdateSubscription__
 *
 * To run a query within a React component, call `useTemplateUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTemplateUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTemplateUpdateSubscription({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useTemplateUpdateSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    TemplateUpdateSubscription,
    TemplateUpdateSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    TemplateUpdateSubscription,
    TemplateUpdateSubscriptionVariables
  >(TemplateUpdateDocument, baseOptions);
}
export type TemplateUpdateSubscriptionHookResult = ReturnType<
  typeof useTemplateUpdateSubscription
>;
export type TemplateUpdateSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  TemplateUpdateSubscription
>;
export const ClientChangedDocument = gql`
  subscription ClientChanged {
    clientChanged {
      id
      label
      mobile
      cards
      flight {
        id
        name
        date
        simulators {
          id
          name
        }
      }
      simulator {
        id
        name
        alertlevel
        layout
        interfaces
        stations {
          name
        }
      }
      station {
        name
      }
      loginName
      loginState
      training
      soundPlayer
    }
  }
`;

/**
 * __useClientChangedSubscription__
 *
 * To run a query within a React component, call `useClientChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useClientChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useClientChangedSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    ClientChangedSubscription,
    ClientChangedSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    ClientChangedSubscription,
    ClientChangedSubscriptionVariables
  >(ClientChangedDocument, baseOptions);
}
export type ClientChangedSubscriptionHookResult = ReturnType<
  typeof useClientChangedSubscription
>;
export type ClientChangedSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  ClientChangedSubscription
>;
export const DisconnectClientDocument = gql`
  mutation DisconnectClient($client: ID!) {
    clientDisconnect(client: $client)
  }
`;
export type DisconnectClientMutationFn = ApolloReactCommon.MutationFunction<
  DisconnectClientMutation,
  DisconnectClientMutationVariables
>;

/**
 * __useDisconnectClientMutation__
 *
 * To run a mutation, you first call `useDisconnectClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisconnectClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disconnectClientMutation, { data, loading, error }] = useDisconnectClientMutation({
 *   variables: {
 *      client: // value for 'client'
 *   },
 * });
 */
export function useDisconnectClientMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DisconnectClientMutation,
    DisconnectClientMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DisconnectClientMutation,
    DisconnectClientMutationVariables
  >(DisconnectClientDocument, baseOptions);
}
export type DisconnectClientMutationHookResult = ReturnType<
  typeof useDisconnectClientMutation
>;
export type DisconnectClientMutationResult = ApolloReactCommon.MutationResult<
  DisconnectClientMutation
>;
export type DisconnectClientMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DisconnectClientMutation,
  DisconnectClientMutationVariables
>;
export const FlightsSubDocument = gql`
  subscription FlightsSub {
    flightsUpdate {
      id
      name
      date
      running
      simulators {
        id
        name
        stations {
          name
        }
      }
    }
  }
`;

/**
 * __useFlightsSubSubscription__
 *
 * To run a query within a React component, call `useFlightsSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFlightsSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlightsSubSubscription({
 *   variables: {
 *   },
 * });
 */
export function useFlightsSubSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    FlightsSubSubscription,
    FlightsSubSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    FlightsSubSubscription,
    FlightsSubSubscriptionVariables
  >(FlightsSubDocument, baseOptions);
}
export type FlightsSubSubscriptionHookResult = ReturnType<
  typeof useFlightsSubSubscription
>;
export type FlightsSubSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  FlightsSubSubscription
>;
export const ClientsInterfacesAndKeyboardsDocument = gql`
  query ClientsInterfacesAndKeyboards {
    interfaces {
      id
      name
    }
    keyboard {
      id
      name
    }
  }
`;

/**
 * __useClientsInterfacesAndKeyboardsQuery__
 *
 * To run a query within a React component, call `useClientsInterfacesAndKeyboardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsInterfacesAndKeyboardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsInterfacesAndKeyboardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useClientsInterfacesAndKeyboardsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ClientsInterfacesAndKeyboardsQuery,
    ClientsInterfacesAndKeyboardsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    ClientsInterfacesAndKeyboardsQuery,
    ClientsInterfacesAndKeyboardsQueryVariables
  >(ClientsInterfacesAndKeyboardsDocument, baseOptions);
}
export function useClientsInterfacesAndKeyboardsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ClientsInterfacesAndKeyboardsQuery,
    ClientsInterfacesAndKeyboardsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    ClientsInterfacesAndKeyboardsQuery,
    ClientsInterfacesAndKeyboardsQueryVariables
  >(ClientsInterfacesAndKeyboardsDocument, baseOptions);
}
export type ClientsInterfacesAndKeyboardsQueryHookResult = ReturnType<
  typeof useClientsInterfacesAndKeyboardsQuery
>;
export type ClientsInterfacesAndKeyboardsLazyQueryHookResult = ReturnType<
  typeof useClientsInterfacesAndKeyboardsLazyQuery
>;
export type ClientsInterfacesAndKeyboardsQueryResult = ApolloReactCommon.QueryResult<
  ClientsInterfacesAndKeyboardsQuery,
  ClientsInterfacesAndKeyboardsQueryVariables
>;
export const SetClientFlightDocument = gql`
  mutation SetClientFlight($client: ID!, $id: ID!) {
    clientSetFlight(client: $client, flightId: $id)
  }
`;
export type SetClientFlightMutationFn = ApolloReactCommon.MutationFunction<
  SetClientFlightMutation,
  SetClientFlightMutationVariables
>;

/**
 * __useSetClientFlightMutation__
 *
 * To run a mutation, you first call `useSetClientFlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetClientFlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setClientFlightMutation, { data, loading, error }] = useSetClientFlightMutation({
 *   variables: {
 *      client: // value for 'client'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetClientFlightMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetClientFlightMutation,
    SetClientFlightMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    SetClientFlightMutation,
    SetClientFlightMutationVariables
  >(SetClientFlightDocument, baseOptions);
}
export type SetClientFlightMutationHookResult = ReturnType<
  typeof useSetClientFlightMutation
>;
export type SetClientFlightMutationResult = ApolloReactCommon.MutationResult<
  SetClientFlightMutation
>;
export type SetClientFlightMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetClientFlightMutation,
  SetClientFlightMutationVariables
>;
export const SetClientSimulatorDocument = gql`
  mutation SetClientSimulator($client: ID!, $id: ID!) {
    clientSetSimulator(client: $client, simulatorId: $id)
  }
`;
export type SetClientSimulatorMutationFn = ApolloReactCommon.MutationFunction<
  SetClientSimulatorMutation,
  SetClientSimulatorMutationVariables
>;

/**
 * __useSetClientSimulatorMutation__
 *
 * To run a mutation, you first call `useSetClientSimulatorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetClientSimulatorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setClientSimulatorMutation, { data, loading, error }] = useSetClientSimulatorMutation({
 *   variables: {
 *      client: // value for 'client'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetClientSimulatorMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetClientSimulatorMutation,
    SetClientSimulatorMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    SetClientSimulatorMutation,
    SetClientSimulatorMutationVariables
  >(SetClientSimulatorDocument, baseOptions);
}
export type SetClientSimulatorMutationHookResult = ReturnType<
  typeof useSetClientSimulatorMutation
>;
export type SetClientSimulatorMutationResult = ApolloReactCommon.MutationResult<
  SetClientSimulatorMutation
>;
export type SetClientSimulatorMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetClientSimulatorMutation,
  SetClientSimulatorMutationVariables
>;
export const SetClientStationDocument = gql`
  mutation SetClientStation($client: ID!, $id: ID!) {
    clientSetStation(client: $client, stationName: $id)
  }
`;
export type SetClientStationMutationFn = ApolloReactCommon.MutationFunction<
  SetClientStationMutation,
  SetClientStationMutationVariables
>;

/**
 * __useSetClientStationMutation__
 *
 * To run a mutation, you first call `useSetClientStationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetClientStationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setClientStationMutation, { data, loading, error }] = useSetClientStationMutation({
 *   variables: {
 *      client: // value for 'client'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetClientStationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetClientStationMutation,
    SetClientStationMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    SetClientStationMutation,
    SetClientStationMutationVariables
  >(SetClientStationDocument, baseOptions);
}
export type SetClientStationMutationHookResult = ReturnType<
  typeof useSetClientStationMutation
>;
export type SetClientStationMutationResult = ApolloReactCommon.MutationResult<
  SetClientStationMutation
>;
export type SetClientStationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetClientStationMutation,
  SetClientStationMutationVariables
>;
export const SetSoundPlayerDocument = gql`
  mutation SetSoundPlayer($id: ID!, $soundPlayer: Boolean!) {
    clientSetSoundPlayer(client: $id, soundPlayer: $soundPlayer)
  }
`;
export type SetSoundPlayerMutationFn = ApolloReactCommon.MutationFunction<
  SetSoundPlayerMutation,
  SetSoundPlayerMutationVariables
>;

/**
 * __useSetSoundPlayerMutation__
 *
 * To run a mutation, you first call `useSetSoundPlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetSoundPlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setSoundPlayerMutation, { data, loading, error }] = useSetSoundPlayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      soundPlayer: // value for 'soundPlayer'
 *   },
 * });
 */
export function useSetSoundPlayerMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetSoundPlayerMutation,
    SetSoundPlayerMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    SetSoundPlayerMutation,
    SetSoundPlayerMutationVariables
  >(SetSoundPlayerDocument, baseOptions);
}
export type SetSoundPlayerMutationHookResult = ReturnType<
  typeof useSetSoundPlayerMutation
>;
export type SetSoundPlayerMutationResult = ApolloReactCommon.MutationResult<
  SetSoundPlayerMutation
>;
export type SetSoundPlayerMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetSoundPlayerMutation,
  SetSoundPlayerMutationVariables
>;
export const EntityCreateDocument = gql`
  mutation EntityCreate(
    $flightId: ID!
    $position: EntityCoordinatesInput!
    $name: String!
    $color: String
    $meshType: MeshTypeEnum!
    $materialMapAsset: String
  ) {
    entityCreate(flightId: $flightId) {
      id
    }
    entitySetLocation(position: $position)
    entitySetIdentity(name: $name)
    entitySetAppearance(
      color: $color
      meshType: $meshType
      materialMapAsset: $materialMapAsset
    )
  }
`;
export type EntityCreateMutationFn = ApolloReactCommon.MutationFunction<
  EntityCreateMutation,
  EntityCreateMutationVariables
>;

/**
 * __useEntityCreateMutation__
 *
 * To run a mutation, you first call `useEntityCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntityCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entityCreateMutation, { data, loading, error }] = useEntityCreateMutation({
 *   variables: {
 *      flightId: // value for 'flightId'
 *      position: // value for 'position'
 *      name: // value for 'name'
 *      color: // value for 'color'
 *      meshType: // value for 'meshType'
 *      materialMapAsset: // value for 'materialMapAsset'
 *   },
 * });
 */
export function useEntityCreateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EntityCreateMutation,
    EntityCreateMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    EntityCreateMutation,
    EntityCreateMutationVariables
  >(EntityCreateDocument, baseOptions);
}
export type EntityCreateMutationHookResult = ReturnType<
  typeof useEntityCreateMutation
>;
export type EntityCreateMutationResult = ApolloReactCommon.MutationResult<
  EntityCreateMutation
>;
export type EntityCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EntityCreateMutation,
  EntityCreateMutationVariables
>;
export const EntityRemoveDocument = gql`
  mutation EntityRemove($id: [ID!]!) {
    entityRemove(id: $id)
  }
`;
export type EntityRemoveMutationFn = ApolloReactCommon.MutationFunction<
  EntityRemoveMutation,
  EntityRemoveMutationVariables
>;

/**
 * __useEntityRemoveMutation__
 *
 * To run a mutation, you first call `useEntityRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntityRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entityRemoveMutation, { data, loading, error }] = useEntityRemoveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEntityRemoveMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EntityRemoveMutation,
    EntityRemoveMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    EntityRemoveMutation,
    EntityRemoveMutationVariables
  >(EntityRemoveDocument, baseOptions);
}
export type EntityRemoveMutationHookResult = ReturnType<
  typeof useEntityRemoveMutation
>;
export type EntityRemoveMutationResult = ApolloReactCommon.MutationResult<
  EntityRemoveMutation
>;
export type EntityRemoveMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EntityRemoveMutation,
  EntityRemoveMutationVariables
>;
export const EntitySetAppearanceDocument = gql`
  mutation EntitySetAppearance(
    $id: ID!
    $color: String
    $meshType: MeshTypeEnum
    $modelAsset: String
    $materialMapAsset: String
    $scale: Float
  ) {
    entitySetAppearance(
      id: $id
      color: $color
      meshType: $meshType
      modelAsset: $modelAsset
      materialMapAsset: $materialMapAsset
      scale: $scale
    )
  }
`;
export type EntitySetAppearanceMutationFn = ApolloReactCommon.MutationFunction<
  EntitySetAppearanceMutation,
  EntitySetAppearanceMutationVariables
>;

/**
 * __useEntitySetAppearanceMutation__
 *
 * To run a mutation, you first call `useEntitySetAppearanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntitySetAppearanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entitySetAppearanceMutation, { data, loading, error }] = useEntitySetAppearanceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      color: // value for 'color'
 *      meshType: // value for 'meshType'
 *      modelAsset: // value for 'modelAsset'
 *      materialMapAsset: // value for 'materialMapAsset'
 *      scale: // value for 'scale'
 *   },
 * });
 */
export function useEntitySetAppearanceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EntitySetAppearanceMutation,
    EntitySetAppearanceMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    EntitySetAppearanceMutation,
    EntitySetAppearanceMutationVariables
  >(EntitySetAppearanceDocument, baseOptions);
}
export type EntitySetAppearanceMutationHookResult = ReturnType<
  typeof useEntitySetAppearanceMutation
>;
export type EntitySetAppearanceMutationResult = ApolloReactCommon.MutationResult<
  EntitySetAppearanceMutation
>;
export type EntitySetAppearanceMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EntitySetAppearanceMutation,
  EntitySetAppearanceMutationVariables
>;
export const EntitySetIdentityDocument = gql`
  mutation EntitySetIdentity($id: ID!, $name: String!) {
    entitySetIdentity(id: $id, name: $name)
  }
`;
export type EntitySetIdentityMutationFn = ApolloReactCommon.MutationFunction<
  EntitySetIdentityMutation,
  EntitySetIdentityMutationVariables
>;

/**
 * __useEntitySetIdentityMutation__
 *
 * To run a mutation, you first call `useEntitySetIdentityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntitySetIdentityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entitySetIdentityMutation, { data, loading, error }] = useEntitySetIdentityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useEntitySetIdentityMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EntitySetIdentityMutation,
    EntitySetIdentityMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    EntitySetIdentityMutation,
    EntitySetIdentityMutationVariables
  >(EntitySetIdentityDocument, baseOptions);
}
export type EntitySetIdentityMutationHookResult = ReturnType<
  typeof useEntitySetIdentityMutation
>;
export type EntitySetIdentityMutationResult = ApolloReactCommon.MutationResult<
  EntitySetIdentityMutation
>;
export type EntitySetIdentityMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EntitySetIdentityMutation,
  EntitySetIdentityMutationVariables
>;
export const EntitiesSetPositionDocument = gql`
  mutation EntitiesSetPosition($entities: [EntitiesLocationInput!]!) {
    entitiesSetPosition(entities: $entities)
  }
`;
export type EntitiesSetPositionMutationFn = ApolloReactCommon.MutationFunction<
  EntitiesSetPositionMutation,
  EntitiesSetPositionMutationVariables
>;

/**
 * __useEntitiesSetPositionMutation__
 *
 * To run a mutation, you first call `useEntitiesSetPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntitiesSetPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entitiesSetPositionMutation, { data, loading, error }] = useEntitiesSetPositionMutation({
 *   variables: {
 *      entities: // value for 'entities'
 *   },
 * });
 */
export function useEntitiesSetPositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EntitiesSetPositionMutation,
    EntitiesSetPositionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    EntitiesSetPositionMutation,
    EntitiesSetPositionMutationVariables
  >(EntitiesSetPositionDocument, baseOptions);
}
export type EntitiesSetPositionMutationHookResult = ReturnType<
  typeof useEntitiesSetPositionMutation
>;
export type EntitiesSetPositionMutationResult = ApolloReactCommon.MutationResult<
  EntitiesSetPositionMutation
>;
export type EntitiesSetPositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EntitiesSetPositionMutation,
  EntitiesSetPositionMutationVariables
>;
