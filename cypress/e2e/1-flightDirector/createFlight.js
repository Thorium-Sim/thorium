describe("create flight", () => {
  it("should be able to change the client ID", () => {
    cy.visit("/client", {
      onBeforeLoad(win) {
        cy.stub(win, "prompt").returns("Testing Client");
      }
    })
      .get("img")
      .click()
      .get(".btn")
      .click()
      .get("img")
      .click()
      .get(".btn")
      .should($1 => {
        expect($1).to.contain("Client ID: Testing Client");
      });
  });
  it("should create a flight", () => {
    cy.visit("/")
      .getByText("New Flight")
      .click()
      .get(".form-control")
      .click()
      .clear()
      .type("Testing Test Flight")
      .getByText("Voyager")
      .click()
      .getByText("8-Standard")
      .click()
      .getByText("Skip")
      .click()
      .getByText("Start Flight")
      .click()
      .getByText("Flight Lobby")
      .should("be.visible");
  });
  it("should be able to delete the flight", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win, "confirm").returns(true);
      }
    })
      .getByText("Testing Test Flight")
      .click()
      .getByText("Delete Flight")
      .click();
  });
});
