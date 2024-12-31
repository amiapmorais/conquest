/* eslint-disable require-jsdoc */

import db from "../infrastructure/firestore";
const decks = db.collection("decks_cedh");

export class DeckCEDHRepository {
  static async saveDeck(
    deckId: string,
    cards: Array<string>,
  ) {
    const docRef = decks.doc(deckId);
    await docRef.set({
      cards,
    });
  }
}
