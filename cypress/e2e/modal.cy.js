const testObjects = {
  bun: '[data-test="bun"]',
  modalClose: '[data-test="modal-close-button"]',
  ingredientName:'[data-test="ingredient-name"]',
  calories: '[data-test="calories"]',
  proteins: '[data-test="proteins"]',
  fat: '[data-test="fat"]',
  carbohydrates: '[data-test="carbohydrates"]'
};

describe("Order modal", () => {
  beforeEach(() => {
    cy.viewport(1920, 1000);
    cy.visit("http://localhost:3000");
  });

  it("open order modal", () => {
    cy.get(testObjects.bun).eq(0).click();
    cy.get(testObjects.ingredientName).contains('Краторная булка N-200i');
    cy.get(testObjects.calories).contains("420");
    cy.get(testObjects.proteins).contains("80");
    cy.get(testObjects.fat).contains("24");
    cy.get(testObjects.carbohydrates).contains("53");
    cy.get(testObjects.modalClose).click();
  });
});
