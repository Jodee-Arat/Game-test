import { Scene } from "phaser";
import Star from "./objects/star";
import Player from "./objects/player";
import getDistance from "../../shared/utils/get-distance";
import STARS from "../../shared/constants/stars.const";
import {
  GRASS_HEIGHT,
  GRASS_WIDTH,
  GRASS_X,
  GRASS_Y,
  WATER_HEIGHT,
  WATER_WIDTH,
} from "../../shared/constants/bg.const";

export class Game extends Scene {
  player: Player;
  stars: Star[] = [];
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  text: Phaser.GameObjects.Text;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("water", "assets/water.png");
    this.load.image("grass", "assets/background-grass.png");
    this.load.image("star", "assets/star.png");
    this.load.spritesheet("playerGoLeft", "assets/player.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet("playerGoLeftInWater", "assets/player.png", {
      frameWidth: 32,
    });
    this.load.spritesheet("playerIdle", "assets/player.png", {
      startFrame: 4,
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet("playerIdleInWater", "assets/player.png", {
      startFrame: 4,
      frameWidth: 32,
    });
  }

  create() {
    this.input.mouse?.disableContextMenu();

    this.add
      .tileSprite(0, 0, WATER_WIDTH, WATER_HEIGHT, "water")
      .setOrigin(0, 0);
    this.add
      .tileSprite(GRASS_X, GRASS_Y, GRASS_WIDTH, GRASS_HEIGHT, "grass")
      .setOrigin(0, 0);
    this.matter.world.setBounds(0, 0, 1600, 1200);

    for (const star of STARS) {
      this.stars.push(new Star(this, star.x, star.y));
    }

    this.player = new Player(this, 400, 300);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, 1600, 1200);

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("playerGoLeft", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.cursors = this.input.keyboard!.createCursorKeys();

    this.input.keyboard!.on("keydown-X", () => {
      if (this.player.getNearestStarId !== -1) {
        this.player.destroyDescription();
        this.stars[this.player.getNearestStarId].destroyStar();
        this.stars = this.stars.filter(
          (_, index) => index !== this.player.getNearestStarId
        );
        this.player.addPoints();

        this.text.destroy();
        this.text = this.add.text(
          20,
          20,
          `Points: ${this.player.getPoints}/5`,
          {
            fontSize: "25px",
            color: "#fff",
            fontFamily: "Arial",
            align: "center",
          }
        );
        this.text.setScrollFactor(0);

        this.player.setNearestStarId = -1;
      }
    });

    this.text = this.add.text(20, 20, `Points: ${this.player.getPoints}/5`, {
      fontSize: "25px",
      color: "#fff",
      fontFamily: "Arial",
      align: "center",
    });
    this.text.setScrollFactor(0);
  }
  update() {
    if (this.player.getPoints === 5) {
      this.scene.start("VictoryScene");
    }
    if (this.cursors.left.isDown) {
      this.player.moveLeft();
      updateStarScales(this.player, this.stars);
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
      updateStarScales(this.player, this.stars);
    } else if (this.cursors.up.isDown) {
      this.player.moveUp();
      updateStarScales(this.player, this.stars);
    } else if (this.cursors.down.isDown) {
      this.player.moveDown();
      updateStarScales(this.player, this.stars);
    } else {
      this.player.moveStop();
    }
  }
}

function updateStarScales(player: Player, stars: Star[]) {
  player.setNearestStarId = -1;

  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    if (getDistance(player, star) < 60) {
      player.setNearestStarId = i;
    }
  }

  if (player.getNearestStarId !== -1) {
    if (player.getDescription) {
      player.destroyDescription();
    }
    player.setDescription = "Press X";
  } else {
    if (player.getDescription) {
      player.destroyDescription();
    }
  }
}
