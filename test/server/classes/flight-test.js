var chai = require('chai');
var expect = chai.expect;

let flight;
describe('Flight', function() {
  before(function() {
    this.Flight = require('../../../server/classes/flight').default;
  });
  it('should construct without params', function() {
    flight = new this.Flight({
      simulators: [{
        id: 'sim1',
        stationSet: 'stationset1'
      },
      {
        id: 'sim2',
        stationSet: 'stationset2'
      }]
    });
    expect(flight.simulators.length).to.equal(2);
    expect(flight.name).to.equal('Flight');
    expect(flight.simulators[0].id).to.equal('sim1');
  });
  it('should have a method addSimulator()', function(){
    expect(flight.simulators.length).to.equal(2);
    flight.addSimulator({id: 'sim3'}, 'stationset3');
    expect(flight.simulators.length).to.equal(3);
    expect(flight.simulators[2].id).to.equal('sim3');
  });
  it('should have a method removeSimulator()', function(){
    expect(flight.simulators.length).to.equal(3);
    flight.removeSimulator('sim2');
    expect(flight.simulators.length).to.equal(2);
    expect(flight.simulators[0].id).to.equal('sim1');
    expect(flight.simulators[1].id).to.equal('sim3');
  });
  it('should have a method updateSimulatorStationSet()', function(){
    expect(flight.simulators[0].stationSet).to.equal('stationset1');
    flight.updateSimulatorStationSet('sim1', 'stationset4');
    expect(flight.simulators[0].stationSet).to.equal('stationset4');
  });
});