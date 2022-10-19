import uuid from "uuid";
import {System} from "../generic";
import * as defaults from "./defaults";

class User {
  id: string;
  name: string;
  password: string;
  hacker: boolean;
  level: number;
  constructor(params: Partial<User> = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "Generic User";
    this.password = params.password || "rommel1942";
    this.hacker = params.hacker || false;
    this.level = params.level || Math.round(Math.random() * 10 + 1);
  }
  update({name, password, hacker, level}) {
    if (name) this.name = name;
    if (password) this.password = password;
    if (hacker || hacker === false) this.hacker = hacker;
    if (level) this.level = level;
  }
}

export class File {
  id: string;
  name: string;
  level: number;
  corrupted: boolean;
  restoring: boolean;
  constructor(params: Partial<File> = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || `File ${Math.round(Math.random() * 998 + 1)}`;
    this.level = params.level || Math.round(Math.random() * 10 + 1);
    this.corrupted = params.corrupted || false;
    this.restoring = params.restoring || false;
  }
  corrupt() {
    this.corrupted = true;
  }
  restore() {
    this.restoring = true;
  }
  uncorrupt() {
    this.restoring = false;
    this.corrupted = false;
  }
}

function randomString(length, chars) {
  var result = "";
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

class Virus {
  id: string;
  name: string;
  constructor(params: Partial<Virus> = {}) {
    this.id = params.id || uuid.v4();
    this.name =
      params.name ||
      randomString(
        10,
        "0123456789abcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\",
      );
  }
}

// Possible  terminal statuses:
// F - Functional
// O - Offline
// R - Restarting
class Terminal {
  id: string;
  name: string;
  status: "F" | "O" | "R";
  constructor(params: Partial<Terminal> = {}) {
    this.id = params.id || uuid.v4();
    this.name =
      params.name ||
      `Terminal ${randomString(5, "0123456789abcdefghijklmnopqrstuvwxyz")}`;
    this.status = "F";
  }
  updateStatus(status) {
    this.status = status;
  }
}

export default class ComputerCore extends System {
  users: User[];
  virii: Virus[];
  files: File[];
  terminals: Terminal[];
  history: string[];
  constructor(params: Partial<ComputerCore>) {
    super({name: "Main Computer", ...params});
    this.id = params.id || uuid.v4();
    this.class = "ComputerCore";
    this.type = "ComputerCore";
    this.wing = params.wing || "left";

    if (!params.simulatorId) throw new Error("SimulatorId is required");
    this.simulatorId = params.simulatorId;
    this.users = []; // Hackers create virii
    this.virii = []; // Virii corrupt files
    this.files = []; // Corrupted files shutdown terminals
    this.terminals = []; // Who knows what terminals do?
    this.history = [];
    this.training = params.training || false;
    // Start with defaults for all of the above
    (params.users || defaults.users).forEach(u => this.users.push(new User(u)));
    (params.files || defaults.files).forEach(f => this.files.push(new File(f)));
    (params.virii || []).forEach(v => this.virii.push(new Virus(v)));
    (
      params.terminals ||
      Array(200)
        .fill({})
        .map((_, i) => ({name: `Terminal ${i + 1}`}))
    ).forEach(t => this.terminals.push(new Terminal(t)));

    // Hacking stuff
    this.hackingActive = params.hackingActive || false;
    this.activeHackingPreset = params.activeHackingPreset || null;
    // "idle", "scanning", "hacking"
    this.hackingState = params.hackingState || "idle";
    this.hackingPortScanFrequency = params.hackingPortScanFrequency || 0.5;
    this.hackingLog = params.hackingLog || [];
    this.hackingPorts = params.hackingPorts || {};
  }
  trainingMode() {
    this.training = true;
    this.addUser({name: "I am a hacker", level: 5, hacker: true});
    this.hackingActive = true;
    this.hackingPorts = {
      logs: Math.round(Math.random() * 16385 + 1000),
      longRange: Math.round(Math.random() * 16385 + 17385),
      // remoteControl:  Math.round(Math.random() * 16385 + 33770),
      fileViewer: Math.round(Math.random() * 16385 + 50155),
    };
    this.activeHackingPreset = {
      id: "Training Mode",
      name: "Training Mode",
      logs: true,
      longRange: true,
      longRangeMessages: [
        {
          id: "Training Message",
          title: "Training Message",
          message:
            "Congratulations! You have successfully found this training message.",
        },
      ],
      remoteControl: false,
      commandLines: [],
      fileViewer: true,
      files: [
        {
          id: "Training File",
          name: "Training File",
          level: 1,
          corrupted: false,
          restoring: false,
        },
      ],
    };
  }
  addUser(params) {
    const user = new User(params);
    this.history.unshift(`New User: ${user.name} (${user.level})`);
    this.users.push(user);
    return user;
  }
  updateUser(id, data) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new Error("User not found");
    user.update(data);
  }
  removeUser(id) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new Error("User not found");
    this.history.unshift(`Removed User: ${user.name} (${user.level})`);
    this.users = this.users.filter(u => u.id !== id);
  }
  addFile(params) {
    this.history.unshift(`New File: ${params.name} (${params.level})`);
    this.files.push(new File(params));
  }
  removeFile(id) {
    const file = this.files.find(u => u.id === id);
    if (!file) throw new Error("File not found");
    this.history.unshift(`Removed File: ${file.name} (${file.level})`);
    this.files = this.files.filter(f => f.id !== id);
  }
  restoreFile(id) {
    const file = this.files.find(f => f.id === id);
    if (!file) throw new Error("File not found");
    file.restore();
  }
  uncorruptFile(id) {
    const file = this.files.find(f => f.id === id);
    if (!file) throw new Error("File not found");
    this.history.unshift(`File Restored: ${file.name} (${file.level})`);
    file.uncorrupt();
  }
  corruptFile(id) {
    const file = this.files.find(f => f.id === id);
    if (!file) throw new Error("File not found");
    this.history.unshift(`File Corrupted: ${file.name} (${file.level})`);
    file.corrupt();
  }

  createVirus() {
    const virus = new Virus();
    this.history.unshift(`Virus Created: ${virus.name}`);
    this.virii.push(virus);
    return virus.name;
  }
  removeVirus(id) {
    const virus = this.virii.find(v => v.id === id);
    if (!virus) throw new Error("VIrus not found");
    this.history.unshift(`Virus Removed: ${virus.name}`);
    this.virii = this.virii.filter(v => v.id !== id);
    return virus.name;
  }
  updateTerminalStatus(id, status) {
    const term = this.terminals.find(t => t.id === id);
    if (!term) throw new Error("Terminal not found");
    this.history.unshift(`${term.name} updated: ${status}`);
    term.updateStatus(status);
  }
}
