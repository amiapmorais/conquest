import db from "../infrastructure/firestore";
const players = db.collection("players");

import { PlayerParams } from "../domain/player";
import { PlayerMapper } from "../infrastructure/mapper/player.mapper";

class PlayerModel {
  static async findById(playerId: string) {
    const docRef = players.doc(String(playerId));
    return docRef.get().then((doc) => {
      if (!doc.exists) {
        throw new Error("Player not found.");
      }
      const eventParams = { ...doc.data(), playerId: doc.id } as PlayerParams;
      return PlayerMapper.toDomain(eventParams);
    }).catch((error) => {
      throw error;
    });
  }
}

export default PlayerModel;
