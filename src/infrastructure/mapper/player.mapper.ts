import { Player, PlayerParams } from "../../domain/player";

export class PlayerMapper {
  static toDomain(player: PlayerParams) : Player {
    return new Player(player);
  }
}
