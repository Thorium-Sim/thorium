import uuid from "uuid";
import App from "../app";
import {randomFromList} from "./generic/damageReports/constants";
import systemNames from "./universe/systemNames";

export class Record {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Record";
    this.contents = params.contents || "";
    this.original = params.original || params.contents || "";
    this.timestamp = params.timestamp || new Date().toISOString();
    this.category = params.category || "Manual";
    this.modified = params.modified || false;
    // This is an indication of records that don't
    // belong to the simulator
    this.snippetId = params.snippetId || null;
  }
  update({contents, timestamp, category, modified}) {
    if (contents) this.contents = contents;
    if (timestamp) this.timestamp = timestamp;
    if (category) this.category = category;
    if (modified || modified === false) this.modified = modified;
  }
}

const deniedSystemClasses = ["StealthField", "Transwarp", "Thx", "Crm"];

export class RecordSnippet {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "RecordSnippet";
    this.simulatorId = params.simulatorId || null;
    this.sensorContactId = params.sensorContactId || null;
    this.name = params.name || "Snippet";
    this.type = params.type || "normal";
    this.launched = params.launched || false;
    this.records = params.records || [];
    this.visible = params.visible ?? true;
    this.templateRecords = params.templateRecords || [];
  }
  rename(name) {
    this.name = name;
  }
  addRecords(ids) {
    this.records = this.records
      .concat(ids)
      .filter((r, i, a) => a.indexOf(r) === i);
  }
  removeRecord(id) {
    this.records = this.records.filter(r => r !== id);
  }
  addTemplate(record) {
    this.templateRecords.push(record);
  }
  updateTemplate(id, data) {
    const record = this.templateRecords.find(r => r.id === id);

    if (record) record.update(data);
  }
  removeTemplate(id) {
    this.templateRecords = this.templateRecords.filter(r => r.id !== id);
  }
  static generateRandomRecord({type, timestamp, speed, snippetId}) {
    // Probe Launched
    if (type === "probeLaunched") {
      return new Record({
        contents: "Probe Launched",
        timestamp,
        category: "Probes",
        snippetId,
      });
    }
    // System Damaged & Repaired
    if (type === "systemDamaged") {
      // Get a random system type.
      const systemNames = App.systems
        .filter((a, i, arr) => arr.findIndex(b => b.class === a.class) === i)
        .filter(a => !deniedSystemClasses.includes(a.class))
        .filter(Boolean);
      const sys = randomFromList(systemNames);
      return new Record({
        contents: `${sys.displayName} Damaged`,
        timestamp,
        category: "Systems",
        snippetId,
      });
    }
    if (type === "systemRepaired") {
      const systemNames = App.systems
        .filter((a, i, arr) => arr.findIndex(b => b.class === a.class) === i)
        .filter(a => !deniedSystemClasses.includes(a.class))
        .filter(Boolean);
      const sys = randomFromList(systemNames);
      return new Record({
        contents: `${sys.displayName} Repaired`,
        timestamp,
        category: "Systems",
        snippetId,
      });
    }
    // Alert Status Change
    if (type === "alertStatusChange") {
      return new Record({
        contents: Math.round(Math.random() * 4 + 1),
        timestamp,
        category: "Alert Condition",
        snippetId,
      });
    }
    // Transporters
    if (type === "transporters") {
      const transporterTargets = [
        "foodstuffs",
        "fuel",
        "crew",
        "coolant",
        "coaxial servo",
      ];
      const transporterDestinations = [
        "transporter room A",
        "reactor control room",
        "cargo bay",
      ];
      return new Record({
        contents: `Transported ${randomFromList(
          transporterTargets,
        )} to ${randomFromList(transporterDestinations)}`,
        timestamp,
        category: "Transporters",
        snippetId,
      });
    }
    // LRM w/ destination, including who wrote it
    if (type === "longRangeMessage") {
      const messageDestinations = [
        "Starbase 4",
        "Starbase 74",
        "Rigel 4",
        "Starbase 101",
      ];
      return new Record({
        contents: `Long Range Message received from ${randomFromList(
          messageDestinations,
        )}`,
        timestamp,
        category: "Communication",
        snippetId,
      });
    }
    // Communications call connected
    // Communications Hail
    // Communications Hail Cancelled
    // Communications Hail Connected
    if (type === "shortRangeHail") {
      return new Record({
        timestamp,
        contents: `New Hail: ${
          Math.round(Math.random() * 37700 + 37700) / 100
        }MHz`,
        category: "Communication",
        snippetId,
      });
    }
    if (type === "shortRangeConnected") {
      return new Record({
        timestamp,
        contents: `Call Connected: ${
          Math.round(Math.random() * 37700 + 37700) / 100
        }MHz`,
        category: "Communication",
        snippetId,
      });
    }
    // Shields Raised, Lowered
    if (type === "shieldsRaised") {
      return new Record({
        timestamp,
        contents: `Raised`,
        category: "Shields",
        snippetId,
      });
    }
    if (type === "shieldsLowered") {
      return new Record({
        timestamp,
        contents: `Lowered`,
        category: "Shields",
        snippetId,
      });
    }
    // Phasers Fired
    if (type === "phasersFired") {
      return new Record({
        timestamp,
        contents: `Phasers Fired`,
        category: "Weapons",
        snippetId,
      });
    }
    // Torpedos Fired
    if (type === "torpedosFired") {
      return new Record({
        timestamp,
        contents: `Torpedo Fired`,
        category: "Weapons",
        snippetId,
      });
    }
    // Speed Change
    if (type === "speedChange") {
      const engineSpeeds = App.systems
        .filter(e => e.class === "Engine")
        .reduce((acc, next) => acc.concat(next.speeds), [])
        .map(s => s.text)
        .filter((a, i, arr) => arr.indexOf(a) === i)
        // Stack in a few full stops to make it more likely.
        .concat("Full Stop")
        .concat("Full Stop")
        .concat("Full Stop")
        .concat("Full Stop")
        .concat("Full Stop")
        .concat("Full Stop");
      return new Record({
        timestamp,
        contents: speed || randomFromList(engineSpeeds),
        category: "Engines",
        snippetId,
      });
    }
    // Course Change
    if (type === "courseChange") {
      return new Record({
        timestamp,
        contents: randomFromList(systemNames),
        category: "Navigation",
        snippetId,
      });
    }
  }
  static generateSnippets(simulator, name, count = 30, visible) {
    const Snippet = new RecordSnippet({
      simulatorId: simulator.id,
      name,
      type: "external",
      visible,
    });
    const availableTypes = [
      "probeLaunched",
      "systemDamaged",
      "systemRepaired",
      "alertStatusChange",
      "transporters",
      "longRangeMessage",
      "shortRangeHail",
      "shortRangeConnected",
      "shieldsRaised",
      "shieldsLowered",
      "phasersFired",
      "torpedosFired",
      "speedChange",
      "courseChange",
    ];
    let time = Date.now();
    for (let i = 0; i < count; i++) {
      time -= Math.random() * 1000 * 60 * 4 + 1000 * 60 * 1;
      const type = randomFromList(availableTypes);
      if (type === "courseChange") {
        // If the course is changed, stop first, set course, then increase the speed shortly thereafter
        const record1 = RecordSnippet.generateRandomRecord({
          type: "speedChange",
          speed: "Full Stop",
          timestamp: new Date(time).toISOString(),
          snippetId: Snippet.id,
        });
        simulator.records.push(record1);
        time -= Math.random() * 1000 * 60 * 4 + 1000 * 60 * 1;
        const record2 = RecordSnippet.generateRandomRecord({
          type: "courseChange",
          timestamp: new Date(time).toISOString(),
          snippetId: Snippet.id,
        });
        simulator.records.push(record2);
        time -= Math.random() * 1000 * 60 * 4 + 1000 * 60 * 1;
        const record3 = RecordSnippet.generateRandomRecord({
          type: "speedChange",
          timestamp: new Date(time).toISOString(),
          snippetId: Snippet.id,
        });
        simulator.records.push(record3);
        Snippet.addRecords([record1.id, record2.id, record3.id]);
      } else {
        const record = RecordSnippet.generateRandomRecord({
          type,
          timestamp: new Date(time).toISOString(),
          snippetId: Snippet.id,
        });
        simulator.records.push(record);
        Snippet.addRecords(record.id);
      }
    }
    return Snippet;
  }
}
