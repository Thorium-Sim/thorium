const pubsub = require("./subscriptionManager").pubsub;

test("subscriptionManager", async done => {
  return new Promise(resolve => {

    pubsub.subscribe("testing", message => {
      expect(message).toEqual("This is a test!");
      resolve()
    });
    pubsub.publish("testing", "This is a test!");
  })
});
