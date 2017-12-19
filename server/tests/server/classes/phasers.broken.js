var chai = require("chai");
var expect = chai.expect;

const Phasers = require("../../../server/classes/phasers").default;

let phaser;
let beam;
describe("Phasers", function() {
  beforeAll(function() {});
  it("should construct without params", function() {
    phaser = new Phasers({
      beams: 2
    });
    expect(phaser.class).to.equal("Phasers");
    expect(phaser.beams.length).to.equal(2);
    expect(phaser.arc).to.equal(0.5);
    beam = phaser.beams[0].id;
  });
  it("should have a method updateBeamState", function() {
    phaser.updateBeamState(beam, "charging");
    expect(phaser.beams.find(b => b.id === beam).state).to.equal("charging");
  });
  it("should have a method updateBeamCharge", function() {
    expect(phaser.beams.find(b => b.id === beam).charge).to.equal(0);
    phaser.updateBeamCharge(beam, 1);
    expect(phaser.beams.find(b => b.id === beam).charge).to.equal(1);
  });
  it("should have a property stealthFactor", function() {
    expect(phaser.stealthFactor).to.equal(0.5);
  });
  it("should have a method updateBeamHeat", function() {
    expect(phaser.beams.find(b => b.id === beam).heat).to.equal(0);
    phaser.updateBeamHeat(beam, 1);
    expect(phaser.beams.find(b => b.id === beam).heat).to.equal(1);
  });
  it.skip("should have a method updateBeamCoolant", function() {
    phaser.updateBeamCoolant();
  });
  it("should have a method fireBeam", function() {
    phaser.fireBeam(beam);
    expect(phaser.beams.find(b => b.id === beam).state).to.equal("firing");
  });
  it("should have a method coolBeam", function() {
    phaser.coolBeam(beam);
    expect(phaser.cooling).to.equal(beam);
  });
  it("should have a method stopBeams", function() {
    phaser.stopBeams();
    expect(phaser.beams.find(b => b.id === beam).state).to.equal("idle");
  });
  it("should have a method updateArc", function() {
    phaser.updateArc(0.9);
    expect(phaser.arc).to.equal(0.9);
  });
});
