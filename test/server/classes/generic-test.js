var chai = require('chai');
var expect = chai.expect;


describe('System', function() {
  before(function() {
    this.System = require('../../../server/classes/generic').System;
  })
  it('should construct without params', function() {
    const system = new this.System();
    expect(system.name).to.equal(null);
    expect(system.simulatorId).to.equal(null);
  });
  it('should work with arrays', function() {
    expect([]).to.be.instanceOf(Array);
  })
});