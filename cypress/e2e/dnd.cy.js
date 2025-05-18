const testObjects = {
  bun: '[data-test="bun"]',
  sauce: '[data-test="sauce"]',
  main: '[data-test="main"]',
  constructor: '[data-test="constructor"]',
  constructorBun: '[data-test="constructor-bun"]',
  constructorItem: '[data-test="constructor-item"]',
};

describe("template spec", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.viewport(1920, 1000);
    cy.visit("http://localhost:3000");
    cy.get(testObjects.bun).as("bun");
    cy.get(testObjects.sauce).as("sauce");
    cy.get(testObjects.main).as("main");
    cy.get(testObjects.constructor).as("constructor");
  });

  it("Drag and drop", () => {
    cy.get("@bun").eq(0).trigger("dragstart");
    cy.get(testObjects.constructor).trigger("drop");
    cy.get(testObjects.constructorBun).contains('Краторная булка N-200i');
    cy.get("@sauce").eq(0).trigger("dragstart");
    cy.get(testObjects.constructor).trigger("drop");
    cy.get(testObjects.constructorItem).contains('Соус Spicy-X');
    cy.get("@main").eq(0).trigger("dragstart");
    cy.get(testObjects.constructor).trigger("drop");
    cy.get(testObjects.constructorItem).contains('Биокотлета из марсианской Магнолии');
  });
});
