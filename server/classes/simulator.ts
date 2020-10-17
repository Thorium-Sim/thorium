import uuid from "uuid";
import App from "../app";
import Team from "./teams";
import DamageStep from "./generic/damageStep";
import DamageTask from "./generic/damageTask";
import {Station, Card} from "./stationSet";
import {noCase, camelCase} from "change-case";
import {Record, RecordSnippet} from "./records";
import Assets from "./simulatorAssets";
import SoundEffects from "./simulatorSoundEffects";
import TimelineInstance from "./timelineInstance";
import Ship from "./ship";
import Ambiance from "./ambiance";
import Lighting from "./lighting";
import RemoteAccess from "./remoteAccess";
import Document from "./document";

export default class Simulator {
  id: string;
  name: string;
  layout: string;
  caps: boolean;
  hasLegs: boolean;
  alertLevel: "1" | "2" | "3" | "4" | "5" | "p";
  alertLevelLock: boolean;
  template: boolean;
  templateId: string | null;
  class: "Simulator";
  assets: Assets;
  soundEffects: SoundEffects;
  stationSet: string;
  stations: Station[];
  exocomps: number;
  mission: string;
  currentTimelineStep: number;
  executedTimelineSteps: string[];
  timelines: TimelineInstance[];
  missionConfigs: any;
  bridgeOfficerMessaging: boolean;
  teams: Team[];
  training: boolean;
  ship: Ship;
  panels: string[];
  commandLines: string[];
  triggers: string[];
  triggersPaused: boolean;
  interfaces: string[];
  lighting: Lighting;
  ambiance: Ambiance[];
  midiSets: string[];
  crackedClients: {[key: string]: boolean};
  clientCards: {[key: string]: string};
  stationAssignedCards: {[key: string]: Card[]};
  flipped: boolean;
  hasPrinter: boolean;
  stepDamage: boolean;
  verifyStep: boolean;
  requiredDamageSteps: DamageStep[];
  optionalDamageSteps: DamageStep[];
  damageTasks: DamageTask[];
  commandLineOutputs: {[key: string]: string[]};
  commandLineFeedback: any;
  records: Record[];
  recordSnippets: RecordSnippet[];
  documents: Document[];
  spaceEdventuresId: string | null;

  constructor(params: Partial<Simulator> = {}, newlyCreated: boolean = false) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "Simulator";
    this.layout = params.layout || "LayoutCorners";
    this.caps = params.caps || false;
    // TODO: Move this property to the ship class
    this.hasLegs = params.hasLegs || false;
    this.alertLevel = params.alertLevel || "5";
    this.alertLevelLock = params.alertLevelLock || false;
    this.template = params.template || false;
    this.templateId = params.templateId || null;
    this.class = "Simulator";
    this.assets = new Assets({...params.assets});
    this.soundEffects = new SoundEffects({...params.soundEffects});
    this.stationSet = params.stationSet || null;
    this.stations = [];
    this.exocomps = params.exocomps || 0;

    // Mission Stuff
    this.mission = params.mission || null;
    this.currentTimelineStep = params.currentTimelineStep || 0;
    this.executedTimelineSteps = params.executedTimelineSteps || [];
    this.timelines = [];
    params.timelines &&
      params.timelines.forEach(t =>
        this.timelines.push(new TimelineInstance(t)),
      );
    this.missionConfigs = params.missionConfigs || {};

    this.bridgeOfficerMessaging = params.bridgeOfficerMessaging ?? true;
    this.teams = [];
    this.training = params.training || false;
    this.ship = new Ship({...params.ship}, newlyCreated);
    this.panels = params.panels || [];
    this.commandLines = params.commandLines || [];
    this.triggers = params.triggers || [];
    this.triggersPaused = params.triggersPaused || false;
    this.interfaces = params.interfaces || [];

    params.stations &&
      params.stations.forEach(s => this.stations.push(new Station(s)));
    // Effects Control
    this.lighting = new Lighting({...params.lighting});
    this.ambiance = [];
    if (params.ambiance)
      params.ambiance.forEach(a => this.ambiance.push(new Ambiance(a)));
    this.midiSets = params.midiSets || [];

    this.crackedClients = params.crackedClients || {};
    // The name of the current card which each
    // station is on.
    this.clientCards = params.clientCards || {};

