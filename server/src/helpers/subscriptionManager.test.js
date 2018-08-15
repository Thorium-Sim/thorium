const pubsub = require("./subscriptionManager").pubsub;

test("subscriptionManager", done => {
  pubsub.subscribe("testing", message => {
    expect(message).toEqual("This is a test!");
    done();
  });
  pubsub.publish("testing", "This is a test!");
});
