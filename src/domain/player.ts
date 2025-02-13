export interface PlayerParams {
  playerId: string;
  playerName: string;
}

export class Player {
  playerId!: string;
  playerName!: string;

  constructor(player: PlayerParams) {
    Object.assign(this, player);
  }
}
