import { Player } from "./player";
export interface EventParams {
  eventId: string;
  eventName: string;
  eventDescription: string;
  game: string;
  playerList: Array<Player>;
}

export class Event {
  eventId: string;
  eventName: string;
  eventDescription: string;
  game: string;
  playerList: Array<Player>;

  constructor(params: EventParams) {
    this.eventId = params.eventId;
    this.eventName = params.eventName;
    this.eventDescription = params.eventDescription;
    this.game = params.game;
    this.playerList = params.playerList;
  }

  addPlayer(newPlayer: Player) {
    if (
      this.playerList.find((player) => player.playerId === newPlayer.playerId)
    ) {
      throw new Error("Player already registered.");
    }
    this.playerList.push(newPlayer);
  }
}
