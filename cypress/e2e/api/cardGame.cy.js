import { baseUrl } from "../../utils/baseUrl";

describe("it tests the card game", () => {
  // cypress/tests/api/api-users.spec.ts

  context(`GET ${baseUrl}new/`, () => {
    // gets a new deck
    it("gets a new deck", () => {
      cy.request("GET", `${baseUrl}new/`)
        .then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.success).to.eq(true);
          console.log(res.body);
          return res.body.deck_id;
        })
        // shuffles a deck of cards
        .then((deckId) => {
          cy.request(
            "GET",
            `${baseUrl}${deckId}/shuffle/
        `
          ).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.shuffled).to.eq(true);
            return res.body.deck_id;
          });
        })
        // draws 3 cards from a deck

        .then((deckId) => {
          cy.request(
            "GET",
            `${baseUrl}${deckId}/draw/?count=3
        `
          ).then((res) => {
            expect(res.status).to.eq(200);
            console.log(res.body);
            expect(res.body.cards).to.have.lengthOf(3);
            expect(res.body.remaining).to.eq(49);
            return res.body;
          });
        })
        // puts 3 cards into a pile, which is apparently a way to give them to a player

        .then(({ cards, deck_id }) => {
          const cardCodes = cards.map((card) => card.code).join(",");
          const pile = "first_pile";
          cy.request(
            "GET",
            `${baseUrl}${deck_id}/pile/${pile}/add/?cards=${cardCodes}
        `
          ).then((res) => {
            expect(res.status).to.eq(200);
            console.log(res.body);
            expect(res.body.remaining).to.eq(49);
            return res.body;
          });
        })
        // draws 3 more cards from a deck

        .then(({ deck_id }) => {
          cy.request(
            "GET",
            `${baseUrl}${deck_id}/draw/?count=3
        `
          ).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.cards).to.have.lengthOf(3);
            expect(res.body.remaining).to.eq(46);
            return res.body;
          });
        })
        //  puts 3 cards into a second pile
        .then(({ cards, deck_id }) => {
          const cardCodes = cards.map((card) => card.code).join(",");
          const pile = "second_pile";
          cy.request(
            "GET",
            `${baseUrl}${deck_id}/pile/${pile}/add/?cards=${cardCodes}
        `
          ).then((res) => {
            expect(res.status).to.eq(200);
            console.log(res.body);
            expect(res.body.remaining).to.eq(46);
            return res.body;
          });
        });
    });
  });
});

// How I would proceed with the rest of the assignment

// 1. List cards in both piles by making a corresponding api call
// 2. Save the value of 'value' properties from responses into variables
// 3. COmpare whether either has a blackjack, based on my undestanding, black is the following?? -
// If a player's first two cards are an ace and a "ten-card" (a picture card or 10), giving a count of 21 in two cards, this is a natural or "blackjack."
// 4. So I would compare those values and write a conditional saying whether either has a blackjack
// p.s I ve never played blackjack so it's new to me
