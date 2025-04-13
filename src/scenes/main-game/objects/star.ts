export default class Star extends Phaser.Physics.Matter.Image {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene.matter.world, x, y, "star", undefined);

    scene.add.existing(this);
    this.setStatic(true);
    this.setInteractive();

    this.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
        this.setScale(0.5);
      } else if (pointer.rightButtonDown()) {
        this.setScale(1.5);
      }
    });
  }
  get coords() {
    return { x: this.x, y: this.y };
  }
  destroyStar() {
    this.destroy();
  }
}
