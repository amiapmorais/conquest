/* eslint-disable require-jsdoc */
import * as logger from "firebase-functions/logger";
import axios from "axios";

const API = "https://api2.moxfield.com/v2/decks";

export class Moxfield {
  private userAgent?: string;

  constructor(userAgent?: string) {
    this.userAgent = userAgent;
  }

  async fetchMoxfieldDeck(moxfieldId?: string) {
    try {
      const response = await axios.get(`${API}/all/${moxfieldId}`, {
        headers: {
          "User-Agent": this.userAgent,
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      logger.error("moxfieldId:", moxfieldId);
      return { success: false, error: "Deck not found" };
    }
  }
}
