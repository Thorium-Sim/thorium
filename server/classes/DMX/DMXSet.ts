import uuid from "uuid";
import App from "../../app";

export default class DMXSet {
  class: "DMXSet" = "DMXSet";
  id: string;
  name: string;
  fixtureIds: string[];
  constructor(params: Partial<DMXSet> = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "DMX Set";
    this.fixtureIds = params.fixtureIds || [];
  }
  get fixtures() {
    return this.fixtureIds
      .map(id => App.dmxFixtures.find(f => f.id === id))
      .filter(Boolean);
  }
  setName(name: string) {
    this.name = name;
  }
  setFixtures(fixtures: string[]) {
    this.fixtureIds = fixtures;
  }
}
