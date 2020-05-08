import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  {[P in K]-?: NonNullable<T[P]>};
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
  id: Scalars["ID"];
  name: Scalars["String"];
  asset: Scalars["String"];
  volume: Scalars["Float"];
  channel: Array<Scalars["Int"]>;
  playbackRate: Scalars["Float"];
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
  ringMapAsset?: Maybe<Scalars["String"]>;
  cloudMapAsset?: Maybe<Scalars["String"]>;
  emissiveColor?: Maybe<Scalars["String"]>;
  emissiveIntensity?: Maybe<Scalars["Float"]>;
  color?: Maybe<Scalars["String"]>;
  scale?: Maybe<Scalars["Float"]>;
};

export type Asset = {
  __typename?: "Asset";
  assetKey: Scalars["String"];
  url: Scalars["String"];
};

export type AssetFolder = {
  __typename?: "AssetFolder";
  id: Scalars["ID"];
  name: Scalars["String"];
  folderPath: Scalars["String"];
  fullPath: Scalars["String"];
  objects: Array<AssetObject>;
};

export type AssetObject = {
  __typename?: "AssetObject";
  id: Scalars["ID"];
  name: Scalars["String"];
  folderPath: Scalars["String"];
  fullPath: Scalars["String"];
  url: Scalars["String"];
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
  name: Scalars["String"];
  component: Scalars["String"];
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

export enum DmxChannelProperty {
  Red = "red",
  Green = "green",
  Blue = "blue",
  Amber = "amber",
  White = "white",
  Uv = "uv",
  Intensity = "intensity",
  Strobe = "strobe",
  Generic = "generic",
  Nothing = "nothing",
}

export type DmxConfig = {
  __typename?: "DMXConfig";
  id: Scalars["ID"];
  name: Scalars["String"];
  config: Scalars["JSON"];
  actionStrength: Scalars["Float"];
};

export type DmxDevice = {
  __typename?: "DMXDevice";
  id: Scalars["ID"];
  class: Scalars["String"];
  name: Scalars["String"];
  channels: Array<DmxChannelProperty>;
};

export type DmxFixture = {
  __typename?: "DMXFixture";
  id: Scalars["ID"];
  class: Scalars["String"];
  name: Scalars["String"];
  clientId?: Maybe<Scalars["String"]>;
  DMXDeviceId: Scalars["String"];
  DMXDevice: DmxDevice;
  simulatorId: Scalars["String"];
  channel: Scalars["Int"];
  mode: DmxFixtureMode;
  tags: Array<Scalars["String"]>;
  passiveChannels: DmxPassiveChannels;
};

export enum DmxFixtureMode {
  Active = "active",
  Passive = "passive",
}

export type DmxPassiveChannels = {
  __typename?: "DMXPassiveChannels";
  amber?: Maybe<Scalars["Float"]>;
  white?: Maybe<Scalars["Float"]>;
  uv?: Maybe<Scalars["Float"]>;
  intensity?: Maybe<Scalars["Float"]>;
  strobe?: Maybe<Scalars["Float"]>;
  generic?: Maybe<Scalars["Float"]>;
  nothing?: Maybe<Scalars["Float"]>;
  color?: Maybe<Scalars["String"]>;
};

export type DmxPassiveChannelsInput = {
  amber?: Maybe<Scalars["Float"]>;
  white?: Maybe<Scalars["Float"]>;
  uv?: Maybe<Scalars["Float"]>;
  intensity?: Maybe<Scalars["Float"]>;
  strobe?: Maybe<Scalars["Float"]>;
  generic?: Maybe<Scalars["Float"]>;
  nothing?: Maybe<Scalars["Float"]>;
  color?: Maybe<Scalars["String"]>;
};

export type DmxSet = {
  __typename?: "DMXSet";
  id: Scalars["ID"];
  name: Scalars["String"];
  fixtureIds: Array<Scalars["String"]>;
  fixtures: Array<DmxFixture>;
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

export type EngineComponent = {
  __typename?: "EngineComponent";
  maxSpeed?: Maybe<Scalars["Float"]>;
  currentSpeed?: Maybe<Scalars["Float"]>;
  heat?: Maybe<Scalars["Float"]>;
  heatRate?: Maybe<Scalars["Float"]>;
  coolant?: Maybe<Scalars["Float"]>;
  cooling?: Maybe<Scalars["Boolean"]>;
};

export type EntitiesLocationInput = {
  id: Scalars["ID"];
  position: EntityCoordinatesInput;
};

export type Entity = {
  __typename?: "Entity";
  id: Scalars["ID"];
  interval?: Maybe<Scalars["Int"]>;
  reset?: Maybe<Scalars["Boolean"]>;
  appearance?: Maybe<AppearanceComponent>;
  behavior?: Maybe<BehaviorComponent>;
  identity?: Maybe<IdentityComponent>;
  location?: Maybe<LocationComponent>;
  stage?: Maybe<StageComponent>;
  stageChild?: Maybe<StageChildComponent>;
  light?: Maybe<LightComponent>;
  glow?: Maybe<GlowComponent>;
  template?: Maybe<TemplateComponent>;
  enginesWarp?: Maybe<EngineComponent>;
  enginesImpulse?: Maybe<EngineComponent>;
  thrusters?: Maybe<ThrustersComponent>;
};

export type EntityCoordinates = {
  __typename?: "EntityCoordinates";
  x: Scalars["Float"];
  y: Scalars["Float"];
  z: Scalars["Float"];
};

export type EntityCoordinatesInput = {
  x: Scalars["Float"];
  y: Scalars["Float"];
  z: Scalars["Float"];
};

export enum EntityEngineEnum {
  Warp = "warp",
  Impulse = "impulse",
}

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

export type GlowComponent = {
  __typename?: "GlowComponent";
  glowMode?: Maybe<GlowModeEnum>;
  color?: Maybe<Scalars["String"]>;
};

export enum GlowModeEnum {
  Glow = "glow",
  Halo = "halo",
  Shell = "shell",
}

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
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  keys?: Maybe<Array<Maybe<KeyboardKey>>>;
};

export type KeyboardKey = {
  __typename?: "KeyboardKey";
  id: Scalars["ID"];
  key?: Maybe<Scalars["String"]>;
  keyCode?: Maybe<Scalars["String"]>;
  meta?: Maybe<Array<Maybe<Scalars["String"]>>>;
  actions?: Maybe<Array<Maybe<MacroAction>>>;
};

export type KeyboardKeyInput = {
  id?: Maybe<Scalars["ID"]>;
  key?: Maybe<Scalars["String"]>;
  keyCode?: Maybe<Scalars["String"]>;
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

export type LightComponent = {
  __typename?: "LightComponent";
  intensity?: Maybe<Scalars["Float"]>;
  decay?: Maybe<Scalars["Float"]>;
  color?: Maybe<Scalars["String"]>;
};

export type Lighting = {
  __typename?: "Lighting";
  intensity: Scalars["Float"];
  action: Lighting_Action;
  actionStrength: Scalars["Float"];
  transitionDuration: Scalars["Int"];
  useAlertColor?: Maybe<Scalars["Boolean"]>;
  color?: Maybe<Scalars["String"]>;
  dmxConfig?: Maybe<DmxConfig>;
};

export enum Lighting_Action {
  Normal = "normal",
  Darken = "darken",
  Blackout = "blackout",
  Work = "work",
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
  dmxConfig?: Maybe<Scalars["String"]>;
};

export type Location = Deck | Room;

export type LocationComponent = {
  __typename?: "LocationComponent";
  inert: Scalars["Boolean"];
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
  Planet = "planet",
  Star = "star",
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
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  category?: Maybe<Scalars["String"]>;
  timeline: Array<TimelineStep>;
  simulators?: Maybe<Array<Maybe<Simulator>>>;
  aux?: Maybe<Scalars["Boolean"]>;
  extraRequirements?: Maybe<SimulatorCapabilities>;
  requirements?: Maybe<SimulatorCapabilities>;
};

export type MissionRequirementsArgs = {
  all?: Maybe<Scalars["Boolean"]>;
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
  entitySetRotationVelocityMagnitude?: Maybe<Scalars["String"]>;
  entityRemoveLocation?: Maybe<Scalars["String"]>;
  entitySetStage?: Maybe<Scalars["String"]>;
  entityRemoveStage?: Maybe<Scalars["String"]>;
  entitySetStageChild?: Maybe<Scalars["String"]>;
  entityRemoveStageChild?: Maybe<Scalars["String"]>;
  entitySetLight?: Maybe<Scalars["String"]>;
  entityRemoveLight?: Maybe<Scalars["String"]>;
  entitySetGlow?: Maybe<Scalars["String"]>;
  entityRemoveGlow?: Maybe<Scalars["String"]>;
  entitySetTemplate?: Maybe<Scalars["String"]>;
  entitySetEngine?: Maybe<Scalars["String"]>;
  entityRemoveEngine?: Maybe<Scalars["String"]>;
  entitySetThrusters?: Maybe<Scalars["String"]>;
  entityRemoveThrusters?: Maybe<Scalars["String"]>;
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
  clientActivateLights?: Maybe<Scalars["String"]>;
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
  computerCoreAddHacker?: Maybe<Scalars["String"]>;
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
  updateSimulatorLighting?: Maybe<Scalars["String"]>;
  dmxSetSimulatorConfig?: Maybe<Scalars["String"]>;
  lightingSetIntensity?: Maybe<Scalars["String"]>;
  lightingShakeLights?: Maybe<Scalars["String"]>;
  lightingFadeLights?: Maybe<Scalars["String"]>;
  lightingSetEffect?: Maybe<Scalars["String"]>;
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
  duplicateMacro?: Maybe<Scalars["String"]>;
  duplicateMacroAction?: Maybe<Scalars["String"]>;
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
  timelineDuplicateItem?: Maybe<Scalars["String"]>;
  startAuxTimeline?: Maybe<Scalars["ID"]>;
  setAuxTimelineStep?: Maybe<Scalars["String"]>;
  missionSetExtraRequirements?: Maybe<Scalars["String"]>;
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
  removeProcessedData?: Maybe<Scalars["String"]>;
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
  sensorsSetHasPing?: Maybe<Scalars["String"]>;
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
  printPdf?: Maybe<Scalars["String"]>;
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
  duplicateStationSet?: Maybe<Scalars["String"]>;
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
  clockSync?: Maybe<Scalars["String"]>;
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
  flightSetBaseUniverse?: Maybe<Scalars["String"]>;
  dmxDeviceCreate?: Maybe<Scalars["String"]>;
  dmxDeviceRemove?: Maybe<Scalars["String"]>;
  dmxDeviceSetName?: Maybe<Scalars["String"]>;
  dmxDeviceSetChannels?: Maybe<Scalars["String"]>;
  dmxSetCreate?: Maybe<Scalars["String"]>;
  dmxSetRemove?: Maybe<Scalars["String"]>;
  dmxSetDuplicate?: Maybe<Scalars["String"]>;
  dmxSetSetName?: Maybe<Scalars["String"]>;
  dmxFixtureCreate?: Maybe<Scalars["String"]>;
  dmxFixtureRemove?: Maybe<Scalars["String"]>;
  dmxFixtureSetName?: Maybe<Scalars["String"]>;
  dmxFixtureSetDMXDevice?: Maybe<Scalars["String"]>;
  dmxFixtureSetChannel?: Maybe<Scalars["String"]>;
  dmxFixtureSetMode?: Maybe<Scalars["String"]>;
  dmxFixtureSetActive?: Maybe<Scalars["String"]>;
  dmxFixtureSetTags?: Maybe<Scalars["String"]>;
  dmxFixtureAddTag?: Maybe<Scalars["String"]>;
  dmxFixtureRemoveTag?: Maybe<Scalars["String"]>;
  dmxFixtureSetPassiveChannels?: Maybe<Scalars["String"]>;
  dmxConfigCreate?: Maybe<Scalars["String"]>;
  dmxConfigRemove?: Maybe<Scalars["String"]>;
  dmxConfigDuplicate?: Maybe<Scalars["String"]>;
  dmxConfigSetName?: Maybe<Scalars["String"]>;
  dmxConfigSetConfig?: Maybe<Scalars["String"]>;
  dmxConfigSetActionStrength?: Maybe<Scalars["String"]>;
};

export type MutationEntitySetAppearanceArgs = {
  id?: Maybe<Scalars["ID"]>;
  color?: Maybe<Scalars["String"]>;
  meshType?: Maybe<MeshTypeEnum>;
  modelAsset?: Maybe<Scalars["String"]>;
  materialMapAsset?: Maybe<Scalars["String"]>;
  ringMapAsset?: Maybe<Scalars["String"]>;
  cloudMapAsset?: Maybe<Scalars["String"]>;
  emissiveColor?: Maybe<Scalars["String"]>;
  emissiveIntensity?: Maybe<Scalars["Float"]>;
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

export type MutationEntitySetRotationVelocityMagnitudeArgs = {
  id: Scalars["ID"];
  rotationVelocity: CoordinatesInput;
};

export type MutationEntityRemoveLocationArgs = {
  id: Scalars["ID"];
};

export type MutationEntitySetStageArgs = {
  id?: Maybe<Scalars["ID"]>;
  scaleLabel?: Maybe<Scalars["String"]>;
  scaleLabelShort?: Maybe<Scalars["String"]>;
  skyboxKey?: Maybe<Scalars["String"]>;
};

export type MutationEntityRemoveStageArgs = {
  id: Scalars["ID"];
};

export type MutationEntitySetStageChildArgs = {
  id?: Maybe<Scalars["ID"]>;
  parentId: Scalars["ID"];
};

export type MutationEntityRemoveStageChildArgs = {
  id: Scalars["ID"];
};

export type MutationEntitySetLightArgs = {
  id?: Maybe<Scalars["ID"]>;
  intensity?: Maybe<Scalars["Float"]>;
  decay?: Maybe<Scalars["Float"]>;
  color?: Maybe<Scalars["String"]>;
};

export type MutationEntityRemoveLightArgs = {
  id: Scalars["ID"];
};

export type MutationEntitySetGlowArgs = {
  id?: Maybe<Scalars["ID"]>;
  glowMode?: Maybe<GlowModeEnum>;
  color?: Maybe<Scalars["String"]>;
};

export type MutationEntityRemoveGlowArgs = {
  id: Scalars["ID"];
};

export type MutationEntitySetTemplateArgs = {
  id?: Maybe<Scalars["ID"]>;
  category: Scalars["String"];
};

export type MutationEntitySetEngineArgs = {
  id?: Maybe<Scalars["ID"]>;
  type: EntityEngineEnum;
  maxSpeed?: Maybe<Scalars["Float"]>;
  currentSpeed?: Maybe<Scalars["Float"]>;
  heat?: Maybe<Scalars["Float"]>;
  heatRate?: Maybe<Scalars["Float"]>;
  coolant?: Maybe<Scalars["Float"]>;
  cooling?: Maybe<Scalars["Boolean"]>;
};

export type MutationEntityRemoveEngineArgs = {
  id: Scalars["ID"];
  type: EntityEngineEnum;
};

export type MutationEntitySetThrustersArgs = {
  id: Scalars["ID"];
  direction?: Maybe<CoordinatesInput>;
  rotationDelta?: Maybe<CoordinatesInput>;
  rotationSpeed?: Maybe<Scalars["Float"]>;
  movementSpeed?: Maybe<Scalars["Float"]>;
};

export type MutationEntityRemoveThrustersArgs = {
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

export type MutationClientActivateLightsArgs = {
  clientId: Scalars["ID"];
  dmxSetId: Scalars["ID"];
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

export type MutationComputerCoreAddHackerArgs = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  level?: Maybe<Scalars["Int"]>;
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
  keyCode: Scalars["String"];
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

export type MutationUpdateSimulatorLightingArgs = {
  id: Scalars["ID"];
  lighting: LightingInput;
};

export type MutationDmxSetSimulatorConfigArgs = {
  simulatorId: Scalars["ID"];
  dmxConfigId: Scalars["ID"];
};

export type MutationLightingSetIntensityArgs = {
  simulatorId: Scalars["ID"];
  intensity: Scalars["Float"];
};

export type MutationLightingShakeLightsArgs = {
  simulatorId: Scalars["ID"];
  strength?: Maybe<Scalars["Float"]>;
  duration?: Maybe<Scalars["Float"]>;
};

export type MutationLightingFadeLightsArgs = {
  simulatorId: Scalars["ID"];
  duration: Scalars["Float"];
  endIntensity: Scalars["Float"];
  startIntensity?: Maybe<Scalars["Float"]>;
};

export type MutationLightingSetEffectArgs = {
  simulatorId: Scalars["ID"];
  duration?: Maybe<Scalars["Float"]>;
  strength?: Maybe<Scalars["Float"]>;
  effect: Lighting_Action;
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

export type MutationDuplicateMacroArgs = {
  id: Scalars["ID"];
};

export type MutationDuplicateMacroActionArgs = {
  id: Scalars["ID"];
  actionId: Scalars["ID"];
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
  category?: Maybe<Scalars["String"]>;
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

export type MutationTimelineDuplicateItemArgs = {
  missionId: Scalars["ID"];
  timelineStepId: Scalars["ID"];
  timelineItemId: Scalars["ID"];
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

export type MutationMissionSetExtraRequirementsArgs = {
  missionId: Scalars["ID"];
  requirements: RequirementInput;
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
  domain?: Maybe<Scalars["String"]>;
  result: Scalars["String"];
};

export type MutationProcessedDataArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  domain?: Maybe<Scalars["String"]>;
  data: Scalars["String"];
  flash?: Maybe<Scalars["Boolean"]>;
};

export type MutationRemoveProcessedDataArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  domain?: Maybe<Scalars["String"]>;
  time: Scalars["String"];
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

export type MutationSensorsSetHasPingArgs = {
  id: Scalars["ID"];
  ping: Scalars["Boolean"];
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

export type MutationPrintPdfArgs = {
  asset: Scalars["String"];
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
  stepId?: Maybe<Scalars["ID"]>;
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

export type MutationDuplicateStationSetArgs = {
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

export type MutationClockSyncArgs = {
  clientId: Scalars["ID"];
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
  template?: Maybe<Scalars["Boolean"]>;
};

export type MutationEntityRemoveArgs = {
  id: Array<Scalars["ID"]>;
};

export type MutationFlightSetBaseUniverseArgs = {
  flightId?: Maybe<Scalars["ID"]>;
  procGenKey?: Maybe<Scalars["String"]>;
};

export type MutationDmxDeviceCreateArgs = {
  name: Scalars["String"];
};

export type MutationDmxDeviceRemoveArgs = {
  id: Scalars["ID"];
};

export type MutationDmxDeviceSetNameArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationDmxDeviceSetChannelsArgs = {
  id: Scalars["ID"];
  channels: Array<DmxChannelProperty>;
};

export type MutationDmxSetCreateArgs = {
  name: Scalars["String"];
};

export type MutationDmxSetRemoveArgs = {
  id: Scalars["ID"];
};

export type MutationDmxSetDuplicateArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationDmxSetSetNameArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationDmxFixtureCreateArgs = {
  DMXSetId: Scalars["ID"];
  name: Scalars["String"];
  DMXDeviceId: Scalars["ID"];
};

export type MutationDmxFixtureRemoveArgs = {
  DMXSetId: Scalars["ID"];
  id: Scalars["ID"];
};

export type MutationDmxFixtureSetNameArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationDmxFixtureSetDmxDeviceArgs = {
  id: Scalars["ID"];
  DMXDeviceID: Scalars["ID"];
};

export type MutationDmxFixtureSetChannelArgs = {
  id: Scalars["ID"];
  channel: Scalars["Int"];
};

export type MutationDmxFixtureSetModeArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  tag?: Maybe<Array<Maybe<Scalars["String"]>>>;
  mode: DmxFixtureMode;
};

export type MutationDmxFixtureSetActiveArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type MutationDmxFixtureSetTagsArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  newTags: Array<Scalars["String"]>;
};

export type MutationDmxFixtureAddTagArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  newTag: Scalars["String"];
};

export type MutationDmxFixtureRemoveTagArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  removeTag: Scalars["String"];
};

export type MutationDmxFixtureSetPassiveChannelsArgs = {
  id?: Maybe<Scalars["ID"]>;
  simulatorId?: Maybe<Scalars["ID"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  passiveChannels: DmxPassiveChannelsInput;
};

export type MutationDmxConfigCreateArgs = {
  name: Scalars["String"];
};

export type MutationDmxConfigRemoveArgs = {
  id: Scalars["ID"];
};

export type MutationDmxConfigDuplicateArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationDmxConfigSetNameArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationDmxConfigSetConfigArgs = {
  id: Scalars["ID"];
  config: Scalars["JSON"];
};

export type MutationDmxConfigSetActionStrengthArgs = {
  id: Scalars["ID"];
  actionStrength: Scalars["Float"];
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
  label: Scalars["String"];
  value: Scalars["String"];
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
  id: Scalars["ID"];
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
  id: Scalars["ID"];
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

export type ProcessedData = {
  __typename?: "ProcessedData";
  value: Scalars["String"];
  time: Scalars["String"];
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
  flights: Array<Flight>;
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
  missions: Array<Mission>;
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
  probes: Array<Probes>;
  probe?: Maybe<Probes>;
  railgun?: Maybe<Array<Maybe<Railgun>>>;
  reactors?: Maybe<Array<Maybe<Reactor>>>;
  reactor?: Maybe<Reactor>;
  recordSnippets?: Maybe<Array<Maybe<RecordSnippet>>>;
  recordTemplates?: Maybe<Array<Maybe<RecordSnippet>>>;
  rooms?: Maybe<Array<Maybe<Room>>>;
  sensors: Array<Sensors>;
  sensor?: Maybe<Sensors>;
  sensorContacts?: Maybe<Array<Maybe<SensorContact>>>;
  sets?: Maybe<Array<Maybe<Set>>>;
  shields?: Maybe<Array<Maybe<Shield>>>;
  shortRangeComm?: Maybe<Array<Maybe<ShortRangeComm>>>;
  sickbay?: Maybe<Array<Maybe<Sickbay>>>;
  sickbaySingle?: Maybe<Sickbay>;
  symptoms?: Maybe<Array<Maybe<Scalars["String"]>>>;
  signalJammers?: Maybe<Array<Maybe<SignalJammer>>>;
  simulators: Array<Simulator>;
  softwarePanels?: Maybe<Array<Maybe<SoftwarePanel>>>;
  stations?: Maybe<Array<Maybe<StationSet>>>;
  station?: Maybe<Station>;
  stealthField?: Maybe<Array<Maybe<StealthField>>>;
  stealth?: Maybe<StealthField>;
  subspaceField?: Maybe<Array<Maybe<SubspaceField>>>;
  surveyform?: Maybe<Array<Maybe<SurveyForm>>>;
  systems?: Maybe<Array<Maybe<System>>>;
  system?: Maybe<System>;
  allSystems: Array<Scalars["String"]>;
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
  dmxDevices: Array<DmxDevice>;
  dmxSets: Array<DmxSet>;
  dmxFixtures: Array<DmxFixture>;
  dmxConfig?: Maybe<DmxConfig>;
  dmxConfigs: Array<DmxConfig>;
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
  inert?: Maybe<Scalars["Boolean"]>;
};

export type QueryDmxFixturesArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
};

export type QueryDmxConfigArgs = {
  id: Scalars["ID"];
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

export type RequirementInput = {
  cards?: Maybe<Array<Maybe<Scalars["String"]>>>;
  systems?: Maybe<Array<Maybe<Scalars["String"]>>>;
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
  id: Scalars["ID"];
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
  id: Scalars["ID"];
  simulatorId?: Maybe<Scalars["ID"]>;
  type?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  upgradeName?: Maybe<Scalars["String"]>;
  upgraded?: Maybe<Scalars["Boolean"]>;
  stealthFactor?: Maybe<Scalars["Float"]>;
  domain: Scalars["String"];
  pings?: Maybe<Scalars["Boolean"]>;
  timeSincePing?: Maybe<Scalars["Int"]>;
  pingMode?: Maybe<Ping_Modes>;
  scanResults?: Maybe<Scalars["String"]>;
  scanRequest?: Maybe<Scalars["String"]>;
  processedData?: Maybe<Array<ProcessedData>>;
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
  id: Scalars["ID"];
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
  id: Scalars["ID"];
  name: Scalars["String"];
  clients: Array<SetClient>;
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
  systems?: Maybe<Array<System>>;
  stations?: Maybe<Array<Station>>;
  mission?: Maybe<Mission>;
  missionConfigs?: Maybe<Scalars["JSON"]>;
  currentTimelineStep?: Maybe<Scalars["Int"]>;
  executedTimelineSteps?: Maybe<Array<Scalars["ID"]>>;
  timelines?: Maybe<Array<TimelineInstance>>;
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
  capabilities?: Maybe<SimulatorCapabilities>;
  ambiance?: Maybe<Array<Ambiance>>;
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

export type SimulatorCapabilities = {
  __typename?: "SimulatorCapabilities";
  systems: Array<Scalars["String"]>;
  cards: Array<Scalars["String"]>;
  spaceEdventures?: Maybe<Scalars["Boolean"]>;
  docking?: Maybe<Scalars["Boolean"]>;
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

export type StageChildComponent = {
  __typename?: "StageChildComponent";
  parentId: Scalars["ID"];
  parent?: Maybe<Entity>;
};

export type StageComponent = {
  __typename?: "StageComponent";
  scaleLabel?: Maybe<Scalars["String"]>;
  scaleLabelShort?: Maybe<Scalars["String"]>;
  skyboxKey?: Maybe<Scalars["String"]>;
  childrenAsSprites?: Maybe<Scalars["Boolean"]>;
};

export type Station = {
  __typename?: "Station";
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  training?: Maybe<Scalars["String"]>;
  login?: Maybe<Scalars["Boolean"]>;
  executive?: Maybe<Scalars["Boolean"]>;
  messageGroups?: Maybe<Array<Maybe<Scalars["String"]>>>;
  layout?: Maybe<Scalars["String"]>;
  widgets?: Maybe<Array<Maybe<Scalars["String"]>>>;
  cards: Array<Card>;
  ambiance?: Maybe<Scalars["String"]>;
};

export type StationCardsArgs = {
  showHidden?: Maybe<Scalars["Boolean"]>;
};

export type StationSet = {
  __typename?: "StationSet";
  id: Scalars["ID"];
  name: Scalars["String"];
  simulator?: Maybe<Simulator>;
  crewCount?: Maybe<Scalars["Int"]>;
  stations: Array<Station>;
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
  assetFolderChange: Array<AssetFolder>;
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
  missionsUpdate: Array<Mission>;
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
  probesUpdate: Array<Probes>;
  scienceProbeEmitter?: Maybe<ScienceProbeEvent>;
  railgunUpdate?: Maybe<Array<Maybe<Railgun>>>;
  reactorUpdate?: Maybe<Array<Maybe<Reactor>>>;
  recordSnippetsUpdate?: Maybe<Array<Maybe<RecordSnippet>>>;
  recordTemplatesUpdate?: Maybe<Array<Maybe<RecordSnippet>>>;
  roomsUpdate?: Maybe<Array<Maybe<Room>>>;
  sensorsUpdate: Array<Sensors>;
  sensorContactUpdate: Array<SensorContact>;
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
  entity?: Maybe<Entity>;
  entities?: Maybe<Array<Maybe<Entity>>>;
  dmxSets: Array<DmxSet>;
  dmxDevices: Array<DmxDevice>;
  dmxFixtures: Array<DmxFixture>;
  dmxConfigs: Array<DmxConfig>;
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
  aux?: Maybe<Scalars["Boolean"]>;
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

export type SubscriptionClockSyncArgs = {
  clientId: Scalars["ID"];
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
  stageId?: Maybe<Scalars["ID"]>;
  template?: Maybe<Scalars["Boolean"]>;
};

export type SubscriptionDmxFixturesArgs = {
  simulatorId?: Maybe<Scalars["ID"]>;
  clientId?: Maybe<Scalars["ID"]>;
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

export type TemplateComponent = {
  __typename?: "TemplateComponent";
  category?: Maybe<Scalars["String"]>;
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

export type ThrustersComponent = {
  __typename?: "ThrustersComponent";
  direction?: Maybe<Coordinates>;
  rotationDelta?: Maybe<Coordinates>;
  rotationSpeed?: Maybe<Scalars["Float"]>;
  movementSpeed?: Maybe<Scalars["Float"]>;
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
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  event: Scalars["String"];
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
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  order?: Maybe<Scalars["Int"]>;
  timelineItems: Array<TimelineItem>;
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

/**
 * A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.
 *
 * In some cases, you need to provide options to alter GraphQL's execution behavior
 * in ways field arguments will not suffice, such as conditionally including or
 * skipping a field. Directives provide this by describing additional information
 * to the executor.
 */
export type __Directive = {
  __typename?: "__Directive";
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  locations: Array<__DirectiveLocation>;
  args: Array<__InputValue>;
};

/**
 * A Directive can be adjacent to many parts of the GraphQL language, a
 * __DirectiveLocation describes one such possible adjacencies.
 */
export enum __DirectiveLocation {
  /** Location adjacent to a query operation. */
  Query = "QUERY",
  /** Location adjacent to a mutation operation. */
  Mutation = "MUTATION",
  /** Location adjacent to a subscription operation. */
  Subscription = "SUBSCRIPTION",
  /** Location adjacent to a field. */
  Field = "FIELD",
  /** Location adjacent to a fragment definition. */
  FragmentDefinition = "FRAGMENT_DEFINITION",
  /** Location adjacent to a fragment spread. */
  FragmentSpread = "FRAGMENT_SPREAD",
  /** Location adjacent to an inline fragment. */
  InlineFragment = "INLINE_FRAGMENT",
  /** Location adjacent to a variable definition. */
  VariableDefinition = "VARIABLE_DEFINITION",
  /** Location adjacent to a schema definition. */
  Schema = "SCHEMA",
  /** Location adjacent to a scalar definition. */
  Scalar = "SCALAR",
  /** Location adjacent to an object type definition. */
  Object = "OBJECT",
  /** Location adjacent to a field definition. */
  FieldDefinition = "FIELD_DEFINITION",
  /** Location adjacent to an argument definition. */
  ArgumentDefinition = "ARGUMENT_DEFINITION",
  /** Location adjacent to an interface definition. */
  Interface = "INTERFACE",
  /** Location adjacent to a union definition. */
  Union = "UNION",
  /** Location adjacent to an enum definition. */
  Enum = "ENUM",
  /** Location adjacent to an enum value definition. */
  EnumValue = "ENUM_VALUE",
  /** Location adjacent to an input object type definition. */
  InputObject = "INPUT_OBJECT",
  /** Location adjacent to an input object field definition. */
  InputFieldDefinition = "INPUT_FIELD_DEFINITION",
}

/**
 * One possible value for a given Enum. Enum values are unique values, not a
 * placeholder for a string or numeric value. However an Enum value is returned in
 * a JSON response as a string.
 */
export type __EnumValue = {
  __typename?: "__EnumValue";
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  isDeprecated: Scalars["Boolean"];
  deprecationReason?: Maybe<Scalars["String"]>;
};

/**
 * Object and Interface types are described by a list of Fields, each of which has
 * a name, potentially a list of arguments, and a return type.
 */
export type __Field = {
  __typename?: "__Field";
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  args: Array<__InputValue>;
  type: __Type;
  isDeprecated: Scalars["Boolean"];
  deprecationReason?: Maybe<Scalars["String"]>;
};

/**
 * Arguments provided to Fields or Directives and the input fields of an
 * InputObject are represented as Input Values which describe their type and
 * optionally a default value.
 */
export type __InputValue = {
  __typename?: "__InputValue";
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  type: __Type;
  /** A GraphQL-formatted string representing the default value for this input value. */
  defaultValue?: Maybe<Scalars["String"]>;
};

/**
 * A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all
 * available types and directives on the server, as well as the entry points for
 * query, mutation, and subscription operations.
 */
export type __Schema = {
  __typename?: "__Schema";
  /** A list of all types supported by this server. */
  types: Array<__Type>;
  /** The type that query operations will be rooted at. */
  queryType: __Type;
  /** If this server supports mutation, the type that mutation operations will be rooted at. */
  mutationType?: Maybe<__Type>;
  /** If this server support subscription, the type that subscription operations will be rooted at. */
  subscriptionType?: Maybe<__Type>;
  /** A list of all directives supported by this server. */
  directives: Array<__Directive>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of
 * types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that
 * type. Scalar types provide no information beyond a name and description, while
 * Enum types provide their values. Object and Interface types provide the fields
 * they describe. Abstract types, Union and Interface, provide the Object types
 * possible at runtime. List and NonNull types compose other types.
 */
export type __Type = {
  __typename?: "__Type";
  kind: __TypeKind;
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  fields?: Maybe<Array<__Field>>;
  interfaces?: Maybe<Array<__Type>>;
  possibleTypes?: Maybe<Array<__Type>>;
  enumValues?: Maybe<Array<__EnumValue>>;
  inputFields?: Maybe<Array<__InputValue>>;
  ofType?: Maybe<__Type>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of
 * types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that
 * type. Scalar types provide no information beyond a name and description, while
 * Enum types provide their values. Object and Interface types provide the fields
 * they describe. Abstract types, Union and Interface, provide the Object types
 * possible at runtime. List and NonNull types compose other types.
 */
export type __TypeFieldsArgs = {
  includeDeprecated?: Maybe<Scalars["Boolean"]>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of
 * types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that
 * type. Scalar types provide no information beyond a name and description, while
 * Enum types provide their values. Object and Interface types provide the fields
 * they describe. Abstract types, Union and Interface, provide the Object types
 * possible at runtime. List and NonNull types compose other types.
 */
export type __TypeEnumValuesArgs = {
  includeDeprecated?: Maybe<Scalars["Boolean"]>;
};

/** An enum describing what kind of type a given `__Type` is. */
export enum __TypeKind {
  /** Indicates this type is a scalar. */
  Scalar = "SCALAR",
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  Object = "OBJECT",
  /** Indicates this type is an interface. `fields` and `possibleTypes` are valid fields. */
  Interface = "INTERFACE",
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  Union = "UNION",
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  Enum = "ENUM",
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  InputObject = "INPUT_OBJECT",
  /** Indicates this type is a list. `ofType` is a valid field. */
  List = "LIST",
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  NonNull = "NON_NULL",
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    {[key in TKey]: TResult},
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    {[key in TKey]: TResult},
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Action: ResolverTypeWrapper<Action>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Asset: ResolverTypeWrapper<Asset>;
  AssetFolder: ResolverTypeWrapper<AssetFolder>;
  AssetObject: ResolverTypeWrapper<AssetObject>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Client: ResolverTypeWrapper<Client>;
  Flight: ResolverTypeWrapper<Flight>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Simulator: ResolverTypeWrapper<Simulator>;
  System: ResolverTypeWrapper<System>;
  SystemInterface:
    | ResolversTypes["System"]
    | ResolversTypes["CoolantTank"]
    | ResolversTypes["Crm"]
    | ResolversTypes["Engine"]
    | ResolversTypes["InternalComm"]
    | ResolversTypes["JumpDrive"]
    | ResolversTypes["LRCommunications"]
    | ResolversTypes["Navigation"]
    | ResolversTypes["Phaser"]
    | ResolversTypes["Probes"]
    | ResolversTypes["Railgun"]
    | ResolversTypes["Reactor"]
    | ResolversTypes["Sensors"]
    | ResolversTypes["Shield"]
    | ResolversTypes["ShortRangeComm"]
    | ResolversTypes["Sickbay"]
    | ResolversTypes["SignalJammer"]
    | ResolversTypes["StealthField"]
    | ResolversTypes["SubspaceField"]
    | ResolversTypes["Targeting"]
    | ResolversTypes["Thruster"]
    | ResolversTypes["Thx"]
    | ResolversTypes["Torpedo"]
    | ResolversTypes["TractorBeam"]
    | ResolversTypes["Transporter"]
    | ResolversTypes["Transwarp"]
    | ResolversTypes["Countermeasures"];
  Damage: ResolverTypeWrapper<Damage>;
  DamageReportStep: ResolverTypeWrapper<DamageReportStep>;
  DAMAGE_TYPES: Damage_Types;
  Power: ResolverTypeWrapper<Power>;
  Room: ResolverTypeWrapper<Room>;
  Deck: ResolverTypeWrapper<Deck>;
  Environment: ResolverTypeWrapper<Environment>;
  RoomRoles: RoomRoles;
  InventoryItem: ResolverTypeWrapper<InventoryItem>;
  InventoryMetadata: ResolverTypeWrapper<InventoryMetadata>;
  RoomCount: ResolverTypeWrapper<RoomCount>;
  TeamCount: ResolverTypeWrapper<TeamCount>;
  Team: ResolverTypeWrapper<
    Omit<Team, "location"> & {location?: Maybe<ResolversTypes["Location"]>}
  >;
  TEAM_TYPES: Team_Types;
  PRIORITIES: Priorities;
  Location: ResolversTypes["Deck"] | ResolversTypes["Room"];
  Crew: ResolverTypeWrapper<Crew>;
  Chart: ResolverTypeWrapper<Chart>;
  PainPoint: ResolverTypeWrapper<PainPoint>;
  TimelineItem: ResolverTypeWrapper<TimelineItem>;
  Isochip: ResolverTypeWrapper<Isochip>;
  ISOCHIP_STATES: Isochip_States;
  DamageStep: ResolverTypeWrapper<DamageStep>;
  DamageStepArgs: ResolverTypeWrapper<DamageStepArgs>;
  DamageTask: ResolverTypeWrapper<DamageTask>;
  TaskTemplate: ResolverTypeWrapper<TaskTemplate>;
  JSON: ResolverTypeWrapper<Scalars["JSON"]>;
  Station: ResolverTypeWrapper<Station>;
  Card: ResolverTypeWrapper<Card>;
  Mission: ResolverTypeWrapper<Mission>;
  TimelineStep: ResolverTypeWrapper<TimelineStep>;
  SimulatorCapabilities: ResolverTypeWrapper<SimulatorCapabilities>;
  TimelineInstance: ResolverTypeWrapper<TimelineInstance>;
  Ship: ResolverTypeWrapper<Ship>;
  RemoteAccessCode: ResolverTypeWrapper<RemoteAccessCode>;
  InventoryLog: ResolverTypeWrapper<InventoryLog>;
  Ambiance: ResolverTypeWrapper<Ambiance>;
  SimulatorAssets: ResolverTypeWrapper<SimulatorAssets>;
  Lighting: ResolverTypeWrapper<Lighting>;
  LIGHTING_ACTION: Lighting_Action;
  DMXConfig: ResolverTypeWrapper<DmxConfig>;
  StationSet: ResolverTypeWrapper<StationSet>;
  SpaceEdventuresClient: ResolverTypeWrapper<SpaceEdventuresClient>;
  CommandLineFeedback: ResolverTypeWrapper<CommandLineFeedback>;
  Keypad: ResolverTypeWrapper<Keypad>;
  Scanner: ResolverTypeWrapper<Scanner>;
  CommandLine: ResolverTypeWrapper<CommandLine>;
  CommandLineCommand: ResolverTypeWrapper<CommandLineCommand>;
  ComputerCore: ResolverTypeWrapper<ComputerCore>;
  ComputerCoreUser: ResolverTypeWrapper<ComputerCoreUser>;
  ComputerCoreFile: ResolverTypeWrapper<ComputerCoreFile>;
  ComputerCoreVirus: ResolverTypeWrapper<ComputerCoreVirus>;
  ComputerCoreTerminals: ResolverTypeWrapper<ComputerCoreTerminals>;
  TERMINAL_STATUS: Terminal_Status;
  CoolantTank: ResolverTypeWrapper<CoolantTank>;
  SystemCoolant: ResolverTypeWrapper<SystemCoolant>;
  CoreFeed: ResolverTypeWrapper<CoreFeed>;
  CoreLayout: ResolverTypeWrapper<CoreLayout>;
  Crm: ResolverTypeWrapper<Crm>;
  CrmFighter: ResolverTypeWrapper<CrmFighter>;
  Coordinates: ResolverTypeWrapper<Coordinates>;
  CrmPhaserShot: ResolverTypeWrapper<CrmPhaserShot>;
  CrmTorpedo: ResolverTypeWrapper<CrmTorpedo>;
  DOCKING_TYPES: Docking_Types;
  DockingPort: ResolverTypeWrapper<DockingPort>;
  DOCKING_DIRECTION: Docking_Direction;
  Engine: ResolverTypeWrapper<Engine>;
  Speed: ResolverTypeWrapper<Speed>;
  Exocomp: ResolverTypeWrapper<Exocomp>;
  ExocompLog: ResolverTypeWrapper<ExocompLog>;
  Externals: ResolverTypeWrapper<Externals>;
  ExternalSimulator: ResolverTypeWrapper<ExternalSimulator>;
  ExternalMission: ResolverTypeWrapper<ExternalMission>;
  GoogleSpreadsheet: ResolverTypeWrapper<GoogleSpreadsheet>;
  GoogleSheet: ResolverTypeWrapper<GoogleSheet>;
  Interface: ResolverTypeWrapper<Interface>;
  InterfaceDevice: ResolverTypeWrapper<InterfaceDevice>;
  InternalComm: ResolverTypeWrapper<InternalComm>;
  JumpDrive: ResolverTypeWrapper<JumpDrive>;
  JumpDriveSectors: ResolverTypeWrapper<JumpDriveSectors>;
  JumpDriveSector: ResolverTypeWrapper<JumpDriveSector>;
  Keyboard: ResolverTypeWrapper<Keyboard>;
  KeyboardKey: ResolverTypeWrapper<KeyboardKey>;
  MacroAction: ResolverTypeWrapper<MacroAction>;
  LibraryEntry: ResolverTypeWrapper<LibraryEntry>;
  LRCommunications: ResolverTypeWrapper<LrCommunications>;
  LRMessage: ResolverTypeWrapper<LrMessage>;
  PresetAnswer: ResolverTypeWrapper<PresetAnswer>;
  Macro: ResolverTypeWrapper<Macro>;
  MacroButtonConfig: ResolverTypeWrapper<MacroButtonConfig>;
  MacroButton: ResolverTypeWrapper<MacroButton>;
  NotifyColors: NotifyColors;
  Message: ResolverTypeWrapper<Message>;
  MidiSet: ResolverTypeWrapper<MidiSet>;
  MidiControl: ResolverTypeWrapper<MidiControl>;
  MidiMessageType: MidiMessageType;
  ChannelModeMessageType: ChannelModeMessageType;
  MidiActionMode: MidiActionMode;
  Motu: ResolverTypeWrapper<Motu>;
  MotuInput: ResolverTypeWrapper<MotuInput>;
  MotuType: MotuType;
  MotuGate: ResolverTypeWrapper<MotuGate>;
  MotuComp: ResolverTypeWrapper<MotuComp>;
  MotuEQ: ResolverTypeWrapper<MotuEq>;
  MotuOutput: ResolverTypeWrapper<MotuOutput>;
  MotuPatch: ResolverTypeWrapper<MotuPatch>;
  MotuChannel: ResolverTypeWrapper<MotuChannel>;
  Navigation: ResolverTypeWrapper<Navigation>;
  NavLoc: ResolverTypeWrapper<NavLoc>;
  NavPreset: ResolverTypeWrapper<NavPreset>;
  Objective: ResolverTypeWrapper<Objective>;
  Log: ResolverTypeWrapper<Log>;
  Phaser: ResolverTypeWrapper<Phaser>;
  PhaserBeam: ResolverTypeWrapper<PhaserBeam>;
  Probes: ResolverTypeWrapper<Probes>;
  Probe: ResolverTypeWrapper<Probe>;
  ProbeEquipment: ResolverTypeWrapper<ProbeEquipment>;
  History: ResolverTypeWrapper<History>;
  ProbeType: ResolverTypeWrapper<ProbeType>;
  ScienceType: ResolverTypeWrapper<ScienceType>;
  SCIENCE_BURST_DETECTOR: Science_Burst_Detector;
  Railgun: ResolverTypeWrapper<Railgun>;
  Reactor: ResolverTypeWrapper<Reactor>;
  REACTOR_MODELS: Reactor_Models;
  ReactorEfficiency: ResolverTypeWrapper<ReactorEfficiency>;
  RecordSnippet: ResolverTypeWrapper<RecordSnippet>;
  RecordSnippetType: RecordSnippetType;
  RecordEntry: ResolverTypeWrapper<RecordEntry>;
  Sensors: ResolverTypeWrapper<Sensors>;
  PING_MODES: Ping_Modes;
  ProcessedData: ResolverTypeWrapper<ProcessedData>;
  SensorContact: ResolverTypeWrapper<SensorContact>;
  ParticleTypes: ParticleTypes;
  SensorScan: ResolverTypeWrapper<SensorScan>;
  SensorsSegment: ResolverTypeWrapper<SensorsSegment>;
  Set: ResolverTypeWrapper<Set>;
  SetClient: ResolverTypeWrapper<SetClient>;
  Shield: ResolverTypeWrapper<Shield>;
  ShortRangeComm: ResolverTypeWrapper<ShortRangeComm>;
  CommArrow: ResolverTypeWrapper<CommArrow>;
  CommSignal: ResolverTypeWrapper<CommSignal>;
  CommRange: ResolverTypeWrapper<CommRange>;
  Sickbay: ResolverTypeWrapper<Sickbay>;
  SickbayBunk: ResolverTypeWrapper<SickbayBunk>;
  SignalJammer: ResolverTypeWrapper<SignalJammer>;
  Signal: ResolverTypeWrapper<Signal>;
  SoftwarePanel: ResolverTypeWrapper<SoftwarePanel>;
  PanelCable: ResolverTypeWrapper<PanelCable>;
  PanelComponent: ResolverTypeWrapper<PanelComponent>;
  PanelConnection: ResolverTypeWrapper<PanelConnection>;
  StealthField: ResolverTypeWrapper<StealthField>;
  StealthQuad: ResolverTypeWrapper<StealthQuad>;
  SubspaceField: ResolverTypeWrapper<SubspaceField>;
  SubspaceFieldSector: ResolverTypeWrapper<SubspaceFieldSector>;
  SurveyForm: ResolverTypeWrapper<SurveyForm>;
  FormFields: ResolverTypeWrapper<FormFields>;
  FormOptions: ResolverTypeWrapper<FormOptions>;
  FormResults: ResolverTypeWrapper<FormResults>;
  TacticalMap: ResolverTypeWrapper<TacticalMap>;
  TacticalLayer: ResolverTypeWrapper<TacticalLayer>;
  TACTICAL_TYPES: Tactical_Types;
  TacticalItem: ResolverTypeWrapper<TacticalItem>;
  ThrusterControls: ResolverTypeWrapper<ThrusterControls>;
  TacticalPath: ResolverTypeWrapper<TacticalPath>;
  Targeting: ResolverTypeWrapper<Targeting>;
  TargetingContact: ResolverTypeWrapper<TargetingContact>;
  TargetingClass: ResolverTypeWrapper<TargetingClass>;
  StringCoordinates: ResolverTypeWrapper<StringCoordinates>;
  TaskReport: ResolverTypeWrapper<TaskReport>;
  Task: ResolverTypeWrapper<Task>;
  TaskDefinition: ResolverTypeWrapper<TaskDefinition>;
  TaskInput: TaskInput;
  TimelineItemInput: TimelineItemInput;
  Template: ResolverTypeWrapper<Template>;
  Thorium: ResolverTypeWrapper<Thorium>;
  SpaceEdventuresCenter: ResolverTypeWrapper<SpaceEdventuresCenter>;
  NamedObject: ResolverTypeWrapper<NamedObject>;
  FlightType: ResolverTypeWrapper<FlightType>;
  Thruster: ResolverTypeWrapper<Thruster>;
  Rotation: ResolverTypeWrapper<Rotation>;
  Thx: ResolverTypeWrapper<Thx>;
  ThxClient: ResolverTypeWrapper<ThxClient>;
  Torpedo: ResolverTypeWrapper<Torpedo>;
  Warhead: ResolverTypeWrapper<Warhead>;
  TractorBeam: ResolverTypeWrapper<TractorBeam>;
  Transporter: ResolverTypeWrapper<Transporter>;
  TransporterTarget: ResolverTypeWrapper<TransporterTarget>;
  Transwarp: ResolverTypeWrapper<Transwarp>;
  TranswarpQuad: ResolverTypeWrapper<TranswarpQuad>;
  Trigger: ResolverTypeWrapper<Trigger>;
  Viewscreen: ResolverTypeWrapper<Viewscreen>;
  ViewscreenPictureInPicture: ResolverTypeWrapper<ViewscreenPictureInPicture>;
  PIP_POSITION: Pip_Position;
  PIP_SIZE: Pip_Size;
  Countermeasures: ResolverTypeWrapper<Countermeasures>;
  CountermeasureResources: ResolverTypeWrapper<CountermeasureResources>;
  CountermeasureSlot: ResolverTypeWrapper<CountermeasureSlot>;
  Countermeasure: ResolverTypeWrapper<Countermeasure>;
  CountermeasureModule: ResolverTypeWrapper<CountermeasureModule>;
  CountermeasureConfigOptions: ResolverTypeWrapper<CountermeasureConfigOptions>;
  Entity: ResolverTypeWrapper<Entity>;
  AppearanceComponent: ResolverTypeWrapper<AppearanceComponent>;
  MeshTypeEnum: MeshTypeEnum;
  BehaviorComponent: ResolverTypeWrapper<BehaviorComponent>;
  Behaviors: Behaviors;
  EntityCoordinates: ResolverTypeWrapper<EntityCoordinates>;
  IdentityComponent: ResolverTypeWrapper<IdentityComponent>;
  LocationComponent: ResolverTypeWrapper<LocationComponent>;
  Quaternion: ResolverTypeWrapper<Quaternion>;
  StageComponent: ResolverTypeWrapper<StageComponent>;
  StageChildComponent: ResolverTypeWrapper<StageChildComponent>;
  LightComponent: ResolverTypeWrapper<LightComponent>;
  GlowComponent: ResolverTypeWrapper<GlowComponent>;
  GlowModeEnum: GlowModeEnum;
  TemplateComponent: ResolverTypeWrapper<TemplateComponent>;
  EngineComponent: ResolverTypeWrapper<EngineComponent>;
  ThrustersComponent: ResolverTypeWrapper<ThrustersComponent>;
  DMXDevice: ResolverTypeWrapper<DmxDevice>;
  DMXChannelProperty: DmxChannelProperty;
  DMXSet: ResolverTypeWrapper<DmxSet>;
  DMXFixture: ResolverTypeWrapper<DmxFixture>;
  DMXFixtureMode: DmxFixtureMode;
  DMXPassiveChannels: ResolverTypeWrapper<DmxPassiveChannels>;
  Mutation: ResolverTypeWrapper<{}>;
  EntityCoordinatesInput: EntityCoordinatesInput;
  QuaternionInput: QuaternionInput;
  EntitiesLocationInput: EntitiesLocationInput;
  CoordinatesInput: CoordinatesInput;
  EntityEngineEnum: EntityEngineEnum;
  AmbianceInput: AmbianceInput;
  RemoteAsset: RemoteAsset;
  SoundInput: SoundInput;
  ComputerCoreUserInput: ComputerCoreUserInput;
  CoreLayoutInput: CoreLayoutInput;
  CrewInput: CrewInput;
  DamageStepInput: DamageStepInput;
  DamageStepArgsInput: DamageStepArgsInput;
  DAMAGE_STEP_TYPES: Damage_Step_Types;
  DamageTaskInput: DamageTaskInput;
  DockingPortInput: DockingPortInput;
  SpeedInput: SpeedInput;
  EnvironmentInput: EnvironmentInput;
  ExocompInput: ExocompInput;
  SimulatorInput: SimulatorInput;
  GoogleSheetFile: ResolverTypeWrapper<GoogleSheetFile>;
  InventoryItemInput: InventoryItemInput;
  InventoryMetadataInput: InventoryMetadataInput;
  RoomCountInput: RoomCountInput;
  CrewCountInput: CrewCountInput;
  InventoryCount: InventoryCount;
  InventoryCountInput: InventoryCountInput;
  IsochipInput: IsochipInput;
  KeyboardKeyInput: KeyboardKeyInput;
  ActionInput: ActionInput;
  LibraryInput: LibraryInput;
  LightingInput: LightingInput;
  LongRangeCommInput: LongRangeCommInput;
  PresetAnswerInput: PresetAnswerInput;
  MessageInput: MessageInput;
  MidiControlInput: MidiControlInput;
  RequirementInput: RequirementInput;
  MotuChannelInput: MotuChannelInput;
  NavPresetInput: NavPresetInput;
  NavLocInput: NavLocInput;
  ObjectiveInput: ObjectiveInput;
  LogInput: LogInput;
  ProbeInput: ProbeInput;
  EquipmentInput: EquipmentInput;
  ProbeTypeInput: ProbeTypeInput;
  ProbeEquipmentInput: ProbeEquipmentInput;
  ReactorEfficiencyInput: ReactorEfficiencyInput;
  RoomInput: RoomInput;
  SensorContactInput: SensorContactInput;
  SensorScanInput: SensorScanInput;
  SetClientInput: SetClientInput;
  CommSignalInput: CommSignalInput;
  RangeInput: RangeInput;
  CommArrowInput: CommArrowInput;
  CommUpdateInput: CommUpdateInput;
  ChartInput: ChartInput;
  PainPointInput: PainPointInput;
  SignalJammerInput: SignalJammerInput;
  MacroInput: MacroInput;
  SimulatorAssetsInput: SimulatorAssetsInput;
  SoftwarePanelInput: SoftwarePanelInput;
  PanelCableInput: PanelCableInput;
  PanelComponentInput: PanelComponentInput;
  PanelConnectionInput: PanelConnectionInput;
  FormFieldsInput: FormFieldsInput;
  FormOptionsInput: FormOptionsInput;
  FormResultsInput: FormResultsInput;
  TacticalLayerInput: TacticalLayerInput;
  TacticalItemInput: TacticalItemInput;
  ThrusterControlsInput: ThrusterControlsInput;
  TacticalPathInput: TacticalPathInput;
  TargetClassInput: TargetClassInput;
  StringCoordinatesInput: StringCoordinatesInput;
  TeamInput: TeamInput;
  RotationInput: RotationInput;
  DirectionInput: DirectionInput;
  WarheadInput: WarheadInput;
  CountermeasureSlotEnum: CountermeasureSlotEnum;
  DMXPassiveChannelsInput: DmxPassiveChannelsInput;
  Subscription: ResolverTypeWrapper<{}>;
  Sound: ResolverTypeWrapper<Sound>;
  Timer: ResolverTypeWrapper<Timer>;
  GoogleSheets: ResolverTypeWrapper<GoogleSheets>;
  ScienceProbeEvent: ResolverTypeWrapper<ScienceProbeEvent>;
  Notification: ResolverTypeWrapper<Notification>;
  Coolant: ResolverTypeWrapper<Coolant>;
  CoolantRegulator: ResolverTypeWrapper<CoolantRegulator>;
  TeamCountInput: ResolverTypeWrapper<TeamCountInput>;
  LibraryCategory: ResolverTypeWrapper<LibraryCategory>;
  TIMELINE_ITEM_CONFIG_TYPE: Timeline_Item_Config_Type;
  BigInt: ResolverTypeWrapper<Scalars["BigInt"]>;
  ShortRangeCommExtended: ResolverTypeWrapper<ShortRangeCommExtended>;
  CommArrowExtended: ResolverTypeWrapper<CommArrowExtended>;
  CommSignalExtended: ResolverTypeWrapper<CommSignalExtended>;
  CommRanges: ResolverTypeWrapper<CommRanges>;
  CardInput: CardInput;
  TransporterInput: TransporterInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  String: Scalars["String"];
  ID: Scalars["ID"];
  Action: Action;
  Float: Scalars["Float"];
  Asset: Asset;
  AssetFolder: AssetFolder;
  AssetObject: AssetObject;
  Boolean: Scalars["Boolean"];
  Client: Client;
  Flight: Flight;
  Int: Scalars["Int"];
  Simulator: Simulator;
  System: System;
  SystemInterface:
    | ResolversParentTypes["System"]
    | ResolversParentTypes["CoolantTank"]
    | ResolversParentTypes["Crm"]
    | ResolversParentTypes["Engine"]
    | ResolversParentTypes["InternalComm"]
    | ResolversParentTypes["JumpDrive"]
    | ResolversParentTypes["LRCommunications"]
    | ResolversParentTypes["Navigation"]
    | ResolversParentTypes["Phaser"]
    | ResolversParentTypes["Probes"]
    | ResolversParentTypes["Railgun"]
    | ResolversParentTypes["Reactor"]
    | ResolversParentTypes["Sensors"]
    | ResolversParentTypes["Shield"]
    | ResolversParentTypes["ShortRangeComm"]
    | ResolversParentTypes["Sickbay"]
    | ResolversParentTypes["SignalJammer"]
    | ResolversParentTypes["StealthField"]
    | ResolversParentTypes["SubspaceField"]
    | ResolversParentTypes["Targeting"]
    | ResolversParentTypes["Thruster"]
    | ResolversParentTypes["Thx"]
    | ResolversParentTypes["Torpedo"]
    | ResolversParentTypes["TractorBeam"]
    | ResolversParentTypes["Transporter"]
    | ResolversParentTypes["Transwarp"]
    | ResolversParentTypes["Countermeasures"];
  Damage: Damage;
  DamageReportStep: DamageReportStep;
  DAMAGE_TYPES: Damage_Types;
  Power: Power;
  Room: Room;
  Deck: Deck;
  Environment: Environment;
  RoomRoles: RoomRoles;
  InventoryItem: InventoryItem;
  InventoryMetadata: InventoryMetadata;
  RoomCount: RoomCount;
  TeamCount: TeamCount;
  Team: Omit<Team, "location"> & {
    location?: Maybe<ResolversParentTypes["Location"]>;
  };
  TEAM_TYPES: Team_Types;
  PRIORITIES: Priorities;
  Location: ResolversParentTypes["Deck"] | ResolversParentTypes["Room"];
  Crew: Crew;
  Chart: Chart;
  PainPoint: PainPoint;
  TimelineItem: TimelineItem;
  Isochip: Isochip;
  ISOCHIP_STATES: Isochip_States;
  DamageStep: DamageStep;
  DamageStepArgs: DamageStepArgs;
  DamageTask: DamageTask;
  TaskTemplate: TaskTemplate;
  JSON: Scalars["JSON"];
  Station: Station;
  Card: Card;
  Mission: Mission;
  TimelineStep: TimelineStep;
  SimulatorCapabilities: SimulatorCapabilities;
  TimelineInstance: TimelineInstance;
  Ship: Ship;
  RemoteAccessCode: RemoteAccessCode;
  InventoryLog: InventoryLog;
  Ambiance: Ambiance;
  SimulatorAssets: SimulatorAssets;
  Lighting: Lighting;
  LIGHTING_ACTION: Lighting_Action;
  DMXConfig: DmxConfig;
  StationSet: StationSet;
  SpaceEdventuresClient: SpaceEdventuresClient;
  CommandLineFeedback: CommandLineFeedback;
  Keypad: Keypad;
  Scanner: Scanner;
  CommandLine: CommandLine;
  CommandLineCommand: CommandLineCommand;
  ComputerCore: ComputerCore;
  ComputerCoreUser: ComputerCoreUser;
  ComputerCoreFile: ComputerCoreFile;
  ComputerCoreVirus: ComputerCoreVirus;
  ComputerCoreTerminals: ComputerCoreTerminals;
  TERMINAL_STATUS: Terminal_Status;
  CoolantTank: CoolantTank;
  SystemCoolant: SystemCoolant;
  CoreFeed: CoreFeed;
  CoreLayout: CoreLayout;
  Crm: Crm;
  CrmFighter: CrmFighter;
  Coordinates: Coordinates;
  CrmPhaserShot: CrmPhaserShot;
  CrmTorpedo: CrmTorpedo;
  DOCKING_TYPES: Docking_Types;
  DockingPort: DockingPort;
  DOCKING_DIRECTION: Docking_Direction;
  Engine: Engine;
  Speed: Speed;
  Exocomp: Exocomp;
  ExocompLog: ExocompLog;
  Externals: Externals;
  ExternalSimulator: ExternalSimulator;
  ExternalMission: ExternalMission;
  GoogleSpreadsheet: GoogleSpreadsheet;
  GoogleSheet: GoogleSheet;
  Interface: Interface;
  InterfaceDevice: InterfaceDevice;
  InternalComm: InternalComm;
  JumpDrive: JumpDrive;
  JumpDriveSectors: JumpDriveSectors;
  JumpDriveSector: JumpDriveSector;
  Keyboard: Keyboard;
  KeyboardKey: KeyboardKey;
  MacroAction: MacroAction;
  LibraryEntry: LibraryEntry;
  LRCommunications: LrCommunications;
  LRMessage: LrMessage;
  PresetAnswer: PresetAnswer;
  Macro: Macro;
  MacroButtonConfig: MacroButtonConfig;
  MacroButton: MacroButton;
  NotifyColors: NotifyColors;
  Message: Message;
  MidiSet: MidiSet;
  MidiControl: MidiControl;
  MidiMessageType: MidiMessageType;
  ChannelModeMessageType: ChannelModeMessageType;
  MidiActionMode: MidiActionMode;
  Motu: Motu;
  MotuInput: MotuInput;
  MotuType: MotuType;
  MotuGate: MotuGate;
  MotuComp: MotuComp;
  MotuEQ: MotuEq;
  MotuOutput: MotuOutput;
  MotuPatch: MotuPatch;
  MotuChannel: MotuChannel;
  Navigation: Navigation;
  NavLoc: NavLoc;
  NavPreset: NavPreset;
  Objective: Objective;
  Log: Log;
  Phaser: Phaser;
  PhaserBeam: PhaserBeam;
  Probes: Probes;
  Probe: Probe;
  ProbeEquipment: ProbeEquipment;
  History: History;
  ProbeType: ProbeType;
  ScienceType: ScienceType;
  SCIENCE_BURST_DETECTOR: Science_Burst_Detector;
  Railgun: Railgun;
  Reactor: Reactor;
  REACTOR_MODELS: Reactor_Models;
  ReactorEfficiency: ReactorEfficiency;
  RecordSnippet: RecordSnippet;
  RecordSnippetType: RecordSnippetType;
  RecordEntry: RecordEntry;
  Sensors: Sensors;
  PING_MODES: Ping_Modes;
  ProcessedData: ProcessedData;
  SensorContact: SensorContact;
  ParticleTypes: ParticleTypes;
  SensorScan: SensorScan;
  SensorsSegment: SensorsSegment;
  Set: Set;
  SetClient: SetClient;
  Shield: Shield;
  ShortRangeComm: ShortRangeComm;
  CommArrow: CommArrow;
  CommSignal: CommSignal;
  CommRange: CommRange;
  Sickbay: Sickbay;
  SickbayBunk: SickbayBunk;
  SignalJammer: SignalJammer;
  Signal: Signal;
  SoftwarePanel: SoftwarePanel;
  PanelCable: PanelCable;
  PanelComponent: PanelComponent;
  PanelConnection: PanelConnection;
  StealthField: StealthField;
  StealthQuad: StealthQuad;
  SubspaceField: SubspaceField;
  SubspaceFieldSector: SubspaceFieldSector;
  SurveyForm: SurveyForm;
  FormFields: FormFields;
  FormOptions: FormOptions;
  FormResults: FormResults;
  TacticalMap: TacticalMap;
  TacticalLayer: TacticalLayer;
  TACTICAL_TYPES: Tactical_Types;
  TacticalItem: TacticalItem;
  ThrusterControls: ThrusterControls;
  TacticalPath: TacticalPath;
  Targeting: Targeting;
  TargetingContact: TargetingContact;
  TargetingClass: TargetingClass;
  StringCoordinates: StringCoordinates;
  TaskReport: TaskReport;
  Task: Task;
  TaskDefinition: TaskDefinition;
  TaskInput: TaskInput;
  TimelineItemInput: TimelineItemInput;
  Template: Template;
  Thorium: Thorium;
  SpaceEdventuresCenter: SpaceEdventuresCenter;
  NamedObject: NamedObject;
  FlightType: FlightType;
  Thruster: Thruster;
  Rotation: Rotation;
  Thx: Thx;
  ThxClient: ThxClient;
  Torpedo: Torpedo;
  Warhead: Warhead;
  TractorBeam: TractorBeam;
  Transporter: Transporter;
  TransporterTarget: TransporterTarget;
  Transwarp: Transwarp;
  TranswarpQuad: TranswarpQuad;
  Trigger: Trigger;
  Viewscreen: Viewscreen;
  ViewscreenPictureInPicture: ViewscreenPictureInPicture;
  PIP_POSITION: Pip_Position;
  PIP_SIZE: Pip_Size;
  Countermeasures: Countermeasures;
  CountermeasureResources: CountermeasureResources;
  CountermeasureSlot: CountermeasureSlot;
  Countermeasure: Countermeasure;
  CountermeasureModule: CountermeasureModule;
  CountermeasureConfigOptions: CountermeasureConfigOptions;
  Entity: Entity;
  AppearanceComponent: AppearanceComponent;
  MeshTypeEnum: MeshTypeEnum;
  BehaviorComponent: BehaviorComponent;
  Behaviors: Behaviors;
  EntityCoordinates: EntityCoordinates;
  IdentityComponent: IdentityComponent;
  LocationComponent: LocationComponent;
  Quaternion: Quaternion;
  StageComponent: StageComponent;
  StageChildComponent: StageChildComponent;
  LightComponent: LightComponent;
  GlowComponent: GlowComponent;
  GlowModeEnum: GlowModeEnum;
  TemplateComponent: TemplateComponent;
  EngineComponent: EngineComponent;
  ThrustersComponent: ThrustersComponent;
  DMXDevice: DmxDevice;
  DMXChannelProperty: DmxChannelProperty;
  DMXSet: DmxSet;
  DMXFixture: DmxFixture;
  DMXFixtureMode: DmxFixtureMode;
  DMXPassiveChannels: DmxPassiveChannels;
  Mutation: {};
  EntityCoordinatesInput: EntityCoordinatesInput;
  QuaternionInput: QuaternionInput;
  EntitiesLocationInput: EntitiesLocationInput;
  CoordinatesInput: CoordinatesInput;
  EntityEngineEnum: EntityEngineEnum;
  AmbianceInput: AmbianceInput;
  RemoteAsset: RemoteAsset;
  SoundInput: SoundInput;
  ComputerCoreUserInput: ComputerCoreUserInput;
  CoreLayoutInput: CoreLayoutInput;
  CrewInput: CrewInput;
  DamageStepInput: DamageStepInput;
  DamageStepArgsInput: DamageStepArgsInput;
  DAMAGE_STEP_TYPES: Damage_Step_Types;
  DamageTaskInput: DamageTaskInput;
  DockingPortInput: DockingPortInput;
  SpeedInput: SpeedInput;
  EnvironmentInput: EnvironmentInput;
  ExocompInput: ExocompInput;
  SimulatorInput: SimulatorInput;
  GoogleSheetFile: GoogleSheetFile;
  InventoryItemInput: InventoryItemInput;
  InventoryMetadataInput: InventoryMetadataInput;
  RoomCountInput: RoomCountInput;
  CrewCountInput: CrewCountInput;
  InventoryCount: InventoryCount;
  InventoryCountInput: InventoryCountInput;
  IsochipInput: IsochipInput;
  KeyboardKeyInput: KeyboardKeyInput;
  ActionInput: ActionInput;
  LibraryInput: LibraryInput;
  LightingInput: LightingInput;
  LongRangeCommInput: LongRangeCommInput;
  PresetAnswerInput: PresetAnswerInput;
  MessageInput: MessageInput;
  MidiControlInput: MidiControlInput;
  RequirementInput: RequirementInput;
  MotuChannelInput: MotuChannelInput;
  NavPresetInput: NavPresetInput;
  NavLocInput: NavLocInput;
  ObjectiveInput: ObjectiveInput;
  LogInput: LogInput;
  ProbeInput: ProbeInput;
  EquipmentInput: EquipmentInput;
  ProbeTypeInput: ProbeTypeInput;
  ProbeEquipmentInput: ProbeEquipmentInput;
  ReactorEfficiencyInput: ReactorEfficiencyInput;
  RoomInput: RoomInput;
  SensorContactInput: SensorContactInput;
  SensorScanInput: SensorScanInput;
  SetClientInput: SetClientInput;
  CommSignalInput: CommSignalInput;
  RangeInput: RangeInput;
  CommArrowInput: CommArrowInput;
  CommUpdateInput: CommUpdateInput;
  ChartInput: ChartInput;
  PainPointInput: PainPointInput;
  SignalJammerInput: SignalJammerInput;
  MacroInput: MacroInput;
  SimulatorAssetsInput: SimulatorAssetsInput;
  SoftwarePanelInput: SoftwarePanelInput;
  PanelCableInput: PanelCableInput;
  PanelComponentInput: PanelComponentInput;
  PanelConnectionInput: PanelConnectionInput;
  FormFieldsInput: FormFieldsInput;
  FormOptionsInput: FormOptionsInput;
  FormResultsInput: FormResultsInput;
  TacticalLayerInput: TacticalLayerInput;
  TacticalItemInput: TacticalItemInput;
  ThrusterControlsInput: ThrusterControlsInput;
  TacticalPathInput: TacticalPathInput;
  TargetClassInput: TargetClassInput;
  StringCoordinatesInput: StringCoordinatesInput;
  TeamInput: TeamInput;
  RotationInput: RotationInput;
  DirectionInput: DirectionInput;
  WarheadInput: WarheadInput;
  CountermeasureSlotEnum: CountermeasureSlotEnum;
  DMXPassiveChannelsInput: DmxPassiveChannelsInput;
  Subscription: {};
  Sound: Sound;
  Timer: Timer;
  GoogleSheets: GoogleSheets;
  ScienceProbeEvent: ScienceProbeEvent;
  Notification: Notification;
  Coolant: Coolant;
  CoolantRegulator: CoolantRegulator;
  TeamCountInput: TeamCountInput;
  LibraryCategory: LibraryCategory;
  TIMELINE_ITEM_CONFIG_TYPE: Timeline_Item_Config_Type;
  BigInt: Scalars["BigInt"];
  ShortRangeCommExtended: ShortRangeCommExtended;
  CommArrowExtended: CommArrowExtended;
  CommSignalExtended: CommSignalExtended;
  CommRanges: CommRanges;
  CardInput: CardInput;
  TransporterInput: TransporterInput;
}>;

export type ActionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Action"] = ResolversParentTypes["Action"]
> = ResolversObject<{
  action?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  voice?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type AmbianceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Ambiance"] = ResolversParentTypes["Ambiance"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  asset?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  channel?: Resolver<Array<ResolversTypes["Int"]>, ParentType, ContextType>;
  playbackRate?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type AppearanceComponentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AppearanceComponent"] = ResolversParentTypes["AppearanceComponent"]
> = ResolversObject<{
  meshType?: Resolver<
    Maybe<ResolversTypes["MeshTypeEnum"]>,
    ParentType,
    ContextType
  >;
  modelAsset?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  materialMapAsset?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  ringMapAsset?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  cloudMapAsset?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  emissiveColor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  emissiveIntensity?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  scale?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type AssetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Asset"] = ResolversParentTypes["Asset"]
> = ResolversObject<{
  assetKey?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type AssetFolderResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AssetFolder"] = ResolversParentTypes["AssetFolder"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  folderPath?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  fullPath?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  objects?: Resolver<
    Array<ResolversTypes["AssetObject"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type AssetObjectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AssetObject"] = ResolversParentTypes["AssetObject"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  folderPath?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  fullPath?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type BehaviorComponentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["BehaviorComponent"] = ResolversParentTypes["BehaviorComponent"]
> = ResolversObject<{
  behavior?: Resolver<ResolversTypes["Behaviors"], ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  destination?: Resolver<
    Maybe<ResolversTypes["EntityCoordinates"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["BigInt"], any> {
  name: "BigInt";
}

export type CardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Card"] = ResolversParentTypes["Card"]
> = ResolversObject<{
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  component?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  hidden?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  assigned?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  newStation?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ChartResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Chart"] = ResolversParentTypes["Chart"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  admitTime?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  dischargeTime?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  bloodPressure?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  heartRate?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  temperature?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  o2levels?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  symptoms?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  diagnosis?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  treatment?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  treatmentRequest?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  painPoints?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["PainPoint"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ClientResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Client"] = ResolversParentTypes["Client"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  connected?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  flight?: Resolver<Maybe<ResolversTypes["Flight"]>, ParentType, ContextType>;
  simulator?: Resolver<
    Maybe<ResolversTypes["Simulator"]>,
    ParentType,
    ContextType
  >;
  station?: Resolver<Maybe<ResolversTypes["Station"]>, ParentType, ContextType>;
  loginName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  loginState?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  ping?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  offlineState?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  movie?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  training?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  soundPlayer?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  caches?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  hypercard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  overlay?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  cracked?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  commandLineOutput?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  commandLineFeedback?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CommandLineFeedback"]>>>,
    ParentType,
    ContextType
  >;
  currentCard?: Resolver<
    Maybe<ResolversTypes["Card"]>,
    ParentType,
    ContextType
  >;
  token?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  mobile?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  cards?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  keypad?: Resolver<Maybe<ResolversTypes["Keypad"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CommandLineResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CommandLine"] = ResolversParentTypes["CommandLine"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  commands?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CommandLineCommand"]>>>,
    ParentType,
    ContextType
  >;
  components?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  connections?: Resolver<
    Maybe<ResolversTypes["JSON"]>,
    ParentType,
    ContextType
  >;
  values?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CommandLineCommandResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CommandLineCommand"] = ResolversParentTypes["CommandLineCommand"]
> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  help?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  hidden?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CommandLineFeedbackResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CommandLineFeedback"] = ResolversParentTypes["CommandLineFeedback"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  clientId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  command?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  approve?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  deny?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  triggers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TimelineItem"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CommArrowResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CommArrow"] = ResolversParentTypes["CommArrow"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  signal?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  frequency?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  connected?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  muted?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CommArrowExtendedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CommArrowExtended"] = ResolversParentTypes["CommArrowExtended"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  signal?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  range?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  frequency?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  connected?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CommRangeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CommRange"] = ResolversParentTypes["CommRange"]
> = ResolversObject<{
  lower?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  upper?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CommRangesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CommRanges"] = ResolversParentTypes["CommRanges"]
> = ResolversObject<{
  military?: Resolver<
    Maybe<ResolversTypes["CommRange"]>,
    ParentType,
    ContextType
  >;
  commercial?: Resolver<
    Maybe<ResolversTypes["CommRange"]>,
    ParentType,
    ContextType
  >;
  priority?: Resolver<
    Maybe<ResolversTypes["CommRange"]>,
    ParentType,
    ContextType
  >;
  emergency?: Resolver<
    Maybe<ResolversTypes["CommRange"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CommSignalResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CommSignal"] = ResolversParentTypes["CommSignal"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  range?: Resolver<Maybe<ResolversTypes["CommRange"]>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CommSignalExtendedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CommSignalExtended"] = ResolversParentTypes["CommSignalExtended"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  ranges?: Resolver<
    Maybe<ResolversTypes["CommRanges"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ComputerCoreResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ComputerCore"] = ResolversParentTypes["ComputerCore"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ComputerCoreUser"]>>>,
    ParentType,
    ContextType
  >;
  files?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ComputerCoreFile"]>>>,
    ParentType,
    ContextType
  >;
  virii?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ComputerCoreVirus"]>>>,
    ParentType,
    ContextType
  >;
  terminals?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ComputerCoreTerminals"]>>>,
    ParentType,
    ContextType
  >;
  history?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ComputerCoreFileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ComputerCoreFile"] = ResolversParentTypes["ComputerCoreFile"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  corrupted?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  restoring?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ComputerCoreTerminalsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ComputerCoreTerminals"] = ResolversParentTypes["ComputerCoreTerminals"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  status?: Resolver<
    Maybe<ResolversTypes["TERMINAL_STATUS"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ComputerCoreUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ComputerCoreUser"] = ResolversParentTypes["ComputerCoreUser"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  hacker?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ComputerCoreVirusResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ComputerCoreVirus"] = ResolversParentTypes["ComputerCoreVirus"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CoolantResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Coolant"] = ResolversParentTypes["Coolant"]
> = ResolversObject<{
  temperature?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  quantity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  rate?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CoolantRegulatorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CoolantRegulator"] = ResolversParentTypes["CoolantRegulator"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  coolant?: Resolver<Maybe<ResolversTypes["Coolant"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CoolantTankResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CoolantTank"] = ResolversParentTypes["CoolantTank"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  coolant?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  coolantRate?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CoordinatesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Coordinates"] = ResolversParentTypes["Coordinates"]
> = ResolversObject<{
  x?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  y?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  z?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CoreFeedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CoreFeed"] = ResolversParentTypes["CoreFeed"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  component?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  ignored?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  timestamp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CoreLayoutResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CoreLayout"] = ResolversParentTypes["CoreLayout"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CountermeasureResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Countermeasure"] = ResolversParentTypes["Countermeasure"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  modules?: Resolver<
    Array<ResolversTypes["CountermeasureModule"]>,
    ParentType,
    ContextType
  >;
  locked?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  building?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  totalPowerUsed?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  readyToLaunch?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  powerUsage?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  availablePower?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  buildPercentage?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  note?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CountermeasureConfigOptionsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CountermeasureConfigOptions"] = ResolversParentTypes["CountermeasureConfigOptions"]
> = ResolversObject<{
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CountermeasureModuleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CountermeasureModule"] = ResolversParentTypes["CountermeasureModule"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  powerRequirement?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  resourceRequirements?: Resolver<
    ResolversTypes["CountermeasureResources"],
    ParentType,
    ContextType
  >;
  configurationOptions?: Resolver<
    Array<ResolversTypes["CountermeasureConfigOptions"]>,
    ParentType,
    ContextType
  >;
  config?: Resolver<ResolversTypes["JSON"], ParentType, ContextType>;
  buildProgress?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  activated?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CountermeasureResourcesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CountermeasureResources"] = ResolversParentTypes["CountermeasureResources"]
> = ResolversObject<{
  copper?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  titanium?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  carbon?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  plastic?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  plasma?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CountermeasuresResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Countermeasures"] = ResolversParentTypes["Countermeasures"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  class?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<ResolversTypes["Damage"], ParentType, ContextType>;
  power?: Resolver<ResolversTypes["Power"], ParentType, ContextType>;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  materials?: Resolver<
    ResolversTypes["CountermeasureResources"],
    ParentType,
    ContextType
  >;
  slots?: Resolver<
    ResolversTypes["CountermeasureSlot"],
    ParentType,
    ContextType
  >;
  launched?: Resolver<
    Array<ResolversTypes["Countermeasure"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CountermeasureSlotResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CountermeasureSlot"] = ResolversParentTypes["CountermeasureSlot"]
> = ResolversObject<{
  slot1?: Resolver<
    Maybe<ResolversTypes["Countermeasure"]>,
    ParentType,
    ContextType
  >;
  slot2?: Resolver<
    Maybe<ResolversTypes["Countermeasure"]>,
    ParentType,
    ContextType
  >;
  slot3?: Resolver<
    Maybe<ResolversTypes["Countermeasure"]>,
    ParentType,
    ContextType
  >;
  slot4?: Resolver<
    Maybe<ResolversTypes["Countermeasure"]>,
    ParentType,
    ContextType
  >;
  slot5?: Resolver<
    Maybe<ResolversTypes["Countermeasure"]>,
    ParentType,
    ContextType
  >;
  slot6?: Resolver<
    Maybe<ResolversTypes["Countermeasure"]>,
    ParentType,
    ContextType
  >;
  slot7?: Resolver<
    Maybe<ResolversTypes["Countermeasure"]>,
    ParentType,
    ContextType
  >;
  slot8?: Resolver<
    Maybe<ResolversTypes["Countermeasure"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CrewResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Crew"] = ResolversParentTypes["Crew"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  age?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  killed?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes["Deck"]>, ParentType, ContextType>;
  workRoom?: Resolver<Maybe<ResolversTypes["Room"]>, ParentType, ContextType>;
  restRoom?: Resolver<Maybe<ResolversTypes["Room"]>, ParentType, ContextType>;
  inventory?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["InventoryItem"]>>>,
    ParentType,
    ContextType
  >;
  charts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Chart"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CrmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Crm"] = ResolversParentTypes["Crm"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  password?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  activated?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  fighterImage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  fighters?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CrmFighter"]>>>,
    ParentType,
    ContextType
  >;
  enemies?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CrmFighter"]>>>,
    ParentType,
    ContextType
  >;
  fighterStrength?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  enemyStrength?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  fighterCount?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  enemyCount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  fighterDestroyedCount?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  enemyDestroyedCount?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  fighterIcon?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  enemyIcon?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  attacking?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  interval?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  phasers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CrmPhaserShot"]>>>,
    ParentType,
    ContextType
  >;
  torpedos?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CrmTorpedo"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CrmFighterResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CrmFighter"] = ResolversParentTypes["CrmFighter"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  clientId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  client?: Resolver<Maybe<ResolversTypes["Client"]>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  speed?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  strength?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  attacking?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  hull?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  shield?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  shieldRaised?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  phaserLevel?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  torpedoCount?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  torpedoLoaded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  destroyed?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  docked?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  position?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  velocity?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  frags?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CrmPhaserShotResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CrmPhaserShot"] = ResolversParentTypes["CrmPhaserShot"]
> = ResolversObject<{
  target?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  destination?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CrmTorpedoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CrmTorpedo"] = ResolversParentTypes["CrmTorpedo"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  position?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  destroyed?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DamageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Damage"] = ResolversParentTypes["Damage"]
> = ResolversObject<{
  damaged?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  destroyed?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  report?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  reportSteps?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["DamageReportStep"]>>>,
    ParentType,
    ContextType
  >;
  requested?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  reactivationCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  neededReactivationCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  currentStep?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  validate?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  which?: Resolver<
    Maybe<ResolversTypes["DAMAGE_TYPES"]>,
    ParentType,
    ContextType
  >;
  taskReportDamage?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DamageReportStepResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DamageReportStep"] = ResolversParentTypes["DamageReportStep"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  validate?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  validated?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DamageStepResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DamageStep"] = ResolversParentTypes["DamageStep"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  args?: Resolver<
    Maybe<ResolversTypes["DamageStepArgs"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DamageStepArgsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DamageStepArgs"] = ResolversParentTypes["DamageStepArgs"]
> = ResolversObject<{
  end?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  cleanup?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  orders?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  room?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  preamble?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  backup?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  inventory?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  destination?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  equipment?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  query?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  reactivate?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DamageTaskResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DamageTask"] = ResolversParentTypes["DamageTask"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  taskTemplate?: Resolver<
    Maybe<ResolversTypes["TaskTemplate"]>,
    ParentType,
    ContextType
  >;
  required?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  nextSteps?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TaskTemplate"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DeckResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Deck"] = ResolversParentTypes["Deck"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  svgPath?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  doors?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  evac?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  rooms?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  hallway?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  crewCount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  environment?: Resolver<
    Maybe<ResolversTypes["Environment"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DmxConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DMXConfig"] = ResolversParentTypes["DMXConfig"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  config?: Resolver<ResolversTypes["JSON"], ParentType, ContextType>;
  actionStrength?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DmxDeviceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DMXDevice"] = ResolversParentTypes["DMXDevice"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  class?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  channels?: Resolver<
    Array<ResolversTypes["DMXChannelProperty"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DmxFixtureResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DMXFixture"] = ResolversParentTypes["DMXFixture"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  class?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  clientId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  DMXDeviceId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  DMXDevice?: Resolver<ResolversTypes["DMXDevice"], ParentType, ContextType>;
  simulatorId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  mode?: Resolver<ResolversTypes["DMXFixtureMode"], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  passiveChannels?: Resolver<
    ResolversTypes["DMXPassiveChannels"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DmxPassiveChannelsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DMXPassiveChannels"] = ResolversParentTypes["DMXPassiveChannels"]
> = ResolversObject<{
  amber?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  white?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  uv?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  intensity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  strobe?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  generic?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  nothing?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DmxSetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DMXSet"] = ResolversParentTypes["DMXSet"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  fixtureIds?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  fixtures?: Resolver<
    Array<ResolversTypes["DMXFixture"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DockingPortResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DockingPort"] = ResolversParentTypes["DockingPort"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  shipName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<
    Maybe<ResolversTypes["DOCKING_TYPES"]>,
    ParentType,
    ContextType
  >;
  clamps?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  compress?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  doors?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  docked?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  direction?: Resolver<
    Maybe<ResolversTypes["DOCKING_DIRECTION"]>,
    ParentType,
    ContextType
  >;
  position?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  deck?: Resolver<Maybe<ResolversTypes["Deck"]>, ParentType, ContextType>;
  inventory?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["InventoryItem"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type EngineResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Engine"] = ResolversParentTypes["Engine"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  speeds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Speed"]>>>,
    ParentType,
    ContextType
  >;
  speed?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  previousSpeed?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  velocity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  speedFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  acceleration?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  useAcceleration?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  heat?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  on?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  coolant?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type EngineComponentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["EngineComponent"] = ResolversParentTypes["EngineComponent"]
> = ResolversObject<{
  maxSpeed?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  currentSpeed?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  heat?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  heatRate?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  coolant?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  cooling?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type EntityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Entity"] = ResolversParentTypes["Entity"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  interval?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  reset?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  appearance?: Resolver<
    Maybe<ResolversTypes["AppearanceComponent"]>,
    ParentType,
    ContextType
  >;
  behavior?: Resolver<
    Maybe<ResolversTypes["BehaviorComponent"]>,
    ParentType,
    ContextType
  >;
  identity?: Resolver<
    Maybe<ResolversTypes["IdentityComponent"]>,
    ParentType,
    ContextType
  >;
  location?: Resolver<
    Maybe<ResolversTypes["LocationComponent"]>,
    ParentType,
    ContextType
  >;
  stage?: Resolver<
    Maybe<ResolversTypes["StageComponent"]>,
    ParentType,
    ContextType
  >;
  stageChild?: Resolver<
    Maybe<ResolversTypes["StageChildComponent"]>,
    ParentType,
    ContextType
  >;
  light?: Resolver<
    Maybe<ResolversTypes["LightComponent"]>,
    ParentType,
    ContextType
  >;
  glow?: Resolver<
    Maybe<ResolversTypes["GlowComponent"]>,
    ParentType,
    ContextType
  >;
  template?: Resolver<
    Maybe<ResolversTypes["TemplateComponent"]>,
    ParentType,
    ContextType
  >;
  enginesWarp?: Resolver<
    Maybe<ResolversTypes["EngineComponent"]>,
    ParentType,
    ContextType
  >;
  enginesImpulse?: Resolver<
    Maybe<ResolversTypes["EngineComponent"]>,
    ParentType,
    ContextType
  >;
  thrusters?: Resolver<
    Maybe<ResolversTypes["ThrustersComponent"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type EntityCoordinatesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["EntityCoordinates"] = ResolversParentTypes["EntityCoordinates"]
> = ResolversObject<{
  x?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  y?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  z?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type EnvironmentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Environment"] = ResolversParentTypes["Environment"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  oxygen?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  nitrogen?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  trace?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  pressure?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  temperature?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  humidity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  gravity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ExocompResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Exocomp"] = ResolversParentTypes["Exocomp"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  class?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  completion?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  parts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  destination?: Resolver<
    Maybe<ResolversTypes["System"]>,
    ParentType,
    ContextType
  >;
  logs?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ExocompLog"]>>>,
    ParentType,
    ContextType
  >;
  difficulty?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ExocompLogResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ExocompLog"] = ResolversParentTypes["ExocompLog"]
> = ResolversObject<{
  timestamp?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ExternalMissionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ExternalMission"] = ResolversParentTypes["ExternalMission"]
> = ResolversObject<{
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ExternalsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Externals"] = ResolversParentTypes["Externals"]
> = ResolversObject<{
  simulators?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ExternalSimulator"]>>>,
    ParentType,
    ContextType
  >;
  missions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ExternalMission"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ExternalSimulatorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ExternalSimulator"] = ResolversParentTypes["ExternalSimulator"]
> = ResolversObject<{
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type FlightResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Flight"] = ResolversParentTypes["Flight"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  running?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  timelineStep?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  simulators?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Simulator"]>>>,
    ParentType,
    ContextType
  >;
  flightType?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  transmitted?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  clients?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SpaceEdventuresClient"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type FlightTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FlightType"] = ResolversParentTypes["FlightType"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  flightHours?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  classHours?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type FormFieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FormFields"] = ResolversParentTypes["FormFields"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  options?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FormOptions"]>>>,
    ParentType,
    ContextType
  >;
  value?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  max?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type FormOptionsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FormOptions"] = ResolversParentTypes["FormOptions"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type FormResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FormResults"] = ResolversParentTypes["FormResults"]
> = ResolversObject<{
  client?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  station?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  form?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FormFields"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type GlowComponentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GlowComponent"] = ResolversParentTypes["GlowComponent"]
> = ResolversObject<{
  glowMode?: Resolver<
    Maybe<ResolversTypes["GlowModeEnum"]>,
    ParentType,
    ContextType
  >;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type GoogleSheetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GoogleSheet"] = ResolversParentTypes["GoogleSheet"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type GoogleSheetFileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GoogleSheetFile"] = ResolversParentTypes["GoogleSheetFile"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type GoogleSheetsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GoogleSheets"] = ResolversParentTypes["GoogleSheets"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type GoogleSpreadsheetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GoogleSpreadsheet"] = ResolversParentTypes["GoogleSpreadsheet"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  sheets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["GoogleSheet"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type HistoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["History"] = ResolversParentTypes["History"]
> = ResolversObject<{
  date?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type IdentityComponentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["IdentityComponent"] = ResolversParentTypes["IdentityComponent"]
> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type InterfaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Interface"] = ResolversParentTypes["Interface"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  templateId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  deviceType?: Resolver<
    Maybe<ResolversTypes["InterfaceDevice"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  components?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  connections?: Resolver<
    Maybe<ResolversTypes["JSON"]>,
    ParentType,
    ContextType
  >;
  values?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type InterfaceDeviceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["InterfaceDevice"] = ResolversParentTypes["InterfaceDevice"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  isLandscape?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type InternalCommResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["InternalComm"] = ResolversParentTypes["InternalComm"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  state?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  outgoing?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  incoming?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type InventoryItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["InventoryItem"] = ResolversParentTypes["InventoryItem"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  metadata?: Resolver<
    Maybe<ResolversTypes["InventoryMetadata"]>,
    ParentType,
    ContextType
  >;
  roomCount?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RoomCount"]>>>,
    ParentType,
    ContextType
  >;
  teamCount?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TeamCount"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type InventoryLogResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["InventoryLog"] = ResolversParentTypes["InventoryLog"]
> = ResolversObject<{
  timestamp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  log?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type InventoryMetadataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["InventoryMetadata"] = ResolversParentTypes["InventoryMetadata"]
> = ResolversObject<{
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  science?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  defense?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type IsochipResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Isochip"] = ResolversParentTypes["Isochip"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  system?: Resolver<Maybe<ResolversTypes["System"]>, ParentType, ContextType>;
  simulator?: Resolver<
    Maybe<ResolversTypes["Simulator"]>,
    ParentType,
    ContextType
  >;
  slot?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  requiredChip?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  chip?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  state?: Resolver<
    Maybe<ResolversTypes["ISOCHIP_STATES"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export type JumpDriveResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["JumpDrive"] = ResolversParentTypes["JumpDrive"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  sectors?: Resolver<
    Maybe<ResolversTypes["JumpDriveSectors"]>,
    ParentType,
    ContextType
  >;
  env?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  activated?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  stress?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  enabled?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  ringsExtended?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type JumpDriveSectorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["JumpDriveSector"] = ResolversParentTypes["JumpDriveSector"]
> = ResolversObject<{
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  offset?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type JumpDriveSectorsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["JumpDriveSectors"] = ResolversParentTypes["JumpDriveSectors"]
> = ResolversObject<{
  fore?: Resolver<
    Maybe<ResolversTypes["JumpDriveSector"]>,
    ParentType,
    ContextType
  >;
  aft?: Resolver<
    Maybe<ResolversTypes["JumpDriveSector"]>,
    ParentType,
    ContextType
  >;
  starboard?: Resolver<
    Maybe<ResolversTypes["JumpDriveSector"]>,
    ParentType,
    ContextType
  >;
  port?: Resolver<
    Maybe<ResolversTypes["JumpDriveSector"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type KeyboardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Keyboard"] = ResolversParentTypes["Keyboard"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  keys?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["KeyboardKey"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type KeyboardKeyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["KeyboardKey"] = ResolversParentTypes["KeyboardKey"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  keyCode?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  meta?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  actions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["MacroAction"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type KeypadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Keypad"] = ResolversParentTypes["Keypad"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  code?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  enteredCode?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  codeLength?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  giveHints?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  allowedAttempts?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  attempts?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  locked?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LibraryCategoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LibraryCategory"] = ResolversParentTypes["LibraryCategory"]
> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["LibraryEntry"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LibraryEntryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LibraryEntry"] = ResolversParentTypes["LibraryEntry"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  categories?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  seeAlso?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["LibraryEntry"]>>>,
    ParentType,
    ContextType
  >;
  font?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LightComponentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LightComponent"] = ResolversParentTypes["LightComponent"]
> = ResolversObject<{
  intensity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  decay?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LightingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Lighting"] = ResolversParentTypes["Lighting"]
> = ResolversObject<{
  intensity?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  action?: Resolver<ResolversTypes["LIGHTING_ACTION"], ParentType, ContextType>;
  actionStrength?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  transitionDuration?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  useAlertColor?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  dmxConfig?: Resolver<
    Maybe<ResolversTypes["DMXConfig"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Location"] = ResolversParentTypes["Location"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Deck" | "Room", ParentType, ContextType>;
}>;

export type LocationComponentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LocationComponent"] = ResolversParentTypes["LocationComponent"]
> = ResolversObject<{
  inert?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  position?: Resolver<
    ResolversTypes["EntityCoordinates"],
    ParentType,
    ContextType
  >;
  velocity?: Resolver<
    ResolversTypes["EntityCoordinates"],
    ParentType,
    ContextType
  >;
  acceleration?: Resolver<
    ResolversTypes["EntityCoordinates"],
    ParentType,
    ContextType
  >;
  rotation?: Resolver<ResolversTypes["Quaternion"], ParentType, ContextType>;
  rotationVelocity?: Resolver<
    ResolversTypes["EntityCoordinates"],
    ParentType,
    ContextType
  >;
  rotationAcceleration?: Resolver<
    ResolversTypes["EntityCoordinates"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LogResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Log"] = ResolversParentTypes["Log"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  clientId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  flightId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  timestamp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  log?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LrCommunicationsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LRCommunications"] = ResolversParentTypes["LRCommunications"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  messages?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["LRMessage"]>>>,
    ParentType,
    ContextType,
    RequireFields<LrCommunicationsMessagesArgs, never>
  >;
  satellites?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  interception?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  locked?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  decoded?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  difficulty?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  presetMessages?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["PresetAnswer"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LrMessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LRMessage"] = ResolversParentTypes["LRMessage"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  decodedMessage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  crew?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  sent?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  encrypted?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  approved?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  sender?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  datestamp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  timestamp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  a?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  f?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  ra?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rf?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MacroResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Macro"] = ResolversParentTypes["Macro"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  actions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["MacroAction"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MacroActionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MacroAction"] = ResolversParentTypes["MacroAction"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  args?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  delay?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  needsConfig?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  noCancelOnReset?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MacroButtonResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MacroButton"] = ResolversParentTypes["MacroButton"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  actions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["MacroAction"]>>>,
    ParentType,
    ContextType
  >;
  color?: Resolver<
    Maybe<ResolversTypes["NotifyColors"]>,
    ParentType,
    ContextType
  >;
  category?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MacroButtonConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MacroButtonConfig"] = ResolversParentTypes["MacroButtonConfig"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  buttons?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["MacroButton"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Message"] = ResolversParentTypes["Message"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  destination?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  sender?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  timestamp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  content?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MidiControlResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MidiControl"] = ResolversParentTypes["MidiControl"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  channel?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  messageType?: Resolver<
    Maybe<ResolversTypes["MidiMessageType"]>,
    ParentType,
    ContextType
  >;
  key?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  controllerNumber?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  channelModeMessage?: Resolver<
    Maybe<ResolversTypes["ChannelModeMessageType"]>,
    ParentType,
    ContextType
  >;
  actionMode?: Resolver<
    Maybe<ResolversTypes["MidiActionMode"]>,
    ParentType,
    ContextType
  >;
  config?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MidiSetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MidiSet"] = ResolversParentTypes["MidiSet"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  deviceName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  controls?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["MidiControl"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MissionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mission"] = ResolversParentTypes["Mission"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  category?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  timeline?: Resolver<
    Array<ResolversTypes["TimelineStep"]>,
    ParentType,
    ContextType
  >;
  simulators?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Simulator"]>>>,
    ParentType,
    ContextType
  >;
  aux?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  extraRequirements?: Resolver<
    Maybe<ResolversTypes["SimulatorCapabilities"]>,
    ParentType,
    ContextType
  >;
  requirements?: Resolver<
    Maybe<ResolversTypes["SimulatorCapabilities"]>,
    ParentType,
    ContextType,
    RequireFields<MissionRequirementsArgs, never>
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MotuResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Motu"] = ResolversParentTypes["Motu"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  offline?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  inputs?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["MotuInput"]>>>,
    ParentType,
    ContextType
  >;
  outputs?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["MotuOutput"]>>>,
    ParentType,
    ContextType
  >;
  sends?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["MotuPatch"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MotuChannelResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MotuChannel"] = ResolversParentTypes["MotuChannel"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  chan?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["MotuType"]>, ParentType, ContextType>;
  fader?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  mute?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MotuCompResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MotuComp"] = ResolversParentTypes["MotuComp"]
> = ResolversObject<{
  enable?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  release?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  makeup?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  trim?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  peak?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  attack?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  ratio?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  threshold?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MotuEqResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MotuEQ"] = ResolversParentTypes["MotuEQ"]
> = ResolversObject<{
  enable?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  freq?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  gain?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  bw?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  mode?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MotuGateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MotuGate"] = ResolversParentTypes["MotuGate"]
> = ResolversObject<{
  release?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  enable?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  attack?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  threshold?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MotuInputResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MotuInput"] = ResolversParentTypes["MotuInput"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  chan?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["MotuType"]>, ParentType, ContextType>;
  gate?: Resolver<Maybe<ResolversTypes["MotuGate"]>, ParentType, ContextType>;
  comp?: Resolver<Maybe<ResolversTypes["MotuComp"]>, ParentType, ContextType>;
  fader?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  mute?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  pan?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  highshelf?: Resolver<
    Maybe<ResolversTypes["MotuEQ"]>,
    ParentType,
    ContextType
  >;
  mid1?: Resolver<Maybe<ResolversTypes["MotuEQ"]>, ParentType, ContextType>;
  mid2?: Resolver<Maybe<ResolversTypes["MotuEQ"]>, ParentType, ContextType>;
  lowshelf?: Resolver<Maybe<ResolversTypes["MotuEQ"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MotuOutputResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MotuOutput"] = ResolversParentTypes["MotuOutput"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  chan?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["MotuType"]>, ParentType, ContextType>;
  prefader?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  fader?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  mute?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  panner?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  highshelf?: Resolver<
    Maybe<ResolversTypes["MotuEQ"]>,
    ParentType,
    ContextType
  >;
  mid1?: Resolver<Maybe<ResolversTypes["MotuEQ"]>, ParentType, ContextType>;
  mid2?: Resolver<Maybe<ResolversTypes["MotuEQ"]>, ParentType, ContextType>;
  lowshelf?: Resolver<Maybe<ResolversTypes["MotuEQ"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MotuPatchResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MotuPatch"] = ResolversParentTypes["MotuPatch"]
> = ResolversObject<{
  input?: Resolver<Maybe<ResolversTypes["MotuInput"]>, ParentType, ContextType>;
  output?: Resolver<
    Maybe<ResolversTypes["MotuOutput"]>,
    ParentType,
    ContextType
  >;
  send?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  mute?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  entitySetAppearance?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntitySetAppearanceArgs, never>
  >;
  entityRemoveAppearance?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntityRemoveAppearanceArgs, "id">
  >;
  entitySetBehavior?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntitySetBehaviorArgs, "id" | "behavior">
  >;
  entityRemoveBehavior?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntityRemoveBehaviorArgs, "id">
  >;
  entitySetIdentity?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntitySetIdentityArgs, never>
  >;
  entityRemoveIdentity?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntityRemoveIdentityArgs, "id">
  >;
  entitySetLocation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntitySetLocationArgs, never>
  >;
  entitiesSetPosition?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntitiesSetPositionArgs, "entities">
  >;
  entitySetRotationVelocityMagnitude?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationEntitySetRotationVelocityMagnitudeArgs,
      "id" | "rotationVelocity"
    >
  >;
  entityRemoveLocation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntityRemoveLocationArgs, "id">
  >;
  entitySetStage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntitySetStageArgs, never>
  >;
  entityRemoveStage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntityRemoveStageArgs, "id">
  >;
  entitySetStageChild?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntitySetStageChildArgs, "parentId">
  >;
  entityRemoveStageChild?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntityRemoveStageChildArgs, "id">
  >;
  entitySetLight?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntitySetLightArgs, never>
  >;
  entityRemoveLight?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntityRemoveLightArgs, "id">
  >;
  entitySetGlow?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntitySetGlowArgs, never>
  >;
  entityRemoveGlow?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntityRemoveGlowArgs, "id">
  >;
  entitySetTemplate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntitySetTemplateArgs, "category">
  >;
  entitySetEngine?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntitySetEngineArgs, "type">
  >;
  entityRemoveEngine?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntityRemoveEngineArgs, "id" | "type">
  >;
  entitySetThrusters?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntitySetThrustersArgs, "id">
  >;
  entityRemoveThrusters?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntityRemoveThrustersArgs, "id">
  >;
  triggerAction?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTriggerActionArgs, "action" | "simulatorId">
  >;
  addSimulatorAmbiance?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddSimulatorAmbianceArgs, "id" | "name">
  >;
  updateSimulatorAmbiance?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSimulatorAmbianceArgs, "id" | "ambiance">
  >;
  removeSimulatorAmbiance?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSimulatorAmbianceArgs, "id" | "ambianceId">
  >;
  setStationAmbiance?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetStationAmbianceArgs,
      "stationSetID" | "stationName"
    >
  >;
  addAssetFolder?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAddAssetFolderArgs,
      "name" | "folderPath" | "fullPath"
    >
  >;
  removeAssetFolder?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveAssetFolderArgs, "fullPath">
  >;
  removeAssetObject?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveAssetObjectArgs, "fullPath">
  >;
  downloadRemoteAssets?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDownloadRemoteAssetsArgs, "folderPath" | "files">
  >;
  clientConnect?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientConnectArgs, "client">
  >;
  clientDisconnect?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientDisconnectArgs, "client">
  >;
  clientPing?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientPingArgs, "client">
  >;
  clientSetFlight?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientSetFlightArgs, "client" | "flightId">
  >;
  clientSetSimulator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientSetSimulatorArgs, "client" | "simulatorId">
  >;
  clientSetStation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientSetStationArgs, "client" | "stationName">
  >;
  clientLogin?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientLoginArgs, "client">
  >;
  clientSetEmail?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientSetEmailArgs, "client" | "email">
  >;
  clientLogout?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientLogoutArgs, "client">
  >;
  clientDiagnostic?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientDiagnosticArgs, "client">
  >;
  clientReset?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientResetArgs, "client">
  >;
  clientLockScreen?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientLockScreenArgs, "client">
  >;
  clientUnlockScreen?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientUnlockScreenArgs, "client">
  >;
  clientOfflineState?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientOfflineStateArgs, "client">
  >;
  clientMovieState?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientMovieStateArgs, "client" | "movie">
  >;
  clientSetTraining?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientSetTrainingArgs, "client" | "training">
  >;
  clientSetSoundPlayer?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientSetSoundPlayerArgs, "client" | "soundPlayer">
  >;
  clientActivateLights?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientActivateLightsArgs, "clientId" | "dmxSetId">
  >;
  clientAddCache?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientAddCacheArgs, "cacheItem">
  >;
  clientRemoveCache?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientRemoveCacheArgs, "client" | "cacheItem">
  >;
  setClientHypercard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetClientHypercardArgs, never>
  >;
  playSound?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationPlaySoundArgs, "sound">
  >;
  stopAllSounds?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationStopAllSoundsArgs, "simulatorId">
  >;
  cancelLoopingSounds?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCancelLoopingSoundsArgs, "simulatorId">
  >;
  applyClientSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationApplyClientSetArgs,
      "id" | "flightId" | "simulatorId" | "templateId" | "stationSetId"
    >
  >;
  setClientOverlay?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetClientOverlayArgs, "id" | "overlay">
  >;
  clientCrack?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientCrackArgs, "id" | "crack">
  >;
  clientSetCard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClientSetCardArgs, "id" | "card">
  >;
  setKeypadCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetKeypadCodeArgs, "id">
  >;
  setKeypadEnteredCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetKeypadEnteredCodeArgs, "id">
  >;
  setKeypadHint?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetKeypadHintArgs, "id" | "hint">
  >;
  setKeypadLocked?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetKeypadLockedArgs, "id" | "locked">
  >;
  resetKeypad?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationResetKeypadArgs, "id">
  >;
  setCodeLength?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetCodeLengthArgs, "id" | "len">
  >;
  setKeypadAllowedAttempts?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetKeypadAllowedAttemptsArgs, "id" | "attempts">
  >;
  handheldScannerScan?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationHandheldScannerScanArgs, "id" | "request">
  >;
  handheldScannerCancel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationHandheldScannerCancelArgs, "id">
  >;
  handheldScannerResponse?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationHandheldScannerResponseArgs, "id" | "response">
  >;
  addCommandLine?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddCommandLineArgs, "name">
  >;
  renameCommandLine?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRenameCommandLineArgs, "id" | "name">
  >;
  removeCommandLine?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCommandLineArgs, "id">
  >;
  updateCommandLine?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCommandLineArgs, "id">
  >;
  executeCommandLine?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationExecuteCommandLineArgs, "simulatorId" | "command">
  >;
  addCommandLineToSimulator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAddCommandLineToSimulatorArgs,
      "simulatorId" | "commandLine"
    >
  >;
  removeCommandLineFromSimulator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveCommandLineFromSimulatorArgs,
      "simulatorId" | "commandLine"
    >
  >;
  addCommandLineOutput?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAddCommandLineOutputArgs,
      "simulatorId" | "clientId" | "output"
    >
  >;
  handleCommandLineFeedback?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationHandleCommandLineFeedbackArgs,
      "simulatorId" | "clientId" | "feedbackId" | "isApproved"
    >
  >;
  addComputerCoreUser?: Resolver<
    Maybe<ResolversTypes["ComputerCoreUser"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddComputerCoreUserArgs, "id">
  >;
  computerCoreAddHacker?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationComputerCoreAddHackerArgs, "id">
  >;
  updateComputerCoreUser?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateComputerCoreUserArgs, "id" | "userId">
  >;
  removeComputerCoreUser?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveComputerCoreUserArgs, "id" | "userId">
  >;
  restoreComputerCoreFile?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRestoreComputerCoreFileArgs, "id">
  >;
  deleteComputerCoreVirus?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteComputerCoreVirusArgs, "id" | "virusId">
  >;
  restartComputerCoreTerminal?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRestartComputerCoreTerminalArgs, "id" | "terminalId">
  >;
  addViriiToComputerCore?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddViriiToComputerCoreArgs, "id">
  >;
  setCoolantTank?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetCoolantTankArgs, "id" | "coolant">
  >;
  transferCoolant?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTransferCoolantArgs, "coolantId">
  >;
  ignoreCoreFeed?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationIgnoreCoreFeedArgs, never>
  >;
  syncTimer?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSyncTimerArgs, "simulatorId">
  >;
  updateCoreLayout?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCoreLayoutArgs, never>
  >;
  addCoreLayout?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddCoreLayoutArgs, never>
  >;
  removeCoreLayout?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCoreLayoutArgs, never>
  >;
  reorderCoreLayouts?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationReorderCoreLayoutsArgs, "layouts">
  >;
  addCrewmember?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddCrewmemberArgs, never>
  >;
  removeCrewmember?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCrewmemberArgs, never>
  >;
  updateCrewmember?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCrewmemberArgs, never>
  >;
  newRandomCrewmember?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNewRandomCrewmemberArgs, "simulatorId">
  >;
  removeAllCrew?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveAllCrewArgs, "simulatorId">
  >;
  crewImport?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrewImportArgs, "simulatorId" | "crew">
  >;
  crmSetActivated?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmSetActivatedArgs, "id" | "state">
  >;
  crmSetPassword?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmSetPasswordArgs, "id" | "password">
  >;
  crmAddEnemy?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmAddEnemyArgs, "id">
  >;
  crmSetAcceleration?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCrmSetAccelerationArgs,
      "id" | "clientId" | "acceleration"
    >
  >;
  crmSetPhaserCharge?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmSetPhaserChargeArgs, "id" | "clientId" | "phaser">
  >;
  crmSetShieldState?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmSetShieldStateArgs, "id" | "clientId" | "shield">
  >;
  crmLoadTorpedo?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmLoadTorpedoArgs, "id" | "clientId">
  >;
  crmFireTorpedo?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmFireTorpedoArgs, "id" | "clientId" | "target">
  >;
  crmFirePhaser?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmFirePhaserArgs, "id" | "clientId" | "target">
  >;
  crmStopPhaser?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmStopPhaserArgs, "id" | "clientId">
  >;
  crmSetFighterDocked?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmSetFighterDockedArgs, "id" | "clientId" | "docked">
  >;
  crmRestockTorpedos?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmRestockTorpedosArgs, "id" | "clientId">
  >;
  crmSetAttacking?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmSetAttackingArgs, "id" | "attacking">
  >;
  crmSetFighterImage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmSetFighterImageArgs, "id" | "image">
  >;
  crmSetFighterIcon?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmSetFighterIconArgs, "id" | "image">
  >;
  crmSetEnemyIcon?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmSetEnemyIconArgs, "id" | "image">
  >;
  crmSetEnemyCount?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmSetEnemyCountArgs, "id" | "count">
  >;
  crmRestoreFighter?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmRestoreFighterArgs, "id" | "clientId">
  >;
  crmDestroyUndockedFighters?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmDestroyUndockedFightersArgs, "id">
  >;
  crmRestoreFighters?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmRestoreFightersArgs, "id">
  >;
  crmSetFighterStrength?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmSetFighterStrengthArgs, "id" | "strength">
  >;
  crmSetEnemyStrength?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCrmSetEnemyStrengthArgs, "id" | "strength">
  >;
  damageSystem?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDamageSystemArgs, "systemId">
  >;
  damageReport?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDamageReportArgs, "systemId" | "report">
  >;
  updateCurrentDamageStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCurrentDamageStepArgs, "systemId" | "step">
  >;
  repairSystem?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRepairSystemArgs, "systemId">
  >;
  requestDamageReport?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRequestDamageReportArgs, "systemId">
  >;
  systemReactivationCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSystemReactivationCodeArgs,
      "systemId" | "station" | "code"
    >
  >;
  systemReactivationCodeResponse?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSystemReactivationCodeResponseArgs,
      "systemId" | "response"
    >
  >;
  addSystemDamageStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddSystemDamageStepArgs, "systemId" | "step">
  >;
  updateSystemDamageStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSystemDamageStepArgs, "systemId" | "step">
  >;
  removeSystemDamageStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSystemDamageStepArgs, "systemId" | "step">
  >;
  generateDamageReport?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationGenerateDamageReportArgs, "systemId">
  >;
  addSystemDamageTask?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddSystemDamageTaskArgs, "systemId" | "task">
  >;
  removeSystemDamageTask?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSystemDamageTaskArgs, "systemId" | "taskId">
  >;
  updateSystemDamageTask?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSystemDamageTaskArgs, "systemId" | "task">
  >;
  breakSystem?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationBreakSystemArgs, "simulatorId" | "type">
  >;
  fixSystem?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFixSystemArgs, "simulatorId" | "type">
  >;
  setDamageStepValidation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetDamageStepValidationArgs, "id" | "validation">
  >;
  validateDamageStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationValidateDamageStepArgs, "id">
  >;
  addSimulatorDamageStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddSimulatorDamageStepArgs, "simulatorId" | "step">
  >;
  updateSimulatorDamageStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSimulatorDamageStepArgs, "simulatorId" | "step">
  >;
  removeSimulatorDamageStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSimulatorDamageStepArgs, "simulatorId" | "step">
  >;
  addSimulatorDamageTask?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddSimulatorDamageTaskArgs, "simulatorId" | "task">
  >;
  removeSimulatorDamageTask?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveSimulatorDamageTaskArgs,
      "simulatorId" | "taskId"
    >
  >;
  updateSimulatorDamageTask?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSimulatorDamageTaskArgs, "simulatorId" | "task">
  >;
  addDeck?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddDeckArgs, "simulatorId" | "number">
  >;
  removeDeck?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveDeckArgs, "deckId">
  >;
  addDecksBulk?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddDecksBulkArgs, "simulatorId" | "decks">
  >;
  updateDeckSvg?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDeckSvgArgs, "deckId" | "svg">
  >;
  deckDoors?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeckDoorsArgs, "deckId">
  >;
  deckEvac?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeckEvacArgs, "deckId">
  >;
  updateHallwaySvg?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateHallwaySvgArgs, "deckId">
  >;
  createDockingPort?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateDockingPortArgs, "port">
  >;
  updateDockingPort?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDockingPortArgs, "port">
  >;
  removeDockingPort?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveDockingPortArgs, "port">
  >;
  addSpeed?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddSpeedArgs, "speed">
  >;
  setSpeed?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSpeedArgs, "id" | "speed">
  >;
  setEngineSpeeds?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetEngineSpeedsArgs, "id" | "speeds">
  >;
  addHeat?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddHeatArgs, "id">
  >;
  addCoolant?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddCoolantArgs, "id">
  >;
  setHeatRate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetHeatRateArgs, "id">
  >;
  engineCool?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEngineCoolArgs, "id">
  >;
  setEngineAcceleration?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetEngineAccelerationArgs, "id" | "acceleration">
  >;
  setEngineUseAcceleration?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetEngineUseAccelerationArgs,
      "id" | "useAcceleration"
    >
  >;
  setEngineSpeedFactor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetEngineSpeedFactorArgs, "id" | "speedFactor">
  >;
  updateEnvironment?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEnvironmentArgs, "deckID">
  >;
  setSimulatorExocomps?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSimulatorExocompsArgs, "simulatorId" | "count">
  >;
  deployExocomp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeployExocompArgs, "exocomp">
  >;
  recallExocomp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRecallExocompArgs, "exocomp">
  >;
  exocompCompleteUpgrade?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationExocompCompleteUpgradeArgs, "exocomp">
  >;
  updateExocompDifficulty?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateExocompDifficultyArgs, "exocomp" | "difficulty">
  >;
  importSimulatorFromUrl?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationImportSimulatorFromUrlArgs, "url">
  >;
  importMissionFromUrl?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationImportMissionFromUrlArgs, "url">
  >;
  startFlight?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationStartFlightArgs, "simulators">
  >;
  resetFlight?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationResetFlightArgs, "flightId">
  >;
  deleteFlight?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteFlightArgs, "flightId">
  >;
  pauseFlight?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationPauseFlightArgs, "flightId">
  >;
  resumeFlight?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationResumeFlightArgs, "flightId">
  >;
  clientAddExtra?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationClientAddExtraArgs,
      "flightId" | "simulatorId" | "name"
    >
  >;
  googleSheetsAuthorize?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  googleSheetsCompleteAuthorize?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationGoogleSheetsCompleteAuthorizeArgs, "token">
  >;
  googleSheetsRevoke?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  googleSheetsFileSearch?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["GoogleSheetFile"]>>>,
    ParentType,
    ContextType,
    RequireFields<MutationGoogleSheetsFileSearchArgs, "searchText">
  >;
  googleSheetsAppendData?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationGoogleSheetsAppendDataArgs, never>
  >;
  addInterface?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddInterfaceArgs, "name">
  >;
  renameInterface?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRenameInterfaceArgs, "id" | "name">
  >;
  removeInterface?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveInterfaceArgs, "id">
  >;
  updateInterface?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateInterfaceArgs, "id">
  >;
  addInterfaceToSimulator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAddInterfaceToSimulatorArgs,
      "simulatorId" | "interfaceId"
    >
  >;
  removeInterfaceFromSimulator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveInterfaceFromSimulatorArgs,
      "simulatorId" | "interfaceId"
    >
  >;
  addInterfaceDevice?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddInterfaceDeviceArgs, "name" | "width" | "height">
  >;
  renameInterfaceDevice?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRenameInterfaceDeviceArgs, "id" | "name">
  >;
  removeInterfaceDevice?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveInterfaceDeviceArgs, "id">
  >;
  updateInterfaceDevice?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateInterfaceDeviceArgs, "id">
  >;
  triggerInterfaceObject?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTriggerInterfaceObjectArgs, "id" | "objectId">
  >;
  toggleInterfaceObjectHidden?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationToggleInterfaceObjectHiddenArgs,
      "id" | "objectId" | "hidden"
    >
  >;
  toggleInterfaceObjectPlaying?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationToggleInterfaceObjectPlayingArgs, "id" | "objectId">
  >;
  internalCommConnectOutgoing?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationInternalCommConnectOutgoingArgs, "id">
  >;
  internalCommConnectIncoming?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationInternalCommConnectIncomingArgs, "id">
  >;
  internalCommCancelIncoming?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationInternalCommCancelIncomingArgs, "id">
  >;
  internalCommCancelOutgoing?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationInternalCommCancelOutgoingArgs, "id">
  >;
  internalCommCallIncoming?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationInternalCommCallIncomingArgs, "id">
  >;
  internalCommCallOutgoing?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationInternalCommCallOutgoingArgs, "id">
  >;
  addInventory?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddInventoryArgs, never>
  >;
  removeInventory?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveInventoryArgs, never>
  >;
  moveInventory?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationMoveInventoryArgs,
      "id" | "fromRoom" | "toRoom" | "count"
    >
  >;
  updateInventoryCount?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateInventoryCountArgs, "id" | "room" | "count">
  >;
  updateInventoryMetadata?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateInventoryMetadataArgs, never>
  >;
  updateCrewInventory?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCrewInventoryArgs, "crewId" | "inventory">
  >;
  removeCrewInventory?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveCrewInventoryArgs,
      "crewId" | "inventory" | "roomId"
    >
  >;
  transferCargo?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTransferCargoArgs, "fromRoom" | "toRoom">
  >;
  insertIsochip?: Resolver<
    Maybe<ResolversTypes["Isochip"]>,
    ParentType,
    ContextType,
    RequireFields<MutationInsertIsochipArgs, never>
  >;
  updateIsochip?: Resolver<
    Maybe<ResolversTypes["Isochip"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateIsochipArgs, never>
  >;
  batchIsochipUpdate?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Isochip"]>>>,
    ParentType,
    ContextType,
    RequireFields<MutationBatchIsochipUpdateArgs, never>
  >;
  setJumpdriveActivated?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetJumpdriveActivatedArgs, "id" | "activated">
  >;
  setJumpdriveEnvs?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetJumpdriveEnvsArgs, "id" | "envs">
  >;
  setJumpdriveSectorLevel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetJumpdriveSectorLevelArgs,
      "id" | "sector" | "level"
    >
  >;
  setJumpdriveSectorOffset?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetJumpdriveSectorOffsetArgs,
      "id" | "sector" | "offset"
    >
  >;
  fluxJumpdriveSector?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFluxJumpdriveSectorArgs, "id">
  >;
  setJumpDriveEnabled?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetJumpDriveEnabledArgs, "id">
  >;
  hitJumpDriveStress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationHitJumpDriveStressArgs, "id" | "sector">
  >;
  setJumpDriveRingsExtended?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetJumpDriveRingsExtendedArgs, "id" | "ringsExtended">
  >;
  addKeyboard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddKeyboardArgs, "name">
  >;
  removeKeyboard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveKeyboardArgs, "id">
  >;
  renameKeyboard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRenameKeyboardArgs, "id" | "name">
  >;
  updateKeyboardKey?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateKeyboardKeyArgs, "id" | "key">
  >;
  triggerKeyboardAction?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationTriggerKeyboardActionArgs,
      "simulatorId" | "id" | "key" | "keyCode" | "meta"
    >
  >;
  addLibraryEntry?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddLibraryEntryArgs, "entry">
  >;
  updateLibraryEntry?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateLibraryEntryArgs, "entry">
  >;
  removeLibraryEntry?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveLibraryEntryArgs, never>
  >;
  importLibraryEntry?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationImportLibraryEntryArgs, "simulatorId" | "entries">
  >;
  updateSimulatorLighting?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSimulatorLightingArgs, "id" | "lighting">
  >;
  dmxSetSimulatorConfig?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationDmxSetSimulatorConfigArgs,
      "simulatorId" | "dmxConfigId"
    >
  >;
  lightingSetIntensity?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLightingSetIntensityArgs, "simulatorId" | "intensity">
  >;
  lightingShakeLights?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLightingShakeLightsArgs, "simulatorId">
  >;
  lightingFadeLights?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationLightingFadeLightsArgs,
      "simulatorId" | "duration" | "endIntensity"
    >
  >;
  lightingSetEffect?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLightingSetEffectArgs, "simulatorId" | "effect">
  >;
  sendLongRangeMessage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSendLongRangeMessageArgs, "message">
  >;
  longRangeMessageSend?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLongRangeMessageSendArgs, "message">
  >;
  deleteLongRangeMessage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteLongRangeMessageArgs, "id" | "message">
  >;
  updateLongRangeDecodedMessage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateLongRangeDecodedMessageArgs, "id" | "messageId">
  >;
  updateLongRangeComm?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateLongRangeCommArgs, "longRangeComm">
  >;
  approveLongRangeMessage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationApproveLongRangeMessageArgs, "id" | "message">
  >;
  encryptLongRangeMessage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEncryptLongRangeMessageArgs, "id" | "message">
  >;
  setLongRangeSatellites?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetLongRangeSatellitesArgs, "id" | "num">
  >;
  addInterceptionSignal?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddInterceptionSignalArgs, "id">
  >;
  removeInterceptionSignal?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveInterceptionSignalArgs, "id">
  >;
  setInterceptionDifficulty?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetInterceptionDifficultyArgs, "id" | "difficulty">
  >;
  setLongRangePresetMessages?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetLongRangePresetMessagesArgs, never>
  >;
  addMacro?: Resolver<
    Maybe<ResolversTypes["ID"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddMacroArgs, "name">
  >;
  removeMacro?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveMacroArgs, "id">
  >;
  renameMacro?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRenameMacroArgs, "id" | "name">
  >;
  duplicateMacro?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDuplicateMacroArgs, "id">
  >;
  duplicateMacroAction?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDuplicateMacroActionArgs, "id" | "actionId">
  >;
  updateMacroActions?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMacroActionsArgs, "id">
  >;
  triggerMacroAction?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTriggerMacroActionArgs, "simulatorId" | "macroId">
  >;
  addMacroButtonConfig?: Resolver<
    Maybe<ResolversTypes["ID"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddMacroButtonConfigArgs, "name">
  >;
  removeMacroButtonConfig?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveMacroButtonConfigArgs, "id">
  >;
  renameMacroButtonConfig?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRenameMacroButtonConfigArgs, "id" | "name">
  >;
  addMacroButton?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddMacroButtonArgs, "configId" | "name">
  >;
  removeMacroButton?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveMacroButtonArgs, "configId" | "id">
  >;
  renameMacroButton?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRenameMacroButtonArgs, "configId" | "id" | "name">
  >;
  setMacroButtonCategory?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetMacroButtonCategoryArgs,
      "configId" | "id" | "category"
    >
  >;
  setMacroButtonColor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetMacroButtonColorArgs, "configId" | "id" | "color">
  >;
  updateMacroButtonActions?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMacroButtonActionsArgs, "configId" | "id">
  >;
  triggerMacroButton?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationTriggerMacroButtonArgs,
      "simulatorId" | "configId" | "buttonId"
    >
  >;
  toggleStationMessageGroup?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationToggleStationMessageGroupArgs,
      "stationSetId" | "station" | "group" | "state"
    >
  >;
  sendMessage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageArgs, "message">
  >;
  midiSetCreate?: Resolver<
    Maybe<ResolversTypes["MidiSet"]>,
    ParentType,
    ContextType,
    RequireFields<MutationMidiSetCreateArgs, "name" | "deviceName">
  >;
  midiSetRename?: Resolver<
    Maybe<ResolversTypes["MidiSet"]>,
    ParentType,
    ContextType,
    RequireFields<MutationMidiSetRenameArgs, "id" | "name">
  >;
  midiSetRemove?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationMidiSetRemoveArgs, "id">
  >;
  midiSetControl?: Resolver<
    Maybe<ResolversTypes["MidiSet"]>,
    ParentType,
    ContextType,
    RequireFields<MutationMidiSetControlArgs, "id" | "control">
  >;
  simulatorAddMidiSet?: Resolver<
    Maybe<ResolversTypes["Simulator"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSimulatorAddMidiSetArgs, "simulatorId" | "midiSet">
  >;
  simulatorRemoveMidiSet?: Resolver<
    Maybe<ResolversTypes["Simulator"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSimulatorRemoveMidiSetArgs, "simulatorId" | "midiSet">
  >;
  createMission?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateMissionArgs, "name">
  >;
  removeMission?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveMissionArgs, "missionId">
  >;
  editMission?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEditMissionArgs, "missionId">
  >;
  importMission?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationImportMissionArgs, "jsonString">
  >;
  addTimelineStep?: Resolver<
    Maybe<ResolversTypes["ID"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTimelineStepArgs, "name">
  >;
  removeTimelineStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveTimelineStepArgs, "timelineStepId">
  >;
  reorderTimelineStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationReorderTimelineStepArgs, "timelineStepId" | "order">
  >;
  updateTimelineStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTimelineStepArgs, "timelineStepId">
  >;
  addTimelineItemToTimelineStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAddTimelineItemToTimelineStepArgs,
      "timelineStepId" | "timelineItem"
    >
  >;
  removeTimelineStepItem?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveTimelineStepItemArgs,
      "timelineStepId" | "timelineItemId"
    >
  >;
  updateTimelineStepItem?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateTimelineStepItemArgs,
      "timelineStepId" | "timelineItemId" | "updateTimelineItem"
    >
  >;
  duplicateTimelineStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationDuplicateTimelineStepArgs,
      "missionId" | "timelineStepId"
    >
  >;
  timelineDuplicateItem?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationTimelineDuplicateItemArgs,
      "missionId" | "timelineStepId" | "timelineItemId"
    >
  >;
  startAuxTimeline?: Resolver<
    Maybe<ResolversTypes["ID"]>,
    ParentType,
    ContextType,
    RequireFields<MutationStartAuxTimelineArgs, "simulatorId" | "missionId">
  >;
  setAuxTimelineStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetAuxTimelineStepArgs,
      "simulatorId" | "timelineId" | "step"
    >
  >;
  missionSetExtraRequirements?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationMissionSetExtraRequirementsArgs,
      "missionId" | "requirements"
    >
  >;
  motuAdd?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationMotuAddArgs, "address">
  >;
  motuRemove?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationMotuRemoveArgs, "id">
  >;
  motuUpdateChannel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationMotuUpdateChannelArgs, "id" | "channelId" | "channel">
  >;
  motuSetSendMute?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationMotuSetSendMuteArgs,
      "id" | "inputId" | "outputId" | "mute"
    >
  >;
  navCalculateCourse?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNavCalculateCourseArgs, "id" | "destination">
  >;
  navCancelCalculation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNavCancelCalculationArgs, "id">
  >;
  navCourseResponse?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNavCourseResponseArgs, "id">
  >;
  navCourseEntry?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNavCourseEntryArgs, "id">
  >;
  navToggleCalculate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNavToggleCalculateArgs, "id" | "which">
  >;
  navSetDestinations?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNavSetDestinationsArgs, never>
  >;
  navSetDestination?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNavSetDestinationArgs, never>
  >;
  navSetScanning?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNavSetScanningArgs, never>
  >;
  navSetThrusters?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNavSetThrustersArgs, "id">
  >;
  navSetPresets?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNavSetPresetsArgs, never>
  >;
  addObjective?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddObjectiveArgs, "objective">
  >;
  completeObjective?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCompleteObjectiveArgs, "id">
  >;
  objectiveSetCrewComplete?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationObjectiveSetCrewCompleteArgs, "id" | "crewComplete">
  >;
  addLog?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddLogArgs, never>
  >;
  chargePhaserBeam?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChargePhaserBeamArgs, "id" | "beamId">
  >;
  dischargePhaserBeam?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDischargePhaserBeamArgs, "id" | "beamId">
  >;
  firePhaserBeam?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFirePhaserBeamArgs, "id" | "beamId">
  >;
  stopPhaserBeams?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationStopPhaserBeamsArgs, "id">
  >;
  coolPhaserBeam?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCoolPhaserBeamArgs, "id">
  >;
  phaserArc?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationPhaserArcArgs, "id" | "arc">
  >;
  setPhaserBeamCharge?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetPhaserBeamChargeArgs, "id" | "beamId" | "charge">
  >;
  setPhaserBeamHeat?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetPhaserBeamHeatArgs, "id" | "beamId" | "heat">
  >;
  setPhaserBeamCount?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetPhaserBeamCountArgs, "id" | "beamCount">
  >;
  setPhaserHoldToCharge?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetPhaserHoldToChargeArgs, "id" | "holdToCharge">
  >;
  setPhaserChargeSpeed?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetPhaserChargeSpeedArgs, "id" | "speed">
  >;
  stopChargingPhasers?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationStopChargingPhasersArgs, "id">
  >;
  changePower?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChangePowerArgs, "systemId" | "power">
  >;
  changeSystemPowerLevels?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationChangeSystemPowerLevelsArgs,
      "systemId" | "powerLevels"
    >
  >;
  changeSystemDefaultPowerLevel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChangeSystemDefaultPowerLevelArgs, "id" | "level">
  >;
  fluxSystemPower?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFluxSystemPowerArgs, never>
  >;
  destroyProbe?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDestroyProbeArgs, "id" | "probeId">
  >;
  destroyAllProbes?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDestroyAllProbesArgs, "id">
  >;
  launchProbe?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLaunchProbeArgs, "id" | "probe">
  >;
  fireProbe?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFireProbeArgs, "id" | "probeId">
  >;
  updateProbeType?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProbeTypeArgs, "id" | "probeType">
  >;
  updateProbeEquipment?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProbeEquipmentArgs, "id" | "probeEquipment">
  >;
  probeQuery?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationProbeQueryArgs, "id" | "probeId">
  >;
  probeQueryResponse?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationProbeQueryResponseArgs, "id" | "probeId">
  >;
  probeProcessedData?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationProbeProcessedDataArgs, "id">
  >;
  setProbeTorpedo?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetProbeTorpedoArgs, "id" | "torpedo">
  >;
  setProbeCharge?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetProbeChargeArgs, "id" | "probeId" | "charge">
  >;
  activateProbeEmitter?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationActivateProbeEmitterArgs, "id" | "probeId">
  >;
  setRailgunAmmo?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetRailgunAmmoArgs, "id">
  >;
  setRailgunMaxAmmo?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetRailgunMaxAmmoArgs, "id" | "ammo">
  >;
  setRailgunAvailableAmmo?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetRailgunAvailableAmmoArgs, "id" | "ammo">
  >;
  fireRailgun?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFireRailgunArgs, "id" | "simulatorId">
  >;
  loadRailgun?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLoadRailgunArgs, "id">
  >;
  reactorEject?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationReactorEjectArgs, "id" | "tf">
  >;
  reactorChangeModel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationReactorChangeModelArgs, "id" | "model">
  >;
  reactorChangeOutput?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationReactorChangeOutputArgs, "id" | "output">
  >;
  reactorChangeEfficiency?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationReactorChangeEfficiencyArgs, "id">
  >;
  reactorBatteryChargeLevel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationReactorBatteryChargeLevelArgs, "id" | "level">
  >;
  reactorBatteryChargeRate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationReactorBatteryChargeRateArgs, "id" | "rate">
  >;
  updateDilithiumStress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDilithiumStressArgs, "id">
  >;
  fluxDilithiumStress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFluxDilithiumStressArgs, "id">
  >;
  setReactorEffciciencies?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetReactorEffcicienciesArgs, "id" | "efficiencies">
  >;
  setDilithiumStressRate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetDilithiumStressRateArgs, "id" | "rate">
  >;
  reactorRequireBalance?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationReactorRequireBalanceArgs, "id" | "balance">
  >;
  recordsCreate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRecordsCreateArgs,
      "simulatorId" | "contents" | "category"
    >
  >;
  recordsCreateSnippet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRecordsCreateSnippetArgs,
      "simulatorId" | "recordIds" | "name" | "type"
    >
  >;
  recordsAddToSnippet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRecordsAddToSnippetArgs,
      "simulatorId" | "snippetId" | "recordIds"
    >
  >;
  recordsRemoveFromSnippet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRecordsRemoveFromSnippetArgs,
      "simulatorId" | "snippetId" | "recordId"
    >
  >;
  recordsDeleteRecord?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRecordsDeleteRecordArgs, "simulatorId" | "recordId">
  >;
  recordsGenerateRecords?: Resolver<
    Maybe<ResolversTypes["RecordSnippet"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRecordsGenerateRecordsArgs, "simulatorId" | "name">
  >;
  recordsCreateOnSnippet?: Resolver<
    Maybe<ResolversTypes["RecordSnippet"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRecordsCreateOnSnippetArgs,
      "simulatorId" | "contents" | "category"
    >
  >;
  recordsShowSnippet?: Resolver<
    Maybe<ResolversTypes["RecordSnippet"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRecordsShowSnippetArgs, "simulatorId" | "snippetId">
  >;
  recordsHideSnippet?: Resolver<
    Maybe<ResolversTypes["RecordSnippet"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRecordsHideSnippetArgs, "simulatorId" | "snippetId">
  >;
  recordTemplateCreateSnippet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRecordTemplateCreateSnippetArgs, "name">
  >;
  recordTemplateAddToSnippet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRecordTemplateAddToSnippetArgs,
      "snippetId" | "contents" | "category"
    >
  >;
  recordTemplateDeleteSnippet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRecordTemplateDeleteSnippetArgs, "snippetId">
  >;
  recordTemplateRename?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRecordTemplateRenameArgs, "snippetId" | "name">
  >;
  recordTemplateUpdateRecord?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRecordTemplateUpdateRecordArgs,
      "snippetId" | "category"
    >
  >;
  recordTemplateRemoveFromSnippet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRecordTemplateRemoveFromSnippetArgs,
      "snippetId" | "recordId"
    >
  >;
  addRoom?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddRoomArgs, "simulatorId" | "name">
  >;
  removeRoom?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveRoomArgs, "roomId">
  >;
  addRoomsBulk?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddRoomsBulkArgs, "simulatorId" | "rooms">
  >;
  renameRoom?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRenameRoomArgs, "roomId" | "name">
  >;
  updateRoomRoles?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRoomRolesArgs, "roomId">
  >;
  updateRoomSvg?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRoomSvgArgs, "roomId" | "svg">
  >;
  roomGas?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRoomGasArgs, "roomId">
  >;
  importRooms?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationImportRoomsArgs, "simulatorId" | "rooms">
  >;
  changeRoomDeck?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChangeRoomDeckArgs, "roomId" | "deckId">
  >;
  snapshot?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  test?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTestArgs, never>
  >;
  sensorScanRequest?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSensorScanRequestArgs, "id" | "request">
  >;
  sensorScanResult?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSensorScanResultArgs, "id" | "result">
  >;
  processedData?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationProcessedDataArgs, "data">
  >;
  removeProcessedData?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveProcessedDataArgs, "time">
  >;
  sensorScanCancel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSensorScanCancelArgs, "id">
  >;
  setPresetAnswers?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetPresetAnswersArgs,
      "simulatorId" | "domain" | "presetAnswers"
    >
  >;
  createSensorContact?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateSensorContactArgs, "id" | "contact">
  >;
  createSensorContacts?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateSensorContactsArgs, "id" | "contacts">
  >;
  moveSensorContact?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationMoveSensorContactArgs, "id" | "contact">
  >;
  removeSensorContact?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSensorContactArgs, "id" | "contact">
  >;
  removeAllSensorContacts?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveAllSensorContactsArgs, "id">
  >;
  stopAllSensorContacts?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationStopAllSensorContactsArgs, "id">
  >;
  updateSensorContact?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSensorContactArgs, "contact">
  >;
  setArmyContacts?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetArmyContactsArgs,
      "simulatorId" | "domain" | "armyContacts"
    >
  >;
  createSensorArmyContact?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateSensorArmyContactArgs, "id" | "contact">
  >;
  removeSensorArmyContact?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSensorArmyContactArgs, "id" | "contact">
  >;
  updateSensorArmyContact?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSensorArmyContactArgs, "id" | "contact">
  >;
  nudgeSensorContacts?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNudgeSensorContactsArgs, "id" | "speed">
  >;
  sensorsSetHasPing?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSensorsSetHasPingArgs, "id" | "ping">
  >;
  setSensorPingMode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSensorPingModeArgs, "id">
  >;
  pingSensors?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationPingSensorsArgs, "id">
  >;
  animateSensorContacact?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  setSensorsHistory?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSensorsHistoryArgs, "id" | "history">
  >;
  newSensorScan?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNewSensorScanArgs, "id" | "scan">
  >;
  updateSensorScan?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSensorScanArgs, "id" | "scan">
  >;
  cancelSensorScan?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCancelSensorScanArgs, "id" | "scan">
  >;
  toggleSensorsAutoTarget?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationToggleSensorsAutoTargetArgs, "id" | "target">
  >;
  toggleSensorsAutoThrusters?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationToggleSensorsAutoThrustersArgs, "id" | "thrusters">
  >;
  setSensorsInterference?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSensorsInterferenceArgs, "id" | "interference">
  >;
  setSensorsSegment?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetSensorsSegmentArgs,
      "id" | "ring" | "line" | "state"
    >
  >;
  setAutoMovement?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetAutoMovementArgs, "id" | "movement">
  >;
  updateSensorContacts?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSensorContactsArgs, "id" | "contacts">
  >;
  updateSensorGrid?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSensorGridArgs, "simulatorId" | "contacts">
  >;
  destroySensorContact?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDestroySensorContactArgs, "id">
  >;
  sensorsFireProjectile?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSensorsFireProjectileArgs,
      "simulatorId" | "contactId" | "speed" | "hitpoints"
    >
  >;
  setSensorsDefaultHitpoints?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSensorsDefaultHitpointsArgs, "hp">
  >;
  setSensorsDefaultSpeed?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSensorsDefaultSpeedArgs, "speed">
  >;
  setSensorsMissPercent?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSensorsMissPercentArgs, "id" | "miss">
  >;
  createSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateSetArgs, "name">
  >;
  removeSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSetArgs, "id">
  >;
  addClientToSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddClientToSetArgs, "id" | "client">
  >;
  removeClientFromSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveClientFromSetArgs, "id" | "clientId">
  >;
  updateSetClient?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSetClientArgs, "id" | "client">
  >;
  renameSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRenameSetArgs, "id" | "name">
  >;
  shieldRaised?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationShieldRaisedArgs, "id">
  >;
  shieldLowered?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationShieldLoweredArgs, "id">
  >;
  shieldIntegritySet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationShieldIntegritySetArgs, "id">
  >;
  shieldFrequencySet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationShieldFrequencySetArgs, "id">
  >;
  shieldFrequencySetAll?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationShieldFrequencySetAllArgs,
      "simulatorId" | "frequency"
    >
  >;
  hitShields?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationHitShieldsArgs, never>
  >;
  restoreShields?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRestoreShieldsArgs, never>
  >;
  shipDockingChange?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationShipDockingChangeArgs,
      "simulatorId" | "which" | "state"
    >
  >;
  shipSetDocking?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationShipSetDockingArgs, "simulatorId">
  >;
  remoteAccessSendCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoteAccessSendCodeArgs,
      "simulatorId" | "code" | "station"
    >
  >;
  remoteAccessUpdateCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoteAccessUpdateCodeArgs,
      "simulatorId" | "codeId" | "state"
    >
  >;
  setSelfDestructTime?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSelfDestructTimeArgs, "simulatorId">
  >;
  setSelfDestructCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSelfDestructCodeArgs, "simulatorId">
  >;
  setSelfDestructAuto?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSelfDestructAutoArgs, "simulatorId">
  >;
  notify?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNotifyArgs, "simulatorId" | "title">
  >;
  printPdf?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationPrintPdfArgs, "asset">
  >;
  commAddSignal?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCommAddSignalArgs, "id" | "commSignalInput">
  >;
  commUpdateSignal?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCommUpdateSignalArgs, "id" | "commSignalInput">
  >;
  commUpdateSignals?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCommUpdateSignalsArgs, "id" | "signals">
  >;
  commRemoveSignal?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCommRemoveSignalArgs, "id" | "signalId">
  >;
  commAddArrow?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCommAddArrowArgs, "id" | "commArrowInput">
  >;
  commRemoveArrow?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCommRemoveArrowArgs, "id" | "arrowId">
  >;
  commConnectArrow?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCommConnectArrowArgs, "id" | "arrowId">
  >;
  commDisconnectArrow?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCommDisconnectArrowArgs, "id" | "arrowId">
  >;
  commUpdate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCommUpdateArgs, "id" | "commUpdateInput">
  >;
  commHail?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCommHailArgs, "id">
  >;
  cancelHail?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCancelHailArgs, "id">
  >;
  connectHail?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationConnectHailArgs, "id">
  >;
  addShortRangeComm?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddShortRangeCommArgs, "simulatorId">
  >;
  removeShortRangeComm?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveShortRangeCommArgs, "simulatorId">
  >;
  muteShortRangeComm?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationMuteShortRangeCommArgs, "id" | "arrowId" | "mute">
  >;
  setSickbayBunks?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSickbayBunksArgs, "id">
  >;
  addSickbayCrew?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddSickbayCrewArgs, "id" | "crew">
  >;
  removeSickbayCrew?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSickbayCrewArgs, "id" | "crewId">
  >;
  updateSickbayCrew?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSickbayCrewArgs, "id" | "crewId" | "crew">
  >;
  scanSickbayBunk?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationScanSickbayBunkArgs, "id" | "bunkId" | "request">
  >;
  cancelSickbayBunkScan?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCancelSickbayBunkScanArgs, "id" | "bunkId">
  >;
  sickbayBunkScanResponse?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSickbayBunkScanResponseArgs,
      "id" | "bunkId" | "response"
    >
  >;
  assignPatient?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAssignPatientArgs, "id" | "bunkId" | "crewId">
  >;
  dischargePatient?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDischargePatientArgs, "id" | "bunkId">
  >;
  startDeconProgram?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationStartDeconProgramArgs, "program" | "location">
  >;
  updateDeconOffset?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDeconOffsetArgs, "id" | "offset">
  >;
  cancelDeconProgram?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCancelDeconProgramArgs, "id">
  >;
  completeDeconProgram?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCompleteDeconProgramArgs, "id">
  >;
  setDeconAutoFinish?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetDeconAutoFinishArgs, "id" | "finish">
  >;
  updatePatientChart?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePatientChartArgs, "crewId" | "chart">
  >;
  updateSignalJammer?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSignalJammerArgs, "jammer">
  >;
  signalJammerSignals?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSignalJammerSignalsArgs, "id" | "type" | "signals">
  >;
  fluxSignalJammer?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFluxSignalJammerArgs, never>
  >;
  setSignalJammerSensorsInterference?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetSignalJammerSensorsInterferenceArgs,
      "id" | "interference"
    >
  >;
  createSimulator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateSimulatorArgs, "name">
  >;
  removeSimulator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSimulatorArgs, "simulatorId">
  >;
  triggerMacros?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTriggerMacrosArgs, "simulatorId" | "macros">
  >;
  autoAdvance?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAutoAdvanceArgs, "simulatorId">
  >;
  trainingMode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTrainingModeArgs, "simulatorId">
  >;
  setAlertConditionLock?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetAlertConditionLockArgs, "simulatorId" | "lock">
  >;
  renameSimulator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRenameSimulatorArgs, "simulatorId" | "name">
  >;
  changeSimulatorLayout?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChangeSimulatorLayoutArgs, "simulatorId" | "layout">
  >;
  changeSimulatorCaps?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChangeSimulatorCapsArgs, "simulatorId" | "caps">
  >;
  changeSimulatorAlertLevel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationChangeSimulatorAlertLevelArgs,
      "simulatorId" | "alertLevel"
    >
  >;
  hideSimulatorCard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationHideSimulatorCardArgs, "simulatorId" | "cardName">
  >;
  unhideSimulatorCard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUnhideSimulatorCardArgs, "simulatorId" | "cardName">
  >;
  stationAssignCard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationStationAssignCardArgs,
      "simulatorId" | "assignedToStation" | "cardName"
    >
  >;
  stationUnassignCard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationStationUnassignCardArgs, "simulatorId" | "cardName">
  >;
  flipSimulator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFlipSimulatorArgs, "simulatorId" | "flip">
  >;
  toggleSimulatorCardHidden?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationToggleSimulatorCardHiddenArgs,
      "simulatorId" | "cardName" | "toggle"
    >
  >;
  changeSimulatorExocomps?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationChangeSimulatorExocompsArgs,
      "simulatorId" | "exocomps"
    >
  >;
  changeSimulatorBridgeCrew?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChangeSimulatorBridgeCrewArgs, "simulatorId" | "crew">
  >;
  changeSimulatorExtraPeople?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationChangeSimulatorExtraPeopleArgs,
      "simulatorId" | "crew"
    >
  >;
  changeSimulatorRadiation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationChangeSimulatorRadiationArgs,
      "simulatorId" | "radiation"
    >
  >;
  setSimulatorTimelineStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSimulatorTimelineStepArgs, "simulatorId" | "step">
  >;
  setSimulatorMission?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSimulatorMissionArgs, "simulatorId" | "missionId">
  >;
  setSimulatorMissionConfig?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetSimulatorMissionConfigArgs,
      "simulatorId" | "missionId" | "stationSetId" | "actionId" | "args"
    >
  >;
  updateSimulatorPanels?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSimulatorPanelsArgs, "simulatorId" | "panels">
  >;
  updateSimulatorCommandLines?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateSimulatorCommandLinesArgs,
      "simulatorId" | "commandLines"
    >
  >;
  updateSimulatorTriggers?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateSimulatorTriggersArgs,
      "simulatorId" | "triggers"
    >
  >;
  setSimulatorTriggersPaused?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetSimulatorTriggersPausedArgs,
      "simulatorId" | "paused"
    >
  >;
  updateSimulatorInterfaces?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateSimulatorInterfacesArgs,
      "simulatorId" | "interfaces"
    >
  >;
  setStepDamage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetStepDamageArgs, "simulatorId" | "stepDamage">
  >;
  setVerifyDamage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetVerifyDamageArgs, "simulatorId" | "verifyStep">
  >;
  setBridgeMessaging?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetBridgeMessagingArgs, "id" | "messaging">
  >;
  setSimulatorAssets?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSimulatorAssetsArgs, "id" | "assets">
  >;
  setSimulatorSoundEffects?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSimulatorSoundEffectsArgs, "id" | "soundEffects">
  >;
  setSimulatorHasPrinter?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetSimulatorHasPrinterArgs,
      "simulatorId" | "hasPrinter"
    >
  >;
  setSimulatorHasLegs?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSimulatorHasLegsArgs, "simulatorId" | "hasLegs">
  >;
  setSimulatorSpaceEdventuresId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetSimulatorSpaceEdventuresIdArgs,
      "simulatorId" | "spaceEdventuresId"
    >
  >;
  addSimulatorStationCard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAddSimulatorStationCardArgs,
      "simulatorId" | "station" | "cardName" | "cardComponent"
    >
  >;
  removeSimulatorStationCard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveSimulatorStationCardArgs,
      "simulatorId" | "station" | "cardName"
    >
  >;
  editSimulatorStationCard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationEditSimulatorStationCardArgs,
      "simulatorId" | "station" | "cardName"
    >
  >;
  setSimulatorStationMessageGroup?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetSimulatorStationMessageGroupArgs,
      "simulatorId" | "station" | "group" | "state"
    >
  >;
  setSimulatorStationLogin?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetSimulatorStationLoginArgs,
      "simulatorId" | "station" | "login"
    >
  >;
  setSimulatorStationLayout?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetSimulatorStationLayoutArgs,
      "simulatorId" | "station" | "layout"
    >
  >;
  setSimulatorStationExecutive?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetSimulatorStationExecutiveArgs,
      "simulatorId" | "station" | "exec"
    >
  >;
  setSimulatorStationWidget?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetSimulatorStationWidgetArgs,
      "simulatorId" | "station" | "widget" | "state"
    >
  >;
  createSoftwarePanel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateSoftwarePanelArgs, "panel">
  >;
  updateSoftwarePanel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSoftwarePanelArgs, "panel">
  >;
  removeSoftwarePanel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSoftwarePanelArgs, "panel">
  >;
  createStationSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateStationSetArgs, "name" | "simulatorId">
  >;
  removeStationSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveStationSetArgs, "stationSetID">
  >;
  renameStationSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRenameStationSetArgs, "stationSetID" | "name">
  >;
  duplicateStationSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDuplicateStationSetArgs, "stationSetID" | "name">
  >;
  setStationSetCrewCount?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetStationSetCrewCountArgs,
      "stationSetID" | "crewCount"
    >
  >;
  addStationToStationSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAddStationToStationSetArgs,
      "stationSetID" | "stationName"
    >
  >;
  removeStationFromStationSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveStationFromStationSetArgs,
      "stationSetID" | "stationName"
    >
  >;
  editStationInStationSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationEditStationInStationSetArgs,
      "stationSetID" | "stationName" | "newStationName"
    >
  >;
  addCardToStation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAddCardToStationArgs,
      "stationSetID" | "stationName" | "cardName" | "cardComponent"
    >
  >;
  removeCardFromStation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveCardFromStationArgs,
      "stationSetID" | "stationName" | "cardName"
    >
  >;
  editCardInStationSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationEditCardInStationSetArgs,
      "stationSetID" | "stationName" | "cardName"
    >
  >;
  setStationLogin?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetStationLoginArgs,
      "stationSetID" | "stationName" | "login"
    >
  >;
  setStationLayout?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetStationLayoutArgs,
      "stationSetID" | "stationName" | "layout"
    >
  >;
  setStationExecutive?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetStationExecutiveArgs,
      "stationSetID" | "stationName" | "exec"
    >
  >;
  toggleStationWidgets?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationToggleStationWidgetsArgs,
      "stationSetID" | "stationName" | "widget" | "state"
    >
  >;
  setStationDescription?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetStationDescriptionArgs,
      "stationSetID" | "stationName" | "description"
    >
  >;
  setStationTraining?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetStationTrainingArgs,
      "stationSetID" | "stationName"
    >
  >;
  reorderStationWidgets?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationReorderStationWidgetsArgs,
      "stationSetId" | "stationName" | "widget" | "order"
    >
  >;
  setStealthActivated?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetStealthActivatedArgs, never>
  >;
  setStealthCharge?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetStealthChargeArgs, never>
  >;
  activateStealth?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationActivateStealthArgs, never>
  >;
  deactivateStealth?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeactivateStealthArgs, never>
  >;
  setStealthQuadrant?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetStealthQuadrantArgs, never>
  >;
  fluxStealthQuadrants?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFluxStealthQuadrantsArgs, never>
  >;
  stealthChangeAlert?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationStealthChangeAlertArgs, "id" | "change">
  >;
  fluxSubspaceField?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFluxSubspaceFieldArgs, "id">
  >;
  normalSubspaceField?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNormalSubspaceFieldArgs, "id">
  >;
  setSubspaceFieldSectorValue?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSubspaceFieldSectorValueArgs, "which" | "value">
  >;
  createSurveyForm?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateSurveyFormArgs, "name">
  >;
  removeSurveyForm?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSurveyFormArgs, "id">
  >;
  setSurveyFormGoogleSheet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSurveyFormGoogleSheetArgs, "id">
  >;
  updateSurveyForm?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSurveyFormArgs, "id" | "form">
  >;
  triggerSurvey?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTriggerSurveyArgs, "simulatorId" | "id">
  >;
  surveyFormResponse?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSurveyFormResponseArgs, "id">
  >;
  endSurvey?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEndSurveyArgs, "id">
  >;
  addSystemToSimulator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAddSystemToSimulatorArgs,
      "simulatorId" | "className" | "params"
    >
  >;
  removeSystemFromSimulator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSystemFromSimulatorArgs, never>
  >;
  updateSystemName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSystemNameArgs, "systemId">
  >;
  updateSystemUpgradeMacros?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSystemUpgradeMacrosArgs, "systemId">
  >;
  updateSystemUpgradeBoard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSystemUpgradeBoardArgs, "systemId">
  >;
  upgradeSystem?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpgradeSystemArgs, "systemId">
  >;
  updateSystemRooms?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSystemRoomsArgs, "systemId">
  >;
  newTacticalMap?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNewTacticalMapArgs, "name">
  >;
  updateTacticalMap?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTacticalMapArgs, "id">
  >;
  freezeTacticalMap?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFreezeTacticalMapArgs, "id" | "freeze">
  >;
  duplicateTacticalMap?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDuplicateTacticalMapArgs, "id" | "name">
  >;
  loadTacticalMap?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLoadTacticalMapArgs, "id" | "flightId">
  >;
  removeTacticalMap?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveTacticalMapArgs, "id">
  >;
  addTacticalMapLayer?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTacticalMapLayerArgs, "mapId" | "name">
  >;
  updateTacticalMapLayer?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTacticalMapLayerArgs, "mapId" | "layer">
  >;
  reorderTacticalMapLayer?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationReorderTacticalMapLayerArgs,
      "mapId" | "layer" | "order"
    >
  >;
  removeTacticalMapLayer?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveTacticalMapLayerArgs, "mapId" | "layerId">
  >;
  addTacticalMapItem?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTacticalMapItemArgs, "mapId" | "layerId" | "item">
  >;
  updateTacticalMapItem?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateTacticalMapItemArgs,
      "mapId" | "layerId" | "item"
    >
  >;
  removeTacticalMapItem?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveTacticalMapItemArgs,
      "mapId" | "layerId" | "itemId"
    >
  >;
  addTacticalMapPath?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTacticalMapPathArgs, "mapId" | "layerId" | "path">
  >;
  updateTacticalMapPath?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateTacticalMapPathArgs,
      "mapId" | "layerId" | "path"
    >
  >;
  removeTacticalMapPath?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveTacticalMapPathArgs,
      "mapId" | "layerId" | "pathId"
    >
  >;
  showViewscreenTactical?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationShowViewscreenTacticalArgs, "mapId">
  >;
  addTacticalMapsToFlight?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTacticalMapsToFlightArgs, "mapIds">
  >;
  createTargetingContact?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateTargetingContactArgs, "id" | "targetClass">
  >;
  targetTargetingContact?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTargetTargetingContactArgs, "id" | "targetId">
  >;
  untargetTargetingContact?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUntargetTargetingContactArgs, "id" | "targetId">
  >;
  targetSystem?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTargetSystemArgs, "id" | "targetId" | "system">
  >;
  removeTarget?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveTargetArgs, "id" | "targetId">
  >;
  addTargetClass?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTargetClassArgs, "id" | "classInput">
  >;
  removeTargetClass?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveTargetClassArgs, "id" | "classId">
  >;
  updateTargetClass?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTargetClassArgs, "id" | "classInput">
  >;
  setTargetClassCount?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTargetClassCountArgs, "id" | "classId" | "count">
  >;
  setCoordinateTargeting?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetCoordinateTargetingArgs, "id" | "which">
  >;
  setTargetingCalculatedTarget?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTargetingCalculatedTargetArgs, never>
  >;
  setTargetingEnteredTarget?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTargetingEnteredTargetArgs, "id">
  >;
  clearAllTargetingContacts?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClearAllTargetingContactsArgs, "id">
  >;
  setTargetingRange?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTargetingRangeArgs, "id" | "range">
  >;
  setTargetingClasses?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTargetingClassesArgs, "id" | "classInput">
  >;
  generateTaskReport?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationGenerateTaskReportArgs, "simulatorId" | "type">
  >;
  clearTaskReport?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClearTaskReportArgs, "id">
  >;
  completeTaskReport?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCompleteTaskReportArgs, "id">
  >;
  verifyTaskReportStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationVerifyTaskReportStepArgs, "id" | "stepId">
  >;
  assignTaskReportStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAssignTaskReportStepArgs, "id" | "stepId">
  >;
  requestVerifyTaskReportStep?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRequestVerifyTaskReportStepArgs, "id" | "stepId">
  >;
  addTask?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTaskArgs, "taskInput">
  >;
  verifyTask?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationVerifyTaskArgs, "taskId">
  >;
  requestTaskVerify?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRequestTaskVerifyArgs, "id">
  >;
  denyTaskVerify?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDenyTaskVerifyArgs, "id">
  >;
  dismissVerifiedTasks?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDismissVerifiedTasksArgs, "simulatorId">
  >;
  addTaskTemplate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTaskTemplateArgs, "definition">
  >;
  removeTaskTemplate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveTaskTemplateArgs, "id">
  >;
  renameTaskTemplate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRenameTaskTemplateArgs, "id" | "name">
  >;
  setTaskTemplateValues?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTaskTemplateValuesArgs, "id" | "values">
  >;
  setTaskTemplateReportTypes?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTaskTemplateReportTypesArgs, "id" | "reportTypes">
  >;
  setTaskTemplateMacros?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTaskTemplateMacrosArgs, "id" | "macros">
  >;
  setTaskTemplatePreMacros?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTaskTemplatePreMacrosArgs, "id" | "macros">
  >;
  createTeam?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateTeamArgs, "team">
  >;
  updateTeam?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTeamArgs, "team">
  >;
  addCrewToTeam?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddCrewToTeamArgs, "teamId" | "crewId">
  >;
  removeCrewFromTeam?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCrewFromTeamArgs, "teamId" | "crewId">
  >;
  removeTeam?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveTeamArgs, "teamId">
  >;
  _template?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  setTrackingPreference?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTrackingPreferenceArgs, "pref">
  >;
  importTaskTemplates?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  setSpaceEdventuresToken?: Resolver<
    Maybe<ResolversTypes["SpaceEdventuresCenter"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetSpaceEdventuresTokenArgs, "token">
  >;
  assignSpaceEdventuresBadge?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAssignSpaceEdventuresBadgeArgs, "badgeId">
  >;
  assignSpaceEdventuresMission?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAssignSpaceEdventuresMissionArgs, "badgeId">
  >;
  assignSpaceEdventuresFlightType?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAssignSpaceEdventuresFlightTypeArgs,
      "flightId" | "flightType"
    >
  >;
  assignSpaceEdventuresFlightRecord?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAssignSpaceEdventuresFlightRecordArgs, "flightId">
  >;
  getSpaceEdventuresLogin?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationGetSpaceEdventuresLoginArgs, "token">
  >;
  removeSpaceEdventuresClient?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveSpaceEdventuresClientArgs,
      "flightId" | "clientId"
    >
  >;
  generic?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationGenericArgs, "simulatorId" | "key">
  >;
  clockSync?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClockSyncArgs, "clientId">
  >;
  addIssue?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAddIssueArgs,
      "title" | "body" | "person" | "priority" | "type"
    >
  >;
  addIssueUpload?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddIssueUploadArgs, "data" | "filename" | "ext">
  >;
  rotationUpdate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRotationUpdateArgs, "id">
  >;
  rotationSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRotationSetArgs, "id">
  >;
  requiredRotationSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRequiredRotationSetArgs, "id">
  >;
  directionUpdate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDirectionUpdateArgs, "id">
  >;
  positionUpdate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  setThrusterRotationSpeed?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetThrusterRotationSpeedArgs, "id" | "speed">
  >;
  setThrusterMovementSpeed?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetThrusterMovementSpeedArgs, "id">
  >;
  chargeThx?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChargeThxArgs, "id" | "clientId" | "charge">
  >;
  lockThx?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLockThxArgs, "id" | "clientId">
  >;
  activateThx?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationActivateThxArgs, "id">
  >;
  deactivateThx?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeactivateThxArgs, "id">
  >;
  resetThx?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationResetThxArgs, "id">
  >;
  torpedoAddWarhead?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTorpedoAddWarheadArgs, "id" | "warhead">
  >;
  torpedoRemoveWarhead?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTorpedoRemoveWarheadArgs, "id" | "warheadId">
  >;
  torpedoLoadWarhead?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTorpedoLoadWarheadArgs, "id" | "warheadId">
  >;
  torpedoSetWarheadCount?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationTorpedoSetWarheadCountArgs,
      "id" | "warheadType" | "count"
    >
  >;
  torpedoUnload?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTorpedoUnloadArgs, "id">
  >;
  torpedoFire?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationTorpedoFireArgs, "id">
  >;
  setTractorBeamState?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTractorBeamStateArgs, "id" | "state">
  >;
  setTractorBeamTarget?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTractorBeamTargetArgs, "id" | "target">
  >;
  setTractorBeamStrength?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTractorBeamStrengthArgs, "id" | "strength">
  >;
  setTractorBeamStress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTractorBeamStressArgs, "id" | "stress">
  >;
  setTractorBeamScanning?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTractorBeamScanningArgs, "id" | "scanning">
  >;
  setTractorBeamTargetLabel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTractorBeamTargetLabelArgs, "id" | "label">
  >;
  addTractorTarget?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTractorTargetArgs, "id">
  >;
  removeTractorTarget?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveTractorTargetArgs, "id">
  >;
  setTransportDestination?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetTransportDestinationArgs,
      "transporter" | "destination"
    >
  >;
  setTransportTarget?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTransportTargetArgs, "transporter" | "target">
  >;
  beginTransportScan?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationBeginTransportScanArgs, "transporter">
  >;
  cancelTransportScan?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCancelTransportScanArgs, "transporter">
  >;
  clearTransportTargets?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationClearTransportTargetsArgs, "transporter">
  >;
  setTransportCharge?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTransportChargeArgs, "transporter" | "charge">
  >;
  completeTransport?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCompleteTransportArgs, "transporter" | "target">
  >;
  setTransporterTargets?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTransporterTargetsArgs, "transporter" | "targets">
  >;
  setTransporterChargeSpeed?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTransporterChargeSpeedArgs, "id" | "chargeSpeed">
  >;
  setTranswarpActive?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetTranswarpActiveArgs, "id" | "active">
  >;
  fluxTranswarp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFluxTranswarpArgs, "id">
  >;
  normalTranswarp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNormalTranswarpArgs, "id">
  >;
  setTranswarpSectorValue?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetTranswarpSectorValueArgs,
      "id" | "quad" | "field" | "value"
    >
  >;
  addTrigger?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTriggerArgs, "name">
  >;
  renameTrigger?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRenameTriggerArgs, "id" | "name">
  >;
  removeTrigger?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveTriggerArgs, "id">
  >;
  updateTrigger?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTriggerArgs, "id">
  >;
  addTriggerToSimulator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTriggerToSimulatorArgs, "simulatorId" | "trigger">
  >;
  removeTriggerFromSimulator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveTriggerFromSimulatorArgs,
      "simulatorId" | "trigger"
    >
  >;
  updateViewscreenName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateViewscreenNameArgs, "id" | "name">
  >;
  updateViewscreenSecondary?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateViewscreenSecondaryArgs, "id" | "secondary">
  >;
  updateViewscreenComponent?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateViewscreenComponentArgs, "component">
  >;
  updateViewscreenData?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateViewscreenDataArgs, "id" | "data">
  >;
  setViewscreenToAuto?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetViewscreenToAutoArgs, never>
  >;
  setViewscreenPictureInPicture?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetViewscreenPictureInPictureArgs, "component">
  >;
  removeViewscreenPictureInPicture?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveViewscreenPictureInPictureArgs, never>
  >;
  updateViewscreenAuto?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateViewscreenAutoArgs, "id" | "auto">
  >;
  toggleViewscreenVideo?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationToggleViewscreenVideoArgs, never>
  >;
  countermeasuresCreateCountermeasure?: Resolver<
    Maybe<ResolversTypes["Countermeasure"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCountermeasuresCreateCountermeasureArgs,
      "id" | "slot" | "name"
    >
  >;
  countermeasuresRemoveCountermeasure?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCountermeasuresRemoveCountermeasureArgs,
      "id" | "slot"
    >
  >;
  countermeasuresLaunchCountermeasure?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCountermeasuresLaunchCountermeasureArgs,
      "id" | "slot"
    >
  >;
  countermeasuresActivateCountermeasure?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCountermeasuresActivateCountermeasureArgs,
      "id" | "slot"
    >
  >;
  countermeasuresDeactivateCountermeasure?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCountermeasuresDeactivateCountermeasureArgs,
      "id" | "slot"
    >
  >;
  countermeasuresLaunchUnlockedCountermeasures?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCountermeasuresLaunchUnlockedCountermeasuresArgs,
      "id"
    >
  >;
  countermeasuresBuildCountermeasure?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCountermeasuresBuildCountermeasureArgs, "id" | "slot">
  >;
  countermeasuresAddModule?: Resolver<
    Maybe<ResolversTypes["Countermeasure"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCountermeasuresAddModuleArgs,
      "id" | "slot" | "moduleType"
    >
  >;
  countermeasuresRemoveModule?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCountermeasuresRemoveModuleArgs,
      "id" | "slot" | "moduleId"
    >
  >;
  countermeasuresConfigureModule?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCountermeasuresConfigureModuleArgs,
      "id" | "slot" | "moduleId" | "config"
    >
  >;
  countermeasuresSetResource?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCountermeasuresSetResourceArgs,
      "id" | "resource" | "value"
    >
  >;
  countermeasuresSetFDNote?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCountermeasuresSetFdNoteArgs,
      "id" | "countermeasureId" | "note"
    >
  >;
  entityCreate?: Resolver<
    ResolversTypes["Entity"],
    ParentType,
    ContextType,
    RequireFields<MutationEntityCreateArgs, "flightId">
  >;
  entityRemove?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationEntityRemoveArgs, "id">
  >;
  flightSetBaseUniverse?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFlightSetBaseUniverseArgs, never>
  >;
  dmxDeviceCreate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxDeviceCreateArgs, "name">
  >;
  dmxDeviceRemove?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxDeviceRemoveArgs, "id">
  >;
  dmxDeviceSetName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxDeviceSetNameArgs, "id" | "name">
  >;
  dmxDeviceSetChannels?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxDeviceSetChannelsArgs, "id" | "channels">
  >;
  dmxSetCreate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxSetCreateArgs, "name">
  >;
  dmxSetRemove?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxSetRemoveArgs, "id">
  >;
  dmxSetDuplicate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxSetDuplicateArgs, "id" | "name">
  >;
  dmxSetSetName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxSetSetNameArgs, "id" | "name">
  >;
  dmxFixtureCreate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationDmxFixtureCreateArgs,
      "DMXSetId" | "name" | "DMXDeviceId"
    >
  >;
  dmxFixtureRemove?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxFixtureRemoveArgs, "DMXSetId" | "id">
  >;
  dmxFixtureSetName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxFixtureSetNameArgs, "id" | "name">
  >;
  dmxFixtureSetDMXDevice?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxFixtureSetDmxDeviceArgs, "id" | "DMXDeviceID">
  >;
  dmxFixtureSetChannel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxFixtureSetChannelArgs, "id" | "channel">
  >;
  dmxFixtureSetMode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxFixtureSetModeArgs, "mode">
  >;
  dmxFixtureSetActive?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxFixtureSetActiveArgs, never>
  >;
  dmxFixtureSetTags?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxFixtureSetTagsArgs, "newTags">
  >;
  dmxFixtureAddTag?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxFixtureAddTagArgs, "newTag">
  >;
  dmxFixtureRemoveTag?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxFixtureRemoveTagArgs, "removeTag">
  >;
  dmxFixtureSetPassiveChannels?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxFixtureSetPassiveChannelsArgs, "passiveChannels">
  >;
  dmxConfigCreate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxConfigCreateArgs, "name">
  >;
  dmxConfigRemove?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxConfigRemoveArgs, "id">
  >;
  dmxConfigDuplicate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxConfigDuplicateArgs, "id" | "name">
  >;
  dmxConfigSetName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxConfigSetNameArgs, "id" | "name">
  >;
  dmxConfigSetConfig?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDmxConfigSetConfigArgs, "id" | "config">
  >;
  dmxConfigSetActionStrength?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationDmxConfigSetActionStrengthArgs,
      "id" | "actionStrength"
    >
  >;
}>;

export type NamedObjectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["NamedObject"] = ResolversParentTypes["NamedObject"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NavigationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Navigation"] = ResolversParentTypes["Navigation"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  calculate?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  currentCourse?: Resolver<
    Maybe<ResolversTypes["NavLoc"]>,
    ParentType,
    ContextType
  >;
  calculatedCourse?: Resolver<
    Maybe<ResolversTypes["NavLoc"]>,
    ParentType,
    ContextType
  >;
  destination?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  scanning?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  destinations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  presets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["NavPreset"]>>>,
    ParentType,
    ContextType
  >;
  thrusters?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NavLocResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["NavLoc"] = ResolversParentTypes["NavLoc"]
> = ResolversObject<{
  x?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  y?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  z?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NavPresetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["NavPreset"] = ResolversParentTypes["NavPreset"]
> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  course?: Resolver<Maybe<ResolversTypes["NavLoc"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NotificationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Notification"] = ResolversParentTypes["Notification"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  trigger?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  relevantCards?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ObjectiveResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Objective"] = ResolversParentTypes["Objective"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  timestamp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  station?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  completed?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  cancelled?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  crewComplete?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PainPointResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PainPoint"] = ResolversParentTypes["PainPoint"]
> = ResolversObject<{
  x?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  y?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PanelCableResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PanelCable"] = ResolversParentTypes["PanelCable"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  components?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ID"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PanelComponentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PanelComponent"] = ResolversParentTypes["PanelComponent"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  component?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  level?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  x?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  y?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  scale?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PanelConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PanelConnection"] = ResolversParentTypes["PanelConnection"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PhaserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Phaser"] = ResolversParentTypes["Phaser"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  arc?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  coolant?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  beams?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["PhaserBeam"]>>>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  holdToCharge?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  chargeSpeed?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PhaserBeamResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PhaserBeam"] = ResolversParentTypes["PhaserBeam"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  charge?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  heat?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PowerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Power"] = ResolversParentTypes["Power"]
> = ResolversObject<{
  power?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  powerLevels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  defaultLevel?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PresetAnswerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PresetAnswer"] = ResolversParentTypes["PresetAnswer"]
> = ResolversObject<{
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  value?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ProbeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Probe"] = ResolversParentTypes["Probe"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  launched?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  equipment?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ProbeEquipment"]>>>,
    ParentType,
    ContextType
  >;
  engine?: Resolver<Maybe<ResolversTypes["Engine"]>, ParentType, ContextType>;
  phaser?: Resolver<Maybe<ResolversTypes["Phaser"]>, ParentType, ContextType>;
  navigation?: Resolver<
    Maybe<ResolversTypes["Navigation"]>,
    ParentType,
    ContextType
  >;
  query?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  querying?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  response?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  charge?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  history?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["History"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ProbeEquipmentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ProbeEquipment"] = ResolversParentTypes["ProbeEquipment"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  availableProbes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ProbesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Probes"] = ResolversParentTypes["Probes"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  torpedo?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  processedData?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  probes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Probe"]>>>,
    ParentType,
    ContextType,
    RequireFields<ProbesProbesArgs, never>
  >;
  equipment?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ProbeEquipment"]>>>,
    ParentType,
    ContextType
  >;
  types?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ProbeType"]>>>,
    ParentType,
    ContextType
  >;
  scienceTypes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ScienceType"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ProbeTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ProbeType"] = ResolversParentTypes["ProbeType"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  size?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  availableEquipment?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ProbeEquipment"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ProcessedDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ProcessedData"] = ResolversParentTypes["ProcessedData"]
> = ResolversObject<{
  value?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  time?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type QuaternionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Quaternion"] = ResolversParentTypes["Quaternion"]
> = ResolversObject<{
  x?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  y?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  z?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  w?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  actions?: Resolver<
    Maybe<ResolversTypes["Action"]>,
    ParentType,
    ContextType,
    RequireFields<QueryActionsArgs, never>
  >;
  asset?: Resolver<
    Maybe<ResolversTypes["Asset"]>,
    ParentType,
    ContextType,
    RequireFields<QueryAssetArgs, "assetKey">
  >;
  assets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Asset"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryAssetsArgs, "assetKeys">
  >;
  assetFolders?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AssetFolder"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryAssetFoldersArgs, never>
  >;
  clients?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Client"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryClientsArgs, never>
  >;
  keypad?: Resolver<
    Maybe<ResolversTypes["Keypad"]>,
    ParentType,
    ContextType,
    RequireFields<QueryKeypadArgs, "client">
  >;
  keypads?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Keypad"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryKeypadsArgs, "simulatorId">
  >;
  scanner?: Resolver<
    Maybe<ResolversTypes["Scanner"]>,
    ParentType,
    ContextType,
    RequireFields<QueryScannerArgs, "client">
  >;
  scanners?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Scanner"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryScannersArgs, "simulatorId">
  >;
  commandLine?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CommandLine"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryCommandLineArgs, never>
  >;
  commandLineCommands?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CommandLineCommand"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryCommandLineCommandsArgs, "simulatorId">
  >;
  computerCore?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ComputerCore"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryComputerCoreArgs, never>
  >;
  oneComputerCore?: Resolver<
    Maybe<ResolversTypes["ComputerCore"]>,
    ParentType,
    ContextType,
    RequireFields<QueryOneComputerCoreArgs, "id">
  >;
  coolant?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CoolantTank"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryCoolantArgs, "simulatorId">
  >;
  systemCoolant?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SystemCoolant"]>>>,
    ParentType,
    ContextType,
    RequireFields<QuerySystemCoolantArgs, "simulatorId">
  >;
  coreFeed?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CoreFeed"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryCoreFeedArgs, never>
  >;
  coreLayouts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CoreLayout"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryCoreLayoutsArgs, never>
  >;
  crew?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Crew"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryCrewArgs, never>
  >;
  crewCount?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType,
    RequireFields<QueryCrewCountArgs, "simulatorId">
  >;
  crm?: Resolver<
    Maybe<ResolversTypes["Crm"]>,
    ParentType,
    ContextType,
    RequireFields<QueryCrmArgs, never>
  >;
  crmFighter?: Resolver<
    Maybe<ResolversTypes["CrmFighter"]>,
    ParentType,
    ContextType,
    RequireFields<QueryCrmFighterArgs, "simulatorId" | "clientId">
  >;
  decks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Deck"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryDecksArgs, "simulatorId">
  >;
  docking?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["DockingPort"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryDockingArgs, never>
  >;
  engines?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Engine"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryEnginesArgs, never>
  >;
  engine?: Resolver<
    Maybe<ResolversTypes["Engine"]>,
    ParentType,
    ContextType,
    RequireFields<QueryEngineArgs, "id">
  >;
  exocomps?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Exocomp"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryExocompsArgs, never>
  >;
  externals?: Resolver<
    Maybe<ResolversTypes["Externals"]>,
    ParentType,
    ContextType
  >;
  flights?: Resolver<
    Array<ResolversTypes["Flight"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFlightsArgs, never>
  >;
  events?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  googleSheets?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  googleSheetsGetSpreadsheet?: Resolver<
    Maybe<ResolversTypes["GoogleSpreadsheet"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGoogleSheetsGetSpreadsheetArgs, "spreadsheetId">
  >;
  interfaces?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Interface"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryInterfacesArgs, never>
  >;
  interfaceDevices?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["InterfaceDevice"]>>>,
    ParentType,
    ContextType
  >;
  internalComm?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["InternalComm"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryInternalCommArgs, "simulatorId">
  >;
  inventory?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["InventoryItem"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryInventoryArgs, never>
  >;
  isochips?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Isochip"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryIsochipsArgs, never>
  >;
  jumpDrive?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["JumpDrive"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryJumpDriveArgs, never>
  >;
  keyboard?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Keyboard"]>>>,
    ParentType,
    ContextType
  >;
  libraryEntries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["LibraryEntry"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryLibraryEntriesArgs, never>
  >;
  longRangeCommunications?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["LRCommunications"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryLongRangeCommunicationsArgs, never>
  >;
  macros?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Macro"]>>>,
    ParentType,
    ContextType
  >;
  macroButtons?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["MacroButtonConfig"]>>>,
    ParentType,
    ContextType
  >;
  messages?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Message"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryMessagesArgs, "simulatorId">
  >;
  midiSets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["MidiSet"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryMidiSetsArgs, never>
  >;
  missions?: Resolver<
    Array<ResolversTypes["Mission"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMissionsArgs, never>
  >;
  auxTimelines?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TimelineInstance"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryAuxTimelinesArgs, "simulatorId">
  >;
  motus?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Motu"]>>>,
    ParentType,
    ContextType
  >;
  motu?: Resolver<
    Maybe<ResolversTypes["Motu"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMotuArgs, "id">
  >;
  motuChannel?: Resolver<
    Maybe<ResolversTypes["MotuChannel"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMotuChannelArgs, "id" | "channelId">
  >;
  motuSend?: Resolver<
    Maybe<ResolversTypes["MotuPatch"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMotuSendArgs, "id" | "inputId" | "outputId">
  >;
  navigation?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Navigation"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryNavigationArgs, never>
  >;
  navigate?: Resolver<
    Maybe<ResolversTypes["Navigation"]>,
    ParentType,
    ContextType,
    RequireFields<QueryNavigateArgs, "id">
  >;
  objective?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Objective"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryObjectiveArgs, never>
  >;
  officerLogs?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Log"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryOfficerLogsArgs, "flightId">
  >;
  shipLogs?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Log"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryShipLogsArgs, "simulatorId">
  >;
  phasers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Phaser"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryPhasersArgs, never>
  >;
  phaser?: Resolver<
    Maybe<ResolversTypes["Phaser"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPhaserArgs, "id">
  >;
  probes?: Resolver<
    Array<ResolversTypes["Probes"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProbesArgs, "simulatorId">
  >;
  probe?: Resolver<
    Maybe<ResolversTypes["Probes"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProbeArgs, "id">
  >;
  railgun?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Railgun"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryRailgunArgs, never>
  >;
  reactors?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Reactor"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryReactorsArgs, never>
  >;
  reactor?: Resolver<
    Maybe<ResolversTypes["Reactor"]>,
    ParentType,
    ContextType,
    RequireFields<QueryReactorArgs, "id">
  >;
  recordSnippets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RecordSnippet"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryRecordSnippetsArgs, "simulatorId">
  >;
  recordTemplates?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RecordSnippet"]>>>,
    ParentType,
    ContextType
  >;
  rooms?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryRoomsArgs, never>
  >;
  sensors?: Resolver<
    Array<ResolversTypes["Sensors"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySensorsArgs, never>
  >;
  sensor?: Resolver<
    Maybe<ResolversTypes["Sensors"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySensorArgs, "id">
  >;
  sensorContacts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SensorContact"]>>>,
    ParentType,
    ContextType,
    RequireFields<QuerySensorContactsArgs, never>
  >;
  sets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Set"]>>>,
    ParentType,
    ContextType
  >;
  shields?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Shield"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryShieldsArgs, never>
  >;
  shortRangeComm?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ShortRangeComm"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryShortRangeCommArgs, "simulatorId">
  >;
  sickbay?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Sickbay"]>>>,
    ParentType,
    ContextType,
    RequireFields<QuerySickbayArgs, never>
  >;
  sickbaySingle?: Resolver<
    Maybe<ResolversTypes["Sickbay"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySickbaySingleArgs, never>
  >;
  symptoms?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  signalJammers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SignalJammer"]>>>,
    ParentType,
    ContextType,
    RequireFields<QuerySignalJammersArgs, "simulatorId">
  >;
  simulators?: Resolver<
    Array<ResolversTypes["Simulator"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySimulatorsArgs, never>
  >;
  softwarePanels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SoftwarePanel"]>>>,
    ParentType,
    ContextType,
    RequireFields<QuerySoftwarePanelsArgs, never>
  >;
  stations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["StationSet"]>>>,
    ParentType,
    ContextType
  >;
  station?: Resolver<
    Maybe<ResolversTypes["Station"]>,
    ParentType,
    ContextType,
    RequireFields<QueryStationArgs, "simulatorId" | "station">
  >;
  stealthField?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["StealthField"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryStealthFieldArgs, never>
  >;
  stealth?: Resolver<
    Maybe<ResolversTypes["StealthField"]>,
    ParentType,
    ContextType,
    RequireFields<QueryStealthArgs, "id">
  >;
  subspaceField?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubspaceField"]>>>,
    ParentType,
    ContextType,
    RequireFields<QuerySubspaceFieldArgs, never>
  >;
  surveyform?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SurveyForm"]>>>,
    ParentType,
    ContextType,
    RequireFields<QuerySurveyformArgs, never>
  >;
  systems?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["System"]>>>,
    ParentType,
    ContextType,
    RequireFields<QuerySystemsArgs, never>
  >;
  system?: Resolver<
    Maybe<ResolversTypes["System"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySystemArgs, "id">
  >;
  allSystems?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  tacticalMaps?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TacticalMap"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryTacticalMapsArgs, never>
  >;
  tacticalMap?: Resolver<
    Maybe<ResolversTypes["TacticalMap"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTacticalMapArgs, "id">
  >;
  targeting?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Targeting"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryTargetingArgs, never>
  >;
  taskReport?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TaskReport"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryTaskReportArgs, never>
  >;
  tasks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Task"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryTasksArgs, "simulatorId">
  >;
  taskTemplates?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TaskTemplate"]>>>,
    ParentType,
    ContextType
  >;
  taskDefinitions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TaskDefinition"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryTaskDefinitionsArgs, never>
  >;
  taskInstructions?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTaskInstructionsArgs, "definition" | "requiredValues">
  >;
  teams?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Team"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryTeamsArgs, never>
  >;
  damagePositions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  exocompParts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  _template?: Resolver<
    Maybe<ResolversTypes["Template"]>,
    ParentType,
    ContextType,
    RequireFields<Query_TemplateArgs, "simulatorId">
  >;
  thorium?: Resolver<Maybe<ResolversTypes["Thorium"]>, ParentType, ContextType>;
  thrusters?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Thruster"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryThrustersArgs, never>
  >;
  thruster?: Resolver<
    Maybe<ResolversTypes["Thruster"]>,
    ParentType,
    ContextType,
    RequireFields<QueryThrusterArgs, "id">
  >;
  thx?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Thx"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryThxArgs, never>
  >;
  torpedos?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Torpedo"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryTorpedosArgs, never>
  >;
  torpedo?: Resolver<
    Maybe<ResolversTypes["Torpedo"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTorpedoArgs, "id">
  >;
  tractorBeam?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TractorBeam"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryTractorBeamArgs, never>
  >;
  transporters?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Transporter"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryTransportersArgs, never>
  >;
  transwarp?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Transwarp"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryTranswarpArgs, never>
  >;
  triggers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Trigger"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryTriggersArgs, never>
  >;
  viewscreens?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Viewscreen"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryViewscreensArgs, never>
  >;
  countermeasures?: Resolver<
    Maybe<ResolversTypes["Countermeasures"]>,
    ParentType,
    ContextType,
    RequireFields<QueryCountermeasuresArgs, "simulatorId">
  >;
  countermeasureModuleType?: Resolver<
    Array<ResolversTypes["CountermeasureModule"]>,
    ParentType,
    ContextType
  >;
  entity?: Resolver<
    Maybe<ResolversTypes["Entity"]>,
    ParentType,
    ContextType,
    RequireFields<QueryEntityArgs, "id">
  >;
  entities?: Resolver<
    Array<Maybe<ResolversTypes["Entity"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryEntitiesArgs, "flightId">
  >;
  dmxDevices?: Resolver<
    Array<ResolversTypes["DMXDevice"]>,
    ParentType,
    ContextType
  >;
  dmxSets?: Resolver<Array<ResolversTypes["DMXSet"]>, ParentType, ContextType>;
  dmxFixtures?: Resolver<
    Array<ResolversTypes["DMXFixture"]>,
    ParentType,
    ContextType,
    RequireFields<QueryDmxFixturesArgs, never>
  >;
  dmxConfig?: Resolver<
    Maybe<ResolversTypes["DMXConfig"]>,
    ParentType,
    ContextType,
    RequireFields<QueryDmxConfigArgs, "id">
  >;
  dmxConfigs?: Resolver<
    Array<ResolversTypes["DMXConfig"]>,
    ParentType,
    ContextType
  >;
}>;

export type RailgunResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Railgun"] = ResolversParentTypes["Railgun"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  heat?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  coolant?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  availableAmmo?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  maxAmmo?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  ammo?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ReactorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Reactor"] = ResolversParentTypes["Reactor"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  heat?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  heatRate?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  coolant?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  model?: Resolver<
    Maybe<ResolversTypes["REACTOR_MODELS"]>,
    ParentType,
    ContextType
  >;
  ejected?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  externalPower?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  powerOutput?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  efficiency?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  efficiencies?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ReactorEfficiency"]>>>,
    ParentType,
    ContextType
  >;
  batteryChargeLevel?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  batteryChargeRate?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  depletion?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  alphaLevel?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  betaLevel?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  alphaTarget?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  betaTarget?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  dilithiumRate?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  requireBalance?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ReactorEfficiencyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ReactorEfficiency"] = ResolversParentTypes["ReactorEfficiency"]
> = ResolversObject<{
  label?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  efficiency?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type RecordEntryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RecordEntry"] = ResolversParentTypes["RecordEntry"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  contents?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  original?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  timestamp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  category?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  modified?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type RecordSnippetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RecordSnippet"] = ResolversParentTypes["RecordSnippet"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  sensorContactId?: Resolver<
    Maybe<ResolversTypes["ID"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<
    Maybe<ResolversTypes["RecordSnippetType"]>,
    ParentType,
    ContextType
  >;
  visible?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  launched?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  records?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RecordEntry"]>>>,
    ParentType,
    ContextType
  >;
  templateRecords?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RecordEntry"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type RemoteAccessCodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RemoteAccessCode"] = ResolversParentTypes["RemoteAccessCode"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  station?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  timestamp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type RoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Room"] = ResolversParentTypes["Room"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  deck?: Resolver<Maybe<ResolversTypes["Deck"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  roles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RoomRoles"]>>>,
    ParentType,
    ContextType
  >;
  gas?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  svgPath?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  inventory?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["InventoryItem"]>>>,
    ParentType,
    ContextType
  >;
  systems?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["System"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type RoomCountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RoomCount"] = ResolversParentTypes["RoomCount"]
> = ResolversObject<{
  room?: Resolver<Maybe<ResolversTypes["Room"]>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type RotationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Rotation"] = ResolversParentTypes["Rotation"]
> = ResolversObject<{
  yaw?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  pitch?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  roll?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ScannerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Scanner"] = ResolversParentTypes["Scanner"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  scanRequest?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  scanResults?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  scanning?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ScienceProbeEventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ScienceProbeEvent"] = ResolversParentTypes["ScienceProbeEvent"]
> = ResolversObject<{
  simulatorId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  charge?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ScienceTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ScienceType"] = ResolversParentTypes["ScienceType"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<
    Maybe<ResolversTypes["SCIENCE_BURST_DETECTOR"]>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  equipment?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SensorContactResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SensorContact"] = ResolversParentTypes["SensorContact"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  rotation?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  speed?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  location?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  destination?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  position?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  startTime?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  movementTime?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  infrared?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  cloaked?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  destroyed?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  forceUpdate?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  targeted?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  selected?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  locked?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  disabled?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  hostile?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  hitpoints?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  autoFire?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  particle?: Resolver<
    Maybe<ResolversTypes["ParticleTypes"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SensorsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Sensors"] = ResolversParentTypes["Sensors"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  domain?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  pings?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  timeSincePing?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  pingMode?: Resolver<
    Maybe<ResolversTypes["PING_MODES"]>,
    ParentType,
    ContextType
  >;
  scanResults?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  scanRequest?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  processedData?: Resolver<
    Maybe<Array<ResolversTypes["ProcessedData"]>>,
    ParentType,
    ContextType
  >;
  presetAnswers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["PresetAnswer"]>>>,
    ParentType,
    ContextType
  >;
  scanning?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  contacts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SensorContact"]>>>,
    ParentType,
    ContextType
  >;
  armyContacts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SensorContact"]>>>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  scans?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SensorScan"]>>>,
    ParentType,
    ContextType
  >;
  history?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  autoTarget?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  frozen?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  autoThrusters?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  interference?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  movement?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  segments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SensorsSegment"]>>>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  defaultHitpoints?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  defaultSpeed?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  missPercent?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SensorScanResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SensorScan"] = ResolversParentTypes["SensorScan"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  timestamp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  mode?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  request?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  response?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  scanning?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  cancelled?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SensorsSegmentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SensorsSegment"] = ResolversParentTypes["SensorsSegment"]
> = ResolversObject<{
  ring?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  line?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Set"] = ResolversParentTypes["Set"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  clients?: Resolver<
    Array<ResolversTypes["SetClient"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SetClientResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SetClient"] = ResolversParentTypes["SetClient"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  client?: Resolver<Maybe<ResolversTypes["Client"]>, ParentType, ContextType>;
  simulator?: Resolver<
    Maybe<ResolversTypes["Simulator"]>,
    ParentType,
    ContextType
  >;
  stationSet?: Resolver<
    Maybe<ResolversTypes["StationSet"]>,
    ParentType,
    ContextType
  >;
  station?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  secondary?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  soundPlayer?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ShieldResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Shield"] = ResolversParentTypes["Shield"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  heat?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  coolant?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  frequency?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  integrity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ShipResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Ship"] = ResolversParentTypes["Ship"]
> = ResolversObject<{
  clamps?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  ramps?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  airlock?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  legs?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  bridgeCrew?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  extraPeople?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  radiation?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  velocity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  remoteAccessCodes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RemoteAccessCode"]>>>,
    ParentType,
    ContextType
  >;
  selfDestructTime?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  selfDestructCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  selfDestructAuto?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  inventoryLogs?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["InventoryLog"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ShortRangeCommResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ShortRangeComm"] = ResolversParentTypes["ShortRangeComm"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  heat?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  coolant?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  frequency?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  amplitude?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  arrows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CommArrow"]>>>,
    ParentType,
    ContextType
  >;
  signals?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CommSignal"]>>>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ShortRangeCommExtendedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ShortRangeCommExtended"] = ResolversParentTypes["ShortRangeCommExtended"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  frequency?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  amplitude?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  arrows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CommArrow"]>>>,
    ParentType,
    ContextType
  >;
  signals?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CommSignal"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SickbayResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Sickbay"] = ResolversParentTypes["Sickbay"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  deconProgram?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  deconLocation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  deconActive?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  deconOffset?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  autoFinishDecon?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  sickbayRoster?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Crew"]>>>,
    ParentType,
    ContextType
  >;
  bunks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SickbayBunk"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SickbayBunkResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SickbayBunk"] = ResolversParentTypes["SickbayBunk"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  sickbayId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  scanRequest?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  scanResults?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  scanning?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  patient?: Resolver<Maybe<ResolversTypes["Crew"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SignalResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Signal"] = ResolversParentTypes["Signal"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SignalJammerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SignalJammer"] = ResolversParentTypes["SignalJammer"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  addsSensorsInterference?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  active?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  strength?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  signals?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Signal"]>>>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SimulatorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Simulator"] = ResolversParentTypes["Simulator"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  alertlevel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  alertLevelLock?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  layout?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  caps?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  template?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  templateId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  systems?: Resolver<
    Maybe<Array<ResolversTypes["System"]>>,
    ParentType,
    ContextType
  >;
  stations?: Resolver<
    Maybe<Array<ResolversTypes["Station"]>>,
    ParentType,
    ContextType
  >;
  mission?: Resolver<Maybe<ResolversTypes["Mission"]>, ParentType, ContextType>;
  missionConfigs?: Resolver<
    Maybe<ResolversTypes["JSON"]>,
    ParentType,
    ContextType
  >;
  currentTimelineStep?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  executedTimelineSteps?: Resolver<
    Maybe<Array<ResolversTypes["ID"]>>,
    ParentType,
    ContextType
  >;
  timelines?: Resolver<
    Maybe<Array<ResolversTypes["TimelineInstance"]>>,
    ParentType,
    ContextType
  >;
  decks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Deck"]>>>,
    ParentType,
    ContextType
  >;
  rooms?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  ship?: Resolver<Maybe<ResolversTypes["Ship"]>, ParentType, ContextType>;
  stepDamage?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  verifyStep?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  requiredDamageSteps?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["DamageStep"]>>>,
    ParentType,
    ContextType
  >;
  optionalDamageSteps?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["DamageStep"]>>>,
    ParentType,
    ContextType
  >;
  exocomps?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  training?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  panels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ID"]>>>,
    ParentType,
    ContextType
  >;
  commandLines?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ID"]>>>,
    ParentType,
    ContextType
  >;
  triggers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ID"]>>>,
    ParentType,
    ContextType
  >;
  triggersPaused?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  interfaces?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ID"]>>>,
    ParentType,
    ContextType
  >;
  midiSets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ID"]>>>,
    ParentType,
    ContextType
  >;
  bridgeOfficerMessaging?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  hasPrinter?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  hasLegs?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  spaceEdventuresId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  flipped?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  capabilities?: Resolver<
    Maybe<ResolversTypes["SimulatorCapabilities"]>,
    ParentType,
    ContextType
  >;
  ambiance?: Resolver<
    Maybe<Array<ResolversTypes["Ambiance"]>>,
    ParentType,
    ContextType
  >;
  assets?: Resolver<
    Maybe<ResolversTypes["SimulatorAssets"]>,
    ParentType,
    ContextType
  >;
  soundEffects?: Resolver<
    Maybe<ResolversTypes["JSON"]>,
    ParentType,
    ContextType
  >;
  damageTasks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["DamageTask"]>>>,
    ParentType,
    ContextType
  >;
  lighting?: Resolver<
    Maybe<ResolversTypes["Lighting"]>,
    ParentType,
    ContextType
  >;
  stationSets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["StationSet"]>>>,
    ParentType,
    ContextType
  >;
  stationSet?: Resolver<
    Maybe<ResolversTypes["StationSet"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SimulatorAssetsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SimulatorAssets"] = ResolversParentTypes["SimulatorAssets"]
> = ResolversObject<{
  mesh?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  texture?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  side?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  top?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  bridge?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SimulatorCapabilitiesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SimulatorCapabilities"] = ResolversParentTypes["SimulatorCapabilities"]
> = ResolversObject<{
  systems?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  cards?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  spaceEdventures?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  docking?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SoftwarePanelResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SoftwarePanel"] = ResolversParentTypes["SoftwarePanel"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  cables?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["PanelCable"]>>>,
    ParentType,
    ContextType
  >;
  components?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["PanelComponent"]>>>,
    ParentType,
    ContextType
  >;
  connections?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["PanelConnection"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SoundResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Sound"] = ResolversParentTypes["Sound"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  clients?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  asset?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  playbackRate?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  channel?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  looping?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SpaceEdventuresCenterResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SpaceEdventuresCenter"] = ResolversParentTypes["SpaceEdventuresCenter"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  simulators?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["NamedObject"]>>>,
    ParentType,
    ContextType
  >;
  missions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["NamedObject"]>>>,
    ParentType,
    ContextType
  >;
  badges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["NamedObject"]>>>,
    ParentType,
    ContextType
  >;
  flightTypes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FlightType"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SpaceEdventuresClientResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SpaceEdventuresClient"] = ResolversParentTypes["SpaceEdventuresClient"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SpeedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Speed"] = ResolversParentTypes["Speed"]
> = ResolversObject<{
  text?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  velocity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  optimal?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type StageChildComponentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StageChildComponent"] = ResolversParentTypes["StageChildComponent"]
> = ResolversObject<{
  parentId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes["Entity"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type StageComponentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StageComponent"] = ResolversParentTypes["StageComponent"]
> = ResolversObject<{
  scaleLabel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  scaleLabelShort?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  skyboxKey?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  childrenAsSprites?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type StationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Station"] = ResolversParentTypes["Station"]
> = ResolversObject<{
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  training?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  login?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  executive?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  messageGroups?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  layout?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  widgets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  cards?: Resolver<
    Array<ResolversTypes["Card"]>,
    ParentType,
    ContextType,
    RequireFields<StationCardsArgs, never>
  >;
  ambiance?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type StationSetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StationSet"] = ResolversParentTypes["StationSet"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  simulator?: Resolver<
    Maybe<ResolversTypes["Simulator"]>,
    ParentType,
    ContextType
  >;
  crewCount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  stations?: Resolver<
    Array<ResolversTypes["Station"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type StealthFieldResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StealthField"] = ResolversParentTypes["StealthField"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  activated?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  charge?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  changeAlert?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  state?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  quadrants?: Resolver<
    Maybe<ResolversTypes["StealthQuad"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type StealthQuadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StealthQuad"] = ResolversParentTypes["StealthQuad"]
> = ResolversObject<{
  fore?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  aft?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  port?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  starboard?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type StringCoordinatesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StringCoordinates"] = ResolversParentTypes["StringCoordinates"]
> = ResolversObject<{
  x?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  y?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  z?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = ResolversObject<{
  _empty?: SubscriptionResolver<
    Maybe<ResolversTypes["String"]>,
    "_empty",
    ParentType,
    ContextType
  >;
  actionsUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["Action"]>,
    "actionsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionActionsUpdateArgs, "simulatorId">
  >;
  assetFolderChange?: SubscriptionResolver<
    Array<ResolversTypes["AssetFolder"]>,
    "assetFolderChange",
    ParentType,
    ContextType
  >;
  clientChanged?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Client"]>>>,
    "clientChanged",
    ParentType,
    ContextType,
    RequireFields<SubscriptionClientChangedArgs, never>
  >;
  clientPing?: SubscriptionResolver<
    Maybe<ResolversTypes["Boolean"]>,
    "clientPing",
    ParentType,
    ContextType,
    RequireFields<SubscriptionClientPingArgs, "clientId">
  >;
  keypadsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Keypad"]>>>,
    "keypadsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionKeypadsUpdateArgs, "simulatorId">
  >;
  keypadUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["Keypad"]>,
    "keypadUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionKeypadUpdateArgs, "client">
  >;
  scannersUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Scanner"]>>>,
    "scannersUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionScannersUpdateArgs, "simulatorId">
  >;
  scannerUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["Scanner"]>,
    "scannerUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionScannerUpdateArgs, "client">
  >;
  commandLineOutputUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["String"]>,
    "commandLineOutputUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCommandLineOutputUpdateArgs, "clientId">
  >;
  commandLinesOutputUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Client"]>>>,
    "commandLinesOutputUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCommandLinesOutputUpdateArgs, "simulatorId">
  >;
  clearCache?: SubscriptionResolver<
    Maybe<ResolversTypes["Boolean"]>,
    "clearCache",
    ParentType,
    ContextType,
    RequireFields<SubscriptionClearCacheArgs, never>
  >;
  soundSub?: SubscriptionResolver<
    Maybe<ResolversTypes["Sound"]>,
    "soundSub",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSoundSubArgs, never>
  >;
  cancelSound?: SubscriptionResolver<
    Maybe<ResolversTypes["ID"]>,
    "cancelSound",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCancelSoundArgs, never>
  >;
  cancelAllSounds?: SubscriptionResolver<
    Maybe<ResolversTypes["Boolean"]>,
    "cancelAllSounds",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCancelAllSoundsArgs, never>
  >;
  cancelLoopingSounds?: SubscriptionResolver<
    Maybe<ResolversTypes["Boolean"]>,
    "cancelLoopingSounds",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCancelLoopingSoundsArgs, never>
  >;
  commandLineUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["CommandLine"]>>>,
    "commandLineUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCommandLineUpdateArgs, never>
  >;
  computerCoreUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["ComputerCore"]>>>,
    "computerCoreUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionComputerCoreUpdateArgs, never>
  >;
  coolantUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["CoolantTank"]>>>,
    "coolantUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCoolantUpdateArgs, "simulatorId">
  >;
  coolantSystemUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["SystemCoolant"]>>>,
    "coolantSystemUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCoolantSystemUpdateArgs, "simulatorId">
  >;
  coreFeedUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["CoreFeed"]>>>,
    "coreFeedUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCoreFeedUpdateArgs, never>
  >;
  syncTime?: SubscriptionResolver<
    Maybe<ResolversTypes["Timer"]>,
    "syncTime",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSyncTimeArgs, "simulatorId">
  >;
  coreLayoutChange?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["CoreLayout"]>>>,
    "coreLayoutChange",
    ParentType,
    ContextType
  >;
  crewUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Crew"]>>>,
    "crewUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCrewUpdateArgs, never>
  >;
  crewCountUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["Int"]>,
    "crewCountUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCrewCountUpdateArgs, never>
  >;
  crmUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["Crm"]>,
    "crmUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCrmUpdateArgs, never>
  >;
  crmMovementUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["Crm"]>,
    "crmMovementUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCrmMovementUpdateArgs, "simulatorId">
  >;
  crmFighterUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["CrmFighter"]>,
    "crmFighterUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCrmFighterUpdateArgs, "simulatorId" | "clientId">
  >;
  decksUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Deck"]>>>,
    "decksUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionDecksUpdateArgs, "simulatorId">
  >;
  dockingUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["DockingPort"]>>>,
    "dockingUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionDockingUpdateArgs, never>
  >;
  speedChange?: SubscriptionResolver<
    Maybe<ResolversTypes["Engine"]>,
    "speedChange",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSpeedChangeArgs, never>
  >;
  heatChange?: SubscriptionResolver<
    Maybe<ResolversTypes["Engine"]>,
    "heatChange",
    ParentType,
    ContextType,
    RequireFields<SubscriptionHeatChangeArgs, never>
  >;
  engineUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["Engine"]>,
    "engineUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionEngineUpdateArgs, never>
  >;
  exocompsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Exocomp"]>>>,
    "exocompsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionExocompsUpdateArgs, "simulatorId">
  >;
  flightsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Flight"]>>>,
    "flightsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionFlightsUpdateArgs, never>
  >;
  googleSheetsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["GoogleSheets"]>>>,
    "googleSheetsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionGoogleSheetsUpdateArgs, never>
  >;
  interfaceUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Interface"]>>>,
    "interfaceUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionInterfaceUpdateArgs, never>
  >;
  internalCommUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["InternalComm"]>>>,
    "internalCommUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionInternalCommUpdateArgs, never>
  >;
  inventoryUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["InventoryItem"]>>>,
    "inventoryUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionInventoryUpdateArgs, "simulatorId">
  >;
  isochipsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Isochip"]>>>,
    "isochipsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionIsochipsUpdateArgs, never>
  >;
  jumpDriveUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["JumpDrive"]>>>,
    "jumpDriveUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionJumpDriveUpdateArgs, never>
  >;
  keyboardUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Keyboard"]>>>,
    "keyboardUpdate",
    ParentType,
    ContextType
  >;
  libraryEntriesUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["LibraryEntry"]>>>,
    "libraryEntriesUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionLibraryEntriesUpdateArgs, never>
  >;
  longRangeCommunicationsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["LRCommunications"]>>>,
    "longRangeCommunicationsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionLongRangeCommunicationsUpdateArgs, never>
  >;
  macrosUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Macro"]>>>,
    "macrosUpdate",
    ParentType,
    ContextType
  >;
  macroButtonsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["MacroButtonConfig"]>>>,
    "macroButtonsUpdate",
    ParentType,
    ContextType
  >;
  messageUpdates?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Message"]>>>,
    "messageUpdates",
    ParentType,
    ContextType,
    RequireFields<SubscriptionMessageUpdatesArgs, "simulatorId">
  >;
  sendMessage?: SubscriptionResolver<
    Maybe<ResolversTypes["Message"]>,
    "sendMessage",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSendMessageArgs, "simulatorId">
  >;
  midiSets?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["MidiSet"]>>>,
    "midiSets",
    ParentType,
    ContextType,
    RequireFields<SubscriptionMidiSetsArgs, never>
  >;
  missionsUpdate?: SubscriptionResolver<
    Array<ResolversTypes["Mission"]>,
    "missionsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionMissionsUpdateArgs, never>
  >;
  auxTimelinesUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["TimelineInstance"]>>>,
    "auxTimelinesUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionAuxTimelinesUpdateArgs, "simulatorId">
  >;
  motus?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Motu"]>>>,
    "motus",
    ParentType,
    ContextType
  >;
  motu?: SubscriptionResolver<
    Maybe<ResolversTypes["Motu"]>,
    "motu",
    ParentType,
    ContextType,
    RequireFields<SubscriptionMotuArgs, "id">
  >;
  motuChannel?: SubscriptionResolver<
    Maybe<ResolversTypes["MotuChannel"]>,
    "motuChannel",
    ParentType,
    ContextType,
    RequireFields<SubscriptionMotuChannelArgs, "id" | "channelId">
  >;
  motuSend?: SubscriptionResolver<
    Maybe<ResolversTypes["MotuPatch"]>,
    "motuSend",
    ParentType,
    ContextType,
    RequireFields<SubscriptionMotuSendArgs, "id" | "inputId" | "outputId">
  >;
  navigationUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Navigation"]>>>,
    "navigationUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionNavigationUpdateArgs, never>
  >;
  objectiveUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Objective"]>>>,
    "objectiveUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionObjectiveUpdateArgs, never>
  >;
  officerLogsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Log"]>>>,
    "officerLogsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionOfficerLogsUpdateArgs, "flightId">
  >;
  shipLogsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Log"]>>>,
    "shipLogsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionShipLogsUpdateArgs, "simulatorId">
  >;
  phasersUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Phaser"]>>>,
    "phasersUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionPhasersUpdateArgs, never>
  >;
  probesUpdate?: SubscriptionResolver<
    Array<ResolversTypes["Probes"]>,
    "probesUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionProbesUpdateArgs, "simulatorId">
  >;
  scienceProbeEmitter?: SubscriptionResolver<
    Maybe<ResolversTypes["ScienceProbeEvent"]>,
    "scienceProbeEmitter",
    ParentType,
    ContextType,
    RequireFields<SubscriptionScienceProbeEmitterArgs, "simulatorId">
  >;
  railgunUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Railgun"]>>>,
    "railgunUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionRailgunUpdateArgs, never>
  >;
  reactorUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Reactor"]>>>,
    "reactorUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionReactorUpdateArgs, never>
  >;
  recordSnippetsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["RecordSnippet"]>>>,
    "recordSnippetsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionRecordSnippetsUpdateArgs, never>
  >;
  recordTemplatesUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["RecordSnippet"]>>>,
    "recordTemplatesUpdate",
    ParentType,
    ContextType
  >;
  roomsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    "roomsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionRoomsUpdateArgs, "simulatorId">
  >;
  sensorsUpdate?: SubscriptionResolver<
    Array<ResolversTypes["Sensors"]>,
    "sensorsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSensorsUpdateArgs, never>
  >;
  sensorContactUpdate?: SubscriptionResolver<
    Array<ResolversTypes["SensorContact"]>,
    "sensorContactUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSensorContactUpdateArgs, never>
  >;
  sensorsPing?: SubscriptionResolver<
    Maybe<ResolversTypes["String"]>,
    "sensorsPing",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSensorsPingArgs, never>
  >;
  setsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Set"]>>>,
    "setsUpdate",
    ParentType,
    ContextType
  >;
  shieldsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Shield"]>>>,
    "shieldsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionShieldsUpdateArgs, never>
  >;
  notify?: SubscriptionResolver<
    Maybe<ResolversTypes["Notification"]>,
    "notify",
    ParentType,
    ContextType,
    RequireFields<SubscriptionNotifyArgs, "simulatorId">
  >;
  widgetNotify?: SubscriptionResolver<
    Maybe<ResolversTypes["String"]>,
    "widgetNotify",
    ParentType,
    ContextType,
    RequireFields<SubscriptionWidgetNotifyArgs, "simulatorId">
  >;
  shortRangeCommUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["ShortRangeComm"]>>>,
    "shortRangeCommUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionShortRangeCommUpdateArgs, "simulatorId">
  >;
  sickbayUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Sickbay"]>>>,
    "sickbayUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSickbayUpdateArgs, never>
  >;
  signalJammersUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["SignalJammer"]>>>,
    "signalJammersUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSignalJammersUpdateArgs, "simulatorId">
  >;
  simulatorsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Simulator"]>>>,
    "simulatorsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSimulatorsUpdateArgs, never>
  >;
  softwarePanelsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["SoftwarePanel"]>>>,
    "softwarePanelsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSoftwarePanelsUpdateArgs, never>
  >;
  stationSetUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["StationSet"]>>>,
    "stationSetUpdate",
    ParentType,
    ContextType
  >;
  stealthFieldUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["StealthField"]>>>,
    "stealthFieldUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionStealthFieldUpdateArgs, never>
  >;
  subspaceFieldUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["SubspaceField"]>>>,
    "subspaceFieldUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSubspaceFieldUpdateArgs, never>
  >;
  surveyformUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["SurveyForm"]>>>,
    "surveyformUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSurveyformUpdateArgs, never>
  >;
  systemsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["System"]>>>,
    "systemsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionSystemsUpdateArgs, never>
  >;
  tacticalMapsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["TacticalMap"]>>>,
    "tacticalMapsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionTacticalMapsUpdateArgs, never>
  >;
  tacticalMapUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["TacticalMap"]>,
    "tacticalMapUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionTacticalMapUpdateArgs, "id">
  >;
  targetingUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Targeting"]>>>,
    "targetingUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionTargetingUpdateArgs, never>
  >;
  taskReportUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["TaskReport"]>>>,
    "taskReportUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionTaskReportUpdateArgs, never>
  >;
  tasksUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Task"]>>>,
    "tasksUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionTasksUpdateArgs, "simulatorId">
  >;
  taskTemplatesUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["TaskTemplate"]>>>,
    "taskTemplatesUpdate",
    ParentType,
    ContextType
  >;
  teamsUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Team"]>>>,
    "teamsUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionTeamsUpdateArgs, never>
  >;
  _templateUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["Template"]>,
    "_templateUpdate",
    ParentType,
    ContextType,
    RequireFields<Subscription_TemplateUpdateArgs, never>
  >;
  thoriumUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["Thorium"]>,
    "thoriumUpdate",
    ParentType,
    ContextType
  >;
  clockSync?: SubscriptionResolver<
    Maybe<ResolversTypes["String"]>,
    "clockSync",
    ParentType,
    ContextType,
    RequireFields<SubscriptionClockSyncArgs, "clientId">
  >;
  rotationChange?: SubscriptionResolver<
    Maybe<ResolversTypes["Thruster"]>,
    "rotationChange",
    ParentType,
    ContextType,
    RequireFields<SubscriptionRotationChangeArgs, never>
  >;
  thxUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Thx"]>>>,
    "thxUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionThxUpdateArgs, never>
  >;
  torpedosUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Torpedo"]>>>,
    "torpedosUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionTorpedosUpdateArgs, never>
  >;
  tractorBeamUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["TractorBeam"]>>>,
    "tractorBeamUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionTractorBeamUpdateArgs, never>
  >;
  transporterUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["Transporter"]>,
    "transporterUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionTransporterUpdateArgs, never>
  >;
  transwarpUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Transwarp"]>>>,
    "transwarpUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionTranswarpUpdateArgs, never>
  >;
  triggersUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Trigger"]>>>,
    "triggersUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionTriggersUpdateArgs, never>
  >;
  viewscreensUpdate?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Viewscreen"]>>>,
    "viewscreensUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionViewscreensUpdateArgs, never>
  >;
  viewscreenVideoToggle?: SubscriptionResolver<
    Maybe<ResolversTypes["Boolean"]>,
    "viewscreenVideoToggle",
    ParentType,
    ContextType,
    RequireFields<SubscriptionViewscreenVideoToggleArgs, never>
  >;
  countermeasuresUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes["Countermeasures"]>,
    "countermeasuresUpdate",
    ParentType,
    ContextType,
    RequireFields<SubscriptionCountermeasuresUpdateArgs, "simulatorId">
  >;
  entity?: SubscriptionResolver<
    Maybe<ResolversTypes["Entity"]>,
    "entity",
    ParentType,
    ContextType,
    RequireFields<SubscriptionEntityArgs, never>
  >;
  entities?: SubscriptionResolver<
    Maybe<Array<Maybe<ResolversTypes["Entity"]>>>,
    "entities",
    ParentType,
    ContextType,
    RequireFields<SubscriptionEntitiesArgs, "flightId">
  >;
  dmxSets?: SubscriptionResolver<
    Array<ResolversTypes["DMXSet"]>,
    "dmxSets",
    ParentType,
    ContextType
  >;
  dmxDevices?: SubscriptionResolver<
    Array<ResolversTypes["DMXDevice"]>,
    "dmxDevices",
    ParentType,
    ContextType
  >;
  dmxFixtures?: SubscriptionResolver<
    Array<ResolversTypes["DMXFixture"]>,
    "dmxFixtures",
    ParentType,
    ContextType,
    RequireFields<SubscriptionDmxFixturesArgs, never>
  >;
  dmxConfigs?: SubscriptionResolver<
    Array<ResolversTypes["DMXConfig"]>,
    "dmxConfigs",
    ParentType,
    ContextType
  >;
}>;

export type SubspaceFieldResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SubspaceField"] = ResolversParentTypes["SubspaceField"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  totalPower?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  fore?: Resolver<
    Maybe<ResolversTypes["SubspaceFieldSector"]>,
    ParentType,
    ContextType
  >;
  aft?: Resolver<
    Maybe<ResolversTypes["SubspaceFieldSector"]>,
    ParentType,
    ContextType
  >;
  port?: Resolver<
    Maybe<ResolversTypes["SubspaceFieldSector"]>,
    ParentType,
    ContextType
  >;
  starboard?: Resolver<
    Maybe<ResolversTypes["SubspaceFieldSector"]>,
    ParentType,
    ContextType
  >;
  ventral?: Resolver<
    Maybe<ResolversTypes["SubspaceFieldSector"]>,
    ParentType,
    ContextType
  >;
  dorsal?: Resolver<
    Maybe<ResolversTypes["SubspaceFieldSector"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SubspaceFieldSectorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SubspaceFieldSector"] = ResolversParentTypes["SubspaceFieldSector"]
> = ResolversObject<{
  required?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SurveyFormResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SurveyForm"] = ResolversParentTypes["SurveyForm"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  active?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  googleSpreadsheet?: Resolver<
    Maybe<ResolversTypes["ID"]>,
    ParentType,
    ContextType
  >;
  googleSpreadsheetName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  googleSheet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  form?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FormFields"]>>>,
    ParentType,
    ContextType
  >;
  results?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FormResults"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SystemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["System"] = ResolversParentTypes["System"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  upgradeMacros?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TimelineItem"]>>>,
    ParentType,
    ContextType
  >;
  upgradeBoard?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  extra?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  heat?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  coolant?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  heatRate?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  isochips?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Isochip"]>>>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  requiredDamageSteps?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["DamageStep"]>>>,
    ParentType,
    ContextType
  >;
  optionalDamageSteps?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["DamageStep"]>>>,
    ParentType,
    ContextType
  >;
  damageTasks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["DamageTask"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SystemCoolantResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SystemCoolant"] = ResolversParentTypes["SystemCoolant"]
> = ResolversObject<{
  systemId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  coolant?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  coolantRate?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SystemInterfaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SystemInterface"] = ResolversParentTypes["SystemInterface"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | "System"
    | "CoolantTank"
    | "Crm"
    | "Engine"
    | "InternalComm"
    | "JumpDrive"
    | "LRCommunications"
    | "Navigation"
    | "Phaser"
    | "Probes"
    | "Railgun"
    | "Reactor"
    | "Sensors"
    | "Shield"
    | "ShortRangeComm"
    | "Sickbay"
    | "SignalJammer"
    | "StealthField"
    | "SubspaceField"
    | "Targeting"
    | "Thruster"
    | "Thx"
    | "Torpedo"
    | "TractorBeam"
    | "Transporter"
    | "Transwarp"
    | "Countermeasures",
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
}>;

export type TacticalItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TacticalItem"] = ResolversParentTypes["TacticalItem"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  layerId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  font?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  fontSize?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  fontColor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  flash?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  opacity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  speed?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  velocity?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  location?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  locationJson?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  destination?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  rotation?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  wasd?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  ijkl?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  thrusters?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  rotationMatch?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  thrusterControls?: Resolver<
    Maybe<ResolversTypes["ThrusterControls"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TacticalLayerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TacticalLayer"] = ResolversParentTypes["TacticalLayer"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<
    Maybe<ResolversTypes["TACTICAL_TYPES"]>,
    ParentType,
    ContextType
  >;
  opacity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TacticalItem"]>>>,
    ParentType,
    ContextType
  >;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  labels?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  gridCols?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  gridRows?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  paths?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TacticalPath"]>>>,
    ParentType,
    ContextType
  >;
  advance?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  asset?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  autoplay?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  loop?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  playbackSpeed?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TacticalMapResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TacticalMap"] = ResolversParentTypes["TacticalMap"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  template?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  flight?: Resolver<Maybe<ResolversTypes["Flight"]>, ParentType, ContextType>;
  layers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TacticalLayer"]>>>,
    ParentType,
    ContextType
  >;
  frozen?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  interval?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TacticalPathResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TacticalPath"] = ResolversParentTypes["TacticalPath"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  layerId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  start?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  end?: Resolver<Maybe<ResolversTypes["Coordinates"]>, ParentType, ContextType>;
  c1?: Resolver<Maybe<ResolversTypes["Coordinates"]>, ParentType, ContextType>;
  c2?: Resolver<Maybe<ResolversTypes["Coordinates"]>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  arrow?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TargetingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Targeting"] = ResolversParentTypes["Targeting"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  contacts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TargetingContact"]>>>,
    ParentType,
    ContextType
  >;
  classes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TargetingClass"]>>>,
    ParentType,
    ContextType
  >;
  quadrants?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  range?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  coordinateTargeting?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  interference?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  targetedSensorContact?: Resolver<
    Maybe<ResolversTypes["SensorContact"]>,
    ParentType,
    ContextType
  >;
  calculatedTarget?: Resolver<
    Maybe<ResolversTypes["StringCoordinates"]>,
    ParentType,
    ContextType
  >;
  enteredTarget?: Resolver<
    Maybe<ResolversTypes["StringCoordinates"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TargetingClassResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TargetingClass"] = ResolversParentTypes["TargetingClass"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  speed?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  quadrant?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  moving?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  clickToTarget?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TargetingContactResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TargetingContact"] = ResolversParentTypes["TargetingContact"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  class?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  targeted?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  system?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  speed?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  quadrant?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  destroyed?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  moving?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  clickToTarget?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TaskResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Task"] = ResolversParentTypes["Task"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  station?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  systemId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  deck?: Resolver<Maybe<ResolversTypes["Deck"]>, ParentType, ContextType>;
  room?: Resolver<Maybe<ResolversTypes["Room"]>, ParentType, ContextType>;
  definition?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  verified?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  verifyRequested?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  dismissed?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  values?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  instructions?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  startTime?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  endTime?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  timeElapsedInMS?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  macros?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TimelineItem"]>>>,
    ParentType,
    ContextType
  >;
  assigned?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TaskDefinitionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TaskDefinition"] = ResolversParentTypes["TaskDefinition"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  class?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  stations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Station"]>>>,
    ParentType,
    ContextType
  >;
  active?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  valuesInput?: Resolver<
    Maybe<ResolversTypes["JSON"]>,
    ParentType,
    ContextType
  >;
  valuesValue?: Resolver<
    Maybe<ResolversTypes["JSON"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TaskReportResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TaskReport"] = ResolversParentTypes["TaskReport"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  system?: Resolver<Maybe<ResolversTypes["System"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  stepCount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  tasks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Task"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TaskTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TaskTemplate"] = ResolversParentTypes["TaskTemplate"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  values?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  definition?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  reportTypes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  macros?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TimelineItem"]>>>,
    ParentType,
    ContextType
  >;
  preMacros?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TimelineItem"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TeamResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Team"] = ResolversParentTypes["Team"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["TEAM_TYPES"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  priority?: Resolver<
    Maybe<ResolversTypes["PRIORITIES"]>,
    ParentType,
    ContextType
  >;
  location?: Resolver<
    Maybe<ResolversTypes["Location"]>,
    ParentType,
    ContextType
  >;
  orders?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  officers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Crew"]>>>,
    ParentType,
    ContextType
  >;
  cleared?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TeamCountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TeamCount"] = ResolversParentTypes["TeamCount"]
> = ResolversObject<{
  team?: Resolver<Maybe<ResolversTypes["Team"]>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TeamCountInputResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TeamCountInput"] = ResolversParentTypes["TeamCountInput"]
> = ResolversObject<{
  team?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Template"] = ResolversParentTypes["Template"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TemplateComponentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TemplateComponent"] = ResolversParentTypes["TemplateComponent"]
> = ResolversObject<{
  category?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ThoriumResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Thorium"] = ResolversParentTypes["Thorium"]
> = ResolversObject<{
  thoriumId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  doTrack?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  askedToTrack?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  addedTaskTemplates?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  spaceEdventuresToken?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  spaceEdventuresCenter?: Resolver<
    Maybe<ResolversTypes["SpaceEdventuresCenter"]>,
    ParentType,
    ContextType
  >;
  port?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  httpOnly?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ThrusterResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Thruster"] = ResolversParentTypes["Thruster"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  direction?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  rotation?: Resolver<
    Maybe<ResolversTypes["Rotation"]>,
    ParentType,
    ContextType
  >;
  rotationDelta?: Resolver<
    Maybe<ResolversTypes["Rotation"]>,
    ParentType,
    ContextType
  >;
  rotationRequired?: Resolver<
    Maybe<ResolversTypes["Rotation"]>,
    ParentType,
    ContextType
  >;
  manualThrusters?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  rotationSpeed?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  movementSpeed?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ThrusterControlsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ThrusterControls"] = ResolversParentTypes["ThrusterControls"]
> = ResolversObject<{
  rotation?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  reversed?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  matchRotation?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  up?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  down?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  left?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  right?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ThrustersComponentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ThrustersComponent"] = ResolversParentTypes["ThrustersComponent"]
> = ResolversObject<{
  direction?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  rotationDelta?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  rotationSpeed?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  movementSpeed?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ThxResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Thx"] = ResolversParentTypes["Thx"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  activated?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  clients?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ThxClient"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ThxClientResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ThxClient"] = ResolversParentTypes["ThxClient"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  charge?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  lock?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  station?: Resolver<Maybe<ResolversTypes["Station"]>, ParentType, ContextType>;
  executive?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  connected?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TimelineInstanceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TimelineInstance"] = ResolversParentTypes["TimelineInstance"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  mission?: Resolver<Maybe<ResolversTypes["Mission"]>, ParentType, ContextType>;
  currentTimelineStep?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  executedTimelineSteps?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ID"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TimelineItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TimelineItem"] = ResolversParentTypes["TimelineItem"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  event?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  needsConfig?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  args?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  delay?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  noCancelOnReset?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TimelineStepResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TimelineStep"] = ResolversParentTypes["TimelineStep"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  order?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  timelineItems?: Resolver<
    Array<ResolversTypes["TimelineItem"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TimerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Timer"] = ResolversParentTypes["Timer"]
> = ResolversObject<{
  time?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  active?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TorpedoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Torpedo"] = ResolversParentTypes["Torpedo"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  inventory?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Warhead"]>>>,
    ParentType,
    ContextType
  >;
  loaded?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TractorBeamResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TractorBeam"] = ResolversParentTypes["TractorBeam"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  state?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  targetLabel?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  strength?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  stress?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  scanning?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TransporterResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Transporter"] = ResolversParentTypes["Transporter"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  targets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TransporterTarget"]>>>,
    ParentType,
    ContextType
  >;
  requestedTarget?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  destination?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  charge?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  chargeSpeed?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TransporterTargetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TransporterTarget"] = ResolversParentTypes["TransporterTarget"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  moving?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  position?: Resolver<
    Maybe<ResolversTypes["Coordinates"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TranswarpResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Transwarp"] = ResolversParentTypes["Transwarp"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgradeName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  upgraded?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<Maybe<ResolversTypes["Damage"]>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes["Power"]>, ParentType, ContextType>;
  stealthFactor?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Room"]>>>,
    ParentType,
    ContextType
  >;
  heat?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  heatRate?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  coolant?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  active?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  quad1?: Resolver<
    Maybe<ResolversTypes["TranswarpQuad"]>,
    ParentType,
    ContextType
  >;
  quad2?: Resolver<
    Maybe<ResolversTypes["TranswarpQuad"]>,
    ParentType,
    ContextType
  >;
  quad3?: Resolver<
    Maybe<ResolversTypes["TranswarpQuad"]>,
    ParentType,
    ContextType
  >;
  quad4?: Resolver<
    Maybe<ResolversTypes["TranswarpQuad"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TranswarpQuadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TranswarpQuad"] = ResolversParentTypes["TranswarpQuad"]
> = ResolversObject<{
  field?: Resolver<
    Maybe<ResolversTypes["SubspaceFieldSector"]>,
    ParentType,
    ContextType
  >;
  core?: Resolver<
    Maybe<ResolversTypes["SubspaceFieldSector"]>,
    ParentType,
    ContextType
  >;
  warp?: Resolver<
    Maybe<ResolversTypes["SubspaceFieldSector"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TriggerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Trigger"] = ResolversParentTypes["Trigger"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  components?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  connections?: Resolver<
    Maybe<ResolversTypes["JSON"]>,
    ParentType,
    ContextType
  >;
  values?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ViewscreenResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Viewscreen"] = ResolversParentTypes["Viewscreen"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  simulatorId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  component?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  data?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  auto?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  secondary?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  overlay?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  pictureInPicture?: Resolver<
    Maybe<ResolversTypes["ViewscreenPictureInPicture"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ViewscreenPictureInPictureResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ViewscreenPictureInPicture"] = ResolversParentTypes["ViewscreenPictureInPicture"]
> = ResolversObject<{
  component?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  data?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  position?: Resolver<
    Maybe<ResolversTypes["PIP_POSITION"]>,
    ParentType,
    ContextType
  >;
  size?: Resolver<Maybe<ResolversTypes["PIP_SIZE"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type WarheadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Warhead"] = ResolversParentTypes["Warhead"]
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  probe?: Resolver<Maybe<ResolversTypes["Probe"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Action?: ActionResolvers<ContextType>;
  Ambiance?: AmbianceResolvers<ContextType>;
  AppearanceComponent?: AppearanceComponentResolvers<ContextType>;
  Asset?: AssetResolvers<ContextType>;
  AssetFolder?: AssetFolderResolvers<ContextType>;
  AssetObject?: AssetObjectResolvers<ContextType>;
  BehaviorComponent?: BehaviorComponentResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Card?: CardResolvers<ContextType>;
  Chart?: ChartResolvers<ContextType>;
  Client?: ClientResolvers<ContextType>;
  CommandLine?: CommandLineResolvers<ContextType>;
  CommandLineCommand?: CommandLineCommandResolvers<ContextType>;
  CommandLineFeedback?: CommandLineFeedbackResolvers<ContextType>;
  CommArrow?: CommArrowResolvers<ContextType>;
  CommArrowExtended?: CommArrowExtendedResolvers<ContextType>;
  CommRange?: CommRangeResolvers<ContextType>;
  CommRanges?: CommRangesResolvers<ContextType>;
  CommSignal?: CommSignalResolvers<ContextType>;
  CommSignalExtended?: CommSignalExtendedResolvers<ContextType>;
  ComputerCore?: ComputerCoreResolvers<ContextType>;
  ComputerCoreFile?: ComputerCoreFileResolvers<ContextType>;
  ComputerCoreTerminals?: ComputerCoreTerminalsResolvers<ContextType>;
  ComputerCoreUser?: ComputerCoreUserResolvers<ContextType>;
  ComputerCoreVirus?: ComputerCoreVirusResolvers<ContextType>;
  Coolant?: CoolantResolvers<ContextType>;
  CoolantRegulator?: CoolantRegulatorResolvers<ContextType>;
  CoolantTank?: CoolantTankResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
  CoreFeed?: CoreFeedResolvers<ContextType>;
  CoreLayout?: CoreLayoutResolvers<ContextType>;
  Countermeasure?: CountermeasureResolvers<ContextType>;
  CountermeasureConfigOptions?: CountermeasureConfigOptionsResolvers<
    ContextType
  >;
  CountermeasureModule?: CountermeasureModuleResolvers<ContextType>;
  CountermeasureResources?: CountermeasureResourcesResolvers<ContextType>;
  Countermeasures?: CountermeasuresResolvers<ContextType>;
  CountermeasureSlot?: CountermeasureSlotResolvers<ContextType>;
  Crew?: CrewResolvers<ContextType>;
  Crm?: CrmResolvers<ContextType>;
  CrmFighter?: CrmFighterResolvers<ContextType>;
  CrmPhaserShot?: CrmPhaserShotResolvers<ContextType>;
  CrmTorpedo?: CrmTorpedoResolvers<ContextType>;
  Damage?: DamageResolvers<ContextType>;
  DamageReportStep?: DamageReportStepResolvers<ContextType>;
  DamageStep?: DamageStepResolvers<ContextType>;
  DamageStepArgs?: DamageStepArgsResolvers<ContextType>;
  DamageTask?: DamageTaskResolvers<ContextType>;
  Deck?: DeckResolvers<ContextType>;
  DMXConfig?: DmxConfigResolvers<ContextType>;
  DMXDevice?: DmxDeviceResolvers<ContextType>;
  DMXFixture?: DmxFixtureResolvers<ContextType>;
  DMXPassiveChannels?: DmxPassiveChannelsResolvers<ContextType>;
  DMXSet?: DmxSetResolvers<ContextType>;
  DockingPort?: DockingPortResolvers<ContextType>;
  Engine?: EngineResolvers<ContextType>;
  EngineComponent?: EngineComponentResolvers<ContextType>;
  Entity?: EntityResolvers<ContextType>;
  EntityCoordinates?: EntityCoordinatesResolvers<ContextType>;
  Environment?: EnvironmentResolvers<ContextType>;
  Exocomp?: ExocompResolvers<ContextType>;
  ExocompLog?: ExocompLogResolvers<ContextType>;
  ExternalMission?: ExternalMissionResolvers<ContextType>;
  Externals?: ExternalsResolvers<ContextType>;
  ExternalSimulator?: ExternalSimulatorResolvers<ContextType>;
  Flight?: FlightResolvers<ContextType>;
  FlightType?: FlightTypeResolvers<ContextType>;
  FormFields?: FormFieldsResolvers<ContextType>;
  FormOptions?: FormOptionsResolvers<ContextType>;
  FormResults?: FormResultsResolvers<ContextType>;
  GlowComponent?: GlowComponentResolvers<ContextType>;
  GoogleSheet?: GoogleSheetResolvers<ContextType>;
  GoogleSheetFile?: GoogleSheetFileResolvers<ContextType>;
  GoogleSheets?: GoogleSheetsResolvers<ContextType>;
  GoogleSpreadsheet?: GoogleSpreadsheetResolvers<ContextType>;
  History?: HistoryResolvers<ContextType>;
  IdentityComponent?: IdentityComponentResolvers<ContextType>;
  Interface?: InterfaceResolvers<ContextType>;
  InterfaceDevice?: InterfaceDeviceResolvers<ContextType>;
  InternalComm?: InternalCommResolvers<ContextType>;
  InventoryItem?: InventoryItemResolvers<ContextType>;
  InventoryLog?: InventoryLogResolvers<ContextType>;
  InventoryMetadata?: InventoryMetadataResolvers<ContextType>;
  Isochip?: IsochipResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JumpDrive?: JumpDriveResolvers<ContextType>;
  JumpDriveSector?: JumpDriveSectorResolvers<ContextType>;
  JumpDriveSectors?: JumpDriveSectorsResolvers<ContextType>;
  Keyboard?: KeyboardResolvers<ContextType>;
  KeyboardKey?: KeyboardKeyResolvers<ContextType>;
  Keypad?: KeypadResolvers<ContextType>;
  LibraryCategory?: LibraryCategoryResolvers<ContextType>;
  LibraryEntry?: LibraryEntryResolvers<ContextType>;
  LightComponent?: LightComponentResolvers<ContextType>;
  Lighting?: LightingResolvers<ContextType>;
  Location?: LocationResolvers;
  LocationComponent?: LocationComponentResolvers<ContextType>;
  Log?: LogResolvers<ContextType>;
  LRCommunications?: LrCommunicationsResolvers<ContextType>;
  LRMessage?: LrMessageResolvers<ContextType>;
  Macro?: MacroResolvers<ContextType>;
  MacroAction?: MacroActionResolvers<ContextType>;
  MacroButton?: MacroButtonResolvers<ContextType>;
  MacroButtonConfig?: MacroButtonConfigResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MidiControl?: MidiControlResolvers<ContextType>;
  MidiSet?: MidiSetResolvers<ContextType>;
  Mission?: MissionResolvers<ContextType>;
  Motu?: MotuResolvers<ContextType>;
  MotuChannel?: MotuChannelResolvers<ContextType>;
  MotuComp?: MotuCompResolvers<ContextType>;
  MotuEQ?: MotuEqResolvers<ContextType>;
  MotuGate?: MotuGateResolvers<ContextType>;
  MotuInput?: MotuInputResolvers<ContextType>;
  MotuOutput?: MotuOutputResolvers<ContextType>;
  MotuPatch?: MotuPatchResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NamedObject?: NamedObjectResolvers<ContextType>;
  Navigation?: NavigationResolvers<ContextType>;
  NavLoc?: NavLocResolvers<ContextType>;
  NavPreset?: NavPresetResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  Objective?: ObjectiveResolvers<ContextType>;
  PainPoint?: PainPointResolvers<ContextType>;
  PanelCable?: PanelCableResolvers<ContextType>;
  PanelComponent?: PanelComponentResolvers<ContextType>;
  PanelConnection?: PanelConnectionResolvers<ContextType>;
  Phaser?: PhaserResolvers<ContextType>;
  PhaserBeam?: PhaserBeamResolvers<ContextType>;
  Power?: PowerResolvers<ContextType>;
  PresetAnswer?: PresetAnswerResolvers<ContextType>;
  Probe?: ProbeResolvers<ContextType>;
  ProbeEquipment?: ProbeEquipmentResolvers<ContextType>;
  Probes?: ProbesResolvers<ContextType>;
  ProbeType?: ProbeTypeResolvers<ContextType>;
  ProcessedData?: ProcessedDataResolvers<ContextType>;
  Quaternion?: QuaternionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Railgun?: RailgunResolvers<ContextType>;
  Reactor?: ReactorResolvers<ContextType>;
  ReactorEfficiency?: ReactorEfficiencyResolvers<ContextType>;
  RecordEntry?: RecordEntryResolvers<ContextType>;
  RecordSnippet?: RecordSnippetResolvers<ContextType>;
  RemoteAccessCode?: RemoteAccessCodeResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  RoomCount?: RoomCountResolvers<ContextType>;
  Rotation?: RotationResolvers<ContextType>;
  Scanner?: ScannerResolvers<ContextType>;
  ScienceProbeEvent?: ScienceProbeEventResolvers<ContextType>;
  ScienceType?: ScienceTypeResolvers<ContextType>;
  SensorContact?: SensorContactResolvers<ContextType>;
  Sensors?: SensorsResolvers<ContextType>;
  SensorScan?: SensorScanResolvers<ContextType>;
  SensorsSegment?: SensorsSegmentResolvers<ContextType>;
  Set?: SetResolvers<ContextType>;
  SetClient?: SetClientResolvers<ContextType>;
  Shield?: ShieldResolvers<ContextType>;
  Ship?: ShipResolvers<ContextType>;
  ShortRangeComm?: ShortRangeCommResolvers<ContextType>;
  ShortRangeCommExtended?: ShortRangeCommExtendedResolvers<ContextType>;
  Sickbay?: SickbayResolvers<ContextType>;
  SickbayBunk?: SickbayBunkResolvers<ContextType>;
  Signal?: SignalResolvers<ContextType>;
  SignalJammer?: SignalJammerResolvers<ContextType>;
  Simulator?: SimulatorResolvers<ContextType>;
  SimulatorAssets?: SimulatorAssetsResolvers<ContextType>;
  SimulatorCapabilities?: SimulatorCapabilitiesResolvers<ContextType>;
  SoftwarePanel?: SoftwarePanelResolvers<ContextType>;
  Sound?: SoundResolvers<ContextType>;
  SpaceEdventuresCenter?: SpaceEdventuresCenterResolvers<ContextType>;
  SpaceEdventuresClient?: SpaceEdventuresClientResolvers<ContextType>;
  Speed?: SpeedResolvers<ContextType>;
  StageChildComponent?: StageChildComponentResolvers<ContextType>;
  StageComponent?: StageComponentResolvers<ContextType>;
  Station?: StationResolvers<ContextType>;
  StationSet?: StationSetResolvers<ContextType>;
  StealthField?: StealthFieldResolvers<ContextType>;
  StealthQuad?: StealthQuadResolvers<ContextType>;
  StringCoordinates?: StringCoordinatesResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SubspaceField?: SubspaceFieldResolvers<ContextType>;
  SubspaceFieldSector?: SubspaceFieldSectorResolvers<ContextType>;
  SurveyForm?: SurveyFormResolvers<ContextType>;
  System?: SystemResolvers<ContextType>;
  SystemCoolant?: SystemCoolantResolvers<ContextType>;
  SystemInterface?: SystemInterfaceResolvers;
  TacticalItem?: TacticalItemResolvers<ContextType>;
  TacticalLayer?: TacticalLayerResolvers<ContextType>;
  TacticalMap?: TacticalMapResolvers<ContextType>;
  TacticalPath?: TacticalPathResolvers<ContextType>;
  Targeting?: TargetingResolvers<ContextType>;
  TargetingClass?: TargetingClassResolvers<ContextType>;
  TargetingContact?: TargetingContactResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskDefinition?: TaskDefinitionResolvers<ContextType>;
  TaskReport?: TaskReportResolvers<ContextType>;
  TaskTemplate?: TaskTemplateResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  TeamCount?: TeamCountResolvers<ContextType>;
  TeamCountInput?: TeamCountInputResolvers<ContextType>;
  Template?: TemplateResolvers<ContextType>;
  TemplateComponent?: TemplateComponentResolvers<ContextType>;
  Thorium?: ThoriumResolvers<ContextType>;
  Thruster?: ThrusterResolvers<ContextType>;
  ThrusterControls?: ThrusterControlsResolvers<ContextType>;
  ThrustersComponent?: ThrustersComponentResolvers<ContextType>;
  Thx?: ThxResolvers<ContextType>;
  ThxClient?: ThxClientResolvers<ContextType>;
  TimelineInstance?: TimelineInstanceResolvers<ContextType>;
  TimelineItem?: TimelineItemResolvers<ContextType>;
  TimelineStep?: TimelineStepResolvers<ContextType>;
  Timer?: TimerResolvers<ContextType>;
  Torpedo?: TorpedoResolvers<ContextType>;
  TractorBeam?: TractorBeamResolvers<ContextType>;
  Transporter?: TransporterResolvers<ContextType>;
  TransporterTarget?: TransporterTargetResolvers<ContextType>;
  Transwarp?: TranswarpResolvers<ContextType>;
  TranswarpQuad?: TranswarpQuadResolvers<ContextType>;
  Trigger?: TriggerResolvers<ContextType>;
  Viewscreen?: ViewscreenResolvers<ContextType>;
  ViewscreenPictureInPicture?: ViewscreenPictureInPictureResolvers<ContextType>;
  Warhead?: WarheadResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
