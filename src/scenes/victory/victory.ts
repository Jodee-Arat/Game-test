import { Scene } from "phaser";

export class Victory extends Scene {
  constructor() {
    super("VictoryScene");
  }
  preload() {
    this.load.image("grass", "assets/background-grass.png");
  }
  create() {
    this.add.image(512, 384, "grass");
    this.add
      .text(384, 256, "Victory", {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
      })
      .setOrigin(0.5);
    this.add
      .text(384, 400, "Click on window to reload", {
        fontFamily: "Arial Black",
        fontSize: 30,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      window.location.reload();
    });
  }
}
