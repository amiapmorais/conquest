import moment from "moment";

import db from "../infrastructure/firestore";
import { EventMapper } from "../infrastructure/mapper/event.mapper";
import { Event, EventParams } from "../domain/event";
const events = db.collection("events");

class EventModel {
  static async find(start = moment("2025-01-01"), end = moment()) {
    const result: Array<Event> = [];
    try {
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
    } catch (error) {
      throw new Error("Error while fetching events");
    }
  }
}

export default EventModel;
