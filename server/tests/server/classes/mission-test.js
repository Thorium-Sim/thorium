var chai = require("chai");
var expect = chai.expect;
const Mission = require("../../../server/classes/mission").default;

let mission;
describe("Mission", function() {
  beforeAll(function() {});
  it("should construct without params", function() {
    mission = new Mission();
    expect(mission.class).to.equal("Mission");
  });
  it("should have a method update", function() {
    mission.update({ name: "Test", description: "test" });
    expect(mission.name).to.equal("Test");
    expect(mission.description).to.equal("test");
  });
});
