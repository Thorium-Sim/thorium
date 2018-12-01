const body = {
  operationName: "StartFlight",
  variables: {
    name: "My New Test Flight",
    simulators: [
      {
        simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
        stationSet: "b0a875f6-0e01-4b51-a423-9241bc197f89",
        missionId: null
      }
    ]
  },
  query:
    "mutation StartFlight($name: String!, $simulators: [SimulatorInput!]!) {\n  startFlight(name: $name, simulators: $simulators)\n}\n"
};

Cypress.Commands.add("startFlight", () => {
  describe("startFlight", () => {
    it("should start the flight", () => {
      cy.request({
        url: "http://localhost:3001/graphql",
        method: "POST",
        body: body
      });
    });
  });
});
