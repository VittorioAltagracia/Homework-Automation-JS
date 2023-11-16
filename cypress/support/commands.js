export function checkMakeAMove() {
  cy.wait(2000);
  cy.get("#message").should(($elem) => {
    const text = $elem.text().trim();
    expect(text).to.equal("Make a move.");
  });
}

export function ConfirmBluePieceIsTaken(spaceNumber) {
  cy.get(`[name="space${spaceNumber}"]`)
    .should("have.attr", "src")
    .and("equal", "gray.gif");
}

export function ConfirmsOrangePieceIsHighlighted(spaceNumber) {
  cy.get(`[name="space${spaceNumber}"]`)
    .should("have.attr", "src")
    .and("equal", "you2.gif");
}
