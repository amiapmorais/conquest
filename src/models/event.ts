import moment from "moment";

import db from "../infrastructure/firestore";
const events = db.collection("events");
import { EventMapper } from "../infrastructure/mapper/event.mapper";
import { Event, EventParams } from "../domain/event";
import { Player } from "../domain/player";

class EventModel {
  id: string;
  playerList: Array<Player>;

  constructor(event: EventParams) {
    this.id = event.eventId;
    this.playerList = event.playerList;
  }


  static async find(start = moment("2025-01-01"), end = moment()) {
    const result: Array<Event> = [];

    const query = events.where("date", ">=", start)
      .orderBy("date", "desc")
      .where("date", "<=", end);

    const snapshot = await query.get();
    if (snapshot.empty) {
      console.log("No matching events.");
      return result;
    }
    snapshot.forEach((doc) => {
      const eventParams = { ...doc.data(), eventId: doc.id } as EventParams;
      result.push(EventMapper.toDomain(eventParams));
    });
    return result;
  }

  static async findById(eventId: string) {
    const docRef = events.doc(String(eventId));
    return docRef.get().then((doc) => {
      if (!doc.exists) {
        throw new Error("Event not found.");
      }
      const eventParams = { ...doc.data(), eventId: doc.id } as EventParams;
      return EventMapper.toDomain(eventParams);
    }).catch((error) => {
      throw error;
    });
  }

  convertToDocument() {
    const result = {
      playerList: this.playerList.map((player) => ({
        playerId: player.playerId,
        playerName: player.playerName,
      })),
    };
    return result;
  }

  async save() {
    const docRef = events.doc(String(this.id));
    await docRef.set(this.convertToDocument(), { merge: true });
  }
}

export default EventModel;
