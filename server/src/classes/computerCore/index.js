import uuid from "uuid";
import { System } from "../generic";
import * as defaults from "./defaults";

class User {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "Generic User";
    this.password = params.password || "rommel1942";
    this.hacker = params.hacker || false;
    this.level = params.level || Math.round(Math.random() * 10 + 1);
  }
}

class File {
  constructor(params = {}) {
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
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.name =
      params.name ||
      randomString(
        10,
        "0123456789abcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\"
      );
  }
}

// Possible  terminal statuses:
// F - Functional
// O - Offline
// R - Restarting
class Terminal {
  constructor(params = {}) {
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
  constructor(params) {
    super(params);
    this.id = params.id || uuid.v4();
    this.class = "ComputerCore";
    this.type = "ComputerCore";
    this.name = params.name || "Main Computer";
    this.displayName = params.displayName || "Main Computer";
    this.simulatorId = params.simulatorId || null;
    this.users = []; // Hackers create virii
    this.virii = []; // Virii corrupt files
    this.files = []; // Corrupted files shutdown terminals
    this.terminals = []; // Who knows what terminals do?
    this.history = [];
    // Start with defaults for all of the above
    (params.users || defaults.users).forEach(u => this.users.push(new User(u)));
    (params.files || defaults.files).forEach(f => this.files.push(new File(f)));
    (params.virii || []).forEach(v => this.virii.push(new Virus(v)));
    (
      params.terminals ||
      Array(200)
        .fill({})
        .map((_, i) => ({ name: `Terminal ${i + 1}` }))
    ).forEach(t => this.terminals.push(new Terminal(t)));
  }
  addUser(params) {
    this.history.unshift(`New User: ${params.name} (${params.level})`);
    this.users.push(new User(params));
  }
  removeUser(id) {
    const user = this.users.find(u => u.id === id);
    this.history.unshift(`Removed User: ${user.name} (${user.level})`);
    this.users = this.users.filter(u => u.id !== id);
  }
  addFile(params) {
    this.history.unshift(`New File: ${params.name} (${params.level})`);
    this.files.push(new File(params));
  }
  removeFile(id) {
    const file = this.files.find(u => u.id === id);
    this.history.unshift(`Removed File: ${file.name} (${file.level})`);
    this.files = this.files.filter(f => f.id !== id);
  }
  restoreFile(id) {
    this.files.find(f => f.id === id).restore();
  }
  uncorruptFile(id) {
    const file = this.files.find(f => f.id === id);
    this.history.unshift(`File Restored: ${file.name} (${file.level})`);
    file.uncorrupt();
  }
  corruptFile(id) {
    const file = this.files.find(f => f.id === id);
    this.history.unshift(`File Corrupted: ${file.name} (${file.level})`);
    file.corrupt();
  }

  createVirus() {
    const virus = new Virus();
    this.history.unshift(`Virus Created: ${virus.name}`);
    this.virii.push(virus);
  }
  removeVirus(id) {
    const virus = this.virii.find(v => v.id === id);
    this.history.unshift(`Virus Removed: ${virus.name}`);
    this.virii = this.virii.filter(v => v.id !== id);
  }
  updateTerminalStatus(id, status) {
    const term = this.terminals.find(t => t.id === id);
    this.history.unshift(`${term.name} updated: ${status}`);
    term.updateStatus(status);
  }
}
