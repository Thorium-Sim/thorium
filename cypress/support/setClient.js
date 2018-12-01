Cypress.Commands.add("setClient", station => {
  cy.visit("http://localhost:3000")
    .then($e => {
      window.localStorage.setItem(
        "thorium_clientId",
        `Testing Client ${station}`
      );
      return $e;
    })
    // Register the client
    .request({
      url: "http://localhost:3001/graphql",
      method: "POST",
      body: {
        operationName: "RegisterClient",
        variables: { client: `Testing Client ${station}` },
        query:
          "mutation RegisterClient($client: ID!) {\n  clientConnect(client: $client)\n}\n"
      }
    })
    // Set the flight
    .request({
      url: "http://localhost:3001/graphql",
      method: "POST",
      body: {
        operationName: "UpdateClient",
        variables: {
          client: `Testing Client ${station}`,
          id: "b7265259-9186-454c-a404-3ba22a29c1ef"
        },
        query:
          "mutation UpdateClient($client: ID!, $id: ID!) {\n  clientSetFlight(client: $client, flightId: $id)\n}\n"
      }
    })
    // Login
    .request({
      url: "http://localhost:3001/graphql",
      method: "POST",
      body: {
        operationName: "LoginClient",
        variables: {
          client: `Testing Client ${station}`,
          loginName: "Test Login"
        },
        query:
          "mutation LoginClient($client: ID!, $loginName: String) {\n  clientLogin(client: $client, loginName: $loginName)\n}\n"
      }
    })
    // Set the station
    .request({
      url: "http://localhost:3001/graphql",
      method: "POST",
      body: {
        operationName: "UpdateClient",
        variables: { client: `Testing Client ${station}`, id: station },
        query:
          "mutation UpdateClient($client: ID!, $id: ID!) {\n  clientSetStation(client: $client, stationName: $id)\n}\n"
      }
    })
    .visit("http://localhost:3000/client");
});
