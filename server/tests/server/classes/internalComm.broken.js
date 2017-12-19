var chai = require("chai");
var expect = chai.expect;
const InternalComm = require("../../../server/classes/internalComm").default;

let internal;
describe("Internal Comm", function() {
  beforeAll(function() {});
  it("should construct without params", function() {
    internal = new InternalComm();
    expect(internal.class).to.equal("InternalComm");
    expect(internal.state).to.equal("idle");
  });
  it("should have a method break() which sets the state to idle", function() {
    internal.state = "blah";
    expect(internal.state).to.equal("blah");
    internal.break();
    expect(internal.state).to.equal("idle");
  });
  it("should have a method callIncoming() which sets incoming to a string", function() {
    internal.callIncoming("Awesome");
    expect(internal.incoming).to.equal("Awesome");
  });
  it("should have a method callOutgoing() which sets outgoing to a string", function() {
    internal.callOutgoing("AwesomeOutgoing");
    expect(internal.outgoing).to.equal("AwesomeOutgoing");
  });
  it("should have a method connectOutgoing() which sets incoming to outgoing", function() {
    internal.connectOutgoing();
    expect(internal.incoming).to.equal("AwesomeOutgoing");
    expect(internal.state).to.equal("connected");
  });
  it("should have a method connectIncoming() which sets outgoing to incoming", function() {
    internal.callIncoming("AwesomeIncoming");
    internal.connectIncoming();
    expect(internal.outgoing).to.equal("AwesomeIncoming");
    expect(internal.state).to.equal("connected");
  });
  it("should have a method cancelIncomingCall() which clears incoming", function() {
    internal.cancelIncomingCall();
    expect(internal.state).to.equal("idle");
    expect(internal.outgoing).to.equal(null);
    expect(internal.incoming).to.equal(null);
  });
  it("should have a method cancelOutgoingCall() which clears outgoing", function() {
    internal.callOutgoing("AwesomeOutgoing");
    internal.callIncoming("Awesome");
    internal.cancelOutgoingCall();
    expect(internal.state).to.equal("idle");
    expect(internal.outgoing).to.equal(null);
    expect(internal.incoming).to.equal("Awesome");
  });
});
