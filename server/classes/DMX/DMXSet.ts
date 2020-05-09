import uuid from "uuid";
import App from "../../app";
import DMXFixture from "./DMXFixture";

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
  static exportable = "dmxSets";
  serialize({addData}) {
    const filename = `${this.name}.dmxSet`;
    const data = {...this, fixtures: this.fixtures};
    addData("dmxSets", data);
    return filename;
  }
  static import(data: DMXSet) {
    // Extract and load the fixtures
    const fixtureIds = data.fixtures.map(f => {
      const fixture = new DMXFixture({...f, id: null});
      App.dmxFixtures.push(fixture);
      return fixture.id;
    });
    const dmxSet = new DMXSet({...data, fixtureIds, id: null});
    App.dmxSets.push(dmxSet);
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
