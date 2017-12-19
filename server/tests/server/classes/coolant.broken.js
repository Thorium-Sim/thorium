let Coolant = require("../../../classes/coolant").default;
let coolant;
describe("Coolant", function() {
  beforeAll(function() {});
  it("should construct without params", function() {
    coolant = new Coolant();
    expect(coolant.class).to.equal("Coolant");
    expect(coolant.coolant).to.equal(1);
    expect(coolant.coolantRate).to.equal(0.2);
  });
  it("should have a method setCoolant() that sets the coolant level", function() {
    coolant.setCoolant(0.4);
    expect(coolant.coolant).to.equal(0.4);
    coolant.setCoolant(9);
    expect(coolant.coolant).to.equal(1);
  });
  it("should have a method setCoolantRate() that sets the coolant rate", function() {
    coolant.setCoolantRate(8);
    expect(coolant.coolantRate).to.equal(8);
  });
  it("should have a method transferCoolant() that initiates coolant transfer", function() {
    expect(coolant.transfer).to.equal(null);
    coolant.transferCoolant("coolSystem", "tank");
    expect(coolant.transfer.sysId).to.equal("coolSystem");
    expect(coolant.transfer.sign).to.equal(-1);
    coolant.transferCoolant("coolSystem");
    expect(coolant.transfer.sign).to.equal(1);
  });
  it("should have a method cancelTransfer() that cancels coolant transfer", function() {
    coolant.cancelTransfer();
    expect(coolant.transfer).to.equal(null);
  });
});
