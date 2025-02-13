import { Player } from "../domain/player";
import PlayerModel from "../models/player";

export class PlayerRepository {
  static async fetchPlayer( playerId: string ) : Promise<Player> {
    return await PlayerModel.findById(playerId);
  }
}
