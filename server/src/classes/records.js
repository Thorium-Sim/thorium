import uuid from "uuid";

export class Record {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Record";
    this.contents = params.contents || "";
    this.original = params.original || "";
    this.timestamp = params.timestamp || new Date();
    this.category = params.category || "Manual";
    this.modified = params.modified || false;
  }
}
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
  }
  addRecords(ids) {
    this.records = this.records
      .concat(ids)
      .filter((r, i, a) => a.indexOf(r) === i);
  }
  removeRecord(id) {
    this.records = this.records.filter(r => r !== id);
  }
}
