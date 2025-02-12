import EventModel from "../models/event";
import { Event } from "../domain/event";
import moment from "moment";

export class EventsRepository {
  static async upcomingEvents() : Promise<Array<Event>> {
    return EventModel.find(moment(), moment().add(1, "month"));
  }
}
