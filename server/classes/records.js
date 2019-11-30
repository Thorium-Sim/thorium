import uuid from "uuid";

export class Record {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Record";
    this.contents = params.contents || "";
    this.original = params.original || "";
    this.timestamp = params.timestamp || new Date().toISOString();
    this.category = params.category || "Manual";
    this.modified = params.modified || false;
  }
  update({contents, timestamp, category, modified}) {
    if (contents) this.contents = contents;
    if (timestamp) this.timestamp = timestamp;
    if (category) this.category = category;
    if (modified || modified === false) this.modified = modified;
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
}
