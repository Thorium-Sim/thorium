var chai = require("chai");
var expect = chai.expect;
const Flight = require("../../../server/classes/flight").default;

let flight;
describe("Flight", function() {
  beforeAll(function() {});
  it("should construct without params", function() {
    flight = new Flight({
      simulators: ["sim1", "sim2"]
    });
    expect(flight.simulators.length).to.equal(2);
    expect(flight.name.split("-").length).to.equal(3);
    expect(flight.simulators[0]).to.equal("sim1");
  });
  it("should have a method addSimulator()", function() {
    expect(flight.simulators.length).to.equal(2);
    flight.addSimulator({ id: "sim3" }, "stationset3");
    expect(flight.simulators.length).to.equal(3);
    expect(flight.simulators[2]).to.equal("sim3");
  });
  it("should have a method removeSimulator()", function() {
    expect(flight.simulators.length).to.equal(3);
    flight.removeSimulator("sim2");
    expect(flight.simulators.length).to.equal(2);
    expect(flight.simulators[0]).to.equal("sim1");
    expect(flight.simulators[1]).to.equal("sim3");
  });
  it("should have a method stopFlight()", function() {
    expect(flight.running).to.equal(true);
    flight.stopFlight();
    expect(flight.running).to.equal(false);
  });
});
