module.exports.login = function login(station) {
  it("should open up a client browser window", () => {
    cy.visit("/client", {
      onBeforeLoad(win) {
        cy.stub(win, "prompt").returns(`Testing Client ${station}`);
      }
    })
      .get("img")
      .click()
      .get(".btn")
      .click();
  });
  it("should properly change the client to the correct station", () => {
    cy.visit("/")
      .getByText("My New Test Flight")
      .click();

    // Select the flight
    cy.getByText(`Testing Client ${station}`)
      .siblings("[data-testid=flight-picker-cell]")
      .children("select")
      .then($e => {
        const id = $e
          .children('[label="This Flight"]')
          .children()
          .attr("value");
        cy.getByText(`Testing Client ${station}`)
          .siblings("[data-testid=flight-picker-cell]")
          .children("select")
          .select(id);
      });

    // Select the station
    cy.getByText(`Testing Client ${station}`)
      .siblings("[data-testid=station-picker-cell]")
      .children("select")
      .select(station);
  });
  it("should open up a client browser window", () => {
    cy.visit("/client", {
      onBeforeLoad(win) {
        cy.stub(win, "prompt").returns(`Testing Client ${station}`);
      }
    })
      .get("img")
      .click()
      .get(".btn")
      .click()
      .get(".station-name")
      .should("have.text", station)
      .getByTestId("login-field")
      .type("Testing")
      .get(".loginBlock > .btn")
      .click();
  });
};
