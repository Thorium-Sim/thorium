var chai = require("chai");
var expect = chai.expect;
const LongRangeComm = require("../../../server/classes/longRangeComm").default;

let comm;
let messageId;
describe("Long Range Comm", function() {
  beforeAll(function() {});
  it("should construct without params", function() {
    comm = new LongRangeComm();
    expect(comm.class).to.equal("LongRangeComm");
    expect(comm.messages).to.be.instanceOf(Array);
    expect(comm.stealthFactor).to.equal(0.1);
  });
  it("should have a method createMessage", function() {
    comm.createMessage("Awesome", false, false, "Tester");
    comm.createMessage("Testing", true, true, "Tester2");
    expect(comm.messages.length).to.equal(2);
    expect(comm.messages[0].sent).to.equal(false);
    expect(comm.messages[1].sent).to.equal(false);
    expect(comm.messages[0].message).to.equal("Awesome");
    expect(comm.messages[1].decodedMessage).to.equal("Testing");
    expect(comm.messages[0].crew).to.be.false;
    expect(comm.messages[0].deleted).to.be.false;
    expect(comm.messages[0].a > 0).to.be.true;
    expect(comm.messages[0].f > 0).to.be.true;
    messageId = comm.messages[0].id;
  });
  it("should have a method sendMessage", function() {
    comm.sendMessage(messageId);
    expect(comm.messages[0].sent).to.equal(true);
  });
  it("should have a property stealthFactor", function() {
    expect(comm.stealthFactor).to.equal(0.4);
  });
  it("should have a method deleteMessage", function() {
    comm.deleteMessage(messageId);
    expect(comm.messages[0].deleted).to.equal(true);
  });
  it("should have a method updateDecodedMessage", function() {
    comm.updateDecodedMessage(null, messageId, "Testing 123", 1, 5);
    expect(comm.messages[0].decodedMessage).to.equal("Testing 123");
    expect(comm.messages[0].a).to.equal(1);
    expect(comm.messages[0].f).to.equal(5);
  });
});
