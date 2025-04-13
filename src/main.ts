import { Game as MainGame } from "./scenes/main-game/game";

import { Game, Types } from "phaser";
import { Victory } from "./scenes/victory/victory";

const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 768,
  height: 512,
  parent: "game-container",
  physics: {
    default: "matter",
    matter: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: [MainGame, Victory],
};

export default new Game(config);
