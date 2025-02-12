export interface EventParams {
  eventId: string;
  eventName: string;
  eventDescription: string;
  game: string;
}

export class Event {
  eventId: string;
  eventName: string;
  eventDescription: string;
  game: string;

  constructor(params: EventParams) {
    this.eventId = params.eventId;
    this.eventName = params.eventName;
    this.eventDescription = params.eventDescription;
    this.game = params.game;
  }
}
