/* eslint-disable require-jsdoc */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import serviceAccount from "./firebase.json";
initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});
import { Moxfield } from "./controllers/moxfield";
import { DeckRepository, DeckCEDHRepository } from "./repositories";
import { Deck } from "./domain";

const moxfield = new Moxfield(process.env.MOXFIELD_USER_AGENT);

export const saveDecklist = onRequest(async (request, response) => {
  const { moxfieldId, deckId } = request.query;
  try {
    const resp = await moxfield.fetchMoxfieldDeck(moxfieldId as string);
    if (!resp.success) {
      response.statusCode = 404;
      response.send("Deck not found");
    }

    const deck: Deck = resp.data;
    const cards: Array<string> = [];

    Object.values(deck.commanders)
      .forEach((value) => cards.push(value.card.name));

    Object.values(deck.mainboard)
      .forEach((value) => cards.push(value.card.name));

    await DeckRepository.saveDeck(deckId as string, cards);

    logger.info(`${moxfieldId} imported successfully`);
    response.send(`${moxfieldId} imported successfully`);
  } catch (error) {
    response.send(`Error importing ${moxfieldId} `);
  }
});

export const saveCEDHDecklist = onRequest(async (request, response) => {
  const { moxfieldId, deckId } = request.query;
  try {
    const resp = await moxfield.fetchMoxfieldDeck(moxfieldId as string);
    if (!resp.success) {
      response.statusCode = 404;
      response.send("Deck not found");
    }

    const deck: Deck = resp.data;
    const cards: Array<string> = [];

    Object.values(deck.commanders)
      .forEach((value) => cards.push(value.card.name));

    Object.values(deck.mainboard)
      .forEach((value) => cards.push(value.card.name));

    await DeckCEDHRepository.saveDeck(deckId as string, cards);

    logger.info(`${moxfieldId} imported successfully`);
    response.send(`${moxfieldId} imported successfully`);
  } catch (error) {
    response.send(`Error importing ${moxfieldId} `);
  }
});

// async function saveCards(
//   cards:Record<string, { card: Card }>, allCardsNames: Array<string>
// ) {
//   const promises = Object.values(cards).map(async (value) => {
//     const { name, type_line: typeLine, mana_cost: manaCost } = value.card;
//     await CardRepository.saveCard(name, manaCost, typeLine);
//     allCardsNames.push(name);
//   });

//   await Promise.all(promises);
// }