    // Cards assigned to another station from a different station.
    this.stationAssignedCards = params.stationAssignedCards || {};

    this.flipped = params.flipped || false;
    // Set up the teams
    if (params.teams) {
      params.teams.forEach(t => this.teams.push(new Team(t)));
    }
    this.hasPrinter = params.hasPrinter ?? true;

    // Damage reports
    this.stepDamage = params.stepDamage ?? true;
    this.verifyStep = params.verifyStep || false;
    this.requiredDamageSteps = [];
    this.optionalDamageSteps = [];
    params.requiredDamageSteps &&
      params.requiredDamageSteps.forEach(s =>
        this.requiredDamageSteps.push(new DamageStep(s)),
      );
    params.optionalDamageSteps &&
      params.optionalDamageSteps.forEach(s =>
        this.optionalDamageSteps.push(new DamageStep(s)),
      );

    // Task-based damage reports
    this.damageTasks = [];
    params.damageTasks &&
      params.damageTasks.forEach(s => this.damageTasks.push(new DamageTask(s)));

    // Command Lines
    this.commandLineOutputs = {};
    this.commandLineFeedback = {};

    // Records
    this.records = [];
    this.recordSnippets = [];
    params.records &&
      params.records.forEach(r => this.records.push(new Record(r)));
    params.recordSnippets &&
      params.recordSnippets.forEach(r =>
        this.recordSnippets.push(
          new RecordSnippet({...r, simulatorId: this.id}),
        ),
      );

