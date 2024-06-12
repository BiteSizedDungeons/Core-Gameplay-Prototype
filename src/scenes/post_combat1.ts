/* Post Combat Scene: Menu scene that should play after player has finished combat
 * should have buttons that lead the player to the Inventory Scene and the
 * Combat Scene
 */

import Phaser from "phaser";

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

const TEXT_COLOR = "#D3B02C";
const FONT = "Silkscreen";

export class PostCombat1 extends Phaser.Scene {
  constructor() {
    super("post combat1");
  }

  preload() {}

  create() {
    const hover = this.sound.add("btnHov");

    this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      0x141413
    );

    





    const class1 = this.add
    .text(1100, 650, "Next", {
      fontFamily: FONT,
      color: TEXT_COLOR,
      fontSize: "30px",
    })
    .setOrigin(0.5);
  class1.setInteractive();
  class1.on("pointerover", () => {
    class1.setColor("#FFF");
    hover.play();
  });
  class1.on("pointerout", () => {
    class1.setColor(TEXT_COLOR);
  });
  class1.on("pointerdown", () => {


      this.add.rectangle(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2,
        GAME_WIDTH,
        GAME_HEIGHT,
        0x0000000
      );

      this.add
        .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "Level 1", {
          fontFamily: "Silkscreen",
          color: "#D3B02C",
          fontSize: "35px",
        })
        .setOrigin(0.5);

      this.cameras.main.fadeOut(
        1000,
        0,
        0,
        0,
        (_camera: any, progress: any) => {
          if (progress === 1) {
            this.scene.start("Combat2");
          }
        }
      );
    
  });
  }

  update() {}
}