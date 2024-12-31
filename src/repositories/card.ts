/* eslint-disable require-jsdoc */
import * as logger from "firebase-functions/logger";
import db from "../infrastructure/firestore";
const cards = db.collection("cards");

export class CardRepository {
  static async saveCard(name: string, cost: string, type: string) {
    try {
      const docRef = cards.doc(name.replace(/\/\//g, "|"));
      await docRef.set({
        cost: cost || "",
        type,
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(
          "Error while saving card", name, cost, type, error.message
        );
      } else {
        logger.error("Error while saving card", name, cost, type);
      }
    }
  }
}
