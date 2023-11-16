import {
  checkMakeAMove,
  ConfirmBluePieceIsTaken,
  ConfirmsOrangePieceIsHighlighted,
} from "../../support/commands";
import { checkersUrl } from "../../utils/baseUrl";

describe("it tests the checkers game", () => {
  beforeEach("it navigates to the url before each test", () => {
    cy.visit(checkersUrl);
  });

  it("checks that the site is up and executes the rest of the steps", () => {
    cy.url().should("eq", checkersUrl);

    // 2 stepsto make sure the site is up and that by default we are expected to choose orange, asserts game board is visible to users
    cy.contains("#message", "Select an orange piece to move.").should(
      "be.visible"
    );
    cy.get("#board").should("be.visible");

    // makes the first move
    cy.get('[name="space62"]').click();
    ConfirmsOrangePieceIsHighlighted(
      62,
      "Orange piece at space 62 should be highlighted"
    );

    cy.get('[name="space53"]').click();

    // confirms that our token moved where expected
    cy.get('[name="space53"]')
      .should("have.attr", "src")
      .and("equal", "you1.gif");

    checkMakeAMove();

    // makes second move
    cy.get('[name="space22"]').click();
    ConfirmsOrangePieceIsHighlighted(
      22,
      'Orange piece at space 22 should be highlighted"'
    );

    cy.get('[name="space33"]').click();
    checkMakeAMove();
    //!! makes third move and takes a blue piece!!

    //1. Asserts the blue piece is where expected
    cy.get('[name="space13"]')
      .should("have.attr", "src")
      .and("equal", "me1.gif");
    // makes a move and takes the piece
    cy.get('[name="space02"]').click();

    cy.get('[name="space24"]').click();
    // function that validates the blue piece is taken, takes one argument in
    ConfirmBluePieceIsTaken(13);

    checkMakeAMove();

    // makes forth move. the move includes additional assertions to account for flakiness of the game
    cy.get('[name="space11"]').scrollIntoView().click();
    ConfirmsOrangePieceIsHighlighted(
      11,
      'Orange piece at space 11 should be highlighted"'
    );

    checkMakeAMove();

    cy.get('[name="space02"]').click();
    cy.get('[name="space02"]')
      .should("have.attr", "src")
      .and("equal", "you1.gif");

    // makes final move and takes a blue piece
    cy.get('[name="space22"]')
      .should("have.attr", "src")
      .and("equal", "me1.gif");
    cy.get('[name="space31"]').click();
    cy.get('[name="space13"]').click();
    // function that validates the blue piece is taken
    ConfirmBluePieceIsTaken(22);

    // restarts the game
    cy.contains('[href="./"]', "Restart...").click();

    // cypress automatically waits until the page loads, so there is no need to declare waits
    cy.contains("#message", "Select an orange piece to move.").should(
      "be.visible"
    );
  });
});
