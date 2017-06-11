var chai = require('chai');
var expect = chai.expect;

let mission;
describe('Mission', function() {
  before(function() {
    this.Mission = require('../../../server/classes/mission').default;
  });
  it('should construct without params', function() {
    mission = new this.Mission();
    expect(mission.class).to.equal('Mission');
    expect(mission.simulators).to.be.instanceOf(Array);
  });
  it.skip('should have a method addSimulator', function(){
    mission.addSimulator('test', 'Awesome');
    expect(mission.simulators.length).to.equal(1);
    expect(mission.timeline.length).to.equal(1);
  });
  it('should have a method removeSimulator', function(){
    mission.removeSimulator('test');
    expect(mission.simulators.length).to.equal(0);
  });
  it('should have a method update', function(){
    mission.update({name: 'Test', description:'test'});
    expect(mission.name).to.equal('Test');
    expect(mission.description).to.equal('test');
  });

});