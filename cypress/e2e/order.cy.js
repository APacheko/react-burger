const testObjects = {
  bun: '[data-test="bun"]',
  sauce: '[data-test="sauce"]',
  main: '[data-test="main"]',
  constructor: '[data-test="constructor"]',
  modalClose: '[data-test="modal-close-button"]',
};

describe("template spec", () => {
  beforeEach(() => {
    localStorage.setItem("refreshToken", "test");
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.viewport(1920, 1000);
    cy.visit("http://localhost:3000");
    cy.get(testObjects.bun).as("bun");
    cy.get(testObjects.sauce).as("sauce");
    cy.get(testObjects.main).as("main");
    cy.get(testObjects.constructor).as("constructor");
  });

  it("order", () => {
    cy.get("@bun").eq(0).trigger("dragstart");
    cy.get(testObjects.constructor).trigger("drop");
    cy.get("@sauce").eq(0).trigger("dragstart");
    cy.get(testObjects.constructor).trigger("drop");
    cy.get("@main").eq(0).trigger("dragstart");
    cy.get(testObjects.constructor).trigger("drop");
    cy.intercept("POST", "api/orders", { fixture: "order.json" });
    cy.get('[data-test="submit"]').click();
    cy.get(testObjects.modalClose).click();
  });
});