    this.documents = params.documents || [];
    // For Space EdVentures
    this.spaceEdventuresId = params.spaceEdventuresId || null;
  }
  get alertlevel() {
    const stealthField = App.systems.find(
      s => s.simulatorId === this.id && s.type === "StealthField",
    );
    if (!stealthField) return this.alertLevel;
    if (
      stealthField.changeAlert &&
      stealthField.activated &&
      stealthField.state
    )
      return "p";
    return this.alertLevel;
  }
  set alertlevel(level) {
    this.alertLevel = level;
  }

  trainingMode(tf: boolean) {
    this.training = tf;
  }
  rename(name: string) {
    this.name = name;
  }
  setAlertLevel(alertlevel: "1" | "2" | "3" | "4" | "5" | "p" = "5") {
    if (["5", "4", "3", "2", "1", "p"].indexOf(alertlevel) === -1) {
      return;
    }
    this.alertlevel = alertlevel;
  }
  setAlertLevelLock(lock: boolean) {
    this.alertLevelLock = lock;
  }
  setLayout(layout: string) {
    this.layout = layout;
  }
  setClientCard(client: string, cardName: string) {
    this.clientCards[client] = cardName;
  }
  addStationAssignedCard(station: string, card: Card) {
    const stationCards = this.stationAssignedCards[station];
    this.stationAssignedCards[station] = stationCards
      ? stationCards.concat(card)
      : [card];
  }
  removeStationAssignedCard(cardName: string) {
    const stationEntry = Object.entries(
      this.stationAssignedCards,
    ).find(([key, value]) => value.find(c => c.name === cardName));
    const station = stationEntry?.[0];
    if (!station) return;

    const stationCards = this.stationAssignedCards[station];
    this.stationAssignedCards[station] = stationCards
      ? stationCards.filter(c => c.name !== cardName)
      : [];
  }

  setTimelineStep(step: number, timelineId: string = null) {
    if (timelineId) {
      this.setAuxTimelineStep(timelineId, step);
    } else {
      this.currentTimelineStep = step;
    }
  }
  executeTimelineStep(stepId: string) {
    this.executedTimelineSteps.push(stepId);
    this.executedTimelineSteps = this.executedTimelineSteps.filter(
      (a, i, arr) => arr.indexOf(a) === i,
    );
  }
  addAuxTimeline(missionId: string) {
    const timeline = new TimelineInstance({missionId});
    this.timelines.push(timeline);
    return timeline.id;
  }
  setAuxTimelineStep(timelineId: string, step: number) {
    const timeline = this.timelines.find(t => t.id === timelineId);
    timeline && timeline.setTimelineStep(step);
  }
  setMissionConfig(
    missionId: string,
    stationSetId: string,
    actionId: string,
    args: any,
  ) {
    this.missionConfigs[missionId] = this.missionConfigs[missionId] || {};
    this.missionConfigs[missionId][stationSetId] =
      this.missionConfigs[missionId][stationSetId] || {};
    this.missionConfigs[missionId][stationSetId][actionId] = {
      ...this.missionConfigs[missionId][stationSetId][actionId],
      ...args,
    };
  }
  updateLighting(lighting: Partial<Lighting>) {
    this.lighting.update(lighting);
  }
  updateAmbiance(ambiance: Ambiance) {
    this.ambiance.find(a => a.id === ambiance.id).update(ambiance);
  }
  addAmbiance(ambiance: Partial<Ambiance>) {
    this.ambiance.push(new Ambiance(ambiance));
  }
  removeAmbiance(id: string) {
    this.ambiance = this.ambiance.filter(a => a.id !== id);
  }

  // Ship
  clamps(tf: boolean) {
    this.ship.clamps = tf;
  }
  ramps(tf: boolean) {
    this.ship.ramps = tf;
  }
  airlock(tf: boolean) {
    this.ship.airlock = tf;
  }
  legs(tf: boolean) {
    this.ship.legs = tf;
  }
  bridgeCrew(num: number) {
    this.ship.bridgeCrew = num;
  }
  extraPeople(num: number) {
    this.ship.extraPeople = num;
  }
  radiation(num: number) {
    this.ship.radiation = num;
  }
  speed(num: number) {
    this.ship.speed = num;
  }
  sendCode(code: string, station: string) {
    this.ship.remoteAccessCodes.push(new RemoteAccess({code, station}));
  }
  updateCode(codeId: string, state: "Denied" | "Accepted" | "sent") {
    this.ship.remoteAccessCodes.find(c => c.id === codeId).state = state;
  }
  setSelfDestructTime(time: number) {
    this.ship.selfDestructTime = time;
  }
  setSelfDestructCode(code: string) {
    this.ship.selfDestructCode = code;
  }
  setSelfDestructAuto(tf: boolean) {
    this.ship.selfDestructAuto = tf;
  }
  updatePanels(panels: string[]) {
    this.panels = panels || [];
  }
  updateCommandLines(commandLines: string[]) {
    this.commandLines = commandLines || [];
  }
  updateTriggers(triggers: string[]) {
    this.triggers = triggers || [];
  }
  setTriggersPaused(paused: boolean) {
    this.triggersPaused = paused;
  }
  updateInterfaces(interfaces: string[]) {
    this.interfaces = interfaces || [];
  }
  setAssets(assets: Assets) {
    this.assets = new Assets(assets);
  }
  setSoundEffects(effects: SoundEffects) {
    this.soundEffects = new SoundEffects(effects);
  }
  setHasPrinter(hasPrinter: boolean) {
    this.hasPrinter = hasPrinter;
  }
  setHasLegs(hasLegs: boolean) {
    this.hasLegs = hasLegs;
  }

  // Damage Steps
  addDamageStep({name, args, type}: {name: string; args: any; type: string}) {
    this[`${type}DamageSteps`].push(new DamageStep({name, args}));
  }
  updateDamageStep({id, name, args}: {name: string; args: any; id: string}) {
    const step =
      this.requiredDamageSteps.find(s => s.id === id) ||
      this.optionalDamageSteps.find(s => s.id === id);
    step.update({name, args});
  }
  removeDamageStep(stepId: string) {
    // Check both required and optional
    this.requiredDamageSteps = this.requiredDamageSteps.filter(
      s => s.id !== stepId,
    );
    this.optionalDamageSteps = this.optionalDamageSteps.filter(
      s => s.id !== stepId,
    );
  }

  // Damage Tasks
  // As a side note, can I just say how much more elegant
  // the damage tasks system is already? Look at this!
  // It's much simpler. Why didn't I do it this
  // way in the first place? ~A
  addDamageTask(task: DamageTask) {
    if (!task || !task.id || this.damageTasks.find(t => t.id === task.id))
      return;
    this.damageTasks.push(new DamageTask(task));
  }
  updateDamageTask(task: DamageTask) {
    this.damageTasks.find(t => t.id === task.id).update(task);
  }
  removeDamageTask(id: string) {
    this.damageTasks = this.damageTasks.filter(t => t.id !== id);
  }
  hideCard(cardName: string) {
    const name = noCase(camelCase(cardName));
    const cards = this.stations
      ? this.stations.reduce((acc, s) => acc.concat(s.cards), [])
      : [];
    cards.forEach(card => {
      if (
        card &&
        (noCase(camelCase(card.name)) === name ||
          noCase(camelCase(card.component)) === name)
      ) {
        card.hidden = true;
      }
    });
  }
  unhideCard(cardName: string) {
    const name = noCase(camelCase(cardName));
    const cards = this.stations
      ? this.stations.reduce((acc, s) => acc.concat(s.cards), [])
      : [];
    cards.forEach(card => {
      if (
        card &&
        (noCase(camelCase(card.name)) === name ||
          noCase(camelCase(card.component)) === name)
      ) {
        card.hidden = false;
      }
    });
  }
  // Command Line
  addCommandLineOutput(clientId: string, line: string) {
    if (!this.commandLineOutputs[clientId])
      this.commandLineOutputs[clientId] = [];
    this.commandLineOutputs[clientId].push(line);
  }
  addCommandLineFeedback(clientId: string, feedback: any) {
    if (!this.commandLineFeedback[clientId])
      this.commandLineFeedback[clientId] = [];
    this.commandLineFeedback[clientId].push(feedback);
  }
  removeCommandLineFeedback(clientId: string, id: string) {
    this.commandLineFeedback[clientId] = this.commandLineFeedback[
      clientId
    ].filter(c => c.id !== id);
  }
  clearCommandLine(clientId: string) {
    this.commandLineOutputs[clientId] = [];
  }

  crackClient(clientId: string) {
    this.crackedClients[clientId] = true;
  }
  uncrackClient(clientId: string) {
    this.crackedClients[clientId] = false;
  }
  flip(flip: boolean) {
    this.flipped = flip;
  }

  // Records
  createRecord(record: Record) {
    const r = new Record(record);
    this.records.push(r);
    return r;
  }
  createRecordOnSnippet({
    snippetId,
    snippetName = "",
    contents,
    timestamp = 0,
    category,
  }) {
    const snippet = this.recordSnippets.find(
      s =>
        s.id === snippetId ||
        s.name.toLowerCase() === snippetName.toLowerCase(),
    );

    if (!snippet) return null;

    function isValidDate(d: unknown): d is Date {
      return d instanceof Date && !isNaN(Number(d));
    }

    // Get the latest record in this snippet and
    // add the timestamp value to it.
    const ts = snippet.records
      .map(r => this.records.find(({id}) => id === r))
      .reduce((acc, record) => {
        const d = new Date(record.timestamp);
        if (!isValidDate(d)) return acc;
        if (acc > d) return acc;
        return d;
      }, 0);

    const record = new Record({
      contents,
      timestamp: new Date(
        new Date(ts).getTime() + Number(timestamp),
      ).toISOString(),
      category,
      snippetId: snippet.id,
    });
    this.records.push(record);
    this.addRecordToSnippet(snippet.id, [record.id]);

    return snippet;
  }
  createRecordSnippet(snippet: RecordSnippet) {
    const s = new RecordSnippet({...snippet, simulatorId: this.id});
    this.recordSnippets.push(s);
    return s.id;
  }
  addRecordToSnippet(snippetId: string, recordIds: string[]) {
    const snippet = this.recordSnippets.find(s => s.id === snippetId);
    snippet.addRecords(recordIds);
  }
  removeRecordFromSnippet(snippetId: string, recordId: string) {
    const snippet = this.recordSnippets.find(s => s.id === snippetId);
    snippet.removeRecord(recordId);
  }
  showSnippet(snippetId: string) {
    const snippet = this.recordSnippets.find(s => s.id === snippetId);
    snippet.visible = true;
    return snippet;
  }
  hideSnippet(snippetId: string) {
    const snippet = this.recordSnippets.find(s => s.id === snippetId);
    snippet.visible = false;
    return snippet;
  }
  deleteRecord(recordId: string) {
    this.records = this.records.filter(r => r.id !== recordId);
  }

  setSpaceEdventuresId(id: string) {
    this.spaceEdventuresId = id;
  }
}
