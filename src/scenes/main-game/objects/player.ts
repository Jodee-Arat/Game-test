import {
  GRASS_HEIGHT,
  GRASS_WIDTH,
  GRASS_X,
  GRASS_Y,
} from "../../../shared/constants/bg.const";

export default class Player extends Phaser.Physics.Matter.Sprite {
  private description: Phaser.GameObjects.Text;
  private nearestStarId: number;
  private points: number = 0;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene.matter.world, x, y, "playerIdle", undefined);

    this.setFixedRotation();
    scene.add.existing(this);
  }
  moveLeft() {
    this.setVelocityX(-3);
    this.play("walk", true);
    this.updatePlayerImageInWater();
    this.setFlipX(false);
  }
  moveRight() {
    this.setVelocityX(3);
    this.play("walk", true);
    this.updatePlayerImageInWater();
    this.setFlipX(true);
  }
  moveUp() {
    this.setVelocityY(-4);
    this.play("walk", true);
    this.updatePlayerImageInWater();
  }
  moveDown() {
    this.setVelocityY(4);
    this.play("walk", true);
    this.updatePlayerImageInWater();
  }
  moveStop() {
    this.setVelocity(0, 0);
    this.play("walk", false);
    this.updatePlayerImageInWater();

    this.stop();
  }
  get coords() {
    return { x: this.x, y: this.y };
  }
  set setDescription(text: string) {
    this.description = this.scene.add
      .text(0, -40, text, {
        fontSize: "16px",
        color: "#fff",
      })
      .setOrigin(0.5, 0.5)
      .setVisible(true);
    this.scene.add.container(this.x, this.y, [this.description]);
  }
  get getDescription() {
    if (!this.description) return undefined;
    return this.description.text;
  }
  destroyDescription() {
    if (this.description) {
      this.description.destroy();
    }
  }
  set setNearestStarId(nearId: number) {
    this.nearestStarId = nearId;
  }
  get getNearestStarId() {
    return this.nearestStarId;
  }
  addPoints() {
    this.points++;
  }
  get getPoints() {
    return this.points;
  }

  private updatePlayerImageInWater() {
    const inWater =
      this.x < GRASS_X ||
      this.y < GRASS_Y ||
      this.x > GRASS_X + GRASS_WIDTH ||
      this.y > GRASS_Y + GRASS_HEIGHT;
    const velocity = this.getVelocity();
    const isIdle = velocity.x === 0 && velocity.y === 0;
    const goingLeft = velocity.x < 0;
    const goingRight = velocity.x > 0;
    const goingUp = velocity.y < 0;
    const goingDown = velocity.y > 0;

    if (inWater) {
      if (isIdle) {
        if (this.texture.key !== "playerIdleInWater") {
          this.setTexture("playerIdleInWater");
        }
      } else if (goingLeft || goingRight || goingDown || goingUp) {
        if (this.texture.key !== "playerGoLeftInWater") {
          this.setTexture("playerGoLeftInWater");
        }
      }
    } else {
      if (isIdle) {
        if (this.texture.key !== "playerIdle") {
          this.setTexture("playerIdle");
        }
      } else if (goingLeft || goingRight || goingDown || goingUp) {
        if (this.texture.key !== "playerGoLeft") {
          this.setTexture("playerGoLeft");
        }
      }
    }
  }
}
