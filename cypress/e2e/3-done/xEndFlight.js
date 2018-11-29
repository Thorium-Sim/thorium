describe("delete a flight when done", () => {
  it("should properly delete the flight", () => {
    it("should be able to delete the flight", () => {
      cy.visit("/", {
        onBeforeLoad(win) {
          cy.stub(win, "confirm").returns(true);
        }
      })
        .getByText("My New Test Flight")
        .click()
        .getByText("Delete Flight")
        .click();
    });
  });
});
