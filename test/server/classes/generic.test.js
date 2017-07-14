var chai = require('chai');
var expect = chai.expect;

const System = require('../../../server/classes/generic').System;

let system;
describe('System', function() {
  beforeAll(function() {});
  it('should construct without params', function() {
    system = new System();
    expect(system.name).to.equal(null);
    expect(system.simulatorId).to.equal(null);
  });
  it('should have default damage', function() {
    expect(system.damage.damaged).to.be.false;
    expect(system.damage.requested).to.be.false;
    expect(system.damage.report).to.equal(null);
  });
  it('should have default power', function() {
    expect(system.power.power).to.equal(5);
    expect(system.power.powerLevels).to.be.instanceOf(Array);
    expect(system.power.powerLevels[0]).to.equal(5);
  });
  it('should have a getter `stealthFactor` which is null', function() {
    expect(system.stealthFactor).to.equal(null);
  });
  it('should have a method break', function() {
    system.break('My Report');
    expect(system.damage.damaged).to.be.true;
    expect(system.damage.requested).to.be.false;
    expect(system.damage.report).to.equal('My Report');
  });
  it('should have a method damageReport', function() {
    system.damageReport('My new report');
    expect(system.damage.report).to.equal('My new report');
  });
  it('should have a method requestReport', function() {
    system.requestReport();
    expect(system.damage.requested).to.be.true;
  });
  it('should have a method repair', function() {
    system.repair();
    expect(system.damage.damaged).to.be.false;
    expect(system.damage.requested).to.be.false;
    expect(system.damage.report).to.equal(null);
  });
});
