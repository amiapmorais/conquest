import { Event, EventParams } from "../../domain/event";

export class EventMapper {
  static toDomain(event: EventParams) : Event {
    return new Event(event);
  }
}
