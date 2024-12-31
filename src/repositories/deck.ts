/* eslint-disable require-jsdoc */

import db from "../infrastructure/firestore";
const decks = db.collection("decks");

export class DeckRepository {
  static async saveDeck(
    deckId: string,
    // archetype: string,
    cards: Array<string>,
    // moxfieldId: string,
    // player: string,
    // decklist: string,
  ) {
    const docRef = decks.doc(deckId);
    await docRef.set({
      // archetype,
      cards,
      // moxfield_id: moxfieldId,
      // player,
      // decklist,
    });
  }
}
