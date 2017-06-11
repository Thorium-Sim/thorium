var chai = require('chai');
var expect = chai.expect;

let engine;
describe('Engine', function() {
  before(function() {
    this.Engine = require('../../../server/classes/engine').default;
  });
  it('should construct without params', function() {
    engine = new this.Engine();
    expect(engine.speeds).to.be.instanceOf(Array);
    expect(engine.speeds.length).to.equal(0);
    expect(engine.class).to.equal('Engine');
  });
  it('should have a method setSpeed() which sets the speed', function() {
    engine = new this.Engine({
      speeds: [{number: 1, text: 'Warp 1'}, {number: 2, text: 'Warp 2'}]
    });
    expect(engine.speeds.length).to.equal(2);
    engine.setSpeed(2, false);
    expect(engine.speed).to.equal(2);
    expect(engine.on).to.be.false;
    engine.setSpeed(1, true);
    expect(engine.on).to.be.true;
  });
  it('should have a method cool', function(){
    engine.cool();
    expect(engine.cooling).to.be.true;
  });
  it('should have a getter stealthFactor', function(){
    expect(engine.stealthFactor).to.equal(1);
  });
  it('should stop the engine when broken', function(){
    expect(engine.speed).to.equal(1);
    expect(engine.on).to.be.true;
    engine.break();
    expect(engine.on).to.be.false;
    expect(engine.speed).to.equal(-1);
    engine.repair();
  })
});