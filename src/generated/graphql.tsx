import gql from 'graphql-tag.macro';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  JSON: {[key: string]: any},
  BigInt: any,
};

export type Action = {
   __typename?: 'Action',
  action?: Maybe<Scalars['String']>,
  message?: Maybe<Scalars['String']>,
  voice?: Maybe<Scalars['String']>,
  duration?: Maybe<Scalars['Float']>,
};

export type ActionInput = {
  id?: Maybe<Scalars['ID']>,
  event?: Maybe<Scalars['String']>,
  args?: Maybe<Scalars['String']>,
  delay?: Maybe<Scalars['Int']>,
  noCancelOnReset?: Maybe<Scalars['Boolean']>,
  needsConfig?: Maybe<Scalars['Boolean']>,
};

export type Ambiance = {
   __typename?: 'Ambiance',
  id: Scalars['ID'],
  name: Scalars['String'],
  asset: Scalars['String'],
  volume: Scalars['Float'],
  channel: Array<Scalars['Int']>,
  playbackRate: Scalars['Float'],
};

export type AmbianceInput = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  asset?: Maybe<Scalars['String']>,
  volume?: Maybe<Scalars['Float']>,
  channel?: Maybe<Array<Maybe<Scalars['Int']>>>,
  playbackRate?: Maybe<Scalars['Float']>,
};

export type AppearanceComponent = {
   __typename?: 'AppearanceComponent',
  meshType?: Maybe<MeshTypeEnum>,
  modelAsset?: Maybe<Scalars['String']>,
  materialMapAsset?: Maybe<Scalars['String']>,
  ringMapAsset?: Maybe<Scalars['String']>,
  cloudMapAsset?: Maybe<Scalars['String']>,
  emissiveColor?: Maybe<Scalars['String']>,
  emissiveIntensity?: Maybe<Scalars['Float']>,
  color?: Maybe<Scalars['String']>,
  scale?: Maybe<Scalars['Float']>,
};

export type Asset = {
   __typename?: 'Asset',
  assetKey: Scalars['String'],
  url: Scalars['String'],
};

export type AssetFolder = {
   __typename?: 'AssetFolder',
  id: Scalars['ID'],
  name: Scalars['String'],
  folderPath: Scalars['String'],
  fullPath: Scalars['String'],
  objects: Array<AssetObject>,
};

export type AssetObject = {
   __typename?: 'AssetObject',
  id: Scalars['ID'],
  name: Scalars['String'],
  folderPath: Scalars['String'],
  fullPath: Scalars['String'],
  url: Scalars['String'],
};

export type BehaviorComponent = {
   __typename?: 'BehaviorComponent',
  behavior: Behaviors,
  targetId?: Maybe<Scalars['ID']>,
  destination?: Maybe<EntityCoordinates>,
};

export enum Behaviors {
  HoldPosition = 'holdPosition',
  Wander = 'wander',
  Follow = 'follow',
  Avoid = 'avoid',
  Attack = 'attack'
}


export type Card = {
   __typename?: 'Card',
  name: Scalars['String'],
  component: Scalars['String'],
  hidden?: Maybe<Scalars['Boolean']>,
  assigned?: Maybe<Scalars['Boolean']>,
  newStation?: Maybe<Scalars['Boolean']>,
};

export type CardInput = {
  name?: Maybe<Scalars['String']>,
  component?: Maybe<Scalars['String']>,
};

export enum ChannelModeMessageType {
  Allsoundoff = 'allsoundoff',
  Resetallcontrollers = 'resetallcontrollers',
  Localcontroloff = 'localcontroloff',
  Localcontrolon = 'localcontrolon',
  Allnotesoff = 'allnotesoff',
  Omnimodeoff = 'omnimodeoff',
  Omnimodeon = 'omnimodeon',
  Monomodeon = 'monomodeon',
  Polymodeon = 'polymodeon'
}

export type Chart = {
   __typename?: 'Chart',
  id?: Maybe<Scalars['ID']>,
  admitTime?: Maybe<Scalars['String']>,
  dischargeTime?: Maybe<Scalars['String']>,
  bloodPressure?: Maybe<Scalars['String']>,
  heartRate?: Maybe<Scalars['Float']>,
  temperature?: Maybe<Scalars['Float']>,
  o2levels?: Maybe<Scalars['Float']>,
  symptoms?: Maybe<Array<Maybe<Scalars['String']>>>,
  diagnosis?: Maybe<Array<Maybe<Scalars['String']>>>,
  treatment?: Maybe<Scalars['String']>,
  treatmentRequest?: Maybe<Scalars['Boolean']>,
  painPoints?: Maybe<Array<Maybe<PainPoint>>>,
};

export type ChartInput = {
  id?: Maybe<Scalars['ID']>,
  admitTime?: Maybe<Scalars['String']>,
  dischargeTime?: Maybe<Scalars['String']>,
  bloodPressure?: Maybe<Scalars['String']>,
  heartRate?: Maybe<Scalars['Float']>,
  temperature?: Maybe<Scalars['Float']>,
  o2levels?: Maybe<Scalars['Float']>,
  symptoms?: Maybe<Array<Maybe<Scalars['String']>>>,
  treatment?: Maybe<Scalars['String']>,
  treatmentRequest?: Maybe<Scalars['Boolean']>,
  painPoints?: Maybe<Array<Maybe<PainPointInput>>>,
};

export type Client = {
   __typename?: 'Client',
  id: Scalars['ID'],
  label?: Maybe<Scalars['String']>,
  connected?: Maybe<Scalars['Boolean']>,
  flight?: Maybe<Flight>,
  simulator?: Maybe<Simulator>,
  station?: Maybe<Station>,
  loginName?: Maybe<Scalars['String']>,
  loginState?: Maybe<Scalars['String']>,
  ping?: Maybe<Scalars['String']>,
  offlineState?: Maybe<Scalars['String']>,
  movie?: Maybe<Scalars['String']>,
  training?: Maybe<Scalars['Boolean']>,
  soundPlayer?: Maybe<Scalars['Boolean']>,
  caches?: Maybe<Array<Maybe<Scalars['String']>>>,
  hypercard?: Maybe<Scalars['String']>,
  overlay?: Maybe<Scalars['Boolean']>,
  cracked?: Maybe<Scalars['Boolean']>,
  commandLineOutput?: Maybe<Array<Maybe<Scalars['String']>>>,
  commandLineFeedback?: Maybe<Array<Maybe<CommandLineFeedback>>>,
  currentCard?: Maybe<Card>,
  token?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  mobile?: Maybe<Scalars['Boolean']>,
  cards?: Maybe<Array<Maybe<Scalars['String']>>>,
  keypad?: Maybe<Keypad>,
};

export type CommandLine = {
   __typename?: 'CommandLine',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  commands?: Maybe<Array<Maybe<CommandLineCommand>>>,
  components?: Maybe<Scalars['JSON']>,
  connections?: Maybe<Scalars['JSON']>,
  values?: Maybe<Scalars['JSON']>,
  config?: Maybe<Scalars['JSON']>,
};

export type CommandLineCommand = {
   __typename?: 'CommandLineCommand',
  name?: Maybe<Scalars['String']>,
  help?: Maybe<Scalars['String']>,
  hidden?: Maybe<Scalars['Boolean']>,
};

export type CommandLineFeedback = {
   __typename?: 'CommandLineFeedback',
  id?: Maybe<Scalars['ID']>,
  clientId?: Maybe<Scalars['ID']>,
  command?: Maybe<Scalars['String']>,
  approve?: Maybe<Scalars['String']>,
  deny?: Maybe<Scalars['String']>,
  triggers?: Maybe<Array<Maybe<TimelineItem>>>,
};

export type CommArrow = {
   __typename?: 'CommArrow',
  id?: Maybe<Scalars['ID']>,
  signal?: Maybe<Scalars['ID']>,
  frequency?: Maybe<Scalars['Float']>,
  connected?: Maybe<Scalars['Boolean']>,
  muted?: Maybe<Scalars['Boolean']>,
};

export type CommArrowExtended = {
   __typename?: 'CommArrowExtended',
  id?: Maybe<Scalars['ID']>,
  signal?: Maybe<Scalars['ID']>,
  range?: Maybe<Scalars['String']>,
  frequency?: Maybe<Scalars['Float']>,
  connected?: Maybe<Scalars['Boolean']>,
};

export type CommArrowInput = {
  id?: Maybe<Scalars['ID']>,
  signal?: Maybe<Scalars['ID']>,
  frequency?: Maybe<Scalars['Float']>,
  connected?: Maybe<Scalars['Boolean']>,
};

export type CommRange = {
   __typename?: 'CommRange',
  lower?: Maybe<Scalars['Float']>,
  upper?: Maybe<Scalars['Float']>,
};

export type CommRanges = {
   __typename?: 'CommRanges',
  military?: Maybe<CommRange>,
  commercial?: Maybe<CommRange>,
  priority?: Maybe<CommRange>,
  emergency?: Maybe<CommRange>,
};

export type CommSignal = {
   __typename?: 'CommSignal',
  id?: Maybe<Scalars['ID']>,
  image?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  range?: Maybe<CommRange>,
  color?: Maybe<Scalars['String']>,
};

export type CommSignalExtended = {
   __typename?: 'CommSignalExtended',
  id?: Maybe<Scalars['ID']>,
  color?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  ranges?: Maybe<CommRanges>,
};

export type CommSignalInput = {
  id?: Maybe<Scalars['ID']>,
  image?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  range?: Maybe<RangeInput>,
  color?: Maybe<Scalars['String']>,
};

export type CommUpdateInput = {
  state?: Maybe<Scalars['String']>,
  frequency?: Maybe<Scalars['Float']>,
  amplitude?: Maybe<Scalars['Float']>,
};

export type ComputerCore = {
   __typename?: 'ComputerCore',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  users?: Maybe<Array<Maybe<ComputerCoreUser>>>,
  files?: Maybe<Array<Maybe<ComputerCoreFile>>>,
  virii?: Maybe<Array<Maybe<ComputerCoreVirus>>>,
  terminals?: Maybe<Array<Maybe<ComputerCoreTerminals>>>,
  history?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type ComputerCoreFile = {
   __typename?: 'ComputerCoreFile',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  level?: Maybe<Scalars['Int']>,
  corrupted?: Maybe<Scalars['Boolean']>,
  restoring?: Maybe<Scalars['Boolean']>,
};

export type ComputerCoreTerminals = {
   __typename?: 'ComputerCoreTerminals',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  status?: Maybe<Terminal_Status>,
};

export type ComputerCoreUser = {
   __typename?: 'ComputerCoreUser',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  hacker?: Maybe<Scalars['Boolean']>,
  level?: Maybe<Scalars['Int']>,
};

export type ComputerCoreUserInput = {
  name?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  hacker?: Maybe<Scalars['Boolean']>,
  level?: Maybe<Scalars['Int']>,
};

export type ComputerCoreVirus = {
   __typename?: 'ComputerCoreVirus',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
};

export type Coolant = {
   __typename?: 'Coolant',
  temperature?: Maybe<Scalars['Float']>,
  quantity?: Maybe<Scalars['Float']>,
  rate?: Maybe<Scalars['Float']>,
};

export type CoolantRegulator = {
   __typename?: 'CoolantRegulator',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  coolant?: Maybe<Coolant>,
  damage?: Maybe<Scalars['Float']>,
};

export type CoolantTank = SystemInterface & {
   __typename?: 'CoolantTank',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  coolant?: Maybe<Scalars['Float']>,
  coolantRate?: Maybe<Scalars['Float']>,
  damage?: Maybe<Damage>,
  power?: Maybe<Power>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
};

export type Coordinates = {
   __typename?: 'Coordinates',
  x?: Maybe<Scalars['Float']>,
  y?: Maybe<Scalars['Float']>,
  z?: Maybe<Scalars['Float']>,
};

export type CoordinatesInput = {
  x?: Maybe<Scalars['Float']>,
  y?: Maybe<Scalars['Float']>,
  z?: Maybe<Scalars['Float']>,
};

export type CoreFeed = {
   __typename?: 'CoreFeed',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  component?: Maybe<Scalars['String']>,
  ignored?: Maybe<Scalars['Boolean']>,
  timestamp?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>,
  color?: Maybe<Scalars['String']>,
};

export type CoreLayout = {
   __typename?: 'CoreLayout',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  config?: Maybe<Scalars['String']>,
};

export type CoreLayoutInput = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  config?: Maybe<Scalars['String']>,
};

export type Countermeasure = {
   __typename?: 'Countermeasure',
  id: Scalars['ID'],
  name: Scalars['String'],
  modules: Array<CountermeasureModule>,
  locked: Scalars['Boolean'],
  active: Scalars['Boolean'],
  building: Scalars['Boolean'],
  totalPowerUsed: Scalars['Float'],
  readyToLaunch: Scalars['Boolean'],
  powerUsage: Scalars['Float'],
  availablePower: Scalars['Float'],
  buildPercentage: Scalars['Float'],
  note: Scalars['String'],
};

export type CountermeasureConfigOptions = {
   __typename?: 'CountermeasureConfigOptions',
  type: Scalars['String'],
  label: Scalars['String'],
};

export type CountermeasureModule = {
   __typename?: 'CountermeasureModule',
  id: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  powerRequirement: Scalars['Float'],
  resourceRequirements: CountermeasureResources,
  configurationOptions: Array<CountermeasureConfigOptions>,
  config: Scalars['JSON'],
  buildProgress: Scalars['Float'],
  activated: Scalars['Boolean'],
};

export type CountermeasureResources = {
   __typename?: 'CountermeasureResources',
  copper: Scalars['Float'],
  titanium: Scalars['Float'],
  carbon: Scalars['Float'],
  plastic: Scalars['Float'],
  plasma: Scalars['Float'],
};

export type Countermeasures = SystemInterface & {
   __typename?: 'Countermeasures',
  id: Scalars['ID'],
  simulatorId?: Maybe<Scalars['ID']>,
  class?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  displayName: Scalars['String'],
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  damage: Damage,
  power: Power,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  materials: CountermeasureResources,
  slots: CountermeasureSlot,
  launched: Array<Countermeasure>,
};

export type CountermeasureSlot = {
   __typename?: 'CountermeasureSlot',
  slot1?: Maybe<Countermeasure>,
  slot2?: Maybe<Countermeasure>,
  slot3?: Maybe<Countermeasure>,
  slot4?: Maybe<Countermeasure>,
  slot5?: Maybe<Countermeasure>,
  slot6?: Maybe<Countermeasure>,
  slot7?: Maybe<Countermeasure>,
  slot8?: Maybe<Countermeasure>,
};

export enum CountermeasureSlotEnum {
  Slot1 = 'slot1',
  Slot2 = 'slot2',
  Slot3 = 'slot3',
  Slot4 = 'slot4',
  Slot5 = 'slot5',
  Slot6 = 'slot6',
  Slot7 = 'slot7',
  Slot8 = 'slot8'
}

export type Crew = {
   __typename?: 'Crew',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['String']>,
  age?: Maybe<Scalars['Int']>,
  rank?: Maybe<Scalars['String']>,
  position?: Maybe<Scalars['String']>,
  killed?: Maybe<Scalars['Boolean']>,
  location?: Maybe<Deck>,
  workRoom?: Maybe<Room>,
  restRoom?: Maybe<Room>,
  inventory?: Maybe<Array<Maybe<InventoryItem>>>,
  charts?: Maybe<Array<Maybe<Chart>>>,
};

export type CrewCountInput = {
  crew?: Maybe<Scalars['ID']>,
  count?: Maybe<Scalars['Int']>,
};

export type CrewInput = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['String']>,
  age?: Maybe<Scalars['String']>,
  rank?: Maybe<Scalars['String']>,
  position?: Maybe<Scalars['String']>,
  killed?: Maybe<Scalars['Boolean']>,
  workRoom?: Maybe<Scalars['Int']>,
  restRoom?: Maybe<Scalars['Int']>,
};

export type Crm = SystemInterface & {
   __typename?: 'Crm',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  damage?: Maybe<Damage>,
  power?: Maybe<Power>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  password?: Maybe<Scalars['String']>,
  activated?: Maybe<Scalars['Boolean']>,
  fighterImage?: Maybe<Scalars['String']>,
  fighters?: Maybe<Array<Maybe<CrmFighter>>>,
  enemies?: Maybe<Array<Maybe<CrmFighter>>>,
  fighterStrength?: Maybe<Scalars['Float']>,
  enemyStrength?: Maybe<Scalars['Float']>,
  fighterCount?: Maybe<Scalars['Int']>,
  enemyCount?: Maybe<Scalars['Int']>,
  fighterDestroyedCount?: Maybe<Scalars['Int']>,
  enemyDestroyedCount?: Maybe<Scalars['Int']>,
  fighterIcon?: Maybe<Scalars['String']>,
  enemyIcon?: Maybe<Scalars['String']>,
  attacking?: Maybe<Scalars['Boolean']>,
  interval?: Maybe<Scalars['Float']>,
  phasers?: Maybe<Array<Maybe<CrmPhaserShot>>>,
  torpedos?: Maybe<Array<Maybe<CrmTorpedo>>>,
};

export type CrmFighter = {
   __typename?: 'CrmFighter',
  id?: Maybe<Scalars['ID']>,
  clientId?: Maybe<Scalars['ID']>,
  client?: Maybe<Client>,
  icon?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  speed?: Maybe<Scalars['Float']>,
  strength?: Maybe<Scalars['Float']>,
  attacking?: Maybe<Scalars['Boolean']>,
  hull?: Maybe<Scalars['Float']>,
  shield?: Maybe<Scalars['Float']>,
  shieldRaised?: Maybe<Scalars['Boolean']>,
  phaserLevel?: Maybe<Scalars['Float']>,
  torpedoCount?: Maybe<Scalars['Int']>,
  torpedoLoaded?: Maybe<Scalars['Boolean']>,
  destroyed?: Maybe<Scalars['Boolean']>,
  docked?: Maybe<Scalars['Boolean']>,
  position?: Maybe<Coordinates>,
  velocity?: Maybe<Coordinates>,
  frags?: Maybe<Scalars['Int']>,
};

export type CrmPhaserShot = {
   __typename?: 'CrmPhaserShot',
  target?: Maybe<Coordinates>,
  destination?: Maybe<Coordinates>,
};

export type CrmTorpedo = {
   __typename?: 'CrmTorpedo',
  id?: Maybe<Scalars['ID']>,
  position?: Maybe<Coordinates>,
  destroyed?: Maybe<Scalars['Boolean']>,
};

export type Damage = {
   __typename?: 'Damage',
  damaged?: Maybe<Scalars['Boolean']>,
  destroyed?: Maybe<Scalars['Boolean']>,
  report?: Maybe<Scalars['String']>,
  reportSteps?: Maybe<Array<Maybe<DamageReportStep>>>,
  requested?: Maybe<Scalars['Boolean']>,
  reactivationCode?: Maybe<Scalars['String']>,
  neededReactivationCode?: Maybe<Scalars['String']>,
  currentStep?: Maybe<Scalars['Int']>,
  validate?: Maybe<Scalars['Boolean']>,
  which?: Maybe<Damage_Types>,
  taskReportDamage?: Maybe<Scalars['Boolean']>,
};

export enum Damage_Step_Types {
  Required = 'required',
  Optional = 'optional'
}

export enum Damage_Types {
  Default = 'default',
  Rnd = 'rnd',
  Engineering = 'engineering'
}

export type DamageReportStep = {
   __typename?: 'DamageReportStep',
  id?: Maybe<Scalars['ID']>,
  text?: Maybe<Scalars['String']>,
  validate?: Maybe<Scalars['Boolean']>,
  validated?: Maybe<Scalars['Boolean']>,
};

export type DamageStep = {
   __typename?: 'DamageStep',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  args?: Maybe<DamageStepArgs>,
};

export type DamageStepArgs = {
   __typename?: 'DamageStepArgs',
  end?: Maybe<Scalars['Boolean']>,
  cleanup?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
  orders?: Maybe<Scalars['String']>,
  room?: Maybe<Scalars['String']>,
  preamble?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  message?: Maybe<Scalars['String']>,
  code?: Maybe<Scalars['String']>,
  backup?: Maybe<Scalars['String']>,
  inventory?: Maybe<Scalars['String']>,
  destination?: Maybe<Scalars['String']>,
  equipment?: Maybe<Scalars['String']>,
  query?: Maybe<Scalars['String']>,
  reactivate?: Maybe<Scalars['Boolean']>,
};

export type DamageStepArgsInput = {
  end?: Maybe<Scalars['Boolean']>,
  cleanup?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
  orders?: Maybe<Scalars['String']>,
  room?: Maybe<Scalars['String']>,
  preamble?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  message?: Maybe<Scalars['String']>,
  code?: Maybe<Scalars['String']>,
  backup?: Maybe<Scalars['String']>,
  inventory?: Maybe<Scalars['String']>,
  destination?: Maybe<Scalars['String']>,
  equipment?: Maybe<Scalars['String']>,
  query?: Maybe<Scalars['String']>,
  reactivate?: Maybe<Scalars['Boolean']>,
};

export type DamageStepInput = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  args?: Maybe<DamageStepArgsInput>,
  type?: Maybe<Damage_Step_Types>,
};

export type DamageTask = {
   __typename?: 'DamageTask',
  id?: Maybe<Scalars['ID']>,
  taskTemplate?: Maybe<TaskTemplate>,
  required?: Maybe<Scalars['Boolean']>,
  nextSteps?: Maybe<Array<Maybe<TaskTemplate>>>,
};

export type DamageTaskInput = {
  id?: Maybe<Scalars['ID']>,
  required?: Maybe<Scalars['Boolean']>,
  nextSteps?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export type Deck = {
   __typename?: 'Deck',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  number?: Maybe<Scalars['Int']>,
  svgPath?: Maybe<Scalars['String']>,
  doors?: Maybe<Scalars['Boolean']>,
  evac?: Maybe<Scalars['Boolean']>,
  rooms?: Maybe<Array<Maybe<Room>>>,
  hallway?: Maybe<Scalars['String']>,
  crewCount?: Maybe<Scalars['Int']>,
  environment?: Maybe<Environment>,
};

export type DirectionInput = {
  x?: Maybe<Scalars['Float']>,
  y?: Maybe<Scalars['Float']>,
  z?: Maybe<Scalars['Float']>,
};

export enum DmxChannelProperty {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Amber = 'amber',
  White = 'white',
  Uv = 'uv',
  Intensity = 'intensity',
  Strobe = 'strobe',
  Generic = 'generic',
  Nothing = 'nothing'
}

export type DmxConfig = {
   __typename?: 'DMXConfig',
  id: Scalars['ID'],
  name: Scalars['String'],
  config: Scalars['JSON'],
  actionStrength: Scalars['Float'],
};

export type DmxDevice = {
   __typename?: 'DMXDevice',
  id: Scalars['ID'],
  class: Scalars['String'],
  name: Scalars['String'],
  channels: Array<DmxChannelProperty>,
};

export type DmxFixture = {
   __typename?: 'DMXFixture',
  id: Scalars['ID'],
  class: Scalars['String'],
  name: Scalars['String'],
  clientId?: Maybe<Scalars['String']>,
  DMXDeviceId: Scalars['String'],
  DMXDevice: DmxDevice,
  simulatorId: Scalars['String'],
  channel: Scalars['Int'],
  mode: DmxFixtureMode,
  tags: Array<Scalars['String']>,
  passiveChannels: DmxPassiveChannels,
};

export enum DmxFixtureMode {
  Active = 'active',
  Passive = 'passive'
}

export type DmxPassiveChannels = {
   __typename?: 'DMXPassiveChannels',
  amber?: Maybe<Scalars['Float']>,
  white?: Maybe<Scalars['Float']>,
  uv?: Maybe<Scalars['Float']>,
  intensity?: Maybe<Scalars['Float']>,
  strobe?: Maybe<Scalars['Float']>,
  generic?: Maybe<Scalars['Float']>,
  nothing?: Maybe<Scalars['Float']>,
  color?: Maybe<Scalars['String']>,
};

export type DmxPassiveChannelsInput = {
  amber?: Maybe<Scalars['Float']>,
  white?: Maybe<Scalars['Float']>,
  uv?: Maybe<Scalars['Float']>,
  intensity?: Maybe<Scalars['Float']>,
  strobe?: Maybe<Scalars['Float']>,
  generic?: Maybe<Scalars['Float']>,
  nothing?: Maybe<Scalars['Float']>,
  color?: Maybe<Scalars['String']>,
};

export type DmxSet = {
   __typename?: 'DMXSet',
  id: Scalars['ID'],
  name: Scalars['String'],
  fixtureIds: Array<Scalars['String']>,
  fixtures: Array<DmxFixture>,
};

export enum Docking_Direction {
  Unspecified = 'unspecified',
  Arriving = 'arriving',
  Departing = 'departing'
}

export enum Docking_Types {
  Shuttlebay = 'shuttlebay',
  Dockingport = 'dockingport',
  Specialized = 'specialized'
}

export type DockingPort = {
   __typename?: 'DockingPort',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  shipName?: Maybe<Scalars['String']>,
  type?: Maybe<Docking_Types>,
  clamps?: Maybe<Scalars['Boolean']>,
  compress?: Maybe<Scalars['Boolean']>,
  doors?: Maybe<Scalars['Boolean']>,
  image?: Maybe<Scalars['String']>,
  docked?: Maybe<Scalars['Boolean']>,
  damage?: Maybe<Damage>,
  direction?: Maybe<Docking_Direction>,
  position?: Maybe<Coordinates>,
  deck?: Maybe<Deck>,
  inventory?: Maybe<Array<Maybe<InventoryItem>>>,
};

export type DockingPortInput = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  shipName?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  clamps?: Maybe<Scalars['Boolean']>,
  compress?: Maybe<Scalars['Boolean']>,
  doors?: Maybe<Scalars['Boolean']>,
  image?: Maybe<Scalars['String']>,
  docked?: Maybe<Scalars['Boolean']>,
  direction?: Maybe<Docking_Direction>,
  position?: Maybe<CoordinatesInput>,
  deckId?: Maybe<Scalars['ID']>,
};

export type Engine = SystemInterface & {
   __typename?: 'Engine',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  power?: Maybe<Power>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  speeds?: Maybe<Array<Maybe<Speed>>>,
  speed?: Maybe<Scalars['Int']>,
  previousSpeed?: Maybe<Scalars['Int']>,
  velocity?: Maybe<Scalars['Float']>,
  speedFactor?: Maybe<Scalars['Float']>,
  acceleration?: Maybe<Scalars['Float']>,
  useAcceleration?: Maybe<Scalars['Boolean']>,
  heat?: Maybe<Scalars['Float']>,
  damage?: Maybe<Damage>,
  on?: Maybe<Scalars['Boolean']>,
  coolant?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
};

export type EngineComponent = {
   __typename?: 'EngineComponent',
  maxSpeed?: Maybe<Scalars['Float']>,
  currentSpeed?: Maybe<Scalars['Float']>,
  heat?: Maybe<Scalars['Float']>,
  heatRate?: Maybe<Scalars['Float']>,
  coolant?: Maybe<Scalars['Float']>,
  cooling?: Maybe<Scalars['Boolean']>,
};

export type EntitiesLocationInput = {
  id: Scalars['ID'],
  position: EntityCoordinatesInput,
};

export type Entity = {
   __typename?: 'Entity',
  id: Scalars['ID'],
  interval?: Maybe<Scalars['Int']>,
  reset?: Maybe<Scalars['Boolean']>,
  appearance?: Maybe<AppearanceComponent>,
  behavior?: Maybe<BehaviorComponent>,
  identity?: Maybe<IdentityComponent>,
  location?: Maybe<LocationComponent>,
  stage?: Maybe<StageComponent>,
  stageChild?: Maybe<StageChildComponent>,
  light?: Maybe<LightComponent>,
  glow?: Maybe<GlowComponent>,
  template?: Maybe<TemplateComponent>,
  enginesWarp?: Maybe<EngineComponent>,
  enginesImpulse?: Maybe<EngineComponent>,
  thrusters?: Maybe<ThrustersComponent>,
};

export type EntityCoordinates = {
   __typename?: 'EntityCoordinates',
  x: Scalars['Float'],
  y: Scalars['Float'],
  z: Scalars['Float'],
};

export type EntityCoordinatesInput = {
  x: Scalars['Float'],
  y: Scalars['Float'],
  z: Scalars['Float'],
};

export enum EntityEngineEnum {
  Warp = 'warp',
  Impulse = 'impulse'
}

export type Environment = {
   __typename?: 'Environment',
  id?: Maybe<Scalars['ID']>,
  oxygen?: Maybe<Scalars['Float']>,
  nitrogen?: Maybe<Scalars['Float']>,
  trace?: Maybe<Scalars['Float']>,
  pressure?: Maybe<Scalars['Float']>,
  temperature?: Maybe<Scalars['Float']>,
  humidity?: Maybe<Scalars['Float']>,
  gravity?: Maybe<Scalars['Float']>,
};

export type EnvironmentInput = {
  id?: Maybe<Scalars['ID']>,
  oxygen?: Maybe<Scalars['Float']>,
  nitrogen?: Maybe<Scalars['Float']>,
  trace?: Maybe<Scalars['Float']>,
  pressure?: Maybe<Scalars['Float']>,
  temperature?: Maybe<Scalars['Float']>,
  humidity?: Maybe<Scalars['Float']>,
  gravity?: Maybe<Scalars['Float']>,
};

export type EquipmentInput = {
  id?: Maybe<Scalars['ID']>,
  count?: Maybe<Scalars['Int']>,
};

export type Exocomp = {
   __typename?: 'Exocomp',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  class?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  completion?: Maybe<Scalars['Float']>,
  parts?: Maybe<Array<Maybe<Scalars['String']>>>,
  destination?: Maybe<System>,
  logs?: Maybe<Array<Maybe<ExocompLog>>>,
  difficulty?: Maybe<Scalars['Float']>,
  damage?: Maybe<Damage>,
};

export type ExocompInput = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  parts?: Maybe<Array<Maybe<Scalars['String']>>>,
  destination?: Maybe<Scalars['ID']>,
  upgrade?: Maybe<Scalars['Boolean']>,
};

export type ExocompLog = {
   __typename?: 'ExocompLog',
  timestamp?: Maybe<Scalars['Float']>,
  message?: Maybe<Scalars['String']>,
};

export type ExternalMission = {
   __typename?: 'ExternalMission',
  title?: Maybe<Scalars['String']>,
  author?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['String']>,
};

export type Externals = {
   __typename?: 'Externals',
  simulators?: Maybe<Array<Maybe<ExternalSimulator>>>,
  missions?: Maybe<Array<Maybe<ExternalMission>>>,
};

export type ExternalSimulator = {
   __typename?: 'ExternalSimulator',
  title?: Maybe<Scalars['String']>,
  author?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['String']>,
};

export type Flight = {
   __typename?: 'Flight',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['String']>,
  running?: Maybe<Scalars['Boolean']>,
  timelineStep?: Maybe<Scalars['Int']>,
  simulators?: Maybe<Array<Maybe<Simulator>>>,
  flightType?: Maybe<Scalars['String']>,
  transmitted?: Maybe<Scalars['Boolean']>,
  clients?: Maybe<Array<Maybe<SpaceEdventuresClient>>>,
};

export type FlightType = {
   __typename?: 'FlightType',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  flightHours?: Maybe<Scalars['Float']>,
  classHours?: Maybe<Scalars['Float']>,
};

export type FormFields = {
   __typename?: 'FormFields',
  id?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  options?: Maybe<Array<Maybe<FormOptions>>>,
  value?: Maybe<Scalars['String']>,
  max?: Maybe<Scalars['Int']>,
  min?: Maybe<Scalars['Int']>,
};

export type FormFieldsInput = {
  id?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  options?: Maybe<Array<Maybe<FormOptionsInput>>>,
  value?: Maybe<Scalars['String']>,
  max?: Maybe<Scalars['Int']>,
  min?: Maybe<Scalars['Int']>,
};

export type FormOptions = {
   __typename?: 'FormOptions',
  id?: Maybe<Scalars['ID']>,
  label?: Maybe<Scalars['String']>,
};

export type FormOptionsInput = {
  id?: Maybe<Scalars['ID']>,
  label?: Maybe<Scalars['String']>,
};

export type FormResults = {
   __typename?: 'FormResults',
  client?: Maybe<Scalars['String']>,
  station?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  form?: Maybe<Array<Maybe<FormFields>>>,
};

export type FormResultsInput = {
  client?: Maybe<Scalars['String']>,
  form?: Maybe<Array<Maybe<FormFieldsInput>>>,
};

export type GlowComponent = {
   __typename?: 'GlowComponent',
  glowMode?: Maybe<GlowModeEnum>,
  color?: Maybe<Scalars['String']>,
};

export enum GlowModeEnum {
  Glow = 'glow',
  Halo = 'halo',
  Shell = 'shell'
}

export type GoogleSheet = {
   __typename?: 'GoogleSheet',
  id?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
};

export type GoogleSheetFile = {
   __typename?: 'GoogleSheetFile',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
};

export type GoogleSheets = {
   __typename?: 'GoogleSheets',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
};

export type GoogleSpreadsheet = {
   __typename?: 'GoogleSpreadsheet',
  id?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
  sheets?: Maybe<Array<Maybe<GoogleSheet>>>,
};

export type History = {
   __typename?: 'History',
  date?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
};

export type IdentityComponent = {
   __typename?: 'IdentityComponent',
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
};

export type Interface = {
   __typename?: 'Interface',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  templateId?: Maybe<Scalars['ID']>,
  deviceType?: Maybe<InterfaceDevice>,
  name?: Maybe<Scalars['String']>,
  components?: Maybe<Scalars['JSON']>,
  connections?: Maybe<Scalars['JSON']>,
  values?: Maybe<Scalars['JSON']>,
  config?: Maybe<Scalars['JSON']>,
};

export type InterfaceDevice = {
   __typename?: 'InterfaceDevice',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  width?: Maybe<Scalars['Int']>,
  height?: Maybe<Scalars['Int']>,
  isLandscape?: Maybe<Scalars['Boolean']>,
};

export type InternalComm = SystemInterface & {
   __typename?: 'InternalComm',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  power?: Maybe<Power>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  state?: Maybe<Scalars['String']>,
  outgoing?: Maybe<Scalars['String']>,
  incoming?: Maybe<Scalars['String']>,
  damage?: Maybe<Damage>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
};

export type InventoryCount = {
  inventory?: Maybe<Scalars['ID']>,
  count?: Maybe<Scalars['Int']>,
};

export type InventoryCountInput = {
  id?: Maybe<Scalars['ID']>,
  count?: Maybe<Scalars['Int']>,
};

export type InventoryItem = {
   __typename?: 'InventoryItem',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  count?: Maybe<Scalars['Int']>,
  metadata?: Maybe<InventoryMetadata>,
  roomCount?: Maybe<Array<Maybe<RoomCount>>>,
  teamCount?: Maybe<Array<Maybe<TeamCount>>>,
};

export type InventoryItemInput = {
  simulatorId?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  metadata?: Maybe<InventoryMetadataInput>,
  roomCount?: Maybe<Array<Maybe<RoomCountInput>>>,
  crewCount?: Maybe<Array<Maybe<CrewCountInput>>>,
};

export type InventoryLog = {
   __typename?: 'InventoryLog',
  timestamp?: Maybe<Scalars['String']>,
  log?: Maybe<Scalars['String']>,
};

export type InventoryMetadata = {
   __typename?: 'InventoryMetadata',
  type?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  science?: Maybe<Scalars['Boolean']>,
  defense?: Maybe<Scalars['Boolean']>,
};

export type InventoryMetadataInput = {
  type?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  science?: Maybe<Scalars['Boolean']>,
  defense?: Maybe<Scalars['Boolean']>,
};

export type Isochip = {
   __typename?: 'Isochip',
  id?: Maybe<Scalars['ID']>,
  system?: Maybe<System>,
  simulator?: Maybe<Simulator>,
  slot?: Maybe<Scalars['Int']>,
  requiredChip?: Maybe<Scalars['Int']>,
  chip?: Maybe<Scalars['Int']>,
  label?: Maybe<Scalars['String']>,
  state?: Maybe<Isochip_States>,
};

export enum Isochip_States {
  Empty = 'empty',
  Diagnostic = 'diagnostic',
  Nominal = 'nominal',
  Invalid = 'invalid'
}

export type IsochipInput = {
  system?: Maybe<Scalars['ID']>,
  simulator?: Maybe<Scalars['ID']>,
  slot?: Maybe<Scalars['Int']>,
  requiredChip?: Maybe<Scalars['Int']>,
  chip?: Maybe<Scalars['Int']>,
  label?: Maybe<Scalars['String']>,
};


export type JumpDrive = SystemInterface & {
   __typename?: 'JumpDrive',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  power?: Maybe<Power>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  damage?: Maybe<Damage>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  sectors?: Maybe<JumpDriveSectors>,
  env?: Maybe<Scalars['Float']>,
  activated?: Maybe<Scalars['Boolean']>,
  stress?: Maybe<Scalars['Float']>,
  enabled?: Maybe<Scalars['Boolean']>,
  ringsExtended?: Maybe<Scalars['Boolean']>,
};

export type JumpDriveSector = {
   __typename?: 'JumpDriveSector',
  level?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Float']>,
};

export type JumpDriveSectors = {
   __typename?: 'JumpDriveSectors',
  fore?: Maybe<JumpDriveSector>,
  aft?: Maybe<JumpDriveSector>,
  starboard?: Maybe<JumpDriveSector>,
  port?: Maybe<JumpDriveSector>,
};

export type Keyboard = {
   __typename?: 'Keyboard',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  keys?: Maybe<Array<Maybe<KeyboardKey>>>,
};

export type KeyboardKey = {
   __typename?: 'KeyboardKey',
  id: Scalars['ID'],
  key?: Maybe<Scalars['String']>,
  keyCode?: Maybe<Scalars['String']>,
  meta?: Maybe<Array<Maybe<Scalars['String']>>>,
  actions?: Maybe<Array<Maybe<MacroAction>>>,
};

export type KeyboardKeyInput = {
  id?: Maybe<Scalars['ID']>,
  key?: Maybe<Scalars['String']>,
  keyCode?: Maybe<Scalars['String']>,
  meta?: Maybe<Array<Maybe<Scalars['String']>>>,
  actions?: Maybe<Array<Maybe<ActionInput>>>,
};

export type Keypad = {
   __typename?: 'Keypad',
  id?: Maybe<Scalars['ID']>,
  label?: Maybe<Scalars['String']>,
  code?: Maybe<Array<Maybe<Scalars['Int']>>>,
  enteredCode?: Maybe<Array<Maybe<Scalars['Int']>>>,
  codeLength?: Maybe<Scalars['Int']>,
  giveHints?: Maybe<Scalars['Boolean']>,
  allowedAttempts?: Maybe<Scalars['Int']>,
  attempts?: Maybe<Scalars['Int']>,
  locked?: Maybe<Scalars['Boolean']>,
};

export type LibraryCategory = {
   __typename?: 'LibraryCategory',
  name?: Maybe<Scalars['String']>,
  entries?: Maybe<Array<Maybe<LibraryEntry>>>,
};

export type LibraryEntry = {
   __typename?: 'LibraryEntry',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  categories?: Maybe<Array<Maybe<Scalars['String']>>>,
  seeAlso?: Maybe<Array<Maybe<LibraryEntry>>>,
  font?: Maybe<Scalars['String']>,
};

export type LibraryInput = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  categories?: Maybe<Array<Maybe<Scalars['String']>>>,
  seeAlso?: Maybe<Array<Maybe<Scalars['ID']>>>,
  font?: Maybe<Scalars['String']>,
};

export type LightComponent = {
   __typename?: 'LightComponent',
  intensity?: Maybe<Scalars['Float']>,
  decay?: Maybe<Scalars['Float']>,
  color?: Maybe<Scalars['String']>,
};

export type Lighting = {
   __typename?: 'Lighting',
  intensity: Scalars['Float'],
  action: Lighting_Action,
  actionStrength: Scalars['Float'],
  transitionDuration: Scalars['Int'],
  useAlertColor?: Maybe<Scalars['Boolean']>,
  color?: Maybe<Scalars['String']>,
  dmxConfig?: Maybe<DmxConfig>,
};

export enum Lighting_Action {
  Normal = 'normal',
  Darken = 'darken',
  Blackout = 'blackout',
  Work = 'work',
  Fade = 'fade',
  Shake = 'shake',
  Strobe = 'strobe',
  Oscillate = 'oscillate'
}

export type LightingInput = {
  intensity?: Maybe<Scalars['Float']>,
  action?: Maybe<Lighting_Action>,
  actionStrength?: Maybe<Scalars['Float']>,
  transitionDuration?: Maybe<Scalars['Int']>,
  useAlertColor?: Maybe<Scalars['Boolean']>,
  color?: Maybe<Scalars['String']>,
  dmxConfig?: Maybe<Scalars['String']>,
};

export type Location = Deck | Room;

export type LocationComponent = {
   __typename?: 'LocationComponent',
  inert: Scalars['Boolean'],
  position: EntityCoordinates,
  velocity: EntityCoordinates,
  acceleration: EntityCoordinates,
  rotation: Quaternion,
  rotationVelocity: EntityCoordinates,
  rotationAcceleration: EntityCoordinates,
};

export type Log = {
   __typename?: 'Log',
  id?: Maybe<Scalars['ID']>,
  clientId?: Maybe<Scalars['ID']>,
  flightId?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  timestamp?: Maybe<Scalars['String']>,
  log?: Maybe<Scalars['String']>,
};

export type LogInput = {
  clientId?: Maybe<Scalars['ID']>,
  flightId?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  timestamp?: Maybe<Scalars['String']>,
  log?: Maybe<Scalars['String']>,
};

export type LongRangeCommInput = {
  id?: Maybe<Scalars['ID']>,
  interception?: Maybe<Scalars['Boolean']>,
  locked?: Maybe<Scalars['Boolean']>,
  decoded?: Maybe<Scalars['Boolean']>,
};

export type LrCommunications = SystemInterface & {
   __typename?: 'LRCommunications',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  power?: Maybe<Power>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  damage?: Maybe<Damage>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  messages?: Maybe<Array<Maybe<LrMessage>>>,
  satellites?: Maybe<Scalars['Int']>,
  interception?: Maybe<Scalars['Boolean']>,
  locked?: Maybe<Scalars['Boolean']>,
  decoded?: Maybe<Scalars['Boolean']>,
  difficulty?: Maybe<Scalars['Int']>,
  presetMessages?: Maybe<Array<Maybe<PresetAnswer>>>,
};


export type LrCommunicationsMessagesArgs = {
  crew?: Maybe<Scalars['Boolean']>,
  sent?: Maybe<Scalars['Boolean']>,
  approved?: Maybe<Scalars['Boolean']>
};

export type LrMessage = {
   __typename?: 'LRMessage',
  id?: Maybe<Scalars['ID']>,
  message?: Maybe<Scalars['String']>,
  decodedMessage?: Maybe<Scalars['String']>,
  crew?: Maybe<Scalars['Boolean']>,
  sent?: Maybe<Scalars['Boolean']>,
  deleted?: Maybe<Scalars['Boolean']>,
  encrypted?: Maybe<Scalars['Boolean']>,
  approved?: Maybe<Scalars['Boolean']>,
  sender?: Maybe<Scalars['String']>,
  datestamp?: Maybe<Scalars['String']>,
  timestamp?: Maybe<Scalars['String']>,
  a?: Maybe<Scalars['Int']>,
  f?: Maybe<Scalars['Int']>,
  ra?: Maybe<Scalars['Int']>,
  rf?: Maybe<Scalars['Int']>,
};

export type Macro = {
   __typename?: 'Macro',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  actions?: Maybe<Array<Maybe<MacroAction>>>,
};

export type MacroAction = {
   __typename?: 'MacroAction',
  id: Scalars['ID'],
  event: Scalars['String'],
  args: Scalars['String'],
  delay?: Maybe<Scalars['Int']>,
  needsConfig?: Maybe<Scalars['Boolean']>,
  noCancelOnReset?: Maybe<Scalars['Boolean']>,
};

export type MacroButton = {
   __typename?: 'MacroButton',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  actions?: Maybe<Array<Maybe<MacroAction>>>,
  color?: Maybe<NotifyColors>,
  category?: Maybe<Scalars['String']>,
};

export type MacroButtonConfig = {
   __typename?: 'MacroButtonConfig',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  buttons?: Maybe<Array<Maybe<MacroButton>>>,
};

export type MacroInput = {
  stepId?: Maybe<Scalars['ID']>,
  event?: Maybe<Scalars['String']>,
  args?: Maybe<Scalars['String']>,
  delay?: Maybe<Scalars['Int']>,
  noCancelOnReset?: Maybe<Scalars['Boolean']>,
};

export enum MeshTypeEnum {
  Sphere = 'sphere',
  Cube = 'cube',
  Model = 'model',
  Sprite = 'sprite',
  Planet = 'planet',
  Star = 'star'
}

export type Message = {
   __typename?: 'Message',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  destination?: Maybe<Scalars['String']>,
  sender?: Maybe<Scalars['String']>,
  timestamp?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
};

export type MessageInput = {
  simulatorId?: Maybe<Scalars['ID']>,
  destination?: Maybe<Scalars['String']>,
  sender?: Maybe<Scalars['String']>,
  timestamp?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
};

export enum MidiActionMode {
  Macro = 'macro',
  MomentaryMacro = 'momentaryMacro',
  Toggle = 'toggle',
  ValueAssignment = 'valueAssignment'
}

export type MidiControl = {
   __typename?: 'MidiControl',
  id?: Maybe<Scalars['ID']>,
  channel?: Maybe<Scalars['Int']>,
  messageType?: Maybe<MidiMessageType>,
  key?: Maybe<Scalars['Int']>,
  controllerNumber?: Maybe<Scalars['Int']>,
  channelModeMessage?: Maybe<ChannelModeMessageType>,
  actionMode?: Maybe<MidiActionMode>,
  config?: Maybe<Scalars['JSON']>,
};

export type MidiControlInput = {
  channel?: Maybe<Scalars['Int']>,
  messageType?: Maybe<MidiMessageType>,
  key?: Maybe<Scalars['Int']>,
  controllerNumber?: Maybe<Scalars['Int']>,
  channelModeMessage?: Maybe<ChannelModeMessageType>,
  actionMode?: Maybe<MidiActionMode>,
  config?: Maybe<Scalars['JSON']>,
};

export enum MidiMessageType {
  Noteoff = 'noteoff',
  Noteon = 'noteon',
  Keypressure = 'keypressure',
  Controlchange = 'controlchange',
  Programchange = 'programchange',
  Channelpressure = 'channelpressure',
  Pitchbendchange = 'pitchbendchange'
}

export type MidiSet = {
   __typename?: 'MidiSet',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  deviceName?: Maybe<Scalars['String']>,
  controls?: Maybe<Array<Maybe<MidiControl>>>,
};

export type Mission = {
   __typename?: 'Mission',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>,
  timeline: Array<TimelineStep>,
  simulators?: Maybe<Array<Maybe<Simulator>>>,
  aux?: Maybe<Scalars['Boolean']>,
  extraRequirements?: Maybe<SimulatorCapabilities>,
  requirements?: Maybe<SimulatorCapabilities>,
};


export type MissionRequirementsArgs = {
  all?: Maybe<Scalars['Boolean']>
};

export type Motu = {
   __typename?: 'Motu',
  id?: Maybe<Scalars['ID']>,
  offline?: Maybe<Scalars['Boolean']>,
  address?: Maybe<Scalars['String']>,
  inputs?: Maybe<Array<Maybe<MotuInput>>>,
  outputs?: Maybe<Array<Maybe<MotuOutput>>>,
  sends?: Maybe<Array<Maybe<MotuPatch>>>,
};

export type MotuChannel = {
   __typename?: 'MotuChannel',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  chan?: Maybe<Scalars['Int']>,
  type?: Maybe<MotuType>,
  fader?: Maybe<Scalars['Float']>,
  mute?: Maybe<Scalars['Int']>,
};

export type MotuChannelInput = {
  fader?: Maybe<Scalars['Float']>,
  mute?: Maybe<Scalars['Int']>,
};

export type MotuComp = {
   __typename?: 'MotuComp',
  enable?: Maybe<Scalars['Float']>,
  release?: Maybe<Scalars['Float']>,
  makeup?: Maybe<Scalars['Float']>,
  trim?: Maybe<Scalars['Float']>,
  peak?: Maybe<Scalars['Float']>,
  attack?: Maybe<Scalars['Float']>,
  ratio?: Maybe<Scalars['Float']>,
  threshold?: Maybe<Scalars['Float']>,
};

export type MotuEq = {
   __typename?: 'MotuEQ',
  enable?: Maybe<Scalars['Int']>,
  freq?: Maybe<Scalars['Float']>,
  gain?: Maybe<Scalars['Float']>,
  bw?: Maybe<Scalars['Float']>,
  mode?: Maybe<Scalars['Int']>,
};

export type MotuGate = {
   __typename?: 'MotuGate',
  release?: Maybe<Scalars['Float']>,
  enable?: Maybe<Scalars['Int']>,
  attack?: Maybe<Scalars['Float']>,
  threshold?: Maybe<Scalars['Float']>,
};

export type MotuInput = {
   __typename?: 'MotuInput',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  chan?: Maybe<Scalars['Int']>,
  type?: Maybe<MotuType>,
  gate?: Maybe<MotuGate>,
  comp?: Maybe<MotuComp>,
  fader?: Maybe<Scalars['Float']>,
  mute?: Maybe<Scalars['Int']>,
  pan?: Maybe<Scalars['Float']>,
  highshelf?: Maybe<MotuEq>,
  mid1?: Maybe<MotuEq>,
  mid2?: Maybe<MotuEq>,
  lowshelf?: Maybe<MotuEq>,
};

export type MotuOutput = {
   __typename?: 'MotuOutput',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  chan?: Maybe<Scalars['Int']>,
  type?: Maybe<MotuType>,
  prefader?: Maybe<Scalars['Float']>,
  fader?: Maybe<Scalars['Float']>,
  mute?: Maybe<Scalars['Int']>,
  panner?: Maybe<Scalars['Float']>,
  highshelf?: Maybe<MotuEq>,
  mid1?: Maybe<MotuEq>,
  mid2?: Maybe<MotuEq>,
  lowshelf?: Maybe<MotuEq>,
};

export type MotuPatch = {
   __typename?: 'MotuPatch',
  input?: Maybe<MotuInput>,
  output?: Maybe<MotuOutput>,
  send?: Maybe<Scalars['Float']>,
  mute?: Maybe<Scalars['Boolean']>,
};

export enum MotuType {
  Chan = 'chan',
  Aux = 'aux',
  Group = 'group'
}

export type Mutation = {
   __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
  entitySetAppearance?: Maybe<Scalars['String']>,
  entityRemoveAppearance?: Maybe<Scalars['String']>,
  entitySetBehavior?: Maybe<Scalars['String']>,
  entityRemoveBehavior?: Maybe<Scalars['String']>,
  entitySetIdentity?: Maybe<Scalars['String']>,
  entityRemoveIdentity?: Maybe<Scalars['String']>,
  entitySetLocation?: Maybe<Scalars['String']>,
  entitiesSetPosition?: Maybe<Scalars['String']>,
  entitySetRotationVelocityMagnitude?: Maybe<Scalars['String']>,
  entityRemoveLocation?: Maybe<Scalars['String']>,
  entitySetStage?: Maybe<Scalars['String']>,
  entityRemoveStage?: Maybe<Scalars['String']>,
  entitySetStageChild?: Maybe<Scalars['String']>,
  entityRemoveStageChild?: Maybe<Scalars['String']>,
  entitySetLight?: Maybe<Scalars['String']>,
  entityRemoveLight?: Maybe<Scalars['String']>,
  entitySetGlow?: Maybe<Scalars['String']>,
  entityRemoveGlow?: Maybe<Scalars['String']>,
  entitySetTemplate?: Maybe<Scalars['String']>,
  entitySetEngine?: Maybe<Scalars['String']>,
  entityRemoveEngine?: Maybe<Scalars['String']>,
  entitySetThrusters?: Maybe<Scalars['String']>,
  entityRemoveThrusters?: Maybe<Scalars['String']>,
  triggerAction?: Maybe<Scalars['String']>,
  addSimulatorAmbiance?: Maybe<Scalars['String']>,
  updateSimulatorAmbiance?: Maybe<Scalars['String']>,
  removeSimulatorAmbiance?: Maybe<Scalars['String']>,
  setStationAmbiance?: Maybe<Scalars['String']>,
  addAssetFolder?: Maybe<Scalars['String']>,
  removeAssetFolder?: Maybe<Scalars['String']>,
  removeAssetObject?: Maybe<Scalars['String']>,
  downloadRemoteAssets?: Maybe<Scalars['String']>,
  clientConnect?: Maybe<Scalars['String']>,
  clientDisconnect?: Maybe<Scalars['String']>,
  clientPing?: Maybe<Scalars['String']>,
  clientSetFlight?: Maybe<Scalars['String']>,
  clientSetSimulator?: Maybe<Scalars['String']>,
  clientSetStation?: Maybe<Scalars['String']>,
  clientLogin?: Maybe<Scalars['String']>,
  clientSetEmail?: Maybe<Scalars['String']>,
  clientLogout?: Maybe<Scalars['String']>,
  clientDiagnostic?: Maybe<Scalars['String']>,
  clientReset?: Maybe<Scalars['String']>,
  clientLockScreen?: Maybe<Scalars['String']>,
  clientUnlockScreen?: Maybe<Scalars['String']>,
  clientOfflineState?: Maybe<Scalars['String']>,
  clientMovieState?: Maybe<Scalars['String']>,
  clientSetTraining?: Maybe<Scalars['String']>,
  clientSetSoundPlayer?: Maybe<Scalars['String']>,
  clientActivateLights?: Maybe<Scalars['String']>,
  clientAddCache?: Maybe<Scalars['String']>,
  clientRemoveCache?: Maybe<Scalars['String']>,
  setClientHypercard?: Maybe<Scalars['String']>,
  playSound?: Maybe<Scalars['String']>,
  stopAllSounds?: Maybe<Scalars['String']>,
  cancelLoopingSounds?: Maybe<Scalars['String']>,
  applyClientSet?: Maybe<Scalars['String']>,
  setClientOverlay?: Maybe<Scalars['String']>,
  clientCrack?: Maybe<Scalars['String']>,
  clientSetCard?: Maybe<Scalars['String']>,
  setKeypadCode?: Maybe<Scalars['String']>,
  setKeypadEnteredCode?: Maybe<Scalars['String']>,
  setKeypadHint?: Maybe<Scalars['String']>,
  setKeypadLocked?: Maybe<Scalars['String']>,
  resetKeypad?: Maybe<Scalars['String']>,
  setCodeLength?: Maybe<Scalars['String']>,
  setKeypadAllowedAttempts?: Maybe<Scalars['String']>,
  handheldScannerScan?: Maybe<Scalars['String']>,
  handheldScannerCancel?: Maybe<Scalars['String']>,
  handheldScannerResponse?: Maybe<Scalars['String']>,
  addCommandLine?: Maybe<Scalars['String']>,
  renameCommandLine?: Maybe<Scalars['String']>,
  removeCommandLine?: Maybe<Scalars['String']>,
  updateCommandLine?: Maybe<Scalars['String']>,
  executeCommandLine?: Maybe<Scalars['String']>,
  addCommandLineToSimulator?: Maybe<Scalars['String']>,
  removeCommandLineFromSimulator?: Maybe<Scalars['String']>,
  addCommandLineOutput?: Maybe<Scalars['String']>,
  handleCommandLineFeedback?: Maybe<Scalars['String']>,
  addComputerCoreUser?: Maybe<ComputerCoreUser>,
  computerCoreAddHacker?: Maybe<Scalars['String']>,
  updateComputerCoreUser?: Maybe<Scalars['String']>,
  removeComputerCoreUser?: Maybe<Scalars['String']>,
  restoreComputerCoreFile?: Maybe<Scalars['String']>,
  deleteComputerCoreVirus?: Maybe<Scalars['String']>,
  restartComputerCoreTerminal?: Maybe<Scalars['String']>,
  addViriiToComputerCore?: Maybe<Scalars['String']>,
  setCoolantTank?: Maybe<Scalars['String']>,
  transferCoolant?: Maybe<Scalars['String']>,
  ignoreCoreFeed?: Maybe<Scalars['String']>,
  syncTimer?: Maybe<Scalars['String']>,
  updateCoreLayout?: Maybe<Scalars['String']>,
  addCoreLayout?: Maybe<Scalars['String']>,
  removeCoreLayout?: Maybe<Scalars['String']>,
  reorderCoreLayouts?: Maybe<Scalars['String']>,
  addCrewmember?: Maybe<Scalars['String']>,
  removeCrewmember?: Maybe<Scalars['String']>,
  updateCrewmember?: Maybe<Scalars['String']>,
  newRandomCrewmember?: Maybe<Scalars['String']>,
  removeAllCrew?: Maybe<Scalars['String']>,
  crewImport?: Maybe<Scalars['String']>,
  crmSetActivated?: Maybe<Scalars['String']>,
  crmSetPassword?: Maybe<Scalars['String']>,
  crmAddEnemy?: Maybe<Scalars['String']>,
  crmSetAcceleration?: Maybe<Scalars['String']>,
  crmSetPhaserCharge?: Maybe<Scalars['String']>,
  crmSetShieldState?: Maybe<Scalars['String']>,
  crmLoadTorpedo?: Maybe<Scalars['String']>,
  crmFireTorpedo?: Maybe<Scalars['String']>,
  crmFirePhaser?: Maybe<Scalars['String']>,
  crmStopPhaser?: Maybe<Scalars['String']>,
  crmSetFighterDocked?: Maybe<Scalars['String']>,
  crmRestockTorpedos?: Maybe<Scalars['String']>,
  crmSetAttacking?: Maybe<Scalars['String']>,
  crmSetFighterImage?: Maybe<Scalars['String']>,
  crmSetFighterIcon?: Maybe<Scalars['String']>,
  crmSetEnemyIcon?: Maybe<Scalars['String']>,
  crmSetEnemyCount?: Maybe<Scalars['String']>,
  crmRestoreFighter?: Maybe<Scalars['String']>,
  crmDestroyUndockedFighters?: Maybe<Scalars['String']>,
  crmRestoreFighters?: Maybe<Scalars['String']>,
  crmSetFighterStrength?: Maybe<Scalars['String']>,
  crmSetEnemyStrength?: Maybe<Scalars['String']>,
  damageSystem?: Maybe<Scalars['String']>,
  damageReport?: Maybe<Scalars['String']>,
  updateCurrentDamageStep?: Maybe<Scalars['String']>,
  repairSystem?: Maybe<Scalars['String']>,
  requestDamageReport?: Maybe<Scalars['String']>,
  systemReactivationCode?: Maybe<Scalars['String']>,
  systemReactivationCodeResponse?: Maybe<Scalars['String']>,
  addSystemDamageStep?: Maybe<Scalars['String']>,
  updateSystemDamageStep?: Maybe<Scalars['String']>,
  removeSystemDamageStep?: Maybe<Scalars['String']>,
  generateDamageReport?: Maybe<Scalars['String']>,
  addSystemDamageTask?: Maybe<Scalars['String']>,
  removeSystemDamageTask?: Maybe<Scalars['String']>,
  updateSystemDamageTask?: Maybe<Scalars['String']>,
  breakSystem?: Maybe<Scalars['String']>,
  fixSystem?: Maybe<Scalars['String']>,
  setDamageStepValidation?: Maybe<Scalars['String']>,
  validateDamageStep?: Maybe<Scalars['String']>,
  addSimulatorDamageStep?: Maybe<Scalars['String']>,
  updateSimulatorDamageStep?: Maybe<Scalars['String']>,
  removeSimulatorDamageStep?: Maybe<Scalars['String']>,
  addSimulatorDamageTask?: Maybe<Scalars['String']>,
  removeSimulatorDamageTask?: Maybe<Scalars['String']>,
  updateSimulatorDamageTask?: Maybe<Scalars['String']>,
  addDeck?: Maybe<Scalars['String']>,
  removeDeck?: Maybe<Scalars['String']>,
  addDecksBulk?: Maybe<Scalars['String']>,
  updateDeckSvg?: Maybe<Scalars['String']>,
  deckDoors?: Maybe<Scalars['String']>,
  deckEvac?: Maybe<Scalars['String']>,
  updateHallwaySvg?: Maybe<Scalars['String']>,
  createDockingPort?: Maybe<Scalars['String']>,
  updateDockingPort?: Maybe<Scalars['String']>,
  removeDockingPort?: Maybe<Scalars['String']>,
  addSpeed?: Maybe<Scalars['String']>,
  setSpeed?: Maybe<Scalars['String']>,
  setEngineSpeeds?: Maybe<Scalars['String']>,
  addHeat?: Maybe<Scalars['String']>,
  addCoolant?: Maybe<Scalars['String']>,
  setHeatRate?: Maybe<Scalars['String']>,
  engineCool?: Maybe<Scalars['String']>,
  setEngineAcceleration?: Maybe<Scalars['String']>,
  setEngineUseAcceleration?: Maybe<Scalars['String']>,
  setEngineSpeedFactor?: Maybe<Scalars['String']>,
  updateEnvironment?: Maybe<Scalars['String']>,
  setSimulatorExocomps?: Maybe<Scalars['String']>,
  deployExocomp?: Maybe<Scalars['String']>,
  recallExocomp?: Maybe<Scalars['String']>,
  exocompCompleteUpgrade?: Maybe<Scalars['String']>,
  updateExocompDifficulty?: Maybe<Scalars['String']>,
  importSimulatorFromUrl?: Maybe<Scalars['String']>,
  importMissionFromUrl?: Maybe<Scalars['String']>,
  startFlight?: Maybe<Scalars['String']>,
  resetFlight?: Maybe<Scalars['String']>,
  deleteFlight?: Maybe<Scalars['String']>,
  pauseFlight?: Maybe<Scalars['String']>,
  resumeFlight?: Maybe<Scalars['String']>,
  clientAddExtra?: Maybe<Scalars['String']>,
  googleSheetsAuthorize?: Maybe<Scalars['String']>,
  googleSheetsCompleteAuthorize?: Maybe<Scalars['String']>,
  googleSheetsRevoke?: Maybe<Scalars['String']>,
  googleSheetsFileSearch?: Maybe<Array<Maybe<GoogleSheetFile>>>,
  googleSheetsAppendData?: Maybe<Scalars['String']>,
  addInterface?: Maybe<Scalars['String']>,
  renameInterface?: Maybe<Scalars['String']>,
  removeInterface?: Maybe<Scalars['String']>,
  updateInterface?: Maybe<Scalars['String']>,
  addInterfaceToSimulator?: Maybe<Scalars['String']>,
  removeInterfaceFromSimulator?: Maybe<Scalars['String']>,
  addInterfaceDevice?: Maybe<Scalars['String']>,
  renameInterfaceDevice?: Maybe<Scalars['String']>,
  removeInterfaceDevice?: Maybe<Scalars['String']>,
  updateInterfaceDevice?: Maybe<Scalars['String']>,
  triggerInterfaceObject?: Maybe<Scalars['String']>,
  toggleInterfaceObjectHidden?: Maybe<Scalars['String']>,
  toggleInterfaceObjectPlaying?: Maybe<Scalars['String']>,
  internalCommConnectOutgoing?: Maybe<Scalars['String']>,
  internalCommConnectIncoming?: Maybe<Scalars['String']>,
  internalCommCancelIncoming?: Maybe<Scalars['String']>,
  internalCommCancelOutgoing?: Maybe<Scalars['String']>,
  internalCommCallIncoming?: Maybe<Scalars['String']>,
  internalCommCallOutgoing?: Maybe<Scalars['String']>,
  addInventory?: Maybe<Scalars['String']>,
  removeInventory?: Maybe<Scalars['String']>,
  moveInventory?: Maybe<Scalars['String']>,
  updateInventoryCount?: Maybe<Scalars['String']>,
  updateInventoryMetadata?: Maybe<Scalars['String']>,
  updateCrewInventory?: Maybe<Scalars['String']>,
  removeCrewInventory?: Maybe<Scalars['String']>,
  transferCargo?: Maybe<Scalars['String']>,
  insertIsochip?: Maybe<Isochip>,
  updateIsochip?: Maybe<Isochip>,
  batchIsochipUpdate?: Maybe<Array<Maybe<Isochip>>>,
  setJumpdriveActivated?: Maybe<Scalars['String']>,
  setJumpdriveEnvs?: Maybe<Scalars['String']>,
  setJumpdriveSectorLevel?: Maybe<Scalars['String']>,
  setJumpdriveSectorOffset?: Maybe<Scalars['String']>,
  fluxJumpdriveSector?: Maybe<Scalars['String']>,
  setJumpDriveEnabled?: Maybe<Scalars['String']>,
  hitJumpDriveStress?: Maybe<Scalars['String']>,
  setJumpDriveRingsExtended?: Maybe<Scalars['String']>,
  addKeyboard?: Maybe<Scalars['String']>,
  removeKeyboard?: Maybe<Scalars['String']>,
  renameKeyboard?: Maybe<Scalars['String']>,
  updateKeyboardKey?: Maybe<Scalars['String']>,
  triggerKeyboardAction?: Maybe<Scalars['String']>,
  addLibraryEntry?: Maybe<Scalars['String']>,
  updateLibraryEntry?: Maybe<Scalars['String']>,
  removeLibraryEntry?: Maybe<Scalars['String']>,
  importLibraryEntry?: Maybe<Scalars['String']>,
  updateSimulatorLighting?: Maybe<Scalars['String']>,
  dmxSetSimulatorConfig?: Maybe<Scalars['String']>,
  lightingSetIntensity?: Maybe<Scalars['String']>,
  lightingShakeLights?: Maybe<Scalars['String']>,
  lightingFadeLights?: Maybe<Scalars['String']>,
  lightingSetEffect?: Maybe<Scalars['String']>,
  sendLongRangeMessage?: Maybe<Scalars['String']>,
  longRangeMessageSend?: Maybe<Scalars['String']>,
  deleteLongRangeMessage?: Maybe<Scalars['String']>,
  updateLongRangeDecodedMessage?: Maybe<Scalars['String']>,
  updateLongRangeComm?: Maybe<Scalars['String']>,
  approveLongRangeMessage?: Maybe<Scalars['String']>,
  encryptLongRangeMessage?: Maybe<Scalars['String']>,
  setLongRangeSatellites?: Maybe<Scalars['String']>,
  addInterceptionSignal?: Maybe<Scalars['String']>,
  removeInterceptionSignal?: Maybe<Scalars['String']>,
  setInterceptionDifficulty?: Maybe<Scalars['String']>,
  setLongRangePresetMessages?: Maybe<Scalars['String']>,
  addMacro?: Maybe<Scalars['ID']>,
  removeMacro?: Maybe<Scalars['String']>,
  renameMacro?: Maybe<Scalars['String']>,
  duplicateMacro?: Maybe<Scalars['String']>,
  duplicateMacroAction?: Maybe<Scalars['String']>,
  updateMacroActions?: Maybe<Scalars['String']>,
  triggerMacroAction?: Maybe<Scalars['String']>,
  addMacroButtonConfig?: Maybe<Scalars['ID']>,
  removeMacroButtonConfig?: Maybe<Scalars['String']>,
  renameMacroButtonConfig?: Maybe<Scalars['String']>,
  addMacroButton?: Maybe<Scalars['String']>,
  removeMacroButton?: Maybe<Scalars['String']>,
  renameMacroButton?: Maybe<Scalars['String']>,
  setMacroButtonCategory?: Maybe<Scalars['String']>,
  setMacroButtonColor?: Maybe<Scalars['String']>,
  updateMacroButtonActions?: Maybe<Scalars['String']>,
  triggerMacroButton?: Maybe<Scalars['String']>,
  toggleStationMessageGroup?: Maybe<Scalars['String']>,
  sendMessage?: Maybe<Scalars['String']>,
  midiSetCreate?: Maybe<MidiSet>,
  midiSetRename?: Maybe<MidiSet>,
  midiSetRemove?: Maybe<Scalars['Boolean']>,
  midiSetControl?: Maybe<MidiSet>,
  simulatorAddMidiSet?: Maybe<Simulator>,
  simulatorRemoveMidiSet?: Maybe<Simulator>,
  createMission?: Maybe<Scalars['String']>,
  removeMission?: Maybe<Scalars['String']>,
  editMission?: Maybe<Scalars['String']>,
  importMission?: Maybe<Scalars['String']>,
  addTimelineStep?: Maybe<Scalars['ID']>,
  removeTimelineStep?: Maybe<Scalars['String']>,
  reorderTimelineStep?: Maybe<Scalars['String']>,
  updateTimelineStep?: Maybe<Scalars['String']>,
  addTimelineItemToTimelineStep?: Maybe<Scalars['String']>,
  removeTimelineStepItem?: Maybe<Scalars['String']>,
  updateTimelineStepItem?: Maybe<Scalars['String']>,
  duplicateTimelineStep?: Maybe<Scalars['String']>,
  timelineDuplicateItem?: Maybe<Scalars['String']>,
  startAuxTimeline?: Maybe<Scalars['ID']>,
  setAuxTimelineStep?: Maybe<Scalars['String']>,
  missionSetExtraRequirements?: Maybe<Scalars['String']>,
  motuAdd?: Maybe<Scalars['String']>,
  motuRemove?: Maybe<Scalars['String']>,
  motuUpdateChannel?: Maybe<Scalars['String']>,
  motuSetSendMute?: Maybe<Scalars['String']>,
  navCalculateCourse?: Maybe<Scalars['String']>,
  navCancelCalculation?: Maybe<Scalars['String']>,
  navCourseResponse?: Maybe<Scalars['String']>,
  navCourseEntry?: Maybe<Scalars['String']>,
  navToggleCalculate?: Maybe<Scalars['String']>,
  navSetDestinations?: Maybe<Scalars['String']>,
  navSetDestination?: Maybe<Scalars['String']>,
  navSetScanning?: Maybe<Scalars['String']>,
  navSetThrusters?: Maybe<Scalars['String']>,
  navSetPresets?: Maybe<Scalars['String']>,
  addObjective?: Maybe<Scalars['String']>,
  completeObjective?: Maybe<Scalars['String']>,
  objectiveSetCrewComplete?: Maybe<Scalars['String']>,
  addLog?: Maybe<Scalars['String']>,
  chargePhaserBeam?: Maybe<Scalars['String']>,
  dischargePhaserBeam?: Maybe<Scalars['String']>,
  firePhaserBeam?: Maybe<Scalars['String']>,
  stopPhaserBeams?: Maybe<Scalars['String']>,
  coolPhaserBeam?: Maybe<Scalars['String']>,
  phaserArc?: Maybe<Scalars['String']>,
  setPhaserBeamCharge?: Maybe<Scalars['String']>,
  setPhaserBeamHeat?: Maybe<Scalars['String']>,
  setPhaserBeamCount?: Maybe<Scalars['String']>,
  setPhaserHoldToCharge?: Maybe<Scalars['String']>,
  setPhaserChargeSpeed?: Maybe<Scalars['String']>,
  stopChargingPhasers?: Maybe<Scalars['String']>,
  changePower?: Maybe<Scalars['String']>,
  changeSystemPowerLevels?: Maybe<Scalars['String']>,
  changeSystemDefaultPowerLevel?: Maybe<Scalars['String']>,
  fluxSystemPower?: Maybe<Scalars['String']>,
  destroyProbe?: Maybe<Scalars['String']>,
  destroyAllProbes?: Maybe<Scalars['String']>,
  launchProbe?: Maybe<Scalars['String']>,
  fireProbe?: Maybe<Scalars['String']>,
  updateProbeType?: Maybe<Scalars['String']>,
  updateProbeEquipment?: Maybe<Scalars['String']>,
  probeQuery?: Maybe<Scalars['String']>,
  probeQueryResponse?: Maybe<Scalars['String']>,
  probeProcessedData?: Maybe<Scalars['String']>,
  setProbeTorpedo?: Maybe<Scalars['String']>,
  setProbeCharge?: Maybe<Scalars['String']>,
  activateProbeEmitter?: Maybe<Scalars['String']>,
  setRailgunAmmo?: Maybe<Scalars['String']>,
  setRailgunMaxAmmo?: Maybe<Scalars['String']>,
  setRailgunAvailableAmmo?: Maybe<Scalars['String']>,
  fireRailgun?: Maybe<Scalars['String']>,
  loadRailgun?: Maybe<Scalars['String']>,
  reactorEject?: Maybe<Scalars['String']>,
  reactorChangeModel?: Maybe<Scalars['String']>,
  reactorChangeOutput?: Maybe<Scalars['String']>,
  reactorChangeEfficiency?: Maybe<Scalars['String']>,
  reactorBatteryChargeLevel?: Maybe<Scalars['String']>,
  reactorBatteryChargeRate?: Maybe<Scalars['String']>,
  updateDilithiumStress?: Maybe<Scalars['String']>,
  fluxDilithiumStress?: Maybe<Scalars['String']>,
  setReactorEffciciencies?: Maybe<Scalars['String']>,
  setDilithiumStressRate?: Maybe<Scalars['String']>,
  reactorRequireBalance?: Maybe<Scalars['String']>,
  reactorSetHasWings?: Maybe<Scalars['String']>,
  reactorSetWingPower?: Maybe<Scalars['String']>,
  reactorRequestWingPower?: Maybe<Scalars['String']>,
  reactorAckWingRequest?: Maybe<Scalars['String']>,
  recordsCreate?: Maybe<Scalars['String']>,
  recordsCreateSnippet?: Maybe<Scalars['String']>,
  recordsAddToSnippet?: Maybe<Scalars['String']>,
  recordsRemoveFromSnippet?: Maybe<Scalars['String']>,
  recordsDeleteRecord?: Maybe<Scalars['String']>,
  recordsGenerateRecords?: Maybe<RecordSnippet>,
  recordsCreateOnSnippet?: Maybe<RecordSnippet>,
  recordsShowSnippet?: Maybe<RecordSnippet>,
  recordsHideSnippet?: Maybe<RecordSnippet>,
  recordTemplateCreateSnippet?: Maybe<Scalars['String']>,
  recordTemplateAddToSnippet?: Maybe<Scalars['String']>,
  recordTemplateDeleteSnippet?: Maybe<Scalars['String']>,
  recordTemplateRename?: Maybe<Scalars['String']>,
  recordTemplateUpdateRecord?: Maybe<Scalars['String']>,
  recordTemplateRemoveFromSnippet?: Maybe<Scalars['String']>,
  addRoom?: Maybe<Scalars['String']>,
  removeRoom?: Maybe<Scalars['String']>,
  addRoomsBulk?: Maybe<Scalars['String']>,
  renameRoom?: Maybe<Scalars['String']>,
  updateRoomRoles?: Maybe<Scalars['String']>,
  updateRoomSvg?: Maybe<Scalars['String']>,
  roomGas?: Maybe<Scalars['String']>,
  importRooms?: Maybe<Scalars['String']>,
  changeRoomDeck?: Maybe<Scalars['String']>,
  snapshot?: Maybe<Scalars['String']>,
  test?: Maybe<Scalars['String']>,
  sensorScanRequest?: Maybe<Scalars['String']>,
  sensorScanResult?: Maybe<Scalars['String']>,
  processedData?: Maybe<Scalars['String']>,
  removeProcessedData?: Maybe<Scalars['String']>,
  sensorScanCancel?: Maybe<Scalars['String']>,
  setPresetAnswers?: Maybe<Scalars['String']>,
  createSensorContact?: Maybe<Scalars['String']>,
  createSensorContacts?: Maybe<Scalars['String']>,
  moveSensorContact?: Maybe<Scalars['String']>,
  removeSensorContact?: Maybe<Scalars['String']>,
  removeAllSensorContacts?: Maybe<Scalars['String']>,
  stopAllSensorContacts?: Maybe<Scalars['String']>,
  updateSensorContact?: Maybe<Scalars['String']>,
  setArmyContacts?: Maybe<Scalars['String']>,
  createSensorArmyContact?: Maybe<Scalars['String']>,
  removeSensorArmyContact?: Maybe<Scalars['String']>,
  updateSensorArmyContact?: Maybe<Scalars['String']>,
  nudgeSensorContacts?: Maybe<Scalars['String']>,
  sensorsSetHasPing?: Maybe<Scalars['String']>,
  setSensorPingMode?: Maybe<Scalars['String']>,
  pingSensors?: Maybe<Scalars['String']>,
  animateSensorContacact?: Maybe<Scalars['String']>,
  setSensorsHistory?: Maybe<Scalars['String']>,
  newSensorScan?: Maybe<Scalars['String']>,
  updateSensorScan?: Maybe<Scalars['String']>,
  cancelSensorScan?: Maybe<Scalars['String']>,
  toggleSensorsAutoTarget?: Maybe<Scalars['String']>,
  toggleSensorsAutoThrusters?: Maybe<Scalars['String']>,
  setSensorsInterference?: Maybe<Scalars['String']>,
  setSensorsSegment?: Maybe<Scalars['String']>,
  setAutoMovement?: Maybe<Scalars['String']>,
  updateSensorContacts?: Maybe<Scalars['String']>,
  updateSensorGrid?: Maybe<Scalars['String']>,
  destroySensorContact?: Maybe<Scalars['String']>,
  sensorsFireProjectile?: Maybe<Scalars['String']>,
  setSensorsDefaultHitpoints?: Maybe<Scalars['String']>,
  setSensorsDefaultSpeed?: Maybe<Scalars['String']>,
  setSensorsMissPercent?: Maybe<Scalars['String']>,
  createSet?: Maybe<Scalars['String']>,
  removeSet?: Maybe<Scalars['String']>,
  addClientToSet?: Maybe<Scalars['String']>,
  removeClientFromSet?: Maybe<Scalars['String']>,
  updateSetClient?: Maybe<Scalars['String']>,
  renameSet?: Maybe<Scalars['String']>,
  shieldRaised?: Maybe<Scalars['String']>,
  shieldLowered?: Maybe<Scalars['String']>,
  shieldIntegritySet?: Maybe<Scalars['String']>,
  shieldFrequencySet?: Maybe<Scalars['String']>,
  shieldFrequencySetAll?: Maybe<Scalars['String']>,
  hitShields?: Maybe<Scalars['String']>,
  restoreShields?: Maybe<Scalars['String']>,
  shipDockingChange?: Maybe<Scalars['String']>,
  shipSetDocking?: Maybe<Scalars['String']>,
  remoteAccessSendCode?: Maybe<Scalars['String']>,
  remoteAccessUpdateCode?: Maybe<Scalars['String']>,
  setSelfDestructTime?: Maybe<Scalars['String']>,
  setSelfDestructCode?: Maybe<Scalars['String']>,
  setSelfDestructAuto?: Maybe<Scalars['String']>,
  notify?: Maybe<Scalars['String']>,
  printPdf?: Maybe<Scalars['String']>,
  commAddSignal?: Maybe<Scalars['String']>,
  commUpdateSignal?: Maybe<Scalars['String']>,
  commUpdateSignals?: Maybe<Scalars['String']>,
  commRemoveSignal?: Maybe<Scalars['String']>,
  commAddArrow?: Maybe<Scalars['String']>,
  commRemoveArrow?: Maybe<Scalars['String']>,
  commConnectArrow?: Maybe<Scalars['String']>,
  commDisconnectArrow?: Maybe<Scalars['String']>,
  commUpdate?: Maybe<Scalars['String']>,
  commHail?: Maybe<Scalars['String']>,
  cancelHail?: Maybe<Scalars['String']>,
  connectHail?: Maybe<Scalars['String']>,
  addShortRangeComm?: Maybe<Scalars['String']>,
  removeShortRangeComm?: Maybe<Scalars['String']>,
  muteShortRangeComm?: Maybe<Scalars['String']>,
  setSickbayBunks?: Maybe<Scalars['String']>,
  addSickbayCrew?: Maybe<Scalars['String']>,
  removeSickbayCrew?: Maybe<Scalars['String']>,
  updateSickbayCrew?: Maybe<Scalars['String']>,
  scanSickbayBunk?: Maybe<Scalars['String']>,
  cancelSickbayBunkScan?: Maybe<Scalars['String']>,
  sickbayBunkScanResponse?: Maybe<Scalars['String']>,
  assignPatient?: Maybe<Scalars['String']>,
  dischargePatient?: Maybe<Scalars['String']>,
  startDeconProgram?: Maybe<Scalars['String']>,
  updateDeconOffset?: Maybe<Scalars['String']>,
  cancelDeconProgram?: Maybe<Scalars['String']>,
  completeDeconProgram?: Maybe<Scalars['String']>,
  setDeconAutoFinish?: Maybe<Scalars['String']>,
  updatePatientChart?: Maybe<Scalars['String']>,
  updateSignalJammer?: Maybe<Scalars['String']>,
  signalJammerSignals?: Maybe<Scalars['String']>,
  fluxSignalJammer?: Maybe<Scalars['String']>,
  setSignalJammerSensorsInterference?: Maybe<Scalars['String']>,
  createSimulator?: Maybe<Scalars['String']>,
  removeSimulator?: Maybe<Scalars['String']>,
  triggerMacros?: Maybe<Scalars['String']>,
  autoAdvance?: Maybe<Scalars['String']>,
  trainingMode?: Maybe<Scalars['String']>,
  setAlertConditionLock?: Maybe<Scalars['String']>,
  renameSimulator?: Maybe<Scalars['String']>,
  changeSimulatorLayout?: Maybe<Scalars['String']>,
  changeSimulatorCaps?: Maybe<Scalars['String']>,
  changeSimulatorAlertLevel?: Maybe<Scalars['String']>,
  hideSimulatorCard?: Maybe<Scalars['String']>,
  unhideSimulatorCard?: Maybe<Scalars['String']>,
  stationAssignCard?: Maybe<Scalars['String']>,
  stationUnassignCard?: Maybe<Scalars['String']>,
  flipSimulator?: Maybe<Scalars['String']>,
  toggleSimulatorCardHidden?: Maybe<Scalars['String']>,
  changeSimulatorExocomps?: Maybe<Scalars['String']>,
  changeSimulatorBridgeCrew?: Maybe<Scalars['String']>,
  changeSimulatorExtraPeople?: Maybe<Scalars['String']>,
  changeSimulatorRadiation?: Maybe<Scalars['String']>,
  setSimulatorTimelineStep?: Maybe<Scalars['String']>,
  setSimulatorMission?: Maybe<Scalars['String']>,
  setSimulatorMissionConfig?: Maybe<Scalars['String']>,
  updateSimulatorPanels?: Maybe<Scalars['String']>,
  updateSimulatorCommandLines?: Maybe<Scalars['String']>,
  updateSimulatorTriggers?: Maybe<Scalars['String']>,
  setSimulatorTriggersPaused?: Maybe<Scalars['String']>,
  updateSimulatorInterfaces?: Maybe<Scalars['String']>,
  setStepDamage?: Maybe<Scalars['String']>,
  setVerifyDamage?: Maybe<Scalars['String']>,
  setBridgeMessaging?: Maybe<Scalars['String']>,
  setSimulatorAssets?: Maybe<Scalars['String']>,
  setSimulatorSoundEffects?: Maybe<Scalars['String']>,
  setSimulatorHasPrinter?: Maybe<Scalars['String']>,
  setSimulatorHasLegs?: Maybe<Scalars['String']>,
  setSimulatorSpaceEdventuresId?: Maybe<Scalars['String']>,
  addSimulatorStationCard?: Maybe<Scalars['String']>,
  removeSimulatorStationCard?: Maybe<Scalars['String']>,
  editSimulatorStationCard?: Maybe<Scalars['String']>,
  setSimulatorStationMessageGroup?: Maybe<Scalars['String']>,
  setSimulatorStationLogin?: Maybe<Scalars['String']>,
  setSimulatorStationLayout?: Maybe<Scalars['String']>,
  setSimulatorStationExecutive?: Maybe<Scalars['String']>,
  setSimulatorStationWidget?: Maybe<Scalars['String']>,
  createSoftwarePanel?: Maybe<Scalars['String']>,
  updateSoftwarePanel?: Maybe<Scalars['String']>,
  removeSoftwarePanel?: Maybe<Scalars['String']>,
  createStationSet?: Maybe<Scalars['String']>,
  removeStationSet?: Maybe<Scalars['String']>,
  renameStationSet?: Maybe<Scalars['String']>,
  duplicateStationSet?: Maybe<Scalars['String']>,
  setStationSetCrewCount?: Maybe<Scalars['String']>,
  addStationToStationSet?: Maybe<Scalars['String']>,
  removeStationFromStationSet?: Maybe<Scalars['String']>,
  editStationInStationSet?: Maybe<Scalars['String']>,
  addCardToStation?: Maybe<Scalars['String']>,
  removeCardFromStation?: Maybe<Scalars['String']>,
  editCardInStationSet?: Maybe<Scalars['String']>,
  setStationLogin?: Maybe<Scalars['String']>,
  setStationLayout?: Maybe<Scalars['String']>,
  setStationExecutive?: Maybe<Scalars['String']>,
  toggleStationWidgets?: Maybe<Scalars['String']>,
  setStationDescription?: Maybe<Scalars['String']>,
  setStationTraining?: Maybe<Scalars['String']>,
  reorderStationWidgets?: Maybe<Scalars['String']>,
  setStealthActivated?: Maybe<Scalars['String']>,
  setStealthCharge?: Maybe<Scalars['String']>,
  activateStealth?: Maybe<Scalars['String']>,
  deactivateStealth?: Maybe<Scalars['String']>,
  setStealthQuadrant?: Maybe<Scalars['String']>,
  fluxStealthQuadrants?: Maybe<Scalars['String']>,
  stealthChangeAlert?: Maybe<Scalars['String']>,
  fluxSubspaceField?: Maybe<Scalars['String']>,
  normalSubspaceField?: Maybe<Scalars['String']>,
  setSubspaceFieldSectorValue?: Maybe<Scalars['String']>,
  createSurveyForm?: Maybe<Scalars['String']>,
  removeSurveyForm?: Maybe<Scalars['String']>,
  setSurveyFormGoogleSheet?: Maybe<Scalars['String']>,
  updateSurveyForm?: Maybe<Scalars['String']>,
  triggerSurvey?: Maybe<Scalars['String']>,
  surveyFormResponse?: Maybe<Scalars['String']>,
  endSurvey?: Maybe<Scalars['String']>,
  addSystemToSimulator?: Maybe<Scalars['String']>,
  removeSystemFromSimulator?: Maybe<Scalars['String']>,
  updateSystemName?: Maybe<Scalars['String']>,
  updateSystemUpgradeMacros?: Maybe<Scalars['String']>,
  updateSystemUpgradeBoard?: Maybe<Scalars['String']>,
  upgradeSystem?: Maybe<Scalars['String']>,
  updateSystemRooms?: Maybe<Scalars['String']>,
  systemSetWing?: Maybe<Scalars['String']>,
  newTacticalMap?: Maybe<Scalars['String']>,
  updateTacticalMap?: Maybe<Scalars['String']>,
  freezeTacticalMap?: Maybe<Scalars['String']>,
  duplicateTacticalMap?: Maybe<Scalars['String']>,
  loadTacticalMap?: Maybe<Scalars['String']>,
  removeTacticalMap?: Maybe<Scalars['String']>,
  addTacticalMapLayer?: Maybe<Scalars['String']>,
  updateTacticalMapLayer?: Maybe<Scalars['String']>,
  reorderTacticalMapLayer?: Maybe<Scalars['String']>,
  removeTacticalMapLayer?: Maybe<Scalars['String']>,
  addTacticalMapItem?: Maybe<Scalars['String']>,
  updateTacticalMapItem?: Maybe<Scalars['String']>,
  removeTacticalMapItem?: Maybe<Scalars['String']>,
  addTacticalMapPath?: Maybe<Scalars['String']>,
  updateTacticalMapPath?: Maybe<Scalars['String']>,
  removeTacticalMapPath?: Maybe<Scalars['String']>,
  showViewscreenTactical?: Maybe<Scalars['String']>,
  addTacticalMapsToFlight?: Maybe<Scalars['String']>,
  createTargetingContact?: Maybe<Scalars['String']>,
  targetTargetingContact?: Maybe<Scalars['String']>,
  untargetTargetingContact?: Maybe<Scalars['String']>,
  targetSystem?: Maybe<Scalars['String']>,
  removeTarget?: Maybe<Scalars['String']>,
  addTargetClass?: Maybe<Scalars['String']>,
  removeTargetClass?: Maybe<Scalars['String']>,
  updateTargetClass?: Maybe<Scalars['String']>,
  setTargetClassCount?: Maybe<Scalars['String']>,
  setCoordinateTargeting?: Maybe<Scalars['String']>,
  setTargetingCalculatedTarget?: Maybe<Scalars['String']>,
  setTargetingEnteredTarget?: Maybe<Scalars['String']>,
  clearAllTargetingContacts?: Maybe<Scalars['String']>,
  setTargetingRange?: Maybe<Scalars['String']>,
  setTargetingClasses?: Maybe<Scalars['String']>,
  generateTaskReport?: Maybe<Scalars['String']>,
  clearTaskReport?: Maybe<Scalars['String']>,
  completeTaskReport?: Maybe<Scalars['String']>,
  verifyTaskReportStep?: Maybe<Scalars['String']>,
  assignTaskReportStep?: Maybe<Scalars['String']>,
  requestVerifyTaskReportStep?: Maybe<Scalars['String']>,
  addTask?: Maybe<Scalars['String']>,
  verifyTask?: Maybe<Scalars['String']>,
  requestTaskVerify?: Maybe<Scalars['String']>,
  denyTaskVerify?: Maybe<Scalars['String']>,
  dismissVerifiedTasks?: Maybe<Scalars['String']>,
  addTaskTemplate?: Maybe<Scalars['String']>,
  removeTaskTemplate?: Maybe<Scalars['String']>,
  renameTaskTemplate?: Maybe<Scalars['String']>,
  setTaskTemplateValues?: Maybe<Scalars['String']>,
  setTaskTemplateReportTypes?: Maybe<Scalars['String']>,
  setTaskTemplateMacros?: Maybe<Scalars['String']>,
  setTaskTemplatePreMacros?: Maybe<Scalars['String']>,
  createTeam?: Maybe<Scalars['String']>,
  updateTeam?: Maybe<Scalars['String']>,
  addCrewToTeam?: Maybe<Scalars['String']>,
  removeCrewFromTeam?: Maybe<Scalars['String']>,
  removeTeam?: Maybe<Scalars['String']>,
  _template?: Maybe<Scalars['String']>,
  setTrackingPreference?: Maybe<Scalars['String']>,
  importTaskTemplates?: Maybe<Scalars['String']>,
  setSpaceEdventuresToken?: Maybe<SpaceEdventuresCenter>,
  assignSpaceEdventuresBadge?: Maybe<Scalars['String']>,
  assignSpaceEdventuresMission?: Maybe<Scalars['String']>,
  assignSpaceEdventuresFlightType?: Maybe<Scalars['String']>,
  assignSpaceEdventuresFlightRecord?: Maybe<Scalars['String']>,
  getSpaceEdventuresLogin?: Maybe<Scalars['String']>,
  removeSpaceEdventuresClient?: Maybe<Scalars['String']>,
  generic?: Maybe<Scalars['String']>,
  clockSync?: Maybe<Scalars['String']>,
  addIssue?: Maybe<Scalars['String']>,
  addIssueUpload?: Maybe<Scalars['String']>,
  rotationUpdate?: Maybe<Scalars['String']>,
  rotationSet?: Maybe<Scalars['String']>,
  requiredRotationSet?: Maybe<Scalars['String']>,
  directionUpdate?: Maybe<Scalars['String']>,
  positionUpdate?: Maybe<Scalars['String']>,
  setThrusterRotationSpeed?: Maybe<Scalars['String']>,
  setThrusterMovementSpeed?: Maybe<Scalars['String']>,
  chargeThx?: Maybe<Scalars['String']>,
  lockThx?: Maybe<Scalars['String']>,
  activateThx?: Maybe<Scalars['String']>,
  deactivateThx?: Maybe<Scalars['String']>,
  resetThx?: Maybe<Scalars['String']>,
  torpedoAddWarhead?: Maybe<Scalars['String']>,
  torpedoRemoveWarhead?: Maybe<Scalars['String']>,
  torpedoLoadWarhead?: Maybe<Scalars['String']>,
  torpedoSetWarheadCount?: Maybe<Scalars['String']>,
  torpedoUnload?: Maybe<Scalars['String']>,
  torpedoFire?: Maybe<Scalars['String']>,
  setTractorBeamState?: Maybe<Scalars['String']>,
  setTractorBeamTarget?: Maybe<Scalars['String']>,
  setTractorBeamStrength?: Maybe<Scalars['String']>,
  setTractorBeamStress?: Maybe<Scalars['String']>,
  setTractorBeamScanning?: Maybe<Scalars['String']>,
  setTractorBeamTargetLabel?: Maybe<Scalars['String']>,
  setTractorBeamCount?: Maybe<Scalars['String']>,
  addTractorTarget?: Maybe<Scalars['String']>,
  removeTractorTarget?: Maybe<Scalars['String']>,
  setTransportDestination?: Maybe<Scalars['String']>,
  setTransportTarget?: Maybe<Scalars['String']>,
  beginTransportScan?: Maybe<Scalars['String']>,
  cancelTransportScan?: Maybe<Scalars['String']>,
  clearTransportTargets?: Maybe<Scalars['String']>,
  setTransportCharge?: Maybe<Scalars['String']>,
  completeTransport?: Maybe<Scalars['String']>,
  setTransporterTargets?: Maybe<Scalars['String']>,
  setTransporterChargeSpeed?: Maybe<Scalars['String']>,
  setTranswarpActive?: Maybe<Scalars['String']>,
  fluxTranswarp?: Maybe<Scalars['String']>,
  normalTranswarp?: Maybe<Scalars['String']>,
  setTranswarpSectorValue?: Maybe<Scalars['String']>,
  addTrigger?: Maybe<Scalars['String']>,
  renameTrigger?: Maybe<Scalars['String']>,
  removeTrigger?: Maybe<Scalars['String']>,
  updateTrigger?: Maybe<Scalars['String']>,
  addTriggerToSimulator?: Maybe<Scalars['String']>,
  removeTriggerFromSimulator?: Maybe<Scalars['String']>,
  updateViewscreenName?: Maybe<Scalars['String']>,
  updateViewscreenSecondary?: Maybe<Scalars['String']>,
  updateViewscreenComponent?: Maybe<Scalars['String']>,
  updateViewscreenData?: Maybe<Scalars['String']>,
  setViewscreenToAuto?: Maybe<Scalars['String']>,
  setViewscreenPictureInPicture?: Maybe<Scalars['String']>,
  removeViewscreenPictureInPicture?: Maybe<Scalars['String']>,
  updateViewscreenAuto?: Maybe<Scalars['String']>,
  toggleViewscreenVideo?: Maybe<Scalars['String']>,
  countermeasuresCreateCountermeasure?: Maybe<Countermeasure>,
  countermeasuresRemoveCountermeasure?: Maybe<Scalars['String']>,
  countermeasuresLaunchCountermeasure?: Maybe<Scalars['String']>,
  countermeasuresActivateCountermeasure?: Maybe<Scalars['String']>,
  countermeasuresDeactivateCountermeasure?: Maybe<Scalars['String']>,
  countermeasuresLaunchUnlockedCountermeasures?: Maybe<Scalars['String']>,
  countermeasuresBuildCountermeasure?: Maybe<Scalars['String']>,
  countermeasuresAddModule?: Maybe<Countermeasure>,
  countermeasuresRemoveModule?: Maybe<Scalars['String']>,
  countermeasuresConfigureModule?: Maybe<Scalars['String']>,
  countermeasuresSetResource?: Maybe<Scalars['String']>,
  countermeasuresSetFDNote?: Maybe<Scalars['String']>,
  entityCreate: Entity,
  entityRemove?: Maybe<Scalars['String']>,
  flightSetBaseUniverse?: Maybe<Scalars['String']>,
  dmxDeviceCreate?: Maybe<Scalars['String']>,
  dmxDeviceRemove?: Maybe<Scalars['String']>,
  dmxDeviceSetName?: Maybe<Scalars['String']>,
  dmxDeviceSetChannels?: Maybe<Scalars['String']>,
  dmxSetCreate?: Maybe<Scalars['String']>,
  dmxSetRemove?: Maybe<Scalars['String']>,
  dmxSetDuplicate?: Maybe<Scalars['String']>,
  dmxSetSetName?: Maybe<Scalars['String']>,
  dmxFixtureCreate?: Maybe<Scalars['String']>,
  dmxFixtureRemove?: Maybe<Scalars['String']>,
  dmxFixtureSetName?: Maybe<Scalars['String']>,
  dmxFixtureSetDMXDevice?: Maybe<Scalars['String']>,
  dmxFixtureSetChannel?: Maybe<Scalars['String']>,
  dmxFixtureSetMode?: Maybe<Scalars['String']>,
  dmxFixtureSetActive?: Maybe<Scalars['String']>,
  dmxFixtureSetTags?: Maybe<Scalars['String']>,
  dmxFixtureAddTag?: Maybe<Scalars['String']>,
  dmxFixtureRemoveTag?: Maybe<Scalars['String']>,
  dmxFixtureSetPassiveChannels?: Maybe<Scalars['String']>,
  dmxConfigCreate?: Maybe<Scalars['String']>,
  dmxConfigRemove?: Maybe<Scalars['String']>,
  dmxConfigDuplicate?: Maybe<Scalars['String']>,
  dmxConfigSetName?: Maybe<Scalars['String']>,
  dmxConfigSetConfig?: Maybe<Scalars['String']>,
  dmxConfigSetActionStrength?: Maybe<Scalars['String']>,
  taskFlowAdd?: Maybe<Scalars['String']>,
  taskFlowRemove?: Maybe<Scalars['String']>,
  taskFlowRename?: Maybe<Scalars['String']>,
  taskFlowAddStep?: Maybe<Scalars['String']>,
  taskFlowRemoveStep?: Maybe<Scalars['String']>,
  taskFlowRenameStep?: Maybe<Scalars['String']>,
  taskFlowStepAddTask?: Maybe<Scalars['String']>,
  taskFlowStepRemoveTask?: Maybe<Scalars['String']>,
  taskFlowStepEditTask?: Maybe<Scalars['String']>,
  taskFlowStepSetCompleteAll?: Maybe<Scalars['String']>,
  taskFlowActivate?: Maybe<Scalars['String']>,
};


export type MutationEntitySetAppearanceArgs = {
  id?: Maybe<Scalars['ID']>,
  color?: Maybe<Scalars['String']>,
  meshType?: Maybe<MeshTypeEnum>,
  modelAsset?: Maybe<Scalars['String']>,
  materialMapAsset?: Maybe<Scalars['String']>,
  ringMapAsset?: Maybe<Scalars['String']>,
  cloudMapAsset?: Maybe<Scalars['String']>,
  emissiveColor?: Maybe<Scalars['String']>,
  emissiveIntensity?: Maybe<Scalars['Float']>,
  scale?: Maybe<Scalars['Float']>
};


export type MutationEntityRemoveAppearanceArgs = {
  id: Scalars['ID']
};


export type MutationEntitySetBehaviorArgs = {
  id: Scalars['ID'],
  behavior: Behaviors,
  targetId?: Maybe<Scalars['ID']>,
  destination?: Maybe<EntityCoordinatesInput>
};


export type MutationEntityRemoveBehaviorArgs = {
  id: Scalars['ID']
};


export type MutationEntitySetIdentityArgs = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>
};


export type MutationEntityRemoveIdentityArgs = {
  id: Scalars['ID']
};


export type MutationEntitySetLocationArgs = {
  id?: Maybe<Scalars['ID']>,
  position?: Maybe<EntityCoordinatesInput>,
  velocity?: Maybe<EntityCoordinatesInput>,
  acceleration?: Maybe<EntityCoordinatesInput>,
  rotation?: Maybe<QuaternionInput>,
  rotationVelocity?: Maybe<EntityCoordinatesInput>,
  rotationAcceleration?: Maybe<EntityCoordinatesInput>
};


export type MutationEntitiesSetPositionArgs = {
  entities: Array<EntitiesLocationInput>
};


export type MutationEntitySetRotationVelocityMagnitudeArgs = {
  id: Scalars['ID'],
  rotationVelocity: CoordinatesInput
};


export type MutationEntityRemoveLocationArgs = {
  id: Scalars['ID']
};


export type MutationEntitySetStageArgs = {
  id?: Maybe<Scalars['ID']>,
  scaleLabel?: Maybe<Scalars['String']>,
  scaleLabelShort?: Maybe<Scalars['String']>,
  skyboxKey?: Maybe<Scalars['String']>
};


export type MutationEntityRemoveStageArgs = {
  id: Scalars['ID']
};


export type MutationEntitySetStageChildArgs = {
  id?: Maybe<Scalars['ID']>,
  parentId: Scalars['ID']
};


export type MutationEntityRemoveStageChildArgs = {
  id: Scalars['ID']
};


export type MutationEntitySetLightArgs = {
  id?: Maybe<Scalars['ID']>,
  intensity?: Maybe<Scalars['Float']>,
  decay?: Maybe<Scalars['Float']>,
  color?: Maybe<Scalars['String']>
};


export type MutationEntityRemoveLightArgs = {
  id: Scalars['ID']
};


export type MutationEntitySetGlowArgs = {
  id?: Maybe<Scalars['ID']>,
  glowMode?: Maybe<GlowModeEnum>,
  color?: Maybe<Scalars['String']>
};


export type MutationEntityRemoveGlowArgs = {
  id: Scalars['ID']
};


export type MutationEntitySetTemplateArgs = {
  id?: Maybe<Scalars['ID']>,
  category: Scalars['String']
};


export type MutationEntitySetEngineArgs = {
  id?: Maybe<Scalars['ID']>,
  type: EntityEngineEnum,
  maxSpeed?: Maybe<Scalars['Float']>,
  currentSpeed?: Maybe<Scalars['Float']>,
  heat?: Maybe<Scalars['Float']>,
  heatRate?: Maybe<Scalars['Float']>,
  coolant?: Maybe<Scalars['Float']>,
  cooling?: Maybe<Scalars['Boolean']>
};


export type MutationEntityRemoveEngineArgs = {
  id: Scalars['ID'],
  type: EntityEngineEnum
};


export type MutationEntitySetThrustersArgs = {
  id: Scalars['ID'],
  direction?: Maybe<CoordinatesInput>,
  rotationDelta?: Maybe<CoordinatesInput>,
  rotationSpeed?: Maybe<Scalars['Float']>,
  movementSpeed?: Maybe<Scalars['Float']>
};


export type MutationEntityRemoveThrustersArgs = {
  id: Scalars['ID']
};


export type MutationTriggerActionArgs = {
  action: Scalars['String'],
  message?: Maybe<Scalars['String']>,
  voice?: Maybe<Scalars['String']>,
  simulatorId: Scalars['ID'],
  stationId?: Maybe<Scalars['String']>,
  clientId?: Maybe<Scalars['ID']>,
  duration?: Maybe<Scalars['Float']>
};


export type MutationAddSimulatorAmbianceArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationUpdateSimulatorAmbianceArgs = {
  id: Scalars['ID'],
  ambiance: AmbianceInput
};


export type MutationRemoveSimulatorAmbianceArgs = {
  id: Scalars['ID'],
  ambianceId: Scalars['ID']
};


export type MutationSetStationAmbianceArgs = {
  stationSetID: Scalars['ID'],
  stationName: Scalars['String'],
  ambiance?: Maybe<Scalars['String']>
};


export type MutationAddAssetFolderArgs = {
  name: Scalars['String'],
  folderPath: Scalars['String'],
  fullPath: Scalars['String']
};


export type MutationRemoveAssetFolderArgs = {
  fullPath: Scalars['String']
};


export type MutationRemoveAssetObjectArgs = {
  fullPath: Scalars['String']
};


export type MutationDownloadRemoteAssetsArgs = {
  folderPath: Scalars['String'],
  files: Array<RemoteAsset>
};


export type MutationClientConnectArgs = {
  client: Scalars['ID'],
  label?: Maybe<Scalars['String']>,
  mobile?: Maybe<Scalars['Boolean']>,
  cards?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type MutationClientDisconnectArgs = {
  client: Scalars['ID']
};


export type MutationClientPingArgs = {
  client: Scalars['ID']
};


export type MutationClientSetFlightArgs = {
  client: Scalars['ID'],
  flightId: Scalars['ID']
};


export type MutationClientSetSimulatorArgs = {
  client: Scalars['ID'],
  simulatorId: Scalars['ID']
};


export type MutationClientSetStationArgs = {
  client: Scalars['ID'],
  stationName: Scalars['ID']
};


export type MutationClientLoginArgs = {
  client: Scalars['ID'],
  loginName?: Maybe<Scalars['String']>
};


export type MutationClientSetEmailArgs = {
  client: Scalars['ID'],
  email: Scalars['String']
};


export type MutationClientLogoutArgs = {
  client: Scalars['ID']
};


export type MutationClientDiagnosticArgs = {
  client: Scalars['ID']
};


export type MutationClientResetArgs = {
  client: Scalars['ID']
};


export type MutationClientLockScreenArgs = {
  client: Scalars['ID']
};


export type MutationClientUnlockScreenArgs = {
  client: Scalars['ID']
};


export type MutationClientOfflineStateArgs = {
  client: Scalars['ID'],
  state?: Maybe<Scalars['String']>
};


export type MutationClientMovieStateArgs = {
  client: Scalars['ID'],
  movie: Scalars['String']
};


export type MutationClientSetTrainingArgs = {
  client: Scalars['ID'],
  training: Scalars['Boolean']
};


export type MutationClientSetSoundPlayerArgs = {
  client: Scalars['ID'],
  soundPlayer: Scalars['Boolean']
};


export type MutationClientActivateLightsArgs = {
  clientId: Scalars['ID'],
  dmxSetId: Scalars['ID']
};


export type MutationClientAddCacheArgs = {
  client?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  viewscreen?: Maybe<Scalars['Boolean']>,
  cacheItem: Scalars['String']
};


export type MutationClientRemoveCacheArgs = {
  client: Scalars['ID'],
  cacheItem: Scalars['String']
};


export type MutationSetClientHypercardArgs = {
  clientId?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  component?: Maybe<Scalars['String']>
};


export type MutationPlaySoundArgs = {
  sound: SoundInput,
  station?: Maybe<Scalars['String']>,
  simulatorId?: Maybe<Scalars['ID']>,
  clientId?: Maybe<Scalars['String']>
};


export type MutationStopAllSoundsArgs = {
  simulatorId: Scalars['ID'],
  station?: Maybe<Scalars['String']>
};


export type MutationCancelLoopingSoundsArgs = {
  simulatorId: Scalars['ID'],
  station?: Maybe<Scalars['String']>
};


export type MutationApplyClientSetArgs = {
  id: Scalars['ID'],
  flightId: Scalars['ID'],
  simulatorId: Scalars['ID'],
  templateId: Scalars['ID'],
  stationSetId: Scalars['ID']
};


export type MutationSetClientOverlayArgs = {
  id: Scalars['ID'],
  overlay: Scalars['Boolean']
};


export type MutationClientCrackArgs = {
  id: Scalars['ID'],
  crack: Scalars['Boolean']
};


export type MutationClientSetCardArgs = {
  id: Scalars['ID'],
  card: Scalars['String']
};


export type MutationSetKeypadCodeArgs = {
  id: Scalars['ID'],
  code?: Maybe<Array<Maybe<Scalars['Int']>>>
};


export type MutationSetKeypadEnteredCodeArgs = {
  id: Scalars['ID'],
  code?: Maybe<Array<Scalars['Int']>>
};


export type MutationSetKeypadHintArgs = {
  id: Scalars['ID'],
  hint: Scalars['Boolean']
};


export type MutationSetKeypadLockedArgs = {
  id: Scalars['ID'],
  locked: Scalars['Boolean']
};


export type MutationResetKeypadArgs = {
  id: Scalars['ID']
};


export type MutationSetCodeLengthArgs = {
  id: Scalars['ID'],
  len: Scalars['Int']
};


export type MutationSetKeypadAllowedAttemptsArgs = {
  id: Scalars['ID'],
  attempts: Scalars['Int']
};


export type MutationHandheldScannerScanArgs = {
  id: Scalars['ID'],
  request: Scalars['String']
};


export type MutationHandheldScannerCancelArgs = {
  id: Scalars['ID']
};


export type MutationHandheldScannerResponseArgs = {
  id: Scalars['ID'],
  response: Scalars['String']
};


export type MutationAddCommandLineArgs = {
  name: Scalars['String']
};


export type MutationRenameCommandLineArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationRemoveCommandLineArgs = {
  id: Scalars['ID']
};


export type MutationUpdateCommandLineArgs = {
  id: Scalars['ID'],
  components?: Maybe<Scalars['JSON']>,
  connections?: Maybe<Scalars['JSON']>,
  values?: Maybe<Scalars['JSON']>,
  config?: Maybe<Scalars['JSON']>
};


export type MutationExecuteCommandLineArgs = {
  simulatorId: Scalars['ID'],
  command: Scalars['String'],
  arg?: Maybe<Scalars['String']>
};


export type MutationAddCommandLineToSimulatorArgs = {
  simulatorId: Scalars['ID'],
  commandLine: Scalars['ID']
};


export type MutationRemoveCommandLineFromSimulatorArgs = {
  simulatorId: Scalars['ID'],
  commandLine: Scalars['ID']
};


export type MutationAddCommandLineOutputArgs = {
  simulatorId: Scalars['ID'],
  clientId: Scalars['ID'],
  output: Scalars['String']
};


export type MutationHandleCommandLineFeedbackArgs = {
  simulatorId: Scalars['ID'],
  clientId: Scalars['ID'],
  feedbackId: Scalars['ID'],
  ignore?: Maybe<Scalars['Boolean']>,
  isApproved: Scalars['Boolean']
};


export type MutationAddComputerCoreUserArgs = {
  id: Scalars['ID'],
  user?: Maybe<ComputerCoreUserInput>
};


export type MutationComputerCoreAddHackerArgs = {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  level?: Maybe<Scalars['Int']>
};


export type MutationUpdateComputerCoreUserArgs = {
  id: Scalars['ID'],
  userId: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  level?: Maybe<Scalars['Int']>,
  password?: Maybe<Scalars['String']>,
  hacker?: Maybe<Scalars['Boolean']>
};


export type MutationRemoveComputerCoreUserArgs = {
  id: Scalars['ID'],
  userId: Scalars['ID']
};


export type MutationRestoreComputerCoreFileArgs = {
  id: Scalars['ID'],
  fileId?: Maybe<Scalars['ID']>,
  all?: Maybe<Scalars['Boolean']>,
  level?: Maybe<Scalars['Int']>
};


export type MutationDeleteComputerCoreVirusArgs = {
  id: Scalars['ID'],
  virusId: Scalars['ID']
};


export type MutationRestartComputerCoreTerminalArgs = {
  id: Scalars['ID'],
  terminalId: Scalars['ID']
};


export type MutationAddViriiToComputerCoreArgs = {
  id: Scalars['ID']
};


export type MutationSetCoolantTankArgs = {
  id: Scalars['ID'],
  coolant: Scalars['Float']
};


export type MutationTransferCoolantArgs = {
  coolantId: Scalars['ID'],
  systemId?: Maybe<Scalars['ID']>,
  which?: Maybe<Scalars['String']>
};


export type MutationIgnoreCoreFeedArgs = {
  id?: Maybe<Scalars['ID']>
};


export type MutationSyncTimerArgs = {
  time?: Maybe<Scalars['String']>,
  active?: Maybe<Scalars['Boolean']>,
  simulatorId: Scalars['ID']
};


export type MutationUpdateCoreLayoutArgs = {
  layout?: Maybe<CoreLayoutInput>
};


export type MutationAddCoreLayoutArgs = {
  layout?: Maybe<CoreLayoutInput>
};


export type MutationRemoveCoreLayoutArgs = {
  id?: Maybe<Scalars['ID']>
};


export type MutationReorderCoreLayoutsArgs = {
  layouts: Array<Scalars['ID']>
};


export type MutationAddCrewmemberArgs = {
  crew?: Maybe<CrewInput>
};


export type MutationRemoveCrewmemberArgs = {
  id?: Maybe<Scalars['ID']>
};


export type MutationUpdateCrewmemberArgs = {
  crew?: Maybe<CrewInput>
};


export type MutationNewRandomCrewmemberArgs = {
  simulatorId: Scalars['ID'],
  type?: Maybe<Scalars['String']>,
  position?: Maybe<Scalars['String']>
};


export type MutationRemoveAllCrewArgs = {
  simulatorId: Scalars['ID']
};


export type MutationCrewImportArgs = {
  simulatorId: Scalars['ID'],
  crew: Array<Maybe<CrewInput>>
};


export type MutationCrmSetActivatedArgs = {
  id: Scalars['ID'],
  state: Scalars['Boolean']
};


export type MutationCrmSetPasswordArgs = {
  id: Scalars['ID'],
  password: Scalars['String']
};


export type MutationCrmAddEnemyArgs = {
  id: Scalars['ID']
};


export type MutationCrmSetAccelerationArgs = {
  id: Scalars['ID'],
  clientId: Scalars['ID'],
  acceleration: CoordinatesInput
};


export type MutationCrmSetPhaserChargeArgs = {
  id: Scalars['ID'],
  clientId: Scalars['ID'],
  phaser: Scalars['Float']
};


export type MutationCrmSetShieldStateArgs = {
  id: Scalars['ID'],
  clientId: Scalars['ID'],
  shield: Scalars['Boolean']
};


export type MutationCrmLoadTorpedoArgs = {
  id: Scalars['ID'],
  clientId: Scalars['ID']
};


export type MutationCrmFireTorpedoArgs = {
  id: Scalars['ID'],
  clientId: Scalars['ID'],
  target: Scalars['ID']
};


export type MutationCrmFirePhaserArgs = {
  id: Scalars['ID'],
  clientId: Scalars['ID'],
  target: Scalars['ID']
};


export type MutationCrmStopPhaserArgs = {
  id: Scalars['ID'],
  clientId: Scalars['ID']
};


export type MutationCrmSetFighterDockedArgs = {
  id: Scalars['ID'],
  clientId: Scalars['ID'],
  docked: Scalars['Boolean']
};


export type MutationCrmRestockTorpedosArgs = {
  id: Scalars['ID'],
  clientId: Scalars['ID']
};


export type MutationCrmSetAttackingArgs = {
  id: Scalars['ID'],
  attacking: Scalars['Boolean']
};


export type MutationCrmSetFighterImageArgs = {
  id: Scalars['ID'],
  image: Scalars['String']
};


export type MutationCrmSetFighterIconArgs = {
  id: Scalars['ID'],
  image: Scalars['String']
};


export type MutationCrmSetEnemyIconArgs = {
  id: Scalars['ID'],
  image: Scalars['String']
};


export type MutationCrmSetEnemyCountArgs = {
  id: Scalars['ID'],
  count: Scalars['Int']
};


export type MutationCrmRestoreFighterArgs = {
  id: Scalars['ID'],
  clientId: Scalars['ID']
};


export type MutationCrmDestroyUndockedFightersArgs = {
  id: Scalars['ID']
};


export type MutationCrmRestoreFightersArgs = {
  id: Scalars['ID']
};


export type MutationCrmSetFighterStrengthArgs = {
  id: Scalars['ID'],
  strength: Scalars['Float']
};


export type MutationCrmSetEnemyStrengthArgs = {
  id: Scalars['ID'],
  strength: Scalars['Float']
};


export type MutationDamageSystemArgs = {
  systemId: Scalars['ID'],
  report?: Maybe<Scalars['String']>,
  destroyed?: Maybe<Scalars['Boolean']>,
  which?: Maybe<Scalars['String']>
};


export type MutationDamageReportArgs = {
  systemId: Scalars['ID'],
  report: Scalars['String']
};


export type MutationUpdateCurrentDamageStepArgs = {
  systemId: Scalars['ID'],
  step: Scalars['Int']
};


export type MutationRepairSystemArgs = {
  systemId: Scalars['ID']
};


export type MutationRequestDamageReportArgs = {
  systemId: Scalars['ID']
};


export type MutationSystemReactivationCodeArgs = {
  systemId: Scalars['ID'],
  station: Scalars['String'],
  code: Scalars['String']
};


export type MutationSystemReactivationCodeResponseArgs = {
  systemId: Scalars['ID'],
  response: Scalars['Boolean']
};


export type MutationAddSystemDamageStepArgs = {
  systemId: Scalars['ID'],
  step: DamageStepInput
};


export type MutationUpdateSystemDamageStepArgs = {
  systemId: Scalars['ID'],
  step: DamageStepInput
};


export type MutationRemoveSystemDamageStepArgs = {
  systemId: Scalars['ID'],
  step: Scalars['ID']
};


export type MutationGenerateDamageReportArgs = {
  systemId: Scalars['ID'],
  steps?: Maybe<Scalars['Int']>
};


export type MutationAddSystemDamageTaskArgs = {
  systemId: Scalars['ID'],
  task: DamageTaskInput
};


export type MutationRemoveSystemDamageTaskArgs = {
  systemId: Scalars['ID'],
  taskId: Scalars['ID']
};


export type MutationUpdateSystemDamageTaskArgs = {
  systemId: Scalars['ID'],
  task: DamageTaskInput
};


export type MutationBreakSystemArgs = {
  simulatorId: Scalars['ID'],
  type: Scalars['String'],
  name?: Maybe<Scalars['String']>
};


export type MutationFixSystemArgs = {
  simulatorId: Scalars['ID'],
  type: Scalars['String'],
  name?: Maybe<Scalars['String']>
};


export type MutationSetDamageStepValidationArgs = {
  id: Scalars['ID'],
  validation: Scalars['Boolean']
};


export type MutationValidateDamageStepArgs = {
  id: Scalars['ID']
};


export type MutationAddSimulatorDamageStepArgs = {
  simulatorId: Scalars['ID'],
  step: DamageStepInput
};


export type MutationUpdateSimulatorDamageStepArgs = {
  simulatorId: Scalars['ID'],
  step: DamageStepInput
};


export type MutationRemoveSimulatorDamageStepArgs = {
  simulatorId: Scalars['ID'],
  step: Scalars['ID']
};


export type MutationAddSimulatorDamageTaskArgs = {
  simulatorId: Scalars['ID'],
  task: DamageTaskInput
};


export type MutationRemoveSimulatorDamageTaskArgs = {
  simulatorId: Scalars['ID'],
  taskId: Scalars['ID']
};


export type MutationUpdateSimulatorDamageTaskArgs = {
  simulatorId: Scalars['ID'],
  task: DamageTaskInput
};


export type MutationAddDeckArgs = {
  simulatorId: Scalars['ID'],
  number: Scalars['Int'],
  svgPath?: Maybe<Scalars['String']>,
  doors?: Maybe<Scalars['Boolean']>,
  evac?: Maybe<Scalars['Boolean']>
};


export type MutationRemoveDeckArgs = {
  deckId: Scalars['ID']
};


export type MutationAddDecksBulkArgs = {
  simulatorId: Scalars['ID'],
  decks: Scalars['String']
};


export type MutationUpdateDeckSvgArgs = {
  deckId: Scalars['ID'],
  svg: Scalars['String']
};


export type MutationDeckDoorsArgs = {
  deckId: Scalars['ID'],
  doors?: Maybe<Scalars['Boolean']>
};


export type MutationDeckEvacArgs = {
  deckId: Scalars['ID'],
  evac?: Maybe<Scalars['Boolean']>
};


export type MutationUpdateHallwaySvgArgs = {
  deckId: Scalars['ID'],
  svg?: Maybe<Scalars['String']>
};


export type MutationCreateDockingPortArgs = {
  port: DockingPortInput
};


export type MutationUpdateDockingPortArgs = {
  port: DockingPortInput
};


export type MutationRemoveDockingPortArgs = {
  port: Scalars['ID']
};


export type MutationAddSpeedArgs = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  speed: Array<Maybe<SpeedInput>>
};


export type MutationSetSpeedArgs = {
  id: Scalars['ID'],
  speed: Scalars['Int'],
  on?: Maybe<Scalars['Boolean']>
};


export type MutationSetEngineSpeedsArgs = {
  id: Scalars['ID'],
  speeds: Array<Maybe<SpeedInput>>
};


export type MutationAddHeatArgs = {
  id: Scalars['ID'],
  heat?: Maybe<Scalars['Float']>
};


export type MutationAddCoolantArgs = {
  id: Scalars['ID'],
  coolant?: Maybe<Scalars['Float']>
};


export type MutationSetHeatRateArgs = {
  id: Scalars['ID'],
  rate?: Maybe<Scalars['Float']>
};


export type MutationEngineCoolArgs = {
  id: Scalars['ID'],
  state?: Maybe<Scalars['Boolean']>
};


export type MutationSetEngineAccelerationArgs = {
  id: Scalars['ID'],
  acceleration: Scalars['Float']
};


export type MutationSetEngineUseAccelerationArgs = {
  id: Scalars['ID'],
  useAcceleration: Scalars['Boolean']
};


export type MutationSetEngineSpeedFactorArgs = {
  id: Scalars['ID'],
  speedFactor: Scalars['Float']
};


export type MutationUpdateEnvironmentArgs = {
  deckID: Scalars['ID'],
  environment?: Maybe<EnvironmentInput>
};


export type MutationSetSimulatorExocompsArgs = {
  simulatorId: Scalars['ID'],
  count: Scalars['Int']
};


export type MutationDeployExocompArgs = {
  exocomp: ExocompInput
};


export type MutationRecallExocompArgs = {
  exocomp: Scalars['ID']
};


export type MutationExocompCompleteUpgradeArgs = {
  exocomp: Scalars['ID']
};


export type MutationUpdateExocompDifficultyArgs = {
  exocomp: Scalars['ID'],
  difficulty: Scalars['Float']
};


export type MutationImportSimulatorFromUrlArgs = {
  url: Scalars['String']
};


export type MutationImportMissionFromUrlArgs = {
  url: Scalars['String']
};


export type MutationStartFlightArgs = {
  name?: Maybe<Scalars['String']>,
  simulators: Array<SimulatorInput>,
  flightType?: Maybe<Scalars['String']>
};


export type MutationResetFlightArgs = {
  flightId: Scalars['ID'],
  full?: Maybe<Scalars['Boolean']>
};


export type MutationDeleteFlightArgs = {
  flightId: Scalars['ID']
};


export type MutationPauseFlightArgs = {
  flightId: Scalars['ID']
};


export type MutationResumeFlightArgs = {
  flightId: Scalars['ID']
};


export type MutationClientAddExtraArgs = {
  flightId: Scalars['ID'],
  simulatorId: Scalars['ID'],
  name: Scalars['String']
};


export type MutationGoogleSheetsCompleteAuthorizeArgs = {
  token: Scalars['String']
};


export type MutationGoogleSheetsFileSearchArgs = {
  searchText: Scalars['String']
};


export type MutationGoogleSheetsAppendDataArgs = {
  spreadsheetId?: Maybe<Scalars['ID']>,
  sheetId?: Maybe<Scalars['String']>,
  data?: Maybe<Scalars['JSON']>
};


export type MutationAddInterfaceArgs = {
  name: Scalars['String']
};


export type MutationRenameInterfaceArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationRemoveInterfaceArgs = {
  id: Scalars['ID']
};


export type MutationUpdateInterfaceArgs = {
  id: Scalars['ID'],
  deviceType?: Maybe<Scalars['ID']>,
  components?: Maybe<Scalars['JSON']>,
  connections?: Maybe<Scalars['JSON']>,
  values?: Maybe<Scalars['JSON']>,
  config?: Maybe<Scalars['JSON']>
};


export type MutationAddInterfaceToSimulatorArgs = {
  simulatorId: Scalars['ID'],
  interfaceId: Scalars['ID']
};


export type MutationRemoveInterfaceFromSimulatorArgs = {
  simulatorId: Scalars['ID'],
  interfaceId: Scalars['ID']
};


export type MutationAddInterfaceDeviceArgs = {
  name: Scalars['String'],
  width: Scalars['Int'],
  height: Scalars['Int']
};


export type MutationRenameInterfaceDeviceArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationRemoveInterfaceDeviceArgs = {
  id: Scalars['ID']
};


export type MutationUpdateInterfaceDeviceArgs = {
  id: Scalars['ID'],
  width?: Maybe<Scalars['Int']>,
  height?: Maybe<Scalars['Int']>
};


export type MutationTriggerInterfaceObjectArgs = {
  id: Scalars['ID'],
  objectId: Scalars['ID']
};


export type MutationToggleInterfaceObjectHiddenArgs = {
  id: Scalars['ID'],
  objectId: Scalars['ID'],
  hidden: Scalars['Boolean']
};


export type MutationToggleInterfaceObjectPlayingArgs = {
  id: Scalars['ID'],
  objectId: Scalars['ID']
};


export type MutationInternalCommConnectOutgoingArgs = {
  id: Scalars['ID']
};


export type MutationInternalCommConnectIncomingArgs = {
  id: Scalars['ID']
};


export type MutationInternalCommCancelIncomingArgs = {
  id: Scalars['ID']
};


export type MutationInternalCommCancelOutgoingArgs = {
  id: Scalars['ID']
};


export type MutationInternalCommCallIncomingArgs = {
  id: Scalars['ID'],
  incoming?: Maybe<Scalars['String']>
};


export type MutationInternalCommCallOutgoingArgs = {
  id: Scalars['ID'],
  outgoing?: Maybe<Scalars['String']>
};


export type MutationAddInventoryArgs = {
  inventory?: Maybe<InventoryItemInput>
};


export type MutationRemoveInventoryArgs = {
  id?: Maybe<Scalars['ID']>
};


export type MutationMoveInventoryArgs = {
  id: Scalars['ID'],
  fromRoom: Scalars['ID'],
  toRoom: Scalars['ID'],
  count: Scalars['Int'],
  toSimulator?: Maybe<Scalars['ID']>
};


export type MutationUpdateInventoryCountArgs = {
  id: Scalars['ID'],
  room: Scalars['ID'],
  count: Scalars['Int']
};


export type MutationUpdateInventoryMetadataArgs = {
  id?: Maybe<Scalars['ID']>,
  metadata?: Maybe<InventoryMetadataInput>
};


export type MutationUpdateCrewInventoryArgs = {
  crewId: Scalars['ID'],
  inventory: Array<Maybe<InventoryCount>>,
  roomId?: Maybe<Scalars['ID']>
};


export type MutationRemoveCrewInventoryArgs = {
  crewId: Scalars['ID'],
  inventory: Array<Maybe<InventoryCount>>,
  roomId: Scalars['ID']
};


export type MutationTransferCargoArgs = {
  inventory?: Maybe<Array<Maybe<InventoryCountInput>>>,
  fromRoom: Scalars['ID'],
  toRoom: Scalars['ID']
};


export type MutationInsertIsochipArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  slot?: Maybe<Scalars['Int']>,
  chip?: Maybe<Scalars['Int']>
};


export type MutationUpdateIsochipArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  slot?: Maybe<Scalars['Int']>,
  isochip?: Maybe<IsochipInput>
};


export type MutationBatchIsochipUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  chips?: Maybe<Array<Maybe<IsochipInput>>>
};


export type MutationSetJumpdriveActivatedArgs = {
  id: Scalars['ID'],
  activated: Scalars['Boolean']
};


export type MutationSetJumpdriveEnvsArgs = {
  id: Scalars['ID'],
  envs: Scalars['Float']
};


export type MutationSetJumpdriveSectorLevelArgs = {
  id: Scalars['ID'],
  sector: Scalars['String'],
  level: Scalars['Int']
};


export type MutationSetJumpdriveSectorOffsetArgs = {
  id: Scalars['ID'],
  sector: Scalars['String'],
  offset: Scalars['Float']
};


export type MutationFluxJumpdriveSectorArgs = {
  id: Scalars['ID'],
  sector?: Maybe<Scalars['String']>
};


export type MutationSetJumpDriveEnabledArgs = {
  id: Scalars['ID'],
  enabled?: Maybe<Scalars['Boolean']>
};


export type MutationHitJumpDriveStressArgs = {
  id: Scalars['ID'],
  sector: Scalars['String']
};


export type MutationSetJumpDriveRingsExtendedArgs = {
  id: Scalars['ID'],
  ringsExtended: Scalars['Boolean']
};


export type MutationAddKeyboardArgs = {
  name: Scalars['String']
};


export type MutationRemoveKeyboardArgs = {
  id: Scalars['ID']
};


export type MutationRenameKeyboardArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationUpdateKeyboardKeyArgs = {
  id: Scalars['ID'],
  key: KeyboardKeyInput
};


export type MutationTriggerKeyboardActionArgs = {
  simulatorId: Scalars['ID'],
  id: Scalars['ID'],
  key: Scalars['String'],
  keyCode: Scalars['String'],
  meta: Array<Maybe<Scalars['String']>>
};


export type MutationAddLibraryEntryArgs = {
  entry: LibraryInput
};


export type MutationUpdateLibraryEntryArgs = {
  entry: LibraryInput
};


export type MutationRemoveLibraryEntryArgs = {
  entry?: Maybe<Scalars['ID']>,
  slug?: Maybe<Scalars['String']>
};


export type MutationImportLibraryEntryArgs = {
  simulatorId: Scalars['ID'],
  entries: Scalars['String']
};


export type MutationUpdateSimulatorLightingArgs = {
  id: Scalars['ID'],
  lighting: LightingInput
};


export type MutationDmxSetSimulatorConfigArgs = {
  simulatorId: Scalars['ID'],
  dmxConfigId: Scalars['ID']
};


export type MutationLightingSetIntensityArgs = {
  simulatorId: Scalars['ID'],
  intensity: Scalars['Float']
};


export type MutationLightingShakeLightsArgs = {
  simulatorId: Scalars['ID'],
  strength?: Maybe<Scalars['Float']>,
  duration?: Maybe<Scalars['Float']>
};


export type MutationLightingFadeLightsArgs = {
  simulatorId: Scalars['ID'],
  duration: Scalars['Float'],
  endIntensity: Scalars['Float'],
  startIntensity?: Maybe<Scalars['Float']>
};


export type MutationLightingSetEffectArgs = {
  simulatorId: Scalars['ID'],
  duration?: Maybe<Scalars['Float']>,
  strength?: Maybe<Scalars['Float']>,
  effect: Lighting_Action
};


export type MutationSendLongRangeMessageArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  message: Scalars['String'],
  crew?: Maybe<Scalars['Boolean']>,
  sender?: Maybe<Scalars['String']>,
  decoded?: Maybe<Scalars['Boolean']>
};


export type MutationLongRangeMessageSendArgs = {
  id?: Maybe<Scalars['ID']>,
  message: Scalars['ID']
};


export type MutationDeleteLongRangeMessageArgs = {
  id: Scalars['ID'],
  message: Scalars['ID']
};


export type MutationUpdateLongRangeDecodedMessageArgs = {
  id: Scalars['ID'],
  messageId: Scalars['ID'],
  decodedMessage?: Maybe<Scalars['String']>,
  a?: Maybe<Scalars['Int']>,
  f?: Maybe<Scalars['Int']>
};


export type MutationUpdateLongRangeCommArgs = {
  longRangeComm: LongRangeCommInput
};


export type MutationApproveLongRangeMessageArgs = {
  id: Scalars['ID'],
  message: Scalars['ID']
};


export type MutationEncryptLongRangeMessageArgs = {
  id: Scalars['ID'],
  message: Scalars['ID']
};


export type MutationSetLongRangeSatellitesArgs = {
  id: Scalars['ID'],
  num: Scalars['Int']
};


export type MutationAddInterceptionSignalArgs = {
  id: Scalars['ID']
};


export type MutationRemoveInterceptionSignalArgs = {
  id: Scalars['ID']
};


export type MutationSetInterceptionDifficultyArgs = {
  id: Scalars['ID'],
  difficulty: Scalars['Int']
};


export type MutationSetLongRangePresetMessagesArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  messages?: Maybe<Array<Maybe<PresetAnswerInput>>>
};


export type MutationAddMacroArgs = {
  name: Scalars['String']
};


export type MutationRemoveMacroArgs = {
  id: Scalars['ID']
};


export type MutationRenameMacroArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationDuplicateMacroArgs = {
  id: Scalars['ID']
};


export type MutationDuplicateMacroActionArgs = {
  id: Scalars['ID'],
  actionId: Scalars['ID']
};


export type MutationUpdateMacroActionsArgs = {
  id: Scalars['ID'],
  actions?: Maybe<Array<Maybe<ActionInput>>>
};


export type MutationTriggerMacroActionArgs = {
  simulatorId: Scalars['ID'],
  macroId: Scalars['ID']
};


export type MutationAddMacroButtonConfigArgs = {
  name: Scalars['String']
};


export type MutationRemoveMacroButtonConfigArgs = {
  id: Scalars['ID']
};


export type MutationRenameMacroButtonConfigArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationAddMacroButtonArgs = {
  configId: Scalars['ID'],
  name: Scalars['String']
};


export type MutationRemoveMacroButtonArgs = {
  configId: Scalars['ID'],
  id: Scalars['ID']
};


export type MutationRenameMacroButtonArgs = {
  configId: Scalars['ID'],
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationSetMacroButtonCategoryArgs = {
  configId: Scalars['ID'],
  id: Scalars['ID'],
  category: Scalars['String']
};


export type MutationSetMacroButtonColorArgs = {
  configId: Scalars['ID'],
  id: Scalars['ID'],
  color: NotifyColors
};


export type MutationUpdateMacroButtonActionsArgs = {
  configId: Scalars['ID'],
  id: Scalars['ID'],
  actions?: Maybe<Array<Maybe<ActionInput>>>
};


export type MutationTriggerMacroButtonArgs = {
  simulatorId: Scalars['ID'],
  configId: Scalars['ID'],
  buttonId: Scalars['ID']
};


export type MutationToggleStationMessageGroupArgs = {
  stationSetId: Scalars['ID'],
  station: Scalars['String'],
  group: Scalars['String'],
  state: Scalars['Boolean']
};


export type MutationSendMessageArgs = {
  message: MessageInput
};


export type MutationMidiSetCreateArgs = {
  name: Scalars['String'],
  deviceName: Scalars['String']
};


export type MutationMidiSetRenameArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationMidiSetRemoveArgs = {
  id: Scalars['ID']
};


export type MutationMidiSetControlArgs = {
  id: Scalars['ID'],
  control: MidiControlInput
};


export type MutationSimulatorAddMidiSetArgs = {
  simulatorId: Scalars['ID'],
  midiSet: Scalars['ID']
};


export type MutationSimulatorRemoveMidiSetArgs = {
  simulatorId: Scalars['ID'],
  midiSet: Scalars['ID']
};


export type MutationCreateMissionArgs = {
  name: Scalars['String']
};


export type MutationRemoveMissionArgs = {
  missionId: Scalars['ID']
};


export type MutationEditMissionArgs = {
  missionId: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>,
  aux?: Maybe<Scalars['Boolean']>,
  simulators?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type MutationImportMissionArgs = {
  jsonString: Scalars['String']
};


export type MutationAddTimelineStepArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  missionId?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>
};


export type MutationRemoveTimelineStepArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  missionId?: Maybe<Scalars['ID']>,
  timelineStepId: Scalars['ID']
};


export type MutationReorderTimelineStepArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  missionId?: Maybe<Scalars['ID']>,
  timelineStepId: Scalars['ID'],
  order: Scalars['Int']
};


export type MutationUpdateTimelineStepArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  missionId?: Maybe<Scalars['ID']>,
  timelineStepId: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>
};


export type MutationAddTimelineItemToTimelineStepArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  missionId?: Maybe<Scalars['ID']>,
  timelineStepId: Scalars['ID'],
  timelineItem: TimelineItemInput
};


export type MutationRemoveTimelineStepItemArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  missionId?: Maybe<Scalars['ID']>,
  timelineStepId: Scalars['ID'],
  timelineItemId: Scalars['ID']
};


export type MutationUpdateTimelineStepItemArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  missionId?: Maybe<Scalars['ID']>,
  timelineStepId: Scalars['ID'],
  timelineItemId: Scalars['ID'],
  updateTimelineItem: TimelineItemInput
};


export type MutationDuplicateTimelineStepArgs = {
  missionId: Scalars['ID'],
  timelineStepId: Scalars['ID']
};


export type MutationTimelineDuplicateItemArgs = {
  missionId: Scalars['ID'],
  timelineStepId: Scalars['ID'],
  timelineItemId: Scalars['ID']
};


export type MutationStartAuxTimelineArgs = {
  simulatorId: Scalars['ID'],
  missionId: Scalars['ID']
};


export type MutationSetAuxTimelineStepArgs = {
  simulatorId: Scalars['ID'],
  timelineId: Scalars['ID'],
  step: Scalars['Int']
};


export type MutationMissionSetExtraRequirementsArgs = {
  missionId: Scalars['ID'],
  requirements: RequirementInput
};


export type MutationMotuAddArgs = {
  address: Scalars['String']
};


export type MutationMotuRemoveArgs = {
  id: Scalars['ID']
};


export type MutationMotuUpdateChannelArgs = {
  id: Scalars['ID'],
  channelId: Scalars['ID'],
  channel: MotuChannelInput
};


export type MutationMotuSetSendMuteArgs = {
  id: Scalars['ID'],
  inputId: Scalars['ID'],
  outputId: Scalars['ID'],
  mute: Scalars['Boolean']
};


export type MutationNavCalculateCourseArgs = {
  id: Scalars['ID'],
  destination: Scalars['String']
};


export type MutationNavCancelCalculationArgs = {
  id: Scalars['ID']
};


export type MutationNavCourseResponseArgs = {
  id: Scalars['ID'],
  x?: Maybe<Scalars['String']>,
  y?: Maybe<Scalars['String']>,
  z?: Maybe<Scalars['String']>
};


export type MutationNavCourseEntryArgs = {
  id: Scalars['ID'],
  x?: Maybe<Scalars['String']>,
  y?: Maybe<Scalars['String']>,
  z?: Maybe<Scalars['String']>
};


export type MutationNavToggleCalculateArgs = {
  id: Scalars['ID'],
  which: Scalars['Boolean']
};


export type MutationNavSetDestinationsArgs = {
  id?: Maybe<Scalars['ID']>,
  destinations?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type MutationNavSetDestinationArgs = {
  id?: Maybe<Scalars['ID']>,
  destination?: Maybe<Scalars['String']>
};


export type MutationNavSetScanningArgs = {
  id?: Maybe<Scalars['ID']>,
  scanning?: Maybe<Scalars['Boolean']>
};


export type MutationNavSetThrustersArgs = {
  id: Scalars['ID'],
  thrusters?: Maybe<Scalars['Boolean']>
};


export type MutationNavSetPresetsArgs = {
  id?: Maybe<Scalars['ID']>,
  presets?: Maybe<NavPresetInput>
};


export type MutationAddObjectiveArgs = {
  objective: ObjectiveInput
};


export type MutationCompleteObjectiveArgs = {
  id: Scalars['ID'],
  title?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['Boolean']>,
  cancel?: Maybe<Scalars['Boolean']>
};


export type MutationObjectiveSetCrewCompleteArgs = {
  id: Scalars['ID'],
  crewComplete: Scalars['Boolean']
};


export type MutationAddLogArgs = {
  log?: Maybe<LogInput>
};


export type MutationChargePhaserBeamArgs = {
  id: Scalars['ID'],
  beamId: Scalars['ID']
};


export type MutationDischargePhaserBeamArgs = {
  id: Scalars['ID'],
  beamId: Scalars['ID']
};


export type MutationFirePhaserBeamArgs = {
  id: Scalars['ID'],
  beamId: Scalars['ID']
};


export type MutationStopPhaserBeamsArgs = {
  id: Scalars['ID']
};


export type MutationCoolPhaserBeamArgs = {
  id: Scalars['ID'],
  beamId?: Maybe<Scalars['ID']>
};


export type MutationPhaserArcArgs = {
  id: Scalars['ID'],
  arc: Scalars['Float']
};


export type MutationSetPhaserBeamChargeArgs = {
  id: Scalars['ID'],
  beamId: Scalars['ID'],
  charge: Scalars['Float']
};


export type MutationSetPhaserBeamHeatArgs = {
  id: Scalars['ID'],
  beamId: Scalars['ID'],
  heat: Scalars['Float']
};


export type MutationSetPhaserBeamCountArgs = {
  id: Scalars['ID'],
  beamCount: Scalars['Int']
};


export type MutationSetPhaserHoldToChargeArgs = {
  id: Scalars['ID'],
  holdToCharge: Scalars['Boolean']
};


export type MutationSetPhaserChargeSpeedArgs = {
  id: Scalars['ID'],
  speed: Scalars['Float']
};


export type MutationStopChargingPhasersArgs = {
  id: Scalars['ID']
};


export type MutationChangePowerArgs = {
  systemId: Scalars['ID'],
  power: Scalars['Int']
};


export type MutationChangeSystemPowerLevelsArgs = {
  systemId: Scalars['ID'],
  powerLevels: Array<Maybe<Scalars['Int']>>
};


export type MutationChangeSystemDefaultPowerLevelArgs = {
  id: Scalars['ID'],
  level: Scalars['Int']
};


export type MutationFluxSystemPowerArgs = {
  id?: Maybe<Scalars['ID']>,
  all?: Maybe<Scalars['Boolean']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>
};


export type MutationDestroyProbeArgs = {
  id: Scalars['ID'],
  probeId: Scalars['ID']
};


export type MutationDestroyAllProbesArgs = {
  id: Scalars['ID']
};


export type MutationLaunchProbeArgs = {
  id: Scalars['ID'],
  probe: ProbeInput
};


export type MutationFireProbeArgs = {
  id: Scalars['ID'],
  probeId: Scalars['ID']
};


export type MutationUpdateProbeTypeArgs = {
  id: Scalars['ID'],
  probeType: ProbeTypeInput
};


export type MutationUpdateProbeEquipmentArgs = {
  id: Scalars['ID'],
  probeEquipment: ProbeEquipmentInput
};


export type MutationProbeQueryArgs = {
  id: Scalars['ID'],
  probeId: Scalars['ID'],
  query?: Maybe<Scalars['String']>
};


export type MutationProbeQueryResponseArgs = {
  id: Scalars['ID'],
  probeId: Scalars['ID'],
  response?: Maybe<Scalars['String']>
};


export type MutationProbeProcessedDataArgs = {
  id: Scalars['ID'],
  data?: Maybe<Scalars['String']>,
  flash?: Maybe<Scalars['Boolean']>
};


export type MutationSetProbeTorpedoArgs = {
  id: Scalars['ID'],
  torpedo: Scalars['Boolean']
};


export type MutationSetProbeChargeArgs = {
  id: Scalars['ID'],
  probeId: Scalars['ID'],
  charge: Scalars['Float']
};


export type MutationActivateProbeEmitterArgs = {
  id: Scalars['ID'],
  probeId: Scalars['ID']
};


export type MutationSetRailgunAmmoArgs = {
  id: Scalars['ID'],
  ammo?: Maybe<Scalars['Int']>
};


export type MutationSetRailgunMaxAmmoArgs = {
  id: Scalars['ID'],
  ammo: Scalars['Int']
};


export type MutationSetRailgunAvailableAmmoArgs = {
  id: Scalars['ID'],
  ammo: Scalars['Int']
};


export type MutationFireRailgunArgs = {
  id: Scalars['ID'],
  simulatorId: Scalars['ID'],
  contactId?: Maybe<Scalars['ID']>
};


export type MutationLoadRailgunArgs = {
  id: Scalars['ID']
};


export type MutationReactorEjectArgs = {
  id: Scalars['ID'],
  tf: Scalars['Boolean']
};


export type MutationReactorChangeModelArgs = {
  id: Scalars['ID'],
  model: Scalars['String']
};


export type MutationReactorChangeOutputArgs = {
  id: Scalars['ID'],
  output: Scalars['Int']
};


export type MutationReactorChangeEfficiencyArgs = {
  id: Scalars['ID'],
  efficiency?: Maybe<Scalars['Float']>
};


export type MutationReactorBatteryChargeLevelArgs = {
  id: Scalars['ID'],
  level: Scalars['Float']
};


export type MutationReactorBatteryChargeRateArgs = {
  id: Scalars['ID'],
  rate: Scalars['Float']
};


export type MutationUpdateDilithiumStressArgs = {
  id: Scalars['ID'],
  alphaLevel?: Maybe<Scalars['Float']>,
  betaLevel?: Maybe<Scalars['Float']>,
  alphaTarget?: Maybe<Scalars['Float']>,
  betaTarget?: Maybe<Scalars['Float']>
};


export type MutationFluxDilithiumStressArgs = {
  id: Scalars['ID']
};


export type MutationSetReactorEffcicienciesArgs = {
  id: Scalars['ID'],
  efficiencies: Array<Maybe<ReactorEfficiencyInput>>
};


export type MutationSetDilithiumStressRateArgs = {
  id: Scalars['ID'],
  rate: Scalars['Float']
};


export type MutationReactorRequireBalanceArgs = {
  id: Scalars['ID'],
  balance: Scalars['Boolean']
};


export type MutationReactorSetHasWingsArgs = {
  id: Scalars['ID'],
  hasWings: Scalars['Boolean']
};


export type MutationReactorSetWingPowerArgs = {
  id: Scalars['ID'],
  wing: Scalars['String'],
  power: Scalars['Int']
};


export type MutationReactorRequestWingPowerArgs = {
  id: Scalars['ID'],
  wing: Scalars['String'],
  power: Scalars['Int']
};


export type MutationReactorAckWingRequestArgs = {
  id: Scalars['ID'],
  wing: Scalars['String'],
  ack: Scalars['Boolean']
};


export type MutationRecordsCreateArgs = {
  simulatorId: Scalars['ID'],
  contents: Scalars['String'],
  timestamp?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>
};


export type MutationRecordsCreateSnippetArgs = {
  simulatorId: Scalars['ID'],
  recordIds: Array<Scalars['ID']>,
  name: Scalars['String'],
  type?: Maybe<RecordSnippetType>
};


export type MutationRecordsAddToSnippetArgs = {
  simulatorId: Scalars['ID'],
  snippetId: Scalars['ID'],
  recordIds: Array<Scalars['ID']>
};


export type MutationRecordsRemoveFromSnippetArgs = {
  simulatorId: Scalars['ID'],
  snippetId: Scalars['ID'],
  recordId: Scalars['ID']
};


export type MutationRecordsDeleteRecordArgs = {
  simulatorId: Scalars['ID'],
  recordId: Scalars['ID']
};


export type MutationRecordsGenerateRecordsArgs = {
  simulatorId: Scalars['ID'],
  name: Scalars['String'],
  count?: Maybe<Scalars['Int']>,
  visible?: Maybe<Scalars['Boolean']>
};


export type MutationRecordsCreateOnSnippetArgs = {
  simulatorId: Scalars['ID'],
  snippetId?: Maybe<Scalars['ID']>,
  snippetName?: Maybe<Scalars['String']>,
  contents: Scalars['String'],
  timestamp?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>
};


export type MutationRecordsShowSnippetArgs = {
  simulatorId: Scalars['ID'],
  snippetId: Scalars['ID']
};


export type MutationRecordsHideSnippetArgs = {
  simulatorId: Scalars['ID'],
  snippetId: Scalars['ID']
};


export type MutationRecordTemplateCreateSnippetArgs = {
  name: Scalars['String']
};


export type MutationRecordTemplateAddToSnippetArgs = {
  snippetId: Scalars['ID'],
  contents: Scalars['String'],
  timestamp?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>,
  modified?: Maybe<Scalars['Boolean']>
};


export type MutationRecordTemplateDeleteSnippetArgs = {
  snippetId: Scalars['ID']
};


export type MutationRecordTemplateRenameArgs = {
  snippetId: Scalars['ID'],
  name: Scalars['String']
};


export type MutationRecordTemplateUpdateRecordArgs = {
  snippetId: Scalars['ID'],
  recordId?: Maybe<Scalars['ID']>,
  contents?: Maybe<Scalars['String']>,
  timestamp?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>,
  modified?: Maybe<Scalars['Boolean']>
};


export type MutationRecordTemplateRemoveFromSnippetArgs = {
  snippetId: Scalars['ID'],
  recordId: Scalars['ID']
};


export type MutationAddRoomArgs = {
  simulatorId: Scalars['ID'],
  deckId?: Maybe<Scalars['ID']>,
  deckNumber?: Maybe<Scalars['Int']>,
  name: Scalars['String'],
  svgPath?: Maybe<Scalars['String']>
};


export type MutationRemoveRoomArgs = {
  roomId: Scalars['ID']
};


export type MutationAddRoomsBulkArgs = {
  simulatorId: Scalars['ID'],
  rooms: Scalars['String']
};


export type MutationRenameRoomArgs = {
  roomId: Scalars['ID'],
  name: Scalars['String']
};


export type MutationUpdateRoomRolesArgs = {
  roomId: Scalars['ID'],
  roles?: Maybe<Array<Maybe<RoomRoles>>>
};


export type MutationUpdateRoomSvgArgs = {
  roomId: Scalars['ID'],
  svg: Scalars['String']
};


export type MutationRoomGasArgs = {
  roomId: Scalars['ID'],
  gas?: Maybe<Scalars['Boolean']>
};


export type MutationImportRoomsArgs = {
  simulatorId: Scalars['ID'],
  rooms: Array<Maybe<RoomInput>>
};


export type MutationChangeRoomDeckArgs = {
  roomId: Scalars['ID'],
  deckId: Scalars['ID']
};


export type MutationTestArgs = {
  key?: Maybe<Scalars['String']>
};


export type MutationSensorScanRequestArgs = {
  id: Scalars['ID'],
  request: Scalars['String']
};


export type MutationSensorScanResultArgs = {
  id: Scalars['ID'],
  domain?: Maybe<Scalars['String']>,
  result: Scalars['String']
};


export type MutationProcessedDataArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  domain?: Maybe<Scalars['String']>,
  data: Scalars['String'],
  flash?: Maybe<Scalars['Boolean']>
};


export type MutationRemoveProcessedDataArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  domain?: Maybe<Scalars['String']>,
  time: Scalars['String']
};


export type MutationSensorScanCancelArgs = {
  id: Scalars['ID']
};


export type MutationSetPresetAnswersArgs = {
  simulatorId: Scalars['ID'],
  domain: Scalars['String'],
  presetAnswers: Array<Maybe<PresetAnswerInput>>
};


export type MutationCreateSensorContactArgs = {
  id: Scalars['ID'],
  contact: SensorContactInput
};


export type MutationCreateSensorContactsArgs = {
  id: Scalars['ID'],
  contacts: Array<SensorContactInput>
};


export type MutationMoveSensorContactArgs = {
  id: Scalars['ID'],
  contact: SensorContactInput
};


export type MutationRemoveSensorContactArgs = {
  id: Scalars['ID'],
  contact: SensorContactInput
};


export type MutationRemoveAllSensorContactsArgs = {
  id: Scalars['ID'],
  type?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type MutationStopAllSensorContactsArgs = {
  id: Scalars['ID']
};


export type MutationUpdateSensorContactArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  contact: SensorContactInput
};


export type MutationSetArmyContactsArgs = {
  simulatorId: Scalars['ID'],
  domain: Scalars['String'],
  armyContacts: Array<Maybe<SensorContactInput>>
};


export type MutationCreateSensorArmyContactArgs = {
  id: Scalars['ID'],
  contact: SensorContactInput
};


export type MutationRemoveSensorArmyContactArgs = {
  id: Scalars['ID'],
  contact: Scalars['ID']
};


export type MutationUpdateSensorArmyContactArgs = {
  id: Scalars['ID'],
  contact: SensorContactInput
};


export type MutationNudgeSensorContactsArgs = {
  id: Scalars['ID'],
  amount?: Maybe<CoordinatesInput>,
  speed: Scalars['Float'],
  yaw?: Maybe<Scalars['Float']>
};


export type MutationSensorsSetHasPingArgs = {
  id: Scalars['ID'],
  ping: Scalars['Boolean']
};


export type MutationSetSensorPingModeArgs = {
  id: Scalars['ID'],
  mode?: Maybe<Ping_Modes>
};


export type MutationPingSensorsArgs = {
  id: Scalars['ID']
};


export type MutationSetSensorsHistoryArgs = {
  id: Scalars['ID'],
  history: Scalars['Boolean']
};


export type MutationNewSensorScanArgs = {
  id: Scalars['ID'],
  scan: SensorScanInput
};


export type MutationUpdateSensorScanArgs = {
  id: Scalars['ID'],
  scan: SensorScanInput
};


export type MutationCancelSensorScanArgs = {
  id: Scalars['ID'],
  scan: Scalars['ID']
};


export type MutationToggleSensorsAutoTargetArgs = {
  id: Scalars['ID'],
  target: Scalars['Boolean']
};


export type MutationToggleSensorsAutoThrustersArgs = {
  id: Scalars['ID'],
  thrusters: Scalars['Boolean']
};


export type MutationSetSensorsInterferenceArgs = {
  id: Scalars['ID'],
  interference: Scalars['Float']
};


export type MutationSetSensorsSegmentArgs = {
  id: Scalars['ID'],
  ring: Scalars['Int'],
  line: Scalars['Int'],
  state: Scalars['Boolean']
};


export type MutationSetAutoMovementArgs = {
  id: Scalars['ID'],
  movement: CoordinatesInput
};


export type MutationUpdateSensorContactsArgs = {
  id: Scalars['ID'],
  contacts: Array<Maybe<SensorContactInput>>
};


export type MutationUpdateSensorGridArgs = {
  simulatorId: Scalars['ID'],
  contacts: Array<Maybe<SensorContactInput>>
};


export type MutationDestroySensorContactArgs = {
  id: Scalars['ID'],
  contact?: Maybe<Scalars['ID']>,
  contacts?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type MutationSensorsFireProjectileArgs = {
  simulatorId: Scalars['ID'],
  contactId: Scalars['ID'],
  speed: Scalars['Float'],
  hitpoints: Scalars['Int'],
  miss?: Maybe<Scalars['Boolean']>
};


export type MutationSetSensorsDefaultHitpointsArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  hp: Scalars['Int']
};


export type MutationSetSensorsDefaultSpeedArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  speed: Scalars['Float']
};


export type MutationSetSensorsMissPercentArgs = {
  id: Scalars['ID'],
  miss: Scalars['Float']
};


export type MutationCreateSetArgs = {
  name: Scalars['String']
};


export type MutationRemoveSetArgs = {
  id: Scalars['ID']
};


export type MutationAddClientToSetArgs = {
  id: Scalars['ID'],
  client: SetClientInput
};


export type MutationRemoveClientFromSetArgs = {
  id: Scalars['ID'],
  clientId: Scalars['ID']
};


export type MutationUpdateSetClientArgs = {
  id: Scalars['ID'],
  client: SetClientInput
};


export type MutationRenameSetArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationShieldRaisedArgs = {
  id: Scalars['ID']
};


export type MutationShieldLoweredArgs = {
  id: Scalars['ID']
};


export type MutationShieldIntegritySetArgs = {
  id: Scalars['ID'],
  integrity?: Maybe<Scalars['Float']>
};


export type MutationShieldFrequencySetArgs = {
  id: Scalars['ID'],
  frequency?: Maybe<Scalars['Float']>
};


export type MutationShieldFrequencySetAllArgs = {
  simulatorId: Scalars['ID'],
  frequency: Scalars['Float']
};


export type MutationHitShieldsArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>
};


export type MutationRestoreShieldsArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type MutationShipDockingChangeArgs = {
  simulatorId: Scalars['ID'],
  which: Scalars['String'],
  state: Scalars['Boolean']
};


export type MutationShipSetDockingArgs = {
  simulatorId: Scalars['ID'],
  clamps?: Maybe<Scalars['Boolean']>,
  ramps?: Maybe<Scalars['Boolean']>,
  airlock?: Maybe<Scalars['Boolean']>,
  legs?: Maybe<Scalars['Boolean']>
};


export type MutationRemoteAccessSendCodeArgs = {
  simulatorId: Scalars['ID'],
  code: Scalars['String'],
  station: Scalars['String']
};


export type MutationRemoteAccessUpdateCodeArgs = {
  simulatorId: Scalars['ID'],
  codeId: Scalars['ID'],
  state: Scalars['String']
};


export type MutationSetSelfDestructTimeArgs = {
  simulatorId: Scalars['ID'],
  time?: Maybe<Scalars['Float']>
};


export type MutationSetSelfDestructCodeArgs = {
  simulatorId: Scalars['ID'],
  code?: Maybe<Scalars['String']>
};


export type MutationSetSelfDestructAutoArgs = {
  simulatorId: Scalars['ID'],
  auto?: Maybe<Scalars['Boolean']>
};


export type MutationNotifyArgs = {
  simulatorId: Scalars['ID'],
  type?: Maybe<Scalars['String']>,
  station?: Maybe<Scalars['String']>,
  title: Scalars['String'],
  body?: Maybe<Scalars['String']>,
  color?: Maybe<NotifyColors>
};


export type MutationPrintPdfArgs = {
  asset: Scalars['String']
};


export type MutationCommAddSignalArgs = {
  id: Scalars['ID'],
  commSignalInput: CommSignalInput
};


export type MutationCommUpdateSignalArgs = {
  id: Scalars['ID'],
  commSignalInput: CommSignalInput
};


export type MutationCommUpdateSignalsArgs = {
  id: Scalars['ID'],
  signals: Array<Maybe<CommSignalInput>>
};


export type MutationCommRemoveSignalArgs = {
  id: Scalars['ID'],
  signalId: Scalars['ID']
};


export type MutationCommAddArrowArgs = {
  id: Scalars['ID'],
  commArrowInput: CommArrowInput
};


export type MutationCommRemoveArrowArgs = {
  id: Scalars['ID'],
  arrowId: Scalars['ID']
};


export type MutationCommConnectArrowArgs = {
  id: Scalars['ID'],
  arrowId: Scalars['ID']
};


export type MutationCommDisconnectArrowArgs = {
  id: Scalars['ID'],
  arrowId: Scalars['ID']
};


export type MutationCommUpdateArgs = {
  id: Scalars['ID'],
  commUpdateInput: CommUpdateInput
};


export type MutationCommHailArgs = {
  id: Scalars['ID']
};


export type MutationCancelHailArgs = {
  id: Scalars['ID'],
  core?: Maybe<Scalars['Boolean']>
};


export type MutationConnectHailArgs = {
  id: Scalars['ID']
};


export type MutationAddShortRangeCommArgs = {
  simulatorId: Scalars['ID'],
  frequency?: Maybe<Scalars['Float']>,
  signalName?: Maybe<Scalars['String']>
};


export type MutationRemoveShortRangeCommArgs = {
  simulatorId: Scalars['ID'],
  frequency?: Maybe<Scalars['Float']>,
  signalName?: Maybe<Scalars['String']>
};


export type MutationMuteShortRangeCommArgs = {
  id: Scalars['ID'],
  arrowId: Scalars['ID'],
  mute: Scalars['Boolean']
};


export type MutationSetSickbayBunksArgs = {
  id: Scalars['ID'],
  count?: Maybe<Scalars['Int']>
};


export type MutationAddSickbayCrewArgs = {
  id: Scalars['ID'],
  crew: CrewInput
};


export type MutationRemoveSickbayCrewArgs = {
  id: Scalars['ID'],
  crewId: Scalars['ID']
};


export type MutationUpdateSickbayCrewArgs = {
  id: Scalars['ID'],
  crewId: Scalars['ID'],
  crew: CrewInput
};


export type MutationScanSickbayBunkArgs = {
  id: Scalars['ID'],
  bunkId: Scalars['ID'],
  request: Scalars['String']
};


export type MutationCancelSickbayBunkScanArgs = {
  id: Scalars['ID'],
  bunkId: Scalars['ID']
};


export type MutationSickbayBunkScanResponseArgs = {
  id: Scalars['ID'],
  bunkId: Scalars['ID'],
  response: Scalars['String']
};


export type MutationAssignPatientArgs = {
  id: Scalars['ID'],
  bunkId: Scalars['ID'],
  crewId: Scalars['ID']
};


export type MutationDischargePatientArgs = {
  id: Scalars['ID'],
  bunkId: Scalars['ID']
};


export type MutationStartDeconProgramArgs = {
  id?: Maybe<Scalars['ID']>,
  program: Scalars['String'],
  location: Scalars['String']
};


export type MutationUpdateDeconOffsetArgs = {
  id: Scalars['ID'],
  offset: Scalars['Float']
};


export type MutationCancelDeconProgramArgs = {
  id: Scalars['ID']
};


export type MutationCompleteDeconProgramArgs = {
  id: Scalars['ID']
};


export type MutationSetDeconAutoFinishArgs = {
  id: Scalars['ID'],
  finish: Scalars['Boolean']
};


export type MutationUpdatePatientChartArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  crewId: Scalars['ID'],
  chart: ChartInput
};


export type MutationUpdateSignalJammerArgs = {
  jammer: SignalJammerInput
};


export type MutationSignalJammerSignalsArgs = {
  id: Scalars['ID'],
  type: Scalars['String'],
  signals: Scalars['Int']
};


export type MutationFluxSignalJammerArgs = {
  id?: Maybe<Scalars['ID']>
};


export type MutationSetSignalJammerSensorsInterferenceArgs = {
  id: Scalars['ID'],
  interference: Scalars['Boolean']
};


export type MutationCreateSimulatorArgs = {
  name: Scalars['String'],
  template?: Maybe<Scalars['Boolean']>
};


export type MutationRemoveSimulatorArgs = {
  simulatorId: Scalars['ID']
};


export type MutationTriggerMacrosArgs = {
  simulatorId: Scalars['ID'],
  macros: Array<Maybe<MacroInput>>
};


export type MutationAutoAdvanceArgs = {
  simulatorId: Scalars['ID'],
  prev?: Maybe<Scalars['Boolean']>,
  limited?: Maybe<Scalars['Boolean']>
};


export type MutationTrainingModeArgs = {
  simulatorId: Scalars['ID']
};


export type MutationSetAlertConditionLockArgs = {
  simulatorId: Scalars['ID'],
  lock: Scalars['Boolean']
};


export type MutationRenameSimulatorArgs = {
  simulatorId: Scalars['ID'],
  name: Scalars['String']
};


export type MutationChangeSimulatorLayoutArgs = {
  simulatorId: Scalars['ID'],
  layout: Scalars['String']
};


export type MutationChangeSimulatorCapsArgs = {
  simulatorId: Scalars['ID'],
  caps: Scalars['Boolean']
};


export type MutationChangeSimulatorAlertLevelArgs = {
  simulatorId: Scalars['ID'],
  alertLevel: Scalars['String']
};


export type MutationHideSimulatorCardArgs = {
  simulatorId: Scalars['ID'],
  cardName: Scalars['String'],
  delay?: Maybe<Scalars['Int']>
};


export type MutationUnhideSimulatorCardArgs = {
  simulatorId: Scalars['ID'],
  cardName: Scalars['String']
};


export type MutationStationAssignCardArgs = {
  simulatorId: Scalars['ID'],
  assignedToStation: Scalars['String'],
  cardName: Scalars['String']
};


export type MutationStationUnassignCardArgs = {
  simulatorId: Scalars['ID'],
  cardName: Scalars['String']
};


export type MutationFlipSimulatorArgs = {
  simulatorId: Scalars['ID'],
  flip: Scalars['Boolean']
};


export type MutationToggleSimulatorCardHiddenArgs = {
  simulatorId: Scalars['ID'],
  cardName: Scalars['String'],
  toggle: Scalars['Boolean']
};


export type MutationChangeSimulatorExocompsArgs = {
  simulatorId: Scalars['ID'],
  exocomps: Scalars['Int']
};


export type MutationChangeSimulatorBridgeCrewArgs = {
  simulatorId: Scalars['ID'],
  crew: Scalars['Int']
};


export type MutationChangeSimulatorExtraPeopleArgs = {
  simulatorId: Scalars['ID'],
  crew: Scalars['Int']
};


export type MutationChangeSimulatorRadiationArgs = {
  simulatorId: Scalars['ID'],
  radiation: Scalars['Float']
};


export type MutationSetSimulatorTimelineStepArgs = {
  simulatorId: Scalars['ID'],
  timelineId?: Maybe<Scalars['ID']>,
  step: Scalars['Int']
};


export type MutationSetSimulatorMissionArgs = {
  simulatorId: Scalars['ID'],
  missionId: Scalars['ID'],
  stepId?: Maybe<Scalars['ID']>
};


export type MutationSetSimulatorMissionConfigArgs = {
  simulatorId: Scalars['ID'],
  missionId: Scalars['ID'],
  stationSetId: Scalars['ID'],
  actionId: Scalars['ID'],
  args: Scalars['JSON']
};


export type MutationUpdateSimulatorPanelsArgs = {
  simulatorId: Scalars['ID'],
  panels: Array<Maybe<Scalars['ID']>>
};


export type MutationUpdateSimulatorCommandLinesArgs = {
  simulatorId: Scalars['ID'],
  commandLines: Array<Maybe<Scalars['ID']>>
};


export type MutationUpdateSimulatorTriggersArgs = {
  simulatorId: Scalars['ID'],
  triggers: Array<Maybe<Scalars['ID']>>
};


export type MutationSetSimulatorTriggersPausedArgs = {
  simulatorId: Scalars['ID'],
  paused: Scalars['Boolean']
};


export type MutationUpdateSimulatorInterfacesArgs = {
  simulatorId: Scalars['ID'],
  interfaces: Array<Maybe<Scalars['ID']>>
};


export type MutationSetStepDamageArgs = {
  simulatorId: Scalars['ID'],
  stepDamage: Scalars['Boolean']
};


export type MutationSetVerifyDamageArgs = {
  simulatorId: Scalars['ID'],
  verifyStep: Scalars['Boolean']
};


export type MutationSetBridgeMessagingArgs = {
  id: Scalars['ID'],
  messaging: Scalars['Boolean']
};


export type MutationSetSimulatorAssetsArgs = {
  id: Scalars['ID'],
  assets: SimulatorAssetsInput
};


export type MutationSetSimulatorSoundEffectsArgs = {
  id: Scalars['ID'],
  soundEffects: Scalars['JSON']
};


export type MutationSetSimulatorHasPrinterArgs = {
  simulatorId: Scalars['ID'],
  hasPrinter: Scalars['Boolean']
};


export type MutationSetSimulatorHasLegsArgs = {
  simulatorId: Scalars['ID'],
  hasLegs: Scalars['Boolean']
};


export type MutationSetSimulatorSpaceEdventuresIdArgs = {
  simulatorId: Scalars['ID'],
  spaceEdventuresId: Scalars['String']
};


export type MutationAddSimulatorStationCardArgs = {
  simulatorId: Scalars['ID'],
  station: Scalars['String'],
  cardName: Scalars['String'],
  cardComponent: Scalars['String']
};


export type MutationRemoveSimulatorStationCardArgs = {
  simulatorId: Scalars['ID'],
  station: Scalars['String'],
  cardName: Scalars['String']
};


export type MutationEditSimulatorStationCardArgs = {
  simulatorId: Scalars['ID'],
  station: Scalars['String'],
  cardName: Scalars['String'],
  newCardName?: Maybe<Scalars['String']>,
  cardComponent?: Maybe<Scalars['String']>
};


export type MutationSetSimulatorStationMessageGroupArgs = {
  simulatorId: Scalars['ID'],
  station: Scalars['String'],
  group: Scalars['String'],
  state: Scalars['Boolean']
};


export type MutationSetSimulatorStationLoginArgs = {
  simulatorId: Scalars['ID'],
  station: Scalars['String'],
  login: Scalars['Boolean']
};


export type MutationSetSimulatorStationLayoutArgs = {
  simulatorId: Scalars['ID'],
  station: Scalars['String'],
  layout: Scalars['String']
};


export type MutationSetSimulatorStationExecutiveArgs = {
  simulatorId: Scalars['ID'],
  station: Scalars['String'],
  exec: Scalars['Boolean']
};


export type MutationSetSimulatorStationWidgetArgs = {
  simulatorId: Scalars['ID'],
  station: Scalars['String'],
  widget: Scalars['String'],
  state: Scalars['Boolean']
};


export type MutationCreateSoftwarePanelArgs = {
  panel: SoftwarePanelInput
};


export type MutationUpdateSoftwarePanelArgs = {
  panel: SoftwarePanelInput
};


export type MutationRemoveSoftwarePanelArgs = {
  panel: Scalars['ID']
};


export type MutationCreateStationSetArgs = {
  name: Scalars['String'],
  simulatorId: Scalars['ID']
};


export type MutationRemoveStationSetArgs = {
  stationSetID: Scalars['ID']
};


export type MutationRenameStationSetArgs = {
  stationSetID: Scalars['ID'],
  name: Scalars['String']
};


export type MutationDuplicateStationSetArgs = {
  stationSetID: Scalars['ID'],
  name: Scalars['String']
};


export type MutationSetStationSetCrewCountArgs = {
  stationSetID: Scalars['ID'],
  crewCount: Scalars['Int']
};


export type MutationAddStationToStationSetArgs = {
  stationSetID: Scalars['ID'],
  stationName: Scalars['String']
};


export type MutationRemoveStationFromStationSetArgs = {
  stationSetID: Scalars['ID'],
  stationName: Scalars['String']
};


export type MutationEditStationInStationSetArgs = {
  stationSetID: Scalars['ID'],
  stationName: Scalars['String'],
  newStationName: Scalars['String']
};


export type MutationAddCardToStationArgs = {
  stationSetID: Scalars['ID'],
  stationName: Scalars['String'],
  cardName: Scalars['String'],
  cardComponent: Scalars['String'],
  cardIcon?: Maybe<Scalars['String']>
};


export type MutationRemoveCardFromStationArgs = {
  stationSetID: Scalars['ID'],
  stationName: Scalars['String'],
  cardName: Scalars['String']
};


export type MutationEditCardInStationSetArgs = {
  stationSetID: Scalars['ID'],
  stationName: Scalars['String'],
  cardName: Scalars['String'],
  newCardName?: Maybe<Scalars['String']>,
  cardComponent?: Maybe<Scalars['String']>,
  cardIcon?: Maybe<Scalars['String']>
};


export type MutationSetStationLoginArgs = {
  stationSetID: Scalars['ID'],
  stationName: Scalars['String'],
  login: Scalars['Boolean']
};


export type MutationSetStationLayoutArgs = {
  stationSetID: Scalars['ID'],
  stationName: Scalars['String'],
  layout: Scalars['String']
};


export type MutationSetStationExecutiveArgs = {
  stationSetID: Scalars['ID'],
  stationName: Scalars['String'],
  exec: Scalars['Boolean']
};


export type MutationToggleStationWidgetsArgs = {
  stationSetID: Scalars['ID'],
  stationName: Scalars['String'],
  widget: Scalars['String'],
  state: Scalars['Boolean']
};


export type MutationSetStationDescriptionArgs = {
  stationSetID: Scalars['ID'],
  stationName: Scalars['String'],
  description: Scalars['String']
};


export type MutationSetStationTrainingArgs = {
  stationSetID: Scalars['ID'],
  stationName: Scalars['String'],
  training?: Maybe<Scalars['String']>
};


export type MutationReorderStationWidgetsArgs = {
  stationSetId: Scalars['ID'],
  stationName: Scalars['String'],
  widget: Scalars['String'],
  order: Scalars['Int']
};


export type MutationSetStealthActivatedArgs = {
  id?: Maybe<Scalars['ID']>,
  state?: Maybe<Scalars['Boolean']>
};


export type MutationSetStealthChargeArgs = {
  id?: Maybe<Scalars['ID']>,
  state?: Maybe<Scalars['Boolean']>
};


export type MutationActivateStealthArgs = {
  id?: Maybe<Scalars['ID']>
};


export type MutationDeactivateStealthArgs = {
  id?: Maybe<Scalars['ID']>
};


export type MutationSetStealthQuadrantArgs = {
  id?: Maybe<Scalars['ID']>,
  which?: Maybe<Scalars['String']>,
  value?: Maybe<Scalars['Float']>
};


export type MutationFluxStealthQuadrantsArgs = {
  id?: Maybe<Scalars['ID']>
};


export type MutationStealthChangeAlertArgs = {
  id: Scalars['ID'],
  change: Scalars['Boolean']
};


export type MutationFluxSubspaceFieldArgs = {
  id: Scalars['ID'],
  which?: Maybe<Scalars['String']>
};


export type MutationNormalSubspaceFieldArgs = {
  id: Scalars['ID'],
  which?: Maybe<Scalars['String']>
};


export type MutationSetSubspaceFieldSectorValueArgs = {
  id?: Maybe<Scalars['ID']>,
  which: Scalars['String'],
  value: Scalars['Int']
};


export type MutationCreateSurveyFormArgs = {
  name: Scalars['String']
};


export type MutationRemoveSurveyFormArgs = {
  id: Scalars['ID']
};


export type MutationSetSurveyFormGoogleSheetArgs = {
  id: Scalars['ID'],
  spreadsheetId?: Maybe<Scalars['ID']>,
  spreadsheetName?: Maybe<Scalars['String']>,
  sheetId?: Maybe<Scalars['ID']>
};


export type MutationUpdateSurveyFormArgs = {
  id: Scalars['ID'],
  form: Array<Maybe<FormFieldsInput>>
};


export type MutationTriggerSurveyArgs = {
  simulatorId: Scalars['ID'],
  id: Scalars['ID']
};


export type MutationSurveyFormResponseArgs = {
  id: Scalars['ID'],
  response?: Maybe<FormResultsInput>
};


export type MutationEndSurveyArgs = {
  id: Scalars['ID']
};


export type MutationAddSystemToSimulatorArgs = {
  simulatorId: Scalars['ID'],
  className: Scalars['String'],
  params: Scalars['String']
};


export type MutationRemoveSystemFromSimulatorArgs = {
  systemId?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>
};


export type MutationUpdateSystemNameArgs = {
  systemId: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>
};


export type MutationUpdateSystemUpgradeMacrosArgs = {
  systemId: Scalars['ID'],
  upgradeMacros?: Maybe<Array<Maybe<TimelineItemInput>>>
};


export type MutationUpdateSystemUpgradeBoardArgs = {
  systemId: Scalars['ID'],
  upgradeBoard?: Maybe<Scalars['ID']>
};


export type MutationUpgradeSystemArgs = {
  systemId: Scalars['ID']
};


export type MutationUpdateSystemRoomsArgs = {
  systemId: Scalars['ID'],
  locations?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type MutationSystemSetWingArgs = {
  systemId: Scalars['ID'],
  wing: Scalars['String']
};


export type MutationNewTacticalMapArgs = {
  name: Scalars['String'],
  flightId?: Maybe<Scalars['ID']>
};


export type MutationUpdateTacticalMapArgs = {
  id: Scalars['ID']
};


export type MutationFreezeTacticalMapArgs = {
  id: Scalars['ID'],
  freeze: Scalars['Boolean']
};


export type MutationDuplicateTacticalMapArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationLoadTacticalMapArgs = {
  id: Scalars['ID'],
  flightId: Scalars['ID']
};


export type MutationRemoveTacticalMapArgs = {
  id: Scalars['ID']
};


export type MutationAddTacticalMapLayerArgs = {
  mapId: Scalars['ID'],
  name: Scalars['String']
};


export type MutationUpdateTacticalMapLayerArgs = {
  mapId: Scalars['ID'],
  layer: TacticalLayerInput
};


export type MutationReorderTacticalMapLayerArgs = {
  mapId: Scalars['ID'],
  layer: Scalars['ID'],
  order: Scalars['Int']
};


export type MutationRemoveTacticalMapLayerArgs = {
  mapId: Scalars['ID'],
  layerId: Scalars['ID']
};


export type MutationAddTacticalMapItemArgs = {
  mapId: Scalars['ID'],
  layerId: Scalars['ID'],
  item: TacticalItemInput
};


export type MutationUpdateTacticalMapItemArgs = {
  mapId: Scalars['ID'],
  layerId: Scalars['ID'],
  item: TacticalItemInput
};


export type MutationRemoveTacticalMapItemArgs = {
  mapId: Scalars['ID'],
  layerId: Scalars['ID'],
  itemId: Scalars['ID']
};


export type MutationAddTacticalMapPathArgs = {
  mapId: Scalars['ID'],
  layerId: Scalars['ID'],
  path: TacticalPathInput
};


export type MutationUpdateTacticalMapPathArgs = {
  mapId: Scalars['ID'],
  layerId: Scalars['ID'],
  path: TacticalPathInput
};


export type MutationRemoveTacticalMapPathArgs = {
  mapId: Scalars['ID'],
  layerId: Scalars['ID'],
  pathId: Scalars['ID']
};


export type MutationShowViewscreenTacticalArgs = {
  mapId: Scalars['ID'],
  secondary?: Maybe<Scalars['Boolean']>,
  viewscreenId?: Maybe<Scalars['ID']>
};


export type MutationAddTacticalMapsToFlightArgs = {
  mapIds: Array<Scalars['ID']>
};


export type MutationCreateTargetingContactArgs = {
  id: Scalars['ID'],
  targetClass: Scalars['ID']
};


export type MutationTargetTargetingContactArgs = {
  id: Scalars['ID'],
  targetId: Scalars['ID']
};


export type MutationUntargetTargetingContactArgs = {
  id: Scalars['ID'],
  targetId: Scalars['ID']
};


export type MutationTargetSystemArgs = {
  id: Scalars['ID'],
  targetId: Scalars['ID'],
  system: Scalars['String']
};


export type MutationRemoveTargetArgs = {
  id: Scalars['ID'],
  targetId: Scalars['ID']
};


export type MutationAddTargetClassArgs = {
  id: Scalars['ID'],
  classInput: TargetClassInput
};


export type MutationRemoveTargetClassArgs = {
  id: Scalars['ID'],
  classId: Scalars['ID']
};


export type MutationUpdateTargetClassArgs = {
  id: Scalars['ID'],
  classInput: TargetClassInput
};


export type MutationSetTargetClassCountArgs = {
  id: Scalars['ID'],
  classId: Scalars['ID'],
  count: Scalars['Int']
};


export type MutationSetCoordinateTargetingArgs = {
  id: Scalars['ID'],
  which: Scalars['Boolean']
};


export type MutationSetTargetingCalculatedTargetArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  coordinates?: Maybe<CoordinatesInput>,
  contactId?: Maybe<Scalars['ID']>
};


export type MutationSetTargetingEnteredTargetArgs = {
  id: Scalars['ID'],
  coordinates?: Maybe<StringCoordinatesInput>
};


export type MutationClearAllTargetingContactsArgs = {
  id: Scalars['ID']
};


export type MutationSetTargetingRangeArgs = {
  id: Scalars['ID'],
  range: Scalars['Float']
};


export type MutationSetTargetingClassesArgs = {
  id: Scalars['ID'],
  classInput: Array<Maybe<TargetClassInput>>
};


export type MutationGenerateTaskReportArgs = {
  simulatorId: Scalars['ID'],
  systemId?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  type: Scalars['String'],
  stepCount?: Maybe<Scalars['Int']>
};


export type MutationClearTaskReportArgs = {
  id: Scalars['ID']
};


export type MutationCompleteTaskReportArgs = {
  id: Scalars['ID']
};


export type MutationVerifyTaskReportStepArgs = {
  id: Scalars['ID'],
  stepId: Scalars['ID']
};


export type MutationAssignTaskReportStepArgs = {
  id: Scalars['ID'],
  stepId: Scalars['ID'],
  station?: Maybe<Scalars['String']>
};


export type MutationRequestVerifyTaskReportStepArgs = {
  id: Scalars['ID'],
  stepId: Scalars['ID']
};


export type MutationAddTaskArgs = {
  taskInput: TaskInput
};


export type MutationVerifyTaskArgs = {
  taskId: Scalars['ID'],
  dismiss?: Maybe<Scalars['Boolean']>
};


export type MutationRequestTaskVerifyArgs = {
  id: Scalars['ID']
};


export type MutationDenyTaskVerifyArgs = {
  id: Scalars['ID']
};


export type MutationDismissVerifiedTasksArgs = {
  simulatorId: Scalars['ID']
};


export type MutationAddTaskTemplateArgs = {
  definition: Scalars['String']
};


export type MutationRemoveTaskTemplateArgs = {
  id: Scalars['ID']
};


export type MutationRenameTaskTemplateArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationSetTaskTemplateValuesArgs = {
  id: Scalars['ID'],
  values: Scalars['JSON']
};


export type MutationSetTaskTemplateReportTypesArgs = {
  id: Scalars['ID'],
  reportTypes: Array<Maybe<Scalars['String']>>
};


export type MutationSetTaskTemplateMacrosArgs = {
  id: Scalars['ID'],
  macros: Array<Maybe<ActionInput>>
};


export type MutationSetTaskTemplatePreMacrosArgs = {
  id: Scalars['ID'],
  macros: Array<Maybe<ActionInput>>
};


export type MutationCreateTeamArgs = {
  team: TeamInput
};


export type MutationUpdateTeamArgs = {
  team: TeamInput
};


export type MutationAddCrewToTeamArgs = {
  teamId: Scalars['ID'],
  crewId: Scalars['ID']
};


export type MutationRemoveCrewFromTeamArgs = {
  teamId: Scalars['ID'],
  crewId: Scalars['ID']
};


export type MutationRemoveTeamArgs = {
  teamId: Scalars['ID']
};


export type MutationSetTrackingPreferenceArgs = {
  pref: Scalars['Boolean']
};


export type MutationSetSpaceEdventuresTokenArgs = {
  token: Scalars['String']
};


export type MutationAssignSpaceEdventuresBadgeArgs = {
  station?: Maybe<Scalars['String']>,
  badgeId: Scalars['ID']
};


export type MutationAssignSpaceEdventuresMissionArgs = {
  station?: Maybe<Scalars['String']>,
  badgeId: Scalars['ID']
};


export type MutationAssignSpaceEdventuresFlightTypeArgs = {
  flightId: Scalars['ID'],
  flightType: Scalars['ID']
};


export type MutationAssignSpaceEdventuresFlightRecordArgs = {
  flightId: Scalars['ID']
};


export type MutationGetSpaceEdventuresLoginArgs = {
  token: Scalars['String']
};


export type MutationRemoveSpaceEdventuresClientArgs = {
  flightId: Scalars['ID'],
  clientId: Scalars['ID']
};


export type MutationGenericArgs = {
  simulatorId: Scalars['ID'],
  key: Scalars['String']
};


export type MutationClockSyncArgs = {
  clientId: Scalars['ID']
};


export type MutationAddIssueArgs = {
  title: Scalars['String'],
  body: Scalars['String'],
  person: Scalars['String'],
  priority: Scalars['String'],
  type: Scalars['String']
};


export type MutationAddIssueUploadArgs = {
  data: Scalars['String'],
  filename: Scalars['String'],
  ext: Scalars['String']
};


export type MutationRotationUpdateArgs = {
  id: Scalars['ID'],
  rotation?: Maybe<RotationInput>,
  on?: Maybe<Scalars['Boolean']>
};


export type MutationRotationSetArgs = {
  id: Scalars['ID'],
  rotation?: Maybe<RotationInput>
};


export type MutationRequiredRotationSetArgs = {
  id: Scalars['ID'],
  rotation?: Maybe<RotationInput>
};


export type MutationDirectionUpdateArgs = {
  id: Scalars['ID'],
  direction?: Maybe<DirectionInput>
};


export type MutationSetThrusterRotationSpeedArgs = {
  id: Scalars['ID'],
  speed: Scalars['Float']
};


export type MutationSetThrusterMovementSpeedArgs = {
  id: Scalars['ID'],
  speed?: Maybe<Scalars['Float']>
};


export type MutationChargeThxArgs = {
  id: Scalars['ID'],
  clientId: Scalars['ID'],
  charge: Scalars['Float']
};


export type MutationLockThxArgs = {
  id: Scalars['ID'],
  clientId: Scalars['ID']
};


export type MutationActivateThxArgs = {
  id: Scalars['ID']
};


export type MutationDeactivateThxArgs = {
  id: Scalars['ID']
};


export type MutationResetThxArgs = {
  id: Scalars['ID']
};


export type MutationTorpedoAddWarheadArgs = {
  id: Scalars['ID'],
  warhead: WarheadInput
};


export type MutationTorpedoRemoveWarheadArgs = {
  id: Scalars['ID'],
  warheadId: Scalars['ID']
};


export type MutationTorpedoLoadWarheadArgs = {
  id: Scalars['ID'],
  warheadId: Scalars['ID']
};


export type MutationTorpedoSetWarheadCountArgs = {
  id: Scalars['ID'],
  warheadType: Scalars['String'],
  count: Scalars['Int']
};


export type MutationTorpedoUnloadArgs = {
  id: Scalars['ID']
};


export type MutationTorpedoFireArgs = {
  id: Scalars['ID']
};


export type MutationSetTractorBeamStateArgs = {
  id: Scalars['ID'],
  beam: Scalars['ID'],
  state: Scalars['Boolean']
};


export type MutationSetTractorBeamTargetArgs = {
  id: Scalars['ID'],
  beam: Scalars['ID'],
  target: Scalars['Boolean']
};


export type MutationSetTractorBeamStrengthArgs = {
  id: Scalars['ID'],
  beam: Scalars['ID'],
  strength: Scalars['Float']
};


export type MutationSetTractorBeamStressArgs = {
  id: Scalars['ID'],
  beam: Scalars['ID'],
  stress: Scalars['Float']
};


export type MutationSetTractorBeamScanningArgs = {
  id: Scalars['ID'],
  beam: Scalars['ID'],
  scanning: Scalars['Boolean']
};


export type MutationSetTractorBeamTargetLabelArgs = {
  id: Scalars['ID'],
  beam: Scalars['ID'],
  label: Scalars['String']
};


export type MutationSetTractorBeamCountArgs = {
  id: Scalars['ID'],
  beams: Scalars['Int']
};


export type MutationAddTractorTargetArgs = {
  id: Scalars['ID'],
  beamId: Scalars['ID'],
  label?: Maybe<Scalars['String']>
};


export type MutationRemoveTractorTargetArgs = {
  id: Scalars['ID'],
  beamId: Scalars['ID']
};


export type MutationSetTransportDestinationArgs = {
  transporter: Scalars['ID'],
  destination: Scalars['String']
};


export type MutationSetTransportTargetArgs = {
  transporter: Scalars['ID'],
  target: Scalars['String']
};


export type MutationBeginTransportScanArgs = {
  transporter: Scalars['ID']
};


export type MutationCancelTransportScanArgs = {
  transporter: Scalars['ID']
};


export type MutationClearTransportTargetsArgs = {
  transporter: Scalars['ID']
};


export type MutationSetTransportChargeArgs = {
  transporter: Scalars['ID'],
  charge: Scalars['Float']
};


export type MutationCompleteTransportArgs = {
  transporter: Scalars['ID'],
  target: Scalars['ID']
};


export type MutationSetTransporterTargetsArgs = {
  transporter: Scalars['ID'],
  targets: Scalars['Int']
};


export type MutationSetTransporterChargeSpeedArgs = {
  id: Scalars['ID'],
  chargeSpeed: Scalars['Float']
};


export type MutationSetTranswarpActiveArgs = {
  id: Scalars['ID'],
  active: Scalars['Boolean']
};


export type MutationFluxTranswarpArgs = {
  id: Scalars['ID'],
  quad?: Maybe<Scalars['String']>,
  field?: Maybe<Scalars['String']>
};


export type MutationNormalTranswarpArgs = {
  id: Scalars['ID'],
  quad?: Maybe<Scalars['String']>,
  field?: Maybe<Scalars['String']>
};


export type MutationSetTranswarpSectorValueArgs = {
  id: Scalars['ID'],
  quad: Scalars['String'],
  field: Scalars['String'],
  value: Scalars['Int']
};


export type MutationAddTriggerArgs = {
  name: Scalars['String']
};


export type MutationRenameTriggerArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationRemoveTriggerArgs = {
  id: Scalars['ID']
};


export type MutationUpdateTriggerArgs = {
  id: Scalars['ID'],
  components?: Maybe<Scalars['JSON']>,
  connections?: Maybe<Scalars['JSON']>,
  values?: Maybe<Scalars['JSON']>,
  config?: Maybe<Scalars['JSON']>
};


export type MutationAddTriggerToSimulatorArgs = {
  simulatorId: Scalars['ID'],
  trigger: Scalars['ID']
};


export type MutationRemoveTriggerFromSimulatorArgs = {
  simulatorId: Scalars['ID'],
  trigger: Scalars['ID']
};


export type MutationUpdateViewscreenNameArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationUpdateViewscreenSecondaryArgs = {
  id: Scalars['ID'],
  secondary: Scalars['Boolean']
};


export type MutationUpdateViewscreenComponentArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  component: Scalars['String'],
  data?: Maybe<Scalars['String']>,
  secondary?: Maybe<Scalars['Boolean']>
};


export type MutationUpdateViewscreenDataArgs = {
  id: Scalars['ID'],
  data: Scalars['String']
};


export type MutationSetViewscreenToAutoArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  secondary?: Maybe<Scalars['Boolean']>
};


export type MutationSetViewscreenPictureInPictureArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  secondary?: Maybe<Scalars['Boolean']>,
  component: Scalars['String'],
  data?: Maybe<Scalars['JSON']>,
  size?: Maybe<Pip_Size>,
  position?: Maybe<Pip_Position>
};


export type MutationRemoveViewscreenPictureInPictureArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  secondary?: Maybe<Scalars['Boolean']>
};


export type MutationUpdateViewscreenAutoArgs = {
  id: Scalars['ID'],
  auto: Scalars['Boolean']
};


export type MutationToggleViewscreenVideoArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  viewscreenId?: Maybe<Scalars['ID']>
};


export type MutationCountermeasuresCreateCountermeasureArgs = {
  id: Scalars['ID'],
  slot: CountermeasureSlotEnum,
  name: Scalars['String']
};


export type MutationCountermeasuresRemoveCountermeasureArgs = {
  id: Scalars['ID'],
  slot: CountermeasureSlotEnum
};


export type MutationCountermeasuresLaunchCountermeasureArgs = {
  id: Scalars['ID'],
  slot: CountermeasureSlotEnum
};


export type MutationCountermeasuresActivateCountermeasureArgs = {
  id: Scalars['ID'],
  slot: CountermeasureSlotEnum
};


export type MutationCountermeasuresDeactivateCountermeasureArgs = {
  id: Scalars['ID'],
  slot: CountermeasureSlotEnum
};


export type MutationCountermeasuresLaunchUnlockedCountermeasuresArgs = {
  id: Scalars['ID']
};


export type MutationCountermeasuresBuildCountermeasureArgs = {
  id: Scalars['ID'],
  slot: CountermeasureSlotEnum
};


export type MutationCountermeasuresAddModuleArgs = {
  id: Scalars['ID'],
  slot: CountermeasureSlotEnum,
  moduleType: Scalars['String']
};


export type MutationCountermeasuresRemoveModuleArgs = {
  id: Scalars['ID'],
  slot: CountermeasureSlotEnum,
  moduleId: Scalars['ID']
};


export type MutationCountermeasuresConfigureModuleArgs = {
  id: Scalars['ID'],
  slot: CountermeasureSlotEnum,
  moduleId: Scalars['ID'],
  config: Scalars['JSON']
};


export type MutationCountermeasuresSetResourceArgs = {
  id: Scalars['ID'],
  resource: Scalars['String'],
  value: Scalars['Float']
};


export type MutationCountermeasuresSetFdNoteArgs = {
  id: Scalars['ID'],
  countermeasureId: Scalars['ID'],
  note: Scalars['String']
};


export type MutationEntityCreateArgs = {
  flightId: Scalars['ID'],
  template?: Maybe<Scalars['Boolean']>
};


export type MutationEntityRemoveArgs = {
  id: Array<Scalars['ID']>
};


export type MutationFlightSetBaseUniverseArgs = {
  flightId?: Maybe<Scalars['ID']>,
  procGenKey?: Maybe<Scalars['String']>
};


export type MutationDmxDeviceCreateArgs = {
  name: Scalars['String']
};


export type MutationDmxDeviceRemoveArgs = {
  id: Scalars['ID']
};


export type MutationDmxDeviceSetNameArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationDmxDeviceSetChannelsArgs = {
  id: Scalars['ID'],
  channels: Array<DmxChannelProperty>
};


export type MutationDmxSetCreateArgs = {
  name: Scalars['String']
};


export type MutationDmxSetRemoveArgs = {
  id: Scalars['ID']
};


export type MutationDmxSetDuplicateArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationDmxSetSetNameArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationDmxFixtureCreateArgs = {
  DMXSetId: Scalars['ID'],
  name: Scalars['String'],
  DMXDeviceId: Scalars['ID']
};


export type MutationDmxFixtureRemoveArgs = {
  DMXSetId: Scalars['ID'],
  id: Scalars['ID']
};


export type MutationDmxFixtureSetNameArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationDmxFixtureSetDmxDeviceArgs = {
  id: Scalars['ID'],
  DMXDeviceID: Scalars['ID']
};


export type MutationDmxFixtureSetChannelArgs = {
  id: Scalars['ID'],
  channel: Scalars['Int']
};


export type MutationDmxFixtureSetModeArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  tag?: Maybe<Array<Maybe<Scalars['String']>>>,
  mode: DmxFixtureMode
};


export type MutationDmxFixtureSetActiveArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type MutationDmxFixtureSetTagsArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  newTags: Array<Scalars['String']>
};


export type MutationDmxFixtureAddTagArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  newTag: Scalars['String']
};


export type MutationDmxFixtureRemoveTagArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  removeTag: Scalars['String']
};


export type MutationDmxFixtureSetPassiveChannelsArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  passiveChannels: DmxPassiveChannelsInput
};


export type MutationDmxConfigCreateArgs = {
  name: Scalars['String']
};


export type MutationDmxConfigRemoveArgs = {
  id: Scalars['ID']
};


export type MutationDmxConfigDuplicateArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationDmxConfigSetNameArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationDmxConfigSetConfigArgs = {
  id: Scalars['ID'],
  config: Scalars['JSON']
};


export type MutationDmxConfigSetActionStrengthArgs = {
  id: Scalars['ID'],
  actionStrength: Scalars['Float']
};


export type MutationTaskFlowAddArgs = {
  name: Scalars['String']
};


export type MutationTaskFlowRemoveArgs = {
  id: Scalars['ID']
};


export type MutationTaskFlowRenameArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationTaskFlowAddStepArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationTaskFlowRemoveStepArgs = {
  id: Scalars['ID'],
  stepId: Scalars['ID']
};


export type MutationTaskFlowRenameStepArgs = {
  id: Scalars['ID'],
  stepId: Scalars['ID'],
  name: Scalars['String']
};


export type MutationTaskFlowStepAddTaskArgs = {
  id: Scalars['ID'],
  stepId: Scalars['ID'],
  task: TaskInput
};


export type MutationTaskFlowStepRemoveTaskArgs = {
  id: Scalars['ID'],
  stepId: Scalars['ID'],
  taskId: Scalars['ID']
};


export type MutationTaskFlowStepEditTaskArgs = {
  id: Scalars['ID'],
  stepId: Scalars['ID'],
  taskId: Scalars['ID'],
  task: TaskInput
};


export type MutationTaskFlowStepSetCompleteAllArgs = {
  id: Scalars['ID'],
  stepId: Scalars['ID'],
  completeAll: Scalars['Boolean']
};


export type MutationTaskFlowActivateArgs = {
  id: Scalars['ID'],
  simulatorId: Scalars['ID']
};

export type NamedObject = {
   __typename?: 'NamedObject',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type Navigation = SystemInterface & {
   __typename?: 'Navigation',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  power?: Maybe<Power>,
  damage?: Maybe<Damage>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  calculate?: Maybe<Scalars['Boolean']>,
  currentCourse?: Maybe<NavLoc>,
  calculatedCourse?: Maybe<NavLoc>,
  destination?: Maybe<Scalars['String']>,
  scanning?: Maybe<Scalars['Boolean']>,
  destinations?: Maybe<Array<Maybe<Scalars['String']>>>,
  presets?: Maybe<Array<Maybe<NavPreset>>>,
  thrusters?: Maybe<Scalars['Boolean']>,
  locations?: Maybe<Array<Maybe<Room>>>,
};

export type NavLoc = {
   __typename?: 'NavLoc',
  x?: Maybe<Scalars['String']>,
  y?: Maybe<Scalars['String']>,
  z?: Maybe<Scalars['String']>,
};

export type NavLocInput = {
  x?: Maybe<Scalars['String']>,
  y?: Maybe<Scalars['String']>,
  z?: Maybe<Scalars['String']>,
};

export type NavPreset = {
   __typename?: 'NavPreset',
  name?: Maybe<Scalars['String']>,
  course?: Maybe<NavLoc>,
};

export type NavPresetInput = {
  name?: Maybe<Scalars['String']>,
  course?: Maybe<NavLocInput>,
};

export type Notification = {
   __typename?: 'Notification',
  id?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>,
  color?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  trigger?: Maybe<Scalars['String']>,
  duration?: Maybe<Scalars['Int']>,
  relevantCards?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export enum NotifyColors {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Light = 'light',
  Dark = 'dark'
}

export type Objective = {
   __typename?: 'Objective',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  timestamp?: Maybe<Scalars['String']>,
  station?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  completed?: Maybe<Scalars['Boolean']>,
  cancelled?: Maybe<Scalars['Boolean']>,
  crewComplete?: Maybe<Scalars['Boolean']>,
};

export type ObjectiveInput = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  station?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  completed?: Maybe<Scalars['Boolean']>,
  cancelled?: Maybe<Scalars['Boolean']>,
  crewComplete?: Maybe<Scalars['Boolean']>,
};

export type PainPoint = {
   __typename?: 'PainPoint',
  x?: Maybe<Scalars['Float']>,
  y?: Maybe<Scalars['Float']>,
};

export type PainPointInput = {
  x?: Maybe<Scalars['Float']>,
  y?: Maybe<Scalars['Float']>,
};

export type PanelCable = {
   __typename?: 'PanelCable',
  id?: Maybe<Scalars['ID']>,
  color?: Maybe<Scalars['String']>,
  components?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export type PanelCableInput = {
  id?: Maybe<Scalars['ID']>,
  color?: Maybe<Scalars['String']>,
  components?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export type PanelComponent = {
   __typename?: 'PanelComponent',
  id?: Maybe<Scalars['ID']>,
  component?: Maybe<Scalars['String']>,
  level?: Maybe<Scalars['Float']>,
  label?: Maybe<Scalars['String']>,
  color?: Maybe<Scalars['String']>,
  x?: Maybe<Scalars['Float']>,
  y?: Maybe<Scalars['Float']>,
  scale?: Maybe<Scalars['Float']>,
};

export type PanelComponentInput = {
  id?: Maybe<Scalars['ID']>,
  component?: Maybe<Scalars['String']>,
  level?: Maybe<Scalars['Float']>,
  label?: Maybe<Scalars['String']>,
  color?: Maybe<Scalars['String']>,
  x?: Maybe<Scalars['Float']>,
  y?: Maybe<Scalars['Float']>,
  scale?: Maybe<Scalars['Float']>,
};

export type PanelConnection = {
   __typename?: 'PanelConnection',
  id?: Maybe<Scalars['ID']>,
  to?: Maybe<Scalars['ID']>,
  from?: Maybe<Scalars['ID']>,
};

export type PanelConnectionInput = {
  id?: Maybe<Scalars['ID']>,
  to?: Maybe<Scalars['ID']>,
  from?: Maybe<Scalars['ID']>,
};

export enum ParticleTypes {
  Dilithium = 'Dilithium',
  Tachyon = 'Tachyon',
  Neutrino = 'Neutrino',
  AntiMatter = 'AntiMatter',
  Anomaly = 'Anomaly',
  Resonance = 'Resonance',
  Graviton = 'Graviton',
  Lithium = 'Lithium',
  Magnetic = 'Magnetic',
  Helium = 'Helium',
  Hydrogen = 'Hydrogen',
  Oxygen = 'Oxygen',
  Carbon = 'Carbon',
  Radiation = 'Radiation'
}

export type Phaser = SystemInterface & {
   __typename?: 'Phaser',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  power?: Maybe<Power>,
  damage?: Maybe<Damage>,
  arc?: Maybe<Scalars['Float']>,
  coolant?: Maybe<Scalars['Float']>,
  beams?: Maybe<Array<Maybe<PhaserBeam>>>,
  locations?: Maybe<Array<Maybe<Room>>>,
  holdToCharge?: Maybe<Scalars['Boolean']>,
  chargeSpeed?: Maybe<Scalars['Float']>,
};

export type PhaserBeam = {
   __typename?: 'PhaserBeam',
  id?: Maybe<Scalars['ID']>,
  power?: Maybe<Power>,
  damage?: Maybe<Damage>,
  charge?: Maybe<Scalars['Float']>,
  state?: Maybe<Scalars['String']>,
  heat?: Maybe<Scalars['Float']>,
};

export enum Ping_Modes {
  Active = 'active',
  Passive = 'passive',
  Manual = 'manual'
}

export enum Pip_Position {
  BottomLeft = 'bottomLeft',
  BottomRight = 'bottomRight',
  TopLeft = 'topLeft',
  TopRight = 'topRight',
  Center = 'center'
}

export enum Pip_Size {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export type Power = {
   __typename?: 'Power',
  power?: Maybe<Scalars['Int']>,
  powerLevels?: Maybe<Array<Maybe<Scalars['Int']>>>,
  defaultLevel?: Maybe<Scalars['Int']>,
};

export type PresetAnswer = {
   __typename?: 'PresetAnswer',
  label: Scalars['String'],
  value: Scalars['String'],
};

export type PresetAnswerInput = {
  label?: Maybe<Scalars['String']>,
  value?: Maybe<Scalars['String']>,
};

export enum Priorities {
  Low = 'low',
  Normal = 'normal',
  Critical = 'critical',
  Emergency = 'emergency'
}

export type Probe = {
   __typename?: 'Probe',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['ID']>,
  launched?: Maybe<Scalars['Boolean']>,
  equipment?: Maybe<Array<Maybe<ProbeEquipment>>>,
  engine?: Maybe<Engine>,
  phaser?: Maybe<Phaser>,
  navigation?: Maybe<Navigation>,
  query?: Maybe<Scalars['String']>,
  querying?: Maybe<Scalars['Boolean']>,
  response?: Maybe<Scalars['String']>,
  charge?: Maybe<Scalars['Float']>,
  history?: Maybe<Array<Maybe<History>>>,
};

export type ProbeEquipment = {
   __typename?: 'ProbeEquipment',
  id?: Maybe<Scalars['ID']>,
  description?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  count?: Maybe<Scalars['Int']>,
  damage?: Maybe<Damage>,
  availableProbes?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type ProbeEquipmentInput = {
  description?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  count?: Maybe<Scalars['Int']>,
};

export type ProbeInput = {
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['ID']>,
  equipment?: Maybe<Array<Maybe<EquipmentInput>>>,
};

export type Probes = SystemInterface & {
   __typename?: 'Probes',
  id: Scalars['ID'],
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  power?: Maybe<Power>,
  damage?: Maybe<Damage>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  torpedo?: Maybe<Scalars['Boolean']>,
  processedData?: Maybe<Scalars['String']>,
  probes?: Maybe<Array<Maybe<Probe>>>,
  equipment?: Maybe<Array<Maybe<ProbeEquipment>>>,
  types?: Maybe<Array<Maybe<ProbeType>>>,
  scienceTypes?: Maybe<Array<Maybe<ScienceType>>>,
};


export type ProbesProbesArgs = {
  network?: Maybe<Scalars['Boolean']>
};

export type ProbeType = {
   __typename?: 'ProbeType',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  count?: Maybe<Scalars['Int']>,
  availableEquipment?: Maybe<Array<Maybe<ProbeEquipment>>>,
};

export type ProbeTypeInput = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  count?: Maybe<Scalars['Int']>,
};

export type ProcessedData = {
   __typename?: 'ProcessedData',
  value: Scalars['String'],
  time: Scalars['String'],
};

export type Quaternion = {
   __typename?: 'Quaternion',
  x: Scalars['Float'],
  y: Scalars['Float'],
  z: Scalars['Float'],
  w: Scalars['Float'],
};

export type QuaternionInput = {
  x: Scalars['Float'],
  y: Scalars['Float'],
  z: Scalars['Float'],
  w: Scalars['Float'],
};

export type Query = {
   __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
  actions?: Maybe<Action>,
  asset?: Maybe<Asset>,
  assets?: Maybe<Array<Maybe<Asset>>>,
  assetFolders?: Maybe<Array<Maybe<AssetFolder>>>,
  clients?: Maybe<Array<Maybe<Client>>>,
  keypad?: Maybe<Keypad>,
  keypads?: Maybe<Array<Maybe<Keypad>>>,
  scanner?: Maybe<Scanner>,
  scanners?: Maybe<Array<Maybe<Scanner>>>,
  commandLine?: Maybe<Array<Maybe<CommandLine>>>,
  commandLineCommands?: Maybe<Array<Maybe<CommandLineCommand>>>,
  computerCore?: Maybe<Array<Maybe<ComputerCore>>>,
  oneComputerCore?: Maybe<ComputerCore>,
  coolant?: Maybe<Array<Maybe<CoolantTank>>>,
  systemCoolant?: Maybe<Array<Maybe<SystemCoolant>>>,
  coreFeed?: Maybe<Array<Maybe<CoreFeed>>>,
  coreLayouts?: Maybe<Array<Maybe<CoreLayout>>>,
  crew?: Maybe<Array<Maybe<Crew>>>,
  crewCount?: Maybe<Scalars['Int']>,
  crm?: Maybe<Crm>,
  crmFighter?: Maybe<CrmFighter>,
  decks?: Maybe<Array<Maybe<Deck>>>,
  docking?: Maybe<Array<Maybe<DockingPort>>>,
  engines?: Maybe<Array<Maybe<Engine>>>,
  engine?: Maybe<Engine>,
  exocomps?: Maybe<Array<Maybe<Exocomp>>>,
  externals?: Maybe<Externals>,
  flights: Array<Flight>,
  events?: Maybe<Array<Maybe<Scalars['String']>>>,
  googleSheets?: Maybe<Scalars['String']>,
  googleSheetsGetSpreadsheet?: Maybe<GoogleSpreadsheet>,
  interfaces?: Maybe<Array<Maybe<Interface>>>,
  interfaceDevices?: Maybe<Array<Maybe<InterfaceDevice>>>,
  internalComm?: Maybe<Array<Maybe<InternalComm>>>,
  inventory?: Maybe<Array<Maybe<InventoryItem>>>,
  isochips?: Maybe<Array<Maybe<Isochip>>>,
  jumpDrive?: Maybe<Array<Maybe<JumpDrive>>>,
  keyboard?: Maybe<Array<Maybe<Keyboard>>>,
  libraryEntries?: Maybe<Array<Maybe<LibraryEntry>>>,
  longRangeCommunications?: Maybe<Array<Maybe<LrCommunications>>>,
  macros?: Maybe<Array<Maybe<Macro>>>,
  macroButtons?: Maybe<Array<Maybe<MacroButtonConfig>>>,
  messages?: Maybe<Array<Maybe<Message>>>,
  midiSets?: Maybe<Array<Maybe<MidiSet>>>,
  missions: Array<Mission>,
  auxTimelines?: Maybe<Array<Maybe<TimelineInstance>>>,
  motus?: Maybe<Array<Maybe<Motu>>>,
  motu?: Maybe<Motu>,
  motuChannel?: Maybe<MotuChannel>,
  motuSend?: Maybe<MotuPatch>,
  navigation?: Maybe<Array<Maybe<Navigation>>>,
  navigate?: Maybe<Navigation>,
  objective?: Maybe<Array<Maybe<Objective>>>,
  officerLogs?: Maybe<Array<Maybe<Log>>>,
  shipLogs?: Maybe<Array<Maybe<Log>>>,
  phasers?: Maybe<Array<Maybe<Phaser>>>,
  phaser?: Maybe<Phaser>,
  probes: Array<Probes>,
  probe?: Maybe<Probes>,
  railgun?: Maybe<Array<Maybe<Railgun>>>,
  reactors?: Maybe<Array<Maybe<Reactor>>>,
  reactor?: Maybe<Reactor>,
  recordSnippets?: Maybe<Array<Maybe<RecordSnippet>>>,
  recordTemplates?: Maybe<Array<Maybe<RecordSnippet>>>,
  rooms?: Maybe<Array<Maybe<Room>>>,
  sensors: Array<Sensors>,
  sensor?: Maybe<Sensors>,
  sensorContacts?: Maybe<Array<Maybe<SensorContact>>>,
  sets?: Maybe<Array<Maybe<Set>>>,
  shields?: Maybe<Array<Maybe<Shield>>>,
  shortRangeComm?: Maybe<Array<Maybe<ShortRangeComm>>>,
  sickbay?: Maybe<Array<Maybe<Sickbay>>>,
  sickbaySingle?: Maybe<Sickbay>,
  symptoms?: Maybe<Array<Maybe<Scalars['String']>>>,
  signalJammers?: Maybe<Array<Maybe<SignalJammer>>>,
  simulators: Array<Simulator>,
  softwarePanels?: Maybe<Array<Maybe<SoftwarePanel>>>,
  stations?: Maybe<Array<Maybe<StationSet>>>,
  station?: Maybe<Station>,
  stealthField?: Maybe<Array<Maybe<StealthField>>>,
  stealth?: Maybe<StealthField>,
  subspaceField?: Maybe<Array<Maybe<SubspaceField>>>,
  surveyform?: Maybe<Array<Maybe<SurveyForm>>>,
  systems?: Maybe<Array<Maybe<System>>>,
  system?: Maybe<System>,
  allSystems: Array<Scalars['String']>,
  tacticalMaps?: Maybe<Array<Maybe<TacticalMap>>>,
  tacticalMap?: Maybe<TacticalMap>,
  targeting?: Maybe<Array<Maybe<Targeting>>>,
  taskReport?: Maybe<Array<Maybe<TaskReport>>>,
  tasks?: Maybe<Array<Maybe<Task>>>,
  taskTemplates: Array<TaskTemplate>,
  taskDefinitions: Array<TaskDefinition>,
  taskInstructions?: Maybe<Scalars['String']>,
  teams?: Maybe<Array<Maybe<Team>>>,
  damagePositions?: Maybe<Array<Maybe<Scalars['String']>>>,
  exocompParts?: Maybe<Array<Maybe<Scalars['String']>>>,
  _template?: Maybe<Template>,
  thorium?: Maybe<Thorium>,
  thrusters?: Maybe<Array<Maybe<Thruster>>>,
  thruster?: Maybe<Thruster>,
  thx?: Maybe<Array<Maybe<Thx>>>,
  torpedos?: Maybe<Array<Maybe<Torpedo>>>,
  torpedo?: Maybe<Torpedo>,
  tractorBeam?: Maybe<Array<Maybe<TractorBeam>>>,
  transporters?: Maybe<Array<Maybe<Transporter>>>,
  transwarp?: Maybe<Array<Maybe<Transwarp>>>,
  triggers?: Maybe<Array<Maybe<Trigger>>>,
  viewscreens?: Maybe<Array<Maybe<Viewscreen>>>,
  countermeasures?: Maybe<Countermeasures>,
  countermeasureModuleType: Array<CountermeasureModule>,
  entity?: Maybe<Entity>,
  entities: Array<Maybe<Entity>>,
  dmxDevices: Array<DmxDevice>,
  dmxSets: Array<DmxSet>,
  dmxFixtures: Array<DmxFixture>,
  dmxConfig?: Maybe<DmxConfig>,
  dmxConfigs: Array<DmxConfig>,
  taskFlows: Array<TaskFlow>,
};


export type QueryActionsArgs = {
  stationId?: Maybe<Scalars['ID']>,
  clientId?: Maybe<Scalars['ID']>
};


export type QueryAssetArgs = {
  assetKey: Scalars['String']
};


export type QueryAssetsArgs = {
  assetKeys: Array<Scalars['String']>
};


export type QueryAssetFoldersArgs = {
  name?: Maybe<Scalars['String']>,
  names?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type QueryClientsArgs = {
  all?: Maybe<Scalars['Boolean']>,
  clientId?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  stationName?: Maybe<Scalars['String']>,
  flightId?: Maybe<Scalars['ID']>
};


export type QueryKeypadArgs = {
  client: Scalars['ID']
};


export type QueryKeypadsArgs = {
  simulatorId: Scalars['ID']
};


export type QueryScannerArgs = {
  client: Scalars['ID']
};


export type QueryScannersArgs = {
  simulatorId: Scalars['ID']
};


export type QueryCommandLineArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryCommandLineCommandsArgs = {
  simulatorId: Scalars['ID']
};


export type QueryComputerCoreArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryOneComputerCoreArgs = {
  id: Scalars['ID']
};


export type QueryCoolantArgs = {
  simulatorId: Scalars['ID']
};


export type QuerySystemCoolantArgs = {
  simulatorId: Scalars['ID'],
  systemId?: Maybe<Scalars['ID']>
};


export type QueryCoreFeedArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryCoreLayoutsArgs = {
  name?: Maybe<Scalars['String']>
};


export type QueryCrewArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  position?: Maybe<Scalars['String']>,
  killed?: Maybe<Scalars['Boolean']>
};


export type QueryCrewCountArgs = {
  simulatorId: Scalars['ID'],
  position?: Maybe<Scalars['String']>,
  killed?: Maybe<Scalars['Boolean']>
};


export type QueryCrmArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryCrmFighterArgs = {
  simulatorId: Scalars['ID'],
  clientId: Scalars['ID']
};


export type QueryDecksArgs = {
  simulatorId: Scalars['ID'],
  number?: Maybe<Scalars['Int']>
};


export type QueryDockingArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Docking_Types>
};


export type QueryEnginesArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryEngineArgs = {
  id: Scalars['ID']
};


export type QueryExocompsArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryFlightsArgs = {
  running?: Maybe<Scalars['Boolean']>,
  id?: Maybe<Scalars['ID']>
};


export type QueryGoogleSheetsGetSpreadsheetArgs = {
  spreadsheetId: Scalars['ID']
};


export type QueryInterfacesArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryInternalCommArgs = {
  simulatorId: Scalars['ID']
};


export type QueryInventoryArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  deck?: Maybe<Scalars['ID']>,
  room?: Maybe<Scalars['ID']>
};


export type QueryIsochipsArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryJumpDriveArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryLibraryEntriesArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  all?: Maybe<Scalars['Boolean']>
};


export type QueryLongRangeCommunicationsArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryMessagesArgs = {
  simulatorId: Scalars['ID'],
  station?: Maybe<Scalars['String']>,
  group?: Maybe<Scalars['ID']>
};


export type QueryMidiSetsArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryMissionsArgs = {
  id?: Maybe<Scalars['ID']>,
  aux?: Maybe<Scalars['Boolean']>
};


export type QueryAuxTimelinesArgs = {
  simulatorId: Scalars['ID']
};


export type QueryMotuArgs = {
  id: Scalars['ID']
};


export type QueryMotuChannelArgs = {
  id: Scalars['ID'],
  channelId: Scalars['ID']
};


export type QueryMotuSendArgs = {
  id: Scalars['ID'],
  inputId: Scalars['ID'],
  outputId: Scalars['ID']
};


export type QueryNavigationArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryNavigateArgs = {
  id: Scalars['ID']
};


export type QueryObjectiveArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryOfficerLogsArgs = {
  clientId?: Maybe<Scalars['ID']>,
  flightId: Scalars['ID']
};


export type QueryShipLogsArgs = {
  simulatorId: Scalars['ID']
};


export type QueryPhasersArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryPhaserArgs = {
  id: Scalars['ID']
};


export type QueryProbesArgs = {
  simulatorId: Scalars['ID']
};


export type QueryProbeArgs = {
  id: Scalars['ID']
};


export type QueryRailgunArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryReactorsArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  model?: Maybe<Scalars['String']>
};


export type QueryReactorArgs = {
  id: Scalars['ID']
};


export type QueryRecordSnippetsArgs = {
  simulatorId: Scalars['ID'],
  visible?: Maybe<Scalars['Boolean']>
};


export type QueryRoomsArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  deck?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  role?: Maybe<RoomRoles>
};


export type QuerySensorsArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  domain?: Maybe<Scalars['String']>
};


export type QuerySensorArgs = {
  id: Scalars['ID']
};


export type QuerySensorContactsArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  sensorsId?: Maybe<Scalars['ID']>,
  hostile?: Maybe<Scalars['Boolean']>,
  type?: Maybe<Scalars['String']>
};


export type QueryShieldsArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryShortRangeCommArgs = {
  simulatorId: Scalars['ID']
};


export type QuerySickbayArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QuerySickbaySingleArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QuerySignalJammersArgs = {
  simulatorId: Scalars['ID']
};


export type QuerySimulatorsArgs = {
  template?: Maybe<Scalars['Boolean']>,
  id?: Maybe<Scalars['ID']>
};


export type QuerySoftwarePanelsArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryStationArgs = {
  simulatorId: Scalars['ID'],
  station: Scalars['String']
};


export type QueryStealthFieldArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryStealthArgs = {
  id: Scalars['ID']
};


export type QuerySubspaceFieldArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QuerySurveyformArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  active?: Maybe<Scalars['Boolean']>
};


export type QuerySystemsArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  power?: Maybe<Scalars['Boolean']>,
  heat?: Maybe<Scalars['Boolean']>,
  extra?: Maybe<Scalars['Boolean']>,
  damageWhich?: Maybe<Scalars['String']>
};


export type QuerySystemArgs = {
  id: Scalars['ID']
};


export type QueryTacticalMapsArgs = {
  flightId?: Maybe<Scalars['ID']>
};


export type QueryTacticalMapArgs = {
  id: Scalars['ID']
};


export type QueryTargetingArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryTaskReportArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  cleared?: Maybe<Scalars['Boolean']>
};


export type QueryTasksArgs = {
  simulatorId: Scalars['ID'],
  station?: Maybe<Scalars['String']>,
  definitions?: Maybe<Array<Scalars['String']>>
};


export type QueryTaskDefinitionsArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryTaskInstructionsArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  definition: Scalars['String'],
  requiredValues: Scalars['JSON'],
  task?: Maybe<TaskInput>
};


export type QueryTeamsArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  cleared?: Maybe<Scalars['Boolean']>
};


export type Query_TemplateArgs = {
  simulatorId: Scalars['ID']
};


export type QueryThrustersArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryThrusterArgs = {
  id: Scalars['ID']
};


export type QueryThxArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryTorpedosArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryTorpedoArgs = {
  id: Scalars['ID']
};


export type QueryTractorBeamArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryTransportersArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryTranswarpArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryTriggersArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryViewscreensArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryCountermeasuresArgs = {
  simulatorId: Scalars['ID']
};


export type QueryEntityArgs = {
  id: Scalars['ID']
};


export type QueryEntitiesArgs = {
  flightId: Scalars['ID'],
  inert?: Maybe<Scalars['Boolean']>
};


export type QueryDmxFixturesArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type QueryDmxConfigArgs = {
  id: Scalars['ID']
};


export type QueryTaskFlowsArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};

export type Railgun = SystemInterface & {
   __typename?: 'Railgun',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  power?: Maybe<Power>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  heat?: Maybe<Scalars['Float']>,
  damage?: Maybe<Damage>,
  coolant?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  availableAmmo?: Maybe<Scalars['Int']>,
  maxAmmo?: Maybe<Scalars['Int']>,
  ammo?: Maybe<Scalars['Int']>,
};

export type RangeInput = {
  upper?: Maybe<Scalars['Float']>,
  lower?: Maybe<Scalars['Float']>,
};

export type Reactor = SystemInterface & {
   __typename?: 'Reactor',
  id: Scalars['ID'],
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  power?: Maybe<Power>,
  heat?: Maybe<Scalars['Float']>,
  heatRate?: Maybe<Scalars['Float']>,
  coolant?: Maybe<Scalars['Float']>,
  damage?: Maybe<Damage>,
  model?: Maybe<Reactor_Models>,
  ejected?: Maybe<Scalars['Boolean']>,
  externalPower?: Maybe<Scalars['Boolean']>,
  powerOutput?: Maybe<Scalars['Int']>,
  efficiency?: Maybe<Scalars['Float']>,
  efficiencies?: Maybe<Array<ReactorEfficiency>>,
  batteryChargeLevel?: Maybe<Scalars['Float']>,
  batteryChargeRate?: Maybe<Scalars['Float']>,
  depletion?: Maybe<Scalars['Float']>,
  hasWings?: Maybe<Scalars['Boolean']>,
  leftWingPower?: Maybe<Scalars['Int']>,
  leftWingRequest?: Maybe<Scalars['Int']>,
  leftWingRequested?: Maybe<Scalars['Boolean']>,
  rightWingPower?: Maybe<Scalars['Int']>,
  rightWingRequest?: Maybe<Scalars['Int']>,
  rightWingRequested?: Maybe<Scalars['Boolean']>,
  alphaLevel?: Maybe<Scalars['Float']>,
  betaLevel?: Maybe<Scalars['Float']>,
  alphaTarget?: Maybe<Scalars['Float']>,
  betaTarget?: Maybe<Scalars['Float']>,
  dilithiumRate?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  requireBalance?: Maybe<Scalars['Boolean']>,
};

export enum Reactor_Models {
  Reactor = 'reactor',
  Battery = 'battery'
}

export type ReactorEfficiency = {
   __typename?: 'ReactorEfficiency',
  label: Scalars['String'],
  color: Scalars['String'],
  efficiency?: Maybe<Scalars['Float']>,
};

export type ReactorEfficiencyInput = {
  label: Scalars['String'],
  color: Scalars['String'],
  efficiency: Scalars['Float'],
};

export type RecordEntry = {
   __typename?: 'RecordEntry',
  id?: Maybe<Scalars['ID']>,
  contents?: Maybe<Scalars['String']>,
  original?: Maybe<Scalars['String']>,
  timestamp?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>,
  modified?: Maybe<Scalars['Boolean']>,
};

export type RecordSnippet = {
   __typename?: 'RecordSnippet',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  sensorContactId?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<RecordSnippetType>,
  visible?: Maybe<Scalars['Boolean']>,
  launched?: Maybe<Scalars['Boolean']>,
  records?: Maybe<Array<Maybe<RecordEntry>>>,
  templateRecords?: Maybe<Array<Maybe<RecordEntry>>>,
};

export enum RecordSnippetType {
  Normal = 'normal',
  Buoy = 'buoy',
  External = 'external'
}

export type RemoteAccessCode = {
   __typename?: 'RemoteAccessCode',
  id?: Maybe<Scalars['ID']>,
  code?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  station?: Maybe<Scalars['String']>,
  timestamp?: Maybe<Scalars['String']>,
};

export type RemoteAsset = {
  url?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type RequirementInput = {
  cards?: Maybe<Array<Maybe<Scalars['String']>>>,
  systems?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type Room = {
   __typename?: 'Room',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  deck?: Maybe<Deck>,
  name?: Maybe<Scalars['String']>,
  roles?: Maybe<Array<Maybe<RoomRoles>>>,
  gas?: Maybe<Scalars['Boolean']>,
  svgPath?: Maybe<Scalars['String']>,
  inventory?: Maybe<Array<Maybe<InventoryItem>>>,
  systems?: Maybe<Array<Maybe<System>>>,
};

export type RoomCount = {
   __typename?: 'RoomCount',
  room?: Maybe<Room>,
  count?: Maybe<Scalars['Int']>,
};

export type RoomCountInput = {
  room?: Maybe<Scalars['ID']>,
  count?: Maybe<Scalars['Int']>,
};

export type RoomInput = {
  name?: Maybe<Scalars['String']>,
  deck?: Maybe<Scalars['Int']>,
  roles?: Maybe<Array<Maybe<RoomRoles>>>,
};

export enum RoomRoles {
  Probe = 'probe',
  Torpedo = 'torpedo',
  DamageTeam = 'damageTeam',
  SecurityTeam = 'securityTeam',
  MedicalTeam = 'medicalTeam'
}

export type Rotation = {
   __typename?: 'Rotation',
  yaw?: Maybe<Scalars['Float']>,
  pitch?: Maybe<Scalars['Float']>,
  roll?: Maybe<Scalars['Float']>,
};

export type RotationInput = {
  yaw?: Maybe<Scalars['Float']>,
  pitch?: Maybe<Scalars['Float']>,
  roll?: Maybe<Scalars['Float']>,
};

export type Scanner = {
   __typename?: 'Scanner',
  id?: Maybe<Scalars['ID']>,
  label?: Maybe<Scalars['String']>,
  scanRequest?: Maybe<Scalars['String']>,
  scanResults?: Maybe<Scalars['String']>,
  scanning?: Maybe<Scalars['Boolean']>,
};

export enum Science_Burst_Detector {
  Burst = 'burst',
  Detector = 'detector'
}

export type ScienceProbeEvent = {
   __typename?: 'ScienceProbeEvent',
  simulatorId: Scalars['ID'],
  name: Scalars['String'],
  type: Scalars['String'],
  charge: Scalars['Float'],
};

export type ScienceType = {
   __typename?: 'ScienceType',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Science_Burst_Detector>,
  description?: Maybe<Scalars['String']>,
  equipment?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type SensorContact = {
   __typename?: 'SensorContact',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  icon?: Maybe<Scalars['String']>,
  picture?: Maybe<Scalars['String']>,
  color?: Maybe<Scalars['String']>,
  rotation?: Maybe<Scalars['Float']>,
  speed?: Maybe<Scalars['Float']>,
  location?: Maybe<Coordinates>,
  destination?: Maybe<Coordinates>,
  position?: Maybe<Coordinates>,
  startTime?: Maybe<Scalars['Float']>,
  endTime?: Maybe<Scalars['Float']>,
  movementTime?: Maybe<Scalars['Int']>,
  infrared?: Maybe<Scalars['Boolean']>,
  cloaked?: Maybe<Scalars['Boolean']>,
  destroyed?: Maybe<Scalars['Boolean']>,
  forceUpdate?: Maybe<Scalars['Boolean']>,
  targeted?: Maybe<Scalars['Boolean']>,
  selected?: Maybe<Scalars['Boolean']>,
  locked?: Maybe<Scalars['Boolean']>,
  disabled?: Maybe<Scalars['Boolean']>,
  hostile?: Maybe<Scalars['Boolean']>,
  hitpoints?: Maybe<Scalars['Int']>,
  autoFire?: Maybe<Scalars['Boolean']>,
  particle?: Maybe<ParticleTypes>,
};

export type SensorContactInput = {
  sensorId?: Maybe<Scalars['ID']>,
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  icon?: Maybe<Scalars['String']>,
  picture?: Maybe<Scalars['String']>,
  color?: Maybe<Scalars['String']>,
  speed?: Maybe<Scalars['Float']>,
  rotation?: Maybe<Scalars['Float']>,
  location?: Maybe<CoordinatesInput>,
  destination?: Maybe<CoordinatesInput>,
  infrared?: Maybe<Scalars['Boolean']>,
  cloaked?: Maybe<Scalars['Boolean']>,
  destroyed?: Maybe<Scalars['Boolean']>,
  locked?: Maybe<Scalars['Boolean']>,
  disabled?: Maybe<Scalars['Boolean']>,
  hostile?: Maybe<Scalars['Boolean']>,
  hitpoints?: Maybe<Scalars['Int']>,
  autoFire?: Maybe<Scalars['Boolean']>,
  particle?: Maybe<ParticleTypes>,
};

export type Sensors = SystemInterface & {
   __typename?: 'Sensors',
  id: Scalars['ID'],
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  domain: Scalars['String'],
  pings?: Maybe<Scalars['Boolean']>,
  timeSincePing?: Maybe<Scalars['Int']>,
  pingMode?: Maybe<Ping_Modes>,
  scanResults?: Maybe<Scalars['String']>,
  scanRequest?: Maybe<Scalars['String']>,
  processedData?: Maybe<Array<ProcessedData>>,
  presetAnswers?: Maybe<Array<Maybe<PresetAnswer>>>,
  scanning?: Maybe<Scalars['Boolean']>,
  power?: Maybe<Power>,
  contacts?: Maybe<Array<Maybe<SensorContact>>>,
  armyContacts?: Maybe<Array<Maybe<SensorContact>>>,
  damage?: Maybe<Damage>,
  scans?: Maybe<Array<Maybe<SensorScan>>>,
  history?: Maybe<Scalars['Boolean']>,
  autoTarget?: Maybe<Scalars['Boolean']>,
  frozen?: Maybe<Scalars['Boolean']>,
  autoThrusters?: Maybe<Scalars['Boolean']>,
  interference?: Maybe<Scalars['Float']>,
  movement?: Maybe<Coordinates>,
  segments?: Maybe<Array<Maybe<SensorsSegment>>>,
  locations?: Maybe<Array<Maybe<Room>>>,
  defaultHitpoints?: Maybe<Scalars['Int']>,
  defaultSpeed?: Maybe<Scalars['Float']>,
  missPercent?: Maybe<Scalars['Float']>,
};

export type SensorScan = {
   __typename?: 'SensorScan',
  id: Scalars['ID'],
  timestamp?: Maybe<Scalars['String']>,
  mode?: Maybe<Scalars['String']>,
  location?: Maybe<Scalars['String']>,
  request?: Maybe<Scalars['String']>,
  response?: Maybe<Scalars['String']>,
  scanning?: Maybe<Scalars['Boolean']>,
  cancelled?: Maybe<Scalars['Boolean']>,
};

export type SensorScanInput = {
  id?: Maybe<Scalars['ID']>,
  timestamp?: Maybe<Scalars['String']>,
  mode?: Maybe<Scalars['String']>,
  location?: Maybe<Scalars['String']>,
  request?: Maybe<Scalars['String']>,
  response?: Maybe<Scalars['String']>,
  scanning?: Maybe<Scalars['Boolean']>,
  cancelled?: Maybe<Scalars['Boolean']>,
};

export type SensorsSegment = {
   __typename?: 'SensorsSegment',
  ring?: Maybe<Scalars['Int']>,
  line?: Maybe<Scalars['Int']>,
  state?: Maybe<Scalars['Boolean']>,
};

export type Set = {
   __typename?: 'Set',
  id: Scalars['ID'],
  name: Scalars['String'],
  clients: Array<SetClient>,
};

export type SetClient = {
   __typename?: 'SetClient',
  id?: Maybe<Scalars['ID']>,
  client?: Maybe<Client>,
  simulator?: Maybe<Simulator>,
  stationSet?: Maybe<StationSet>,
  station?: Maybe<Scalars['String']>,
  secondary?: Maybe<Scalars['Boolean']>,
  soundPlayer?: Maybe<Scalars['Boolean']>,
};

export type SetClientInput = {
  id?: Maybe<Scalars['ID']>,
  clientId?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  stationSet?: Maybe<Scalars['ID']>,
  station?: Maybe<Scalars['ID']>,
  secondary?: Maybe<Scalars['Boolean']>,
  soundPlayer?: Maybe<Scalars['Boolean']>,
};

export type Shield = SystemInterface & {
   __typename?: 'Shield',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  heat?: Maybe<Scalars['Float']>,
  coolant?: Maybe<Scalars['Float']>,
  position?: Maybe<Scalars['Int']>,
  power?: Maybe<Power>,
  frequency?: Maybe<Scalars['Float']>,
  state?: Maybe<Scalars['Boolean']>,
  integrity?: Maybe<Scalars['Float']>,
  damage?: Maybe<Damage>,
  locations?: Maybe<Array<Maybe<Room>>>,
};

export type Ship = {
   __typename?: 'Ship',
  clamps?: Maybe<Scalars['Boolean']>,
  ramps?: Maybe<Scalars['Boolean']>,
  airlock?: Maybe<Scalars['Boolean']>,
  legs?: Maybe<Scalars['Boolean']>,
  bridgeCrew?: Maybe<Scalars['Int']>,
  extraPeople?: Maybe<Scalars['Int']>,
  radiation?: Maybe<Scalars['Float']>,
  velocity?: Maybe<Scalars['Float']>,
  remoteAccessCodes?: Maybe<Array<Maybe<RemoteAccessCode>>>,
  selfDestructTime?: Maybe<Scalars['Float']>,
  selfDestructCode?: Maybe<Scalars['String']>,
  selfDestructAuto?: Maybe<Scalars['Boolean']>,
  inventoryLogs?: Maybe<Array<Maybe<InventoryLog>>>,
};

export type ShortRangeComm = SystemInterface & {
   __typename?: 'ShortRangeComm',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  power?: Maybe<Power>,
  damage?: Maybe<Damage>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  heat?: Maybe<Scalars['Float']>,
  coolant?: Maybe<Scalars['Float']>,
  frequency?: Maybe<Scalars['Float']>,
  amplitude?: Maybe<Scalars['Float']>,
  state?: Maybe<Scalars['String']>,
  arrows?: Maybe<Array<Maybe<CommArrow>>>,
  signals?: Maybe<Array<Maybe<CommSignal>>>,
  locations?: Maybe<Array<Maybe<Room>>>,
};

export type ShortRangeCommExtended = {
   __typename?: 'ShortRangeCommExtended',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  power?: Maybe<Power>,
  damage?: Maybe<Damage>,
  name?: Maybe<Scalars['String']>,
  frequency?: Maybe<Scalars['Float']>,
  amplitude?: Maybe<Scalars['Float']>,
  state?: Maybe<Scalars['String']>,
  arrows?: Maybe<Array<Maybe<CommArrow>>>,
  signals?: Maybe<Array<Maybe<CommSignal>>>,
};

export type Sickbay = SystemInterface & {
   __typename?: 'Sickbay',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  type?: Maybe<Scalars['String']>,
  damage?: Maybe<Damage>,
  power?: Maybe<Power>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  deconProgram?: Maybe<Scalars['String']>,
  deconLocation?: Maybe<Scalars['String']>,
  deconActive?: Maybe<Scalars['Boolean']>,
  deconOffset?: Maybe<Scalars['Float']>,
  autoFinishDecon?: Maybe<Scalars['Boolean']>,
  sickbayRoster?: Maybe<Array<Maybe<Crew>>>,
  bunks?: Maybe<Array<Maybe<SickbayBunk>>>,
};

export type SickbayBunk = {
   __typename?: 'SickbayBunk',
  id?: Maybe<Scalars['ID']>,
  sickbayId?: Maybe<Scalars['ID']>,
  scanRequest?: Maybe<Scalars['String']>,
  scanResults?: Maybe<Scalars['String']>,
  scanning?: Maybe<Scalars['Boolean']>,
  patient?: Maybe<Crew>,
};

export type Signal = {
   __typename?: 'Signal',
  id?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  level?: Maybe<Scalars['Float']>,
  power?: Maybe<Scalars['Float']>,
};

export type SignalJammer = SystemInterface & {
   __typename?: 'SignalJammer',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  damage?: Maybe<Damage>,
  power?: Maybe<Power>,
  stealthFactor?: Maybe<Scalars['Float']>,
  addsSensorsInterference?: Maybe<Scalars['Boolean']>,
  active?: Maybe<Scalars['Boolean']>,
  level?: Maybe<Scalars['Float']>,
  strength?: Maybe<Scalars['Float']>,
  signals?: Maybe<Array<Maybe<Signal>>>,
  locations?: Maybe<Array<Maybe<Room>>>,
};

export type SignalJammerInput = {
  id?: Maybe<Scalars['ID']>,
  active?: Maybe<Scalars['Boolean']>,
  level?: Maybe<Scalars['Float']>,
  strength?: Maybe<Scalars['Float']>,
};

export type Simulator = {
   __typename?: 'Simulator',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  alertlevel?: Maybe<Scalars['String']>,
  alertLevelLock?: Maybe<Scalars['Boolean']>,
  layout?: Maybe<Scalars['String']>,
  caps?: Maybe<Scalars['Boolean']>,
  template?: Maybe<Scalars['Boolean']>,
  templateId?: Maybe<Scalars['ID']>,
  systems?: Maybe<Array<System>>,
  stations?: Maybe<Array<Station>>,
  mission?: Maybe<Mission>,
  missionConfigs?: Maybe<Scalars['JSON']>,
  currentTimelineStep?: Maybe<Scalars['Int']>,
  executedTimelineSteps?: Maybe<Array<Scalars['ID']>>,
  timelines?: Maybe<Array<TimelineInstance>>,
  decks?: Maybe<Array<Maybe<Deck>>>,
  rooms?: Maybe<Array<Maybe<Room>>>,
  ship?: Maybe<Ship>,
  stepDamage?: Maybe<Scalars['Boolean']>,
  verifyStep?: Maybe<Scalars['Boolean']>,
  requiredDamageSteps?: Maybe<Array<Maybe<DamageStep>>>,
  optionalDamageSteps?: Maybe<Array<Maybe<DamageStep>>>,
  exocomps?: Maybe<Scalars['Int']>,
  training?: Maybe<Scalars['Boolean']>,
  panels?: Maybe<Array<Maybe<Scalars['ID']>>>,
  commandLines?: Maybe<Array<Maybe<Scalars['ID']>>>,
  triggers?: Maybe<Array<Maybe<Scalars['ID']>>>,
  triggersPaused?: Maybe<Scalars['Boolean']>,
  interfaces?: Maybe<Array<Maybe<Scalars['ID']>>>,
  midiSets?: Maybe<Array<Maybe<Scalars['ID']>>>,
  bridgeOfficerMessaging?: Maybe<Scalars['Boolean']>,
  hasPrinter?: Maybe<Scalars['Boolean']>,
  hasLegs?: Maybe<Scalars['Boolean']>,
  spaceEdventuresId?: Maybe<Scalars['String']>,
  flipped?: Maybe<Scalars['Boolean']>,
  capabilities?: Maybe<SimulatorCapabilities>,
  ambiance?: Maybe<Array<Ambiance>>,
  assets?: Maybe<SimulatorAssets>,
  soundEffects?: Maybe<Scalars['JSON']>,
  damageTasks?: Maybe<Array<Maybe<DamageTask>>>,
  lighting?: Maybe<Lighting>,
  stationSets?: Maybe<Array<Maybe<StationSet>>>,
  stationSet?: Maybe<StationSet>,
};

export type SimulatorAssets = {
   __typename?: 'SimulatorAssets',
  mesh?: Maybe<Scalars['String']>,
  texture?: Maybe<Scalars['String']>,
  side?: Maybe<Scalars['String']>,
  top?: Maybe<Scalars['String']>,
  logo?: Maybe<Scalars['String']>,
  bridge?: Maybe<Scalars['String']>,
};

export type SimulatorAssetsInput = {
  mesh?: Maybe<Scalars['String']>,
  texture?: Maybe<Scalars['String']>,
  side?: Maybe<Scalars['String']>,
  top?: Maybe<Scalars['String']>,
  logo?: Maybe<Scalars['String']>,
  bridge?: Maybe<Scalars['String']>,
};

export type SimulatorCapabilities = {
   __typename?: 'SimulatorCapabilities',
  systems: Array<Scalars['String']>,
  cards: Array<Scalars['String']>,
  spaceEdventures?: Maybe<Scalars['Boolean']>,
  docking?: Maybe<Scalars['Boolean']>,
};

export type SimulatorInput = {
  simulatorId: Scalars['ID'],
  stationSet: Scalars['ID'],
  missionId?: Maybe<Scalars['ID']>,
};

export type SoftwarePanel = {
   __typename?: 'SoftwarePanel',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  cables?: Maybe<Array<Maybe<PanelCable>>>,
  components?: Maybe<Array<Maybe<PanelComponent>>>,
  connections?: Maybe<Array<Maybe<PanelConnection>>>,
};

export type SoftwarePanelInput = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  cables?: Maybe<Array<Maybe<PanelCableInput>>>,
  components?: Maybe<Array<Maybe<PanelComponentInput>>>,
  connections?: Maybe<Array<Maybe<PanelConnectionInput>>>,
};

export type Sound = {
   __typename?: 'Sound',
  id?: Maybe<Scalars['ID']>,
  clients?: Maybe<Array<Maybe<Scalars['String']>>>,
  asset?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
  volume?: Maybe<Scalars['Float']>,
  playbackRate?: Maybe<Scalars['Float']>,
  channel?: Maybe<Array<Maybe<Scalars['Int']>>>,
  looping?: Maybe<Scalars['Boolean']>,
};

export type SoundInput = {
  id?: Maybe<Scalars['ID']>,
  clients?: Maybe<Array<Maybe<Scalars['String']>>>,
  asset?: Maybe<Scalars['String']>,
  volume?: Maybe<Scalars['Float']>,
  playbackRate?: Maybe<Scalars['Float']>,
  channel?: Maybe<Array<Maybe<Scalars['Int']>>>,
  looping?: Maybe<Scalars['Boolean']>,
};

export type SpaceEdventuresCenter = {
   __typename?: 'SpaceEdventuresCenter',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  token?: Maybe<Scalars['String']>,
  simulators?: Maybe<Array<Maybe<NamedObject>>>,
  missions?: Maybe<Array<Maybe<NamedObject>>>,
  badges?: Maybe<Array<Maybe<NamedObject>>>,
  flightTypes?: Maybe<Array<Maybe<FlightType>>>,
};

export type SpaceEdventuresClient = {
   __typename?: 'SpaceEdventuresClient',
  id?: Maybe<Scalars['ID']>,
  token?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
};

export type Speed = {
   __typename?: 'Speed',
  text?: Maybe<Scalars['String']>,
  number?: Maybe<Scalars['Float']>,
  velocity?: Maybe<Scalars['Float']>,
  optimal?: Maybe<Scalars['Boolean']>,
};

export type SpeedInput = {
  text?: Maybe<Scalars['String']>,
  number?: Maybe<Scalars['Float']>,
  velocity?: Maybe<Scalars['Float']>,
  optimal?: Maybe<Scalars['Boolean']>,
};

export type StageChildComponent = {
   __typename?: 'StageChildComponent',
  parentId: Scalars['ID'],
  parent?: Maybe<Entity>,
};

export type StageComponent = {
   __typename?: 'StageComponent',
  scaleLabel?: Maybe<Scalars['String']>,
  scaleLabelShort?: Maybe<Scalars['String']>,
  skyboxKey?: Maybe<Scalars['String']>,
  childrenAsSprites?: Maybe<Scalars['Boolean']>,
};

export type Station = {
   __typename?: 'Station',
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  training?: Maybe<Scalars['String']>,
  login?: Maybe<Scalars['Boolean']>,
  executive?: Maybe<Scalars['Boolean']>,
  messageGroups?: Maybe<Array<Maybe<Scalars['String']>>>,
  layout?: Maybe<Scalars['String']>,
  widgets?: Maybe<Array<Maybe<Scalars['String']>>>,
  cards: Array<Card>,
  ambiance?: Maybe<Scalars['String']>,
};


export type StationCardsArgs = {
  showHidden?: Maybe<Scalars['Boolean']>
};

export type StationSet = {
   __typename?: 'StationSet',
  id: Scalars['ID'],
  name: Scalars['String'],
  simulator?: Maybe<Simulator>,
  crewCount?: Maybe<Scalars['Int']>,
  stations: Array<Station>,
};

export type StealthField = SystemInterface & {
   __typename?: 'StealthField',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  power?: Maybe<Power>,
  damage?: Maybe<Damage>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  activated?: Maybe<Scalars['Boolean']>,
  charge?: Maybe<Scalars['Boolean']>,
  changeAlert?: Maybe<Scalars['Boolean']>,
  state?: Maybe<Scalars['Boolean']>,
  quadrants?: Maybe<StealthQuad>,
  locations?: Maybe<Array<Maybe<Room>>>,
};

export type StealthQuad = {
   __typename?: 'StealthQuad',
  fore?: Maybe<Scalars['Float']>,
  aft?: Maybe<Scalars['Float']>,
  port?: Maybe<Scalars['Float']>,
  starboard?: Maybe<Scalars['Float']>,
};

export type StringCoordinates = {
   __typename?: 'StringCoordinates',
  x?: Maybe<Scalars['String']>,
  y?: Maybe<Scalars['String']>,
  z?: Maybe<Scalars['String']>,
};

export type StringCoordinatesInput = {
  x?: Maybe<Scalars['String']>,
  y?: Maybe<Scalars['String']>,
  z?: Maybe<Scalars['String']>,
};

export type Subscription = {
   __typename?: 'Subscription',
  _empty?: Maybe<Scalars['String']>,
  actionsUpdate?: Maybe<Action>,
  assetFolderChange: Array<AssetFolder>,
  clientChanged?: Maybe<Array<Maybe<Client>>>,
  clientPing?: Maybe<Scalars['Boolean']>,
  keypadsUpdate?: Maybe<Array<Maybe<Keypad>>>,
  keypadUpdate?: Maybe<Keypad>,
  scannersUpdate?: Maybe<Array<Maybe<Scanner>>>,
  scannerUpdate?: Maybe<Scanner>,
  commandLineOutputUpdate?: Maybe<Scalars['String']>,
  commandLinesOutputUpdate?: Maybe<Array<Maybe<Client>>>,
  clearCache?: Maybe<Scalars['Boolean']>,
  soundSub?: Maybe<Sound>,
  cancelSound?: Maybe<Scalars['ID']>,
  cancelAllSounds?: Maybe<Scalars['Boolean']>,
  cancelLoopingSounds?: Maybe<Scalars['Boolean']>,
  commandLineUpdate?: Maybe<Array<Maybe<CommandLine>>>,
  computerCoreUpdate?: Maybe<Array<Maybe<ComputerCore>>>,
  coolantUpdate?: Maybe<Array<Maybe<CoolantTank>>>,
  coolantSystemUpdate?: Maybe<Array<Maybe<SystemCoolant>>>,
  coreFeedUpdate?: Maybe<Array<Maybe<CoreFeed>>>,
  syncTime?: Maybe<Timer>,
  coreLayoutChange?: Maybe<Array<Maybe<CoreLayout>>>,
  crewUpdate?: Maybe<Array<Maybe<Crew>>>,
  crewCountUpdate?: Maybe<Scalars['Int']>,
  crmUpdate?: Maybe<Crm>,
  crmMovementUpdate?: Maybe<Crm>,
  crmFighterUpdate?: Maybe<CrmFighter>,
  decksUpdate?: Maybe<Array<Maybe<Deck>>>,
  dockingUpdate?: Maybe<Array<Maybe<DockingPort>>>,
  speedChange?: Maybe<Engine>,
  heatChange?: Maybe<Engine>,
  engineUpdate?: Maybe<Engine>,
  exocompsUpdate?: Maybe<Array<Maybe<Exocomp>>>,
  flightsUpdate?: Maybe<Array<Maybe<Flight>>>,
  googleSheetsUpdate?: Maybe<Array<Maybe<GoogleSheets>>>,
  interfaceUpdate?: Maybe<Array<Maybe<Interface>>>,
  internalCommUpdate?: Maybe<Array<Maybe<InternalComm>>>,
  inventoryUpdate?: Maybe<Array<Maybe<InventoryItem>>>,
  isochipsUpdate?: Maybe<Array<Maybe<Isochip>>>,
  jumpDriveUpdate?: Maybe<Array<Maybe<JumpDrive>>>,
  keyboardUpdate?: Maybe<Array<Maybe<Keyboard>>>,
  libraryEntriesUpdate?: Maybe<Array<Maybe<LibraryEntry>>>,
  longRangeCommunicationsUpdate?: Maybe<Array<Maybe<LrCommunications>>>,
  macrosUpdate?: Maybe<Array<Maybe<Macro>>>,
  macroButtonsUpdate?: Maybe<Array<Maybe<MacroButtonConfig>>>,
  messageUpdates?: Maybe<Array<Maybe<Message>>>,
  sendMessage?: Maybe<Message>,
  midiSets?: Maybe<Array<Maybe<MidiSet>>>,
  missionsUpdate: Array<Mission>,
  auxTimelinesUpdate?: Maybe<Array<Maybe<TimelineInstance>>>,
  motus?: Maybe<Array<Maybe<Motu>>>,
  motu?: Maybe<Motu>,
  motuChannel?: Maybe<MotuChannel>,
  motuSend?: Maybe<MotuPatch>,
  navigationUpdate?: Maybe<Array<Maybe<Navigation>>>,
  objectiveUpdate?: Maybe<Array<Maybe<Objective>>>,
  officerLogsUpdate?: Maybe<Array<Maybe<Log>>>,
  shipLogsUpdate?: Maybe<Array<Maybe<Log>>>,
  phasersUpdate?: Maybe<Array<Maybe<Phaser>>>,
  probesUpdate: Array<Probes>,
  scienceProbeEmitter?: Maybe<ScienceProbeEvent>,
  railgunUpdate?: Maybe<Array<Maybe<Railgun>>>,
  reactorUpdate: Array<Reactor>,
  recordSnippetsUpdate?: Maybe<Array<Maybe<RecordSnippet>>>,
  recordTemplatesUpdate?: Maybe<Array<Maybe<RecordSnippet>>>,
  roomsUpdate?: Maybe<Array<Maybe<Room>>>,
  sensorsUpdate: Array<Sensors>,
  sensorContactUpdate: Array<SensorContact>,
  sensorsPing?: Maybe<Scalars['String']>,
  setsUpdate?: Maybe<Array<Maybe<Set>>>,
  shieldsUpdate?: Maybe<Array<Maybe<Shield>>>,
  notify?: Maybe<Notification>,
  widgetNotify?: Maybe<Scalars['String']>,
  shortRangeCommUpdate?: Maybe<Array<Maybe<ShortRangeComm>>>,
  sickbayUpdate?: Maybe<Array<Maybe<Sickbay>>>,
  signalJammersUpdate?: Maybe<Array<Maybe<SignalJammer>>>,
  simulatorsUpdate?: Maybe<Array<Maybe<Simulator>>>,
  softwarePanelsUpdate?: Maybe<Array<Maybe<SoftwarePanel>>>,
  stationSetUpdate?: Maybe<Array<Maybe<StationSet>>>,
  stealthFieldUpdate?: Maybe<Array<Maybe<StealthField>>>,
  subspaceFieldUpdate?: Maybe<Array<Maybe<SubspaceField>>>,
  surveyformUpdate?: Maybe<Array<Maybe<SurveyForm>>>,
  systemsUpdate: Array<System>,
  tacticalMapsUpdate?: Maybe<Array<Maybe<TacticalMap>>>,
  tacticalMapUpdate?: Maybe<TacticalMap>,
  targetingUpdate?: Maybe<Array<Maybe<Targeting>>>,
  taskReportUpdate?: Maybe<Array<Maybe<TaskReport>>>,
  tasksUpdate?: Maybe<Array<Maybe<Task>>>,
  taskTemplatesUpdate: Array<TaskTemplate>,
  teamsUpdate?: Maybe<Array<Maybe<Team>>>,
  _templateUpdate?: Maybe<Template>,
  thoriumUpdate?: Maybe<Thorium>,
  clockSync?: Maybe<Scalars['String']>,
  rotationChange?: Maybe<Thruster>,
  thxUpdate?: Maybe<Array<Maybe<Thx>>>,
  torpedosUpdate?: Maybe<Array<Maybe<Torpedo>>>,
  tractorBeamUpdate?: Maybe<Array<Maybe<TractorBeam>>>,
  transporterUpdate?: Maybe<Transporter>,
  transwarpUpdate?: Maybe<Array<Maybe<Transwarp>>>,
  triggersUpdate?: Maybe<Array<Maybe<Trigger>>>,
  viewscreensUpdate?: Maybe<Array<Maybe<Viewscreen>>>,
  viewscreenVideoToggle?: Maybe<Scalars['Boolean']>,
  countermeasuresUpdate?: Maybe<Countermeasures>,
  entity?: Maybe<Entity>,
  entities?: Maybe<Array<Maybe<Entity>>>,
  dmxSets: Array<DmxSet>,
  dmxDevices: Array<DmxDevice>,
  dmxFixtures: Array<DmxFixture>,
  dmxConfigs: Array<DmxConfig>,
  taskFlows: Array<TaskFlow>,
};


export type SubscriptionActionsUpdateArgs = {
  simulatorId: Scalars['ID'],
  stationId?: Maybe<Scalars['ID']>,
  clientId?: Maybe<Scalars['ID']>
};


export type SubscriptionClientChangedArgs = {
  all?: Maybe<Scalars['Boolean']>,
  clientId?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  stationName?: Maybe<Scalars['String']>,
  flightId?: Maybe<Scalars['ID']>
};


export type SubscriptionClientPingArgs = {
  clientId: Scalars['ID']
};


export type SubscriptionKeypadsUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionKeypadUpdateArgs = {
  client: Scalars['ID']
};


export type SubscriptionScannersUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionScannerUpdateArgs = {
  client: Scalars['ID']
};


export type SubscriptionCommandLineOutputUpdateArgs = {
  clientId: Scalars['ID']
};


export type SubscriptionCommandLinesOutputUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionClearCacheArgs = {
  client?: Maybe<Scalars['ID']>,
  flight?: Maybe<Scalars['ID']>
};


export type SubscriptionSoundSubArgs = {
  clientId?: Maybe<Scalars['ID']>
};


export type SubscriptionCancelSoundArgs = {
  clientId?: Maybe<Scalars['ID']>
};


export type SubscriptionCancelAllSoundsArgs = {
  clientId?: Maybe<Scalars['ID']>
};


export type SubscriptionCancelLoopingSoundsArgs = {
  clientId?: Maybe<Scalars['ID']>
};


export type SubscriptionCommandLineUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionComputerCoreUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionCoolantUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionCoolantSystemUpdateArgs = {
  simulatorId: Scalars['ID'],
  systemId?: Maybe<Scalars['ID']>
};


export type SubscriptionCoreFeedUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionSyncTimeArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionCrewUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  position?: Maybe<Scalars['String']>,
  killed?: Maybe<Scalars['Boolean']>
};


export type SubscriptionCrewCountUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  position?: Maybe<Scalars['String']>,
  killed?: Maybe<Scalars['Boolean']>
};


export type SubscriptionCrmUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionCrmMovementUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionCrmFighterUpdateArgs = {
  simulatorId: Scalars['ID'],
  clientId: Scalars['ID']
};


export type SubscriptionDecksUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionDockingUpdateArgs = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Docking_Types>
};


export type SubscriptionSpeedChangeArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionHeatChangeArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionEngineUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionExocompsUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionFlightsUpdateArgs = {
  running?: Maybe<Scalars['Boolean']>,
  id?: Maybe<Scalars['ID']>
};


export type SubscriptionGoogleSheetsUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionInterfaceUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionInternalCommUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionInventoryUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionIsochipsUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionJumpDriveUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionLibraryEntriesUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  all?: Maybe<Scalars['Boolean']>
};


export type SubscriptionLongRangeCommunicationsUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionMessageUpdatesArgs = {
  simulatorId: Scalars['ID'],
  station?: Maybe<Scalars['String']>
};


export type SubscriptionSendMessageArgs = {
  simulatorId: Scalars['ID'],
  station?: Maybe<Scalars['String']>
};


export type SubscriptionMidiSetsArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionMissionsUpdateArgs = {
  missionId?: Maybe<Scalars['ID']>,
  aux?: Maybe<Scalars['Boolean']>
};


export type SubscriptionAuxTimelinesUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionMotuArgs = {
  id: Scalars['ID']
};


export type SubscriptionMotuChannelArgs = {
  id: Scalars['ID'],
  channelId: Scalars['ID']
};


export type SubscriptionMotuSendArgs = {
  id: Scalars['ID'],
  inputId: Scalars['ID'],
  outputId: Scalars['ID']
};


export type SubscriptionNavigationUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionObjectiveUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionOfficerLogsUpdateArgs = {
  clientId?: Maybe<Scalars['ID']>,
  flightId: Scalars['ID']
};


export type SubscriptionShipLogsUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionPhasersUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionProbesUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionScienceProbeEmitterArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionRailgunUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionReactorUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionRecordSnippetsUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  visible?: Maybe<Scalars['Boolean']>
};


export type SubscriptionRoomsUpdateArgs = {
  simulatorId: Scalars['ID'],
  role?: Maybe<RoomRoles>
};


export type SubscriptionSensorsUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  domain?: Maybe<Scalars['String']>
};


export type SubscriptionSensorContactUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  sensorId?: Maybe<Scalars['ID']>,
  hostile?: Maybe<Scalars['Boolean']>,
  type?: Maybe<Scalars['String']>
};


export type SubscriptionSensorsPingArgs = {
  sensorId?: Maybe<Scalars['ID']>
};


export type SubscriptionShieldsUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionNotifyArgs = {
  simulatorId: Scalars['ID'],
  station?: Maybe<Scalars['String']>,
  trigger?: Maybe<Scalars['String']>
};


export type SubscriptionWidgetNotifyArgs = {
  simulatorId: Scalars['ID'],
  station?: Maybe<Scalars['String']>
};


export type SubscriptionShortRangeCommUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionSickbayUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionSignalJammersUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionSimulatorsUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  template?: Maybe<Scalars['Boolean']>
};


export type SubscriptionSoftwarePanelsUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionStealthFieldUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionSubspaceFieldUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionSurveyformUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  active?: Maybe<Scalars['Boolean']>
};


export type SubscriptionSystemsUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  power?: Maybe<Scalars['Boolean']>,
  heat?: Maybe<Scalars['Boolean']>,
  extra?: Maybe<Scalars['Boolean']>,
  damageWhich?: Maybe<Scalars['String']>
};


export type SubscriptionTacticalMapsUpdateArgs = {
  flightId?: Maybe<Scalars['ID']>
};


export type SubscriptionTacticalMapUpdateArgs = {
  id: Scalars['ID'],
  lowInterval?: Maybe<Scalars['Boolean']>
};


export type SubscriptionTargetingUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionTaskReportUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  cleared?: Maybe<Scalars['Boolean']>
};


export type SubscriptionTasksUpdateArgs = {
  simulatorId: Scalars['ID'],
  station?: Maybe<Scalars['String']>,
  definitions?: Maybe<Array<Scalars['String']>>
};


export type SubscriptionTeamsUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  cleared?: Maybe<Scalars['Boolean']>
};


export type Subscription_TemplateUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionClockSyncArgs = {
  clientId: Scalars['ID']
};


export type SubscriptionRotationChangeArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionThxUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionTorpedosUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionTractorBeamUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionTransporterUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionTranswarpUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionTriggersUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionViewscreensUpdateArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};


export type SubscriptionViewscreenVideoToggleArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  viewscreenId?: Maybe<Scalars['ID']>
};


export type SubscriptionCountermeasuresUpdateArgs = {
  simulatorId: Scalars['ID']
};


export type SubscriptionEntityArgs = {
  id?: Maybe<Scalars['ID']>
};


export type SubscriptionEntitiesArgs = {
  flightId: Scalars['ID'],
  stageId?: Maybe<Scalars['ID']>,
  template?: Maybe<Scalars['Boolean']>
};


export type SubscriptionDmxFixturesArgs = {
  simulatorId?: Maybe<Scalars['ID']>,
  clientId?: Maybe<Scalars['ID']>
};


export type SubscriptionTaskFlowsArgs = {
  simulatorId?: Maybe<Scalars['ID']>
};

export type SubspaceField = SystemInterface & {
   __typename?: 'SubspaceField',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  damage?: Maybe<Damage>,
  power?: Maybe<Power>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  totalPower?: Maybe<Scalars['Int']>,
  fore?: Maybe<SubspaceFieldSector>,
  aft?: Maybe<SubspaceFieldSector>,
  port?: Maybe<SubspaceFieldSector>,
  starboard?: Maybe<SubspaceFieldSector>,
  ventral?: Maybe<SubspaceFieldSector>,
  dorsal?: Maybe<SubspaceFieldSector>,
};

export type SubspaceFieldSector = {
   __typename?: 'SubspaceFieldSector',
  required?: Maybe<Scalars['Int']>,
  value?: Maybe<Scalars['Int']>,
};

export type SurveyForm = {
   __typename?: 'SurveyForm',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
  active?: Maybe<Scalars['Boolean']>,
  googleSpreadsheet?: Maybe<Scalars['ID']>,
  googleSpreadsheetName?: Maybe<Scalars['String']>,
  googleSheet?: Maybe<Scalars['String']>,
  form?: Maybe<Array<Maybe<FormFields>>>,
  results?: Maybe<Array<Maybe<FormResults>>>,
};

export type System = SystemInterface & {
   __typename?: 'System',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  wing?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  upgradeMacros?: Maybe<Array<Maybe<TimelineItem>>>,
  upgradeBoard?: Maybe<Scalars['ID']>,
  extra?: Maybe<Scalars['Boolean']>,
  damage?: Maybe<Damage>,
  power?: Maybe<Power>,
  stealthFactor?: Maybe<Scalars['Float']>,
  heat?: Maybe<Scalars['Float']>,
  coolant?: Maybe<Scalars['Float']>,
  heatRate?: Maybe<Scalars['Float']>,
  isochips?: Maybe<Array<Maybe<Isochip>>>,
  locations?: Maybe<Array<Maybe<Room>>>,
  requiredDamageSteps?: Maybe<Array<Maybe<DamageStep>>>,
  optionalDamageSteps?: Maybe<Array<Maybe<DamageStep>>>,
  damageTasks?: Maybe<Array<Maybe<DamageTask>>>,
};

export type SystemCoolant = {
   __typename?: 'SystemCoolant',
  systemId?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  coolant?: Maybe<Scalars['Float']>,
  coolantRate?: Maybe<Scalars['Float']>,
};

export type SystemInterface = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  damage?: Maybe<Damage>,
  power?: Maybe<Power>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
};

export enum Tactical_Types {
  Grid = 'grid',
  Image = 'image',
  Objects = 'objects',
  Path = 'path',
  Video = 'video'
}

export type TacticalItem = {
   __typename?: 'TacticalItem',
  id?: Maybe<Scalars['ID']>,
  layerId?: Maybe<Scalars['ID']>,
  label?: Maybe<Scalars['String']>,
  font?: Maybe<Scalars['String']>,
  fontSize?: Maybe<Scalars['Float']>,
  fontColor?: Maybe<Scalars['String']>,
  flash?: Maybe<Scalars['Boolean']>,
  icon?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  opacity?: Maybe<Scalars['Float']>,
  speed?: Maybe<Scalars['Float']>,
  velocity?: Maybe<Coordinates>,
  location?: Maybe<Coordinates>,
  locationJson?: Maybe<Scalars['String']>,
  destination?: Maybe<Coordinates>,
  rotation?: Maybe<Scalars['Float']>,
  wasd?: Maybe<Scalars['Boolean']>,
  ijkl?: Maybe<Scalars['Boolean']>,
  thrusters?: Maybe<Scalars['Boolean']>,
  rotationMatch?: Maybe<Scalars['Boolean']>,
  thrusterControls?: Maybe<ThrusterControls>,
};

export type TacticalItemInput = {
  id?: Maybe<Scalars['ID']>,
  label?: Maybe<Scalars['String']>,
  font?: Maybe<Scalars['String']>,
  fontSize?: Maybe<Scalars['Float']>,
  fontColor?: Maybe<Scalars['String']>,
  flash?: Maybe<Scalars['Boolean']>,
  icon?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  opacity?: Maybe<Scalars['Float']>,
  speed?: Maybe<Scalars['Float']>,
  velocity?: Maybe<CoordinatesInput>,
  location?: Maybe<CoordinatesInput>,
  destination?: Maybe<CoordinatesInput>,
  rotation?: Maybe<Scalars['Float']>,
  wasd?: Maybe<Scalars['Boolean']>,
  ijkl?: Maybe<Scalars['Boolean']>,
  thrusters?: Maybe<Scalars['Boolean']>,
  rotationMatch?: Maybe<Scalars['Boolean']>,
  thrusterControls?: Maybe<ThrusterControlsInput>,
};

export type TacticalLayer = {
   __typename?: 'TacticalLayer',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Tactical_Types>,
  opacity?: Maybe<Scalars['Float']>,
  items?: Maybe<Array<Maybe<TacticalItem>>>,
  image?: Maybe<Scalars['String']>,
  color?: Maybe<Scalars['String']>,
  labels?: Maybe<Scalars['Boolean']>,
  gridCols?: Maybe<Scalars['Int']>,
  gridRows?: Maybe<Scalars['Int']>,
  paths?: Maybe<Array<Maybe<TacticalPath>>>,
  advance?: Maybe<Scalars['Boolean']>,
  asset?: Maybe<Scalars['String']>,
  autoplay?: Maybe<Scalars['Boolean']>,
  loop?: Maybe<Scalars['Boolean']>,
  playbackSpeed?: Maybe<Scalars['Float']>,
};

export type TacticalLayerInput = {
  id?: Maybe<Scalars['ID']>,
  type?: Maybe<Tactical_Types>,
  opacity?: Maybe<Scalars['Float']>,
  image?: Maybe<Scalars['String']>,
  color?: Maybe<Scalars['String']>,
  labels?: Maybe<Scalars['Boolean']>,
  gridCols?: Maybe<Scalars['Int']>,
  gridRows?: Maybe<Scalars['Int']>,
  advance?: Maybe<Scalars['Boolean']>,
  asset?: Maybe<Scalars['String']>,
  autoplay?: Maybe<Scalars['Boolean']>,
  loop?: Maybe<Scalars['Boolean']>,
  playbackSpeed?: Maybe<Scalars['Float']>,
};

export type TacticalMap = {
   __typename?: 'TacticalMap',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  template?: Maybe<Scalars['Boolean']>,
  flight?: Maybe<Flight>,
  layers?: Maybe<Array<Maybe<TacticalLayer>>>,
  frozen?: Maybe<Scalars['Boolean']>,
  interval?: Maybe<Scalars['Float']>,
};

export type TacticalPath = {
   __typename?: 'TacticalPath',
  id?: Maybe<Scalars['ID']>,
  layerId?: Maybe<Scalars['ID']>,
  start?: Maybe<Coordinates>,
  end?: Maybe<Coordinates>,
  c1?: Maybe<Coordinates>,
  c2?: Maybe<Coordinates>,
  color?: Maybe<Scalars['String']>,
  width?: Maybe<Scalars['Float']>,
  arrow?: Maybe<Scalars['Boolean']>,
};

export type TacticalPathInput = {
  id?: Maybe<Scalars['ID']>,
  start?: Maybe<CoordinatesInput>,
  end?: Maybe<CoordinatesInput>,
  c1?: Maybe<CoordinatesInput>,
  c2?: Maybe<CoordinatesInput>,
  color?: Maybe<Scalars['String']>,
  width?: Maybe<Scalars['Float']>,
  arrow?: Maybe<Scalars['Boolean']>,
};

export type TargetClassInput = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  icon?: Maybe<Scalars['String']>,
  picture?: Maybe<Scalars['String']>,
  speed?: Maybe<Scalars['Float']>,
  quadrant?: Maybe<Scalars['Int']>,
  moving?: Maybe<Scalars['Boolean']>,
  clickToTarget?: Maybe<Scalars['Boolean']>,
};

export type Targeting = SystemInterface & {
   __typename?: 'Targeting',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  power?: Maybe<Power>,
  damage?: Maybe<Damage>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  contacts?: Maybe<Array<Maybe<TargetingContact>>>,
  classes?: Maybe<Array<Maybe<TargetingClass>>>,
  quadrants?: Maybe<Scalars['Boolean']>,
  range?: Maybe<Scalars['Float']>,
  coordinateTargeting?: Maybe<Scalars['Boolean']>,
  interference?: Maybe<Scalars['Float']>,
  targetedSensorContact?: Maybe<SensorContact>,
  calculatedTarget?: Maybe<StringCoordinates>,
  enteredTarget?: Maybe<StringCoordinates>,
};

export type TargetingClass = {
   __typename?: 'TargetingClass',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  icon?: Maybe<Scalars['String']>,
  picture?: Maybe<Scalars['String']>,
  speed?: Maybe<Scalars['Float']>,
  quadrant?: Maybe<Scalars['Int']>,
  moving?: Maybe<Scalars['Boolean']>,
  clickToTarget?: Maybe<Scalars['Boolean']>,
};

export type TargetingContact = {
   __typename?: 'TargetingContact',
  id?: Maybe<Scalars['ID']>,
  class?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  targeted?: Maybe<Scalars['Boolean']>,
  system?: Maybe<Scalars['String']>,
  icon?: Maybe<Scalars['String']>,
  picture?: Maybe<Scalars['String']>,
  speed?: Maybe<Scalars['Float']>,
  quadrant?: Maybe<Scalars['Int']>,
  destroyed?: Maybe<Scalars['Boolean']>,
  moving?: Maybe<Scalars['Boolean']>,
  clickToTarget?: Maybe<Scalars['Boolean']>,
};

export type Task = {
   __typename?: 'Task',
  id: Scalars['ID'],
  simulatorId?: Maybe<Scalars['ID']>,
  station?: Maybe<Scalars['String']>,
  systemId?: Maybe<Scalars['ID']>,
  deck?: Maybe<Deck>,
  room?: Maybe<Room>,
  definition: Scalars['String'],
  verified?: Maybe<Scalars['Boolean']>,
  verifyRequested?: Maybe<Scalars['Boolean']>,
  dismissed?: Maybe<Scalars['Boolean']>,
  values?: Maybe<Scalars['JSON']>,
  instructions?: Maybe<Scalars['String']>,
  startTime?: Maybe<Scalars['String']>,
  endTime?: Maybe<Scalars['String']>,
  timeElapsedInMS?: Maybe<Scalars['Int']>,
  macros?: Maybe<Array<Maybe<MacroAction>>>,
  preMacros: Array<MacroAction>,
  assigned?: Maybe<Scalars['Boolean']>,
};

export type TaskDefinition = {
   __typename?: 'TaskDefinition',
  id: Scalars['ID'],
  name: Scalars['String'],
  class: Scalars['String'],
  stations?: Maybe<Array<Maybe<Station>>>,
  active: Scalars['Boolean'],
  valuesInput: Scalars['JSON'],
  valuesValue: Scalars['JSON'],
};

export type TaskFlow = {
   __typename?: 'TaskFlow',
  id: Scalars['ID'],
  name: Scalars['String'],
  currentStep: Scalars['Int'],
  steps: Array<TaskFlowStep>,
  completed: Scalars['Boolean'],
};

export type TaskFlowStep = {
   __typename?: 'TaskFlowStep',
  id: Scalars['ID'],
  name: Scalars['String'],
  tasks: Array<Task>,
  activeTasks: Array<Task>,
  completeAll: Scalars['Boolean'],
  completed: Scalars['Boolean'],
};

export type TaskInput = {
  simulatorId?: Maybe<Scalars['ID']>,
  definition?: Maybe<Scalars['String']>,
  values?: Maybe<Scalars['JSON']>,
  station?: Maybe<Scalars['String']>,
  macros?: Maybe<Array<Maybe<ActionInput>>>,
  preMacros?: Maybe<Array<Maybe<ActionInput>>>,
};

export type TaskReport = {
   __typename?: 'TaskReport',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  system?: Maybe<System>,
  type?: Maybe<Scalars['String']>,
  stepCount?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  tasks?: Maybe<Array<Maybe<Task>>>,
};

export type TaskTemplate = {
   __typename?: 'TaskTemplate',
  id: Scalars['ID'],
  name: Scalars['String'],
  values: Scalars['JSON'],
  definition: Scalars['String'],
  reportTypes: Array<Scalars['String']>,
  macros: Array<MacroAction>,
  preMacros: Array<MacroAction>,
};

export type Team = {
   __typename?: 'Team',
  id?: Maybe<Scalars['ID']>,
  type?: Maybe<Team_Types>,
  simulatorId?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  priority?: Maybe<Priorities>,
  location?: Maybe<Location>,
  orders?: Maybe<Scalars['String']>,
  officers?: Maybe<Array<Maybe<Crew>>>,
  cleared?: Maybe<Scalars['Boolean']>,
};

export enum Team_Types {
  Security = 'security',
  Damage = 'damage',
  Medical = 'medical'
}

export type TeamCount = {
   __typename?: 'TeamCount',
  team?: Maybe<Team>,
  count?: Maybe<Scalars['Int']>,
};

export type TeamCountInput = {
   __typename?: 'TeamCountInput',
  team?: Maybe<Scalars['ID']>,
  count?: Maybe<Scalars['Int']>,
};

export type TeamInput = {
  id?: Maybe<Scalars['ID']>,
  type?: Maybe<Team_Types>,
  simulatorId?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  priority?: Maybe<Priorities>,
  location?: Maybe<Scalars['String']>,
  orders?: Maybe<Scalars['String']>,
  officers?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export type Template = {
   __typename?: 'Template',
  id?: Maybe<Scalars['ID']>,
};

export type TemplateComponent = {
   __typename?: 'TemplateComponent',
  category?: Maybe<Scalars['String']>,
};

export enum Terminal_Status {
  F = 'F',
  O = 'O',
  S = 'S',
  R = 'R'
}

export type Thorium = {
   __typename?: 'Thorium',
  thoriumId?: Maybe<Scalars['String']>,
  doTrack?: Maybe<Scalars['Boolean']>,
  askedToTrack?: Maybe<Scalars['Boolean']>,
  addedTaskTemplates?: Maybe<Scalars['Boolean']>,
  spaceEdventuresToken?: Maybe<Scalars['String']>,
  spaceEdventuresCenter?: Maybe<SpaceEdventuresCenter>,
  port?: Maybe<Scalars['Int']>,
  httpOnly?: Maybe<Scalars['Boolean']>,
};

export type Thruster = SystemInterface & {
   __typename?: 'Thruster',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  type?: Maybe<Scalars['String']>,
  simulatorId?: Maybe<Scalars['ID']>,
  direction?: Maybe<Coordinates>,
  rotation?: Maybe<Rotation>,
  rotationDelta?: Maybe<Rotation>,
  rotationRequired?: Maybe<Rotation>,
  manualThrusters?: Maybe<Scalars['Boolean']>,
  power?: Maybe<Power>,
  damage?: Maybe<Damage>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  rotationSpeed?: Maybe<Scalars['Float']>,
  movementSpeed?: Maybe<Scalars['Float']>,
};

export type ThrusterControls = {
   __typename?: 'ThrusterControls',
  rotation?: Maybe<Scalars['String']>,
  reversed?: Maybe<Scalars['Boolean']>,
  matchRotation?: Maybe<Scalars['Boolean']>,
  up?: Maybe<Scalars['String']>,
  down?: Maybe<Scalars['String']>,
  left?: Maybe<Scalars['String']>,
  right?: Maybe<Scalars['String']>,
};

export type ThrusterControlsInput = {
  rotation?: Maybe<Scalars['String']>,
  reversed?: Maybe<Scalars['Boolean']>,
  matchRotation?: Maybe<Scalars['Boolean']>,
  up?: Maybe<Scalars['String']>,
  down?: Maybe<Scalars['String']>,
  left?: Maybe<Scalars['String']>,
  right?: Maybe<Scalars['String']>,
};

export type ThrustersComponent = {
   __typename?: 'ThrustersComponent',
  direction?: Maybe<Coordinates>,
  rotationDelta?: Maybe<Coordinates>,
  rotationSpeed?: Maybe<Scalars['Float']>,
  movementSpeed?: Maybe<Scalars['Float']>,
};

export type Thx = SystemInterface & {
   __typename?: 'Thx',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  damage?: Maybe<Damage>,
  power?: Maybe<Power>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  activated?: Maybe<Scalars['Boolean']>,
  clients?: Maybe<Array<Maybe<ThxClient>>>,
};

export type ThxClient = {
   __typename?: 'ThxClient',
  id?: Maybe<Scalars['ID']>,
  charge?: Maybe<Scalars['Float']>,
  lock?: Maybe<Scalars['Boolean']>,
  station?: Maybe<Station>,
  executive?: Maybe<Scalars['Boolean']>,
  connected?: Maybe<Scalars['Boolean']>,
};

export enum Timeline_Item_Config_Type {
  Client = 'client',
  Station = 'station'
}

export type TimelineInstance = {
   __typename?: 'TimelineInstance',
  id?: Maybe<Scalars['ID']>,
  mission?: Maybe<Mission>,
  currentTimelineStep?: Maybe<Scalars['Int']>,
  executedTimelineSteps?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export type TimelineItem = {
   __typename?: 'TimelineItem',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  event: Scalars['String'],
  needsConfig?: Maybe<Scalars['Boolean']>,
  args?: Maybe<Scalars['String']>,
  delay?: Maybe<Scalars['Int']>,
  noCancelOnReset?: Maybe<Scalars['Boolean']>,
};

export type TimelineItemInput = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  event?: Maybe<Scalars['String']>,
  args?: Maybe<Scalars['String']>,
  delay?: Maybe<Scalars['Int']>,
  noCancelOnReset?: Maybe<Scalars['Boolean']>,
};

export type TimelineStep = {
   __typename?: 'TimelineStep',
  id: Scalars['ID'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  order?: Maybe<Scalars['Int']>,
  timelineItems: Array<TimelineItem>,
};

export type Timer = {
   __typename?: 'Timer',
  time?: Maybe<Scalars['String']>,
  active?: Maybe<Scalars['Boolean']>,
};

export type Torpedo = SystemInterface & {
   __typename?: 'Torpedo',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  power?: Maybe<Power>,
  damage?: Maybe<Damage>,
  inventory?: Maybe<Array<Maybe<Warhead>>>,
  loaded?: Maybe<Scalars['ID']>,
  state?: Maybe<Scalars['String']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
};

export type TractorBeam = SystemInterface & {
   __typename?: 'TractorBeam',
  id: Scalars['ID'],
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  power: Power,
  damage: Damage,
  name: Scalars['String'],
  displayName: Scalars['String'],
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  beams: Array<TractorBeamBeam>,
};

export type TractorBeamBeam = {
   __typename?: 'TractorBeamBeam',
  id: Scalars['ID'],
  state: Scalars['Boolean'],
  target: Scalars['Boolean'],
  targetLabel: Scalars['String'],
  strength: Scalars['Float'],
  stress: Scalars['Float'],
  scanning: Scalars['Boolean'],
};

export type Transporter = SystemInterface & {
   __typename?: 'Transporter',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  targets?: Maybe<Array<Maybe<TransporterTarget>>>,
  requestedTarget?: Maybe<Scalars['String']>,
  destination?: Maybe<Scalars['String']>,
  charge?: Maybe<Scalars['Float']>,
  state?: Maybe<Scalars['String']>,
  power?: Maybe<Power>,
  damage?: Maybe<Damage>,
  chargeSpeed?: Maybe<Scalars['Float']>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
};

export type TransporterInput = {
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  requestedTarget?: Maybe<Scalars['String']>,
  destination?: Maybe<Scalars['String']>,
  charge?: Maybe<Scalars['Float']>,
  state?: Maybe<Scalars['String']>,
};

export type TransporterTarget = {
   __typename?: 'TransporterTarget',
  id?: Maybe<Scalars['ID']>,
  icon?: Maybe<Scalars['String']>,
  moving?: Maybe<Scalars['Boolean']>,
  position?: Maybe<Coordinates>,
};

export type Transwarp = SystemInterface & {
   __typename?: 'Transwarp',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  upgradeName?: Maybe<Scalars['String']>,
  upgraded?: Maybe<Scalars['Boolean']>,
  damage?: Maybe<Damage>,
  power?: Maybe<Power>,
  stealthFactor?: Maybe<Scalars['Float']>,
  locations?: Maybe<Array<Maybe<Room>>>,
  heat?: Maybe<Scalars['Float']>,
  heatRate?: Maybe<Scalars['Float']>,
  coolant?: Maybe<Scalars['Float']>,
  active?: Maybe<Scalars['Boolean']>,
  quad1?: Maybe<TranswarpQuad>,
  quad2?: Maybe<TranswarpQuad>,
  quad3?: Maybe<TranswarpQuad>,
  quad4?: Maybe<TranswarpQuad>,
};

export type TranswarpQuad = {
   __typename?: 'TranswarpQuad',
  field?: Maybe<SubspaceFieldSector>,
  core?: Maybe<SubspaceFieldSector>,
  warp?: Maybe<SubspaceFieldSector>,
};

export type Trigger = {
   __typename?: 'Trigger',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  components?: Maybe<Scalars['JSON']>,
  connections?: Maybe<Scalars['JSON']>,
  values?: Maybe<Scalars['JSON']>,
  config?: Maybe<Scalars['JSON']>,
};

export type Viewscreen = {
   __typename?: 'Viewscreen',
  id?: Maybe<Scalars['ID']>,
  simulatorId?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  component?: Maybe<Scalars['String']>,
  data?: Maybe<Scalars['String']>,
  auto?: Maybe<Scalars['Boolean']>,
  secondary?: Maybe<Scalars['Boolean']>,
  overlay?: Maybe<Scalars['Boolean']>,
  pictureInPicture?: Maybe<ViewscreenPictureInPicture>,
};

export type ViewscreenPictureInPicture = {
   __typename?: 'ViewscreenPictureInPicture',
  component?: Maybe<Scalars['String']>,
  data?: Maybe<Scalars['JSON']>,
  position?: Maybe<Pip_Position>,
  size?: Maybe<Pip_Size>,
};

export type Warhead = {
   __typename?: 'Warhead',
  id?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
  probe?: Maybe<Probe>,
};

export type WarheadInput = {
  type?: Maybe<Scalars['String']>,
  probe?: Maybe<Scalars['ID']>,
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
   __typename?: '__Directive',
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  locations: Array<__DirectiveLocation>,
  args: Array<__InputValue>,
};

/** 
 * A Directive can be adjacent to many parts of the GraphQL language, a
 * __DirectiveLocation describes one such possible adjacencies.
 */
export enum __DirectiveLocation {
  /** Location adjacent to a query operation. */
  Query = 'QUERY',
  /** Location adjacent to a mutation operation. */
  Mutation = 'MUTATION',
  /** Location adjacent to a subscription operation. */
  Subscription = 'SUBSCRIPTION',
  /** Location adjacent to a field. */
  Field = 'FIELD',
  /** Location adjacent to a fragment definition. */
  FragmentDefinition = 'FRAGMENT_DEFINITION',
  /** Location adjacent to a fragment spread. */
  FragmentSpread = 'FRAGMENT_SPREAD',
  /** Location adjacent to an inline fragment. */
  InlineFragment = 'INLINE_FRAGMENT',
  /** Location adjacent to a variable definition. */
  VariableDefinition = 'VARIABLE_DEFINITION',
  /** Location adjacent to a schema definition. */
  Schema = 'SCHEMA',
  /** Location adjacent to a scalar definition. */
  Scalar = 'SCALAR',
  /** Location adjacent to an object type definition. */
  Object = 'OBJECT',
  /** Location adjacent to a field definition. */
  FieldDefinition = 'FIELD_DEFINITION',
  /** Location adjacent to an argument definition. */
  ArgumentDefinition = 'ARGUMENT_DEFINITION',
  /** Location adjacent to an interface definition. */
  Interface = 'INTERFACE',
  /** Location adjacent to a union definition. */
  Union = 'UNION',
  /** Location adjacent to an enum definition. */
  Enum = 'ENUM',
  /** Location adjacent to an enum value definition. */
  EnumValue = 'ENUM_VALUE',
  /** Location adjacent to an input object type definition. */
  InputObject = 'INPUT_OBJECT',
  /** Location adjacent to an input object field definition. */
  InputFieldDefinition = 'INPUT_FIELD_DEFINITION'
}

/** 
 * One possible value for a given Enum. Enum values are unique values, not a
 * placeholder for a string or numeric value. However an Enum value is returned in
 * a JSON response as a string.
 */
export type __EnumValue = {
   __typename?: '__EnumValue',
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  isDeprecated: Scalars['Boolean'],
  deprecationReason?: Maybe<Scalars['String']>,
};

/** 
 * Object and Interface types are described by a list of Fields, each of which has
 * a name, potentially a list of arguments, and a return type.
 */
export type __Field = {
   __typename?: '__Field',
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  args: Array<__InputValue>,
  type: __Type,
  isDeprecated: Scalars['Boolean'],
  deprecationReason?: Maybe<Scalars['String']>,
};

/** 
 * Arguments provided to Fields or Directives and the input fields of an
 * InputObject are represented as Input Values which describe their type and
 * optionally a default value.
 */
export type __InputValue = {
   __typename?: '__InputValue',
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  type: __Type,
  /** A GraphQL-formatted string representing the default value for this input value. */
  defaultValue?: Maybe<Scalars['String']>,
};

/** 
 * A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all
 * available types and directives on the server, as well as the entry points for
 * query, mutation, and subscription operations.
 */
export type __Schema = {
   __typename?: '__Schema',
  /** A list of all types supported by this server. */
  types: Array<__Type>,
  /** The type that query operations will be rooted at. */
  queryType: __Type,
  /** If this server supports mutation, the type that mutation operations will be rooted at. */
  mutationType?: Maybe<__Type>,
  /** If this server support subscription, the type that subscription operations will be rooted at. */
  subscriptionType?: Maybe<__Type>,
  /** A list of all directives supported by this server. */
  directives: Array<__Directive>,
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
   __typename?: '__Type',
  kind: __TypeKind,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  fields?: Maybe<Array<__Field>>,
  interfaces?: Maybe<Array<__Type>>,
  possibleTypes?: Maybe<Array<__Type>>,
  enumValues?: Maybe<Array<__EnumValue>>,
  inputFields?: Maybe<Array<__InputValue>>,
  ofType?: Maybe<__Type>,
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
  includeDeprecated?: Maybe<Scalars['Boolean']>
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
  includeDeprecated?: Maybe<Scalars['Boolean']>
};

/** An enum describing what kind of type a given `__Type` is. */
export enum __TypeKind {
  /** Indicates this type is a scalar. */
  Scalar = 'SCALAR',
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  Object = 'OBJECT',
  /** Indicates this type is an interface. `fields` and `possibleTypes` are valid fields. */
  Interface = 'INTERFACE',
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  Union = 'UNION',
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  Enum = 'ENUM',
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  InputObject = 'INPUT_OBJECT',
  /** Indicates this type is a list. `ofType` is a valid field. */
  List = 'LIST',
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  NonNull = 'NON_NULL'
}

export type ActivateLightingMutationVariables = {
  clientId: Scalars['ID'];
  dmxSetId: Scalars['ID'];
};


export type ActivateLightingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clientActivateLights'>
);

export type AmbianceQueryVariables = {
  id: Scalars['ID'];
};


export type AmbianceQuery = (
  { __typename?: 'Query' }
  & { simulators: Array<(
    { __typename?: 'Simulator' }
    & Pick<Simulator, 'id'>
    & { ambiance?: Maybe<Array<(
      { __typename?: 'Ambiance' }
      & Pick<Ambiance, 'id' | 'name' | 'asset' | 'volume' | 'channel' | 'playbackRate'>
    )>> }
  )> }
);

export type ClientDataFragment = (
  { __typename?: 'Client' }
  & Pick<Client, 'id' | 'token' | 'email' | 'cracked' | 'loginName' | 'loginState' | 'offlineState' | 'hypercard' | 'movie' | 'training' | 'caches' | 'overlay' | 'soundPlayer'>
  & { flight?: Maybe<(
    { __typename?: 'Flight' }
    & Pick<Flight, 'id' | 'name' | 'date'>
  )>, simulator?: Maybe<(
    { __typename?: 'Simulator' }
    & Pick<Simulator, 'id' | 'name'>
  )>, station?: Maybe<(
    { __typename?: 'Station' }
    & Pick<Station, 'name'>
  )>, currentCard?: Maybe<(
    { __typename?: 'Card' }
    & Pick<Card, 'name' | 'component'>
  )> }
);

export type ClientQueryVariables = {
  clientId: Scalars['ID'];
};


export type ClientQuery = (
  { __typename?: 'Query' }
  & { clients?: Maybe<Array<Maybe<(
    { __typename?: 'Client' }
    & ClientDataFragment
  )>>> }
);

export type ClientUpdateSubscriptionVariables = {
  clientId: Scalars['ID'];
};


export type ClientUpdateSubscription = (
  { __typename?: 'Subscription' }
  & { clientChanged?: Maybe<Array<Maybe<(
    { __typename?: 'Client' }
    & ClientDataFragment
  )>>> }
);

export type ClientPingMutationVariables = {
  clientId: Scalars['ID'];
};


export type ClientPingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clientPing'>
);

export type LightingControlSubscriptionVariables = {
  simulatorId: Scalars['ID'];
};


export type LightingControlSubscription = (
  { __typename?: 'Subscription' }
  & { simulatorsUpdate?: Maybe<Array<Maybe<(
    { __typename?: 'Simulator' }
    & Pick<Simulator, 'id' | 'alertlevel'>
    & { lighting?: Maybe<(
      { __typename?: 'Lighting' }
      & Pick<Lighting, 'intensity' | 'action' | 'actionStrength' | 'transitionDuration'>
      & { dmxConfig?: Maybe<(
        { __typename?: 'DMXConfig' }
        & Pick<DmxConfig, 'id' | 'config' | 'actionStrength'>
      )> }
    )> }
  )>>> }
);

export type RegisterClientMutationVariables = {
  client: Scalars['ID'];
};


export type RegisterClientMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clientConnect'>
);

export type RemoveClientMutationVariables = {
  client: Scalars['ID'];
};


export type RemoveClientMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clientDisconnect'>
);

export type SimulatorDataFragment = (
  { __typename?: 'Simulator' }
  & Pick<Simulator, 'id' | 'name' | 'caps' | 'alertlevel' | 'layout' | 'bridgeOfficerMessaging' | 'training' | 'hasPrinter' | 'hasLegs' | 'panels' | 'flipped' | 'soundEffects'>
  & { assets?: Maybe<(
    { __typename?: 'SimulatorAssets' }
    & Pick<SimulatorAssets, 'mesh' | 'texture' | 'side' | 'top' | 'logo' | 'bridge'>
  )>, stations?: Maybe<Array<(
    { __typename?: 'Station' }
    & Pick<Station, 'name' | 'login' | 'training' | 'ambiance' | 'executive' | 'layout' | 'messageGroups' | 'widgets'>
    & { cards: Array<(
      { __typename?: 'Card' }
      & Pick<Card, 'name' | 'component' | 'hidden' | 'assigned' | 'newStation'>
    )> }
  )>> }
);

export type SimulatorQueryVariables = {
  simulatorId: Scalars['ID'];
};


export type SimulatorQuery = (
  { __typename?: 'Query' }
  & { simulators: Array<(
    { __typename?: 'Simulator' }
    & SimulatorDataFragment
  )> }
);

export type SimulatorUpdateSubscriptionVariables = {
  simulatorId: Scalars['ID'];
};


export type SimulatorUpdateSubscription = (
  { __typename?: 'Subscription' }
  & { simulatorsUpdate?: Maybe<Array<Maybe<(
    { __typename?: 'Simulator' }
    & SimulatorDataFragment
  )>>> }
);

export type MacroDmxConfigsQueryVariables = {};


export type MacroDmxConfigsQuery = (
  { __typename?: 'Query' }
  & { dmxConfigs: Array<(
    { __typename?: 'DMXConfig' }
    & Pick<DmxConfig, 'id' | 'name'>
  )> }
);

export type DockingShuttleConfigQueryVariables = {
  simulatorId: Scalars['ID'];
};


export type DockingShuttleConfigQuery = (
  { __typename?: 'Query' }
  & { docking?: Maybe<Array<Maybe<(
    { __typename?: 'DockingPort' }
    & Pick<DockingPort, 'id' | 'name' | 'type' | 'image' | 'shipName' | 'clamps' | 'compress' | 'doors' | 'docked' | 'direction'>
  )>>>, assetFolders?: Maybe<Array<Maybe<(
    { __typename?: 'AssetFolder' }
    & Pick<AssetFolder, 'id' | 'name'>
    & { objects: Array<(
      { __typename?: 'AssetObject' }
      & Pick<AssetObject, 'id' | 'name' | 'fullPath'>
    )> }
  )>>> }
);

export type MissionMacrosQueryVariables = {};


export type MissionMacrosQuery = (
  { __typename?: 'Query' }
  & { missions: Array<(
    { __typename?: 'Mission' }
    & Pick<Mission, 'id' | 'name' | 'category'>
    & { timeline: Array<(
      { __typename?: 'TimelineStep' }
      & Pick<TimelineStep, 'id' | 'name'>
    )> }
  )> }
);

export type RemoteAssetLoadMutationVariables = {
  folderPath: Scalars['String'];
  files: Array<RemoteAsset>;
};


export type RemoteAssetLoadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'downloadRemoteAssets'>
);

export type CountermeasureModuleFragment = (
  { __typename?: 'CountermeasureModule' }
  & Pick<CountermeasureModule, 'id' | 'name' | 'config' | 'buildProgress' | 'activated' | 'powerRequirement'>
  & { resourceRequirements: (
    { __typename?: 'CountermeasureResources' }
    & Pick<CountermeasureResources, 'copper' | 'titanium' | 'carbon' | 'plastic' | 'plasma'>
  ), configurationOptions: Array<(
    { __typename?: 'CountermeasureConfigOptions' }
    & Pick<CountermeasureConfigOptions, 'type' | 'label'>
  )> }
);

export type CountermeasureFragment = (
  { __typename?: 'Countermeasure' }
  & Pick<Countermeasure, 'id' | 'name' | 'locked' | 'active' | 'building' | 'totalPowerUsed' | 'readyToLaunch' | 'powerUsage' | 'availablePower' | 'buildPercentage' | 'note'>
  & { modules: Array<(
    { __typename?: 'CountermeasureModule' }
    & CountermeasureModuleFragment
  )> }
);

export type CountermeasuresSubscriptionVariables = {
  simulatorId: Scalars['ID'];
};


export type CountermeasuresSubscription = (
  { __typename?: 'Subscription' }
  & { countermeasuresUpdate?: Maybe<(
    { __typename?: 'Countermeasures' }
    & Pick<Countermeasures, 'id' | 'name' | 'displayName'>
    & { damage: (
      { __typename?: 'Damage' }
      & Pick<Damage, 'damaged'>
    ), power: (
      { __typename?: 'Power' }
      & Pick<Power, 'power' | 'powerLevels'>
    ), materials: (
      { __typename?: 'CountermeasureResources' }
      & Pick<CountermeasureResources, 'copper' | 'titanium' | 'carbon' | 'plastic' | 'plasma'>
    ), launched: Array<(
      { __typename?: 'Countermeasure' }
      & CountermeasureFragment
    )>, slots: (
      { __typename?: 'CountermeasureSlot' }
      & { slot1?: Maybe<(
        { __typename?: 'Countermeasure' }
        & CountermeasureFragment
      )>, slot2?: Maybe<(
        { __typename?: 'Countermeasure' }
        & CountermeasureFragment
      )>, slot3?: Maybe<(
        { __typename?: 'Countermeasure' }
        & CountermeasureFragment
      )>, slot4?: Maybe<(
        { __typename?: 'Countermeasure' }
        & CountermeasureFragment
      )>, slot5?: Maybe<(
        { __typename?: 'Countermeasure' }
        & CountermeasureFragment
      )>, slot6?: Maybe<(
        { __typename?: 'Countermeasure' }
        & CountermeasureFragment
      )>, slot7?: Maybe<(
        { __typename?: 'Countermeasure' }
        & CountermeasureFragment
      )>, slot8?: Maybe<(
        { __typename?: 'Countermeasure' }
        & CountermeasureFragment
      )> }
    ) }
  )> }
);

export type CountermeasuresCoreSubscriptionVariables = {
  simulatorId: Scalars['ID'];
};


export type CountermeasuresCoreSubscription = (
  { __typename?: 'Subscription' }
  & { countermeasuresUpdate?: Maybe<(
    { __typename?: 'Countermeasures' }
    & Pick<Countermeasures, 'id' | 'name' | 'displayName'>
    & { materials: (
      { __typename?: 'CountermeasureResources' }
      & Pick<CountermeasureResources, 'copper' | 'titanium' | 'carbon' | 'plastic' | 'plasma'>
    ), launched: Array<(
      { __typename?: 'Countermeasure' }
      & Pick<Countermeasure, 'id' | 'name' | 'powerUsage' | 'availablePower'>
      & { modules: Array<(
        { __typename?: 'CountermeasureModule' }
        & Pick<CountermeasureModule, 'id' | 'name' | 'config' | 'activated'>
        & { configurationOptions: Array<(
          { __typename?: 'CountermeasureConfigOptions' }
          & Pick<CountermeasureConfigOptions, 'type' | 'label'>
        )> }
      )> }
    )> }
  )> }
);

export type CountermeasureModulesQueryVariables = {};


export type CountermeasureModulesQuery = (
  { __typename?: 'Query' }
  & { countermeasureModuleType: Array<(
    { __typename?: 'CountermeasureModule' }
    & Pick<CountermeasureModule, 'id' | 'name' | 'description' | 'powerRequirement'>
    & { resourceRequirements: (
      { __typename?: 'CountermeasureResources' }
      & Pick<CountermeasureResources, 'copper' | 'titanium' | 'carbon' | 'plastic' | 'plasma'>
    ), configurationOptions: Array<(
      { __typename?: 'CountermeasureConfigOptions' }
      & Pick<CountermeasureConfigOptions, 'type' | 'label'>
    )> }
  )> }
);

export type CountermeasureRemoveModuleMutationVariables = {
  id: Scalars['ID'];
  slot: CountermeasureSlotEnum;
  moduleId: Scalars['ID'];
};


export type CountermeasureRemoveModuleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'countermeasuresRemoveModule'>
);

export type CountermeasureSetResourceMutationVariables = {
  id: Scalars['ID'];
  resource: Scalars['String'];
  value: Scalars['Float'];
};


export type CountermeasureSetResourceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'countermeasuresSetResource'>
);

export type CountermeasuresActivateCountermeasureMutationVariables = {
  id: Scalars['ID'];
  slot: CountermeasureSlotEnum;
};


export type CountermeasuresActivateCountermeasureMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'countermeasuresActivateCountermeasure'>
);

export type CountermeasuresAddModuleMutationVariables = {
  id: Scalars['ID'];
  slot: CountermeasureSlotEnum;
  moduleType: Scalars['String'];
};


export type CountermeasuresAddModuleMutation = (
  { __typename?: 'Mutation' }
  & { countermeasuresAddModule?: Maybe<(
    { __typename?: 'Countermeasure' }
    & Pick<Countermeasure, 'id'>
    & { modules: Array<(
      { __typename?: 'CountermeasureModule' }
      & Pick<CountermeasureModule, 'id' | 'name' | 'description' | 'powerRequirement' | 'config' | 'buildProgress' | 'activated'>
      & { resourceRequirements: (
        { __typename?: 'CountermeasureResources' }
        & Pick<CountermeasureResources, 'copper' | 'titanium' | 'plasma' | 'carbon'>
      ), configurationOptions: Array<(
        { __typename?: 'CountermeasureConfigOptions' }
        & Pick<CountermeasureConfigOptions, 'type' | 'label'>
      )> }
    )> }
  )> }
);

export type CountermeasuresBuildCountermeasureMutationVariables = {
  id: Scalars['ID'];
  slot: CountermeasureSlotEnum;
};


export type CountermeasuresBuildCountermeasureMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'countermeasuresBuildCountermeasure'>
);

export type CountermeasuresConfigureModuleMutationVariables = {
  id: Scalars['ID'];
  slot: CountermeasureSlotEnum;
  moduleId: Scalars['ID'];
  config: Scalars['JSON'];
};


export type CountermeasuresConfigureModuleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'countermeasuresConfigureModule'>
);

export type CountermeasureCreateCountermeasureMutationVariables = {
  id: Scalars['ID'];
  slot: CountermeasureSlotEnum;
  name: Scalars['String'];
};


export type CountermeasureCreateCountermeasureMutation = (
  { __typename?: 'Mutation' }
  & { countermeasuresCreateCountermeasure?: Maybe<(
    { __typename?: 'Countermeasure' }
    & Pick<Countermeasure, 'id'>
  )> }
);

export type CountermeasuresDeactivateCountermeasureMutationVariables = {
  id: Scalars['ID'];
  slot: CountermeasureSlotEnum;
};


export type CountermeasuresDeactivateCountermeasureMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'countermeasuresDeactivateCountermeasure'>
);

export type CountermeasuresLaunchCountermeasureMutationVariables = {
  id: Scalars['ID'];
  slot: CountermeasureSlotEnum;
};


export type CountermeasuresLaunchCountermeasureMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'countermeasuresLaunchCountermeasure'>
);

export type CountermeasuresLaunchUnlockedCountermeasuresMutationVariables = {
  id: Scalars['ID'];
};


export type CountermeasuresLaunchUnlockedCountermeasuresMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'countermeasuresLaunchUnlockedCountermeasures'>
);

export type CountermeasureRemoveCountermeasureMutationVariables = {
  id: Scalars['ID'];
  slot: CountermeasureSlotEnum;
};


export type CountermeasureRemoveCountermeasureMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'countermeasuresRemoveCountermeasure'>
);

export type CountermeasuresRemoveModuleMutationVariables = {
  id: Scalars['ID'];
  slot: CountermeasureSlotEnum;
  moduleId: Scalars['ID'];
};


export type CountermeasuresRemoveModuleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'countermeasuresRemoveModule'>
);

export type CountermeasuresSetFdNoteMutationVariables = {
  id: Scalars['ID'];
  countermeasureId: Scalars['ID'];
  note: Scalars['String'];
};


export type CountermeasuresSetFdNoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'countermeasuresSetFDNote'>
);

export type SystemsCoreEnginesQueryVariables = {
  simulatorId: Scalars['ID'];
};


export type SystemsCoreEnginesQuery = (
  { __typename?: 'Query' }
  & { engines?: Maybe<Array<Maybe<(
    { __typename?: 'Engine' }
    & Pick<Engine, 'id'>
    & { speeds?: Maybe<Array<Maybe<(
      { __typename?: 'Speed' }
      & Pick<Speed, 'number'>
    )>>> }
  )>>> }
);

export type SystemChangePowerMutationVariables = {
  systemId: Scalars['ID'];
  power: Scalars['Int'];
};


export type SystemChangePowerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changePower'>
);

export type SystemUpgradeMutationVariables = {
  systemId: Scalars['ID'];
};


export type SystemUpgradeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'upgradeSystem'>
);

export type LightingSetEffectMutationVariables = {
  simulatorId: Scalars['ID'];
  effect: Lighting_Action;
  duration: Scalars['Float'];
};


export type LightingSetEffectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'lightingSetEffect'>
);

export type LightingSetIntensityMutationVariables = {
  simulatorId: Scalars['ID'];
  intensity: Scalars['Float'];
};


export type LightingSetIntensityMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'lightingSetIntensity'>
);

export type ShakeLightsMutationVariables = {
  simulatorId: Scalars['ID'];
  duration: Scalars['Float'];
};


export type ShakeLightsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'lightingShakeLights'>
);

export type UpdateLightingMutationVariables = {
  id: Scalars['ID'];
  lighting: LightingInput;
};


export type UpdateLightingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateSimulatorLighting'>
);

export type ReactorAckWingPowerMutationVariables = {
  id: Scalars['ID'];
  wing: Scalars['String'];
  ack: Scalars['Boolean'];
};


export type ReactorAckWingPowerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reactorAckWingRequest'>
);

export type BatteryChargeLevelMutationVariables = {
  id: Scalars['ID'];
  e: Scalars['Float'];
};


export type BatteryChargeLevelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reactorBatteryChargeLevel'>
);

export type BatteryChargeRateMutationVariables = {
  id: Scalars['ID'];
  e: Scalars['Float'];
};


export type BatteryChargeRateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reactorBatteryChargeRate'>
);

export type SetDilithiumRateMutationVariables = {
  id: Scalars['ID'];
  rate: Scalars['Float'];
};


export type SetDilithiumRateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setDilithiumStressRate'>
);

export type ReactorDockingSubscriptionVariables = {
  simulatorId?: Maybe<Scalars['ID']>;
};


export type ReactorDockingSubscription = (
  { __typename?: 'Subscription' }
  & { simulatorsUpdate?: Maybe<Array<Maybe<(
    { __typename?: 'Simulator' }
    & Pick<Simulator, 'id'>
    & { ship?: Maybe<(
      { __typename?: 'Ship' }
      & Pick<Ship, 'clamps' | 'ramps' | 'airlock' | 'legs'>
    )> }
  )>>> }
);

export type FluxDilithiumMutationVariables = {
  id: Scalars['ID'];
};


export type FluxDilithiumMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'fluxDilithiumStress'>
);

export type ReactorPowerSubscriptionVariables = {
  simulatorId?: Maybe<Scalars['ID']>;
};


export type ReactorPowerSubscription = (
  { __typename?: 'Subscription' }
  & { systemsUpdate: Array<(
    { __typename?: 'System' }
    & Pick<System, 'id' | 'name'>
    & { power?: Maybe<(
      { __typename?: 'Power' }
      & Pick<Power, 'power'>
    )> }
  )> }
);

export type ReactorCoolMutationVariables = {
  id: Scalars['ID'];
  state?: Maybe<Scalars['Boolean']>;
};


export type ReactorCoolMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'engineCool'>
);

export type ReactorHeatMutationVariables = {
  id: Scalars['ID'];
  heat?: Maybe<Scalars['Float']>;
};


export type ReactorHeatMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addHeat'>
);

export type ReactorSetHeatRateMutationVariables = {
  id: Scalars['ID'];
  rate: Scalars['Float'];
};


export type ReactorSetHeatRateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setHeatRate'>
);

export type ReactorPowerLevelMutationVariables = {
  id: Scalars['ID'];
  e: Scalars['Int'];
};


export type ReactorPowerLevelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reactorChangeOutput'>
);

export type ReactorsSubscriptionVariables = {
  simulatorId: Scalars['ID'];
};


export type ReactorsSubscription = (
  { __typename?: 'Subscription' }
  & { reactorUpdate: Array<(
    { __typename?: 'Reactor' }
    & Pick<Reactor, 'id' | 'type' | 'name' | 'heat' | 'heatRate' | 'model' | 'coolant' | 'ejected' | 'externalPower' | 'efficiency' | 'displayName' | 'powerOutput' | 'batteryChargeRate' | 'batteryChargeLevel' | 'depletion' | 'alphaLevel' | 'betaLevel' | 'alphaTarget' | 'betaTarget' | 'dilithiumRate' | 'hasWings' | 'leftWingPower' | 'leftWingRequest' | 'leftWingRequested' | 'rightWingPower' | 'rightWingRequest' | 'rightWingRequested'>
    & { damage?: Maybe<(
      { __typename?: 'Damage' }
      & Pick<Damage, 'damaged'>
    )>, efficiencies?: Maybe<Array<(
      { __typename?: 'ReactorEfficiency' }
      & Pick<ReactorEfficiency, 'label' | 'color' | 'efficiency'>
    )>> }
  )> }
);

export type ReactorRequestWingPowerMutationVariables = {
  id: Scalars['ID'];
  wing: Scalars['String'];
  power: Scalars['Int'];
};


export type ReactorRequestWingPowerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reactorRequestWingPower'>
);

export type ReactorSetEfficiencyMutationVariables = {
  id: Scalars['ID'];
  e?: Maybe<Scalars['Float']>;
};


export type ReactorSetEfficiencyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reactorChangeEfficiency'>
);

export type ReactorSetWingPowerMutationVariables = {
  id: Scalars['ID'];
  wing: Scalars['String'];
  power: Scalars['Int'];
};


export type ReactorSetWingPowerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reactorSetWingPower'>
);

export type SensorsPingSubSubscriptionVariables = {
  sensorsId: Scalars['ID'];
};


export type SensorsPingSubSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'sensorsPing'>
);

export type SensorsProbeDataMutationVariables = {
  id: Scalars['ID'];
  data: Scalars['String'];
  flash?: Maybe<Scalars['Boolean']>;
};


export type SensorsProbeDataMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'probeProcessedData'>
);

export type SensorsProcessedDataMutationVariables = {
  id?: Maybe<Scalars['ID']>;
  data: Scalars['String'];
  flash?: Maybe<Scalars['Boolean']>;
};


export type SensorsProcessedDataMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'processedData'>
);

export type SensorsRemoveProcessedDataMutationVariables = {
  id: Scalars['ID'];
  time: Scalars['String'];
};


export type SensorsRemoveProcessedDataMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeProcessedData'>
);

export type SensorsSendPingMutationVariables = {
  id: Scalars['ID'];
};


export type SensorsSendPingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'pingSensors'>
);

export type SensorScanResponseMutationVariables = {
  id: Scalars['ID'];
  scan: SensorScanInput;
};


export type SensorScanResponseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateSensorScan'>
);

export type SensorScanResultMutationVariables = {
  id: Scalars['ID'];
  result: Scalars['String'];
};


export type SensorScanResultMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sensorScanResult'>
);

export type SensorsProbesQueryVariables = {
  simulatorId: Scalars['ID'];
};


export type SensorsProbesQuery = (
  { __typename?: 'Query' }
  & { probes: Array<(
    { __typename?: 'Probes' }
    & Pick<Probes, 'id'>
  )> }
);

export type SensorsSubscriptionVariables = {
  simulatorId: Scalars['ID'];
  domain?: Maybe<Scalars['String']>;
};


export type SensorsSubscription = (
  { __typename?: 'Subscription' }
  & { sensorsUpdate: Array<(
    { __typename?: 'Sensors' }
    & Pick<Sensors, 'id' | 'scanResults' | 'scanRequest' | 'scanning' | 'pings' | 'pingMode' | 'timeSincePing' | 'domain' | 'interference' | 'history'>
    & { processedData?: Maybe<Array<(
      { __typename?: 'ProcessedData' }
      & Pick<ProcessedData, 'value' | 'time'>
    )>>, movement?: Maybe<(
      { __typename?: 'Coordinates' }
      & Pick<Coordinates, 'x' | 'y' | 'z'>
    )>, segments?: Maybe<Array<Maybe<(
      { __typename?: 'SensorsSegment' }
      & Pick<SensorsSegment, 'ring' | 'line' | 'state'>
    )>>>, presetAnswers?: Maybe<Array<Maybe<(
      { __typename?: 'PresetAnswer' }
      & Pick<PresetAnswer, 'label' | 'value'>
    )>>>, scans?: Maybe<Array<Maybe<(
      { __typename?: 'SensorScan' }
      & Pick<SensorScan, 'id' | 'request' | 'mode' | 'location' | 'response' | 'scanning' | 'timestamp' | 'cancelled'>
    )>>>, damage?: Maybe<(
      { __typename?: 'Damage' }
      & Pick<Damage, 'damaged'>
    )>, power?: Maybe<(
      { __typename?: 'Power' }
      & Pick<Power, 'power' | 'powerLevels'>
    )> }
  )> }
);

export type SetCalculatedTargetMutationVariables = {
  simulatorId?: Maybe<Scalars['ID']>;
  coordinates: CoordinatesInput;
  contactId?: Maybe<Scalars['ID']>;
};


export type SetCalculatedTargetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTargetingCalculatedTarget'>
);

export type SensorsSetHistoryMutationVariables = {
  id: Scalars['ID'];
  history: Scalars['Boolean'];
};


export type SensorsSetHistoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setSensorsHistory'>
);

export type SensorsSetPingModeMutationVariables = {
  id: Scalars['ID'];
  mode?: Maybe<Ping_Modes>;
};


export type SensorsSetPingModeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setSensorPingMode'>
);

export type TargetingRangeQueryVariables = {
  id: Scalars['ID'];
};


export type TargetingRangeQuery = (
  { __typename?: 'Query' }
  & { targeting?: Maybe<Array<Maybe<(
    { __typename?: 'Targeting' }
    & Pick<Targeting, 'id' | 'range'>
  )>>> }
);

export type NewLayerMutationVariables = {
  mapId: Scalars['ID'];
  name: Scalars['String'];
};


export type NewLayerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addTacticalMapLayer'>
);

export type AddTacticalItemMutationVariables = {
  mapId: Scalars['ID'];
  layerId: Scalars['ID'];
  item: TacticalItemInput;
};


export type AddTacticalItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addTacticalMapItem'>
);

export type AssetFoldersSubscriptionVariables = {};


export type AssetFoldersSubscription = (
  { __typename?: 'Subscription' }
  & { assetFolderChange: Array<(
    { __typename?: 'AssetFolder' }
    & Pick<AssetFolder, 'name' | 'fullPath' | 'id' | 'folderPath'>
    & { objects: Array<(
      { __typename?: 'AssetObject' }
      & Pick<AssetObject, 'id' | 'name' | 'fullPath' | 'url'>
    )> }
  )> }
);

export type AssetsAddFolderMutationVariables = {
  name: Scalars['String'];
  fullPath: Scalars['String'];
  folderPath: Scalars['String'];
};


export type AssetsAddFolderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addAssetFolder'>
);

export type DuplicateTacticalMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type DuplicateTacticalMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'duplicateTacticalMap'>
);

export type FreezeTacticalMapMutationVariables = {
  id: Scalars['ID'];
  freeze: Scalars['Boolean'];
};


export type FreezeTacticalMapMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'freezeTacticalMap'>
);

export type NewTacticalMutationVariables = {
  name: Scalars['String'];
};


export type NewTacticalMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'newTacticalMap'>
);

export type AssetsRemoveObjectMutationVariables = {
  fullPath: Scalars['String'];
};


export type AssetsRemoveObjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeAssetObject'>
);

export type AssetsRemoveFolderMutationVariables = {
  fullPath: Scalars['String'];
};


export type AssetsRemoveFolderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeAssetFolder'>
);

export type RemoveLayerMutationVariables = {
  mapId: Scalars['ID'];
  layerId: Scalars['ID'];
};


export type RemoveLayerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeTacticalMapLayer'>
);

export type RemoveMapMutationVariables = {
  id: Scalars['ID'];
};


export type RemoveMapMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeTacticalMap'>
);

export type RemoveTacticalItemMutationVariables = {
  mapId: Scalars['ID'];
  layerId: Scalars['ID'];
  itemId: Scalars['ID'];
};


export type RemoveTacticalItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeTacticalMapItem'>
);

export type RemoveTacticalPathMutationVariables = {
  mapId: Scalars['ID'];
  layerId: Scalars['ID'];
  pathId: Scalars['ID'];
};


export type RemoveTacticalPathMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeTacticalMapPath'>
);

export type ReorderTacticalLayerMutationVariables = {
  mapId: Scalars['ID'];
  layer: Scalars['ID'];
  order: Scalars['Int'];
};


export type ReorderTacticalLayerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reorderTacticalMapLayer'>
);

export type TacticalMapUpdateSubscriptionVariables = {
  id: Scalars['ID'];
};


export type TacticalMapUpdateSubscription = (
  { __typename?: 'Subscription' }
  & { tacticalMapUpdate?: Maybe<(
    { __typename?: 'TacticalMap' }
    & Pick<TacticalMap, 'id' | 'name' | 'interval' | 'frozen' | 'template'>
    & { flight?: Maybe<(
      { __typename?: 'Flight' }
      & Pick<Flight, 'id'>
    )>, layers?: Maybe<Array<Maybe<(
      { __typename?: 'TacticalLayer' }
      & Pick<TacticalLayer, 'id' | 'name' | 'type' | 'image' | 'color' | 'labels' | 'gridCols' | 'gridRows' | 'advance' | 'asset' | 'autoplay' | 'loop' | 'playbackSpeed' | 'opacity'>
      & { items?: Maybe<Array<Maybe<(
        { __typename?: 'TacticalItem' }
        & Pick<TacticalItem, 'id' | 'layerId' | 'font' | 'label' | 'fontSize' | 'fontColor' | 'icon' | 'size' | 'speed' | 'rotation' | 'opacity' | 'flash' | 'ijkl' | 'wasd' | 'thrusters' | 'rotationMatch'>
        & { velocity?: Maybe<(
          { __typename?: 'Coordinates' }
          & Pick<Coordinates, 'x' | 'y'>
        )>, location?: Maybe<(
          { __typename?: 'Coordinates' }
          & Pick<Coordinates, 'x' | 'y'>
        )>, destination?: Maybe<(
          { __typename?: 'Coordinates' }
          & Pick<Coordinates, 'x' | 'y'>
        )>, thrusterControls?: Maybe<(
          { __typename?: 'ThrusterControls' }
          & Pick<ThrusterControls, 'rotation' | 'reversed' | 'matchRotation' | 'up' | 'down' | 'left' | 'right'>
        )> }
      )>>>, paths?: Maybe<Array<Maybe<(
        { __typename?: 'TacticalPath' }
        & Pick<TacticalPath, 'id' | 'layerId' | 'color' | 'width' | 'arrow'>
        & { start?: Maybe<(
          { __typename?: 'Coordinates' }
          & Pick<Coordinates, 'x' | 'y'>
        )>, end?: Maybe<(
          { __typename?: 'Coordinates' }
          & Pick<Coordinates, 'x' | 'y'>
        )>, c1?: Maybe<(
          { __typename?: 'Coordinates' }
          & Pick<Coordinates, 'x' | 'y'>
        )>, c2?: Maybe<(
          { __typename?: 'Coordinates' }
          & Pick<Coordinates, 'x' | 'y'>
        )> }
      )>>> }
    )>>> }
  )> }
);

export type TacticalMapListSubscriptionVariables = {};


export type TacticalMapListSubscription = (
  { __typename?: 'Subscription' }
  & { tacticalMapsUpdate?: Maybe<Array<Maybe<(
    { __typename?: 'TacticalMap' }
    & Pick<TacticalMap, 'id' | 'name' | 'template'>
    & { flight?: Maybe<(
      { __typename?: 'Flight' }
      & Pick<Flight, 'id'>
    )> }
  )>>> }
);

export type UpdateLayerMutationVariables = {
  mapId: Scalars['ID'];
  layer: TacticalLayerInput;
};


export type UpdateLayerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTacticalMapLayer'>
);

export type UpdateTacticalItemMutationVariables = {
  mapId: Scalars['ID'];
  layerId: Scalars['ID'];
  item: TacticalItemInput;
};


export type UpdateTacticalItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTacticalMapItem'>
);

export type UpdateTacticalPathMutationVariables = {
  mapId: Scalars['ID'];
  layerId: Scalars['ID'];
  path: TacticalPathInput;
};


export type UpdateTacticalPathMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTacticalMapPath'>
);

export type TemplateFragmentFragment = (
  { __typename: 'Template' }
  & Pick<Template, 'id'>
);

export type TemplateQueryVariables = {
  simulatorId: Scalars['ID'];
};


export type TemplateQuery = (
  { __typename?: 'Query' }
  & { _template?: Maybe<(
    { __typename?: 'Template' }
    & TemplateFragmentFragment
  )> }
);

export type TemplateUpdateSubscriptionVariables = {
  simulatorId: Scalars['ID'];
};


export type TemplateUpdateSubscription = (
  { __typename?: 'Subscription' }
  & { _templateUpdate?: Maybe<(
    { __typename: 'Template' }
    & TemplateFragmentFragment
  )> }
);

export type AddMissionMutationVariables = {
  name: Scalars['String'];
};


export type AddMissionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createMission'>
);

export type ExecuteMacrosMutationVariables = {
  simulatorId: Scalars['ID'];
  macros: Array<Maybe<MacroInput>>;
};


export type ExecuteMacrosMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'triggerMacros'>
);

export type SetSimulatorMissionMutationVariables = {
  simulatorId: Scalars['ID'];
  missionId: Scalars['ID'];
  stepId?: Maybe<Scalars['ID']>;
};


export type SetSimulatorMissionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setSimulatorMission'>
);

export type SetSimulatorTimelineStepMutationVariables = {
  simulatorId: Scalars['ID'];
  auxTimelineId?: Maybe<Scalars['ID']>;
  step: Scalars['Int'];
};


export type SetSimulatorTimelineStepMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setSimulatorTimelineStep'>
);

export type TimelineSimulatorSubscriptionVariables = {
  simulatorId: Scalars['ID'];
};


export type TimelineSimulatorSubscription = (
  { __typename?: 'Subscription' }
  & { simulatorsUpdate?: Maybe<Array<Maybe<(
    { __typename?: 'Simulator' }
    & Pick<Simulator, 'id' | 'currentTimelineStep' | 'executedTimelineSteps' | 'missionConfigs'>
    & { stationSet?: Maybe<(
      { __typename?: 'StationSet' }
      & Pick<StationSet, 'id'>
    )>, mission?: Maybe<(
      { __typename?: 'Mission' }
      & Pick<Mission, 'id'>
    )> }
  )>>> }
);

export type TimelineMissionSubscriptionVariables = {};


export type TimelineMissionSubscription = (
  { __typename?: 'Subscription' }
  & { missionsUpdate: Array<(
    { __typename?: 'Mission' }
    & Pick<Mission, 'id' | 'name' | 'description' | 'category'>
    & { timeline: Array<(
      { __typename?: 'TimelineStep' }
      & Pick<TimelineStep, 'id' | 'name' | 'order' | 'description'>
      & { timelineItems: Array<(
        { __typename?: 'TimelineItem' }
        & Pick<TimelineItem, 'id' | 'name' | 'type' | 'args' | 'event' | 'delay'>
      )> }
    )> }
  )> }
);

export type TractorBeamTargetLabelMutationVariables = {
  id: Scalars['ID'];
  beam: Scalars['ID'];
  label: Scalars['String'];
};


export type TractorBeamTargetLabelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTractorBeamTargetLabel'>
);

export type TractorBeamStateMutationVariables = {
  id: Scalars['ID'];
  beam: Scalars['ID'];
  state: Scalars['Boolean'];
};


export type TractorBeamStateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTractorBeamState'>
);

export type TractorBeamStrengthMutationVariables = {
  id: Scalars['ID'];
  beam: Scalars['ID'];
  strength: Scalars['Float'];
};


export type TractorBeamStrengthMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTractorBeamStrength'>
);

export type TractorBeamStressMutationVariables = {
  id: Scalars['ID'];
  beam: Scalars['ID'];
  stress: Scalars['Float'];
};


export type TractorBeamStressMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTractorBeamStress'>
);

export type TractorBeamUpdateSubscriptionVariables = {
  simulatorId: Scalars['ID'];
};


export type TractorBeamUpdateSubscription = (
  { __typename?: 'Subscription' }
  & { tractorBeamUpdate?: Maybe<Array<Maybe<(
    { __typename?: 'TractorBeam' }
    & Pick<TractorBeam, 'id' | 'name' | 'displayName'>
    & { beams: Array<(
      { __typename?: 'TractorBeamBeam' }
      & Pick<TractorBeamBeam, 'id' | 'state' | 'target' | 'targetLabel' | 'strength' | 'stress' | 'scanning'>
    )>, damage: (
      { __typename?: 'Damage' }
      & Pick<Damage, 'damaged' | 'report'>
    ), power: (
      { __typename?: 'Power' }
      & Pick<Power, 'power' | 'powerLevels'>
    ) }
  )>>> }
);

export type TractorBeamTargetMutationVariables = {
  id: Scalars['ID'];
  beam: Scalars['ID'];
  state: Scalars['Boolean'];
};


export type TractorBeamTargetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTractorBeamTarget'>
);

export type ClientChangedSubscriptionVariables = {};


export type ClientChangedSubscription = (
  { __typename?: 'Subscription' }
  & { clientChanged?: Maybe<Array<Maybe<(
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'label' | 'mobile' | 'cards' | 'loginName' | 'loginState' | 'training' | 'soundPlayer'>
    & { flight?: Maybe<(
      { __typename?: 'Flight' }
      & Pick<Flight, 'id' | 'name' | 'date'>
      & { simulators?: Maybe<Array<Maybe<(
        { __typename?: 'Simulator' }
        & Pick<Simulator, 'id' | 'name'>
      )>>> }
    )>, simulator?: Maybe<(
      { __typename?: 'Simulator' }
      & Pick<Simulator, 'id' | 'name' | 'alertlevel' | 'layout' | 'interfaces'>
      & { stations?: Maybe<Array<(
        { __typename?: 'Station' }
        & Pick<Station, 'name'>
      )>> }
    )>, station?: Maybe<(
      { __typename?: 'Station' }
      & Pick<Station, 'name'>
    )> }
  )>>> }
);

export type DisconnectClientMutationVariables = {
  client: Scalars['ID'];
};


export type DisconnectClientMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clientDisconnect'>
);

export type FlightsSubSubscriptionVariables = {};


export type FlightsSubSubscription = (
  { __typename?: 'Subscription' }
  & { flightsUpdate?: Maybe<Array<Maybe<(
    { __typename?: 'Flight' }
    & Pick<Flight, 'id' | 'name' | 'date' | 'running'>
    & { simulators?: Maybe<Array<Maybe<(
      { __typename?: 'Simulator' }
      & Pick<Simulator, 'id' | 'name'>
      & { stations?: Maybe<Array<(
        { __typename?: 'Station' }
        & Pick<Station, 'name'>
      )>> }
    )>>> }
  )>>> }
);

export type ClientsInterfacesAndKeyboardsQueryVariables = {};


export type ClientsInterfacesAndKeyboardsQuery = (
  { __typename?: 'Query' }
  & { interfaces?: Maybe<Array<Maybe<(
    { __typename?: 'Interface' }
    & Pick<Interface, 'id' | 'name'>
  )>>>, keyboard?: Maybe<Array<Maybe<(
    { __typename?: 'Keyboard' }
    & Pick<Keyboard, 'id' | 'name'>
  )>>>, dmxSets: Array<(
    { __typename?: 'DMXSet' }
    & Pick<DmxSet, 'id' | 'name'>
  )> }
);

export type SetClientFlightMutationVariables = {
  client: Scalars['ID'];
  id: Scalars['ID'];
};


export type SetClientFlightMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clientSetFlight'>
);

export type SetClientSimulatorMutationVariables = {
  client: Scalars['ID'];
  id: Scalars['ID'];
};


export type SetClientSimulatorMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clientSetSimulator'>
);

export type SetClientStationMutationVariables = {
  client: Scalars['ID'];
  id: Scalars['ID'];
};


export type SetClientStationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clientSetStation'>
);

export type SetSoundPlayerMutationVariables = {
  id: Scalars['ID'];
  soundPlayer: Scalars['Boolean'];
};


export type SetSoundPlayerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clientSetSoundPlayer'>
);

export type ApplyClientSetMutationVariables = {
  id: Scalars['ID'];
  flightId: Scalars['ID'];
  simulatorId: Scalars['ID'];
  templateId: Scalars['ID'];
  stationSetId: Scalars['ID'];
};


export type ApplyClientSetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'applyClientSet'>
);

export type DeleteFlightMutationVariables = {
  flightId: Scalars['ID'];
};


export type DeleteFlightMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteFlight'>
);

export type FlightQueryVariables = {};


export type FlightQuery = (
  { __typename?: 'Query' }
  & { flights: Array<(
    { __typename?: 'Flight' }
    & Pick<Flight, 'id' | 'name' | 'flightType' | 'transmitted' | 'running'>
  )> }
);

export type PauseFlightMutationVariables = {
  flightId: Scalars['ID'];
};


export type PauseFlightMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'pauseFlight'>
);

export type ResetFlightMutationVariables = {
  flightId: Scalars['ID'];
};


export type ResetFlightMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetFlight'>
);

export type LobbyResumeFlightMutationVariables = {
  flightId: Scalars['ID'];
};


export type LobbyResumeFlightMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resumeFlight'>
);

export type SetsPickerQueryVariables = {
  flightId?: Maybe<Scalars['ID']>;
};


export type SetsPickerQuery = (
  { __typename?: 'Query' }
  & { flights: Array<(
    { __typename?: 'Flight' }
    & Pick<Flight, 'id' | 'name'>
    & { simulators?: Maybe<Array<Maybe<(
      { __typename?: 'Simulator' }
      & Pick<Simulator, 'id' | 'templateId' | 'name'>
      & { stationSet?: Maybe<(
        { __typename?: 'StationSet' }
        & Pick<StationSet, 'id' | 'name'>
      )> }
    )>>> }
  )>, sets?: Maybe<Array<Maybe<(
    { __typename?: 'Set' }
    & Pick<Set, 'id' | 'name'>
    & { clients: Array<(
      { __typename?: 'SetClient' }
      & Pick<SetClient, 'id' | 'station'>
      & { client?: Maybe<(
        { __typename?: 'Client' }
        & Pick<Client, 'id'>
      )>, simulator?: Maybe<(
        { __typename?: 'Simulator' }
        & Pick<Simulator, 'id' | 'name'>
      )>, stationSet?: Maybe<(
        { __typename?: 'StationSet' }
        & Pick<StationSet, 'id' | 'name'>
      )> }
    )> }
  )>>> }
);

export type TransmitFlightMutationVariables = {
  flightId: Scalars['ID'];
};


export type TransmitFlightMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'assignSpaceEdventuresFlightRecord'>
);

export type DmxConfigCreateMutationVariables = {
  name: Scalars['String'];
};


export type DmxConfigCreateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxConfigCreate'>
);

export type DmxConfigDuplicateMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type DmxConfigDuplicateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxConfigDuplicate'>
);

export type DmxConfigRemoveMutationVariables = {
  id: Scalars['ID'];
};


export type DmxConfigRemoveMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxConfigRemove'>
);

export type DmxConfigSetActionStrengthMutationVariables = {
  id: Scalars['ID'];
  actionStrength: Scalars['Float'];
};


export type DmxConfigSetActionStrengthMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxConfigSetActionStrength'>
);

export type DmxConfigSetConfigMutationVariables = {
  id: Scalars['ID'];
  config: Scalars['JSON'];
};


export type DmxConfigSetConfigMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxConfigSetConfig'>
);

export type DmxConfigSetNameMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type DmxConfigSetNameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxConfigSetName'>
);

export type DmxConfigsSubscriptionVariables = {};


export type DmxConfigsSubscription = (
  { __typename?: 'Subscription' }
  & { dmxConfigs: Array<(
    { __typename?: 'DMXConfig' }
    & Pick<DmxConfig, 'id' | 'name' | 'config' | 'actionStrength'>
  )> }
);

export type DmxDeviceCreateMutationVariables = {
  name: Scalars['String'];
};


export type DmxDeviceCreateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxDeviceCreate'>
);

export type DmxDeviceRemoveMutationVariables = {
  id: Scalars['ID'];
};


export type DmxDeviceRemoveMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxDeviceRemove'>
);

export type DmxDeviceSetChannelsMutationVariables = {
  id: Scalars['ID'];
  channels: Array<DmxChannelProperty>;
};


export type DmxDeviceSetChannelsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxDeviceSetChannels'>
);

export type DmxDeviceSetNameMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type DmxDeviceSetNameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxDeviceSetName'>
);

export type DmxDevicesSubscriptionVariables = {};


export type DmxDevicesSubscription = (
  { __typename?: 'Subscription' }
  & { dmxDevices: Array<(
    { __typename?: 'DMXDevice' }
    & Pick<DmxDevice, 'id' | 'name' | 'channels'>
  )> }
);

export type DmxFixtureCreateMutationVariables = {
  name: Scalars['String'];
  dmxSetId: Scalars['ID'];
  dmxDeviceId: Scalars['ID'];
};


export type DmxFixtureCreateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxFixtureCreate'>
);

export type DmxFixtureRemoveMutationVariables = {
  id: Scalars['ID'];
  dmxSetId: Scalars['ID'];
};


export type DmxFixtureRemoveMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxFixtureRemove'>
);

export type DmxFixtureSetChannelMutationVariables = {
  id: Scalars['ID'];
  channel: Scalars['Int'];
};


export type DmxFixtureSetChannelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxFixtureSetChannel'>
);

export type DmxFixtureSetDmxDeviceMutationVariables = {
  id: Scalars['ID'];
  deviceId: Scalars['ID'];
};


export type DmxFixtureSetDmxDeviceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxFixtureSetDMXDevice'>
);

export type DmxFixtureSetModeMutationVariables = {
  id: Scalars['ID'];
  mode: DmxFixtureMode;
};


export type DmxFixtureSetModeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxFixtureSetMode'>
);

export type DmxFixtureSetNameMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type DmxFixtureSetNameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxFixtureSetName'>
);

export type DmxFixtureSetPassiveChannelsMutationVariables = {
  id: Scalars['ID'];
  passiveChannels: DmxPassiveChannelsInput;
};


export type DmxFixtureSetPassiveChannelsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxFixtureSetPassiveChannels'>
);

export type DmxFixtureSetTagsMutationVariables = {
  id: Scalars['ID'];
  newTags: Array<Scalars['String']>;
};


export type DmxFixtureSetTagsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxFixtureSetTags'>
);

export type DmxFixturesSubscriptionVariables = {
  simulatorId?: Maybe<Scalars['ID']>;
  clientId?: Maybe<Scalars['ID']>;
};


export type DmxFixturesSubscription = (
  { __typename?: 'Subscription' }
  & { dmxFixtures: Array<(
    { __typename?: 'DMXFixture' }
    & Pick<DmxFixture, 'id' | 'name' | 'channel' | 'mode' | 'tags'>
    & { DMXDevice: (
      { __typename?: 'DMXDevice' }
      & Pick<DmxDevice, 'id' | 'name' | 'channels'>
    ), passiveChannels: (
      { __typename?: 'DMXPassiveChannels' }
      & Pick<DmxPassiveChannels, 'amber' | 'white' | 'uv' | 'intensity' | 'strobe' | 'generic' | 'nothing' | 'color'>
    ) }
  )> }
);

export type DmxFixtureTagsQueryVariables = {};


export type DmxFixtureTagsQuery = (
  { __typename?: 'Query' }
  & { dmxFixtures: Array<(
    { __typename?: 'DMXFixture' }
    & Pick<DmxFixture, 'id' | 'tags'>
  )> }
);

export type DmxSetCreateMutationVariables = {
  name: Scalars['String'];
};


export type DmxSetCreateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxSetCreate'>
);

export type DmxSetDuplicateMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type DmxSetDuplicateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxSetDuplicate'>
);

export type DmxSetRemoveMutationVariables = {
  id: Scalars['ID'];
};


export type DmxSetRemoveMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxSetRemove'>
);

export type DmxSetSetNameMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type DmxSetSetNameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dmxSetSetName'>
);

export type DmxSetsSubscriptionVariables = {};


export type DmxSetsSubscription = (
  { __typename?: 'Subscription' }
  & { dmxSets: Array<(
    { __typename?: 'DMXSet' }
    & Pick<DmxSet, 'id' | 'name'>
    & { fixtures: Array<(
      { __typename?: 'DMXFixture' }
      & Pick<DmxFixture, 'id' | 'name' | 'channel' | 'mode' | 'tags'>
      & { DMXDevice: (
        { __typename?: 'DMXDevice' }
        & Pick<DmxDevice, 'id' | 'name' | 'class' | 'channels'>
      ) }
    )> }
  )> }
);

export type EntityCreateTemplateMutationVariables = {
  name: Scalars['String'];
};


export type EntityCreateTemplateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entitySetTemplate' | 'entitySetIdentity' | 'entitySetAppearance'>
  & { entityCreate: (
    { __typename?: 'Entity' }
    & Pick<Entity, 'id'>
  ) }
);

export type FlightSetupQueryVariables = {};


export type FlightSetupQuery = (
  { __typename?: 'Query' }
  & { simulators: Array<(
    { __typename?: 'Simulator' }
    & Pick<Simulator, 'id' | 'name' | 'spaceEdventuresId'>
    & { stationSets?: Maybe<Array<Maybe<(
      { __typename?: 'StationSet' }
      & Pick<StationSet, 'id' | 'name'>
      & { stations: Array<(
        { __typename?: 'Station' }
        & Pick<Station, 'name' | 'widgets'>
        & { cards: Array<(
          { __typename?: 'Card' }
          & Pick<Card, 'name' | 'component'>
        )> }
      )> }
    )>>>, capabilities?: Maybe<(
      { __typename?: 'SimulatorCapabilities' }
      & Pick<SimulatorCapabilities, 'systems' | 'docking'>
    )> }
  )>, missions: Array<(
    { __typename?: 'Mission' }
    & Pick<Mission, 'id' | 'name' | 'description' | 'category'>
    & { requirements?: Maybe<(
      { __typename?: 'SimulatorCapabilities' }
      & Pick<SimulatorCapabilities, 'cards' | 'systems' | 'spaceEdventures' | 'docking'>
    )> }
  )> }
);

export type FlightTypesQueryVariables = {};


export type FlightTypesQuery = (
  { __typename?: 'Query' }
  & { thorium?: Maybe<(
    { __typename?: 'Thorium' }
    & { spaceEdventuresCenter?: Maybe<(
      { __typename?: 'SpaceEdventuresCenter' }
      & Pick<SpaceEdventuresCenter, 'id' | 'name'>
      & { flightTypes?: Maybe<Array<Maybe<(
        { __typename?: 'FlightType' }
        & Pick<FlightType, 'id' | 'name' | 'classHours' | 'flightHours'>
      )>>> }
    )> }
  )> }
);

export type StartFlightMutationVariables = {
  name: Scalars['String'];
  simulators: Array<SimulatorInput>;
  flightType?: Maybe<Scalars['String']>;
};


export type StartFlightMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'startFlight'>
);

export type MacroDuplicateMutationVariables = {
  id: Scalars['ID'];
};


export type MacroDuplicateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'duplicateMacro'>
);

export type MacroDuplicateActionMutationVariables = {
  id: Scalars['ID'];
  actionId: Scalars['ID'];
};


export type MacroDuplicateActionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'duplicateMacroAction'>
);

export type TimelineAddItemMutationVariables = {
  simulatorId?: Maybe<Scalars['ID']>;
  missionId?: Maybe<Scalars['ID']>;
  timelineStepId: Scalars['ID'];
  timelineItem: TimelineItemInput;
};


export type TimelineAddItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addTimelineItemToTimelineStep'>
);

export type TimelineAddStepMutationVariables = {
  simulatorId?: Maybe<Scalars['ID']>;
  missionId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};


export type TimelineAddStepMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addTimelineStep'>
);

export type TimelineDuplicateItemMutationVariables = {
  missionId: Scalars['ID'];
  timelineStepId: Scalars['ID'];
  timelineItemId: Scalars['ID'];
};


export type TimelineDuplicateItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'timelineDuplicateItem'>
);

export type TimelineDuplicateStepMutationVariables = {
  missionId: Scalars['ID'];
  timelineStepId: Scalars['ID'];
};


export type TimelineDuplicateStepMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'duplicateTimelineStep'>
);

export type EditMissionMutationVariables = {
  missionId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  aux?: Maybe<Scalars['Boolean']>;
};


export type EditMissionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editMission'>
);

export type IntrospectionQueryQueryVariables = {};


export type IntrospectionQueryQuery = (
  { __typename?: 'Query' }
  & { __schema: (
    { __typename?: '__Schema' }
    & { mutationType?: Maybe<(
      { __typename?: '__Type' }
      & Pick<__Type, 'name' | 'description'>
      & { fields?: Maybe<Array<(
        { __typename?: '__Field' }
        & Pick<__Field, 'name' | 'description'>
      )>> }
    )> }
  ) }
);

export type MissionSubscriptionSubscriptionVariables = {
  missionId: Scalars['ID'];
};


export type MissionSubscriptionSubscription = (
  { __typename?: 'Subscription' }
  & { missionsUpdate: Array<(
    { __typename?: 'Mission' }
    & Pick<Mission, 'id' | 'name' | 'description' | 'category' | 'aux'>
    & { extraRequirements?: Maybe<(
      { __typename?: 'SimulatorCapabilities' }
      & Pick<SimulatorCapabilities, 'systems' | 'cards'>
    )>, requirements?: Maybe<(
      { __typename?: 'SimulatorCapabilities' }
      & Pick<SimulatorCapabilities, 'systems' | 'cards' | 'spaceEdventures' | 'docking'>
    )>, timeline: Array<(
      { __typename?: 'TimelineStep' }
      & Pick<TimelineStep, 'id' | 'name' | 'description' | 'order'>
      & { timelineItems: Array<(
        { __typename?: 'TimelineItem' }
        & Pick<TimelineItem, 'id' | 'name' | 'type' | 'event' | 'args' | 'delay' | 'needsConfig' | 'noCancelOnReset'>
      )> }
    )> }
  )> }
);

export type RemoveMissionMutationVariables = {
  id: Scalars['ID'];
};


export type RemoveMissionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeMission'>
);

export type TimelineRemoveItemMutationVariables = {
  missionId: Scalars['ID'];
  timelineStepId: Scalars['ID'];
  timelineItemId: Scalars['ID'];
};


export type TimelineRemoveItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeTimelineStepItem'>
);

export type TimelineRemoveStepMutationVariables = {
  missionId: Scalars['ID'];
  timelineStepId: Scalars['ID'];
};


export type TimelineRemoveStepMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeTimelineStep'>
);

export type TimelineReorderStepMutationVariables = {
  missionId?: Maybe<Scalars['ID']>;
  timelineStepId: Scalars['ID'];
  order: Scalars['Int'];
};


export type TimelineReorderStepMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reorderTimelineStep'>
);

export type MissionSetRequirementsMutationVariables = {
  missionId: Scalars['ID'];
  requirements: RequirementInput;
};


export type MissionSetRequirementsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'missionSetExtraRequirements'>
);

export type TimelineUpdateItemMutationVariables = {
  simulatorId?: Maybe<Scalars['ID']>;
  missionId?: Maybe<Scalars['ID']>;
  timelineStepId: Scalars['ID'];
  timelineItemId: Scalars['ID'];
  timelineItem: TimelineItemInput;
};


export type TimelineUpdateItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTimelineStepItem'>
);

export type TimelineUpdateStepMutationVariables = {
  simulatorId?: Maybe<Scalars['ID']>;
  missionId?: Maybe<Scalars['ID']>;
  timelineStepId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};


export type TimelineUpdateStepMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTimelineStep'>
);

export type AddClientMutationVariables = {
  id: Scalars['ID'];
  client: SetClientInput;
};


export type AddClientMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addClientToSet'>
);

export type AddSetMutationVariables = {
  name: Scalars['String'];
};


export type AddSetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createSet'>
);

export type RemoveClientFromSetMutationVariables = {
  id: Scalars['ID'];
  client: Scalars['ID'];
};


export type RemoveClientFromSetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeClientFromSet'>
);

export type RemoveSetMutationVariables = {
  id: Scalars['ID'];
};


export type RemoveSetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeSet'>
);

export type RenameSetMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type RenameSetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'renameSet'>
);

export type SetKeyboardAndInterfaceQueryVariables = {
  id?: Maybe<Scalars['ID']>;
};


export type SetKeyboardAndInterfaceQuery = (
  { __typename?: 'Query' }
  & { simulators: Array<(
    { __typename?: 'Simulator' }
    & Pick<Simulator, 'interfaces'>
  )>, interfaces?: Maybe<Array<Maybe<(
    { __typename?: 'Interface' }
    & Pick<Interface, 'id' | 'name'>
  )>>>, keyboard?: Maybe<Array<Maybe<(
    { __typename?: 'Keyboard' }
    & Pick<Keyboard, 'id' | 'name'>
  )>>>, dmxSets: Array<(
    { __typename?: 'DMXSet' }
    & Pick<DmxSet, 'id' | 'name'>
  )> }
);

export type SetsQueryVariables = {};


export type SetsQuery = (
  { __typename?: 'Query' }
  & { simulators: Array<(
    { __typename?: 'Simulator' }
    & Pick<Simulator, 'id' | 'name' | 'layout'>
    & { systems?: Maybe<Array<(
      { __typename?: 'System' }
      & Pick<System, 'id' | 'type'>
    )>>, stationSets?: Maybe<Array<Maybe<(
      { __typename?: 'StationSet' }
      & Pick<StationSet, 'id' | 'name'>
      & { stations: Array<(
        { __typename?: 'Station' }
        & Pick<Station, 'name'>
      )> }
    )>>> }
  )>, sets?: Maybe<Array<Maybe<(
    { __typename?: 'Set' }
    & Pick<Set, 'id' | 'name'>
    & { clients: Array<(
      { __typename?: 'SetClient' }
      & Pick<SetClient, 'id' | 'station' | 'secondary' | 'soundPlayer'>
      & { client?: Maybe<(
        { __typename?: 'Client' }
        & Pick<Client, 'id'>
      )>, simulator?: Maybe<(
        { __typename?: 'Simulator' }
        & Pick<Simulator, 'id' | 'name'>
      )>, stationSet?: Maybe<(
        { __typename?: 'StationSet' }
        & Pick<StationSet, 'id' | 'name'>
      )> }
    )> }
  )>>>, clients?: Maybe<Array<Maybe<(
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'cards' | 'mobile'>
  )>>> }
);

export type UpdateSetClientMutationVariables = {
  id: Scalars['ID'];
  clientId: Scalars['ID'];
  secondary?: Maybe<Scalars['Boolean']>;
  soundPlayer?: Maybe<Scalars['Boolean']>;
};


export type UpdateSetClientMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateSetClient'>
);

export type AddCardMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
  cardName: Scalars['String'];
  cardComponent: Scalars['String'];
  cardIcon?: Maybe<Scalars['String']>;
};


export type AddCardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCardToStation'>
);

export type AddStationMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type AddStationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addStationToStationSet'>
);

export type StationSetDuplicateMutationVariables = {
  stationSetID: Scalars['ID'];
  name: Scalars['String'];
};


export type StationSetDuplicateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'duplicateStationSet'>
);

export type PanelsAndInterfacesQueryVariables = {};


export type PanelsAndInterfacesQuery = (
  { __typename?: 'Query' }
  & { softwarePanels?: Maybe<Array<Maybe<(
    { __typename?: 'SoftwarePanel' }
    & Pick<SoftwarePanel, 'id' | 'name'>
  )>>>, interfaces?: Maybe<Array<Maybe<(
    { __typename?: 'Interface' }
    & Pick<Interface, 'id' | 'name'>
  )>>> }
);

export type RemoveCardMutationVariables = {
  id: Scalars['ID'];
  stationName: Scalars['String'];
  cardName: Scalars['String'];
};


export type RemoveCardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCardFromStation'>
);

export type RemoveStationMutationVariables = {
  id: Scalars['ID'];
  stationName: Scalars['String'];
};


export type RemoveStationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeStationFromStationSet'>
);

export type RenameStationMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
  newName: Scalars['String'];
};


export type RenameStationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editStationInStationSet'>
);

export type ReorderStationWidgetsMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
  widget: Scalars['String'];
  order: Scalars['Int'];
};


export type ReorderStationWidgetsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reorderStationWidgets'>
);

export type SetAmbianceMutationVariables = {
  stationSetID: Scalars['ID'];
  stationName: Scalars['String'];
  ambiance?: Maybe<Scalars['String']>;
};


export type SetAmbianceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setStationAmbiance'>
);

export type SetStationCrewCountMutationVariables = {
  stationSetId: Scalars['ID'];
  crewCount: Scalars['Int'];
};


export type SetStationCrewCountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setStationSetCrewCount'>
);

export type SetStationDescriptionMutationVariables = {
  stationSetID: Scalars['ID'];
  stationName: Scalars['String'];
  description: Scalars['String'];
};


export type SetStationDescriptionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setStationDescription'>
);

export type SetStationLayoutMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
  layout: Scalars['String'];
};


export type SetStationLayoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setStationLayout'>
);

export type StationSetTrainingMutationVariables = {
  stationSetID: Scalars['ID'];
  stationName: Scalars['String'];
  training: Scalars['String'];
};


export type StationSetTrainingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setStationTraining'>
);

export type ToggleStationMessageGroupMutationVariables = {
  stationSetId: Scalars['ID'];
  station: Scalars['String'];
  group: Scalars['String'];
  state: Scalars['Boolean'];
};


export type ToggleStationMessageGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'toggleStationMessageGroup'>
);

export type ToggleStationExecMutationVariables = {
  stationSetID: Scalars['ID'];
  stationName: Scalars['String'];
  exec: Scalars['Boolean'];
};


export type ToggleStationExecMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setStationExecutive'>
);

export type ToggleStationLoginMutationVariables = {
  stationSetID: Scalars['ID'];
  stationName: Scalars['String'];
  login: Scalars['Boolean'];
};


export type ToggleStationLoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setStationLogin'>
);

export type ToggleStationWidgetMutationVariables = {
  stationSetID: Scalars['ID'];
  stationName: Scalars['String'];
  widget: Scalars['String'];
  state: Scalars['Boolean'];
};


export type ToggleStationWidgetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'toggleStationWidgets'>
);

export type UpdateStationCardMutationVariables = {
  stationSetId: Scalars['ID'];
  stationName: Scalars['String'];
  cardName: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
};


export type UpdateStationCardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editCardInStationSet'>
);

export type SystemSetWingMutationVariables = {
  systemId: Scalars['ID'];
  wing: Scalars['String'];
};


export type SystemSetWingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'systemSetWing'>
);

export type SensorsSetPingsMutationVariables = {
  id: Scalars['ID'];
  ping: Scalars['Boolean'];
};


export type SensorsSetPingsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sensorsSetHasPing'>
);

export type ReactorSetWingsMutationVariables = {
  id: Scalars['ID'];
  hasWings: Scalars['Boolean'];
};


export type ReactorSetWingsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reactorSetHasWings'>
);

export type TractorBeamSetCountMutationVariables = {
  id: Scalars['ID'];
  beams: Scalars['Int'];
};


export type TractorBeamSetCountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTractorBeamCount'>
);

export type RemoveSimulatorMutationVariables = {
  id: Scalars['ID'];
};


export type RemoveSimulatorMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeSimulator'>
);

export type SimulatorsConfigSubscriptionVariables = {};


export type SimulatorsConfigSubscription = (
  { __typename?: 'Subscription' }
  & { simulatorsUpdate?: Maybe<Array<Maybe<(
    { __typename?: 'Simulator' }
    & Pick<Simulator, 'id' | 'name' | 'alertlevel' | 'layout' | 'caps' | 'exocomps' | 'panels' | 'missionConfigs' | 'commandLines' | 'triggers' | 'interfaces' | 'midiSets' | 'stepDamage' | 'verifyStep' | 'hasPrinter' | 'hasLegs' | 'bridgeOfficerMessaging' | 'spaceEdventuresId' | 'soundEffects'>
    & { requiredDamageSteps?: Maybe<Array<Maybe<(
      { __typename?: 'DamageStep' }
      & Pick<DamageStep, 'id' | 'name'>
      & { args?: Maybe<(
        { __typename?: 'DamageStepArgs' }
        & Pick<DamageStepArgs, 'end' | 'cleanup' | 'name' | 'orders' | 'room' | 'preamble' | 'type' | 'message' | 'code' | 'inventory' | 'destination' | 'equipment' | 'query' | 'reactivate'>
      )> }
    )>>>, optionalDamageSteps?: Maybe<Array<Maybe<(
      { __typename?: 'DamageStep' }
      & Pick<DamageStep, 'id' | 'name'>
      & { args?: Maybe<(
        { __typename?: 'DamageStepArgs' }
        & Pick<DamageStepArgs, 'end' | 'cleanup' | 'name' | 'orders' | 'room' | 'preamble' | 'type' | 'message' | 'code' | 'inventory' | 'destination' | 'equipment' | 'query' | 'reactivate'>
      )> }
    )>>>, damageTasks?: Maybe<Array<Maybe<(
      { __typename?: 'DamageTask' }
      & Pick<DamageTask, 'id' | 'required'>
      & { taskTemplate?: Maybe<(
        { __typename?: 'TaskTemplate' }
        & Pick<TaskTemplate, 'id' | 'name' | 'definition' | 'reportTypes'>
      )>, nextSteps?: Maybe<Array<Maybe<(
        { __typename?: 'TaskTemplate' }
        & Pick<TaskTemplate, 'id' | 'name' | 'definition'>
      )>>> }
    )>>>, assets?: Maybe<(
      { __typename?: 'SimulatorAssets' }
      & Pick<SimulatorAssets, 'mesh' | 'texture' | 'side' | 'top' | 'logo' | 'bridge'>
    )>, systems?: Maybe<Array<(
      { __typename?: 'System' }
      & Pick<System, 'id' | 'type' | 'name' | 'displayName' | 'upgradeName'>
      & { upgradeMacros?: Maybe<Array<Maybe<(
        { __typename?: 'TimelineItem' }
        & Pick<TimelineItem, 'id' | 'event' | 'args' | 'delay'>
      )>>>, requiredDamageSteps?: Maybe<Array<Maybe<(
        { __typename?: 'DamageStep' }
        & Pick<DamageStep, 'id' | 'name'>
        & { args?: Maybe<(
          { __typename?: 'DamageStepArgs' }
          & Pick<DamageStepArgs, 'end' | 'cleanup' | 'name' | 'orders' | 'room' | 'preamble' | 'type' | 'message' | 'code' | 'inventory' | 'destination' | 'equipment' | 'query' | 'reactivate'>
        )> }
      )>>>, optionalDamageSteps?: Maybe<Array<Maybe<(
        { __typename?: 'DamageStep' }
        & Pick<DamageStep, 'id' | 'name'>
        & { args?: Maybe<(
          { __typename?: 'DamageStepArgs' }
          & Pick<DamageStepArgs, 'end' | 'cleanup' | 'name' | 'orders' | 'room' | 'preamble' | 'type' | 'message' | 'code' | 'inventory' | 'destination' | 'equipment' | 'query' | 'reactivate'>
        )> }
      )>>>, damageTasks?: Maybe<Array<Maybe<(
        { __typename?: 'DamageTask' }
        & Pick<DamageTask, 'id' | 'required'>
        & { taskTemplate?: Maybe<(
          { __typename?: 'TaskTemplate' }
          & Pick<TaskTemplate, 'id' | 'name' | 'definition' | 'reportTypes'>
        )>, nextSteps?: Maybe<Array<Maybe<(
          { __typename?: 'TaskTemplate' }
          & Pick<TaskTemplate, 'id' | 'name' | 'definition'>
        )>>> }
      )>>> }
    )>>, stationSets?: Maybe<Array<Maybe<(
      { __typename?: 'StationSet' }
      & Pick<StationSet, 'id' | 'name' | 'crewCount'>
      & { stations: Array<(
        { __typename?: 'Station' }
        & Pick<Station, 'name' | 'description' | 'training' | 'ambiance' | 'login' | 'executive' | 'messageGroups' | 'layout' | 'widgets'>
        & { cards: Array<(
          { __typename?: 'Card' }
          & Pick<Card, 'name' | 'component'>
        )> }
      )> }
    )>>> }
  )>>> }
);

export type StationSetConfigSubscriptionVariables = {};


export type StationSetConfigSubscription = (
  { __typename?: 'Subscription' }
  & { stationSetUpdate?: Maybe<Array<Maybe<(
    { __typename?: 'StationSet' }
    & Pick<StationSet, 'id' | 'name' | 'crewCount'>
    & { simulator?: Maybe<(
      { __typename?: 'Simulator' }
      & Pick<Simulator, 'id'>
    )>, stations: Array<(
      { __typename?: 'Station' }
      & Pick<Station, 'name' | 'description' | 'training' | 'ambiance' | 'login' | 'messageGroups' | 'executive' | 'widgets' | 'layout'>
      & { cards: Array<(
        { __typename?: 'Card' }
        & Pick<Card, 'name' | 'component'>
      )> }
    )> }
  )>>> }
);

export type AddTaskTemplateMutationVariables = {
  definition: Scalars['String'];
};


export type AddTaskTemplateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addTaskTemplate'>
);

export type ImportTemplatesMutationVariables = {};


export type ImportTemplatesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'importTaskTemplates'>
);

export type RemoveTaskTemplateMutationVariables = {
  id: Scalars['ID'];
};


export type RemoveTaskTemplateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeTaskTemplate'>
);

export type RenameTaskTemplateMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type RenameTaskTemplateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'renameTaskTemplate'>
);

export type SetTaskMacroMutationVariables = {
  id: Scalars['ID'];
  macros: Array<ActionInput>;
};


export type SetTaskMacroMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTaskTemplateMacros'>
);

export type SetTaskPreMacroMutationVariables = {
  id: Scalars['ID'];
  macros: Array<ActionInput>;
};


export type SetTaskPreMacroMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTaskTemplatePreMacros'>
);

export type SetTaskTemplateReportTypesMutationVariables = {
  id: Scalars['ID'];
  reportTypes: Array<Maybe<Scalars['String']>>;
};


export type SetTaskTemplateReportTypesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTaskTemplateReportTypes'>
);

export type SetTaskTemplateValuesMutationVariables = {
  id: Scalars['ID'];
  values: Scalars['JSON'];
};


export type SetTaskTemplateValuesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setTaskTemplateValues'>
);

export type TaskDefinitionsQueryVariables = {};


export type TaskDefinitionsQuery = (
  { __typename?: 'Query' }
  & { taskDefinitions: Array<(
    { __typename?: 'TaskDefinition' }
    & Pick<TaskDefinition, 'id' | 'class' | 'name' | 'valuesInput' | 'valuesValue' | 'active'>
    & { stations?: Maybe<Array<Maybe<(
      { __typename?: 'Station' }
      & Pick<Station, 'name'>
      & { cards: Array<(
        { __typename?: 'Card' }
        & Pick<Card, 'name' | 'component'>
      )> }
    )>>> }
  )>, thorium?: Maybe<(
    { __typename?: 'Thorium' }
    & Pick<Thorium, 'addedTaskTemplates'>
  )> }
);

export type TaskFlowAddMutationVariables = {
  name: Scalars['String'];
};


export type TaskFlowAddMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskFlowAdd'>
);

export type TaskFlowAddStepMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type TaskFlowAddStepMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskFlowAddStep'>
);

export type TaskFlowRemoveMutationVariables = {
  id: Scalars['ID'];
};


export type TaskFlowRemoveMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskFlowRemove'>
);

export type TaskFlowRemoveStepMutationVariables = {
  id: Scalars['ID'];
  stepId: Scalars['ID'];
};


export type TaskFlowRemoveStepMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskFlowRemoveStep'>
);

export type TaskFlowRenameMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type TaskFlowRenameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskFlowRename'>
);

export type TaskFlowRenameStepMutationVariables = {
  id: Scalars['ID'];
  stepId: Scalars['ID'];
  name: Scalars['String'];
};


export type TaskFlowRenameStepMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskFlowRenameStep'>
);

export type TaskFlowStepAddTaskMutationVariables = {
  id: Scalars['ID'];
  stepId: Scalars['ID'];
  task: TaskInput;
};


export type TaskFlowStepAddTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskFlowStepAddTask'>
);

export type TaskFlowStepEditTaskMutationVariables = {
  id: Scalars['ID'];
  stepId: Scalars['ID'];
  taskId: Scalars['ID'];
  task: TaskInput;
};


export type TaskFlowStepEditTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskFlowStepEditTask'>
);

export type TaskFlowStepRemoveTaskMutationVariables = {
  id: Scalars['ID'];
  stepId: Scalars['ID'];
  taskId: Scalars['ID'];
};


export type TaskFlowStepRemoveTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskFlowStepRemoveTask'>
);

export type TaskFlowStepCompleteAllMutationVariables = {
  id: Scalars['ID'];
  stepId: Scalars['ID'];
  completeAll: Scalars['Boolean'];
};


export type TaskFlowStepCompleteAllMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskFlowStepSetCompleteAll'>
);

export type TaskFlowsConfigSubscriptionVariables = {};


export type TaskFlowsConfigSubscription = (
  { __typename?: 'Subscription' }
  & { taskFlows: Array<(
    { __typename?: 'TaskFlow' }
    & Pick<TaskFlow, 'id' | 'name'>
    & { steps: Array<(
      { __typename?: 'TaskFlowStep' }
      & Pick<TaskFlowStep, 'id' | 'name' | 'completeAll'>
      & { tasks: Array<(
        { __typename?: 'Task' }
        & Pick<Task, 'id' | 'station' | 'definition' | 'values'>
        & { macros?: Maybe<Array<Maybe<(
          { __typename?: 'MacroAction' }
          & Pick<MacroAction, 'id' | 'event' | 'args' | 'delay'>
        )>>>, preMacros: Array<(
          { __typename?: 'MacroAction' }
          & Pick<MacroAction, 'id' | 'event' | 'args' | 'delay'>
        )> }
      )> }
    )> }
  )> }
);

export type TaskTemplatesSubscriptionVariables = {};


export type TaskTemplatesSubscription = (
  { __typename?: 'Subscription' }
  & { taskTemplatesUpdate: Array<(
    { __typename?: 'TaskTemplate' }
    & Pick<TaskTemplate, 'id' | 'name' | 'definition' | 'values' | 'reportTypes'>
    & { macros: Array<(
      { __typename?: 'MacroAction' }
      & Pick<MacroAction, 'id' | 'event' | 'args' | 'delay'>
    )>, preMacros: Array<(
      { __typename?: 'MacroAction' }
      & Pick<MacroAction, 'id' | 'event' | 'args' | 'delay'>
    )> }
  )> }
);

export type EntityRemoveEngineMutationVariables = {
  id: Scalars['ID'];
  type: EntityEngineEnum;
};


export type EntityRemoveEngineMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entityRemoveEngine'>
);

export type EntityRemoveThrustersMutationVariables = {
  id: Scalars['ID'];
};


export type EntityRemoveThrustersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entityRemoveThrusters'>
);

export type EntitySetEngineMutationVariables = {
  id: Scalars['ID'];
  type: EntityEngineEnum;
  maxSpeed?: Maybe<Scalars['Float']>;
  currentSpeed?: Maybe<Scalars['Float']>;
};


export type EntitySetEngineMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entitySetEngine'>
);

export type EntitySetThrustersMutationVariables = {
  id: Scalars['ID'];
  rotationSpeed?: Maybe<Scalars['Float']>;
  movementSpeed?: Maybe<Scalars['Float']>;
  direction?: Maybe<CoordinatesInput>;
  rotationDelta?: Maybe<CoordinatesInput>;
};


export type EntitySetThrustersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entitySetThrusters'>
);

export type EntitiesSetPositionMutationVariables = {
  entities: Array<EntitiesLocationInput>;
};


export type EntitiesSetPositionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entitiesSetPosition'>
);

export type EntityCreateMutationVariables = {
  flightId: Scalars['ID'];
  position: EntityCoordinatesInput;
  name: Scalars['String'];
  stageParentId: Scalars['ID'];
  color?: Maybe<Scalars['String']>;
  meshType: MeshTypeEnum;
  modelAsset?: Maybe<Scalars['String']>;
  materialMapAsset?: Maybe<Scalars['String']>;
  ringMapAsset?: Maybe<Scalars['String']>;
  cloudMapAsset?: Maybe<Scalars['String']>;
  emissiveColor?: Maybe<Scalars['String']>;
  emissiveIntensity?: Maybe<Scalars['Float']>;
  glowMode?: Maybe<GlowModeEnum>;
  glowColor?: Maybe<Scalars['String']>;
  lightIntensity?: Maybe<Scalars['Float']>;
  lightDecay?: Maybe<Scalars['Float']>;
  lightColor?: Maybe<Scalars['String']>;
};


export type EntityCreateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entitySetStageChild' | 'entitySetLocation' | 'entitySetIdentity' | 'entitySetAppearance' | 'entitySetGlow' | 'entitySetLight'>
  & { entityCreate: (
    { __typename?: 'Entity' }
    & Pick<Entity, 'id'>
  ) }
);

export type EntityDataFragment = (
  { __typename?: 'Entity' }
  & Pick<Entity, 'id' | 'interval'>
  & { identity?: Maybe<(
    { __typename?: 'IdentityComponent' }
    & Pick<IdentityComponent, 'name'>
  )>, stage?: Maybe<(
    { __typename?: 'StageComponent' }
    & Pick<StageComponent, 'scaleLabel' | 'scaleLabelShort' | 'skyboxKey' | 'childrenAsSprites'>
  )>, stageChild?: Maybe<(
    { __typename?: 'StageChildComponent' }
    & Pick<StageChildComponent, 'parentId'>
    & { parent?: Maybe<(
      { __typename?: 'Entity' }
      & Pick<Entity, 'id'>
      & { identity?: Maybe<(
        { __typename?: 'IdentityComponent' }
        & Pick<IdentityComponent, 'name'>
      )> }
    )> }
  )>, appearance?: Maybe<(
    { __typename?: 'AppearanceComponent' }
    & Pick<AppearanceComponent, 'color' | 'meshType' | 'modelAsset' | 'materialMapAsset' | 'ringMapAsset' | 'cloudMapAsset' | 'emissiveColor' | 'emissiveIntensity' | 'scale'>
  )>, light?: Maybe<(
    { __typename?: 'LightComponent' }
    & Pick<LightComponent, 'intensity' | 'decay' | 'color'>
  )>, glow?: Maybe<(
    { __typename?: 'GlowComponent' }
    & Pick<GlowComponent, 'glowMode' | 'color'>
  )>, location?: Maybe<(
    { __typename?: 'LocationComponent' }
    & Pick<LocationComponent, 'inert'>
    & { position: (
      { __typename?: 'EntityCoordinates' }
      & Pick<EntityCoordinates, 'x' | 'y' | 'z'>
    ), rotation: (
      { __typename?: 'Quaternion' }
      & Pick<Quaternion, 'x' | 'y' | 'z' | 'w'>
    ) }
  )>, enginesWarp?: Maybe<(
    { __typename?: 'EngineComponent' }
    & Pick<EngineComponent, 'maxSpeed' | 'currentSpeed'>
  )>, enginesImpulse?: Maybe<(
    { __typename?: 'EngineComponent' }
    & Pick<EngineComponent, 'maxSpeed' | 'currentSpeed'>
  )>, thrusters?: Maybe<(
    { __typename?: 'ThrustersComponent' }
    & Pick<ThrustersComponent, 'rotationSpeed' | 'movementSpeed'>
  )> }
);

export type EntitiesQueryVariables = {
  flightId: Scalars['ID'];
};


export type EntitiesQuery = (
  { __typename?: 'Query' }
  & { entities: Array<Maybe<(
    { __typename?: 'Entity' }
    & EntityDataFragment
  )>> }
);

export type EntityRemoveMutationVariables = {
  id: Array<Scalars['ID']>;
};


export type EntityRemoveMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entityRemove'>
);

export type EntityRemoveGlowMutationVariables = {
  id: Scalars['ID'];
};


export type EntityRemoveGlowMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entityRemoveGlow'>
);

export type EntityRemoveLightMutationVariables = {
  id: Scalars['ID'];
};


export type EntityRemoveLightMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entityRemoveLight'>
);

export type EntityRemoveStageMutationVariables = {
  id: Scalars['ID'];
};


export type EntityRemoveStageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entityRemoveStage'>
);

export type EntitySetAppearanceMutationVariables = {
  id: Scalars['ID'];
  color?: Maybe<Scalars['String']>;
  meshType?: Maybe<MeshTypeEnum>;
  modelAsset?: Maybe<Scalars['String']>;
  materialMapAsset?: Maybe<Scalars['String']>;
  cloudMapAsset?: Maybe<Scalars['String']>;
  ringMapAsset?: Maybe<Scalars['String']>;
  emissiveColor?: Maybe<Scalars['String']>;
  emissiveIntensity?: Maybe<Scalars['Float']>;
  scale?: Maybe<Scalars['Float']>;
};


export type EntitySetAppearanceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entitySetAppearance'>
);

export type EntitySetGlowMutationVariables = {
  id: Scalars['ID'];
  glowMode?: Maybe<GlowModeEnum>;
  color?: Maybe<Scalars['String']>;
};


export type EntitySetGlowMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entitySetGlow'>
);

export type EntitySetIdentityMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type EntitySetIdentityMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entitySetIdentity'>
);

export type EntitySetLightMutationVariables = {
  id: Scalars['ID'];
  color?: Maybe<Scalars['String']>;
  intensity?: Maybe<Scalars['Float']>;
  decay?: Maybe<Scalars['Float']>;
};


export type EntitySetLightMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entitySetLight'>
);

export type EntitySetLocationMutationVariables = {
  id: Scalars['ID'];
  position?: Maybe<EntityCoordinatesInput>;
  velocity?: Maybe<EntityCoordinatesInput>;
  acceleration?: Maybe<EntityCoordinatesInput>;
  rotation?: Maybe<QuaternionInput>;
  rotationVelocity?: Maybe<EntityCoordinatesInput>;
  rotationAcceleration?: Maybe<EntityCoordinatesInput>;
};


export type EntitySetLocationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entitySetLocation'>
);

export type EntitySetRotationVelocityMagnitudeMutationVariables = {
  id: Scalars['ID'];
  rotationVelocity: CoordinatesInput;
};


export type EntitySetRotationVelocityMagnitudeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entitySetRotationVelocityMagnitude'>
);

export type EntitySetStageMutationVariables = {
  id: Scalars['ID'];
  scaleLabel?: Maybe<Scalars['String']>;
  scaleLabelShort?: Maybe<Scalars['String']>;
  skyboxKey?: Maybe<Scalars['String']>;
};


export type EntitySetStageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entitySetStage'>
);

export type EntitySetTemplateMutationVariables = {
  id?: Maybe<Scalars['ID']>;
  category: Scalars['String'];
};


export type EntitySetTemplateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entitySetTemplate'>
);


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
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "SystemInterface",
        "possibleTypes": [
          {
            "name": "System"
          },
          {
            "name": "CoolantTank"
          },
          {
            "name": "Crm"
          },
          {
            "name": "Engine"
          },
          {
            "name": "InternalComm"
          },
          {
            "name": "JumpDrive"
          },
          {
            "name": "LRCommunications"
          },
          {
            "name": "Navigation"
          },
          {
            "name": "Phaser"
          },
          {
            "name": "Probes"
          },
          {
            "name": "Railgun"
          },
          {
            "name": "Reactor"
          },
          {
            "name": "Sensors"
          },
          {
            "name": "Shield"
          },
          {
            "name": "ShortRangeComm"
          },
          {
            "name": "Sickbay"
          },
          {
            "name": "SignalJammer"
          },
          {
            "name": "StealthField"
          },
          {
            "name": "SubspaceField"
          },
          {
            "name": "Targeting"
          },
          {
            "name": "Thruster"
          },
          {
            "name": "Thx"
          },
          {
            "name": "Torpedo"
          },
          {
            "name": "TractorBeam"
          },
          {
            "name": "Transporter"
          },
          {
            "name": "Transwarp"
          },
          {
            "name": "Countermeasures"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "Location",
        "possibleTypes": [
          {
            "name": "Deck"
          },
          {
            "name": "Room"
          }
        ]
      }
    ]
  }
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
    ${CountermeasureModuleFragmentDoc}`;
export const TemplateFragmentFragmentDoc = gql`
    fragment TemplateFragment on Template {
  id
  __typename
}
    `;
export const EntityDataFragmentDoc = gql`
    fragment EntityData on Entity {
  id
  interval
  identity {
    name
  }
  stage {
    scaleLabel
    scaleLabelShort
    skyboxKey
    childrenAsSprites
  }
  stageChild {
    parentId
    parent {
      id
      identity {
        name
      }
    }
  }
  appearance {
    color
    meshType
    modelAsset
    materialMapAsset
    ringMapAsset
    cloudMapAsset
    emissiveColor
    emissiveIntensity
    scale
  }
  light {
    intensity
    decay
    color
  }
  glow {
    glowMode
    color
  }
  location {
    inert
    position {
      x
      y
      z
    }
    rotation {
      x
      y
      z
      w
    }
  }
  enginesWarp {
    maxSpeed
    currentSpeed
  }
  enginesImpulse {
    maxSpeed
    currentSpeed
  }
  thrusters {
    rotationSpeed
    movementSpeed
  }
}
    `;
export const ActivateLightingDocument = gql`
    mutation ActivateLighting($clientId: ID!, $dmxSetId: ID!) {
  clientActivateLights(clientId: $clientId, dmxSetId: $dmxSetId)
}
    `;
export type ActivateLightingMutationFn = ApolloReactCommon.MutationFunction<ActivateLightingMutation, ActivateLightingMutationVariables>;

/**
 * __useActivateLightingMutation__
 *
 * To run a mutation, you first call `useActivateLightingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateLightingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateLightingMutation, { data, loading, error }] = useActivateLightingMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      dmxSetId: // value for 'dmxSetId'
 *   },
 * });
 */
export function useActivateLightingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ActivateLightingMutation, ActivateLightingMutationVariables>) {
        return ApolloReactHooks.useMutation<ActivateLightingMutation, ActivateLightingMutationVariables>(ActivateLightingDocument, baseOptions);
      }
export type ActivateLightingMutationHookResult = ReturnType<typeof useActivateLightingMutation>;
export type ActivateLightingMutationResult = ApolloReactCommon.MutationResult<ActivateLightingMutation>;
export type ActivateLightingMutationOptions = ApolloReactCommon.BaseMutationOptions<ActivateLightingMutation, ActivateLightingMutationVariables>;
export const AmbianceDocument = gql`
    query Ambiance($id: ID!) {
  simulators(id: $id) {
    id
    ambiance {
      id
      name
      asset
      volume
      channel
      playbackRate
    }
  }
}
    `;

/**
 * __useAmbianceQuery__
 *
 * To run a query within a React component, call `useAmbianceQuery` and pass it any options that fit your needs.
 * When your component renders, `useAmbianceQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAmbianceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAmbianceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AmbianceQuery, AmbianceQueryVariables>) {
        return ApolloReactHooks.useQuery<AmbianceQuery, AmbianceQueryVariables>(AmbianceDocument, baseOptions);
      }
export function useAmbianceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AmbianceQuery, AmbianceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AmbianceQuery, AmbianceQueryVariables>(AmbianceDocument, baseOptions);
        }
export type AmbianceQueryHookResult = ReturnType<typeof useAmbianceQuery>;
export type AmbianceLazyQueryHookResult = ReturnType<typeof useAmbianceLazyQuery>;
export type AmbianceQueryResult = ApolloReactCommon.QueryResult<AmbianceQuery, AmbianceQueryVariables>;
export const ClientDocument = gql`
    query Client($clientId: ID!) {
  clients(clientId: $clientId) {
    ...ClientData
  }
}
    ${ClientDataFragmentDoc}`;

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
export function useClientQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ClientQuery, ClientQueryVariables>) {
        return ApolloReactHooks.useQuery<ClientQuery, ClientQueryVariables>(ClientDocument, baseOptions);
      }
export function useClientLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ClientQuery, ClientQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ClientQuery, ClientQueryVariables>(ClientDocument, baseOptions);
        }
export type ClientQueryHookResult = ReturnType<typeof useClientQuery>;
export type ClientLazyQueryHookResult = ReturnType<typeof useClientLazyQuery>;
export type ClientQueryResult = ApolloReactCommon.QueryResult<ClientQuery, ClientQueryVariables>;
export const ClientUpdateDocument = gql`
    subscription ClientUpdate($clientId: ID!) {
  clientChanged(clientId: $clientId) {
    ...ClientData
  }
}
    ${ClientDataFragmentDoc}`;

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
export function useClientUpdateSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<ClientUpdateSubscription, ClientUpdateSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<ClientUpdateSubscription, ClientUpdateSubscriptionVariables>(ClientUpdateDocument, baseOptions);
      }
export type ClientUpdateSubscriptionHookResult = ReturnType<typeof useClientUpdateSubscription>;
export type ClientUpdateSubscriptionResult = ApolloReactCommon.SubscriptionResult<ClientUpdateSubscription>;
export const ClientPingDocument = gql`
    mutation ClientPing($clientId: ID!) {
  clientPing(client: $clientId)
}
    `;
export type ClientPingMutationFn = ApolloReactCommon.MutationFunction<ClientPingMutation, ClientPingMutationVariables>;

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
export function useClientPingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ClientPingMutation, ClientPingMutationVariables>) {
        return ApolloReactHooks.useMutation<ClientPingMutation, ClientPingMutationVariables>(ClientPingDocument, baseOptions);
      }
export type ClientPingMutationHookResult = ReturnType<typeof useClientPingMutation>;
export type ClientPingMutationResult = ApolloReactCommon.MutationResult<ClientPingMutation>;
export type ClientPingMutationOptions = ApolloReactCommon.BaseMutationOptions<ClientPingMutation, ClientPingMutationVariables>;
export const LightingControlDocument = gql`
    subscription LightingControl($simulatorId: ID!) {
  simulatorsUpdate(simulatorId: $simulatorId) {
    id
    lighting {
      intensity
      action
      actionStrength
      transitionDuration
      dmxConfig {
        id
        config
        actionStrength
      }
    }
    alertlevel
  }
}
    `;

/**
 * __useLightingControlSubscription__
 *
 * To run a query within a React component, call `useLightingControlSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLightingControlSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLightingControlSubscription({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useLightingControlSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<LightingControlSubscription, LightingControlSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<LightingControlSubscription, LightingControlSubscriptionVariables>(LightingControlDocument, baseOptions);
      }
export type LightingControlSubscriptionHookResult = ReturnType<typeof useLightingControlSubscription>;
export type LightingControlSubscriptionResult = ApolloReactCommon.SubscriptionResult<LightingControlSubscription>;
export const RegisterClientDocument = gql`
    mutation RegisterClient($client: ID!) {
  clientConnect(client: $client)
}
    `;
export type RegisterClientMutationFn = ApolloReactCommon.MutationFunction<RegisterClientMutation, RegisterClientMutationVariables>;

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
export function useRegisterClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterClientMutation, RegisterClientMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterClientMutation, RegisterClientMutationVariables>(RegisterClientDocument, baseOptions);
      }
export type RegisterClientMutationHookResult = ReturnType<typeof useRegisterClientMutation>;
export type RegisterClientMutationResult = ApolloReactCommon.MutationResult<RegisterClientMutation>;
export type RegisterClientMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterClientMutation, RegisterClientMutationVariables>;
export const RemoveClientDocument = gql`
    mutation RemoveClient($client: ID!) {
  clientDisconnect(client: $client)
}
    `;
export type RemoveClientMutationFn = ApolloReactCommon.MutationFunction<RemoveClientMutation, RemoveClientMutationVariables>;

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
export function useRemoveClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveClientMutation, RemoveClientMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveClientMutation, RemoveClientMutationVariables>(RemoveClientDocument, baseOptions);
      }
export type RemoveClientMutationHookResult = ReturnType<typeof useRemoveClientMutation>;
export type RemoveClientMutationResult = ApolloReactCommon.MutationResult<RemoveClientMutation>;
export type RemoveClientMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveClientMutation, RemoveClientMutationVariables>;
export const SimulatorDocument = gql`
    query Simulator($simulatorId: ID!) {
  simulators(id: $simulatorId) {
    ...SimulatorData
  }
}
    ${SimulatorDataFragmentDoc}`;

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
export function useSimulatorQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SimulatorQuery, SimulatorQueryVariables>) {
        return ApolloReactHooks.useQuery<SimulatorQuery, SimulatorQueryVariables>(SimulatorDocument, baseOptions);
      }
export function useSimulatorLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SimulatorQuery, SimulatorQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SimulatorQuery, SimulatorQueryVariables>(SimulatorDocument, baseOptions);
        }
export type SimulatorQueryHookResult = ReturnType<typeof useSimulatorQuery>;
export type SimulatorLazyQueryHookResult = ReturnType<typeof useSimulatorLazyQuery>;
export type SimulatorQueryResult = ApolloReactCommon.QueryResult<SimulatorQuery, SimulatorQueryVariables>;
export const SimulatorUpdateDocument = gql`
    subscription SimulatorUpdate($simulatorId: ID!) {
  simulatorsUpdate(simulatorId: $simulatorId) {
    ...SimulatorData
  }
}
    ${SimulatorDataFragmentDoc}`;

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
export function useSimulatorUpdateSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SimulatorUpdateSubscription, SimulatorUpdateSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SimulatorUpdateSubscription, SimulatorUpdateSubscriptionVariables>(SimulatorUpdateDocument, baseOptions);
      }
export type SimulatorUpdateSubscriptionHookResult = ReturnType<typeof useSimulatorUpdateSubscription>;
export type SimulatorUpdateSubscriptionResult = ApolloReactCommon.SubscriptionResult<SimulatorUpdateSubscription>;
export const MacroDmxConfigsDocument = gql`
    query MacroDMXConfigs {
  dmxConfigs {
    id
    name
  }
}
    `;

/**
 * __useMacroDmxConfigsQuery__
 *
 * To run a query within a React component, call `useMacroDmxConfigsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMacroDmxConfigsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMacroDmxConfigsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMacroDmxConfigsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MacroDmxConfigsQuery, MacroDmxConfigsQueryVariables>) {
        return ApolloReactHooks.useQuery<MacroDmxConfigsQuery, MacroDmxConfigsQueryVariables>(MacroDmxConfigsDocument, baseOptions);
      }
export function useMacroDmxConfigsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MacroDmxConfigsQuery, MacroDmxConfigsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MacroDmxConfigsQuery, MacroDmxConfigsQueryVariables>(MacroDmxConfigsDocument, baseOptions);
        }
export type MacroDmxConfigsQueryHookResult = ReturnType<typeof useMacroDmxConfigsQuery>;
export type MacroDmxConfigsLazyQueryHookResult = ReturnType<typeof useMacroDmxConfigsLazyQuery>;
export type MacroDmxConfigsQueryResult = ApolloReactCommon.QueryResult<MacroDmxConfigsQuery, MacroDmxConfigsQueryVariables>;
export const DockingShuttleConfigDocument = gql`
    query DockingShuttleConfig($simulatorId: ID!) {
  docking(simulatorId: $simulatorId) {
    id
    name
    type
    image
    shipName
    clamps
    compress
    doors
    docked
    direction
  }
  assetFolders(names: ["Docking Images"]) {
    id
    name
    objects {
      id
      name
      fullPath
    }
  }
}
    `;

/**
 * __useDockingShuttleConfigQuery__
 *
 * To run a query within a React component, call `useDockingShuttleConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useDockingShuttleConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDockingShuttleConfigQuery({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useDockingShuttleConfigQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DockingShuttleConfigQuery, DockingShuttleConfigQueryVariables>) {
        return ApolloReactHooks.useQuery<DockingShuttleConfigQuery, DockingShuttleConfigQueryVariables>(DockingShuttleConfigDocument, baseOptions);
      }
export function useDockingShuttleConfigLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DockingShuttleConfigQuery, DockingShuttleConfigQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DockingShuttleConfigQuery, DockingShuttleConfigQueryVariables>(DockingShuttleConfigDocument, baseOptions);
        }
export type DockingShuttleConfigQueryHookResult = ReturnType<typeof useDockingShuttleConfigQuery>;
export type DockingShuttleConfigLazyQueryHookResult = ReturnType<typeof useDockingShuttleConfigLazyQuery>;
export type DockingShuttleConfigQueryResult = ApolloReactCommon.QueryResult<DockingShuttleConfigQuery, DockingShuttleConfigQueryVariables>;
export const MissionMacrosDocument = gql`
    query MissionMacros {
  missions {
    id
    name
    category
    timeline {
      id
      name
    }
  }
}
    `;

/**
 * __useMissionMacrosQuery__
 *
 * To run a query within a React component, call `useMissionMacrosQuery` and pass it any options that fit your needs.
 * When your component renders, `useMissionMacrosQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMissionMacrosQuery({
 *   variables: {
 *   },
 * });
 */
export function useMissionMacrosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MissionMacrosQuery, MissionMacrosQueryVariables>) {
        return ApolloReactHooks.useQuery<MissionMacrosQuery, MissionMacrosQueryVariables>(MissionMacrosDocument, baseOptions);
      }
export function useMissionMacrosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MissionMacrosQuery, MissionMacrosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MissionMacrosQuery, MissionMacrosQueryVariables>(MissionMacrosDocument, baseOptions);
        }
export type MissionMacrosQueryHookResult = ReturnType<typeof useMissionMacrosQuery>;
export type MissionMacrosLazyQueryHookResult = ReturnType<typeof useMissionMacrosLazyQuery>;
export type MissionMacrosQueryResult = ApolloReactCommon.QueryResult<MissionMacrosQuery, MissionMacrosQueryVariables>;
export const RemoteAssetLoadDocument = gql`
    mutation RemoteAssetLoad($folderPath: String!, $files: [RemoteAsset!]!) {
  downloadRemoteAssets(folderPath: $folderPath, files: $files)
}
    `;
export type RemoteAssetLoadMutationFn = ApolloReactCommon.MutationFunction<RemoteAssetLoadMutation, RemoteAssetLoadMutationVariables>;

/**
 * __useRemoteAssetLoadMutation__
 *
 * To run a mutation, you first call `useRemoteAssetLoadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoteAssetLoadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [remoteAssetLoadMutation, { data, loading, error }] = useRemoteAssetLoadMutation({
 *   variables: {
 *      folderPath: // value for 'folderPath'
 *      files: // value for 'files'
 *   },
 * });
 */
export function useRemoteAssetLoadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoteAssetLoadMutation, RemoteAssetLoadMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoteAssetLoadMutation, RemoteAssetLoadMutationVariables>(RemoteAssetLoadDocument, baseOptions);
      }
export type RemoteAssetLoadMutationHookResult = ReturnType<typeof useRemoteAssetLoadMutation>;
export type RemoteAssetLoadMutationResult = ApolloReactCommon.MutationResult<RemoteAssetLoadMutation>;
export type RemoteAssetLoadMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoteAssetLoadMutation, RemoteAssetLoadMutationVariables>;
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
    ${CountermeasureFragmentDoc}`;

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
export function useCountermeasuresSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<CountermeasuresSubscription, CountermeasuresSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<CountermeasuresSubscription, CountermeasuresSubscriptionVariables>(CountermeasuresDocument, baseOptions);
      }
export type CountermeasuresSubscriptionHookResult = ReturnType<typeof useCountermeasuresSubscription>;
export type CountermeasuresSubscriptionResult = ApolloReactCommon.SubscriptionResult<CountermeasuresSubscription>;
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
export function useCountermeasuresCoreSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<CountermeasuresCoreSubscription, CountermeasuresCoreSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<CountermeasuresCoreSubscription, CountermeasuresCoreSubscriptionVariables>(CountermeasuresCoreDocument, baseOptions);
      }
export type CountermeasuresCoreSubscriptionHookResult = ReturnType<typeof useCountermeasuresCoreSubscription>;
export type CountermeasuresCoreSubscriptionResult = ApolloReactCommon.SubscriptionResult<CountermeasuresCoreSubscription>;
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
export function useCountermeasureModulesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CountermeasureModulesQuery, CountermeasureModulesQueryVariables>) {
        return ApolloReactHooks.useQuery<CountermeasureModulesQuery, CountermeasureModulesQueryVariables>(CountermeasureModulesDocument, baseOptions);
      }
export function useCountermeasureModulesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CountermeasureModulesQuery, CountermeasureModulesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CountermeasureModulesQuery, CountermeasureModulesQueryVariables>(CountermeasureModulesDocument, baseOptions);
        }
export type CountermeasureModulesQueryHookResult = ReturnType<typeof useCountermeasureModulesQuery>;
export type CountermeasureModulesLazyQueryHookResult = ReturnType<typeof useCountermeasureModulesLazyQuery>;
export type CountermeasureModulesQueryResult = ApolloReactCommon.QueryResult<CountermeasureModulesQuery, CountermeasureModulesQueryVariables>;
export const CountermeasureRemoveModuleDocument = gql`
    mutation CountermeasureRemoveModule($id: ID!, $slot: CountermeasureSlotEnum!, $moduleId: ID!) {
  countermeasuresRemoveModule(id: $id, slot: $slot, moduleId: $moduleId)
}
    `;
export type CountermeasureRemoveModuleMutationFn = ApolloReactCommon.MutationFunction<CountermeasureRemoveModuleMutation, CountermeasureRemoveModuleMutationVariables>;

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
export function useCountermeasureRemoveModuleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CountermeasureRemoveModuleMutation, CountermeasureRemoveModuleMutationVariables>) {
        return ApolloReactHooks.useMutation<CountermeasureRemoveModuleMutation, CountermeasureRemoveModuleMutationVariables>(CountermeasureRemoveModuleDocument, baseOptions);
      }
export type CountermeasureRemoveModuleMutationHookResult = ReturnType<typeof useCountermeasureRemoveModuleMutation>;
export type CountermeasureRemoveModuleMutationResult = ApolloReactCommon.MutationResult<CountermeasureRemoveModuleMutation>;
export type CountermeasureRemoveModuleMutationOptions = ApolloReactCommon.BaseMutationOptions<CountermeasureRemoveModuleMutation, CountermeasureRemoveModuleMutationVariables>;
export const CountermeasureSetResourceDocument = gql`
    mutation CountermeasureSetResource($id: ID!, $resource: String!, $value: Float!) {
  countermeasuresSetResource(id: $id, resource: $resource, value: $value)
}
    `;
export type CountermeasureSetResourceMutationFn = ApolloReactCommon.MutationFunction<CountermeasureSetResourceMutation, CountermeasureSetResourceMutationVariables>;

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
export function useCountermeasureSetResourceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CountermeasureSetResourceMutation, CountermeasureSetResourceMutationVariables>) {
        return ApolloReactHooks.useMutation<CountermeasureSetResourceMutation, CountermeasureSetResourceMutationVariables>(CountermeasureSetResourceDocument, baseOptions);
      }
export type CountermeasureSetResourceMutationHookResult = ReturnType<typeof useCountermeasureSetResourceMutation>;
export type CountermeasureSetResourceMutationResult = ApolloReactCommon.MutationResult<CountermeasureSetResourceMutation>;
export type CountermeasureSetResourceMutationOptions = ApolloReactCommon.BaseMutationOptions<CountermeasureSetResourceMutation, CountermeasureSetResourceMutationVariables>;
export const CountermeasuresActivateCountermeasureDocument = gql`
    mutation CountermeasuresActivateCountermeasure($id: ID!, $slot: CountermeasureSlotEnum!) {
  countermeasuresActivateCountermeasure(id: $id, slot: $slot)
}
    `;
export type CountermeasuresActivateCountermeasureMutationFn = ApolloReactCommon.MutationFunction<CountermeasuresActivateCountermeasureMutation, CountermeasuresActivateCountermeasureMutationVariables>;

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
export function useCountermeasuresActivateCountermeasureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CountermeasuresActivateCountermeasureMutation, CountermeasuresActivateCountermeasureMutationVariables>) {
        return ApolloReactHooks.useMutation<CountermeasuresActivateCountermeasureMutation, CountermeasuresActivateCountermeasureMutationVariables>(CountermeasuresActivateCountermeasureDocument, baseOptions);
      }
export type CountermeasuresActivateCountermeasureMutationHookResult = ReturnType<typeof useCountermeasuresActivateCountermeasureMutation>;
export type CountermeasuresActivateCountermeasureMutationResult = ApolloReactCommon.MutationResult<CountermeasuresActivateCountermeasureMutation>;
export type CountermeasuresActivateCountermeasureMutationOptions = ApolloReactCommon.BaseMutationOptions<CountermeasuresActivateCountermeasureMutation, CountermeasuresActivateCountermeasureMutationVariables>;
export const CountermeasuresAddModuleDocument = gql`
    mutation CountermeasuresAddModule($id: ID!, $slot: CountermeasureSlotEnum!, $moduleType: String!) {
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
export type CountermeasuresAddModuleMutationFn = ApolloReactCommon.MutationFunction<CountermeasuresAddModuleMutation, CountermeasuresAddModuleMutationVariables>;

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
export function useCountermeasuresAddModuleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CountermeasuresAddModuleMutation, CountermeasuresAddModuleMutationVariables>) {
        return ApolloReactHooks.useMutation<CountermeasuresAddModuleMutation, CountermeasuresAddModuleMutationVariables>(CountermeasuresAddModuleDocument, baseOptions);
      }
export type CountermeasuresAddModuleMutationHookResult = ReturnType<typeof useCountermeasuresAddModuleMutation>;
export type CountermeasuresAddModuleMutationResult = ApolloReactCommon.MutationResult<CountermeasuresAddModuleMutation>;
export type CountermeasuresAddModuleMutationOptions = ApolloReactCommon.BaseMutationOptions<CountermeasuresAddModuleMutation, CountermeasuresAddModuleMutationVariables>;
export const CountermeasuresBuildCountermeasureDocument = gql`
    mutation CountermeasuresBuildCountermeasure($id: ID!, $slot: CountermeasureSlotEnum!) {
  countermeasuresBuildCountermeasure(id: $id, slot: $slot)
}
    `;
export type CountermeasuresBuildCountermeasureMutationFn = ApolloReactCommon.MutationFunction<CountermeasuresBuildCountermeasureMutation, CountermeasuresBuildCountermeasureMutationVariables>;

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
export function useCountermeasuresBuildCountermeasureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CountermeasuresBuildCountermeasureMutation, CountermeasuresBuildCountermeasureMutationVariables>) {
        return ApolloReactHooks.useMutation<CountermeasuresBuildCountermeasureMutation, CountermeasuresBuildCountermeasureMutationVariables>(CountermeasuresBuildCountermeasureDocument, baseOptions);
      }
export type CountermeasuresBuildCountermeasureMutationHookResult = ReturnType<typeof useCountermeasuresBuildCountermeasureMutation>;
export type CountermeasuresBuildCountermeasureMutationResult = ApolloReactCommon.MutationResult<CountermeasuresBuildCountermeasureMutation>;
export type CountermeasuresBuildCountermeasureMutationOptions = ApolloReactCommon.BaseMutationOptions<CountermeasuresBuildCountermeasureMutation, CountermeasuresBuildCountermeasureMutationVariables>;
export const CountermeasuresConfigureModuleDocument = gql`
    mutation CountermeasuresConfigureModule($id: ID!, $slot: CountermeasureSlotEnum!, $moduleId: ID!, $config: JSON!) {
  countermeasuresConfigureModule(id: $id, slot: $slot, moduleId: $moduleId, config: $config)
}
    `;
export type CountermeasuresConfigureModuleMutationFn = ApolloReactCommon.MutationFunction<CountermeasuresConfigureModuleMutation, CountermeasuresConfigureModuleMutationVariables>;

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
export function useCountermeasuresConfigureModuleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CountermeasuresConfigureModuleMutation, CountermeasuresConfigureModuleMutationVariables>) {
        return ApolloReactHooks.useMutation<CountermeasuresConfigureModuleMutation, CountermeasuresConfigureModuleMutationVariables>(CountermeasuresConfigureModuleDocument, baseOptions);
      }
export type CountermeasuresConfigureModuleMutationHookResult = ReturnType<typeof useCountermeasuresConfigureModuleMutation>;
export type CountermeasuresConfigureModuleMutationResult = ApolloReactCommon.MutationResult<CountermeasuresConfigureModuleMutation>;
export type CountermeasuresConfigureModuleMutationOptions = ApolloReactCommon.BaseMutationOptions<CountermeasuresConfigureModuleMutation, CountermeasuresConfigureModuleMutationVariables>;
export const CountermeasureCreateCountermeasureDocument = gql`
    mutation CountermeasureCreateCountermeasure($id: ID!, $slot: CountermeasureSlotEnum!, $name: String!) {
  countermeasuresCreateCountermeasure(id: $id, slot: $slot, name: $name) {
    id
  }
}
    `;
export type CountermeasureCreateCountermeasureMutationFn = ApolloReactCommon.MutationFunction<CountermeasureCreateCountermeasureMutation, CountermeasureCreateCountermeasureMutationVariables>;

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
export function useCountermeasureCreateCountermeasureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CountermeasureCreateCountermeasureMutation, CountermeasureCreateCountermeasureMutationVariables>) {
        return ApolloReactHooks.useMutation<CountermeasureCreateCountermeasureMutation, CountermeasureCreateCountermeasureMutationVariables>(CountermeasureCreateCountermeasureDocument, baseOptions);
      }
export type CountermeasureCreateCountermeasureMutationHookResult = ReturnType<typeof useCountermeasureCreateCountermeasureMutation>;
export type CountermeasureCreateCountermeasureMutationResult = ApolloReactCommon.MutationResult<CountermeasureCreateCountermeasureMutation>;
export type CountermeasureCreateCountermeasureMutationOptions = ApolloReactCommon.BaseMutationOptions<CountermeasureCreateCountermeasureMutation, CountermeasureCreateCountermeasureMutationVariables>;
export const CountermeasuresDeactivateCountermeasureDocument = gql`
    mutation CountermeasuresDeactivateCountermeasure($id: ID!, $slot: CountermeasureSlotEnum!) {
  countermeasuresDeactivateCountermeasure(id: $id, slot: $slot)
}
    `;
export type CountermeasuresDeactivateCountermeasureMutationFn = ApolloReactCommon.MutationFunction<CountermeasuresDeactivateCountermeasureMutation, CountermeasuresDeactivateCountermeasureMutationVariables>;

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
export function useCountermeasuresDeactivateCountermeasureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CountermeasuresDeactivateCountermeasureMutation, CountermeasuresDeactivateCountermeasureMutationVariables>) {
        return ApolloReactHooks.useMutation<CountermeasuresDeactivateCountermeasureMutation, CountermeasuresDeactivateCountermeasureMutationVariables>(CountermeasuresDeactivateCountermeasureDocument, baseOptions);
      }
export type CountermeasuresDeactivateCountermeasureMutationHookResult = ReturnType<typeof useCountermeasuresDeactivateCountermeasureMutation>;
export type CountermeasuresDeactivateCountermeasureMutationResult = ApolloReactCommon.MutationResult<CountermeasuresDeactivateCountermeasureMutation>;
export type CountermeasuresDeactivateCountermeasureMutationOptions = ApolloReactCommon.BaseMutationOptions<CountermeasuresDeactivateCountermeasureMutation, CountermeasuresDeactivateCountermeasureMutationVariables>;
export const CountermeasuresLaunchCountermeasureDocument = gql`
    mutation CountermeasuresLaunchCountermeasure($id: ID!, $slot: CountermeasureSlotEnum!) {
  countermeasuresLaunchCountermeasure(id: $id, slot: $slot)
}
    `;
export type CountermeasuresLaunchCountermeasureMutationFn = ApolloReactCommon.MutationFunction<CountermeasuresLaunchCountermeasureMutation, CountermeasuresLaunchCountermeasureMutationVariables>;

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
export function useCountermeasuresLaunchCountermeasureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CountermeasuresLaunchCountermeasureMutation, CountermeasuresLaunchCountermeasureMutationVariables>) {
        return ApolloReactHooks.useMutation<CountermeasuresLaunchCountermeasureMutation, CountermeasuresLaunchCountermeasureMutationVariables>(CountermeasuresLaunchCountermeasureDocument, baseOptions);
      }
export type CountermeasuresLaunchCountermeasureMutationHookResult = ReturnType<typeof useCountermeasuresLaunchCountermeasureMutation>;
export type CountermeasuresLaunchCountermeasureMutationResult = ApolloReactCommon.MutationResult<CountermeasuresLaunchCountermeasureMutation>;
export type CountermeasuresLaunchCountermeasureMutationOptions = ApolloReactCommon.BaseMutationOptions<CountermeasuresLaunchCountermeasureMutation, CountermeasuresLaunchCountermeasureMutationVariables>;
export const CountermeasuresLaunchUnlockedCountermeasuresDocument = gql`
    mutation CountermeasuresLaunchUnlockedCountermeasures($id: ID!) {
  countermeasuresLaunchUnlockedCountermeasures(id: $id)
}
    `;
export type CountermeasuresLaunchUnlockedCountermeasuresMutationFn = ApolloReactCommon.MutationFunction<CountermeasuresLaunchUnlockedCountermeasuresMutation, CountermeasuresLaunchUnlockedCountermeasuresMutationVariables>;

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
export function useCountermeasuresLaunchUnlockedCountermeasuresMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CountermeasuresLaunchUnlockedCountermeasuresMutation, CountermeasuresLaunchUnlockedCountermeasuresMutationVariables>) {
        return ApolloReactHooks.useMutation<CountermeasuresLaunchUnlockedCountermeasuresMutation, CountermeasuresLaunchUnlockedCountermeasuresMutationVariables>(CountermeasuresLaunchUnlockedCountermeasuresDocument, baseOptions);
      }
export type CountermeasuresLaunchUnlockedCountermeasuresMutationHookResult = ReturnType<typeof useCountermeasuresLaunchUnlockedCountermeasuresMutation>;
export type CountermeasuresLaunchUnlockedCountermeasuresMutationResult = ApolloReactCommon.MutationResult<CountermeasuresLaunchUnlockedCountermeasuresMutation>;
export type CountermeasuresLaunchUnlockedCountermeasuresMutationOptions = ApolloReactCommon.BaseMutationOptions<CountermeasuresLaunchUnlockedCountermeasuresMutation, CountermeasuresLaunchUnlockedCountermeasuresMutationVariables>;
export const CountermeasureRemoveCountermeasureDocument = gql`
    mutation CountermeasureRemoveCountermeasure($id: ID!, $slot: CountermeasureSlotEnum!) {
  countermeasuresRemoveCountermeasure(id: $id, slot: $slot)
}
    `;
export type CountermeasureRemoveCountermeasureMutationFn = ApolloReactCommon.MutationFunction<CountermeasureRemoveCountermeasureMutation, CountermeasureRemoveCountermeasureMutationVariables>;

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
export function useCountermeasureRemoveCountermeasureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CountermeasureRemoveCountermeasureMutation, CountermeasureRemoveCountermeasureMutationVariables>) {
        return ApolloReactHooks.useMutation<CountermeasureRemoveCountermeasureMutation, CountermeasureRemoveCountermeasureMutationVariables>(CountermeasureRemoveCountermeasureDocument, baseOptions);
      }
export type CountermeasureRemoveCountermeasureMutationHookResult = ReturnType<typeof useCountermeasureRemoveCountermeasureMutation>;
export type CountermeasureRemoveCountermeasureMutationResult = ApolloReactCommon.MutationResult<CountermeasureRemoveCountermeasureMutation>;
export type CountermeasureRemoveCountermeasureMutationOptions = ApolloReactCommon.BaseMutationOptions<CountermeasureRemoveCountermeasureMutation, CountermeasureRemoveCountermeasureMutationVariables>;
export const CountermeasuresRemoveModuleDocument = gql`
    mutation CountermeasuresRemoveModule($id: ID!, $slot: CountermeasureSlotEnum!, $moduleId: ID!) {
  countermeasuresRemoveModule(id: $id, slot: $slot, moduleId: $moduleId)
}
    `;
export type CountermeasuresRemoveModuleMutationFn = ApolloReactCommon.MutationFunction<CountermeasuresRemoveModuleMutation, CountermeasuresRemoveModuleMutationVariables>;

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
export function useCountermeasuresRemoveModuleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CountermeasuresRemoveModuleMutation, CountermeasuresRemoveModuleMutationVariables>) {
        return ApolloReactHooks.useMutation<CountermeasuresRemoveModuleMutation, CountermeasuresRemoveModuleMutationVariables>(CountermeasuresRemoveModuleDocument, baseOptions);
      }
export type CountermeasuresRemoveModuleMutationHookResult = ReturnType<typeof useCountermeasuresRemoveModuleMutation>;
export type CountermeasuresRemoveModuleMutationResult = ApolloReactCommon.MutationResult<CountermeasuresRemoveModuleMutation>;
export type CountermeasuresRemoveModuleMutationOptions = ApolloReactCommon.BaseMutationOptions<CountermeasuresRemoveModuleMutation, CountermeasuresRemoveModuleMutationVariables>;
export const CountermeasuresSetFdNoteDocument = gql`
    mutation CountermeasuresSetFDNote($id: ID!, $countermeasureId: ID!, $note: String!) {
  countermeasuresSetFDNote(id: $id, countermeasureId: $countermeasureId, note: $note)
}
    `;
export type CountermeasuresSetFdNoteMutationFn = ApolloReactCommon.MutationFunction<CountermeasuresSetFdNoteMutation, CountermeasuresSetFdNoteMutationVariables>;

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
export function useCountermeasuresSetFdNoteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CountermeasuresSetFdNoteMutation, CountermeasuresSetFdNoteMutationVariables>) {
        return ApolloReactHooks.useMutation<CountermeasuresSetFdNoteMutation, CountermeasuresSetFdNoteMutationVariables>(CountermeasuresSetFdNoteDocument, baseOptions);
      }
export type CountermeasuresSetFdNoteMutationHookResult = ReturnType<typeof useCountermeasuresSetFdNoteMutation>;
export type CountermeasuresSetFdNoteMutationResult = ApolloReactCommon.MutationResult<CountermeasuresSetFdNoteMutation>;
export type CountermeasuresSetFdNoteMutationOptions = ApolloReactCommon.BaseMutationOptions<CountermeasuresSetFdNoteMutation, CountermeasuresSetFdNoteMutationVariables>;
export const SystemsCoreEnginesDocument = gql`
    query SystemsCoreEngines($simulatorId: ID!) {
  engines(simulatorId: $simulatorId) {
    id
    speeds {
      number
    }
  }
}
    `;

/**
 * __useSystemsCoreEnginesQuery__
 *
 * To run a query within a React component, call `useSystemsCoreEnginesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemsCoreEnginesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemsCoreEnginesQuery({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useSystemsCoreEnginesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SystemsCoreEnginesQuery, SystemsCoreEnginesQueryVariables>) {
        return ApolloReactHooks.useQuery<SystemsCoreEnginesQuery, SystemsCoreEnginesQueryVariables>(SystemsCoreEnginesDocument, baseOptions);
      }
export function useSystemsCoreEnginesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SystemsCoreEnginesQuery, SystemsCoreEnginesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SystemsCoreEnginesQuery, SystemsCoreEnginesQueryVariables>(SystemsCoreEnginesDocument, baseOptions);
        }
export type SystemsCoreEnginesQueryHookResult = ReturnType<typeof useSystemsCoreEnginesQuery>;
export type SystemsCoreEnginesLazyQueryHookResult = ReturnType<typeof useSystemsCoreEnginesLazyQuery>;
export type SystemsCoreEnginesQueryResult = ApolloReactCommon.QueryResult<SystemsCoreEnginesQuery, SystemsCoreEnginesQueryVariables>;
export const SystemChangePowerDocument = gql`
    mutation SystemChangePower($systemId: ID!, $power: Int!) {
  changePower(systemId: $systemId, power: $power)
}
    `;
export type SystemChangePowerMutationFn = ApolloReactCommon.MutationFunction<SystemChangePowerMutation, SystemChangePowerMutationVariables>;

/**
 * __useSystemChangePowerMutation__
 *
 * To run a mutation, you first call `useSystemChangePowerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSystemChangePowerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [systemChangePowerMutation, { data, loading, error }] = useSystemChangePowerMutation({
 *   variables: {
 *      systemId: // value for 'systemId'
 *      power: // value for 'power'
 *   },
 * });
 */
export function useSystemChangePowerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SystemChangePowerMutation, SystemChangePowerMutationVariables>) {
        return ApolloReactHooks.useMutation<SystemChangePowerMutation, SystemChangePowerMutationVariables>(SystemChangePowerDocument, baseOptions);
      }
export type SystemChangePowerMutationHookResult = ReturnType<typeof useSystemChangePowerMutation>;
export type SystemChangePowerMutationResult = ApolloReactCommon.MutationResult<SystemChangePowerMutation>;
export type SystemChangePowerMutationOptions = ApolloReactCommon.BaseMutationOptions<SystemChangePowerMutation, SystemChangePowerMutationVariables>;
export const SystemUpgradeDocument = gql`
    mutation SystemUpgrade($systemId: ID!) {
  upgradeSystem(systemId: $systemId)
}
    `;
export type SystemUpgradeMutationFn = ApolloReactCommon.MutationFunction<SystemUpgradeMutation, SystemUpgradeMutationVariables>;

/**
 * __useSystemUpgradeMutation__
 *
 * To run a mutation, you first call `useSystemUpgradeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSystemUpgradeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [systemUpgradeMutation, { data, loading, error }] = useSystemUpgradeMutation({
 *   variables: {
 *      systemId: // value for 'systemId'
 *   },
 * });
 */
export function useSystemUpgradeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SystemUpgradeMutation, SystemUpgradeMutationVariables>) {
        return ApolloReactHooks.useMutation<SystemUpgradeMutation, SystemUpgradeMutationVariables>(SystemUpgradeDocument, baseOptions);
      }
export type SystemUpgradeMutationHookResult = ReturnType<typeof useSystemUpgradeMutation>;
export type SystemUpgradeMutationResult = ApolloReactCommon.MutationResult<SystemUpgradeMutation>;
export type SystemUpgradeMutationOptions = ApolloReactCommon.BaseMutationOptions<SystemUpgradeMutation, SystemUpgradeMutationVariables>;
export const LightingSetEffectDocument = gql`
    mutation LightingSetEffect($simulatorId: ID!, $effect: LIGHTING_ACTION!, $duration: Float!) {
  lightingSetEffect(simulatorId: $simulatorId, effect: $effect, duration: $duration)
}
    `;
export type LightingSetEffectMutationFn = ApolloReactCommon.MutationFunction<LightingSetEffectMutation, LightingSetEffectMutationVariables>;

/**
 * __useLightingSetEffectMutation__
 *
 * To run a mutation, you first call `useLightingSetEffectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLightingSetEffectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lightingSetEffectMutation, { data, loading, error }] = useLightingSetEffectMutation({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *      effect: // value for 'effect'
 *      duration: // value for 'duration'
 *   },
 * });
 */
export function useLightingSetEffectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LightingSetEffectMutation, LightingSetEffectMutationVariables>) {
        return ApolloReactHooks.useMutation<LightingSetEffectMutation, LightingSetEffectMutationVariables>(LightingSetEffectDocument, baseOptions);
      }
export type LightingSetEffectMutationHookResult = ReturnType<typeof useLightingSetEffectMutation>;
export type LightingSetEffectMutationResult = ApolloReactCommon.MutationResult<LightingSetEffectMutation>;
export type LightingSetEffectMutationOptions = ApolloReactCommon.BaseMutationOptions<LightingSetEffectMutation, LightingSetEffectMutationVariables>;
export const LightingSetIntensityDocument = gql`
    mutation LightingSetIntensity($simulatorId: ID!, $intensity: Float!) {
  lightingSetIntensity(simulatorId: $simulatorId, intensity: $intensity)
}
    `;
export type LightingSetIntensityMutationFn = ApolloReactCommon.MutationFunction<LightingSetIntensityMutation, LightingSetIntensityMutationVariables>;

/**
 * __useLightingSetIntensityMutation__
 *
 * To run a mutation, you first call `useLightingSetIntensityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLightingSetIntensityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lightingSetIntensityMutation, { data, loading, error }] = useLightingSetIntensityMutation({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *      intensity: // value for 'intensity'
 *   },
 * });
 */
export function useLightingSetIntensityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LightingSetIntensityMutation, LightingSetIntensityMutationVariables>) {
        return ApolloReactHooks.useMutation<LightingSetIntensityMutation, LightingSetIntensityMutationVariables>(LightingSetIntensityDocument, baseOptions);
      }
export type LightingSetIntensityMutationHookResult = ReturnType<typeof useLightingSetIntensityMutation>;
export type LightingSetIntensityMutationResult = ApolloReactCommon.MutationResult<LightingSetIntensityMutation>;
export type LightingSetIntensityMutationOptions = ApolloReactCommon.BaseMutationOptions<LightingSetIntensityMutation, LightingSetIntensityMutationVariables>;
export const ShakeLightsDocument = gql`
    mutation ShakeLights($simulatorId: ID!, $duration: Float!) {
  lightingShakeLights(simulatorId: $simulatorId, duration: $duration)
}
    `;
export type ShakeLightsMutationFn = ApolloReactCommon.MutationFunction<ShakeLightsMutation, ShakeLightsMutationVariables>;

/**
 * __useShakeLightsMutation__
 *
 * To run a mutation, you first call `useShakeLightsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShakeLightsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shakeLightsMutation, { data, loading, error }] = useShakeLightsMutation({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *      duration: // value for 'duration'
 *   },
 * });
 */
export function useShakeLightsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ShakeLightsMutation, ShakeLightsMutationVariables>) {
        return ApolloReactHooks.useMutation<ShakeLightsMutation, ShakeLightsMutationVariables>(ShakeLightsDocument, baseOptions);
      }
export type ShakeLightsMutationHookResult = ReturnType<typeof useShakeLightsMutation>;
export type ShakeLightsMutationResult = ApolloReactCommon.MutationResult<ShakeLightsMutation>;
export type ShakeLightsMutationOptions = ApolloReactCommon.BaseMutationOptions<ShakeLightsMutation, ShakeLightsMutationVariables>;
export const UpdateLightingDocument = gql`
    mutation UpdateLighting($id: ID!, $lighting: LightingInput!) {
  updateSimulatorLighting(id: $id, lighting: $lighting)
}
    `;
export type UpdateLightingMutationFn = ApolloReactCommon.MutationFunction<UpdateLightingMutation, UpdateLightingMutationVariables>;

/**
 * __useUpdateLightingMutation__
 *
 * To run a mutation, you first call `useUpdateLightingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLightingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLightingMutation, { data, loading, error }] = useUpdateLightingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      lighting: // value for 'lighting'
 *   },
 * });
 */
export function useUpdateLightingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateLightingMutation, UpdateLightingMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateLightingMutation, UpdateLightingMutationVariables>(UpdateLightingDocument, baseOptions);
      }
export type UpdateLightingMutationHookResult = ReturnType<typeof useUpdateLightingMutation>;
export type UpdateLightingMutationResult = ApolloReactCommon.MutationResult<UpdateLightingMutation>;
export type UpdateLightingMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateLightingMutation, UpdateLightingMutationVariables>;
export const ReactorAckWingPowerDocument = gql`
    mutation ReactorAckWingPower($id: ID!, $wing: String!, $ack: Boolean!) {
  reactorAckWingRequest(id: $id, wing: $wing, ack: $ack)
}
    `;
export type ReactorAckWingPowerMutationFn = ApolloReactCommon.MutationFunction<ReactorAckWingPowerMutation, ReactorAckWingPowerMutationVariables>;

/**
 * __useReactorAckWingPowerMutation__
 *
 * To run a mutation, you first call `useReactorAckWingPowerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactorAckWingPowerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactorAckWingPowerMutation, { data, loading, error }] = useReactorAckWingPowerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      wing: // value for 'wing'
 *      ack: // value for 'ack'
 *   },
 * });
 */
export function useReactorAckWingPowerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReactorAckWingPowerMutation, ReactorAckWingPowerMutationVariables>) {
        return ApolloReactHooks.useMutation<ReactorAckWingPowerMutation, ReactorAckWingPowerMutationVariables>(ReactorAckWingPowerDocument, baseOptions);
      }
export type ReactorAckWingPowerMutationHookResult = ReturnType<typeof useReactorAckWingPowerMutation>;
export type ReactorAckWingPowerMutationResult = ApolloReactCommon.MutationResult<ReactorAckWingPowerMutation>;
export type ReactorAckWingPowerMutationOptions = ApolloReactCommon.BaseMutationOptions<ReactorAckWingPowerMutation, ReactorAckWingPowerMutationVariables>;
export const BatteryChargeLevelDocument = gql`
    mutation BatteryChargeLevel($id: ID!, $e: Float!) {
  reactorBatteryChargeLevel(id: $id, level: $e)
}
    `;
export type BatteryChargeLevelMutationFn = ApolloReactCommon.MutationFunction<BatteryChargeLevelMutation, BatteryChargeLevelMutationVariables>;

/**
 * __useBatteryChargeLevelMutation__
 *
 * To run a mutation, you first call `useBatteryChargeLevelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBatteryChargeLevelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [batteryChargeLevelMutation, { data, loading, error }] = useBatteryChargeLevelMutation({
 *   variables: {
 *      id: // value for 'id'
 *      e: // value for 'e'
 *   },
 * });
 */
export function useBatteryChargeLevelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<BatteryChargeLevelMutation, BatteryChargeLevelMutationVariables>) {
        return ApolloReactHooks.useMutation<BatteryChargeLevelMutation, BatteryChargeLevelMutationVariables>(BatteryChargeLevelDocument, baseOptions);
      }
export type BatteryChargeLevelMutationHookResult = ReturnType<typeof useBatteryChargeLevelMutation>;
export type BatteryChargeLevelMutationResult = ApolloReactCommon.MutationResult<BatteryChargeLevelMutation>;
export type BatteryChargeLevelMutationOptions = ApolloReactCommon.BaseMutationOptions<BatteryChargeLevelMutation, BatteryChargeLevelMutationVariables>;
export const BatteryChargeRateDocument = gql`
    mutation BatteryChargeRate($id: ID!, $e: Float!) {
  reactorBatteryChargeRate(id: $id, rate: $e)
}
    `;
export type BatteryChargeRateMutationFn = ApolloReactCommon.MutationFunction<BatteryChargeRateMutation, BatteryChargeRateMutationVariables>;

/**
 * __useBatteryChargeRateMutation__
 *
 * To run a mutation, you first call `useBatteryChargeRateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBatteryChargeRateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [batteryChargeRateMutation, { data, loading, error }] = useBatteryChargeRateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      e: // value for 'e'
 *   },
 * });
 */
export function useBatteryChargeRateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<BatteryChargeRateMutation, BatteryChargeRateMutationVariables>) {
        return ApolloReactHooks.useMutation<BatteryChargeRateMutation, BatteryChargeRateMutationVariables>(BatteryChargeRateDocument, baseOptions);
      }
export type BatteryChargeRateMutationHookResult = ReturnType<typeof useBatteryChargeRateMutation>;
export type BatteryChargeRateMutationResult = ApolloReactCommon.MutationResult<BatteryChargeRateMutation>;
export type BatteryChargeRateMutationOptions = ApolloReactCommon.BaseMutationOptions<BatteryChargeRateMutation, BatteryChargeRateMutationVariables>;
export const SetDilithiumRateDocument = gql`
    mutation SetDilithiumRate($id: ID!, $rate: Float!) {
  setDilithiumStressRate(id: $id, rate: $rate)
}
    `;
export type SetDilithiumRateMutationFn = ApolloReactCommon.MutationFunction<SetDilithiumRateMutation, SetDilithiumRateMutationVariables>;

/**
 * __useSetDilithiumRateMutation__
 *
 * To run a mutation, you first call `useSetDilithiumRateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDilithiumRateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDilithiumRateMutation, { data, loading, error }] = useSetDilithiumRateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      rate: // value for 'rate'
 *   },
 * });
 */
export function useSetDilithiumRateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetDilithiumRateMutation, SetDilithiumRateMutationVariables>) {
        return ApolloReactHooks.useMutation<SetDilithiumRateMutation, SetDilithiumRateMutationVariables>(SetDilithiumRateDocument, baseOptions);
      }
export type SetDilithiumRateMutationHookResult = ReturnType<typeof useSetDilithiumRateMutation>;
export type SetDilithiumRateMutationResult = ApolloReactCommon.MutationResult<SetDilithiumRateMutation>;
export type SetDilithiumRateMutationOptions = ApolloReactCommon.BaseMutationOptions<SetDilithiumRateMutation, SetDilithiumRateMutationVariables>;
export const ReactorDockingDocument = gql`
    subscription ReactorDocking($simulatorId: ID) {
  simulatorsUpdate(simulatorId: $simulatorId) {
    id
    ship {
      clamps
      ramps
      airlock
      legs
    }
  }
}
    `;

/**
 * __useReactorDockingSubscription__
 *
 * To run a query within a React component, call `useReactorDockingSubscription` and pass it any options that fit your needs.
 * When your component renders, `useReactorDockingSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReactorDockingSubscription({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useReactorDockingSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<ReactorDockingSubscription, ReactorDockingSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<ReactorDockingSubscription, ReactorDockingSubscriptionVariables>(ReactorDockingDocument, baseOptions);
      }
export type ReactorDockingSubscriptionHookResult = ReturnType<typeof useReactorDockingSubscription>;
export type ReactorDockingSubscriptionResult = ApolloReactCommon.SubscriptionResult<ReactorDockingSubscription>;
export const FluxDilithiumDocument = gql`
    mutation FluxDilithium($id: ID!) {
  fluxDilithiumStress(id: $id)
}
    `;
export type FluxDilithiumMutationFn = ApolloReactCommon.MutationFunction<FluxDilithiumMutation, FluxDilithiumMutationVariables>;

/**
 * __useFluxDilithiumMutation__
 *
 * To run a mutation, you first call `useFluxDilithiumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFluxDilithiumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fluxDilithiumMutation, { data, loading, error }] = useFluxDilithiumMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFluxDilithiumMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FluxDilithiumMutation, FluxDilithiumMutationVariables>) {
        return ApolloReactHooks.useMutation<FluxDilithiumMutation, FluxDilithiumMutationVariables>(FluxDilithiumDocument, baseOptions);
      }
export type FluxDilithiumMutationHookResult = ReturnType<typeof useFluxDilithiumMutation>;
export type FluxDilithiumMutationResult = ApolloReactCommon.MutationResult<FluxDilithiumMutation>;
export type FluxDilithiumMutationOptions = ApolloReactCommon.BaseMutationOptions<FluxDilithiumMutation, FluxDilithiumMutationVariables>;
export const ReactorPowerDocument = gql`
    subscription ReactorPower($simulatorId: ID) {
  systemsUpdate(simulatorId: $simulatorId, power: true) {
    id
    name
    power {
      power
    }
  }
}
    `;

/**
 * __useReactorPowerSubscription__
 *
 * To run a query within a React component, call `useReactorPowerSubscription` and pass it any options that fit your needs.
 * When your component renders, `useReactorPowerSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReactorPowerSubscription({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useReactorPowerSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<ReactorPowerSubscription, ReactorPowerSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<ReactorPowerSubscription, ReactorPowerSubscriptionVariables>(ReactorPowerDocument, baseOptions);
      }
export type ReactorPowerSubscriptionHookResult = ReturnType<typeof useReactorPowerSubscription>;
export type ReactorPowerSubscriptionResult = ApolloReactCommon.SubscriptionResult<ReactorPowerSubscription>;
export const ReactorCoolDocument = gql`
    mutation ReactorCool($id: ID!, $state: Boolean) {
  engineCool(id: $id, state: $state)
}
    `;
export type ReactorCoolMutationFn = ApolloReactCommon.MutationFunction<ReactorCoolMutation, ReactorCoolMutationVariables>;

/**
 * __useReactorCoolMutation__
 *
 * To run a mutation, you first call `useReactorCoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactorCoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactorCoolMutation, { data, loading, error }] = useReactorCoolMutation({
 *   variables: {
 *      id: // value for 'id'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useReactorCoolMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReactorCoolMutation, ReactorCoolMutationVariables>) {
        return ApolloReactHooks.useMutation<ReactorCoolMutation, ReactorCoolMutationVariables>(ReactorCoolDocument, baseOptions);
      }
export type ReactorCoolMutationHookResult = ReturnType<typeof useReactorCoolMutation>;
export type ReactorCoolMutationResult = ApolloReactCommon.MutationResult<ReactorCoolMutation>;
export type ReactorCoolMutationOptions = ApolloReactCommon.BaseMutationOptions<ReactorCoolMutation, ReactorCoolMutationVariables>;
export const ReactorHeatDocument = gql`
    mutation ReactorHeat($id: ID!, $heat: Float) {
  addHeat(id: $id, heat: $heat)
}
    `;
export type ReactorHeatMutationFn = ApolloReactCommon.MutationFunction<ReactorHeatMutation, ReactorHeatMutationVariables>;

/**
 * __useReactorHeatMutation__
 *
 * To run a mutation, you first call `useReactorHeatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactorHeatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactorHeatMutation, { data, loading, error }] = useReactorHeatMutation({
 *   variables: {
 *      id: // value for 'id'
 *      heat: // value for 'heat'
 *   },
 * });
 */
export function useReactorHeatMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReactorHeatMutation, ReactorHeatMutationVariables>) {
        return ApolloReactHooks.useMutation<ReactorHeatMutation, ReactorHeatMutationVariables>(ReactorHeatDocument, baseOptions);
      }
export type ReactorHeatMutationHookResult = ReturnType<typeof useReactorHeatMutation>;
export type ReactorHeatMutationResult = ApolloReactCommon.MutationResult<ReactorHeatMutation>;
export type ReactorHeatMutationOptions = ApolloReactCommon.BaseMutationOptions<ReactorHeatMutation, ReactorHeatMutationVariables>;
export const ReactorSetHeatRateDocument = gql`
    mutation ReactorSetHeatRate($id: ID!, $rate: Float!) {
  setHeatRate(id: $id, rate: $rate)
}
    `;
export type ReactorSetHeatRateMutationFn = ApolloReactCommon.MutationFunction<ReactorSetHeatRateMutation, ReactorSetHeatRateMutationVariables>;

/**
 * __useReactorSetHeatRateMutation__
 *
 * To run a mutation, you first call `useReactorSetHeatRateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactorSetHeatRateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactorSetHeatRateMutation, { data, loading, error }] = useReactorSetHeatRateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      rate: // value for 'rate'
 *   },
 * });
 */
export function useReactorSetHeatRateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReactorSetHeatRateMutation, ReactorSetHeatRateMutationVariables>) {
        return ApolloReactHooks.useMutation<ReactorSetHeatRateMutation, ReactorSetHeatRateMutationVariables>(ReactorSetHeatRateDocument, baseOptions);
      }
export type ReactorSetHeatRateMutationHookResult = ReturnType<typeof useReactorSetHeatRateMutation>;
export type ReactorSetHeatRateMutationResult = ApolloReactCommon.MutationResult<ReactorSetHeatRateMutation>;
export type ReactorSetHeatRateMutationOptions = ApolloReactCommon.BaseMutationOptions<ReactorSetHeatRateMutation, ReactorSetHeatRateMutationVariables>;
export const ReactorPowerLevelDocument = gql`
    mutation ReactorPowerLevel($id: ID!, $e: Int!) {
  reactorChangeOutput(id: $id, output: $e)
}
    `;
export type ReactorPowerLevelMutationFn = ApolloReactCommon.MutationFunction<ReactorPowerLevelMutation, ReactorPowerLevelMutationVariables>;

/**
 * __useReactorPowerLevelMutation__
 *
 * To run a mutation, you first call `useReactorPowerLevelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactorPowerLevelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactorPowerLevelMutation, { data, loading, error }] = useReactorPowerLevelMutation({
 *   variables: {
 *      id: // value for 'id'
 *      e: // value for 'e'
 *   },
 * });
 */
export function useReactorPowerLevelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReactorPowerLevelMutation, ReactorPowerLevelMutationVariables>) {
        return ApolloReactHooks.useMutation<ReactorPowerLevelMutation, ReactorPowerLevelMutationVariables>(ReactorPowerLevelDocument, baseOptions);
      }
export type ReactorPowerLevelMutationHookResult = ReturnType<typeof useReactorPowerLevelMutation>;
export type ReactorPowerLevelMutationResult = ApolloReactCommon.MutationResult<ReactorPowerLevelMutation>;
export type ReactorPowerLevelMutationOptions = ApolloReactCommon.BaseMutationOptions<ReactorPowerLevelMutation, ReactorPowerLevelMutationVariables>;
export const ReactorsDocument = gql`
    subscription Reactors($simulatorId: ID!) {
  reactorUpdate(simulatorId: $simulatorId) {
    id
    type
    name
    heat
    heatRate
    model
    coolant
    damage {
      damaged
    }
    ejected
    externalPower
    efficiency
    efficiencies {
      label
      color
      efficiency
    }
    displayName
    powerOutput
    batteryChargeRate
    batteryChargeLevel
    depletion
    alphaLevel
    betaLevel
    alphaTarget
    betaTarget
    dilithiumRate
    hasWings
    leftWingPower
    leftWingRequest
    leftWingRequested
    rightWingPower
    rightWingRequest
    rightWingRequested
  }
}
    `;

/**
 * __useReactorsSubscription__
 *
 * To run a query within a React component, call `useReactorsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useReactorsSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReactorsSubscription({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useReactorsSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<ReactorsSubscription, ReactorsSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<ReactorsSubscription, ReactorsSubscriptionVariables>(ReactorsDocument, baseOptions);
      }
export type ReactorsSubscriptionHookResult = ReturnType<typeof useReactorsSubscription>;
export type ReactorsSubscriptionResult = ApolloReactCommon.SubscriptionResult<ReactorsSubscription>;
export const ReactorRequestWingPowerDocument = gql`
    mutation ReactorRequestWingPower($id: ID!, $wing: String!, $power: Int!) {
  reactorRequestWingPower(id: $id, wing: $wing, power: $power)
}
    `;
export type ReactorRequestWingPowerMutationFn = ApolloReactCommon.MutationFunction<ReactorRequestWingPowerMutation, ReactorRequestWingPowerMutationVariables>;

/**
 * __useReactorRequestWingPowerMutation__
 *
 * To run a mutation, you first call `useReactorRequestWingPowerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactorRequestWingPowerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactorRequestWingPowerMutation, { data, loading, error }] = useReactorRequestWingPowerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      wing: // value for 'wing'
 *      power: // value for 'power'
 *   },
 * });
 */
export function useReactorRequestWingPowerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReactorRequestWingPowerMutation, ReactorRequestWingPowerMutationVariables>) {
        return ApolloReactHooks.useMutation<ReactorRequestWingPowerMutation, ReactorRequestWingPowerMutationVariables>(ReactorRequestWingPowerDocument, baseOptions);
      }
export type ReactorRequestWingPowerMutationHookResult = ReturnType<typeof useReactorRequestWingPowerMutation>;
export type ReactorRequestWingPowerMutationResult = ApolloReactCommon.MutationResult<ReactorRequestWingPowerMutation>;
export type ReactorRequestWingPowerMutationOptions = ApolloReactCommon.BaseMutationOptions<ReactorRequestWingPowerMutation, ReactorRequestWingPowerMutationVariables>;
export const ReactorSetEfficiencyDocument = gql`
    mutation ReactorSetEfficiency($id: ID!, $e: Float) {
  reactorChangeEfficiency(id: $id, efficiency: $e)
}
    `;
export type ReactorSetEfficiencyMutationFn = ApolloReactCommon.MutationFunction<ReactorSetEfficiencyMutation, ReactorSetEfficiencyMutationVariables>;

/**
 * __useReactorSetEfficiencyMutation__
 *
 * To run a mutation, you first call `useReactorSetEfficiencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactorSetEfficiencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactorSetEfficiencyMutation, { data, loading, error }] = useReactorSetEfficiencyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      e: // value for 'e'
 *   },
 * });
 */
export function useReactorSetEfficiencyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReactorSetEfficiencyMutation, ReactorSetEfficiencyMutationVariables>) {
        return ApolloReactHooks.useMutation<ReactorSetEfficiencyMutation, ReactorSetEfficiencyMutationVariables>(ReactorSetEfficiencyDocument, baseOptions);
      }
export type ReactorSetEfficiencyMutationHookResult = ReturnType<typeof useReactorSetEfficiencyMutation>;
export type ReactorSetEfficiencyMutationResult = ApolloReactCommon.MutationResult<ReactorSetEfficiencyMutation>;
export type ReactorSetEfficiencyMutationOptions = ApolloReactCommon.BaseMutationOptions<ReactorSetEfficiencyMutation, ReactorSetEfficiencyMutationVariables>;
export const ReactorSetWingPowerDocument = gql`
    mutation ReactorSetWingPower($id: ID!, $wing: String!, $power: Int!) {
  reactorSetWingPower(id: $id, wing: $wing, power: $power)
}
    `;
export type ReactorSetWingPowerMutationFn = ApolloReactCommon.MutationFunction<ReactorSetWingPowerMutation, ReactorSetWingPowerMutationVariables>;

/**
 * __useReactorSetWingPowerMutation__
 *
 * To run a mutation, you first call `useReactorSetWingPowerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactorSetWingPowerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactorSetWingPowerMutation, { data, loading, error }] = useReactorSetWingPowerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      wing: // value for 'wing'
 *      power: // value for 'power'
 *   },
 * });
 */
export function useReactorSetWingPowerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReactorSetWingPowerMutation, ReactorSetWingPowerMutationVariables>) {
        return ApolloReactHooks.useMutation<ReactorSetWingPowerMutation, ReactorSetWingPowerMutationVariables>(ReactorSetWingPowerDocument, baseOptions);
      }
export type ReactorSetWingPowerMutationHookResult = ReturnType<typeof useReactorSetWingPowerMutation>;
export type ReactorSetWingPowerMutationResult = ApolloReactCommon.MutationResult<ReactorSetWingPowerMutation>;
export type ReactorSetWingPowerMutationOptions = ApolloReactCommon.BaseMutationOptions<ReactorSetWingPowerMutation, ReactorSetWingPowerMutationVariables>;
export const SensorsPingSubDocument = gql`
    subscription SensorsPingSub($sensorsId: ID!) {
  sensorsPing(sensorId: $sensorsId)
}
    `;

/**
 * __useSensorsPingSubSubscription__
 *
 * To run a query within a React component, call `useSensorsPingSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSensorsPingSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSensorsPingSubSubscription({
 *   variables: {
 *      sensorsId: // value for 'sensorsId'
 *   },
 * });
 */
export function useSensorsPingSubSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SensorsPingSubSubscription, SensorsPingSubSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SensorsPingSubSubscription, SensorsPingSubSubscriptionVariables>(SensorsPingSubDocument, baseOptions);
      }
export type SensorsPingSubSubscriptionHookResult = ReturnType<typeof useSensorsPingSubSubscription>;
export type SensorsPingSubSubscriptionResult = ApolloReactCommon.SubscriptionResult<SensorsPingSubSubscription>;
export const SensorsProbeDataDocument = gql`
    mutation SensorsProbeData($id: ID!, $data: String!, $flash: Boolean) {
  probeProcessedData(id: $id, data: $data, flash: $flash)
}
    `;
export type SensorsProbeDataMutationFn = ApolloReactCommon.MutationFunction<SensorsProbeDataMutation, SensorsProbeDataMutationVariables>;

/**
 * __useSensorsProbeDataMutation__
 *
 * To run a mutation, you first call `useSensorsProbeDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSensorsProbeDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sensorsProbeDataMutation, { data, loading, error }] = useSensorsProbeDataMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *      flash: // value for 'flash'
 *   },
 * });
 */
export function useSensorsProbeDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SensorsProbeDataMutation, SensorsProbeDataMutationVariables>) {
        return ApolloReactHooks.useMutation<SensorsProbeDataMutation, SensorsProbeDataMutationVariables>(SensorsProbeDataDocument, baseOptions);
      }
export type SensorsProbeDataMutationHookResult = ReturnType<typeof useSensorsProbeDataMutation>;
export type SensorsProbeDataMutationResult = ApolloReactCommon.MutationResult<SensorsProbeDataMutation>;
export type SensorsProbeDataMutationOptions = ApolloReactCommon.BaseMutationOptions<SensorsProbeDataMutation, SensorsProbeDataMutationVariables>;
export const SensorsProcessedDataDocument = gql`
    mutation SensorsProcessedData($id: ID, $data: String!, $flash: Boolean) {
  processedData(id: $id, data: $data, flash: $flash)
}
    `;
export type SensorsProcessedDataMutationFn = ApolloReactCommon.MutationFunction<SensorsProcessedDataMutation, SensorsProcessedDataMutationVariables>;

/**
 * __useSensorsProcessedDataMutation__
 *
 * To run a mutation, you first call `useSensorsProcessedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSensorsProcessedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sensorsProcessedDataMutation, { data, loading, error }] = useSensorsProcessedDataMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *      flash: // value for 'flash'
 *   },
 * });
 */
export function useSensorsProcessedDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SensorsProcessedDataMutation, SensorsProcessedDataMutationVariables>) {
        return ApolloReactHooks.useMutation<SensorsProcessedDataMutation, SensorsProcessedDataMutationVariables>(SensorsProcessedDataDocument, baseOptions);
      }
export type SensorsProcessedDataMutationHookResult = ReturnType<typeof useSensorsProcessedDataMutation>;
export type SensorsProcessedDataMutationResult = ApolloReactCommon.MutationResult<SensorsProcessedDataMutation>;
export type SensorsProcessedDataMutationOptions = ApolloReactCommon.BaseMutationOptions<SensorsProcessedDataMutation, SensorsProcessedDataMutationVariables>;
export const SensorsRemoveProcessedDataDocument = gql`
    mutation SensorsRemoveProcessedData($id: ID!, $time: String!) {
  removeProcessedData(id: $id, time: $time)
}
    `;
export type SensorsRemoveProcessedDataMutationFn = ApolloReactCommon.MutationFunction<SensorsRemoveProcessedDataMutation, SensorsRemoveProcessedDataMutationVariables>;

/**
 * __useSensorsRemoveProcessedDataMutation__
 *
 * To run a mutation, you first call `useSensorsRemoveProcessedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSensorsRemoveProcessedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sensorsRemoveProcessedDataMutation, { data, loading, error }] = useSensorsRemoveProcessedDataMutation({
 *   variables: {
 *      id: // value for 'id'
 *      time: // value for 'time'
 *   },
 * });
 */
export function useSensorsRemoveProcessedDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SensorsRemoveProcessedDataMutation, SensorsRemoveProcessedDataMutationVariables>) {
        return ApolloReactHooks.useMutation<SensorsRemoveProcessedDataMutation, SensorsRemoveProcessedDataMutationVariables>(SensorsRemoveProcessedDataDocument, baseOptions);
      }
export type SensorsRemoveProcessedDataMutationHookResult = ReturnType<typeof useSensorsRemoveProcessedDataMutation>;
export type SensorsRemoveProcessedDataMutationResult = ApolloReactCommon.MutationResult<SensorsRemoveProcessedDataMutation>;
export type SensorsRemoveProcessedDataMutationOptions = ApolloReactCommon.BaseMutationOptions<SensorsRemoveProcessedDataMutation, SensorsRemoveProcessedDataMutationVariables>;
export const SensorsSendPingDocument = gql`
    mutation SensorsSendPing($id: ID!) {
  pingSensors(id: $id)
}
    `;
export type SensorsSendPingMutationFn = ApolloReactCommon.MutationFunction<SensorsSendPingMutation, SensorsSendPingMutationVariables>;

/**
 * __useSensorsSendPingMutation__
 *
 * To run a mutation, you first call `useSensorsSendPingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSensorsSendPingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sensorsSendPingMutation, { data, loading, error }] = useSensorsSendPingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSensorsSendPingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SensorsSendPingMutation, SensorsSendPingMutationVariables>) {
        return ApolloReactHooks.useMutation<SensorsSendPingMutation, SensorsSendPingMutationVariables>(SensorsSendPingDocument, baseOptions);
      }
export type SensorsSendPingMutationHookResult = ReturnType<typeof useSensorsSendPingMutation>;
export type SensorsSendPingMutationResult = ApolloReactCommon.MutationResult<SensorsSendPingMutation>;
export type SensorsSendPingMutationOptions = ApolloReactCommon.BaseMutationOptions<SensorsSendPingMutation, SensorsSendPingMutationVariables>;
export const SensorScanResponseDocument = gql`
    mutation SensorScanResponse($id: ID!, $scan: SensorScanInput!) {
  updateSensorScan(id: $id, scan: $scan)
}
    `;
export type SensorScanResponseMutationFn = ApolloReactCommon.MutationFunction<SensorScanResponseMutation, SensorScanResponseMutationVariables>;

/**
 * __useSensorScanResponseMutation__
 *
 * To run a mutation, you first call `useSensorScanResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSensorScanResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sensorScanResponseMutation, { data, loading, error }] = useSensorScanResponseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      scan: // value for 'scan'
 *   },
 * });
 */
export function useSensorScanResponseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SensorScanResponseMutation, SensorScanResponseMutationVariables>) {
        return ApolloReactHooks.useMutation<SensorScanResponseMutation, SensorScanResponseMutationVariables>(SensorScanResponseDocument, baseOptions);
      }
export type SensorScanResponseMutationHookResult = ReturnType<typeof useSensorScanResponseMutation>;
export type SensorScanResponseMutationResult = ApolloReactCommon.MutationResult<SensorScanResponseMutation>;
export type SensorScanResponseMutationOptions = ApolloReactCommon.BaseMutationOptions<SensorScanResponseMutation, SensorScanResponseMutationVariables>;
export const SensorScanResultDocument = gql`
    mutation SensorScanResult($id: ID!, $result: String!) {
  sensorScanResult(id: $id, result: $result)
}
    `;
export type SensorScanResultMutationFn = ApolloReactCommon.MutationFunction<SensorScanResultMutation, SensorScanResultMutationVariables>;

/**
 * __useSensorScanResultMutation__
 *
 * To run a mutation, you first call `useSensorScanResultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSensorScanResultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sensorScanResultMutation, { data, loading, error }] = useSensorScanResultMutation({
 *   variables: {
 *      id: // value for 'id'
 *      result: // value for 'result'
 *   },
 * });
 */
export function useSensorScanResultMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SensorScanResultMutation, SensorScanResultMutationVariables>) {
        return ApolloReactHooks.useMutation<SensorScanResultMutation, SensorScanResultMutationVariables>(SensorScanResultDocument, baseOptions);
      }
export type SensorScanResultMutationHookResult = ReturnType<typeof useSensorScanResultMutation>;
export type SensorScanResultMutationResult = ApolloReactCommon.MutationResult<SensorScanResultMutation>;
export type SensorScanResultMutationOptions = ApolloReactCommon.BaseMutationOptions<SensorScanResultMutation, SensorScanResultMutationVariables>;
export const SensorsProbesDocument = gql`
    query SensorsProbes($simulatorId: ID!) {
  probes(simulatorId: $simulatorId) {
    id
  }
}
    `;

/**
 * __useSensorsProbesQuery__
 *
 * To run a query within a React component, call `useSensorsProbesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSensorsProbesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSensorsProbesQuery({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useSensorsProbesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SensorsProbesQuery, SensorsProbesQueryVariables>) {
        return ApolloReactHooks.useQuery<SensorsProbesQuery, SensorsProbesQueryVariables>(SensorsProbesDocument, baseOptions);
      }
export function useSensorsProbesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SensorsProbesQuery, SensorsProbesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SensorsProbesQuery, SensorsProbesQueryVariables>(SensorsProbesDocument, baseOptions);
        }
export type SensorsProbesQueryHookResult = ReturnType<typeof useSensorsProbesQuery>;
export type SensorsProbesLazyQueryHookResult = ReturnType<typeof useSensorsProbesLazyQuery>;
export type SensorsProbesQueryResult = ApolloReactCommon.QueryResult<SensorsProbesQuery, SensorsProbesQueryVariables>;
export const SensorsDocument = gql`
    subscription Sensors($simulatorId: ID!, $domain: String) {
  sensorsUpdate(simulatorId: $simulatorId, domain: $domain) {
    id
    scanResults
    scanRequest
    scanning
    pings
    pingMode
    timeSincePing
    domain
    processedData {
      value
      time
    }
    interference
    movement {
      x
      y
      z
    }
    segments {
      ring
      line
      state
    }
    presetAnswers {
      label
      value
    }
    history
    scans {
      id
      request
      mode
      location
      response
      scanning
      timestamp
      cancelled
    }
    damage {
      damaged
    }
    power {
      power
      powerLevels
    }
  }
}
    `;

/**
 * __useSensorsSubscription__
 *
 * To run a query within a React component, call `useSensorsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSensorsSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSensorsSubscription({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *      domain: // value for 'domain'
 *   },
 * });
 */
export function useSensorsSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SensorsSubscription, SensorsSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SensorsSubscription, SensorsSubscriptionVariables>(SensorsDocument, baseOptions);
      }
export type SensorsSubscriptionHookResult = ReturnType<typeof useSensorsSubscription>;
export type SensorsSubscriptionResult = ApolloReactCommon.SubscriptionResult<SensorsSubscription>;
export const SetCalculatedTargetDocument = gql`
    mutation SetCalculatedTarget($simulatorId: ID, $coordinates: CoordinatesInput!, $contactId: ID) {
  setTargetingCalculatedTarget(simulatorId: $simulatorId, coordinates: $coordinates, contactId: $contactId)
}
    `;
export type SetCalculatedTargetMutationFn = ApolloReactCommon.MutationFunction<SetCalculatedTargetMutation, SetCalculatedTargetMutationVariables>;

/**
 * __useSetCalculatedTargetMutation__
 *
 * To run a mutation, you first call `useSetCalculatedTargetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCalculatedTargetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCalculatedTargetMutation, { data, loading, error }] = useSetCalculatedTargetMutation({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *      coordinates: // value for 'coordinates'
 *      contactId: // value for 'contactId'
 *   },
 * });
 */
export function useSetCalculatedTargetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetCalculatedTargetMutation, SetCalculatedTargetMutationVariables>) {
        return ApolloReactHooks.useMutation<SetCalculatedTargetMutation, SetCalculatedTargetMutationVariables>(SetCalculatedTargetDocument, baseOptions);
      }
export type SetCalculatedTargetMutationHookResult = ReturnType<typeof useSetCalculatedTargetMutation>;
export type SetCalculatedTargetMutationResult = ApolloReactCommon.MutationResult<SetCalculatedTargetMutation>;
export type SetCalculatedTargetMutationOptions = ApolloReactCommon.BaseMutationOptions<SetCalculatedTargetMutation, SetCalculatedTargetMutationVariables>;
export const SensorsSetHistoryDocument = gql`
    mutation SensorsSetHistory($id: ID!, $history: Boolean!) {
  setSensorsHistory(id: $id, history: $history)
}
    `;
export type SensorsSetHistoryMutationFn = ApolloReactCommon.MutationFunction<SensorsSetHistoryMutation, SensorsSetHistoryMutationVariables>;

/**
 * __useSensorsSetHistoryMutation__
 *
 * To run a mutation, you first call `useSensorsSetHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSensorsSetHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sensorsSetHistoryMutation, { data, loading, error }] = useSensorsSetHistoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      history: // value for 'history'
 *   },
 * });
 */
export function useSensorsSetHistoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SensorsSetHistoryMutation, SensorsSetHistoryMutationVariables>) {
        return ApolloReactHooks.useMutation<SensorsSetHistoryMutation, SensorsSetHistoryMutationVariables>(SensorsSetHistoryDocument, baseOptions);
      }
export type SensorsSetHistoryMutationHookResult = ReturnType<typeof useSensorsSetHistoryMutation>;
export type SensorsSetHistoryMutationResult = ApolloReactCommon.MutationResult<SensorsSetHistoryMutation>;
export type SensorsSetHistoryMutationOptions = ApolloReactCommon.BaseMutationOptions<SensorsSetHistoryMutation, SensorsSetHistoryMutationVariables>;
export const SensorsSetPingModeDocument = gql`
    mutation SensorsSetPingMode($id: ID!, $mode: PING_MODES) {
  setSensorPingMode(id: $id, mode: $mode)
}
    `;
export type SensorsSetPingModeMutationFn = ApolloReactCommon.MutationFunction<SensorsSetPingModeMutation, SensorsSetPingModeMutationVariables>;

/**
 * __useSensorsSetPingModeMutation__
 *
 * To run a mutation, you first call `useSensorsSetPingModeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSensorsSetPingModeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sensorsSetPingModeMutation, { data, loading, error }] = useSensorsSetPingModeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      mode: // value for 'mode'
 *   },
 * });
 */
export function useSensorsSetPingModeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SensorsSetPingModeMutation, SensorsSetPingModeMutationVariables>) {
        return ApolloReactHooks.useMutation<SensorsSetPingModeMutation, SensorsSetPingModeMutationVariables>(SensorsSetPingModeDocument, baseOptions);
      }
export type SensorsSetPingModeMutationHookResult = ReturnType<typeof useSensorsSetPingModeMutation>;
export type SensorsSetPingModeMutationResult = ApolloReactCommon.MutationResult<SensorsSetPingModeMutation>;
export type SensorsSetPingModeMutationOptions = ApolloReactCommon.BaseMutationOptions<SensorsSetPingModeMutation, SensorsSetPingModeMutationVariables>;
export const TargetingRangeDocument = gql`
    query TargetingRange($id: ID!) {
  targeting(simulatorId: $id) {
    id
    range
  }
}
    `;

/**
 * __useTargetingRangeQuery__
 *
 * To run a query within a React component, call `useTargetingRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTargetingRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTargetingRangeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTargetingRangeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TargetingRangeQuery, TargetingRangeQueryVariables>) {
        return ApolloReactHooks.useQuery<TargetingRangeQuery, TargetingRangeQueryVariables>(TargetingRangeDocument, baseOptions);
      }
export function useTargetingRangeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TargetingRangeQuery, TargetingRangeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TargetingRangeQuery, TargetingRangeQueryVariables>(TargetingRangeDocument, baseOptions);
        }
export type TargetingRangeQueryHookResult = ReturnType<typeof useTargetingRangeQuery>;
export type TargetingRangeLazyQueryHookResult = ReturnType<typeof useTargetingRangeLazyQuery>;
export type TargetingRangeQueryResult = ApolloReactCommon.QueryResult<TargetingRangeQuery, TargetingRangeQueryVariables>;
export const NewLayerDocument = gql`
    mutation NewLayer($mapId: ID!, $name: String!) {
  addTacticalMapLayer(mapId: $mapId, name: $name)
}
    `;
export type NewLayerMutationFn = ApolloReactCommon.MutationFunction<NewLayerMutation, NewLayerMutationVariables>;

/**
 * __useNewLayerMutation__
 *
 * To run a mutation, you first call `useNewLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newLayerMutation, { data, loading, error }] = useNewLayerMutation({
 *   variables: {
 *      mapId: // value for 'mapId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useNewLayerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<NewLayerMutation, NewLayerMutationVariables>) {
        return ApolloReactHooks.useMutation<NewLayerMutation, NewLayerMutationVariables>(NewLayerDocument, baseOptions);
      }
export type NewLayerMutationHookResult = ReturnType<typeof useNewLayerMutation>;
export type NewLayerMutationResult = ApolloReactCommon.MutationResult<NewLayerMutation>;
export type NewLayerMutationOptions = ApolloReactCommon.BaseMutationOptions<NewLayerMutation, NewLayerMutationVariables>;
export const AddTacticalItemDocument = gql`
    mutation AddTacticalItem($mapId: ID!, $layerId: ID!, $item: TacticalItemInput!) {
  addTacticalMapItem(mapId: $mapId, layerId: $layerId, item: $item)
}
    `;
export type AddTacticalItemMutationFn = ApolloReactCommon.MutationFunction<AddTacticalItemMutation, AddTacticalItemMutationVariables>;

/**
 * __useAddTacticalItemMutation__
 *
 * To run a mutation, you first call `useAddTacticalItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTacticalItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTacticalItemMutation, { data, loading, error }] = useAddTacticalItemMutation({
 *   variables: {
 *      mapId: // value for 'mapId'
 *      layerId: // value for 'layerId'
 *      item: // value for 'item'
 *   },
 * });
 */
export function useAddTacticalItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddTacticalItemMutation, AddTacticalItemMutationVariables>) {
        return ApolloReactHooks.useMutation<AddTacticalItemMutation, AddTacticalItemMutationVariables>(AddTacticalItemDocument, baseOptions);
      }
export type AddTacticalItemMutationHookResult = ReturnType<typeof useAddTacticalItemMutation>;
export type AddTacticalItemMutationResult = ApolloReactCommon.MutationResult<AddTacticalItemMutation>;
export type AddTacticalItemMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTacticalItemMutation, AddTacticalItemMutationVariables>;
export const AssetFoldersDocument = gql`
    subscription AssetFolders {
  assetFolderChange {
    name
    fullPath
    id
    folderPath
    objects {
      id
      name
      fullPath
      url
    }
  }
}
    `;

/**
 * __useAssetFoldersSubscription__
 *
 * To run a query within a React component, call `useAssetFoldersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAssetFoldersSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssetFoldersSubscription({
 *   variables: {
 *   },
 * });
 */
export function useAssetFoldersSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<AssetFoldersSubscription, AssetFoldersSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<AssetFoldersSubscription, AssetFoldersSubscriptionVariables>(AssetFoldersDocument, baseOptions);
      }
export type AssetFoldersSubscriptionHookResult = ReturnType<typeof useAssetFoldersSubscription>;
export type AssetFoldersSubscriptionResult = ApolloReactCommon.SubscriptionResult<AssetFoldersSubscription>;
export const AssetsAddFolderDocument = gql`
    mutation AssetsAddFolder($name: String!, $fullPath: String!, $folderPath: String!) {
  addAssetFolder(name: $name, fullPath: $fullPath, folderPath: $folderPath)
}
    `;
export type AssetsAddFolderMutationFn = ApolloReactCommon.MutationFunction<AssetsAddFolderMutation, AssetsAddFolderMutationVariables>;

/**
 * __useAssetsAddFolderMutation__
 *
 * To run a mutation, you first call `useAssetsAddFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssetsAddFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assetsAddFolderMutation, { data, loading, error }] = useAssetsAddFolderMutation({
 *   variables: {
 *      name: // value for 'name'
 *      fullPath: // value for 'fullPath'
 *      folderPath: // value for 'folderPath'
 *   },
 * });
 */
export function useAssetsAddFolderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AssetsAddFolderMutation, AssetsAddFolderMutationVariables>) {
        return ApolloReactHooks.useMutation<AssetsAddFolderMutation, AssetsAddFolderMutationVariables>(AssetsAddFolderDocument, baseOptions);
      }
export type AssetsAddFolderMutationHookResult = ReturnType<typeof useAssetsAddFolderMutation>;
export type AssetsAddFolderMutationResult = ApolloReactCommon.MutationResult<AssetsAddFolderMutation>;
export type AssetsAddFolderMutationOptions = ApolloReactCommon.BaseMutationOptions<AssetsAddFolderMutation, AssetsAddFolderMutationVariables>;
export const DuplicateTacticalDocument = gql`
    mutation DuplicateTactical($id: ID!, $name: String!) {
  duplicateTacticalMap(id: $id, name: $name)
}
    `;
export type DuplicateTacticalMutationFn = ApolloReactCommon.MutationFunction<DuplicateTacticalMutation, DuplicateTacticalMutationVariables>;

/**
 * __useDuplicateTacticalMutation__
 *
 * To run a mutation, you first call `useDuplicateTacticalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateTacticalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateTacticalMutation, { data, loading, error }] = useDuplicateTacticalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDuplicateTacticalMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DuplicateTacticalMutation, DuplicateTacticalMutationVariables>) {
        return ApolloReactHooks.useMutation<DuplicateTacticalMutation, DuplicateTacticalMutationVariables>(DuplicateTacticalDocument, baseOptions);
      }
export type DuplicateTacticalMutationHookResult = ReturnType<typeof useDuplicateTacticalMutation>;
export type DuplicateTacticalMutationResult = ApolloReactCommon.MutationResult<DuplicateTacticalMutation>;
export type DuplicateTacticalMutationOptions = ApolloReactCommon.BaseMutationOptions<DuplicateTacticalMutation, DuplicateTacticalMutationVariables>;
export const FreezeTacticalMapDocument = gql`
    mutation FreezeTacticalMap($id: ID!, $freeze: Boolean!) {
  freezeTacticalMap(id: $id, freeze: $freeze)
}
    `;
export type FreezeTacticalMapMutationFn = ApolloReactCommon.MutationFunction<FreezeTacticalMapMutation, FreezeTacticalMapMutationVariables>;

/**
 * __useFreezeTacticalMapMutation__
 *
 * To run a mutation, you first call `useFreezeTacticalMapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFreezeTacticalMapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [freezeTacticalMapMutation, { data, loading, error }] = useFreezeTacticalMapMutation({
 *   variables: {
 *      id: // value for 'id'
 *      freeze: // value for 'freeze'
 *   },
 * });
 */
export function useFreezeTacticalMapMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FreezeTacticalMapMutation, FreezeTacticalMapMutationVariables>) {
        return ApolloReactHooks.useMutation<FreezeTacticalMapMutation, FreezeTacticalMapMutationVariables>(FreezeTacticalMapDocument, baseOptions);
      }
export type FreezeTacticalMapMutationHookResult = ReturnType<typeof useFreezeTacticalMapMutation>;
export type FreezeTacticalMapMutationResult = ApolloReactCommon.MutationResult<FreezeTacticalMapMutation>;
export type FreezeTacticalMapMutationOptions = ApolloReactCommon.BaseMutationOptions<FreezeTacticalMapMutation, FreezeTacticalMapMutationVariables>;
export const NewTacticalDocument = gql`
    mutation NewTactical($name: String!) {
  newTacticalMap(name: $name)
}
    `;
export type NewTacticalMutationFn = ApolloReactCommon.MutationFunction<NewTacticalMutation, NewTacticalMutationVariables>;

/**
 * __useNewTacticalMutation__
 *
 * To run a mutation, you first call `useNewTacticalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewTacticalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newTacticalMutation, { data, loading, error }] = useNewTacticalMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useNewTacticalMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<NewTacticalMutation, NewTacticalMutationVariables>) {
        return ApolloReactHooks.useMutation<NewTacticalMutation, NewTacticalMutationVariables>(NewTacticalDocument, baseOptions);
      }
export type NewTacticalMutationHookResult = ReturnType<typeof useNewTacticalMutation>;
export type NewTacticalMutationResult = ApolloReactCommon.MutationResult<NewTacticalMutation>;
export type NewTacticalMutationOptions = ApolloReactCommon.BaseMutationOptions<NewTacticalMutation, NewTacticalMutationVariables>;
export const AssetsRemoveObjectDocument = gql`
    mutation AssetsRemoveObject($fullPath: String!) {
  removeAssetObject(fullPath: $fullPath)
}
    `;
export type AssetsRemoveObjectMutationFn = ApolloReactCommon.MutationFunction<AssetsRemoveObjectMutation, AssetsRemoveObjectMutationVariables>;

/**
 * __useAssetsRemoveObjectMutation__
 *
 * To run a mutation, you first call `useAssetsRemoveObjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssetsRemoveObjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assetsRemoveObjectMutation, { data, loading, error }] = useAssetsRemoveObjectMutation({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *   },
 * });
 */
export function useAssetsRemoveObjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AssetsRemoveObjectMutation, AssetsRemoveObjectMutationVariables>) {
        return ApolloReactHooks.useMutation<AssetsRemoveObjectMutation, AssetsRemoveObjectMutationVariables>(AssetsRemoveObjectDocument, baseOptions);
      }
export type AssetsRemoveObjectMutationHookResult = ReturnType<typeof useAssetsRemoveObjectMutation>;
export type AssetsRemoveObjectMutationResult = ApolloReactCommon.MutationResult<AssetsRemoveObjectMutation>;
export type AssetsRemoveObjectMutationOptions = ApolloReactCommon.BaseMutationOptions<AssetsRemoveObjectMutation, AssetsRemoveObjectMutationVariables>;
export const AssetsRemoveFolderDocument = gql`
    mutation AssetsRemoveFolder($fullPath: String!) {
  removeAssetFolder(fullPath: $fullPath)
}
    `;
export type AssetsRemoveFolderMutationFn = ApolloReactCommon.MutationFunction<AssetsRemoveFolderMutation, AssetsRemoveFolderMutationVariables>;

/**
 * __useAssetsRemoveFolderMutation__
 *
 * To run a mutation, you first call `useAssetsRemoveFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssetsRemoveFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assetsRemoveFolderMutation, { data, loading, error }] = useAssetsRemoveFolderMutation({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *   },
 * });
 */
export function useAssetsRemoveFolderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AssetsRemoveFolderMutation, AssetsRemoveFolderMutationVariables>) {
        return ApolloReactHooks.useMutation<AssetsRemoveFolderMutation, AssetsRemoveFolderMutationVariables>(AssetsRemoveFolderDocument, baseOptions);
      }
export type AssetsRemoveFolderMutationHookResult = ReturnType<typeof useAssetsRemoveFolderMutation>;
export type AssetsRemoveFolderMutationResult = ApolloReactCommon.MutationResult<AssetsRemoveFolderMutation>;
export type AssetsRemoveFolderMutationOptions = ApolloReactCommon.BaseMutationOptions<AssetsRemoveFolderMutation, AssetsRemoveFolderMutationVariables>;
export const RemoveLayerDocument = gql`
    mutation RemoveLayer($mapId: ID!, $layerId: ID!) {
  removeTacticalMapLayer(mapId: $mapId, layerId: $layerId)
}
    `;
export type RemoveLayerMutationFn = ApolloReactCommon.MutationFunction<RemoveLayerMutation, RemoveLayerMutationVariables>;

/**
 * __useRemoveLayerMutation__
 *
 * To run a mutation, you first call `useRemoveLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLayerMutation, { data, loading, error }] = useRemoveLayerMutation({
 *   variables: {
 *      mapId: // value for 'mapId'
 *      layerId: // value for 'layerId'
 *   },
 * });
 */
export function useRemoveLayerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveLayerMutation, RemoveLayerMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveLayerMutation, RemoveLayerMutationVariables>(RemoveLayerDocument, baseOptions);
      }
export type RemoveLayerMutationHookResult = ReturnType<typeof useRemoveLayerMutation>;
export type RemoveLayerMutationResult = ApolloReactCommon.MutationResult<RemoveLayerMutation>;
export type RemoveLayerMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveLayerMutation, RemoveLayerMutationVariables>;
export const RemoveMapDocument = gql`
    mutation RemoveMap($id: ID!) {
  removeTacticalMap(id: $id)
}
    `;
export type RemoveMapMutationFn = ApolloReactCommon.MutationFunction<RemoveMapMutation, RemoveMapMutationVariables>;

/**
 * __useRemoveMapMutation__
 *
 * To run a mutation, you first call `useRemoveMapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMapMutation, { data, loading, error }] = useRemoveMapMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveMapMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveMapMutation, RemoveMapMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveMapMutation, RemoveMapMutationVariables>(RemoveMapDocument, baseOptions);
      }
export type RemoveMapMutationHookResult = ReturnType<typeof useRemoveMapMutation>;
export type RemoveMapMutationResult = ApolloReactCommon.MutationResult<RemoveMapMutation>;
export type RemoveMapMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveMapMutation, RemoveMapMutationVariables>;
export const RemoveTacticalItemDocument = gql`
    mutation RemoveTacticalItem($mapId: ID!, $layerId: ID!, $itemId: ID!) {
  removeTacticalMapItem(mapId: $mapId, layerId: $layerId, itemId: $itemId)
}
    `;
export type RemoveTacticalItemMutationFn = ApolloReactCommon.MutationFunction<RemoveTacticalItemMutation, RemoveTacticalItemMutationVariables>;

/**
 * __useRemoveTacticalItemMutation__
 *
 * To run a mutation, you first call `useRemoveTacticalItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTacticalItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTacticalItemMutation, { data, loading, error }] = useRemoveTacticalItemMutation({
 *   variables: {
 *      mapId: // value for 'mapId'
 *      layerId: // value for 'layerId'
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useRemoveTacticalItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveTacticalItemMutation, RemoveTacticalItemMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveTacticalItemMutation, RemoveTacticalItemMutationVariables>(RemoveTacticalItemDocument, baseOptions);
      }
export type RemoveTacticalItemMutationHookResult = ReturnType<typeof useRemoveTacticalItemMutation>;
export type RemoveTacticalItemMutationResult = ApolloReactCommon.MutationResult<RemoveTacticalItemMutation>;
export type RemoveTacticalItemMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveTacticalItemMutation, RemoveTacticalItemMutationVariables>;
export const RemoveTacticalPathDocument = gql`
    mutation RemoveTacticalPath($mapId: ID!, $layerId: ID!, $pathId: ID!) {
  removeTacticalMapPath(mapId: $mapId, layerId: $layerId, pathId: $pathId)
}
    `;
export type RemoveTacticalPathMutationFn = ApolloReactCommon.MutationFunction<RemoveTacticalPathMutation, RemoveTacticalPathMutationVariables>;

/**
 * __useRemoveTacticalPathMutation__
 *
 * To run a mutation, you first call `useRemoveTacticalPathMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTacticalPathMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTacticalPathMutation, { data, loading, error }] = useRemoveTacticalPathMutation({
 *   variables: {
 *      mapId: // value for 'mapId'
 *      layerId: // value for 'layerId'
 *      pathId: // value for 'pathId'
 *   },
 * });
 */
export function useRemoveTacticalPathMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveTacticalPathMutation, RemoveTacticalPathMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveTacticalPathMutation, RemoveTacticalPathMutationVariables>(RemoveTacticalPathDocument, baseOptions);
      }
export type RemoveTacticalPathMutationHookResult = ReturnType<typeof useRemoveTacticalPathMutation>;
export type RemoveTacticalPathMutationResult = ApolloReactCommon.MutationResult<RemoveTacticalPathMutation>;
export type RemoveTacticalPathMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveTacticalPathMutation, RemoveTacticalPathMutationVariables>;
export const ReorderTacticalLayerDocument = gql`
    mutation ReorderTacticalLayer($mapId: ID!, $layer: ID!, $order: Int!) {
  reorderTacticalMapLayer(mapId: $mapId, layer: $layer, order: $order)
}
    `;
export type ReorderTacticalLayerMutationFn = ApolloReactCommon.MutationFunction<ReorderTacticalLayerMutation, ReorderTacticalLayerMutationVariables>;

/**
 * __useReorderTacticalLayerMutation__
 *
 * To run a mutation, you first call `useReorderTacticalLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderTacticalLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderTacticalLayerMutation, { data, loading, error }] = useReorderTacticalLayerMutation({
 *   variables: {
 *      mapId: // value for 'mapId'
 *      layer: // value for 'layer'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useReorderTacticalLayerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReorderTacticalLayerMutation, ReorderTacticalLayerMutationVariables>) {
        return ApolloReactHooks.useMutation<ReorderTacticalLayerMutation, ReorderTacticalLayerMutationVariables>(ReorderTacticalLayerDocument, baseOptions);
      }
export type ReorderTacticalLayerMutationHookResult = ReturnType<typeof useReorderTacticalLayerMutation>;
export type ReorderTacticalLayerMutationResult = ApolloReactCommon.MutationResult<ReorderTacticalLayerMutation>;
export type ReorderTacticalLayerMutationOptions = ApolloReactCommon.BaseMutationOptions<ReorderTacticalLayerMutation, ReorderTacticalLayerMutationVariables>;
export const TacticalMapUpdateDocument = gql`
    subscription TacticalMapUpdate($id: ID!) {
  tacticalMapUpdate(id: $id) {
    id
    name
    flight {
      id
    }
    interval
    layers {
      id
      name
      type
      items {
        id
        layerId
        font
        label
        fontSize
        fontColor
        icon
        size
        speed
        velocity {
          x
          y
        }
        location {
          x
          y
        }
        destination {
          x
          y
        }
        rotation
        opacity
        flash
        ijkl
        wasd
        thrusters
        rotationMatch
        thrusterControls {
          rotation
          reversed
          matchRotation
          up
          down
          left
          right
        }
      }
      paths {
        id
        layerId
        start {
          x
          y
        }
        end {
          x
          y
        }
        c1 {
          x
          y
        }
        c2 {
          x
          y
        }
        color
        width
        arrow
      }
      image
      color
      labels
      gridCols
      gridRows
      advance
      asset
      autoplay
      loop
      playbackSpeed
      opacity
    }
    frozen
    template
  }
}
    `;

/**
 * __useTacticalMapUpdateSubscription__
 *
 * To run a query within a React component, call `useTacticalMapUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTacticalMapUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTacticalMapUpdateSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTacticalMapUpdateSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<TacticalMapUpdateSubscription, TacticalMapUpdateSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<TacticalMapUpdateSubscription, TacticalMapUpdateSubscriptionVariables>(TacticalMapUpdateDocument, baseOptions);
      }
export type TacticalMapUpdateSubscriptionHookResult = ReturnType<typeof useTacticalMapUpdateSubscription>;
export type TacticalMapUpdateSubscriptionResult = ApolloReactCommon.SubscriptionResult<TacticalMapUpdateSubscription>;
export const TacticalMapListDocument = gql`
    subscription TacticalMapList {
  tacticalMapsUpdate {
    id
    name
    flight {
      id
    }
    template
  }
}
    `;

/**
 * __useTacticalMapListSubscription__
 *
 * To run a query within a React component, call `useTacticalMapListSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTacticalMapListSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTacticalMapListSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTacticalMapListSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<TacticalMapListSubscription, TacticalMapListSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<TacticalMapListSubscription, TacticalMapListSubscriptionVariables>(TacticalMapListDocument, baseOptions);
      }
export type TacticalMapListSubscriptionHookResult = ReturnType<typeof useTacticalMapListSubscription>;
export type TacticalMapListSubscriptionResult = ApolloReactCommon.SubscriptionResult<TacticalMapListSubscription>;
export const UpdateLayerDocument = gql`
    mutation UpdateLayer($mapId: ID!, $layer: TacticalLayerInput!) {
  updateTacticalMapLayer(mapId: $mapId, layer: $layer)
}
    `;
export type UpdateLayerMutationFn = ApolloReactCommon.MutationFunction<UpdateLayerMutation, UpdateLayerMutationVariables>;

/**
 * __useUpdateLayerMutation__
 *
 * To run a mutation, you first call `useUpdateLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLayerMutation, { data, loading, error }] = useUpdateLayerMutation({
 *   variables: {
 *      mapId: // value for 'mapId'
 *      layer: // value for 'layer'
 *   },
 * });
 */
export function useUpdateLayerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateLayerMutation, UpdateLayerMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateLayerMutation, UpdateLayerMutationVariables>(UpdateLayerDocument, baseOptions);
      }
export type UpdateLayerMutationHookResult = ReturnType<typeof useUpdateLayerMutation>;
export type UpdateLayerMutationResult = ApolloReactCommon.MutationResult<UpdateLayerMutation>;
export type UpdateLayerMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateLayerMutation, UpdateLayerMutationVariables>;
export const UpdateTacticalItemDocument = gql`
    mutation UpdateTacticalItem($mapId: ID!, $layerId: ID!, $item: TacticalItemInput!) {
  updateTacticalMapItem(mapId: $mapId, layerId: $layerId, item: $item)
}
    `;
export type UpdateTacticalItemMutationFn = ApolloReactCommon.MutationFunction<UpdateTacticalItemMutation, UpdateTacticalItemMutationVariables>;

/**
 * __useUpdateTacticalItemMutation__
 *
 * To run a mutation, you first call `useUpdateTacticalItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTacticalItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTacticalItemMutation, { data, loading, error }] = useUpdateTacticalItemMutation({
 *   variables: {
 *      mapId: // value for 'mapId'
 *      layerId: // value for 'layerId'
 *      item: // value for 'item'
 *   },
 * });
 */
export function useUpdateTacticalItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTacticalItemMutation, UpdateTacticalItemMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTacticalItemMutation, UpdateTacticalItemMutationVariables>(UpdateTacticalItemDocument, baseOptions);
      }
export type UpdateTacticalItemMutationHookResult = ReturnType<typeof useUpdateTacticalItemMutation>;
export type UpdateTacticalItemMutationResult = ApolloReactCommon.MutationResult<UpdateTacticalItemMutation>;
export type UpdateTacticalItemMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTacticalItemMutation, UpdateTacticalItemMutationVariables>;
export const UpdateTacticalPathDocument = gql`
    mutation UpdateTacticalPath($mapId: ID!, $layerId: ID!, $path: TacticalPathInput!) {
  updateTacticalMapPath(mapId: $mapId, layerId: $layerId, path: $path)
}
    `;
export type UpdateTacticalPathMutationFn = ApolloReactCommon.MutationFunction<UpdateTacticalPathMutation, UpdateTacticalPathMutationVariables>;

/**
 * __useUpdateTacticalPathMutation__
 *
 * To run a mutation, you first call `useUpdateTacticalPathMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTacticalPathMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTacticalPathMutation, { data, loading, error }] = useUpdateTacticalPathMutation({
 *   variables: {
 *      mapId: // value for 'mapId'
 *      layerId: // value for 'layerId'
 *      path: // value for 'path'
 *   },
 * });
 */
export function useUpdateTacticalPathMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTacticalPathMutation, UpdateTacticalPathMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTacticalPathMutation, UpdateTacticalPathMutationVariables>(UpdateTacticalPathDocument, baseOptions);
      }
export type UpdateTacticalPathMutationHookResult = ReturnType<typeof useUpdateTacticalPathMutation>;
export type UpdateTacticalPathMutationResult = ApolloReactCommon.MutationResult<UpdateTacticalPathMutation>;
export type UpdateTacticalPathMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTacticalPathMutation, UpdateTacticalPathMutationVariables>;
export const TemplateDocument = gql`
    query Template($simulatorId: ID!) {
  _template(simulatorId: $simulatorId) {
    ...TemplateFragment
  }
}
    ${TemplateFragmentFragmentDoc}`;

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
export function useTemplateQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TemplateQuery, TemplateQueryVariables>) {
        return ApolloReactHooks.useQuery<TemplateQuery, TemplateQueryVariables>(TemplateDocument, baseOptions);
      }
export function useTemplateLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TemplateQuery, TemplateQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TemplateQuery, TemplateQueryVariables>(TemplateDocument, baseOptions);
        }
export type TemplateQueryHookResult = ReturnType<typeof useTemplateQuery>;
export type TemplateLazyQueryHookResult = ReturnType<typeof useTemplateLazyQuery>;
export type TemplateQueryResult = ApolloReactCommon.QueryResult<TemplateQuery, TemplateQueryVariables>;
export const TemplateUpdateDocument = gql`
    subscription TemplateUpdate($simulatorId: ID!) {
  _templateUpdate(simulatorId: $simulatorId) {
    ...TemplateFragment
    __typename
  }
}
    ${TemplateFragmentFragmentDoc}`;

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
export function useTemplateUpdateSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<TemplateUpdateSubscription, TemplateUpdateSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<TemplateUpdateSubscription, TemplateUpdateSubscriptionVariables>(TemplateUpdateDocument, baseOptions);
      }
export type TemplateUpdateSubscriptionHookResult = ReturnType<typeof useTemplateUpdateSubscription>;
export type TemplateUpdateSubscriptionResult = ApolloReactCommon.SubscriptionResult<TemplateUpdateSubscription>;
export const AddMissionDocument = gql`
    mutation AddMission($name: String!) {
  createMission(name: $name)
}
    `;
export type AddMissionMutationFn = ApolloReactCommon.MutationFunction<AddMissionMutation, AddMissionMutationVariables>;

/**
 * __useAddMissionMutation__
 *
 * To run a mutation, you first call `useAddMissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMissionMutation, { data, loading, error }] = useAddMissionMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddMissionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddMissionMutation, AddMissionMutationVariables>) {
        return ApolloReactHooks.useMutation<AddMissionMutation, AddMissionMutationVariables>(AddMissionDocument, baseOptions);
      }
export type AddMissionMutationHookResult = ReturnType<typeof useAddMissionMutation>;
export type AddMissionMutationResult = ApolloReactCommon.MutationResult<AddMissionMutation>;
export type AddMissionMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMissionMutation, AddMissionMutationVariables>;
export const ExecuteMacrosDocument = gql`
    mutation ExecuteMacros($simulatorId: ID!, $macros: [MacroInput]!) {
  triggerMacros(simulatorId: $simulatorId, macros: $macros)
}
    `;
export type ExecuteMacrosMutationFn = ApolloReactCommon.MutationFunction<ExecuteMacrosMutation, ExecuteMacrosMutationVariables>;

/**
 * __useExecuteMacrosMutation__
 *
 * To run a mutation, you first call `useExecuteMacrosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExecuteMacrosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [executeMacrosMutation, { data, loading, error }] = useExecuteMacrosMutation({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *      macros: // value for 'macros'
 *   },
 * });
 */
export function useExecuteMacrosMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ExecuteMacrosMutation, ExecuteMacrosMutationVariables>) {
        return ApolloReactHooks.useMutation<ExecuteMacrosMutation, ExecuteMacrosMutationVariables>(ExecuteMacrosDocument, baseOptions);
      }
export type ExecuteMacrosMutationHookResult = ReturnType<typeof useExecuteMacrosMutation>;
export type ExecuteMacrosMutationResult = ApolloReactCommon.MutationResult<ExecuteMacrosMutation>;
export type ExecuteMacrosMutationOptions = ApolloReactCommon.BaseMutationOptions<ExecuteMacrosMutation, ExecuteMacrosMutationVariables>;
export const SetSimulatorMissionDocument = gql`
    mutation SetSimulatorMission($simulatorId: ID!, $missionId: ID!, $stepId: ID) {
  setSimulatorMission(simulatorId: $simulatorId, missionId: $missionId, stepId: $stepId)
}
    `;
export type SetSimulatorMissionMutationFn = ApolloReactCommon.MutationFunction<SetSimulatorMissionMutation, SetSimulatorMissionMutationVariables>;

/**
 * __useSetSimulatorMissionMutation__
 *
 * To run a mutation, you first call `useSetSimulatorMissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetSimulatorMissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setSimulatorMissionMutation, { data, loading, error }] = useSetSimulatorMissionMutation({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *      missionId: // value for 'missionId'
 *      stepId: // value for 'stepId'
 *   },
 * });
 */
export function useSetSimulatorMissionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetSimulatorMissionMutation, SetSimulatorMissionMutationVariables>) {
        return ApolloReactHooks.useMutation<SetSimulatorMissionMutation, SetSimulatorMissionMutationVariables>(SetSimulatorMissionDocument, baseOptions);
      }
export type SetSimulatorMissionMutationHookResult = ReturnType<typeof useSetSimulatorMissionMutation>;
export type SetSimulatorMissionMutationResult = ApolloReactCommon.MutationResult<SetSimulatorMissionMutation>;
export type SetSimulatorMissionMutationOptions = ApolloReactCommon.BaseMutationOptions<SetSimulatorMissionMutation, SetSimulatorMissionMutationVariables>;
export const SetSimulatorTimelineStepDocument = gql`
    mutation SetSimulatorTimelineStep($simulatorId: ID!, $auxTimelineId: ID, $step: Int!) {
  setSimulatorTimelineStep(simulatorId: $simulatorId, timelineId: $auxTimelineId, step: $step)
}
    `;
export type SetSimulatorTimelineStepMutationFn = ApolloReactCommon.MutationFunction<SetSimulatorTimelineStepMutation, SetSimulatorTimelineStepMutationVariables>;

/**
 * __useSetSimulatorTimelineStepMutation__
 *
 * To run a mutation, you first call `useSetSimulatorTimelineStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetSimulatorTimelineStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setSimulatorTimelineStepMutation, { data, loading, error }] = useSetSimulatorTimelineStepMutation({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *      auxTimelineId: // value for 'auxTimelineId'
 *      step: // value for 'step'
 *   },
 * });
 */
export function useSetSimulatorTimelineStepMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetSimulatorTimelineStepMutation, SetSimulatorTimelineStepMutationVariables>) {
        return ApolloReactHooks.useMutation<SetSimulatorTimelineStepMutation, SetSimulatorTimelineStepMutationVariables>(SetSimulatorTimelineStepDocument, baseOptions);
      }
export type SetSimulatorTimelineStepMutationHookResult = ReturnType<typeof useSetSimulatorTimelineStepMutation>;
export type SetSimulatorTimelineStepMutationResult = ApolloReactCommon.MutationResult<SetSimulatorTimelineStepMutation>;
export type SetSimulatorTimelineStepMutationOptions = ApolloReactCommon.BaseMutationOptions<SetSimulatorTimelineStepMutation, SetSimulatorTimelineStepMutationVariables>;
export const TimelineSimulatorDocument = gql`
    subscription TimelineSimulator($simulatorId: ID!) {
  simulatorsUpdate(simulatorId: $simulatorId) {
    id
    currentTimelineStep
    executedTimelineSteps
    missionConfigs
    stationSet {
      id
    }
    mission {
      id
    }
  }
}
    `;

/**
 * __useTimelineSimulatorSubscription__
 *
 * To run a query within a React component, call `useTimelineSimulatorSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTimelineSimulatorSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimelineSimulatorSubscription({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useTimelineSimulatorSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<TimelineSimulatorSubscription, TimelineSimulatorSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<TimelineSimulatorSubscription, TimelineSimulatorSubscriptionVariables>(TimelineSimulatorDocument, baseOptions);
      }
export type TimelineSimulatorSubscriptionHookResult = ReturnType<typeof useTimelineSimulatorSubscription>;
export type TimelineSimulatorSubscriptionResult = ApolloReactCommon.SubscriptionResult<TimelineSimulatorSubscription>;
export const TimelineMissionDocument = gql`
    subscription TimelineMission {
  missionsUpdate {
    id
    name
    description
    category
    timeline {
      id
      name
      order
      description
      timelineItems {
        id
        name
        type
        args
        event
        delay
      }
    }
  }
}
    `;

/**
 * __useTimelineMissionSubscription__
 *
 * To run a query within a React component, call `useTimelineMissionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTimelineMissionSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimelineMissionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTimelineMissionSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<TimelineMissionSubscription, TimelineMissionSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<TimelineMissionSubscription, TimelineMissionSubscriptionVariables>(TimelineMissionDocument, baseOptions);
      }
export type TimelineMissionSubscriptionHookResult = ReturnType<typeof useTimelineMissionSubscription>;
export type TimelineMissionSubscriptionResult = ApolloReactCommon.SubscriptionResult<TimelineMissionSubscription>;
export const TractorBeamTargetLabelDocument = gql`
    mutation TractorBeamTargetLabel($id: ID!, $beam: ID!, $label: String!) {
  setTractorBeamTargetLabel(id: $id, beam: $beam, label: $label)
}
    `;
export type TractorBeamTargetLabelMutationFn = ApolloReactCommon.MutationFunction<TractorBeamTargetLabelMutation, TractorBeamTargetLabelMutationVariables>;

/**
 * __useTractorBeamTargetLabelMutation__
 *
 * To run a mutation, you first call `useTractorBeamTargetLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTractorBeamTargetLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tractorBeamTargetLabelMutation, { data, loading, error }] = useTractorBeamTargetLabelMutation({
 *   variables: {
 *      id: // value for 'id'
 *      beam: // value for 'beam'
 *      label: // value for 'label'
 *   },
 * });
 */
export function useTractorBeamTargetLabelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TractorBeamTargetLabelMutation, TractorBeamTargetLabelMutationVariables>) {
        return ApolloReactHooks.useMutation<TractorBeamTargetLabelMutation, TractorBeamTargetLabelMutationVariables>(TractorBeamTargetLabelDocument, baseOptions);
      }
export type TractorBeamTargetLabelMutationHookResult = ReturnType<typeof useTractorBeamTargetLabelMutation>;
export type TractorBeamTargetLabelMutationResult = ApolloReactCommon.MutationResult<TractorBeamTargetLabelMutation>;
export type TractorBeamTargetLabelMutationOptions = ApolloReactCommon.BaseMutationOptions<TractorBeamTargetLabelMutation, TractorBeamTargetLabelMutationVariables>;
export const TractorBeamStateDocument = gql`
    mutation TractorBeamState($id: ID!, $beam: ID!, $state: Boolean!) {
  setTractorBeamState(id: $id, beam: $beam, state: $state)
}
    `;
export type TractorBeamStateMutationFn = ApolloReactCommon.MutationFunction<TractorBeamStateMutation, TractorBeamStateMutationVariables>;

/**
 * __useTractorBeamStateMutation__
 *
 * To run a mutation, you first call `useTractorBeamStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTractorBeamStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tractorBeamStateMutation, { data, loading, error }] = useTractorBeamStateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      beam: // value for 'beam'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useTractorBeamStateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TractorBeamStateMutation, TractorBeamStateMutationVariables>) {
        return ApolloReactHooks.useMutation<TractorBeamStateMutation, TractorBeamStateMutationVariables>(TractorBeamStateDocument, baseOptions);
      }
export type TractorBeamStateMutationHookResult = ReturnType<typeof useTractorBeamStateMutation>;
export type TractorBeamStateMutationResult = ApolloReactCommon.MutationResult<TractorBeamStateMutation>;
export type TractorBeamStateMutationOptions = ApolloReactCommon.BaseMutationOptions<TractorBeamStateMutation, TractorBeamStateMutationVariables>;
export const TractorBeamStrengthDocument = gql`
    mutation TractorBeamStrength($id: ID!, $beam: ID!, $strength: Float!) {
  setTractorBeamStrength(id: $id, beam: $beam, strength: $strength)
}
    `;
export type TractorBeamStrengthMutationFn = ApolloReactCommon.MutationFunction<TractorBeamStrengthMutation, TractorBeamStrengthMutationVariables>;

/**
 * __useTractorBeamStrengthMutation__
 *
 * To run a mutation, you first call `useTractorBeamStrengthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTractorBeamStrengthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tractorBeamStrengthMutation, { data, loading, error }] = useTractorBeamStrengthMutation({
 *   variables: {
 *      id: // value for 'id'
 *      beam: // value for 'beam'
 *      strength: // value for 'strength'
 *   },
 * });
 */
export function useTractorBeamStrengthMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TractorBeamStrengthMutation, TractorBeamStrengthMutationVariables>) {
        return ApolloReactHooks.useMutation<TractorBeamStrengthMutation, TractorBeamStrengthMutationVariables>(TractorBeamStrengthDocument, baseOptions);
      }
export type TractorBeamStrengthMutationHookResult = ReturnType<typeof useTractorBeamStrengthMutation>;
export type TractorBeamStrengthMutationResult = ApolloReactCommon.MutationResult<TractorBeamStrengthMutation>;
export type TractorBeamStrengthMutationOptions = ApolloReactCommon.BaseMutationOptions<TractorBeamStrengthMutation, TractorBeamStrengthMutationVariables>;
export const TractorBeamStressDocument = gql`
    mutation TractorBeamStress($id: ID!, $beam: ID!, $stress: Float!) {
  setTractorBeamStress(id: $id, beam: $beam, stress: $stress)
}
    `;
export type TractorBeamStressMutationFn = ApolloReactCommon.MutationFunction<TractorBeamStressMutation, TractorBeamStressMutationVariables>;

/**
 * __useTractorBeamStressMutation__
 *
 * To run a mutation, you first call `useTractorBeamStressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTractorBeamStressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tractorBeamStressMutation, { data, loading, error }] = useTractorBeamStressMutation({
 *   variables: {
 *      id: // value for 'id'
 *      beam: // value for 'beam'
 *      stress: // value for 'stress'
 *   },
 * });
 */
export function useTractorBeamStressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TractorBeamStressMutation, TractorBeamStressMutationVariables>) {
        return ApolloReactHooks.useMutation<TractorBeamStressMutation, TractorBeamStressMutationVariables>(TractorBeamStressDocument, baseOptions);
      }
export type TractorBeamStressMutationHookResult = ReturnType<typeof useTractorBeamStressMutation>;
export type TractorBeamStressMutationResult = ApolloReactCommon.MutationResult<TractorBeamStressMutation>;
export type TractorBeamStressMutationOptions = ApolloReactCommon.BaseMutationOptions<TractorBeamStressMutation, TractorBeamStressMutationVariables>;
export const TractorBeamUpdateDocument = gql`
    subscription TractorBeamUpdate($simulatorId: ID!) {
  tractorBeamUpdate(simulatorId: $simulatorId) {
    id
    name
    displayName
    beams {
      id
      state
      target
      targetLabel
      strength
      stress
      scanning
    }
    damage {
      damaged
      report
    }
    power {
      power
      powerLevels
    }
  }
}
    `;

/**
 * __useTractorBeamUpdateSubscription__
 *
 * To run a query within a React component, call `useTractorBeamUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTractorBeamUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTractorBeamUpdateSubscription({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *   },
 * });
 */
export function useTractorBeamUpdateSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<TractorBeamUpdateSubscription, TractorBeamUpdateSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<TractorBeamUpdateSubscription, TractorBeamUpdateSubscriptionVariables>(TractorBeamUpdateDocument, baseOptions);
      }
export type TractorBeamUpdateSubscriptionHookResult = ReturnType<typeof useTractorBeamUpdateSubscription>;
export type TractorBeamUpdateSubscriptionResult = ApolloReactCommon.SubscriptionResult<TractorBeamUpdateSubscription>;
export const TractorBeamTargetDocument = gql`
    mutation TractorBeamTarget($id: ID!, $beam: ID!, $state: Boolean!) {
  setTractorBeamTarget(id: $id, beam: $beam, target: $state)
}
    `;
export type TractorBeamTargetMutationFn = ApolloReactCommon.MutationFunction<TractorBeamTargetMutation, TractorBeamTargetMutationVariables>;

/**
 * __useTractorBeamTargetMutation__
 *
 * To run a mutation, you first call `useTractorBeamTargetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTractorBeamTargetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tractorBeamTargetMutation, { data, loading, error }] = useTractorBeamTargetMutation({
 *   variables: {
 *      id: // value for 'id'
 *      beam: // value for 'beam'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useTractorBeamTargetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TractorBeamTargetMutation, TractorBeamTargetMutationVariables>) {
        return ApolloReactHooks.useMutation<TractorBeamTargetMutation, TractorBeamTargetMutationVariables>(TractorBeamTargetDocument, baseOptions);
      }
export type TractorBeamTargetMutationHookResult = ReturnType<typeof useTractorBeamTargetMutation>;
export type TractorBeamTargetMutationResult = ApolloReactCommon.MutationResult<TractorBeamTargetMutation>;
export type TractorBeamTargetMutationOptions = ApolloReactCommon.BaseMutationOptions<TractorBeamTargetMutation, TractorBeamTargetMutationVariables>;
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
export function useClientChangedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<ClientChangedSubscription, ClientChangedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<ClientChangedSubscription, ClientChangedSubscriptionVariables>(ClientChangedDocument, baseOptions);
      }
export type ClientChangedSubscriptionHookResult = ReturnType<typeof useClientChangedSubscription>;
export type ClientChangedSubscriptionResult = ApolloReactCommon.SubscriptionResult<ClientChangedSubscription>;
export const DisconnectClientDocument = gql`
    mutation DisconnectClient($client: ID!) {
  clientDisconnect(client: $client)
}
    `;
export type DisconnectClientMutationFn = ApolloReactCommon.MutationFunction<DisconnectClientMutation, DisconnectClientMutationVariables>;

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
export function useDisconnectClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DisconnectClientMutation, DisconnectClientMutationVariables>) {
        return ApolloReactHooks.useMutation<DisconnectClientMutation, DisconnectClientMutationVariables>(DisconnectClientDocument, baseOptions);
      }
export type DisconnectClientMutationHookResult = ReturnType<typeof useDisconnectClientMutation>;
export type DisconnectClientMutationResult = ApolloReactCommon.MutationResult<DisconnectClientMutation>;
export type DisconnectClientMutationOptions = ApolloReactCommon.BaseMutationOptions<DisconnectClientMutation, DisconnectClientMutationVariables>;
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
export function useFlightsSubSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<FlightsSubSubscription, FlightsSubSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<FlightsSubSubscription, FlightsSubSubscriptionVariables>(FlightsSubDocument, baseOptions);
      }
export type FlightsSubSubscriptionHookResult = ReturnType<typeof useFlightsSubSubscription>;
export type FlightsSubSubscriptionResult = ApolloReactCommon.SubscriptionResult<FlightsSubSubscription>;
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
  dmxSets {
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
export function useClientsInterfacesAndKeyboardsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ClientsInterfacesAndKeyboardsQuery, ClientsInterfacesAndKeyboardsQueryVariables>) {
        return ApolloReactHooks.useQuery<ClientsInterfacesAndKeyboardsQuery, ClientsInterfacesAndKeyboardsQueryVariables>(ClientsInterfacesAndKeyboardsDocument, baseOptions);
      }
export function useClientsInterfacesAndKeyboardsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ClientsInterfacesAndKeyboardsQuery, ClientsInterfacesAndKeyboardsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ClientsInterfacesAndKeyboardsQuery, ClientsInterfacesAndKeyboardsQueryVariables>(ClientsInterfacesAndKeyboardsDocument, baseOptions);
        }
export type ClientsInterfacesAndKeyboardsQueryHookResult = ReturnType<typeof useClientsInterfacesAndKeyboardsQuery>;
export type ClientsInterfacesAndKeyboardsLazyQueryHookResult = ReturnType<typeof useClientsInterfacesAndKeyboardsLazyQuery>;
export type ClientsInterfacesAndKeyboardsQueryResult = ApolloReactCommon.QueryResult<ClientsInterfacesAndKeyboardsQuery, ClientsInterfacesAndKeyboardsQueryVariables>;
export const SetClientFlightDocument = gql`
    mutation SetClientFlight($client: ID!, $id: ID!) {
  clientSetFlight(client: $client, flightId: $id)
}
    `;
export type SetClientFlightMutationFn = ApolloReactCommon.MutationFunction<SetClientFlightMutation, SetClientFlightMutationVariables>;

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
export function useSetClientFlightMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetClientFlightMutation, SetClientFlightMutationVariables>) {
        return ApolloReactHooks.useMutation<SetClientFlightMutation, SetClientFlightMutationVariables>(SetClientFlightDocument, baseOptions);
      }
export type SetClientFlightMutationHookResult = ReturnType<typeof useSetClientFlightMutation>;
export type SetClientFlightMutationResult = ApolloReactCommon.MutationResult<SetClientFlightMutation>;
export type SetClientFlightMutationOptions = ApolloReactCommon.BaseMutationOptions<SetClientFlightMutation, SetClientFlightMutationVariables>;
export const SetClientSimulatorDocument = gql`
    mutation SetClientSimulator($client: ID!, $id: ID!) {
  clientSetSimulator(client: $client, simulatorId: $id)
}
    `;
export type SetClientSimulatorMutationFn = ApolloReactCommon.MutationFunction<SetClientSimulatorMutation, SetClientSimulatorMutationVariables>;

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
export function useSetClientSimulatorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetClientSimulatorMutation, SetClientSimulatorMutationVariables>) {
        return ApolloReactHooks.useMutation<SetClientSimulatorMutation, SetClientSimulatorMutationVariables>(SetClientSimulatorDocument, baseOptions);
      }
export type SetClientSimulatorMutationHookResult = ReturnType<typeof useSetClientSimulatorMutation>;
export type SetClientSimulatorMutationResult = ApolloReactCommon.MutationResult<SetClientSimulatorMutation>;
export type SetClientSimulatorMutationOptions = ApolloReactCommon.BaseMutationOptions<SetClientSimulatorMutation, SetClientSimulatorMutationVariables>;
export const SetClientStationDocument = gql`
    mutation SetClientStation($client: ID!, $id: ID!) {
  clientSetStation(client: $client, stationName: $id)
}
    `;
export type SetClientStationMutationFn = ApolloReactCommon.MutationFunction<SetClientStationMutation, SetClientStationMutationVariables>;

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
export function useSetClientStationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetClientStationMutation, SetClientStationMutationVariables>) {
        return ApolloReactHooks.useMutation<SetClientStationMutation, SetClientStationMutationVariables>(SetClientStationDocument, baseOptions);
      }
export type SetClientStationMutationHookResult = ReturnType<typeof useSetClientStationMutation>;
export type SetClientStationMutationResult = ApolloReactCommon.MutationResult<SetClientStationMutation>;
export type SetClientStationMutationOptions = ApolloReactCommon.BaseMutationOptions<SetClientStationMutation, SetClientStationMutationVariables>;
export const SetSoundPlayerDocument = gql`
    mutation SetSoundPlayer($id: ID!, $soundPlayer: Boolean!) {
  clientSetSoundPlayer(client: $id, soundPlayer: $soundPlayer)
}
    `;
export type SetSoundPlayerMutationFn = ApolloReactCommon.MutationFunction<SetSoundPlayerMutation, SetSoundPlayerMutationVariables>;

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
export function useSetSoundPlayerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetSoundPlayerMutation, SetSoundPlayerMutationVariables>) {
        return ApolloReactHooks.useMutation<SetSoundPlayerMutation, SetSoundPlayerMutationVariables>(SetSoundPlayerDocument, baseOptions);
      }
export type SetSoundPlayerMutationHookResult = ReturnType<typeof useSetSoundPlayerMutation>;
export type SetSoundPlayerMutationResult = ApolloReactCommon.MutationResult<SetSoundPlayerMutation>;
export type SetSoundPlayerMutationOptions = ApolloReactCommon.BaseMutationOptions<SetSoundPlayerMutation, SetSoundPlayerMutationVariables>;
export const ApplyClientSetDocument = gql`
    mutation ApplyClientSet($id: ID!, $flightId: ID!, $simulatorId: ID!, $templateId: ID!, $stationSetId: ID!) {
  applyClientSet(id: $id, flightId: $flightId, simulatorId: $simulatorId, templateId: $templateId, stationSetId: $stationSetId)
}
    `;
export type ApplyClientSetMutationFn = ApolloReactCommon.MutationFunction<ApplyClientSetMutation, ApplyClientSetMutationVariables>;

/**
 * __useApplyClientSetMutation__
 *
 * To run a mutation, you first call `useApplyClientSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyClientSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyClientSetMutation, { data, loading, error }] = useApplyClientSetMutation({
 *   variables: {
 *      id: // value for 'id'
 *      flightId: // value for 'flightId'
 *      simulatorId: // value for 'simulatorId'
 *      templateId: // value for 'templateId'
 *      stationSetId: // value for 'stationSetId'
 *   },
 * });
 */
export function useApplyClientSetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ApplyClientSetMutation, ApplyClientSetMutationVariables>) {
        return ApolloReactHooks.useMutation<ApplyClientSetMutation, ApplyClientSetMutationVariables>(ApplyClientSetDocument, baseOptions);
      }
export type ApplyClientSetMutationHookResult = ReturnType<typeof useApplyClientSetMutation>;
export type ApplyClientSetMutationResult = ApolloReactCommon.MutationResult<ApplyClientSetMutation>;
export type ApplyClientSetMutationOptions = ApolloReactCommon.BaseMutationOptions<ApplyClientSetMutation, ApplyClientSetMutationVariables>;
export const DeleteFlightDocument = gql`
    mutation DeleteFlight($flightId: ID!) {
  deleteFlight(flightId: $flightId)
}
    `;
export type DeleteFlightMutationFn = ApolloReactCommon.MutationFunction<DeleteFlightMutation, DeleteFlightMutationVariables>;

/**
 * __useDeleteFlightMutation__
 *
 * To run a mutation, you first call `useDeleteFlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFlightMutation, { data, loading, error }] = useDeleteFlightMutation({
 *   variables: {
 *      flightId: // value for 'flightId'
 *   },
 * });
 */
export function useDeleteFlightMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteFlightMutation, DeleteFlightMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteFlightMutation, DeleteFlightMutationVariables>(DeleteFlightDocument, baseOptions);
      }
export type DeleteFlightMutationHookResult = ReturnType<typeof useDeleteFlightMutation>;
export type DeleteFlightMutationResult = ApolloReactCommon.MutationResult<DeleteFlightMutation>;
export type DeleteFlightMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteFlightMutation, DeleteFlightMutationVariables>;
export const FlightDocument = gql`
    query Flight {
  flights {
    id
    name
    flightType
    transmitted
    running
  }
}
    `;

/**
 * __useFlightQuery__
 *
 * To run a query within a React component, call `useFlightQuery` and pass it any options that fit your needs.
 * When your component renders, `useFlightQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlightQuery({
 *   variables: {
 *   },
 * });
 */
export function useFlightQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FlightQuery, FlightQueryVariables>) {
        return ApolloReactHooks.useQuery<FlightQuery, FlightQueryVariables>(FlightDocument, baseOptions);
      }
export function useFlightLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FlightQuery, FlightQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FlightQuery, FlightQueryVariables>(FlightDocument, baseOptions);
        }
export type FlightQueryHookResult = ReturnType<typeof useFlightQuery>;
export type FlightLazyQueryHookResult = ReturnType<typeof useFlightLazyQuery>;
export type FlightQueryResult = ApolloReactCommon.QueryResult<FlightQuery, FlightQueryVariables>;
export const PauseFlightDocument = gql`
    mutation PauseFlight($flightId: ID!) {
  pauseFlight(flightId: $flightId)
}
    `;
export type PauseFlightMutationFn = ApolloReactCommon.MutationFunction<PauseFlightMutation, PauseFlightMutationVariables>;

/**
 * __usePauseFlightMutation__
 *
 * To run a mutation, you first call `usePauseFlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseFlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseFlightMutation, { data, loading, error }] = usePauseFlightMutation({
 *   variables: {
 *      flightId: // value for 'flightId'
 *   },
 * });
 */
export function usePauseFlightMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PauseFlightMutation, PauseFlightMutationVariables>) {
        return ApolloReactHooks.useMutation<PauseFlightMutation, PauseFlightMutationVariables>(PauseFlightDocument, baseOptions);
      }
export type PauseFlightMutationHookResult = ReturnType<typeof usePauseFlightMutation>;
export type PauseFlightMutationResult = ApolloReactCommon.MutationResult<PauseFlightMutation>;
export type PauseFlightMutationOptions = ApolloReactCommon.BaseMutationOptions<PauseFlightMutation, PauseFlightMutationVariables>;
export const ResetFlightDocument = gql`
    mutation ResetFlight($flightId: ID!) {
  resetFlight(flightId: $flightId, full: true)
}
    `;
export type ResetFlightMutationFn = ApolloReactCommon.MutationFunction<ResetFlightMutation, ResetFlightMutationVariables>;

/**
 * __useResetFlightMutation__
 *
 * To run a mutation, you first call `useResetFlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetFlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetFlightMutation, { data, loading, error }] = useResetFlightMutation({
 *   variables: {
 *      flightId: // value for 'flightId'
 *   },
 * });
 */
export function useResetFlightMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetFlightMutation, ResetFlightMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetFlightMutation, ResetFlightMutationVariables>(ResetFlightDocument, baseOptions);
      }
export type ResetFlightMutationHookResult = ReturnType<typeof useResetFlightMutation>;
export type ResetFlightMutationResult = ApolloReactCommon.MutationResult<ResetFlightMutation>;
export type ResetFlightMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetFlightMutation, ResetFlightMutationVariables>;
export const LobbyResumeFlightDocument = gql`
    mutation LobbyResumeFlight($flightId: ID!) {
  resumeFlight(flightId: $flightId)
}
    `;
export type LobbyResumeFlightMutationFn = ApolloReactCommon.MutationFunction<LobbyResumeFlightMutation, LobbyResumeFlightMutationVariables>;

/**
 * __useLobbyResumeFlightMutation__
 *
 * To run a mutation, you first call `useLobbyResumeFlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLobbyResumeFlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lobbyResumeFlightMutation, { data, loading, error }] = useLobbyResumeFlightMutation({
 *   variables: {
 *      flightId: // value for 'flightId'
 *   },
 * });
 */
export function useLobbyResumeFlightMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LobbyResumeFlightMutation, LobbyResumeFlightMutationVariables>) {
        return ApolloReactHooks.useMutation<LobbyResumeFlightMutation, LobbyResumeFlightMutationVariables>(LobbyResumeFlightDocument, baseOptions);
      }
export type LobbyResumeFlightMutationHookResult = ReturnType<typeof useLobbyResumeFlightMutation>;
export type LobbyResumeFlightMutationResult = ApolloReactCommon.MutationResult<LobbyResumeFlightMutation>;
export type LobbyResumeFlightMutationOptions = ApolloReactCommon.BaseMutationOptions<LobbyResumeFlightMutation, LobbyResumeFlightMutationVariables>;
export const SetsPickerDocument = gql`
    query SetsPicker($flightId: ID) {
  flights(id: $flightId) {
    id
    name
    simulators {
      id
      templateId
      name
      stationSet {
        id
        name
      }
    }
  }
  sets {
    id
    name
    clients {
      id
      client {
        id
      }
      simulator {
        id
        name
      }
      stationSet {
        id
        name
      }
      station
    }
  }
}
    `;

/**
 * __useSetsPickerQuery__
 *
 * To run a query within a React component, call `useSetsPickerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetsPickerQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetsPickerQuery({
 *   variables: {
 *      flightId: // value for 'flightId'
 *   },
 * });
 */
export function useSetsPickerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SetsPickerQuery, SetsPickerQueryVariables>) {
        return ApolloReactHooks.useQuery<SetsPickerQuery, SetsPickerQueryVariables>(SetsPickerDocument, baseOptions);
      }
export function useSetsPickerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SetsPickerQuery, SetsPickerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SetsPickerQuery, SetsPickerQueryVariables>(SetsPickerDocument, baseOptions);
        }
export type SetsPickerQueryHookResult = ReturnType<typeof useSetsPickerQuery>;
export type SetsPickerLazyQueryHookResult = ReturnType<typeof useSetsPickerLazyQuery>;
export type SetsPickerQueryResult = ApolloReactCommon.QueryResult<SetsPickerQuery, SetsPickerQueryVariables>;
export const TransmitFlightDocument = gql`
    mutation TransmitFlight($flightId: ID!) {
  assignSpaceEdventuresFlightRecord(flightId: $flightId)
}
    `;
export type TransmitFlightMutationFn = ApolloReactCommon.MutationFunction<TransmitFlightMutation, TransmitFlightMutationVariables>;

/**
 * __useTransmitFlightMutation__
 *
 * To run a mutation, you first call `useTransmitFlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransmitFlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transmitFlightMutation, { data, loading, error }] = useTransmitFlightMutation({
 *   variables: {
 *      flightId: // value for 'flightId'
 *   },
 * });
 */
export function useTransmitFlightMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TransmitFlightMutation, TransmitFlightMutationVariables>) {
        return ApolloReactHooks.useMutation<TransmitFlightMutation, TransmitFlightMutationVariables>(TransmitFlightDocument, baseOptions);
      }
export type TransmitFlightMutationHookResult = ReturnType<typeof useTransmitFlightMutation>;
export type TransmitFlightMutationResult = ApolloReactCommon.MutationResult<TransmitFlightMutation>;
export type TransmitFlightMutationOptions = ApolloReactCommon.BaseMutationOptions<TransmitFlightMutation, TransmitFlightMutationVariables>;
export const DmxConfigCreateDocument = gql`
    mutation DMXConfigCreate($name: String!) {
  dmxConfigCreate(name: $name)
}
    `;
export type DmxConfigCreateMutationFn = ApolloReactCommon.MutationFunction<DmxConfigCreateMutation, DmxConfigCreateMutationVariables>;

/**
 * __useDmxConfigCreateMutation__
 *
 * To run a mutation, you first call `useDmxConfigCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxConfigCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxConfigCreateMutation, { data, loading, error }] = useDmxConfigCreateMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDmxConfigCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxConfigCreateMutation, DmxConfigCreateMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxConfigCreateMutation, DmxConfigCreateMutationVariables>(DmxConfigCreateDocument, baseOptions);
      }
export type DmxConfigCreateMutationHookResult = ReturnType<typeof useDmxConfigCreateMutation>;
export type DmxConfigCreateMutationResult = ApolloReactCommon.MutationResult<DmxConfigCreateMutation>;
export type DmxConfigCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxConfigCreateMutation, DmxConfigCreateMutationVariables>;
export const DmxConfigDuplicateDocument = gql`
    mutation DMXConfigDuplicate($id: ID!, $name: String!) {
  dmxConfigDuplicate(id: $id, name: $name)
}
    `;
export type DmxConfigDuplicateMutationFn = ApolloReactCommon.MutationFunction<DmxConfigDuplicateMutation, DmxConfigDuplicateMutationVariables>;

/**
 * __useDmxConfigDuplicateMutation__
 *
 * To run a mutation, you first call `useDmxConfigDuplicateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxConfigDuplicateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxConfigDuplicateMutation, { data, loading, error }] = useDmxConfigDuplicateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDmxConfigDuplicateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxConfigDuplicateMutation, DmxConfigDuplicateMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxConfigDuplicateMutation, DmxConfigDuplicateMutationVariables>(DmxConfigDuplicateDocument, baseOptions);
      }
export type DmxConfigDuplicateMutationHookResult = ReturnType<typeof useDmxConfigDuplicateMutation>;
export type DmxConfigDuplicateMutationResult = ApolloReactCommon.MutationResult<DmxConfigDuplicateMutation>;
export type DmxConfigDuplicateMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxConfigDuplicateMutation, DmxConfigDuplicateMutationVariables>;
export const DmxConfigRemoveDocument = gql`
    mutation DMXConfigRemove($id: ID!) {
  dmxConfigRemove(id: $id)
}
    `;
export type DmxConfigRemoveMutationFn = ApolloReactCommon.MutationFunction<DmxConfigRemoveMutation, DmxConfigRemoveMutationVariables>;

/**
 * __useDmxConfigRemoveMutation__
 *
 * To run a mutation, you first call `useDmxConfigRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxConfigRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxConfigRemoveMutation, { data, loading, error }] = useDmxConfigRemoveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDmxConfigRemoveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxConfigRemoveMutation, DmxConfigRemoveMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxConfigRemoveMutation, DmxConfigRemoveMutationVariables>(DmxConfigRemoveDocument, baseOptions);
      }
export type DmxConfigRemoveMutationHookResult = ReturnType<typeof useDmxConfigRemoveMutation>;
export type DmxConfigRemoveMutationResult = ApolloReactCommon.MutationResult<DmxConfigRemoveMutation>;
export type DmxConfigRemoveMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxConfigRemoveMutation, DmxConfigRemoveMutationVariables>;
export const DmxConfigSetActionStrengthDocument = gql`
    mutation DMXConfigSetActionStrength($id: ID!, $actionStrength: Float!) {
  dmxConfigSetActionStrength(id: $id, actionStrength: $actionStrength)
}
    `;
export type DmxConfigSetActionStrengthMutationFn = ApolloReactCommon.MutationFunction<DmxConfigSetActionStrengthMutation, DmxConfigSetActionStrengthMutationVariables>;

/**
 * __useDmxConfigSetActionStrengthMutation__
 *
 * To run a mutation, you first call `useDmxConfigSetActionStrengthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxConfigSetActionStrengthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxConfigSetActionStrengthMutation, { data, loading, error }] = useDmxConfigSetActionStrengthMutation({
 *   variables: {
 *      id: // value for 'id'
 *      actionStrength: // value for 'actionStrength'
 *   },
 * });
 */
export function useDmxConfigSetActionStrengthMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxConfigSetActionStrengthMutation, DmxConfigSetActionStrengthMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxConfigSetActionStrengthMutation, DmxConfigSetActionStrengthMutationVariables>(DmxConfigSetActionStrengthDocument, baseOptions);
      }
export type DmxConfigSetActionStrengthMutationHookResult = ReturnType<typeof useDmxConfigSetActionStrengthMutation>;
export type DmxConfigSetActionStrengthMutationResult = ApolloReactCommon.MutationResult<DmxConfigSetActionStrengthMutation>;
export type DmxConfigSetActionStrengthMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxConfigSetActionStrengthMutation, DmxConfigSetActionStrengthMutationVariables>;
export const DmxConfigSetConfigDocument = gql`
    mutation DMXConfigSetConfig($id: ID!, $config: JSON!) {
  dmxConfigSetConfig(id: $id, config: $config)
}
    `;
export type DmxConfigSetConfigMutationFn = ApolloReactCommon.MutationFunction<DmxConfigSetConfigMutation, DmxConfigSetConfigMutationVariables>;

/**
 * __useDmxConfigSetConfigMutation__
 *
 * To run a mutation, you first call `useDmxConfigSetConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxConfigSetConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxConfigSetConfigMutation, { data, loading, error }] = useDmxConfigSetConfigMutation({
 *   variables: {
 *      id: // value for 'id'
 *      config: // value for 'config'
 *   },
 * });
 */
export function useDmxConfigSetConfigMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxConfigSetConfigMutation, DmxConfigSetConfigMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxConfigSetConfigMutation, DmxConfigSetConfigMutationVariables>(DmxConfigSetConfigDocument, baseOptions);
      }
export type DmxConfigSetConfigMutationHookResult = ReturnType<typeof useDmxConfigSetConfigMutation>;
export type DmxConfigSetConfigMutationResult = ApolloReactCommon.MutationResult<DmxConfigSetConfigMutation>;
export type DmxConfigSetConfigMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxConfigSetConfigMutation, DmxConfigSetConfigMutationVariables>;
export const DmxConfigSetNameDocument = gql`
    mutation DMXConfigSetName($id: ID!, $name: String!) {
  dmxConfigSetName(id: $id, name: $name)
}
    `;
export type DmxConfigSetNameMutationFn = ApolloReactCommon.MutationFunction<DmxConfigSetNameMutation, DmxConfigSetNameMutationVariables>;

/**
 * __useDmxConfigSetNameMutation__
 *
 * To run a mutation, you first call `useDmxConfigSetNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxConfigSetNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxConfigSetNameMutation, { data, loading, error }] = useDmxConfigSetNameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDmxConfigSetNameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxConfigSetNameMutation, DmxConfigSetNameMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxConfigSetNameMutation, DmxConfigSetNameMutationVariables>(DmxConfigSetNameDocument, baseOptions);
      }
export type DmxConfigSetNameMutationHookResult = ReturnType<typeof useDmxConfigSetNameMutation>;
export type DmxConfigSetNameMutationResult = ApolloReactCommon.MutationResult<DmxConfigSetNameMutation>;
export type DmxConfigSetNameMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxConfigSetNameMutation, DmxConfigSetNameMutationVariables>;
export const DmxConfigsDocument = gql`
    subscription DMXConfigs {
  dmxConfigs {
    id
    name
    config
    actionStrength
  }
}
    `;

/**
 * __useDmxConfigsSubscription__
 *
 * To run a query within a React component, call `useDmxConfigsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDmxConfigsSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDmxConfigsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useDmxConfigsSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<DmxConfigsSubscription, DmxConfigsSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<DmxConfigsSubscription, DmxConfigsSubscriptionVariables>(DmxConfigsDocument, baseOptions);
      }
export type DmxConfigsSubscriptionHookResult = ReturnType<typeof useDmxConfigsSubscription>;
export type DmxConfigsSubscriptionResult = ApolloReactCommon.SubscriptionResult<DmxConfigsSubscription>;
export const DmxDeviceCreateDocument = gql`
    mutation DMXDeviceCreate($name: String!) {
  dmxDeviceCreate(name: $name)
}
    `;
export type DmxDeviceCreateMutationFn = ApolloReactCommon.MutationFunction<DmxDeviceCreateMutation, DmxDeviceCreateMutationVariables>;

/**
 * __useDmxDeviceCreateMutation__
 *
 * To run a mutation, you first call `useDmxDeviceCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxDeviceCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxDeviceCreateMutation, { data, loading, error }] = useDmxDeviceCreateMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDmxDeviceCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxDeviceCreateMutation, DmxDeviceCreateMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxDeviceCreateMutation, DmxDeviceCreateMutationVariables>(DmxDeviceCreateDocument, baseOptions);
      }
export type DmxDeviceCreateMutationHookResult = ReturnType<typeof useDmxDeviceCreateMutation>;
export type DmxDeviceCreateMutationResult = ApolloReactCommon.MutationResult<DmxDeviceCreateMutation>;
export type DmxDeviceCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxDeviceCreateMutation, DmxDeviceCreateMutationVariables>;
export const DmxDeviceRemoveDocument = gql`
    mutation DMXDeviceRemove($id: ID!) {
  dmxDeviceRemove(id: $id)
}
    `;
export type DmxDeviceRemoveMutationFn = ApolloReactCommon.MutationFunction<DmxDeviceRemoveMutation, DmxDeviceRemoveMutationVariables>;

/**
 * __useDmxDeviceRemoveMutation__
 *
 * To run a mutation, you first call `useDmxDeviceRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxDeviceRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxDeviceRemoveMutation, { data, loading, error }] = useDmxDeviceRemoveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDmxDeviceRemoveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxDeviceRemoveMutation, DmxDeviceRemoveMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxDeviceRemoveMutation, DmxDeviceRemoveMutationVariables>(DmxDeviceRemoveDocument, baseOptions);
      }
export type DmxDeviceRemoveMutationHookResult = ReturnType<typeof useDmxDeviceRemoveMutation>;
export type DmxDeviceRemoveMutationResult = ApolloReactCommon.MutationResult<DmxDeviceRemoveMutation>;
export type DmxDeviceRemoveMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxDeviceRemoveMutation, DmxDeviceRemoveMutationVariables>;
export const DmxDeviceSetChannelsDocument = gql`
    mutation DMXDeviceSetChannels($id: ID!, $channels: [DMXChannelProperty!]!) {
  dmxDeviceSetChannels(id: $id, channels: $channels)
}
    `;
export type DmxDeviceSetChannelsMutationFn = ApolloReactCommon.MutationFunction<DmxDeviceSetChannelsMutation, DmxDeviceSetChannelsMutationVariables>;

/**
 * __useDmxDeviceSetChannelsMutation__
 *
 * To run a mutation, you first call `useDmxDeviceSetChannelsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxDeviceSetChannelsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxDeviceSetChannelsMutation, { data, loading, error }] = useDmxDeviceSetChannelsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      channels: // value for 'channels'
 *   },
 * });
 */
export function useDmxDeviceSetChannelsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxDeviceSetChannelsMutation, DmxDeviceSetChannelsMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxDeviceSetChannelsMutation, DmxDeviceSetChannelsMutationVariables>(DmxDeviceSetChannelsDocument, baseOptions);
      }
export type DmxDeviceSetChannelsMutationHookResult = ReturnType<typeof useDmxDeviceSetChannelsMutation>;
export type DmxDeviceSetChannelsMutationResult = ApolloReactCommon.MutationResult<DmxDeviceSetChannelsMutation>;
export type DmxDeviceSetChannelsMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxDeviceSetChannelsMutation, DmxDeviceSetChannelsMutationVariables>;
export const DmxDeviceSetNameDocument = gql`
    mutation DMXDeviceSetName($id: ID!, $name: String!) {
  dmxDeviceSetName(id: $id, name: $name)
}
    `;
export type DmxDeviceSetNameMutationFn = ApolloReactCommon.MutationFunction<DmxDeviceSetNameMutation, DmxDeviceSetNameMutationVariables>;

/**
 * __useDmxDeviceSetNameMutation__
 *
 * To run a mutation, you first call `useDmxDeviceSetNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxDeviceSetNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxDeviceSetNameMutation, { data, loading, error }] = useDmxDeviceSetNameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDmxDeviceSetNameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxDeviceSetNameMutation, DmxDeviceSetNameMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxDeviceSetNameMutation, DmxDeviceSetNameMutationVariables>(DmxDeviceSetNameDocument, baseOptions);
      }
export type DmxDeviceSetNameMutationHookResult = ReturnType<typeof useDmxDeviceSetNameMutation>;
export type DmxDeviceSetNameMutationResult = ApolloReactCommon.MutationResult<DmxDeviceSetNameMutation>;
export type DmxDeviceSetNameMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxDeviceSetNameMutation, DmxDeviceSetNameMutationVariables>;
export const DmxDevicesDocument = gql`
    subscription DMXDevices {
  dmxDevices {
    id
    name
    channels
  }
}
    `;

/**
 * __useDmxDevicesSubscription__
 *
 * To run a query within a React component, call `useDmxDevicesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDmxDevicesSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDmxDevicesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useDmxDevicesSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<DmxDevicesSubscription, DmxDevicesSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<DmxDevicesSubscription, DmxDevicesSubscriptionVariables>(DmxDevicesDocument, baseOptions);
      }
export type DmxDevicesSubscriptionHookResult = ReturnType<typeof useDmxDevicesSubscription>;
export type DmxDevicesSubscriptionResult = ApolloReactCommon.SubscriptionResult<DmxDevicesSubscription>;
export const DmxFixtureCreateDocument = gql`
    mutation DMXFixtureCreate($name: String!, $dmxSetId: ID!, $dmxDeviceId: ID!) {
  dmxFixtureCreate(name: $name, DMXSetId: $dmxSetId, DMXDeviceId: $dmxDeviceId)
}
    `;
export type DmxFixtureCreateMutationFn = ApolloReactCommon.MutationFunction<DmxFixtureCreateMutation, DmxFixtureCreateMutationVariables>;

/**
 * __useDmxFixtureCreateMutation__
 *
 * To run a mutation, you first call `useDmxFixtureCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxFixtureCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxFixtureCreateMutation, { data, loading, error }] = useDmxFixtureCreateMutation({
 *   variables: {
 *      name: // value for 'name'
 *      dmxSetId: // value for 'dmxSetId'
 *      dmxDeviceId: // value for 'dmxDeviceId'
 *   },
 * });
 */
export function useDmxFixtureCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxFixtureCreateMutation, DmxFixtureCreateMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxFixtureCreateMutation, DmxFixtureCreateMutationVariables>(DmxFixtureCreateDocument, baseOptions);
      }
export type DmxFixtureCreateMutationHookResult = ReturnType<typeof useDmxFixtureCreateMutation>;
export type DmxFixtureCreateMutationResult = ApolloReactCommon.MutationResult<DmxFixtureCreateMutation>;
export type DmxFixtureCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxFixtureCreateMutation, DmxFixtureCreateMutationVariables>;
export const DmxFixtureRemoveDocument = gql`
    mutation DMXFixtureRemove($id: ID!, $dmxSetId: ID!) {
  dmxFixtureRemove(id: $id, DMXSetId: $dmxSetId)
}
    `;
export type DmxFixtureRemoveMutationFn = ApolloReactCommon.MutationFunction<DmxFixtureRemoveMutation, DmxFixtureRemoveMutationVariables>;

/**
 * __useDmxFixtureRemoveMutation__
 *
 * To run a mutation, you first call `useDmxFixtureRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxFixtureRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxFixtureRemoveMutation, { data, loading, error }] = useDmxFixtureRemoveMutation({
 *   variables: {
 *      id: // value for 'id'
 *      dmxSetId: // value for 'dmxSetId'
 *   },
 * });
 */
export function useDmxFixtureRemoveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxFixtureRemoveMutation, DmxFixtureRemoveMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxFixtureRemoveMutation, DmxFixtureRemoveMutationVariables>(DmxFixtureRemoveDocument, baseOptions);
      }
export type DmxFixtureRemoveMutationHookResult = ReturnType<typeof useDmxFixtureRemoveMutation>;
export type DmxFixtureRemoveMutationResult = ApolloReactCommon.MutationResult<DmxFixtureRemoveMutation>;
export type DmxFixtureRemoveMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxFixtureRemoveMutation, DmxFixtureRemoveMutationVariables>;
export const DmxFixtureSetChannelDocument = gql`
    mutation DMXFixtureSetChannel($id: ID!, $channel: Int!) {
  dmxFixtureSetChannel(id: $id, channel: $channel)
}
    `;
export type DmxFixtureSetChannelMutationFn = ApolloReactCommon.MutationFunction<DmxFixtureSetChannelMutation, DmxFixtureSetChannelMutationVariables>;

/**
 * __useDmxFixtureSetChannelMutation__
 *
 * To run a mutation, you first call `useDmxFixtureSetChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxFixtureSetChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxFixtureSetChannelMutation, { data, loading, error }] = useDmxFixtureSetChannelMutation({
 *   variables: {
 *      id: // value for 'id'
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useDmxFixtureSetChannelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxFixtureSetChannelMutation, DmxFixtureSetChannelMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxFixtureSetChannelMutation, DmxFixtureSetChannelMutationVariables>(DmxFixtureSetChannelDocument, baseOptions);
      }
export type DmxFixtureSetChannelMutationHookResult = ReturnType<typeof useDmxFixtureSetChannelMutation>;
export type DmxFixtureSetChannelMutationResult = ApolloReactCommon.MutationResult<DmxFixtureSetChannelMutation>;
export type DmxFixtureSetChannelMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxFixtureSetChannelMutation, DmxFixtureSetChannelMutationVariables>;
export const DmxFixtureSetDmxDeviceDocument = gql`
    mutation DMXFixtureSetDMXDevice($id: ID!, $deviceId: ID!) {
  dmxFixtureSetDMXDevice(id: $id, DMXDeviceID: $deviceId)
}
    `;
export type DmxFixtureSetDmxDeviceMutationFn = ApolloReactCommon.MutationFunction<DmxFixtureSetDmxDeviceMutation, DmxFixtureSetDmxDeviceMutationVariables>;

/**
 * __useDmxFixtureSetDmxDeviceMutation__
 *
 * To run a mutation, you first call `useDmxFixtureSetDmxDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxFixtureSetDmxDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxFixtureSetDmxDeviceMutation, { data, loading, error }] = useDmxFixtureSetDmxDeviceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      deviceId: // value for 'deviceId'
 *   },
 * });
 */
export function useDmxFixtureSetDmxDeviceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxFixtureSetDmxDeviceMutation, DmxFixtureSetDmxDeviceMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxFixtureSetDmxDeviceMutation, DmxFixtureSetDmxDeviceMutationVariables>(DmxFixtureSetDmxDeviceDocument, baseOptions);
      }
export type DmxFixtureSetDmxDeviceMutationHookResult = ReturnType<typeof useDmxFixtureSetDmxDeviceMutation>;
export type DmxFixtureSetDmxDeviceMutationResult = ApolloReactCommon.MutationResult<DmxFixtureSetDmxDeviceMutation>;
export type DmxFixtureSetDmxDeviceMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxFixtureSetDmxDeviceMutation, DmxFixtureSetDmxDeviceMutationVariables>;
export const DmxFixtureSetModeDocument = gql`
    mutation DMXFixtureSetMode($id: ID!, $mode: DMXFixtureMode!) {
  dmxFixtureSetMode(id: $id, mode: $mode)
}
    `;
export type DmxFixtureSetModeMutationFn = ApolloReactCommon.MutationFunction<DmxFixtureSetModeMutation, DmxFixtureSetModeMutationVariables>;

/**
 * __useDmxFixtureSetModeMutation__
 *
 * To run a mutation, you first call `useDmxFixtureSetModeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxFixtureSetModeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxFixtureSetModeMutation, { data, loading, error }] = useDmxFixtureSetModeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      mode: // value for 'mode'
 *   },
 * });
 */
export function useDmxFixtureSetModeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxFixtureSetModeMutation, DmxFixtureSetModeMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxFixtureSetModeMutation, DmxFixtureSetModeMutationVariables>(DmxFixtureSetModeDocument, baseOptions);
      }
export type DmxFixtureSetModeMutationHookResult = ReturnType<typeof useDmxFixtureSetModeMutation>;
export type DmxFixtureSetModeMutationResult = ApolloReactCommon.MutationResult<DmxFixtureSetModeMutation>;
export type DmxFixtureSetModeMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxFixtureSetModeMutation, DmxFixtureSetModeMutationVariables>;
export const DmxFixtureSetNameDocument = gql`
    mutation DMXFixtureSetName($id: ID!, $name: String!) {
  dmxFixtureSetName(id: $id, name: $name)
}
    `;
export type DmxFixtureSetNameMutationFn = ApolloReactCommon.MutationFunction<DmxFixtureSetNameMutation, DmxFixtureSetNameMutationVariables>;

/**
 * __useDmxFixtureSetNameMutation__
 *
 * To run a mutation, you first call `useDmxFixtureSetNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxFixtureSetNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxFixtureSetNameMutation, { data, loading, error }] = useDmxFixtureSetNameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDmxFixtureSetNameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxFixtureSetNameMutation, DmxFixtureSetNameMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxFixtureSetNameMutation, DmxFixtureSetNameMutationVariables>(DmxFixtureSetNameDocument, baseOptions);
      }
export type DmxFixtureSetNameMutationHookResult = ReturnType<typeof useDmxFixtureSetNameMutation>;
export type DmxFixtureSetNameMutationResult = ApolloReactCommon.MutationResult<DmxFixtureSetNameMutation>;
export type DmxFixtureSetNameMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxFixtureSetNameMutation, DmxFixtureSetNameMutationVariables>;
export const DmxFixtureSetPassiveChannelsDocument = gql`
    mutation DMXFixtureSetPassiveChannels($id: ID!, $passiveChannels: DMXPassiveChannelsInput!) {
  dmxFixtureSetPassiveChannels(id: $id, passiveChannels: $passiveChannels)
}
    `;
export type DmxFixtureSetPassiveChannelsMutationFn = ApolloReactCommon.MutationFunction<DmxFixtureSetPassiveChannelsMutation, DmxFixtureSetPassiveChannelsMutationVariables>;

/**
 * __useDmxFixtureSetPassiveChannelsMutation__
 *
 * To run a mutation, you first call `useDmxFixtureSetPassiveChannelsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxFixtureSetPassiveChannelsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxFixtureSetPassiveChannelsMutation, { data, loading, error }] = useDmxFixtureSetPassiveChannelsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      passiveChannels: // value for 'passiveChannels'
 *   },
 * });
 */
export function useDmxFixtureSetPassiveChannelsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxFixtureSetPassiveChannelsMutation, DmxFixtureSetPassiveChannelsMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxFixtureSetPassiveChannelsMutation, DmxFixtureSetPassiveChannelsMutationVariables>(DmxFixtureSetPassiveChannelsDocument, baseOptions);
      }
export type DmxFixtureSetPassiveChannelsMutationHookResult = ReturnType<typeof useDmxFixtureSetPassiveChannelsMutation>;
export type DmxFixtureSetPassiveChannelsMutationResult = ApolloReactCommon.MutationResult<DmxFixtureSetPassiveChannelsMutation>;
export type DmxFixtureSetPassiveChannelsMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxFixtureSetPassiveChannelsMutation, DmxFixtureSetPassiveChannelsMutationVariables>;
export const DmxFixtureSetTagsDocument = gql`
    mutation DMXFixtureSetTags($id: ID!, $newTags: [String!]!) {
  dmxFixtureSetTags(id: $id, newTags: $newTags)
}
    `;
export type DmxFixtureSetTagsMutationFn = ApolloReactCommon.MutationFunction<DmxFixtureSetTagsMutation, DmxFixtureSetTagsMutationVariables>;

/**
 * __useDmxFixtureSetTagsMutation__
 *
 * To run a mutation, you first call `useDmxFixtureSetTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxFixtureSetTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxFixtureSetTagsMutation, { data, loading, error }] = useDmxFixtureSetTagsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      newTags: // value for 'newTags'
 *   },
 * });
 */
export function useDmxFixtureSetTagsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxFixtureSetTagsMutation, DmxFixtureSetTagsMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxFixtureSetTagsMutation, DmxFixtureSetTagsMutationVariables>(DmxFixtureSetTagsDocument, baseOptions);
      }
export type DmxFixtureSetTagsMutationHookResult = ReturnType<typeof useDmxFixtureSetTagsMutation>;
export type DmxFixtureSetTagsMutationResult = ApolloReactCommon.MutationResult<DmxFixtureSetTagsMutation>;
export type DmxFixtureSetTagsMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxFixtureSetTagsMutation, DmxFixtureSetTagsMutationVariables>;
export const DmxFixturesDocument = gql`
    subscription DMXFixtures($simulatorId: ID, $clientId: ID) {
  dmxFixtures(simulatorId: $simulatorId, clientId: $clientId) {
    id
    name
    DMXDevice {
      id
      name
      channels
    }
    channel
    mode
    tags
    passiveChannels {
      amber
      white
      uv
      intensity
      strobe
      generic
      nothing
      color
    }
  }
}
    `;

/**
 * __useDmxFixturesSubscription__
 *
 * To run a query within a React component, call `useDmxFixturesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDmxFixturesSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDmxFixturesSubscription({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useDmxFixturesSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<DmxFixturesSubscription, DmxFixturesSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<DmxFixturesSubscription, DmxFixturesSubscriptionVariables>(DmxFixturesDocument, baseOptions);
      }
export type DmxFixturesSubscriptionHookResult = ReturnType<typeof useDmxFixturesSubscription>;
export type DmxFixturesSubscriptionResult = ApolloReactCommon.SubscriptionResult<DmxFixturesSubscription>;
export const DmxFixtureTagsDocument = gql`
    query DMXFixtureTags {
  dmxFixtures {
    id
    tags
  }
}
    `;

/**
 * __useDmxFixtureTagsQuery__
 *
 * To run a query within a React component, call `useDmxFixtureTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDmxFixtureTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDmxFixtureTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDmxFixtureTagsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DmxFixtureTagsQuery, DmxFixtureTagsQueryVariables>) {
        return ApolloReactHooks.useQuery<DmxFixtureTagsQuery, DmxFixtureTagsQueryVariables>(DmxFixtureTagsDocument, baseOptions);
      }
export function useDmxFixtureTagsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DmxFixtureTagsQuery, DmxFixtureTagsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DmxFixtureTagsQuery, DmxFixtureTagsQueryVariables>(DmxFixtureTagsDocument, baseOptions);
        }
export type DmxFixtureTagsQueryHookResult = ReturnType<typeof useDmxFixtureTagsQuery>;
export type DmxFixtureTagsLazyQueryHookResult = ReturnType<typeof useDmxFixtureTagsLazyQuery>;
export type DmxFixtureTagsQueryResult = ApolloReactCommon.QueryResult<DmxFixtureTagsQuery, DmxFixtureTagsQueryVariables>;
export const DmxSetCreateDocument = gql`
    mutation DMXSetCreate($name: String!) {
  dmxSetCreate(name: $name)
}
    `;
export type DmxSetCreateMutationFn = ApolloReactCommon.MutationFunction<DmxSetCreateMutation, DmxSetCreateMutationVariables>;

/**
 * __useDmxSetCreateMutation__
 *
 * To run a mutation, you first call `useDmxSetCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxSetCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxSetCreateMutation, { data, loading, error }] = useDmxSetCreateMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDmxSetCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxSetCreateMutation, DmxSetCreateMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxSetCreateMutation, DmxSetCreateMutationVariables>(DmxSetCreateDocument, baseOptions);
      }
export type DmxSetCreateMutationHookResult = ReturnType<typeof useDmxSetCreateMutation>;
export type DmxSetCreateMutationResult = ApolloReactCommon.MutationResult<DmxSetCreateMutation>;
export type DmxSetCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxSetCreateMutation, DmxSetCreateMutationVariables>;
export const DmxSetDuplicateDocument = gql`
    mutation DMXSetDuplicate($id: ID!, $name: String!) {
  dmxSetDuplicate(id: $id, name: $name)
}
    `;
export type DmxSetDuplicateMutationFn = ApolloReactCommon.MutationFunction<DmxSetDuplicateMutation, DmxSetDuplicateMutationVariables>;

/**
 * __useDmxSetDuplicateMutation__
 *
 * To run a mutation, you first call `useDmxSetDuplicateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxSetDuplicateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxSetDuplicateMutation, { data, loading, error }] = useDmxSetDuplicateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDmxSetDuplicateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxSetDuplicateMutation, DmxSetDuplicateMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxSetDuplicateMutation, DmxSetDuplicateMutationVariables>(DmxSetDuplicateDocument, baseOptions);
      }
export type DmxSetDuplicateMutationHookResult = ReturnType<typeof useDmxSetDuplicateMutation>;
export type DmxSetDuplicateMutationResult = ApolloReactCommon.MutationResult<DmxSetDuplicateMutation>;
export type DmxSetDuplicateMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxSetDuplicateMutation, DmxSetDuplicateMutationVariables>;
export const DmxSetRemoveDocument = gql`
    mutation DMXSetRemove($id: ID!) {
  dmxSetRemove(id: $id)
}
    `;
export type DmxSetRemoveMutationFn = ApolloReactCommon.MutationFunction<DmxSetRemoveMutation, DmxSetRemoveMutationVariables>;

/**
 * __useDmxSetRemoveMutation__
 *
 * To run a mutation, you first call `useDmxSetRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxSetRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxSetRemoveMutation, { data, loading, error }] = useDmxSetRemoveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDmxSetRemoveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxSetRemoveMutation, DmxSetRemoveMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxSetRemoveMutation, DmxSetRemoveMutationVariables>(DmxSetRemoveDocument, baseOptions);
      }
export type DmxSetRemoveMutationHookResult = ReturnType<typeof useDmxSetRemoveMutation>;
export type DmxSetRemoveMutationResult = ApolloReactCommon.MutationResult<DmxSetRemoveMutation>;
export type DmxSetRemoveMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxSetRemoveMutation, DmxSetRemoveMutationVariables>;
export const DmxSetSetNameDocument = gql`
    mutation DMXSetSetName($id: ID!, $name: String!) {
  dmxSetSetName(id: $id, name: $name)
}
    `;
export type DmxSetSetNameMutationFn = ApolloReactCommon.MutationFunction<DmxSetSetNameMutation, DmxSetSetNameMutationVariables>;

/**
 * __useDmxSetSetNameMutation__
 *
 * To run a mutation, you first call `useDmxSetSetNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDmxSetSetNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dmxSetSetNameMutation, { data, loading, error }] = useDmxSetSetNameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDmxSetSetNameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DmxSetSetNameMutation, DmxSetSetNameMutationVariables>) {
        return ApolloReactHooks.useMutation<DmxSetSetNameMutation, DmxSetSetNameMutationVariables>(DmxSetSetNameDocument, baseOptions);
      }
export type DmxSetSetNameMutationHookResult = ReturnType<typeof useDmxSetSetNameMutation>;
export type DmxSetSetNameMutationResult = ApolloReactCommon.MutationResult<DmxSetSetNameMutation>;
export type DmxSetSetNameMutationOptions = ApolloReactCommon.BaseMutationOptions<DmxSetSetNameMutation, DmxSetSetNameMutationVariables>;
export const DmxSetsDocument = gql`
    subscription DMXSets {
  dmxSets {
    id
    name
    fixtures {
      id
      name
      DMXDevice {
        id
        name
        class
        channels
      }
      channel
      mode
      tags
    }
  }
}
    `;

/**
 * __useDmxSetsSubscription__
 *
 * To run a query within a React component, call `useDmxSetsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDmxSetsSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDmxSetsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useDmxSetsSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<DmxSetsSubscription, DmxSetsSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<DmxSetsSubscription, DmxSetsSubscriptionVariables>(DmxSetsDocument, baseOptions);
      }
export type DmxSetsSubscriptionHookResult = ReturnType<typeof useDmxSetsSubscription>;
export type DmxSetsSubscriptionResult = ApolloReactCommon.SubscriptionResult<DmxSetsSubscription>;
export const EntityCreateTemplateDocument = gql`
    mutation EntityCreateTemplate($name: String!) {
  entityCreate(flightId: "template", template: true) {
    id
  }
  entitySetTemplate(category: "generic")
  entitySetIdentity(name: $name)
  entitySetAppearance(meshType: cube, color: "#0088ff")
}
    `;
export type EntityCreateTemplateMutationFn = ApolloReactCommon.MutationFunction<EntityCreateTemplateMutation, EntityCreateTemplateMutationVariables>;

/**
 * __useEntityCreateTemplateMutation__
 *
 * To run a mutation, you first call `useEntityCreateTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntityCreateTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entityCreateTemplateMutation, { data, loading, error }] = useEntityCreateTemplateMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useEntityCreateTemplateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntityCreateTemplateMutation, EntityCreateTemplateMutationVariables>) {
        return ApolloReactHooks.useMutation<EntityCreateTemplateMutation, EntityCreateTemplateMutationVariables>(EntityCreateTemplateDocument, baseOptions);
      }
export type EntityCreateTemplateMutationHookResult = ReturnType<typeof useEntityCreateTemplateMutation>;
export type EntityCreateTemplateMutationResult = ApolloReactCommon.MutationResult<EntityCreateTemplateMutation>;
export type EntityCreateTemplateMutationOptions = ApolloReactCommon.BaseMutationOptions<EntityCreateTemplateMutation, EntityCreateTemplateMutationVariables>;
export const FlightSetupDocument = gql`
    query FlightSetup {
  simulators(template: true) {
    id
    name
    spaceEdventuresId
    stationSets {
      id
      name
      stations {
        name
        cards {
          name
          component
        }
        widgets
      }
    }
    capabilities {
      systems
      docking
    }
  }
  missions(aux: false) {
    id
    name
    description
    category
    requirements(all: true) {
      cards
      systems
      spaceEdventures
      docking
    }
  }
}
    `;

/**
 * __useFlightSetupQuery__
 *
 * To run a query within a React component, call `useFlightSetupQuery` and pass it any options that fit your needs.
 * When your component renders, `useFlightSetupQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlightSetupQuery({
 *   variables: {
 *   },
 * });
 */
export function useFlightSetupQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FlightSetupQuery, FlightSetupQueryVariables>) {
        return ApolloReactHooks.useQuery<FlightSetupQuery, FlightSetupQueryVariables>(FlightSetupDocument, baseOptions);
      }
export function useFlightSetupLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FlightSetupQuery, FlightSetupQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FlightSetupQuery, FlightSetupQueryVariables>(FlightSetupDocument, baseOptions);
        }
export type FlightSetupQueryHookResult = ReturnType<typeof useFlightSetupQuery>;
export type FlightSetupLazyQueryHookResult = ReturnType<typeof useFlightSetupLazyQuery>;
export type FlightSetupQueryResult = ApolloReactCommon.QueryResult<FlightSetupQuery, FlightSetupQueryVariables>;
export const FlightTypesDocument = gql`
    query FlightTypes {
  thorium {
    spaceEdventuresCenter {
      id
      name
      flightTypes {
        id
        name
        classHours
        flightHours
      }
    }
  }
}
    `;

/**
 * __useFlightTypesQuery__
 *
 * To run a query within a React component, call `useFlightTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFlightTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlightTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFlightTypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FlightTypesQuery, FlightTypesQueryVariables>) {
        return ApolloReactHooks.useQuery<FlightTypesQuery, FlightTypesQueryVariables>(FlightTypesDocument, baseOptions);
      }
export function useFlightTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FlightTypesQuery, FlightTypesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FlightTypesQuery, FlightTypesQueryVariables>(FlightTypesDocument, baseOptions);
        }
export type FlightTypesQueryHookResult = ReturnType<typeof useFlightTypesQuery>;
export type FlightTypesLazyQueryHookResult = ReturnType<typeof useFlightTypesLazyQuery>;
export type FlightTypesQueryResult = ApolloReactCommon.QueryResult<FlightTypesQuery, FlightTypesQueryVariables>;
export const StartFlightDocument = gql`
    mutation StartFlight($name: String!, $simulators: [SimulatorInput!]!, $flightType: String) {
  startFlight(name: $name, simulators: $simulators, flightType: $flightType)
}
    `;
export type StartFlightMutationFn = ApolloReactCommon.MutationFunction<StartFlightMutation, StartFlightMutationVariables>;

/**
 * __useStartFlightMutation__
 *
 * To run a mutation, you first call `useStartFlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartFlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startFlightMutation, { data, loading, error }] = useStartFlightMutation({
 *   variables: {
 *      name: // value for 'name'
 *      simulators: // value for 'simulators'
 *      flightType: // value for 'flightType'
 *   },
 * });
 */
export function useStartFlightMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StartFlightMutation, StartFlightMutationVariables>) {
        return ApolloReactHooks.useMutation<StartFlightMutation, StartFlightMutationVariables>(StartFlightDocument, baseOptions);
      }
export type StartFlightMutationHookResult = ReturnType<typeof useStartFlightMutation>;
export type StartFlightMutationResult = ApolloReactCommon.MutationResult<StartFlightMutation>;
export type StartFlightMutationOptions = ApolloReactCommon.BaseMutationOptions<StartFlightMutation, StartFlightMutationVariables>;
export const MacroDuplicateDocument = gql`
    mutation MacroDuplicate($id: ID!) {
  duplicateMacro(id: $id)
}
    `;
export type MacroDuplicateMutationFn = ApolloReactCommon.MutationFunction<MacroDuplicateMutation, MacroDuplicateMutationVariables>;

/**
 * __useMacroDuplicateMutation__
 *
 * To run a mutation, you first call `useMacroDuplicateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMacroDuplicateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [macroDuplicateMutation, { data, loading, error }] = useMacroDuplicateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMacroDuplicateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MacroDuplicateMutation, MacroDuplicateMutationVariables>) {
        return ApolloReactHooks.useMutation<MacroDuplicateMutation, MacroDuplicateMutationVariables>(MacroDuplicateDocument, baseOptions);
      }
export type MacroDuplicateMutationHookResult = ReturnType<typeof useMacroDuplicateMutation>;
export type MacroDuplicateMutationResult = ApolloReactCommon.MutationResult<MacroDuplicateMutation>;
export type MacroDuplicateMutationOptions = ApolloReactCommon.BaseMutationOptions<MacroDuplicateMutation, MacroDuplicateMutationVariables>;
export const MacroDuplicateActionDocument = gql`
    mutation MacroDuplicateAction($id: ID!, $actionId: ID!) {
  duplicateMacroAction(id: $id, actionId: $actionId)
}
    `;
export type MacroDuplicateActionMutationFn = ApolloReactCommon.MutationFunction<MacroDuplicateActionMutation, MacroDuplicateActionMutationVariables>;

/**
 * __useMacroDuplicateActionMutation__
 *
 * To run a mutation, you first call `useMacroDuplicateActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMacroDuplicateActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [macroDuplicateActionMutation, { data, loading, error }] = useMacroDuplicateActionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      actionId: // value for 'actionId'
 *   },
 * });
 */
export function useMacroDuplicateActionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MacroDuplicateActionMutation, MacroDuplicateActionMutationVariables>) {
        return ApolloReactHooks.useMutation<MacroDuplicateActionMutation, MacroDuplicateActionMutationVariables>(MacroDuplicateActionDocument, baseOptions);
      }
export type MacroDuplicateActionMutationHookResult = ReturnType<typeof useMacroDuplicateActionMutation>;
export type MacroDuplicateActionMutationResult = ApolloReactCommon.MutationResult<MacroDuplicateActionMutation>;
export type MacroDuplicateActionMutationOptions = ApolloReactCommon.BaseMutationOptions<MacroDuplicateActionMutation, MacroDuplicateActionMutationVariables>;
export const TimelineAddItemDocument = gql`
    mutation TimelineAddItem($simulatorId: ID, $missionId: ID, $timelineStepId: ID!, $timelineItem: TimelineItemInput!) {
  addTimelineItemToTimelineStep(simulatorId: $simulatorId, missionId: $missionId, timelineStepId: $timelineStepId, timelineItem: $timelineItem)
}
    `;
export type TimelineAddItemMutationFn = ApolloReactCommon.MutationFunction<TimelineAddItemMutation, TimelineAddItemMutationVariables>;

/**
 * __useTimelineAddItemMutation__
 *
 * To run a mutation, you first call `useTimelineAddItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTimelineAddItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [timelineAddItemMutation, { data, loading, error }] = useTimelineAddItemMutation({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *      missionId: // value for 'missionId'
 *      timelineStepId: // value for 'timelineStepId'
 *      timelineItem: // value for 'timelineItem'
 *   },
 * });
 */
export function useTimelineAddItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TimelineAddItemMutation, TimelineAddItemMutationVariables>) {
        return ApolloReactHooks.useMutation<TimelineAddItemMutation, TimelineAddItemMutationVariables>(TimelineAddItemDocument, baseOptions);
      }
export type TimelineAddItemMutationHookResult = ReturnType<typeof useTimelineAddItemMutation>;
export type TimelineAddItemMutationResult = ApolloReactCommon.MutationResult<TimelineAddItemMutation>;
export type TimelineAddItemMutationOptions = ApolloReactCommon.BaseMutationOptions<TimelineAddItemMutation, TimelineAddItemMutationVariables>;
export const TimelineAddStepDocument = gql`
    mutation TimelineAddStep($simulatorId: ID, $missionId: ID, $name: String!, $description: String) {
  addTimelineStep(simulatorId: $simulatorId, missionId: $missionId, name: $name, description: $description)
}
    `;
export type TimelineAddStepMutationFn = ApolloReactCommon.MutationFunction<TimelineAddStepMutation, TimelineAddStepMutationVariables>;

/**
 * __useTimelineAddStepMutation__
 *
 * To run a mutation, you first call `useTimelineAddStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTimelineAddStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [timelineAddStepMutation, { data, loading, error }] = useTimelineAddStepMutation({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *      missionId: // value for 'missionId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useTimelineAddStepMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TimelineAddStepMutation, TimelineAddStepMutationVariables>) {
        return ApolloReactHooks.useMutation<TimelineAddStepMutation, TimelineAddStepMutationVariables>(TimelineAddStepDocument, baseOptions);
      }
export type TimelineAddStepMutationHookResult = ReturnType<typeof useTimelineAddStepMutation>;
export type TimelineAddStepMutationResult = ApolloReactCommon.MutationResult<TimelineAddStepMutation>;
export type TimelineAddStepMutationOptions = ApolloReactCommon.BaseMutationOptions<TimelineAddStepMutation, TimelineAddStepMutationVariables>;
export const TimelineDuplicateItemDocument = gql`
    mutation TimelineDuplicateItem($missionId: ID!, $timelineStepId: ID!, $timelineItemId: ID!) {
  timelineDuplicateItem(missionId: $missionId, timelineStepId: $timelineStepId, timelineItemId: $timelineItemId)
}
    `;
export type TimelineDuplicateItemMutationFn = ApolloReactCommon.MutationFunction<TimelineDuplicateItemMutation, TimelineDuplicateItemMutationVariables>;

/**
 * __useTimelineDuplicateItemMutation__
 *
 * To run a mutation, you first call `useTimelineDuplicateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTimelineDuplicateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [timelineDuplicateItemMutation, { data, loading, error }] = useTimelineDuplicateItemMutation({
 *   variables: {
 *      missionId: // value for 'missionId'
 *      timelineStepId: // value for 'timelineStepId'
 *      timelineItemId: // value for 'timelineItemId'
 *   },
 * });
 */
export function useTimelineDuplicateItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TimelineDuplicateItemMutation, TimelineDuplicateItemMutationVariables>) {
        return ApolloReactHooks.useMutation<TimelineDuplicateItemMutation, TimelineDuplicateItemMutationVariables>(TimelineDuplicateItemDocument, baseOptions);
      }
export type TimelineDuplicateItemMutationHookResult = ReturnType<typeof useTimelineDuplicateItemMutation>;
export type TimelineDuplicateItemMutationResult = ApolloReactCommon.MutationResult<TimelineDuplicateItemMutation>;
export type TimelineDuplicateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<TimelineDuplicateItemMutation, TimelineDuplicateItemMutationVariables>;
export const TimelineDuplicateStepDocument = gql`
    mutation TimelineDuplicateStep($missionId: ID!, $timelineStepId: ID!) {
  duplicateTimelineStep(missionId: $missionId, timelineStepId: $timelineStepId)
}
    `;
export type TimelineDuplicateStepMutationFn = ApolloReactCommon.MutationFunction<TimelineDuplicateStepMutation, TimelineDuplicateStepMutationVariables>;

/**
 * __useTimelineDuplicateStepMutation__
 *
 * To run a mutation, you first call `useTimelineDuplicateStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTimelineDuplicateStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [timelineDuplicateStepMutation, { data, loading, error }] = useTimelineDuplicateStepMutation({
 *   variables: {
 *      missionId: // value for 'missionId'
 *      timelineStepId: // value for 'timelineStepId'
 *   },
 * });
 */
export function useTimelineDuplicateStepMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TimelineDuplicateStepMutation, TimelineDuplicateStepMutationVariables>) {
        return ApolloReactHooks.useMutation<TimelineDuplicateStepMutation, TimelineDuplicateStepMutationVariables>(TimelineDuplicateStepDocument, baseOptions);
      }
export type TimelineDuplicateStepMutationHookResult = ReturnType<typeof useTimelineDuplicateStepMutation>;
export type TimelineDuplicateStepMutationResult = ApolloReactCommon.MutationResult<TimelineDuplicateStepMutation>;
export type TimelineDuplicateStepMutationOptions = ApolloReactCommon.BaseMutationOptions<TimelineDuplicateStepMutation, TimelineDuplicateStepMutationVariables>;
export const EditMissionDocument = gql`
    mutation EditMission($missionId: ID!, $name: String, $description: String, $category: String, $aux: Boolean) {
  editMission(missionId: $missionId, name: $name, description: $description, category: $category, aux: $aux)
}
    `;
export type EditMissionMutationFn = ApolloReactCommon.MutationFunction<EditMissionMutation, EditMissionMutationVariables>;

/**
 * __useEditMissionMutation__
 *
 * To run a mutation, you first call `useEditMissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMissionMutation, { data, loading, error }] = useEditMissionMutation({
 *   variables: {
 *      missionId: // value for 'missionId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      category: // value for 'category'
 *      aux: // value for 'aux'
 *   },
 * });
 */
export function useEditMissionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditMissionMutation, EditMissionMutationVariables>) {
        return ApolloReactHooks.useMutation<EditMissionMutation, EditMissionMutationVariables>(EditMissionDocument, baseOptions);
      }
export type EditMissionMutationHookResult = ReturnType<typeof useEditMissionMutation>;
export type EditMissionMutationResult = ApolloReactCommon.MutationResult<EditMissionMutation>;
export type EditMissionMutationOptions = ApolloReactCommon.BaseMutationOptions<EditMissionMutation, EditMissionMutationVariables>;
export const IntrospectionQueryDocument = gql`
    query IntrospectionQuery {
  __schema {
    mutationType {
      name
      description
      fields {
        name
        description
      }
    }
  }
}
    `;

/**
 * __useIntrospectionQueryQuery__
 *
 * To run a query within a React component, call `useIntrospectionQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useIntrospectionQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIntrospectionQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useIntrospectionQueryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IntrospectionQueryQuery, IntrospectionQueryQueryVariables>) {
        return ApolloReactHooks.useQuery<IntrospectionQueryQuery, IntrospectionQueryQueryVariables>(IntrospectionQueryDocument, baseOptions);
      }
export function useIntrospectionQueryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IntrospectionQueryQuery, IntrospectionQueryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IntrospectionQueryQuery, IntrospectionQueryQueryVariables>(IntrospectionQueryDocument, baseOptions);
        }
export type IntrospectionQueryQueryHookResult = ReturnType<typeof useIntrospectionQueryQuery>;
export type IntrospectionQueryLazyQueryHookResult = ReturnType<typeof useIntrospectionQueryLazyQuery>;
export type IntrospectionQueryQueryResult = ApolloReactCommon.QueryResult<IntrospectionQueryQuery, IntrospectionQueryQueryVariables>;
export const MissionSubscriptionDocument = gql`
    subscription MissionSubscription($missionId: ID!) {
  missionsUpdate(missionId: $missionId) {
    id
    name
    description
    category
    aux
    extraRequirements {
      systems
      cards
    }
    requirements {
      systems
      cards
      spaceEdventures
      docking
    }
    timeline {
      id
      name
      description
      order
      timelineItems {
        id
        name
        type
        event
        args
        delay
        needsConfig
        noCancelOnReset
      }
    }
  }
}
    `;

/**
 * __useMissionSubscriptionSubscription__
 *
 * To run a query within a React component, call `useMissionSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMissionSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMissionSubscriptionSubscription({
 *   variables: {
 *      missionId: // value for 'missionId'
 *   },
 * });
 */
export function useMissionSubscriptionSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<MissionSubscriptionSubscription, MissionSubscriptionSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<MissionSubscriptionSubscription, MissionSubscriptionSubscriptionVariables>(MissionSubscriptionDocument, baseOptions);
      }
export type MissionSubscriptionSubscriptionHookResult = ReturnType<typeof useMissionSubscriptionSubscription>;
export type MissionSubscriptionSubscriptionResult = ApolloReactCommon.SubscriptionResult<MissionSubscriptionSubscription>;
export const RemoveMissionDocument = gql`
    mutation RemoveMission($id: ID!) {
  removeMission(missionId: $id)
}
    `;
export type RemoveMissionMutationFn = ApolloReactCommon.MutationFunction<RemoveMissionMutation, RemoveMissionMutationVariables>;

/**
 * __useRemoveMissionMutation__
 *
 * To run a mutation, you first call `useRemoveMissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMissionMutation, { data, loading, error }] = useRemoveMissionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveMissionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveMissionMutation, RemoveMissionMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveMissionMutation, RemoveMissionMutationVariables>(RemoveMissionDocument, baseOptions);
      }
export type RemoveMissionMutationHookResult = ReturnType<typeof useRemoveMissionMutation>;
export type RemoveMissionMutationResult = ApolloReactCommon.MutationResult<RemoveMissionMutation>;
export type RemoveMissionMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveMissionMutation, RemoveMissionMutationVariables>;
export const TimelineRemoveItemDocument = gql`
    mutation TimelineRemoveItem($missionId: ID!, $timelineStepId: ID!, $timelineItemId: ID!) {
  removeTimelineStepItem(missionId: $missionId, timelineStepId: $timelineStepId, timelineItemId: $timelineItemId)
}
    `;
export type TimelineRemoveItemMutationFn = ApolloReactCommon.MutationFunction<TimelineRemoveItemMutation, TimelineRemoveItemMutationVariables>;

/**
 * __useTimelineRemoveItemMutation__
 *
 * To run a mutation, you first call `useTimelineRemoveItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTimelineRemoveItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [timelineRemoveItemMutation, { data, loading, error }] = useTimelineRemoveItemMutation({
 *   variables: {
 *      missionId: // value for 'missionId'
 *      timelineStepId: // value for 'timelineStepId'
 *      timelineItemId: // value for 'timelineItemId'
 *   },
 * });
 */
export function useTimelineRemoveItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TimelineRemoveItemMutation, TimelineRemoveItemMutationVariables>) {
        return ApolloReactHooks.useMutation<TimelineRemoveItemMutation, TimelineRemoveItemMutationVariables>(TimelineRemoveItemDocument, baseOptions);
      }
export type TimelineRemoveItemMutationHookResult = ReturnType<typeof useTimelineRemoveItemMutation>;
export type TimelineRemoveItemMutationResult = ApolloReactCommon.MutationResult<TimelineRemoveItemMutation>;
export type TimelineRemoveItemMutationOptions = ApolloReactCommon.BaseMutationOptions<TimelineRemoveItemMutation, TimelineRemoveItemMutationVariables>;
export const TimelineRemoveStepDocument = gql`
    mutation TimelineRemoveStep($missionId: ID!, $timelineStepId: ID!) {
  removeTimelineStep(missionId: $missionId, timelineStepId: $timelineStepId)
}
    `;
export type TimelineRemoveStepMutationFn = ApolloReactCommon.MutationFunction<TimelineRemoveStepMutation, TimelineRemoveStepMutationVariables>;

/**
 * __useTimelineRemoveStepMutation__
 *
 * To run a mutation, you first call `useTimelineRemoveStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTimelineRemoveStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [timelineRemoveStepMutation, { data, loading, error }] = useTimelineRemoveStepMutation({
 *   variables: {
 *      missionId: // value for 'missionId'
 *      timelineStepId: // value for 'timelineStepId'
 *   },
 * });
 */
export function useTimelineRemoveStepMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TimelineRemoveStepMutation, TimelineRemoveStepMutationVariables>) {
        return ApolloReactHooks.useMutation<TimelineRemoveStepMutation, TimelineRemoveStepMutationVariables>(TimelineRemoveStepDocument, baseOptions);
      }
export type TimelineRemoveStepMutationHookResult = ReturnType<typeof useTimelineRemoveStepMutation>;
export type TimelineRemoveStepMutationResult = ApolloReactCommon.MutationResult<TimelineRemoveStepMutation>;
export type TimelineRemoveStepMutationOptions = ApolloReactCommon.BaseMutationOptions<TimelineRemoveStepMutation, TimelineRemoveStepMutationVariables>;
export const TimelineReorderStepDocument = gql`
    mutation TimelineReorderStep($missionId: ID, $timelineStepId: ID!, $order: Int!) {
  reorderTimelineStep(missionId: $missionId, timelineStepId: $timelineStepId, order: $order)
}
    `;
export type TimelineReorderStepMutationFn = ApolloReactCommon.MutationFunction<TimelineReorderStepMutation, TimelineReorderStepMutationVariables>;

/**
 * __useTimelineReorderStepMutation__
 *
 * To run a mutation, you first call `useTimelineReorderStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTimelineReorderStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [timelineReorderStepMutation, { data, loading, error }] = useTimelineReorderStepMutation({
 *   variables: {
 *      missionId: // value for 'missionId'
 *      timelineStepId: // value for 'timelineStepId'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useTimelineReorderStepMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TimelineReorderStepMutation, TimelineReorderStepMutationVariables>) {
        return ApolloReactHooks.useMutation<TimelineReorderStepMutation, TimelineReorderStepMutationVariables>(TimelineReorderStepDocument, baseOptions);
      }
export type TimelineReorderStepMutationHookResult = ReturnType<typeof useTimelineReorderStepMutation>;
export type TimelineReorderStepMutationResult = ApolloReactCommon.MutationResult<TimelineReorderStepMutation>;
export type TimelineReorderStepMutationOptions = ApolloReactCommon.BaseMutationOptions<TimelineReorderStepMutation, TimelineReorderStepMutationVariables>;
export const MissionSetRequirementsDocument = gql`
    mutation MissionSetRequirements($missionId: ID!, $requirements: RequirementInput!) {
  missionSetExtraRequirements(missionId: $missionId, requirements: $requirements)
}
    `;
export type MissionSetRequirementsMutationFn = ApolloReactCommon.MutationFunction<MissionSetRequirementsMutation, MissionSetRequirementsMutationVariables>;

/**
 * __useMissionSetRequirementsMutation__
 *
 * To run a mutation, you first call `useMissionSetRequirementsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMissionSetRequirementsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [missionSetRequirementsMutation, { data, loading, error }] = useMissionSetRequirementsMutation({
 *   variables: {
 *      missionId: // value for 'missionId'
 *      requirements: // value for 'requirements'
 *   },
 * });
 */
export function useMissionSetRequirementsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MissionSetRequirementsMutation, MissionSetRequirementsMutationVariables>) {
        return ApolloReactHooks.useMutation<MissionSetRequirementsMutation, MissionSetRequirementsMutationVariables>(MissionSetRequirementsDocument, baseOptions);
      }
export type MissionSetRequirementsMutationHookResult = ReturnType<typeof useMissionSetRequirementsMutation>;
export type MissionSetRequirementsMutationResult = ApolloReactCommon.MutationResult<MissionSetRequirementsMutation>;
export type MissionSetRequirementsMutationOptions = ApolloReactCommon.BaseMutationOptions<MissionSetRequirementsMutation, MissionSetRequirementsMutationVariables>;
export const TimelineUpdateItemDocument = gql`
    mutation TimelineUpdateItem($simulatorId: ID, $missionId: ID, $timelineStepId: ID!, $timelineItemId: ID!, $timelineItem: TimelineItemInput!) {
  updateTimelineStepItem(simulatorId: $simulatorId, missionId: $missionId, timelineStepId: $timelineStepId, timelineItemId: $timelineItemId, updateTimelineItem: $timelineItem)
}
    `;
export type TimelineUpdateItemMutationFn = ApolloReactCommon.MutationFunction<TimelineUpdateItemMutation, TimelineUpdateItemMutationVariables>;

/**
 * __useTimelineUpdateItemMutation__
 *
 * To run a mutation, you first call `useTimelineUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTimelineUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [timelineUpdateItemMutation, { data, loading, error }] = useTimelineUpdateItemMutation({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *      missionId: // value for 'missionId'
 *      timelineStepId: // value for 'timelineStepId'
 *      timelineItemId: // value for 'timelineItemId'
 *      timelineItem: // value for 'timelineItem'
 *   },
 * });
 */
export function useTimelineUpdateItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TimelineUpdateItemMutation, TimelineUpdateItemMutationVariables>) {
        return ApolloReactHooks.useMutation<TimelineUpdateItemMutation, TimelineUpdateItemMutationVariables>(TimelineUpdateItemDocument, baseOptions);
      }
export type TimelineUpdateItemMutationHookResult = ReturnType<typeof useTimelineUpdateItemMutation>;
export type TimelineUpdateItemMutationResult = ApolloReactCommon.MutationResult<TimelineUpdateItemMutation>;
export type TimelineUpdateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<TimelineUpdateItemMutation, TimelineUpdateItemMutationVariables>;
export const TimelineUpdateStepDocument = gql`
    mutation TimelineUpdateStep($simulatorId: ID, $missionId: ID, $timelineStepId: ID!, $name: String, $description: String) {
  updateTimelineStep(simulatorId: $simulatorId, missionId: $missionId, timelineStepId: $timelineStepId, name: $name, description: $description)
}
    `;
export type TimelineUpdateStepMutationFn = ApolloReactCommon.MutationFunction<TimelineUpdateStepMutation, TimelineUpdateStepMutationVariables>;

/**
 * __useTimelineUpdateStepMutation__
 *
 * To run a mutation, you first call `useTimelineUpdateStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTimelineUpdateStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [timelineUpdateStepMutation, { data, loading, error }] = useTimelineUpdateStepMutation({
 *   variables: {
 *      simulatorId: // value for 'simulatorId'
 *      missionId: // value for 'missionId'
 *      timelineStepId: // value for 'timelineStepId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useTimelineUpdateStepMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TimelineUpdateStepMutation, TimelineUpdateStepMutationVariables>) {
        return ApolloReactHooks.useMutation<TimelineUpdateStepMutation, TimelineUpdateStepMutationVariables>(TimelineUpdateStepDocument, baseOptions);
      }
export type TimelineUpdateStepMutationHookResult = ReturnType<typeof useTimelineUpdateStepMutation>;
export type TimelineUpdateStepMutationResult = ApolloReactCommon.MutationResult<TimelineUpdateStepMutation>;
export type TimelineUpdateStepMutationOptions = ApolloReactCommon.BaseMutationOptions<TimelineUpdateStepMutation, TimelineUpdateStepMutationVariables>;
export const AddClientDocument = gql`
    mutation AddClient($id: ID!, $client: SetClientInput!) {
  addClientToSet(id: $id, client: $client)
}
    `;
export type AddClientMutationFn = ApolloReactCommon.MutationFunction<AddClientMutation, AddClientMutationVariables>;

/**
 * __useAddClientMutation__
 *
 * To run a mutation, you first call `useAddClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addClientMutation, { data, loading, error }] = useAddClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      client: // value for 'client'
 *   },
 * });
 */
export function useAddClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddClientMutation, AddClientMutationVariables>) {
        return ApolloReactHooks.useMutation<AddClientMutation, AddClientMutationVariables>(AddClientDocument, baseOptions);
      }
export type AddClientMutationHookResult = ReturnType<typeof useAddClientMutation>;
export type AddClientMutationResult = ApolloReactCommon.MutationResult<AddClientMutation>;
export type AddClientMutationOptions = ApolloReactCommon.BaseMutationOptions<AddClientMutation, AddClientMutationVariables>;
export const AddSetDocument = gql`
    mutation AddSet($name: String!) {
  createSet(name: $name)
}
    `;
export type AddSetMutationFn = ApolloReactCommon.MutationFunction<AddSetMutation, AddSetMutationVariables>;

/**
 * __useAddSetMutation__
 *
 * To run a mutation, you first call `useAddSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSetMutation, { data, loading, error }] = useAddSetMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddSetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddSetMutation, AddSetMutationVariables>) {
        return ApolloReactHooks.useMutation<AddSetMutation, AddSetMutationVariables>(AddSetDocument, baseOptions);
      }
export type AddSetMutationHookResult = ReturnType<typeof useAddSetMutation>;
export type AddSetMutationResult = ApolloReactCommon.MutationResult<AddSetMutation>;
export type AddSetMutationOptions = ApolloReactCommon.BaseMutationOptions<AddSetMutation, AddSetMutationVariables>;
export const RemoveClientFromSetDocument = gql`
    mutation RemoveClientFromSet($id: ID!, $client: ID!) {
  removeClientFromSet(id: $id, clientId: $client)
}
    `;
export type RemoveClientFromSetMutationFn = ApolloReactCommon.MutationFunction<RemoveClientFromSetMutation, RemoveClientFromSetMutationVariables>;

/**
 * __useRemoveClientFromSetMutation__
 *
 * To run a mutation, you first call `useRemoveClientFromSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveClientFromSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeClientFromSetMutation, { data, loading, error }] = useRemoveClientFromSetMutation({
 *   variables: {
 *      id: // value for 'id'
 *      client: // value for 'client'
 *   },
 * });
 */
export function useRemoveClientFromSetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveClientFromSetMutation, RemoveClientFromSetMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveClientFromSetMutation, RemoveClientFromSetMutationVariables>(RemoveClientFromSetDocument, baseOptions);
      }
export type RemoveClientFromSetMutationHookResult = ReturnType<typeof useRemoveClientFromSetMutation>;
export type RemoveClientFromSetMutationResult = ApolloReactCommon.MutationResult<RemoveClientFromSetMutation>;
export type RemoveClientFromSetMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveClientFromSetMutation, RemoveClientFromSetMutationVariables>;
export const RemoveSetDocument = gql`
    mutation RemoveSet($id: ID!) {
  removeSet(id: $id)
}
    `;
export type RemoveSetMutationFn = ApolloReactCommon.MutationFunction<RemoveSetMutation, RemoveSetMutationVariables>;

/**
 * __useRemoveSetMutation__
 *
 * To run a mutation, you first call `useRemoveSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSetMutation, { data, loading, error }] = useRemoveSetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveSetMutation, RemoveSetMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveSetMutation, RemoveSetMutationVariables>(RemoveSetDocument, baseOptions);
      }
export type RemoveSetMutationHookResult = ReturnType<typeof useRemoveSetMutation>;
export type RemoveSetMutationResult = ApolloReactCommon.MutationResult<RemoveSetMutation>;
export type RemoveSetMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveSetMutation, RemoveSetMutationVariables>;
export const RenameSetDocument = gql`
    mutation RenameSet($id: ID!, $name: String!) {
  renameSet(id: $id, name: $name)
}
    `;
export type RenameSetMutationFn = ApolloReactCommon.MutationFunction<RenameSetMutation, RenameSetMutationVariables>;

/**
 * __useRenameSetMutation__
 *
 * To run a mutation, you first call `useRenameSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameSetMutation, { data, loading, error }] = useRenameSetMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRenameSetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RenameSetMutation, RenameSetMutationVariables>) {
        return ApolloReactHooks.useMutation<RenameSetMutation, RenameSetMutationVariables>(RenameSetDocument, baseOptions);
      }
export type RenameSetMutationHookResult = ReturnType<typeof useRenameSetMutation>;
export type RenameSetMutationResult = ApolloReactCommon.MutationResult<RenameSetMutation>;
export type RenameSetMutationOptions = ApolloReactCommon.BaseMutationOptions<RenameSetMutation, RenameSetMutationVariables>;
export const SetKeyboardAndInterfaceDocument = gql`
    query SetKeyboardAndInterface($id: ID) {
  simulators(id: $id) {
    interfaces
  }
  interfaces {
    id
    name
  }
  keyboard {
    id
    name
  }
  dmxSets {
    id
    name
  }
}
    `;

/**
 * __useSetKeyboardAndInterfaceQuery__
 *
 * To run a query within a React component, call `useSetKeyboardAndInterfaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetKeyboardAndInterfaceQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetKeyboardAndInterfaceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetKeyboardAndInterfaceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SetKeyboardAndInterfaceQuery, SetKeyboardAndInterfaceQueryVariables>) {
        return ApolloReactHooks.useQuery<SetKeyboardAndInterfaceQuery, SetKeyboardAndInterfaceQueryVariables>(SetKeyboardAndInterfaceDocument, baseOptions);
      }
export function useSetKeyboardAndInterfaceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SetKeyboardAndInterfaceQuery, SetKeyboardAndInterfaceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SetKeyboardAndInterfaceQuery, SetKeyboardAndInterfaceQueryVariables>(SetKeyboardAndInterfaceDocument, baseOptions);
        }
export type SetKeyboardAndInterfaceQueryHookResult = ReturnType<typeof useSetKeyboardAndInterfaceQuery>;
export type SetKeyboardAndInterfaceLazyQueryHookResult = ReturnType<typeof useSetKeyboardAndInterfaceLazyQuery>;
export type SetKeyboardAndInterfaceQueryResult = ApolloReactCommon.QueryResult<SetKeyboardAndInterfaceQuery, SetKeyboardAndInterfaceQueryVariables>;
export const SetsDocument = gql`
    query Sets {
  simulators(template: true) {
    id
    name
    layout
    systems {
      id
      type
    }
    stationSets {
      id
      name
      stations {
        name
      }
    }
  }
  sets {
    id
    name
    clients {
      id
      client {
        id
      }
      simulator {
        id
        name
      }
      stationSet {
        id
        name
      }
      station
      secondary
      soundPlayer
    }
  }
  clients {
    id
    cards
    mobile
  }
}
    `;

/**
 * __useSetsQuery__
 *
 * To run a query within a React component, call `useSetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSetsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SetsQuery, SetsQueryVariables>) {
        return ApolloReactHooks.useQuery<SetsQuery, SetsQueryVariables>(SetsDocument, baseOptions);
      }
export function useSetsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SetsQuery, SetsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SetsQuery, SetsQueryVariables>(SetsDocument, baseOptions);
        }
export type SetsQueryHookResult = ReturnType<typeof useSetsQuery>;
export type SetsLazyQueryHookResult = ReturnType<typeof useSetsLazyQuery>;
export type SetsQueryResult = ApolloReactCommon.QueryResult<SetsQuery, SetsQueryVariables>;
export const UpdateSetClientDocument = gql`
    mutation UpdateSetClient($id: ID!, $clientId: ID!, $secondary: Boolean, $soundPlayer: Boolean) {
  updateSetClient(id: $id, client: {id: $clientId, secondary: $secondary, soundPlayer: $soundPlayer})
}
    `;
export type UpdateSetClientMutationFn = ApolloReactCommon.MutationFunction<UpdateSetClientMutation, UpdateSetClientMutationVariables>;

/**
 * __useUpdateSetClientMutation__
 *
 * To run a mutation, you first call `useUpdateSetClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSetClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSetClientMutation, { data, loading, error }] = useUpdateSetClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      clientId: // value for 'clientId'
 *      secondary: // value for 'secondary'
 *      soundPlayer: // value for 'soundPlayer'
 *   },
 * });
 */
export function useUpdateSetClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSetClientMutation, UpdateSetClientMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateSetClientMutation, UpdateSetClientMutationVariables>(UpdateSetClientDocument, baseOptions);
      }
export type UpdateSetClientMutationHookResult = ReturnType<typeof useUpdateSetClientMutation>;
export type UpdateSetClientMutationResult = ApolloReactCommon.MutationResult<UpdateSetClientMutation>;
export type UpdateSetClientMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateSetClientMutation, UpdateSetClientMutationVariables>;
export const AddCardDocument = gql`
    mutation AddCard($id: ID!, $name: String!, $cardName: String!, $cardComponent: String!, $cardIcon: String) {
  addCardToStation(stationSetID: $id, stationName: $name, cardName: $cardName, cardComponent: $cardComponent, cardIcon: $cardIcon)
}
    `;
export type AddCardMutationFn = ApolloReactCommon.MutationFunction<AddCardMutation, AddCardMutationVariables>;

/**
 * __useAddCardMutation__
 *
 * To run a mutation, you first call `useAddCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCardMutation, { data, loading, error }] = useAddCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      cardName: // value for 'cardName'
 *      cardComponent: // value for 'cardComponent'
 *      cardIcon: // value for 'cardIcon'
 *   },
 * });
 */
export function useAddCardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCardMutation, AddCardMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCardMutation, AddCardMutationVariables>(AddCardDocument, baseOptions);
      }
export type AddCardMutationHookResult = ReturnType<typeof useAddCardMutation>;
export type AddCardMutationResult = ApolloReactCommon.MutationResult<AddCardMutation>;
export type AddCardMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCardMutation, AddCardMutationVariables>;
export const AddStationDocument = gql`
    mutation AddStation($id: ID!, $name: String!) {
  addStationToStationSet(stationSetID: $id, stationName: $name)
}
    `;
export type AddStationMutationFn = ApolloReactCommon.MutationFunction<AddStationMutation, AddStationMutationVariables>;

/**
 * __useAddStationMutation__
 *
 * To run a mutation, you first call `useAddStationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStationMutation, { data, loading, error }] = useAddStationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddStationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddStationMutation, AddStationMutationVariables>) {
        return ApolloReactHooks.useMutation<AddStationMutation, AddStationMutationVariables>(AddStationDocument, baseOptions);
      }
export type AddStationMutationHookResult = ReturnType<typeof useAddStationMutation>;
export type AddStationMutationResult = ApolloReactCommon.MutationResult<AddStationMutation>;
export type AddStationMutationOptions = ApolloReactCommon.BaseMutationOptions<AddStationMutation, AddStationMutationVariables>;
export const StationSetDuplicateDocument = gql`
    mutation StationSetDuplicate($stationSetID: ID!, $name: String!) {
  duplicateStationSet(stationSetID: $stationSetID, name: $name)
}
    `;
export type StationSetDuplicateMutationFn = ApolloReactCommon.MutationFunction<StationSetDuplicateMutation, StationSetDuplicateMutationVariables>;

/**
 * __useStationSetDuplicateMutation__
 *
 * To run a mutation, you first call `useStationSetDuplicateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStationSetDuplicateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stationSetDuplicateMutation, { data, loading, error }] = useStationSetDuplicateMutation({
 *   variables: {
 *      stationSetID: // value for 'stationSetID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useStationSetDuplicateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StationSetDuplicateMutation, StationSetDuplicateMutationVariables>) {
        return ApolloReactHooks.useMutation<StationSetDuplicateMutation, StationSetDuplicateMutationVariables>(StationSetDuplicateDocument, baseOptions);
      }
export type StationSetDuplicateMutationHookResult = ReturnType<typeof useStationSetDuplicateMutation>;
export type StationSetDuplicateMutationResult = ApolloReactCommon.MutationResult<StationSetDuplicateMutation>;
export type StationSetDuplicateMutationOptions = ApolloReactCommon.BaseMutationOptions<StationSetDuplicateMutation, StationSetDuplicateMutationVariables>;
export const PanelsAndInterfacesDocument = gql`
    query PanelsAndInterfaces {
  softwarePanels {
    id
    name
  }
  interfaces {
    id
    name
  }
}
    `;

/**
 * __usePanelsAndInterfacesQuery__
 *
 * To run a query within a React component, call `usePanelsAndInterfacesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePanelsAndInterfacesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePanelsAndInterfacesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePanelsAndInterfacesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PanelsAndInterfacesQuery, PanelsAndInterfacesQueryVariables>) {
        return ApolloReactHooks.useQuery<PanelsAndInterfacesQuery, PanelsAndInterfacesQueryVariables>(PanelsAndInterfacesDocument, baseOptions);
      }
export function usePanelsAndInterfacesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PanelsAndInterfacesQuery, PanelsAndInterfacesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PanelsAndInterfacesQuery, PanelsAndInterfacesQueryVariables>(PanelsAndInterfacesDocument, baseOptions);
        }
export type PanelsAndInterfacesQueryHookResult = ReturnType<typeof usePanelsAndInterfacesQuery>;
export type PanelsAndInterfacesLazyQueryHookResult = ReturnType<typeof usePanelsAndInterfacesLazyQuery>;
export type PanelsAndInterfacesQueryResult = ApolloReactCommon.QueryResult<PanelsAndInterfacesQuery, PanelsAndInterfacesQueryVariables>;
export const RemoveCardDocument = gql`
    mutation RemoveCard($id: ID!, $stationName: String!, $cardName: String!) {
  removeCardFromStation(stationSetID: $id, stationName: $stationName, cardName: $cardName)
}
    `;
export type RemoveCardMutationFn = ApolloReactCommon.MutationFunction<RemoveCardMutation, RemoveCardMutationVariables>;

/**
 * __useRemoveCardMutation__
 *
 * To run a mutation, you first call `useRemoveCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCardMutation, { data, loading, error }] = useRemoveCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      stationName: // value for 'stationName'
 *      cardName: // value for 'cardName'
 *   },
 * });
 */
export function useRemoveCardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveCardMutation, RemoveCardMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveCardMutation, RemoveCardMutationVariables>(RemoveCardDocument, baseOptions);
      }
export type RemoveCardMutationHookResult = ReturnType<typeof useRemoveCardMutation>;
export type RemoveCardMutationResult = ApolloReactCommon.MutationResult<RemoveCardMutation>;
export type RemoveCardMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveCardMutation, RemoveCardMutationVariables>;
export const RemoveStationDocument = gql`
    mutation RemoveStation($id: ID!, $stationName: String!) {
  removeStationFromStationSet(stationSetID: $id, stationName: $stationName)
}
    `;
export type RemoveStationMutationFn = ApolloReactCommon.MutationFunction<RemoveStationMutation, RemoveStationMutationVariables>;

/**
 * __useRemoveStationMutation__
 *
 * To run a mutation, you first call `useRemoveStationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStationMutation, { data, loading, error }] = useRemoveStationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      stationName: // value for 'stationName'
 *   },
 * });
 */
export function useRemoveStationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveStationMutation, RemoveStationMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveStationMutation, RemoveStationMutationVariables>(RemoveStationDocument, baseOptions);
      }
export type RemoveStationMutationHookResult = ReturnType<typeof useRemoveStationMutation>;
export type RemoveStationMutationResult = ApolloReactCommon.MutationResult<RemoveStationMutation>;
export type RemoveStationMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveStationMutation, RemoveStationMutationVariables>;
export const RenameStationDocument = gql`
    mutation RenameStation($id: ID!, $name: String!, $newName: String!) {
  editStationInStationSet(stationSetID: $id, stationName: $name, newStationName: $newName)
}
    `;
export type RenameStationMutationFn = ApolloReactCommon.MutationFunction<RenameStationMutation, RenameStationMutationVariables>;

/**
 * __useRenameStationMutation__
 *
 * To run a mutation, you first call `useRenameStationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameStationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameStationMutation, { data, loading, error }] = useRenameStationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      newName: // value for 'newName'
 *   },
 * });
 */
export function useRenameStationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RenameStationMutation, RenameStationMutationVariables>) {
        return ApolloReactHooks.useMutation<RenameStationMutation, RenameStationMutationVariables>(RenameStationDocument, baseOptions);
      }
export type RenameStationMutationHookResult = ReturnType<typeof useRenameStationMutation>;
export type RenameStationMutationResult = ApolloReactCommon.MutationResult<RenameStationMutation>;
export type RenameStationMutationOptions = ApolloReactCommon.BaseMutationOptions<RenameStationMutation, RenameStationMutationVariables>;
export const ReorderStationWidgetsDocument = gql`
    mutation ReorderStationWidgets($id: ID!, $name: String!, $widget: String!, $order: Int!) {
  reorderStationWidgets(stationSetId: $id, stationName: $name, widget: $widget, order: $order)
}
    `;
export type ReorderStationWidgetsMutationFn = ApolloReactCommon.MutationFunction<ReorderStationWidgetsMutation, ReorderStationWidgetsMutationVariables>;

/**
 * __useReorderStationWidgetsMutation__
 *
 * To run a mutation, you first call `useReorderStationWidgetsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderStationWidgetsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderStationWidgetsMutation, { data, loading, error }] = useReorderStationWidgetsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      widget: // value for 'widget'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useReorderStationWidgetsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReorderStationWidgetsMutation, ReorderStationWidgetsMutationVariables>) {
        return ApolloReactHooks.useMutation<ReorderStationWidgetsMutation, ReorderStationWidgetsMutationVariables>(ReorderStationWidgetsDocument, baseOptions);
      }
export type ReorderStationWidgetsMutationHookResult = ReturnType<typeof useReorderStationWidgetsMutation>;
export type ReorderStationWidgetsMutationResult = ApolloReactCommon.MutationResult<ReorderStationWidgetsMutation>;
export type ReorderStationWidgetsMutationOptions = ApolloReactCommon.BaseMutationOptions<ReorderStationWidgetsMutation, ReorderStationWidgetsMutationVariables>;
export const SetAmbianceDocument = gql`
    mutation SetAmbiance($stationSetID: ID!, $stationName: String!, $ambiance: String) {
  setStationAmbiance(stationSetID: $stationSetID, stationName: $stationName, ambiance: $ambiance)
}
    `;
export type SetAmbianceMutationFn = ApolloReactCommon.MutationFunction<SetAmbianceMutation, SetAmbianceMutationVariables>;

/**
 * __useSetAmbianceMutation__
 *
 * To run a mutation, you first call `useSetAmbianceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAmbianceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAmbianceMutation, { data, loading, error }] = useSetAmbianceMutation({
 *   variables: {
 *      stationSetID: // value for 'stationSetID'
 *      stationName: // value for 'stationName'
 *      ambiance: // value for 'ambiance'
 *   },
 * });
 */
export function useSetAmbianceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetAmbianceMutation, SetAmbianceMutationVariables>) {
        return ApolloReactHooks.useMutation<SetAmbianceMutation, SetAmbianceMutationVariables>(SetAmbianceDocument, baseOptions);
      }
export type SetAmbianceMutationHookResult = ReturnType<typeof useSetAmbianceMutation>;
export type SetAmbianceMutationResult = ApolloReactCommon.MutationResult<SetAmbianceMutation>;
export type SetAmbianceMutationOptions = ApolloReactCommon.BaseMutationOptions<SetAmbianceMutation, SetAmbianceMutationVariables>;
export const SetStationCrewCountDocument = gql`
    mutation SetStationCrewCount($stationSetId: ID!, $crewCount: Int!) {
  setStationSetCrewCount(stationSetID: $stationSetId, crewCount: $crewCount)
}
    `;
export type SetStationCrewCountMutationFn = ApolloReactCommon.MutationFunction<SetStationCrewCountMutation, SetStationCrewCountMutationVariables>;

/**
 * __useSetStationCrewCountMutation__
 *
 * To run a mutation, you first call `useSetStationCrewCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStationCrewCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStationCrewCountMutation, { data, loading, error }] = useSetStationCrewCountMutation({
 *   variables: {
 *      stationSetId: // value for 'stationSetId'
 *      crewCount: // value for 'crewCount'
 *   },
 * });
 */
export function useSetStationCrewCountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetStationCrewCountMutation, SetStationCrewCountMutationVariables>) {
        return ApolloReactHooks.useMutation<SetStationCrewCountMutation, SetStationCrewCountMutationVariables>(SetStationCrewCountDocument, baseOptions);
      }
export type SetStationCrewCountMutationHookResult = ReturnType<typeof useSetStationCrewCountMutation>;
export type SetStationCrewCountMutationResult = ApolloReactCommon.MutationResult<SetStationCrewCountMutation>;
export type SetStationCrewCountMutationOptions = ApolloReactCommon.BaseMutationOptions<SetStationCrewCountMutation, SetStationCrewCountMutationVariables>;
export const SetStationDescriptionDocument = gql`
    mutation SetStationDescription($stationSetID: ID!, $stationName: String!, $description: String!) {
  setStationDescription(stationSetID: $stationSetID, stationName: $stationName, description: $description)
}
    `;
export type SetStationDescriptionMutationFn = ApolloReactCommon.MutationFunction<SetStationDescriptionMutation, SetStationDescriptionMutationVariables>;

/**
 * __useSetStationDescriptionMutation__
 *
 * To run a mutation, you first call `useSetStationDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStationDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStationDescriptionMutation, { data, loading, error }] = useSetStationDescriptionMutation({
 *   variables: {
 *      stationSetID: // value for 'stationSetID'
 *      stationName: // value for 'stationName'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useSetStationDescriptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetStationDescriptionMutation, SetStationDescriptionMutationVariables>) {
        return ApolloReactHooks.useMutation<SetStationDescriptionMutation, SetStationDescriptionMutationVariables>(SetStationDescriptionDocument, baseOptions);
      }
export type SetStationDescriptionMutationHookResult = ReturnType<typeof useSetStationDescriptionMutation>;
export type SetStationDescriptionMutationResult = ApolloReactCommon.MutationResult<SetStationDescriptionMutation>;
export type SetStationDescriptionMutationOptions = ApolloReactCommon.BaseMutationOptions<SetStationDescriptionMutation, SetStationDescriptionMutationVariables>;
export const SetStationLayoutDocument = gql`
    mutation SetStationLayout($id: ID!, $name: String!, $layout: String!) {
  setStationLayout(stationSetID: $id, stationName: $name, layout: $layout)
}
    `;
export type SetStationLayoutMutationFn = ApolloReactCommon.MutationFunction<SetStationLayoutMutation, SetStationLayoutMutationVariables>;

/**
 * __useSetStationLayoutMutation__
 *
 * To run a mutation, you first call `useSetStationLayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStationLayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStationLayoutMutation, { data, loading, error }] = useSetStationLayoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      layout: // value for 'layout'
 *   },
 * });
 */
export function useSetStationLayoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetStationLayoutMutation, SetStationLayoutMutationVariables>) {
        return ApolloReactHooks.useMutation<SetStationLayoutMutation, SetStationLayoutMutationVariables>(SetStationLayoutDocument, baseOptions);
      }
export type SetStationLayoutMutationHookResult = ReturnType<typeof useSetStationLayoutMutation>;
export type SetStationLayoutMutationResult = ApolloReactCommon.MutationResult<SetStationLayoutMutation>;
export type SetStationLayoutMutationOptions = ApolloReactCommon.BaseMutationOptions<SetStationLayoutMutation, SetStationLayoutMutationVariables>;
export const StationSetTrainingDocument = gql`
    mutation StationSetTraining($stationSetID: ID!, $stationName: String!, $training: String!) {
  setStationTraining(stationSetID: $stationSetID, stationName: $stationName, training: $training)
}
    `;
export type StationSetTrainingMutationFn = ApolloReactCommon.MutationFunction<StationSetTrainingMutation, StationSetTrainingMutationVariables>;

/**
 * __useStationSetTrainingMutation__
 *
 * To run a mutation, you first call `useStationSetTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStationSetTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stationSetTrainingMutation, { data, loading, error }] = useStationSetTrainingMutation({
 *   variables: {
 *      stationSetID: // value for 'stationSetID'
 *      stationName: // value for 'stationName'
 *      training: // value for 'training'
 *   },
 * });
 */
export function useStationSetTrainingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StationSetTrainingMutation, StationSetTrainingMutationVariables>) {
        return ApolloReactHooks.useMutation<StationSetTrainingMutation, StationSetTrainingMutationVariables>(StationSetTrainingDocument, baseOptions);
      }
export type StationSetTrainingMutationHookResult = ReturnType<typeof useStationSetTrainingMutation>;
export type StationSetTrainingMutationResult = ApolloReactCommon.MutationResult<StationSetTrainingMutation>;
export type StationSetTrainingMutationOptions = ApolloReactCommon.BaseMutationOptions<StationSetTrainingMutation, StationSetTrainingMutationVariables>;
export const ToggleStationMessageGroupDocument = gql`
    mutation ToggleStationMessageGroup($stationSetId: ID!, $station: String!, $group: String!, $state: Boolean!) {
  toggleStationMessageGroup(stationSetId: $stationSetId, station: $station, group: $group, state: $state)
}
    `;
export type ToggleStationMessageGroupMutationFn = ApolloReactCommon.MutationFunction<ToggleStationMessageGroupMutation, ToggleStationMessageGroupMutationVariables>;

/**
 * __useToggleStationMessageGroupMutation__
 *
 * To run a mutation, you first call `useToggleStationMessageGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleStationMessageGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleStationMessageGroupMutation, { data, loading, error }] = useToggleStationMessageGroupMutation({
 *   variables: {
 *      stationSetId: // value for 'stationSetId'
 *      station: // value for 'station'
 *      group: // value for 'group'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useToggleStationMessageGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleStationMessageGroupMutation, ToggleStationMessageGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<ToggleStationMessageGroupMutation, ToggleStationMessageGroupMutationVariables>(ToggleStationMessageGroupDocument, baseOptions);
      }
export type ToggleStationMessageGroupMutationHookResult = ReturnType<typeof useToggleStationMessageGroupMutation>;
export type ToggleStationMessageGroupMutationResult = ApolloReactCommon.MutationResult<ToggleStationMessageGroupMutation>;
export type ToggleStationMessageGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<ToggleStationMessageGroupMutation, ToggleStationMessageGroupMutationVariables>;
export const ToggleStationExecDocument = gql`
    mutation ToggleStationExec($stationSetID: ID!, $stationName: String!, $exec: Boolean!) {
  setStationExecutive(stationSetID: $stationSetID, stationName: $stationName, exec: $exec)
}
    `;
export type ToggleStationExecMutationFn = ApolloReactCommon.MutationFunction<ToggleStationExecMutation, ToggleStationExecMutationVariables>;

/**
 * __useToggleStationExecMutation__
 *
 * To run a mutation, you first call `useToggleStationExecMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleStationExecMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleStationExecMutation, { data, loading, error }] = useToggleStationExecMutation({
 *   variables: {
 *      stationSetID: // value for 'stationSetID'
 *      stationName: // value for 'stationName'
 *      exec: // value for 'exec'
 *   },
 * });
 */
export function useToggleStationExecMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleStationExecMutation, ToggleStationExecMutationVariables>) {
        return ApolloReactHooks.useMutation<ToggleStationExecMutation, ToggleStationExecMutationVariables>(ToggleStationExecDocument, baseOptions);
      }
export type ToggleStationExecMutationHookResult = ReturnType<typeof useToggleStationExecMutation>;
export type ToggleStationExecMutationResult = ApolloReactCommon.MutationResult<ToggleStationExecMutation>;
export type ToggleStationExecMutationOptions = ApolloReactCommon.BaseMutationOptions<ToggleStationExecMutation, ToggleStationExecMutationVariables>;
export const ToggleStationLoginDocument = gql`
    mutation ToggleStationLogin($stationSetID: ID!, $stationName: String!, $login: Boolean!) {
  setStationLogin(stationSetID: $stationSetID, stationName: $stationName, login: $login)
}
    `;
export type ToggleStationLoginMutationFn = ApolloReactCommon.MutationFunction<ToggleStationLoginMutation, ToggleStationLoginMutationVariables>;

/**
 * __useToggleStationLoginMutation__
 *
 * To run a mutation, you first call `useToggleStationLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleStationLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleStationLoginMutation, { data, loading, error }] = useToggleStationLoginMutation({
 *   variables: {
 *      stationSetID: // value for 'stationSetID'
 *      stationName: // value for 'stationName'
 *      login: // value for 'login'
 *   },
 * });
 */
export function useToggleStationLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleStationLoginMutation, ToggleStationLoginMutationVariables>) {
        return ApolloReactHooks.useMutation<ToggleStationLoginMutation, ToggleStationLoginMutationVariables>(ToggleStationLoginDocument, baseOptions);
      }
export type ToggleStationLoginMutationHookResult = ReturnType<typeof useToggleStationLoginMutation>;
export type ToggleStationLoginMutationResult = ApolloReactCommon.MutationResult<ToggleStationLoginMutation>;
export type ToggleStationLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<ToggleStationLoginMutation, ToggleStationLoginMutationVariables>;
export const ToggleStationWidgetDocument = gql`
    mutation ToggleStationWidget($stationSetID: ID!, $stationName: String!, $widget: String!, $state: Boolean!) {
  toggleStationWidgets(stationSetID: $stationSetID, stationName: $stationName, widget: $widget, state: $state)
}
    `;
export type ToggleStationWidgetMutationFn = ApolloReactCommon.MutationFunction<ToggleStationWidgetMutation, ToggleStationWidgetMutationVariables>;

/**
 * __useToggleStationWidgetMutation__
 *
 * To run a mutation, you first call `useToggleStationWidgetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleStationWidgetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleStationWidgetMutation, { data, loading, error }] = useToggleStationWidgetMutation({
 *   variables: {
 *      stationSetID: // value for 'stationSetID'
 *      stationName: // value for 'stationName'
 *      widget: // value for 'widget'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useToggleStationWidgetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleStationWidgetMutation, ToggleStationWidgetMutationVariables>) {
        return ApolloReactHooks.useMutation<ToggleStationWidgetMutation, ToggleStationWidgetMutationVariables>(ToggleStationWidgetDocument, baseOptions);
      }
export type ToggleStationWidgetMutationHookResult = ReturnType<typeof useToggleStationWidgetMutation>;
export type ToggleStationWidgetMutationResult = ApolloReactCommon.MutationResult<ToggleStationWidgetMutation>;
export type ToggleStationWidgetMutationOptions = ApolloReactCommon.BaseMutationOptions<ToggleStationWidgetMutation, ToggleStationWidgetMutationVariables>;
export const UpdateStationCardDocument = gql`
    mutation UpdateStationCard($stationSetId: ID!, $stationName: String!, $cardName: String!, $name: String, $component: String, $icon: String) {
  editCardInStationSet(stationSetID: $stationSetId, stationName: $stationName, cardName: $cardName, newCardName: $name, cardComponent: $component, cardIcon: $icon)
}
    `;
export type UpdateStationCardMutationFn = ApolloReactCommon.MutationFunction<UpdateStationCardMutation, UpdateStationCardMutationVariables>;

/**
 * __useUpdateStationCardMutation__
 *
 * To run a mutation, you first call `useUpdateStationCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStationCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStationCardMutation, { data, loading, error }] = useUpdateStationCardMutation({
 *   variables: {
 *      stationSetId: // value for 'stationSetId'
 *      stationName: // value for 'stationName'
 *      cardName: // value for 'cardName'
 *      name: // value for 'name'
 *      component: // value for 'component'
 *      icon: // value for 'icon'
 *   },
 * });
 */
export function useUpdateStationCardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateStationCardMutation, UpdateStationCardMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateStationCardMutation, UpdateStationCardMutationVariables>(UpdateStationCardDocument, baseOptions);
      }
export type UpdateStationCardMutationHookResult = ReturnType<typeof useUpdateStationCardMutation>;
export type UpdateStationCardMutationResult = ApolloReactCommon.MutationResult<UpdateStationCardMutation>;
export type UpdateStationCardMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateStationCardMutation, UpdateStationCardMutationVariables>;
export const SystemSetWingDocument = gql`
    mutation SystemSetWing($systemId: ID!, $wing: String!) {
  systemSetWing(systemId: $systemId, wing: $wing)
}
    `;
export type SystemSetWingMutationFn = ApolloReactCommon.MutationFunction<SystemSetWingMutation, SystemSetWingMutationVariables>;

/**
 * __useSystemSetWingMutation__
 *
 * To run a mutation, you first call `useSystemSetWingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSystemSetWingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [systemSetWingMutation, { data, loading, error }] = useSystemSetWingMutation({
 *   variables: {
 *      systemId: // value for 'systemId'
 *      wing: // value for 'wing'
 *   },
 * });
 */
export function useSystemSetWingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SystemSetWingMutation, SystemSetWingMutationVariables>) {
        return ApolloReactHooks.useMutation<SystemSetWingMutation, SystemSetWingMutationVariables>(SystemSetWingDocument, baseOptions);
      }
export type SystemSetWingMutationHookResult = ReturnType<typeof useSystemSetWingMutation>;
export type SystemSetWingMutationResult = ApolloReactCommon.MutationResult<SystemSetWingMutation>;
export type SystemSetWingMutationOptions = ApolloReactCommon.BaseMutationOptions<SystemSetWingMutation, SystemSetWingMutationVariables>;
export const SensorsSetPingsDocument = gql`
    mutation SensorsSetPings($id: ID!, $ping: Boolean!) {
  sensorsSetHasPing(id: $id, ping: $ping)
}
    `;
export type SensorsSetPingsMutationFn = ApolloReactCommon.MutationFunction<SensorsSetPingsMutation, SensorsSetPingsMutationVariables>;

/**
 * __useSensorsSetPingsMutation__
 *
 * To run a mutation, you first call `useSensorsSetPingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSensorsSetPingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sensorsSetPingsMutation, { data, loading, error }] = useSensorsSetPingsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      ping: // value for 'ping'
 *   },
 * });
 */
export function useSensorsSetPingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SensorsSetPingsMutation, SensorsSetPingsMutationVariables>) {
        return ApolloReactHooks.useMutation<SensorsSetPingsMutation, SensorsSetPingsMutationVariables>(SensorsSetPingsDocument, baseOptions);
      }
export type SensorsSetPingsMutationHookResult = ReturnType<typeof useSensorsSetPingsMutation>;
export type SensorsSetPingsMutationResult = ApolloReactCommon.MutationResult<SensorsSetPingsMutation>;
export type SensorsSetPingsMutationOptions = ApolloReactCommon.BaseMutationOptions<SensorsSetPingsMutation, SensorsSetPingsMutationVariables>;
export const ReactorSetWingsDocument = gql`
    mutation ReactorSetWings($id: ID!, $hasWings: Boolean!) {
  reactorSetHasWings(id: $id, hasWings: $hasWings)
}
    `;
export type ReactorSetWingsMutationFn = ApolloReactCommon.MutationFunction<ReactorSetWingsMutation, ReactorSetWingsMutationVariables>;

/**
 * __useReactorSetWingsMutation__
 *
 * To run a mutation, you first call `useReactorSetWingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactorSetWingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactorSetWingsMutation, { data, loading, error }] = useReactorSetWingsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      hasWings: // value for 'hasWings'
 *   },
 * });
 */
export function useReactorSetWingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReactorSetWingsMutation, ReactorSetWingsMutationVariables>) {
        return ApolloReactHooks.useMutation<ReactorSetWingsMutation, ReactorSetWingsMutationVariables>(ReactorSetWingsDocument, baseOptions);
      }
export type ReactorSetWingsMutationHookResult = ReturnType<typeof useReactorSetWingsMutation>;
export type ReactorSetWingsMutationResult = ApolloReactCommon.MutationResult<ReactorSetWingsMutation>;
export type ReactorSetWingsMutationOptions = ApolloReactCommon.BaseMutationOptions<ReactorSetWingsMutation, ReactorSetWingsMutationVariables>;
export const TractorBeamSetCountDocument = gql`
    mutation TractorBeamSetCount($id: ID!, $beams: Int!) {
  setTractorBeamCount(id: $id, beams: $beams)
}
    `;
export type TractorBeamSetCountMutationFn = ApolloReactCommon.MutationFunction<TractorBeamSetCountMutation, TractorBeamSetCountMutationVariables>;

/**
 * __useTractorBeamSetCountMutation__
 *
 * To run a mutation, you first call `useTractorBeamSetCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTractorBeamSetCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tractorBeamSetCountMutation, { data, loading, error }] = useTractorBeamSetCountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      beams: // value for 'beams'
 *   },
 * });
 */
export function useTractorBeamSetCountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TractorBeamSetCountMutation, TractorBeamSetCountMutationVariables>) {
        return ApolloReactHooks.useMutation<TractorBeamSetCountMutation, TractorBeamSetCountMutationVariables>(TractorBeamSetCountDocument, baseOptions);
      }
export type TractorBeamSetCountMutationHookResult = ReturnType<typeof useTractorBeamSetCountMutation>;
export type TractorBeamSetCountMutationResult = ApolloReactCommon.MutationResult<TractorBeamSetCountMutation>;
export type TractorBeamSetCountMutationOptions = ApolloReactCommon.BaseMutationOptions<TractorBeamSetCountMutation, TractorBeamSetCountMutationVariables>;
export const RemoveSimulatorDocument = gql`
    mutation RemoveSimulator($id: ID!) {
  removeSimulator(simulatorId: $id)
}
    `;
export type RemoveSimulatorMutationFn = ApolloReactCommon.MutationFunction<RemoveSimulatorMutation, RemoveSimulatorMutationVariables>;

/**
 * __useRemoveSimulatorMutation__
 *
 * To run a mutation, you first call `useRemoveSimulatorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSimulatorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSimulatorMutation, { data, loading, error }] = useRemoveSimulatorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSimulatorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveSimulatorMutation, RemoveSimulatorMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveSimulatorMutation, RemoveSimulatorMutationVariables>(RemoveSimulatorDocument, baseOptions);
      }
export type RemoveSimulatorMutationHookResult = ReturnType<typeof useRemoveSimulatorMutation>;
export type RemoveSimulatorMutationResult = ApolloReactCommon.MutationResult<RemoveSimulatorMutation>;
export type RemoveSimulatorMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveSimulatorMutation, RemoveSimulatorMutationVariables>;
export const SimulatorsConfigDocument = gql`
    subscription SimulatorsConfig {
  simulatorsUpdate(template: true) {
    id
    name
    alertlevel
    layout
    caps
    exocomps
    panels
    missionConfigs
    commandLines
    triggers
    interfaces
    midiSets
    stepDamage
    verifyStep
    hasPrinter
    hasLegs
    bridgeOfficerMessaging
    spaceEdventuresId
    requiredDamageSteps {
      id
      name
      args {
        end
        cleanup
        name
        orders
        room
        preamble
        type
        message
        code
        inventory
        destination
        equipment
        query
        reactivate
      }
    }
    optionalDamageSteps {
      id
      name
      args {
        end
        cleanup
        name
        orders
        room
        preamble
        type
        message
        code
        inventory
        destination
        equipment
        query
        reactivate
      }
    }
    damageTasks {
      id
      taskTemplate {
        id
        name
        definition
        reportTypes
      }
      required
      nextSteps {
        id
        name
        definition
      }
    }
    assets {
      mesh
      texture
      side
      top
      logo
      bridge
    }
    soundEffects
    systems {
      id
      type
      name
      displayName
      upgradeName
      upgradeMacros {
        id
        event
        args
        delay
      }
      requiredDamageSteps {
        id
        name
        args {
          end
          cleanup
          name
          orders
          room
          preamble
          type
          message
          code
          inventory
          destination
          equipment
          query
          reactivate
        }
      }
      optionalDamageSteps {
        id
        name
        args {
          end
          cleanup
          name
          orders
          room
          preamble
          type
          message
          code
          inventory
          destination
          equipment
          query
          reactivate
        }
      }
      damageTasks {
        id
        taskTemplate {
          id
          name
          definition
          reportTypes
        }
        required
        nextSteps {
          id
          name
          definition
        }
      }
    }
    stationSets {
      id
      name
      crewCount
      stations {
        name
        description
        training
        ambiance
        login
        executive
        messageGroups
        layout
        widgets
        cards {
          name
          component
        }
      }
    }
  }
}
    `;

/**
 * __useSimulatorsConfigSubscription__
 *
 * To run a query within a React component, call `useSimulatorsConfigSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSimulatorsConfigSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimulatorsConfigSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSimulatorsConfigSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SimulatorsConfigSubscription, SimulatorsConfigSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SimulatorsConfigSubscription, SimulatorsConfigSubscriptionVariables>(SimulatorsConfigDocument, baseOptions);
      }
export type SimulatorsConfigSubscriptionHookResult = ReturnType<typeof useSimulatorsConfigSubscription>;
export type SimulatorsConfigSubscriptionResult = ApolloReactCommon.SubscriptionResult<SimulatorsConfigSubscription>;
export const StationSetConfigDocument = gql`
    subscription StationSetConfig {
  stationSetUpdate {
    id
    name
    crewCount
    simulator {
      id
    }
    stations {
      name
      description
      training
      ambiance
      login
      messageGroups
      executive
      widgets
      layout
      cards {
        name
        component
      }
    }
  }
}
    `;

/**
 * __useStationSetConfigSubscription__
 *
 * To run a query within a React component, call `useStationSetConfigSubscription` and pass it any options that fit your needs.
 * When your component renders, `useStationSetConfigSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStationSetConfigSubscription({
 *   variables: {
 *   },
 * });
 */
export function useStationSetConfigSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<StationSetConfigSubscription, StationSetConfigSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<StationSetConfigSubscription, StationSetConfigSubscriptionVariables>(StationSetConfigDocument, baseOptions);
      }
export type StationSetConfigSubscriptionHookResult = ReturnType<typeof useStationSetConfigSubscription>;
export type StationSetConfigSubscriptionResult = ApolloReactCommon.SubscriptionResult<StationSetConfigSubscription>;
export const AddTaskTemplateDocument = gql`
    mutation AddTaskTemplate($definition: String!) {
  addTaskTemplate(definition: $definition)
}
    `;
export type AddTaskTemplateMutationFn = ApolloReactCommon.MutationFunction<AddTaskTemplateMutation, AddTaskTemplateMutationVariables>;

/**
 * __useAddTaskTemplateMutation__
 *
 * To run a mutation, you first call `useAddTaskTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskTemplateMutation, { data, loading, error }] = useAddTaskTemplateMutation({
 *   variables: {
 *      definition: // value for 'definition'
 *   },
 * });
 */
export function useAddTaskTemplateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddTaskTemplateMutation, AddTaskTemplateMutationVariables>) {
        return ApolloReactHooks.useMutation<AddTaskTemplateMutation, AddTaskTemplateMutationVariables>(AddTaskTemplateDocument, baseOptions);
      }
export type AddTaskTemplateMutationHookResult = ReturnType<typeof useAddTaskTemplateMutation>;
export type AddTaskTemplateMutationResult = ApolloReactCommon.MutationResult<AddTaskTemplateMutation>;
export type AddTaskTemplateMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTaskTemplateMutation, AddTaskTemplateMutationVariables>;
export const ImportTemplatesDocument = gql`
    mutation ImportTemplates {
  importTaskTemplates
}
    `;
export type ImportTemplatesMutationFn = ApolloReactCommon.MutationFunction<ImportTemplatesMutation, ImportTemplatesMutationVariables>;

/**
 * __useImportTemplatesMutation__
 *
 * To run a mutation, you first call `useImportTemplatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportTemplatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importTemplatesMutation, { data, loading, error }] = useImportTemplatesMutation({
 *   variables: {
 *   },
 * });
 */
export function useImportTemplatesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ImportTemplatesMutation, ImportTemplatesMutationVariables>) {
        return ApolloReactHooks.useMutation<ImportTemplatesMutation, ImportTemplatesMutationVariables>(ImportTemplatesDocument, baseOptions);
      }
export type ImportTemplatesMutationHookResult = ReturnType<typeof useImportTemplatesMutation>;
export type ImportTemplatesMutationResult = ApolloReactCommon.MutationResult<ImportTemplatesMutation>;
export type ImportTemplatesMutationOptions = ApolloReactCommon.BaseMutationOptions<ImportTemplatesMutation, ImportTemplatesMutationVariables>;
export const RemoveTaskTemplateDocument = gql`
    mutation RemoveTaskTemplate($id: ID!) {
  removeTaskTemplate(id: $id)
}
    `;
export type RemoveTaskTemplateMutationFn = ApolloReactCommon.MutationFunction<RemoveTaskTemplateMutation, RemoveTaskTemplateMutationVariables>;

/**
 * __useRemoveTaskTemplateMutation__
 *
 * To run a mutation, you first call `useRemoveTaskTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTaskTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTaskTemplateMutation, { data, loading, error }] = useRemoveTaskTemplateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTaskTemplateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveTaskTemplateMutation, RemoveTaskTemplateMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveTaskTemplateMutation, RemoveTaskTemplateMutationVariables>(RemoveTaskTemplateDocument, baseOptions);
      }
export type RemoveTaskTemplateMutationHookResult = ReturnType<typeof useRemoveTaskTemplateMutation>;
export type RemoveTaskTemplateMutationResult = ApolloReactCommon.MutationResult<RemoveTaskTemplateMutation>;
export type RemoveTaskTemplateMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveTaskTemplateMutation, RemoveTaskTemplateMutationVariables>;
export const RenameTaskTemplateDocument = gql`
    mutation RenameTaskTemplate($id: ID!, $name: String!) {
  renameTaskTemplate(id: $id, name: $name)
}
    `;
export type RenameTaskTemplateMutationFn = ApolloReactCommon.MutationFunction<RenameTaskTemplateMutation, RenameTaskTemplateMutationVariables>;

/**
 * __useRenameTaskTemplateMutation__
 *
 * To run a mutation, you first call `useRenameTaskTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameTaskTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameTaskTemplateMutation, { data, loading, error }] = useRenameTaskTemplateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRenameTaskTemplateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RenameTaskTemplateMutation, RenameTaskTemplateMutationVariables>) {
        return ApolloReactHooks.useMutation<RenameTaskTemplateMutation, RenameTaskTemplateMutationVariables>(RenameTaskTemplateDocument, baseOptions);
      }
export type RenameTaskTemplateMutationHookResult = ReturnType<typeof useRenameTaskTemplateMutation>;
export type RenameTaskTemplateMutationResult = ApolloReactCommon.MutationResult<RenameTaskTemplateMutation>;
export type RenameTaskTemplateMutationOptions = ApolloReactCommon.BaseMutationOptions<RenameTaskTemplateMutation, RenameTaskTemplateMutationVariables>;
export const SetTaskMacroDocument = gql`
    mutation SetTaskMacro($id: ID!, $macros: [ActionInput!]!) {
  setTaskTemplateMacros(id: $id, macros: $macros)
}
    `;
export type SetTaskMacroMutationFn = ApolloReactCommon.MutationFunction<SetTaskMacroMutation, SetTaskMacroMutationVariables>;

/**
 * __useSetTaskMacroMutation__
 *
 * To run a mutation, you first call `useSetTaskMacroMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTaskMacroMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTaskMacroMutation, { data, loading, error }] = useSetTaskMacroMutation({
 *   variables: {
 *      id: // value for 'id'
 *      macros: // value for 'macros'
 *   },
 * });
 */
export function useSetTaskMacroMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTaskMacroMutation, SetTaskMacroMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTaskMacroMutation, SetTaskMacroMutationVariables>(SetTaskMacroDocument, baseOptions);
      }
export type SetTaskMacroMutationHookResult = ReturnType<typeof useSetTaskMacroMutation>;
export type SetTaskMacroMutationResult = ApolloReactCommon.MutationResult<SetTaskMacroMutation>;
export type SetTaskMacroMutationOptions = ApolloReactCommon.BaseMutationOptions<SetTaskMacroMutation, SetTaskMacroMutationVariables>;
export const SetTaskPreMacroDocument = gql`
    mutation SetTaskPreMacro($id: ID!, $macros: [ActionInput!]!) {
  setTaskTemplatePreMacros(id: $id, macros: $macros)
}
    `;
export type SetTaskPreMacroMutationFn = ApolloReactCommon.MutationFunction<SetTaskPreMacroMutation, SetTaskPreMacroMutationVariables>;

/**
 * __useSetTaskPreMacroMutation__
 *
 * To run a mutation, you first call `useSetTaskPreMacroMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTaskPreMacroMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTaskPreMacroMutation, { data, loading, error }] = useSetTaskPreMacroMutation({
 *   variables: {
 *      id: // value for 'id'
 *      macros: // value for 'macros'
 *   },
 * });
 */
export function useSetTaskPreMacroMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTaskPreMacroMutation, SetTaskPreMacroMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTaskPreMacroMutation, SetTaskPreMacroMutationVariables>(SetTaskPreMacroDocument, baseOptions);
      }
export type SetTaskPreMacroMutationHookResult = ReturnType<typeof useSetTaskPreMacroMutation>;
export type SetTaskPreMacroMutationResult = ApolloReactCommon.MutationResult<SetTaskPreMacroMutation>;
export type SetTaskPreMacroMutationOptions = ApolloReactCommon.BaseMutationOptions<SetTaskPreMacroMutation, SetTaskPreMacroMutationVariables>;
export const SetTaskTemplateReportTypesDocument = gql`
    mutation SetTaskTemplateReportTypes($id: ID!, $reportTypes: [String]!) {
  setTaskTemplateReportTypes(id: $id, reportTypes: $reportTypes)
}
    `;
export type SetTaskTemplateReportTypesMutationFn = ApolloReactCommon.MutationFunction<SetTaskTemplateReportTypesMutation, SetTaskTemplateReportTypesMutationVariables>;

/**
 * __useSetTaskTemplateReportTypesMutation__
 *
 * To run a mutation, you first call `useSetTaskTemplateReportTypesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTaskTemplateReportTypesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTaskTemplateReportTypesMutation, { data, loading, error }] = useSetTaskTemplateReportTypesMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reportTypes: // value for 'reportTypes'
 *   },
 * });
 */
export function useSetTaskTemplateReportTypesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTaskTemplateReportTypesMutation, SetTaskTemplateReportTypesMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTaskTemplateReportTypesMutation, SetTaskTemplateReportTypesMutationVariables>(SetTaskTemplateReportTypesDocument, baseOptions);
      }
export type SetTaskTemplateReportTypesMutationHookResult = ReturnType<typeof useSetTaskTemplateReportTypesMutation>;
export type SetTaskTemplateReportTypesMutationResult = ApolloReactCommon.MutationResult<SetTaskTemplateReportTypesMutation>;
export type SetTaskTemplateReportTypesMutationOptions = ApolloReactCommon.BaseMutationOptions<SetTaskTemplateReportTypesMutation, SetTaskTemplateReportTypesMutationVariables>;
export const SetTaskTemplateValuesDocument = gql`
    mutation SetTaskTemplateValues($id: ID!, $values: JSON!) {
  setTaskTemplateValues(id: $id, values: $values)
}
    `;
export type SetTaskTemplateValuesMutationFn = ApolloReactCommon.MutationFunction<SetTaskTemplateValuesMutation, SetTaskTemplateValuesMutationVariables>;

/**
 * __useSetTaskTemplateValuesMutation__
 *
 * To run a mutation, you first call `useSetTaskTemplateValuesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTaskTemplateValuesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTaskTemplateValuesMutation, { data, loading, error }] = useSetTaskTemplateValuesMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useSetTaskTemplateValuesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTaskTemplateValuesMutation, SetTaskTemplateValuesMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTaskTemplateValuesMutation, SetTaskTemplateValuesMutationVariables>(SetTaskTemplateValuesDocument, baseOptions);
      }
export type SetTaskTemplateValuesMutationHookResult = ReturnType<typeof useSetTaskTemplateValuesMutation>;
export type SetTaskTemplateValuesMutationResult = ApolloReactCommon.MutationResult<SetTaskTemplateValuesMutation>;
export type SetTaskTemplateValuesMutationOptions = ApolloReactCommon.BaseMutationOptions<SetTaskTemplateValuesMutation, SetTaskTemplateValuesMutationVariables>;
export const TaskDefinitionsDocument = gql`
    query TaskDefinitions {
  taskDefinitions {
    id
    class
    name
    stations {
      name
      cards {
        name
        component
      }
    }
    valuesInput
    valuesValue
    active
  }
  thorium {
    addedTaskTemplates
  }
}
    `;

/**
 * __useTaskDefinitionsQuery__
 *
 * To run a query within a React component, call `useTaskDefinitionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskDefinitionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskDefinitionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTaskDefinitionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TaskDefinitionsQuery, TaskDefinitionsQueryVariables>) {
        return ApolloReactHooks.useQuery<TaskDefinitionsQuery, TaskDefinitionsQueryVariables>(TaskDefinitionsDocument, baseOptions);
      }
export function useTaskDefinitionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TaskDefinitionsQuery, TaskDefinitionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TaskDefinitionsQuery, TaskDefinitionsQueryVariables>(TaskDefinitionsDocument, baseOptions);
        }
export type TaskDefinitionsQueryHookResult = ReturnType<typeof useTaskDefinitionsQuery>;
export type TaskDefinitionsLazyQueryHookResult = ReturnType<typeof useTaskDefinitionsLazyQuery>;
export type TaskDefinitionsQueryResult = ApolloReactCommon.QueryResult<TaskDefinitionsQuery, TaskDefinitionsQueryVariables>;
export const TaskFlowAddDocument = gql`
    mutation TaskFlowAdd($name: String!) {
  taskFlowAdd(name: $name)
}
    `;
export type TaskFlowAddMutationFn = ApolloReactCommon.MutationFunction<TaskFlowAddMutation, TaskFlowAddMutationVariables>;

/**
 * __useTaskFlowAddMutation__
 *
 * To run a mutation, you first call `useTaskFlowAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaskFlowAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taskFlowAddMutation, { data, loading, error }] = useTaskFlowAddMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useTaskFlowAddMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TaskFlowAddMutation, TaskFlowAddMutationVariables>) {
        return ApolloReactHooks.useMutation<TaskFlowAddMutation, TaskFlowAddMutationVariables>(TaskFlowAddDocument, baseOptions);
      }
export type TaskFlowAddMutationHookResult = ReturnType<typeof useTaskFlowAddMutation>;
export type TaskFlowAddMutationResult = ApolloReactCommon.MutationResult<TaskFlowAddMutation>;
export type TaskFlowAddMutationOptions = ApolloReactCommon.BaseMutationOptions<TaskFlowAddMutation, TaskFlowAddMutationVariables>;
export const TaskFlowAddStepDocument = gql`
    mutation TaskFlowAddStep($id: ID!, $name: String!) {
  taskFlowAddStep(id: $id, name: $name)
}
    `;
export type TaskFlowAddStepMutationFn = ApolloReactCommon.MutationFunction<TaskFlowAddStepMutation, TaskFlowAddStepMutationVariables>;

/**
 * __useTaskFlowAddStepMutation__
 *
 * To run a mutation, you first call `useTaskFlowAddStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaskFlowAddStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taskFlowAddStepMutation, { data, loading, error }] = useTaskFlowAddStepMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useTaskFlowAddStepMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TaskFlowAddStepMutation, TaskFlowAddStepMutationVariables>) {
        return ApolloReactHooks.useMutation<TaskFlowAddStepMutation, TaskFlowAddStepMutationVariables>(TaskFlowAddStepDocument, baseOptions);
      }
export type TaskFlowAddStepMutationHookResult = ReturnType<typeof useTaskFlowAddStepMutation>;
export type TaskFlowAddStepMutationResult = ApolloReactCommon.MutationResult<TaskFlowAddStepMutation>;
export type TaskFlowAddStepMutationOptions = ApolloReactCommon.BaseMutationOptions<TaskFlowAddStepMutation, TaskFlowAddStepMutationVariables>;
export const TaskFlowRemoveDocument = gql`
    mutation TaskFlowRemove($id: ID!) {
  taskFlowRemove(id: $id)
}
    `;
export type TaskFlowRemoveMutationFn = ApolloReactCommon.MutationFunction<TaskFlowRemoveMutation, TaskFlowRemoveMutationVariables>;

/**
 * __useTaskFlowRemoveMutation__
 *
 * To run a mutation, you first call `useTaskFlowRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaskFlowRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taskFlowRemoveMutation, { data, loading, error }] = useTaskFlowRemoveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskFlowRemoveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TaskFlowRemoveMutation, TaskFlowRemoveMutationVariables>) {
        return ApolloReactHooks.useMutation<TaskFlowRemoveMutation, TaskFlowRemoveMutationVariables>(TaskFlowRemoveDocument, baseOptions);
      }
export type TaskFlowRemoveMutationHookResult = ReturnType<typeof useTaskFlowRemoveMutation>;
export type TaskFlowRemoveMutationResult = ApolloReactCommon.MutationResult<TaskFlowRemoveMutation>;
export type TaskFlowRemoveMutationOptions = ApolloReactCommon.BaseMutationOptions<TaskFlowRemoveMutation, TaskFlowRemoveMutationVariables>;
export const TaskFlowRemoveStepDocument = gql`
    mutation TaskFlowRemoveStep($id: ID!, $stepId: ID!) {
  taskFlowRemoveStep(id: $id, stepId: $id)
}
    `;
export type TaskFlowRemoveStepMutationFn = ApolloReactCommon.MutationFunction<TaskFlowRemoveStepMutation, TaskFlowRemoveStepMutationVariables>;

/**
 * __useTaskFlowRemoveStepMutation__
 *
 * To run a mutation, you first call `useTaskFlowRemoveStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaskFlowRemoveStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taskFlowRemoveStepMutation, { data, loading, error }] = useTaskFlowRemoveStepMutation({
 *   variables: {
 *      id: // value for 'id'
 *      stepId: // value for 'stepId'
 *   },
 * });
 */
export function useTaskFlowRemoveStepMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TaskFlowRemoveStepMutation, TaskFlowRemoveStepMutationVariables>) {
        return ApolloReactHooks.useMutation<TaskFlowRemoveStepMutation, TaskFlowRemoveStepMutationVariables>(TaskFlowRemoveStepDocument, baseOptions);
      }
export type TaskFlowRemoveStepMutationHookResult = ReturnType<typeof useTaskFlowRemoveStepMutation>;
export type TaskFlowRemoveStepMutationResult = ApolloReactCommon.MutationResult<TaskFlowRemoveStepMutation>;
export type TaskFlowRemoveStepMutationOptions = ApolloReactCommon.BaseMutationOptions<TaskFlowRemoveStepMutation, TaskFlowRemoveStepMutationVariables>;
export const TaskFlowRenameDocument = gql`
    mutation TaskFlowRename($id: ID!, $name: String!) {
  taskFlowRename(id: $id, name: $name)
}
    `;
export type TaskFlowRenameMutationFn = ApolloReactCommon.MutationFunction<TaskFlowRenameMutation, TaskFlowRenameMutationVariables>;

/**
 * __useTaskFlowRenameMutation__
 *
 * To run a mutation, you first call `useTaskFlowRenameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaskFlowRenameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taskFlowRenameMutation, { data, loading, error }] = useTaskFlowRenameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useTaskFlowRenameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TaskFlowRenameMutation, TaskFlowRenameMutationVariables>) {
        return ApolloReactHooks.useMutation<TaskFlowRenameMutation, TaskFlowRenameMutationVariables>(TaskFlowRenameDocument, baseOptions);
      }
export type TaskFlowRenameMutationHookResult = ReturnType<typeof useTaskFlowRenameMutation>;
export type TaskFlowRenameMutationResult = ApolloReactCommon.MutationResult<TaskFlowRenameMutation>;
export type TaskFlowRenameMutationOptions = ApolloReactCommon.BaseMutationOptions<TaskFlowRenameMutation, TaskFlowRenameMutationVariables>;
export const TaskFlowRenameStepDocument = gql`
    mutation TaskFlowRenameStep($id: ID!, $stepId: ID!, $name: String!) {
  taskFlowRenameStep(id: $id, stepId: $stepId, name: $name)
}
    `;
export type TaskFlowRenameStepMutationFn = ApolloReactCommon.MutationFunction<TaskFlowRenameStepMutation, TaskFlowRenameStepMutationVariables>;

/**
 * __useTaskFlowRenameStepMutation__
 *
 * To run a mutation, you first call `useTaskFlowRenameStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaskFlowRenameStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taskFlowRenameStepMutation, { data, loading, error }] = useTaskFlowRenameStepMutation({
 *   variables: {
 *      id: // value for 'id'
 *      stepId: // value for 'stepId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useTaskFlowRenameStepMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TaskFlowRenameStepMutation, TaskFlowRenameStepMutationVariables>) {
        return ApolloReactHooks.useMutation<TaskFlowRenameStepMutation, TaskFlowRenameStepMutationVariables>(TaskFlowRenameStepDocument, baseOptions);
      }
export type TaskFlowRenameStepMutationHookResult = ReturnType<typeof useTaskFlowRenameStepMutation>;
export type TaskFlowRenameStepMutationResult = ApolloReactCommon.MutationResult<TaskFlowRenameStepMutation>;
export type TaskFlowRenameStepMutationOptions = ApolloReactCommon.BaseMutationOptions<TaskFlowRenameStepMutation, TaskFlowRenameStepMutationVariables>;
export const TaskFlowStepAddTaskDocument = gql`
    mutation TaskFlowStepAddTask($id: ID!, $stepId: ID!, $task: TaskInput!) {
  taskFlowStepAddTask(id: $id, stepId: $stepId, task: $task)
}
    `;
export type TaskFlowStepAddTaskMutationFn = ApolloReactCommon.MutationFunction<TaskFlowStepAddTaskMutation, TaskFlowStepAddTaskMutationVariables>;

/**
 * __useTaskFlowStepAddTaskMutation__
 *
 * To run a mutation, you first call `useTaskFlowStepAddTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaskFlowStepAddTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taskFlowStepAddTaskMutation, { data, loading, error }] = useTaskFlowStepAddTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      stepId: // value for 'stepId'
 *      task: // value for 'task'
 *   },
 * });
 */
export function useTaskFlowStepAddTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TaskFlowStepAddTaskMutation, TaskFlowStepAddTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<TaskFlowStepAddTaskMutation, TaskFlowStepAddTaskMutationVariables>(TaskFlowStepAddTaskDocument, baseOptions);
      }
export type TaskFlowStepAddTaskMutationHookResult = ReturnType<typeof useTaskFlowStepAddTaskMutation>;
export type TaskFlowStepAddTaskMutationResult = ApolloReactCommon.MutationResult<TaskFlowStepAddTaskMutation>;
export type TaskFlowStepAddTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<TaskFlowStepAddTaskMutation, TaskFlowStepAddTaskMutationVariables>;
export const TaskFlowStepEditTaskDocument = gql`
    mutation TaskFlowStepEditTask($id: ID!, $stepId: ID!, $taskId: ID!, $task: TaskInput!) {
  taskFlowStepEditTask(id: $id, stepId: $stepId, taskId: $taskId, task: $task)
}
    `;
export type TaskFlowStepEditTaskMutationFn = ApolloReactCommon.MutationFunction<TaskFlowStepEditTaskMutation, TaskFlowStepEditTaskMutationVariables>;

/**
 * __useTaskFlowStepEditTaskMutation__
 *
 * To run a mutation, you first call `useTaskFlowStepEditTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaskFlowStepEditTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taskFlowStepEditTaskMutation, { data, loading, error }] = useTaskFlowStepEditTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      stepId: // value for 'stepId'
 *      taskId: // value for 'taskId'
 *      task: // value for 'task'
 *   },
 * });
 */
export function useTaskFlowStepEditTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TaskFlowStepEditTaskMutation, TaskFlowStepEditTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<TaskFlowStepEditTaskMutation, TaskFlowStepEditTaskMutationVariables>(TaskFlowStepEditTaskDocument, baseOptions);
      }
export type TaskFlowStepEditTaskMutationHookResult = ReturnType<typeof useTaskFlowStepEditTaskMutation>;
export type TaskFlowStepEditTaskMutationResult = ApolloReactCommon.MutationResult<TaskFlowStepEditTaskMutation>;
export type TaskFlowStepEditTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<TaskFlowStepEditTaskMutation, TaskFlowStepEditTaskMutationVariables>;
export const TaskFlowStepRemoveTaskDocument = gql`
    mutation TaskFlowStepRemoveTask($id: ID!, $stepId: ID!, $taskId: ID!) {
  taskFlowStepRemoveTask(id: $id, stepId: $stepId, taskId: $taskId)
}
    `;
export type TaskFlowStepRemoveTaskMutationFn = ApolloReactCommon.MutationFunction<TaskFlowStepRemoveTaskMutation, TaskFlowStepRemoveTaskMutationVariables>;

/**
 * __useTaskFlowStepRemoveTaskMutation__
 *
 * To run a mutation, you first call `useTaskFlowStepRemoveTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaskFlowStepRemoveTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taskFlowStepRemoveTaskMutation, { data, loading, error }] = useTaskFlowStepRemoveTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      stepId: // value for 'stepId'
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useTaskFlowStepRemoveTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TaskFlowStepRemoveTaskMutation, TaskFlowStepRemoveTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<TaskFlowStepRemoveTaskMutation, TaskFlowStepRemoveTaskMutationVariables>(TaskFlowStepRemoveTaskDocument, baseOptions);
      }
export type TaskFlowStepRemoveTaskMutationHookResult = ReturnType<typeof useTaskFlowStepRemoveTaskMutation>;
export type TaskFlowStepRemoveTaskMutationResult = ApolloReactCommon.MutationResult<TaskFlowStepRemoveTaskMutation>;
export type TaskFlowStepRemoveTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<TaskFlowStepRemoveTaskMutation, TaskFlowStepRemoveTaskMutationVariables>;
export const TaskFlowStepCompleteAllDocument = gql`
    mutation TaskFlowStepCompleteAll($id: ID!, $stepId: ID!, $completeAll: Boolean!) {
  taskFlowStepSetCompleteAll(id: $id, stepId: $stepId, completeAll: $completeAll)
}
    `;
export type TaskFlowStepCompleteAllMutationFn = ApolloReactCommon.MutationFunction<TaskFlowStepCompleteAllMutation, TaskFlowStepCompleteAllMutationVariables>;

/**
 * __useTaskFlowStepCompleteAllMutation__
 *
 * To run a mutation, you first call `useTaskFlowStepCompleteAllMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaskFlowStepCompleteAllMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taskFlowStepCompleteAllMutation, { data, loading, error }] = useTaskFlowStepCompleteAllMutation({
 *   variables: {
 *      id: // value for 'id'
 *      stepId: // value for 'stepId'
 *      completeAll: // value for 'completeAll'
 *   },
 * });
 */
export function useTaskFlowStepCompleteAllMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TaskFlowStepCompleteAllMutation, TaskFlowStepCompleteAllMutationVariables>) {
        return ApolloReactHooks.useMutation<TaskFlowStepCompleteAllMutation, TaskFlowStepCompleteAllMutationVariables>(TaskFlowStepCompleteAllDocument, baseOptions);
      }
export type TaskFlowStepCompleteAllMutationHookResult = ReturnType<typeof useTaskFlowStepCompleteAllMutation>;
export type TaskFlowStepCompleteAllMutationResult = ApolloReactCommon.MutationResult<TaskFlowStepCompleteAllMutation>;
export type TaskFlowStepCompleteAllMutationOptions = ApolloReactCommon.BaseMutationOptions<TaskFlowStepCompleteAllMutation, TaskFlowStepCompleteAllMutationVariables>;
export const TaskFlowsConfigDocument = gql`
    subscription TaskFlowsConfig {
  taskFlows {
    id
    name
    steps {
      id
      name
      tasks {
        id
        station
        definition
        values
        macros {
          id
          event
          args
          delay
        }
        preMacros {
          id
          event
          args
          delay
        }
      }
      completeAll
    }
  }
}
    `;

/**
 * __useTaskFlowsConfigSubscription__
 *
 * To run a query within a React component, call `useTaskFlowsConfigSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTaskFlowsConfigSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskFlowsConfigSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTaskFlowsConfigSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<TaskFlowsConfigSubscription, TaskFlowsConfigSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<TaskFlowsConfigSubscription, TaskFlowsConfigSubscriptionVariables>(TaskFlowsConfigDocument, baseOptions);
      }
export type TaskFlowsConfigSubscriptionHookResult = ReturnType<typeof useTaskFlowsConfigSubscription>;
export type TaskFlowsConfigSubscriptionResult = ApolloReactCommon.SubscriptionResult<TaskFlowsConfigSubscription>;
export const TaskTemplatesDocument = gql`
    subscription TaskTemplates {
  taskTemplatesUpdate {
    id
    name
    definition
    values
    reportTypes
    macros {
      id
      event
      args
      delay
    }
    preMacros {
      id
      event
      args
      delay
    }
  }
}
    `;

/**
 * __useTaskTemplatesSubscription__
 *
 * To run a query within a React component, call `useTaskTemplatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTaskTemplatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskTemplatesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTaskTemplatesSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<TaskTemplatesSubscription, TaskTemplatesSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<TaskTemplatesSubscription, TaskTemplatesSubscriptionVariables>(TaskTemplatesDocument, baseOptions);
      }
export type TaskTemplatesSubscriptionHookResult = ReturnType<typeof useTaskTemplatesSubscription>;
export type TaskTemplatesSubscriptionResult = ApolloReactCommon.SubscriptionResult<TaskTemplatesSubscription>;
export const EntityRemoveEngineDocument = gql`
    mutation EntityRemoveEngine($id: ID!, $type: EntityEngineEnum!) {
  entityRemoveEngine(id: $id, type: $type)
}
    `;
export type EntityRemoveEngineMutationFn = ApolloReactCommon.MutationFunction<EntityRemoveEngineMutation, EntityRemoveEngineMutationVariables>;

/**
 * __useEntityRemoveEngineMutation__
 *
 * To run a mutation, you first call `useEntityRemoveEngineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntityRemoveEngineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entityRemoveEngineMutation, { data, loading, error }] = useEntityRemoveEngineMutation({
 *   variables: {
 *      id: // value for 'id'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useEntityRemoveEngineMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntityRemoveEngineMutation, EntityRemoveEngineMutationVariables>) {
        return ApolloReactHooks.useMutation<EntityRemoveEngineMutation, EntityRemoveEngineMutationVariables>(EntityRemoveEngineDocument, baseOptions);
      }
export type EntityRemoveEngineMutationHookResult = ReturnType<typeof useEntityRemoveEngineMutation>;
export type EntityRemoveEngineMutationResult = ApolloReactCommon.MutationResult<EntityRemoveEngineMutation>;
export type EntityRemoveEngineMutationOptions = ApolloReactCommon.BaseMutationOptions<EntityRemoveEngineMutation, EntityRemoveEngineMutationVariables>;
export const EntityRemoveThrustersDocument = gql`
    mutation EntityRemoveThrusters($id: ID!) {
  entityRemoveThrusters(id: $id)
}
    `;
export type EntityRemoveThrustersMutationFn = ApolloReactCommon.MutationFunction<EntityRemoveThrustersMutation, EntityRemoveThrustersMutationVariables>;

/**
 * __useEntityRemoveThrustersMutation__
 *
 * To run a mutation, you first call `useEntityRemoveThrustersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntityRemoveThrustersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entityRemoveThrustersMutation, { data, loading, error }] = useEntityRemoveThrustersMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEntityRemoveThrustersMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntityRemoveThrustersMutation, EntityRemoveThrustersMutationVariables>) {
        return ApolloReactHooks.useMutation<EntityRemoveThrustersMutation, EntityRemoveThrustersMutationVariables>(EntityRemoveThrustersDocument, baseOptions);
      }
export type EntityRemoveThrustersMutationHookResult = ReturnType<typeof useEntityRemoveThrustersMutation>;
export type EntityRemoveThrustersMutationResult = ApolloReactCommon.MutationResult<EntityRemoveThrustersMutation>;
export type EntityRemoveThrustersMutationOptions = ApolloReactCommon.BaseMutationOptions<EntityRemoveThrustersMutation, EntityRemoveThrustersMutationVariables>;
export const EntitySetEngineDocument = gql`
    mutation EntitySetEngine($id: ID!, $type: EntityEngineEnum!, $maxSpeed: Float, $currentSpeed: Float) {
  entitySetEngine(id: $id, type: $type, maxSpeed: $maxSpeed, currentSpeed: $currentSpeed)
}
    `;
export type EntitySetEngineMutationFn = ApolloReactCommon.MutationFunction<EntitySetEngineMutation, EntitySetEngineMutationVariables>;

/**
 * __useEntitySetEngineMutation__
 *
 * To run a mutation, you first call `useEntitySetEngineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntitySetEngineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entitySetEngineMutation, { data, loading, error }] = useEntitySetEngineMutation({
 *   variables: {
 *      id: // value for 'id'
 *      type: // value for 'type'
 *      maxSpeed: // value for 'maxSpeed'
 *      currentSpeed: // value for 'currentSpeed'
 *   },
 * });
 */
export function useEntitySetEngineMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntitySetEngineMutation, EntitySetEngineMutationVariables>) {
        return ApolloReactHooks.useMutation<EntitySetEngineMutation, EntitySetEngineMutationVariables>(EntitySetEngineDocument, baseOptions);
      }
export type EntitySetEngineMutationHookResult = ReturnType<typeof useEntitySetEngineMutation>;
export type EntitySetEngineMutationResult = ApolloReactCommon.MutationResult<EntitySetEngineMutation>;
export type EntitySetEngineMutationOptions = ApolloReactCommon.BaseMutationOptions<EntitySetEngineMutation, EntitySetEngineMutationVariables>;
export const EntitySetThrustersDocument = gql`
    mutation EntitySetThrusters($id: ID!, $rotationSpeed: Float, $movementSpeed: Float, $direction: CoordinatesInput, $rotationDelta: CoordinatesInput) {
  entitySetThrusters(id: $id, rotationSpeed: $rotationSpeed, movementSpeed: $movementSpeed, direction: $direction, rotationDelta: $rotationDelta)
}
    `;
export type EntitySetThrustersMutationFn = ApolloReactCommon.MutationFunction<EntitySetThrustersMutation, EntitySetThrustersMutationVariables>;

/**
 * __useEntitySetThrustersMutation__
 *
 * To run a mutation, you first call `useEntitySetThrustersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntitySetThrustersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entitySetThrustersMutation, { data, loading, error }] = useEntitySetThrustersMutation({
 *   variables: {
 *      id: // value for 'id'
 *      rotationSpeed: // value for 'rotationSpeed'
 *      movementSpeed: // value for 'movementSpeed'
 *      direction: // value for 'direction'
 *      rotationDelta: // value for 'rotationDelta'
 *   },
 * });
 */
export function useEntitySetThrustersMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntitySetThrustersMutation, EntitySetThrustersMutationVariables>) {
        return ApolloReactHooks.useMutation<EntitySetThrustersMutation, EntitySetThrustersMutationVariables>(EntitySetThrustersDocument, baseOptions);
      }
export type EntitySetThrustersMutationHookResult = ReturnType<typeof useEntitySetThrustersMutation>;
export type EntitySetThrustersMutationResult = ApolloReactCommon.MutationResult<EntitySetThrustersMutation>;
export type EntitySetThrustersMutationOptions = ApolloReactCommon.BaseMutationOptions<EntitySetThrustersMutation, EntitySetThrustersMutationVariables>;
export const EntitiesSetPositionDocument = gql`
    mutation EntitiesSetPosition($entities: [EntitiesLocationInput!]!) {
  entitiesSetPosition(entities: $entities)
}
    `;
export type EntitiesSetPositionMutationFn = ApolloReactCommon.MutationFunction<EntitiesSetPositionMutation, EntitiesSetPositionMutationVariables>;

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
export function useEntitiesSetPositionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntitiesSetPositionMutation, EntitiesSetPositionMutationVariables>) {
        return ApolloReactHooks.useMutation<EntitiesSetPositionMutation, EntitiesSetPositionMutationVariables>(EntitiesSetPositionDocument, baseOptions);
      }
export type EntitiesSetPositionMutationHookResult = ReturnType<typeof useEntitiesSetPositionMutation>;
export type EntitiesSetPositionMutationResult = ApolloReactCommon.MutationResult<EntitiesSetPositionMutation>;
export type EntitiesSetPositionMutationOptions = ApolloReactCommon.BaseMutationOptions<EntitiesSetPositionMutation, EntitiesSetPositionMutationVariables>;
export const EntityCreateDocument = gql`
    mutation EntityCreate($flightId: ID!, $position: EntityCoordinatesInput!, $name: String!, $stageParentId: ID!, $color: String, $meshType: MeshTypeEnum!, $modelAsset: String, $materialMapAsset: String, $ringMapAsset: String, $cloudMapAsset: String, $emissiveColor: String, $emissiveIntensity: Float, $glowMode: GlowModeEnum, $glowColor: String, $lightIntensity: Float, $lightDecay: Float, $lightColor: String) {
  entityCreate(flightId: $flightId) {
    id
  }
  entitySetStageChild(parentId: $stageParentId)
  entitySetLocation(position: $position)
  entitySetIdentity(name: $name)
  entitySetAppearance(color: $color, meshType: $meshType, modelAsset: $modelAsset, materialMapAsset: $materialMapAsset, ringMapAsset: $ringMapAsset, cloudMapAsset: $cloudMapAsset, emissiveColor: $emissiveColor, emissiveIntensity: $emissiveIntensity)
  entitySetGlow(glowMode: $glowMode, color: $glowColor)
  entitySetLight(intensity: $lightIntensity, color: $lightColor, decay: $lightDecay)
}
    `;
export type EntityCreateMutationFn = ApolloReactCommon.MutationFunction<EntityCreateMutation, EntityCreateMutationVariables>;

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
 *      stageParentId: // value for 'stageParentId'
 *      color: // value for 'color'
 *      meshType: // value for 'meshType'
 *      modelAsset: // value for 'modelAsset'
 *      materialMapAsset: // value for 'materialMapAsset'
 *      ringMapAsset: // value for 'ringMapAsset'
 *      cloudMapAsset: // value for 'cloudMapAsset'
 *      emissiveColor: // value for 'emissiveColor'
 *      emissiveIntensity: // value for 'emissiveIntensity'
 *      glowMode: // value for 'glowMode'
 *      glowColor: // value for 'glowColor'
 *      lightIntensity: // value for 'lightIntensity'
 *      lightDecay: // value for 'lightDecay'
 *      lightColor: // value for 'lightColor'
 *   },
 * });
 */
export function useEntityCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntityCreateMutation, EntityCreateMutationVariables>) {
        return ApolloReactHooks.useMutation<EntityCreateMutation, EntityCreateMutationVariables>(EntityCreateDocument, baseOptions);
      }
export type EntityCreateMutationHookResult = ReturnType<typeof useEntityCreateMutation>;
export type EntityCreateMutationResult = ApolloReactCommon.MutationResult<EntityCreateMutation>;
export type EntityCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<EntityCreateMutation, EntityCreateMutationVariables>;
export const EntitiesDocument = gql`
    query Entities($flightId: ID!) {
  entities(flightId: $flightId, inert: true) {
    ...EntityData
  }
}
    ${EntityDataFragmentDoc}`;

/**
 * __useEntitiesQuery__
 *
 * To run a query within a React component, call `useEntitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntitiesQuery({
 *   variables: {
 *      flightId: // value for 'flightId'
 *   },
 * });
 */
export function useEntitiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EntitiesQuery, EntitiesQueryVariables>) {
        return ApolloReactHooks.useQuery<EntitiesQuery, EntitiesQueryVariables>(EntitiesDocument, baseOptions);
      }
export function useEntitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EntitiesQuery, EntitiesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EntitiesQuery, EntitiesQueryVariables>(EntitiesDocument, baseOptions);
        }
export type EntitiesQueryHookResult = ReturnType<typeof useEntitiesQuery>;
export type EntitiesLazyQueryHookResult = ReturnType<typeof useEntitiesLazyQuery>;
export type EntitiesQueryResult = ApolloReactCommon.QueryResult<EntitiesQuery, EntitiesQueryVariables>;
export const EntityRemoveDocument = gql`
    mutation EntityRemove($id: [ID!]!) {
  entityRemove(id: $id)
}
    `;
export type EntityRemoveMutationFn = ApolloReactCommon.MutationFunction<EntityRemoveMutation, EntityRemoveMutationVariables>;

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
export function useEntityRemoveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntityRemoveMutation, EntityRemoveMutationVariables>) {
        return ApolloReactHooks.useMutation<EntityRemoveMutation, EntityRemoveMutationVariables>(EntityRemoveDocument, baseOptions);
      }
export type EntityRemoveMutationHookResult = ReturnType<typeof useEntityRemoveMutation>;
export type EntityRemoveMutationResult = ApolloReactCommon.MutationResult<EntityRemoveMutation>;
export type EntityRemoveMutationOptions = ApolloReactCommon.BaseMutationOptions<EntityRemoveMutation, EntityRemoveMutationVariables>;
export const EntityRemoveGlowDocument = gql`
    mutation EntityRemoveGlow($id: ID!) {
  entityRemoveGlow(id: $id)
}
    `;
export type EntityRemoveGlowMutationFn = ApolloReactCommon.MutationFunction<EntityRemoveGlowMutation, EntityRemoveGlowMutationVariables>;

/**
 * __useEntityRemoveGlowMutation__
 *
 * To run a mutation, you first call `useEntityRemoveGlowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntityRemoveGlowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entityRemoveGlowMutation, { data, loading, error }] = useEntityRemoveGlowMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEntityRemoveGlowMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntityRemoveGlowMutation, EntityRemoveGlowMutationVariables>) {
        return ApolloReactHooks.useMutation<EntityRemoveGlowMutation, EntityRemoveGlowMutationVariables>(EntityRemoveGlowDocument, baseOptions);
      }
export type EntityRemoveGlowMutationHookResult = ReturnType<typeof useEntityRemoveGlowMutation>;
export type EntityRemoveGlowMutationResult = ApolloReactCommon.MutationResult<EntityRemoveGlowMutation>;
export type EntityRemoveGlowMutationOptions = ApolloReactCommon.BaseMutationOptions<EntityRemoveGlowMutation, EntityRemoveGlowMutationVariables>;
export const EntityRemoveLightDocument = gql`
    mutation EntityRemoveLight($id: ID!) {
  entityRemoveLight(id: $id)
}
    `;
export type EntityRemoveLightMutationFn = ApolloReactCommon.MutationFunction<EntityRemoveLightMutation, EntityRemoveLightMutationVariables>;

/**
 * __useEntityRemoveLightMutation__
 *
 * To run a mutation, you first call `useEntityRemoveLightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntityRemoveLightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entityRemoveLightMutation, { data, loading, error }] = useEntityRemoveLightMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEntityRemoveLightMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntityRemoveLightMutation, EntityRemoveLightMutationVariables>) {
        return ApolloReactHooks.useMutation<EntityRemoveLightMutation, EntityRemoveLightMutationVariables>(EntityRemoveLightDocument, baseOptions);
      }
export type EntityRemoveLightMutationHookResult = ReturnType<typeof useEntityRemoveLightMutation>;
export type EntityRemoveLightMutationResult = ApolloReactCommon.MutationResult<EntityRemoveLightMutation>;
export type EntityRemoveLightMutationOptions = ApolloReactCommon.BaseMutationOptions<EntityRemoveLightMutation, EntityRemoveLightMutationVariables>;
export const EntityRemoveStageDocument = gql`
    mutation EntityRemoveStage($id: ID!) {
  entityRemoveStage(id: $id)
}
    `;
export type EntityRemoveStageMutationFn = ApolloReactCommon.MutationFunction<EntityRemoveStageMutation, EntityRemoveStageMutationVariables>;

/**
 * __useEntityRemoveStageMutation__
 *
 * To run a mutation, you first call `useEntityRemoveStageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntityRemoveStageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entityRemoveStageMutation, { data, loading, error }] = useEntityRemoveStageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEntityRemoveStageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntityRemoveStageMutation, EntityRemoveStageMutationVariables>) {
        return ApolloReactHooks.useMutation<EntityRemoveStageMutation, EntityRemoveStageMutationVariables>(EntityRemoveStageDocument, baseOptions);
      }
export type EntityRemoveStageMutationHookResult = ReturnType<typeof useEntityRemoveStageMutation>;
export type EntityRemoveStageMutationResult = ApolloReactCommon.MutationResult<EntityRemoveStageMutation>;
export type EntityRemoveStageMutationOptions = ApolloReactCommon.BaseMutationOptions<EntityRemoveStageMutation, EntityRemoveStageMutationVariables>;
export const EntitySetAppearanceDocument = gql`
    mutation EntitySetAppearance($id: ID!, $color: String, $meshType: MeshTypeEnum, $modelAsset: String, $materialMapAsset: String, $cloudMapAsset: String, $ringMapAsset: String, $emissiveColor: String, $emissiveIntensity: Float, $scale: Float) {
  entitySetAppearance(id: $id, color: $color, meshType: $meshType, modelAsset: $modelAsset, materialMapAsset: $materialMapAsset, cloudMapAsset: $cloudMapAsset, ringMapAsset: $ringMapAsset, emissiveColor: $emissiveColor, emissiveIntensity: $emissiveIntensity, scale: $scale)
}
    `;
export type EntitySetAppearanceMutationFn = ApolloReactCommon.MutationFunction<EntitySetAppearanceMutation, EntitySetAppearanceMutationVariables>;

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
 *      cloudMapAsset: // value for 'cloudMapAsset'
 *      ringMapAsset: // value for 'ringMapAsset'
 *      emissiveColor: // value for 'emissiveColor'
 *      emissiveIntensity: // value for 'emissiveIntensity'
 *      scale: // value for 'scale'
 *   },
 * });
 */
export function useEntitySetAppearanceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntitySetAppearanceMutation, EntitySetAppearanceMutationVariables>) {
        return ApolloReactHooks.useMutation<EntitySetAppearanceMutation, EntitySetAppearanceMutationVariables>(EntitySetAppearanceDocument, baseOptions);
      }
export type EntitySetAppearanceMutationHookResult = ReturnType<typeof useEntitySetAppearanceMutation>;
export type EntitySetAppearanceMutationResult = ApolloReactCommon.MutationResult<EntitySetAppearanceMutation>;
export type EntitySetAppearanceMutationOptions = ApolloReactCommon.BaseMutationOptions<EntitySetAppearanceMutation, EntitySetAppearanceMutationVariables>;
export const EntitySetGlowDocument = gql`
    mutation EntitySetGlow($id: ID!, $glowMode: GlowModeEnum, $color: String) {
  entitySetGlow(id: $id, glowMode: $glowMode, color: $color)
}
    `;
export type EntitySetGlowMutationFn = ApolloReactCommon.MutationFunction<EntitySetGlowMutation, EntitySetGlowMutationVariables>;

/**
 * __useEntitySetGlowMutation__
 *
 * To run a mutation, you first call `useEntitySetGlowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntitySetGlowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entitySetGlowMutation, { data, loading, error }] = useEntitySetGlowMutation({
 *   variables: {
 *      id: // value for 'id'
 *      glowMode: // value for 'glowMode'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useEntitySetGlowMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntitySetGlowMutation, EntitySetGlowMutationVariables>) {
        return ApolloReactHooks.useMutation<EntitySetGlowMutation, EntitySetGlowMutationVariables>(EntitySetGlowDocument, baseOptions);
      }
export type EntitySetGlowMutationHookResult = ReturnType<typeof useEntitySetGlowMutation>;
export type EntitySetGlowMutationResult = ApolloReactCommon.MutationResult<EntitySetGlowMutation>;
export type EntitySetGlowMutationOptions = ApolloReactCommon.BaseMutationOptions<EntitySetGlowMutation, EntitySetGlowMutationVariables>;
export const EntitySetIdentityDocument = gql`
    mutation EntitySetIdentity($id: ID!, $name: String!) {
  entitySetIdentity(id: $id, name: $name)
}
    `;
export type EntitySetIdentityMutationFn = ApolloReactCommon.MutationFunction<EntitySetIdentityMutation, EntitySetIdentityMutationVariables>;

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
export function useEntitySetIdentityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntitySetIdentityMutation, EntitySetIdentityMutationVariables>) {
        return ApolloReactHooks.useMutation<EntitySetIdentityMutation, EntitySetIdentityMutationVariables>(EntitySetIdentityDocument, baseOptions);
      }
export type EntitySetIdentityMutationHookResult = ReturnType<typeof useEntitySetIdentityMutation>;
export type EntitySetIdentityMutationResult = ApolloReactCommon.MutationResult<EntitySetIdentityMutation>;
export type EntitySetIdentityMutationOptions = ApolloReactCommon.BaseMutationOptions<EntitySetIdentityMutation, EntitySetIdentityMutationVariables>;
export const EntitySetLightDocument = gql`
    mutation EntitySetLight($id: ID!, $color: String, $intensity: Float, $decay: Float) {
  entitySetLight(id: $id, color: $color, intensity: $intensity, decay: $decay)
}
    `;
export type EntitySetLightMutationFn = ApolloReactCommon.MutationFunction<EntitySetLightMutation, EntitySetLightMutationVariables>;

/**
 * __useEntitySetLightMutation__
 *
 * To run a mutation, you first call `useEntitySetLightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntitySetLightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entitySetLightMutation, { data, loading, error }] = useEntitySetLightMutation({
 *   variables: {
 *      id: // value for 'id'
 *      color: // value for 'color'
 *      intensity: // value for 'intensity'
 *      decay: // value for 'decay'
 *   },
 * });
 */
export function useEntitySetLightMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntitySetLightMutation, EntitySetLightMutationVariables>) {
        return ApolloReactHooks.useMutation<EntitySetLightMutation, EntitySetLightMutationVariables>(EntitySetLightDocument, baseOptions);
      }
export type EntitySetLightMutationHookResult = ReturnType<typeof useEntitySetLightMutation>;
export type EntitySetLightMutationResult = ApolloReactCommon.MutationResult<EntitySetLightMutation>;
export type EntitySetLightMutationOptions = ApolloReactCommon.BaseMutationOptions<EntitySetLightMutation, EntitySetLightMutationVariables>;
export const EntitySetLocationDocument = gql`
    mutation EntitySetLocation($id: ID!, $position: EntityCoordinatesInput, $velocity: EntityCoordinatesInput, $acceleration: EntityCoordinatesInput, $rotation: QuaternionInput, $rotationVelocity: EntityCoordinatesInput, $rotationAcceleration: EntityCoordinatesInput) {
  entitySetLocation(id: $id, position: $position, velocity: $velocity, acceleration: $acceleration, rotation: $rotation, rotationVelocity: $rotationVelocity, rotationAcceleration: $rotationAcceleration)
}
    `;
export type EntitySetLocationMutationFn = ApolloReactCommon.MutationFunction<EntitySetLocationMutation, EntitySetLocationMutationVariables>;

/**
 * __useEntitySetLocationMutation__
 *
 * To run a mutation, you first call `useEntitySetLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntitySetLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entitySetLocationMutation, { data, loading, error }] = useEntitySetLocationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      position: // value for 'position'
 *      velocity: // value for 'velocity'
 *      acceleration: // value for 'acceleration'
 *      rotation: // value for 'rotation'
 *      rotationVelocity: // value for 'rotationVelocity'
 *      rotationAcceleration: // value for 'rotationAcceleration'
 *   },
 * });
 */
export function useEntitySetLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntitySetLocationMutation, EntitySetLocationMutationVariables>) {
        return ApolloReactHooks.useMutation<EntitySetLocationMutation, EntitySetLocationMutationVariables>(EntitySetLocationDocument, baseOptions);
      }
export type EntitySetLocationMutationHookResult = ReturnType<typeof useEntitySetLocationMutation>;
export type EntitySetLocationMutationResult = ApolloReactCommon.MutationResult<EntitySetLocationMutation>;
export type EntitySetLocationMutationOptions = ApolloReactCommon.BaseMutationOptions<EntitySetLocationMutation, EntitySetLocationMutationVariables>;
export const EntitySetRotationVelocityMagnitudeDocument = gql`
    mutation EntitySetRotationVelocityMagnitude($id: ID!, $rotationVelocity: CoordinatesInput!) {
  entitySetRotationVelocityMagnitude(id: $id, rotationVelocity: $rotationVelocity)
}
    `;
export type EntitySetRotationVelocityMagnitudeMutationFn = ApolloReactCommon.MutationFunction<EntitySetRotationVelocityMagnitudeMutation, EntitySetRotationVelocityMagnitudeMutationVariables>;

/**
 * __useEntitySetRotationVelocityMagnitudeMutation__
 *
 * To run a mutation, you first call `useEntitySetRotationVelocityMagnitudeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntitySetRotationVelocityMagnitudeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entitySetRotationVelocityMagnitudeMutation, { data, loading, error }] = useEntitySetRotationVelocityMagnitudeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      rotationVelocity: // value for 'rotationVelocity'
 *   },
 * });
 */
export function useEntitySetRotationVelocityMagnitudeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntitySetRotationVelocityMagnitudeMutation, EntitySetRotationVelocityMagnitudeMutationVariables>) {
        return ApolloReactHooks.useMutation<EntitySetRotationVelocityMagnitudeMutation, EntitySetRotationVelocityMagnitudeMutationVariables>(EntitySetRotationVelocityMagnitudeDocument, baseOptions);
      }
export type EntitySetRotationVelocityMagnitudeMutationHookResult = ReturnType<typeof useEntitySetRotationVelocityMagnitudeMutation>;
export type EntitySetRotationVelocityMagnitudeMutationResult = ApolloReactCommon.MutationResult<EntitySetRotationVelocityMagnitudeMutation>;
export type EntitySetRotationVelocityMagnitudeMutationOptions = ApolloReactCommon.BaseMutationOptions<EntitySetRotationVelocityMagnitudeMutation, EntitySetRotationVelocityMagnitudeMutationVariables>;
export const EntitySetStageDocument = gql`
    mutation EntitySetStage($id: ID!, $scaleLabel: String, $scaleLabelShort: String, $skyboxKey: String) {
  entitySetStage(id: $id, scaleLabel: $scaleLabel, scaleLabelShort: $scaleLabelShort, skyboxKey: $skyboxKey)
}
    `;
export type EntitySetStageMutationFn = ApolloReactCommon.MutationFunction<EntitySetStageMutation, EntitySetStageMutationVariables>;

/**
 * __useEntitySetStageMutation__
 *
 * To run a mutation, you first call `useEntitySetStageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntitySetStageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entitySetStageMutation, { data, loading, error }] = useEntitySetStageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      scaleLabel: // value for 'scaleLabel'
 *      scaleLabelShort: // value for 'scaleLabelShort'
 *      skyboxKey: // value for 'skyboxKey'
 *   },
 * });
 */
export function useEntitySetStageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntitySetStageMutation, EntitySetStageMutationVariables>) {
        return ApolloReactHooks.useMutation<EntitySetStageMutation, EntitySetStageMutationVariables>(EntitySetStageDocument, baseOptions);
      }
export type EntitySetStageMutationHookResult = ReturnType<typeof useEntitySetStageMutation>;
export type EntitySetStageMutationResult = ApolloReactCommon.MutationResult<EntitySetStageMutation>;
export type EntitySetStageMutationOptions = ApolloReactCommon.BaseMutationOptions<EntitySetStageMutation, EntitySetStageMutationVariables>;
export const EntitySetTemplateDocument = gql`
    mutation EntitySetTemplate($id: ID, $category: String!) {
  entitySetTemplate(id: $id, category: $category)
}
    `;
export type EntitySetTemplateMutationFn = ApolloReactCommon.MutationFunction<EntitySetTemplateMutation, EntitySetTemplateMutationVariables>;

/**
 * __useEntitySetTemplateMutation__
 *
 * To run a mutation, you first call `useEntitySetTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntitySetTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entitySetTemplateMutation, { data, loading, error }] = useEntitySetTemplateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useEntitySetTemplateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EntitySetTemplateMutation, EntitySetTemplateMutationVariables>) {
        return ApolloReactHooks.useMutation<EntitySetTemplateMutation, EntitySetTemplateMutationVariables>(EntitySetTemplateDocument, baseOptions);
      }
export type EntitySetTemplateMutationHookResult = ReturnType<typeof useEntitySetTemplateMutation>;
export type EntitySetTemplateMutationResult = ApolloReactCommon.MutationResult<EntitySetTemplateMutation>;
export type EntitySetTemplateMutationOptions = ApolloReactCommon.BaseMutationOptions<EntitySetTemplateMutation, EntitySetTemplateMutationVariables>;