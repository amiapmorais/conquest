import EventModel from "../models/event";
import { Event } from "../domain/event";
import { Player } from "../domain/player";
import moment from "moment";

export class EventsRepository {
  static async upcomingEvents() : Promise<Array<Event> | null> {
    return await EventModel.find(moment(), moment().add(1, "month"));
  }

  static async registerPlayer(
    event: Event,
    player: Player,
  ) : Promise<{ message: string }> {
    event.addPlayer(player);
    await new EventModel(event).save();

    return { message: "Player registered successfully!" };
  }

  static async fetchEvent( eventId: string ) : Promise<Event> {
    return await EventModel.findById(eventId);
  }
}
